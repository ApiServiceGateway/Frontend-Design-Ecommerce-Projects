/**
 * Cart, Checkout & Pricing Domain Types
 */

export type PaymentMethodType =
  | 'PREPAID_UPI'
  | 'PREPAID_CARD'
  | 'PREPAID_NB'
  | 'COD'
  | 'GIFT_CARD'
  | 'STORE_CREDIT';

export interface CartItem {
  variantId: string;
  sku: string;
  title: string;
  unitPricePaise: number;
  quantity: number;
  imageThumbnailUrl?: string;
}

export interface CouponRule {
  code: string;
  discountType: 'FLAT_AMOUNT' | 'PERCENTAGE';
  discountValue: number; // Flat paise or percentage (e.g., 15 for 15%)
  maxDiscountPaise?: number; // Cap for percentage discounts
  minCartPaise: number;
  validUntil: string; // ISO date
  isActive: boolean;
}

export interface GiftCardDeductionInput {
  cardCode: string;
  balancePaise: number;
}

export interface StoreCreditDeductionInput {
  voucherCode: string;
  balancePaise: number;
}

export interface CheckoutPricingBreakdown {
  subtotalPaise: number;
  prepaidDiscountPaise: number; // 5% discount (BR-04)
  codFeePaise: number; // ₹50 flat (BR-03)
  couponDiscountPaise: number;
  appliedCouponCode?: string | null;
  giftCardDeductionPaise: number;
  appliedGiftCardCode?: string | null;
  remainingGiftCardBalancePaise?: number;
  storeCreditDeductionPaise: number;
  appliedStoreCreditCode?: string | null;
  netPayablePaise: number;
  isCodEligible: boolean;
  neutralBillingDescriptor: string; // "Aura Retail & Lifestyle" (BR-06)
}

export interface CalculateOrderPricingInput {
  items: CartItem[];
  paymentMethod: PaymentMethodType;
  couponCode?: string;
  giftCard?: GiftCardDeductionInput;
  storeCredit?: StoreCreditDeductionInput;
}

export interface InitiateCheckoutInput extends CalculateOrderPricingInput {
  orderId: string;
  customerId: string;
  shippingAddressId: string;
}

export interface InitiateCheckoutResult {
  orderId: string;
  pricing: CheckoutPricingBreakdown;
  reservedReservations: string[]; // List of reservation IDs held for 30 minutes
  expiresAt: string; // 30-min expiration timestamp
}
