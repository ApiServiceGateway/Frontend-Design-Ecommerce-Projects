import crypto from 'crypto';
import { AppError } from '@/core/errors';
import {
  CreatePaymentSessionInput,
  PaymentSessionResult,
  WebhookVerificationInput,
  WebhookVerificationResult,
} from './types';

export class PhonePePaymentAdapter {
  private merchantId: string;
  private saltKey: string;
  private saltIndex: string;

  constructor(merchantId = 'M_AURA_RETAIL', saltKey = 'phonepe_salt_key_test', saltIndex = '1') {
    this.merchantId = merchantId;
    this.saltKey = saltKey;
    this.saltIndex = saltIndex;
  }

  /**
   * Creates a PhonePe payment session / redirect link
   */
  public async createSession(input: CreatePaymentSessionInput): Promise<PaymentSessionResult> {
    if (input.amountPaise <= 0) {
      throw new AppError('Amount must be positive in paise', 400);
    }

    const sessionId = `phonepe_txn_${crypto.randomBytes(10).toString('hex')}`;
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 20);

    return {
      provider: 'PHONEPE',
      sessionId,
      paymentUrl: `https://mercury-uat.phonepe.com/transact/pg?token=${sessionId}`,
      upiIntentUrl: `phonepe://pay?pa=aura.phonepe@yesbank&pn=Aura+Retail&am=${(input.amountPaise / 100).toFixed(2)}&tr=${input.orderNumber}`,
      statementDescriptor: 'Aura Retail & Lifestyle',
      amountPaise: input.amountPaise,
      orderNumber: input.orderNumber,
      expiresAt,
    };
  }

  /**
   * Verifies PhonePe Webhook Signature: SHA256(base64Body + saltKey) + "###" + saltIndex
   */
  public verifyWebhook(input: WebhookVerificationInput): WebhookVerificationResult {
    try {
      const expectedChecksum = crypto
        .createHash('sha256')
        .update(input.rawBody + this.saltKey)
        .digest('hex') + '###' + this.saltIndex;

      const isValid = input.signature === expectedChecksum;
      if (!isValid) {
        return { isValid: false };
      }

      // Base64 decoded response
      const decoded = Buffer.from(input.rawBody, 'base64').toString('utf8');
      const body = JSON.parse(decoded);

      return {
        isValid: true,
        orderNumber: body?.data?.merchantTransactionId,
        transactionId: body?.data?.transactionId,
        status: body?.code === 'PAYMENT_SUCCESS' ? 'SUCCESS' : 'FAILED',
        amountPaise: body?.data?.amount || 0,
      };
    } catch {
      return { isValid: false };
    }
  }
}
