'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Bolt, Plus, Check } from 'lucide-react';
import { DEALS_OF_THE_MONTH } from '@/mock/products.mock';
import { useCartStore } from '@/stores/cart.store';

export const DealOfTheMonthSection: React.FC = () => {
  const { addItem } = useCartStore();
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const handleQuickAdd = (product: (typeof DEALS_OF_THE_MONTH)[0]) => {
    addItem({
      id: product.id,
      title: product.title,
      brand: product.brand,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
    });
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  return (
    <section
      id="home-dealmonth-section"
      data-purpose="deal-of-the-month"
      className="w-full py-6 px-4 sm:px-6 lg:px-8 bg-white"
      aria-labelledby="home-dealmonth-heading"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
              <span className="text-brand-primary font-extrabold">HOT SELECTION</span> Limited Allocation
            </span>
            <h2
              id="home-dealmonth-heading"
              className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-gray-900"
            >
              Deal of this month
            </h2>
          </div>
          <Link
            id="home-dealmonth-link-view-all"
            href="#deal-of-month"
            className="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>

        {/* 5-Column Grid matching Stitch Screen */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
          {DEALS_OF_THE_MONTH.map((item) => {
            const isAdded = addedIds[item.id];
            return (
              <article
                key={item.id}
                id={`home-dealmonth-card-${item.id}`}
                className="product-card bg-white rounded-2xl border border-stone-200 overflow-hidden flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="w-full aspect-[4/5] bg-stone-100 overflow-hidden relative mb-3">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover"
                    />
                    <span className="absolute top-0 right-0 bg-brand-primary text-white text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider shadow-xs">
                      {item.discountBadge}
                    </span>
                  </div>

                  <div className="px-3.5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-gray-900">{item.brand}</span>
                      <span className="text-xs font-bold text-brand-primary">Save 70%</span>
                    </div>
                    <h3 className="text-xs text-content-secondary font-medium mb-3 truncate">
                      {item.title}
                    </h3>

                    {/* Stock Allocation Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1.5">
                        <span>Stock Allocation:</span>
                        <span className="font-medium text-gray-700">
                          {item.claimedPercent}% Claimed ({item.stockLeft} left)
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-primary rounded-full transition-all duration-500"
                          style={{ width: `${item.claimedPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3.5 pt-2 border-t border-[#F2EDED]">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-bold text-gray-900">Rs. {item.price}</span>
                    <span className="text-xs text-gray-400 line-through">
                      Rs. {item.originalPrice}
                    </span>
                  </div>

                  <button
                    id={`home-dealmonth-btn-quickadd-${item.id}`}
                    type="button"
                    onClick={() => handleQuickAdd(item)}
                    className="px-3 py-1.5 bg-stone-900 text-white text-xs font-bold rounded-lg hover:bg-black transition-colors flex items-center gap-1 cursor-pointer active:scale-95"
                    aria-label={`Add ${item.title} to bag`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3 h-3" />
                        <span>Quick Add</span>
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}

          {/* Card 5: Collector Vault Card */}
          <article
            id="home-dealmonth-card-collector-vault"
            className="product-card bg-[#121316] text-white rounded-2xl border border-stone-800 overflow-hidden p-5 flex flex-col justify-between shadow-sm"
          >
            <div className="flex flex-col items-center text-center pt-2">
              <div className="w-10 h-10 rounded-full bg-stone-800/80 border border-stone-700 flex items-center justify-center mb-3 text-brand-primary">
                <Bolt className="w-5 h-5 text-brand-primary" aria-hidden="true" />
              </div>
              <span className="text-brand-primary text-[10px] font-bold uppercase tracking-widest mb-1">
                Rotation Window
              </span>
              <h3 className="text-base font-bold text-white mb-1">Next Drop: 02h 14m</h3>
              <p className="text-[11px] text-stone-400">16 Archival SKUs Queueing</p>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400 font-medium">Collector Vault</span>
                <span className="text-brand-primary font-semibold text-[11px]">Queue Open</span>
              </div>
              <h4 className="text-sm font-bold text-white">High-Velocity Releases</h4>
              <div>
                <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1.5">
                  <span>VIP Priority Pass:</span>
                  <span className="text-white font-semibold">98% Booked</span>
                </div>
                <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: '98%' }} />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="text-xs text-stone-400">
                  <span>Fast Pass</span>
                  <div className="text-white font-mono font-bold">0.00</div>
                </div>
                <button
                  id="home-dealmonth-btn-queue-access"
                  type="button"
                  className="px-4 py-2 bg-white text-stone-900 font-bold text-xs rounded-xl hover:bg-stone-100 transition-colors uppercase tracking-wider shadow-sm cursor-pointer active:scale-95"
                >
                  QUEUE ACCESS
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
