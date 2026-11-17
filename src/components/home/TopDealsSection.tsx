'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { TOP_DEALS } from '@/mock/products.mock';

export const TopDealsSection: React.FC = () => {
  return (
    <section
      id="home-topdeals-section"
      data-purpose="top-deals"
      className="px-4 sm:px-6 lg:px-8"
      aria-labelledby="home-topdeals-heading"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2
              id="home-topdeals-heading"
              className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-gray-900"
            >
              Top Deals
            </h2>
            <p className="text-xs text-content-secondary mt-0.5">
              Handpicked premium discounts refreshed daily
            </p>
          </div>
          <Link
            id="home-topdeals-link-view-all"
            href="#top-deals"
            className="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>

        {/* 4-column card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TOP_DEALS.map((deal) => (
            <article
              key={deal.id}
              id={`home-topdeals-card-${deal.id}`}
              className="product-card bg-white rounded-3xl border border-[#E5E7EB] overflow-hidden p-3.5 flex flex-col justify-between"
            >
              <div className="w-full aspect-[4/5] bg-stone-100 rounded-2xl overflow-hidden relative">
                <Image
                  src={deal.image}
                  alt={deal.subtitle}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#BA1A1A] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                  {deal.badge}
                </span>
              </div>

              <div className="p-3 text-center">
                <h3 className="text-base font-extrabold text-gray-900">{deal.title}</h3>
                <p className="text-xs text-content-secondary mt-0.5">{deal.subtitle}</p>
                <div className="mt-3 pt-2.5 border-t border-[#F2EDED] flex items-center justify-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center text-[10px] font-bold">
                    {deal.brandAvatar}
                  </span>
                  <span className="text-[11px] font-semibold text-gray-700">{deal.brand}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
