export interface Product {
  id: string;
  title: string;
  brand: string;
  price: number;
  originalPrice: number;
  usdtPrice?: string;
  discountBadge?: string;
  discountPercent?: number;
  claimedPercent?: number;
  stockLeft?: number;
  image: string;
  fabricOrSpec?: string;
  category?: string;
  rating?: number;
  reviewCount?: number;
}

export interface SeasonalStore {
  id: string;
  title: string;
  slug: string;
  image: string;
  bgGradient: string;
}

export interface TopDeal {
  id: string;
  title: string;
  subtitle: string;
  discountText: string;
  badge: string;
  brand: string;
  brandAvatar: string;
  image: string;
}

export interface FlagshipBrand {
  id: string;
  name: string;
  badge: string;
  monogram: string;
  tagline: string;
  accentColor: string;
}

export const SEASONAL_STORES: SeasonalStore[] = [
  {
    id: 'store-aw26',
    title: 'AW26',
    slug: 'aw26',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDfAjn1pqNhyu6o0ODhdHAEvwGh_fhQUXGIWeDltdALENOlPxkgPhXUIJlZMCHREbSDq_kGcxVp1QnB4LnQZGaVQLcfbkGEPxRtCN4vc0MhL7fWFyvtBh2fqPomXW9ujKDWPFDROMOEw76eZnfxZJnrsT313-MGz9SgYxTpVHTzlK5GlseHV31jwxZseNN3zBQROVMo9trp08cn1kCL0hcxYg2fixoKFlADbMiHiQ',
    bgGradient: 'from-amber-200/80 via-stone-200 to-amber-700/60',
  },
  {
    id: 'store-festive',
    title: 'Festive Store',
    slug: 'festive-store',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB99dwpq68H6bPiciXwJbg8dmsBb9ckLz9C6gof-cbpXjktk_ZioLvspE-f_DhDqo5jJLokmnuLqNM8FJet_N9X7ZhNRjKbsKQIqQ0GiKX52EgCEj28YmrHy09vwwKkMgZQbgO2KiriXB7eoPCWzSyiHsK7RuMcHc2e_6-_G7eHrjJ1t0ptI_5EL6TXR4_ViYzxwsxsSh1iKyKhH7DxZScFtJfPB_dE1oZCBJ7xHA',
    bgGradient: 'from-rose-200/80 via-stone-200 to-rose-700/60',
  },
  {
    id: 'store-gift',
    title: 'Gift Store',
    slug: 'gift-store',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAki53rTZlrseBrx8szPpZ17MzEKGS4QE1_Nh1rBnQyqlGXmgekfusA8Aiv1fJxmeKuIEzpy_DGSSRMMsdFzQlDwkyhTngYvxsYpRfg0cu_BrWQdPiz4EyzaxfXn17Ul9LMjbPR1BNe7XDhwdplEzr97gjrvMOn8luAOSYKbjHIPmrMOqDjsSr5SHl7hBzFdWPGQhWNignCeaKygD4zGuokLXChn3G35EY2mM6Mjg',
    bgGradient: 'from-emerald-200/80 via-stone-200 to-teal-700/60',
  },
  {
    id: 'store-winter',
    title: 'Winter Edit',
    slug: 'winter-edit',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAu4XcuS8foDakvyLzUR-KAY6KJ_IEV5zxNlp2Z0La2yKDPwKdh4xo2IDpVp9xjD6lwc4NlVf4_3_pkN9cx68_TwkFNoqPGPMLwnEmcAQFROiaj3Eao7PCQG5XQU7waD6qtYau1TeDL3SGsu7RCRSHie5BglSzxw3z97Egk17u-o9fn4QsfslXnDy0JX7_dIdNgaBUIMgtxx0zTtDRjiMjXJen_sO4MuhCj78bw5A',
    bgGradient: 'from-sky-200/80 via-stone-200 to-slate-700/60',
  },
  {
    id: 'store-character',
    title: 'Character Shop',
    slug: 'character-shop',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBEZWg_Qcw-XrvHDafNBvoqtwZzN9Zj2Axao8bXj_8oykAGO9lUo6LwB_F2Rgs-q9lfYrzwqI1ip_c87XMcTqh98ls2Y1zaHXvLke94RFLLrym5vwqfntMB0bExAZCFXW4hJY0wZHxgXXiOy_MhOrMjUmdtHXJxyiW01veWxVyVBD2yrQj1o4098-Q3D2onxbiD2giCuBI5o2tak50C1zZhefvNekUmZOVOweCs_Q',
    bgGradient: 'from-purple-200/80 via-stone-200 to-indigo-700/60',
  },
  {
    id: 'store-denim',
    title: 'Denim Store',
    slug: 'denim-store',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCD6z8Kqjf7ii_WUQvGJidL9hrL3o5C-9iwWE6MmVp-mlotFPIF7VvYgFNgR80qheYR0CGOmn8ar5rzPRoOOHPc0vbocB7_kE3hDOzpHe90wvqQVqr2v__LpDHjJdQQmP4ZUJrqeGKbL96MIzP59-siIV23_o7e5aaHaF6qkXI5a6cHj3HJhEQxIqfA0H9lEXynjnunAKgCIc5yeGZVt_LtDAtUtYYHq4Wh5BfC7g',
    bgGradient: 'from-blue-200/80 via-stone-200 to-blue-800/60',
  },
  {
    id: 'store-footwear',
    title: 'Footwear',
    slug: 'footwear',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCCD0ZB9JFLfkzvFC68HvU8tXMqxzQsEkoRqjazTITeT1DcEDQ80wWupTO3XfStG7IAjZ3iyUzRdgAIAdnXT8z4IVfwR2-b2ugtXZSMmjEt3fuypKDYjOAFXd62wgU25ruMRBDkmKKPQ5BLIWbxIptf5ujcXOO13QsUyeTUgMDumEEhXWUi7InCFL3WFeboEcp4Ulw96ADWD61vGMF6883nrAM1QozFBHOYJ261-Q',
    bgGradient: 'from-stone-200/80 via-stone-200 to-stone-700/60',
  },
];

export const TOP_DEALS: TopDeal[] = [
  {
    id: 'deal-1',
    title: 'Up To 70% Off',
    subtitle: 'Classic Trench & Outerwear',
    discountText: 'Save 70%',
    badge: 'Flash 70%',
    brand: 'Aura Studio',
    brandAvatar: 'A',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDfAjn1pqNhyu6o0ODhdHAEvwGh_fhQUXGIWeDltdALENOlPxkgPhXUIJlZMCHREbSDq_kGcxVp1QnB4LnQZGaVQLcfbkGEPxRtCN4vc0MhL7fWFyvtBh2fqPomXW9ujKDWPFDROMOEw76eZnfxZJnrsT313-MGz9SgYxTpVHTzlK5GlseHV31jwxZseNN3zBQROVMo9trp08cn1kCL0hcxYg2fixoKFlADbMiHiQ',
  },
  {
    id: 'deal-2',
    title: 'Up To 70% Off',
    subtitle: 'Activewear & Jogger Sets',
    discountText: 'Save 70%',
    badge: 'Hot Deal',
    brand: 'Vogue Noir',
    brandAvatar: 'V',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBEZWg_Qcw-XrvHDafNBvoqtwZzN9Zj2Axao8bXj_8oykAGO9lUo6LwB_F2Rgs-q9lfYrzwqI1ip_c87XMcTqh98ls2Y1zaHXvLke94RFLLrym5vwqfntMB0bExAZCFXW4hJY0wZHxgXXiOy_MhOrMjUmdtHXJxyiW01veWxVyVBD2yrQj1o4098-Q3D2onxbiD2giCuBI5o2tak50C1zZhefvNekUmZOVOweCs_Q',
  },
  {
    id: 'deal-3',
    title: 'Up To 70% Off',
    subtitle: 'Chiffon Maxi Dresses',
    discountText: 'Save 70%',
    badge: 'Save Big',
    brand: 'Atelier Silk',
    brandAvatar: 'S',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB99dwpq68H6bPiciXwJbg8dmsBb9ckLz9C6gof-cbpXjktk_ZioLvspE-f_DhDqo5jJLokmnuLqNM8FJet_N9X7ZhNRjKbsKQIqQ0GiKX52EgCEj28YmrHy09vwwKkMgZQbgO2KiriXB7eoPCWzSyiHsK7RuMcHc2e_6-_G7eHrjJ1t0ptI_5EL6TXR4_ViYzxwsxsSh1iKyKhH7DxZScFtJfPB_dE1oZCBJ7xHA',
  },
  {
    id: 'deal-4',
    title: 'Up To 70% Off',
    subtitle: 'Urban Streetwear Capsule',
    discountText: 'Save 70%',
    badge: 'Limited',
    brand: 'EcoLuxe Brand',
    brandAvatar: 'E',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAu4XcuS8foDakvyLzUR-KAY6KJ_IEV5zxNlp2Z0La2yKDPwKdh4xo2IDpVp9xjD6lwc4NlVf4_3_pkN9cx68_TwkFNoqPGPMLwnEmcAQFROiaj3Eao7PCQG5XQU7waD6qtYau1TeDL3SGsu7RCRSHie5BglSzxw3z97Egk17u-o9fn4QsfslXnDy0JX7_dIdNgaBUIMgtxx0zTtDRjiMjXJen_sO4MuhCj78bw5A',
  },
];

export const DEALS_OF_THE_MONTH: Product[] = [
  {
    id: 'deal-month-1',
    title: 'Classic Trench & Outerwear',
    brand: 'Aura Studio',
    price: 899,
    originalPrice: 2999,
    discountBadge: 'Flash 70%',
    claimedPercent: 82,
    stockLeft: 8,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDfAjn1pqNhyu6o0ODhdHAEvwGh_fhQUXGIWeDltdALENOlPxkgPhXUIJlZMCHREbSDq_kGcxVp1QnB4LnQZGaVQLcfbkGEPxRtCN4vc0MhL7fWFyvtBh2fqPomXW9ujKDWPFDROMOEw76eZnfxZJnrsT313-MGz9SgYxTpVHTzlK5GlseHV31jwxZseNN3zBQROVMo9trp08cn1kCL0hcxYg2fixoKFlADbMiHiQ',
  },
  {
    id: 'deal-month-2',
    title: 'Activewear & Jogger Sets',
    brand: 'Vogue Noir',
    price: 899,
    originalPrice: 2999,
    discountBadge: 'Hot Deal',
    claimedPercent: 91,
    stockLeft: 3,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBEZWg_Qcw-XrvHDafNBvoqtwZzN9Zj2Axao8bXj_8oykAGO9lUo6LwB_F2Rgs-q9lfYrzwqI1ip_c87XMcTqh98ls2Y1zaHXvLke94RFLLrym5vwqfntMB0bExAZCFXW4hJY0wZHxgXXiOy_MhOrMjUmdtHXJxyiW01veWxVyVBD2yrQj1o4098-Q3D2onxbiD2giCuBI5o2tak50C1zZhefvNekUmZOVOweCs_Q',
  },
  {
    id: 'deal-month-3',
    title: 'Chiffon Maxi Dresses',
    brand: 'Atelier Silk',
    price: 899,
    originalPrice: 2999,
    discountBadge: 'Save Big',
    claimedPercent: 76,
    stockLeft: 11,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB99dwpq68H6bPiciXwJbg8dmsBb9ckLz9C6gof-cbpXjktk_ZioLvspE-f_DhDqo5jJLokmnuLqNM8FJet_N9X7ZhNRjKbsKQIqQ0GiKX52EgCEj28YmrHy09vwwKkMgZQbgO2KiriXB7eoPCWzSyiHsK7RuMcHc2e_6-_G7eHrjJ1t0ptI_5EL6TXR4_ViYzxwsxsSh1iKyKhH7DxZScFtJfPB_dE1oZCBJ7xHA',
  },
  {
    id: 'deal-month-4',
    title: 'Double-Faced Wool Overcoat',
    brand: 'Ecoluxe Studio',
    price: 899,
    originalPrice: 2999,
    discountBadge: 'Limited',
    claimedPercent: 88,
    stockLeft: 4,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAu4XcuS8foDakvyLzUR-KAY6KJ_IEV5zxNlp2Z0La2yKDPwKdh4xo2IDpVp9xjD6lwc4NlVf4_3_pkN9cx68_TwkFNoqPGPMLwnEmcAQFROiaj3Eao7PCQG5XQU7waD6qtYau1TeDL3SGsu7RCRSHie5BglSzxw3z97Egk17u-o9fn4QsfslXnDy0JX7_dIdNgaBUIMgtxx0zTtDRjiMjXJen_sO4MuhCj78bw5A',
  },
];

export const NEW_ARRIVALS: Product[] = [
  {
    id: 'arr-1',
    title: 'Slim Fit Raw Denim',
    brand: 'Peter England',
    price: 899,
    originalPrice: 2799,
    usdtPrice: '4.55 USDT',
    discountBadge: '-68%',
    fabricOrSpec: 'Virgin indigo yarn',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCD6z8Kqjf7ii_WUQvGJidL9hrL3o5C-9iwWE6MmVp-mlotFPIF7VvYgFNgR80qheYR0CGOmn8ar5rzPRoOOHPc0vbocB7_kE3hDOzpHe90wvqQVqr2v__LpDHjJdQQmP4ZUJrqeGKbL96MIzP59-siIV23_o7e5aaHaF6qkXI5a6cHj3HJhEQxIqfA0H9lEXynjnunAKgCIc5yeGZVt_LtDAtUtYYHq4Wh5BfC7g',
  },
  {
    id: 'arr-2',
    title: 'Tailored Relaxed Trousers',
    brand: 'Peter England',
    price: 1199,
    originalPrice: 3499,
    usdtPrice: '6.05 USDT',
    discountBadge: '-65%',
    fabricOrSpec: 'Refined twill weave',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAu4XcuS8foDakvyLzUR-KAY6KJ_IEV5zxNlp2Z0La2yKDPwKdh4xo2IDpVp9xjD6lwc4NlVf4_3_pkN9cx68_TwkFNoqPGPMLwnEmcAQFROiaj3Eao7PCQG5XQU7waD6qtYau1TeDL3SGsu7RCRSHie5BglSzxw3z97Egk17u-o9fn4QsfslXnDy0JX7_dIdNgaBUIMgtxx0zTtDRjiMjXJen_sO4MuhCj78bw5A',
  },
  {
    id: 'arr-3',
    title: 'Dark Classic Jean',
    brand: 'Peter England',
    price: 999,
    originalPrice: 2999,
    usdtPrice: '5.05 USDT',
    discountBadge: '-66%',
    fabricOrSpec: 'Architectural cut',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDfAjn1pqNhyu6o0ODhdHAEvwGh_fhQUXGIWeDltdALENOlPxkgPhXUIJlZMCHREbSDq_kGcxVp1QnB4LnQZGaVQLcfbkGEPxRtCN4vc0MhL7fWFyvtBh2fqPomXW9ujKDWPFDROMOEw76eZnfxZJnrsT313-MGz9SgYxTpVHTzlK5GlseHV31jwxZseNN3zBQROVMo9trp08cn1kCL0hcxYg2fixoKFlADbMiHiQ',
  },
  {
    id: 'arr-4',
    title: 'Tapered Slim Pants',
    brand: 'Peter England',
    price: 849,
    originalPrice: 2499,
    usdtPrice: '4.30 USDT',
    discountBadge: '-66%',
    fabricOrSpec: 'Botanical mineral dye',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBEZWg_Qcw-XrvHDafNBvoqtwZzN9Zj2Axao8bXj_8oykAGO9lUo6LwB_F2Rgs-q9lfYrzwqI1ip_c87XMcTqh98ls2Y1zaHXvLke94RFLLrym5vwqfntMB0bExAZCFXW4hJY0wZHxgXXiOy_MhOrMjUmdtHXJxyiW01veWxVyVBD2yrQj1o4098-Q3D2onxbiD2giCuBI5o2tak50C1zZhefvNekUmZOVOweCs_Q',
  },
  {
    id: 'arr-5',
    title: 'Cotton Blend Denim',
    brand: 'Peter England',
    price: 1299,
    originalPrice: 3899,
    usdtPrice: '6.55 USDT',
    discountBadge: '-67%',
    fabricOrSpec: 'Ring spun combed yarn',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB99dwpq68H6bPiciXwJbg8dmsBb9ckLz9C6gof-cbpXjktk_ZioLvspE-f_DhDqo5jJLokmnuLqNM8FJet_N9X7ZhNRjKbsKQIqQ0GiKX52EgCEj28YmrHy09vwwKkMgZQbgO2KiriXB7eoPCWzSyiHsK7RuMcHc2e_6-_G7eHrjJ1t0ptI_5EL6TXR4_ViYzxwsxsSh1iKyKhH7DxZScFtJfPB_dE1oZCBJ7xHA',
  },
  {
    id: 'arr-6',
    title: 'Pleated Straight Trouser',
    brand: 'Peter England',
    price: 1049,
    originalPrice: 3199,
    usdtPrice: '5.30 USDT',
    discountBadge: '-67%',
    fabricOrSpec: 'Structured linen blend',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAki53rTZlrseBrx8szPpZ17MzEKGS4QE1_Nh1rBnQyqlGXmgekfusA8Aiv1fJxmeKuIEzpy_DGSSRMMsdFzQlDwkyhTngYvxsYpRfg0cu_BrWQdPiz4EyzaxfXn17Ul9LMjbPR1BNe7XDhwdplEzr97gjrvMOn8luAOSYKbjHIPmrMOqDjsSr5SHl7hBzFdWPGQhWNignCeaKygD4zGuokLXChn3G35EY2mM6Mjg',
  },
  {
    id: 'arr-7',
    title: 'Signature Raw Indigo',
    brand: 'Peter England',
    price: 1399,
    originalPrice: 4299,
    usdtPrice: '7.05 USDT',
    discountBadge: '-67%',
    fabricOrSpec: 'Selvedge weave',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCD6z8Kqjf7ii_WUQvGJidL9hrL3o5C-9iwWE6MmVp-mlotFPIF7VvYgFNgR80qheYR0CGOmn8ar5rzPRoOOHPc0vbocB7_kE3hDOzpHe90wvqQVqr2v__LpDHjJdQQmP4ZUJrqeGKbL96MIzP59-siIV23_o7e5aaHaF6qkXI5a6cHj3HJhEQxIqfA0H9lEXynjnunAKgCIc5yeGZVt_LtDAtUtYYHq4Wh5BfC7g',
  },
  {
    id: 'arr-8',
    title: 'Minimalist Chino Pant',
    brand: 'Peter England',
    price: 799,
    originalPrice: 2399,
    usdtPrice: '4.05 USDT',
    discountBadge: '-66%',
    fabricOrSpec: 'Soft peach finish',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCCD0ZB9JFLfkzvFC68HvU8tXMqxzQsEkoRqjazTITeT1DcEDQ80wWupTO3XfStG7IAjZ3iyUzRdgAIAdnXT8z4IVfwR2-b2ugtXZSMmjEt3fuypKDYjOAFXd62wgU25ruMRBDkmKKPQ5BLIWbxIptf5ujcXOO13QsUyeTUgMDumEEhXWUi7InCFL3WFeboEcp4Ulw96ADWD61vGMF6883nrAM1QozFBHOYJ261-Q',
  },
];

export const RANKED_PRODUCTS: Record<string, Product[]> = {
  All: [
    {
      id: 'rank-1',
      title: 'Off-White Embroidered Festive Ethnic Set',
      brand: 'RANGMANCH',
      price: 4499,
      originalPrice: 6999,
      discountBadge: 'Just In',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDfAjn1pqNhyu6o0ODhdHAEvwGh_fhQUXGIWeDltdALENOlPxkgPhXUIJlZMCHREbSDq_kGcxVp1QnB4LnQZGaVQLcfbkGEPxRtCN4vc0MhL7fWFyvtBh2fqPomXW9ujKDWPFDROMOEw76eZnfxZJnrsT313-MGz9SgYxTpVHTzlK5GlseHV31jwxZseNN3zBQROVMo9trp08cn1kCL0hcxYg2fixoKFlADbMiHiQ',
    },
    {
      id: 'rank-2',
      title: 'Black Embroidered Festive Ethnic Set',
      brand: 'RANGMANCH',
      price: 4999,
      originalPrice: 7499,
      discountBadge: 'Top 1',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBEZWg_Qcw-XrvHDafNBvoqtwZzN9Zj2Axao8bXj_8oykAGO9lUo6LwB_F2Rgs-q9lfYrzwqI1ip_c87XMcTqh98ls2Y1zaHXvLke94RFLLrym5vwqfntMB0bExAZCFXW4hJY0wZHxgXXiOy_MhOrMjUmdtHXJxyiW01veWxVyVBD2yrQj1o4098-Q3D2onxbiD2giCuBI5o2tak50C1zZhefvNekUmZOVOweCs_Q',
    },
    {
      id: 'rank-3',
      title: 'Red Festive Ethnic Set',
      brand: 'RANGMANCH',
      price: 3499,
      originalPrice: 5299,
      discountBadge: 'Viral',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB99dwpq68H6bPiciXwJbg8dmsBb9ckLz9C6gof-cbpXjktk_ZioLvspE-f_DhDqo5jJLokmnuLqNM8FJet_N9X7ZhNRjKbsKQIqQ0GiKX52EgCEj28YmrHy09vwwKkMgZQbgO2KiriXB7eoPCWzSyiHsK7RuMcHc2e_6-_G7eHrjJ1t0ptI_5EL6TXR4_ViYzxwsxsSh1iKyKhH7DxZScFtJfPB_dE1oZCBJ7xHA',
    },
    {
      id: 'rank-4',
      title: 'Pastel Silk Festive Kurta Set',
      brand: 'RANGMANCH',
      price: 2599,
      originalPrice: 3999,
      discountBadge: 'Bestseller',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAu4XcuS8foDakvyLzUR-KAY6KJ_IEV5zxNlp2Z0La2yKDPwKdh4xo2IDpVp9xjD6lwc4NlVf4_3_pkN9cx68_TwkFNoqPGPMLwnEmcAQFROiaj3Eao7PCQG5XQU7waD6qtYau1TeDL3SGsu7RCRSHie5BglSzxw3z97Egk17u-o9fn4QsfslXnDy0JX7_dIdNgaBUIMgtxx0zTtDRjiMjXJen_sO4MuhCj78bw5A',
    },
    {
      id: 'rank-5',
      title: 'Navy Embroidered Heritage Set',
      brand: 'RANGMANCH',
      price: 3899,
      originalPrice: 5999,
      discountBadge: 'Trending',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAki53rTZlrseBrx8szPpZ17MzEKGS4QE1_Nh1rBnQyqlGXmgekfusA8Aiv1fJxmeKuIEzpy_DGSSRMMsdFzQlDwkyhTngYvxsYpRfg0cu_BrWQdPiz4EyzaxfXn17Ul9LMjbPR1BNe7XDhwdplEzr97gjrvMOn8luAOSYKbjHIPmrMOqDjsSr5SHl7hBzFdWPGQhWNignCeaKygD4zGuokLXChn3G35EY2mM6Mjg',
    },
  ],
};

export const FLAGSHIP_BRANDS: FlagshipBrand[] = [
  {
    id: 'brand-aura',
    name: 'Aura Fashion',
    badge: 'Top Seller',
    monogram: 'AF',
    tagline: 'Luxury Ready-To-Wear & Sensual Care',
    accentColor: '#111827',
  },
  {
    id: 'brand-vogue',
    name: 'Vogue Noir',
    badge: "Editor's Pick",
    monogram: 'VN',
    tagline: 'Modern Parisian Tailoring & Discretion',
    accentColor: '#14CDA8',
  },
  {
    id: 'brand-atelier',
    name: 'Atelier Silk',
    badge: 'Viral Sensation',
    monogram: 'AS',
    tagline: 'Artisanal Chiffon Silks & Intimate Comfort',
    accentColor: '#FF3F6C',
  },
];

export const FRESH_FINDS: Product[] = [
  {
    id: 'find-1',
    title: 'Double Dyed Crew Tee - Regular Fit',
    brand: 'AKKRITI',
    price: 499,
    originalPrice: 1299,
    discountBadge: '61% OFF',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCCD0ZB9JFLfkzvFC68HvU8tXMqxzQsEkoRqjazTITeT1DcEDQ80wWupTO3XfStG7IAjZ3iyUzRdgAIAdnXT8z4IVfwR2-b2ugtXZSMmjEt3fuypKDYjOAFXd62wgU25ruMRBDkmKKPQ5BLIWbxIptf5ujcXOO13QsUyeTUgMDumEEhXWUi7InCFL3WFeboEcp4Ulw96ADWD61vGMF6883nrAM1QozFBHOYJ261-Q',
  },
  {
    id: 'find-2',
    title: 'All Day Pullover Sweater',
    brand: 'RANGMANCH',
    price: 799,
    originalPrice: 1999,
    discountBadge: '60% OFF',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCD6z8Kqjf7ii_WUQvGJidL9hrL3o5C-9iwWE6MmVp-mlotFPIF7VvYgFNgR80qheYR0CGOmn8ar5rzPRoOOHPc0vbocB7_kE3hDOzpHe90wvqQVqr2v__LpDHjJdQQmP4ZUJrqeGKbL96MIzP59-siIV23_o7e5aaHaF6qkXI5a6cHj3HJhEQxIqfA0H9lEXynjnunAKgCIc5yeGZVt_LtDAtUtYYHq4Wh5BfC7g',
  },
  {
    id: 'find-3',
    title: 'Hand Knit Jersey Smart Striped Sweater',
    brand: 'AKKRITI',
    price: 899,
    originalPrice: 2299,
    discountBadge: '60% OFF',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBEZWg_Qcw-XrvHDafNBvoqtwZzN9Zj2Axao8bXj_8oykAGO9lUo6LwB_F2Rgs-q9lfYrzwqI1ip_c87XMcTqh98ls2Y1zaHXvLke94RFLLrym5vwqfntMB0bExAZCFXW4hJY0wZHxgXXiOy_MhOrMjUmdtHXJxyiW01veWxVyVBD2yrQj1o4098-Q3D2onxbiD2giCuBI5o2tak50C1zZhefvNekUmZOVOweCs_Q',
  },
  {
    id: 'find-4',
    title: 'Oversize Winter Edit Striped Sweater',
    brand: 'RANGMANCH',
    price: 999,
    originalPrice: 2499,
    discountBadge: '60% OFF',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAu4XcuS8foDakvyLzUR-KAY6KJ_IEV5zxNlp2Z0La2yKDPwKdh4xo2IDpVp9xjD6lwc4NlVf4_3_pkN9cx68_TwkFNoqPGPMLwnEmcAQFROiaj3Eao7PCQG5XQU7waD6qtYau1TeDL3SGsu7RCRSHie5BglSzxw3z97Egk17u-o9fn4QsfslXnDy0JX7_dIdNgaBUIMgtxx0zTtDRjiMjXJen_sO4MuhCj78bw5A',
  },
  {
    id: 'find-5',
    title: 'Cotton Flared Dress',
    brand: 'AKKRITI',
    price: 699,
    originalPrice: 1799,
    discountBadge: '61% OFF',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB99dwpq68H6bPiciXwJbg8dmsBb9ckLz9C6gof-cbpXjktk_ZioLvspE-f_DhDqo5jJLokmnuLqNM8FJet_N9X7ZhNRjKbsKQIqQ0GiKX52EgCEj28YmrHy09vwwKkMgZQbgO2KiriXB7eoPCWzSyiHsK7RuMcHc2e_6-_G7eHrjJ1t0ptI_5EL6TXR4_ViYzxwsxsSh1iKyKhH7DxZScFtJfPB_dE1oZCBJ7xHA',
  },
  {
    id: 'find-6',
    title: 'Embroidered Flared Strappy Dress',
    brand: 'RANGMANCH',
    price: 899,
    originalPrice: 2399,
    discountBadge: '62% OFF',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDfAjn1pqNhyu6o0ODhdHAEvwGh_fhQUXGIWeDltdALENOlPxkgPhXUIJlZMCHREbSDq_kGcxVp1QnB4LnQZGaVQLcfbkGEPxRtCN4vc0MhL7fWFyvtBh2fqPomXW9ujKDWPFDROMOEw76eZnfxZJnrsT313-MGz9SgYxTpVHTzlK5GlseHV31jwxZseNN3zBQROVMo9trp08cn1kCL0hcxYg2fixoKFlADbMiHiQ',
  },
  {
    id: 'find-7',
    title: 'Structured Lace Palazzo',
    brand: 'AKKRITI',
    price: 649,
    originalPrice: 1699,
    discountBadge: '61% OFF',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAki53rTZlrseBrx8szPpZ17MzEKGS4QE1_Nh1rBnQyqlGXmgekfusA8Aiv1fJxmeKuIEzpy_DGSSRMMsdFzQlDwkyhTngYvxsYpRfg0cu_BrWQdPiz4EyzaxfXn17Ul9LMjbPR1BNe7XDhwdplEzr97gjrvMOn8luAOSYKbjHIPmrMOqDjsSr5SHl7hBzFdWPGQhWNignCeaKygD4zGuokLXChn3G35EY2mM6Mjg',
  },
  {
    id: 'find-8',
    title: 'Woven Solid Pant',
    brand: 'RANGMANCH',
    price: 599,
    originalPrice: 1499,
    discountBadge: '60% OFF',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCCD0ZB9JFLfkzvFC68HvU8tXMqxzQsEkoRqjazTITeT1DcEDQ80wWupTO3XfStG7IAjZ3iyUzRdgAIAdnXT8z4IVfwR2-b2ugtXZSMmjEt3fuypKDYjOAFXd62wgU25ruMRBDkmKKPQ5BLIWbxIptf5ujcXOO13QsUyeTUgMDumEEhXWUi7InCFL3WFeboEcp4Ulw96ADWD61vGMF6883nrAM1QozFBHOYJ261-Q',
  },
];
