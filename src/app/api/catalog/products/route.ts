import { NextRequest } from 'next/server';
import { jsonSuccess, jsonError } from '@/core/api-handler';
import { productManagementService } from '@/modules/catalog/product-management.service';
import { CatalogSortOption, ProductRecord } from '@/modules/catalog/types';

const catalogSeed: ProductRecord[] = [
  {
    id: 'prod_aura_dual',
    slug: 'aura-dual-sonic-stimulator',
    title: 'Aura Dual Sonic Stimulator',
    brand: 'Aura Care',
    description: 'Ergonomic dual-stimulation personal wellness device with medical-grade silicone.',
    materialType: 'Medical Grade Silicone',
    isPhthalateFree: true,
    isWaterproof: true,
    noiseLevelDb: 42,
    isActive: true,
    categoryId: 'cat_wellness',
    customRankWeight: 50,
    isManualBestSeller: false,
    isManualNewArrival: false,
    totalUnitsSold: 85,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    variants: [
      { id: 'v1', sku: 'AURA-DUAL-ROSE', color: 'Rose Gold', pricePaise: 299900, compareAtPricePaise: 399900 },
      { id: 'v2', sku: 'AURA-DUAL-MIDNIGHT', color: 'Midnight Onyx', pricePaise: 299900, compareAtPricePaise: 399900 },
    ],
  },
  {
    id: 'prod_aura_wand',
    slug: 'aura-luxury-relaxation-wand',
    title: 'Aura Luxury Relaxation Wand',
    brand: 'Aura Care',
    description: 'Sub-50dB whisper quiet deep-tissue wellness massager.',
    materialType: 'Medical Grade Silicone / ABS',
    isPhthalateFree: true,
    isWaterproof: true,
    noiseLevelDb: 46,
    isActive: true,
    categoryId: 'cat_wands',
    customRankWeight: 90,
    isManualBestSeller: true,
    isManualNewArrival: false,
    totalUnitsSold: 320,
    createdAt: new Date('2025-01-01').toISOString(),
    updatedAt: new Date().toISOString(),
    variants: [
      { id: 'v3', sku: 'AURA-WAND-PURPLE', color: 'Velvet Purple', pricePaise: 449900, compareAtPricePaise: 599900 },
    ],
  },
  {
    id: 'prod_aura_mini',
    slug: 'aura-discreet-bullet-massager',
    title: 'Aura Discreet Pocket Bullet',
    brand: 'Aura Care',
    description: 'Ultra-portable pocket massager with travel lock.',
    materialType: 'Body-Safe ABS Polymer',
    isPhthalateFree: true,
    isWaterproof: false,
    noiseLevelDb: 38,
    isActive: true,
    categoryId: 'cat_bullets',
    customRankWeight: 10,
    isManualBestSeller: false,
    isManualNewArrival: true,
    totalUnitsSold: 12,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    variants: [
      { id: 'v4', sku: 'AURA-BULLET-SILVER', color: 'Metallic Silver', pricePaise: 149900, compareAtPricePaise: 199900 },
    ],
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId') || undefined;
    const sort = (searchParams.get('sort') as CatalogSortOption) || 'TOP_RANKED';
    const isWaterproofOnly = searchParams.get('waterproof') === 'true';
    const isPhthalateFreeOnly = searchParams.get('phthalateFree') === 'true';

    const ranked = productManagementService.rankAndFilterProducts(catalogSeed, {
      categoryId,
      sort,
      isWaterproofOnly,
      isPhthalateFreeOnly,
    });

    return jsonSuccess({
      total: ranked.length,
      products: ranked,
    });
  } catch (err) {
    return jsonError(err);
  }
}
