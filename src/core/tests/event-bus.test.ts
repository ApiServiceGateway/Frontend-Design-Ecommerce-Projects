import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CoreEventBus } from '../event-bus';

describe('Core Event Bus (Mediator Pattern)', () => {
  let eventBus: CoreEventBus;

  beforeEach(() => {
    eventBus = new CoreEventBus();
  });

  it('should subscribe and receive emitted events asynchronously', async () => {
    const handler = vi.fn();
    eventBus.on('ORDER_CONFIRMED', handler);

    const payload = {
      eventId: 'evt_123',
      timestamp: new Date().toISOString(),
      orderId: 'ord_999',
      orderNumber: 'AURA-20261110-001',
      customerId: 'usr_001',
      customerPhone: '+919876543210',
      customerEmail: 'buyer@example.com',
      totalAmountPaise: 249900,
      paymentMethod: 'PREPAID_UPI' as const,
      shippingAddress: {
        fullName: 'Test Buyer',
        phone: '+919876543210',
        addressLine1: 'Connaught Place',
        city: 'New Delhi',
        state: 'Delhi',
        postalCode: '110001',
      },
      items: [
        {
          sku: 'SKU-WAND-01',
          title: 'Whisper Wand',
          quantity: 1,
          unitPricePaise: 249900,
        },
      ],
    };

    await eventBus.emit('ORDER_CONFIRMED', payload);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(payload);
  });

  it('should allow multiple handlers on the same event and execute safely', async () => {
    const handler1 = vi.fn();
    const handler2 = vi.fn();

    eventBus.on('STOCK_RELEASED', handler1);
    eventBus.on('STOCK_RELEASED', handler2);

    expect(eventBus.listenerCount('STOCK_RELEASED')).toBe(2);

    await eventBus.emit('STOCK_RELEASED', {
      eventId: 'evt_rel_1',
      timestamp: new Date().toISOString(),
      orderId: 'ord_1',
      sku: 'SKU-01',
      quantity: 1,
      reason: 'PAYMENT_EXPIRED',
    });

    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(1);
  });

  it('should not throw if a handler encounters an unhandled error', async () => {
    const faultyHandler = vi.fn().mockRejectedValue(new Error('Downstream service failed'));
    const goodHandler = vi.fn();

    eventBus.on('PRODUCT_UPDATED', faultyHandler);
    eventBus.on('PRODUCT_UPDATED', goodHandler);

    await expect(
      eventBus.emit('PRODUCT_UPDATED', {
        eventId: 'evt_p_1',
        timestamp: new Date().toISOString(),
        productId: 'prod_1',
        slug: 'wand-01',
      })
    ).resolves.not.toThrow();

    expect(faultyHandler).toHaveBeenCalled();
    expect(goodHandler).toHaveBeenCalled();
  });
});
