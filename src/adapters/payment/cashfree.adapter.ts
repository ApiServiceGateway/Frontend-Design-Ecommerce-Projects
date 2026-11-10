import crypto from 'crypto';
import { AppError } from '@/core/errors';
import {
  CreatePaymentSessionInput,
  PaymentSessionResult,
  WebhookVerificationInput,
  WebhookVerificationResult,
} from './types';

export class CashfreePaymentAdapter {
  private secretKey: string;
  private appId: string;

  constructor(appId = 'cf_app_aura_prod', secretKey = 'cf_sec_key_test_aura') {
    this.appId = appId;
    this.secretKey = secretKey;
  }

  /**
   * Creates a Cashfree payment session with strictly neutral statement descriptor
   */
  public async createSession(input: CreatePaymentSessionInput): Promise<PaymentSessionResult> {
    if (input.amountPaise <= 0) {
      throw new AppError('Amount must be positive in paise', 400);
    }

    const sessionId = `cf_sess_${crypto.randomBytes(12).toString('hex')}`;
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 20); // 20-min session

    return {
      provider: 'CASHFREE',
      sessionId,
      paymentUrl: `https://payments.cashfree.com/pay/${sessionId}`,
      upiIntentUrl: `upi://pay?pa=aura.lifestyle@icici&pn=Aura+Retail&am=${(input.amountPaise / 100).toFixed(2)}&tr=${input.orderNumber}`,
      statementDescriptor: 'Aura Retail & Lifestyle',
      amountPaise: input.amountPaise,
      orderNumber: input.orderNumber,
      expiresAt,
    };
  }

  /**
   * Verifies Cashfree Webhook Signature: HMAC-SHA256(timestamp + rawBody)
   */
  public verifyWebhook(input: WebhookVerificationInput): WebhookVerificationResult {
    try {
      const payload = input.timestamp ? `${input.timestamp}${input.rawBody}` : input.rawBody;
      const expectedSignature = crypto
        .createHmac('sha256', this.secretKey)
        .update(payload)
        .digest('base64');

      const isValid = crypto.timingSafeEqual(
        Buffer.from(input.signature, 'utf8'),
        Buffer.from(expectedSignature, 'utf8')
      );

      if (!isValid) {
        return { isValid: false };
      }

      const body = JSON.parse(input.rawBody);
      return {
        isValid: true,
        orderNumber: body?.data?.order?.order_id,
        transactionId: body?.data?.payment?.cf_payment_id?.toString(),
        status: body?.data?.payment?.payment_status === 'SUCCESS' ? 'SUCCESS' : 'FAILED',
        amountPaise: Math.round((body?.data?.payment?.payment_amount || 0) * 100),
      };
    } catch {
      return { isValid: false };
    }
  }
}
