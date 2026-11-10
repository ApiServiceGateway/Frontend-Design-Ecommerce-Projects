import { describe, it, expect, beforeEach } from 'vitest';
import { GiftCardsService } from '../gift-cards.service';
import { AppError, ValidationError } from '@/core/errors';

describe('Gift Card Management Service (System 1 & Feature extraction)', () => {
  let service: GiftCardsService;

  beforeEach(() => {
    service = new GiftCardsService();
  });

  describe('issueGiftCard', () => {
    it('should successfully issue a valid gift card with 16-char code and 4-digit PIN', async () => {
      const result = await service.issueGiftCard({
        purchasedById: 'user_buyer_123',
        recipientEmail: 'partner@example.com',
        amountPaise: 250000, // ₹2,500.00
      });

      expect(result.rawCode).toMatch(/^AURA-GIFT-[A-Z0-9]{4}-[A-Z0-9]{4}$/);
      expect(result.giftCard.maskedCode).toMatch(/^AURA-GIFT-\*\*\*\*-[A-Z0-9]{4}$/);
      expect(result.rawPin).toHaveLength(4);
      expect(result.giftCard.balancePaise).toBe(250000);
      expect(result.giftCard.initialPaise).toBe(250000);
      expect(result.giftCard.isActive).toBe(true);

      const daysDiff = (new Date(result.giftCard.expiresAt).getTime() - new Date().getTime()) / (1000 * 3600 * 24);
      expect(Math.round(daysDiff)).toBe(365);
    });

    it('should reject gift card issue when amount is less than ₹500 (50,000 paise)', async () => {
      await expect(
        service.issueGiftCard({
          purchasedById: 'user_buyer_123',
          recipientEmail: 'partner@example.com',
          amountPaise: 40000, // ₹400
        })
      ).rejects.toThrow(ValidationError);
    });

    it('should reject gift card issue when amount exceeds ₹50,000 (5,000,000 paise)', async () => {
      await expect(
        service.issueGiftCard({
          purchasedById: 'user_buyer_123',
          recipientEmail: 'partner@example.com',
          amountPaise: 6000000, // ₹60,000
        })
      ).rejects.toThrow(ValidationError);
    });

    it('should reject when custom PIN is not 4 numeric digits', async () => {
      await expect(
        service.issueGiftCard({
          purchasedById: 'user_buyer_123',
          recipientEmail: 'partner@example.com',
          amountPaise: 100000,
          customPin: '12A4',
        })
      ).rejects.toThrow(ValidationError);
    });
  });

  describe('checkBalance', () => {
    it('should return correct balance and formatted INR string for valid code & PIN', async () => {
      const issued = await service.issueGiftCard({
        purchasedById: 'user_1',
        recipientEmail: 'friend@example.com',
        amountPaise: 500000, // ₹5,000.00
      });

      const balance = await service.checkBalance({
        code: issued.rawCode,
        pin: issued.rawPin,
      });

      expect(balance.balancePaise).toBe(500000);
      expect(balance.balanceFormatted).toBe('₹5,000.00');
      expect(balance.isActive).toBe(true);
      expect(balance.isExpired).toBe(false);
      expect(balance.maskedCode).toBe(issued.giftCard.maskedCode);
    });

    it('should throw 404 when card code does not exist', async () => {
      await expect(
        service.checkBalance({
          code: 'AURA-GIFT-FAKE-9999',
          pin: '1234',
        })
      ).rejects.toThrow(AppError);
    });

    it('should throw 401 when security PIN is incorrect', async () => {
      const issued = await service.issueGiftCard({
        purchasedById: 'user_1',
        recipientEmail: 'friend@example.com',
        amountPaise: 100000,
        customPin: '8812',
      });

      await expect(
        service.checkBalance({
          code: issued.rawCode,
          pin: '0000',
        })
      ).rejects.toThrow('Invalid security PIN for this gift card.');
    });
  });

  describe('redeemBalance', () => {
    it('should support partial redemption and update remaining balance', async () => {
      const issued = await service.issueGiftCard({
        purchasedById: 'user_1',
        recipientEmail: 'friend@example.com',
        amountPaise: 500000, // ₹5,000.00
      });

      // Partial redemption of ₹2,000.00 (200,000 paise)
      const redemption1 = await service.redeemBalance({
        code: issued.rawCode,
        pin: issued.rawPin,
        deductPaise: 200000,
        orderId: 'AURA-20261110-001',
      });

      expect(redemption1.deductedPaise).toBe(200000);
      expect(redemption1.remainingBalancePaise).toBe(300000);
      expect(redemption1.remainingBalanceFormatted).toBe('₹3,000.00');
      expect(redemption1.orderId).toBe('AURA-20261110-001');

      // Next redemption of remaining ₹3,000.00 (300,000 paise)
      const redemption2 = await service.redeemBalance({
        code: issued.rawCode,
        pin: issued.rawPin,
        deductPaise: 300000,
      });

      expect(redemption2.remainingBalancePaise).toBe(0);
      expect(redemption2.remainingBalanceFormatted).toBe('₹0.00');
    });

    it('should throw error when requested deduction exceeds balance', async () => {
      const issued = await service.issueGiftCard({
        purchasedById: 'user_1',
        recipientEmail: 'friend@example.com',
        amountPaise: 100000, // ₹1,000.00
      });

      await expect(
        service.redeemBalance({
          code: issued.rawCode,
          pin: issued.rawPin,
          deductPaise: 150000, // ₹1,500.00
        })
      ).rejects.toThrow('Insufficient balance');
    });

    it('should reject deduction amount of zero or negative', async () => {
      const issued = await service.issueGiftCard({
        purchasedById: 'user_1',
        recipientEmail: 'friend@example.com',
        amountPaise: 100000,
      });

      await expect(
        service.redeemBalance({
          code: issued.rawCode,
          pin: issued.rawPin,
          deductPaise: 0,
        })
      ).rejects.toThrow(ValidationError);
    });
  });
});
