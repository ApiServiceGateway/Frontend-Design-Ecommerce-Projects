/**
 * Support Tickets, Query Hub & Multi-Channel Comms Domain Types
 */

import { NotificationChannel, TicketCategory, TicketStatus } from '@prisma/client';

export interface SupportTicketRecord {
  id: string;
  ticketNumber: string; // "TICK-YYYYMMDD-XXXX"
  userId: string;
  orderId?: string | null;
  category: TicketCategory;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
  agentResponse?: string | null;
  resolvedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTicketInput {
  userId: string;
  orderId?: string;
  category: TicketCategory;
  subject: string;
  description: string;
  priority?: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
}

export interface NotificationRecord {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'ORDER_UPDATE' | 'SECURITY_ALERT' | 'PROMO' | 'SUPPORT_REPLY';
  channel: NotificationChannel;
  isRead: boolean;
  linkUrl?: string | null;
  createdAt: string;
}

export interface SendDiscreetNotificationInput {
  userId: string;
  title: string;
  message: string;
  type: 'ORDER_UPDATE' | 'SECURITY_ALERT' | 'PROMO' | 'SUPPORT_REPLY';
  channel?: NotificationChannel;
  linkUrl?: string;
  recipientPhone?: string;
  recipientEmail?: string;
}

export interface DispatchNotificationResult {
  notificationId: string;
  channel: NotificationChannel;
  sanitizedMessage: string;
  dispatched: boolean;
  deliveredTimestamp: string;
}
