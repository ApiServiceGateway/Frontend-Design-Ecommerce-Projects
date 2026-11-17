export interface NavCategory {
  id: string;
  name: string;
  slug: string;
  isNew?: boolean;
}

export const MAIN_NAV_CATEGORIES: NavCategory[] = [
  { id: 'nav-mens', name: "Men's wear", slug: 'mens-wear' },
  { id: 'nav-womens', name: "Women's wear", slug: 'womens-wear' },
  { id: 'nav-kids', name: "Kid's wear", slug: 'kids-wear' },
  { id: 'nav-spotlight', name: 'Spotlight', slug: 'spotlight' },
  { id: 'nav-mining', name: 'Mining', slug: 'mining', isNew: true },
];

export const HERO_SEGMENT_TABS = [
  { id: 'tab-velocity', label: 'High-Velocity Deals', active: true },
  { id: 'tab-atelier', label: 'Atelier Drops' },
  { id: 'tab-weekend', label: 'Weekend Edit' },
  { id: 'tab-stock', label: 'Stock Radar' },
];

export const RANKING_TABS = [
  'All',
  'Men',
  'Women',
  'Boys',
  'Girls',
  'Baby',
  'Beauty',
  'Unisex',
  'Home Decor',
];
