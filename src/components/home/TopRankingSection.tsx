'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import { RANKING_TABS } from '@/mock/navigation.mock';
import { RANKED_PRODUCTS } from '@/mock/products.mock';

export const TopRankingSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  const carouselRef = useRef<HTMLDivElement>(null);

  const products = RANKED_PRODUCTS[activeTab] || RANKED_PRODUCTS['All'];

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const offset = direction === 'left' ? -300 : 300;
      carouselRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home-topranking-section"
      data-purpose="top-ranking-showcase"
      className="px-4 sm:px-6 lg:px-8 py-8 bg-[#F9F9FF] border-y border-stone-200"
      aria-labelledby="home-topranking-heading"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-brand-primary text-xs font-bold uppercase tracking-wider mb-1">
              <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Real-Time Popularity Matrix</span>
            </div>
            <h2
              id="home-topranking-heading"
              className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-gray-900"
            >
              Top Ranking
            </h2>
            <p className="text-xs text-content-secondary mt-0.5">
              Based on real-time order volume and customer ratings
            </p>
          </div>
          <Link
            id="home-topranking-link-view-all"
            href="#top-ranking"
            className="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>

        {/* Category Filter Tabs */}
        <div
          id="home-topranking-tabs-rail"
          className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-4"
          role="tablist"
          aria-label="Ranking Categories"
        >
          {RANKING_TABS.map((cat: string) => {
            const isActive = activeTab === cat;
            return (
              <button
                key={cat}
                id={`home-topranking-tab-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:text-black border border-stone-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Showcase Container: Left Billboard + Right Ranked Carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mt-2">
          {/* Left Billboard Card */}
          <div
            id="home-topranking-billboard"
            className="lg:col-span-3 bg-gradient-to-br from-stone-900 to-black text-white rounded-2xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden"
          >
            <div className="space-y-2 z-10">
              <span className="bg-brand-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider inline-block">
                HALL OF FAME
              </span>
              <h3 className="text-2xl font-extrabold tracking-tight mt-2 leading-tight">
                3902 NEW STYLES JUST LANDED
              </h3>
              <p className="text-xs text-stone-300">
                Verified luxury wellness and contemporary ready-to-wear drops.
              </p>
            </div>

            <div className="mt-8 z-10">
              <button
                id="home-topranking-btn-shop-billboard"
                type="button"
                className="w-full py-2.5 bg-white text-stone-900 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-stone-100 transition-colors shadow-sm cursor-pointer"
              >
                SHOP NOW
              </button>
            </div>

            {/* Subtle glow circle */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-primary/20 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Right Horizontal Ranked Products Carousel */}
          <div className="lg:col-span-9 relative group">
            {/* Carousel Arrow Left */}
            <button
              id="home-topranking-btn-prev"
              type="button"
              aria-label="Scroll ranked items left"
              onClick={() => scrollCarousel('left')}
              className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white text-stone-900 shadow-md border border-stone-200 flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Horizontal Scroller */}
            <div
              ref={carouselRef}
              id="home-topranking-carousel-track"
              className="flex items-stretch gap-4 overflow-x-auto hide-scrollbar py-2 scroll-smooth"
            >
              {products.map((item, idx) => (
                <article
                  key={item.id}
                  id={`home-topranking-card-rank-${idx + 1}`}
                  className="product-card bg-white rounded-2xl border border-stone-200 overflow-hidden flex flex-col justify-between p-3 w-52 sm:w-60 shrink-0 shadow-xs"
                >
                  <div className="w-full aspect-[4/5] bg-stone-100 rounded-xl overflow-hidden relative mb-3">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="240px"
                      className="object-cover"
                    />
                    {/* Rank Number Badge */}
                    <span className="absolute top-2 left-2 w-6 h-6 rounded-full bg-stone-900 text-white font-mono text-xs font-bold flex items-center justify-center shadow-md">
                      #{idx + 1}
                    </span>
                    <span className="absolute top-2 right-2 bg-brand-primary text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                      {item.discountBadge}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-gray-900 block">{item.brand}</span>
                    <h4 className="text-xs text-content-secondary font-medium line-clamp-2 mt-0.5">
                      {item.title}
                    </h4>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#F2EDED] flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-900">₹ {item.price}</span>
                    <span className="text-xs text-gray-400 line-through">
                      ₹ {item.originalPrice}
                    </span>
                  </div>
                </article>
              ))}
            </div>

            {/* Carousel Arrow Right */}
            <button
              id="home-topranking-btn-next"
              type="button"
              aria-label="Scroll ranked items right"
              onClick={() => scrollCarousel('right')}
              className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white text-stone-900 shadow-md border border-stone-200 flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
