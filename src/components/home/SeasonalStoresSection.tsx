'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { SEASONAL_STORES } from '@/mock/products.mock';

export const SeasonalStoresSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home-seasonal-section"
      data-purpose="curated-department-showcase"
      className="px-4 sm:px-6 lg:px-8"
      aria-labelledby="home-seasonal-title"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2
              id="home-seasonal-title"
              className="text-sm sm:text-base font-bold text-gray-900 uppercase tracking-widest"
            >
              Curated Seasonal Stores
            </h2>
            <div className="w-10 h-0.5 bg-brand-primary mt-1.5" />
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-stone-500 font-medium">
            <span>Swipe &amp; Explore Collections</span>
            <ArrowRight className="w-3.5 h-3.5 text-stone-400" aria-hidden="true" />
          </div>
        </div>

        <div className="relative group/stores">
          {/* Scroll Left Button */}
          <button
            id="home-seasonal-btn-scroll-prev"
            type="button"
            aria-label="Scroll seasonal stores left"
            onClick={() => handleScroll(-320)}
            className="absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-gray-700 hover:text-black border border-stone-200 shadow-md flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Horizontal Scroller */}
          <div
            id="home-seasonal-stores-scroll"
            ref={scrollRef}
            className="overflow-x-auto hide-scrollbar pb-3 px-2 scroll-smooth"
            tabIndex={0}
            role="region"
            aria-label="Seasonal stores carousel"
          >
            <div className="flex items-start gap-4 sm:gap-6 min-w-max">
              {SEASONAL_STORES.map((store) => (
                <Link
                  key={store.id}
                  id={`home-seasonal-card-${store.slug}`}
                  href={`#${store.slug}`}
                  className="group flex flex-col items-center cursor-pointer w-32 sm:w-40 text-center transition-transform hover:-translate-y-1"
                >
                  <div
                    className={`w-full aspect-square rounded-2xl p-1 bg-gradient-to-br ${store.bgGradient} shadow-xs group-hover:shadow-md transition-all`}
                  >
                    <div className="w-full h-full rounded-xl overflow-hidden bg-stone-100 relative">
                      <Image
                        src={store.image}
                        alt={`${store.title} Collection`}
                        fill
                        sizes="(max-width: 640px) 130px, 160px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <span className="mt-2.5 text-xs sm:text-sm font-semibold tracking-wide text-gray-900 group-hover:text-brand-primary transition-colors">
                    {store.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Scroll Right Button */}
          <button
            id="home-seasonal-btn-scroll-next"
            type="button"
            aria-label="Scroll seasonal stores right"
            onClick={() => handleScroll(320)}
            className="absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-gray-700 hover:text-black border border-stone-200 shadow-md flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
