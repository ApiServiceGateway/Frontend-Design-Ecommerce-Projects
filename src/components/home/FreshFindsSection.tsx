'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Check, Compass } from 'lucide-react';
import { FRESH_FINDS } from '@/mock/products.mock';
import { useCartStore } from '@/stores/cart.store';

export const FreshFindsSection: React.FC = () => {
  const { addItem } = useCartStore();
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const [visibleCount, setVisibleCount] = useState(8);

  const handleQuickAdd = (product: (typeof FRESH_FINDS)[0]) => {
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
      id="home-freshfinds-section"
      data-purpose="fresh-finds-discovery"
      className="px-4 sm:px-6 lg:px-8 py-6"
      aria-labelledby="home-freshfinds-heading"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-1.5 text-brand-primary text-xs font-bold uppercase tracking-wider mb-1">
            <Compass className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Algorithmic Curation</span>
          </div>
          <h2
            id="home-freshfinds-heading"
            className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-gray-900"
          >
            Fresh Finds
          </h2>
          <p className="text-xs text-content-secondary mt-0.5">Based On Your Recent Activity</p>
        </div>

        {/* Dense Responsive 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {FRESH_FINDS.slice(0, visibleCount).map((product) => {
            const isAdded = addedIds[product.id];
            return (
              <article
                key={product.id}
                id={`home-freshfinds-card-${product.id}`}
                className="product-card bg-white rounded-2xl border border-stone-200 overflow-hidden flex flex-col justify-between p-3 shadow-xs"
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
                    <span className="absolute top-2.5 right-2.5 bg-[#BA1A1A] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                      {product.discountBadge}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-gray-900">{product.brand}</span>
                    <h3 className="text-xs text-content-secondary font-medium line-clamp-1 mt-0.5">
                      {product.title}
                    </h3>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#F2EDED] flex items-center justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-bold text-gray-900">Rs. {product.price}</span>
                    <span className="text-xs text-gray-400 line-through">
                      Rs. {product.originalPrice}
                    </span>
                  </div>

                  <button
                    id={`home-freshfinds-btn-add-${product.id}`}
                    type="button"
                    onClick={() => handleQuickAdd(product)}
                    className="p-1.5 bg-stone-100 hover:bg-stone-900 hover:text-white rounded-lg transition-colors cursor-pointer text-stone-700 active:scale-95"
                    aria-label={`Quick add ${product.title} to bag`}
                  >
                    {isAdded ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Explore More Action */}
        <div className="mt-10 text-center">
          <button
            id="home-freshfinds-btn-explore"
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 4)}
            className="px-8 py-3 bg-stone-900 hover:bg-black text-white text-xs font-extrabold uppercase tracking-widest rounded-full transition-all shadow-md cursor-pointer hover:scale-102 active:scale-98"
          >
            EXPLORE MORE
          </button>
        </div>
      </div>
    </section>
  );
};
