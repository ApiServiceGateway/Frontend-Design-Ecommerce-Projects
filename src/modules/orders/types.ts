/**
 * Orders, Invoicing & Fulfillment Domain Types
 */

import { OrderStatus, PaymentMethod } from '@prisma/client';

export interface OrderItemSnapshot {
  variantId: string;
  sku: string;
  titleSnapshot: string;
  unitPricePaise: number;
  quantity: number;
}

export interface ShippingAddressSnapshot {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  deliveryInstructions?: string;
}

export interface OrderRecord {
  id: string;
  orderNumber: string; // "AURA-YYYYMMDD-XXXX"
  userId: string;
  shippingAddress: ShippingAddressSnapshot;
  items: OrderItemSnapshot[];
  subtotalPaise: number;
  discountPaise: number;
  codFeePaise: number;
  giftCardDeductionPaise: number;
  storeCreditDeductionPaise: number;
  totalAmountPaise: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  isOtpVerified: boolean;
  notes?: string;
  deliveredAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderInput {
  userId: string;
  shippingAddress: ShippingAddressSnapshot;
  items: OrderItemSnapshot[];
  subtotalPaise: number;
  discountPaise?: number;
  codFeePaise?: number;
  giftCardDeductionPaise?: number;
  storeCreditDeductionPaise?: number;
  totalAmountPaise: number;
  paymentMethod: PaymentMethod;
  notes?: string;
}

export interface DiscreteTaxInvoice {
  invoiceNumber: string; // "INV-AURA-20261110-XXXX"
  orderNumber: string;
  invoiceDate: string;
  sellerDetails: {
    legalEntityName: string; // "Aura Retail & Lifestyle" (BR-06)
    tradeCategory: string; // "Personal Grooming & Wellness Appliances"
    gstin: string;
    state: string;
  };
  buyerDetails: {
    fullName: string;
    city: string;
    state: string;
    postalCode: string;
  };
  lineItems: Array<{
    hsnCode: string; // e.g. "39269099"
    itemDescription: string;
    quantity: number;
    unitPricePaise: number;
    taxableAmountPaise: number;
  }>;
  taxBreakdown: {
    isInterState: boolean;
    cgstPaise: number;
    sgstPaise: number;
    igstPaise: number;
    totalTaxPaise: number;
  };
  financialSummary: {
    subtotalPaise: number;
    discountPaise: number;
    codFeePaise: number;
    totalAmountPaise: number;
  };
  legalNotice: string;
}
