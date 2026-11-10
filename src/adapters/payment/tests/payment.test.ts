import { describe, it, expect, vi, beforeEach } from 'vitest';
import crypto from 'crypto';
import { CashfreePaymentAdapter } from '../cashfree.adapter';
import { PhonePePaymentAdapter } from '../phonepe.adapter';
import { PaymentOrchestrator } from '../payment-orchestrator';
import { coreEventBus } from '@/core/event-bus';

describe('Payment Gateway Orchestration & Adapters (System 6 & Document 7/18)', () => {
  let cashfree: CashfreePaymentAdapter;
  let phonepe: PhonePePaymentAdapter;
  let orchestrator: PaymentOrchestrator;

  beforeEach(() => {
    cashfree = new CashfreePaymentAdapter('test_app_id', 'test_secret_key');
    phonepe = new PhonePePaymentAdapter('test_merchant_id', 'test_salt_key', '1');
    orchestrator = new PaymentOrchestrator(cashfree, phonepe);
  });

  describe('CashfreePaymentAdapter', () => {
    it('should create session with strictly neutral descriptor "Aura Retail & Lifestyle"', async () => {
      const session = await cashfree.createSession({
        orderId: 'ord_123',
        orderNumber: 'AURA-20261110-0099',
        amountPaise: 499900, // ₹4,999.00
        customerPhone: '+919876543210',
        customerEmail: 'cust@example.com',
      });

      expect(session.provider).toBe('CASHFREE');
      expect(session.statementDescriptor).toBe('Aura Retail & Lifestyle');
      expect(session.amountPaise).toBe(499900);
      expect(session.orderNumber).toBe('AURA-20261110-0099');
      expect(session.paymentUrl).toContain('payments.cashfree.com');
      expect(session.upiIntentUrl).toContain('upi://pay');
    });

    it('should verify genuine HMAC-SHA256 signature and parse payload', () => {
      const rawBody = JSON.stringify({
        data: {
          order: { order_id: 'AURA-20261110-0099' },
          payment: { cf_payment_id: 99881122, payment_status: 'SUCCESS', payment_amount: 4999 },
        },
      });

      const signature = crypto
        .createHmac('sha256', 'test_secret_key')
        .update(rawBody)
        .digest('base64');

      const result = cashfree.verifyWebhook({ rawBody, signature });

      expect(result.isValid).toBe(true);
      expect(result.status).toBe('SUCCESS');
      expect(result.orderNumber).toBe('AURA-20261110-0099');
      expect(result.amountPaise).toBe(499900);
    });

    it('should reject tampered or forged webhook signature', () => {
      const rawBody = JSON.stringify({ data: { order: { order_id: 'FAKE' } } });
      const forgedSignature = 'forged_signature_xyz==';

      const result = cashfree.verifyWebhook({ rawBody, signature: forgedSignature });
      expect(result.isValid).toBe(false);
    });
  });

  describe('PhonePePaymentAdapter', () => {
    it('should create valid PhonePe session and return payment redirect URL', async () => {
      const session = await phonepe.createSession({
        orderId: 'ord_456',
        orderNumber: 'AURA-20261110-0100',
        amountPaise: 299900,
        customerPhone: '+919876543210',
        customerEmail: 'cust@example.com',
      });

      expect(session.provider).toBe('PHONEPE');
      expect(session.statementDescriptor).toBe('Aura Retail & Lifestyle');
      expect(session.paymentUrl).toContain('phonepe.com');
      expect(session.upiIntentUrl).toContain('phonepe://pay');
    });

    it('should verify genuine PhonePe SHA256 checksum', () => {
      const innerJson = JSON.stringify({
        code: 'PAYMENT_SUCCESS',
        data: {
          merchantTransactionId: 'AURA-20261110-0100',
          transactionId: 'TXN_PH_9999',
          amount: 299900,
        },
      });
      const base64Body = Buffer.from(innerJson).toString('base64');

      const signature =
        crypto
          .createHash('sha256')
          .update(base64Body + 'test_salt_key')
          .digest('hex') + '###1';

      const result = phonepe.verifyWebhook({ rawBody: base64Body, signature });

      expect(result.isValid).toBe(true);
      expect(result.status).toBe('SUCCESS');
      expect(result.orderNumber).toBe('AURA-20261110-0100');
      expect(result.amountPaise).toBe(299900);
    });
  });

  describe('PaymentOrchestrator', () => {
    it('should route to Cashfree as primary gateway', async () => {
      const session = await orchestrator.createPaymentSession({
        orderId: 'ord_01',
        orderNumber: 'AURA-ORD-01',
        amountPaise: 150000,
        customerPhone: '+919876543210',
        customerEmail: 'buyer@example.com',
      });

      expect(session.provider).toBe('CASHFREE');
    });

    it('should automatically failover to PhonePe if Cashfree fails', async () => {
      vi.spyOn(cashfree, 'createSession').mockRejectedValueOnce(new Error('Cashfree Gateway 503'));

      const session = await orchestrator.createPaymentSession({
        orderId: 'ord_02',
        orderNumber: 'AURA-ORD-02',
        amountPaise: 150000,
        customerPhone: '+919876543210',
        customerEmail: 'buyer@example.com',
      });

      expect(session.provider).toBe('PHONEPE');
      expect(session.statementDescriptor).toBe('Aura Retail & Lifestyle');
    });

    it('should respect idempotency key and return cached session on retry', async () => {
      const input = {
        orderId: 'ord_03',
        orderNumber: 'AURA-ORD-03',
        amountPaise: 200000,
        customerPhone: '+919876543210',
        customerEmail: 'buyer@example.com',
        idempotencyKey: 'idemp_key_unique_882',
      };

      const session1 = await orchestrator.createPaymentSession(input);
      const session2 = await orchestrator.createPaymentSession(input);

      expect(session1.sessionId).toBe(session2.sessionId);
    });

    it('should emit ORDER_PAID event via CoreEventBus on successful webhook verification', () => {
      const emitSpy = vi.spyOn(coreEventBus, 'emit');

      const rawBody = JSON.stringify({
        data: {
          order: { order_id: 'AURA-20261110-0888' },
          payment: { cf_payment_id: 112233, payment_status: 'SUCCESS', payment_amount: 3000 },
        },
      });
      const signature = crypto
        .createHmac('sha256', 'test_secret_key')
        .update(rawBody)
        .digest('base64');

      const result = orchestrator.handleWebhook('CASHFREE', { rawBody, signature });

      expect(result.isValid).toBe(true);
      expect(emitSpy).toHaveBeenCalledWith('ORDER_PAID', expect.objectContaining({
        orderId: 'AURA-20261110-0888',
        amountPaise: 300000,
        provider: 'CASHFREE',
      }));
    });
  });
});
