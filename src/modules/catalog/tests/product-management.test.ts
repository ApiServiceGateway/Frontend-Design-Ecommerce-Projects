import { describe, it, expect, vi } from 'vitest';
import {
  ProductManagementService,
  productManagementService,
} from '../product-management.service';
import { ProductRecord } from '../types';
import { coreRegistry } from '../../../core/registry';
import { CoreServiceNames } from '../../../core/contracts/service-names';
import { coreEventBus } from '../../../core/event-bus';

describe('Product Management & Ranking Service', () => {
  const baseProduct: ProductRecord = {
    id: 'prod_1',
    slug: 'aura-dual-sonic-stimulator',
    title: 'Aura Dual Sonic Stimulator',
    brand: 'Aura Care',
    description: 'Medical grade silicone wellness device',
    materialType: 'Medical Grade Silicone',
    isPhthalateFree: true,
    isWaterproof: true,
    noiseLevelDb: 42,
    isActive: true,
    categoryId: 'cat_wellness',
    createdAt: new Date().toISOString(), // Created today
    updatedAt: new Date().toISOString(),
    customRankWeight: 10,
    isManualBestSeller: false,
    isManualNewArrival: false,
    totalUnitsSold: 12,
    variants: [
      {
        id: 'var_1',
        sku: 'AURA-DUAL-ROSE',
        color: 'Rose Gold',
        pricePaise: 299900, // ₹2,999.00
      },
    ],
  };

  it('should be registered in the CoreServiceRegistry', () => {
    const service = coreRegistry.get<ProductManagementService>(CoreServiceNames.PRODUCT_MANAGEMENT);
    expect(service).toBeDefined();
    expect(service).toBe(productManagementService);
  });

  describe('Dynamic Badge and Label Computation', () => {
    it('should assign "NEW" label to products created within 7 days', () => {
      const service = new ProductManagementService();
      const meta = service.computeProductBadgesAndLabels(baseProduct);

      expect(meta.isNewArrival).toBe(true);
      expect(meta.displayBadgeLabel).toBe('NEW');
    });

    it('should assign "BEST SELLER" label when sales meet or exceed threshold', () => {
      const service = new ProductManagementService();
      const highSalesProduct: ProductRecord = {
        ...baseProduct,
        createdAt: '2025-01-01T00:00:00Z', // Old product (>7 days)
        totalUnitsSold: 150,
      };

      const meta = service.computeProductBadgesAndLabels(
        highSalesProduct,
        { categoryTopSellerThreshold: 100 },
        7,
        new Date('2026-01-01')
      );

      expect(meta.isNewArrival).toBe(false);
      expect(meta.isBestSeller).toBe(true);
      expect(meta.displayBadgeLabel).toBe('BEST SELLER');
    });

    it('should respect admin manual override for "NEW" even if product is old', () => {
      const service = new ProductManagementService();
      const oldProductWithOverride: ProductRecord = {
        ...baseProduct,
        createdAt: '2024-01-01T00:00:00Z',
        isManualNewArrival: true,
      };

      const meta = service.computeProductBadgesAndLabels(
        oldProductWithOverride,
        undefined,
        7,
        new Date('2026-01-01')
      );

      expect(meta.isNewArrival).toBe(true);
      expect(meta.displayBadgeLabel).toBe('NEW');
    });

    it('should respect admin manual override for "BEST SELLER" even if sales are zero', () => {
      const service = new ProductManagementService();
      const zeroSalesBestSeller: ProductRecord = {
        ...baseProduct,
        createdAt: '2024-01-01T00:00:00Z',
        totalUnitsSold: 0,
        isManualBestSeller: true,
      };

      const meta = service.computeProductBadgesAndLabels(
        zeroSalesBestSeller,
        { categoryTopSellerThreshold: 100 },
        7,
        new Date('2026-01-01')
      );

      expect(meta.isBestSeller).toBe(true);
      expect(meta.displayBadgeLabel).toBe('BEST SELLER');
    });

    it('should give highest badge priority to customBadgeLabel (e.g. Editor\'s Pick)', () => {
      const service = new ProductManagementService();
      const customLabelProduct: ProductRecord = {
        ...baseProduct,
        isManualBestSeller: true,
        isManualNewArrival: true,
        customBadgeLabel: "Editor's Choice",
      };

      const meta = service.computeProductBadgesAndLabels(customLabelProduct);
      expect(meta.displayBadgeLabel).toBe("Editor's Choice");
    });

    it('should extract correct medical safety certifications', () => {
      const service = new ProductManagementService();
      const meta = service.computeProductBadgesAndLabels(baseProduct);

      expect(meta.medicalCertifications).toContain('100% Medical-Grade Body Safe Silicone');
      expect(meta.medicalCertifications).toContain('100% Phthalate-Free');
      expect(meta.medicalCertifications).toContain('IPX7 100% Waterproof');
      expect(meta.medicalCertifications).toContain('Sub-50dB Whisper Quiet (42dB)');
    });
  });

  describe('Filtering and Catalog Ranking', () => {
    const p1: ProductRecord = {
      ...baseProduct,
      id: 'p1',
      title: 'Top Ranked Wand',
      customRankWeight: 100, // Very high admin rank weight
      totalUnitsSold: 20,
      variants: [{ id: 'v1', sku: 'WAND-1', pricePaise: 400000 }],
    };

    const p2: ProductRecord = {
      ...baseProduct,
      id: 'p2',
      title: 'Affordable Mini Bullet',
      customRankWeight: 5,
      totalUnitsSold: 250, // Best seller
      isManualBestSeller: true,
      variants: [{ id: 'v2', sku: 'BULLET-1', pricePaise: 149900 }],
    };

    const p3: ProductRecord = {
      ...baseProduct,
      id: 'p3',
      title: 'Inactive Clearance Toy',
      isActive: false,
      customRankWeight: 1,
      variants: [{ id: 'v3', sku: 'TOY-OLD', pricePaise: 99900 }],
    };

    it('should exclude inactive products by default for public catalog queries', () => {
      const service = new ProductManagementService();
      const results = service.rankAndFilterProducts([p1, p2, p3]);

      expect(results.length).toBe(2);
      expect(results.map((r) => r.id)).not.toContain('p3');
    });

    it('should include inactive products when includeInactive is true (Admin View)', () => {
      const service = new ProductManagementService();
      const results = service.rankAndFilterProducts([p1, p2, p3], { includeInactive: true });

      expect(results.length).toBe(3);
      expect(results.map((r) => r.id)).toContain('p3');
    });

    it('should sort correctly by TOP_RANKED', () => {
      const service = new ProductManagementService();
      const results = service.rankAndFilterProducts([p2, p1]);

      // p1 has customRankWeight 100 (* 10 = 1000) which beats p2
      expect(results[0].id).toBe('p1');
      expect(results[1].id).toBe('p2');
    });

    it('should sort correctly by PRICE_LOW_TO_HIGH and PRICE_HIGH_TO_LOW', () => {
      const service = new ProductManagementService();
      const lowToHigh = service.rankAndFilterProducts([p1, p2], { sort: 'PRICE_LOW_TO_HIGH' });
      expect(lowToHigh[0].id).toBe('p2'); // ₹1,499 vs ₹4,000

      const highToLow = service.rankAndFilterProducts([p1, p2], { sort: 'PRICE_HIGH_TO_LOW' });
      expect(highToLow[0].id).toBe('p1');
    });
  });

  describe('Admin Product Overrides and Decoupled Event Publication', () => {
    it('should update product attributes and publish PRODUCT_UPDATED event on coreEventBus', () => {
      const service = new ProductManagementService();
      const emitSpy = vi.spyOn(coreEventBus, 'emit');

      const updated = service.applyAdminProductOverrides(baseProduct, {
        customRankWeight: 88,
        customBadgeLabel: 'Trending Now',
        isManualBestSeller: true,
      });

      expect(updated.customRankWeight).toBe(88);
      expect(updated.customBadgeLabel).toBe('Trending Now');
      expect(updated.isManualBestSeller).toBe(true);
      expect(updated.meta.displayBadgeLabel).toBe('Trending Now');

      expect(emitSpy).toHaveBeenCalledWith(
        'PRODUCT_UPDATED',
        expect.objectContaining({
          productId: baseProduct.id,
          slug: baseProduct.slug,
          manualLabel: 'Trending Now',
          rankWeight: 88,
        })
      );
    });
  });
});
