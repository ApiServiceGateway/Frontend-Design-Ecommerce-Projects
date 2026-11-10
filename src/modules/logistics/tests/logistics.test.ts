import { describe, it, expect, beforeEach } from 'vitest';
import {
  LogisticsShippingService,
  logisticsShippingService,
} from '../logistics.service';
import { CreateShipmentInput } from '../types';
import { coreRegistry } from '../../../core/registry';
import { CoreServiceNames } from '../../../core/contracts/service-names';
import { orderProcessingService } from '../../orders/orders.service';
import { UnauthorizedError, ValidationError } from '../../../core/errors';

describe('Privacy, Discreet Shipping & Logistics Service', () => {
  let logisticsService: LogisticsShippingService;

  const mockShipmentInput: CreateShipmentInput = {
    orderId: 'ord_mock_logistics_101',
    orderNumber: 'AURA-20261110-8812',
    courierPartner: 'DELHIVERY',
    weightGrams: 500,
    shippingAddress: {
      fullName: 'Vikram Mehta',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400001',
    },
  };

  beforeEach(() => {
    logisticsService = new LogisticsShippingService();
    logisticsService.clear();
    orderProcessingService.clear();
  });

  it('should be registered in the CoreServiceRegistry', () => {
    const service = coreRegistry.get<LogisticsShippingService>(CoreServiceNames.LOGISTICS_SHIPPING);
    expect(service).toBeDefined();
    expect(service).toBe(logisticsShippingService);
  });

  describe('Indian Postal PIN Code Validation', () => {
    it('should validate 6-digit Indian PIN codes and return serviceability details', () => {
      const mumbai = logisticsService.validatePostalPincode('400001');
      expect(mumbai.pincode).toBe('400001');
      expect(mumbai.city).toBe('Mumbai');
      expect(mumbai.isServiceable).toBe(true);
      expect(mumbai.isCodAvailable).toBe(true);
    });

    it('should throw ValidationError on malformed or non-6-digit PIN codes', () => {
      expect(() => logisticsService.validatePostalPincode('40001')).toThrow(ValidationError); // 5 digits
      expect(() => logisticsService.validatePostalPincode('4000001')).toThrow(ValidationError); // 7 digits
      expect(() => logisticsService.validatePostalPincode('012345')).toThrow(ValidationError); // Starts with 0
      expect(() => logisticsService.validatePostalPincode('ABCDEF')).toThrow(ValidationError);
    });
  });

  describe('Discreet Packaging & Neutral Shipping Standards (BR-08)', () => {
    it('should enforce neutral sender declared name and commodity description', async () => {
      const shipment = await logisticsService.createShipment(mockShipmentInput);

      expect(shipment.awbNumber).toMatch(/^AWB-DEL-\d{6}$/);
      expect(shipment.status).toBe('LABEL_CREATED');
      expect(shipment.senderDeclaredName).toBe('Aura Retail & Lifestyle');
      expect(shipment.packageDescription).toBe('Personal Grooming & Wellness Kits');
    });

    it('should generate compliant plain brown box shipping label', async () => {
      const shipment = await logisticsService.createShipment(mockShipmentInput);
      const label = logisticsService.generateDiscreetShippingLabel(shipment.id);

      expect(label.awbNumber).toBe(shipment.awbNumber);
      expect(label.sender.name).toBe('Aura Retail & Lifestyle');
      expect(label.declaredContents).toBe('Personal Grooming & Wellness Kits');
      expect(label.packageType).toBe('Plain Brown Corrugated Box with Tamper-Evident Tape');
      expect(label.recipient.name).toBe('Vikram Mehta');
      expect(label.recipient.city).toBe('Mumbai');
    });
  });

  describe('Courier Webhook Ingestion & Order Synchronization', () => {
    it('should update shipment and synchronize Order state upon DELIVERED webhook event', async () => {
      // 1. Create matching order in OrderProcessingService
      const order = await orderProcessingService.createOrder({
        userId: 'user_logistics_test',
        shippingAddress: {
          fullName: 'Vikram Mehta',
          phone: '+919876543210',
          addressLine1: 'Colaba Causeway',
          city: 'Mumbai',
          state: 'Maharashtra',
          postalCode: '400001',
        },
        items: [
          {
            variantId: 'v1',
            sku: 'AURA-DUAL-ROSE',
            titleSnapshot: 'Personal Grooming Kit',
            unitPricePaise: 299900,
            quantity: 1,
          },
        ],
        subtotalPaise: 299900,
        totalAmountPaise: 299900,
        paymentMethod: 'PREPAID_UPI',
      });

      await orderProcessingService.confirmOrder(order.id);
      await orderProcessingService.updateOrderStatus(order.id, 'PROCESSING');

      // 2. Create shipment with orderId
      const shipment = await logisticsService.createShipment({
        ...mockShipmentInput,
        orderId: order.id,
      });

      // 3. Process DELIVERED webhook
      const webhookResult = await logisticsService.processCourierWebhook({
        awbNumber: shipment.awbNumber,
        currentStatus: 'DELIVERED',
        timestamp: new Date().toISOString(),
        location: 'Mumbai Hub',
      });

      expect(webhookResult.success).toBe(true);
      expect(webhookResult.shipment.status).toBe('DELIVERED');
      expect(webhookResult.shipment.deliveredAt).toBeDefined();

      // 4. Verify Order was synchronized to DELIVERED
      const updatedOrder = orderProcessingService.getOrder(order.id);
      expect(updatedOrder?.status).toBe('DELIVERED');
      expect(updatedOrder?.deliveredAt).toBeDefined(); // 24-hr DOA timer started!
    });

    it('should reject webhook with invalid authentication token', async () => {
      const shipment = await logisticsService.createShipment(mockShipmentInput);

      await expect(
        logisticsService.processCourierWebhook(
          {
            awbNumber: shipment.awbNumber,
            currentStatus: 'IN_TRANSIT',
            timestamp: new Date().toISOString(),
          },
          'invalid_secret_token'
        )
      ).rejects.toThrow(UnauthorizedError);
    });
  });
});
