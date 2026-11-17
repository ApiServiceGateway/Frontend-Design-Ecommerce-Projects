'use client';

import React from 'react';
import {
  User,
  MapPin,
  Gift,
  ShieldCheck,
  CreditCard,
  Wallet,
  Key,
  Lock,
  Mail,
  MessageSquare,
  Bell,
  Package,
  Tag,
  LogOut,
  HelpCircle,
  FileText,
  Shield,
  ChevronRight,
  UserX,
  Coins,
} from 'lucide-react';

export type AccountTab =
  | 'overview'
  | 'orders'
  | 'coupons'
  | 'edit-profile'
  | 'address'
  | 'gift-cards'
  | 'upi'
  | 'card'
  | 'crypto'
  | '2fa'
  | 'password'
  | 'email'
  | 'reviews'
  | 'notifications';

interface AccountSidebarProps {
  activeTab: AccountTab;
  onSelectTab: (tab: AccountTab) => void;
  profileName?: string;
  dob?: string;
  avatarUrl?: string;
}

export const AccountSidebar: React.FC<AccountSidebarProps> = ({
  activeTab,
  onSelectTab,
  profileName = 'Dipanshu',
  dob = '23 April 2001',
  avatarUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAt7ZQDjLfHoX3s9WOGLLNV1EHbGzEO62d43kWEvjwmYcMO8fjV_LcFc0mjIuqtg_PBCaJ6QSpKXTEbVJ_8gaFsvrn6sU9kSDU-bBAzn5IGGrXlEWEcW8IVrfIaz2zJqx36fV1j1WO0bDw4Hp1oq_iUPuoEbdAMtKRDInuhfNi8kH4tp98jO0AWQ72oQboKbyMtKYm5NbvtooDICnGxRjiMr2oisnIiIB2dyQk9WQTx8XyYUGqom5o',
}) => {
  const getItemClasses = (tab: AccountTab) => {
    const isActive = activeTab === tab;
    return `w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer text-left ${
      isActive
        ? 'text-[#01AFB5] font-bold'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
    }`;
  };

  const getIconClasses = (tab: AccountTab) => {
    const isActive = activeTab === tab;
    return `w-4 h-4 flex-shrink-0 transition-colors ${
      isActive ? 'text-[#01AFB5]' : 'text-slate-400 group-hover:text-slate-600'
    }`;
  };

  return (
    <aside className="w-full space-y-3" data-purpose="account-sidebar">
      {/* 1. User Profile Header (Clickable to go to Overview) */}
      <button
        type="button"
        onClick={() => onSelectTab('overview')}
        className="w-full p-2.5 rounded-xl transition text-left flex items-center space-x-3.5 group cursor-pointer hover:bg-slate-50"
      >
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-slate-100 ring-1 ring-slate-200">
          <img
            alt="Profile portrait"
            className="w-full h-full object-cover"
            src={avatarUrl}
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <h2 className={`font-bold text-sm leading-snug truncate transition-colors ${
              activeTab === 'overview' ? 'text-[#01AFB5]' : 'text-slate-800 group-hover:text-[#01AFB5]'
            }`}>
              {profileName}
            </h2>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-[11px] text-slate-400">born {dob}</p>
        </div>
      </button>

      <div className="h-px bg-slate-200/80 my-2"></div>

      {/* 2. Quick Activity (My Orders & Coupons) */}
      <div className="space-y-1">
        <h3 className="font-bold text-[11px] tracking-wider uppercase mb-1.5 px-3 text-slate-400">
          Orders &amp; Rewards
        </h3>
        <button
          type="button"
          onClick={() => onSelectTab('orders')}
          className={getItemClasses('orders')}
        >
          <div className="flex items-center gap-3">
            <Package className={getIconClasses('orders')} />
            <span>My Orders</span>
          </div>
          <span className="min-w-[20px] h-5 px-2 inline-flex items-center justify-center rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200/80 shadow-2xs">
            3
          </span>
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('coupons')}
          className={getItemClasses('coupons')}
        >
          <div className="flex items-center gap-3">
            <Tag className={getIconClasses('coupons')} />
            <span>My Coupons &amp; Vouchers</span>
          </div>
          <span className="min-w-[20px] h-5 px-2 inline-flex items-center justify-center rounded-full text-[11px] font-semibold bg-[#01AFB5]/10 text-[#01AFB5] border border-[#01AFB5]/30 shadow-2xs">
            4
          </span>
        </button>
      </div>

      <div className="h-px bg-slate-200/80 my-2"></div>

      {/* 3. Account Settings */}
      <div className="space-y-1">
        <h3 className="font-bold text-[11px] tracking-wider uppercase mb-1.5 px-3 text-slate-400">
          Account Settings
        </h3>
        <button
          type="button"
          onClick={() => onSelectTab('edit-profile')}
          className={getItemClasses('edit-profile')}
        >
          <div className="flex items-center gap-3">
            <User className={getIconClasses('edit-profile')} />
            <span>Edit profile</span>
          </div>
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('address')}
          className={getItemClasses('address')}
        >
          <div className="flex items-center gap-3">
            <MapPin className={getIconClasses('address')} />
            <span>Manage address</span>
          </div>
          <span className="h-5 px-2.5 inline-flex items-center justify-center rounded-full text-[11px] font-medium bg-slate-100/80 text-slate-600 border border-slate-200/80">
            2 saved
          </span>
        </button>
      </div>

      <div className="h-px bg-slate-200/80 my-2"></div>

      {/* 4. Payments */}
      <div className="space-y-1">
        <h3 className="font-bold text-[11px] tracking-wider uppercase mb-1.5 px-3 text-slate-400">
          PAYMENTS
        </h3>
        <button
          type="button"
          onClick={() => onSelectTab('gift-cards')}
          className={getItemClasses('gift-cards')}
        >
          <div className="flex items-center gap-3">
            <Coins className={getIconClasses('gift-cards')} />
            <span>Logo Credit</span>
          </div>
          <span className="h-5 px-2.5 inline-flex items-center justify-center rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/90 shadow-2xs font-mono">
            ₹1,250
          </span>
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('upi')}
          className={getItemClasses('upi')}
        >
          <div className="flex items-center gap-3">
            <ShieldCheck className={getIconClasses('upi')} />
            <span>Save UPI</span>
          </div>
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('card')}
          className={getItemClasses('card')}
        >
          <div className="flex items-center gap-3">
            <CreditCard className={getIconClasses('card')} />
            <span>Save Card</span>
          </div>
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('crypto')}
          className={getItemClasses('crypto')}
        >
          <div className="flex items-center gap-3">
            <Wallet className={getIconClasses('crypto')} />
            <span>Save Crypto address</span>
          </div>
          <span className="h-5 px-2 inline-flex items-center justify-center rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-50 text-amber-700 border border-amber-300/80 shadow-2xs">
            Web3
          </span>
        </button>
      </div>

      <div className="h-px bg-slate-200/80 my-2"></div>

      {/* 5. Security */}
      <div className="space-y-1">
        <h3 className="font-bold text-[11px] tracking-wider uppercase mb-1.5 px-3 text-slate-400">
          Security
        </h3>
        <button
          type="button"
          onClick={() => onSelectTab('2fa')}
          className={getItemClasses('2fa')}
        >
          <div className="flex items-center gap-3">
            <Key className={getIconClasses('2fa')} />
            <span>Add Two-Factor Authentication</span>
          </div>
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('password')}
          className={getItemClasses('password')}
        >
          <div className="flex items-center gap-3">
            <Lock className={getIconClasses('password')} />
            <span>Change password</span>
          </div>
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('email')}
          className={getItemClasses('email')}
        >
          <div className="flex items-center gap-3">
            <Mail className={getIconClasses('email')} />
            <span>Change your Email</span>
          </div>
        </button>
      </div>

      <div className="h-px bg-slate-200/80 my-2"></div>

      {/* 6. Activity & Notifications */}
      <div className="space-y-1">
        <button
          type="button"
          onClick={() => onSelectTab('reviews')}
          className={getItemClasses('reviews')}
        >
          <div className="flex items-center gap-3">
            <MessageSquare className={getIconClasses('reviews')} />
            <span>Reviews</span>
          </div>
          <span className="min-w-[20px] h-5 px-2 inline-flex items-center justify-center rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200/80 shadow-2xs">
            3
          </span>
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('notifications')}
          className={getItemClasses('notifications')}
        >
          <div className="flex items-center gap-3">
            <Bell className={getIconClasses('notifications')} />
            <span>Notification</span>
          </div>
          <span className="h-5 px-2 inline-flex items-center gap-1.5 rounded-full text-[10px] font-bold bg-rose-50 text-[#FF3F6C] border border-rose-200/80 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3F6C] animate-pulse"></span>
            <span>New</span>
          </span>
        </button>
      </div>

      <div className="h-px bg-slate-200/80 my-2"></div>

      {/* 7. Help & Legal Links */}
      <div className="space-y-1 text-xs text-slate-500 font-medium">
        <a
          href="/faq"
          className="flex items-center gap-3 px-3 py-1.5 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition"
        >
          <HelpCircle className="w-4 h-4 text-slate-400" />
          <span>Questions &amp; Answers</span>
        </a>
      </div>

      <div className="h-px bg-slate-200/80 my-2"></div>

      {/* 8. Account Deletion & Logout Actions */}
      <div className="pt-1 space-y-1">
        <button
          type="button"
          onClick={() => {
            if (
              confirm(
                'Are you sure you want to permanently delete your account? This action cannot be undone and all your order history, credits, and saved addresses will be deleted.'
              )
            ) {
              alert('Account deletion request submitted. Your data will be permanently wiped.');
              window.location.href = '/auth';
            }
          }}
          className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 rounded-lg hover:bg-rose-50 transition group text-left cursor-pointer"
        >
          <UserX className="w-4 h-4 text-rose-500 group-hover:text-rose-600" />
          <span>Delete Account</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (confirm('Are you sure you want to log out?')) {
              window.location.href = '/auth';
            }
          }}
          className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition group text-left cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
