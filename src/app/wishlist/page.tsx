'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  X,
  ShoppingBag,
  ArrowRight,
  Heart,
  Check,
  RotateCcw,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

interface WishlistItem {
  id: string;
  brand: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'women' | 'men';
  sizes: string[];
}

const initialWishlist: WishlistItem[] = [
  {
    id: 'w1',
    brand: 'RANGMANCH',
    title: 'Black Embroidered Festive Ethnic Set',
    price: 4999,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD_yfG-vesaoGCgzNeVIg6Rn_qDlz2NZWF5UH4YviEEP6KmcRB-zYBjqe1MjMBWpMDNa5Hj_IfMUbd02HyC-cRrcV_Qr2WAZ-Nf4TK0Y7HOe_wW7NIoIAQ_hBiCLu3NUlCE4yHxAr63r-H45Ly1KY54MrTJHJT7XdgFG0c52M66wVpq-KdGufBESjOcrU5zS7_j4ZcHLVrdmUPT2hLFspavxfywhzxUtnKemaJRfw',
    category: 'women',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
  },
  {
    id: 'w2',
    brand: 'RANGMANCH',
    title: 'Off-White Embroidered Festive Ethnic Set',
    price: 4499,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBuTkpWil3w80R8bFBFF0kPfC5lR5Xiw1SwKSfHGx3qJWX2-o2p94pfdbsZVKA9iecp13RTaViSLjtLdNod3NyqsJY5Yey3-im4VJFiKtC7wXCR17Xdj4TcAFThdwg2GKQ59luXTB3Y5cjynQx_CLzB-KcIl_o-bjhIrI4Kzrlcucibrc_rMMZ7OkFVhuSO7xQbKShC1dBM_mEPmlALWNlJlCVxbIYO76f-4Ex9xHRVTBtpUODjOJY',
    category: 'women',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
  },
  {
    id: 'w3',
    brand: 'AKKRITI',
    title: 'Green Embroidered Cropped Layered Set',
    price: 1499,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCFRteV2XCQ57UMKxc1YiH2ZKCbp8ZUfgZMZ7iOyiUBa2mns-LSfoxuE1M3oFUWX3BLvt4YCCl44D90No6me9JMzeXWrRr-9mCImU2_5HexlH8xSKLPK2YjF8Qawq1Njz158tTmoqXKIXcwUspR4FLijYJKkC_VR9QlKZ7dDGxuarvw-KubW9dwoz6q9nAP54pRLbMfubKVnphQVKgsJEz8Y6j18SmQWilOmLMrgjnBVfwC5-c6uxQ',
    category: 'women',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
  },
  {
    id: 'w4',
    brand: 'RANGMANCH',
    title: 'Purple Embroidered Tunic, Pants & Dupatta',
    price: 3799,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCFRteV2XCQ57UMKxc1YiH2ZKCbp8ZUfgZMZ7iOyiUBa2mns-LSfoxuE1M3oFUWX3BLvt4YCCl44D90No6me9JMzeXWrRr-9mCImU2_5HexlH8xSKLPK2YjF8Qawq1Njz158tTmoqXKIXcwUspR4FLijYJKkC_VR9QlKZ7dDGxuarvw-KubW9dwoz6q9nAP54pRLbMfubKVnphQVKgsJEz8Y6j18SmQWilOmLMrgjnBVfwC5-c6uxQ',
    category: 'women',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
  },
  {
    id: 'w5',
    brand: 'AJILE',
    title: 'Black Straight Fit Track Pants',
    price: 1599,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA4wxy8pqXj1Y47dZQLKxNW80HLFWJ8H75Vqw9rX7Fa-ZuCGGfV1dN5U04ET2-MtKtHlN8ctHCCctD_Sf_-czirxZLaqpPQ5HxiG3RsPjFxCc35CAXDro1-Y6NkkpLShutCkpM0zB4nox2489SqtKuNo64c-tMvmYASBOx-MzrNyZYCsGgF87ga4D7J1MQ295ZRx0ouRVkw3KuzUsVYHZa04JZPLVYRcgAB765kdEUX6PMBv-KM2ro',
    category: 'women',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
  },
  {
    id: 'w6',
    brand: 'AJILE',
    title: 'Brown Flared Active Pant',
    price: 1299,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKXvzqBGm0KFNf5T3Imxg3NM0eqIWv26sHNrYpXKWLFqX5C7S9W52Gypu9FiMJIeDDSw4Pf4Xmx24KXNoAwCo6eP8wEjI15GDoYa6oQp44PuhEtP0FOjJYWvS0tsUinJzUbu07bIbFTLFbIst4Ca20pHctmC2xIMxh1e-25EFAVDAvMKnTNwHCy-MvDEESIBlQjc1tphVJ8P7KnDrHqrUuKVQoVg6tbPsqFvJPfNykZYB_q7PQWKaUpzNpf189fTY',
    category: 'women',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
  },
];

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>(initialWishlist);
  const [filter, setFilter] = useState<'all' | 'women' | 'men'>('all');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    w1: 'M',
    w2: 'M',
    w3: 'M',
    w4: 'M',
    w5: 'M',
    w6: 'M',
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleRemove = (id: string, title: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    showToast(`Removed "${title}" from Wishlist`);
  };

  const handleSelectSize = (itemId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [itemId]: size }));
  };

  const handleMoveToBag = (item: WishlistItem) => {
    const chosenSize = selectedSizes[item.id] || 'M';
    showToast(`"${item.title}" (Size ${chosenSize}) moved to your bag!`);
    // Optional: remove from wishlist once moved to bag
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  };

  const handleResetWishlist = () => {
    setItems(initialWishlist);
    showToast('Reset sample wishlist items.');
  };

  const filteredItems = useMemo(() => {
    if (filter === 'all') return items;
    return items.filter((item) => item.category === filter);
  }, [items, filter]);

  return (
    <div className="min-h-screen bg-[#FAF4F4] text-slate-800 antialiased pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3">
          <Check className="w-4 h-4 text-emerald-400" />
          {toastMessage}
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-16 pt-8 pb-12 w-full">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500 mb-8">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-slate-800 transition-colors">
                Pantaloons
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/category" className="hover:text-slate-800 transition-colors">
                My Account
              </Link>
            </li>
            <li>/</li>
            <li className="text-slate-800 font-semibold">My Wishlist</li>
          </ol>
        </nav>

        {/* Title & Filter Header */}
        <div className="relative mb-10">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-medium text-slate-900 tracking-tight">
              My Wishlist
            </h1>
            <p className="text-xs text-slate-500 mt-1.5 font-medium">
              {filteredItems.length} {filteredItems.length === 1 ? 'Product' : 'Products'}
            </p>
          </div>

          {/* Right Filter Dropdown */}
          <div className="flex justify-end mt-4 sm:mt-0 sm:absolute sm:right-0 sm:top-2">
            <div className="relative inline-block w-36">
              <select
                aria-label="Filter Wishlist"
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'women' | 'men')}
                className="w-full appearance-none bg-white border border-slate-700 rounded-lg px-4 py-2 text-xs text-slate-800 pr-8 focus:outline-none cursor-pointer font-medium"
              >
                <option value="all">All</option>
                <option value="women">Women</option>
                <option value="men">Men</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-600">
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Wishlist Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="flex flex-wrap gap-8 justify-center">
            {filteredItems.map((item) => {
              const currentSize = selectedSizes[item.id] || 'M';
              return (
                <div
                  key={item.id}
                  className="w-[280px] flex flex-col group relative bg-white rounded-lg p-2.5 shadow-2xs hover:shadow-md transition-all duration-300"
                >
                  {/* Product Image Box */}
                  <div className="relative overflow-hidden bg-slate-100 mb-3 aspect-[3/4] rounded">
                    <Link href={`/product/${item.id}`} className="block w-full h-full">
                      <img
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src={item.image}
                      />
                    </Link>

                    {/* Circular Cross / Remove Button on Bottom-Right */}
                    <button
                      aria-label="Remove item"
                      type="button"
                      onClick={() => handleRemove(item.id, item.title)}
                      className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-slate-800 hover:bg-slate-100 transition z-20 cursor-pointer"
                      title="Remove from Wishlist"
                    >
                      <X className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>

                  {/* Metadata */}
                  <div className="space-y-1 px-1">
                    <div className="text-xs font-bold tracking-widest text-slate-900 uppercase">
                      {item.brand}
                    </div>
                    <Link
                      href={`/product/${item.id}`}
                      className="block text-xs text-slate-600 truncate hover:text-black transition"
                    >
                      {item.title}
                    </Link>
                    <div className="text-xs font-bold text-slate-900 mt-1">
                      ₹ {item.price.toLocaleString()}
                    </div>
                  </div>

                  {/* Interactive Size Selector & MOVE TO BAG on Hover */}
                  <div className="mt-3 transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 px-1">
                    <div className="flex items-center gap-1.5 mb-2.5">
                      {item.sizes.map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => handleSelectSize(item.id, sz)}
                          className={`px-2.5 py-1 text-xs border font-medium transition cursor-pointer ${
                            currentSize === sz
                              ? 'border-slate-900 bg-slate-900 text-white'
                              : 'border-slate-800 text-slate-800 hover:bg-slate-900 hover:text-white'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleMoveToBag(item)}
                      className="w-full py-2.5 bg-[#00a89d] hover:bg-[#00968c] text-white text-xs font-bold tracking-wider uppercase shadow transition-colors flex items-center justify-center gap-2 cursor-pointer rounded"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      MOVE TO BAG
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="max-w-md mx-auto text-center py-16 px-4 bg-white rounded-3xl border border-slate-200 shadow-sm my-6">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Your wishlist is empty</h2>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Explore our fresh fashion arrivals, seasonal collections, and trending styles to add
              items you love.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/category"
                className="py-2.5 px-6 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition inline-flex items-center justify-center gap-2"
              >
                Explore Categories
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={handleResetWishlist}
                className="py-2.5 px-5 rounded-xl border border-slate-300 text-slate-700 font-medium text-xs hover:bg-slate-50 transition inline-flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Restore Sample Items
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
