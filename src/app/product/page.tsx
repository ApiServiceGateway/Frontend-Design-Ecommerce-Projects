'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Heart,
  Share2,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Star,
  Truck,
  ThumbsUp,
  ThumbsDown,
  Check,
  X,
  Crown,
  ShoppingBag,
} from 'lucide-react';

// Product Gallery Thumbnails & Main Views from Stitch
const galleryImages = [
  {
    id: 1,
    title: 'Tracksuit View 1',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfAjn1pqNhyu6o0ODhdHAEvwGh_fhQUXGIWeDltdALENOlPxkgPhXUIJlZMCHREbSDq_kGcxVp1QnB4LnQZGaVQLcfbkGEPxRtCN4vc0MhL7fWFyvtBh2fqPomXW9ujKDWPFDROMOEw76eZnfxZJnrsT313-MGz9SgYxTpVHTzlK5GlseHV31jwxZseNN3zBQROVMo9trp08cn1kCL0hcxYg2fixoKFlADbMiHiQ',
  },
  {
    id: 2,
    title: 'Tracksuit View 2',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEZWg_Qcw-XrvHDafNBvoqtwZzN9Zj2Axao8bXj_8oykAGO9lUo6LwB_F2Rgs-q9lfYrzwqI1ip_c87XMcTqh98ls2Y1zaHXvLke94RFLLrym5vwqfntMB0bExAZCFXW4hJY0wZHxgXXiOy_MhOrMjUmdtHXJxyiW01veWxVyVBD2yrQj1o4098-Q3D2onxbiD2giCuBI5o2tak50C1zZhefvNekUmZOVOweCs_Q',
  },
  {
    id: 3,
    title: 'Tracksuit View 3',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB99dwpq68H6bPiciXwJbg8dmsBb9ckLz9C6gof-cbpXjktk_ZioLvspE-f_DhDqo5jJLokmnuLqNM8FJet_N9X7ZhNRjKbsKQIqQ0GiKX52EgCEj28YmrHy09vwwKkMgZQbgO2KiriXB7eoPCWzSyiHsK7RuMcHc2e_6-_G7eHrjJ1t0ptI_5EL6TXR4_ViYzxwsxsSh1iKyKhH7DxZScFtJfPB_dE1oZCBJ7xHA',
  },
  {
    id: 4,
    title: 'Tracksuit View 4',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAu4XcuS8foDakvyLzUR-KAY6KJ_IEV5zxNlp2Z0La2yKDPwKdh4xo2IDpVp9xjD6lwc4NlVf4_3_pkN9cx68_TwkFNoqPGPMLwnEmcAQFROiaj3Eao7PCQG5XQU7waD6qtYau1TeDL3SGsu7RCRSHie5BglSzxw3z97Egk17u-o9fn4QsfslXnDy0JX7_dIdNgaBUIMgtxx0zTtDRjiMjXJen_sO4MuhCj78bw5A',
  },
];

// Outdoor Lifestyle secondary showcase image
const outdoorModelImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBEZWg_Qcw-XrvHDafNBvoqtwZzN9Zj2Axao8bXj_8oykAGO9lUo6LwB_F2Rgs-q9lfYrzwqI1ip_c87XMcTqh98ls2Y1zaHXvLke94RFLLrym5vwqfntMB0bExAZCFXW4hJY0wZHxgXXiOy_MhOrMjUmdtHXJxyiW01veWxVyVBD2yrQj1o4098-Q3D2onxbiD2giCuBI5o2tak50C1zZhefvNekUmZOVOweCs_Q';

// Primary image
const primaryHeroImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCCD0ZB9JFLfkzvFC68HvU8tXMqxzQsEkoRqjazTITeT1DcEDQ80wWupTO3XfStG7IAjZ3iyUzRdgAIAdnXT8z4IVfwR2-b2ugtXZSMmjEt3fuypKDYjOAFXd62wgU25ruMRBDkmKKPQ5BLIWbxIptf5ujcXOO13QsUyeTUgMDumEEhXWUi7InCFL3WFeboEcp4Ulw96ADWD61vGMF6883nrAM1QozFBHOYJ261-Q';

// Color Options
const colorOptions = [
  { name: 'Lemon', hex: '#fef08a' },
  { name: 'Sky Blue', hex: '#93c5fd' },
  { name: 'Lilac', hex: '#c4b5fd' },
  { name: 'Soft Blue', hex: '#bfdbfe' },
];

// Available Sizes
const sizes = ['22', '23', '24', '26'];

// Similar Products from Stitch
const similarProducts = [
  {
    id: 'sp1',
    brand: 'FOREVER GLAM',
    title: 'Off-White Structured Shoulder Bag',
    price: 2099,
    originalPrice: 2999,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDPAy92C6zJEO3pYk_koisXffZ2u_hQToa3LkBNt5M36eD04wk7nrV7Y7rKGj6XGgTtcE0nxijwmMeXJQM4PaRfdfDWPGrmfTWFK-efaNfBoChUqbPEebdMKDDT09q7fk3qFT0kY4iyb7J2xN6AwUGOmv8QQXLK0357Ov1KoeIPhukA-uqeyM_RdfAMXGL2h4whzfz_tglP7F0p8JnXYqaJSe3Vkf1D3DaYv7MbX73YMQOvwEmbmSzkub_HUTNK4TY',
    tag: 'Just In',
    tagImg:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBNpf2hkIZjlAAgWvN6-9cAvsPzNJE5NpuzDh5Q3P6vDXQ615IEBFsbhNJAidFtoVepWJs9L-POrkJwG2xeDcYjefjx9VX3kNkmkH9aTxl0TmXjO6cd5nvR_4jDAv6Cs8Agdj5m7q0Wa7BuN2T11uZPyblwo7S3rUROhkzlJztOD9T8ZSImvskaT2_EWdtSJC-Zx65L8J59KWKqP4Y2hmu2ntNhuhQjGD4A57QtaD2bH_Qmxi1wOK0',
  },
  {
    id: 'sp2',
    brand: 'FOREVER GLAM',
    title: 'Black Trapeze Shoulder Bag',
    price: 1699,
    originalPrice: 2499,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCKVbTo-mGJAY-BfVBDTXmxCxku3Z8JBawoalj8cdJ9CPOaqrl1l6tkKy9ZqdYaX4P3JW4kr1LkIomLTUAgQbPqDR5Dl537hBChKSHSkh6QLHWn26M2crjlC5aloYFd2oAnlueWcJ9lQDD42Dn5Vi4M7eVMxhcVOTnk6Li3epNogHl-Y4o0A2cZsk6Ya85ClmeHaUMNPYFe35WBgJ0lRMmcpbJF6YIHRZHYICIIpK6L6HG-VvCFQfpuD9dhLfgAPfk',
    tag: 'Just In',
    tagImg:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBNpf2hkIZjlAAgWvN6-9cAvsPzNJE5NpuzDh5Q3P6vDXQ615IEBFsbhNJAidFtoVepWJs9L-POrkJwG2xeDcYjefjx9VX3kNkmkH9aTxl0TmXjO6cd5nvR_4jDAv6Cs8Agdj5m7q0Wa7BuN2T11uZPyblwo7S3rUROhkzlJztOD9T8ZSImvskaT2_EWdtSJC-Zx65L8J59KWKqP4Y2hmu2ntNhuhQjGD4A57QtaD2bH_Qmxi1wOK0',
  },
  {
    id: 'sp3',
    brand: 'FOREVER GLAM',
    title: 'Taupe Floral Embroidered Mesh Pointed Toe Kitten Heels',
    price: 1699,
    originalPrice: 2499,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD3U-b1rlNF8LMJnv5M3wcnPoEmeJk5yMNESMVfoV5_TpnbENXDhZsXE4LQxSTjeQTAQkYILfvu7tvirnSdOoYGeWOeYr9xReiXbbqhopTto8cpjJuXbWxA68Qb2Ufxl5LLww6URxL34wx1Vh4HgSQDKYSliVUE18BtD_x2SNn_6HRa-ED-527nhOXt8v_Vfk8xflstE_wSh9et1VDKD7OxKVYBQzkK0tsSRv7s4vtZzyET_gC1gxr_WQo2TfMf2sY',
  },
  {
    id: 'sp4',
    brand: 'FOREVER GLAM',
    title: 'Pink Assorted - Others Casual Women Casual Shoes',
    price: 899,
    originalPrice: 1999,
    discountPercent: 55,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAxb35cE764Ekd-aK-hD6S8C-aEZpJ5bYxhrgzxDFlUU5GnypAudUioZ-4NBrvFgnlLWGw3R1z2KoMebkDnkUhmLCpg2q5zVjMuiVrzD1Wp2ywjaFzcIFD9HLBQ1axqTeSsV2qVmELcVh3gNfaiig_TQU04xj2d_nUd04QIFfLaV6E5vGsdZ9rhzHKK4Qath1EHNXw_IpflIcK3mMO0QJ2TMsmo08qdkb2DECRFF5o7_IkV3il_KaveMc8n5Y1uhXc',
  },
];

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState<string>(primaryHeroImage);
  const [selectedColor, setSelectedColor] = useState<string>('Lemon');
  const [selectedSize, setSelectedSize] = useState<string>('22');
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [wishlistSet, setWishlistSet] = useState<Set<string>>(new Set());
  const [isSizeChartOpen, setIsSizeChartOpen] = useState<boolean>(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Address state
  const [deliveryAddress, setDeliveryAddress] = useState({
    name: 'Dipanshu',
    pincode: '110001',
    address: '45, Green Valley Apartments , Delhi,New Delhi, India',
  });

  // Reviews state with verified buyer reviews from Stitch
  const [reviewsList, setReviewsList] = useState([
    {
      id: 1,
      author: 'Dipanshu',
      rating: 4.5,
      date: '4 month ago',
      content: "It's very awesome and cool and made of soft fabric",
      likes: 0,
      dislikes: 0,
    },
    {
      id: 2,
      author: 'Dipanshu',
      rating: 4.5,
      date: '4 month ago',
      content: "It's very awesome and cool and made of soft fabric",
      likes: 0,
      dislikes: 0,
    },
    {
      id: 3,
      author: 'Dipanshu',
      rating: 4.5,
      date: '4 month ago',
      content: "It's very awesome and cool and made of soft fabric",
      likes: 0,
      dislikes: 0,
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleSimilarWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlistSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast('Removed from Wishlist');
      } else {
        next.add(id);
        showToast('Added to Wishlist');
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-white text-[#1F2937]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-[#14CDA8]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main PDP Container */}
      <main className="max-w-[1720px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 bg-white">
        
        {/* BEGIN: ProductHeroSection matching Stitch */}
        <section
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-14"
          data-purpose="product-hero"
        >
          {/* Gallery Left: Thumbnails Column + Main Dual View */}
          <div className="flex flex-col-reverse sm:flex-row gap-4 items-start lg:col-span-6">
            
            {/* Thumbnails Column with Up/Down Chevrons */}
            <div className="flex sm:flex-col gap-3 justify-center sm:justify-start items-center w-full sm:w-20 shrink-0">
              <button
                type="button"
                aria-label="Scroll Up"
                onClick={() => setSelectedImage(primaryHeroImage)}
                className="text-gray-400 hover:text-black hidden sm:block mb-1 pt-0 cursor-pointer"
              >
                <ChevronUp className="w-4 h-4" />
              </button>

              {galleryImages.map((img) => (
                <div
                  key={img.id}
                  onClick={() => setSelectedImage(img.src)}
                  className={`w-16 h-20 rounded-none overflow-hidden cursor-pointer shadow-xs transition-all ${
                    selectedImage === img.src
                      ? 'border-2 border-gray-900'
                      : 'border border-gray-200 opacity-80 hover:opacity-100'
                  }`}
                >
                  <img
                    alt={img.title}
                    className="w-full h-full object-cover rounded-none"
                    src={img.src}
                  />
                </div>
              ))}

              <button
                type="button"
                aria-label="Scroll Down"
                onClick={() => setSelectedImage(galleryImages[galleryImages.length - 1].src)}
                className="text-gray-400 hover:text-black hidden sm:block mt-1 cursor-pointer"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Hero Dual Image Showcase matching Stitch */}
            <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-3 h-[530px]">
              {/* Primary Active Image */}
              <div
                className="w-full bg-[#f4ebe6] rounded-none overflow-hidden shadow-xs relative group h-full"
                style={{ height: '530px', borderRadius: '0px' }}
              >
                <img
                  alt="Graceful Flow Maxi Dress & Tracksuit Set"
                  className="w-full h-full object-cover object-center transform transition duration-500 group-hover:scale-105 rounded-none"
                  src={selectedImage}
                />
                <div
                  className="absolute bottom-4 left-4 bg-white/70 backdrop-blur-md px-3 py-1 rounded-none text-[11px] font-semibold text-gray-700 tracking-wider"
                  style={{ borderRadius: '0px' }}
                >
                  PREMIUM ATHLEISURE
                </div>
              </div>

              {/* Secondary Outdoor Lifestyle Model Shot */}
              <div
                className="hidden sm:block w-full bg-[#f4ebe6] rounded-none overflow-hidden shadow-xs relative group h-full"
                style={{ height: '530px', borderRadius: '0px' }}
              >
                <img
                  alt="Graceful Flow Maxi Dress - Outdoor Editorial"
                  className="w-full h-full object-cover object-center transform transition duration-500 group-hover:scale-105 rounded-none"
                  src={outdoorModelImage}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Product Purchase Details */}
          <div className="flex flex-col justify-start pt-0 lg:col-span-6">
            
            {/* Top Status & Sharing Badges */}
            <div className="flex items-center justify-between mb-2.5 mt-0">
              <span className="inline-flex items-center gap-1.5 bg-[#fef08a] text-yellow-900 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Hot Deal 🔥
              </span>
              <div className="flex items-center gap-4 text-gray-500">
                <button
                  type="button"
                  onClick={() => {
                    setIsWishlisted(!isWishlisted);
                    showToast(isWishlisted ? 'Removed from Wishlist' : 'Added to Wishlist');
                  }}
                  className={`hover:text-red-500 transition-colors cursor-pointer ${
                    isWishlisted ? 'text-red-500' : ''
                  }`}
                  title="Add to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500' : ''}`} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    showToast('Link copied to clipboard!');
                  }}
                  className="hover:text-black transition-colors cursor-pointer"
                  title="Share Product"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Product Titles */}
            <p className="font-serif italic text-gray-500 text-sm mb-1">
              Comfortable &amp; Elegant
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mb-1">
              Graceful Flow Maxi Dress
            </h1>
            <p className="text-xs text-gray-500 mb-4">
              Layer with a stylish blazer for a semi-formal outfit
            </p>

            {/* Pricing Block matching Stitch */}
            <div className="flex flex-col gap-0.5 mb-5 pb-4 border-b border-gray-200">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-extrabold text-gray-900">₹ 500 /-</span>
                <span className="text-xs text-gray-400 line-through">₹ 1599</span>
                <span className="text-xs font-semibold text-green-600">(68% off)</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-base font-bold text-gray-700">$ 4.4</span>
                <span className="text-xs text-gray-400 line-through">$6.8</span>
                <span className="text-xs font-semibold text-green-600">(68% off)</span>
              </div>
            </div>

            {/* Editorial Description Paragraph */}
            <div className="mb-5">
              <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                Description
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Step into effortless elegance with our Graceful Flow Maxi Dress, designed for women who love comfort and style. Made from premium chiffon fabric, this long dress offers a soft, breathable feel while flowing gracefully with every step. Whether you're heading to a formal event...
              </p>
            </div>

            {/* Color Options */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-800">
                  Color <span className="text-gray-500 font-normal">{selectedColor}</span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                {colorOptions.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    style={{ backgroundColor: c.hex }}
                    className={`w-7 h-7 rounded-lg transition-transform cursor-pointer ${
                      selectedColor === c.name
                        ? 'ring-2 ring-offset-2 ring-black scale-105'
                        : 'hover:scale-105'
                    }`}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Options */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-800">
                  Size <span className="text-gray-500 font-normal">{selectedSize}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsSizeChartOpen(true)}
                  className="text-xs font-semibold text-gray-700 underline hover:text-black cursor-pointer"
                >
                  Size Chart
                </button>
              </div>
              <div className="flex items-center gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`w-9 h-9 rounded-xl text-xs flex items-center justify-center font-semibold transition-all cursor-pointer ${
                      selectedSize === s
                        ? 'border-2 border-gray-900 bg-white text-gray-900 shadow-xs'
                        : 'border border-gray-200 bg-white text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setIsSizeChartOpen(true)}
                  className="w-9 h-9 rounded-xl border border-gray-200 bg-white text-gray-400 hover:border-gray-400 text-xs flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Main CTAs matching Stitch */}
            <div className="flex items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => showToast('Added to Cart successfully!')}
                className="flex-1 py-3 px-6 rounded-2xl border border-gray-300 text-gray-800 font-semibold text-sm hover:bg-gray-50 transition-colors shadow-xs cursor-pointer"
              >
                Add to Cart
              </button>
              <button
                type="button"
                onClick={() => showToast('Redirecting to instant checkout...')}
                className="flex-1 py-3 px-6 rounded-2xl bg-black text-white font-semibold text-sm hover:bg-neutral-800 transition-colors shadow-xs cursor-pointer"
              >
                Shop Now
              </button>
            </div>
          </div>
        </section>
        {/* END: ProductHeroSection */}

        {/* BEGIN: ProductMetadataAndReviews matching Stitch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 items-start">
          
          {/* Left Column: Delivery Details & Trust Badges */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Delivery Address Box */}
            <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div className="pr-4">
                <p className="text-[11px] text-gray-400 uppercase font-semibold">Delivery to</p>
                <p className="text-xs font-bold text-gray-800 mt-0.5">
                  {deliveryAddress.name} , {deliveryAddress.pincode}
                </p>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                  {deliveryAddress.address}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddressModalOpen(true)}
                className="text-xs font-bold border border-gray-200 px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-50 shrink-0 cursor-pointer transition-colors"
              >
                Change
              </button>
            </div>

            {/* Trust Badges Strip */}
            <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm grid grid-cols-3 gap-2 text-center">
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold text-gray-900">%</span>
                <span className="text-xs font-bold text-gray-800 mt-1">100%</span>
                <span className="text-[10px] text-gray-400">Original</span>
              </div>
              <div className="flex flex-col items-center border-x border-gray-100">
                <span className="text-base font-bold text-gray-900 tracking-wider">XM</span>
                <span className="text-xs font-bold text-gray-800 mt-1">Premium</span>
                <span className="text-[10px] text-gray-400">Quality</span>
              </div>
              <div className="flex flex-col items-center">
                <Truck className="w-5 h-5 text-gray-800" />
                <span className="text-xs font-bold text-gray-800 mt-1">Trusted</span>
                <span className="text-[10px] text-gray-400">Seller</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Specifications & Details Card */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Product Details Card */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h2 className="text-sm font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                Product Details
              </h2>
              <div className="grid grid-cols-2 gap-y-3 text-xs mb-6">
                <span className="text-gray-400">Product code</span>
                <span className="text-gray-800 font-medium">423.42334.55</span>
                <span className="text-gray-400">Material</span>
                <span className="text-gray-800 font-medium">Polyester &amp; Spandex Blend</span>
                <span className="text-gray-400">Fit</span>
                <span className="text-gray-800 font-medium">Regular Fit</span>
                <span className="text-gray-400">Waistband</span>
                <span className="text-gray-800 font-medium">Elastic with Drawstring</span>
                <span className="text-gray-400">Size available</span>
                <span className="text-gray-800 font-medium">S, M, L, XL, XXL</span>
                <span className="text-gray-400">Color available</span>
                <span className="text-gray-800 font-medium">Black, Navy Blue, Grey, Olive Green</span>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs font-bold text-gray-800 mb-1">Details</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Experience unmatched comfort and style with our Classic Cotton T-Shirt. Made from 100% premium cotton, this t-shirt offers a soft, breathable, and lightweight feel, perfect for everyday wear.
                </p>
              </div>
            </div>

            {/* Customer Ratings & Reviews Card */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm" data-purpose="customer-reviews">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-500" />
                  <h3 className="text-sm font-bold text-gray-900">
                    Customer Ratings &amp; Reviews
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(true)}
                  className="text-xs font-bold text-gray-700 hover:text-black cursor-pointer"
                >
                  +Add
                </button>
              </div>

              {/* Star Rating Overview */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-gray-500">
                  <strong className="text-gray-800 font-semibold">90</strong> ratings and{' '}
                  <strong className="text-gray-800 font-semibold">2</strong> reviews
                </span>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviewsList.map((rev) => (
                  <div key={rev.id} className="border-b border-gray-100 pb-4 last:border-none last:pb-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-gray-800">{rev.author}</span>
                      <span className="text-[11px] text-gray-400">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="flex items-center text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[11px] font-semibold text-gray-700">{rev.rating}</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2 leading-relaxed">
                      {rev.content}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-gray-400">
                      <span>Purchased verified • 4 months ago</span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setReviewsList((prev) =>
                              prev.map((r) =>
                                r.id === rev.id ? { ...r, likes: r.likes + 1 } : r
                              )
                            );
                            showToast('Thank you for your feedback!');
                          }}
                          className="flex items-center gap-1 hover:text-gray-700 cursor-pointer"
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>{rev.likes > 0 ? rev.likes : ''}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setReviewsList((prev) =>
                              prev.map((r) =>
                                r.id === rev.id ? { ...r, dislikes: r.dislikes + 1 } : r
                              )
                            );
                            showToast('Feedback noted');
                          }}
                          className="flex items-center gap-1 hover:text-gray-700 cursor-pointer"
                        >
                          <ThumbsDown className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* END: ProductMetadataAndReviews */}

        {/* BEGIN: Similar Products Section matching Stitch */}
        <section
          className="mb-14 relative"
          data-purpose="similar-products"
          style={{ marginLeft: '10%', marginRight: '10%' }}
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              Similar Products
            </h2>
          </div>

          <div className="relative">
            {/* Left Yellow Navigation Arrow */}
            <button
              type="button"
              aria-label="Previous slide"
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-12 bg-[#ffe79a] hover:bg-[#fedd77] text-gray-700 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>

            {/* Right Yellow Navigation Arrow */}
            <button
              type="button"
              aria-label="Next slide"
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-12 bg-[#f5b800] hover:bg-[#e5ac00] text-gray-900 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 text-black" />
            </button>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {similarProducts.map((p) => (
                <article key={p.id} className="group flex flex-col cursor-pointer">
                  <div className="relative w-full aspect-[3/4] bg-[#f7f7f8] overflow-hidden">
                    {p.tagImg && (
                      <div className="absolute top-0 left-2.5 z-10 w-4 drop-shadow-xs pointer-events-none">
                        <img
                          alt="Just In"
                          className="w-full h-auto object-contain"
                          src={p.tagImg}
                        />
                      </div>
                    )}
                    <Link href={`/product`} className="block w-full h-full overflow-hidden">
                      <img
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        src={p.image}
                      />
                    </Link>
                    <button
                      type="button"
                      onClick={(e) => toggleSimilarWishlist(p.id, e)}
                      className="absolute -bottom-2.5 right-2.5 w-7 h-7 bg-white rounded-full border-none flex items-center justify-center text-[#14CDA8] hover:scale-105 active:scale-95 transition-all z-10 cursor-pointer shadow-xs"
                      title="Add to Wishlist"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          wishlistSet.has(p.id) ? 'fill-[#14CDA8]' : ''
                        }`}
                      />
                    </button>
                  </div>

                  <div className="pt-2 flex flex-col">
                    <span className="text-[10px] font-bold text-gray-900 tracking-wider uppercase">
                      {p.brand}
                    </span>
                    <h3
                      className="text-[11px] text-gray-700 mt-0.5 truncate leading-tight"
                      title={p.title}
                    >
                      {p.title}
                    </h3>
                    <div className="mt-1 flex items-baseline gap-1.5 flex-wrap">
                      <span className="text-xs font-bold text-gray-900">
                        ₹ {p.price.toLocaleString()}
                      </span>
                      {p.originalPrice && (
                        <span className="text-[11px] text-gray-400 line-through">
                          ₹ {p.originalPrice.toLocaleString()}
                        </span>
                      )}
                      {p.discountPercent && (
                        <span className="text-[11px] font-bold text-[#006b57]">
                          {p.discountPercent}% OFF
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        {/* END: Similar Products Section */}

        {/* BEGIN: TOP PICKUP FOR YOU Section matching Stitch */}
        <section
          className="mb-14 relative"
          data-purpose="top-pickup-recommendations"
          style={{ marginLeft: '10%', marginRight: '10%' }}
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight uppercase">
              TOP PICKUP FOR YOU
            </h2>
          </div>

          <div className="relative">
            {/* Left Yellow Navigation Arrow */}
            <button
              type="button"
              aria-label="Previous slide"
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-12 bg-[#ffe79a] hover:bg-[#fedd77] text-gray-700 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>

            {/* Right Yellow Navigation Arrow */}
            <button
              type="button"
              aria-label="Next slide"
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-12 bg-[#f5b800] hover:bg-[#e5ac00] text-gray-900 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 text-black" />
            </button>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {similarProducts.map((p) => (
                <article key={`pickup-${p.id}`} className="group flex flex-col cursor-pointer">
                  <div className="relative w-full aspect-[3/4] bg-[#f7f7f8] overflow-hidden">
                    {p.tagImg && (
                      <div className="absolute top-0 left-2.5 z-10 w-4 drop-shadow-xs pointer-events-none">
                        <img
                          alt="Just In"
                          className="w-full h-auto object-contain"
                          src={p.tagImg}
                        />
                      </div>
                    )}
                    <Link href={`/product`} className="block w-full h-full overflow-hidden">
                      <img
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        src={p.image}
                      />
                    </Link>
                    <button
                      type="button"
                      onClick={(e) => toggleSimilarWishlist(`pickup-${p.id}`, e)}
                      className="absolute -bottom-2.5 right-2.5 w-7 h-7 bg-white rounded-full border-none flex items-center justify-center text-[#14CDA8] hover:scale-105 active:scale-95 transition-all z-10 cursor-pointer shadow-xs"
                      title="Add to Wishlist"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          wishlistSet.has(`pickup-${p.id}`) ? 'fill-[#14CDA8]' : ''
                        }`}
                      />
                    </button>
                  </div>

                  <div className="pt-2 flex flex-col">
                    <span className="text-[10px] font-bold text-gray-900 tracking-wider uppercase">
                      {p.brand}
                    </span>
                    <h3
                      className="text-[11px] text-gray-700 mt-0.5 truncate leading-tight"
                      title={p.title}
                    >
                      {p.title}
                    </h3>
                    <div className="mt-1 flex items-baseline gap-1.5 flex-wrap">
                      <span className="text-xs font-bold text-gray-900">
                        ₹ {p.price.toLocaleString()}
                      </span>
                      {p.originalPrice && (
                        <span className="text-[11px] text-gray-400 line-through">
                          ₹ {p.originalPrice.toLocaleString()}
                        </span>
                      )}
                      {p.discountPercent && (
                        <span className="text-[11px] font-bold text-[#006b57]">
                          {p.discountPercent}% OFF
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        {/* END: TOP PICKUP FOR YOU Section */}

        {/* BEGIN: Editorial Banner matching Stitch */}
        <section
          className="mb-16 -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden bg-[#e8ded3] relative shadow-xs"
          data-purpose="editorial-banner"
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAki53rTZlrseBrx8szPpZ17MzEKGS4QE1_Nh1rBnQyqlGXmgekfusA8Aiv1fJxmeKuIEzpy_DGSSRMMsdFzQlDwkyhTngYvxsYpRfg0cu_BrWQdPiz4EyzaxfXn17Ul9LMjbPR1BNe7XDhwdplEzr97gjrvMOn8luAOSYKbjHIPmrMOqDjsSr5SHl7hBzFdWPGQhWNignCeaKygD4zGuokLXChn3G35EY2mM6Mjg"
            alt="Boutique Fashion New Trends"
            className="w-full h-auto object-cover"
          />
        </section>
        {/* END: Editorial Banner */}
      </main>

      {/* MODAL 1: Size Chart Modal */}
      {isSizeChartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-gray-100">
            <button
              type="button"
              onClick={() => setIsSizeChartOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base font-bold text-gray-900 mb-1">Size Chart &amp; Fit Guide</h3>
            <p className="text-xs text-gray-500 mb-4">All dimensions are in inches for precision fit</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-100 text-gray-700 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-2.5">Size</th>
                    <th className="p-2.5">Bust</th>
                    <th className="p-2.5">Waist</th>
                    <th className="p-2.5">Hips</th>
                    <th className="p-2.5">Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr><td className="p-2.5 font-bold">22 (XS)</td><td className="p-2.5">32</td><td className="p-2.5">25</td><td className="p-2.5">35</td><td className="p-2.5">48</td></tr>
                  <tr className="bg-stone-50"><td className="p-2.5 font-bold">23 (S)</td><td className="p-2.5">34</td><td className="p-2.5">27</td><td className="p-2.5">37</td><td className="p-2.5">49</td></tr>
                  <tr><td className="p-2.5 font-bold">24 (M)</td><td className="p-2.5">36</td><td className="p-2.5">29</td><td className="p-2.5">39</td><td className="p-2.5">50</td></tr>
                  <tr className="bg-stone-50"><td className="p-2.5 font-bold">26 (L)</td><td className="p-2.5">38</td><td className="p-2.5">31</td><td className="p-2.5">41</td><td className="p-2.5">51</td></tr>
                </tbody>
              </table>
            </div>
            <button
              type="button"
              onClick={() => setIsSizeChartOpen(false)}
              className="mt-6 w-full py-2.5 bg-black text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* MODAL 2: Change Delivery Address Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100">
            <button
              type="button"
              onClick={() => setIsAddressModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base font-bold text-gray-900 mb-1">Update Delivery Address</h3>
            <p className="text-xs text-gray-500 mb-4">Enter your destination to check express shipping</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsAddressModalOpen(false);
                showToast('Delivery address updated!');
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Recipient Name</label>
                <input
                  type="text"
                  value={deliveryAddress.name}
                  onChange={(e) =>
                    setDeliveryAddress({ ...deliveryAddress, name: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-black"
                  required
                />
              </div>
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Pincode</label>
                <input
                  type="text"
                  value={deliveryAddress.pincode}
                  onChange={(e) =>
                    setDeliveryAddress({ ...deliveryAddress, pincode: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-black"
                  required
                />
              </div>
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Full Street Address</label>
                <textarea
                  value={deliveryAddress.address}
                  onChange={(e) =>
                    setDeliveryAddress({ ...deliveryAddress, address: e.target.value })
                  }
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-black resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-2 w-full py-3 bg-black text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Save &amp; Apply
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Write Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100">
            <button
              type="button"
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base font-bold text-gray-900 mb-1">Write a Review</h3>
            <p className="text-xs text-gray-500 mb-4">Share your verified thoughts with the community</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsReviewModalOpen(false);
                showToast('Review submitted for verification!');
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Dipanshu"
                  className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-black"
                  required
                />
              </div>
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Rating</label>
                <div className="flex items-center gap-1.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 cursor-pointer" />
                  ))}
                </div>
              </div>
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Review Comments</label>
                <textarea
                  rows={3}
                  placeholder="How does the fabric and tailoring feel?"
                  className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-black resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-2 w-full py-3 bg-black text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
