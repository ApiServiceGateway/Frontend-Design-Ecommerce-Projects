/**
 * Core Event System Types & Payloads
 * All decoupled asynchronous communication between domain services flows through these event definitions.
 */

export interface BaseEventPayload {
  eventId: string;
  timestamp: string; // ISO 8601
  correlationId?: string;
}

export interface OrderConfirmedEventPayload extends BaseEventPayload {
  orderId: string;
  orderNumber: string;
  customerId: string;
  customerPhone: string;
  customerEmail: string;
  totalAmountPaise: number;
  paymentMethod: 'PREPAID_UPI' | 'PREPAID_CARD' | 'PREPAID_NB' | 'COD';
  shippingAddress: {
    fullName: string;
    phone: string;
    addressLine1: string;
    city: string;
    state: string;
    postalCode: string;
  };
  items: Array<{
    sku: string;
    title: string;
    quantity: number;
    unitPricePaise: number;
  }>;
}

export interface StockReservedEventPayload extends BaseEventPayload {
  orderId: string;
  sku: string;
  quantity: number;
  expiresAt: string; // 30 minutes TTL
}

export interface StockReleasedEventPayload extends BaseEventPayload {
  orderId: string;
  sku: string;
  quantity: number;
  reason: 'PAYMENT_EXPIRED' | 'USER_CANCELLED';
}

export interface ProductUpdatedEventPayload extends BaseEventPayload {
  productId: string;
  slug: string;
  manualLabel?: string;
  rankWeight?: number;
}

export interface WarrantyClaimSubmittedEventPayload extends BaseEventPayload {
  claimId: string;
  orderId: string;
  customerId: string;
  variantId: string;
  videoUri: string;
  submittedAt: string;
}

/**
 * Mapping of Core Event Names to their strongly-typed payloads.
 */
export interface CoreEventMap {
  'ORDER_CONFIRMED': OrderConfirmedEventPayload;
  'STOCK_RESERVED': StockReservedEventPayload;
  'STOCK_RELEASED': StockReleasedEventPayload;
  'PRODUCT_UPDATED': ProductUpdatedEventPayload;
  'WARRANTY_CLAIM_SUBMITTED': WarrantyClaimSubmittedEventPayload;
  'ORDER_PAID': any;
  'CAMOUFLAGE_ACTIVATED': any;
}

export type CoreEventName = keyof CoreEventMap;
