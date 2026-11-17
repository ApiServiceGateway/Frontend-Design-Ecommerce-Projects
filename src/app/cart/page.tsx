'use client';

import React, { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import {
  Heart,
  X,
  ChevronDown,
  Check,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Gift,
  Mail,
  Tag,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Bookmark,
} from 'lucide-react';

interface CartItem {
  id: string;
  brand: string;
  title: string;
  inrPrice: number;
  inrOriginal: number;
  usdPrice: number;
  usdOriginal: number;
  discount: string;
  image: string;
  size: string;
  qty: number;
  selected: boolean;
  isWishlisted: boolean;
}

const initialCartItems: CartItem[] = [
  {
    id: 'c1',
    brand: 'Peter England',
    title: "Premium Jean's for men",
    inrPrice: 899,
    inrOriginal: 1099,
    usdPrice: 4.55,
    usdOriginal: 7.4,
    discount: '68% OFF',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDY0xSUrGGGVxdhH07-IFW2oouYC1qZHP3Hjzf5OZD9n40kq1jHnDa-rI7F1mbKPxRsCx_yfcitViFO9PF4eZfd6K5n7UcOpS1Ihm2A1xRxfl0bXubQ9MEJoydw9_gC2y_0L2cyhEaRZi3X8MhYpNxDRLYCbuT0wT6RTT_Z_phJEUs-QbETsZs4B4hHqmvNLXboyxXcfY2Ziy7R3BR5Em532Xg9kBGCpjiHd2mczg',
    size: '41',
    qty: 2,
    selected: true,
    isWishlisted: true,
  },
  {
    id: 'c2',
    brand: 'Peter England',
    title: "Premium Jean's for men",
    inrPrice: 899,
    inrOriginal: 1100,
    usdPrice: 4.55,
    usdOriginal: 8.4,
    discount: '68% OFF',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBY6IIwLanjW5DdyzF3WI95I_q2fZQKodnwxRNfrDpPl3WijtOFaAzVstsA8ZTfhnOCcYaM7y7D7kyCqBQ0n8sE0s4ItQ_76oQcO3utgAswdIvEqtf4h0nJ1sF5qTUTgd3nxC4bYdZKOtCcX-C7toCOW7CBN098y56RSTK1ZyzcYDlFvtB1yFz_-5hVPoYUIasgHysA7zWbZPiQ7TRQjrphag2FIgeiLq677BAX_g',
    size: '41',
    qty: 2,
    selected: false,
    isWishlisted: false,
  },
  {
    id: 'c3',
    brand: 'Peter England',
    title: "Premium Jean's for men",
    inrPrice: 899,
    inrOriginal: 1599,
    usdPrice: 4.55,
    usdOriginal: 9.3,
    discount: '68% OFF',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCIaT5ga8wquCTupAiTxQ0_ISr-braY8LeuHfGMTEy6YIJjyJVF7HsnDjo-tzEqovdSICX0OewVkL1-WdVEEx7gRtdtf3VSpJesvPO3HCkjT9iykeUUfiP1yOpeNYqe45RRSv0fz9XrOs-T8U7TBSAyDi9wbQ0OIFuaG0BjPMASUkZIEXIa1sHHC9bZ6kKqP4CnZyLnJaNGYuDUlPXeOuAyRMyEcc7FdXU-mR97yw',
    size: '41',
    qty: 2,
    selected: true,
    isWishlisted: true,
  },
  {
    id: 'c4',
    brand: 'Peter England',
    title: "Premium Jean's for men",
    inrPrice: 899,
    inrOriginal: 1399,
    usdPrice: 4.55,
    usdOriginal: 10.3,
    discount: '68% OFF',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB7lZ-4vv0DDqfWQiopODDa62gvyejTBluZYjcFabq3UxLYPGnMe5DQPsWNWjDJ_B9IKXf9Iwxb6_hn9JvrItnNbAEetN6331qIPqgAwhFH6HbRIR9Ic-KDRdfOkhwIYQio92j0-EgqQ8bsujKgtUzI4VGl8t5iG0OMKx-Yy7ZgM9tItLe0KdDKj7o704zj_QfcLh7x3A4QwVUZ7-YrIze3PMPGDyDe4wfihfW93w',
    size: '41',
    qty: 2,
    selected: true,
    isWishlisted: false,
  },
];

// Recommendations ("You may also like")
const recommendations = [
  {
    id: 'rec1',
    brand: 'FOREVER GLAM',
    title: 'Off-White Structured Shoulder Bag',
    price: 2099,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB3j_02EUKYjgsDSNqGwczagRMdkb0JzxXDdCas5gKtey8GGSmwRh35MvCPfY0bXFUbB3r3ZfpWhuYYUpz0dQ47IKGrQezv-P_iLxcziUR2GlbnpnibwtSaWEuo9OPHYNtfSLp53TcvSfNv-Utvx-02igSysVOr_bknLLePUQC9JMF95jAq26h2nZLX8eyPxRsHORdlB60SIVuP0jL9R-Y3gtE8eLBZk_J1Q_6uOfHgZk83fC4NDIw',
    hasJustIn: true,
  },
  {
    id: 'rec2',
    brand: 'FOREVER GLAM',
    title: 'Black Trapeze Shoulder Bag',
    price: 1699,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB3j_02EUKYjgsDSNqGwczagRMdkb0JzxXDdCas5gKtey8GGSmwRh35MvCPfY0bXFUbB3r3ZfpWhuYYUpz0dQ47IKGrQezv-P_iLxcziUR2GlbnpnibwtSaWEuo9OPHYNtfSLp53TcvSfNv-Utvx-02igSysVOr_bknLLePUQC9JMF95jAq26h2nZLX8eyPxRsHORdlB60SIVuP0jL9R-Y3gtE8eLBZk_J1Q_6uOfHgZk83fC4NDIw',
    hasJustIn: true,
  },
  {
    id: 'rec3',
    brand: 'FOREVER GLAM',
    title: 'Taupe Floral Embroidered Mules',
    price: 1699,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB3j_02EUKYjgsDSNqGwczagRMdkb0JzxXDdCas5gKtey8GGSmwRh35MvCPfY0bXFUbB3r3ZfpWhuYYUpz0dQ47IKGrQezv-P_iLxcziUR2GlbnpnibwtSaWEuo9OPHYNtfSLp53TcvSfNv-Utvx-02igSysVOr_bknLLePUQC9JMF95jAq26h2nZLX8eyPxRsHORdlB60SIVuP0jL9R-Y3gtE8eLBZk_J1Q_6uOfHgZk83fC4NDIw',
    hasJustIn: false,
  },
  {
    id: 'rec4',
    brand: 'FOREVER GLAM',
    title: 'Casual Women Kitten Heels',
    price: 899,
    originalPrice: 1999,
    discount: '55% OFF',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB3j_02EUKYjgsDSNqGwczagRMdkb0JzxXDdCas5gKtey8GGSmwRh35MvCPfY0bXFUbB3r3ZfpWhuYYUpz0dQ47IKGrQezv-P_iLxcziUR2GlbnpnibwtSaWEuo9OPHYNtfSLp53TcvSfNv-Utvx-02igSysVOr_bknLLePUQC9JMF95jAq26h2nZLX8eyPxRsHORdlB60SIVuP0jL9R-Y3gtE8eLBZk_J1Q_6uOfHgZk83fC4NDIw',
    hasJustIn: false,
  },
  {
    id: 'rec5',
    brand: 'FOREVER GLAM',
    title: 'Classic Quilted Crossbody',
    price: 2499,
    originalPrice: 3999,
    discount: '38% OFF',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCXYUvNtVtnBZ2jBepHyE_H_dNIgzCtTmEkusZWcJ_CMFlHVDcVgERPl0PStQlR-VLkR76Pr_EKUYkheQdEfwoG8x9aJJVL1y3Ewy62604CZOo5NuINt5HL7rvPdj4LRYGSIMoH0mkpC2bozLwueWV3ZZjfya6GSTnWjybeNn7fGXBHtbZ1lBCSP8eqMC6vzkHhi8rbA9_0T8an5zXfGQdYogPc8R8rFHRuETTVoqSQ8GZsadH0Qz0',
    hasJustIn: false,
  },
  {
    id: 'rec6',
    brand: 'FOREVER GLAM',
    title: 'Minimalist Block Heel Sandal',
    price: 1499,
    originalPrice: 2499,
    discount: '40% OFF',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA1GjGdXH9Cr2gkVJOTT3uBHsETySbOOKK5QOgcmvegsphhCqPkeaLwPCeSILei3vvn8qTBxHq1yQd413kXYt0UgPBtQ6HKwCL2C-xXigC8VUmtvVy0ikl4q_JRICxPKBjp77YNeIxsRvooITnVmVkXHwapu2tFnpMP0ibhAIlVT9zZOAqGx5aMs6asxiwDVkYokhkxlZ98cukfXWsOrIYFi8tRuBk4hqN_Bm8n_wG34CksdmljxGM',
    hasJustIn: false,
  },
  {
    id: 'rec7',
    brand: 'FOREVER GLAM',
    title: 'Suede Slouchy Tote',
    price: 2899,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDkT7H7yJ1Hl-fSdq2YbQaRNc22vh9oDTwvauF_4WxFQtaNOKfV5sJ2fes1glI786_ETznwcMXotyxx2iiF0Mxp0oritq9ICW-xaAXMnCWfCCHGfHEQcYW9lPwwCoFSB5_g242DfgwuOjmtVkBbOd-MCbFcrHq_fLvijs-J0DoDs4FrSfaziji15OqyUTZLotsWSqQxentYEjU6_cgDQI5Nj3Nd6mlIJJfJh41FOAAl-8QB2VB6vEg',
    hasJustIn: false,
  },
  {
    id: 'rec8',
    brand: 'FOREVER GLAM',
    title: 'Pointed Toe Slingback',
    price: 1799,
    originalPrice: 2999,
    discount: '40% OFF',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAQJVT6GGN0f8-Qaf62nVioMO1hcyUMVrUX1LIm6VB8ayenqVbZUhlWMU9R3ll6gx9uhNhu8EjorMDVu810F9rZNyxgtn8sBTuqqqVIQqZL9Ps5JCiVd5ph-k9ZidLYz1UeKFT5oniNNzZPL6GEikF4aI0Y8XMY6sZzcbtHuMd5CkCVtOLaWb91-7wgVsdg_oqlHbRJuf5_xcWvOWsj3mVnJrefmt11OMbj-N-ttPFoBiKqyM78f4I',
    hasJustIn: false,
  },
];

export default function CartCheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [activeTab, setActiveTab] = useState<'payment' | 'donation' | 'instructions'>('payment');
  const [paymentChoice, setPaymentChoice] = useState<'crypto' | 'inr'>('crypto');
  const [donationAmount, setDonationAmount] = useState<number>(0.1);
  const [customDonation, setCustomDonation] = useState<string>('');
  const [isCustomDonation, setIsCustomDonation] = useState(false);

  // Instructions
  const [instructions, setInstructions] = useState<{
    gift: boolean;
    card: boolean;
    notag: boolean;
  }>({
    gift: false,
    card: false,
    notag: false,
  });
  const [greetingMsg, setGreetingMsg] = useState('');

  // Coupons
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('SUMMER25');
  const [couponDiscount, setCouponDiscount] = useState<number>(2.5);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  // Toggle item selection
  const handleToggleSelect = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  // Quantity updates
  const handleUpdateQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.qty + delta);
          return { ...item, qty: newQty };
        }
        return item;
      })
    );
  };

  // Wishlist toggle on item
  const handleToggleWishlist = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const next = !item.isWishlisted;
          showToast(next ? 'Moved to Wishlist' : 'Removed from Wishlist');
          return { ...item, isWishlisted: next };
        }
        return item;
      })
    );
  };

  // Remove item
  const handleRemoveItem = (id: string, title: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showToast(`Removed "${title}" from bag`);
  };

  // Apply Coupon
  const handleApplyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'SUMMER25') {
      setAppliedCoupon('SUMMER25');
      setCouponDiscount(2.5);
      showToast('Coupon SUMMER25 applied! Saved $2.50');
    } else {
      showToast('Invalid coupon code');
    }
  };

  // Calculations
  const selectedItems = useMemo(() => cartItems.filter((i) => i.selected), [cartItems]);

  const rawTotalUSD = useMemo(() => {
    return selectedItems.reduce((acc, i) => acc + i.usdOriginal * i.qty, 0);
  }, [selectedItems]);

  const discountedSubtotalUSD = useMemo(() => {
    return selectedItems.reduce((acc, i) => acc + i.usdPrice * i.qty, 0);
  }, [selectedItems]);

  const totalDiscountUSD = rawTotalUSD - discountedSubtotalUSD;
  const platformFeeUSD = selectedItems.length > 0 ? 0.1 : 0;
  const effectiveDonation = isCustomDonation
    ? parseFloat(customDonation) || 0
    : donationAmount || 0;

  const finalTotalUSD = Math.max(
    0,
    discountedSubtotalUSD +
      platformFeeUSD +
      effectiveDonation -
      (appliedCoupon ? couponDiscount : 0)
  );

  // Recommendations carousel ref
  const recRef = useRef<HTMLDivElement>(null);
  const scrollRec = (direction: 'left' | 'right') => {
    if (recRef.current) {
      recRef.current.scrollBy({
        left: direction === 'left' ? -320 : 320,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans antialiased pb-20">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-black text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3">
          <Check className="w-4 h-4 text-emerald-400" />
          {toastMessage}
        </div>
      )}

      {/* BEGIN: CheckoutStepper */}
      <section className="border-b border-gray-200 py-3.5 bg-white">
        <div className="max-w-xl mx-auto flex items-center justify-between text-xs tracking-wide px-4">
          {/* Step 1: Cart */}
          <div className="flex items-center gap-2 font-bold text-gray-900 cursor-pointer">
            <span className="w-3 h-3 rounded-full border-2 border-gray-900 bg-black" />
            <span>Cart</span>
          </div>
          <div className="flex-1 h-[1px] bg-gray-300 mx-3" />

          {/* Step 2: Address */}
          <Link
            href="/checkout/address"
            className="flex items-center gap-2 text-gray-500 hover:text-black font-medium transition"
          >
            <span className="w-2.5 h-2.5 rounded-full border border-gray-400 bg-white" />
            <span>Address</span>
          </Link>
          <div className="flex-1 h-[1px] bg-gray-300 mx-3" />

          {/* Step 3: Summary / Payment */}
          <Link
            href="/checkout/payment"
            className="flex items-center gap-2 text-gray-500 hover:text-black font-medium transition"
          >
            <span className="w-2.5 h-2.5 rounded-full border border-gray-400 bg-white" />
            <span>Summary</span>
          </Link>
        </div>
      </section>
      {/* END: CheckoutStepper */}

      {/* BEGIN: CartMainSection */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-start">
          {/* Cart Items Left Column (7 Columns) with vertical line divider */}
          <div
            className="lg:col-span-7 lg:pr-8 lg:border-r lg:border-slate-200"
            data-purpose="cart-items-container"
          >
            <div className="flex items-center justify-between pb-4 mb-2 border-b border-slate-200">
              <h2 className="text-base font-bold text-gray-900">
                Shopping Bag ({cartItems.length} Items)
              </h2>
              <button
                onClick={() => {
                  const allSelected = cartItems.every((i) => i.selected);
                  setCartItems((prev) => prev.map((i) => ({ ...i, selected: !allSelected })));
                }}
                className="text-xs text-[#FF3F6C] font-semibold hover:underline"
              >
                {cartItems.every((i) => i.selected) ? 'Deselect All' : 'Select All'}
              </button>
            </div>

            {cartItems.length > 0 ? (
              cartItems.map((item, idx) => (
                <article
                  key={item.id}
                  className={`flex items-start gap-4 py-5 ${
                    idx !== 0 ? 'border-t border-gray-100' : ''
                  }`}
                >
                  {/* Selection Checkbox */}
                  <div className="pt-1">
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => handleToggleSelect(item.id)}
                      className="w-4 h-4 rounded text-black focus:ring-0 border-gray-400 cursor-pointer"
                    />
                  </div>

                  {/* Product Image */}
                  <Link
                    href="/product"
                    className="w-32 h-44 rounded-lg overflow-hidden shrink-0 bg-gray-100 block group"
                  >
                    <img
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      src={item.image}
                    />
                  </Link>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-bold text-gray-900 leading-tight">
                          {item.brand}
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">{item.title}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-[#FF3F6C]">Hot Deal</span>

                        {/* Heart Wishlist */}
                        <button
                          type="button"
                          onClick={() => handleToggleWishlist(item.id)}
                          className="text-gray-400 hover:text-red-500 cursor-pointer p-1"
                          title="Wishlist"
                        >
                          <Heart
                            className={`w-3.5 h-3.5 ${
                              item.isWishlisted ? 'fill-red-500 text-red-500' : ''
                            }`}
                          />
                        </button>

                        {/* Remove Cross */}
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id, item.title)}
                          className="text-gray-400 hover:text-gray-700 cursor-pointer p-1"
                          title="Remove from Bag"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Size & Quantity Selectors */}
                    <div className="flex items-center gap-2 mt-3">
                      <div className="border border-gray-300 rounded px-2 py-0.5 flex items-center gap-1 text-[11px] font-medium bg-white">
                        <span>Size: {item.size}</span>
                      </div>

                      <div className="border border-gray-300 rounded px-1.5 py-0.5 flex items-center gap-1.5 text-[11px] font-medium bg-white">
                        <button
                          type="button"
                          onClick={() => handleUpdateQty(item.id, -1)}
                          className="px-1 text-gray-500 hover:text-black font-bold"
                        >
                          -
                        </button>
                        <span>Qty: {item.qty}</span>
                        <button
                          type="button"
                          onClick={() => handleUpdateQty(item.id, 1)}
                          className="px-1 text-gray-500 hover:text-black font-bold"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => showToast('Saved for later!')}
                        className="border border-gray-300 hover:border-gray-500 rounded p-1 text-gray-600 bg-white"
                        title="Save for Later"
                      >
                        <Bookmark className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Dual Pricing Details */}
                    <div className="mt-2.5 space-y-0.5 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">
                          Rs. {item.inrPrice * item.qty}
                        </span>
                        <span className="line-through text-gray-400 text-[11px]">
                          Rs. {item.inrOriginal * item.qty}
                        </span>
                        <span className="text-[11px] font-semibold text-[#14CDA8]">
                          ({item.discount})
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">
                          ${(item.usdPrice * item.qty).toFixed(2)}
                        </span>
                        <span className="line-through text-gray-400 text-[11px]">
                          ${(item.usdOriginal * item.qty).toFixed(2)}
                        </span>
                        <span className="text-[11px] font-semibold text-[#14CDA8]">
                          ({item.discount})
                        </span>
                      </div>
                    </div>

                    {/* Delivery & Badges */}
                    <div className="mt-2 text-[11px] space-y-0.5">
                      <p className="text-gray-700">
                        Delivery <span className="line-through text-gray-400">$0.55</span>{' '}
                        <span className="text-[#FF3F6C] font-semibold uppercase">FREE</span>
                      </p>
                      <p className="text-[#FF3F6C] font-medium">Best Price with crypto payment</p>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="text-center py-12">
                <ShoppingBag className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-gray-800">Your bag is empty</p>
                <Link
                  href="/category"
                  className="mt-3 inline-block text-xs font-bold text-[#FF3F6C] underline"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>

          {/* Right Column: Sidebar Checkout (5 Columns) */}
          <div className="lg:col-span-5 lg:pl-8 space-y-6" data-purpose="checkout-sidebar">
            {/* Delivery Destination Section */}
            <div className="pb-6 border-b border-slate-200 flex items-start justify-between">
              <div className="space-y-1 pr-3">
                <p className="text-xs text-gray-500 font-medium">Delivery to</p>
                <p className="text-xs font-bold text-gray-900">Dipanshu , 110001</p>
                <p className="text-[11px] text-gray-600 leading-snug">
                  45, Green Valley Apartments , Delhi, New Delhi, India
                </p>
              </div>
              <Link
                href="/checkout/address"
                className="bg-[#F8F9FA] hover:bg-gray-100 text-gray-700 text-xs font-semibold px-4 py-2 rounded-lg border border-gray-200 transition-colors cursor-pointer"
              >
                Change
              </Link>
            </div>

            {/* Segmented Checkout Options Section */}
            <div className="pb-6 border-b border-slate-200">
              {/* Segmented Tab Header */}
              <div
                className="border border-slate-300 rounded-lg p-0.5 flex text-xs font-medium text-slate-700 text-center mb-4 bg-gray-50/50"
                role="tablist"
              >
                <button
                  type="button"
                  onClick={() => setActiveTab('payment')}
                  className={`flex-1 py-1.5 px-2 rounded font-semibold transition ${
                    activeTab === 'payment'
                      ? 'bg-white text-slate-900 border border-slate-300 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Payment method
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('donation')}
                  className={`flex-1 py-1.5 px-2 rounded font-semibold transition ${
                    activeTab === 'donation'
                      ? 'bg-white text-slate-900 border border-slate-300 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Donation
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('instructions')}
                  className={`flex-1 py-1.5 px-2 rounded font-semibold transition ${
                    activeTab === 'instructions'
                      ? 'bg-white text-slate-900 border border-slate-300 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Instructions
                </button>
              </div>

              {/* Tab 1: Payment Method */}
              {activeTab === 'payment' && (
                <div className="space-y-3 pt-1">
                  <label
                    onClick={() => setPaymentChoice('crypto')}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition ${
                      paymentChoice === 'crypto'
                        ? 'border-slate-900 bg-gray-50/80'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_choice"
                      checked={paymentChoice === 'crypto'}
                      onChange={() => setPaymentChoice('crypto')}
                      className="mt-1 h-4 w-4 text-black focus:ring-black border-slate-400 cursor-pointer"
                    />
                    <div className="text-xs flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900">Crypto</span>
                        <span className="text-[10px] text-[#14CDA8] font-bold bg-[#14CDA8]/10 px-2 py-0.5 rounded">
                          Instant &amp; 5% Bonus
                        </span>
                      </div>
                      <p className="text-gray-500 mt-0.5 leading-relaxed text-[11px]">
                        Pay with Bitcoin, Ethereum, USDT, and more secure &amp; borderless.
                      </p>
                    </div>
                  </label>

                  <label
                    onClick={() => setPaymentChoice('inr')}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition ${
                      paymentChoice === 'inr'
                        ? 'border-slate-900 bg-gray-50/80'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_choice"
                      checked={paymentChoice === 'inr'}
                      onChange={() => setPaymentChoice('inr')}
                      className="mt-1 h-4 w-4 text-black focus:ring-black border-slate-400 cursor-pointer"
                    />
                    <div className="text-xs flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900">INR / Fiat</span>
                        <span className="text-[10px] text-gray-400 font-medium">
                          Cards • UPI • Wallets
                        </span>
                      </div>
                      <p className="text-gray-500 mt-0.5 leading-relaxed text-[11px]">
                        Multiple payment options, including cards, UPI, and wallets, for your
                        convenience.
                      </p>
                    </div>
                  </label>
                </div>
              )}

              {/* Tab 2: Donation */}
              {activeTab === 'donation' && (
                <div className="pt-1 space-y-4">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-slate-800">
                      Donate to{' '}
                      <span className="border-b border-slate-400 font-bold text-gray-900 pb-0.5">
                        EcoGreen Fund
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2 pt-1">
                    {[0.1, 0.5, 1.0].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setDonationAmount(amt);
                          setIsCustomDonation(false);
                        }}
                        className={`px-3.5 py-1 text-xs border rounded-full font-medium transition cursor-pointer ${
                          !isCustomDonation && donationAmount === amt
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-white text-slate-800 border-slate-300 hover:border-slate-800'
                        }`}
                      >
                        ${amt}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setIsCustomDonation(true)}
                      className={`px-3.5 py-1 text-xs border rounded-full font-medium transition cursor-pointer ${
                        isCustomDonation
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'bg-white text-slate-800 border-slate-300 hover:border-slate-800'
                      }`}
                    >
                      Custom
                    </button>
                  </div>

                  {isCustomDonation && (
                    <input
                      type="number"
                      step="0.1"
                      value={customDonation}
                      onChange={(e) => setCustomDonation(e.target.value)}
                      placeholder="Enter custom amount in USD (e.g. 5.00)"
                      className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:ring-1 focus:ring-slate-900 outline-none"
                    />
                  )}

                  <p className="text-[11px] text-center text-slate-400 leading-normal pt-1">
                    Your donation helps us create a better future—every contribution counts!
                  </p>
                </div>
              )}

              {/* Tab 3: Instructions */}
              {activeTab === 'instructions' && (
                <div className="pt-1 space-y-4">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <button
                      type="button"
                      onClick={() =>
                        setInstructions((prev) => ({ ...prev, gift: !prev.gift }))
                      }
                      className={`border rounded-lg p-3 flex flex-col items-center gap-1.5 transition cursor-pointer ${
                        instructions.gift
                          ? 'border-slate-900 bg-gray-50 text-black font-bold'
                          : 'border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <Gift className="w-4 h-4" />
                      <span className="text-[10px]">Gift Pack</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setInstructions((prev) => ({ ...prev, card: !prev.card }))
                      }
                      className={`border rounded-lg p-3 flex flex-col items-center gap-1.5 transition cursor-pointer ${
                        instructions.card
                          ? 'border-slate-900 bg-gray-50 text-black font-bold'
                          : 'border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <Mail className="w-4 h-4" />
                      <span className="text-[10px]">Greeting Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setInstructions((prev) => ({ ...prev, notag: !prev.notag }))
                      }
                      className={`border rounded-lg p-3 flex flex-col items-center gap-1.5 transition cursor-pointer ${
                        instructions.notag
                          ? 'border-slate-900 bg-gray-50 text-black font-bold'
                          : 'border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <Tag className="w-4 h-4" />
                      <span className="text-[10px]">No Price Tag</span>
                    </button>
                  </div>

                  <div>
                    <label
                      className="block text-xs font-semibold text-slate-800 mb-1.5"
                      htmlFor="gift-note"
                    >
                      Message for Greeting Card
                    </label>
                    <textarea
                      id="gift-note"
                      value={greetingMsg}
                      onChange={(e) => setGreetingMsg(e.target.value)}
                      placeholder="Write your greeting note here..."
                      className="w-full h-16 text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-1 focus:ring-slate-400 outline-none resize-none placeholder-gray-400"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Coupons Section */}
            <div
              className="pb-6 border-b border-slate-200 space-y-3"
              data-purpose="coupons-card"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#FF3F6C]" />
                  <span className="text-xs font-bold text-gray-900">Apply Coupons</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleApplyCoupon('SUMMER25')}
                  className="text-[11px] text-[#FF3F6C] font-semibold hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 font-medium tracking-wide uppercase"
                />
                <button
                  type="button"
                  onClick={() => handleApplyCoupon(couponInput)}
                  className="bg-[#FF3F6C] hover:opacity-90 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-xs transition-opacity cursor-pointer"
                >
                  Apply
                </button>
              </div>

              {/* SUMMER25 Promo Chip */}
              <div className="flex items-center justify-between bg-red-50/50 border border-dashed border-[#FF3F6C]/40 rounded-lg p-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold bg-[#FF3F6C] text-white px-1.5 py-0.5 rounded tracking-wide">
                    SUMMER25
                  </span>
                  <span className="text-[11px] text-gray-700 font-medium">
                    Save $2.50 on orders above $15
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleApplyCoupon('SUMMER25')}
                  className="text-[11px] font-bold text-[#FF3F6C] hover:underline cursor-pointer"
                >
                  {appliedCoupon === 'SUMMER25' ? 'Applied' : 'Apply'}
                </button>
              </div>
            </div>

            {/* Price Details Section */}
            <div className="pt-1">
              <h3 className="text-xs font-bold text-gray-800 pb-3 border-b border-slate-200 uppercase tracking-wide">
                Price Details ({selectedItems.length} items)
              </h3>
              <div className="space-y-3 text-xs pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Total MRP ({selectedItems.length} items)</span>
                  <span className="font-bold text-gray-900">${rawTotalUSD.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Total Discount</span>
                  <div className="space-x-1">
                    <span className="text-red-500 font-bold">
                      -${totalDiscountUSD.toFixed(2)}
                    </span>
                    <span className="text-[#14CDA8] font-semibold text-[11px]">(48% OFF)</span>
                  </div>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between items-center text-gray-700">
                    <span>Coupon ({appliedCoupon})</span>
                    <span className="text-emerald-600 font-bold">
                      -${couponDiscount.toFixed(2)}
                    </span>
                  </div>
                )}

                {effectiveDonation > 0 && (
                  <div className="flex justify-between items-center text-gray-700">
                    <span>EcoGreen Donation</span>
                    <span className="text-gray-900 font-medium">
                      +${effectiveDonation.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center text-gray-700">
                  <span>Platform Fee</span>
                  <span className="text-gray-900 font-medium">${platformFeeUSD.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center text-gray-700">
                  <span>Delivery Charges</span>
                  <div className="space-x-1">
                    <span className="line-through text-gray-400 text-[11px]">$0.89</span>
                    <span className="text-[#FF3F6C] font-semibold">Free</span>
                  </div>
                </div>

                <div className="pt-3.5 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-900">Total</span>
                  <div className="space-x-1.5 flex items-center">
                    <span className="text-base font-black text-gray-900">
                      ${finalTotalUSD.toFixed(2)}
                    </span>
                    <span className="text-[#14CDA8] font-bold text-xs">(48% OFF)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Action Section */}
            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">
                    Total Amount
                  </span>
                  <span className="text-lg font-black text-gray-900">
                    ${finalTotalUSD.toFixed(2)}
                  </span>
                </div>
                <Link
                  href="/checkout/address"
                  className="bg-[#FF3F6C] hover:bg-[#e0355e] text-white px-9 py-3 rounded-xl text-xs font-bold shadow-sm transition-colors flex items-center gap-2"
                >
                  Continue
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Trust Security Badge */}
            <div className="flex items-center justify-center gap-1.5 text-gray-400 text-[11px] pt-1">
              <ShieldCheck className="w-4 h-4 text-gray-400" />
              <span>Protected by 256-bit encryption &amp; secure escrow</span>
            </div>
          </div>
        </div>
      </main>
      {/* END: CartMainSection */}

      {/* BEGIN: Recommendations ("You may also like") */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full border-t border-gray-200/60 mt-4"
        data-purpose="recommendations-section"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold tracking-tight text-gray-900">You may also like</h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollRec('left')}
              className="w-8 h-8 rounded-full border border-gray-300 hover:border-gray-900 bg-white text-gray-700 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
              title="Previous items"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollRec('right')}
              className="w-8 h-8 rounded-full border border-gray-300 hover:border-gray-900 bg-[#f5b800] hover:bg-[#e5ac00] text-gray-900 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
              title="Next items"
            >
              <ChevronRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div
            ref={recRef}
            className="flex overflow-x-auto gap-4 scroll-smooth pb-4 px-1 no-scrollbar"
          >
            {recommendations.map((item) => (
              <article
                key={item.id}
                className="group flex flex-col shrink-0 w-64 bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300"
              >
                <div className="relative w-full aspect-[3/4] bg-[#f7f7f8] overflow-hidden">
                  {item.hasJustIn && (
                    <span className="absolute top-2 left-2 z-10 bg-[#FF3F6C] text-white text-[9px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                      Just In
                    </span>
                  )}
                  <Link href="/product" className="block w-full h-full">
                    <img
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      src={item.image}
                    />
                  </Link>
                  <button
                    type="button"
                    onClick={() => showToast(`Added "${item.title}" to Wishlist!`)}
                    className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full bg-white flex items-center justify-center text-gray-700 hover:text-red-500 shadow-sm transition cursor-pointer"
                    title="Add to Wishlist"
                  >
                    <Heart className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-3 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-gray-900 tracking-wider uppercase">
                      {item.brand}
                    </span>
                    <h3
                      className="text-xs text-gray-700 mt-0.5 truncate leading-tight font-medium"
                      title={item.title}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="text-xs font-bold text-gray-900">
                      ₹ {item.price.toLocaleString()}
                    </span>
                    {item.originalPrice && (
                      <span className="text-[11px] text-gray-400 line-through">
                        ₹ {item.originalPrice.toLocaleString()}
                      </span>
                    )}
                    {item.discount && (
                      <span className="text-[11px] font-bold text-[#14CDA8]">{item.discount}</span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      {/* END: Recommendations */}
    </div>
  );
}
