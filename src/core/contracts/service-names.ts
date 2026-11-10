/**
 * Strongly Typed Service Registry Names
 */

export const CoreServiceNames = {
  PRODUCT_MANAGEMENT: 'productManagement',
  INVENTORY_RESERVATION: 'inventoryReservation',
  CHECKOUT_PRICING: 'checkoutPricing',
  ORDER_PROCESSING: 'orderProcessing',
  AUTH_COMPLIANCE: 'authCompliance',
  LOGISTICS_SHIPPING: 'logisticsShipping',
  WARRANTY_CLAIMS: 'warrantyClaims',
  CUSTOMER_PROFILE: 'customerProfile',
  AI_ASSISTANT: 'aiAssistant',
  DISCREET_PRIVACY: 'discreetPrivacy',
} as const;

export type CoreServiceName = typeof CoreServiceNames[keyof typeof CoreServiceNames];
