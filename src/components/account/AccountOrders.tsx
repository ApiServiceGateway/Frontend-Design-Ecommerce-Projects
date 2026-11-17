'use client';

import React, { useState } from 'react';
import {
  Search,
  Truck,
  CheckCircle2,
  Clock,
  Download,
  Star,
  ShieldCheck,
  X,
  Phone,
  Copy,
  Check,
  MapPin,
  MessageSquarePlus,
  Edit3,
  Camera,
  ArrowLeft,
} from 'lucide-react';

interface TrackingStep {
  title: string;
  description: string;
  date: string;
  location: string;
  done: boolean;
  active?: boolean;
}

interface OrderProductItem {
  id: string;
  title: string;
  size: string;
  color: string;
  qty: number;
  price: string;
  image: string;
  isReviewed?: boolean;
  userRating?: number;
  userReviewTitle?: string;
  userReviewBody?: string;
  userPhotos?: string[];
  reviewDate?: string;
}

interface OrderItem {
  id: string;
  date: string;
  total: string;
  status: string;
  statusType: 'transit' | 'delivered';
  eta: string;
  trackingNumber: string;
  carrier: string;
  deliveryPin: string;
  deliveryAgent: {
    name: string;
    phone: string;
    rating: string;
  };
  deliveryAddress: string;
  items: OrderProductItem[];
  steps: TrackingStep[];
}

export const AccountOrders: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'transit' | 'delivered'>('all');
  const [trackingModalOrder, setTrackingModalOrder] = useState<OrderItem | null>(null);
  const [copiedAWB, setCopiedAWB] = useState(false);

  // Inline Review View State (NO POPUP WINDOW / MODAL!)
  const [reviewItemData, setReviewItemData] = useState<{
    orderId: string;
    product: OrderProductItem;
  } | null>(null);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewBody, setReviewBody] = useState('');
  const [reviewPhotos, setReviewPhotos] = useState<string[]>([]);
  const [reviewSuccessToast, setReviewSuccessToast] = useState<string | null>(null);

  const [orders, setOrders] = useState<OrderItem[]>([
    {
      id: 'MN-893021',
      date: '10 Nov 2026',
      total: '₹4,499',
      status: 'OUT FOR DELIVERY',
      statusType: 'transit',
      eta: 'Arriving Today by 9:00 PM',
      trackingNumber: 'BLUEDART-883921004',
      carrier: 'BlueDart Apex Stealth Express',
      deliveryPin: '4821',
      deliveryAgent: {
        name: 'Rajesh Kumar',
        phone: '+91 98112 34567',
        rating: '4.9 ★ (1,240 deliveries)',
      },
      deliveryAddress: 'Flat 402, Tower B, Palm Springs, DLF Phase 5, Gurugram, Haryana - 122002',
      items: [
        {
          id: 'p-891',
          title: 'Rangmanch Off-White Embroidered Festive Ethnic Set',
          size: 'M',
          color: 'Ivory Cream',
          qty: 1,
          price: '₹4,499',
          image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuATKEJFfrZfwPr8oQ4E1-Vvymoy-wQkWdvK35GZskSQGECzX6lfZIgCRKeyyrXp8KBpOPHMF0lpPgcgfqzZuSMxqPVwuKxT_tzx5T4-7sKWZYuNQU-7amTvoSHbpLToCo3OsgY90NOzMtbgNPnv-6eSPteZGQD59z77f0quxYpTmRrB-aPirJ5ZgTJbYKtniorBum27Vx3sVqTdZrJTyE6pTsdOey6b__TocaDns58nsONvhhBQG-w',
        },
      ],
      steps: [
        {
          title: 'Order Confirmed & Payment Verified',
          description: 'Payment captured securely via UPI. Seller started preparing package.',
          date: '10 Nov, 10:30 AM',
          location: 'Mumbai Central Atelier',
          done: true,
        },
        {
          title: 'Packed in Camouflage Blind-Box',
          description: 'Tamper-evident unmarked discreet packaging with zero external brand markings.',
          date: '10 Nov, 03:15 PM',
          location: 'Discreet Fulfillment Hub, Bhiwandi',
          done: true,
        },
        {
          title: 'In Transit - Arrived at Regional Hub',
          description: 'Passed automated sortation facility and cleared high-speed corridor.',
          date: '11 Nov, 06:45 AM',
          location: 'Delhi NCR Gateway Hub, Gurugram',
          done: true,
        },
        {
          title: 'Out for Delivery',
          description: 'Package with courier partner. Keep Delivery PIN ready for secure handover.',
          date: '11 Nov, 09:15 AM',
          location: 'Delivery Center, Sector 43, Gurugram',
          done: true,
          active: true,
        },
        {
          title: 'Estimated Delivery',
          description: 'Estimated handover before 9:00 PM tonight.',
          date: 'Today, by 9:00 PM',
          location: 'Your Doorstep',
          done: false,
        },
      ],
    },
    {
      id: 'MN-774019',
      date: '28 Oct 2026',
      total: '₹3,199',
      status: 'DELIVERED',
      statusType: 'delivered',
      eta: 'Delivered on 31 Oct 2026',
      trackingNumber: 'DELHIVERY-992014881',
      carrier: 'Delhivery Surface Blind-Ship',
      deliveryPin: '3109',
      deliveryAgent: {
        name: 'Vikas Sharma',
        phone: '+91 98223 88123',
        rating: '4.8 ★ (890 deliveries)',
      },
      deliveryAddress: 'Flat 402, Sunset Boulevard, 14th Road, Bandra West, Mumbai, Maharashtra - 400050',
      items: [
        {
          id: 'p-771',
          title: 'Tailored Pleated Wool Trousers',
          size: '32',
          color: 'Charcoal Grey',
          qty: 1,
          price: '₹3,199',
          image:
            'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=240&auto=format&fit=crop&q=80',
          isReviewed: false,
        },
        {
          id: 'p-772',
          title: 'Embroidered Flared Strappy Dress with Scalloped Hem',
          size: 'S',
          color: 'Noir Black',
          qty: 1,
          price: '₹2,850',
          image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuB99dwpq68H6bPiciXwJbg8dmsBb9ckLz9C6gof-cbpXjktk_ZioLvspE-f_DhDqo5jJLokmnuLqNM8FJet_N9X7ZhNRjKbsKQIqQ0GiKX52EgCEj28YmrHy09vwwKkMgZQbgO2KiriXB7eoPCWzSyiHsK7RuMcHc2e_6-_G7eHrjJ1t0ptI_5EL6TXR4_ViYzxwsxsSh1iKyKhH7DxZScFtJfPB_dE1oZCBJ7xHA',
          isReviewed: true,
          userRating: 5,
          userReviewTitle: 'Flawless stitching and ultra-comfortable silhouette',
          userReviewBody:
            'Delivered in discreet packaging. The fit is effortlessly relaxed and the fabric feels substantial yet breathable.',
          reviewDate: 'Reviewed 31 Oct 2026',
        },
      ],
      steps: [
        {
          title: 'Order Confirmed',
          description: 'Card payment authorized.',
          date: '28 Oct, 02:10 PM',
          location: 'Mumbai Studio',
          done: true,
        },
        {
          title: 'Dispatched via Plain Seal Pack',
          description: 'Shipped with 0 external product descriptors.',
          date: '29 Oct, 11:00 AM',
          location: 'Warehouse Hub',
          done: true,
        },
        {
          title: 'Delivered in Blind-Box Packaging',
          description: 'Received by customer with signature verification.',
          date: '31 Oct, 04:20 PM',
          location: 'Delivered to Doorstep',
          done: true,
        },
      ],
    },
  ]);

  const handleCopyAWB = (awb: string) => {
    navigator.clipboard.writeText(awb);
    setCopiedAWB(true);
    setTimeout(() => setCopiedAWB(false), 2000);
  };

  // Open inline review mode in this section
  const handleOpenInlineReview = (orderId: string, product: OrderProductItem) => {
    setReviewItemData({ orderId, product });
    setRating(product.userRating || 5);
    setHoverRating(0);
    setReviewTitle(product.userReviewTitle || '');
    setReviewBody(product.userReviewBody || '');
    setReviewPhotos(product.userPhotos || []);
  };

  // Handle Photo Upload
  const handleReviewPhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remainingSlots = 5 - reviewPhotos.length;
    if (remainingSlots <= 0) {
      setReviewSuccessToast('Maximum 5 photos allowed per review.');
      return;
    }

    const selectedFiles = Array.from(files).slice(0, remainingSlots);

    selectedFiles.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        setReviewSuccessToast(`"${file.name}" exceeds 5MB limit.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setReviewPhotos((prev) => {
            if (prev.length >= 5) return prev;
            return [...prev, event.target!.result as string];
          });
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  const handleRemoveReviewPhoto = (indexToRemove: number) => {
    setReviewPhotos((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Submit review inline
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewItemData) return;
    if (!reviewTitle.trim() || !reviewBody.trim()) return;

    const { orderId, product } = reviewItemData;

    setOrders((prevOrders) =>
      prevOrders.map((ord) => {
        if (ord.id !== orderId) return ord;
        return {
          ...ord,
          items: ord.items.map((it) => {
            if (it.id !== product.id) return it;
            return {
              ...it,
              isReviewed: true,
              userRating: rating,
              userReviewTitle: reviewTitle.trim(),
              userReviewBody: reviewBody.trim(),
              userPhotos: reviewPhotos,
              reviewDate: 'Reviewed Today',
            };
          }),
        };
      })
    );

    setReviewSuccessToast(`Review for "${product.title}" saved successfully!`);
    setTimeout(() => setReviewSuccessToast(null), 4000);
    setReviewItemData(null);
  };

  const ratingLabels: { [key: number]: string } = {
    1: 'Poor',
    2: 'Fair',
    3: 'Good',
    4: 'Very Good',
    5: 'Excellent',
  };

  const filteredOrders = orders.filter((order) => {
    if (activeFilter === 'transit' && order.statusType !== 'transit') return false;
    if (activeFilter === 'delivered' && order.statusType !== 'delivered') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesId = order.id.toLowerCase().includes(q);
      const matchesItem = order.items.some((it) => it.title.toLowerCase().includes(q));
      return matchesId || matchesItem;
    }
    return true;
  });

  // =========================================================================
  // VIEW 1: INLINE RATE & REVIEW VIEW (NO POPUP WINDOW, DIRECT IN SECTION!)
  // =========================================================================
  if (reviewItemData) {
    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => setReviewItemData(null)}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-[#01AFB5] transition cursor-pointer group pb-1"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to My Orders</span>
        </button>

        {/* Section Header */}
        <div className="pb-4 border-b border-slate-100">
          <h1 className="text-xl font-bold text-slate-900 leading-tight">
            {reviewItemData.product.isReviewed ? 'Edit Product Review' : 'Rate & Review'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Order #{reviewItemData.orderId} • Verified Purchase Review
          </p>
        </div>

        {/* Inline Review Form Container */}
        <div className="border border-slate-200/90 rounded-2xl p-6 sm:p-7 bg-white shadow-xs space-y-6 max-w-2xl">
          {/* Product Overview Card */}
          <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <img
              src={reviewItemData.product.image}
              alt={reviewItemData.product.title}
              className="w-16 h-16 object-cover rounded-xl border border-slate-200 shrink-0"
            />
            <div className="space-y-1">
              <h2 className="text-sm font-bold text-slate-900 leading-snug">
                {reviewItemData.product.title}
              </h2>
              <p className="text-xs text-slate-500">
                Size: {reviewItemData.product.size} • Color: {reviewItemData.product.color}
              </p>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-1">
                <ShieldCheck className="w-3 h-3" /> 100% Genuine Buyer Review
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmitReview} noValidate className="space-y-5">
            {/* Interactive Star Rating */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                Overall Rating <span className="text-rose-500">*</span>
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 transition ${
                          star <= (hoverRating || rating)
                            ? 'fill-amber-400 text-amber-400 drop-shadow-xs'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  {ratingLabels[hoverRating || rating]}
                </span>
              </div>
            </div>

            {/* Headline / Title */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">
                Headline / Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                placeholder="e.g., Flawless fit and luxurious fabric feel"
                className="w-full h-10 px-3.5 text-xs bg-slate-50 focus:bg-white rounded-lg border border-slate-200 focus:border-[#01AFB5] focus:ring-1 focus:ring-[#01AFB5] outline-none transition"
              />
            </div>

            {/* Detailed Review */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">
                Detailed Review <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={5}
                value={reviewBody}
                onChange={(e) => setReviewBody(e.target.value)}
                placeholder="Share details about the product quality, discreet packaging, fit, and whether you recommend it..."
                className="w-full p-3 text-xs bg-slate-50 focus:bg-white rounded-lg border border-slate-200 focus:border-[#01AFB5] focus:ring-1 focus:ring-[#01AFB5] outline-none transition leading-relaxed"
              ></textarea>
            </div>

            {/* Professional Customer Photo Uploader */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-800">
                  Product Photos <span className="text-slate-400 font-normal">(Optional • Up to 5 photos)</span>
                </label>
                <span className="text-[11px] font-semibold text-slate-500">
                  {reviewPhotos.length} / 5 photos
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Uploaded Photos Preview */}
                {reviewPhotos.map((photoUrl, idx) => (
                  <div
                    key={idx}
                    className="relative group w-20 h-20 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 shadow-2xs shrink-0"
                  >
                    <img
                      src={photoUrl}
                      alt={`Review photo ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveReviewPhoto(idx)}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-slate-900/80 hover:bg-rose-600 text-white flex items-center justify-center transition shadow-xs cursor-pointer"
                      title="Remove image"
                    >
                      <X className="w-3 h-3 stroke-[2.5]" />
                    </button>
                    {idx === 0 && (
                      <span className="absolute bottom-1 left-1 right-1 text-[9px] font-bold bg-slate-900/75 text-white px-1 py-0.5 rounded text-center truncate">
                        Cover
                      </span>
                    )}
                  </div>
                ))}

                {/* Upload Trigger Button */}
                {reviewPhotos.length < 5 && (
                  <label className="w-20 h-20 rounded-xl border-2 border-dashed border-slate-300 hover:border-[#01AFB5] bg-slate-50 hover:bg-[#01AFB5]/5 flex flex-col items-center justify-center gap-1 cursor-pointer transition group select-none shrink-0">
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp"
                      multiple
                      className="hidden"
                      onChange={handleReviewPhotoSelect}
                    />
                    <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 group-hover:border-[#01AFB5]/40 flex items-center justify-center text-slate-500 group-hover:text-[#01AFB5] transition shadow-2xs">
                      <Camera className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-600 group-hover:text-[#01AFB5] transition">
                      + Add Photo
                    </span>
                  </label>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                Upload real photos of the item or discreet unboxing. PNG, JPG or WebP (max 5MB each).
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setReviewItemData(null)}
                className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold rounded-lg transition cursor-pointer"
              >
                Cancel &amp; Go Back
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#01AFB5] hover:bg-[#009da2] text-white text-xs font-bold rounded-lg shadow-xs transition cursor-pointer"
              >
                {reviewItemData.product.isReviewed ? 'Update Review' : 'Submit Review'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: ORDERS LIST VIEW
  // =========================================================================
  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {reviewSuccessToast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>{reviewSuccessToast}</span>
        </div>
      )}

      {/* Header with Title and Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Orders</h1>
          <p className="text-xs text-slate-500 mt-1">
            Track shipments, manage returns, and rate delivered items directly
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by order ID or item..."
              className="w-full h-9 pl-9 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-lg placeholder-slate-400 focus:bg-white focus:ring-1 focus:ring-slate-300 transition"
            />
          </div>
          <select className="h-9 px-3 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition">
            <option>Past 3 months</option>
            <option>2026</option>
            <option>2025</option>
            <option>Archived</option>
          </select>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-100 overflow-x-auto text-xs pb-px">
        <button
          type="button"
          onClick={() => setActiveFilter('all')}
          className={`pb-3 px-3 font-semibold transition border-b-2 cursor-pointer ${
            activeFilter === 'all'
              ? 'text-[#01AFB5] border-[#01AFB5]'
              : 'text-slate-500 border-transparent hover:text-slate-800'
          }`}
        >
          All Orders ({orders.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter('transit')}
          className={`pb-3 px-3 font-semibold transition border-b-2 cursor-pointer ${
            activeFilter === 'transit'
              ? 'text-[#01AFB5] border-[#01AFB5]'
              : 'text-slate-500 border-transparent hover:text-slate-800'
          }`}
        >
          In Transit (1)
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter('delivered')}
          className={`pb-3 px-3 font-semibold transition border-b-2 cursor-pointer ${
            activeFilter === 'delivered'
              ? 'text-[#01AFB5] border-[#01AFB5]'
              : 'text-slate-500 border-transparent hover:text-slate-800'
          }`}
        >
          Delivered (1)
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-5">
        {filteredOrders.map((order) => {
          const isDelivered = order.statusType === 'delivered';

          return (
            <div
              key={order.id}
              className="border border-slate-200/90 rounded-xl overflow-hidden hover:border-slate-300 transition bg-white shadow-xs"
            >
              {/* Order Card Top Bar */}
              <div className="bg-slate-50/70 px-5 py-3.5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-4 flex-wrap">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Order ID
                    </span>
                    <span className="font-mono font-bold text-slate-800">#{order.id}</span>
                  </div>
                  <div className="hidden sm:block h-6 w-px bg-slate-200"></div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Order Date
                    </span>
                    <span className="text-slate-700 font-medium">{order.date}</span>
                  </div>
                  <div className="hidden sm:block h-6 w-px bg-slate-200"></div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Items &amp; Total
                    </span>
                    <span className="font-bold text-slate-900">
                      {order.items.length} {order.items.length === 1 ? 'Item' : 'Items'} •{' '}
                      {order.total}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      order.statusType === 'transit'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {order.status}
                  </span>
                  <div className="flex items-center gap-2 ml-2">
                    <button
                      type="button"
                      onClick={() => setTrackingModalOrder(order)}
                      className="px-3 py-1.5 bg-[#01AFB5] hover:bg-[#009da2] text-white font-semibold text-xs rounded-lg transition shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Track Shipment</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        alert(`Downloading official Tax Invoice for Order #${order.id}...`)
                      }
                      className="px-3 py-1.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 font-semibold text-xs rounded-lg transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Invoice</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Multiple Products List within the Order */}
              <div className="divide-y divide-slate-100">
                {order.items.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 hover:bg-slate-50/50 transition"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={prod.image}
                        alt={prod.title}
                        className="w-16 h-20 object-cover rounded-lg border border-slate-200 flex-shrink-0"
                      />
                      <div className="space-y-1">
                        <h3 className="text-sm font-semibold text-slate-900 hover:text-[#01AFB5] transition line-clamp-1">
                          {prod.title}
                        </h3>
                        <p className="text-xs text-slate-500">
                          Size: <span className="font-semibold text-slate-700">{prod.size}</span> •
                          Color:{' '}
                          <span className="font-semibold text-slate-700">{prod.color}</span> • Qty:{' '}
                          <span className="font-semibold text-slate-700">{prod.qty}</span>
                        </p>
                        <p className="text-sm font-bold text-slate-900 pt-0.5">{prod.price}</p>
                        <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 pt-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{order.eta}</span>
                        </span>
                      </div>
                    </div>

                    {/* Right-Side Actions: Rate & Review */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      {isDelivered ? (
                        prod.isReviewed ? (
                          <div className="flex flex-col items-start sm:items-end gap-1.5 bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-3">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>Reviewed ({prod.userRating}.0 ★)</span>
                            </div>
                            <div className="flex items-center gap-0.5 text-amber-400">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star
                                  key={s}
                                  className={`w-3 h-3 ${
                                    s <= (prod.userRating || 5)
                                      ? 'fill-amber-400 text-amber-400'
                                      : 'text-slate-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <button
                              type="button"
                              onClick={() => handleOpenInlineReview(order.id, prod)}
                              className="text-[11px] font-semibold text-slate-600 hover:text-[#01AFB5] transition inline-flex items-center gap-1 mt-0.5 cursor-pointer"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>Edit Review</span>
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleOpenInlineReview(order.id, prod)}
                            className="w-full sm:w-auto px-4 py-2.5 bg-amber-50/80 hover:bg-amber-100/90 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                          >
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            <span>Rate &amp; Review Product</span>
                          </button>
                        )
                      ) : (
                        <div className="text-[11px] text-slate-400 italic bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>Review unlocks upon delivery</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* DEDICATED TRACK SHIPMENT COMPONENT (Modal Overlay) */}
      {trackingModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#01AFB5]/15 border border-[#01AFB5]/30 flex items-center justify-center text-[#01AFB5]">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-slate-900">Track Shipment</h2>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 uppercase">
                      {trackingModalOrder.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    Order #{trackingModalOrder.id} • {trackingModalOrder.carrier}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setTrackingModalOrder(null)}
                className="w-8 h-8 rounded-lg hover:bg-slate-200/70 text-slate-400 hover:text-slate-700 flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
              {/* Delivery ETA & PIN Banner */}
              <div className="bg-gradient-to-r from-slate-900 to-[#122e33] rounded-xl p-4 sm:p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300">
                    Estimated Handover
                  </span>
                  <div className="text-xl sm:text-2xl font-extrabold">{trackingModalOrder.eta}</div>
                  <p className="text-xs text-slate-300">
                    Carrier: {trackingModalOrder.carrier}
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/15 text-center sm:text-right">
                  <span className="text-[10px] text-slate-300 block uppercase font-medium">
                    Secure Delivery PIN
                  </span>
                  <strong className="text-2xl font-mono tracking-widest text-[#5EF1ED]">
                    {trackingModalOrder.deliveryPin}
                  </strong>
                  <span className="text-[9px] text-slate-400 block mt-0.5">
                    Share with courier at doorstep
                  </span>
                </div>
              </div>

              {/* Waybill / AWB Bar */}
              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-medium">Air Waybill (AWB):</span>
                  <span className="font-mono font-bold text-slate-800">
                    {trackingModalOrder.trackingNumber}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyAWB(trackingModalOrder.trackingNumber)}
                  className="inline-flex items-center gap-1 text-[#01AFB5] hover:text-[#009da2] font-semibold cursor-pointer"
                >
                  {copiedAWB ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedAWB ? 'Copied' : 'Copy AWB'}</span>
                </button>
              </div>

              {/* Delivery Agent Card */}
              <div className="border border-slate-200/90 rounded-xl p-4 flex items-center justify-between gap-4 bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-sm">
                    {trackingModalOrder.deliveryAgent.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">
                        {trackingModalOrder.deliveryAgent.name}
                      </span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-1.5 py-0.2 rounded font-medium">
                        Verified Partner
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {trackingModalOrder.deliveryAgent.rating}
                    </p>
                  </div>
                </div>

                <a
                  href={`tel:${trackingModalOrder.deliveryAgent.phone}`}
                  className="px-3.5 py-1.5 bg-[#01AFB5]/10 hover:bg-[#01AFB5] text-[#01AFB5] hover:text-white rounded-lg text-xs font-semibold transition flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Agent</span>
                </a>
              </div>

              {/* Comprehensive Live Timeline */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#01AFB5]" />
                  <span>Live Journey &amp; Checkpoints</span>
                </h3>

                <div className="relative pl-7 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {trackingModalOrder.steps.map((step, idx) => (
                    <div key={idx} className="relative flex items-start justify-between gap-4">
                      {/* Step Circle Pin */}
                      <div
                        className={`absolute -left-7 top-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                          step.active
                            ? 'bg-[#01AFB5] text-white ring-4 ring-emerald-100 shadow-sm animate-pulse'
                            : step.done
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-200 text-slate-400'
                        }`}
                      >
                        {step.done ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                        )}
                      </div>

                      <div className="space-y-0.5 flex-1">
                        <div className="flex items-center gap-2">
                          <h4
                            className={`text-xs font-bold ${
                              step.active ? 'text-[#01AFB5]' : 'text-slate-800'
                            }`}
                          >
                            {step.title}
                          </h4>
                          {step.active && (
                            <span className="text-[9px] font-bold uppercase bg-emerald-50 text-[#01AFB5] px-1.5 py-0.2 rounded border border-emerald-200">
                              Current Status
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          {step.description}
                        </p>
                        <p className="text-[10px] text-slate-400 flex items-center gap-1 pt-0.5 font-medium">
                          <MapPin className="w-3 h-3" />
                          <span>{step.location}</span>
                        </p>
                      </div>

                      <span className="text-[11px] font-mono text-slate-400 whitespace-nowrap pt-0.5">
                        {step.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Address Box */}
              <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1 text-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Delivery Destination
                </span>
                <p className="font-medium text-slate-700 leading-relaxed">
                  {trackingModalOrder.deliveryAddress}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#01AFB5]" />
                100% Blind-Box Packaging Assured
              </span>
              <button
                type="button"
                onClick={() => setTrackingModalOrder(null)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition cursor-pointer"
              >
                Close Tracking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
