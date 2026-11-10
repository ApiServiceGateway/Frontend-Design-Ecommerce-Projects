/**
 * Customer Profile, Address Book & PII Scrubbing Domain Types
 */

export interface SavedAddressRecord {
  id: string;
  userId: string;
  fullNameEncrypted: string;
  addressLine1Encrypted: string;
  addressLine2Encrypted?: string | null;
  city: string;
  state: string;
  postalCode: string;
  deliveryInstructions?: string | null;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AddAddressInput {
  userId: string;
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  deliveryInstructions?: string;
  isDefault?: boolean;
}

export interface DecryptedAddressRecord {
  id: string;
  userId: string;
  fullName: string;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state: string;
  postalCode: string;
  deliveryInstructions?: string | null;
  isDefault: boolean;
}

export interface StaffAuditLogEntry {
  id: string;
  staffUserId: string;
  action: 'VIEW_CUSTOMER_PII' | 'EXPORT_CUSTOMER_DATA' | 'MANUAL_SCRUB_OVERRIDE';
  targetEntity: 'User' | 'Address' | 'Order';
  targetEntityId: string;
  ipAddress?: string;
  timestamp: string;
}

export interface CustomerProfileRecord {
  userId: string;
  email?: string | null;
  isPiiScrubbed: boolean;
  scrubbedAt?: string | null;
  preferences: {
    allowTransactionalWhatsApp: boolean;
    allowTransactionalSms: boolean;
    marketingOptIn: boolean; // Default false (zero unsolicited spam)
  };
}
