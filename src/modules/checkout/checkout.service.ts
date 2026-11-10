import { coreRegistry } from '../../core/registry';
import { CoreServiceNames } from '../../core/contracts/service-names';
import { AppError, ValidationError } from '../../core/errors';
import { InventoryReservationService } from '../inventory/inventory.service';
import {
  CalculateOrderPricingInput,
  CheckoutPricingBreakdown,
  CouponRule,
  InitiateCheckoutInput,
  InitiateCheckoutResult,
} from './types';

export class CheckoutPricingService {
  private couponsStore = new Map<string, CouponRule>();

  constructor() {
    this.seedDefaultPromotions();
  }

  /**
   * Seed standard promotional coupons
   */
  private seedDefaultPromotions(): void {
    this.couponsStore.set('AURAWELCOME', {
      code: 'AURAWELCOME',
      discountType: 'PERCENTAGE',
      discountValue: 10, // 10% Off
      maxDiscountPaise: 50000, // Capped at ₹500
      minCartPaise: 150000, // Valid on orders >= ₹1,500
      validUntil: '2027-12-31T23:59:59.000Z',
      isActive: true,
    });

    this.couponsStore.set('AURAFLAT200', {
      code: 'AURAFLAT200',
      discountType: 'FLAT_AMOUNT',
      discountValue: 20000, // Flat ₹200 off
      minCartPaise: 99900, // Orders >= ₹999
      validUntil: '2027-12-31T23:59:59.000Z',
      isActive: true,
    });
  }

  /**
   * Add or update an administrative coupon rule
   */
  public addCoupon(coupon: CouponRule): void {
    this.couponsStore.set(coupon.code.toUpperCase().trim(), {
      ...coupon,
      code: coupon.code.toUpperCase().trim(),
    });
  }

  /**
   * Look up a coupon code
   */
  public getCoupon(code: string): CouponRule | undefined {
    return this.couponsStore.get(code.toUpperCase().trim());
  }

  /**
   * Calculate deterministic pricing breakdown conforming to Indian E-Commerce & Anti-RTO rules
   */
  public calculatePricing(input: CalculateOrderPricingInput): CheckoutPricingBreakdown {
    const { items, paymentMethod, couponCode, giftCard, storeCredit } = input;

    if (!items || items.length === 0) {
      throw new ValidationError('Checkout cart cannot be empty.');
    }

    // 1. Calculate Base Subtotal (in integer Paise)
    let subtotalPaise = 0;
    for (const item of items) {
      if (item.unitPricePaise < 0 || item.quantity <= 0) {
        throw new ValidationError(`Invalid price or quantity for SKU: ${item.sku}`);
      }
      subtotalPaise += item.unitPricePaise * item.quantity;
    }

    // 2. Anti-RTO Prepaid Discount: 5% off on prepaid methods (BR-04)
    const isPrepaid =
      paymentMethod === 'PREPAID_UPI' ||
      paymentMethod === 'PREPAID_CARD' ||
      paymentMethod === 'PREPAID_NB';

    const prepaidDiscountPaise = isPrepaid ? Math.round(subtotalPaise * 0.05) : 0;

    // 3. Anti-RTO COD Convenience Fee: Flat ₹50 (5,000 paise) surcharge (BR-03)
    const codFeePaise = paymentMethod === 'COD' ? 5000 : 0;

    // 4. Promotional Coupon Discount Engine
    let couponDiscountPaise = 0;
    let appliedCouponCode: string | null = null;

    if (couponCode) {
      const normalizedCode = couponCode.toUpperCase().trim();
      const rule = this.couponsStore.get(normalizedCode);

      if (!rule || !rule.isActive) {
        throw new ValidationError(`Coupon '${couponCode}' is invalid or has expired.`);
      }

      if (new Date(rule.validUntil).getTime() < Date.now()) {
        throw new ValidationError(`Coupon '${couponCode}' has expired.`);
      }

      if (subtotalPaise < rule.minCartPaise) {
        const minRupees = Math.round(rule.minCartPaise / 100);
        throw new ValidationError(
          `Coupon '${couponCode}' requires a minimum cart subtotal of ₹${minRupees}.`
        );
      }

      appliedCouponCode = rule.code;
      if (rule.discountType === 'FLAT_AMOUNT') {
        couponDiscountPaise = Math.min(rule.discountValue, subtotalPaise);
      } else if (rule.discountType === 'PERCENTAGE') {
        const calculatedPercent = Math.round(subtotalPaise * (rule.discountValue / 100));
        couponDiscountPaise = rule.maxDiscountPaise
          ? Math.min(calculatedPercent, rule.maxDiscountPaise)
          : calculatedPercent;
      }
    }

    // 5. Compute running payable balance before store balances
    let runningPayable =
      subtotalPaise - prepaidDiscountPaise - couponDiscountPaise + codFeePaise;
    runningPayable = Math.max(0, runningPayable);

    // 6. Store Credit Voucher Deduction (treated as cash balance)
    let storeCreditDeductionPaise = 0;
    let appliedStoreCreditCode: string | null = null;

    if (storeCredit && storeCredit.balancePaise > 0 && runningPayable > 0) {
      appliedStoreCreditCode = storeCredit.voucherCode;
      storeCreditDeductionPaise = Math.min(runningPayable, storeCredit.balancePaise);
      runningPayable -= storeCreditDeductionPaise;
    }

    // 7. Gift Card Voucher Deduction (supports partial redemption)
    let giftCardDeductionPaise = 0;
    let appliedGiftCardCode: string | null = null;
    let remainingGiftCardBalancePaise: number | undefined = undefined;

    if (giftCard && giftCard.balancePaise > 0 && runningPayable > 0) {
      appliedGiftCardCode = giftCard.cardCode;
      giftCardDeductionPaise = Math.min(runningPayable, giftCard.balancePaise);
      remainingGiftCardBalancePaise = giftCard.balancePaise - giftCardDeductionPaise;
      runningPayable -= giftCardDeductionPaise;
    } else if (giftCard) {
      remainingGiftCardBalancePaise = giftCard.balancePaise;
    }

    // 8. Net Payable in Paise
    const netPayablePaise = Math.max(0, runningPayable);

    // High cart COD guard (> ₹5,000 orders require prepaid to prevent RTO losses)
    const isCodEligible = subtotalPaise <= 500000;

    return {
      subtotalPaise,
      prepaidDiscountPaise,
      codFeePaise,
      couponDiscountPaise,
      appliedCouponCode,
      giftCardDeductionPaise,
      appliedGiftCardCode,
      remainingGiftCardBalancePaise,
      storeCreditDeductionPaise,
      appliedStoreCreditCode,
      netPayablePaise,
      isCodEligible,
      neutralBillingDescriptor: 'Aura Retail & Lifestyle', // BR-06
    };
  }

  /**
   * Initiates checkout, computes pricing, and acquires 30-minute stock locks
   * across all items with automated rollback if any lock fails.
   */
  public async initiateCheckout(input: InitiateCheckoutInput): Promise<InitiateCheckoutResult> {
    const { items, orderId } = input;

    // 1. Calculate pricing
    const pricing = this.calculatePricing(input);

    // 2. COD Guard enforcement
    if (input.paymentMethod === 'COD' && !pricing.isCodEligible) {
      throw new AppError(
        'Cash on Delivery is unavailable for orders exceeding ₹5,000. Please choose prepaid UPI or Cards to enjoy a 5% discount.',
        400,
        'COD_LIMIT_EXCEEDED'
      );
    }

    // 3. Coordinate with InventoryReservationService via Core Registry
    const inventoryService = coreRegistry.get<InventoryReservationService>(
      CoreServiceNames.INVENTORY_RESERVATION
    );

    const reservedReservationIds: string[] = [];
    let expirationTimestamp = '';

    try {
      for (const item of items) {
        const res = await inventoryService.reserveStock({
          orderId,
          variantId: item.variantId,
          sku: item.sku,
          quantity: item.quantity,
          holdDurationMinutes: 30, // BR-05
        });
        reservedReservationIds.push(res.id);
        expirationTimestamp = res.expiresAt;
      }
    } catch (err) {
      // Rollback any acquired reservations on failure
      for (const resId of reservedReservationIds) {
        await inventoryService.releaseReservation({
          reservationId: resId,
          reason: 'USER_CANCELLED',
        });
      }
      throw err;
    }

    return {
      orderId,
      pricing,
      reservedReservations: reservedReservationIds,
      expiresAt: expirationTimestamp,
    };
  }
}

// Export singleton instance and register to coreRegistry
export const checkoutPricingService = new CheckoutPricingService();
coreRegistry.register(CoreServiceNames.CHECKOUT_PRICING, checkoutPricingService);
