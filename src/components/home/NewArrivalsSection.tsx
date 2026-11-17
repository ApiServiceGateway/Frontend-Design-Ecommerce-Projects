'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShieldCheck, Check, Sparkles } from 'lucide-react';
import { NEW_ARRIVALS } from '@/mock/products.mock';
import { useCartStore } from '@/stores/cart.store';

export const NewArrivalsSection: React.FC = () => {
  const { addItem, currency, setCurrency } = useCartStore();
  const [reservedIds, setReservedIds] = useState<Record<string, boolean>>({});

  const handleReserve = (product: (typeof NEW_ARRIVALS)[0]) => {
    addItem({
      id: product.id,
      title: product.title,
      brand: product.brand,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
    });
    setReservedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setReservedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <section
      id="home-newarrivals-section"
      data-purpose="new-arrivals"
      className="px-4 sm:px-6 lg:px-8 py-6"
      aria-labelledby="home-newarrivals-heading"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Header & Currency Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-2 gap-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                FAST RESERVE PROTOCOL
              </span>
              <span className="bg-stone-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                18 Ready to Ship
              </span>
            </div>
            <h2
              id="home-newarrivals-heading"
              className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-gray-900"
            >
              New Arrivals
            </h2>
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-stone-500 font-medium">Display Price:</span>
            <div
              id="home-newarrivals-currency-toggle"
              className="inline-flex rounded-lg border border-stone-300 p-0.5 bg-stone-100"
            >
              <button
                type="button"
                onClick={() => setCurrency('INR')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                  currency === 'INR'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                ₹ INR
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USDT')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                  currency === 'USDT'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                $ USDT
              </button>
            </div>
          </div>
        </div>

        {/* 4-column x 2-row Responsive Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {NEW_ARRIVALS.map((product) => {
            const isReserved = reservedIds[product.id];
            return (
              <article
                key={product.id}
                id={`home-newarrivals-card-${product.id}`}
                className="product-card bg-white rounded-2xl border border-stone-200 overflow-hidden flex flex-col justify-between shadow-xs p-3"
              >
                <div>
                  <div className="w-full aspect-[4/5] bg-stone-100 rounded-xl overflow-hidden relative mb-3">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-stone-900 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                      {product.discountBadge}
                    </span>
                    <span className="absolute top-2.5 right-2.5 bg-emerald-700 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-xs">
                      <ShieldCheck className="w-2.5 h-2.5" />
                      Fast Reserve
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-gray-900">{product.brand}</span>
                      <span className="text-[11px] text-stone-500 font-mono">
                        {product.fabricOrSpec}
                      </span>
                    </div>
                    <h3 className="text-xs text-content-secondary font-medium truncate">
                      {product.title}
                    </h3>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F2EDED] flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-gray-900">
                      {currency === 'INR' ? `Rs. ${product.price}` : product.usdtPrice}
                    </div>
                    <div className="text-[11px] text-gray-400 line-through">
                      Rs. {product.originalPrice}
                    </div>
                  </div>

                  <button
                    id={`home-newarrivals-btn-reserve-${product.id}`}
                    type="button"
                    onClick={() => handleReserve(product)}
                    className="px-3.5 py-1.5 bg-brand-primary text-white text-xs font-bold rounded-lg hover:bg-brand-primary-hover transition-colors uppercase tracking-wider shadow-xs cursor-pointer active:scale-95 flex items-center gap-1"
                    aria-label={`Quick reserve ${product.title}`}
                  >
                    {isReserved ? (
                      <>
                        <Check className="w-3 h-3 text-white" />
                        <span>Reserved</span>
                      </>
                    ) : (
                      <span>QUICK RESERVE</span>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
