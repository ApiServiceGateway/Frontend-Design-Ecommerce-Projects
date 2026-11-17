'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { HangTag } from '@/components/ui/HangTag';
import {
  ChevronRight,
  ChevronDown,
  X,
  Heart,
  SlidersHorizontal,
  ArrowUpDown,
  Check,
  ShoppingBag,
  ExternalLink,
  Layers,
} from 'lucide-react';

interface Product {
  id: string;
  brand: string;
  title: string;
  price: number;
  originalPrice: number;
  image: string;
  tag?: string;
  gender: 'Women' | 'Men' | 'Boy' | 'Girl' | 'Boy & Girl';
  category: string;
}

const allProducts: Product[] = [
  {
    id: 'p1',
    brand: 'HONEY CURVYTUDE',
    title: 'Black Straight Fit Track Pants',
    price: 1599,
    originalPrice: 2499,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAMu7kMwS7W7CPFi9y_BUOaQWTP4MyQaShRYrr2IMJm787Rn6vyhsbvPizlK_R9E0PsxItR7SXTXg-LFHIhmZG5rK0qaL1tci_KRXrcEfp70Bitt-UJz18Wl6SO-yi8uE29htLTslpFxJ79RfzDKu5BTk4eV-4AR7YrzdOOQ54ya58D3_3CiINQSm4T49xY39d3fKZiH8Uq4K615CWmUb4Q_bsTdcvkVmnoaiZsAA',
    tag: 'Just In',
    gender: 'Women',
    category: 'Track Pants',
  },
  {
    id: 'p2',
    brand: 'AJILE',
    title: 'Brown Flared Active Pant',
    price: 1299,
    originalPrice: 1899,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDw8JCu0-chVwXKxtYrdaXqUyVVQaqWrkB9oLnLFvY9UZNW2_5FkOC4YhX48su-Lg6aPFTTOnxYOf6nVTECAsvYhquhquDOgysVgZpP4mNNQcJGiQRJQk7QbQoJ_iE1cD-D-Xbt_u0VoC3cUBGHW3Cjuz_jV0l0yHS_4fsJ9IGEKjJSn6GBsFTZLIksQ3te47Rh3pgG7BOg8JVWp2-NM3vl8SUx29Z-pwAvSySMjQ',
    tag: 'Just In',
    gender: 'Women',
    category: 'Track Pants',
  },
  {
    id: 'p3',
    brand: 'AJILE',
    title: 'Green Wide Leg Contrast Panel Track Pant',
    price: 1299,
    originalPrice: 1999,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCQhhyqWdYRh8qpTXZyl_KelJJfeuQsseZVT3JQiAzZtn82V_c2SafVQjQA5XP2lTuqPZaiSuEa8YYAaBzfk9dHPWbftu3bAqeWEGgk3lG5-3VuhmI5ZHylxVAhTP_iEZS0z9J47xV9eQDbx7yJt6xAU3j3Ro5i6BnaaLyOchB2QEXHfo7ef2MjrWatPklruen8T__jq5PUr2It9YPS6yYBliml06uYsccaia_juA',
    tag: 'Just In',
    gender: 'Women',
    category: 'Track Pants',
  },
  {
    id: 'p4',
    brand: 'AJILE',
    title: 'Solid Athletic Joggers with Drawstring',
    price: 1099,
    originalPrice: 1599,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDp2gDVngD6ckLuNjjqVhgky_tBn1i70phJlMs1Og4_w7vyYW8b0fT8rsbyDNHOVJEoy1NxwaH27_I9-c9uK2m-EprAqqwIZVgUrzqtwke6qzWAkNl8Vn6Tt7dcmhdqn4zOGbNm59egCCmjuJjjdDzTAvU23nyOS7ZiH4ffR_IlX-ZdBT9mrV_ni4Se7LP4fOG_XvqsX5sLbzWfwdr_gAmiIxomi3kRm2JSuuEC6Q',
    tag: 'Just In',
    gender: 'Women',
    category: 'Joggers',
  },
  {
    id: 'p5',
    brand: 'HONEY CURVYTUDE',
    title: 'Comfort Fit Fleece Track Pants',
    price: 1499,
    originalPrice: 2099,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDChlIHKqRYkxJtpKdc2aKrrtkAbM-8IVJlMVzQych60bt6E1nfyq-aBZ01jTpsqPvM7Jo6qeUUGi2fiYUJjFT86FqPYuBrFeIxsJ1CA7lFfEHutZtIQkCzEUa8OIHNLMW6Lv-FLjcgZSbKdY3zacNZ_UsOjk3NOGmw6X9W1-4UUOTmXgK5XsbPiWSuK6Bus7qCdWNP-_EWrImyd81cjZX8oRl-hZO7PsYbESElxA',
    tag: 'Just In',
    gender: 'Women',
    category: 'Track Pants',
  },
  {
    id: 'p6',
    brand: 'PETER ENGLAND',
    title: 'Swift Dry Moisture Wicking Pants',
    price: 1399,
    originalPrice: 1999,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA0Yi8LMJrJjBQw6fbTB1SuTeHVwy7aaS36cLjL4U2fpcuTFyBcCIUoTbCNERAQ3ysJm50W1rE4jGFX3is2u72wLEdM0O3ecbimLsOvTQk5M5rCRr0boXsg8B5bPNImanFaFJ-ZUBNoS744rul9TJ0VOigvWMkwkHBesw5QysLfwdrFW0OrvrrwGm5GiyQUn_JdgoR-D59MyWqLiiKPOiYnkrCsp_zG4W5y2KAWBA',
    tag: 'Just In',
    gender: 'Women',
    category: 'Track Pants',
  },
  {
    id: 'p7',
    brand: 'AJILE',
    title: 'Ribbed Hem Heather Gray Track Pants',
    price: 1199,
    originalPrice: 1699,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCo3KPazHsUx_yiKnPP2SeCjLRKgHwaE_4VTvgTWOZThAQwXy_-apumg3DK1iECPB9mFaBg8nQb-dkZg0LL8GLhzIYPHdoZfJHNCgfVyKP6FXvwEuMc_2YwRGgeGPzb4fC7D-eLlQz6MiH787-daaOPW-1lYoYhjFXzhfwKiWoGKeVYiaGnhWmGeHZfIEHDDC7u7CKbyFgfcwuYDmjBP-Ghw8chpyYCdQhEetFa7g',
    tag: 'Just In',
    gender: 'Women',
    category: 'Track Pants',
  },
  {
    id: 'p8',
    brand: 'AJILE',
    title: 'Athletic Tech Fleece Joggers',
    price: 1799,
    originalPrice: 2499,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBvfMkX98av_r6sFihXB_m69onYueL0GGjYFUH6h4txCjei5A7EmnaNpVjxkY7HZaVLL1D_jvfl-9_a0rE4HaW25e2f_6yT6acX3CHxOcJapgXN9_pHLRqLO9jf9Xkr_TNONvMBe0ArG0_A_P_0sr819K3nTdBB-3q4K9bdIcQwD5qIZXN_sYUHaeui19lKovYq8TdNEbHuUEJSZcF0BZ_Jp0hbQeZG9Z8ehzrsDigqsL3aI5dNj6o',
    tag: 'Just In',
    gender: 'Women',
    category: 'Joggers',
  },
  {
    id: 'p9',
    brand: 'PETER ENGLAND',
    title: 'Performance Dry Running Pants',
    price: 1499,
    originalPrice: 2199,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCZb1e2QnAmU66VBC0ij-2vvSvhFqWmpI7MeHdFlzX2LGaWkfrq5-y7RI-mP59DmHar9lxRxdt0U_tAJR7T1JSKISdg5gmqST0AKaKCZVgGIT3hdm-Z0DW27QDNyhdtdXmawSNQ3zRjS7Nw9PVWOoivwoaZxZfVeYbSLdxycqXdu76lNCRcso-f5OXXfzPtzApgZVn17d8ByB1rZqJlv8B1HGMs06kypwRZ9Qm287gEsBNxD9y3q4o',
    tag: 'Just In',
    gender: 'Women',
    category: 'Track Pants',
  },
  {
    id: 'p10',
    brand: 'HONEY CURVYTUDE',
    title: 'Urban Relaxed Cotton Track Pant',
    price: 1899,
    originalPrice: 2599,
    image:
      'https://lh3.googleusercontent.com/aida/AEtjO1UekW7qKsjQWsP_X-FdE2jNdjMloFfG11MCKyr6hMI-tXhtSRAC41DDm_M-3h_1xJXYm2SQx3MdBwa8V649SWF3bJPKeBOvabnqqPbt-axgzqfNBJmmZ6HwlNyLbubsPlQaLqi2UxUDD9k9hkQ34utmR2_PH1pgQlha7gGH7Cl-CEtyF8obEC9ugKTCEmM4d2GNcuIPn37Q4hScegwbSxOgKn0VkbzrjEphEw7UIZQ',
    tag: 'Just In',
    gender: 'Women',
    category: 'Track Pants',
  },
  {
    id: 'p11',
    brand: 'AJILE',
    title: 'Monochrome Stripe Side-Panel Sweatpant',
    price: 1399,
    originalPrice: 1999,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBqeipcs_sMDDaCiiSL-SKug-V7dcoctwVQAPRIf7vainrx4IT15d-tCFUlxzB85ZoLPBSGOVpPPL8b91fTOs3XuF3GyQkSYxtFH5he97EQsuuMARaM5vH-PNEMiMh8_mwaGXC73b_l7qhQDiYmWV5OC_DRDOFpNH5TS0Lh87XKwtwcKrkETPSx5bE00ekWmt2RjW6qIcYC2akVu5an9i4smwnb3A_oXJL1QBNAtbpDSN3wH9kiAsY',
    tag: 'Just In',
    gender: 'Women',
    category: 'Sweatpants',
  },
  {
    id: 'p12',
    brand: 'ATELIER LUXE',
    title: 'Tailored Silk-Crepe Suiting Trousers',
    price: 3499,
    originalPrice: 4899,
    image:
      'https://lh3.googleusercontent.com/aida/AEtjO1UzPjpg5JxthIu69DbKQWTAz7pFLakKeolVqLTZCgE6ss0oK-72aX9z-UFwqVvprbR44v2UItQGpD3O_d7LTlx0c2fklXw_j0JFho4JAwfB8DAb-fvTR8G1D5ERV7LVTVqhXSlUJI0zLwurmUhNfukxGASxH0qYU-6t76hbRhQr-QHAJwxn4hgexr5eKWq4OsCzaabJV3btrQjt_snqFCSwpAcfj1ZBY8zlVF-E9lQ',
    tag: 'Just In',
    gender: 'Women',
    category: 'Trousers',
  },
  {
    id: 'p13',
    brand: 'STUDIO VERVE',
    title: 'Double-Faced Wool Slim Tailored Trousers',
    price: 2899,
    originalPrice: 3899,
    image:
      'https://lh3.googleusercontent.com/aida/AEtjO1UekW7qKsjQWsP_X-FdE2jNdjMloFfG11MCKyr6hMI-tXhtSRAC41DDm_M-3h_1xJXYm2SQx3MdBwa8V649SWF3bJPKeBOvabnqqPbt-axgzqfNBJmmZ6HwlNyLbubsPlQaLqi2UxUDD9k9hkQ34utmR2_PH1pgQlha7gGH7Cl-CEtyF8obEC9ugKTCEmM4d2GNcuIPn37Q4hScegwbSxOgKn0VkbzrjEphEw7UIZQ',
    tag: 'Just In',
    gender: 'Women',
    category: 'Trousers',
  },
  {
    id: 'p14',
    brand: 'PETER ENGLAND',
    title: 'Pro-Sport Seamless Compression Leggings',
    price: 1699,
    originalPrice: 2299,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB85AoioTMk16wzkDgBEunKaTwRu1GNFyKw-FPg4k6qT1xTdiZXXf8ygj9b932YZ-IE5tm2_cNmgLA8GYV1TLpkexhhXZL8FwnZcA56RlH-1HjgnQ_qiDDN5hdCi8H0XLChyRCEbswAvJCll3EsOIxBECzXkOaCvlKdZUweuwyD_lMvIe2e8OYMvD-1drZMcbRP-GGmheKE6XapX9i_mmxUp18JZZF_2WuaymzjEGCB74ZrvtVaa2Y',
    tag: 'Just In',
    gender: 'Women',
    category: 'Leggings',
  },
  {
    id: 'p15',
    brand: 'RANGMANCH',
    title: 'Embroidered Festive Silk Wide Trousers',
    price: 2499,
    originalPrice: 3499,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCQfTI9bX50F_i884U9mY2Ca5EjjdFnFWcUnqVt9wA6lj3ye6hsvqZ6rXpLkSgjTUqe8gTwzcRzbvX1FCWchTwX3w3Gk3Sf4pbjc2BHHeF9duOLzRTJe9Ad5l_OVjufRSjCuHMVs31mrZvbluxc7oNzcFKRffrLX7vbrHBJeuEM2ME-e1eIshQeh3qcDWrJfPniRSS8NDO6OzZ07GNDOozMAasxOOcY8UhifXYrQi4J5xcq674009g',
    tag: 'Just In',
    gender: 'Women',
    category: 'Trousers',
  },
  {
    id: 'p16',
    brand: 'AJILE URBAN',
    title: 'Modular Pocket Streetwear Cargo Joggers',
    price: 1999,
    originalPrice: 2799,
    image:
      'https://lh3.googleusercontent.com/aida/AEtjO1WwmT0t9_agqq5IN86fJ9U5-S9-pbX702qCmGVCJcSh3MqPahwLNiJq3VIClVd1KVdh0ORDZE9Q0XHLOjVMM0WxwUw4KCbEVOLlV0O8kL1Z34lSLGUnuce8qrLE8AJr0ERu4p9Yh6X23m-b1e_hG15Cc3kwSoM2RagwTId4cFpVGM1iOSyExUBnbyUpkPgBgq5V44bpvyGsXnTkuqheQaAbnfJpG_8AWmg6WGPxDA',
    tag: 'Just In',
    gender: 'Women',
    category: 'Joggers',
  },
  {
    id: 'p17',
    brand: 'AJILE',
    title: 'Pin-Tuck Flared Active Sweatpants',
    price: 1399,
    originalPrice: 1999,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBpcxYrdBpBnskGVPkrqx1KJ_WZuskUi2cpn0Z3U_sRwMt9FAFOXMhbK9p0GNbpt96nBdZkh6Jbp_DHejdl5Tj9fqxDrb1VJMYhTXCDkv3pE_FtocVKo9pWcjpOwe-4UA64qcxUe70Uv65mH_I0MUzMmEgf61-XzTIQt6N58H2kssjGqNTSS4EgDLrri9_6sK9PNytxXXQCnDHJhp1R3X3erllDXdmtS01jxEexy1iEIwIs2_bNFPY',
    tag: 'Just In',
    gender: 'Women',
    category: 'Sweatpants',
  },
  {
    id: 'p18',
    brand: 'RANGMANCH',
    title: 'Ivory Silk Straight Ankle Trousers',
    price: 2199,
    originalPrice: 2999,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCcgez7LkJFhH0lP1sTNgGum3A5WIGYcuLF8SzYyS0t7PVmghhJyuZWAuY-hDqQy3DZwCd_W9MP3zZx62zpP3pon75bCM8pCXfSyw8RI4OcPoqdbV_RUmnOdORqoehqcggpt8ZRyYsMV1n_sL25i2EFbe52_QwA1KOBqFxRVvhx_qg2oQH1FcVY222nqshmbaGh9zGAEIU0WU-WqgpKUznu1oxC2hbloI6SjH9igS4KRZlFBm4Esac',
    tag: 'Just In',
    gender: 'Women',
    category: 'Trousers',
  },
  {
    id: 'p19',
    brand: 'HONEY CURVYTUDE',
    title: 'Contour High-Rise Studio Lounge Pants',
    price: 1799,
    originalPrice: 2599,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBSm2VvoHUrOSTAgpamdazlrSHFGku9EzmirbNiTNXUk6So6lahoZKMYpAmA4Tgwg9bcTnAkiM0gp7mdzCXLlS-muwFcS5rwoR9pSdBbLcfzRmSR2WhqtNE8cKhlJVDGVvskMFttI-t5z76m3m2NjOmYl2FeX0B1g2NE27JglIU7JXM12H8bc-174LOzBwZ6ummN4papPI4tEwbIhkJiyQlXvBLckwSc22y5xvXhYmnFktcMOY0QpBmZRAc7Q9WqU0',
    tag: 'Just In',
    gender: 'Women',
    category: 'Track Pants',
  },
  {
    id: 'p20',
    brand: 'PETER ENGLAND',
    title: 'Four-Way Flex Athletic Track Pants',
    price: 1599,
    originalPrice: 2299,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBSWN1eLEIcpFGZG66WWSQ-zVAcHvFK9FI_8zZzHOvwNxLEzrY0vJyYzeLQ8JS6ZT3yl9OGx47bsgFg3MT4jSyp1i0S8jjavAsfLmi7--a3cEIpcBe0uJ42NX9-w-E7Jn1sBVzKZ2V6ujuWXDf8YlmIcUJf4Ck5m5_zeXAoKrTwVopymnvZENM39hw2dyJH_Ts8l3qhxDUhTkSJ86bzWZTye71bCTcr5s8yQ28xHOURoPaIfGveXtBbq7ZmtLgOtmk',
    tag: 'Just In',
    gender: 'Women',
    category: 'Track Pants',
  },
];

export default function CategoryPage() {
  const [selectedGender, setSelectedGender] = useState<string>('Boy');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'priceAsc' | 'priceDesc' | 'topDeals'>('popular');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('Track Pants');
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Accordion states
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    gender: true,
    brand: false,
    category: false,
    newArrival: false,
    discount: false,
    offers: false,
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const filteredProducts = useMemo(() => {
    let list = [...allProducts];

    if (selectedBrands.length > 0) {
      list = list.filter((p) => selectedBrands.includes(p.brand));
    }

    if (activeCategoryFilter) {
      list = list.filter((p) => p.category.toLowerCase().includes(activeCategoryFilter.toLowerCase()));
    }

    if (sortBy === 'priceAsc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceDesc') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [selectedBrands, activeCategoryFilter, sortBy]);

  const brandsList = ['AJILE', 'HONEY CURVYTUDE', 'PETER ENGLAND', 'RANGMANCH', 'ATELIER LUXE', 'STUDIO VERVE', 'AJILE URBAN'];

  return (
    <div className="min-h-screen bg-white text-[#1F2937]">
      {/* Page Title & Breadcrumbs Area matching Stitch */}
      <section className="max-w-[1720px] mx-auto w-full px-4 sm:px-6 pt-6 pb-2" data-purpose="category-heading">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-2">
              <h1 className="text-lg font-bold text-gray-900 tracking-tight font-sans">
                Sports Track Pants for Women
              </h1>
              <span className="text-xs text-gray-500 font-normal">208 Products</span>
            </div>
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-800 mt-2 flex-wrap">
              <Link href="/" className="hover:text-black transition">Home</Link>
              <span className="text-gray-400">/</span>
              <span className="hover:text-black cursor-pointer">Women</span>
              <span className="text-gray-400">/</span>
              <span className="hover:text-black cursor-pointer">Sports &amp; Activewear</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-semibold">Track Pants</span>
            </nav>
          </div>

          {/* Sort By Dropdown */}
          <div className="relative self-start md:self-auto">
            <button
              type="button"
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2.5 px-4 py-2 bg-white border border-gray-300 rounded shadow-xs hover:border-gray-400 text-xs sm:text-sm text-gray-900 transition cursor-pointer"
            >
              <ArrowUpDown className="w-4 h-4 text-[#14CDA8]" />
              <span>
                Sort by:{' '}
                <strong className="font-semibold capitalize">
                  {sortBy === 'popular'
                    ? 'Popular'
                    : sortBy === 'newest'
                    ? 'Newest First'
                    : sortBy === 'priceAsc'
                    ? 'Price : Low to High'
                    : sortBy === 'priceDesc'
                    ? 'Price : High to Low'
                    : 'Top Deals'}
                </strong>
              </span>
              <ChevronDown className="w-4 h-4 text-gray-700 ml-2" />
            </button>

            {isSortOpen && (
              <div className="absolute right-0 mt-1 w-52 bg-white border border-gray-200 rounded shadow-lg py-1 z-30">
                {[
                  { key: 'popular', label: 'Popular' },
                  { key: 'newest', label: 'Newest First' },
                  { key: 'priceAsc', label: 'Price : Low to High' },
                  { key: 'priceDesc', label: 'Price : High to Low' },
                  { key: 'topDeals', label: 'Top Deals' },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => {
                      setSortBy(item.key as any);
                      setIsSortOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-stone-50 cursor-pointer ${
                      sortBy === item.key ? 'text-[#14CDA8] font-bold bg-teal-50/50' : 'text-gray-700'
                    }`}
                  >
                    {item.label}
                    {sortBy === item.key && <Check className="w-3.5 h-3.5 text-[#14CDA8]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="w-full h-px bg-gray-200 mt-4" />
      </section>

      {/* Main Content Area: Sidebar + Products */}
      <main className="max-w-[1720px] mx-auto w-full px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-8">
        {/* Left Filter Sidebar matching Stitch */}
        <aside className="w-full lg:w-[250px] shrink-0" data-purpose="filters-sidebar">
          <div className="bg-white p-4 border border-gray-200 shadow-xs space-y-4 rounded">
            {/* Filter Header */}
            <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900 tracking-tight">Filter's</h2>
              {(selectedBrands.length > 0 || activeCategoryFilter !== 'Track Pants') && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedBrands([]);
                    setActiveCategoryFilter('Track Pants');
                  }}
                  className="text-[11px] font-semibold text-[#14CDA8] hover:underline cursor-pointer"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Gender Filter Accordion */}
            <div className="space-y-2.5">
              <div
                onClick={() => toggleAccordion('gender')}
                className="flex items-center justify-between text-[13px] font-semibold text-gray-900 cursor-pointer select-none"
              >
                <span>Gender</span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform ${openAccordions.gender ? 'rotate-180' : ''}`} />
              </div>

              {openAccordions.gender && (
                <div className="space-y-2 pt-0.5">
                  {['Boy', 'Girl', 'Men', 'Women', 'Boy & Girl'].map((gender) => (
                    <label
                      key={gender}
                      className="flex items-center justify-between text-xs text-gray-700 cursor-pointer hover:text-gray-900"
                    >
                      <span>{gender}</span>
                      <input
                        type="radio"
                        name="gender"
                        checked={selectedGender === gender}
                        onChange={() => setSelectedGender(gender)}
                        className="w-3.5 h-3.5 text-[#14CDA8] focus:ring-[#14CDA8] border-gray-300"
                      />
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="h-px bg-gray-100" />

            {/* Brand Accordion */}
            <div className="space-y-2.5">
              <div
                onClick={() => toggleAccordion('brand')}
                className="flex items-center justify-between text-[13px] font-semibold text-gray-900 cursor-pointer select-none hover:text-[#14CDA8] transition"
              >
                <span>Brand</span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform ${openAccordions.brand ? 'rotate-180' : ''}`} />
              </div>

              {openAccordions.brand && (
                <div className="space-y-2 pt-1 max-h-48 overflow-y-auto pr-1">
                  {brandsList.map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center justify-between text-xs text-gray-700 cursor-pointer hover:text-gray-950"
                    >
                      <span>{brand}</span>
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="w-3.5 h-3.5 rounded text-[#14CDA8] focus:ring-[#14CDA8] border-gray-300"
                      />
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="h-px bg-gray-100" />

            {/* Category Accordion */}
            <div className="space-y-2.5">
              <div
                onClick={() => toggleAccordion('category')}
                className="flex items-center justify-between text-[13px] font-semibold text-gray-900 cursor-pointer select-none hover:text-[#14CDA8] transition"
              >
                <span>Category</span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform ${openAccordions.category ? 'rotate-180' : ''}`} />
              </div>

              {openAccordions.category && (
                <div className="space-y-2 pt-1">
                  {['Track Pants', 'Joggers', 'Leggings', 'Sweatpants', 'Trousers'].map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center justify-between text-xs text-gray-700 cursor-pointer hover:text-gray-950"
                    >
                      <span>{cat}</span>
                      <input
                        type="radio"
                        name="category"
                        checked={activeCategoryFilter === cat}
                        onChange={() => setActiveCategoryFilter(cat)}
                        className="w-3.5 h-3.5 text-[#14CDA8] focus:ring-[#14CDA8] border-gray-300"
                      />
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="h-px bg-gray-100" />

            {/* New Arrival Accordion */}
            <div className="space-y-2.5">
              <div
                onClick={() => toggleAccordion('newArrival')}
                className="flex items-center justify-between text-[13px] font-semibold text-gray-900 cursor-pointer select-none hover:text-[#14CDA8] transition"
              >
                <span>New Arrival</span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform ${openAccordions.newArrival ? 'rotate-180' : ''}`} />
              </div>
              {openAccordions.newArrival && (
                <div className="space-y-2 pt-1 text-xs text-gray-600">
                  <label className="flex items-center justify-between cursor-pointer hover:text-black">
                    <span>Last 7 Days</span>
                    <input type="checkbox" className="w-3.5 h-3.5 rounded text-[#14CDA8] focus:ring-[#14CDA8] border-gray-300" />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer hover:text-black">
                    <span>Last 30 Days</span>
                    <input type="checkbox" className="w-3.5 h-3.5 rounded text-[#14CDA8] focus:ring-[#14CDA8] border-gray-300" />
                  </label>
                </div>
              )}
            </div>

            <div className="h-px bg-gray-100" />

            {/* Discount Accordion */}
            <div className="space-y-2.5">
              <div
                onClick={() => toggleAccordion('discount')}
                className="flex items-center justify-between text-[13px] font-semibold text-gray-900 cursor-pointer select-none hover:text-[#14CDA8] transition"
              >
                <span>Discount</span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform ${openAccordions.discount ? 'rotate-180' : ''}`} />
              </div>

              {openAccordions.discount && (
                <div className="space-y-2 pt-1">
                  {['10% and above', '20% and above', '30% and above', '50% and above'].map((disc) => (
                    <label key={disc} className="flex items-center justify-between text-xs text-gray-700 cursor-pointer hover:text-gray-950">
                      <span>{disc}</span>
                      <input type="checkbox" className="w-3.5 h-3.5 rounded text-[#14CDA8] focus:ring-[#14CDA8] border-gray-300" />
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="h-px bg-gray-100" />

            {/* Offer's Accordion */}
            <div className="space-y-2.5">
              <div
                onClick={() => toggleAccordion('offers')}
                className="flex items-center justify-between text-[13px] font-semibold text-gray-900 cursor-pointer select-none hover:text-[#14CDA8] transition"
              >
                <span>Offer's</span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform ${openAccordions.offers ? 'rotate-180' : ''}`} />
              </div>
              {openAccordions.offers && (
                <div className="space-y-2 pt-1 text-xs text-gray-600">
                  <label className="flex items-center justify-between cursor-pointer hover:text-black">
                    <span>Buy 1 Get 1</span>
                    <input type="checkbox" className="w-3.5 h-3.5 rounded text-[#14CDA8] focus:ring-[#14CDA8] border-gray-300" />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer hover:text-black">
                    <span>Special Deals</span>
                    <input type="checkbox" className="w-3.5 h-3.5 rounded text-[#14CDA8] focus:ring-[#14CDA8] border-gray-300" />
                  </label>
                </div>
              )}
            </div>

            <div className="h-px bg-gray-100" />

            {/* Sorting Section in Sidebar */}
            <div className="space-y-2.5 pt-0.5">
              <h3 className="text-[13px] font-semibold text-gray-900">Sorting</h3>
              <div className="space-y-2 pl-0.5">
                {[
                  { key: 'popular', label: 'Popular' },
                  { key: 'newest', label: 'Newest First' },
                  { key: 'priceAsc', label: 'Price : Low to High' },
                  { key: 'priceDesc', label: 'Price : High to Low' },
                  { key: 'topDeals', label: 'Top Deals' },
                ].map((s) => (
                  <label key={s.key} className="flex items-center justify-between text-xs text-gray-700 cursor-pointer hover:text-gray-900">
                    <span>{s.label}</span>
                    <input
                      type="radio"
                      name="sidebar-sorting"
                      checked={sortBy === s.key}
                      onChange={() => setSortBy(s.key as any)}
                      className="w-3.5 h-3.5 text-[#14CDA8] focus:ring-[#14CDA8] border-gray-300"
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Right Products Grid Section matching Stitch */}
        <section className="flex-1 flex flex-col justify-between" data-purpose="product-list-container">
          {/* Active Filters Bar */}
          <div className="mb-4" data-purpose="active-filters-bar">
            <h2 className="text-sm font-bold text-gray-900 mb-2.5">
              Active Filters ({(selectedBrands.length > 0 ? 1 : 0) + (activeCategoryFilter ? 1 : 0)})
            </h2>
            <div className="flex items-center gap-2 flex-wrap">
              {activeCategoryFilter && (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 text-xs text-gray-800 rounded-sm shadow-2xs">
                  <span>Category - {activeCategoryFilter}</span>
                  <button
                    type="button"
                    onClick={() => setActiveCategoryFilter('')}
                    className="text-gray-400 hover:text-black cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}
              {selectedBrands.map((brand) => (
                <span key={brand} className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 text-xs text-gray-800 rounded-sm shadow-2xs">
                  <span>Brand - {brand}</span>
                  <button
                    type="button"
                    onClick={() => toggleBrand(brand)}
                    className="text-gray-400 hover:text-black cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* 4-Column Product Grid 1 (Top 12 slots) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {/* 1st 3 Products */}
            {filteredProducts.slice(0, 3).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.has(product.id)}
                onToggleWishlist={toggleWishlist}
                onQuickView={setQuickViewProduct}
              />
            ))}

            {/* 4th Item: Editorial Campaign Banner Card from Stitch */}
            <article
              className="flex flex-col group cursor-pointer bg-white h-full overflow-hidden"
              data-purpose="campaign-banner-card"
            >
              <div className="relative bg-white overflow-hidden w-full h-full flex-1">
                <img
                  src="https://lh3.googleusercontent.com/aida/AEtjO1UzPjpg5JxthIu69DbKQWTAz7pFLakKeolVqLTZCgE6ss0oK-72aX9z-UFwqVvprbR44v2UItQGpD3O_d7LTlx0c2fklXw_j0JFho4JAwfB8DAb-fvTR8G1D5ERV7LVTVqhXSlUJI0zLwurmUhNfukxGASxH0qYU-6t76hbRhQr-QHAJwxn4hgexr5eKWq4OsCzaabJV3btrQjt_snqFCSwpAcfj1ZBY8zlVF-E9lQ"
                  alt="Editorial Campaign"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </article>

            {/* Products 4 to 11 */}
            {filteredProducts.slice(3, 11).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.has(product.id)}
                onToggleWishlist={toggleWishlist}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>

          {/* Mid-Page Promotional Banner: "Boutique Trends 2025" from Stitch */}
          <div
            className="mt-12 w-full rounded-lg overflow-hidden relative group cursor-pointer shadow-sm border border-gray-200"
            data-purpose="promotional-banner"
          >
            <div className="relative w-full aspect-[21/9] sm:aspect-[24/7] lg:aspect-[28/7] min-h-[220px] overflow-hidden bg-gray-100">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLZgGlfy0g_yN_gavYBnDZVVEhCsqW7Cfvgs30yZSO6FNCmbCUPrDVellt4lJBLNjsgy2qmp7aJ92vwDwu58dh5odua_TCDnadcK0YqxYSaTh7955oucKnjH0BBs-ULzZrHiQh12eQYoSOIAkzD6zz4km4eGSWvJlb3HaG25NfJg3xEgs5Kv50m3UVWBdtCFeRo0kgKk6pUh8sCMQkGAGBVm0YnhvWW7cN_zBnig"
                alt="Boutique Fashion Trends Collection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent flex items-center p-6 sm:p-10">
                <div className="max-w-md text-white space-y-3">
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#14CDA8]">
                    Featured Selection
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-sans text-white">
                    Boutique Trends 2025
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-200 line-clamp-2 leading-relaxed">
                    Explore modern silhouettes, elevated sportswear, and premium essentials crafted for timeless versatility.
                  </p>
                  <div className="pt-1">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 text-xs font-bold uppercase tracking-wider rounded shadow hover:bg-[#14CDA8] hover:text-white transition-all cursor-pointer"
                    >
                      Explore Collection <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Products Grid (below banner) matching Stitch */}
          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-8 mb-8"
            data-purpose="additional-products-grid"
          >
            {filteredProducts.slice(11).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.has(product.id)}
                onToggleWishlist={toggleWishlist}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>

          {/* Load More Button matching Stitch */}
          <div className="mt-12 mb-6 flex flex-col items-center justify-center gap-2.5" data-purpose="load-more-section">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 px-8 py-2.5 bg-white border border-gray-300 rounded-full shadow-2xs hover:border-gray-400 text-xs font-semibold text-gray-800 transition hover:bg-gray-50 cursor-pointer"
            >
              <span>Load More</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-600" />
            </button>
          </div>
        </section>
      </main>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full overflow-hidden shadow-2xl relative border border-stone-200">
            <button
              type="button"
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-700 flex items-center justify-center shadow cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="aspect-[3/4] bg-stone-100 relative">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.title}
                  className="w-full h-full object-cover"
                />
                {quickViewProduct.tag && (
                  <span className="absolute top-0 left-0 bg-[#14CDA8] text-white text-[11px] font-semibold px-2.5 py-1 z-10 uppercase">
                    {quickViewProduct.tag}
                  </span>
                )}
              </div>

              <div className="p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold tracking-wider text-gray-500 uppercase">
                    {quickViewProduct.brand}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mt-1 leading-snug">
                    {quickViewProduct.title}
                  </h3>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-xl font-bold text-gray-900">
                      ₹ {quickViewProduct.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ₹ {quickViewProduct.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-xs font-bold text-[#c8002e]">
                      ({Math.round(((quickViewProduct.originalPrice - quickViewProduct.price) / quickViewProduct.originalPrice) * 100)}% OFF)
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-4 leading-relaxed">
                    Engineered with premium 4-way stretch, ultra-breathable moisture management, and tailored ergonomic seams for maximum active performance.
                  </p>
                  <div className="mt-5">
                    <span className="text-xs font-semibold text-gray-800 block mb-2">Select Size:</span>
                    <div className="flex items-center gap-2">
                      {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                        <button
                          key={size}
                          type="button"
                          className="w-9 h-9 border border-gray-300 rounded text-xs font-semibold text-gray-800 hover:border-black hover:bg-stone-50 cursor-pointer"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex items-center gap-3">
                  <button
                    type="button"
                    className="flex-1 py-3 bg-[#14CDA8] text-white font-bold text-xs uppercase tracking-wider rounded shadow hover:bg-teal-600 transition cursor-pointer"
                  >
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    onClick={(e) => toggleWishlist(quickViewProduct.id, e)}
                    className={`w-11 h-11 border border-gray-300 rounded flex items-center justify-center transition cursor-pointer ${
                      wishlist.has(quickViewProduct.id)
                        ? 'text-[#FF3F6C] border-[#FF3F6C] bg-pink-50'
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${wishlist.has(quickViewProduct.id) ? 'fill-[#FF3F6C]' : ''}`} />
                  </button>
                </div>
                <div className="pt-3 text-center">
                  <Link
                    href={`/product`}
                    className="text-xs text-gray-500 hover:text-black underline font-medium inline-flex items-center gap-1"
                  >
                    View Complete Product Details
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
}: {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (id: string, e: React.MouseEvent) => void;
  onQuickView: (product: Product) => void;
}) {
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <article
      className="flex flex-col group cursor-pointer bg-white"
      data-purpose="product-card"
    >
      <div className="relative bg-white overflow-hidden aspect-[3/4.2] mb-3">
        {product.tag && <HangTag text={product.tag} />}

        {/* Action buttons at top right matching Stitch */}
        <div className="absolute top-2 right-2 flex flex-col gap-1.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            aria-label="View Similar"
            className="w-7 h-7 rounded-full bg-white/95 hover:bg-white text-gray-700 hover:text-[#14CDA8] flex items-center justify-center shadow-sm transition cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            aria-label="Wishlist"
            onClick={(e) => onToggleWishlist(product.id, e)}
            className={`w-7 h-7 rounded-full bg-white/95 hover:bg-white flex items-center justify-center shadow-sm transition cursor-pointer ${
              isWishlisted ? 'text-[#FF3F6C]' : 'text-gray-700 hover:text-[#14CDA8]'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#FF3F6C] text-[#FF3F6C]' : ''}`} />
          </button>
        </div>

        <Link href={`/product`} className="block w-full h-full">
          <img
            alt={`${product.brand} - ${product.title}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            src={product.image}
          />
        </Link>

        {/* Dots Carousel Indicator matching Stitch */}
        <div className="absolute bottom-11 inset-x-0 flex justify-center items-center gap-1 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="w-1.5 h-1.5 rounded-full bg-[#14CDA8]" />
          <span className="w-1 h-1 rounded-full bg-white/80" />
          <span className="w-1 h-1 rounded-full bg-white/80" />
          <span className="w-1 h-1 rounded-full bg-white/80" />
          <span className="w-1 h-1 rounded-full bg-white/80" />
        </div>

        {/* Floating Quick View button on hover matching Stitch */}
        <div className="absolute inset-x-0 bottom-0 z-10 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto flex">
          <button
            type="button"
            onClick={() => onQuickView(product)}
            className="w-full py-2.5 bg-white/95 hover:bg-white text-gray-900 text-xs font-bold uppercase tracking-wider transition-all text-center border-t border-gray-200/60 shadow-sm cursor-pointer"
          >
            QUICK VIEW
          </button>
        </div>
      </div>

      <div className="space-y-1">
        <Link href={`/product`} className="block">
          <h3 className="font-bold text-[13px] uppercase tracking-wider text-gray-900">
            {product.brand}
          </h3>
          <p className="text-xs text-gray-700 truncate leading-snug">
            {product.title}
          </p>
        </Link>
        <div className="pt-0.5 flex items-baseline gap-2 flex-wrap">
          <span className="text-xs font-bold text-gray-900">
            ₹ {product.price.toLocaleString()}
          </span>
          <span className="text-[11px] text-gray-400 line-through">
            ₹ {product.originalPrice.toLocaleString()}
          </span>
          <span className="text-[11px] font-bold text-[#c8002e]">
            ({discountPercent}% OFF)
          </span>
        </div>
      </div>
    </article>
  );
}
