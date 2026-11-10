import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  InventoryReservationService,
  inventoryReservationService,
} from '../inventory.service';
import { InventoryItemRecord } from '../types';
import { coreRegistry } from '../../../core/registry';
import { CoreServiceNames } from '../../../core/contracts/service-names';
import { coreEventBus } from '../../../core/event-bus';
import { StockUnavailableError, AppError } from '../../../core/errors';

describe('Inventory & 30-Minute Hold Service', () => {
  let service: InventoryReservationService;

  const mockItem: InventoryItemRecord = {
    id: 'inv_item_1',
    variantId: 'var_1',
    sku: 'AURA-DUAL-ROSE',
    availableStock: 10,
    reservedStock: 0,
    lowStockThreshold: 3,
    version: 0,
    updatedAt: new Date().toISOString(),
  };

  beforeEach(() => {
    service = new InventoryReservationService();
    service.setInventoryItem(mockItem);
  });

  it('should be registered in the CoreServiceRegistry', () => {
    const registered = coreRegistry.get<InventoryReservationService>(
      CoreServiceNames.INVENTORY_RESERVATION
    );
    expect(registered).toBeDefined();
    expect(registered).toBe(inventoryReservationService);
  });

  describe('Availability Checking', () => {
    it('should correctly report available stock and low stock warnings', () => {
      const check = service.checkAvailability('AURA-DUAL-ROSE', 2);
      expect(check.isAvailable).toBe(true);
      expect(check.availableStock).toBe(10);
      expect(check.isLowStock).toBe(false);

      // Check item with low stock
      service.setInventoryItem({
        ...mockItem,
        sku: 'LOW-STOCK-SKU',
        availableStock: 2,
        lowStockThreshold: 3,
      });

      const lowStockCheck = service.checkAvailability('LOW-STOCK-SKU', 1);
      expect(lowStockCheck.isAvailable).toBe(true);
      expect(lowStockCheck.isLowStock).toBe(true);
    });

    it('should return isAvailable: false for non-existent SKUs', () => {
      const check = service.checkAvailability('NON-EXISTENT-SKU', 1);
      expect(check.isAvailable).toBe(false);
      expect(check.availableStock).toBe(0);
    });
  });

  describe('30-Minute Reservation Hold (BR-05)', () => {
    it('should reserve stock, update stock buckets, set 30m TTL, and emit STOCK_RESERVED event', async () => {
      const emitSpy = vi.spyOn(coreEventBus, 'emit');

      const reservation = await service.reserveStock({
        orderId: 'order_test_101',
        variantId: 'var_1',
        sku: 'AURA-DUAL-ROSE',
        quantity: 3,
        holdDurationMinutes: 30,
      });

      expect(reservation.status).toBe('ACTIVE');
      expect(reservation.quantity).toBe(3);

      // Verify stock was moved from available to reserved
      const updatedItem = service.getInventoryItem('AURA-DUAL-ROSE');
      expect(updatedItem?.availableStock).toBe(7);
      expect(updatedItem?.reservedStock).toBe(3);
      expect(updatedItem?.version).toBe(1); // Optimistic version incremented

      // Verify 30-minute expiration timestamp
      const now = Date.now();
      const expiresAt = new Date(reservation.expiresAt).getTime();
      const diffMinutes = Math.round((expiresAt - now) / (60 * 1000));
      expect(diffMinutes).toBe(30);

      // Verify event bus publication
      expect(emitSpy).toHaveBeenCalledWith(
        'STOCK_RESERVED',
        expect.objectContaining({
          orderId: 'order_test_101',
          sku: 'AURA-DUAL-ROSE',
          quantity: 3,
        })
      );
    });

    it('should throw StockUnavailableError when available stock is insufficient', async () => {
      await expect(
        service.reserveStock({
          orderId: 'order_fail_1',
          variantId: 'var_1',
          sku: 'AURA-DUAL-ROSE',
          quantity: 11, // Exceeds available (10)
        })
      ).rejects.toThrow(StockUnavailableError);
    });

    it('should reject invalid zero or negative reservation quantities', async () => {
      await expect(
        service.reserveStock({
          orderId: 'order_fail_2',
          variantId: 'var_1',
          sku: 'AURA-DUAL-ROSE',
          quantity: 0,
        })
      ).rejects.toThrow(AppError);
    });
  });

  describe('Stock Release Engine', () => {
    it('should release reserved stock back to available on cancellation and emit STOCK_RELEASED', async () => {
      const emitSpy = vi.spyOn(coreEventBus, 'emit');

      const reservation = await service.reserveStock({
        orderId: 'order_cancel_1',
        variantId: 'var_1',
        sku: 'AURA-DUAL-ROSE',
        quantity: 4,
      });

      const released = await service.releaseReservation({
        reservationId: reservation.id,
        reason: 'USER_CANCELLED',
      });

      expect(released.status).toBe('RELEASED');

      // Check stock restored
      const restored = service.getInventoryItem('AURA-DUAL-ROSE');
      expect(restored?.availableStock).toBe(10);
      expect(restored?.reservedStock).toBe(0);
      expect(restored?.version).toBe(2);

      expect(emitSpy).toHaveBeenCalledWith(
        'STOCK_RELEASED',
        expect.objectContaining({
          orderId: 'order_cancel_1',
          sku: 'AURA-DUAL-ROSE',
          quantity: 4,
          reason: 'USER_CANCELLED',
        })
      );
    });

    it('should auto-release expired reservations using background sweep', async () => {
      // Create a reservation that expires in the past
      const reservation = await service.reserveStock({
        orderId: 'order_expire_1',
        variantId: 'var_1',
        sku: 'AURA-DUAL-ROSE',
        quantity: 5,
        holdDurationMinutes: 30,
      });

      // Advance time by 31 minutes
      const futureDate = new Date(Date.now() + 31 * 60 * 1000);

      const cleanedCount = await service.cleanupExpiredReservations(futureDate);
      expect(cleanedCount).toBe(1);

      const item = service.getInventoryItem('AURA-DUAL-ROSE');
      expect(item?.availableStock).toBe(10);
      expect(item?.reservedStock).toBe(0);
    });
  });

  describe('Decoupled Event Consumption', () => {
    it('should permanently consume reservation upon ORDER_CONFIRMED event', async () => {
      const reservation = await service.reserveStock({
        orderId: 'ORDER_AURA_8812',
        variantId: 'var_1',
        sku: 'AURA-DUAL-ROSE',
        quantity: 2,
      });

      expect(reservation.status).toBe('ACTIVE');

      // Emit ORDER_CONFIRMED on Core Event Bus
      await coreEventBus.emit('ORDER_CONFIRMED', {
        eventId: 'evt_confirmed_1',
        timestamp: new Date().toISOString(),
        orderId: 'ORDER_AURA_8812',
        orderNumber: 'AURA-20261110-8812',
        customerId: 'cust_1',
        customerPhone: '+919999988888',
        customerEmail: 'discreet@auralifestyle.in',
        totalAmountPaise: 299900,
        paymentMethod: 'PREPAID_UPI',
        shippingAddress: {
          fullName: 'Private Customer',
          phone: '+919999988888',
          addressLine1: 'Encrypted Address Line',
          city: 'Mumbai',
          state: 'Maharashtra',
          postalCode: '400001',
        },
        items: [
          {
            sku: 'AURA-DUAL-ROSE',
            title: 'Aura Dual Sonic Stimulator',
            quantity: 2,
            unitPricePaise: 299900,
          },
        ],
      });

      // Verify the reservation is now marked CONSUMED
      const allReservations = service.getReservations();
      const confirmedRes = allReservations.find((r) => r.id === reservation.id);
      expect(confirmedRes?.status).toBe('CONSUMED');

      // Warehouse stock consumed (reservedStock decremented, availableStock stays at 8)
      const item = service.getInventoryItem('AURA-DUAL-ROSE');
      expect(item?.availableStock).toBe(8);
      expect(item?.reservedStock).toBe(0);
    });
  });
});
