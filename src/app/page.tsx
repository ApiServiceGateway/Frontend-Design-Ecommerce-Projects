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
    <div className="flex items-center justify-center gap-6 sm:gap-10 md:gap-14 select-none mb-6"><button type="button" id="btn-toggle-men" onClick={() => handleGenderSwitch('men')} className="group flex flex-col items-center justify-center gap-2.5 text-center cursor-pointer outline-none">
        <div id="icon-wrap-men" className="w-20 h-24 sm:w-24 sm:h-28 rounded-2xl bg-red-50/40 border-2 border-[#c8002e] flex items-center justify-center p-3 text-[#c8002e] shadow-sm transition-all duration-300 group-hover:scale-105">
          <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-16 sm:w-14 sm:h-18">
            <path d="M26 12C26 8.686 28.686 6 32 6C35.314 6 38 8.686 38 12" />
            <path d="M14 26L24 16L32 30L40 16L50 26L48 58H16L14 26Z" />
            <path d="M28 16L32 24L36 16" />
            <path d="M32 24V40" />
            <line x1="20" y1="34" x2="26" y2="34" />
          </svg>
        </div>
        <span id="label-men" className="text-xs sm:text-sm font-extrabold tracking-widest text-[#c8002e] transition-colors uppercase">MEN</span>
      </button>

      <button type="button" id="btn-toggle-women" onClick={() => handleGenderSwitch('women')} className="group flex flex-col items-center justify-center gap-2.5 text-center cursor-pointer outline-none">
        <div id="icon-wrap-women" className="w-20 h-24 sm:w-24 sm:h-28 rounded-2xl bg-stone-50 border-2 border-stone-200 flex items-center justify-center p-3 text-[#555555] shadow-xs transition-all duration-300 group-hover:scale-105 group-hover:border-stone-400">
          <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-16 sm:w-14 sm:h-18">
            <path d="M26 12C26 8.686 28.686 6 32 6C35.314 6 38 8.686 38 12" />
            <path d="M24 16C28 20 36 20 40 16L44 28C41 33 37 35 37 38C37 42 48 54 50 58H14C16 54 27 42 27 38C27 35 23 33 20 28L24 16Z" />
            <path d="M27 38C30 40 34 40 37 38" />
            <path d="M29 42L25 58" strokeWidth="1.5" strokeOpacity="0.5" />
            <path d="M35 42L39 58" strokeWidth="1.5" strokeOpacity="0.5" />
          </svg>
        </div>
        <span id="label-women" className="text-xs sm:text-sm font-extrabold tracking-widest text-stone-500 transition-colors uppercase">WOMEN</span>
      </button></div><div className="w-full border-t border-[#f2eded] pt-8"><div id="gender-subnav-men" className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pb-8 text-xs sm:text-sm font-bold tracking-wider uppercase select-none"><button type="button" onClick={(e) => handleSubTab(e)} className="subtab-item text-black border-b-2 border-black pb-1.5 transition-colors font-extrabold cursor-pointer"><Sparkles className="w-3.5 h-3.5 inline mr-1 text-amber-500" />CASUAL WEAR</button><button type="button" onClick={(e) => handleSubTab(e)} className="subtab-item text-gray-400 hover:text-black pb-1.5 transition-colors cursor-pointer"><Crown className="w-3.5 h-3.5 inline mr-1 text-rose-500" />ETHNIC WEAR</button><button type="button" onClick={(e) => handleSubTab(e)} className="subtab-item text-gray-400 hover:text-black pb-1.5 transition-colors cursor-pointer"><Zap className="w-3.5 h-3.5 inline mr-1 text-teal-600" />ATHLEISURE</button><button type="button" onClick={(e) => handleSubTab(e)} className="subtab-item text-gray-400 hover:text-black pb-1.5 transition-colors cursor-pointer"><ShoppingBag className="w-3.5 h-3.5 inline mr-1 text-indigo-500" />ACCESSORIES</button></div><div id="gender-subnav-women" className="hidden flex-wrap items-center justify-center gap-6 sm:gap-10 pb-8 text-xs sm:text-sm font-bold tracking-wider uppercase select-none"><button type="button" onClick={(e) => handleSubTab(e)} className="subtab-item text-black border-b-2 border-black pb-1.5 transition-colors font-extrabold cursor-pointer">WESTERN WEAR</button><button type="button" onClick={(e) => handleSubTab(e)} className="subtab-item text-gray-400 hover:text-black pb-1.5 transition-colors cursor-pointer">ETHNIC &amp; FUSION WEAR</button><button type="button" onClick={(e) => handleSubTab(e)} className="subtab-item text-gray-400 hover:text-black pb-1.5 transition-colors cursor-pointer">ATHLEISURE</button><button type="button" onClick={(e) => handleSubTab(e)} className="subtab-item text-gray-400 hover:text-black pb-1.5 transition-colors cursor-pointer">LOUNGEWEAR</button><button type="button" onClick={(e) => handleSubTab(e)} className="subtab-item text-gray-400 hover:text-black pb-1.5 transition-colors cursor-pointer">INTIMATE WEAR</button><button type="button" onClick={(e) => handleSubTab(e)} className="subtab-item text-gray-400 hover:text-black pb-1.5 transition-colors cursor-pointer">ACCESSORIES</button></div><div id="products-grid-men" className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2 md:gap-2.5 mb-8"><div className="bg-white flex flex-col justify-between group product-card rounded-[6px] border border-stone-200/70 p-2 shadow-xs"><div className="relative aspect-[3/4] bg-stone-100 mb-3.5 rounded-[4px]">
              <div className="w-full h-full overflow-hidden rounded-[4px]">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEZWg_Qcw-XrvHDafNBvoqtwZzN9Zj2Axao8bXj_8oykAGO9lUo6LwB_F2Rgs-q9lfYrzwqI1ip_c87XMcTqh98ls2Y1zaHXvLke94RFLLrym5vwqfntMB0bExAZCFXW4hJY0wZHxgXXiOy_MhOrMjUmdtHXJxyiW01veWxVyVBD2yrQj1o4098-Q3D2onxbiD2giCuBI5o2tak50C1zZhefvNekUmZOVOweCs_Q" alt="Double Dyed Crew Tee" className="w-full h-full object-cover object-top" />
              </div>
              <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 z-10"><span className="w-3.5 h-3.5 rounded-full bg-stone-200 border border-white"></span><span className="w-3.5 h-3.5 rounded-full bg-stone-700 border border-white"></span><span className="text-[10px] font-bold text-stone-800 bg-white/90 px-1 rounded">+17</span>
              {/* Floating Wishlist & Cart buttons on bottom-right of image */}
              <div className="absolute right-2 -bottom-3.5 z-20 flex items-center gap-1.5">
                <Link href="/wishlist" aria-label="Add to wishlist" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-[#c8002e] flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110">
                  <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
                </Link>
                <Link href="/cart" aria-label="Add to cart" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-black flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110">
                  <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
                </Link>
              </div>
            </div><Link href="/product/p1" className="absolute bottom-2.5 right-2.5 bg-[#c8002e] hover:bg-black text-white text-[9px] font-bold px-2.5 py-1 tracking-wider uppercase transition-colors shadow-sm rounded-[3px]">QUICK SHOP</Link><Link href="/cart" className="absolute bottom-0 inset-x-0 w-full z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white hover:bg-stone-100 text-stone-900 border-t border-stone-200 text-xs font-bold py-2.5 flex items-center justify-center gap-1.5 shadow-md uppercase tracking-wider"><ShoppingBag className="w-3.5 h-3.5 text-[#00a896]" /><span className="">Add to Cart</span></Link></div><div><h4 className="text-sm font-bold text-gray-900 leading-snug mb-1">Double Dyed Crew Tee - Regular Fit</h4><p className="text-xs text-gray-500 line-clamp-1 mb-2">Must Have Essential Tee With Super Soft...</p><div className="flex items-baseline gap-1.5 flex-wrap mt-1"><span className="text-sm font-bold text-gray-900">₹ 199</span><span className="text-xs text-gray-400 line-through">₹ 699</span><span className="text-[11px] font-bold text-[#c8002e]">(71% OFF)</span></div></div></div><div className="bg-white flex flex-col justify-between group product-card rounded-[6px] border border-stone-200/70 p-2 shadow-xs"><div className="relative aspect-[3/4] bg-stone-100 mb-3.5 rounded-[4px]">
              <div className="w-full h-full overflow-hidden rounded-[4px]">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuANloF4NtMQvzqWT5Ncv7nGp3w3jhqgnvCuYWqCEA4DYpGO8vZ6f4vqUbsFMKiNqTsFKy_hsHt-6V3_qRaNbOd-xfQRmXUMcVAQRIQIZ_C4b2t3OStPmZdYkng9Ob_lJVNCn8suHzr99xvm2CKo844ChaTB17SsRJyqLj78sTelrU7Q5bJthad4mO9nm6oBLCuh6lUgBsK4LzQws1GTrdVFqkgtT-UTiPjhLUNhOg" alt="All Day Pullover Sweater" className="w-full h-full object-cover object-top" />
              </div>
              <Link href="/product/p1" className="absolute bottom-2.5 right-2.5 bg-[#c8002e] hover:bg-black text-white text-[9px] font-bold px-2.5 py-1 tracking-wider uppercase transition-colors shadow-sm rounded-[3px]">QUICK SHOP</Link><Link href="/cart" className="absolute bottom-0 inset-x-0 w-full z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white hover:bg-stone-100 text-stone-900 border-t border-stone-200 text-xs font-bold py-2.5 flex items-center justify-center gap-1.5 shadow-md uppercase tracking-wider"><ShoppingBag className="w-3.5 h-3.5 text-[#00a896]" /><span className="">Add to Cart</span></Link>
              {/* Floating Wishlist & Cart buttons on bottom-right of image */}
              <div className="absolute right-2 -bottom-3.5 z-20 flex items-center gap-1.5">
                <Link href="/wishlist" aria-label="Add to wishlist" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-[#c8002e] flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110">
                  <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
                </Link>
                <Link href="/cart" aria-label="Add to cart" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-black flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110">
                  <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
                </Link>
              </div>
            </div><div><h4 className="text-sm font-bold text-gray-900 leading-snug mb-2">All Day Pullover Sweater</h4><div className="flex items-baseline gap-1.5 flex-wrap mt-1"><span className="text-sm font-bold text-gray-900">₹ 899</span><span className="text-xs text-gray-400 line-through">₹ 2,499</span><span className="text-[11px] font-bold text-[#c8002e]">(64% OFF)</span></div></div></div><div className="bg-white flex flex-col justify-between group product-card rounded-[6px] border border-stone-200/70 p-2 shadow-xs"><div className="relative aspect-[3/4] bg-stone-100 mb-3.5 rounded-[4px]">
              <div className="w-full h-full overflow-hidden rounded-[4px]">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEuCQxpxvusKz890AbuL7VS2wRL0WrykcgKV_O3LpHRLVKLvvT8qX8luesJC5vW_JK00S5Ys1CBh_jY424o4Yl9iwA_QDJBcw018xj4VNeHnQvouUj82LucwlB4naQIGpxH0XTBBgoQ2BDyTor5zCB_3BNJLxzR6oDdCsQYegCjOilZhy-V0Id8acry8D_AkM7X-VS2Te5qC1NPh-cmjtQk4IVOuD-KKHU0e9e0Q" alt="Hand Knit Jersey Smart Striped Sweater" className="w-full h-full object-cover object-top" />
              </div>
              <Link href="/product/p1" className="absolute bottom-2.5 right-2.5 bg-[#c8002e] hover:bg-black text-white text-[9px] font-bold px-2.5 py-1 tracking-wider uppercase transition-colors shadow-sm rounded-[3px]">QUICK SHOP</Link><Link href="/cart" className="absolute bottom-0 inset-x-0 w-full z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white hover:bg-stone-100 text-stone-900 border-t border-stone-200 text-xs font-bold py-2.5 flex items-center justify-center gap-1.5 shadow-md uppercase tracking-wider"><ShoppingBag className="w-3.5 h-3.5 text-[#00a896]" /><span className="">Add to Cart</span></Link>
              {/* Floating Wishlist & Cart buttons on bottom-right of image */}
              <div className="absolute right-2 -bottom-3.5 z-20 flex items-center gap-1.5">
                <Link href="/wishlist" aria-label="Add to wishlist" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-[#c8002e] flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110">
                  <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
                </Link>
                <Link href="/cart" aria-label="Add to cart" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-black flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110">
                  <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
                </Link>
              </div>
            </div><div><h4 className="text-sm font-bold text-gray-900 leading-snug mb-2">Hand Knit Jersey Smart Striped Sweater</h4><div className="flex items-baseline gap-1.5 flex-wrap mt-1"><span className="text-sm font-bold text-gray-900">₹ 999</span><span className="text-xs text-gray-400 line-through">₹ 2,799</span><span className="text-[11px] font-bold text-[#c8002e]">(64% OFF)</span></div></div></div><div className="bg-white flex flex-col justify-between group product-card rounded-[6px] border border-stone-200/70 p-2 shadow-xs"><div className="relative aspect-[3/4] bg-stone-100 mb-3.5 rounded-[4px]">
              <div className="w-full h-full overflow-hidden rounded-[4px]">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiD3YdHvQrf7UIyLCoe-qlHHvPTO-d7wKaOBt25_5HfdXSS3KGWcXqkuIkrznf1WyKEARmPf0TfAlKBFsBEzLK50x7k90KXu86wv6cOYDqzcSCITFEuTrJ49183OOdwFgBkaExCIvDAuLozMdra_TArIw-lCvDUaQ7llVDyCl8sLtQNjzdFaB7IwoFUTMZtSHxN6nfkBjP9GGAEstcesN_feJRP4zI0eDSS6S-Hg" alt="Oversize Winter Edit Striped Sweater" className="w-full h-full object-cover object-top" />
              </div>
              <Link href="/product/p1" className="absolute bottom-2.5 right-2.5 bg-[#c8002e] hover:bg-black text-white text-[9px] font-bold px-2.5 py-1 tracking-wider uppercase transition-colors shadow-sm rounded-[3px]">QUICK SHOP</Link><Link href="/cart" className="absolute bottom-0 inset-x-0 w-full z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white hover:bg-stone-100 text-stone-900 border-t border-stone-200 text-xs font-bold py-2.5 flex items-center justify-center gap-1.5 shadow-md uppercase tracking-wider"><ShoppingBag className="w-3.5 h-3.5 text-[#00a896]" /><span className="">Add to Cart</span></Link>
              {/* Floating Wishlist & Cart buttons on bottom-right of image */}
              <div className="absolute right-2 -bottom-3.5 z-20 flex items-center gap-1.5">
                <Link href="/wishlist" aria-label="Add to wishlist" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-[#c8002e] flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110">
                  <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
                </Link>
                <Link href="/cart" aria-label="Add to cart" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-black flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110">
                  <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
                </Link>
              </div>
            </div><div><h4 className="text-sm font-bold text-gray-900 leading-snug mb-2">Oversize Winter Edit Striped Sweater</h4><div className="flex items-baseline gap-1.5 flex-wrap mt-1"><span className="text-sm font-bold text-gray-900">₹ 999</span><span className="text-xs text-gray-400 line-through">₹ 2,799</span><span className="text-[11px] font-bold text-[#c8002e]">(64% OFF)</span></div></div></div></div><div id="products-grid-women" className="hidden grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2 md:gap-2.5 mb-8"><div className="bg-white flex flex-col justify-between group product-card rounded-[6px] border border-stone-200/70 p-2 shadow-xs"><div className="relative aspect-[3/4] bg-stone-100 mb-3.5 rounded-[4px]">
              <div className="w-full h-full overflow-hidden rounded-[4px]">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwUy1fIOkDK6u2pWKdsiBXn8gjCsw5MhRYfssCccVA5SSIQeA6D4NOh-3Syt67FFtkYJVWr1A3AVmRp2orEY5W_4E2urr5Fv_r3sL3AGPuPRlO4AVwcIGgE3Xq2vPFdawQoQ-vi_BxZk-kOoAZTHTEcf-JfGa8LsaxwOgH2sDLh3n_Fo47w2ni6PZaBcSdaC2xP_vEcLG8Vxl5TpTLYZyLtS30Zb2dGVJ2c6Fy7g" alt="Cotton Flared Dress" className="w-full h-full object-cover object-top" />
              </div>
              <Link href="/product/p1" className="absolute bottom-2.5 right-2.5 bg-[#c8002e] hover:bg-black text-white text-[9px] font-bold px-2.5 py-1 tracking-wider uppercase transition-colors shadow-sm rounded-[3px]">QUICK SHOP</Link>
              {/* Floating Wishlist & Cart buttons on bottom-right of image */}
              <div className="absolute right-2 -bottom-3.5 z-20 flex items-center gap-1.5">
                <Link href="/wishlist" aria-label="Add to wishlist" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-[#c8002e] flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110">
                  <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
                </Link>
                <Link href="/cart" aria-label="Add to cart" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-black flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110">
                  <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
                </Link>
              </div>
            </div><div><h4 className="text-sm font-bold text-gray-900 leading-snug mb-2">Cotton Flared Dress</h4><div className="flex items-baseline gap-1.5 flex-wrap mt-1"><span className="text-sm font-bold text-gray-900">₹ 1,299</span><span className="text-xs text-gray-400 line-through">₹ 3,499</span><span className="text-[11px] font-bold text-[#c8002e]">(63% OFF)</span></div></div></div><div className="bg-white flex flex-col justify-between group product-card rounded-[6px] border border-stone-200/70 p-2 shadow-xs"><div className="relative aspect-[3/4] bg-stone-100 mb-3.5 rounded-[4px]">
              <div className="w-full h-full overflow-hidden rounded-[4px]">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB99dwpq68H6bPiciXwJbg8dmsBb9ckLz9C6gof-cbpXjktk_ZioLvspE-f_DhDqo5jJLokmnuLqNM8FJet_N9X7ZhNRjKbsKQIqQ0GiKX52EgCEj28YmrHy09vwwKkMgZQbgO2KiriXB7eoPCWzSyiHsK7RuMcHc2e_6-_G7eHrjJ1t0ptI_5EL6TXR4_ViYzxwsxsSh1iKyKhH7DxZScFtJfPB_dE1oZCBJ7xHA" alt="Embroidered Flared Strappy Dress" className="w-full h-full object-cover object-top" />
              </div>
              <Link href="/product/p1" className="absolute bottom-2.5 right-2.5 bg-[#c8002e] hover:bg-black text-white text-[9px] font-bold px-2.5 py-1 tracking-wider uppercase transition-colors shadow-sm rounded-[3px]">QUICK SHOP</Link>
              {/* Floating Wishlist & Cart buttons on bottom-right of image */}
              <div className="absolute right-2 -bottom-3.5 z-20 flex items-center gap-1.5">
                <Link href="/wishlist" aria-label="Add to wishlist" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-[#c8002e] flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110">
                  <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
                </Link>
                <Link href="/cart" aria-label="Add to cart" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-black flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110">
                  <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
                </Link>
              </div>
            </div><div><h4 className="text-sm font-bold text-gray-900 leading-snug mb-2">Embroidered Flared Strappy Dress</h4><div className="flex items-baseline gap-1.5 flex-wrap mt-1"><span className="text-sm font-bold text-gray-900">₹ 1,499</span><span className="text-xs text-gray-400 line-through">₹ 3,999</span><span className="text-[11px] font-bold text-[#c8002e]">(62% OFF)</span></div></div></div><div className="bg-white flex flex-col justify-between group product-card rounded-[6px] border border-stone-200/70 p-2 shadow-xs"><div className="relative aspect-[3/4] bg-stone-100 mb-3.5 rounded-[4px]">
              <div className="w-full h-full overflow-hidden rounded-[4px]">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuATKEJFfrZfwPr8oQ4E1-Vvymoy-wQkWdvK35GZskSQGECzX6lfZIgCRKeyyrXp8KBpOPHMF0lpPgcgfqzZuSMxqPVwuKxT_tzx5T4-7sKWZYuNQU-7amTvoSHbpLToCo3OsgY90NOzMtbgNPnv-6eSPteZGQD59z77f0quxYpTmRrB-aPirJ5ZgTJbYKtniorBum27Vx3sVqTdZrJTyE6pTsdOey6b__TocaDns58nsONvhhBQG-w" alt="Structured Lace Palazzo" className="w-full h-full object-cover object-top" />
              </div>
              <Link href="/product/p1" className="absolute bottom-2.5 right-2.5 bg-[#c8002e] hover:bg-black text-white text-[9px] font-bold px-2.5 py-1 tracking-wider uppercase transition-colors shadow-sm rounded-[3px]">QUICK SHOP</Link>
              {/* Floating Wishlist & Cart buttons on bottom-right of image */}
              <div className="absolute right-2 -bottom-3.5 z-20 flex items-center gap-1.5">
                <Link href="/wishlist" aria-label="Add to wishlist" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-[#c8002e] flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110">
                  <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
                </Link>
                <Link href="/cart" aria-label="Add to cart" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-black flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110">
                  <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
                </Link>
              </div>
            </div><div><h4 className="text-sm font-bold text-gray-900 leading-snug mb-2">Structured Lace Palazzo</h4><div className="flex items-baseline gap-1.5 flex-wrap mt-1"><span className="text-sm font-bold text-gray-900">₹ 799</span><span className="text-xs text-gray-400 line-through">₹ 1,999</span><span className="text-[11px] font-bold text-[#c8002e]">(60% OFF)</span></div></div></div><div className="bg-white flex flex-col justify-between group product-card rounded-[6px] border border-stone-200/70 p-2 shadow-xs"><div className="relative aspect-[3/4] bg-stone-100 mb-3.5 rounded-[4px]">
              <div className="w-full h-full overflow-hidden rounded-[4px]">
                <img src="https://lh3.googleusercontent.com/aida/AEtjO1Xzf1kNzq-kvkhgpHMYny2notAK7zr9TdLCjPpzWdf6aI2g8zyA8jAV_0r2Yn-5vTzwoWPMEyzg5vzST7UPYHnjy2abpAz0jJvdMh39Meid8SUeKPI36zCMvME0Fpi6Oqwt5ANaL-LE4_xrjtRW85uHE1hfctzLsXL5u-MXTx5dUyX0geU76FmfSJ_r7FKR8mZ1JWZx_FIKDYUBFcQGjZmw0txP1s1v2pEhX2Xbrs0" alt="Woven Solid Pant" className="w-full h-full object-cover object-top" />
              </div>
              <Link href="/product/p1" className="absolute bottom-2.5 right-2.5 bg-[#c8002e] hover:bg-black text-white text-[9px] font-bold px-2.5 py-1 tracking-wider uppercase transition-colors shadow-sm rounded-[3px]">QUICK SHOP</Link>
              {/* Floating Wishlist & Cart buttons on bottom-right of image */}
              <div className="absolute right-2 -bottom-3.5 z-20 flex items-center gap-1.5">
                <Link href="/wishlist" aria-label="Add to wishlist" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-[#c8002e] flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110">
                  <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
                </Link>
                <Link href="/cart" aria-label="Add to cart" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-700 hover:text-black flex items-center justify-center shadow-md border border-stone-200/80 transition-all hover:scale-110">
                  <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-800" />
                </Link>
              </div>
            </div><div><h4 className="text-sm font-bold text-gray-900 leading-snug mb-2">Woven Solid Pant</h4><div className="flex items-baseline gap-1.5 flex-wrap mt-1"><span className="text-sm font-bold text-gray-900">₹ 1,499</span><span className="text-xs text-gray-400 line-through">₹ 3,999</span><span className="text-[11px] font-bold text-[#c8002e]">(62% OFF)</span></div></div></div></div><div className="flex items-center justify-between pt-4 border-t border-stone-200"><div className="flex items-center gap-3"><div className="flex items-center gap-1.5 text-stone-800"><button type="button" className="w-8 h-8 rounded-md border border-stone-200 bg-stone-50 flex items-center justify-center text-black hover:bg-stone-100 transition-colors cursor-pointer shadow-2xs" title="2-Column View"><Columns2 className="w-4 h-4" /></button><button type="button" className="w-8 h-8 rounded-md border border-stone-200 bg-white flex items-center justify-center text-stone-400 hover:text-black hover:bg-stone-50 transition-colors cursor-pointer shadow-2xs" title="Grid View"><LayoutGrid className="w-4 h-4" /></button></div><div className="w-36 sm:w-48 h-1 bg-stone-200 rounded-full overflow-hidden"><div className="h-full bg-stone-800 w-14 rounded-full"></div></div></div><Link href="/category" className="px-7 py-2.5 bg-[#c8002e] hover:bg-black text-white font-black text-xs tracking-wider uppercase transition-colors shadow-sm inline-flex items-center gap-1.5 rounded-[4px]">VIEW ALL <ArrowRight className="w-3.5 h-3.5" /></Link></div></div></div></section>
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
