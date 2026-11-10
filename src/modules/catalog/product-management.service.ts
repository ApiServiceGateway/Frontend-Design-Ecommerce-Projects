import { coreEventBus } from '../../core/event-bus';
import { coreRegistry } from '../../core/registry';
import { CoreServiceNames } from '../../core/contracts/service-names';
import {
  AdminProductOverrideInput,
  CatalogQueryOptions,
  MedicalBadgeItem,
  ProductComputedMeta,
  ProductRecord,
  RankedProduct,
} from './types';

export class ProductManagementService {
  /**
   * Computes dynamic badges, medical compliance labels, and composite ranking score
   * based on product properties, sales data, and admin override flags.
   */
  public computeProductBadgesAndLabels(
    product: ProductRecord,
    salesMetrics?: { totalUnitsSold?: number; categoryTopSellerThreshold?: number },
    daysAsNewThreshold: number = 7,
    referenceDate: Date = new Date()
  ): ProductComputedMeta {
    // 1. Calculate Age / New Arrival Status
    const createdDate = new Date(product.createdAt);
    const diffMs = referenceDate.getTime() - createdDate.getTime();
    const daysOld = diffMs / (1000 * 60 * 60 * 24);

    const isNaturallyNew = daysOld >= 0 && daysOld <= daysAsNewThreshold;
    const isNewArrival = Boolean(product.isManualNewArrival || isNaturallyNew);

    // 2. Calculate Best Seller Status
    const unitsSold = product.totalUnitsSold ?? salesMetrics?.totalUnitsSold ?? 0;
    const topSellerThreshold = salesMetrics?.categoryTopSellerThreshold ?? 50;
    const isNaturallyBestSeller = unitsSold >= topSellerThreshold && topSellerThreshold > 0;
    const isBestSeller = Boolean(product.isManualBestSeller || isNaturallyBestSeller);

    // 3. Determine Display Badge Label (Admin override takes highest precedence)
    let displayBadgeLabel: string | null = null;
    if (product.customBadgeLabel && product.customBadgeLabel.trim().length > 0) {
      displayBadgeLabel = product.customBadgeLabel.trim();
    } else if (isBestSeller) {
      displayBadgeLabel = 'BEST SELLER';
    } else if (isNewArrival) {
      displayBadgeLabel = 'NEW';
    }

    // 4. Extract Medical & Anatomical Safety Badges
    const certSet = new Set<string>();

    if (product.materialType && /silicone/i.test(product.materialType)) {
      certSet.add('100% Medical-Grade Body Safe Silicone');
    }
    if (product.isPhthalateFree) {
      certSet.add('100% Phthalate-Free');
    }
    if (product.isWaterproof) {
      certSet.add('IPX7 100% Waterproof');
    }
    if (product.noiseLevelDb && product.noiseLevelDb <= 50) {
      certSet.add(`Sub-50dB Whisper Quiet (${product.noiseLevelDb}dB)`);
    }

    if (Array.isArray(product.badges)) {
      product.badges.forEach((b: MedicalBadgeItem) => {
        if (b.name) certSet.add(b.name);
      });
    }

    // 5. Calculate Final Rank Score for catalog ranking
    // Formula: (customRankWeight * 10) + (unitsSold * 2) + (isBestSeller ? 100 : 0) + (isNewArrival ? 50 : 0)
    const baseRankWeight = (product.customRankWeight ?? 0) * 10;
    const salesRankWeight = unitsSold * 2;
    const bestSellerBonus = isBestSeller ? 100 : 0;
    const newArrivalBonus = isNewArrival ? 50 : 0;

    const finalRankScore = baseRankWeight + salesRankWeight + bestSellerBonus + newArrivalBonus;

    return {
      isNewArrival,
      isBestSeller,
      displayBadgeLabel,
      medicalCertifications: Array.from(certSet),
      finalRankScore,
    };
  }

  /**
   * Ranks and filters a collection of products based on category, price,
   * medical safety specifications, and sorting rules.
   */
  public rankAndFilterProducts(
    products: ProductRecord[],
    options: CatalogQueryOptions = {}
  ): RankedProduct[] {
    const {
      categoryId,
      sort = 'TOP_RANKED',
      minPricePaise,
      maxPricePaise,
      isWaterproofOnly = false,
      isPhthalateFreeOnly = false,
      includeInactive = false,
      daysAsNewThreshold = 7,
      categoryTopSellerThreshold = 50,
    } = options;

    // Helper to get minimum variant price
    const getMinPrice = (p: ProductRecord): number => {
      if (!p.variants || p.variants.length === 0) return 0;
      return Math.min(...p.variants.map((v) => v.pricePaise));
    };

    // 1. Filter Products
    const filtered = products.filter((product) => {
      // Inactive check
      if (!includeInactive && !product.isActive) {
        return false;
      }

      // Category check
      if (categoryId && product.categoryId !== categoryId) {
        return false;
      }

      // Waterproof check
      if (isWaterproofOnly && !product.isWaterproof) {
        return false;
      }

      // Phthalate check
      if (isPhthalateFreeOnly && !product.isPhthalateFree) {
        return false;
      }

      // Price filter
      const minPrice = getMinPrice(product);
      if (minPricePaise !== undefined && minPrice < minPricePaise) {
        return false;
      }
      if (maxPricePaise !== undefined && minPrice > maxPricePaise) {
        return false;
      }

      return true;
    });

    // 2. Attach Computed Metadata
    const rankedProducts: RankedProduct[] = filtered.map((product) => {
      const meta = this.computeProductBadgesAndLabels(
        product,
        {
          totalUnitsSold: product.totalUnitsSold,
          categoryTopSellerThreshold,
        },
        daysAsNewThreshold
      );
      return {
        ...product,
        meta,
      };
    });

    // 3. Sort Products
    rankedProducts.sort((a, b) => {
      switch (sort) {
        case 'TOP_RANKED':
          // Sort descending by finalRankScore
          return b.meta.finalRankScore - a.meta.finalRankScore;

        case 'BEST_SELLING': {
          const aSales = (a.totalUnitsSold ?? 0) + (a.meta.isBestSeller ? 1000 : 0);
          const bSales = (b.totalUnitsSold ?? 0) + (b.meta.isBestSeller ? 1000 : 0);
          return bSales - aSales;
        }

        case 'NEW_ARRIVALS': {
          const aTime = new Date(a.createdAt).getTime() + (a.isManualNewArrival ? 1e12 : 0);
          const bTime = new Date(b.createdAt).getTime() + (b.isManualNewArrival ? 1e12 : 0);
          return bTime - aTime;
        }

        case 'PRICE_LOW_TO_HIGH':
          return getMinPrice(a) - getMinPrice(b);

        case 'PRICE_HIGH_TO_LOW':
          return getMinPrice(b) - getMinPrice(a);

        default:
          return 0;
      }
    });

    return rankedProducts;
  }

  /**
   * Applies admin modifications to product flags and ranks, then emits
   * a decoupled Core Event for downstream caches or search indices.
   */
  public applyAdminProductOverrides(
    product: ProductRecord,
    overrides: AdminProductOverrideInput
  ): RankedProduct {
    const updated: ProductRecord = {
      ...product,
      customRankWeight:
        overrides.customRankWeight !== undefined
          ? overrides.customRankWeight
          : product.customRankWeight,
      isManualBestSeller:
        overrides.isManualBestSeller !== undefined
          ? overrides.isManualBestSeller
          : product.isManualBestSeller,
      isManualNewArrival:
        overrides.isManualNewArrival !== undefined
          ? overrides.isManualNewArrival
          : product.isManualNewArrival,
      customBadgeLabel:
        overrides.customBadgeLabel !== undefined
          ? overrides.customBadgeLabel
          : product.customBadgeLabel,
      isActive: overrides.isActive !== undefined ? overrides.isActive : product.isActive,
      updatedAt: new Date().toISOString(),
    };

    const meta = this.computeProductBadgesAndLabels(updated);

    // Notify the decoupled Event Bus
    coreEventBus.emit('PRODUCT_UPDATED', {
      eventId: `evt_${Date.now()}`,
      timestamp: new Date().toISOString(),
      productId: updated.id,
      slug: updated.slug,
      manualLabel: updated.customBadgeLabel || undefined,
      rankWeight: updated.customRankWeight,
    });

    return {
      ...updated,
      meta,
    };
  }
}

// Export singleton instance and register to coreRegistry
export const productManagementService = new ProductManagementService();
coreRegistry.register(CoreServiceNames.PRODUCT_MANAGEMENT, productManagementService);
