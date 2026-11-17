'use client';

import React from 'react';
import Link from 'next/link';
import { Package, Heart, Tag, Store, ArrowRight, Shield } from 'lucide-react';
import { AccountTab } from './AccountSidebar';

interface AccountOverviewProps {
  onNavigateTab: (tab: AccountTab) => void;
  profileName?: string;
  username?: string;
  dob?: string;
  joinedDate?: string;
  avatarUrl?: string;
  coverUrl?: string;
}

export const AccountOverview: React.FC<AccountOverviewProps> = ({
  onNavigateTab,
  profileName = 'Dipanshu',
  username = '@dipanshu',
  dob = '23 April 2001',
  joinedDate = 'April 2024',
  avatarUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAt7ZQDjLfHoX3s9WOGLLNV1EHbGzEO62d43kWEvjwmYcMO8fjV_LcFc0mjIuqtg_PBCaJ6QSpKXTEbVJ_8gaFsvrn6sU9kSDU-bBAzn5IGGrXlEWEcW8IVrfIaz2zJqx36fV1j1WO0bDw4Hp1oq_iUPuoEbdAMtKRDInuhfNi8kH4tp98jO0AWQ72oQboKbyMtKYm5NbvtooDICnGxRjiMr2oisnIiIB2dyQk9WQTx8XyYUGqom5o',
  coverUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCwG4WbxArsV2nSOTxZxaTknfKbWYFNQvTR-b7YcqCpWtSzb5Egt4-Ff3djk2CsaEHEyFSSH6izt1zWCZh1muz55l_2LWw96CbshPeTq2eCL1-V-35iIHG-RK0RZkcYPKxzmKkfPyNfuLHNSuG3CWX243qwFYOcQ8dy3jMWRnYk7bHw7l_cQT2787phfWkOattFNg-VGtslbqwhLl7TLLruyPiW3bY78F1-2o_tw',
}) => {
  return (
    <div className="space-y-6" data-purpose="account-overview">
      {/* 1. Main Profile Card (Matching Stitch Wireframe) */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70 overflow-hidden">
        {/* Sunset Cover Banner */}
        <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-900">
          <img
            alt="Sunset silhouette banner"
            className="w-full h-full object-cover"
            src={coverUrl}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
          <button
            type="button"
            onClick={() => onNavigateTab('edit-profile')}
            className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-black/40 hover:bg-black/60 text-white text-xs font-semibold backdrop-blur-sm transition flex items-center gap-1.5 cursor-pointer"
          >
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Avatar & User Details */}
        <div className="relative px-6 sm:px-8 pb-8 text-center">
          {/* Overlapping Avatar */}
          <div className="relative -mt-16 sm:-mt-20 inline-block mb-3">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-md bg-white ring-1 ring-slate-100 mx-auto">
              <img
                alt="User avatar"
                className="w-full h-full object-cover"
                src={avatarUrl}
              />
            </div>
          </div>

          {/* Identity Details */}
          <div className="mb-6 space-y-0.5">
            <h2 className="text-xl font-bold text-slate-900">{profileName}</h2>
            <p className="text-sm font-medium text-slate-700">{username}</p>
            <p className="text-xs text-slate-500">
              born {dob} &nbsp; Joined {joinedDate}
            </p>
          </div>

          {/* 4 Feature Quick Cards */}
          <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
            {/* Orders */}
            <button
              type="button"
              onClick={() => onNavigateTab('orders')}
              className="flex items-center justify-center py-4 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold shadow-xs transition text-center cursor-pointer hover:border-slate-300"
            >
              Orders
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="flex items-center justify-center py-4 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold shadow-xs transition text-center hover:border-slate-300"
            >
              Wishlist
            </Link>

            {/* Coupons */}
            <button
              type="button"
              onClick={() => onNavigateTab('coupons')}
              className="flex items-center justify-center py-4 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold shadow-xs transition text-center cursor-pointer hover:border-slate-300"
            >
              Coupons
            </button>

            {/* Sell on "Store name" */}
            <button
              type="button"
              onClick={() => {
                alert('Midnight Partner Atelier Program: Sell your designer collections with 0% platform commission for the first 30 days. Contact conciergevip@midnight.store to register.');
              }}
              className="flex items-center justify-center py-4 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold shadow-xs transition text-center cursor-pointer hover:border-slate-300"
            >
              Sell on &quot;Store name&quot;
            </button>
          </div>
        </div>
      </div>

      {/* 2. Sponsored Section (Matching Stitch Design exactly) */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-800 px-1">Sponsored</h3>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70 overflow-hidden">
          <div className="relative flex flex-col md:flex-row items-stretch min-h-[190px]">
            {/* Left image of model in blue coat */}
            <div className="w-full md:w-5/12 h-48 md:h-auto relative overflow-hidden flex-shrink-0 bg-slate-200">
              <img
                alt="Fashion model in blue coat"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiDs_lXNwce0kD5Ur8c_8Wr9GSJTwygTZRc21UmNEA1tJN96jDWcyGfn1QmRVISNg0dXT7vsGGiUeMGXRQhlTBdOVBzGUsogS8z_mVMiPKHb92Sme5uORKgPYwD6Xsy4S_TGwvCwrJ21rLW2Xf6d69tr6YvYd_BuBRg_XNnefrlHE5NOOeO5hqUNz0ZUOjWogCgpdQshDKHObhA-_lHKT-szkHXnxBngueOZEV7A"
              />
            </div>
            {/* Right blue block */}
            <div className="w-full md:w-7/12 p-6 flex flex-col justify-center items-center text-center space-y-2 bg-[#558298] text-white relative">
              <div className="text-[10px] tracking-widest uppercase font-semibold text-sky-200">
                BRAND
              </div>
              <h4 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase">
                FASHION SALE
              </h4>
              <p className="text-xs font-medium text-sky-100">Just For You</p>
              <span className="inline-block px-3 py-1 bg-white/20 text-white rounded-full text-[11px] font-semibold tracking-wide uppercase mt-1">
                DISCOUNT UP TO 30% OFF
              </span>
              <p className="text-[9px] text-sky-200 max-w-xs mt-1 leading-tight hidden sm:block">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.
              </p>
              <Link
                href="/category?cat=streetwear"
                className="mt-2 px-4 py-1.5 bg-white text-slate-900 rounded-md text-[11px] font-bold uppercase tracking-wider hover:bg-slate-100 transition shadow-sm"
              >
                SHOP NOW
              </Link>
            </div>
          </div>
          {/* Bottom View row */}
          <Link
            href="/category?cat=streetwear"
            className="flex items-center justify-between px-6 py-3.5 bg-white border-t border-slate-100 hover:bg-slate-50 transition text-slate-800 group"
          >
            <span className="text-sm font-medium">View</span>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-slate-900 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Bottom Trust Badge */}
        <div className="text-center pt-2 pb-1">
          <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
            <Shield className="w-3.5 h-3.5 text-slate-400" /> Protected by black rocks
          </span>
        </div>
      </div>
    </div>
  );
};
