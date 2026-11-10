/**
 * Product & Catalog Domain Types
 */

export interface ProductVariantItem {
  id: string;
  sku: string;
  color?: string | null;
  pricePaise: number;
  compareAtPricePaise?: number | null;
}

export interface MedicalBadgeItem {
  code: string;
  name: string;
  description: string;
}

export interface ProductRecord {
  id: string;
  slug: string;
  title: string;
  brand: string;
  description: string;
  materialType: string;
  isPhthalateFree: boolean;
  isWaterproof: boolean;
  noiseLevelDb: number;
  specs?: Record<string, unknown> | null;
  isActive: boolean;
  categoryId: string;
  createdAt: Date | string;
  updatedAt: Date | string;

  // Admin Configurable Dynamic Overrides
  customRankWeight: number; // e.g. 0 to 1000
  isManualBestSeller: boolean;
  isManualNewArrival: boolean;
  customBadgeLabel?: string | null;

  // Sales and Analytics
  totalUnitsSold?: number;

  variants?: ProductVariantItem[];
  badges?: MedicalBadgeItem[];
}

export interface ProductComputedMeta {
  isNewArrival: boolean;
  isBestSeller: boolean;
  displayBadgeLabel: string | null;
  medicalCertifications: string[];
  finalRankScore: number;
}

export interface RankedProduct extends ProductRecord {
  meta: ProductComputedMeta;
}

export type CatalogSortOption =
  | 'TOP_RANKED'
  | 'BEST_SELLING'
  | 'NEW_ARRIVALS'
  | 'PRICE_LOW_TO_HIGH'
  | 'PRICE_HIGH_TO_LOW';

export interface CatalogQueryOptions {
  categoryId?: string;
  sort?: CatalogSortOption;
  minPricePaise?: number;
  maxPricePaise?: number;
  isWaterproofOnly?: boolean;
  isPhthalateFreeOnly?: boolean;
  includeInactive?: boolean; // false for public, true for admin
  daysAsNewThreshold?: number; // default 7 days
  categoryTopSellerThreshold?: number; // default threshold units sold
}

export interface AdminProductOverrideInput {
  customRankWeight?: number;
  isManualBestSeller?: boolean;
  isManualNewArrival?: boolean;
  customBadgeLabel?: string | null;
  isActive?: boolean;
}
