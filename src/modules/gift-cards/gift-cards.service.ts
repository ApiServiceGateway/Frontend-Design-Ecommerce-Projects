import crypto from 'crypto';
import { AppError, ValidationError } from '@/core/errors';
import {
  GiftCardDTO,
  IssueGiftCardInput,
  IssuedGiftCardResult,
  CheckBalanceInput,
  GiftCardBalanceResult,
  RedeemGiftCardInput,
  RedeemGiftCardResult,
} from './types';

export class GiftCardsService {
  private inMemoryStore = new Map<string, any>();

  constructor(private prismaClient?: any) {}

  /**
   * Hashes string using SHA-256 for secure database index matching
   */
  public hashValue(value: string): string {
    return crypto.createHash('sha256').update(value.trim()).digest('hex');
  }

  /**
   * Generates a 16-character alphanumeric code: AURA-GIFT-XXXX-YYYY
   */
  public generateCode(): { rawCode: string; maskedCode: string } {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const randPart = (len: number) => {
      let res = '';
      for (let i = 0; i < len; i++) {
        res += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return res;
    };

    const part1 = randPart(4);
    const part2 = randPart(4);
    const rawCode = `AURA-GIFT-${part1}-${part2}`;
    const maskedCode = `AURA-GIFT-****-${part2}`;

    return { rawCode, maskedCode };
  }

  /**
   * Generates 4-digit numeric PIN
   */
  public generatePin(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  /**
   * Formats paise integer into INR string: ₹X,XXX.XX
   */
  public formatPaise(paise: number): string {
    const inr = (paise / 100).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `₹${inr}`;
  }

  /**
   * Issue a new digital Gift Card
   */
  public async issueGiftCard(input: IssueGiftCardInput): Promise<IssuedGiftCardResult> {
    if (!input.purchasedById) {
      throw new ValidationError('Purchaser ID is required');
    }

    if (!input.recipientEmail || !input.recipientEmail.includes('@')) {
      throw new ValidationError('A valid recipient email is required');
    }

    // Min ₹500 (50,000 paise), Max ₹50,000 (5,000,000 paise)
    if (input.amountPaise < 50000 || input.amountPaise > 5000000) {
      throw new ValidationError('Gift card denomination must be between ₹500 and ₹50,000');
    }

    const { rawCode, maskedCode } = this.generateCode();
    const rawPin = input.customPin || this.generatePin();

    if (rawPin.length !== 4 || !/^\d{4}$/.test(rawPin)) {
      throw new ValidationError('Security PIN must be exactly 4 numeric digits');
    }

    const codeHash = this.hashValue(rawCode);
    const pinHash = this.hashValue(rawPin);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 365); // 1 year validity

    const record = {
      id: `gift_${crypto.randomUUID()}`,
      codeHash,
      maskedCode,
      pinHash,
      initialPaise: input.amountPaise,
      balancePaise: input.amountPaise,
      purchasedById: input.purchasedById,
      recipientEmail: input.recipientEmail.toLowerCase().trim(),
      expiresAt,
      isActive: true,
      createdAt: new Date(),
    };

    if (this.prismaClient?.giftCard) {
      await this.prismaClient.giftCard.create({ data: record });
    } else {
      this.inMemoryStore.set(codeHash, record);
    }

    const giftCard: GiftCardDTO = {
      id: record.id,
      maskedCode: record.maskedCode,
      initialPaise: record.initialPaise,
      balancePaise: record.balancePaise,
      recipientEmail: record.recipientEmail,
      expiresAt: record.expiresAt,
      isActive: record.isActive,
      createdAt: record.createdAt,
    };

    return {
      giftCard,
      rawCode,
      rawPin,
    };
  }

  /**
   * Balance Check Tool
   */
  public async checkBalance(input: CheckBalanceInput): Promise<GiftCardBalanceResult> {
    const codeHash = this.hashValue(input.code);
    const pinHash = this.hashValue(input.pin);

    let card: any;
    if (this.prismaClient?.giftCard) {
      card = await this.prismaClient.giftCard.findUnique({ where: { codeHash } });
    } else {
      card = this.inMemoryStore.get(codeHash);
    }

    if (!card) {
      throw new AppError('Gift card not found. Please verify the 16-character code.', 404);
    }

    if (card.pinHash !== pinHash) {
      throw new AppError('Invalid security PIN for this gift card.', 401);
    }

    const isExpired = new Date() > new Date(card.expiresAt);

    return {
      maskedCode: card.maskedCode,
      balancePaise: card.balancePaise,
      balanceFormatted: this.formatPaise(card.balancePaise),
      initialPaise: card.initialPaise,
      expiresAt: card.expiresAt,
      isActive: card.isActive && !isExpired,
      isExpired,
    };
  }

  /**
   * Deduct / Redeem Gift Card balance (Supports partial redemption)
   */
  public async redeemBalance(input: RedeemGiftCardInput): Promise<RedeemGiftCardResult> {
    if (input.deductPaise <= 0) {
      throw new ValidationError('Deduction amount must be greater than zero');
    }

    const codeHash = this.hashValue(input.code);
    const pinHash = this.hashValue(input.pin);

    let card: any;
    if (this.prismaClient?.giftCard) {
      card = await this.prismaClient.giftCard.findUnique({ where: { codeHash } });
    } else {
      card = this.inMemoryStore.get(codeHash);
    }

    if (!card) {
      throw new AppError('Gift card not found', 404);
    }

    if (card.pinHash !== pinHash) {
      throw new AppError('Invalid security PIN', 401);
    }

    if (!card.isActive) {
      throw new AppError('Gift card is inactive or has been disabled', 400);
    }

    if (new Date() > new Date(card.expiresAt)) {
      throw new AppError('Gift card has expired and cannot be redeemed', 400);
    }

    if (card.balancePaise < input.deductPaise) {
      throw new AppError(
        `Insufficient balance. Card has ${this.formatPaise(card.balancePaise)}, but requested ${this.formatPaise(input.deductPaise)}`,
        400
      );
    }

    const newBalance = card.balancePaise - input.deductPaise;
    card.balancePaise = newBalance;

    if (this.prismaClient?.giftCard) {
      await this.prismaClient.giftCard.update({
        where: { id: card.id },
        data: { balancePaise: newBalance },
      });
    } else {
      this.inMemoryStore.set(codeHash, card);
    }

    return {
      deductedPaise: input.deductPaise,
      remainingBalancePaise: newBalance,
      remainingBalanceFormatted: this.formatPaise(newBalance),
      orderId: input.orderId,
    };
  }
}

export const giftCardsService = new GiftCardsService();
