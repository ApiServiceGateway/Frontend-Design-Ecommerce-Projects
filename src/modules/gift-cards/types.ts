export interface GiftCardDTO {
  id: string;
  maskedCode: string;
  initialPaise: number;
  balancePaise: number;
  recipientEmail: string;
  expiresAt: Date;
  isActive: boolean;
  createdAt: Date;
}

export interface IssueGiftCardInput {
  purchasedById: string;
  recipientEmail: string;
  amountPaise: number;
  customPin?: string;
}

export interface IssuedGiftCardResult {
  giftCard: GiftCardDTO;
  rawCode: string;
  rawPin: string;
}

export interface CheckBalanceInput {
  code: string;
  pin: string;
}

export interface GiftCardBalanceResult {
  maskedCode: string;
  balancePaise: number;
  balanceFormatted: string;
  initialPaise: number;
  expiresAt: Date;
  isActive: boolean;
  isExpired: boolean;
}

export interface RedeemGiftCardInput {
  code: string;
  pin: string;
  deductPaise: number;
  orderId?: string;
}

export interface RedeemGiftCardResult {
  deductedPaise: number;
  remainingBalancePaise: number;
  remainingBalanceFormatted: string;
  orderId?: string;
}
