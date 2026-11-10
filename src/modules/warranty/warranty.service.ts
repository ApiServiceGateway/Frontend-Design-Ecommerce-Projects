import { coreEventBus } from '../../core/event-bus';
import { coreRegistry } from '../../core/registry';
import { CoreServiceNames } from '../../core/contracts/service-names';
import { AppError, NotFoundError, ValidationError } from '../../core/errors';
import { OrderProcessingService } from '../orders/orders.service';
import {
  ReviewClaimInput,
  StoreCreditVoucherRecord,
  SubmitDoaClaimInput,
  WarrantyClaimRecord,
} from './types';

export class WarrantyClaimsService {
  private claimsStore = new Map<string, WarrantyClaimRecord>();
  private vouchersStore = new Map<string, StoreCreditVoucherRecord>();

  /**
   * Generates a pre-signed video upload URI for customer unboxing video (BR-12)
   */
  public generatePreSignedUploadUrl(
    userId: string,
    orderId: string,
    mimeType: string = 'video/mp4'
  ): { uploadUrl: string; storageUri: string; expiresInSeconds: number } {
    const allowedMimeTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
    if (!allowedMimeTypes.includes(mimeType.toLowerCase())) {
      throw new ValidationError(
        'Invalid video format. Please upload an unboxing video in MP4, WEBM, or MOV format.'
      );
    }

    const fileKey = `warranty-videos/${userId}/${orderId}/${Date.now()}.${mimeType.split('/')[1]}`;
    const storageUri = `https://cdn.auralifestyle.in/${fileKey}`;
    const uploadUrl = `https://storage.r2.cloudflarestorage.com/aura-dev-media/${fileKey}?mock_signed_token=${Date.now()}`;

    return {
      uploadUrl,
      storageUri,
      expiresInSeconds: 900, // 15 minutes TTL
    };
  }

  /**
   * Submit DOA Claim with strict 24-Hour window verification (BR-11)
   */
  public async submitDoaClaim(input: SubmitDoaClaimInput): Promise<WarrantyClaimRecord> {
    const { orderId, userId, variantId, sku, videoStorageUri, defectDescription, referenceDate = new Date() } = input;

    if (!videoStorageUri || videoStorageUri.trim().length === 0) {
      throw new ValidationError('An unboxing video showing the shipping label and defect is mandatory (BR-12).');
    }

    // 1. Fetch Order details from OrderProcessingService via Core Registry
    const ordersService = coreRegistry.get<OrderProcessingService>(CoreServiceNames.ORDER_PROCESSING);
    const order = ordersService?.getOrder(orderId);

    if (!order) {
      throw new NotFoundError('Order', orderId);
    }

    if (order.userId !== userId) {
      throw new AppError('You do not have permission to submit a claim for this order.', 403, 'FORBIDDEN');
    }

    if (order.status !== 'DELIVERED' || !order.deliveredAt) {
      throw new AppError(
        'Warranty claims can only be submitted once the order has been delivered by courier.',
        400,
        'ORDER_NOT_DELIVERED'
      );
    }

    // 2. Strict 24-Hour DOA Window Enforcement (BR-11)
    const deliveredTime = new Date(order.deliveredAt).getTime();
    const submissionTime = referenceDate.getTime();
    const diffHours = (submissionTime - deliveredTime) / (1000 * 60 * 60);

    if (diffHours > 24) {
      throw new AppError(
        `The 24-hour DOA warranty window has expired (${diffHours.toFixed(1)} hours elapsed since delivery). Under strict intimate hygiene standards, defective claims must be submitted within 24 hours of package delivery.`,
        400,
        'DOA_WINDOW_EXPIRED'
      );
    }

    // 3. Create Claim Record
    const claimId = `claim_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const yyyy = referenceDate.getFullYear();
    const mm = String(referenceDate.getMonth() + 1).padStart(2, '0');
    const dd = String(referenceDate.getDate()).padStart(2, '0');
    const claimNumber = `CLAIM-${yyyy}${mm}${dd}-${Math.floor(1000 + Math.random() * 9000)}`;

    const claim: WarrantyClaimRecord = {
      id: claimId,
      claimNumber,
      orderId,
      orderNumber: order.orderNumber,
      userId,
      variantId,
      sku,
      videoStorageUri,
      defectDescription,
      status: 'PENDING_REVIEW',
      adminReviewNotes: null,
      reviewedByUserId: null,
      submittedAt: referenceDate.toISOString(),
      createdAt: referenceDate.toISOString(),
      updatedAt: referenceDate.toISOString(),
    };

    this.claimsStore.set(claimId, claim);

    // 4. Update Order status to UNDER_WARRANTY_REVIEW
    await ordersService.updateOrderStatus(orderId, 'UNDER_WARRANTY_REVIEW');

    // 5. Emit decoupled event to Core Event Bus
    await coreEventBus.emit('WARRANTY_CLAIM_SUBMITTED', {
      eventId: `evt_${Date.now()}`,
      timestamp: referenceDate.toISOString(),
      claimId,
      orderId,
      customerId: userId,
      variantId,
      videoUri: videoStorageUri,
      submittedAt: referenceDate.toISOString(),
    });

    return claim;
  }

  /**
   * Human review of unboxing video by Admin / Support (BR-13)
   * Resolves claim into Store Credit (BR-14) or Replacement
   */
  public async reviewClaim(
    input: ReviewClaimInput
  ): Promise<{ claim: WarrantyClaimRecord; voucher?: StoreCreditVoucherRecord }> {
    const { claimId, adminUserId, decision, reviewNotes, itemPricePaise } = input;
    const claim = this.claimsStore.get(claimId);

    if (!claim) {
      throw new NotFoundError('WarrantyClaim', claimId);
    }

    claim.reviewedByUserId = adminUserId;
    claim.adminReviewNotes = reviewNotes;
    claim.updatedAt = new Date().toISOString();

    let voucher: StoreCreditVoucherRecord | undefined = undefined;

    if (decision === 'APPROVE_STORE_CREDIT') {
      claim.status = 'APPROVED_STORE_CREDIT';

      // Generate 100% value Store Credit Voucher (valid 365 days, BR-14)
      const voucherId = `vouch_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      const voucherCode = `AURA-VOUCH-${randomCode}`;
      const expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();

      voucher = {
        id: voucherId,
        voucherCode,
        userId: claim.userId,
        claimId: claim.id,
        balancePaise: itemPricePaise,
        expiresAt,
        isRedeemed: false,
        createdAt: new Date().toISOString(),
      };

      this.vouchersStore.set(voucherId, voucher);
    } else if (decision === 'APPROVE_REPLACEMENT') {
      claim.status = 'APPROVED_REPLACEMENT';
    } else {
      claim.status = 'REJECTED';
    }

    this.claimsStore.set(claimId, claim);

    return {
      claim,
      voucher,
    };
  }

  /**
   * Retrieve active store credit vouchers for a customer
   */
  public getStoreCreditVouchers(userId: string): StoreCreditVoucherRecord[] {
    return Array.from(this.vouchersStore.values()).filter(
      (v) => v.userId === userId && !v.isRedeemed && new Date(v.expiresAt).getTime() > Date.now()
    );
  }

  /**
   * Helper to retrieve a claim by ID
   */
  public getClaim(claimId: string): WarrantyClaimRecord | undefined {
    return this.claimsStore.get(claimId);
  }

  /**
   * Clear store for clean test teardowns
   */
  public clear(): void {
    this.claimsStore.clear();
    this.vouchersStore.clear();
  }
}

// Export singleton instance and register into coreRegistry
export const warrantyClaimsService = new WarrantyClaimsService();
coreRegistry.register(CoreServiceNames.WARRANTY_CLAIMS, warrantyClaimsService);
