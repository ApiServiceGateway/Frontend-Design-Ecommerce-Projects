import { describe, it, expect, beforeEach } from 'vitest';
import {
  CheckoutPricingService,
  checkoutPricingService,
} from '../checkout.service';
import { CartItem } from '../types';
import { coreRegistry } from '../../../core/registry';
import { CoreServiceNames } from '../../../core/contracts/service-names';
import { inventoryReservationService } from '../../inventory/inventory.service';
import { StockUnavailableError, ValidationError, AppError } from '../../../core/errors';

describe('Cart, Anti-RTO Checkout & Pricing Engine', () => {
  let checkoutService: CheckoutPricingService;

  const mockCartItems: CartItem[] = [
    {
      variantId: 'var_rose_1',
      sku: 'AURA-DUAL-ROSE',
      title: 'Aura Dual Sonic Stimulator',
      unitPricePaise: 299900, // ₹2,999.00
      quantity: 1,
    },
  ];

  beforeEach(() => {
    checkoutService = new CheckoutPricingService();
    // Seed inventory for test
    inventoryReservationService.clear();
    inventoryReservationService.setInventoryItem({
      id: 'inv_1',
      variantId: 'var_rose_1',
      sku: 'AURA-DUAL-ROSE',
      availableStock: 5,
      reservedStock: 0,
      lowStockThreshold: 2,
      version: 0,
      updatedAt: new Date().toISOString(),
    });
  });

  it('should be registered in the CoreServiceRegistry', () => {
    const service = coreRegistry.get<CheckoutPricingService>(CoreServiceNames.CHECKOUT_PRICING);
    expect(service).toBeDefined();
    expect(service).toBe(checkoutPricingService);
  });

  describe('Anti-RTO & Pricing Calculations (Integer Paise)', () => {
    it('should apply 5% prepaid discount on PREPAID_UPI payment (BR-04)', () => {
      // ₹2,999.00 = 299900 paise. 5% discount = 14995 paise. Net = 284905 paise.
      const pricing = checkoutService.calculatePricing({
        items: mockCartItems,
        paymentMethod: 'PREPAID_UPI',
      });

      expect(pricing.subtotalPaise).toBe(299900);
      expect(pricing.prepaidDiscountPaise).toBe(14995);
      expect(pricing.codFeePaise).toBe(0);
      expect(pricing.netPayablePaise).toBe(299900 - 14995);
      expect(pricing.neutralBillingDescriptor).toBe('Aura Retail & Lifestyle');
    });

    it('should apply flat ₹50 (5,000 paise) COD convenience surcharge on COD payment (BR-03)', () => {
      // ₹2,999.00 = 299900 paise. COD fee = 5000 paise. Net = 304900 paise.
      const pricing = checkoutService.calculatePricing({
        items: mockCartItems,
        paymentMethod: 'COD',
      });

      expect(pricing.subtotalPaise).toBe(299900);
      expect(pricing.prepaidDiscountPaise).toBe(0);
      expect(pricing.codFeePaise).toBe(5000);
      expect(pricing.netPayablePaise).toBe(304900);
    });

    it('should apply flat promotional coupon (e.g. AURAFLAT200 = ₹200 off)', () => {
      const pricing = checkoutService.calculatePricing({
        items: mockCartItems,
        paymentMethod: 'PREPAID_UPI',
        couponCode: 'AURAFLAT200', // ₹200 off on >= ₹999
      });

      expect(pricing.appliedCouponCode).toBe('AURAFLAT200');
      expect(pricing.couponDiscountPaise).toBe(20000); // 20,000 paise = ₹200
      // Net: Subtotal (299900) - 5% Prepaid (14995) - Coupon (20000) = 264905
      expect(pricing.netPayablePaise).toBe(299900 - 14995 - 20000);
    });

    it('should reject coupon if cart subtotal is less than coupon minCartPaise', () => {
      const cheapItem: CartItem[] = [
        {
          variantId: 'var_lube_1',
          sku: 'AURA-LUBE-50ML',
          title: 'Organic Water-Based Lubricant',
          unitPricePaise: 49900, // ₹499
          quantity: 1,
        },
      ];

      expect(() =>
        checkoutService.calculatePricing({
          items: cheapItem,
          paymentMethod: 'PREPAID_UPI',
          couponCode: 'AURAFLAT200', // Min cart is ₹999
        })
      ).toThrow('requires a minimum cart subtotal of ₹999');
    });

    it('should handle partial gift card balance deduction and track remaining balance', () => {
      // Order payable is ~₹2,849.05 (284905 paise). Gift card balance: ₹5,000 (500000 paise).
      const pricing = checkoutService.calculatePricing({
        items: mockCartItems,
        paymentMethod: 'PREPAID_UPI',
        giftCard: {
          cardCode: 'AURA-GIFT-8888',
          balancePaise: 500000,
        },
      });

      const expectedPayableBeforeGiftCard = 299900 - 14995; // 284905
      expect(pricing.giftCardDeductionPaise).toBe(expectedPayableBeforeGiftCard);
      expect(pricing.netPayablePaise).toBe(0); // Fully covered
      expect(pricing.remainingGiftCardBalancePaise).toBe(500000 - expectedPayableBeforeGiftCard);
    });

    it('should stack Store Credit voucher with prepaid discount', () => {
      const pricing = checkoutService.calculatePricing({
        items: mockCartItems,
        paymentMethod: 'PREPAID_UPI',
        storeCredit: {
          voucherCode: 'AURA-VOUCH-100',
          balancePaise: 100000, // ₹1,000 credit
        },
      });

      expect(pricing.storeCreditDeductionPaise).toBe(100000);
      expect(pricing.netPayablePaise).toBe(299900 - 14995 - 100000);
    });

    it('should disallow COD for high-value orders exceeding ₹5,000 limit', () => {
      const expensiveItems: CartItem[] = [
        {
          variantId: 'var_luxury_wand',
          sku: 'AURA-LUXURY-WAND',
          title: 'Aura Luxury Titanium Wand',
          unitPricePaise: 799900, // ₹7,999.00 (> ₹5,000)
          quantity: 1,
        },
      ];

      const pricing = checkoutService.calculatePricing({
        items: expensiveItems,
        paymentMethod: 'COD',
      });

      expect(pricing.isCodEligible).toBe(false);
    });

    it('should throw ValidationError on empty cart', () => {
      expect(() =>
        checkoutService.calculatePricing({
          items: [],
          paymentMethod: 'PREPAID_UPI',
        })
      ).toThrow(ValidationError);
    });
  });

  describe('Initiate Checkout & 30-Minute Hold Coordination', () => {
    it('should reserve stock for all cart items during checkout initiation', async () => {
      const result = await checkoutService.initiateCheckout({
        orderId: 'ORDER_AURA_9901',
        customerId: 'cust_88',
        shippingAddressId: 'addr_1',
        items: mockCartItems,
        paymentMethod: 'PREPAID_UPI',
      });

      expect(result.orderId).toBe('ORDER_AURA_9901');
      expect(result.pricing.netPayablePaise).toBe(299900 - 14995);
      expect(result.reservedReservations.length).toBe(1);

      // Verify stock was locked in inventory service
      const item = inventoryReservationService.getInventoryItem('AURA-DUAL-ROSE');
      expect(item?.availableStock).toBe(4); // 5 - 1 = 4
      expect(item?.reservedStock).toBe(1);
    });

    it('should rollback any reserved items if an item fails reservation', async () => {
      // Add second item with 0 available stock
      inventoryReservationService.setInventoryItem({
        id: 'inv_2',
        variantId: 'var_out_of_stock',
        sku: 'AURA-OUT-OF-STOCK',
        availableStock: 0,
        reservedStock: 0,
        lowStockThreshold: 1,
        version: 0,
        updatedAt: new Date().toISOString(),
      });

      const multiItems: CartItem[] = [
        mockCartItems[0], // In stock (5 available)
        {
          variantId: 'var_out_of_stock',
          sku: 'AURA-OUT-OF-STOCK',
          title: 'Sold Out Item',
          unitPricePaise: 199900,
          quantity: 1,
        },
      ];

      await expect(
        checkoutService.initiateCheckout({
          orderId: 'ORDER_ROLLBACK_TEST',
          customerId: 'cust_88',
          shippingAddressId: 'addr_1',
          items: multiItems,
          paymentMethod: 'PREPAID_UPI',
        })
      ).rejects.toThrow(StockUnavailableError);

      // Verify first item reservation was rolled back!
      const firstItem = inventoryReservationService.getInventoryItem('AURA-DUAL-ROSE');
      expect(firstItem?.availableStock).toBe(5); // Restored to 5
      expect(firstItem?.reservedStock).toBe(0);
    });

    it('should throw error when attempting initiateCheckout with COD on order > ₹5,000', async () => {
      const expensiveItems: CartItem[] = [
        {
          variantId: 'var_rose_1',
          sku: 'AURA-DUAL-ROSE',
          title: 'Aura Dual Sonic Stimulator',
          unitPricePaise: 600000, // ₹6,000 (> ₹5,000)
          quantity: 1,
        },
      ];

      await expect(
        checkoutService.initiateCheckout({
          orderId: 'ORDER_HIGH_COD',
          customerId: 'cust_88',
          shippingAddressId: 'addr_1',
          items: expensiveItems,
          paymentMethod: 'COD',
        })
      ).rejects.toThrow(AppError);
    });
  });
});
