/**
 * Inventory & 30-Minute Reservation Domain Types
 */

export type ReservationStatusType = 'ACTIVE' | 'CONSUMED' | 'EXPIRED' | 'RELEASED';

export interface InventoryItemRecord {
  id: string;
  variantId: string;
  sku: string;
  availableStock: number;
  reservedStock: number;
  lowStockThreshold: number;
  version: number; // Concurrency version lock
  updatedAt: Date | string;
}

export interface StockReservationRecord {
  id: string;
  orderId: string;
  variantId: string;
  sku: string;
  quantity: number;
  expiresAt: string; // ISO string (Now + 30m)
  status: ReservationStatusType;
  createdAt: string;
}

export interface StockCheckResult {
  isAvailable: boolean;
  availableStock: number;
  reservedStock: number;
  isLowStock: boolean;
  lowStockThreshold: number;
}

export interface ReserveStockInput {
  orderId: string;
  variantId: string;
  sku: string;
  quantity: number;
  holdDurationMinutes?: number; // Default 30 minutes
}

export interface ReleaseStockInput {
  reservationId: string;
  reason: 'PAYMENT_EXPIRED' | 'USER_CANCELLED';
}
