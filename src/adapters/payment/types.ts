export type PaymentProvider = 'CASHFREE' | 'PHONEPE' | 'COD';

export interface CreatePaymentSessionInput {
  orderId: string;
  orderNumber: string;
  amountPaise: number;
  customerPhone: string;
  customerEmail: string;
  customerName?: string;
  preferredProvider?: PaymentProvider;
  idempotencyKey?: string;
}

export interface PaymentSessionResult {
  provider: PaymentProvider;
  sessionId: string;
  paymentUrl?: string;
  upiIntentUrl?: string;
  statementDescriptor: string; // Strictly "Aura Retail & Lifestyle"
  amountPaise: number;
  orderNumber: string;
  expiresAt: Date;
}

export interface WebhookVerificationInput {
  rawBody: string;
  signature: string;
  timestamp?: string;
}

export interface WebhookVerificationResult {
  isValid: boolean;
  orderNumber?: string;
  transactionId?: string;
  status?: 'SUCCESS' | 'FAILED' | 'PENDING';
  amountPaise?: number;
}
