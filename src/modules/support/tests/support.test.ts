import { describe, it, expect, beforeEach } from 'vitest';
import {
  SupportAndCommsService,
  supportAndCommsService,
} from '../support.service';
import { coreRegistry } from '../../../core/registry';
import { CoreServiceNames } from '../../../core/contracts/service-names';
import { ValidationError } from '../../../core/errors';

describe('Support, Notifications & Multi-Channel Comms Service', () => {
  let supportService: SupportAndCommsService;
  const testUserId = 'cust_support_test_1';

  beforeEach(() => {
    supportService = new SupportAndCommsService();
    supportService.clear();
  });

  it('should be registered in the CoreServiceRegistry', () => {
    const service = coreRegistry.get<SupportAndCommsService>(CoreServiceNames.DISCREET_PRIVACY);
    expect(service).toBeDefined();
    expect(service).toBe(supportAndCommsService);
  });

  describe('Help Center & Query Hub Ticket Management', () => {
    it('should create confidential support ticket in OPEN status with TICK-YYYYMMDD-XXXX format', async () => {
      const ticket = await supportService.createSupportTicket({
        userId: testUserId,
        category: 'ORDER_RELATED',
        subject: 'Delivery delayed past estimated date',
        description: 'Can you check with Delhivery regarding package #8812?',
      });

      expect(ticket.id).toBeDefined();
      expect(ticket.ticketNumber).toMatch(/^TICK-\d{8}-\d{4}$/);
      expect(ticket.status).toBe('OPEN');
      expect(ticket.category).toBe('ORDER_RELATED');

      // User tickets listing
      const userTickets = supportService.getUserTickets(testUserId);
      expect(userTickets.length).toBe(1);
    });

    it('should allow support agent to resolve ticket with confidential findings', async () => {
      const ticket = await supportService.createSupportTicket({
        userId: testUserId,
        category: 'BILLING_PRIVACY',
        subject: 'Credit card descriptor inquiry',
        description: 'Will this show up on my HDFC bank statement as adult goods?',
      });

      const resolved = await supportService.resolveSupportTicket(
        ticket.id,
        'agent_priya_12',
        'Your transaction is billed 100% neutrally under "Aura Retail & Lifestyle". No product names appear on bank statements.'
      );

      expect(resolved.status).toBe('RESOLVED');
      expect(resolved.agentResponse).toContain('Aura Retail & Lifestyle');
      expect(resolved.resolvedAt).toBeDefined();
    });

    it('should reject tickets with empty subject or description', async () => {
      await expect(
        supportService.createSupportTicket({
          userId: testUserId,
          category: 'GENERAL_INQUIRY',
          subject: '',
          description: 'Empty subject test',
        })
      ).rejects.toThrow(ValidationError);
    });
  });

  describe('Brand Neutrality Guard & Discreet Multi-Channel Comms', () => {
    it('should sanitize explicit adult terms into neutral grooming commodities (BR-08)', () => {
      const rawCopy = 'Your order containing Dual Vibrator and adult toy is out for delivery.';
      const sanitized = supportService.sanitizeNotificationContent(rawCopy);

      expect(sanitized).not.toMatch(/vibrator/i);
      expect(sanitized).not.toMatch(/adult toy/i);
      expect(sanitized).toContain('Personal Grooming & Wellness Item');
    });

    it('should dispatch sanitized in-app notification and support 1-click mark-all-as-read', async () => {
      await supportService.sendDiscreetNotification({
        userId: testUserId,
        title: 'Order Dispatched',
        message: 'Your personal grooming kit is on its way.',
        type: 'ORDER_UPDATE',
        channel: 'IN_APP',
      });

      await supportService.sendDiscreetNotification({
        userId: testUserId,
        title: 'New Voucher Available',
        message: 'A ₹200 gift voucher was credited to your account.',
        type: 'PROMO',
        channel: 'IN_APP',
      });

      const notifications = supportService.getUserNotifications(testUserId);
      expect(notifications.length).toBe(2);
      expect(notifications[0].isRead).toBe(false);

      // 1-Click mark all as read
      const updatedCount = supportService.markAllNotificationsAsRead(testUserId);
      expect(updatedCount).toBe(2);

      const refreshed = supportService.getUserNotifications(testUserId);
      expect(refreshed.every((n) => n.isRead)).toBe(true);
    });
  });
});
