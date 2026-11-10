import { CashfreePaymentAdapter } from './cashfree.adapter';
import { PhonePePaymentAdapter } from './phonepe.adapter';
import {
  CreatePaymentSessionInput,
  PaymentSessionResult,
  PaymentProvider,
  WebhookVerificationInput,
  WebhookVerificationResult,
} from './types';
import { coreEventBus } from '@/core/event-bus';
import { AppError } from '@/core/errors';

export class PaymentOrchestrator {
  private cashfree: CashfreePaymentAdapter;
  private phonepe: PhonePePaymentAdapter;
  private idempotencyStore = new Map<string, PaymentSessionResult>();

  constructor(
    cashfree = new CashfreePaymentAdapter(),
    phonepe = new PhonePePaymentAdapter()
  ) {
    this.cashfree = cashfree;
    this.phonepe = phonepe;
  }

  /**
   * Orchestrates payment session creation with primary Cashfree + failover PhonePe
   */
  public async createPaymentSession(
    input: CreatePaymentSessionInput
  ): Promise<PaymentSessionResult> {
    // Idempotency check
    if (input.idempotencyKey && this.idempotencyStore.has(input.idempotencyKey)) {
      return this.idempotencyStore.get(input.idempotencyKey)!;
    }

    let session: PaymentSessionResult;

    // Check preferred provider or default to Cashfree
    if (input.preferredProvider === 'PHONEPE') {
      session = await this.phonepe.createSession(input);
    } else {
      try {
        session = await this.cashfree.createSession(input);
      } catch (primaryError) {
        // Automatic failover to PhonePe
        session = await this.phonepe.createSession(input);
      }
    }

    // Strict Privacy Verification: Statement descriptor must be neutral
    if (session.statementDescriptor !== 'Aura Retail & Lifestyle') {
      throw new AppError('Compliance Error: Non-neutral statement descriptor detected!', 500);
    }

    if (input.idempotencyKey) {
      this.idempotencyStore.set(input.idempotencyKey, session);
    }

    return session;
  }

  /**
   * Verifies incoming webhook from designated payment provider
   */
  public handleWebhook(
    provider: PaymentProvider,
    input: WebhookVerificationInput
  ): WebhookVerificationResult {
    let result: WebhookVerificationResult;

    if (provider === 'CASHFREE') {
      result = this.cashfree.verifyWebhook(input);
    } else if (provider === 'PHONEPE') {
      result = this.phonepe.verifyWebhook(input);
    } else {
      throw new AppError(`Unsupported payment provider webhook: ${provider}`, 400);
    }

    if (result.isValid && result.status === 'SUCCESS' && result.orderNumber) {
      coreEventBus.emit('ORDER_PAID', {
        orderId: result.orderNumber,
        transactionId: result.transactionId || 'UNKNOWN',
        amountPaise: result.amountPaise || 0,
        provider,
      });
    }

    return result;
  }
}

export const paymentOrchestrator = new PaymentOrchestrator();
