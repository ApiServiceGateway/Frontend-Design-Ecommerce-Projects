import { coreRegistry } from '../../core/registry';
import { CoreServiceNames } from '../../core/contracts/service-names';
import { AppError, NotFoundError, ValidationError } from '../../core/errors';
import {
  CreateTicketInput,
  DispatchNotificationResult,
  NotificationRecord,
  SendDiscreetNotificationInput,
  SupportTicketRecord,
} from './types';

export class SupportAndCommsService {
  private ticketsStore = new Map<string, SupportTicketRecord>(); // Key: ticketId
  private notificationsStore = new Map<string, NotificationRecord[]>(); // Key: userId

  // Neutrality filter for discreet communication (zero explicit titles in SMS/WhatsApp/Push)
  private readonly restrictedWords = [
    /\bsex\b/gi,
    /\bdildo\b/gi,
    /\bvibrator\b/gi,
    /\badult toy\b/gi,
    /\berotic\b/gi,
    /\bintimate toy\b/gi,
  ];

  /**
   * Brand Guard: Sanitizes message copy to ensure zero explicit words leak
   * in SMS notifications, lock-screen push alerts, or WhatsApp messages (BR-08)
   */
  public sanitizeNotificationContent(rawText: string): string {
    let sanitized = rawText;
    for (const pattern of this.restrictedWords) {
      sanitized = sanitized.replace(pattern, 'Personal Grooming & Wellness Item');
    }
    return sanitized;
  }

  /**
   * Create a new confidential support ticket in Help Center
   */
  public async createSupportTicket(input: CreateTicketInput): Promise<SupportTicketRecord> {
    const { userId, orderId, category, subject, description, priority = 'NORMAL' } = input;

    if (!subject || subject.trim().length === 0) {
      throw new ValidationError('Ticket subject is required.');
    }

    if (!description || description.trim().length === 0) {
      throw new ValidationError('Ticket description is required.');
    }

    const ticketId = `tick_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const yyyy = new Date().getFullYear();
    const mm = String(new Date().getMonth() + 1).padStart(2, '0');
    const dd = String(new Date().getDate()).padStart(2, '0');
    const ticketNumber = `TICK-${yyyy}${mm}${dd}-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString();

    const ticket: SupportTicketRecord = {
      id: ticketId,
      ticketNumber,
      userId,
      orderId: orderId || null,
      category,
      subject: subject.trim(),
      description: description.trim(),
      status: 'OPEN',
      priority,
      agentResponse: null,
      resolvedAt: null,
      createdAt: now,
      updatedAt: now,
    };

    this.ticketsStore.set(ticketId, ticket);

    // Notify customer in-app that ticket was created
    await this.sendDiscreetNotification({
      userId,
      title: 'Support Request Received',
      message: `Your query ${ticketNumber} has been received. Our discreet support team will reply within 24 hours.`,
      type: 'SUPPORT_REPLY',
      channel: 'IN_APP',
    });

    return ticket;
  }

  /**
   * Support agent resolves a customer inquiry
   */
  public async resolveSupportTicket(
    ticketId: string,
    agentUserId: string,
    agentResponse: string
  ): Promise<SupportTicketRecord> {
    const ticket = this.ticketsStore.get(ticketId);
    if (!ticket) {
      throw new NotFoundError('SupportTicket', ticketId);
    }

    if (!agentResponse || agentResponse.trim().length === 0) {
      throw new ValidationError('An agent response note is required to resolve a ticket.');
    }

    const now = new Date().toISOString();
    ticket.status = 'RESOLVED';
    ticket.agentResponse = agentResponse.trim();
    ticket.resolvedAt = now;
    ticket.updatedAt = now;

    this.ticketsStore.set(ticketId, ticket);

    // Notify customer
    await this.sendDiscreetNotification({
      userId: ticket.userId,
      title: 'Query Resolved',
      message: `Your support ticket ${ticket.ticketNumber} regarding "${ticket.subject}" has been answered by our team.`,
      type: 'SUPPORT_REPLY',
      channel: 'IN_APP',
    });

    return ticket;
  }

  /**
   * Send a discrete multi-channel notification (In-App, WhatsApp MSG91, SMS, Email)
   */
  public async sendDiscreetNotification(
    input: SendDiscreetNotificationInput
  ): Promise<DispatchNotificationResult> {
    const { userId, title, message, type, channel = 'IN_APP', linkUrl } = input;

    // Apply strict brand neutrality guard
    const sanitizedTitle = this.sanitizeNotificationContent(title);
    const sanitizedMessage = this.sanitizeNotificationContent(message);

    const notificationId = `notif_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();

    const notifRecord: NotificationRecord = {
      id: notificationId,
      userId,
      title: sanitizedTitle,
      message: sanitizedMessage,
      type,
      channel,
      isRead: false,
      linkUrl: linkUrl || null,
      createdAt: now,
    };

    // Store in-app notifications
    const existing = this.notificationsStore.get(userId) || [];
    existing.unshift(notifRecord);
    this.notificationsStore.set(userId, existing);

    return {
      notificationId,
      channel,
      sanitizedMessage,
      dispatched: true,
      deliveredTimestamp: now,
    };
  }

  /**
   * Retrieve all in-app notifications for customer
   */
  public getUserNotifications(userId: string): NotificationRecord[] {
    return this.notificationsStore.get(userId) || [];
  }

  /**
   * 1-Click "Mark all as read" for notification center
   */
  public markAllNotificationsAsRead(userId: string): number {
    const notifications = this.notificationsStore.get(userId) || [];
    let updatedCount = 0;

    for (const notif of notifications) {
      if (!notif.isRead) {
        notif.isRead = true;
        updatedCount++;
      }
    }

    return updatedCount;
  }

  /**
   * Retrieve tickets filed by a user
   */
  public getUserTickets(userId: string): SupportTicketRecord[] {
    return Array.from(this.ticketsStore.values()).filter((t) => t.userId === userId);
  }

  /**
   * Helper to retrieve ticket by ID
   */
  public getTicket(ticketId: string): SupportTicketRecord | undefined {
    return this.ticketsStore.get(ticketId);
  }

  /**
   * Clear stores for clean test teardowns
   */
  public clear(): void {
    this.ticketsStore.clear();
    this.notificationsStore.clear();
  }
}

// Export singleton instance and register into coreRegistry
export const supportAndCommsService = new SupportAndCommsService();
coreRegistry.register(CoreServiceNames.DISCREET_PRIVACY, supportAndCommsService);
