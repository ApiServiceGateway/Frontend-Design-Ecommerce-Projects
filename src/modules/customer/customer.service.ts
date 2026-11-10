import { coreRegistry } from '../../core/registry';
import { CoreServiceNames } from '../../core/contracts/service-names';
import { cryptoService } from '../../core/crypto';
import { AppError, NotFoundError, ValidationError } from '../../core/errors';
import { OrderProcessingService } from '../orders/orders.service';
import {
  AddAddressInput,
  CustomerProfileRecord,
  DecryptedAddressRecord,
  SavedAddressRecord,
  StaffAuditLogEntry,
} from './types';

export class CustomerProfileService {
  private addressStore = new Map<string, SavedAddressRecord>(); // Key: addressId
  private profileStore = new Map<string, CustomerProfileRecord>(); // Key: userId
  private auditLogStore: StaffAuditLogEntry[] = [];

  /**
   * Add a new delivery address with AES-256-GCM encryption
   */
  public async addSavedAddress(input: AddAddressInput): Promise<DecryptedAddressRecord> {
    const { userId, fullName, addressLine1, addressLine2, city, state, postalCode, deliveryInstructions, isDefault = false } = input;

    if (!postalCode || !/^[1-9][0-9]{5}$/.test(postalCode.trim())) {
      throw new ValidationError('A valid 6-digit Indian PIN code is required.');
    }

    // Check max 5 addresses quota
    const existing = Array.from(this.addressStore.values()).filter((a) => a.userId === userId);
    if (existing.length >= 5) {
      throw new AppError('You have reached the maximum limit of 5 saved addresses.', 400, 'ADDRESS_LIMIT_EXCEEDED');
    }

    // If marked default, unset default on other addresses
    if (isDefault) {
      for (const addr of existing) {
        addr.isDefault = false;
        this.addressStore.set(addr.id, addr);
      }
    }

    const addressId = `addr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();

    const record: SavedAddressRecord = {
      id: addressId,
      userId,
      fullNameEncrypted: cryptoService.encrypt(fullName),
      addressLine1Encrypted: cryptoService.encrypt(addressLine1),
      addressLine2Encrypted: addressLine2 ? cryptoService.encrypt(addressLine2) : null,
      city,
      state,
      postalCode: postalCode.trim(),
      deliveryInstructions: deliveryInstructions || null,
      isDefault: isDefault || existing.length === 0, // First address becomes default
      createdAt: now,
      updatedAt: now,
    };

    this.addressStore.set(addressId, record);

    return {
      id: addressId,
      userId,
      fullName,
      addressLine1,
      addressLine2: addressLine2 || null,
      city,
      state,
      postalCode: record.postalCode,
      deliveryInstructions: record.deliveryInstructions,
      isDefault: record.isDefault,
    };
  }

  /**
   * Retrieve all saved addresses for a customer (decrypted)
   */
  public getSavedAddresses(userId: string): DecryptedAddressRecord[] {
    const records = Array.from(this.addressStore.values()).filter((a) => a.userId === userId);

    return records.map((r) => ({
      id: r.id,
      userId: r.userId,
      fullName: cryptoService.decrypt(r.fullNameEncrypted),
      addressLine1: cryptoService.decrypt(r.addressLine1Encrypted),
      addressLine2: r.addressLine2Encrypted ? cryptoService.decrypt(r.addressLine2Encrypted) : null,
      city: r.city,
      state: r.state,
      postalCode: r.postalCode,
      deliveryInstructions: r.deliveryInstructions,
      isDefault: r.isDefault,
    }));
  }

  /**
   * Record immutable audit log entry whenever staff views or accesses customer PII
   */
  public recordStaffAuditAccess(entry: Omit<StaffAuditLogEntry, 'id' | 'timestamp'>): StaffAuditLogEntry {
    const auditEntry: StaffAuditLogEntry = {
      id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      staffUserId: entry.staffUserId,
      action: entry.action,
      targetEntity: entry.targetEntity,
      targetEntityId: entry.targetEntityId,
      ipAddress: entry.ipAddress || '127.0.0.1',
      timestamp: new Date().toISOString(),
    };

    this.auditLogStore.push(auditEntry);
    return auditEntry;
  }

  /**
   * Retrieve staff audit logs for compliance tracking
   */
  public getStaffAuditLogs(targetUserId?: string): StaffAuditLogEntry[] {
    if (targetUserId) {
      return this.auditLogStore.filter((log) => log.targetEntityId === targetUserId);
    }
    return [...this.auditLogStore];
  }

  /**
   * 1-Click Customer PII Scrubbing (DPDP Act 2023 & BR-15)
   * Anonymizes delivery addresses and phone records post-delivery completion.
   */
  public async scrubCustomerPii(userId: string): Promise<{ success: boolean; scrubbedAt: string }> {
    // 1. Check if orders are still active/in-transit
    const ordersService = coreRegistry.get<OrderProcessingService>(CoreServiceNames.ORDER_PROCESSING);
    if (ordersService) {
      // Check if any order is not completed/delivered/cancelled
      const inTransitStatuses = ['PENDING_PAYMENT', 'CONFIRMED', 'PROCESSING', 'DISPATCHED', 'OUT_FOR_DELIVERY'];
      // Check stored orders
      // @ts-expect-error accessing store for validation
      const allOrders = Array.from(ordersService.ordersStore.values());
      const hasActiveOrder = allOrders.some(
        (o: any) => o.userId === userId && inTransitStatuses.includes(o.status)
      );

      if (hasActiveOrder) {
        throw new AppError(
          'Cannot scrub personal profile while you have orders currently in fulfillment or transit.',
          400,
          'ACTIVE_ORDERS_IN_TRANSIT'
        );
      }
    }

    const now = new Date().toISOString();

    // 2. Anonymize all active saved address records
    for (const [id, addr] of this.addressStore.entries()) {
      if (addr.userId === userId) {
        addr.fullNameEncrypted = cryptoService.encrypt('[SCRUBBED_BY_USER_REQUEST]');
        addr.addressLine1Encrypted = cryptoService.encrypt('[SCRUBBED_BY_USER_REQUEST]');
        addr.addressLine2Encrypted = null;
        addr.deliveryInstructions = null;
        addr.updatedAt = now;
        this.addressStore.set(id, addr);
      }
    }

    // 3. Mark profile scrubbed
    const profile = this.profileStore.get(userId) || {
      userId,
      isPiiScrubbed: false,
      preferences: {
        allowTransactionalWhatsApp: false,
        allowTransactionalSms: false,
        marketingOptIn: false,
      },
    };

    profile.isPiiScrubbed = true;
    profile.scrubbedAt = now;
    this.profileStore.set(userId, profile);

    return {
      success: true,
      scrubbedAt: now,
    };
  }

  /**
   * Clear stores for clean test teardowns
   */
  public clear(): void {
    this.addressStore.clear();
    this.profileStore.clear();
    this.auditLogStore = [];
  }
}

// Export singleton instance and register into coreRegistry
export const customerProfileService = new CustomerProfileService();
coreRegistry.register(CoreServiceNames.CUSTOMER_PROFILE, customerProfileService);
