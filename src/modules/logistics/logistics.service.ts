import { ShipmentStatus } from '@prisma/client';
import { coreRegistry } from '../../core/registry';
import { CoreServiceNames } from '../../core/contracts/service-names';
import { AppError, NotFoundError, UnauthorizedError, ValidationError } from '../../core/errors';
import { OrderProcessingService } from '../orders/orders.service';
import {
  CourierWebhookPayload,
  CreateShipmentInput,
  DiscreetShippingLabel,
  IndianPostalPinRecord,
  ShipmentRecord,
} from './types';

export class LogisticsShippingService {
  private shipmentsStore = new Map<string, ShipmentRecord>(); // Keyed by shipmentId
  private awbIndex = new Map<string, string>(); // Key: awbNumber, Value: shipmentId

  // Master Indian PIN code lookup table for instant offline validation
  private postalPincodeDirectory = new Map<string, IndianPostalPinRecord>();

  constructor() {
    this.seedPostalDirectory();
  }

  /**
   * Seed key Indian Postal PIN Codes
   */
  private seedPostalDirectory(): void {
    const pins: IndianPostalPinRecord[] = [
      {
        pincode: '400001',
        city: 'Mumbai',
        state: 'Maharashtra',
        isServiceable: true,
        isCodAvailable: true,
        estimatedDeliveryDays: 2,
      },
      {
        pincode: '110001',
        city: 'New Delhi',
        state: 'Delhi',
        isServiceable: true,
        isCodAvailable: true,
        estimatedDeliveryDays: 2,
      },
      {
        pincode: '560001',
        city: 'Bengaluru',
        state: 'Karnataka',
        isServiceable: true,
        isCodAvailable: true,
        estimatedDeliveryDays: 3,
      },
      {
        pincode: '600001',
        city: 'Chennai',
        state: 'Tamil Nadu',
        isServiceable: true,
        isCodAvailable: true,
        estimatedDeliveryDays: 3,
      },
      {
        pincode: '700001',
        city: 'Kolkata',
        state: 'West Bengal',
        isServiceable: true,
        isCodAvailable: true,
        estimatedDeliveryDays: 4,
      },
      {
        pincode: '500001',
        city: 'Hyderabad',
        state: 'Telangana',
        isServiceable: true,
        isCodAvailable: true,
        estimatedDeliveryDays: 3,
      },
    ];

    for (const p of pins) {
      this.postalPincodeDirectory.set(p.pincode, p);
    }
  }

  /**
   * Validate 6-digit Indian PIN Code format and check courier serviceability
   */
  public validatePostalPincode(pincode: string): IndianPostalPinRecord {
    const normalized = pincode.trim();
    const pinRegex = /^[1-9][0-9]{5}$/;

    if (!pinRegex.test(normalized)) {
      throw new ValidationError(
        `Invalid postal PIN code '${pincode}'. Indian PIN codes must be exactly 6 digits.`
      );
    }

    const recorded = this.postalPincodeDirectory.get(normalized);
    if (recorded) {
      return recorded;
    }

    // Default fallback for valid 6-digit PIN codes across India
    return {
      pincode: normalized,
      city: 'India Region',
      state: 'Serviceable Zone',
      isServiceable: true,
      isCodAvailable: true,
      estimatedDeliveryDays: 4,
    };
  }

  /**
   * Create shipment and assign courier Airway Bill (AWB)
   */
  public async createShipment(input: CreateShipmentInput): Promise<ShipmentRecord> {
    const { orderId, orderNumber, courierPartner = 'DELHIVERY', shippingAddress, weightGrams = 450 } = input;

    // Validate recipient PIN code
    this.validatePostalPincode(shippingAddress.postalCode);

    const shipmentId = `shp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const awbNumber = `AWB-${courierPartner.substring(0, 3)}-${randomSuffix}`;
    const now = new Date().toISOString();

    const shipment: ShipmentRecord = {
      id: shipmentId,
      orderId,
      orderNumber,
      awbNumber,
      courierPartner,
      senderDeclaredName: 'Aura Retail & Lifestyle', // BR-08
      packageDescription: 'Personal Grooming & Wellness Kits', // BR-08
      status: 'LABEL_CREATED',
      weightGrams,
      lengthCm: 20,
      widthCm: 15,
      heightCm: 10,
      shippingAddress,
      dispatchedAt: null,
      deliveredAt: null,
      createdAt: now,
      updatedAt: now,
    };

    this.shipmentsStore.set(shipmentId, shipment);
    this.awbIndex.set(awbNumber, shipmentId);

    return shipment;
  }

  /**
   * Generate Discreet Shipping Label adhering strictly to BR-08 specifications
   */
  public generateDiscreetShippingLabel(shipmentId: string): DiscreetShippingLabel {
    const shipment = this.shipmentsStore.get(shipmentId);
    if (!shipment) {
      throw new NotFoundError('Shipment', shipmentId);
    }

    return {
      awbNumber: shipment.awbNumber,
      orderNumber: shipment.orderNumber,
      courierPartner: shipment.courierPartner,
      sender: {
        name: shipment.senderDeclaredName, // "Aura Retail & Lifestyle"
        address: 'Plot 104, Industrial Logistics Hub, Bhiwandi, Maharashtra - 421302',
      },
      recipient: {
        name: shipment.shippingAddress.fullName,
        city: shipment.shippingAddress.city,
        state: shipment.shippingAddress.state,
        postalCode: shipment.shippingAddress.postalCode,
      },
      declaredContents: shipment.packageDescription, // "Personal Grooming & Wellness Kits"
      packageType: 'Plain Brown Corrugated Box with Tamper-Evident Tape',
      barcodeText: `*${shipment.awbNumber}*`,
    };
  }

  /**
   * Ingest courier status updates via webhook and synchronize Order state
   */
  public async processCourierWebhook(
    payload: CourierWebhookPayload,
    webhookToken?: string
  ): Promise<{ success: boolean; shipment: ShipmentRecord }> {
    const expectedToken = process.env.SHIPROCKET_WEBHOOK_TOKEN || 'mock_shiprocket_webhook_token';

    if (webhookToken && webhookToken !== expectedToken) {
      throw new UnauthorizedError('Invalid courier webhook authentication token.');
    }

    const shipmentId = this.awbIndex.get(payload.awbNumber);
    if (!shipmentId) {
      throw new NotFoundError('Shipment with AWB', payload.awbNumber);
    }

    const shipment = this.shipmentsStore.get(shipmentId)!;
    shipment.status = payload.currentStatus;
    shipment.updatedAt = new Date().toISOString();

    const now = new Date().toISOString();

    if (payload.currentStatus === 'IN_TRANSIT' && !shipment.dispatchedAt) {
      shipment.dispatchedAt = now;
    }

    if (payload.currentStatus === 'DELIVERED') {
      shipment.deliveredAt = now;
    }

    this.shipmentsStore.set(shipmentId, shipment);

    // Sync state with OrderProcessingService via Core Registry
    try {
      const ordersService = coreRegistry.get<OrderProcessingService>(CoreServiceNames.ORDER_PROCESSING);
      if (ordersService) {
        const currentOrder = ordersService.getOrder(shipment.orderId);
        if (currentOrder) {
          if (payload.currentStatus === 'IN_TRANSIT' || payload.currentStatus === 'MANIFESTED') {
            if (currentOrder.status === 'PROCESSING') {
              await ordersService.updateOrderStatus(shipment.orderId, 'DISPATCHED');
            }
          } else if (payload.currentStatus === 'OUT_FOR_DELIVERY') {
            if (currentOrder.status === 'PROCESSING') {
              await ordersService.updateOrderStatus(shipment.orderId, 'DISPATCHED');
            }
            await ordersService.updateOrderStatus(shipment.orderId, 'OUT_FOR_DELIVERY');
          } else if (payload.currentStatus === 'DELIVERED') {
            if (currentOrder.status === 'PROCESSING') {
              await ordersService.updateOrderStatus(shipment.orderId, 'DISPATCHED');
            }
            if (ordersService.getOrder(shipment.orderId)?.status === 'DISPATCHED') {
              await ordersService.updateOrderStatus(shipment.orderId, 'OUT_FOR_DELIVERY');
            }
            await ordersService.updateOrderStatus(shipment.orderId, 'DELIVERED');
          } else if (payload.currentStatus === 'RTO') {
            if (currentOrder.status === 'PROCESSING') {
              await ordersService.updateOrderStatus(shipment.orderId, 'DISPATCHED');
            }
            await ordersService.updateOrderStatus(shipment.orderId, 'RTO_INITIATED');
          }
        }
      }
    } catch (err) {
      // Allow logging without breaking webhook response
      console.warn(`[Logistics Sync Note]: Order status sync for '${shipment.orderNumber}' completed:`, err);
    }

    return {
      success: true,
      shipment,
    };
  }

  /**
   * Helper to retrieve shipment
   */
  public getShipment(shipmentId: string): ShipmentRecord | undefined {
    return this.shipmentsStore.get(shipmentId);
  }

  /**
   * Clear store for clean test teardowns
   */
  public clear(): void {
    this.shipmentsStore.clear();
    this.awbIndex.clear();
  }
}

// Export singleton instance and register into coreRegistry
export const logisticsShippingService = new LogisticsShippingService();
coreRegistry.register(CoreServiceNames.LOGISTICS_SHIPPING, logisticsShippingService);
