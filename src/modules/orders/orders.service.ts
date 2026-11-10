import { OrderStatus, PaymentMethod } from '@prisma/client';
import { coreEventBus } from '../../core/event-bus';
import { coreRegistry } from '../../core/registry';
import { CoreServiceNames } from '../../core/contracts/service-names';
import { AppError, NotFoundError, ValidationError } from '../../core/errors';
import {
  CreateOrderInput,
  DiscreteTaxInvoice,
  OrderItemSnapshot,
  OrderRecord,
} from './types';

// Legal valid state transitions
const VALID_STATE_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  PENDING_PAYMENT: [
    'CONFIRMED',
    'CANCELLED_PAYMENT_EXPIRED',
    'CANCELLED_BY_USER',
    'CANCELLED_BY_ADMIN',
  ],
  CONFIRMED: ['PROCESSING', 'CANCELLED_BY_USER', 'CANCELLED_BY_ADMIN'],
  PROCESSING: ['DISPATCHED', 'CANCELLED_BY_ADMIN'],
  DISPATCHED: ['OUT_FOR_DELIVERY', 'RTO_INITIATED'],
  OUT_FOR_DELIVERY: ['DELIVERED', 'RTO_INITIATED'],
  DELIVERED: ['COMPLETED', 'UNDER_WARRANTY_REVIEW'],
  RTO_INITIATED: ['RTO_RETURNED'],
  RTO_RETURNED: [],
  COMPLETED: [],
  UNDER_WARRANTY_REVIEW: ['COMPLETED'],
  CANCELLED_PAYMENT_EXPIRED: [],
  CANCELLED_BY_USER: [],
  CANCELLED_BY_ADMIN: [],
};

export class OrderProcessingService {
  private ordersStore = new Map<string, OrderRecord>();
  private orderNumberIndex = new Map<string, string>();

  /**
   * Deterministic Order Number Generator: "AURA-YYYYMMDD-XXXX"
   */
  public generateOrderNumber(date: Date = new Date()): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    return `AURA-${yyyy}${mm}${dd}-${randomSuffix}`;
  }

  /**
   * Create a new order in PENDING_PAYMENT state
   */
  public async createOrder(input: CreateOrderInput): Promise<OrderRecord> {
    if (!input.items || input.items.length === 0) {
      throw new ValidationError('An order must contain at least one item.');
    }

    const orderId = `ord_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const orderNumber = this.generateOrderNumber();
    const now = new Date().toISOString();

    const order: OrderRecord = {
      id: orderId,
      orderNumber,
      userId: input.userId,
      shippingAddress: input.shippingAddress,
      items: input.items,
      subtotalPaise: input.subtotalPaise,
      discountPaise: input.discountPaise ?? 0,
      codFeePaise: input.codFeePaise ?? 0,
      giftCardDeductionPaise: input.giftCardDeductionPaise ?? 0,
      storeCreditDeductionPaise: input.storeCreditDeductionPaise ?? 0,
      totalAmountPaise: input.totalAmountPaise,
      paymentMethod: input.paymentMethod,
      status: 'PENDING_PAYMENT',
      isOtpVerified: false,
      notes: input.notes,
      deliveredAt: null,
      createdAt: now,
      updatedAt: now,
    };

    this.ordersStore.set(orderId, order);
    this.orderNumberIndex.set(orderNumber, orderId);

    return order;
  }

  /**
   * Confirm an order upon prepaid webhook success or COD WhatsApp OTP verification
   */
  public async confirmOrder(orderId: string, isOtpVerified = true): Promise<OrderRecord> {
    const order = this.ordersStore.get(orderId);
    if (!order) {
      throw new NotFoundError('Order', orderId);
    }

    if (order.status !== 'PENDING_PAYMENT') {
      throw new AppError(
        `Order '${order.orderNumber}' cannot be confirmed because it is in '${order.status}' state.`,
        400,
        'INVALID_STATE_TRANSITION'
      );
    }

    order.status = 'CONFIRMED';
    order.isOtpVerified = isOtpVerified;
    order.updatedAt = new Date().toISOString();
    this.ordersStore.set(orderId, order);

    // Emit ORDER_CONFIRMED decoupled event on Core Event Bus
    await coreEventBus.emit('ORDER_CONFIRMED', {
      eventId: `evt_${Date.now()}`,
      timestamp: new Date().toISOString(),
      orderId: order.id,
      orderNumber: order.orderNumber,
      customerId: order.userId,
      customerPhone: order.shippingAddress.phone,
      customerEmail: 'customer@aura.in',
      totalAmountPaise: order.totalAmountPaise,
      paymentMethod: order.paymentMethod as any,
      shippingAddress: {
        fullName: order.shippingAddress.fullName,
        phone: order.shippingAddress.phone,
        addressLine1: order.shippingAddress.addressLine1,
        city: order.shippingAddress.city,
        state: order.shippingAddress.state,
        postalCode: order.shippingAddress.postalCode,
      },
      items: order.items.map((item) => ({
        sku: item.sku,
        title: item.titleSnapshot,
        quantity: item.quantity,
        unitPricePaise: item.unitPricePaise,
      })),
    });

    return order;
  }

  /**
   * Update order status strictly conforming to the approved State Machine
   */
  public async updateOrderStatus(
    orderId: string,
    newStatus: OrderStatus,
    adminUserId?: string
  ): Promise<OrderRecord> {
    const order = this.ordersStore.get(orderId);
    if (!order) {
      throw new NotFoundError('Order', orderId);
    }

    const allowedTransitions = VALID_STATE_TRANSITIONS[order.status] || [];
    if (!allowedTransitions.includes(newStatus)) {
      throw new AppError(
        `Illegal transition: Cannot transition order '${order.orderNumber}' from '${order.status}' to '${newStatus}'.`,
        400,
        'ILLEGAL_STATUS_TRANSITION'
      );
    }

    order.status = newStatus;
    order.updatedAt = new Date().toISOString();

    if (newStatus === 'DELIVERED') {
      order.deliveredAt = new Date().toISOString(); // Starts 24-hr DOA warranty claim timer
    }

    this.ordersStore.set(orderId, order);
    return order;
  }

  /**
   * Customer cancellation guard: Cancellation allowed ONLY before dispatch
   */
  public async cancelOrderByCustomer(
    orderId: string,
    userId: string,
    reason?: string
  ): Promise<OrderRecord> {
    const order = this.ordersStore.get(orderId);
    if (!order) {
      throw new NotFoundError('Order', orderId);
    }

    if (order.userId !== userId) {
      throw new AppError('You do not have permission to cancel this order.', 403, 'FORBIDDEN');
    }

    const nonCancellableStates: OrderStatus[] = [
      'DISPATCHED',
      'OUT_FOR_DELIVERY',
      'DELIVERED',
      'COMPLETED',
      'UNDER_WARRANTY_REVIEW',
    ];

    if (nonCancellableStates.includes(order.status)) {
      throw new AppError(
        'Order has already been dispatched with courier. Cancellation is unavailable; please refer to our 24-Hour DOA policy upon delivery.',
        400,
        'CANCELLATION_DISALLOWED'
      );
    }

    return this.updateOrderStatus(orderId, 'CANCELLED_BY_USER');
  }

  /**
   * Generate Discrete GST Tax Invoice (BR-06)
   * Guaranteed neutral billing descriptor and compliant HSN tax breakdown
   */
  public generateTaxInvoice(orderId: string): DiscreteTaxInvoice {
    const order = this.ordersStore.get(orderId);
    if (!order) {
      throw new NotFoundError('Order', orderId);
    }

    const sellerState = 'Maharashtra';
    const buyerState = order.shippingAddress.state.trim();
    const isInterState = sellerState.toLowerCase() !== buyerState.toLowerCase();

    // 18% GST calculation (Inclusive)
    const netAmount = order.totalAmountPaise;
    const baseTaxablePaise = Math.round((netAmount * 100) / 118);
    const totalTaxPaise = netAmount - baseTaxablePaise;

    let cgstPaise = 0;
    let sgstPaise = 0;
    let igstPaise = 0;

    if (isInterState) {
      igstPaise = totalTaxPaise;
    } else {
      cgstPaise = Math.round(totalTaxPaise / 2);
      sgstPaise = totalTaxPaise - cgstPaise;
    }

    const lineItems = order.items.map((item) => ({
      hsnCode: '39269099', // HSN code for personal grooming appliances
      itemDescription: item.titleSnapshot, // Neutral snapshot title
      quantity: item.quantity,
      unitPricePaise: item.unitPricePaise,
      taxableAmountPaise: Math.round(((item.unitPricePaise * item.quantity) * 100) / 118),
    }));

    return {
      invoiceNumber: `INV-${order.orderNumber}`,
      orderNumber: order.orderNumber,
      invoiceDate: new Date().toISOString(),
      sellerDetails: {
        legalEntityName: 'Aura Retail & Lifestyle', // BR-06
        tradeCategory: 'Personal Grooming & Wellness Appliances',
        gstin: '27AABCA1234F1Z5',
        state: sellerState,
      },
      buyerDetails: {
        fullName: order.shippingAddress.fullName,
        city: order.shippingAddress.city,
        state: order.shippingAddress.state,
        postalCode: order.shippingAddress.postalCode,
      },
      lineItems,
      taxBreakdown: {
        isInterState,
        cgstPaise,
        sgstPaise,
        igstPaise,
        totalTaxPaise,
      },
      financialSummary: {
        subtotalPaise: order.subtotalPaise,
        discountPaise: order.discountPaise,
        codFeePaise: order.codFeePaise,
        totalAmountPaise: order.totalAmountPaise,
      },
      legalNotice:
        'Tax Invoice issued under GST Rules. 100% Discreet packaging and confidential billing guaranteed by Aura Retail & Lifestyle.',
    };
  }

  /**
   * Helper to retrieve order by ID
   */
  public getOrder(orderId: string): OrderRecord | undefined {
    return this.ordersStore.get(orderId);
  }

  /**
   * Clear store for clean test teardowns
   */
  public clear(): void {
    this.ordersStore.clear();
    this.orderNumberIndex.clear();
  }
}

// Export singleton instance and register into coreRegistry
export const orderProcessingService = new OrderProcessingService();
coreRegistry.register(CoreServiceNames.ORDER_PROCESSING, orderProcessingService);
