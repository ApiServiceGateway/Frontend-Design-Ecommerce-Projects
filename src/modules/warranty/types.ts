/**
 * Warranty Claims, 24-Hour DOA & Store Credit Domain Types
 */

import { WarrantyClaimStatus } from '@prisma/client';

export interface WarrantyClaimRecord {
  id: string;
  claimNumber: string; // "CLAIM-YYYYMMDD-XXXX"
  orderId: string;
  orderNumber: string;
  userId: string;
  variantId: string;
  sku: string;
  videoStorageUri: string; // Pre-signed Cloudflare R2 / S3 URI
  defectDescription: string;
  status: WarrantyClaimStatus;
  adminReviewNotes?: string | null;
  reviewedByUserId?: string | null;
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoreCreditVoucherRecord {
  id: string;
  voucherCode: string; // "AURA-VOUCH-XXXX"
  userId: string;
  claimId: string;
  balancePaise: number; // 100% purchase price of defective SKU
  expiresAt: string; // Now + 365 days (BR-14)
  isRedeemed: boolean;
  createdAt: string;
}

export interface SubmitDoaClaimInput {
  orderId: string;
  userId: string;
  variantId: string;
  sku: string;
  itemPricePaise: number;
  videoStorageUri: string;
  defectDescription: string;
  referenceDate?: Date; // For testing submission timestamp
}

export interface ReviewClaimInput {
  claimId: string;
  adminUserId: string;
  decision: 'APPROVE_STORE_CREDIT' | 'APPROVE_REPLACEMENT' | 'REJECT';
  reviewNotes: string;
  itemPricePaise: number;
}
