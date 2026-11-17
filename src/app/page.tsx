'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProductHoverCarousel } from '@/components/ui/ProductHoverCarousel';
import { HangTag } from '@/components/ui/HangTag';
import { Play, ArrowRight, Sparkles, Snowflake, Gift, Zap, ShieldCheck, Star, ShoppingBag, Eye, Heart, Compass, Check, ChevronLeft, ChevronRight, Lock, Columns2, LayoutGrid, Crown } from 'lucide-react';

const heroSlides = [
  {
    id: 1,
    image: "/banners/hero-banner-1.jpg",
    alt: "Pantaloons Autumn Season Collection",
    tag: "NEW SEASON",
    title: "AUTUMN WINTER COLLECTION",
    subtitle: "Explore vibrant new trends and signature styles designed for you",
    ctaText: "Shop Collection",
    ctaLink: "/category",
  },
  {
    id: 2,
    image: "/banners/hero-banner-2.jpg",
    alt: "Festive Exclusive Edit",
    tag: "FESTIVE EDIT",
    title: "CELEBRATION STYLES",
    subtitle: "Glamorous festive apparel crafted for special moments",
    ctaText: "Explore Now",
    ctaLink: "/category?cat=women",
  },
  {
    id: 3,
    image: "/banners/hero-banner-3.jpg",
    alt: "Denim & Streetwear Vault",
    tag: "TRENDING NOW",
    title: "DENIM & STREETWEAR",
    subtitle: "Contemporary fits, comfortable silhouettes and modern essentials",
    ctaText: "Shop Streetwear",
    ctaLink: "/category?cat=men",
  },
  {
    id: 4,
    image: "/banners/hero-banner-4.jpg",
    alt: "Youth & Contemporary Vanguard",
    tag: "EXCLUSIVE DROP",
    title: "YOUTH CONTEMPORARY",
    subtitle: "Everyday comfort with bold and vibrant designs",
    ctaText: "Discover More",
    ctaLink: "/category",
  },
  {
    id: 5,
    image: "/banners/hero-banner-5.jpg",
    alt: "Boutique Trendsetters Runway",
    tag: "RUNWAY ATELIER",
    title: "PREMIUM ESSENTIALS",
    subtitle: "High quality craftsmanship for everyday luxury",
    ctaText: "View Lookbook",
    ctaLink: "/category?cat=women",
  },
  {
    id: 6,
    image: "/banners/hero-banner-6.jpg",
    alt: "Signature Menswear & Casuals",
    tag: "CASUAL EDIT",
    title: "SIGNATURE CASUALS",
    subtitle: "Sharp styles and casual sophistication for every occasion",
    ctaText: "Shop Men",
    ctaLink: "/category?cat=men",
  },
  {
    id: 7,
    image: "/banners/hero-banner-7.jpg",
    alt: "Grand Season Finale Offers",
    tag: "LIMITED ALLOCATION",
    title: "GRAND FESTIVE OFFERS",
    subtitle: "Up to 60% off across premium branded fashion flagships",
    ctaText: "Shop Offers",
    ctaLink: "/category?deal=top",
  },
];

const promoSlides = [
  {
    id: 1,
    image: "/banners/blue-glow-banner.png",
    alt: "Midnight Cyber Capsule",
    badge: "CYBER NOVA EDITION",
    title: "MIDNIGHT CYBER CAPSULE",
    description: "Ultra-luminous aesthetics & bespoke dark-mode silhouettes designed for nocturnal sophistication.",
    cta: "EXPLORE CAPSULE",
    link: "/category?cat=streetwear",
  },
  {
    id: 2,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcs0mLeQEf4YO40kiuMle05BBYVQPvuBAhcqccJDnPp90WZ0SRZe-yiM_yLmyaJO_pnrMyCpfuJkov-kdKVjf5SFoqzHddLkBVHn37S1aozQe644Z7_LuNLiF7OFrc6mjjsFU2Dc1ph30TqIJXICnVCL8JPw8CPJvX7mXidQQYbiJFMbunkxm11vX06akS5drfhmo3H2itFbni-wSRhfRaCbosKpdvKnqzU4BN0OCjRo7p3_bxzdoTbPtnQxkxfyo",
    alt: "Boutique Fashion Trends",
    badge: "EXCLUSIVE DROP",
    title: "BOUTIQUE FASHION • NEW TRENDS",
    description: "Curated statement wear & tailored perfection from leading international design ateliers.",
    cta: "DISCOVER TRENDS",
    link: "/category?cat=women",
  },
  {
    id: 3,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGayduW0V28ALJux_xs-j79LlCYZzNZfj_t3x18QfdMrhBiOAv5hhDiICJFVzWs_ln2etL65T4V55YR1Z02rObvquZ-GXn_9F9IsiGhk6xssOLJ_9JyNXxiXf1n2xwJ41sTIVSTRA6ZNNTeyqYBzr2shI34icvSgPnIMaP5R4wdx04UZEml5SCLx3vmi7XpiQ-s9V42oqrEpHBIbtkdg7cDVho9qVtJ5qT_PUuGxgRkt10NhjEwrDZW4e-dpBJ_EE",
    alt: "Gilded Radiance & High Jewelry",
    badge: "FINE JEWELRY VAULT",
    title: "GILDED RADIANCE & DIAMOND CRAFT",
    description: "Timeless artistry crafted in 18K yellow gold, platinum, and brilliant-cut certified solitaires.",
    cta: "SHOP THE VAULT",
    link: "/category?cat=jewelry",
  },
  {
    id: 4,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEQlYMkmLBIe16HU-eGR-1Aq8hZD44GrBJaLxqyY587yC6ey9XJ4GtZvJLZwoCZZCytbi4eNQVHJB8mKZtaCS6q1oko2JCUtGgGbOONx_Tg2mRurzJPkPDvMwuDIFyWIM7p0UqLs6CK4F0QWT3PZXNVX7-UQF0Ilo4O4zwcZqEKPkWRvFP7NOOIo0ebj5zYamR4ikxk5SIJ7EPr0q-GtmnYmG-I7__q9Af7lwWFg",
    alt: "The Luxury Couture Edit",
    badge: "TOP RANKED",
    title: "THE SEASONAL COUTURE EDIT",
    description: "Handpicked statement jackets, knitwear, and couture separates crafted without compromise.",
    cta: "VIEW LOOKBOOK",
    link: "/category?cat=outerwear",
  },
];

const seasonalStores = [
  {
    id: 'aw26',
    title: 'AW26',
    href: '/category?cat=autumn-winter',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfAjn1pqNhyu6o0ODhdHAEvwGh_fhQUXGIWeDltdALENOlPxkgPhXUIJlZMCHREbSDq_kGcxVp1QnB4LnQZGaVQLcfbkGEPxRtCN4vc0MhL7fWFyvtBh2fqPomXW9ujKDWPFDROMOEw76eZnfxZJnrsT313-MGz9SgYxTpVHTzlK5GlseHV31jwxZseNN3zBQROVMo9trp08cn1kCL0hcxYg2fixoKFlADbMiHiQ',
    bgColor: 'bg-stone-100',
    titleClass: 'text-sm sm:text-base tracking-[0.1em]',
  },
  {
    id: 'winter',
    title: 'Winter Edit',
    href: '/category?cat=winter',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAu4XcuS8foDakvyLzUR-KAY6KJ_IEV5zxNlp2Z0La2yKDPwKdh4xo2IDpVp9xjD6lwc4NlVf4_3_pkN9cx68_TwkFNoqPGPMLwnEmcAQFROiaj3Eao7PCQG5XQU7waD6qtYau1TeDL3SGsu7RCRSHie5BglSzxw3z97Egk17u-o9fn4QsfslXnDy0JX7_dIdNgaBUIMgtxx0zTtDRjiMjXJen_sO4MuhCj78bw5A',
    bgColor: 'bg-stone-100',
    titleClass: 'text-xs sm:text-sm tracking-[0.06em]',
  },
  {
    id: 'festive',
    title: 'Festive Store',
    href: '/category?cat=festive',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB99dwpq68H6bPiciXwJbg8dmsBb9ckLz9C6gof-cbpXjktk_ZioLvspE-f_DhDqo5jJLokmnuLqNM8FJet_N9X7ZhNRjKbsKQIqQ0GiKX52EgCEj28YmrHy09vwwKkMgZQbgO2KiriXB7eoPCWzSyiHsK7RuMcHc2e_6-_G7eHrjJ1t0ptI_5EL6TXR4_ViYzxwsxsSh1iKyKhH7DxZScFtJfPB_dE1oZCBJ7xHA',
    bgColor: 'bg-stone-100',
    titleClass: 'text-xs sm:text-sm tracking-[0.06em]',
  },
  {
    id: 'gift',
    title: 'Gift Store',
    href: '/category?cat=gifts',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAki53rTZlrseBrx8szPpZ17MzEKGS4QE1_Nh1rBnQyqlGXmgekfusA8Aiv1fJxmeKuIEzpy_DGSSRMMsdFzQlDwkyhTngYvxsYpRfg0cu_BrWQdPiz4EyzaxfXn17Ul9LMjbPR1BNe7XDhwdplEzr97gjrvMOn8luAOSYKbjHIPmrMOqDjsSr5SHl7hBzFdWPGQhWNignCeaKygD4zGuokLXChn3G35EY2mM6Mjg',
    bgColor: 'bg-[#e8ded3]',
    titleClass: 'text-xs sm:text-sm tracking-[0.06em]',
  },
  {
    id: 'character',
    title: 'Character Shop',
    href: '/category?cat=characters',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEZWg_Qcw-XrvHDafNBvoqtwZzN9Zj2Axao8bXj_8oykAGO9lUo6LwB_F2Rgs-q9lfYrzwqI1ip_c87XMcTqh98ls2Y1zaHXvLke94RFLLrym5vwqfntMB0bExAZCFXW4hJY0wZHxgXXiOy_MhOrMjUmdtHXJxyiW01veWxVyVBD2yrQj1o4098-Q3D2onxbiD2giCuBI5o2tak50C1zZhefvNekUmZOVOweCs_Q',
    bgColor: 'bg-stone-100',
    titleClass: 'text-xs sm:text-sm tracking-[0.06em]',
  },
  {
    id: 'denim',
    title: 'Denim Store',
    href: '/category?cat=denim',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCD6z8Kqjf7ii_WUQvGJidL9hrL3o5C-9iwWE6MmVp-mlotFPIF7VvYgFNgR80qheYR0CGOmn8ar5rzPRoOOHPc0vbocB7_kE3hDOzpHe90wvqQVqr2v__LpDHjJdQQmP4ZUJrqeGKbL96MIzP59-siIV23_o7e5aaHaF6qkXI5a6cHj3HJhEQxIqfA0H9lEXynjnunAKgCIc5yeGZVt_LtDAtUtYYHq4Wh5BfC7g',
    bgColor: 'bg-stone-100',
    titleClass: 'text-xs sm:text-sm tracking-[0.06em]',
  },
  {
    id: 'footwear',
    title: 'Footwear',
    href: '/category?cat=footwear',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCD0ZB9JFLfkzvFC68HvU8tXMqxzQsEkoRqjazTITeT1DcEDQ80wWupTO3XfStG7IAjZ3iyUzRdgAIAdnXT8z4IVfwR2-b2ugtXZSMmjEt3fuypKDYjOAFXd62wgU25ruMRBDkmKKPQ5BLIWbxIptf5ujcXOO13QsUyeTUgMDumEEhXWUi7InCFL3WFeboEcp4Ulw96ADWD61vGMF6883nrAM1QozFBHOYJ261-Q',
    bgColor: 'bg-[#e5cfc8]',
    titleClass: 'text-xs sm:text-sm tracking-[0.06em]',
  },
  {
    id: 'jewelry',
    title: 'Fine Jewelry',
    href: '/category?cat=jewelry',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGayduW0V28ALJux_xs-j79LlCYZzNZfj_t3x18QfdMrhBiOAv5hhDiICJFVzWs_ln2etL65T4V55YR1Z02rObvquZ-GXn_9F9IsiGhk6xssOLJ_9JyNXxiXf1n2xwJ41sTIVSTRA6ZNNTeyqYBzr2shI34icvSgPnIMaP5R4wdx04UZEml5SCLx3vmi7XpiQ-s9V42oqrEpHBIbtkdg7cDVho9qVtJ5qT_PUuGxgRkt10NhjEwrDZW4e-dpBJ_EE',
    bgColor: 'bg-[#f4ebe1]',
    titleClass: 'text-xs sm:text-sm md:text-base tracking-[0.08em]',
  },
  {
    id: 'bags',
    title: 'Designer Bags',
    href: '/category?cat=bags',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDq5hWZd7gcdkKQPebnbe8HjDg0NIt_Iqg1tANSrOK9Ox3MWofbYeCuHoYezH1vDbgR9iwDhRq86BYkgIRotFXP_A775omml-fzx2AmpPwbZGTBKcCRXrGP0cjSiQWxdeG3MLKUrYTaZxd2ojJfW7qlkDpa7eFLgC1kvwNjJ7AFrWyLeJts0LqEESMPq8jKdOYJ-ABw-FyRLX3AwvnBPU_NhirWYxwfR83qcHAqrA',
    bgColor: 'bg-[#efe9e3]',
    titleClass: 'text-xs sm:text-sm md:text-base tracking-[0.08em]',
  },
  {
    id: 'watches',
    title: 'Luxury Watches',
    href: '/category?cat=watches',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcs0mLeQEf4YO40kiuMle05BBYVQPvuBAhcqccJDnPp90WZ0SRZe-yiM_yLmyaJO_pnrMyCpfuJkov-kdKVjf5SFoqzHddLkBVHn37S1aozQe644Z7_LuNLiF7OFrc6mjjsFU2Dc1ph30TqIJXICnVCL8JPw8CPJvX7mXidQQYbiJFMbunkxm11vX06akS5drfhmo3H2itFbni-wSRhfRaCbosKpdvKnqzU4BN0OCjRo7p3_bxzdoTbPtnQxkxfyo',
    bgColor: 'bg-stone-900',
    titleClass: 'text-xs sm:text-sm md:text-base tracking-[0.08em]',
  },
  {
    id: 'wellness',
    title: 'Sensory Care',
    href: '/category?cat=wellness',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDH0AuHS2bHWWS9mhrM_sXLBwOzO_AnJBD739DqEPpu2XWDnpqjNn8M2YNJ1vTuka8DSRLQPLiUkKU2gPNaLHJzKenNc00010Olk1C1yT9KLEABPCGKwOecodeKL2gZ_FsrrqQUFxSdkQ6i6ri8oI9Gc8k3JlsJYxPwaYhzlly4VyUlopNBvgPLPZlTTAjsxm7-xUOaggSBM2QLWl1Knm5N6z8j99jrlpDQazgFDw',
    bgColor: 'bg-[#f7f2ed]',
    titleClass: 'text-xs sm:text-sm md:text-base tracking-[0.08em]',
  },
  {
    id: 'sneakers',
    title: 'Sneaker Vault',
    href: '/category?cat=sneakers',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwUy1fIOkDK6u2pWKdsiBXn8gjCsw5MhRYfssCccVA5SSIQeA6D4NOh-3Syt67FFtkYJVWr1A3AVmRp2orEY5W_4E2urr5Fv_r3sL3AGPuPRlO4AVwcIGgE3Xq2vPFdawQoQ-vi_BxZk-kOoAZTHTEcf-JfGa8LsaxwOgH2sDLh3n_Fo47w2ni6PZaBcSdaC2xP_vEcLG8Vxl5TpTLYZyLtS30Zb2dGVJ2c6Fy7g',
    bgColor: 'bg-stone-100',
    titleClass: 'text-xs sm:text-sm md:text-base tracking-[0.08em]',
  },
  {
    id: 'couture',
    title: 'Haute Couture',
    href: '/category?cat=couture',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATKEJFfrZfwPr8oQ4E1-Vvymoy-wQkWdvK35GZskSQGECzX6lfZIgCRKeyyrXp8KBpOPHMF0lpPgcgfqzZuSMxqPVwuKxT_tzx5T4-7sKWZYuNQU-7amTvoSHbpLToCo3OsgY90NOzMtbgNPnv-6eSPteZGQD59z77f0quxYpTmRrB-aPirJ5ZgTJbYKtniorBum27Vx3sVqTdZrJTyE6pTsdOey6b__TocaDns58nsONvhhBQG-w',
    bgColor: 'bg-[#fcf8f5]',
    titleClass: 'text-xs sm:text-sm md:text-base tracking-[0.08em]',
  },
  {
    id: 'athleisure',
    title: 'Athleisure',
    href: '/category?cat=athleisure',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEQlYMkmLBIe16HU-eGR-1Aq8hZD44GrBJaLxqyY587yC6ey9XJ4GtZvJLZwoCZZCytbi4eNQVHJB8mKZtaCS6q1oko2JCUtGgGbOONx_Tg2mRurzJPkPDvMwuDIFyWIM7p0UqLs6CK4F0QWT3PZXNVX7-UQF0Ilo4O4zwcZqEKPkWRvFP7NOOIo0ebj5zYamR4ikxk5SIJ7EPr0q-GtmnYmG-I7__q9Af7lwWFg',
    bgColor: 'bg-stone-100',
    titleClass: 'text-xs sm:text-sm md:text-base tracking-[0.08em]',
  },
];

const topDealsList = [
  {
    id: 'deal-1',
    badge: 'Flash 70%',
    title: 'Up To 70% Off',
    subtitle: 'Classic Trench & Outerwear',
    brand: 'Aura Studio',
    brandInitial: 'A',
    brandColor: 'bg-stone-900',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfAjn1pqNhyu6o0ODhdHAEvwGh_fhQUXGIWeDltdALENOlPxkgPhXUIJlZMCHREbSDq_kGcxVp1QnB4LnQZGaVQLcfbkGEPxRtCN4vc0MhL7fWFyvtBh2fqPomXW9ujKDWPFDROMOEw76eZnfxZJnrsT313-MGz9SgYxTpVHTzlK5GlseHV31jwxZseNN3zBQROVMo9trp08cn1kCL0hcxYg2fixoKFlADbMiHiQ',
    bgColor: 'bg-stone-100',
    href: '/category?deal=top-1',
  },
  {
    id: 'deal-2',
    badge: 'Hot Deal',
    title: 'Up To 70% Off',
    subtitle: 'Activewear & Jogger Sets',
    brand: 'Vogue Noir',
    brandInitial: 'V',
    brandColor: 'bg-[#1ea768]',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEZWg_Qcw-XrvHDafNBvoqtwZzN9Zj2Axao8bXj_8oykAGO9lUo6LwB_F2Rgs-q9lfYrzwqI1ip_c87XMcTqh98ls2Y1zaHXvLke94RFLLrym5vwqfntMB0bExAZCFXW4hJY0wZHxgXXiOy_MhOrMjUmdtHXJxyiW01veWxVyVBD2yrQj1o4098-Q3D2onxbiD2giCuBI5o2tak50C1zZhefvNekUmZOVOweCs_Q',
    bgColor: 'bg-[#cbf2de]',
    href: '/category?deal=top-2',
  },
  {
    id: 'deal-3',
    badge: 'Save Big',
    title: 'Up To 70% Off',
    subtitle: 'Chiffon Maxi Dresses',
    brand: 'Atelier Silk',
    brandInitial: 'S',
    brandColor: 'bg-stone-800',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB99dwpq68H6bPiciXwJbg8dmsBb9ckLz9C6gof-cbpXjktk_ZioLvspE-f_DhDqo5jJLokmnuLqNM8FJet_N9X7ZhNRjKbsKQIqQ0GiKX52EgCEj28YmrHy09vwwKkMgZQbgO2KiriXB7eoPCWzSyiHsK7RuMcHc2e_6-_G7eHrjJ1t0ptI_5EL6TXR4_ViYzxwsxsSh1iKyKhH7DxZScFtJfPB_dE1oZCBJ7xHA',
    bgColor: 'bg-stone-100',
    href: '/category?deal=top-3',
  },
  {
    id: 'deal-4',
    badge: 'Limited',
    title: 'Up To 70% Off',
    subtitle: 'Urban Streetwear Capsule',
    brand: 'EcoLuxe Brand',
    brandInitial: 'E',
    brandColor: 'bg-stone-900',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAu4XcuS8foDakvyLzUR-KAY6KJ_IEV5zxNlp2Z0La2yKDPwKdh4xo2IDpVp9xjD6lwc4NlVf4_3_pkN9cx68_TwkFNoqPGPMLwnEmcAQFROiaj3Eao7PCQG5XQU7waD6qtYau1TeDL3SGsu7RCRSHie5BglSzxw3z97Egk17u-o9fn4QsfslXnDy0JX7_dIdNgaBUIMgtxx0zTtDRjiMjXJen_sO4MuhCj78bw5A',
    bgColor: 'bg-[#ee5943]/20',
    href: '/category?deal=top-4',
  },
  {
    id: 'deal-5',
    badge: 'Rare Drop',
    title: 'Up To 65% Off',
    subtitle: 'High-Top Leather Sneakers',
    brand: 'SF Sneaker Co',
    brandInitial: 'S',
    brandColor: 'bg-[#ba1a1a]',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCD0ZB9JFLfkzvFC68HvU8tXMqxzQsEkoRqjazTITeT1DcEDQ80wWupTO3XfStG7IAjZ3iyUzRdgAIAdnXT8z4IVfwR2-b2ugtXZSMmjEt3fuypKDYjOAFXd62wgU25ruMRBDkmKKPQ5BLIWbxIptf5ujcXOO13QsUyeTUgMDumEEhXWUi7InCFL3WFeboEcp4Ulw96ADWD61vGMF6883nrAM1QozFBHOYJ261-Q',
    bgColor: 'bg-[#e5cfc8]',
    href: '/category?deal=top-5',
  },
  {
    id: 'deal-6',
    badge: 'Exclusive',
    title: 'Up To 60% Off',
    subtitle: 'Designer Totes & Leather Bags',
    brand: 'Atelier Milan',
    brandInitial: 'M',
    brandColor: 'bg-amber-800',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDq5hWZd7gcdkKQPebnbe8HjDg0NIt_Iqg1tANSrOK9Ox3MWofbYeCuHoYezH1vDbgR9iwDhRq86BYkgIRotFXP_A775omml-fzx2AmpPwbZGTBKcCRXrGP0cjSiQWxdeG3MLKUrYTaZxd2ojJfW7qlkDpa7eFLgC1kvwNjJ7AFrWyLeJts0LqEESMPq8jKdOYJ-ABw-FyRLX3AwvnBPU_NhirWYxwfR83qcHAqrA',
    bgColor: 'bg-[#efe9e3]',
    href: '/category?deal=top-6',
  },
  {
    id: 'deal-7',
    badge: 'VIP Pick',
    title: 'Up To 70% Off',
    subtitle: 'Artisanal Festive Silks',
    brand: 'Rangmanch',
    brandInitial: 'R',
    brandColor: 'bg-rose-900',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATKEJFfrZfwPr8oQ4E1-Vvymoy-wQkWdvK35GZskSQGECzX6lfZIgCRKeyyrXp8KBpOPHMF0lpPgcgfqzZuSMxqPVwuKxT_tzx5T4-7sKWZYuNQU-7amTvoSHbpLToCo3OsgY90NOzMtbgNPnv-6eSPteZGQD59z77f0quxYpTmRrB-aPirJ5ZgTJbYKtniorBum27Vx3sVqTdZrJTyE6pTsdOey6b__TocaDns58nsONvhhBQG-w',
    bgColor: 'bg-[#fcf8f5]',
    href: '/category?deal=top-7',
  },
  {
    id: 'deal-8',
    badge: 'Flash 65%',
    title: 'Up To 65% Off',
    subtitle: 'Classic Selvedge Denim',
    brand: 'Peter England',
    brandInitial: 'P',
    brandColor: 'bg-blue-900',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCD6z8Kqjf7ii_WUQvGJidL9hrL3o5C-9iwWE6MmVp-mlotFPIF7VvYgFNgR80qheYR0CGOmn8ar5rzPRoOOHPc0vbocB7_kE3hDOzpHe90wvqQVqr2v__LpDHjJdQQmP4ZUJrqeGKbL96MIzP59-siIV23_o7e5aaHaF6qkXI5a6cHj3HJhEQxIqfA0H9lEXynjnunAKgCIc5yeGZVt_LtDAtUtYYHq4Wh5BfC7g',
    bgColor: 'bg-stone-100',
    href: '/category?deal=top-8',
  },
];


const justInProducts = [
  {
    id: 'ji-1',
    brand: 'AJILE',
    title: 'Brown Flared Active Pant',
    discountPrice: 1299,
    originalPrice: 2499,
    discountPercent: 48,
    hasRibbon: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDw8JCu0-chVwXKxtYrdaXqUyVVQaqWrkB9oLnLFvY9UZNW2_5FkOC4YhX48su-Lg6aPFTTOnxYOf6nVTECAsvYhquhquDOgysVgZpP4mNNQcJGiQRJQk7QbQoJ_iE1cD-D-Xbt_u0VoC3cUBGHW3Cjuz_jV0l0yHS_4fsJ9IGEKjJSn6GBsFTZLIksQ3te47Rh3pgG7BOg8JVWp2-NM3vl8SUx29Z-pwAvSySMjQ',
    href: '/product/2',
  },
  {
    id: 'ji-2',
    brand: 'AJILE',
    title: 'White Contrast Collar Oversized...',
    discountPrice: 539,
    originalPrice: 599,
    discountPercent: 10,
    hasRibbon: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEQlYMkmLBIe16HU-eGR-1Aq8hZD44GrBJaLxqyY587yC6ey9XJ4GtZvJLZwoCZZCytbi4eNQVHJB8mKZtaCS6q1oko2JCUtGgGbOONx_Tg2mRurzJPkPDvMwuDIFyWIM7p0UqLs6CK4F0QWT3PZXNVX7-UQF0Ilo4O4zwcZqEKPkWRvFP7NOOIo0ebj5zYamR4ikxk5SIJ7EPr0q-GtmnYmG-I7__q9Af7lwWFg',
    href: '/product/3',
  },
  {
    id: 'ji-3',
    brand: 'AJILE',
    title: 'Black Printed Full Length Mid Ris...',
    discountPrice: 479,
    originalPrice: 1199,
    discountPercent: 60,
    hasRibbon: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQhhyqWdYRh8qpTXZyl_KelJJfeuQsseZVT3JQiAzZtn82V_c2SafVQjQA5XP2lTuqPZaiSuEa8YYAaBzfk9dHPWbftu3bAqeWEGgk3lG5-3VuhmI5ZHylxVAhTP_iEZS0z9J47xV9eQDbx7yJt6xAU3j3Ro5i6BnaaLyOchB2QEXHfo7ef2MjrWatPklruen8T__jq5PUr2It9YPS6yYBliml06uYsccaia_juA',
    href: '/product/4',
  },
  {
    id: 'ji-4',
    brand: 'AKKRITI',
    title: 'Olive Embroidered Peplum Top ...',
    discountPrice: 2599,
    originalPrice: 3999,
    discountPercent: 35,
    hasRibbon: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfAjn1pqNhyu6o0ODhdHAEvwGh_fhQUXGIWeDltdALENOlPxkgPhXUIJlZMCHREbSDq_kGcxVp1QnB4LnQZGaVQLcfbkGEPxRtCN4vc0MhL7fWFyvtBh2fqPomXW9ujKDWPFDROMOEw76eZnfxZJnrsT313-MGz9SgYxTpVHTzlK5GlseHV31jwxZseNN3zBQROVMo9trp08cn1kCL0hcxYg2fixoKFlADbMiHiQ',
    href: '/product/5',
  },
  {
    id: 'ji-5',
    brand: 'RANGMANCH',
    title: 'Yellow Embroidered Festive Eth...',
    discountPrice: 3999,
    originalPrice: 5999,
    discountPercent: 33,
    hasRibbon: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB99dwpq68H6bPiciXwJbg8dmsBb9ckLz9C6gof-cbpXjktk_ZioLvspE-f_DhDqo5jJLokmnuLqNM8FJet_N9X7ZhNRjKbsKQIqQ0GiKX52EgCEj28YmrHy09vwwKkMgZQbgO2KiriXB7eoPCWzSyiHsK7RuMcHc2e_6-_G7eHrjJ1t0ptI_5EL6TXR4_ViYzxwsxsSh1iKyKhH7DxZScFtJfPB_dE1oZCBJ7xHA',
    href: '/product/6',
  },
  {
    id: 'ji-6',
    brand: 'AKKRITI',
    title: 'Wine Sleeveless Festive Kurti...',
    discountPrice: 699,
    originalPrice: 1299,
    discountPercent: 46,
    hasRibbon: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCD0ZB9JFLfkzvFC68HvU8tXMqxzQsEkoRqjazTITeT1DcEDQ80wWupTO3XfStG7IAjZ3iyUzRdgAIAdnXT8z4IVfwR2-b2ugtXZSMmjEt3fuypKDYjOAFXd62wgU25ruMRBDkmKKPQ5BLIWbxIptf5ujcXOO13QsUyeTUgMDumEEhXWUi7InCFL3WFeboEcp4Ulw96ADWD61vGMF6883nrAM1QozFBHOYJ261-Q',
    href: '/product/7',
  },
  {
    id: 'ji-7',
    brand: 'RANGMANCH',
    title: 'Off-White Embroidered Festive Eth...',
    discountPrice: 1899,
    originalPrice: 3499,
    discountPercent: 46,
    hasRibbon: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATKEJFfrZfwPr8oQ4E1-Vvymoy-wQkWdvK35GZskSQGECzX6lfZIgCRKeyyrXp8KBpOPHMF0lpPgcgfqzZuSMxqPVwuKxT_tzx5T4-7sKWZYuNQU-7amTvoSHbpLToCo3OsgY90NOzMtbgNPnv-6eSPteZGQD59z77f0quxYpTmRrB-aPirJ5ZgTJbYKtniorBum27Vx3sVqTdZrJTyE6pTsdOey6b__TocaDns58nsONvhhBQG-w',
    href: '/product/8',
  },
];

export default function HomePage() {
  const [lovedGender, setLovedGender] = useState<'men' | 'women'>('women');
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);

  useEffect(() => {
    const heroTimer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    const promoTimer = setInterval(() => {
      setCurrentPromoIndex((prev) => (prev + 1) % promoSlides.length);
    }, 7000);
    return () => {
      clearInterval(heroTimer);
      clearInterval(promoTimer);
    };
  }, []);

  const nextHeroSlide = () => {
    setCurrentHeroIndex((prev) => (prev + 1) % heroSlides.length);
  };
  const prevHeroSlide = () => {
    setCurrentHeroIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const nextPromoSlide = () => {
    setCurrentPromoIndex((prev) => (prev + 1) % promoSlides.length);
  };
  const prevPromoSlide = () => {
    setCurrentPromoIndex((prev) => (prev - 1 + promoSlides.length) % promoSlides.length);
  };

  const scrollSeasonal = (offset: number) => {
    const el = document.getElementById('seasonal-stores-scroll');
    if (el) el.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const scrollTopDeals = (offset: number) => {
    const el = document.getElementById('top-deals-scroll');
    if (el) el.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const scrollJustIn = (offset: number) => {
    const el = document.getElementById('just-in-scroll-container');
    if (el) el.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const scrollNewArrivalsRow1 = (offset: number) => {
    const el = document.getElementById('new-arrivals-row1-scroll');
    if (el) el.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const scrollNewArrivalsRow2 = (offset: number) => {
    const el = document.getElementById('new-arrivals-row2-scroll');
    if (el) el.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const scrollBrands = (offset: number) => {
    const el = document.getElementById('brands-you-love-scroll');
    if (el) el.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const handleGenderSwitch = (gender: 'men' | 'women') => {
    setLovedGender(gender);
    const iconMen = document.getElementById('icon-wrap-men');
    const labelMen = document.getElementById('label-men');
    const iconWomen = document.getElementById('icon-wrap-women');
    const labelWomen = document.getElementById('label-women');
    const subnavMen = document.getElementById('gender-subnav-men');
    const subnavWomen = document.getElementById('gender-subnav-women');
    const gridMen = document.getElementById('products-grid-men');
    const gridWomen = document.getElementById('products-grid-women');

    if (gender === 'men') {
      iconMen?.classList.remove('text-[#333333]', 'text-stone-600');
      iconMen?.classList.add('text-[#c8002e]');
      labelMen?.classList.remove('text-[#333333]', 'text-stone-600');
      labelMen?.classList.add('text-[#c8002e]');

      iconWomen?.classList.remove('text-[#c8002e]');
      iconWomen?.classList.add('text-[#333333]');
      labelWomen?.classList.remove('text-[#c8002e]');
      labelWomen?.classList.add('text-[#333333]');

      subnavMen?.classList.remove('hidden');
      subnavMen?.classList.add('flex');
      subnavWomen?.classList.remove('flex');
      subnavWomen?.classList.add('hidden');

      gridMen?.classList.remove('hidden');
      gridWomen?.classList.add('hidden');
    } else {
      iconWomen?.classList.remove('text-[#333333]', 'text-stone-600');
      iconWomen?.classList.add('text-[#c8002e]');
      labelWomen?.classList.remove('text-[#333333]', 'text-stone-600');
      labelWomen?.classList.add('text-[#c8002e]');

      iconMen?.classList.remove('text-[#c8002e]');
      iconMen?.classList.add('text-[#333333]');
      labelMen?.classList.remove('text-[#c8002e]');
      labelMen?.classList.add('text-[#333333]');

      subnavWomen?.classList.remove('hidden');
      subnavWomen?.classList.add('flex');
      subnavMen?.classList.remove('flex');
      subnavMen?.classList.add('hidden');

      gridWomen?.classList.remove('hidden');
      gridMen?.classList.add('hidden');
    }
  };

  const handleSubTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const parent = btn.parentElement;
    if (!parent) return;
    const tabs = parent.querySelectorAll('.subtab-item');
    tabs.forEach((t) => {
      t.classList.remove('text-black', 'border-b-2', 'border-black', 'font-extrabold');
      t.classList.add('text-gray-400');
    });
    btn.classList.remove('text-gray-400');
    btn.classList.add('text-black', 'border-b-2', 'border-black', 'font-extrabold');
  };

  return (
    <div className="min-h-screen bg-white text-color-text-primary">
<style id="color-theme-override" dangerouslySetInnerHTML={{ __html: `
.text-\[\#1ea768\], .text-\[\#14CDA8\], .text-\[\#006b57\], .text-emerald-400, .text-teal-300 { color: #FF3F6C !important; }
.bg-\[\#1ea768\], .bg-\[\#14CDA8\] { background-color: #FF3F6C !important; }
.border-\[\#1ea768\] { border-color: #FF3F6C !important; }
.bg-\[\#14CDA8\]\/10 { background-color: rgba(255, 63, 108, 0.08) !important; }
.bg-\[\#cbf2de\], .bg-\[\#cbf2de\]\/50 { background-color: rgba(255, 63, 108, 0.12) !important; }
.hover\:bg-\[\#1ea768\]:hover, .hover\:bg-\[\#14CDA8\]:hover { background-color: #FF3F6C !important; }
.hover\:text-\[\#1ea768\]:hover { color: #FF3F6C !important; }
.group:hover .group-hover\:border-\[\#1ea768\] { border-color: #FF3F6C !important; }

* { font-family: 'Figtree', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important; }
body, html, h1, h2, h3, h4, h5, h6, p, span, a, button, input, div, strong, em, b, i { font-family: 'Figtree', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important; }
` }} />

<main className="w-full space-y-10 pb-12 px-0 mx-0 overflow-x-hidden">
{/* BEGIN: 2. Main Hero Section */}
<section className="w-full overflow-hidden shadow-sm relative" data-purpose="hero-vault">
  <div className="relative w-full min-h-[680px] md:min-h-[760px] lg:min-h-[820px] h-[78vh] max-h-[920px] flex items-center justify-center overflow-hidden bg-stone-900 group">
    {heroSlides.map((slide, idx) => (
      <div
        key={slide.id}
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
          currentHeroIndex === idx ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
        }`}
      >
        <img
          src={slide.image}
          alt={slide.alt}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </div>
    ))}

    {/* Previous Slide Button */}
    <button
      type="button"
      onClick={prevHeroSlide}
      aria-label="Previous slide"
      className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md backdrop-blur-sm flex items-center justify-center transition-all cursor-pointer border border-white/40 group/btn"
    >
      <ChevronLeft className="w-5 h-5 text-gray-800 group-hover/btn:scale-110 transition-transform" />
    </button>

    {/* Next Slide Button */}
    <button
      type="button"
      onClick={nextHeroSlide}
      aria-label="Next slide"
      className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md backdrop-blur-sm flex items-center justify-center transition-all cursor-pointer border border-white/40 group/btn"
    >
      <ChevronRight className="w-5 h-5 text-gray-800 group-hover/btn:scale-110 transition-transform" />
    </button>

    {/* Bottom Dots Indicator */}
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
      {heroSlides.map((_, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => setCurrentHeroIndex(idx)}
          className={`h-2 transition-all rounded-full ${
            currentHeroIndex === idx ? 'w-8 bg-white shadow-sm' : 'w-2 bg-white/50 hover:bg-white/80'
          }`}
          aria-label={`Go to slide ${idx + 1}`}
        />
      ))}
    </div>
  </div>

  <div className="bg-[#111827] border-t border-stone-800 text-white px-4 sm:px-8 py-3.5">
    <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="bg-[#FF3F6C] text-white text-[10px] font-black px-2.5 py-1 rounded tracking-wider uppercase">FLASH BATCH 04</span>
        <span className="font-medium text-stone-200 text-xs sm:text-sm">High-Velocity Allocations: <span className="text-white font-bold">420 items</span> released every 6 hours</span>
      </div>
      <div className="flex items-center gap-3 shrink-0 flex-wrap">
        <div className="flex items-center gap-1 font-mono text-xs">
          <span className="text-stone-400 font-sans text-[11px] uppercase tracking-wider mr-1">CLOSES IN:</span>
          <span className="bg-stone-800 border border-stone-700 px-2 py-0.5 rounded font-bold text-white">02h</span>
          <span className="text-stone-400">:</span>
          <span className="bg-stone-800 border border-stone-700 px-2 py-0.5 rounded font-bold text-white">14m</span>
          <span className="text-stone-400">:</span>
          <span className="bg-[#FF3F6C] text-white px-2 py-0.5 rounded font-bold">38s</span>
        </div>
        <span className="text-stone-500 font-light">•</span>
        <span className="text-stone-300 font-semibold text-xs flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#14CDA8]"></span>84% Allocated
        </span>
      </div>
    </div>
  </div>
</section>
{/* END: 2. Main Hero Section */}
{/* BEGIN: 3. Brand on the Radar / Curated Seasonal Stores */}
<section data-purpose="curated-department-showcase" className="w-full px-4 sm:px-6 lg:px-8 py-2">
  <div className="max-w-[1440px] mx-auto">
    {/* SVG Defs for Metallic White, Brown, Golden Gradient Border */}
    <svg className="absolute w-0 h-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <defs>
        <linearGradient id="luxuryGoldBrownWhiteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6E3812" />
          <stop offset="22%" stopColor="#D4AF37" />
          <stop offset="50%" stopColor="#FFFFFF" />
          <stop offset="78%" stopColor="#C89D58" />
          <stop offset="100%" stopColor="#54280B" />
        </linearGradient>
      </defs>
    </svg>

    {/* Multi-item curated seasonal stores carousel */}
    <div className="relative group/seasonal w-full">
      {/* Floating Left Navigation Arrow */}
      <button
        type="button"
        aria-label="Previous Stores"
        onClick={() => scrollSeasonal(-420)}
        className="absolute -left-2.5 sm:-left-3.5 top-1/3 -translate-y-1/2 z-20 w-8 sm:w-9 h-11 sm:h-12 bg-white/95 hover:bg-white text-stone-700 hover:text-black border border-stone-200 shadow-md rounded-r-md flex items-center justify-center transition-all cursor-pointer opacity-80 sm:opacity-0 group-hover/seasonal:opacity-100 duration-200"
      >
        <ChevronLeft className="w-4 h-4 text-stone-700" />
      </button>

      {/* Floating Right Navigation Arrow */}
      <button
        type="button"
        aria-label="Next Stores"
        onClick={() => scrollSeasonal(420)}
        className="absolute -right-2.5 sm:-right-3.5 top-1/3 -translate-y-1/2 z-20 w-8 sm:w-9 h-11 sm:h-12 bg-white/95 hover:bg-white text-stone-700 hover:text-black border border-stone-200 shadow-md rounded-l-md flex items-center justify-center transition-all cursor-pointer opacity-80 sm:opacity-0 group-hover/seasonal:opacity-100 duration-200"
      >
        <ChevronRight className="w-4 h-4 text-stone-700" />
      </button>

      {/* Smooth Horizontal Scroll Rail */}
      <div
        id="seasonal-stores-scroll"
        className="flex items-start gap-3 sm:gap-4 lg:gap-4.5 overflow-x-auto scroll-smooth py-1 px-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {seasonalStores.map((store) => (
          <Link
            key={store.id}
            href={store.href}
            className="group flex flex-col items-center cursor-pointer shrink-0 w-[145px] sm:w-[170px] md:w-[190px] lg:w-[calc((100%-6*1.125rem)/6.5)]"
          >
            <div className={`w-full aspect-square rounded-[3px] border border-[#d8cfc4] overflow-hidden relative ${store.bgColor}`}>
              <img
                src={store.image}
                alt={store.title}
                className="w-full h-full object-cover"
              />
              {/* Inset Gradient Border (White, Brown, Golden) with minimal distance and minor curve */}
              <div className="absolute inset-[2px] pointer-events-none z-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <rect
                    x="0.8"
                    y="0.8"
                    width="98.4"
                    height="98.4"
                    rx="1.5"
                    fill="none"
                    stroke="url(#luxuryGoldBrownWhiteGradient)"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>
            </div>
            <span className={`mt-2.5 sm:mt-3 font-normal text-gray-900 text-center block leading-tight font-sans whitespace-nowrap ${store.titleClass}`}>
              {store.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  </div>
</section>
{/* END: 3. Brand on the Radar / Curated Seasonal Stores */}

{/* BEGIN: Just In Showcase */}
<section data-purpose="just-in-showcase" className="w-full py-8 sm:py-10 px-4 sm:px-6 lg:px-8 bg-white" style={{ backgroundColor: "#ffffff" }}>
  <div className="max-w-[1440px] mx-auto">
    {/* Header Title */}
    <div className="flex items-center justify-between mb-6">
      <div className="w-16 hidden sm:block"></div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight text-center flex-1">Just In</h2>
      <div className="w-auto sm:w-16 text-right">
        <Link href="/category?filter=just-in" className="text-xs font-bold text-[#00a896] hover:underline whitespace-nowrap flex items-center justify-end gap-1">
          View All <ArrowRight className="w-3.5 h-3.5 inline ml-1 text-[#FF3F6C]" />
        </Link>
      </div>
    </div>

    {/* Category Filter Pills */}
    <div className="flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap mb-8">
      <button type="button" className="px-6 py-2 rounded-full bg-[#00a896] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors hover:bg-teal-600 cursor-pointer">All</button>
      <button type="button" className="px-6 py-2 rounded-full bg-white border border-gray-900 text-gray-900 text-xs sm:text-sm font-semibold hover:bg-stone-50 transition-colors cursor-pointer">Men</button>
      <button type="button" className="px-6 py-2 rounded-full bg-white border border-gray-900 text-gray-900 text-xs sm:text-sm font-semibold hover:bg-stone-50 transition-colors cursor-pointer">Women</button>
      <button type="button" className="px-6 py-2 rounded-full bg-white border border-gray-900 text-gray-900 text-xs sm:text-sm font-semibold hover:bg-stone-50 transition-colors cursor-pointer">Boys</button>
      <button type="button" className="px-6 py-2 rounded-full bg-white border border-gray-900 text-gray-900 text-xs sm:text-sm font-semibold hover:bg-stone-50 transition-colors cursor-pointer">Girls</button>
    </div>

    {/* Main Showcase Container Box */}
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-4 sm:p-6 lg:p-8 relative flex flex-col lg:flex-row items-stretch gap-6">
      {/* Floating Left Navigation Arrow */}
      <button
        type="button"
        aria-label="Previous Item"
        className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-12 bg-white/95 border border-stone-200 shadow-md rounded-r-md flex items-center justify-center text-gray-500 hover:text-black hover:bg-white transition-all cursor-pointer"
        onClick={() => scrollJustIn(-320)}
      >
        <ChevronLeft className="w-4 h-4 text-stone-600" />
      </button>
      {/* Floating Right Navigation Arrow */}
      <button
        type="button"
        aria-label="Next Item"
        className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-12 bg-white/95 border border-stone-200 shadow-md rounded-l-md flex items-center justify-center text-gray-500 hover:text-black hover:bg-white transition-all cursor-pointer"
        onClick={() => scrollJustIn(320)}
      >
        <ChevronRight className="w-4 h-4 text-stone-600" />
      </button>

      {/* Left Callout Banner */}
      <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left shrink-0 lg:w-48 xl:w-52 py-4 px-2 border-b lg:border-b-0 lg:border-r border-stone-100">
        <span className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">Just In</span>
        <span className="text-5xl sm:text-6xl font-black text-gray-950 tracking-tighter my-1">3902</span>
        <p className="text-[11px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider mb-5">NEW STYLES JUST LANDED</p>
        <Link href="/category?filter=just-in" className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#00a896] hover:underline uppercase tracking-wide">
          SHOP NOW <i className="fa-solid fa-play text-[9px]"></i>
        </Link>
      </div>

      {/* Right Horizontal Grid / Carousel of Products */}
      <div id="just-in-scroll-container" className="flex-1 overflow-x-auto hide-scrollbar scroll-smooth px-1">
        <div className="flex flex-nowrap gap-4 pb-2 items-stretch">
          {justInProducts.map((item) => (
            <div
              key={item.id}
              className="product-card flex-none w-[205px] sm:w-[220px] bg-white rounded-xl border border-gray-200/90 shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between group relative select-none"
            >
              <div className="relative w-full aspect-[3/4.2] bg-stone-50">
                {item.hasRibbon && <HangTag text="Just In" />}
                <div className="w-full h-full overflow-hidden">
                  <Link href={item.href} className="block w-full h-full">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                </div>
                {/* Floating Wishlist & Cart buttons on bottom-right of image */}
                <div className="absolute right-2.5 -bottom-3.5 z-20 flex items-center gap-1.5">
                  <button
                    type="button"
                    aria-label="Add to wishlist"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-[#c8002e] flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110 cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
                  </button>
                  <button
                    type="button"
                    aria-label="Add to cart"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-black flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
                  </button>
                </div>
              </div>

              {/* Text info block */}
              <div className="p-3 pt-4.5 bg-white flex flex-col justify-between flex-1">
                <div>
                  <h4 className="text-[12px] sm:text-[13px] font-bold tracking-wider text-gray-900 uppercase block mb-0.5">
                    {item.brand}
                  </h4>
                  <p className="text-xs text-gray-600 truncate block font-normal leading-snug">
                    {item.title}
                  </p>
                </div>
                <div className="flex items-baseline gap-2 mt-2 flex-wrap">
                  <span className="text-sm font-bold text-gray-900">
                    ₹ {item.discountPrice.toLocaleString('en-IN')}
                  </span>
                  {item.originalPrice && (
                    <span className="text-xs text-gray-400 line-through font-normal">
                      ₹ {item.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  {item.discountPercent && (
                    <span className="text-[11px] font-bold text-[#00a896]">
                      {item.discountPercent}% OFF
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* + VIEW ALL Card */}
          <Link
            href="/category?filter=just-in"
            className="product-card flex-none w-[180px] sm:w-[200px] bg-white border border-stone-200 shadow-xs overflow-hidden flex flex-col items-center justify-center p-6 shrink-0 rounded-xl group hover:shadow-md hover:border-black transition-all cursor-pointer min-h-[320px]"
          >
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-stone-900 text-xs sm:text-sm font-bold tracking-widest uppercase group-hover:text-black transition-colors select-none">
                + VIEW ALL
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>
{/* END: Just In Showcase */}

{/* BEGIN: 4. TOP DEALS */}
<section data-purpose="top-deals" className="w-full pt-10 pb-10 px-4 sm:px-6 lg:px-8 border-y border-[#e5e7eb] bg-[#F5F5F5]" style={{ backgroundColor: "#F5F5F5", marginBottom: 0 }}>
<div className="max-w-[1440px] mx-auto">
<div className="relative mb-6">
  <div className="text-center">
    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 text-center">Top Deals</h2>
    <p className="text-xs text-[#4B5563] mt-0.5">Handpicked premium discounts refreshed daily</p>
  </div>
  <div className="sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2 flex items-center justify-center gap-3 mt-3 sm:mt-0">
    {/* Navigation Arrows in Header */}
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        aria-label="Previous Deals"
        onClick={() => scrollTopDeals(-360)}
        className="w-8 h-8 rounded-full bg-white border border-stone-200 shadow-xs flex items-center justify-center text-stone-700 hover:text-black hover:border-black transition-all cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        type="button"
        aria-label="Next Deals"
        onClick={() => scrollTopDeals(360)}
        className="w-8 h-8 rounded-full bg-white border border-stone-200 shadow-xs flex items-center justify-center text-stone-700 hover:text-black hover:border-black transition-all cursor-pointer"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
    <Link className="text-xs font-bold hover:underline flex items-center gap-1" href="/category?deal=top" style={{ color: "#FF3F6C" }}>View All <ArrowRight className="w-3.5 h-3.5" /></Link>
  </div>
</div>

{/* Horizontal Scroll Rail with Floating Chevrons */}
<div className="relative group/topdeals w-full">
  {/* Floating Left Navigation Arrow */}
  <button
    type="button"
    aria-label="Scroll Left"
    onClick={() => scrollTopDeals(-360)}
    className="absolute -left-3 sm:-left-4 top-[40%] -translate-y-1/2 z-20 w-8 sm:w-10 h-11 sm:h-12 bg-white/95 hover:bg-white text-stone-700 hover:text-black border border-stone-200 shadow-md rounded-r-lg flex items-center justify-center transition-all cursor-pointer opacity-80 sm:opacity-0 group-hover/topdeals:opacity-100 duration-200"
  >
    <ChevronLeft className="w-5 h-5 text-stone-700" />
  </button>

  {/* Floating Right Navigation Arrow */}
  <button
    type="button"
    aria-label="Scroll Right"
    onClick={() => scrollTopDeals(360)}
    className="absolute -right-3 sm:-right-4 top-[40%] -translate-y-1/2 z-20 w-8 sm:w-10 h-11 sm:h-12 bg-white/95 hover:bg-white text-stone-700 hover:text-black border border-stone-200 shadow-md rounded-l-lg flex items-center justify-center transition-all cursor-pointer opacity-80 sm:opacity-0 group-hover/topdeals:opacity-100 duration-200"
  >
    <ChevronRight className="w-5 h-5 text-stone-700" />
  </button>

  {/* Scrollable Container */}
  <div
    id="top-deals-scroll"
    className="flex items-stretch gap-5 sm:gap-6 overflow-x-auto scroll-smooth py-2 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
  >
    {topDealsList.map((deal) => (
      <Link
        key={deal.id}
        href={deal.href}
        className="product-card bg-white rounded-[6px] border border-[#e5e7eb] overflow-hidden flex flex-col justify-between shadow-xs group shrink-0 w-[260px] sm:w-[280px] md:w-[300px] lg:w-[calc((100%-3*1.5rem)/4)]"
      >
        <div className={`w-full aspect-[4/5] ${deal.bgColor} rounded-t-[5px] overflow-hidden relative`}>
          <img
            alt={deal.subtitle}
            className="w-full h-full object-cover"
            src={deal.image}
          />
          <span className="absolute top-3 left-3 bg-[#ba1a1a] text-white text-[10px] font-bold px-2 py-0.5 rounded-[3px] uppercase tracking-wider">
            {deal.badge}
          </span>
        </div>
        <div className="p-3.5 text-center">
          <h3 className="text-base font-extrabold text-gray-900">{deal.title}</h3>
          <p className="text-xs text-[#4B5563] mt-0.5">{deal.subtitle}</p>
          <div className="mt-3 pt-2.5 border-t border-[#f2eded] flex items-center justify-center gap-2">
            <span className={`w-5 h-5 rounded-full ${deal.brandColor} text-white flex items-center justify-center text-[10px] font-bold`}>
              {deal.brandInitial}
            </span>
            <span className="text-[11px] font-semibold text-gray-700">{deal.brand}</span>
          </div>
        </div>
      </Link>
    ))}
  </div>
</div>
</div>
</section>
{/* END: 4. TOP DEALS */}
<section data-purpose="deal-of-the-month" className="w-full !mt-0 py-10 px-4 sm:px-6 lg:px-8 bg-white" style={{ backgroundColor: "#ffffff", width: "100%", marginLeft: 0, marginRight: 0, marginTop: 0 }}>
  <div className="max-w-[1440px] mx-auto">
    {/* Header */}
    <div className="relative mb-6">
      <div className="text-center">
        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
          <span className="text-[#FF3F6C] font-extrabold">HOT SELECTION</span> Limited Allocation
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 text-center">
          Deal of this Month
        </h2>
      </div>
      <div className="sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2 flex items-center justify-center mt-3 sm:mt-0">
        <Link href="/category?deal=month" className="text-xs font-bold text-[#FF3F6C] hover:underline flex items-center gap-1">
          View All <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
        </Link>
      </div>
    </div>

    {/* 4-Card Grid matching Image 6 */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
      {/* Card 1 */}
      <div className="product-card bg-white rounded-[6px] border border-stone-200 overflow-hidden p-0 flex flex-col justify-between shadow-xs"><div><div className="w-full aspect-[4/5] bg-stone-100 rounded-t-[5px] overflow-hidden relative mb-3"><ProductHoverCarousel images={["https://lh3.googleusercontent.com/aida-public/AB6AXuDfAjn1pqNhyu6o0ODhdHAEvwGh_fhQUXGIWeDltdALENOlPxkgPhXUIJlZMCHREbSDq_kGcxVp1QnB4LnQZGaVQLcfbkGEPxRtCN4vc0MhL7fWFyvtBh2fqPomXW9ujKDWPFDROMOEw76eZnfxZJnrsT313-MGz9SgYxTpVHTzlK5GlseHV31jwxZseNN3zBQROVMo9trp08cn1kCL0hcxYg2fixoKFlADbMiHiQ", "https://lh3.googleusercontent.com/aida-public/AB6AXuAu4XcuS8foDakvyLzUR-KAY6KJ_IEV5zxNlp2Z0La2yKDPwKdh4xo2IDpVp9xjD6lwc4NlVf4_3_pkN9cx68_TwkFNoqPGPMLwnEmcAQFROiaj3Eao7PCQG5XQU7waD6qtYau1TeDL3SGsu7RCRSHie5BglSzxw3z97Egk17u-o9fn4QsfslXnDy0JX7_dIdNgaBUIMgtxx0zTtDRjiMjXJen_sO4MuhCj78bw5A", "https://lh3.googleusercontent.com/aida-public/AB6AXuBEZWg_Qcw-XrvHDafNBvoqtwZzN9Zj2Axao8bXj_8oykAGO9lUo6LwB_F2Rgs-q9lfYrzwqI1ip_c87XMcTqh98ls2Y1zaHXvLke94RFLLrym5vwqfntMB0bExAZCFXW4hJY0wZHxgXXiOy_MhOrMjUmdtHXJxyiW01veWxVyVBD2yrQj1o4098-Q3D2onxbiD2giCuBI5o2tak50C1zZhefvNekUmZOVOweCs_Q"]} alt="Classic Trench &amp; Outerwear" className="w-full h-full object-cover" /><span className="absolute top-0 right-0 bg-[#FF3F6C] text-white text-[10px] font-bold px-2.5 py-1 rounded-bl-[4px] uppercase tracking-wider shadow-xs">Flash 70%</span></div><div className="px-3.5"><div className="flex items-center justify-between mb-1"><span className="text-xs font-bold text-gray-900">Aura Studio</span><span className="text-xs font-bold text-[#FF3F6C]">Save 70%</span></div><h4 className="text-xs text-[#4B5563] font-medium mb-3">Classic Trench &amp; Outerwear</h4><div className="mb-4"><div className="flex items-center justify-between text-[11px] text-gray-500 mb-1.5"><span className="">Stock Allocation:</span><span className="font-medium text-gray-700">82% Claimed (8 left)</span></div><div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden"><div className="h-full bg-[#FF3F6C] rounded-full" style={{ width: "82%" }}></div></div></div></div></div><div className="flex items-center justify-between p-3.5 pt-2 border-t border-[#f2eded]"><div className="flex items-baseline gap-1.5 flex-wrap"><span className="text-sm font-bold text-gray-900">₹ 899</span><span className="text-xs text-gray-400 line-through">₹ 2,999</span><span className="text-[11px] font-bold text-[#FF3F6C]">(70% OFF)</span></div><Link href="/cart" className="px-3.5 py-1.5 bg-stone-900 text-white text-xs font-bold rounded-[4px] hover:bg-black transition-colors flex items-center gap-1">+ Quick Add</Link></div></div>

      {/* Card 2 */}
      <div className="product-card bg-white rounded-[6px] border border-stone-200 overflow-hidden p-0 flex flex-col justify-between shadow-xs"><div><div className="w-full aspect-[4/5] bg-stone-100 rounded-t-[5px] overflow-hidden relative mb-3"><ProductHoverCarousel images={["https://lh3.googleusercontent.com/aida-public/AB6AXuBEZWg_Qcw-XrvHDafNBvoqtwZzN9Zj2Axao8bXj_8oykAGO9lUo6LwB_F2Rgs-q9lfYrzwqI1ip_c87XMcTqh98ls2Y1zaHXvLke94RFLLrym5vwqfntMB0bExAZCFXW4hJY0wZHxgXXiOy_MhOrMjUmdtHXJxyiW01veWxVyVBD2yrQj1o4098-Q3D2onxbiD2giCuBI5o2tak50C1zZhefvNekUmZOVOweCs_Q", "https://lh3.googleusercontent.com/aida-public/AB6AXuDfAjn1pqNhyu6o0ODhdHAEvwGh_fhQUXGIWeDltdALENOlPxkgPhXUIJlZMCHREbSDq_kGcxVp1QnB4LnQZGaVQLcfbkGEPxRtCN4vc0MhL7fWFyvtBh2fqPomXW9ujKDWPFDROMOEw76eZnfxZJnrsT313-MGz9SgYxTpVHTzlK5GlseHV31jwxZseNN3zBQROVMo9trp08cn1kCL0hcxYg2fixoKFlADbMiHiQ", "https://lh3.googleusercontent.com/aida-public/AB6AXuAu4XcuS8foDakvyLzUR-KAY6KJ_IEV5zxNlp2Z0La2yKDPwKdh4xo2IDpVp9xjD6lwc4NlVf4_3_pkN9cx68_TwkFNoqPGPMLwnEmcAQFROiaj3Eao7PCQG5XQU7waD6qtYau1TeDL3SGsu7RCRSHie5BglSzxw3z97Egk17u-o9fn4QsfslXnDy0JX7_dIdNgaBUIMgtxx0zTtDRjiMjXJen_sO4MuhCj78bw5A"]} alt="Activewear &amp; Jogger Sets" className="w-full h-full object-cover" /><span className="absolute top-0 right-0 bg-[#ba1a1a] text-white text-[10px] font-bold px-2.5 py-1 rounded-bl-[4px] uppercase tracking-wider shadow-xs">Hot Deal</span></div><div className="px-3.5"><div className="flex items-center justify-between mb-1"><span className="text-xs font-bold text-gray-900">Vogue Noir</span><span className="text-xs font-bold text-[#FF3F6C]">Save 70%</span></div><h4 className="text-xs text-[#4B5563] font-medium mb-3">Activewear &amp; Jogger Sets</h4><div className="mb-4"><div className="flex items-center justify-between text-[11px] text-gray-500 mb-1.5"><span className="">Stock Allocation:</span><span className="font-medium text-gray-700">91% Claimed (3 left)</span></div><div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden"><div className="h-full bg-[#FF3F6C] rounded-full" style={{ width: "91%" }}></div></div></div></div></div><div className="flex items-center justify-between p-3.5 pt-2 border-t border-[#f2eded]"><div className="flex items-baseline gap-1.5 flex-wrap"><span className="text-sm font-bold text-gray-900">₹ 899</span><span className="text-xs text-gray-400 line-through">₹ 2,999</span><span className="text-[11px] font-bold text-[#FF3F6C]">(70% OFF)</span></div><Link href="/cart" className="px-3.5 py-1.5 bg-stone-900 text-white text-xs font-bold rounded-[4px] hover:bg-black transition-colors flex items-center gap-1">+ Quick Add</Link></div></div>

      {/* Card 3 */}
      <div className="product-card bg-white rounded-[6px] border border-stone-200 overflow-hidden p-0 flex flex-col justify-between shadow-xs"><div><div className="w-full aspect-[4/5] bg-stone-100 rounded-t-[5px] overflow-hidden relative mb-3"><ProductHoverCarousel images={["https://lh3.googleusercontent.com/aida-public/AB6AXuB99dwpq68H6bPiciXwJbg8dmsBb9ckLz9C6gof-cbpXjktk_ZioLvspE-f_DhDqo5jJLokmnuLqNM8FJet_N9X7ZhNRjKbsKQIqQ0GiKX52EgCEj28YmrHy09vwwKkMgZQbgO2KiriXB7eoPCWzSyiHsK7RuMcHc2e_6-_G7eHrjJ1t0ptI_5EL6TXR4_ViYzxwsxsSh1iKyKhH7DxZScFtJfPB_dE1oZCBJ7xHA", "https://lh3.googleusercontent.com/aida-public/AB6AXuATKEJFfrZfwPr8oQ4E1-Vvymoy-wQkWdvK35GZskSQGECzX6lfZIgCRKeyyrXp8KBpOPHMF0lpPgcgfqzZuSMxqPVwuKxT_tzx5T4-7sKWZYuNQU-7amTvoSHbpLToCo3OsgY90NOzMtbgNPnv-6eSPteZGQD59z77f0quxYpTmRrB-aPirJ5ZgTJbYKtniorBum27Vx3sVqTdZrJTyE6pTsdOey6b__TocaDns58nsONvhhBQG-w", "https://lh3.googleusercontent.com/aida-public/AB6AXuDq5hWZd7gcdkKQPebnbe8HjDg0NIt_Iqg1tANSrOK9Ox3MWofbYeCuHoYezH1vDbgR9iwDhRq86BYkgIRotFXP_A775omml-fzx2AmpPwbZGTBKcCRXrGP0cjSiQWxdeG3MLKUrYTaZxd2ojJfW7qlkDpa7eFLgC1kvwNjJ7AFrWyLeJts0LqEESMPq8jKdOYJ-ABw-FyRLX3AwvnBPU_NhirWYxwfR83qcHAqrA"]} alt="Chiffon Maxi Dresses" className="w-full h-full object-cover" /><span className="absolute top-0 right-0 bg-stone-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-bl-[4px] uppercase tracking-wider shadow-xs">Save Big</span></div><div className="px-3.5"><div className="flex items-center justify-between mb-1"><span className="text-xs font-bold text-gray-900">Atelier Silk</span><span className="text-xs font-bold text-[#FF3F6C]">Save 70%</span></div><h4 className="text-xs text-[#4B5563] font-medium mb-3">Chiffon Maxi Dresses</h4><div className="mb-4"><div className="flex items-center justify-between text-[11px] text-gray-500 mb-1.5"><span className="">Stock Allocation:</span><span className="font-medium text-gray-700">76% Claimed (11 left)</span></div><div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden"><div className="h-full bg-[#FF3F6C] rounded-full" style={{ width: "76%" }}></div></div></div></div></div><div className="flex items-center justify-between p-3.5 pt-2 border-t border-[#f2eded]"><div className="flex items-baseline gap-1.5 flex-wrap"><span className="text-sm font-bold text-gray-900">₹ 899</span><span className="text-xs text-gray-400 line-through">₹ 2,999</span><span className="text-[11px] font-bold text-[#FF3F6C]">(70% OFF)</span></div><Link href="/cart" className="px-3.5 py-1.5 bg-stone-900 text-white text-xs font-bold rounded-[4px] hover:bg-black transition-colors flex items-center gap-1">+ Quick Add</Link></div></div>

      {/* Card 4 */}
      <div className="product-card bg-white rounded-[6px] border border-stone-200 overflow-hidden p-0 flex flex-col justify-between shadow-xs">
        <div>
          <div className="w-full aspect-[4/5] bg-stone-100 rounded-t-[5px] overflow-hidden relative mb-3">
            <ProductHoverCarousel images={["https://lh3.googleusercontent.com/aida-public/AB6AXuAu4XcuS8foDakvyLzUR-KAY6KJ_IEV5zxNlp2Z0La2yKDPwKdh4xo2IDpVp9xjD6lwc4NlVf4_3_pkN9cx68_TwkFNoqPGPMLwnEmcAQFROiaj3Eao7PCQG5XQU7waD6qtYau1TeDL3SGsu7RCRSHie5BglSzxw3z97Egk17u-o9fn4QsfslXnDy0JX7_dIdNgaBUIMgtxx0zTtDRjiMjXJen_sO4MuhCj78bw5A", "https://lh3.googleusercontent.com/aida-public/AB6AXuDfAjn1pqNhyu6o0ODhdHAEvwGh_fhQUXGIWeDltdALENOlPxkgPhXUIJlZMCHREbSDq_kGcxVp1QnB4LnQZGaVQLcfbkGEPxRtCN4vc0MhL7fWFyvtBh2fqPomXW9ujKDWPFDROMOEw76eZnfxZJnrsT313-MGz9SgYxTpVHTzlK5GlseHV31jwxZseNN3zBQROVMo9trp08cn1kCL0hcxYg2fixoKFlADbMiHiQ", "https://lh3.googleusercontent.com/aida-public/AB6AXuBEZWg_Qcw-XrvHDafNBvoqtwZzN9Zj2Axao8bXj_8oykAGO9lUo6LwB_F2Rgs-q9lfYrzwqI1ip_c87XMcTqh98ls2Y1zaHXvLke94RFLLrym5vwqfntMB0bExAZCFXW4hJY0wZHxgXXiOy_MhOrMjUmdtHXJxyiW01veWxVyVBD2yrQj1o4098-Q3D2onxbiD2giCuBI5o2tak50C1zZhefvNekUmZOVOweCs_Q"]} alt="Double-Faced Wool Overcoat" className="w-full h-full object-cover" />
            <span className="absolute top-0 right-0 bg-[#ba1a1a] text-white text-[10px] font-bold px-2.5 py-1 rounded-bl-[4px] uppercase tracking-wider shadow-xs">
              Limited
            </span>
          </div>
          <div className="px-3.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-gray-900">Ecoluxe Studio</span>
              <span className="text-xs font-bold text-[#FF3F6C]">Save 70%</span>
            </div>
            <h4 className="text-xs text-[#4B5563] font-medium mb-3">Double-Faced Wool Overcoat</h4>
            <div className="mb-4">
              <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1.5">
                <span>Stock Allocation:</span>
                <span className="font-medium text-gray-700">88% Claimed (4 left)</span>
              </div>
              <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#FF3F6C] rounded-full" style={{ width: "88%" }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between p-3.5 pt-2 border-t border-[#f2eded]">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-sm font-bold text-gray-900">₹ 899</span>
            <span className="text-xs text-gray-400 line-through">₹ 2,999</span>
            <span className="text-[11px] font-bold text-[#FF3F6C]">(70% OFF)</span>
          </div>
          <Link href="/cart" className="px-3.5 py-1.5 bg-stone-900 text-white text-xs font-bold rounded-[4px] hover:bg-black transition-colors flex items-center gap-1">
            + Quick Add
          </Link>
        </div>
      </div>

      {/* Card 5 - Blurred Upcoming Product with Frosted Mirror Glass Countdown */}
      <div className="product-card bg-white rounded-[6px] border border-stone-200 overflow-hidden p-0 flex flex-col justify-between shadow-xs relative select-none group">
        {/* Blurred underlying product card matching other cards */}
        <div className="filter blur-[6px] opacity-60 pointer-events-none select-none flex flex-col justify-between h-full">
          <div>
            <div className="w-full aspect-[4/5] bg-stone-100 rounded-t-[5px] overflow-hidden relative mb-3">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuATKEJFfrZfwPr8oQ4E1-Vvymoy-wQkWdvK35GZskSQGECzX6lfZIgCRKeyyrXp8KBpOPHMF0lpPgcgfqzZuSMxqPVwuKxT_tzx5T4-7sKWZYuNQU-7amTvoSHbpLToCo3OsgY90NOzMtbgNPnv-6eSPteZGQD59z77f0quxYpTmRrB-aPirJ5ZgTJbYKtniorBum27Vx3sVqTdZrJTyE6pTsdOey6b__TocaDns58nsONvhhBQG-w"
                alt="Upcoming Secret Release"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-0 right-0 bg-[#FF3F6C] text-white text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider shadow-xs">
                Next Drop
              </span>
            </div>
            <div className="px-3.5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-gray-900">Maison Mystère</span>
                <span className="text-xs font-bold text-[#FF3F6C]">Save 75%</span>
              </div>
              <h4 className="text-xs text-[#4B5563] font-medium mb-3">Archival Luxury Edition</h4>
              <div className="mb-4">
                <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1.5">
                  <span>Stock Allocation:</span>
                  <span className="font-medium text-gray-700">Locked Allocation</span>
                </div>
                <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#FF3F6C] rounded-full" style={{ width: "95%" }}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3.5 pt-2 border-t border-[#f2eded]">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-bold text-gray-900">Rs. ???</span>
              <span className="text-xs text-gray-400 line-through">Rs. 3,999</span>
            </div>
            <div className="px-3.5 py-1.5 bg-stone-900 text-white text-xs font-bold rounded-lg">+ Quick Add</div>
          </div>
        </div>

        {/* Frosted Mirror Glass Countdown Overlay */}
        <div className="absolute inset-0 z-20 backdrop-blur-md bg-stone-950/70 sm:bg-stone-950/65 flex flex-col items-center justify-between p-4 sm:p-5 text-center border border-white/20 shadow-2xl rounded-[6px]">
          {/* Glass mirror sheen reflection */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none rounded-t-[5px]"></div>

          {/* Top Lock & Title */}
          <div className="relative z-10 pt-1 flex flex-col items-center">
            <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-stone-900/90 border border-stone-700/80 shadow-md flex items-center justify-center mb-2 text-[#FF3F6C]">
              <Lock className="w-4 h-4 text-[#FF3F6C]" />
            </div>
            <span className="bg-[#FF3F6C] text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-[3px] shadow-xs mb-1">
              NEXT DROP
            </span>
            <h4 className="text-white text-sm sm:text-base font-extrabold tracking-tight mt-0.5">
              Secret Item Unlocking
            </h4>
            <p className="text-stone-300 text-[10px] sm:text-[11px] font-medium">
              New style unlocks in this batch
            </p>
          </div>

          {/* Center Digital Clock Display */}
          <div className="relative z-10 my-auto py-2">
            <div className="flex items-center justify-center gap-1.5 font-mono">
              <div className="flex flex-col items-center">
                <div className="w-10 sm:w-11 h-9 sm:h-10 rounded-[4px] bg-stone-900/95 border border-stone-700 text-white font-extrabold text-sm sm:text-base flex items-center justify-center shadow-inner">
                  02h
                </div>
                <span className="text-[8px] font-sans text-stone-400 uppercase tracking-widest mt-1">HRS</span>
              </div>
              <span className="text-stone-400 font-bold text-sm mb-3">:</span>
              <div className="flex flex-col items-center">
                <div className="w-10 sm:w-11 h-9 sm:h-10 rounded-[4px] bg-stone-900/95 border border-stone-700 text-white font-extrabold text-sm sm:text-base flex items-center justify-center shadow-inner">
                  14m
                </div>
                <span className="text-[8px] font-sans text-stone-400 uppercase tracking-widest mt-1">MIN</span>
              </div>
              <span className="text-stone-400 font-bold text-sm mb-3">:</span>
              <div className="flex flex-col items-center">
                <div className="w-10 sm:w-11 h-9 sm:h-10 rounded-[4px] bg-[#FF3F6C] text-white font-black text-sm sm:text-base flex items-center justify-center shadow-md animate-pulse">
                  38s
                </div>
                <span className="text-[8px] font-sans text-stone-300 uppercase tracking-widest mt-1">SEC</span>
              </div>
            </div>
          </div>

          {/* Bottom Action Button */}
          <div className="relative z-10 w-full pb-1">
            <div className="flex items-center justify-between text-[11px] text-stone-300 mb-2 px-1">
              <span className="flex items-center gap-1 text-[10px] sm:text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#14CDA8] animate-ping"></span>
                Queue Active
              </span>
              <span className="text-amber-400 font-bold text-[10px] sm:text-[11px]">98% Booked</span>
            </div>
            <Link
              href="/category?drop=vault"
              className="w-full py-2 bg-white hover:bg-stone-100 text-stone-950 font-black text-xs uppercase tracking-wider rounded-[4px] transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-[#FF3F6C]" />
              <span>Queue Access</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
{/* END: 5. Mini Banner Strip */}
{/* BEGIN: 6. New Arrivals (Dual Row with Banners & Interactive Side Scroll) */}
<section data-purpose="new-arrivals" id="new-arrivals" className="w-full px-4 sm:px-6 lg:px-8 py-8">
  <div className="max-w-[1440px] mx-auto">
    
    {/* Section Top Header Title */}
    <div className="relative mb-6">
      <div className="text-center">
        <span className="text-[11px] font-bold text-[#FF3F6C] uppercase tracking-widest block mb-1">
          HOT OFF RUNWAY
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 text-center">
          New Arrivals
        </h2>
        <p className="text-xs text-[#4B5563] mt-0.5">
          High-velocity allocations &amp; bespoke tailoring ready for instant reserve
        </p>
      </div>
      <div className="sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2 flex items-center justify-center gap-3 shrink-0 mt-3 sm:mt-0">
        <span className="text-xs text-gray-500 font-medium hidden sm:inline-block">
          <span className="text-gray-900 font-bold">18</span> Ready to Ship
        </span>
        <Link
          href="/category?sort=new"
          className="text-xs font-bold text-[#FF3F6C] hover:underline flex items-center gap-1"
        >
          View All <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
        </Link>
      </div>
    </div>

    {/* ROW 1: 1st Item is Image Banner + Scroll Icon right after + Scrollable Products */}
    <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-5 mb-6">
      {/* 1st Row: 1st Item - Image Banner */}
      <div className="shrink-0 w-full sm:w-[235px] md:w-[245px] lg:w-[250px]">
        <div className="product-card overflow-hidden shadow-xs border border-stone-200 relative group flex flex-col justify-end p-4 sm:p-5 bg-stone-100 rounded-[6px] h-full">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwUy1fIOkDK6u2pWKdsiBXn8gjCsw5MhRYfssCccVA5SSIQeA6D4NOh-3Syt67FFtkYJVWr1A3AVmRp2orEY5W_4E2urr5Fv_r3sL3AGPuPRlO4AVwcIGgE3Xq2vPFdawQoQ-vi_BxZk-kOoAZTHTEcf-JfGa8LsaxwOgH2sDLh3n_Fo47w2ni6PZaBcSdaC2xP_vEcLG8Vxl5TpTLYZyLtS30Zb2dGVJ2c6Fy7g"
            alt="New Arrivals - Spring Collection"
            className="absolute inset-0 w-full h-full object-cover object-center z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent z-10 pointer-events-none"></div>
          <div className="relative z-20 w-full text-center">
            <span className="text-[#FF3F6C] text-[10px] font-black tracking-widest uppercase mb-1 block">SPRING 2026</span>
            <h3 className="text-lg sm:text-xl font-black text-white mb-1 tracking-tight">NEW ARRIVALS</h3>
            <p className="text-[11px] text-stone-200 font-medium mb-3">Explore the latest runway edit</p>
            <Link
              href="/category?sort=new"
              className="w-full py-2 bg-white hover:bg-stone-100 text-black font-bold text-xs tracking-wider transition-all uppercase flex items-center justify-center gap-1.5 shadow-md rounded-[4px]"
            >
              SHOP NOW <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Row 1 Products with Scroll Button right after 1st image */}
      <div className="relative flex-1 min-w-0 group/row1">
        {/* Scroll button backward */}
        <button
          type="button"
          aria-label="Scroll row 1 back"
          onClick={() => scrollNewArrivalsRow1(-320)}
          className="absolute -left-3.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 bg-white/95 hover:bg-white text-stone-800 hover:text-black border border-stone-200 shadow-md rounded-full flex items-center justify-center transition-all cursor-pointer opacity-90 sm:opacity-0 group-hover/row1:opacity-100 duration-200 hover:scale-105"
        >
          <ChevronLeft className="w-4 h-4 text-stone-800" />
        </button>

        {/* Scroll button forward */}
        <button
          type="button"
          aria-label="Scroll row 1 forward"
          onClick={() => scrollNewArrivalsRow1(320)}
          className="absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 bg-white/95 hover:bg-white text-stone-800 hover:text-black border border-stone-200 shadow-md rounded-full flex items-center justify-center transition-all cursor-pointer opacity-90 sm:opacity-0 group-hover/row1:opacity-100 duration-200 hover:scale-105"
        >
          <ChevronRight className="w-4 h-4 text-stone-800" />
        </button>

        {/* Horizontal Scrollable Rail for Row 1 Products */}
        <div
          id="new-arrivals-row1-scroll"
          className="flex items-stretch gap-4 lg:gap-5 overflow-x-auto scroll-smooth py-1 px-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden h-full"
        >
          {/* Product 1 */}
          <div className="product-card bg-white border border-stone-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden p-2.5 sm:p-3 flex flex-col justify-between rounded-[6px] shrink-0 w-[220px] sm:w-[235px] md:w-[245px] lg:w-[250px]">
            <div>
              <div className="w-full aspect-[3/4] relative mb-3.5 bg-stone-100 rounded-[4px] group">
                <HangTag text="Just In" />
                <div className="absolute right-2.5 -bottom-3.5 z-20 flex items-center gap-1.5">
                  <Link
                    href="/wishlist"
                    aria-label="Add to wishlist"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-[#c8002e] flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110 cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
                  </Link>
                  <Link
                    href="/cart"
                    aria-label="Add to cart"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-black flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
                  </Link>
                </div>
                <ProductHoverCarousel images={["https://lh3.googleusercontent.com/aida-public/AB6AXuCD6z8Kqjf7ii_WUQvGJidL9hrL3o5C-9iwWE6MmVp-mlotFPIF7VvYgFNgR80qheYR0CGOmn8ar5rzPRoOOHPc0vbocB7_kE3hDOzpHe90wvqQVqr2v__LpDHjJdQQmP4ZUJrqeGKbL96MIzP59-siIV23_o7e5aaHaF6qkXI5a6cHj3HJhEQxIqfA0H9lEXynjnunAKgCIc5yeGZVt_LtDAtUtYYHq4Wh5BfC7g", "https://lh3.googleusercontent.com/aida-public/AB6AXuDfAjn1pqNhyu6o0ODhdHAEvwGh_fhQUXGIWeDltdALENOlPxkgPhXUIJlZMCHREbSDq_kGcxVp1QnB4LnQZGaVQLcfbkGEPxRtCN4vc0MhL7fWFyvtBh2fqPomXW9ujKDWPFDROMOEw76eZnfxZJnrsT313-MGz9SgYxTpVHTzlK5GlseHV31jwxZseNN3zBQROVMo9trp08cn1kCL0hcxYg2fixoKFlADbMiHiQ", "https://lh3.googleusercontent.com/aida-public/AB6AXuAu4XcuS8foDakvyLzUR-KAY6KJ_IEV5zxNlp2Z0La2yKDPwKdh4xo2IDpVp9xjD6lwc4NlVf4_3_pkN9cx68_TwkFNoqPGPMLwnEmcAQFROiaj3Eao7PCQG5XQU7waD6qtYau1TeDL3SGsu7RCRSHie5BglSzxw3z97Egk17u-o9fn4QsfslXnDy0JX7_dIdNgaBUIMgtxx0zTtDRjiMjXJen_sO4MuhCj78bw5A"]} alt="Slim Fit Raw Denim" className="w-full h-full object-cover object-top" />
              </div>
              <div className="px-1">
                <h4 className="text-xs font-bold tracking-wider text-gray-900 uppercase block mb-0.5 font-sans">AJILE</h4>
                <p className="text-xs text-gray-500 truncate leading-snug mb-1 font-normal">Slim Fit Raw Denim Active</p>
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="font-bold text-gray-900 text-sm">₹ 899</span>
                  <span className="text-xs text-gray-400 line-through">₹ 2,799</span>
                  <span className="text-xs font-bold text-teal-600">68% OFF</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product 2 */}
          <div className="product-card bg-white border border-stone-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden p-2.5 sm:p-3 flex flex-col justify-between rounded-[6px] shrink-0 w-[220px] sm:w-[235px] md:w-[245px] lg:w-[250px]">
            <div>
              <div className="w-full aspect-[3/4] relative mb-3.5 bg-stone-100 rounded-[4px] group">
                <HangTag text="Just In" />
                <div className="absolute right-2.5 -bottom-3.5 z-20 flex items-center gap-1.5">
                  <Link
                    href="/wishlist"
                    aria-label="Add to wishlist"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-[#c8002e] flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110 cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
                  </Link>
                  <Link
                    href="/cart"
                    aria-label="Add to cart"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-black flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
                  </Link>
                </div>
                <ProductHoverCarousel images={["https://lh3.googleusercontent.com/aida-public/AB6AXuAu4XcuS8foDakvyLzUR-KAY6KJ_IEV5zxNlp2Z0La2yKDPwKdh4xo2IDpVp9xjD6lwc4NlVf4_3_pkN9cx68_TwkFNoqPGPMLwnEmcAQFROiaj3Eao7PCQG5XQU7waD6qtYau1TeDL3SGsu7RCRSHie5BglSzxw3z97Egk17u-o9fn4QsfslXnDy0JX7_dIdNgaBUIMgtxx0zTtDRjiMjXJen_sO4MuhCj78bw5A", "https://lh3.googleusercontent.com/aida-public/AB6AXuCD6z8Kqjf7ii_WUQvGJidL9hrL3o5C-9iwWE6MmVp-mlotFPIF7VvYgFNgR80qheYR0CGOmn8ar5rzPRoOOHPc0vbocB7_kE3hDOzpHe90wvqQVqr2v__LpDHjJdQQmP4ZUJrqeGKbL96MIzP59-siIV23_o7e5aaHaF6qkXI5a6cHj3HJhEQxIqfA0H9lEXynjnunAKgCIc5yeGZVt_LtDAtUtYYHq4Wh5BfC7g", "https://lh3.googleusercontent.com/aida-public/AB6AXuDfAjn1pqNhyu6o0ODhdHAEvwGh_fhQUXGIWeDltdALENOlPxkgPhXUIJlZMCHREbSDq_kGcxVp1QnB4LnQZGaVQLcfbkGEPxRtCN4vc0MhL7fWFyvtBh2fqPomXW9ujKDWPFDROMOEw76eZnfxZJnrsT313-MGz9SgYxTpVHTzlK5GlseHV31jwxZseNN3zBQROVMo9trp08cn1kCL0hcxYg2fixoKFlADbMiHiQ"]} alt="Tailored Relaxed Trousers" className="w-full h-full object-cover object-top" />
              </div>
              <div className="px-1">
                <h4 className="text-xs font-bold tracking-wider text-gray-900 uppercase block mb-0.5 font-sans">AJILE</h4>
                <p className="text-xs text-gray-500 truncate leading-snug mb-1 font-normal">Tailored Relaxed Trousers</p>
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="font-bold text-gray-900 text-sm">₹ 1,199</span>
                  <span className="text-xs text-gray-400 line-through">₹ 3,499</span>
                  <span className="text-xs font-bold text-teal-600">65% OFF</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product 3 */}
          <div className="product-card bg-white border border-stone-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden p-2.5 sm:p-3 flex flex-col justify-between rounded-[6px] shrink-0 w-[220px] sm:w-[235px] md:w-[245px] lg:w-[250px]">
            <div>
              <div className="w-full aspect-[3/4] relative mb-3.5 bg-stone-100 rounded-[4px] group">
                <HangTag text="Just In" />
                <div className="absolute right-2.5 -bottom-3.5 z-20 flex items-center gap-1.5">
                  <Link
                    href="/wishlist"
                    aria-label="Add to wishlist"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-[#c8002e] flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110 cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
                  </Link>
                  <Link
                    href="/cart"
                    aria-label="Add to cart"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-black flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
                  </Link>
                </div>
                <ProductHoverCarousel images={["https://lh3.googleusercontent.com/aida-public/AB6AXuDfAjn1pqNhyu6o0ODhdHAEvwGh_fhQUXGIWeDltdALENOlPxkgPhXUIJlZMCHREbSDq_kGcxVp1QnB4LnQZGaVQLcfbkGEPxRtCN4vc0MhL7fWFyvtBh2fqPomXW9ujKDWPFDROMOEw76eZnfxZJnrsT313-MGz9SgYxTpVHTzlK5GlseHV31jwxZseNN3zBQROVMo9trp08cn1kCL0hcxYg2fixoKFlADbMiHiQ", "https://lh3.googleusercontent.com/aida-public/AB6AXuCD6z8Kqjf7ii_WUQvGJidL9hrL3o5C-9iwWE6MmVp-mlotFPIF7VvYgFNgR80qheYR0CGOmn8ar5rzPRoOOHPc0vbocB7_kE3hDOzpHe90wvqQVqr2v__LpDHjJdQQmP4ZUJrqeGKbL96MIzP59-siIV23_o7e5aaHaF6qkXI5a6cHj3HJhEQxIqfA0H9lEXynjnunAKgCIc5yeGZVt_LtDAtUtYYHq4Wh5BfC7g", "https://lh3.googleusercontent.com/aida-public/AB6AXuBEZWg_Qcw-XrvHDafNBvoqtwZzN9Zj2Axao8bXj_8oykAGO9lUo6LwB_F2Rgs-q9lfYrzwqI1ip_c87XMcTqh98ls2Y1zaHXvLke94RFLLrym5vwqfntMB0bExAZCFXW4hJY0wZHxgXXiOy_MhOrMjUmdtHXJxyiW01veWxVyVBD2yrQj1o4098-Q3D2onxbiD2giCuBI5o2tak50C1zZhefvNekUmZOVOweCs_Q"]} alt="Dark Classic Jean" className="w-full h-full object-cover object-top" />
              </div>
              <div className="px-1">
                <h4 className="text-xs font-bold tracking-wider text-gray-900 uppercase block mb-0.5 font-sans">PETER ENGLAND</h4>
                <p className="text-xs text-gray-500 truncate leading-snug mb-1 font-normal">Dark Classic Jean Regular</p>
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="font-bold text-gray-900 text-sm">₹ 999</span>
                  <span className="text-xs text-gray-400 line-through">₹ 2,999</span>
                  <span className="text-xs font-bold text-teal-600">66% OFF</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product 4 */}
          <div className="product-card bg-white border border-stone-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden p-2.5 sm:p-3 flex flex-col justify-between rounded-[6px] shrink-0 w-[220px] sm:w-[235px] md:w-[245px] lg:w-[250px]">
            <div>
              <div className="w-full aspect-[3/4] relative mb-3.5 bg-stone-100 rounded-[4px] group">
                <HangTag text="Just In" />
                <div className="absolute right-2.5 -bottom-3.5 z-20 flex items-center gap-1.5">
                  <Link
                    href="/wishlist"
                    aria-label="Add to wishlist"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-[#c8002e] flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110 cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
                  </Link>
                  <Link
                    href="/cart"
                    aria-label="Add to cart"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-black flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
                  </Link>
                </div>
                <ProductHoverCarousel images={["https://lh3.googleusercontent.com/aida-public/AB6AXuBEZWg_Qcw-XrvHDafNBvoqtwZzN9Zj2Axao8bXj_8oykAGO9lUo6LwB_F2Rgs-q9lfYrzwqI1ip_c87XMcTqh98ls2Y1zaHXvLke94RFLLrym5vwqfntMB0bExAZCFXW4hJY0wZHxgXXiOy_MhOrMjUmdtHXJxyiW01veWxVyVBD2yrQj1o4098-Q3D2onxbiD2giCuBI5o2tak50C1zZhefvNekUmZOVOweCs_Q", "https://lh3.googleusercontent.com/aida-public/AB6AXuAu4XcuS8foDakvyLzUR-KAY6KJ_IEV5zxNlp2Z0La2yKDPwKdh4xo2IDpVp9xjD6lwc4NlVf4_3_pkN9cx68_TwkFNoqPGPMLwnEmcAQFROiaj3Eao7PCQG5XQU7waD6qtYau1TeDL3SGsu7RCRSHie5BglSzxw3z97Egk17u-o9fn4QsfslXnDy0JX7_dIdNgaBUIMgtxx0zTtDRjiMjXJen_sO4MuhCj78bw5A", "https://lh3.googleusercontent.com/aida-public/AB6AXuCD6z8Kqjf7ii_WUQvGJidL9hrL3o5C-9iwWE6MmVp-mlotFPIF7VvYgFNgR80qheYR0CGOmn8ar5rzPRoOOHPc0vbocB7_kE3hDOzpHe90wvqQVqr2v__LpDHjJdQQmP4ZUJrqeGKbL96MIzP59-siIV23_o7e5aaHaF6qkXI5a6cHj3HJhEQxIqfA0H9lEXynjnunAKgCIc5yeGZVt_LtDAtUtYYHq4Wh5BfC7g"]} alt="Tapered Slim Pants" className="w-full h-full object-cover object-top" />
              </div>
              <div className="px-1">
                <h4 className="text-xs font-bold tracking-wider text-gray-900 uppercase block mb-0.5 font-sans">AJILE</h4>
                <p className="text-xs text-gray-500 truncate leading-snug mb-1 font-normal">Tapered Slim Cotton Pants</p>
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="font-bold text-gray-900 text-sm">₹ 849</span>
                  <span className="text-xs text-gray-400 line-through">₹ 2,499</span>
                  <span className="text-xs font-bold text-teal-600">66% OFF</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product 5 (Scrollable extra) */}
          <div className="product-card bg-white border border-stone-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden p-2.5 sm:p-3 flex flex-col justify-between rounded-[6px] shrink-0 w-[220px] sm:w-[235px] md:w-[245px] lg:w-[250px]">
            <div>
              <div className="w-full aspect-[3/4] relative mb-3.5 bg-stone-100 rounded-[4px] group">
                <HangTag text="Just In" />
                <div className="absolute right-2.5 -bottom-3.5 z-20 flex items-center gap-1.5">
                  <Link
                    href="/wishlist"
                    aria-label="Add to wishlist"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-[#c8002e] flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110 cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
                  </Link>
                  <Link
                    href="/cart"
                    aria-label="Add to cart"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-black flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
                  </Link>
                </div>
                <ProductHoverCarousel images={["https://lh3.googleusercontent.com/aida-public/AB6AXuB99dwpq68H6bPiciXwJbg8dmsBb9ckLz9C6gof-cbpXjktk_ZioLvspE-f_DhDqo5jJLokmnuLqNM8FJet_N9X7ZhNRjKbsKQIqQ0GiKX52EgCEj28YmrHy09vwwKkMgZQbgO2KiriXB7eoPCWzSyiHsK7RuMcHc2e_6-_G7eHrjJ1t0ptI_5EL6TXR4_ViYzxwsxsSh1iKyKhH7DxZScFtJfPB_dE1oZCBJ7xHA", "https://lh3.googleusercontent.com/aida-public/AB6AXuCD6z8Kqjf7ii_WUQvGJidL9hrL3o5C-9iwWE6MmVp-mlotFPIF7VvYgFNgR80qheYR0CGOmn8ar5rzPRoOOHPc0vbocB7_kE3hDOzpHe90wvqQVqr2v__LpDHjJdQQmP4ZUJrqeGKbL96MIzP59-siIV23_o7e5aaHaF6qkXI5a6cHj3HJhEQxIqfA0H9lEXynjnunAKgCIc5yeGZVt_LtDAtUtYYHq4Wh5BfC7g", "https://lh3.googleusercontent.com/aida-public/AB6AXuDfAjn1pqNhyu6o0ODhdHAEvwGh_fhQUXGIWeDltdALENOlPxkgPhXUIJlZMCHREbSDq_kGcxVp1QnB4LnQZGaVQLcfbkGEPxRtCN4vc0MhL7fWFyvtBh2fqPomXW9ujKDWPFDROMOEw76eZnfxZJnrsT313-MGz9SgYxTpVHTzlK5GlseHV31jwxZseNN3zBQROVMo9trp08cn1kCL0hcxYg2fixoKFlADbMiHiQ"]} alt="Selvedge Raw Indigo" className="w-full h-full object-cover object-top" />
              </div>
              <div className="px-1">
                <h4 className="text-xs font-bold tracking-wider text-gray-900 uppercase block mb-0.5 font-sans">PETER ENGLAND</h4>
                <p className="text-xs text-gray-500 truncate leading-snug mb-1 font-normal">Signature Raw Indigo Selvedge</p>
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="font-bold text-gray-900 text-sm">₹ 1,399</span>
                  <span className="text-xs text-gray-400 line-through">₹ 4,199</span>
                  <span className="text-xs font-bold text-teal-600">67% OFF</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* ROW 2: Scrollable Products + Scroll Icon right before + Last Item is Image Banner */}
    <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-5">
      {/* Row 2 Products with Scroll Button right before last image */}
      <div className="relative flex-1 min-w-0 group/row2 order-2 lg:order-1">
        {/* Scroll button backward */}
        <button
          type="button"
          aria-label="Scroll row 2 left"
          onClick={() => scrollNewArrivalsRow2(-320)}
          className="absolute -left-3.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 bg-white/95 hover:bg-white text-stone-800 hover:text-black border border-stone-200 shadow-md rounded-full flex items-center justify-center transition-all cursor-pointer opacity-90 sm:opacity-0 group-hover/row2:opacity-100 duration-200 hover:scale-105"
        >
          <ChevronLeft className="w-4 h-4 text-stone-800" />
        </button>

        {/* Scroll button right before last image banner */}
        <button
          type="button"
          aria-label="Scroll row 2 right"
          onClick={() => scrollNewArrivalsRow2(320)}
          className="absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 bg-white/95 hover:bg-white text-stone-800 hover:text-black border border-stone-200 shadow-md rounded-full flex items-center justify-center transition-all cursor-pointer opacity-90 sm:opacity-0 group-hover/row2:opacity-100 duration-200 hover:scale-105"
        >
          <ChevronRight className="w-4 h-4 text-stone-800" />
        </button>

        {/* Horizontal Scrollable Rail for Row 2 Products */}
        <div
          id="new-arrivals-row2-scroll"
          className="flex items-stretch gap-4 lg:gap-5 overflow-x-auto scroll-smooth py-1 px-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden h-full"
        >
          {/* Product 5 */}
          <div className="product-card bg-white border border-stone-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden p-2.5 sm:p-3 flex flex-col justify-between rounded-[6px] shrink-0 w-[220px] sm:w-[235px] md:w-[245px] lg:w-[250px]">
            <div>
              <div className="w-full aspect-[3/4] relative mb-3.5 bg-stone-100 rounded-[4px] group">
                <HangTag text="Just In" />
                <div className="absolute right-2.5 -bottom-3.5 z-20 flex items-center gap-1.5">
                  <Link
                    href="/wishlist"
                    aria-label="Add to wishlist"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-[#c8002e] flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110 cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
                  </Link>
                  <Link
                    href="/cart"
                    aria-label="Add to cart"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-black flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
                  </Link>
                </div>
                <ProductHoverCarousel images={["https://lh3.googleusercontent.com/aida-public/AB6AXuB99dwpq68H6bPiciXwJbg8dmsBb9ckLz9C6gof-cbpXjktk_ZioLvspE-f_DhDqo5jJLokmnuLqNM8FJet_N9X7ZhNRjKbsKQIqQ0GiKX52EgCEj28YmrHy09vwwKkMgZQbgO2KiriXB7eoPCWzSyiHsK7RuMcHc2e_6-_G7eHrjJ1t0ptI_5EL6TXR4_ViYzxwsxsSh1iKyKhH7DxZScFtJfPB_dE1oZCBJ7xHA", "https://lh3.googleusercontent.com/aida-public/AB6AXuBEZWg_Qcw-XrvHDafNBvoqtwZzN9Zj2Axao8bXj_8oykAGO9lUo6LwB_F2Rgs-q9lfYrzwqI1ip_c87XMcTqh98ls2Y1zaHXvLke94RFLLrym5vwqfntMB0bExAZCFXW4hJY0wZHxgXXiOy_MhOrMjUmdtHXJxyiW01veWxVyVBD2yrQj1o4098-Q3D2onxbiD2giCuBI5o2tak50C1zZhefvNekUmZOVOweCs_Q", "https://lh3.googleusercontent.com/aida-public/AB6AXuCD6z8Kqjf7ii_WUQvGJidL9hrL3o5C-9iwWE6MmVp-mlotFPIF7VvYgFNgR80qheYR0CGOmn8ar5rzPRoOOHPc0vbocB7_kE3hDOzpHe90wvqQVqr2v__LpDHjJdQQmP4ZUJrqeGKbL96MIzP59-siIV23_o7e5aaHaF6qkXI5a6cHj3HJhEQxIqfA0H9lEXynjnunAKgCIc5yeGZVt_LtDAtUtYYHq4Wh5BfC7g"]} alt="Cotton Blend Denim" className="w-full h-full object-cover object-top" />
              </div>
              <div className="px-1">
                <h4 className="text-xs font-bold tracking-wider text-gray-900 uppercase block mb-0.5 font-sans">AKKRITI</h4>
                <p className="text-xs text-gray-500 truncate leading-snug mb-1 font-normal">Cotton Blend Flared Denim</p>
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="font-bold text-gray-900 text-sm">₹ 1,299</span>
                  <span className="text-xs text-gray-400 line-through">₹ 3,899</span>
                  <span className="text-xs font-bold text-teal-600">67% OFF</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product 6 */}
          <div className="product-card bg-white border border-stone-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden p-2.5 sm:p-3 flex flex-col justify-between rounded-[6px] shrink-0 w-[220px] sm:w-[235px] md:w-[245px] lg:w-[250px]">
            <div>
              <div className="w-full aspect-[3/4] relative mb-3.5 bg-stone-100 rounded-[4px] group">
                <HangTag text="Just In" />
                <div className="absolute right-2.5 -bottom-3.5 z-20 flex items-center gap-1.5">
                  <Link
                    href="/wishlist"
                    aria-label="Add to wishlist"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-[#c8002e] flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110 cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
                  </Link>
                  <Link
                    href="/cart"
                    aria-label="Add to cart"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-black flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
                  </Link>
                </div>
                <ProductHoverCarousel images={["https://lh3.googleusercontent.com/aida-public/AB6AXuAki53rTZlrseBrx8szPpZ17MzEKGS4QE1_Nh1rBnQyqlGXmgekfusA8Aiv1fJxmeKuIEzpy_DGSSRMMsdFzQlDwkyhTngYvxsYpRfg0cu_BrWQdPiz4EyzaxfXn17Ul9LMjbPR1BNe7XDhwdplEzr97gjrvMOn8luAOSYKbjHIPmrMOqDjsSr5SHl7hBzFdWPGQhWNignCeaKygD4zGuokLXChn3G35EY2mM6Mjg", "https://lh3.googleusercontent.com/aida-public/AB6AXuBEZWg_Qcw-XrvHDafNBvoqtwZzN9Zj2Axao8bXj_8oykAGO9lUo6LwB_F2Rgs-q9lfYrzwqI1ip_c87XMcTqh98ls2Y1zaHXvLke94RFLLrym5vwqfntMB0bExAZCFXW4hJY0wZHxgXXiOy_MhOrMjUmdtHXJxyiW01veWxVyVBD2yrQj1o4098-Q3D2onxbiD2giCuBI5o2tak50C1zZhefvNekUmZOVOweCs_Q", "https://lh3.googleusercontent.com/aida-public/AB6AXuCD6z8Kqjf7ii_WUQvGJidL9hrL3o5C-9iwWE6MmVp-mlotFPIF7VvYgFNgR80qheYR0CGOmn8ar5rzPRoOOHPc0vbocB7_kE3hDOzpHe90wvqQVqr2v__LpDHjJdQQmP4ZUJrqeGKbL96MIzP59-siIV23_o7e5aaHaF6qkXI5a6cHj3HJhEQxIqfA0H9lEXynjnunAKgCIc5yeGZVt_LtDAtUtYYHq4Wh5BfC7g"]} alt="Pleated Straight Trouser" className="w-full h-full object-cover object-top" />
              </div>
              <div className="px-1">
                <h4 className="text-xs font-bold tracking-wider text-gray-900 uppercase block mb-0.5 font-sans">RANGMANCH</h4>
                <p className="text-xs text-gray-500 truncate leading-snug mb-1 font-normal">Pleated Straight Trouser</p>
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="font-bold text-gray-900 text-sm">₹ 1,049</span>
                  <span className="text-xs text-gray-400 line-through">₹ 3,199</span>
                  <span className="text-xs font-bold text-teal-600">67% OFF</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product 7 */}
          <div className="product-card bg-white border border-stone-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden p-2.5 sm:p-3 flex flex-col justify-between rounded-[6px] shrink-0 w-[220px] sm:w-[235px] md:w-[245px] lg:w-[250px]">
            <div>
              <div className="w-full aspect-[3/4] relative mb-3.5 bg-stone-100 rounded-[4px] group">
                <HangTag text="Just In" />
                <div className="absolute right-2.5 -bottom-3.5 z-20 flex items-center gap-1.5">
                  <Link
                    href="/wishlist"
                    aria-label="Add to wishlist"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-[#c8002e] flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110 cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
                  </Link>
                  <Link
                    href="/cart"
                    aria-label="Add to cart"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-black flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
                  </Link>
                </div>
                <ProductHoverCarousel images={["https://lh3.googleusercontent.com/aida-public/AB6AXuB99dwpq68H6bPiciXwJbg8dmsBb9ckLz9C6gof-cbpXjktk_ZioLvspE-f_DhDqo5jJLokmnuLqNM8FJet_N9X7ZhNRjKbsKQIqQ0GiKX52EgCEj28YmrHy09vwwKkMgZQbgO2KiriXB7eoPCWzSyiHsK7RuMcHc2e_6-_G7eHrjJ1t0ptI_5EL6TXR4_ViYzxwsxsSh1iKyKhH7DxZScFtJfPB_dE1oZCBJ7xHA", "https://lh3.googleusercontent.com/aida-public/AB6AXuDfAjn1pqNhyu6o0ODhdHAEvwGh_fhQUXGIWeDltdALENOlPxkgPhXUIJlZMCHREbSDq_kGcxVp1QnB4LnQZGaVQLcfbkGEPxRtCN4vc0MhL7fWFyvtBh2fqPomXW9ujKDWPFDROMOEw76eZnfxZJnrsT313-MGz9SgYxTpVHTzlK5GlseHV31jwxZseNN3zBQROVMo9trp08cn1kCL0hcxYg2fixoKFlADbMiHiQ", "https://lh3.googleusercontent.com/aida-public/AB6AXuCD6z8Kqjf7ii_WUQvGJidL9hrL3o5C-9iwWE6MmVp-mlotFPIF7VvYgFNgR80qheYR0CGOmn8ar5rzPRoOOHPc0vbocB7_kE3hDOzpHe90wvqQVqr2v__LpDHjJdQQmP4ZUJrqeGKbL96MIzP59-siIV23_o7e5aaHaF6qkXI5a6cHj3HJhEQxIqfA0H9lEXynjnunAKgCIc5yeGZVt_LtDAtUtYYHq4Wh5BfC7g"]} alt="Classic Straight Denim" className="w-full h-full object-cover object-top" />
              </div>
              <div className="px-1">
                <h4 className="text-xs font-bold tracking-wider text-gray-900 uppercase block mb-0.5 font-sans">AKKRITI</h4>
                <p className="text-xs text-gray-500 truncate leading-snug mb-1 font-normal">Classic Tailored Pant</p>
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="font-bold text-gray-900 text-sm">₹ 1,399</span>
                  <span className="text-xs text-gray-400 line-through">₹ 4,199</span>
                  <span className="text-xs font-bold text-teal-600">67% OFF</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product 8 */}
          <div className="product-card bg-white border border-stone-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden p-2.5 sm:p-3 flex flex-col justify-between rounded-[6px] shrink-0 w-[220px] sm:w-[235px] md:w-[245px] lg:w-[250px]">
            <div>
              <div className="w-full aspect-[3/4] relative mb-3.5 bg-stone-100 rounded-[4px] group">
                <HangTag text="Just In" />
                <div className="absolute right-2.5 -bottom-3.5 z-20 flex items-center gap-1.5">
                  <Link
                    href="/wishlist"
                    aria-label="Add to wishlist"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-[#c8002e] flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110 cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
                  </Link>
                  <Link
                    href="/cart"
                    aria-label="Add to cart"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-black flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
                  </Link>
                </div>
                <ProductHoverCarousel images={["https://lh3.googleusercontent.com/aida-public/AB6AXuCCD0ZB9JFLfkzvFC68HvU8tXMqxzQsEkoRqjazTITeT1DcEDQ80wWupTO3XfStG7IAjZ3iyUzRdgAIAdnXT8z4IVfwR2-b2ugtXZSMmjEt3fuypKDYjOAFXd62wgU25ruMRBDkmKKPQ5BLIWbxIptf5ujcXOO13QsUyeTUgMDumEEhXWUi7InCFL3WFeboEcp4Ulw96ADWD61vGMF6883nrAM1QozFBHOYJ261-Q", "https://lh3.googleusercontent.com/aida-public/AB6AXuDfAjn1pqNhyu6o0ODhdHAEvwGh_fhQUXGIWeDltdALENOlPxkgPhXUIJlZMCHREbSDq_kGcxVp1QnB4LnQZGaVQLcfbkGEPxRtCN4vc0MhL7fWFyvtBh2fqPomXW9ujKDWPFDROMOEw76eZnfxZJnrsT313-MGz9SgYxTpVHTzlK5GlseHV31jwxZseNN3zBQROVMo9trp08cn1kCL0hcxYg2fixoKFlADbMiHiQ", "https://lh3.googleusercontent.com/aida-public/AB6AXuCD6z8Kqjf7ii_WUQvGJidL9hrL3o5C-9iwWE6MmVp-mlotFPIF7VvYgFNgR80qheYR0CGOmn8ar5rzPRoOOHPc0vbocB7_kE3hDOzpHe90wvqQVqr2v__LpDHjJdQQmP4ZUJrqeGKbL96MIzP59-siIV23_o7e5aaHaF6qkXI5a6cHj3HJhEQxIqfA0H9lEXynjnunAKgCIc5yeGZVt_LtDAtUtYYHq4Wh5BfC7g"]} alt="Minimalist Chino Pant" className="w-full h-full object-cover object-top" />
              </div>
              <div className="px-1">
                <h4 className="text-xs font-bold tracking-wider text-gray-900 uppercase block mb-0.5 font-sans">RANGMANCH</h4>
                <p className="text-xs text-gray-500 truncate leading-snug mb-1 font-normal">Minimalist Chino Pant</p>
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="font-bold text-gray-900 text-sm">₹ 799</span>
                  <span className="text-xs text-gray-400 line-through">₹ 2,399</span>
                  <span className="text-xs font-bold text-teal-600">66% OFF</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2nd Row: Last Item - Image Banner matching 1st row's 1st image banner */}
      <div className="shrink-0 w-full sm:w-[235px] md:w-[245px] lg:w-[250px] order-1 lg:order-2">
        <div className="product-card overflow-hidden shadow-xs border border-stone-200 relative group flex flex-col justify-end p-4 sm:p-5 bg-stone-100 rounded-[6px] h-full">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEQlYMkmLBIe16HU-eGR-1Aq8hZD44GrBJaLxqyY587yC6ey9XJ4GtZvJLZwoCZZCytbi4eNQVHJB8mKZtaCS6q1oko2JCUtGgGbOONx_Tg2mRurzJPkPDvMwuDIFyWIM7p0UqLs6CK4F0QWT3PZXNVX7-UQF0Ilo4O4zwcZqEKPkWRvFP7NOOIo0ebj5zYamR4ikxk5SIJ7EPr0q-GtmnYmG-I7__q9Af7lwWFg"
            alt="Autumn Outerwear Capsule"
            className="absolute inset-0 w-full h-full object-cover object-center z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent z-10 pointer-events-none"></div>
          <div className="relative z-20 w-full text-center">
            <span className="text-[#FF3F6C] text-[10px] font-black tracking-widest uppercase mb-1 block">CURATION CORE</span>
            <h3 className="text-lg sm:text-xl font-black text-white mb-1 tracking-tight">OUTERWEAR EDIT</h3>
            <p className="text-[11px] text-stone-200 font-medium mb-3">Double-faced wool &amp; tech layer</p>
            <Link
              href="/category?curation=vip"
              className="w-full py-2 bg-white hover:bg-stone-100 text-black font-bold text-xs tracking-wider transition-all uppercase flex items-center justify-center gap-1.5 shadow-md rounded-[4px]"
            >
              SHOP NOW <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>
{/* END: 6. New Arrivals */}
{/* BEGIN: 7. TOP RANKING */}
<section className="bg-white p-6 sm:p-8 border border-[#e5e7eb] shadow-sm" data-purpose="top-ranking" style={{ backgroundColor: "#f5f5f5" }}>
<div className="relative mb-6">
  <div className="text-center">
    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 text-center">Top Ranking</h2>
    <p className="text-xs text-[#4B5563] mt-0.5">Best ranked couture &amp; viral essentials this week</p>
  </div>
  <div className="sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2 flex items-center justify-center mt-3 sm:mt-0">
    <Link className="text-xs font-bold text-[#1ea768] hover:underline" href="/category?sort=ranking" style={{ color: "#FF3F6C" }}>Full Leaderboard <i className="fa-solid fa-arrow-right text-[10px] ml-0.5"></i></Link>
  </div>
</div>
{/* 2 Promotional Banners within TOP RANKING */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
  {/* Banner 1: Special Deal Banner */}
  <Link
    href="/category?deal=top"
    className="group relative rounded-[6px] overflow-hidden shadow-xs block w-full aspect-[21/9] sm:aspect-[24/9] md:h-[200px] lg:h-[230px] bg-stone-100 border border-stone-200"
  >
    <img
      src="/banners/hero-banner-4.jpg"
      alt="Special Deal Banner"
      className="w-full h-full object-cover"
    />
  </Link>

  {/* Banner 2: Exclusive Sale Banner */}
  <Link
    href="/category?sale=crypto"
    className="group relative rounded-[6px] overflow-hidden shadow-xs block w-full aspect-[21/9] sm:aspect-[24/9] md:h-[200px] lg:h-[230px] bg-stone-900 border border-stone-800"
  >
    <img
      src="/banners/hero-banner-5.jpg"
      alt="Exclusive Sale Banner"
      className="w-full h-full object-cover"
    />
  </Link>
</div>
{/* Row of Ranked Product Cards underneath */}
<div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-stone-200 mt-8 bg-[#F5F5F5]" style={{ backgroundColor: "#F5F5F5" }}>
  <div className="flex items-center justify-center relative mb-8">
    <div className="w-full border-t border-stone-300 absolute inset-x-0"></div>
    <h3 className="relative px-8 text-xl sm:text-2xl font-bold tracking-tight text-gray-950 font-sans bg-[#F5F5F5]">
      Brands You Love
    </h3>
  </div>

  <div className="relative group/brandcarousel w-full">
    {/* Floating Left Navigation Arrow */}
    <button
      type="button"
      aria-label="Previous Brand"
      onClick={() => scrollBrands(-420)}
      className="absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 z-20 w-8 sm:w-10 h-12 sm:h-14 bg-white/95 hover:bg-white text-stone-700 hover:text-black border border-stone-200 shadow-md rounded-r-lg flex items-center justify-center transition-all cursor-pointer opacity-80 sm:opacity-0 group-hover/brandcarousel:opacity-100 duration-200"
    >
      <ChevronLeft className="w-5 h-5 text-stone-700" />
    </button>

    {/* Floating Right Navigation Arrow */}
    <button
      type="button"
      aria-label="Next Brand"
      onClick={() => scrollBrands(420)}
      className="absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 z-20 w-8 sm:w-10 h-12 sm:h-14 bg-white/95 hover:bg-white text-stone-700 hover:text-black border border-stone-200 shadow-md rounded-l-lg flex items-center justify-center transition-all cursor-pointer opacity-80 sm:opacity-0 group-hover/brandcarousel:opacity-100 duration-200"
    >
      <ChevronRight className="w-5 h-5 text-stone-700" />
    </button>

    {/* Scrollable Container with Shorter Height (aspect-[16/10] matching reference) */}
    <div
      id="brands-you-love-scroll"
      className="flex items-stretch gap-5 sm:gap-6 overflow-x-auto scroll-smooth py-1 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      {/* 1. Rangmanch */}
      <Link
        href="/category?brand=rangmanch"
        className="group relative aspect-[16/10] sm:aspect-[16/10] md:aspect-[4/3] bg-stone-100 overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all rounded-[6px] shrink-0 w-[280px] sm:w-[340px] md:w-[380px] lg:w-[calc((100%-2*1.5rem)/3)] block"
      >
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuATKEJFfrZfwPr8oQ4E1-Vvymoy-wQkWdvK35GZskSQGECzX6lfZIgCRKeyyrXp8KBpOPHMF0lpPgcgfqzZuSMxqPVwuKxT_tzx5T4-7sKWZYuNQU-7amTvoSHbpLToCo3OsgY90NOzMtbgNPnv-6eSPteZGQD59z77f0quxYpTmRrB-aPirJ5ZgTJbYKtniorBum27Vx3sVqTdZrJTyE6pTsdOey6b__TocaDns58nsONvhhBQG-w"
          alt="Rangmanch Collection"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-6 inset-x-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <span className="text-white font-serif tracking-[0.25em] text-2xl sm:text-3xl font-normal drop-shadow-md uppercase">
            RANGMANCH
          </span>
        </div>
      </Link>

      {/* 2. Spykar */}
      <Link
        href="/category?brand=spykar"
        className="group relative aspect-[16/10] sm:aspect-[16/10] md:aspect-[4/3] bg-stone-100 overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all rounded-[6px] shrink-0 w-[280px] sm:w-[340px] md:w-[380px] lg:w-[calc((100%-2*1.5rem)/3)] block"
      >
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwUy1fIOkDK6u2pWKdsiBXn8gjCsw5MhRYfssCccVA5SSIQeA6D4NOh-3Syt67FFtkYJVWr1A3AVmRp2orEY5W_4E2urr5Fv_r3sL3AGPuPRlO4AVwcIGgE3Xq2vPFdawQoQ-vi_BxZk-kOoAZTHTEcf-JfGa8LsaxwOgH2sDLh3n_Fo47w2ni6PZaBcSdaC2xP_vEcLG8Vxl5TpTLYZyLtS30Zb2dGVJ2c6Fy7g"
          alt="Spykar Young & Restless"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-6 inset-x-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <div className="flex items-center gap-1.5 justify-center">
            <span className="text-white font-sans font-black tracking-tight text-2xl sm:text-3xl lowercase drop-shadow-md">
              spykar
            </span>
            <span className="bg-[#FF3F6C] text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow-xs">
              2
            </span>
          </div>
          <span className="text-white/90 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase mt-1">
            YOUNG &amp; RESTLESS
          </span>
        </div>
      </Link>

      {/* 3. SF Jeans Co */}
      <Link
        href="/category?brand=sfjeans"
        className="group relative aspect-[16/10] sm:aspect-[16/10] md:aspect-[4/3] bg-stone-100 overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all rounded-[6px] shrink-0 w-[280px] sm:w-[340px] md:w-[380px] lg:w-[calc((100%-2*1.5rem)/3)] block"
      >
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCD0ZB9JFLfkzvFC68HvU8tXMqxzQsEkoRqjazTITeT1DcEDQ80wWupTO3XfStG7IAjZ3iyUzRdgAIAdnXT8z4IVfwR2-b2ugtXZSMmjEt3fuypKDYjOAFXd62wgU25ruMRBDkmKKPQ5BLIWbxIptf5ujcXOO13QsUyeTUgMDumEEhXWUi7InCFL3WFeboEcp4Ulw96ADWD61vGMF6883nrAM1QozFBHOYJ261-Q"
          alt="SF Jeans Co"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-6 inset-x-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <span className="text-white font-sans font-black tracking-[0.3em] text-xl sm:text-2xl drop-shadow-md uppercase">
            SF JEANS CO
          </span>
        </div>
      </Link>

      {/* 4. Peter England */}
      <Link
        href="/category?brand=peter-england"
        className="group relative aspect-[16/10] sm:aspect-[16/10] md:aspect-[4/3] bg-stone-100 overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all rounded-[6px] shrink-0 w-[280px] sm:w-[340px] md:w-[380px] lg:w-[calc((100%-2*1.5rem)/3)] block"
      >
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCD6z8Kqjf7ii_WUQvGJidL9hrL3o5C-9iwWE6MmVp-mlotFPIF7VvYgFNgR80qheYR0CGOmn8ar5rzPRoOOHPc0vbocB7_kE3hDOzpHe90wvqQVqr2v__LpDHjJdQQmP4ZUJrqeGKbL96MIzP59-siIV23_o7e5aaHaF6qkXI5a6cHj3HJhEQxIqfA0H9lEXynjnunAKgCIc5yeGZVt_LtDAtUtYYHq4Wh5BfC7g"
          alt="Peter England"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-6 inset-x-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <span className="text-white font-serif tracking-[0.25em] text-xl sm:text-2xl font-bold drop-shadow-md uppercase">
            PETER ENGLAND
          </span>
          <span className="text-white/80 text-[10px] font-bold tracking-[0.2em] uppercase mt-1">
            HERITAGE TAILORING
          </span>
        </div>
      </Link>

      {/* 5. Aura Studio */}
      <Link
        href="/category?brand=aura-studio"
        className="group relative aspect-[16/10] sm:aspect-[16/10] md:aspect-[4/3] bg-stone-100 overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all rounded-[6px] shrink-0 w-[280px] sm:w-[340px] md:w-[380px] lg:w-[calc((100%-2*1.5rem)/3)] block"
      >
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfAjn1pqNhyu6o0ODhdHAEvwGh_fhQUXGIWeDltdALENOlPxkgPhXUIJlZMCHREbSDq_kGcxVp1QnB4LnQZGaVQLcfbkGEPxRtCN4vc0MhL7fWFyvtBh2fqPomXW9ujKDWPFDROMOEw76eZnfxZJnrsT313-MGz9SgYxTpVHTzlK5GlseHV31jwxZseNN3zBQROVMo9trp08cn1kCL0hcxYg2fixoKFlADbMiHiQ"
          alt="Aura Studio"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-6 inset-x-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <span className="text-white font-sans tracking-[0.25em] text-xl sm:text-2xl font-black drop-shadow-md uppercase">
            AURA STUDIO
          </span>
          <span className="text-white/80 text-[10px] font-bold tracking-[0.2em] uppercase mt-1">
            PARISIAN COUTURE
          </span>
        </div>
      </Link>

      {/* 6. Atelier Silk */}
      <Link
        href="/category?brand=atelier-silk"
        className="group relative aspect-[16/10] sm:aspect-[16/10] md:aspect-[4/3] bg-stone-100 overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all rounded-[6px] shrink-0 w-[280px] sm:w-[340px] md:w-[380px] lg:w-[calc((100%-2*1.5rem)/3)] block"
      >
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB99dwpq68H6bPiciXwJbg8dmsBb9ckLz9C6gof-cbpXjktk_ZioLvspE-f_DhDqo5jJLokmnuLqNM8FJet_N9X7ZhNRjKbsKQIqQ0GiKX52EgCEj28YmrHy09vwwKkMgZQbgO2KiriXB7eoPCWzSyiHsK7RuMcHc2e_6-_G7eHrjJ1t0ptI_5EL6TXR4_ViYzxwsxsSh1iKyKhH7DxZScFtJfPB_dE1oZCBJ7xHA"
          alt="Atelier Silk"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-6 inset-x-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <span className="text-white font-serif tracking-[0.25em] text-xl sm:text-2xl font-bold drop-shadow-md uppercase">
            ATELIER SILK
          </span>
          <span className="text-white/80 text-[10px] font-bold tracking-[0.2em] uppercase mt-1">
            FINE CHIFFONS
          </span>
        </div>
      </Link>
    </div>
  </div>
</div>
</section><section data-purpose="promotional-fashion-banner" className="!my-0 py-0 mb-0">
  <div className="relative w-full min-h-[520px] sm:min-h-[580px] md:min-h-[640px] lg:min-h-[700px] h-[65vh] max-h-[760px] overflow-hidden bg-stone-950 group">
    {promoSlides.map((slide, idx) => (
      <div
        key={slide.id}
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
          currentPromoIndex === idx ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
        }`}
      >
        <img
          src={slide.image}
          alt={slide.alt}
          className="w-full h-full object-cover object-center"
        />
      </div>
    ))}

    {/* Previous Button */}
    <button
      type="button"
      onClick={prevPromoSlide}
      aria-label="Previous promotional banner"
      className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 text-white shadow-lg backdrop-blur-sm flex items-center justify-center transition-all cursor-pointer border border-white/20 group/btn"
    >
      <ChevronLeft className="w-5 h-5 text-white group-hover/btn:scale-110 transition-transform" />
    </button>

    {/* Next Button */}
    <button
      type="button"
      onClick={nextPromoSlide}
      aria-label="Next promotional banner"
      className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 text-white shadow-lg backdrop-blur-sm flex items-center justify-center transition-all cursor-pointer border border-white/20 group/btn"
    >
      <ChevronRight className="w-5 h-5 text-white group-hover/btn:scale-110 transition-transform" />
    </button>

    {/* Bottom Indicator Dots */}
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
      {promoSlides.map((_, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => setCurrentPromoIndex(idx)}
          className={`h-2 transition-all rounded-full ${
            currentPromoIndex === idx ? 'w-8 bg-white shadow-sm' : 'w-2 bg-white/40 hover:bg-white/70'
          }`}
          aria-label={`Go to banner slide ${idx + 1}`}
        />
      ))}
    </div>
  </div>
</section>
{/* END: 7. TOP RANKING */}
{/* BEGIN: 8. BestSelling */}
<section data-purpose="bestselling" className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
<div className="relative mb-5">
  <div className="text-center">
    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 text-center">Best Selling</h2>
    <p className="text-xs text-[#4B5563] mt-0.5">Signature designer flagships &amp; premier brand labels</p>
  </div>
  <div className="sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2 flex items-center justify-center mt-3 sm:mt-0">
    <Link className="text-xs font-bold text-[#1ea768] hover:underline" href="/category?sort=bestselling" style={{ color: "#FF3F6C" }}>View Lookbook <i className="fa-solid fa-arrow-right text-[10px]"></i></Link>
  </div>
</div>
{/* Compact featured product/brand showcase cards */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
{/* BestSelling Card 1 */}
<div className="product-card bg-white rounded-[6px] border border-[#e5e7eb] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
<div className="p-2.5 sm:p-3">
<div className="w-full aspect-[16/10] sm:aspect-[16/10] rounded-[4px] overflow-hidden bg-stone-100 relative group">
<img alt="Athleisure Dress Best Seller" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCD0ZB9JFLfkzvFC68HvU8tXMqxzQsEkoRqjazTITeT1DcEDQ80wWupTO3XfStG7IAjZ3iyUzRdgAIAdnXT8z4IVfwR2-b2ugtXZSMmjEt3fuypKDYjOAFXd62wgU25ruMRBDkmKKPQ5BLIWbxIptf5ujcXOO13QsUyeTUgMDumEEhXWUi7InCFL3WFeboEcp4Ulw96ADWD61vGMF6883nrAM1QozFBHOYJ261-Q" />
<span className="absolute top-2.5 left-2.5 bg-stone-900/80 backdrop-blur-sm text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-[3px] uppercase tracking-wider">Top Seller</span>
</div>
</div>
<div className="p-3.5 sm:p-4 border-t border-[#f2eded] flex items-center justify-between">
<div className="flex items-center gap-2.5 sm:gap-3">
<div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-stone-900 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center shrink-0">AF</div>
<div>
<h4 className="text-xs sm:text-sm font-bold text-gray-900">Aura Fashion</h4>
<p className="text-[11px] sm:text-xs text-[#4B5563]">Luxury Ready-To-Wear</p>
</div>
</div>
<Link href="/category?brand=aurafashion" className="px-3 sm:px-4 py-1.5 rounded-[4px] border border-stone-200 text-xs font-bold text-stone-900 hover:bg-stone-50 transition-colors inline-block text-center shrink-0">
Shop Brand
</Link>
</div>
</div>
{/* BestSelling Card 2 */}
<div className="product-card bg-white rounded-[6px] border border-[#e5e7eb] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
<div className="p-2.5 sm:p-3">
<div className="w-full aspect-[16/10] sm:aspect-[16/10] rounded-[4px] overflow-hidden bg-[#e8ded3] relative group">
<img alt="Boutique New Trends Best Seller" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAki53rTZlrseBrx8szPpZ17MzEKGS4QE1_Nh1rBnQyqlGXmgekfusA8Aiv1fJxmeKuIEzpy_DGSSRMMsdFzQlDwkyhTngYvxsYpRfg0cu_BrWQdPiz4EyzaxfXn17Ul9LMjbPR1BNe7XDhwdplEzr97gjrvMOn8luAOSYKbjHIPmrMOqDjsSr5SHl7hBzFdWPGQhWNignCeaKygD4zGuokLXChn3G35EY2mM6Mjg" />
<span className="absolute top-2.5 left-2.5 bg-[#1ea768] text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-[3px] uppercase tracking-wider" style={{ backgroundColor: "#FF3F6C" }}>Editor's Pick</span>
</div>
</div>
<div className="p-3.5 sm:p-4 border-t border-[#f2eded] flex items-center justify-between">
<div className="flex items-center gap-2.5 sm:gap-3">
<div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1ea768] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center shrink-0" style={{ backgroundColor: "#FF3F6C" }}>VN</div>
<div>
<h4 className="text-xs sm:text-sm font-bold text-gray-900">Vogue Noir</h4>
<p className="text-[11px] sm:text-xs text-[#4B5563]">Modern Parisian Tailoring</p>
</div>
</div>
<Link href="/category?brand=vogue" className="px-3 sm:px-4 py-1.5 rounded-[4px] border border-stone-200 text-xs font-bold text-stone-900 hover:bg-stone-50 transition-colors inline-block text-center shrink-0">
Shop Brand
</Link>
</div>
</div>
{/* BestSelling Card 3 */}
<div className="product-card bg-white rounded-[6px] border border-[#e5e7eb] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow hidden lg:flex">
<div className="p-2.5 sm:p-3">
<div className="w-full aspect-[16/10] sm:aspect-[16/10] rounded-[4px] overflow-hidden bg-stone-100 relative group">
<img alt="Active Capsule Best Seller" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDH0AuHS2bHWWS9mhrM_sXLBwOzO_AnJBD739DqEPpu2XWDnpqjNn8M2YNJ1vTuka8DSRLQPLiUkKU2gPNaLHJzKenNc00010Olk1C1yT9KLEABPCGKwOecodeKL2gZ_FsrrqQUFxSdkQ6i6ri8oI9Gc8k3JlsJYxPwaYhzlly4VyUlopNBvgPLPZlTTAjsxm7-xUOaggSBM2QLWl1Knm5N6z8j99jrlDQazgFDw" />
<span className="absolute top-2.5 left-2.5 bg-amber-500 text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-[3px] uppercase tracking-wider">Viral Sensation</span>
</div>
</div>
<div className="p-3.5 sm:p-4 border-t border-[#f2eded] flex items-center justify-between">
<div className="flex items-center gap-2.5 sm:gap-3">
<div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-stone-900 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center shrink-0">AS</div>
<div>
<h4 className="text-xs sm:text-sm font-bold text-gray-900">Atelier Silk</h4>
<p className="text-[11px] sm:text-xs text-[#4B5563]">Artisanal Chiffon Silks</p>
</div>
</div>
<Link href="/category?brand=atelier" className="px-3 sm:px-4 py-1.5 rounded-[4px] border border-stone-200 text-xs font-bold text-stone-900 hover:bg-stone-50 transition-colors inline-block text-center shrink-0">
Shop Brand
</Link>
</div>
</div>
</div>
</section>
<section data-purpose="fresh-finds" className="relative w-full py-10 px-4 sm:px-6 lg:px-8 border-y border-[#e5e7eb] bg-[#F5F5F5]" style={{ backgroundColor: "#F5F5F5", width: "100%", marginLeft: 0, marginRight: 0 }}><div className="max-w-[1440px] mx-auto"><div className="text-center mb-8"><h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 text-center">Fresh Finds</h2><p className="text-sm text-gray-500 mt-1 mb-8">Based On Your Recent Activity</p></div><div className="relative group/carousel"><button aria-label="Previous Fresh Finds" className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-8 sm:w-9 h-14 bg-white/95 hover:bg-white text-gray-500 hover:text-black rounded-r-md border border-stone-200 border-l-0 shadow-sm flex items-center justify-center transition-all cursor-pointer"><i className="fa-solid fa-chevron-left text-xs text-gray-600"></i></button><button aria-label="Next Fresh Finds" className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-8 sm:w-9 h-14 bg-white/95 hover:bg-white text-gray-500 hover:text-black rounded-l-md border border-stone-200 border-r-0 shadow-sm flex items-center justify-center transition-all cursor-pointer"><i className="fa-solid fa-chevron-right text-xs text-gray-600"></i></button><div className="overflow-x-auto hide-scrollbar flex gap-4 pb-4 px-2 items-stretch"><div className="product-card flex-none w-[230px] sm:w-[245px] md:w-[250px] lg:w-[calc((100%-4*1rem)/5.3)] bg-white border border-stone-200 shadow-sm overflow-hidden flex flex-col p-2.5 sm:p-3 relative shrink-0 justify-between rounded-[6px]">
  <div>
    <div className="w-full aspect-[3/4] relative bg-stone-100 mb-3.5 rounded-[4px] group">
      <HangTag text="Just In" />
      <div className="w-full h-full overflow-hidden rounded-[4px]">
        <ProductHoverCarousel images={["https://lh3.googleusercontent.com/aida-public/AB6AXuATKEJFfrZfwPr8oQ4E1-Vvymoy-wQkWdvK35GZskSQGECzX6lfZIgCRKeyyrXp8KBpOPHMF0lpPgcgfqzZuSMxqPVwuKxT_tzx5T4-7sKWZYuNQU-7amTvoSHbpLToCo3OsgY90NOzMtbgNPnv-6eSPteZGQD59z77f0quxYpTmRrB-aPirJ5ZgTJbYKtniorBum27Vx3sVqTdZrJTyE6pTsdOey6b__TocaDns58nsONvhhBQG-w", "https://lh3.googleusercontent.com/aida-public/AB6AXuDq5hWZd7gcdkKQPebnbe8HjDg0NIt_Iqg1tANSrOK9Ox3MWofbYeCuHoYezH1vDbgR9iwDhRq86BYkgIRotFXP_A775omml-fzx2AmpPwbZGTBKcCRXrGP0cjSiQWxdeG3MLKUrYTaZxd2ojJfW7qlkDpa7eFLgC1kvwNjJ7AFrWyLeJts0LqEESMPq8jKdOYJ-ABw-FyRLX3AwvnBPU_NhirWYxwfR83qcHAqrA", "https://lh3.googleusercontent.com/aida-public/AB6AXuDH0AuHS2bHWWS9mhrM_sXLBwOzO_AnJBD739DqEPpu2XWDnpqjNn8M2YNJ1vTuka8DSRLQPLiUkKU2gPNaLHJzKenNc00010Olk1C1yT9KLEABPCGKwOecodeKL2gZ_FsrrqQUFxSdkQ6i6ri8oI9Gc8k3JlsJYxPwaYhzlly4VyUlopNBvgPLPZlTTAjsxm7-xUOaggSBM2QLWl1Knm5N6z8j99jrlDQazgFDw"]} alt="RANGMANCH Off-White Embroidered Festive Ethnic Set" className="w-full h-full object-cover object-center" />
      </div>
      {/* Floating Wishlist & Cart buttons on bottom-right of image matching wireframe */}
      <div className="absolute right-2.5 -bottom-3.5 z-20 flex items-center gap-1.5">
        <Link
          href="/wishlist"
          aria-label="Add to wishlist"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-[#c8002e] flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110"
        >
          <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
        </Link>
        <Link
          href="/cart"
          aria-label="Add to cart"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-black flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110"
        >
          <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
        </Link>
      </div>
    </div>
    <div className="px-1">
      <h4 className="text-xs font-bold tracking-wider text-gray-900 uppercase block mb-1 font-sans">RANGMANCH</h4>
      <p className="text-xs text-gray-600 truncate leading-snug font-normal">Off-White Embroidered Festive Ethni...</p>
    </div>
  </div>
  <div className="px-1 mt-2.5">
    <div className="flex items-baseline gap-1.5 flex-wrap">
      <span className="text-sm font-bold text-gray-900">₹ 2,499</span>
      <span className="text-xs text-gray-400 line-through">₹ 4,499</span>
      <span className="text-[11px] font-bold text-[#FF3F6C]">(44% OFF)</span>
    </div>
  </div>
</div>

<div className="product-card flex-none w-[230px] sm:w-[245px] md:w-[250px] lg:w-[calc((100%-4*1rem)/5.3)] bg-white border border-stone-200 shadow-sm overflow-hidden flex flex-col p-2.5 sm:p-3 relative shrink-0 justify-between rounded-[6px]">
  <div>
    <div className="w-full aspect-[3/4] relative bg-stone-100 mb-3.5 rounded-[4px] group">
      <HangTag text="Just In" />
      <div className="w-full h-full overflow-hidden rounded-[4px]">
        <ProductHoverCarousel images={["https://lh3.googleusercontent.com/aida-public/AB6AXuDfAjn1pqNhyu6o0ODhdHAEvwGh_fhQUXGIWeDltdALENOlPxkgPhXUIJlZMCHREbSDq_kGcxVp1QnB4LnQZGaVQLcfbkGEPxRtCN4vc0MhL7fWFyvtBh2fqPomXW9ujKDWPFDROMOEw76eZnfxZJnrsT313-MGz9SgYxTpVHTzlK5GlseHV31jwxZseNN3zBQROVMo9trp08cn1kCL0hcxYg2fixoKFlADbMiHiQ", "https://lh3.googleusercontent.com/aida-public/AB6AXuAu4XcuS8foDakvyLzUR-KAY6KJ_IEV5zxNlp2Z0La2yKDPwKdh4xo2IDpVp9xjD6lwc4NlVf4_3_pkN9cx68_TwkFNoqPGPMLwnEmcAQFROiaj3Eao7PCQG5XQU7waD6qtYau1TeDL3SGsu7RCRSHie5BglSzxw3z97Egk17u-o9fn4QsfslXnDy0JX7_dIdNgaBUIMgtxx0zTtDRjiMjXJen_sO4MuhCj78bw5A", "https://lh3.googleusercontent.com/aida-public/AB6AXuCD6z8Kqjf7ii_WUQvGJidL9hrL3o5C-9iwWE6MmVp-mlotFPIF7VvYgFNgR80qheYR0CGOmn8ar5rzPRoOOHPc0vbocB7_kE3hDOzpHe90wvqQVqr2v__LpDHjJdQQmP4ZUJrqeGKbL96MIzP59-siIV23_o7e5aaHaF6qkXI5a6cHj3HJhEQxIqfA0H9lEXynjnunAKgCIc5yeGZVt_LtDAtUtYYHq4Wh5BfC7g"]} alt="AKKRITI Olive Embroidered Peplum Top" className="w-full h-full object-cover object-top" />
      </div>
      {/* Floating Wishlist & Cart buttons on bottom-right of image matching wireframe */}
      <div className="absolute right-2.5 -bottom-3.5 z-20 flex items-center gap-1.5">
        <Link
          href="/wishlist"
          aria-label="Add to wishlist"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-[#c8002e] flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110"
        >
          <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
        </Link>
        <Link
          href="/cart"
          aria-label="Add to cart"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-black flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110"
        >
          <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
        </Link>
      </div>
    </div>
    <div className="px-1">
      <h4 className="text-xs font-bold tracking-wider text-gray-900 uppercase block mb-1 font-sans">AKKRITI</h4>
      <p className="text-xs text-gray-600 truncate leading-snug font-normal">Olive Embroidered Peplum Top &amp; Pala...</p>
    </div>
  </div>
  <div className="px-1 mt-2.5">
    <div className="flex items-baseline gap-1.5 flex-wrap">
      <span className="text-sm font-bold text-gray-900">₹ 1,499</span>
      <span className="text-xs text-gray-400 line-through">₹ 2,599</span>
      <span className="text-[11px] font-bold text-[#FF3F6C]">(42% OFF)</span>
    </div>
  </div>
</div>

<div className="product-card flex-none w-[230px] sm:w-[245px] md:w-[250px] lg:w-[calc((100%-4*1rem)/5.3)] bg-white border border-stone-200 shadow-sm overflow-hidden flex flex-col p-2.5 sm:p-3 relative shrink-0 justify-between rounded-[6px]">
  <div>
    <div className="w-full aspect-[3/4] relative bg-stone-100 mb-3.5 rounded-[4px] group">
      <HangTag text="Just In" />
      <div className="w-full h-full overflow-hidden rounded-[4px]">
        <ProductHoverCarousel images={["https://lh3.googleusercontent.com/aida-public/AB6AXuDq5hWZd7gcdkKQPebnbe8HjDg0NIt_Iqg1tANSrOK9Ox3MWofbYeCuHoYezH1vDbgR9iwDhRq86BYkgIRotFXP_A775omml-fzx2AmpPwbZGTBKcCRXrGP0cjSiQWxdeG3MLKUrYTaZxd2ojJfW7qlkDpa7eFLgC1kvwNjJ7AFrWyLeJts0LqEESMPq8jKdOYJ-ABw-FyRLX3AwvnBPU_NhirWYxwfR83qcHAqrA", "https://lh3.googleusercontent.com/aida-public/AB6AXuATKEJFfrZfwPr8oQ4E1-Vvymoy-wQkWdvK35GZskSQGECzX6lfZIgCRKeyyrXp8KBpOPHMF0lpPgcgfqzZuSMxqPVwuKxT_tzx5T4-7sKWZYuNQU-7amTvoSHbpLToCo3OsgY90NOzMtbgNPnv-6eSPteZGQD59z77f0quxYpTmRrB-aPirJ5ZgTJbYKtniorBum27Vx3sVqTdZrJTyE6pTsdOey6b__TocaDns58nsONvhhBQG-w", "https://lh3.googleusercontent.com/aida-public/AB6AXuB99dwpq68H6bPiciXwJbg8dmsBb9ckLz9C6gof-cbpXjktk_ZioLvspE-f_DhDqo5jJLokmnuLqNM8FJet_N9X7ZhNRjKbsKQIqQ0GiKX52EgCEj28YmrHy09vwwKkMgZQbgO2KiriXB7eoPCWzSyiHsK7RuMcHc2e_6-_G7eHrjJ1t0ptI_5EL6TXR4_ViYzxwsxsSh1iKyKhH7DxZScFtJfPB_dE1oZCBJ7xHA"]} alt="AKKRITI Red Brocade Choli" className="w-full h-full object-cover object-top" />
      </div>
      {/* Floating Wishlist & Cart buttons on bottom-right of image matching wireframe */}
      <div className="absolute right-2.5 -bottom-3.5 z-20 flex items-center gap-1.5">
        <Link
          href="/wishlist"
          aria-label="Add to wishlist"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-[#c8002e] flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110"
        >
          <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
        </Link>
        <Link
          href="/cart"
          aria-label="Add to cart"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-black flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110"
        >
          <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
        </Link>
      </div>
    </div>
    <div className="px-1">
      <h4 className="text-xs font-bold tracking-wider text-gray-900 uppercase block mb-1 font-sans">AKKRITI</h4>
      <p className="text-xs text-gray-600 truncate leading-snug font-normal">Red Brocade Choli, Palazzo &amp; Shrug...</p>
    </div>
  </div>
  <div className="px-1 mt-2.5">
    <div className="flex items-baseline gap-1.5 flex-wrap">
      <span className="text-sm font-bold text-gray-900">₹ 1,699</span>
      <span className="text-xs text-gray-400 line-through">₹ 2,999</span>
      <span className="text-[11px] font-bold text-[#FF3F6C]">(43% OFF)</span>
    </div>
  </div>
</div>

<div className="product-card flex-none w-[230px] sm:w-[245px] md:w-[250px] lg:w-[calc((100%-4*1rem)/5.3)] bg-white border border-stone-200 shadow-sm overflow-hidden flex flex-col p-2.5 sm:p-3 relative shrink-0 justify-between rounded-[6px]">
  <div>
    <div className="w-full aspect-[3/4] relative bg-stone-100 mb-3.5 rounded-[4px] group">
      <HangTag text="Just In" />
      <div className="w-full h-full overflow-hidden rounded-[4px]">
        <ProductHoverCarousel images={["https://lh3.googleusercontent.com/aida-public/AB6AXuBEZWg_Qcw-XrvHDafNBvoqtwZzN9Zj2Axao8bXj_8oykAGO9lUo6LwB_F2Rgs-q9lfYrzwqI1ip_c87XMcTqh98ls2Y1zaHXvLke94RFLLrym5vwqfntMB0bExAZCFXW4hJY0wZHxgXXiOy_MhOrMjUmdtHXJxyiW01veWxVyVBD2yrQj1o4098-Q3D2onxbiD2giCuBI5o2tak50C1zZhefvNekUmZOVOweCs_Q", "https://lh3.googleusercontent.com/aida-public/AB6AXuAki53rTZlrseBrx8szPpZ17MzEKGS4QE1_Nh1rBnQyqlGXmgekfusA8Aiv1fJxmeKuIEzpy_DGSSRMMsdFzQlDwkyhTngYvxsYpRfg0cu_BrWQdPiz4EyzaxfXn17Ul9LMjbPR1BNe7XDhwdplEzr97gjrvMOn8luAOSYKbjHIPmrMOqDjsSr5SHl7hBzFdWPGQhWNignCeaKygD4zGuokLXChn3G35EY2mM6Mjg", "https://lh3.googleusercontent.com/aida-public/AB6AXuCCD0ZB9JFLfkzvFC68HvU8tXMqxzQsEkoRqjazTITeT1DcEDQ80wWupTO3XfStG7IAjZ3iyUzRdgAIAdnXT8z4IVfwR2-b2ugtXZSMmjEt3fuypKDYjOAFXd62wgU25ruMRBDkmKKPQ5BLIWbxIptf5ujcXOO13QsUyeTUgMDumEEhXWUi7InCFL3WFeboEcp4Ulw96ADWD61vGMF6883nrAM1QozFBHOYJ261-Q"]} alt="AKKRITI Green Embroidered Cropped Top" className="w-full h-full object-cover object-top" />
      </div>
      {/* Floating Wishlist & Cart buttons on bottom-right of image matching wireframe */}
      <div className="absolute right-2.5 -bottom-3.5 z-20 flex items-center gap-1.5">
        <Link
          href="/wishlist"
          aria-label="Add to wishlist"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-[#c8002e] flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110"
        >
          <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
        </Link>
        <Link
          href="/cart"
          aria-label="Add to cart"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-black flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110"
        >
          <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
        </Link>
      </div>
    </div>
    <div className="px-1">
      <h4 className="text-xs font-bold tracking-wider text-gray-900 uppercase block mb-1 font-sans">AKKRITI</h4>
      <p className="text-xs text-gray-600 truncate leading-snug font-normal">Green Embroidered Cropped Top...</p>
    </div>
  </div>
  <div className="px-1 mt-2.5">
    <div className="flex items-baseline gap-1.5 flex-wrap">
      <span className="text-sm font-bold text-gray-900">₹ 799</span>
      <span className="text-xs text-gray-400 line-through">₹ 1,499</span>
      <span className="text-[11px] font-bold text-[#FF3F6C]">(47% OFF)</span>
    </div>
  </div>
</div>

<div className="product-card flex-none w-[230px] sm:w-[245px] md:w-[250px] lg:w-[calc((100%-4*1rem)/5.3)] bg-white border border-stone-200 shadow-sm overflow-hidden flex flex-col p-2.5 sm:p-3 relative shrink-0 justify-between rounded-[6px]">
  <div>
    <div className="w-full aspect-[3/4] relative bg-stone-100 mb-3.5 rounded-[4px] group">
      <HangTag text="Just In" />
      <div className="w-full h-full overflow-hidden rounded-[4px]">
        <ProductHoverCarousel images={["https://lh3.googleusercontent.com/aida-public/AB6AXuAki53rTZlrseBrx8szPpZ17MzEKGS4QE1_Nh1rBnQyqlGXmgekfusA8Aiv1fJxmeKuIEzpy_DGSSRMMsdFzQlDwkyhTngYvxsYpRfg0cu_BrWQdPiz4EyzaxfXn17Ul9LMjbPR1BNe7XDhwdplEzr97gjrvMOn8luAOSYKbjHIPmrMOqDjsSr5SHl7hBzFdWPGQhWNignCeaKygD4zGuokLXChn3G35EY2mM6Mjg", "https://lh3.googleusercontent.com/aida-public/AB6AXuCCD0ZB9JFLfkzvFC68HvU8tXMqxzQsEkoRqjazTITeT1DcEDQ80wWupTO3XfStG7IAjZ3iyUzRdgAIAdnXT8z4IVfwR2-b2ugtXZSMmjEt3fuypKDYjOAFXd62wgU25ruMRBDkmKKPQ5BLIWbxIptf5ujcXOO13QsUyeTUgMDumEEhXWUi7InCFL3WFeboEcp4Ulw96ADWD61vGMF6883nrAM1QozFBHOYJ261-Q", "https://lh3.googleusercontent.com/aida-public/AB6AXuBEZWg_Qcw-XrvHDafNBvoqtwZzN9Zj2Axao8bXj_8oykAGO9lUo6LwB_F2Rgs-q9lfYrzwqI1ip_c87XMcTqh98ls2Y1zaHXvLke94RFLLrym5vwqfntMB0bExAZCFXW4hJY0wZHxgXXiOy_MhOrMjUmdtHXJxyiW01veWxVyVBD2yrQj1o4098-Q3D2onxbiD2giCuBI5o2tak50C1zZhefvNekUmZOVOweCs_Q"]} alt="AKKRITI White Embroidered Cotton Top" className="w-full h-full object-cover object-top" />
      </div>
      {/* Floating Wishlist & Cart buttons on bottom-right of image matching wireframe */}
      <div className="absolute right-2.5 -bottom-3.5 z-20 flex items-center gap-1.5">
        <Link
          href="/wishlist"
          aria-label="Add to wishlist"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-[#c8002e] flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110"
        >
          <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
        </Link>
        <Link
          href="/cart"
          aria-label="Add to cart"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-black flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110"
        >
          <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
        </Link>
      </div>
    </div>
    <div className="px-1">
      <h4 className="text-xs font-bold tracking-wider text-gray-900 uppercase block mb-1 font-sans">AKKRITI</h4>
      <p className="text-xs text-gray-600 truncate leading-snug font-normal">White Embroidered Cotton Top...</p>
    </div>
  </div>
  <div className="px-1 mt-2.5">
    <div className="flex items-baseline gap-1.5 flex-wrap">
      <span className="text-sm font-bold text-gray-900">₹ 849</span>
      <span className="text-xs text-gray-400 line-through">₹ 1,499</span>
      <span className="text-[11px] font-bold text-[#FF3F6C]">(43% OFF)</span>
    </div>
  </div>
</div>

<div className="product-card flex-none w-[230px] sm:w-[245px] md:w-[250px] lg:w-[calc((100%-4*1rem)/5.3)] bg-white border border-stone-200 shadow-sm overflow-hidden flex flex-col p-2.5 sm:p-3 relative shrink-0 justify-between rounded-[6px]">
  <div>
    <div className="w-full aspect-[3/4] relative bg-stone-100 mb-3.5 rounded-[4px] group">
      <HangTag text="Just In" />
      <div className="w-full h-full overflow-hidden rounded-[4px]">
        <ProductHoverCarousel images={["https://lh3.googleusercontent.com/aida-public/AB6AXuCCD0ZB9JFLfkzvFC68HvU8tXMqxzQsEkoRqjazTITeT1DcEDQ80wWupTO3XfStG7IAjZ3iyUzRdgAIAdnXT8z4IVfwR2-b2ugtXZSMmjEt3fuypKDYjOAFXd62wgU25ruMRBDkmKKPQ5BLIWbxIptf5ujcXOO13QsUyeTUgMDumEEhXWUi7InCFL3WFeboEcp4Ulw96ADWD61vGMF6883nrAM1QozFBHOYJ261-Q", "https://lh3.googleusercontent.com/aida-public/AB6AXuDfAjn1pqNhyu6o0ODhdHAEvwGh_fhQUXGIWeDltdALENOlPxkgPhXUIJlZMCHREbSDq_kGcxVp1QnB4LnQZGaVQLcfbkGEPxRtCN4vc0MhL7fWFyvtBh2fqPomXW9ujKDWPFDROMOEw76eZnfxZJnrsT313-MGz9SgYxTpVHTzlK5GlseHV31jwxZseNN3zBQROVMo9trp08cn1kCL0hcxYg2fixoKFlADbMiHiQ", "https://lh3.googleusercontent.com/aida-public/AB6AXuBEZWg_Qcw-XrvHDafNBvoqtwZzN9Zj2Axao8bXj_8oykAGO9lUo6LwB_F2Rgs-q9lfYrzwqI1ip_c87XMcTqh98ls2Y1zaHXvLke94RFLLrym5vwqfntMB0bExAZCFXW4hJY0wZHxgXXiOy_MhOrMjUmdtHXJxyiW01veWxVyVBD2yrQj1o4098-Q3D2onxbiD2giCuBI5o2tak50C1zZhefvNekUmZOVOweCs_Q"]} alt="AKKRITI Wine Sleeveless Festive Kurti" className="w-full h-full object-cover object-top" />
      </div>
      {/* Floating Wishlist & Cart buttons on bottom-right of image matching wireframe */}
      <div className="absolute right-2.5 -bottom-3.5 z-20 flex items-center gap-1.5">
        <Link
          href="/wishlist"
          aria-label="Add to wishlist"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-[#c8002e] flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110"
        >
          <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
        </Link>
        <Link
          href="/cart"
          aria-label="Add to cart"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-black flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110"
        >
          <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
        </Link>
      </div>
    </div>
    <div className="px-1">
      <h4 className="text-xs font-bold tracking-wider text-gray-900 uppercase block mb-1 font-sans">AKKRITI</h4>
      <p className="text-xs text-gray-600 truncate leading-snug font-normal">Wine Sleeveless Festive Kurti...</p>
    </div>
  </div>
  <div className="px-1 mt-2.5">
    <div className="flex items-baseline gap-1.5 flex-wrap">
      <span className="text-sm font-bold text-gray-900">₹ 699</span>
      <span className="text-xs text-gray-400 line-through">₹ 1,299</span>
      <span className="text-[11px] font-bold text-[#FF3F6C]">(46% OFF)</span>
    </div>
  </div>
</div><Link href="/category" className="product-card flex-none w-[230px] sm:w-[245px] md:w-[250px] lg:w-[calc((100%-4*1rem)/5.3)] bg-white border border-stone-200 shadow-sm overflow-hidden flex flex-col items-center justify-center p-6 shrink-0 rounded-[6px] group hover:shadow-md transition-all cursor-pointer min-h-[340px]"><span className="text-stone-800 text-sm md:text-base font-bold tracking-wider uppercase group-hover:text-black transition-colors select-none">+ VIEW ALL</span></Link></div></div></div></section>

{/* BEGIN: Most Loved Styles */}
<section data-purpose="most-loved-styles" className="w-full bg-white border-b border-[#e5e7eb] py-12 px-4 sm:px-6 lg:px-8 !my-0 mb-0" style={{ marginTop: 0, marginBottom: 0 }}>
  <div className="max-w-[1440px] mx-auto flex flex-col items-center justify-center">
    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 text-center mb-6">Most Loved Styles</h2>
    <div className="flex items-center justify-center gap-6 sm:gap-10 md:gap-14 select-none mb-6"><button type="button" id="btn-toggle-men" onClick={() => handleGenderSwitch('men')} className="group flex flex-col items-center justify-center gap-2 text-center cursor-pointer outline-none"><div id="icon-wrap-men" className="w-20 h-28 sm:w-24 sm:h-32 flex items-center justify-center text-[#c8002e] group-hover:text-[#c8002e] transition-all"><svg viewBox="0 0 261 360" fill="currentColor" fillRule="evenodd" className="w-full h-full drop-shadow-xs">
  <path d="M 213 324 L 214 336 L 212 343 L 210 346 L 212 344 L 214 340 L 215 334 Z M 200 316 L 202 320 L 204 331 L 203 341 L 201 347 L 202 344 L 203 343 L 204 339 L 204 326 L 202 318 Z M 86 289 L 81 289 L 78 295 L 80 293 L 80 292 L 81 291 Z M 117 231 L 117 233 L 120 238 L 123 245 L 123 247 L 125 250 L 125 252 L 125 250 L 124 249 L 124 246 Z M 24 216 L 27 222 L 32 228 L 35 230 L 26 219 L 26 218 Z M 227 183 L 220 186 L 216 189 L 206 199 L 202 204 L 191 220 L 185 230 L 178 243 L 177 247 L 175 249 L 175 251 L 170 259 L 172 255 L 177 248 L 181 241 L 186 230 L 198 211 L 208 198 L 216 190 L 223 185 Z M 131 183 L 135 187 L 135 188 L 138 191 L 136 188 L 136 187 Z M 77 169 L 77 171 L 78 172 L 78 174 L 80 177 L 83 187 L 86 199 L 88 211 L 90 215 L 91 220 L 91 238 L 90 239 L 90 246 L 90 244 L 91 243 L 92 234 L 91 218 L 90 212 L 85 191 L 82 181 L 78 173 Z M 49 164 L 51 165 L 58 172 L 52 165 Z M 154 160 L 152 166 L 149 170 L 147 176 L 145 186 L 149 172 L 152 167 L 152 165 L 154 162 Z M 132 143 L 132 146 L 133 149 L 136 152 L 137 156 L 137 153 L 136 151 L 134 149 L 132 145 Z M 85 17 L 87 22 L 88 23 L 91 24 L 93 26 L 87 32 L 84 40 L 80 42 L 78 42 L 76 41 L 73 37 L 73 39 L 76 43 L 70 48 L 68 51 L 68 54 L 69 51 L 72 48 L 77 45 L 83 46 L 80 49 L 76 56 L 76 62 L 78 66 L 76 68 L 74 69 L 67 68 L 69 70 L 73 71 L 79 71 L 76 77 L 76 81 L 77 82 L 78 85 L 77 83 L 77 80 L 80 75 L 82 82 L 84 84 L 85 86 L 84 88 L 82 90 L 84 89 L 87 89 L 88 93 L 89 94 L 90 94 L 92 100 L 94 104 L 97 108 L 102 112 L 105 113 L 106 114 L 107 116 L 107 122 L 108 120 L 110 122 L 111 125 L 111 127 L 105 136 L 103 138 L 100 139 L 96 139 L 94 140 L 90 144 L 88 145 L 80 147 L 75 145 L 72 145 L 63 151 L 56 153 L 51 153 L 47 154 L 31 161 L 24 168 L 15 183 L 14 190 L 10 200 L 9 204 L 10 224 L 11 230 L 12 231 L 12 235 L 10 241 L 7 247 L 4 259 L 3 265 L 3 274 L 10 286 L 13 293 L 14 297 L 14 301 L 15 302 L 14 317 L 18 324 L 23 329 L 23 334 L 22 335 L 22 341 L 17 350 L 17 352 L 18 349 L 24 338 L 28 337 L 29 339 L 29 344 L 31 350 L 28 350 L 26 351 L 31 351 L 32 350 L 46 351 L 51 356 L 53 357 L 61 356 L 64 358 L 66 358 L 81 351 L 85 347 L 92 345 L 102 345 L 107 347 L 112 347 L 118 348 L 121 350 L 126 351 L 144 351 L 156 353 L 183 353 L 188 355 L 192 355 L 197 353 L 203 352 L 216 352 L 221 354 L 225 357 L 230 358 L 240 357 L 242 356 L 243 352 L 245 348 L 245 338 L 247 332 L 250 327 L 253 324 L 256 319 L 256 313 L 255 311 L 249 305 L 249 302 L 250 301 L 252 291 L 252 287 L 250 272 L 250 256 L 253 247 L 254 245 L 256 243 L 258 238 L 257 222 L 258 208 L 256 206 L 255 201 L 253 197 L 248 191 L 243 182 L 236 178 L 224 173 L 221 171 L 216 165 L 215 165 L 213 163 L 207 161 L 201 160 L 193 156 L 187 150 L 182 148 L 180 146 L 178 143 L 177 140 L 172 134 L 172 119 L 174 113 L 176 114 L 175 108 L 177 103 L 181 100 L 185 91 L 184 82 L 185 77 L 187 71 L 189 69 L 190 74 L 189 76 L 191 73 L 190 66 L 191 63 L 194 62 L 196 59 L 196 54 L 195 51 L 193 48 L 187 42 L 194 39 L 196 37 L 192 39 L 188 39 L 184 37 L 184 36 L 182 33 L 175 27 L 175 24 L 176 23 L 176 21 L 174 17 L 169 15 L 165 15 L 159 17 L 155 20 L 154 14 L 152 9 L 151 8 L 150 8 L 148 6 L 142 4 L 136 4 L 133 5 L 131 7 L 129 8 L 121 8 L 114 10 L 110 12 L 107 17 L 105 19 L 99 22 L 90 22 L 88 21 L 86 19 Z M 77 351 L 74 353 L 66 355 L 67 354 L 66 351 L 71 349 Z M 71 333 L 72 336 L 71 337 L 71 340 L 70 343 L 68 345 L 65 351 L 63 357 L 57 353 L 57 351 L 60 346 L 62 345 L 65 340 Z M 24 331 L 26 334 L 24 336 Z M 187 346 L 186 352 L 166 353 L 155 351 L 142 350 L 126 350 L 122 349 L 119 347 L 114 347 L 109 345 L 104 345 L 100 343 L 107 339 L 125 331 L 128 331 L 136 328 L 138 326 L 149 322 L 162 319 L 167 319 L 170 321 L 184 336 Z M 162 317 L 165 315 L 170 314 L 182 314 L 188 316 L 190 318 L 192 318 L 187 315 L 184 315 L 179 312 L 182 309 L 184 308 L 191 306 L 195 306 L 200 311 L 207 314 L 212 319 L 213 317 L 223 325 L 223 326 L 226 329 L 229 336 L 231 336 L 236 342 L 237 348 L 239 353 L 241 352 L 241 350 L 239 345 L 236 340 L 230 334 L 225 326 L 220 321 L 213 316 L 201 310 L 200 307 L 194 305 L 197 303 L 216 303 L 221 304 L 226 306 L 234 314 L 236 317 L 239 324 L 241 331 L 240 329 L 240 326 L 237 318 L 235 314 L 230 307 L 227 305 L 216 302 L 200 302 L 196 303 L 193 305 L 190 304 L 192 302 L 193 302 L 193 299 L 195 297 L 197 296 L 208 293 L 221 293 L 225 294 L 238 301 L 243 305 L 251 308 L 254 311 L 256 316 L 255 320 L 249 327 L 248 326 L 246 330 L 245 333 L 246 335 L 244 339 L 244 348 L 243 353 L 241 355 L 239 356 L 233 357 L 228 357 L 223 354 L 229 349 L 230 346 L 230 341 L 229 346 L 228 348 L 224 352 L 220 352 L 219 350 L 206 350 L 208 348 L 202 352 L 200 352 L 200 350 L 196 353 L 193 354 L 188 353 L 189 351 L 186 338 L 185 336 L 169 319 L 167 318 Z M 184 300 L 184 303 L 185 304 L 185 306 L 178 312 L 176 313 L 169 313 L 164 314 L 160 318 L 154 319 L 146 322 L 131 329 L 123 331 L 118 334 L 113 335 L 106 338 L 95 344 L 87 346 L 69 344 L 70 342 L 72 340 L 73 336 L 73 333 L 75 328 L 82 319 L 82 317 L 84 315 L 86 309 L 91 301 L 98 294 L 132 295 L 157 293 L 164 291 L 170 291 L 182 297 Z M 100 288 L 103 291 L 99 292 L 95 295 L 91 299 L 88 303 L 81 319 L 76 325 L 75 320 L 76 319 L 77 313 L 78 299 L 75 323 L 72 329 L 67 337 L 62 342 L 58 348 L 56 352 L 55 356 L 53 356 L 47 349 L 46 349 L 43 346 L 43 332 L 44 328 L 49 317 L 49 314 L 50 311 L 53 306 L 61 299 L 61 298 L 68 288 L 71 285 L 73 284 L 83 284 L 90 288 L 88 289 Z M 187 283 L 188 289 L 186 291 L 185 287 Z M 255 216 L 257 226 L 258 236 L 249 255 L 238 270 L 236 274 L 240 268 L 248 258 L 249 262 L 248 263 L 248 268 L 247 269 L 246 275 L 246 283 L 245 284 L 245 288 L 245 286 L 246 285 L 246 279 L 248 272 L 250 274 L 251 281 L 251 292 L 248 303 L 245 305 L 242 302 L 238 301 L 232 297 L 224 293 L 220 292 L 210 292 L 204 293 L 193 297 L 190 300 L 191 302 L 185 305 L 185 300 L 184 299 L 184 295 L 186 292 L 195 282 L 198 280 L 204 273 L 190 286 L 189 280 L 190 279 L 190 272 L 191 269 L 196 264 L 202 260 L 206 258 L 212 256 L 220 251 L 226 248 L 231 246 L 239 244 L 247 240 L 249 238 L 250 238 L 251 236 L 245 238 L 252 226 Z M 255 209 L 254 218 L 252 225 L 248 233 L 244 239 L 241 242 L 237 244 L 234 244 L 226 247 L 217 253 L 206 257 L 198 262 L 197 260 L 200 254 L 203 250 L 204 246 L 206 242 L 212 236 L 216 231 L 220 224 L 225 219 L 235 212 L 237 212 L 239 210 L 248 207 L 253 207 Z M 176 204 L 178 211 L 178 218 L 176 223 L 174 226 L 163 237 L 156 242 L 145 253 L 143 257 L 139 261 L 139 263 L 134 269 L 133 266 L 134 265 L 134 262 L 137 257 L 138 252 L 145 236 L 150 229 L 160 219 L 168 213 Z M 116 201 L 118 203 L 122 205 L 128 211 L 129 213 L 130 218 L 130 223 L 128 240 L 116 225 L 114 220 L 114 213 Z M 117 194 L 120 197 L 121 200 L 121 204 L 119 202 L 118 202 L 116 199 Z M 174 187 L 175 195 L 177 199 L 177 201 L 175 205 L 165 215 L 156 220 L 158 218 L 163 210 L 169 198 L 172 189 Z M 109 176 L 112 183 L 115 202 L 115 208 L 113 222 L 111 218 L 107 204 L 106 199 L 106 195 L 105 190 L 103 184 L 103 181 Z M 29 175 L 35 175 L 41 178 L 45 182 L 49 184 L 65 200 L 68 204 L 72 211 L 75 218 L 76 223 L 76 228 L 75 229 L 74 236 L 72 233 L 68 223 L 66 221 L 63 214 L 63 212 L 62 211 L 62 209 L 62 212 L 66 223 L 78 245 L 78 251 L 76 257 L 72 248 L 69 246 L 70 250 L 67 247 L 66 247 L 59 240 L 56 238 L 48 234 L 43 233 L 40 231 L 37 231 L 43 234 L 48 235 L 56 239 L 66 247 L 72 253 L 80 264 L 80 270 L 78 272 L 76 268 L 76 270 L 78 273 L 73 274 L 66 270 L 63 269 L 53 267 L 38 267 L 28 271 L 25 274 L 21 274 L 20 273 L 15 273 L 14 272 L 12 272 L 14 273 L 24 275 L 37 275 L 38 274 L 42 274 L 27 273 L 32 270 L 41 267 L 48 267 L 54 268 L 57 270 L 51 272 L 53 271 L 58 270 L 64 270 L 68 272 L 63 274 L 60 273 L 53 275 L 50 277 L 37 288 L 30 295 L 26 300 L 23 307 L 21 309 L 20 311 L 23 308 L 24 305 L 29 298 L 35 291 L 44 283 L 53 276 L 55 275 L 59 274 L 78 274 L 83 275 L 87 279 L 88 282 L 87 286 L 83 283 L 79 283 L 77 282 L 75 280 L 72 279 L 65 279 L 64 278 L 62 279 L 67 279 L 68 280 L 74 280 L 76 282 L 72 283 L 68 287 L 63 289 L 60 289 L 55 291 L 49 296 L 45 300 L 45 301 L 42 304 L 41 306 L 51 296 L 57 293 L 64 293 L 56 301 L 50 309 L 49 311 L 48 317 L 45 323 L 39 330 L 37 334 L 38 337 L 38 334 L 40 330 L 42 328 L 43 334 L 42 346 L 44 348 L 42 349 L 39 348 L 39 350 L 36 350 L 33 348 L 30 345 L 30 336 L 34 322 L 36 319 L 36 315 L 36 317 L 35 318 L 35 320 L 33 323 L 33 326 L 31 329 L 29 336 L 26 333 L 24 330 L 23 327 L 18 322 L 15 317 L 16 301 L 15 300 L 14 293 L 11 285 L 5 276 L 3 272 L 3 270 L 7 250 L 9 244 L 12 238 L 14 247 L 14 254 L 15 259 L 16 261 L 16 257 L 15 256 L 14 250 L 15 238 L 21 251 L 20 247 L 17 242 L 14 234 L 14 231 L 12 228 L 11 224 L 10 214 L 10 205 L 14 190 L 16 187 L 17 197 L 18 201 L 20 205 L 20 208 L 22 210 L 20 206 L 18 199 L 17 193 L 17 186 L 18 183 L 23 178 Z M 111 174 L 114 175 L 114 177 L 113 178 L 112 181 L 110 176 Z M 116 173 L 119 176 L 120 179 L 120 187 L 119 189 L 117 191 L 115 196 L 113 192 L 113 187 L 112 186 L 112 182 L 114 179 L 113 174 Z M 243 184 L 245 189 L 249 193 L 252 197 L 255 203 L 255 205 L 254 208 L 247 207 L 239 210 L 228 216 L 227 214 L 230 210 L 241 199 L 237 202 L 236 202 L 233 205 L 233 206 L 225 215 L 220 222 L 219 225 L 211 236 L 206 241 L 201 249 L 200 254 L 199 256 L 197 258 L 197 255 L 198 252 L 198 248 L 201 242 L 201 238 L 205 230 L 207 228 L 208 226 L 205 229 L 198 245 L 194 262 L 189 270 L 189 275 L 188 278 L 185 283 L 185 287 L 184 291 L 183 293 L 181 295 L 179 295 L 172 291 L 165 289 L 168 286 L 171 284 L 174 283 L 180 279 L 182 276 L 177 279 L 174 282 L 166 286 L 163 289 L 158 292 L 146 293 L 142 292 L 142 290 L 143 287 L 144 286 L 144 284 L 142 288 L 142 290 L 141 292 L 132 294 L 128 293 L 130 288 L 131 277 L 134 272 L 140 273 L 140 268 L 138 267 L 137 265 L 140 262 L 142 258 L 146 253 L 154 245 L 155 247 L 153 250 L 150 262 L 149 270 L 148 274 L 146 278 L 146 281 L 146 279 L 148 276 L 151 265 L 153 253 L 157 243 L 167 235 L 174 228 L 178 221 L 179 217 L 178 209 L 180 203 L 179 196 L 182 189 L 182 184 L 184 182 L 186 181 L 188 182 L 190 184 L 193 191 L 193 196 L 195 197 L 195 198 L 197 199 L 196 194 L 196 191 L 197 188 L 201 180 L 209 169 L 204 174 L 201 178 L 200 181 L 196 186 L 194 178 L 191 170 L 191 167 L 195 171 L 193 169 L 193 168 L 188 164 L 185 157 L 185 155 L 183 152 L 185 150 L 187 151 L 192 157 L 194 158 L 196 158 L 198 160 L 207 162 L 213 164 L 217 168 L 220 174 L 222 175 L 227 175 L 233 177 L 240 181 Z M 29 164 L 38 159 L 45 157 L 47 155 L 50 154 L 56 154 L 66 151 L 70 147 L 72 146 L 75 146 L 78 148 L 75 151 L 79 156 L 72 158 L 74 157 L 77 157 L 79 158 L 82 161 L 84 166 L 86 169 L 85 165 L 78 153 L 77 149 L 79 148 L 86 147 L 92 144 L 94 141 L 99 139 L 102 140 L 100 143 L 98 144 L 95 148 L 95 150 L 93 153 L 92 149 L 93 146 L 90 152 L 87 155 L 86 158 L 84 160 L 89 154 L 91 163 L 91 172 L 90 177 L 88 181 L 87 188 L 89 188 L 92 186 L 97 185 L 99 183 L 102 184 L 107 201 L 107 205 L 108 209 L 113 224 L 114 222 L 118 229 L 122 234 L 127 239 L 135 251 L 136 254 L 136 258 L 134 261 L 134 264 L 131 268 L 131 273 L 129 278 L 129 288 L 127 293 L 125 294 L 123 293 L 118 288 L 109 275 L 106 270 L 104 265 L 102 263 L 105 269 L 116 287 L 120 291 L 121 293 L 108 294 L 106 293 L 104 290 L 101 288 L 98 287 L 92 288 L 90 287 L 88 279 L 87 277 L 84 274 L 84 271 L 88 258 L 89 253 L 89 248 L 89 250 L 88 251 L 88 255 L 84 270 L 80 273 L 81 264 L 78 260 L 78 253 L 79 252 L 79 245 L 77 242 L 77 220 L 75 203 L 73 195 L 71 190 L 69 188 L 69 186 L 65 180 L 63 178 L 64 181 L 66 183 L 72 195 L 74 201 L 75 206 L 74 214 L 72 211 L 70 206 L 62 195 L 53 186 L 50 185 L 45 180 L 42 178 L 36 175 L 32 174 L 27 175 L 22 178 L 19 181 L 18 179 L 22 174 L 24 170 L 27 167 L 27 166 Z M 173 137 L 176 140 L 178 143 L 187 161 L 188 167 L 191 172 L 194 181 L 193 185 L 190 182 L 188 181 L 183 181 L 181 183 L 181 190 L 179 195 L 177 197 L 175 191 L 173 172 L 173 157 L 172 142 Z M 111 129 L 112 143 L 117 164 L 120 171 L 119 174 L 116 172 L 114 172 L 111 173 L 108 175 L 106 177 L 106 178 L 101 182 L 97 184 L 91 186 L 88 185 L 89 180 L 91 175 L 92 170 L 93 158 L 95 150 L 96 148 L 103 141 L 105 138 L 106 135 L 108 132 Z M 170 118 L 171 139 L 168 159 L 166 164 L 167 174 L 166 165 L 170 155 L 172 158 L 173 163 L 172 181 L 163 184 L 158 184 L 155 185 L 152 187 L 152 188 L 150 191 L 155 186 L 158 184 L 167 184 L 172 182 L 173 185 L 168 199 L 165 205 L 155 221 L 152 224 L 146 233 L 145 237 L 139 249 L 137 251 L 133 246 L 130 239 L 130 213 L 128 209 L 120 198 L 119 193 L 118 191 L 120 189 L 122 180 L 125 181 L 126 182 L 128 182 L 121 179 L 121 173 L 118 165 L 117 157 L 115 153 L 114 149 L 112 129 L 113 122 L 116 125 L 120 127 L 126 133 L 127 135 L 125 132 L 130 132 L 134 135 L 138 136 L 146 136 L 150 135 L 156 132 L 162 127 Z M 102 98 L 103 102 L 101 100 Z M 94 90 L 96 91 L 100 95 L 98 97 L 101 98 L 102 102 L 99 103 L 105 104 L 107 106 L 108 110 L 106 112 L 104 112 L 102 111 L 101 109 L 95 104 L 92 98 L 92 96 Z M 92 89 L 94 87 L 96 89 Z M 99 83 L 100 86 L 99 89 L 97 87 L 96 85 Z M 180 79 L 182 81 L 183 81 L 184 92 L 181 98 L 179 100 L 179 101 L 178 102 L 174 102 L 173 99 L 174 97 L 177 94 L 178 94 L 180 92 L 176 93 L 176 87 L 177 83 L 178 81 Z M 97 77 L 98 81 L 96 83 L 94 81 L 95 78 Z M 182 77 L 180 78 L 178 80 L 177 78 L 179 76 Z M 173 70 L 175 72 L 177 73 L 173 74 Z M 167 68 L 169 75 L 167 73 L 166 71 Z M 100 67 L 100 69 L 99 70 L 99 73 L 97 75 L 97 76 L 93 76 L 94 70 L 92 73 L 90 81 L 89 83 L 87 84 L 86 72 L 87 69 L 89 67 L 97 66 Z M 86 67 L 81 69 L 83 66 Z M 107 64 L 107 66 L 103 72 L 100 72 L 101 68 L 103 65 Z M 114 60 L 114 65 L 111 70 L 104 74 L 110 67 L 112 62 Z M 176 57 L 179 60 L 180 60 L 182 62 L 182 64 L 184 66 L 183 74 L 180 71 L 178 68 L 177 65 L 175 63 L 174 60 Z M 118 57 L 120 60 L 118 64 L 115 67 L 114 65 L 116 62 L 116 59 Z M 80 54 L 80 60 L 81 63 L 79 65 L 77 62 L 77 60 L 78 57 Z M 191 50 L 194 53 L 195 55 L 195 60 L 192 63 L 189 62 Z M 120 50 L 118 57 L 118 54 Z M 87 47 L 88 49 L 86 51 L 85 49 Z M 112 45 L 110 47 L 110 48 L 107 51 L 103 59 L 98 64 L 94 66 L 89 64 L 91 62 L 84 65 L 80 65 L 82 63 L 85 57 L 85 53 L 86 51 L 90 46 L 94 45 L 92 49 L 95 45 L 101 46 L 97 50 L 97 51 L 95 54 L 96 52 L 100 48 L 105 45 Z M 130 44 L 130 47 L 128 57 Z M 182 42 L 184 41 L 186 43 L 184 44 Z M 140 41 L 142 43 L 148 42 L 153 44 L 156 47 L 156 55 L 155 59 L 154 61 L 147 67 L 149 67 L 153 64 L 157 58 L 158 61 L 156 66 L 150 71 L 152 71 L 154 70 L 161 62 L 163 65 L 164 70 L 165 72 L 170 77 L 170 79 L 171 77 L 173 80 L 174 93 L 172 112 L 170 117 L 158 129 L 154 132 L 150 134 L 144 135 L 138 135 L 126 130 L 124 128 L 122 128 L 117 125 L 114 122 L 111 117 L 106 105 L 106 102 L 104 99 L 103 89 L 101 85 L 102 81 L 107 86 L 104 81 L 105 75 L 107 74 L 109 74 L 113 71 L 120 63 L 123 64 L 121 68 L 118 71 L 124 66 L 128 70 L 126 68 L 125 66 L 125 62 L 127 58 L 129 62 L 133 67 L 136 69 L 138 69 L 133 65 L 132 63 L 133 61 L 131 57 L 131 48 L 134 43 L 136 42 L 138 43 Z M 119 42 L 119 44 L 118 45 L 118 48 L 115 53 L 107 61 L 103 61 L 107 57 L 110 52 L 108 51 L 111 47 Z M 154 39 L 156 38 L 158 40 L 156 41 Z M 90 32 L 91 34 L 89 36 L 89 37 L 86 36 Z M 156 28 L 158 28 L 160 27 L 163 28 L 165 27 L 167 28 L 169 30 L 168 28 L 167 28 L 165 26 L 172 26 L 181 36 L 182 36 L 184 38 L 179 38 L 174 35 L 171 32 L 172 34 L 175 36 L 174 37 L 184 47 L 186 51 L 185 54 L 187 57 L 186 58 L 188 61 L 186 62 L 183 59 L 180 54 L 180 58 L 175 53 L 172 49 L 172 47 L 168 40 L 172 56 L 175 62 L 175 65 L 177 69 L 176 72 L 167 62 L 166 59 L 166 56 L 167 55 L 167 50 L 166 52 L 165 63 L 163 59 L 163 48 L 163 53 L 162 58 L 160 61 L 159 43 L 161 43 L 160 41 L 160 39 L 159 37 L 155 34 L 153 37 L 151 37 L 149 35 L 150 35 L 152 33 L 154 32 L 159 32 L 165 36 L 161 32 L 159 31 L 153 30 Z M 111 25 L 94 42 L 89 44 L 88 42 L 85 42 L 87 39 L 90 38 L 98 32 L 99 29 L 102 27 L 108 24 Z M 154 25 L 157 23 L 162 24 L 160 25 L 162 26 L 159 27 L 158 26 Z M 146 18 L 147 22 L 145 20 Z M 123 19 L 120 21 L 115 23 L 110 24 L 105 24 L 97 25 L 99 23 L 101 23 L 104 20 L 107 19 L 114 18 Z M 159 20 L 164 17 L 170 17 L 172 19 L 173 19 L 173 26 L 168 23 Z M 135 13 L 142 16 L 144 18 L 136 18 L 135 19 L 133 19 L 138 19 L 144 22 L 144 26 L 135 25 L 130 28 L 134 26 L 145 26 L 149 31 L 148 36 L 147 33 L 145 31 L 138 31 L 136 33 L 133 34 L 133 35 L 131 37 L 130 39 L 130 41 L 128 41 L 127 43 L 126 47 L 126 53 L 123 60 L 121 52 L 121 46 L 123 43 L 120 46 L 119 44 L 121 39 L 123 37 L 125 32 L 126 32 L 128 30 L 122 35 L 112 41 L 109 42 L 106 42 L 104 44 L 98 44 L 95 43 L 100 38 L 99 37 L 106 31 L 116 26 L 119 26 L 120 25 L 122 25 L 118 25 L 110 27 L 112 25 L 118 22 L 124 20 L 126 18 L 129 18 L 127 18 L 126 17 L 120 16 L 123 14 L 126 13 L 127 15 L 128 13 Z M 124 11 L 119 15 L 117 15 L 115 17 L 111 17 L 110 18 L 107 17 L 111 13 L 117 10 Z M 132 8 L 134 6 L 138 5 L 141 5 L 145 6 L 147 8 L 148 8 L 149 9 L 149 10 L 151 12 L 152 14 L 151 19 L 147 15 L 139 10 Z" />
</svg></div><span id="label-men" className="text-xs sm:text-sm font-extrabold tracking-widest text-[#c8002e] group-hover:text-[#c8002e] uppercase transition-colors">MEN</span></button><div className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 border border-stone-200 bg-[#fdfdfd] shadow-xs flex flex-col items-center justify-center p-3 text-center rounded-[6px]" style={{ borderColor: "#f2f2f2" }}><span className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#c8002e] tracking-tight leading-none font-sans">Most</span><span className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#c8002e] tracking-tight leading-none font-sans my-1 sm:my-1.5">Loved</span><span className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#c8002e] tracking-tight leading-none font-sans">Styles</span></div><button type="button" id="btn-toggle-women" onClick={() => handleGenderSwitch('women')} className="group flex flex-col items-center justify-center gap-2 text-center cursor-pointer outline-none"><div id="icon-wrap-women" className="w-20 h-28 sm:w-24 sm:h-32 flex items-center justify-center text-[#333333] group-hover:text-[#c8002e] transition-all"><svg viewBox="0 0 274 440" fill="currentColor" fillRule="evenodd" className="w-full h-full drop-shadow-xs">
  <path d="M 184 257 L 182 259 L 182 260 L 177 265 L 177 266 L 172 271 L 168 277 L 167 280 L 165 282 L 164 285 L 166 283 L 172 273 L 181 262 Z M 109 51 L 109 53 L 108 54 L 108 57 L 103 71 L 95 84 L 84 95 L 75 102 L 73 103 L 75 102 L 77 100 L 80 99 L 88 93 L 94 87 L 97 83 L 102 75 L 105 68 L 107 62 L 108 55 L 109 54 Z M 171 32 L 177 40 L 179 44 L 178 41 L 176 38 L 172 34 Z M 137 1 L 129 1 L 120 3 L 112 7 L 106 11 L 101 16 L 100 16 L 96 20 L 96 21 L 91 26 L 86 33 L 83 38 L 74 57 L 70 70 L 71 72 L 69 74 L 64 77 L 55 86 L 52 90 L 47 100 L 46 106 L 46 111 L 47 116 L 50 121 L 44 127 L 42 130 L 38 139 L 38 147 L 41 154 L 44 157 L 41 153 L 39 148 L 39 140 L 42 132 L 48 125 L 49 127 L 47 130 L 46 136 L 46 142 L 48 149 L 50 153 L 54 158 L 57 165 L 53 169 L 46 173 L 36 176 L 29 179 L 24 182 L 20 186 L 19 186 L 16 189 L 12 195 L 10 201 L 10 210 L 11 224 L 13 229 L 15 232 L 20 237 L 22 242 L 22 253 L 20 257 L 18 259 L 18 260 L 13 264 L 10 265 L 3 265 L 0 263 L 2 265 L 4 266 L 12 266 L 18 263 L 23 258 L 24 261 L 23 264 L 20 269 L 14 277 L 11 283 L 10 287 L 10 294 L 12 300 L 15 303 L 15 304 L 17 306 L 19 307 L 15 303 L 13 300 L 11 294 L 11 289 L 12 284 L 15 278 L 18 275 L 19 279 L 18 288 L 22 297 L 27 302 L 27 308 L 23 324 L 16 337 L 16 342 L 24 356 L 25 359 L 25 363 L 26 367 L 27 368 L 26 381 L 27 383 L 31 387 L 34 389 L 37 390 L 39 392 L 40 392 L 41 393 L 43 398 L 45 401 L 48 404 L 52 406 L 59 405 L 63 407 L 58 412 L 47 428 L 47 430 L 45 432 L 43 438 L 45 436 L 49 428 L 61 411 L 66 406 L 70 405 L 68 405 L 67 404 L 65 404 L 63 403 L 61 401 L 59 397 L 59 391 L 61 385 L 65 378 L 63 380 L 60 385 L 58 393 L 58 398 L 59 400 L 62 403 L 51 404 L 45 398 L 42 393 L 42 389 L 44 384 L 48 377 L 53 370 L 62 361 L 68 361 L 77 364 L 83 365 L 98 366 L 96 367 L 89 375 L 83 384 L 77 397 L 77 402 L 78 404 L 81 407 L 77 408 L 79 409 L 81 409 L 85 407 L 91 402 L 103 402 L 129 399 L 135 398 L 141 396 L 147 396 L 152 395 L 157 393 L 162 393 L 170 391 L 171 390 L 173 390 L 179 392 L 184 397 L 187 399 L 192 401 L 203 416 L 210 430 L 210 432 L 214 438 L 210 426 L 203 413 L 201 410 L 198 407 L 197 402 L 198 402 L 200 400 L 202 399 L 207 399 L 208 400 L 213 400 L 217 397 L 219 397 L 225 399 L 234 399 L 236 398 L 242 392 L 246 385 L 256 375 L 258 371 L 258 364 L 256 360 L 256 354 L 259 344 L 263 335 L 271 323 L 271 315 L 269 312 L 266 302 L 263 284 L 263 263 L 265 253 L 265 224 L 264 219 L 262 213 L 259 208 L 253 202 L 246 199 L 228 196 L 231 191 L 232 188 L 232 185 L 230 179 L 228 176 L 221 169 L 212 162 L 209 158 L 205 149 L 205 136 L 206 133 L 216 124 L 218 121 L 221 114 L 221 104 L 220 101 L 217 95 L 210 84 L 203 77 L 194 50 L 187 36 L 177 22 L 171 16 L 164 11 L 159 9 L 151 10 L 148 9 L 147 6 L 146 5 L 145 5 L 143 3 L 141 2 Z M 79 403 L 88 403 L 86 405 L 80 406 Z M 183 394 L 186 393 L 193 395 L 188 398 Z M 79 400 L 79 396 L 84 385 L 94 371 L 98 367 L 102 365 L 120 371 L 130 376 L 135 377 L 140 380 L 148 383 L 151 383 L 157 386 L 163 387 L 166 389 L 164 391 L 138 396 L 132 396 L 126 398 L 95 401 Z M 210 343 L 212 344 L 219 351 L 226 364 L 227 368 L 227 376 L 226 380 L 222 389 L 218 395 L 215 398 L 213 399 L 210 399 L 206 398 L 204 396 L 207 393 L 211 385 L 211 383 L 213 380 L 213 378 L 211 383 L 205 394 L 199 400 L 197 401 L 195 401 L 192 400 L 189 398 L 193 397 L 197 393 L 198 389 L 198 374 L 197 369 L 194 361 L 190 354 L 184 347 L 182 347 L 180 345 L 202 343 Z M 27 358 L 28 355 L 33 356 L 32 372 L 34 373 L 36 372 L 38 370 L 40 366 L 43 363 L 44 366 L 48 359 L 50 357 L 53 355 L 61 352 L 59 352 L 58 353 L 55 354 L 52 354 L 47 356 L 41 362 L 38 368 L 33 369 L 34 357 L 38 349 L 42 345 L 61 336 L 57 338 L 54 338 L 45 341 L 40 345 L 39 345 L 35 350 L 35 351 L 33 353 L 29 352 L 31 349 L 32 345 L 42 335 L 46 335 L 50 333 L 59 331 L 67 331 L 76 333 L 80 335 L 93 338 L 110 341 L 124 342 L 131 344 L 161 347 L 178 347 L 183 348 L 187 352 L 194 365 L 197 375 L 197 388 L 196 391 L 194 393 L 190 393 L 189 392 L 184 392 L 168 388 L 150 382 L 126 373 L 113 367 L 105 364 L 100 363 L 85 364 L 79 363 L 70 360 L 59 360 L 54 362 L 52 364 L 51 364 L 46 371 L 48 370 L 53 364 L 57 364 L 51 370 L 48 374 L 42 385 L 42 387 L 41 389 L 39 390 L 32 386 L 29 383 L 28 381 L 28 365 Z M 256 298 L 252 301 L 242 301 L 233 303 L 227 308 L 220 311 L 214 312 L 212 314 L 211 316 L 214 313 L 223 309 L 233 306 L 236 306 L 237 305 L 239 305 L 252 310 L 257 315 L 260 316 L 260 320 L 258 320 L 254 318 L 252 316 L 242 312 L 236 312 L 224 316 L 223 317 L 221 317 L 224 317 L 225 316 L 228 316 L 232 314 L 236 313 L 241 313 L 249 316 L 254 319 L 257 322 L 258 322 L 259 326 L 256 326 L 249 322 L 241 320 L 237 320 L 230 322 L 227 324 L 224 325 L 229 323 L 237 321 L 240 321 L 241 322 L 245 322 L 250 324 L 252 327 L 254 328 L 249 329 L 237 328 L 234 329 L 228 332 L 217 344 L 214 344 L 211 342 L 202 342 L 201 343 L 192 342 L 194 340 L 194 339 L 197 336 L 210 313 L 214 309 L 220 305 L 229 297 L 232 296 L 244 295 L 250 296 Z M 26 266 L 28 272 L 29 291 L 27 300 L 23 296 L 20 290 L 19 286 L 19 282 L 21 274 L 23 270 Z M 26 257 L 27 263 L 26 265 L 24 267 L 24 264 Z M 25 248 L 25 251 L 24 255 L 23 250 Z M 122 200 L 127 199 L 130 201 L 132 205 L 132 227 L 130 226 L 124 220 L 123 218 L 121 203 Z M 203 193 L 205 193 L 210 196 L 223 199 L 233 199 L 244 200 L 247 201 L 253 204 L 257 208 L 261 215 L 263 222 L 264 231 L 264 243 L 263 244 L 263 257 L 261 280 L 260 281 L 260 287 L 261 284 L 263 288 L 263 294 L 265 304 L 270 317 L 270 321 L 267 327 L 263 332 L 258 342 L 255 351 L 255 360 L 257 365 L 257 369 L 255 374 L 246 382 L 240 392 L 236 396 L 232 398 L 223 397 L 219 395 L 223 390 L 226 384 L 229 374 L 229 370 L 227 363 L 222 353 L 220 350 L 216 346 L 225 345 L 228 346 L 237 351 L 245 359 L 249 366 L 249 369 L 249 364 L 248 361 L 242 353 L 237 349 L 230 345 L 227 344 L 220 343 L 223 340 L 223 339 L 229 333 L 238 329 L 248 330 L 254 330 L 256 329 L 258 327 L 260 327 L 262 326 L 262 324 L 260 322 L 263 320 L 263 318 L 258 313 L 253 309 L 240 304 L 244 302 L 253 302 L 255 301 L 257 299 L 256 296 L 251 296 L 246 294 L 241 294 L 231 296 L 227 295 L 240 282 L 246 274 L 246 273 L 248 271 L 244 275 L 244 276 L 233 287 L 224 297 L 221 302 L 214 308 L 214 303 L 216 300 L 219 287 L 219 278 L 221 269 L 233 246 L 251 216 L 249 218 L 249 219 L 246 222 L 227 254 L 222 264 L 221 261 L 222 260 L 224 249 L 230 232 L 239 213 L 232 225 L 226 239 L 222 251 L 220 259 L 218 271 L 218 282 L 216 295 L 213 303 L 207 316 L 199 330 L 193 339 L 189 343 L 180 343 L 176 346 L 170 346 L 165 344 L 177 332 L 191 315 L 201 300 L 202 297 L 197 305 L 183 323 L 170 338 L 163 345 L 157 345 L 155 344 L 154 339 L 155 338 L 155 333 L 158 322 L 162 296 L 162 279 L 161 273 L 158 262 L 156 259 L 155 256 L 155 253 L 158 244 L 161 238 L 167 230 L 175 223 L 179 221 L 184 216 L 187 208 L 190 205 L 197 212 L 203 217 L 210 221 L 212 221 L 209 211 L 204 198 L 202 195 Z M 94 188 L 94 192 L 88 194 L 81 194 L 74 191 L 78 190 L 84 191 L 90 190 Z M 42 190 L 47 188 L 52 187 L 59 187 L 65 188 L 68 189 L 75 193 L 83 195 L 87 195 L 94 194 L 94 201 L 93 209 L 92 210 L 91 221 L 93 220 L 95 220 L 104 215 L 112 209 L 114 206 L 121 203 L 120 210 L 119 208 L 120 212 L 122 215 L 122 219 L 125 224 L 137 239 L 141 246 L 145 258 L 148 274 L 148 282 L 148 270 L 146 259 L 142 247 L 133 229 L 137 233 L 138 233 L 145 240 L 149 246 L 154 256 L 158 267 L 160 275 L 161 282 L 161 294 L 153 342 L 151 344 L 144 344 L 139 342 L 142 324 L 145 314 L 146 308 L 146 302 L 147 296 L 148 295 L 148 292 L 148 294 L 147 295 L 147 299 L 146 300 L 145 309 L 141 324 L 141 330 L 139 336 L 138 343 L 135 343 L 127 341 L 119 341 L 106 339 L 100 337 L 100 332 L 102 325 L 102 312 L 101 305 L 100 304 L 100 301 L 100 306 L 101 307 L 101 322 L 100 331 L 98 337 L 94 337 L 87 335 L 84 331 L 84 329 L 90 314 L 92 303 L 92 292 L 92 298 L 89 314 L 85 326 L 83 329 L 81 327 L 81 313 L 80 306 L 79 302 L 76 295 L 75 290 L 75 268 L 77 259 L 77 235 L 76 228 L 73 216 L 71 213 L 71 211 L 71 213 L 72 214 L 73 217 L 76 235 L 73 255 L 73 248 L 70 234 L 67 225 L 64 218 L 60 211 L 54 203 L 51 201 L 54 204 L 54 205 L 57 208 L 59 211 L 66 225 L 70 238 L 71 244 L 71 249 L 72 250 L 71 255 L 69 249 L 67 246 L 67 244 L 67 246 L 68 247 L 68 249 L 70 252 L 73 263 L 72 285 L 70 282 L 70 280 L 68 278 L 65 270 L 61 264 L 61 262 L 51 244 L 49 242 L 46 236 L 48 239 L 48 241 L 50 243 L 50 245 L 71 285 L 76 297 L 79 308 L 80 317 L 79 333 L 77 332 L 74 329 L 73 326 L 64 316 L 53 307 L 49 305 L 46 302 L 44 301 L 47 304 L 48 304 L 54 309 L 66 320 L 73 331 L 70 331 L 67 330 L 64 328 L 53 325 L 42 325 L 36 327 L 32 329 L 30 331 L 35 328 L 42 326 L 52 326 L 56 327 L 60 329 L 57 331 L 49 332 L 45 334 L 41 334 L 31 344 L 31 347 L 26 357 L 18 343 L 18 336 L 24 326 L 28 311 L 29 304 L 31 305 L 31 297 L 30 296 L 30 279 L 28 263 L 27 244 L 27 225 L 28 215 L 29 210 L 31 204 L 35 197 Z M 101 186 L 97 190 L 96 188 Z M 39 185 L 41 187 L 31 195 L 25 203 L 23 208 L 24 205 L 26 202 L 34 193 L 35 195 L 31 200 L 27 212 L 26 218 L 25 231 L 23 229 L 21 223 L 21 213 L 22 212 L 22 210 L 21 212 L 20 217 L 20 221 L 21 222 L 21 227 L 25 235 L 25 238 L 26 239 L 25 242 L 23 240 L 21 236 L 17 232 L 13 225 L 12 222 L 12 215 L 14 209 L 16 205 L 19 201 L 27 193 L 35 187 Z M 223 172 L 229 179 L 231 184 L 231 190 L 229 195 L 227 197 L 222 196 L 225 191 L 226 185 L 224 178 L 223 176 L 220 173 Z M 53 170 L 54 172 L 49 177 L 33 187 L 25 193 L 18 200 L 12 210 L 11 201 L 12 198 L 16 191 L 20 187 L 25 183 L 37 177 L 49 173 L 51 171 Z M 196 169 L 198 173 L 203 178 L 207 183 L 210 189 L 209 194 L 201 190 L 199 188 L 199 180 L 195 172 Z M 177 165 L 179 166 L 184 171 L 193 184 L 198 189 L 206 206 L 208 219 L 204 216 L 193 205 L 191 204 L 189 204 L 186 207 L 183 215 L 179 219 L 174 222 L 169 224 L 174 216 L 177 208 L 179 206 L 180 204 L 182 195 L 182 179 L 180 172 L 178 170 L 180 174 L 179 180 L 175 170 Z M 121 162 L 122 169 L 120 175 L 118 178 L 117 169 L 119 166 L 117 168 L 116 170 L 116 180 L 120 191 L 122 194 L 126 198 L 120 199 L 116 202 L 107 211 L 103 214 L 98 217 L 92 218 L 96 192 L 105 183 L 107 180 L 107 178 L 113 168 L 117 164 Z M 177 144 L 178 152 L 181 164 L 181 167 L 176 163 L 175 160 L 175 148 Z M 169 131 L 170 148 L 172 164 L 174 172 L 178 182 L 181 185 L 181 191 L 180 198 L 178 200 L 166 200 L 161 202 L 159 204 L 166 201 L 179 202 L 178 206 L 174 214 L 171 219 L 167 224 L 159 238 L 155 248 L 154 252 L 152 250 L 152 248 L 145 237 L 141 232 L 134 226 L 133 224 L 133 203 L 132 201 L 129 198 L 128 198 L 124 194 L 122 191 L 119 185 L 118 182 L 118 180 L 121 176 L 123 171 L 124 164 L 123 149 L 125 141 L 132 145 L 137 147 L 141 148 L 145 148 L 149 147 L 155 144 L 159 141 Z M 205 126 L 205 132 L 204 134 L 201 137 L 203 135 L 204 138 L 203 151 L 204 155 L 207 161 L 210 165 L 214 169 L 215 169 L 220 174 L 223 179 L 224 182 L 224 189 L 222 194 L 220 196 L 215 196 L 211 194 L 211 190 L 208 183 L 200 174 L 194 163 L 193 158 L 193 147 L 194 143 L 200 132 Z M 83 110 L 83 112 L 81 116 L 81 125 L 84 132 L 92 143 L 95 149 L 96 152 L 96 164 L 93 170 L 88 176 L 84 179 L 76 183 L 70 185 L 64 186 L 48 187 L 45 186 L 48 183 L 51 181 L 56 179 L 64 174 L 68 170 L 69 170 L 72 167 L 72 166 L 76 162 L 81 151 L 82 147 L 82 140 L 82 145 L 79 155 L 73 164 L 67 170 L 57 177 L 55 178 L 53 177 L 49 181 L 46 183 L 42 183 L 53 174 L 58 169 L 60 165 L 61 161 L 60 145 L 59 140 L 60 139 L 60 134 L 61 131 L 65 123 L 76 112 L 79 110 Z M 91 107 L 93 109 L 93 114 L 96 122 L 100 129 L 102 131 L 103 134 L 96 119 L 96 114 L 101 119 L 105 119 L 107 121 L 110 128 L 112 131 L 120 138 L 121 140 L 122 145 L 122 160 L 120 162 L 116 161 L 119 151 L 119 146 L 118 145 L 118 141 L 118 152 L 115 162 L 111 169 L 111 157 L 110 149 L 109 146 L 106 141 L 109 148 L 110 158 L 108 170 L 105 177 L 101 182 L 96 186 L 92 188 L 89 189 L 73 189 L 68 187 L 81 184 L 89 180 L 93 176 L 97 169 L 98 165 L 98 156 L 94 142 L 99 148 L 102 153 L 105 162 L 105 167 L 105 160 L 103 154 L 100 148 L 96 142 L 90 136 L 88 133 L 85 126 L 84 121 L 84 117 L 85 112 L 87 108 L 89 107 Z M 91 103 L 91 106 L 87 106 L 89 104 Z M 99 102 L 101 104 L 103 108 L 103 112 L 105 115 L 104 118 L 102 118 L 97 113 L 94 108 L 94 106 L 97 103 Z M 217 100 L 219 102 L 220 105 L 220 113 L 219 117 L 216 122 L 208 130 L 207 126 L 209 122 L 209 117 L 214 110 L 216 106 Z M 98 97 L 99 100 L 93 102 Z M 191 96 L 192 104 L 191 110 L 187 121 L 181 134 L 177 140 L 175 145 L 173 154 L 172 127 L 177 119 L 179 108 L 183 108 L 187 104 Z M 103 92 L 104 94 L 101 98 L 100 95 Z M 196 85 L 200 87 L 206 93 L 209 99 L 210 103 L 210 111 L 209 115 L 204 125 L 198 133 L 194 141 L 192 148 L 192 165 L 194 171 L 199 180 L 198 187 L 192 180 L 185 170 L 181 162 L 179 154 L 179 144 L 180 139 L 183 130 L 190 117 L 193 105 L 194 92 L 196 97 L 196 105 L 196 92 L 193 86 Z M 190 85 L 190 94 L 186 103 L 183 106 L 179 106 L 179 94 L 181 89 L 183 92 L 182 87 L 185 84 Z M 179 77 L 183 80 L 189 82 L 180 82 L 179 81 Z M 159 44 L 162 49 L 166 59 L 166 62 L 171 70 L 178 77 L 176 80 L 168 72 L 162 60 L 158 47 Z M 150 35 L 154 34 L 157 35 L 160 37 L 167 44 L 175 55 L 186 66 L 184 67 L 178 63 L 182 67 L 187 70 L 196 74 L 202 78 L 212 88 L 212 90 L 214 92 L 216 97 L 216 104 L 214 108 L 213 100 L 210 94 L 203 87 L 195 83 L 191 83 L 180 77 L 175 72 L 169 64 L 165 56 L 164 51 L 159 41 L 156 38 Z M 125 32 L 131 31 L 134 33 L 131 34 L 130 33 Z M 134 28 L 136 29 L 139 32 L 140 34 L 140 37 L 144 39 L 146 39 L 152 42 L 156 46 L 158 49 L 162 63 L 166 71 L 168 74 L 174 80 L 177 82 L 178 82 L 179 94 L 177 112 L 174 122 L 170 128 L 160 138 L 152 144 L 147 146 L 139 146 L 133 144 L 127 141 L 121 137 L 112 128 L 110 125 L 107 116 L 103 109 L 103 106 L 101 103 L 101 100 L 106 93 L 110 83 L 113 71 L 114 63 L 114 55 L 115 50 L 117 46 L 121 42 L 125 41 L 121 40 L 125 38 L 132 39 L 129 37 L 125 37 L 122 38 L 120 40 L 119 38 L 122 35 L 125 34 L 131 34 L 133 35 L 136 38 L 137 36 L 138 38 L 138 36 L 137 34 L 134 31 L 128 29 Z M 167 15 L 178 26 L 185 36 L 190 45 L 195 57 L 200 71 L 199 75 L 197 73 L 196 73 L 186 65 L 175 54 L 167 43 L 160 36 L 153 33 L 144 34 L 144 28 L 147 25 L 152 23 L 156 23 L 164 26 L 166 28 L 163 25 L 157 22 L 152 22 L 145 24 L 145 20 L 143 16 L 140 13 L 136 11 L 133 11 L 132 10 L 130 10 L 132 10 L 138 13 L 142 17 L 142 21 L 138 17 L 133 15 L 127 15 L 120 17 L 115 20 L 108 27 L 104 33 L 101 39 L 103 35 L 109 27 L 114 22 L 123 17 L 127 16 L 131 16 L 137 18 L 141 25 L 139 23 L 137 22 L 141 26 L 143 30 L 142 33 L 138 28 L 135 27 L 128 27 L 124 29 L 120 33 L 117 38 L 114 47 L 113 52 L 112 68 L 109 80 L 104 89 L 93 100 L 89 103 L 84 106 L 75 110 L 67 115 L 59 123 L 57 126 L 55 130 L 55 132 L 54 133 L 54 135 L 54 133 L 57 127 L 60 123 L 66 120 L 63 124 L 60 130 L 58 139 L 58 145 L 60 153 L 60 159 L 58 162 L 56 160 L 48 145 L 48 131 L 52 123 L 57 116 L 65 108 L 66 108 L 68 106 L 66 108 L 64 108 L 61 110 L 56 115 L 56 112 L 58 104 L 60 99 L 65 90 L 67 83 L 69 80 L 69 78 L 68 81 L 66 83 L 57 102 L 54 111 L 54 115 L 53 118 L 49 119 L 47 114 L 47 104 L 48 100 L 51 94 L 57 86 L 63 80 L 69 75 L 75 71 L 83 64 L 92 54 L 95 49 L 92 52 L 92 53 L 78 67 L 73 67 L 75 59 L 80 47 L 85 38 L 91 29 L 95 24 L 105 14 L 110 10 L 117 6 L 126 3 L 139 3 L 143 5 L 146 12 L 147 18 L 148 12 L 153 10 L 157 10 L 160 11 Z" />
</svg></div><span id="label-women" className="text-xs sm:text-sm font-extrabold tracking-widest text-[#333333] group-hover:text-[#c8002e] uppercase transition-colors">WOMEN</span></button></div><div className="w-full border-t border-[#f2eded] pt-8"><div id="gender-subnav-men" className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pb-8 text-xs sm:text-sm font-bold tracking-wider uppercase select-none"><button type="button" onClick={(e) => handleSubTab(e)} className="subtab-item text-black border-b-2 border-black pb-1.5 transition-colors font-extrabold cursor-pointer">CASUAL WEAR</button><button type="button" onClick={(e) => handleSubTab(e)} className="subtab-item text-gray-400 hover:text-black pb-1.5 transition-colors cursor-pointer">ETHNIC WEAR</button><button type="button" onClick={(e) => handleSubTab(e)} className="subtab-item text-gray-400 hover:text-black pb-1.5 transition-colors cursor-pointer">ATHLEISURE</button><button type="button" onClick={(e) => handleSubTab(e)} className="subtab-item text-gray-400 hover:text-black pb-1.5 transition-colors cursor-pointer">ACCESSORIES</button></div><div id="gender-subnav-women" className="hidden flex-wrap items-center justify-center gap-6 sm:gap-10 pb-8 text-xs sm:text-sm font-bold tracking-wider uppercase select-none"><button type="button" onClick={(e) => handleSubTab(e)} className="subtab-item text-black border-b-2 border-black pb-1.5 transition-colors font-extrabold cursor-pointer">WESTERN WEAR</button><button type="button" onClick={(e) => handleSubTab(e)} className="subtab-item text-gray-400 hover:text-black pb-1.5 transition-colors cursor-pointer">ETHNIC &amp; FUSION WEAR</button><button type="button" onClick={(e) => handleSubTab(e)} className="subtab-item text-gray-400 hover:text-black pb-1.5 transition-colors cursor-pointer">ATHLEISURE</button><button type="button" onClick={(e) => handleSubTab(e)} className="subtab-item text-gray-400 hover:text-black pb-1.5 transition-colors cursor-pointer">LOUNGEWEAR</button><button type="button" onClick={(e) => handleSubTab(e)} className="subtab-item text-gray-400 hover:text-black pb-1.5 transition-colors cursor-pointer">INTIMATE WEAR</button><button type="button" onClick={(e) => handleSubTab(e)} className="subtab-item text-gray-400 hover:text-black pb-1.5 transition-colors cursor-pointer">ACCESSORIES</button></div><div id="products-grid-men" className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2 md:gap-2.5 mb-8"><div className="bg-white flex flex-col justify-between group product-card rounded-[6px] border border-stone-200/70 p-2 shadow-xs"><div className="relative aspect-[3/4] bg-stone-100 overflow-hidden mb-2 rounded-[4px]"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEZWg_Qcw-XrvHDafNBvoqtwZzN9Zj2Axao8bXj_8oykAGO9lUo6LwB_F2Rgs-q9lfYrzwqI1ip_c87XMcTqh98ls2Y1zaHXvLke94RFLLrym5vwqfntMB0bExAZCFXW4hJY0wZHxgXXiOy_MhOrMjUmdtHXJxyiW01veWxVyVBD2yrQj1o4098-Q3D2onxbiD2giCuBI5o2tak50C1zZhefvNekUmZOVOweCs_Q" alt="Double Dyed Crew Tee" className="w-full h-full object-cover object-top" /><Link href="/wishlist" className="absolute top-3 right-3 text-stone-700 hover:text-[#c8002e] transition-colors"><i className="fa-regular fa-heart text-base"></i></Link><div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 z-10"><span className="w-3.5 h-3.5 rounded-full bg-stone-200 border border-white"></span><span className="w-3.5 h-3.5 rounded-full bg-stone-700 border border-white"></span><span className="text-[10px] font-bold text-stone-800 bg-white/90 px-1 rounded">+17</span></div><Link href="/product/p1" className="absolute bottom-2.5 right-2.5 bg-[#c8002e] hover:bg-black text-white text-[9px] font-bold px-2.5 py-1 tracking-wider uppercase transition-colors shadow-sm rounded-[3px]">QUICK SHOP</Link><Link href="/cart" className="absolute bottom-0 inset-x-0 w-full z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white hover:bg-stone-100 text-stone-900 border-t border-stone-200 text-xs font-bold py-2.5 flex items-center justify-center gap-1.5 shadow-md uppercase tracking-wider"><i className="fa-solid fa-bag-shopping text-xs"></i><span className="">Add to Cart</span></Link></div><div><h4 className="text-sm font-bold text-gray-900 leading-snug mb-1">Double Dyed Crew Tee - Regular Fit</h4><p className="text-xs text-gray-500 line-clamp-1 mb-2">Must Have Essential Tee With Super Soft...</p><div className="flex items-baseline gap-1.5 flex-wrap mt-1"><span className="text-sm font-bold text-gray-900">₹ 199</span><span className="text-xs text-gray-400 line-through">₹ 699</span><span className="text-[11px] font-bold text-[#c8002e]">(71% OFF)</span></div></div></div><div className="bg-white flex flex-col justify-between group product-card rounded-[6px] border border-stone-200/70 p-2 shadow-xs"><div className="relative aspect-[3/4] bg-stone-100 overflow-hidden mb-2 rounded-[4px]"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuANloF4NtMQvzqWT5Ncv7nGp3w3jhqgnvCuYWqCEA4DYpGO8vZ6f4vqUbsFMKiNqTsFKy_hsHt-6V3_qRaNbOd-xfQRmXUMcVAQRIQIZ_C4b2t3OStPmZdYkng9Ob_lJVNCn8suHzr99xvm2CKo844ChaTB17SsRJyqLj78sTelrU7Q5bJthad4mO9nm6oBLCuh6lUgBsK4LzQws1GTrdVFqkgtT-UTiPjhLUNhOg" alt="All Day Pullover Sweater" className="w-full h-full object-cover object-top" /><Link href="/wishlist" className="absolute top-3 right-3 text-stone-700 hover:text-[#c8002e] transition-colors"><i className="fa-regular fa-heart text-base"></i></Link><Link href="/product/p1" className="absolute bottom-2.5 right-2.5 bg-[#c8002e] hover:bg-black text-white text-[9px] font-bold px-2.5 py-1 tracking-wider uppercase transition-colors shadow-sm rounded-[3px]">QUICK SHOP</Link><Link href="/cart" className="absolute bottom-0 inset-x-0 w-full z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white hover:bg-stone-100 text-stone-900 border-t border-stone-200 text-xs font-bold py-2.5 flex items-center justify-center gap-1.5 shadow-md uppercase tracking-wider"><i className="fa-solid fa-bag-shopping text-xs"></i><span className="">Add to Cart</span></Link></div><div><h4 className="text-sm font-bold text-gray-900 leading-snug mb-2">All Day Pullover Sweater</h4><div className="flex items-baseline gap-1.5 flex-wrap mt-1"><span className="text-sm font-bold text-gray-900">₹ 899</span><span className="text-xs text-gray-400 line-through">₹ 2,499</span><span className="text-[11px] font-bold text-[#c8002e]">(64% OFF)</span></div></div></div><div className="bg-white flex flex-col justify-between group product-card rounded-[6px] border border-stone-200/70 p-2 shadow-xs"><div className="relative aspect-[3/4] bg-stone-100 overflow-hidden mb-2 rounded-[4px]"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEuCQxpxvusKz890AbuL7VS2wRL0WrykcgKV_O3LpHRLVKLvvT8qX8luesJC5vW_JK00S5Ys1CBh_jY424o4Yl9iwA_QDJBcw018xj4VNeHnQvouUj82LucwlB4naQIGpxH0XTBBgoQ2BDyTor5zCB_3BNJLxzR6oDdCsQYegCjOilZhy-V0Id8acry8D_AkM7X-VS2Te5qC1NPh-cmjtQk4IVOuD-KKHU0e9e0Q" alt="Hand Knit Jersey Smart Striped Sweater" className="w-full h-full object-cover object-top" /><Link href="/wishlist" className="absolute top-3 right-3 text-stone-700 hover:text-[#c8002e] transition-colors"><i className="fa-regular fa-heart text-base"></i></Link><Link href="/product/p1" className="absolute bottom-2.5 right-2.5 bg-[#c8002e] hover:bg-black text-white text-[9px] font-bold px-2.5 py-1 tracking-wider uppercase transition-colors shadow-sm rounded-[3px]">QUICK SHOP</Link><Link href="/cart" className="absolute bottom-0 inset-x-0 w-full z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white hover:bg-stone-100 text-stone-900 border-t border-stone-200 text-xs font-bold py-2.5 flex items-center justify-center gap-1.5 shadow-md uppercase tracking-wider"><i className="fa-solid fa-bag-shopping text-xs"></i><span className="">Add to Cart</span></Link></div><div><h4 className="text-sm font-bold text-gray-900 leading-snug mb-2">Hand Knit Jersey Smart Striped Sweater</h4><div className="flex items-baseline gap-1.5 flex-wrap mt-1"><span className="text-sm font-bold text-gray-900">₹ 999</span><span className="text-xs text-gray-400 line-through">₹ 2,799</span><span className="text-[11px] font-bold text-[#c8002e]">(64% OFF)</span></div></div></div><div className="bg-white flex flex-col justify-between group product-card rounded-[6px] border border-stone-200/70 p-2 shadow-xs"><div className="relative aspect-[3/4] bg-stone-100 overflow-hidden mb-2 rounded-[4px]"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiD3YdHvQrf7UIyLCoe-qlHHvPTO-d7wKaOBt25_5HfdXSS3KGWcXqkuIkrznf1WyKEARmPf0TfAlKBFsBEzLK50x7k90KXu86wv6cOYDqzcSCITFEuTrJ49183OOdwFgBkaExCIvDAuLozMdra_TArIw-lCvDUaQ7llVDyCl8sLtQNjzdFaB7IwoFUTMZtSHxN6nfkBjP9GGAEstcesN_feJRP4zI0eDSS6S-Hg" alt="Oversize Winter Edit Striped Sweater" className="w-full h-full object-cover object-top" /><Link href="/wishlist" className="absolute top-3 right-3 text-stone-700 hover:text-[#c8002e] transition-colors"><i className="fa-regular fa-heart text-base"></i></Link><Link href="/product/p1" className="absolute bottom-2.5 right-2.5 bg-[#c8002e] hover:bg-black text-white text-[9px] font-bold px-2.5 py-1 tracking-wider uppercase transition-colors shadow-sm rounded-[3px]">QUICK SHOP</Link><Link href="/cart" className="absolute bottom-0 inset-x-0 w-full z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white hover:bg-stone-100 text-stone-900 border-t border-stone-200 text-xs font-bold py-2.5 flex items-center justify-center gap-1.5 shadow-md uppercase tracking-wider"><i className="fa-solid fa-bag-shopping text-xs"></i><span className="">Add to Cart</span></Link></div><div><h4 className="text-sm font-bold text-gray-900 leading-snug mb-2">Oversize Winter Edit Striped Sweater</h4><div className="flex items-baseline gap-1.5 flex-wrap mt-1"><span className="text-sm font-bold text-gray-900">₹ 999</span><span className="text-xs text-gray-400 line-through">₹ 2,799</span><span className="text-[11px] font-bold text-[#c8002e]">(64% OFF)</span></div></div></div></div><div id="products-grid-women" className="hidden grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2 md:gap-2.5 mb-8"><div className="bg-white flex flex-col justify-between group product-card rounded-[6px] border border-stone-200/70 p-2 shadow-xs"><div className="relative aspect-[3/4] bg-stone-100 overflow-hidden mb-2 rounded-[4px]"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwUy1fIOkDK6u2pWKdsiBXn8gjCsw5MhRYfssCccVA5SSIQeA6D4NOh-3Syt67FFtkYJVWr1A3AVmRp2orEY5W_4E2urr5Fv_r3sL3AGPuPRlO4AVwcIGgE3Xq2vPFdawQoQ-vi_BxZk-kOoAZTHTEcf-JfGa8LsaxwOgH2sDLh3n_Fo47w2ni6PZaBcSdaC2xP_vEcLG8Vxl5TpTLYZyLtS30Zb2dGVJ2c6Fy7g" alt="Cotton Flared Dress" className="w-full h-full object-cover object-top" /><span className="absolute top-3 left-3 bg-white text-black text-[10px] font-bold px-2 py-0.5 tracking-wider uppercase border border-stone-200 shadow-xs">SELLING FAST</span><Link href="/wishlist" className="absolute top-3 right-3 text-stone-700 hover:text-[#c8002e] transition-colors"><i className="fa-regular fa-heart text-base"></i></Link><Link href="/product/p1" className="absolute bottom-2.5 right-2.5 bg-[#c8002e] hover:bg-black text-white text-[9px] font-bold px-2.5 py-1 tracking-wider uppercase transition-colors shadow-sm rounded-[3px]">QUICK SHOP</Link></div><div><h4 className="text-sm font-bold text-gray-900 leading-snug mb-2">Cotton Flared Dress</h4><div className="flex items-baseline gap-1.5 flex-wrap mt-1"><span className="text-sm font-bold text-gray-900">₹ 1,299</span><span className="text-xs text-gray-400 line-through">₹ 3,499</span><span className="text-[11px] font-bold text-[#c8002e]">(63% OFF)</span></div></div></div><div className="bg-white flex flex-col justify-between group product-card rounded-[6px] border border-stone-200/70 p-2 shadow-xs"><div className="relative aspect-[3/4] bg-stone-100 overflow-hidden mb-2 rounded-[4px]"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB99dwpq68H6bPiciXwJbg8dmsBb9ckLz9C6gof-cbpXjktk_ZioLvspE-f_DhDqo5jJLokmnuLqNM8FJet_N9X7ZhNRjKbsKQIqQ0GiKX52EgCEj28YmrHy09vwwKkMgZQbgO2KiriXB7eoPCWzSyiHsK7RuMcHc2e_6-_G7eHrjJ1t0ptI_5EL6TXR4_ViYzxwsxsSh1iKyKhH7DxZScFtJfPB_dE1oZCBJ7xHA" alt="Embroidered Flared Strappy Dress" className="w-full h-full object-cover object-top" /><Link href="/wishlist" className="absolute top-3 right-3 text-stone-700 hover:text-[#c8002e] transition-colors"><i className="fa-regular fa-heart text-base"></i></Link><Link href="/product/p1" className="absolute bottom-2.5 right-2.5 bg-[#c8002e] hover:bg-black text-white text-[9px] font-bold px-2.5 py-1 tracking-wider uppercase transition-colors shadow-sm rounded-[3px]">QUICK SHOP</Link></div><div><h4 className="text-sm font-bold text-gray-900 leading-snug mb-2">Embroidered Flared Strappy Dress</h4><div className="flex items-baseline gap-1.5 flex-wrap mt-1"><span className="text-sm font-bold text-gray-900">₹ 1,499</span><span className="text-xs text-gray-400 line-through">₹ 3,999</span><span className="text-[11px] font-bold text-[#c8002e]">(62% OFF)</span></div></div></div><div className="bg-white flex flex-col justify-between group product-card rounded-[6px] border border-stone-200/70 p-2 shadow-xs"><div className="relative aspect-[3/4] bg-stone-100 overflow-hidden mb-2 rounded-[4px]"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuATKEJFfrZfwPr8oQ4E1-Vvymoy-wQkWdvK35GZskSQGECzX6lfZIgCRKeyyrXp8KBpOPHMF0lpPgcgfqzZuSMxqPVwuKxT_tzx5T4-7sKWZYuNQU-7amTvoSHbpLToCo3OsgY90NOzMtbgNPnv-6eSPteZGQD59z77f0quxYpTmRrB-aPirJ5ZgTJbYKtniorBum27Vx3sVqTdZrJTyE6pTsdOey6b__TocaDns58nsONvhhBQG-w" alt="Structured Lace Palazzo" className="w-full h-full object-cover object-top" /><Link href="/wishlist" className="absolute top-3 right-3 text-stone-700 hover:text-[#c8002e] transition-colors"><i className="fa-regular fa-heart text-base"></i></Link><Link href="/product/p1" className="absolute bottom-2.5 right-2.5 bg-[#c8002e] hover:bg-black text-white text-[9px] font-bold px-2.5 py-1 tracking-wider uppercase transition-colors shadow-sm rounded-[3px]">QUICK SHOP</Link></div><div><h4 className="text-sm font-bold text-gray-900 leading-snug mb-2">Structured Lace Palazzo</h4><div className="flex items-baseline gap-1.5 flex-wrap mt-1"><span className="text-sm font-bold text-gray-900">₹ 799</span><span className="text-xs text-gray-400 line-through">₹ 1,999</span><span className="text-[11px] font-bold text-[#c8002e]">(60% OFF)</span></div></div></div><div className="bg-white flex flex-col justify-between group product-card rounded-[6px] border border-stone-200/70 p-2 shadow-xs"><div className="relative aspect-[3/4] bg-stone-100 overflow-hidden mb-2 rounded-[4px]"><img src="https://lh3.googleusercontent.com/aida/AEtjO1Xzf1kNzq-kvkhgpHMYny2notAK7zr9TdLCjPpzWdf6aI2g8zyA8jAV_0r2Yn-5vTzwoWPMEyzg5vzST7UPYHnjy2abpAz0jJvdMh39Meid8SUeKPI36zCMvME0Fpi6Oqwt5ANaL-LE4_xrjtRW85uHE1hfctzLsXL5u-MXTx5dUyX0geU76FmfSJ_r7FKR8mZ1JWZx_FIKDYUBFcQGjZmw0txP1s1v2pEhX2Xbrs0" alt="Woven Solid Pant" className="w-full h-full object-cover object-top" /><Link href="/wishlist" className="absolute top-3 right-3 text-stone-700 hover:text-[#c8002e] transition-colors"><i className="fa-regular fa-heart text-base"></i></Link><Link href="/product/p1" className="absolute bottom-2.5 right-2.5 bg-[#c8002e] hover:bg-black text-white text-[9px] font-bold px-2.5 py-1 tracking-wider uppercase transition-colors shadow-sm rounded-[3px]">QUICK SHOP</Link></div><div><h4 className="text-sm font-bold text-gray-900 leading-snug mb-2">Woven Solid Pant</h4><div className="flex items-baseline gap-1.5 flex-wrap mt-1"><span className="text-sm font-bold text-gray-900">₹ 1,499</span><span className="text-xs text-gray-400 line-through">₹ 3,999</span><span className="text-[11px] font-bold text-[#c8002e]">(62% OFF)</span></div></div></div></div><div className="flex items-center justify-between pt-4 border-t border-stone-200"><div className="flex items-center gap-3"><div className="flex items-center gap-1.5 text-stone-800"><button className="w-5 h-5 flex items-center justify-center text-black cursor-pointer hover:opacity-80" title="2-Column View"><i className="fa-solid fa-pause text-xs rotate-90"></i></button><button className="w-5 h-5 flex items-center justify-center text-stone-400 hover:text-black cursor-pointer" title="Grid View"><span className="grid grid-cols-2 gap-0.5 w-3 h-3"><span className="bg-stone-400 block w-1 h-1"></span><span className="bg-stone-400 block w-1 h-1"></span><span className="bg-stone-400 block w-1 h-1"></span><span className="bg-stone-400 block w-1 h-1"></span></span></button></div><div className="w-36 sm:w-48 h-0.5 bg-stone-200 relative"><div className="h-full bg-stone-800 w-12"></div></div></div><Link href="/category" className="px-8 py-2.5 bg-[#c8002e] hover:bg-black text-white font-black text-xs tracking-wider uppercase transition-colors shadow-sm inline-block rounded-[4px]">VIEW ALL</Link></div></div></div></section>
{/* END: 8. BestSelling */}
{/* BEGIN: 9. EXPLORE MORE DEALS */}
<section data-purpose="explore-more-deals" className="w-full px-2 sm:px-4 lg:px-6">

{/* Deals Grid - Row 1 (4 columns with wireframe recommendation banner tile on column 4) */}

{/* Deals Grid - Row 2 (Trending tile on col 1 + 3 products) */}

{/* Deals Grid - Row 3 (3 products + Recommended Capsule Tile on Col 4) */}

{/* Full-width Wireframe "Explore More" Button */}
<div className="text-center">

</div>
</section>
{/* END: 9. EXPLORE MORE DEALS */}
</main>












































    </div>
  );
}
