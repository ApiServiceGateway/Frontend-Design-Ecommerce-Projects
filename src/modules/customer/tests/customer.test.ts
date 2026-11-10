import { describe, it, expect, beforeEach } from 'vitest';
import {
  CustomerProfileService,
  customerProfileService,
} from '../customer.service';
import { AddAddressInput } from '../types';
import { coreRegistry } from '../../../core/registry';
import { CoreServiceNames } from '../../../core/contracts/service-names';
import { orderProcessingService } from '../../orders/orders.service';
import { AppError, ValidationError } from '../../../core/errors';

describe('Customer Profile, Address Book & PII Scrubbing Service', () => {
  let customerService: CustomerProfileService;
  const testUserId = 'cust_profile_test_1';

  const mockAddressInput: AddAddressInput = {
    userId: testUserId,
    fullName: 'Ananya Roy',
    addressLine1: 'B-12, Greenview Apartments, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560038',
    deliveryInstructions: 'Leave with security guard',
    isDefault: true,
  };

  beforeEach(() => {
    customerService = new CustomerProfileService();
    customerService.clear();
    orderProcessingService.clear();
  });

  it('should be registered in the CoreServiceRegistry', () => {
    const service = coreRegistry.get<CustomerProfileService>(CoreServiceNames.CUSTOMER_PROFILE);
    expect(service).toBeDefined();
    expect(service).toBe(customerProfileService);
  });

  describe('Saved Address Book with Field-Level Encryption', () => {
    it('should save address with encrypted PII and return decrypted data', async () => {
      const saved = await customerService.addSavedAddress(mockAddressInput);

      expect(saved.id).toBeDefined();
      expect(saved.fullName).toBe('Ananya Roy');
      expect(saved.addressLine1).toBe('B-12, Greenview Apartments, Indiranagar');
      expect(saved.isDefault).toBe(true);

      // Verify decrypted retrieval
      const list = customerService.getSavedAddresses(testUserId);
      expect(list.length).toBe(1);
      expect(list[0].fullName).toBe('Ananya Roy');
      expect(list[0].city).toBe('Bengaluru');
    });

    it('should reject invalid PIN codes with ValidationError', async () => {
      await expect(
        customerService.addSavedAddress({
          ...mockAddressInput,
          postalCode: '12345', // 5 digits
        })
      ).rejects.toThrow(ValidationError);
    });

    it('should enforce max 5 saved addresses quota per customer', async () => {
      for (let i = 1; i <= 5; i++) {
        await customerService.addSavedAddress({
          ...mockAddressInput,
          addressLine1: `Flat ${i}, Tower ${i}`,
        });
      }

      // 6th address attempt should throw ADDRESS_LIMIT_EXCEEDED
      await expect(
        customerService.addSavedAddress({
          ...mockAddressInput,
          addressLine1: 'Flat 6, Tower 6',
        })
      ).rejects.toThrow('maximum limit of 5 saved addresses');
    });

    it('should toggle default address correctly when adding a new default', async () => {
      await customerService.addSavedAddress({
        ...mockAddressInput,
        addressLine1: 'First Address',
        isDefault: true,
      });

      await customerService.addSavedAddress({
        ...mockAddressInput,
        addressLine1: 'Second Address (New Default)',
        isDefault: true,
      });

      const addresses = customerService.getSavedAddresses(testUserId);
      expect(addresses.length).toBe(2);

      const first = addresses.find((a) => a.addressLine1 === 'First Address');
      const second = addresses.find((a) => a.addressLine1 === 'Second Address (New Default)');

      expect(first?.isDefault).toBe(false);
      expect(second?.isDefault).toBe(true);
    });
  });

  describe('Immutable Staff Audit Log Engine', () => {
    it('should record audit log when staff views customer PII', () => {
      const log = customerService.recordStaffAuditAccess({
        staffUserId: 'staff_agent_42',
        action: 'VIEW_CUSTOMER_PII',
        targetEntity: 'User',
        targetEntityId: testUserId,
        ipAddress: '192.168.1.50',
      });

      expect(log.id).toBeDefined();
      expect(log.staffUserId).toBe('staff_agent_42');
      expect(log.targetEntityId).toBe(testUserId);

      // Verify query
      const userAuditLogs = customerService.getStaffAuditLogs(testUserId);
      expect(userAuditLogs.length).toBe(1);
      expect(userAuditLogs[0].action).toBe('VIEW_CUSTOMER_PII');
    });
  });

  describe('1-Click Customer PII Scrubbing (DPDP Act 2023 & BR-15)', () => {
    it('should successfully scrub customer delivery addresses to [SCRUBBED_BY_USER_REQUEST]', async () => {
      await customerService.addSavedAddress(mockAddressInput);

      const result = await customerService.scrubCustomerPii(testUserId);
      expect(result.success).toBe(true);
      expect(result.scrubbedAt).toBeDefined();

      // Check addresses now return scrubbed placeholder
      const scrubbedAddresses = customerService.getSavedAddresses(testUserId);
      expect(scrubbedAddresses[0].fullName).toBe('[SCRUBBED_BY_USER_REQUEST]');
      expect(scrubbedAddresses[0].addressLine1).toBe('[SCRUBBED_BY_USER_REQUEST]');
      expect(scrubbedAddresses[0].deliveryInstructions).toBeNull();
    });

    it('should block PII scrubbing if customer has active in-transit orders', async () => {
      // 1. Create in-transit order
      const order = await orderProcessingService.createOrder({
        userId: testUserId,
        shippingAddress: {
          fullName: 'Ananya Roy',
          phone: '+919876543210',
          addressLine1: 'B-12, Greenview Apartments',
          city: 'Bengaluru',
          state: 'Karnataka',
          postalCode: '560038',
        },
        items: [
          {
            variantId: 'v1',
            sku: 'AURA-DUAL-ROSE',
            titleSnapshot: 'Personal Grooming Kit',
            unitPricePaise: 299900,
            quantity: 1,
          },
        ],
        subtotalPaise: 299900,
        totalAmountPaise: 299900,
        paymentMethod: 'PREPAID_UPI',
      });

      await orderProcessingService.confirmOrder(order.id);
      await orderProcessingService.updateOrderStatus(order.id, 'PROCESSING');
      await orderProcessingService.updateOrderStatus(order.id, 'DISPATCHED');

      // 2. Attempting to scrub while in transit must be rejected
      await expect(customerService.scrubCustomerPii(testUserId)).rejects.toThrow(
        'Cannot scrub personal profile while you have orders currently in fulfillment or transit.'
      );
    });
  });
});
