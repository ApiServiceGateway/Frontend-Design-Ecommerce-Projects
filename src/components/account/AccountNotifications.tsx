'use client';

import React, { useState } from 'react';
import { Bell, Package, Tag, ShieldAlert, Sparkles, CheckCheck, Clock } from 'lucide-react';

export const AccountNotifications: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'orders' | 'offers' | 'security'>('all');
  const [notifications, setNotifications] = useState([
    {
      id: 'n-1',
      type: 'orders',
      title: 'Package Out For Delivery',
      desc: 'Your order #MN-893021 (Rangmanch Festive Set) is out for delivery today with discreet plain-box packaging.',
      time: '2 hours ago',
      read: false,
      icon: Package,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      id: 'n-2',
      type: 'offers',
      title: 'Midnight Flash Drop: Extra 25% Off',
      desc: 'Use voucher code CRYPTOBOUTIQUE at checkout to claim flat 25% discount across all luxury verified couture.',
      time: '1 day ago',
      read: false,
      icon: Tag,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      id: 'n-3',
      type: 'security',
      title: 'New Login Detected',
      desc: 'Chrome browser on Windows signed in from Mumbai, India (IP: 103.21.***.***). If this was you, no action needed.',
      time: '2 days ago',
      read: true,
      icon: ShieldAlert,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      id: 'n-4',
      type: 'orders',
      title: 'Order #MN-774019 Delivered',
      desc: 'Your delivery has been completed successfully. How did the fit feel? Leave a verified review to earn $10 credit.',
      time: '1 week ago',
      read: true,
      icon: Package,
      color: 'bg-slate-100 text-slate-600',
    },
  ]);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const filtered = notifications.filter((n) => {
    if (filter === 'all') return true;
    return n.type === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 leading-tight">
            Notifications
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Order alerts, VIP drop announcements, and account security notifications
          </p>
        </div>

        <button
          type="button"
          onClick={handleMarkAllRead}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg transition hover:bg-slate-50"
        >
          <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Mark all as read</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1">
        {[
          { key: 'all', label: 'All Alerts' },
          { key: 'orders', label: 'Orders' },
          { key: 'offers', label: 'Offers & Perks' },
          { key: 'security', label: 'Security' },
        ].map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setFilter(t.key as any)}
            className={`px-3.5 py-1.5 rounded-full font-semibold transition ${
              filter === t.key
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.map((n) => {
          const Icon = n.icon;
          return (
            <div
              key={n.id}
              className={`p-4 rounded-xl border transition flex items-start gap-4 ${
                n.read
                  ? 'bg-white border-slate-200/80'
                  : 'bg-emerald-50/20 border-emerald-200/70 shadow-xs'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${n.color}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <span>{n.title}</span>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-[#14cda8]"></span>
                    )}
                  </h3>
                  <span className="text-[10px] text-slate-400 shrink-0 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{n.time}</span>
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{n.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
