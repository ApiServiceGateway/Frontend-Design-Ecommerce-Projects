'use client';

import React, { useState } from 'react';
import { Check, ShieldCheck } from 'lucide-react';

export const AccountCoupons: React.FC = () => {
  const [couponInput, setCouponInput] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Multiple voucher banner images (currently using the same image for testing as requested)
  const voucherBanners = [
    { id: 'voucher-banner-1', image: '/images/voucher-banner.png' },
    { id: 'voucher-banner-2', image: '/images/voucher-banner.png' },
    { id: 'voucher-banner-3', image: '/images/voucher-banner.png' },
    { id: 'voucher-banner-4', image: '/images/voucher-banner.png' },
  ];

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setToastMessage(`Voucher code "${couponInput.trim().toUpperCase()}" applied successfully!`);
    setCouponInput('');
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-6" data-purpose="account-coupons-section">
      {/* 1. Header with Title & Add Voucher Form */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800 leading-tight">
            My Coupons &amp; Vouchers
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Active discount vouchers, private privilege passes, and event cards for your account
          </p>
        </div>

        <form onSubmit={handleApplyCoupon} className="flex items-center gap-2">
          <input
            type="text"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
            placeholder="ENTER VOUCHER CODE"
            className="h-10 px-3.5 text-xs font-mono uppercase bg-white border border-slate-300 hover:border-slate-400 rounded-lg shadow-xs transition focus:outline-none focus:border-[#01AFB5] focus:ring-1 focus:ring-[#01AFB5] text-slate-800 w-full sm:w-52 placeholder-slate-400"
          />
          <button
            type="submit"
            className="h-10 px-4 bg-[#01AFB5] hover:bg-[#009da2] text-white text-xs font-semibold rounded-lg transition shadow-xs whitespace-nowrap cursor-pointer"
          >
            Apply Code
          </button>
        </form>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200/80 rounded-xl text-emerald-800 text-xs font-semibold flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Category / Count Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="px-3.5 py-1.5 rounded-full font-bold bg-[#01AFB5]/15 text-[#01AFB5] border border-[#01AFB5]/30 whitespace-nowrap">
          All Vouchers ({voucherBanners.length})
        </span>
      </div>

      {/* 2. Multiple Voucher Banners (ONLY Images, No Other Details) */}
      <div className="space-y-6">
        {voucherBanners.map((voucher) => (
          <div
            key={voucher.id}
            className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            <img
              src={voucher.image}
              alt="Voucher Banner"
              className="w-full h-auto object-cover select-none block"
            />
          </div>
        ))}
      </div>

      {/* 3. Security & Terms Footnote */}
      <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl flex items-start gap-3 text-xs text-slate-600">
        <ShieldCheck className="w-4 h-4 text-[#01AFB5] mt-0.5 flex-shrink-0" />
        <p className="leading-relaxed text-[11px]">
          Coupons and vouchers are automatically applied at checkout when criteria are met. Crypto checkout
          discounts stack with event vouchers and complimentary priority packaging privileges.
        </p>
      </div>
    </div>
  );
};
