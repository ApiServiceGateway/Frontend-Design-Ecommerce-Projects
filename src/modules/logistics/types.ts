/**
 * Logistics, Shipping & Neutral Fulfillment Domain Types
 */

import { ShipmentStatus } from '@prisma/client';

export interface IndianPostalPinRecord {
  pincode: string; // 6-digit
  city: string;
  state: string;
  isServiceable: boolean;
  isCodAvailable: boolean;
  estimatedDeliveryDays: number;
}

export interface ShipmentRecord {
  id: string;
  orderId: string;
  orderNumber: string;
  awbNumber: string;
  courierPartner: 'DELHIVERY' | 'SHIPROCKET' | 'BLUEDART';
  senderDeclaredName: string; // "Aura Retail & Lifestyle" (BR-08)
  packageDescription: string; // "Personal Grooming & Wellness Kits" (BR-08)
  status: ShipmentStatus;
  weightGrams: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  shippingAddress: {
    fullName: string;
    city: string;
    state: string;
    postalCode: string;
  };
  dispatchedAt?: string | null;
  deliveredAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateShipmentInput {
  orderId: string;
  orderNumber: string;
  courierPartner?: 'DELHIVERY' | 'SHIPROCKET' | 'BLUEDART';
  weightGrams?: number;
  shippingAddress: {
    fullName: string;
    city: string;
    state: string;
    postalCode: string;
  };
}

export interface DiscreetShippingLabel {
  awbNumber: string;
  orderNumber: string;
  courierPartner: string;
  sender: {
    name: string; // "Aura Retail & Lifestyle" (BR-08)
    address: string;
  };
  recipient: {
    name: string;
    city: string;
    state: string;
    postalCode: string;
  };
  declaredContents: string; // "Personal Grooming & Wellness Kits"
  packageType: string; // "Plain Brown Corrugated Box with Tamper-Evident Tape"
  barcodeText: string;
}

export interface CourierWebhookPayload {
  awbNumber: string;
  currentStatus: ShipmentStatus;
  timestamp: string;
  location?: string;
  courierRemarks?: string;
}
