import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  WarrantyClaimsService,
  warrantyClaimsService,
} from '../warranty.service';
import { coreRegistry } from '../../../core/registry';
import { CoreServiceNames } from '../../../core/contracts/service-names';
import { orderProcessingService } from '../../orders/orders.service';
import { coreEventBus } from '../../../core/event-bus';
import { AppError, ValidationError } from '../../../core/errors';

describe('Warranty Claims, 24-Hour DOA & Store Credit Service', () => {
  let warrantyService: WarrantyClaimsService;
  let testOrderId: string;
  const testUserId = 'cust_doa_test_1';
  const deliveryTime = new Date('2026-11-10T10:00:00.000Z');

  beforeEach(async () => {
    warrantyService = new WarrantyClaimsService();
    warrantyService.clear();
    orderProcessingService.clear();

    // Create and deliver a test order
    const order = await orderProcessingService.createOrder({
      userId: testUserId,
      shippingAddress: {
        fullName: 'Aakash Verma',
        phone: '+919876543210',
        addressLine1: 'Bandra West',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400050',
      },
      items: [
        {
          variantId: 'var_rose_1',
          sku: 'AURA-DUAL-ROSE',
          titleSnapshot: 'Personal Wellness Massager',
          unitPricePaise: 299900,
          quantity: 1,
        },
      ],
      subtotalPaise: 299900,
      totalAmountPaise: 299900,
      paymentMethod: 'PREPAID_UPI',
    });

    testOrderId = order.id;
    await orderProcessingService.confirmOrder(testOrderId);
    await orderProcessingService.updateOrderStatus(testOrderId, 'PROCESSING');
    await orderProcessingService.updateOrderStatus(testOrderId, 'DISPATCHED');
    await orderProcessingService.updateOrderStatus(testOrderId, 'OUT_FOR_DELIVERY');
    await orderProcessingService.updateOrderStatus(testOrderId, 'DELIVERED');

    // Override deliveredAt for precise time control in test
    const deliveredOrder = orderProcessingService.getOrder(testOrderId)!;
    deliveredOrder.deliveredAt = deliveryTime.toISOString();
  });

  it('should be registered in the CoreServiceRegistry', () => {
    const service = coreRegistry.get<WarrantyClaimsService>(CoreServiceNames.WARRANTY_CLAIMS);
    expect(service).toBeDefined();
    expect(service).toBe(warrantyClaimsService);
  });

  describe('Pre-Signed Video Upload URL Generation (BR-12)', () => {
    it('should generate pre-signed R2/S3 upload URL for valid video format', () => {
      const upload = warrantyService.generatePreSignedUploadUrl(testUserId, testOrderId, 'video/mp4');

      expect(upload.uploadUrl).toContain('storage.r2.cloudflarestorage.com');
      expect(upload.storageUri).toContain('cdn.auralifestyle.in');
      expect(upload.expiresInSeconds).toBe(900);
    });

    it('should reject non-video MIME types with ValidationError', () => {
      expect(() =>
        warrantyService.generatePreSignedUploadUrl(testUserId, testOrderId, 'image/jpeg')
      ).toThrow(ValidationError);
    });
  });

  describe('Mandatory 24-Hour DOA Window Enforcement (BR-11)', () => {
    it('should accept claim submitted within 24 hours of delivery and emit WARRANTY_CLAIM_SUBMITTED', async () => {
      const emitSpy = vi.spyOn(coreEventBus, 'emit');

      // Submit 4 hours after delivery
      const submissionTime = new Date(deliveryTime.getTime() + 4 * 60 * 60 * 1000);

      const claim = await warrantyService.submitDoaClaim({
        orderId: testOrderId,
        userId: testUserId,
        variantId: 'var_rose_1',
        sku: 'AURA-DUAL-ROSE',
        itemPricePaise: 299900,
        videoStorageUri: 'https://cdn.auralifestyle.in/warranty-videos/unboxing.mp4',
        defectDescription: 'Motor failed to turn on after charging with USB cable.',
        referenceDate: submissionTime,
      });

      expect(claim.id).toBeDefined();
      expect(claim.status).toBe('PENDING_REVIEW');
      expect(claim.claimNumber).toMatch(/^CLAIM-\d{8}-\d{4}$/);

      // Verify Order transitioned to UNDER_WARRANTY_REVIEW
      const order = orderProcessingService.getOrder(testOrderId);
      expect(order?.status).toBe('UNDER_WARRANTY_REVIEW');

      // Verify Event Bus notification
      expect(emitSpy).toHaveBeenCalledWith(
        'WARRANTY_CLAIM_SUBMITTED',
        expect.objectContaining({
          claimId: claim.id,
          orderId: testOrderId,
          customerId: testUserId,
        })
      );
    });

    it('should reject claim submitted after 24 hours from delivery (BR-11)', async () => {
      // Submit 25 hours after delivery (Expired)
      const expiredSubmissionTime = new Date(deliveryTime.getTime() + 25 * 60 * 60 * 1000);

      await expect(
        warrantyService.submitDoaClaim({
          orderId: testOrderId,
          userId: testUserId,
          variantId: 'var_rose_1',
          sku: 'AURA-DUAL-ROSE',
          itemPricePaise: 299900,
          videoStorageUri: 'https://cdn.auralifestyle.in/warranty-videos/unboxing.mp4',
          defectDescription: 'Defect noticed late.',
          referenceDate: expiredSubmissionTime,
        })
      ).rejects.toThrow('24-hour DOA warranty window has expired');
    });

    it('should reject claim without unboxing video', async () => {
      await expect(
        warrantyService.submitDoaClaim({
          orderId: testOrderId,
          userId: testUserId,
          variantId: 'var_rose_1',
          sku: 'AURA-DUAL-ROSE',
          itemPricePaise: 299900,
          videoStorageUri: '', // Missing video
          defectDescription: 'No video provided.',
        })
      ).rejects.toThrow(ValidationError);
    });
  });

  describe('Human Review & Store Credit Fallback (BR-13 & BR-14)', () => {
    it('should approve claim and generate 100% Store Credit Voucher valid for 365 days', async () => {
      // 1. Submit claim within 24 hours
      const submissionTime = new Date(deliveryTime.getTime() + 2 * 60 * 60 * 1000);
      const claim = await warrantyService.submitDoaClaim({
        orderId: testOrderId,
        userId: testUserId,
        variantId: 'var_rose_1',
        sku: 'AURA-DUAL-ROSE',
        itemPricePaise: 299900,
        videoStorageUri: 'https://cdn.auralifestyle.in/warranty-videos/unboxing.mp4',
        defectDescription: 'Motor failure demonstrated on camera.',
        referenceDate: submissionTime,
      });

      // 2. Admin reviews unboxing video
      const reviewResult = await warrantyService.reviewClaim({
        claimId: claim.id,
        adminUserId: 'staff_support_88',
        decision: 'APPROVE_STORE_CREDIT',
        reviewNotes: 'Verified intact seal in video. Motor fails to power up. Approved 100% store credit voucher.',
        itemPricePaise: 299900,
      });

      expect(reviewResult.claim.status).toBe('APPROVED_STORE_CREDIT');
      expect(reviewResult.claim.reviewedByUserId).toBe('staff_support_88');

      // Verify Store Credit Voucher (BR-14)
      const voucher = reviewResult.voucher;
      expect(voucher).toBeDefined();
      expect(voucher?.voucherCode).toMatch(/^AURA-VOUCH-\d{4}$/);
      expect(voucher?.balancePaise).toBe(299900); // 100% purchase price (₹2,999)
      expect(voucher?.isRedeemed).toBe(false);

      // Check validity (365 days)
      const now = Date.now();
      const expiresAt = new Date(voucher!.expiresAt).getTime();
      const daysValid = Math.round((expiresAt - now) / (1000 * 60 * 60 * 24));
      expect(daysValid).toBe(365);

      // Verify customer dashboard retrieval
      const activeVouchers = warrantyService.getStoreCreditVouchers(testUserId);
      expect(activeVouchers.length).toBe(1);
      expect(activeVouchers[0].voucherCode).toBe(voucher?.voucherCode);
    });

    it('should reject claim when unboxing video reveals pre-broken seals', async () => {
      const submissionTime = new Date(deliveryTime.getTime() + 1 * 60 * 60 * 1000);
      const claim = await warrantyService.submitDoaClaim({
        orderId: testOrderId,
        userId: testUserId,
        variantId: 'var_rose_1',
        sku: 'AURA-DUAL-ROSE',
        itemPricePaise: 299900,
        videoStorageUri: 'https://cdn.auralifestyle.in/warranty-videos/broken.mp4',
        defectDescription: 'Doesn’t work.',
        referenceDate: submissionTime,
      });

      const reviewResult = await warrantyService.reviewClaim({
        claimId: claim.id,
        adminUserId: 'staff_support_88',
        decision: 'REJECT',
        reviewNotes: 'Outer tamper seal was already broken prior to start of video recording.',
        itemPricePaise: 299900,
      });

      expect(reviewResult.claim.status).toBe('REJECTED');
      expect(reviewResult.voucher).toBeUndefined();
    });
  });
});
