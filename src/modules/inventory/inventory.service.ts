import { coreEventBus } from '../../core/event-bus';
import { coreRegistry } from '../../core/registry';
import { CoreServiceNames } from '../../core/contracts/service-names';
import { StockUnavailableError, NotFoundError, AppError } from '../../core/errors';
import {
  InventoryItemRecord,
  StockCheckResult,
  StockReservationRecord,
  ReserveStockInput,
  ReleaseStockInput,
} from './types';

export class InventoryReservationService {
  // In-memory registry storage for fast access & mocking during unit testing
  private inventoryStore = new Map<string, InventoryItemRecord>();
  private reservationStore = new Map<string, StockReservationRecord>();

  constructor() {
    this.setupEventListeners();
  }

  /**
   * Helper to seed/update an inventory item into memory store
   */
  public setInventoryItem(item: InventoryItemRecord): void {
    this.inventoryStore.set(item.sku, { ...item });
  }

  /**
   * Retrieve current inventory status for a SKU
   */
  public getInventoryItem(sku: string): InventoryItemRecord | undefined {
    return this.inventoryStore.get(sku);
  }

  /**
   * Get all active reservations
   */
  public getReservations(): StockReservationRecord[] {
    return Array.from(this.reservationStore.values());
  }

  /**
   * Check stock availability for a SKU and requested quantity
   */
  public checkAvailability(sku: string, requestedQuantity: number = 1): StockCheckResult {
    const item = this.inventoryStore.get(sku);

    if (!item) {
      return {
        isAvailable: false,
        availableStock: 0,
        reservedStock: 0,
        isLowStock: false,
        lowStockThreshold: 5,
      };
    }

    const isAvailable = item.availableStock >= requestedQuantity && requestedQuantity > 0;
    const isLowStock = item.availableStock <= item.lowStockThreshold;

    return {
      isAvailable,
      availableStock: item.availableStock,
      reservedStock: item.reservedStock,
      isLowStock,
      lowStockThreshold: item.lowStockThreshold,
    };
  }

  /**
   * Reserve requested stock for a 30-minute hold window (BR-05)
   * Uses optimistic concurrency control (version increment).
   */
  public async reserveStock(input: ReserveStockInput): Promise<StockReservationRecord> {
    const { orderId, variantId, sku, quantity, holdDurationMinutes = 30 } = input;

    if (quantity <= 0) {
      throw new AppError('Reservation quantity must be at least 1 unit.', 400, 'INVALID_QUANTITY');
    }

    const item = this.inventoryStore.get(sku);
    if (!item || item.availableStock < quantity) {
      throw new StockUnavailableError(sku);
    }

    // 1. Deduct from available, add to reserved (Atomic memory mutation + Version increment)
    item.availableStock -= quantity;
    item.reservedStock += quantity;
    item.version += 1;
    item.updatedAt = new Date().toISOString();
    this.inventoryStore.set(sku, item);

    // 2. Create Stock Reservation Record (Default 30 Minutes TTL)
    const expiresAt = new Date(Date.now() + holdDurationMinutes * 60 * 1000).toISOString();
    const reservationId = `res_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const reservation: StockReservationRecord = {
      id: reservationId,
      orderId,
      variantId,
      sku,
      quantity,
      expiresAt,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    };

    this.reservationStore.set(reservationId, reservation);

    // 3. Emit decoupled event to Core Event Bus
    await coreEventBus.emit('STOCK_RESERVED', {
      eventId: `evt_${Date.now()}`,
      timestamp: new Date().toISOString(),
      orderId,
      sku,
      quantity,
      expiresAt,
    });

    return reservation;
  }

  /**
   * Release a stock reservation back to available inventory.
   * Triggered on 30-min TTL expiration, payment failure, or explicit user abandonment.
   */
  public async releaseReservation(input: ReleaseStockInput): Promise<StockReservationRecord> {
    const { reservationId, reason } = input;
    const reservation = this.reservationStore.get(reservationId);

    if (!reservation) {
      throw new NotFoundError('StockReservation', reservationId);
    }

    if (reservation.status !== 'ACTIVE') {
      return reservation; // Already handled
    }

    const item = this.inventoryStore.get(reservation.sku);
    if (item) {
      // Revert reservation back to available stock
      item.availableStock += reservation.quantity;
      item.reservedStock = Math.max(0, item.reservedStock - reservation.quantity);
      item.version += 1;
      item.updatedAt = new Date().toISOString();
      this.inventoryStore.set(reservation.sku, item);
    }

    reservation.status = reason === 'PAYMENT_EXPIRED' ? 'EXPIRED' : 'RELEASED';
    this.reservationStore.set(reservationId, reservation);

    // Emit STOCK_RELEASED event
    await coreEventBus.emit('STOCK_RELEASED', {
      eventId: `evt_${Date.now()}`,
      timestamp: new Date().toISOString(),
      orderId: reservation.orderId,
      sku: reservation.sku,
      quantity: reservation.quantity,
      reason,
    });

    return reservation;
  }

  /**
   * Permanently consume reserved stock upon successful payment (Order confirmed).
   */
  public async consumeReservation(reservationId: string): Promise<StockReservationRecord> {
    const reservation = this.reservationStore.get(reservationId);

    if (!reservation) {
      throw new NotFoundError('StockReservation', reservationId);
    }

    if (reservation.status !== 'ACTIVE') {
      return reservation;
    }

    const item = this.inventoryStore.get(reservation.sku);
    if (item) {
      // Stock is consumed (leaving warehouse); deduct from reservedStock
      item.reservedStock = Math.max(0, item.reservedStock - reservation.quantity);
      item.version += 1;
      item.updatedAt = new Date().toISOString();
      this.inventoryStore.set(reservation.sku, item);
    }

    reservation.status = 'CONSUMED';
    this.reservationStore.set(reservationId, reservation);

    return reservation;
  }

  /**
   * Background sweep function to auto-release expired reservations (30-min TTL check)
   */
  public async cleanupExpiredReservations(referenceDate: Date = new Date()): Promise<number> {
    let releasedCount = 0;
    const nowTime = referenceDate.getTime();

    for (const [id, res] of this.reservationStore.entries()) {
      if (res.status === 'ACTIVE' && new Date(res.expiresAt).getTime() <= nowTime) {
        await this.releaseReservation({
          reservationId: id,
          reason: 'PAYMENT_EXPIRED',
        });
        releasedCount++;
      }
    }

    return releasedCount;
  }

  /**
   * Wire listeners for decoupled cross-service events
   */
  private setupEventListeners(): void {
    coreEventBus.on('ORDER_CONFIRMED', async (payload) => {
      // Find all active reservations belonging to this confirmed order
      for (const [id, res] of this.reservationStore.entries()) {
        if (res.orderId === payload.orderId && res.status === 'ACTIVE') {
          await this.consumeReservation(id);
        }
      }
    });
  }

  /**
   * Clear all stores (for clean test teardowns)
   */
  public clear(): void {
    this.inventoryStore.clear();
    this.reservationStore.clear();
  }
}

// Export singleton instance and register to coreRegistry
export const inventoryReservationService = new InventoryReservationService();
coreRegistry.register(CoreServiceNames.INVENTORY_RESERVATION, inventoryReservationService);
