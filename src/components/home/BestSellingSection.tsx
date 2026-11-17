'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Award } from 'lucide-react';
import { FLAGSHIP_BRANDS } from '@/mock/products.mock';

export const BestSellingSection: React.FC = () => {
  return (
    <section
      id="home-bestselling-section"
      data-purpose="bestselling-flagships"
      className="px-4 sm:px-6 lg:px-8 py-6"
      aria-labelledby="home-bestselling-heading"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2
              id="home-bestselling-heading"
              className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-gray-900"
            >
              BestSelling
            </h2>
            <p className="text-xs text-content-secondary mt-0.5">
              Signature designer flagships &amp; premier brand labels
            </p>
          </div>
          <Link
            id="home-bestselling-link-lookbook"
            href="#lookbook"
            className="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1"
          >
            <span>View Lookbook</span>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>

        {/* 3 Featured Brand Spotlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FLAGSHIP_BRANDS.map((brand) => (
            <article
              key={brand.id}
              id={`home-bestselling-card-${brand.id}`}
              className="product-card bg-white rounded-3xl border border-stone-200 p-6 flex flex-col justify-between shadow-xs hover:border-stone-400 transition-all text-center relative overflow-hidden"
            >
              <div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-stone-100 rounded-full text-stone-700 mb-6">
                  <Award className="w-3 h-3 text-amber-500" />
                  {brand.badge}
                </span>

                {/* Monogram Badge */}
                <div
                  className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-white font-extrabold text-xl shadow-md mb-4"
                  style={{ backgroundColor: brand.accentColor }}
                >
                  {brand.monogram}
                </div>

                <h3 className="text-lg font-bold text-gray-900">{brand.name}</h3>
                <p className="text-xs text-content-secondary mt-1 max-w-xs mx-auto">
                  {brand.tagline}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-100">
                <Link
                  id={`home-bestselling-btn-shop-${brand.id}`}
                  href={`#${brand.id}`}
                  className="inline-flex items-center justify-center w-full py-2.5 bg-stone-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                >
                  Shop Brand
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
