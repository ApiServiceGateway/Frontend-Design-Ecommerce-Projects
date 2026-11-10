import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  OrderProcessingService,
  orderProcessingService,
} from '../orders.service';
import { CreateOrderInput } from '../types';
import { coreRegistry } from '../../../core/registry';
import { CoreServiceNames } from '../../../core/contracts/service-names';
import { coreEventBus } from '../../../core/event-bus';
import { AppError, ValidationError } from '../../../core/errors';

describe('Orders, Invoicing & State Machine Service', () => {
  let ordersService: OrderProcessingService;

  const mockOrderInput: CreateOrderInput = {
    userId: 'cust_order_test_1',
    shippingAddress: {
      fullName: 'Rahul Sharma',
      phone: '+919876543210',
      addressLine1: 'Flat 402, Lotus Towers, Andheri West',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400053',
    },
    items: [
      {
        variantId: 'var_rose_1',
        sku: 'AURA-DUAL-ROSE',
        titleSnapshot: 'Personal Wellness Massager - Rose Gold',
        unitPricePaise: 299900,
        quantity: 1,
      },
    ],
    subtotalPaise: 299900,
    discountPaise: 14995, // 5% Prepaid discount
    codFeePaise: 0,
    totalAmountPaise: 284905,
    paymentMethod: 'PREPAID_UPI',
  };

  beforeEach(() => {
    ordersService = new OrderProcessingService();
    ordersService.clear();
  });

  it('should be registered in the CoreServiceRegistry', () => {
    const service = coreRegistry.get<OrderProcessingService>(CoreServiceNames.ORDER_PROCESSING);
    expect(service).toBeDefined();
    expect(service).toBe(orderProcessingService);
  });

  describe('Order Creation & Number Generation', () => {
    it('should generate order number conforming to AURA-YYYYMMDD-XXXX format', () => {
      const orderNumber = ordersService.generateOrderNumber(new Date('2026-11-10'));
      expect(orderNumber).toMatch(/^AURA-20261110-\d{4}$/);
    });

    it('should create order in PENDING_PAYMENT status', async () => {
      const order = await ordersService.createOrder(mockOrderInput);

      expect(order.id).toBeDefined();
      expect(order.orderNumber).toMatch(/^AURA-\d{8}-\d{4}$/);
      expect(order.status).toBe('PENDING_PAYMENT');
      expect(order.totalAmountPaise).toBe(284905);
      expect(order.items.length).toBe(1);
    });

    it('should throw ValidationError on empty items list', async () => {
      await expect(
        ordersService.createOrder({
          ...mockOrderInput,
          items: [],
        })
      ).rejects.toThrow(ValidationError);
    });
  });

  describe('Order Confirmation & Event Bus Integration', () => {
    it('should transition to CONFIRMED and emit ORDER_CONFIRMED event on Core Event Bus', async () => {
      const emitSpy = vi.spyOn(coreEventBus, 'emit');

      const created = await ordersService.createOrder(mockOrderInput);
      const confirmed = await ordersService.confirmOrder(created.id);

      expect(confirmed.status).toBe('CONFIRMED');
      expect(confirmed.isOtpVerified).toBe(true);

      expect(emitSpy).toHaveBeenCalledWith(
        'ORDER_CONFIRMED',
        expect.objectContaining({
          orderId: created.id,
          orderNumber: created.orderNumber,
          totalAmountPaise: 284905,
          customerId: 'cust_order_test_1',
        })
      );
    });

    it('should throw error when attempting to confirm an already confirmed order', async () => {
      const created = await ordersService.createOrder(mockOrderInput);
      await ordersService.confirmOrder(created.id);

      await expect(ordersService.confirmOrder(created.id)).rejects.toThrow(AppError);
    });
  });

  describe('State Machine Transitions', () => {
    it('should transition through full fulfillment lifecycle cleanly', async () => {
      const order = await ordersService.createOrder(mockOrderInput);

      // PENDING_PAYMENT -> CONFIRMED
      await ordersService.confirmOrder(order.id);

      // CONFIRMED -> PROCESSING
      const processing = await ordersService.updateOrderStatus(order.id, 'PROCESSING');
      expect(processing.status).toBe('PROCESSING');

      // PROCESSING -> DISPATCHED
      const dispatched = await ordersService.updateOrderStatus(order.id, 'DISPATCHED');
      expect(dispatched.status).toBe('DISPATCHED');

      // DISPATCHED -> OUT_FOR_DELIVERY
      const outForDelivery = await ordersService.updateOrderStatus(order.id, 'OUT_FOR_DELIVERY');
      expect(outForDelivery.status).toBe('OUT_FOR_DELIVERY');

      // OUT_FOR_DELIVERY -> DELIVERED
      const delivered = await ordersService.updateOrderStatus(order.id, 'DELIVERED');
      expect(delivered.status).toBe('DELIVERED');
      expect(delivered.deliveredAt).toBeDefined(); // Starts 24h DOA timer!

      // DELIVERED -> COMPLETED
      const completed = await ordersService.updateOrderStatus(order.id, 'COMPLETED');
      expect(completed.status).toBe('COMPLETED');
    });

    it('should throw error on illegal state transitions (e.g. PENDING_PAYMENT to DELIVERED)', async () => {
      const order = await ordersService.createOrder(mockOrderInput);

      await expect(ordersService.updateOrderStatus(order.id, 'DELIVERED')).rejects.toThrow(
        'Illegal transition'
      );
    });
  });

  describe('Customer Cancellation Guard', () => {
    it('should allow customer to cancel order before dispatch', async () => {
      const order = await ordersService.createOrder(mockOrderInput);
      await ordersService.confirmOrder(order.id);

      const cancelled = await ordersService.cancelOrderByCustomer(order.id, 'cust_order_test_1');
      expect(cancelled.status).toBe('CANCELLED_BY_USER');
    });

    it('should disallow customer from cancelling once order is DISPATCHED', async () => {
      const order = await ordersService.createOrder(mockOrderInput);
      await ordersService.confirmOrder(order.id);
      await ordersService.updateOrderStatus(order.id, 'PROCESSING');
      await ordersService.updateOrderStatus(order.id, 'DISPATCHED');

      await expect(
        ordersService.cancelOrderByCustomer(order.id, 'cust_order_test_1')
      ).rejects.toThrow('Order has already been dispatched');
    });

    it('should reject cancellation from unauthorized users', async () => {
      const order = await ordersService.createOrder(mockOrderInput);

      await expect(
        ordersService.cancelOrderByCustomer(order.id, 'attacker_user_id')
      ).rejects.toThrow('permission to cancel');
    });
  });

  describe('Discrete GST Tax Invoice Generation (BR-06)', () => {
    it('should generate compliant intrastate GST tax invoice for Maharashtra buyers (CGST 9% + SGST 9%)', async () => {
      const order = await ordersService.createOrder(mockOrderInput);
      const invoice = ordersService.generateTaxInvoice(order.id);

      expect(invoice.invoiceNumber).toBe(`INV-${order.orderNumber}`);
      expect(invoice.sellerDetails.legalEntityName).toBe('Aura Retail & Lifestyle');
      expect(invoice.sellerDetails.tradeCategory).toBe('Personal Grooming & Wellness Appliances');
      expect(invoice.sellerDetails.gstin).toBe('27AABCA1234F1Z5');

      // Check tax split (Intrastate)
      expect(invoice.taxBreakdown.isInterState).toBe(false);
      expect(invoice.taxBreakdown.cgstPaise).toBeGreaterThan(0);
      expect(invoice.taxBreakdown.sgstPaise).toBeGreaterThan(0);
      expect(invoice.taxBreakdown.igstPaise).toBe(0);

      // Neutral item description
      expect(invoice.lineItems[0].itemDescription).toBe('Personal Wellness Massager - Rose Gold');
      expect(invoice.lineItems[0].hsnCode).toBe('39269099');
    });

    it('should generate interstate GST tax invoice (IGST 18%) for buyers outside Maharashtra', async () => {
      const interstateOrderInput: CreateOrderInput = {
        ...mockOrderInput,
        shippingAddress: {
          ...mockOrderInput.shippingAddress,
          state: 'Karnataka',
          city: 'Bengaluru',
          postalCode: '560001',
        },
      };

      const order = await ordersService.createOrder(interstateOrderInput);
      const invoice = ordersService.generateTaxInvoice(order.id);

      expect(invoice.taxBreakdown.isInterState).toBe(true);
      expect(invoice.taxBreakdown.igstPaise).toBeGreaterThan(0);
      expect(invoice.taxBreakdown.cgstPaise).toBe(0);
      expect(invoice.taxBreakdown.sgstPaise).toBe(0);
    });
  });
});
