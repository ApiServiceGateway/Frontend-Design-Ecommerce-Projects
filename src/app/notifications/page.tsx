'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  Check,
  CheckCheck,
  Settings,
  Truck,
  Sparkles,
  Lock,
  Tag,
  DollarSign,
  PackageCheck,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Filter,
  Eye,
} from 'lucide-react';
import { StorefrontHeader } from '@/components/layout/StorefrontHeader';
import { StorefrontFooter } from '@/components/layout/StorefrontFooter';

type NotifFilter = 'all' | 'orders' | 'promos' | 'security' | 'system';

interface NotificationItem {
  id: string;
  category: 'orders' | 'promos' | 'security' | 'system';
  period: 'today' | 'yesterday' | 'earlier';
  unread: boolean;
  title: string;
  badge: string;
  badgeColor: string;
  time: string;
  description: string;
  primaryAction?: { label: string; href?: string; onClick?: () => void };
  secondaryAction?: { label: string; href?: string; onClick?: () => void };
}

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState<NotifFilter>('all');
  const [items, setItems] = useState<NotificationItem[]>([
    {
      id: 'n1',
      category: 'orders',
      period: 'today',
      unread: true,
      title: 'Order Out for Delivery',
      badge: 'Delivery',
      badgeColor: 'text-[#14CDA8] bg-[#14CDA8]/10',
      time: '25m ago',
      description: 'Your order #ORD-8921 (Oversized Linen Shirt & Pants) is out for delivery today with discreet courier dispatch.',
      primaryAction: { label: 'Track Package', href: '/checkout/success' },
      secondaryAction: { label: 'View Order', href: '/account/orders' },
    },
    {
      id: 'n2',
      category: 'promos',
      period: 'today',
      unread: true,
      title: 'Private Vault Access Open',
      badge: 'Exclusive',
      badgeColor: 'text-slate-700 bg-slate-100',
      time: '3h ago',
      description: 'Private Vault Access: Atelier Winter 2025 Silk Capsule is now live for VIP members with limited allocation quantities.',
      primaryAction: { label: 'Shop Collection', href: '/catalog' },
    },
    {
      id: 'n3',
      category: 'security',
      period: 'yesterday',
      unread: false,
      title: 'Two-Factor Authentication Confirmed',
      badge: 'Security',
      badgeColor: 'text-gray-600 bg-gray-100',
      time: 'Yesterday, 4:15 PM',
      description: 'Two-Factor Authentication was enabled from a new desktop session (Chrome on macOS, San Francisco, USA).',
      primaryAction: { label: 'Review Security', href: '/account' },
    },
    {
      id: 'n4',
      category: 'promos',
      period: 'yesterday',
      unread: false,
      title: 'Wishlist Price Drop Alert',
      badge: 'Price Drop',
      badgeColor: 'text-[#14CDA8] bg-[#14CDA8]/10',
      time: 'Yesterday, 11:30 AM',
      description: 'An item saved in your Wishlist (Tailored Pleated Trousers) has dropped in price by 15% OFF.',
      primaryAction: { label: 'Move to Cart', href: '/cart' },
      secondaryAction: { label: 'View Item', href: '/product/p1' },
    },
    {
      id: 'n5',
      category: 'system',
      period: 'earlier',
      unread: false,
      title: 'Logo Cash Credited',
      badge: 'Wallet',
      badgeColor: 'text-[#14CDA8] bg-[#14CDA8]/10',
      time: '3 days ago',
      description: 'Logo Cash Credited: +$25.00 promotional shopping credit added to your account for crypto payments anniversary.',
      primaryAction: { label: 'Check Balance', href: '/checkout/payment' },
    },
    {
      id: 'n6',
      category: 'orders',
      period: 'earlier',
      unread: false,
      title: 'Delivered: Order #ORD-8730',
      badge: 'Completed',
      badgeColor: 'text-gray-500 bg-gray-100',
      time: '4 days ago',
      description: 'Order #ORD-8730 was safely delivered to your designated address in Delhi. Thank you for shopping with us.',
      primaryAction: { label: 'Write a Review', href: '/account/orders' },
      secondaryAction: { label: 'Download Invoice', href: '/checkout/success' },
    },
  ]);

  // Channel toggles
  const [milestonesOn, setMilestonesOn] = useState(true);
  const [smsOn, setSmsOn] = useState(true);
  const [dropsOn, setDropsOn] = useState(true);

  const markAllAsRead = () => {
    setItems(items.map((i) => ({ ...i, unread: false })));
  };

  const filteredItems = items.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  const todayItems = filteredItems.filter((i) => i.period === 'today');
  const yesterdayItems = filteredItems.filter((i) => i.period === 'yesterday');
  const earlierItems = filteredItems.filter((i) => i.period === 'earlier');

  return (
    <div className="text-gray-800 font-sans antialiased min-h-screen flex flex-col bg-white">
      <StorefrontHeader />

      {/* Breadcrumb Bar */}
      <section className="border-b border-gray-200/80 bg-white/70 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-gray-500">
          <nav className="flex items-center gap-2">
            <Link href="/" className="hover:text-gray-900 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/account" className="hover:text-gray-900 transition-colors">
              My Account
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">Notifications &amp; Updates</span>
          </nav>
          <div className="flex items-center gap-2 text-[11px] text-gray-500">
            <span className="w-2 h-2 rounded-full bg-[#14CDA8] animate-pulse" />
            <span>Real-time Sync Active</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        <div className="space-y-6">
          
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-gray-200/70">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FF3F6C]/10 text-[#FF3F6C] text-[10px] font-bold tracking-wider uppercase mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3F6C]" />
                Activity &amp; Preferences
              </div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Notifications &amp; Updates</h1>
              <p className="text-xs text-gray-500 mt-1 max-w-2xl">
                Stay informed about order milestones, flash curations, security events, and member-exclusive private showroom drops.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={markAllAsRead}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-gray-300 bg-white text-xs font-semibold text-gray-700 hover:text-black hover:border-gray-400 transition-colors"
              >
                <Check className="w-3.5 h-3.5 text-gray-500 stroke-[2.5]" />
                <span>Mark All as Read</span>
              </button>
              <button
                type="button"
                onClick={() => alert('Settings opened in sidebar.')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-gray-300 bg-white text-xs font-semibold text-gray-700 hover:text-black hover:border-gray-400 transition-colors"
              >
                <Settings className="w-3.5 h-3.5 text-gray-500" />
                <span>Settings</span>
              </button>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap ${
                activeFilter === 'all'
                  ? 'font-semibold border border-gray-900 bg-gray-900 text-white shadow-sm'
                  : 'font-medium border border-gray-200 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              All Notifications ({items.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('orders')}
              className={`px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap ${
                activeFilter === 'orders'
                  ? 'font-semibold border border-gray-900 bg-gray-900 text-white shadow-sm'
                  : 'font-medium border border-gray-200 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              Orders &amp; Delivery ({items.filter((i) => i.category === 'orders').length})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('promos')}
              className={`px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap ${
                activeFilter === 'promos'
                  ? 'font-semibold border border-gray-900 bg-gray-900 text-white shadow-sm'
                  : 'font-medium border border-gray-200 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              Promos &amp; Offers ({items.filter((i) => i.category === 'promos').length})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('security')}
              className={`px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap ${
                activeFilter === 'security'
                  ? 'font-semibold border border-gray-900 bg-gray-900 text-white shadow-sm'
                  : 'font-medium border border-gray-200 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              Security &amp; Account ({items.filter((i) => i.category === 'security').length})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('system')}
              className={`px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap ${
                activeFilter === 'system'
                  ? 'font-semibold border border-gray-900 bg-gray-900 text-white shadow-sm'
                  : 'font-medium border border-gray-200 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              System Updates ({items.filter((i) => i.category === 'system').length})
            </button>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Notifications Timeline (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Today Section */}
              {todayItems.length > 0 && (
                <section className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Today</h2>
                    <span className="text-[11px] text-gray-400">
                      {todayItems.filter((i) => i.unread).length} unread
                    </span>
                  </div>

                  {todayItems.map((item) => (
                    <article
                      key={item.id}
                      className={`bg-white rounded-xl p-4 shadow-sm relative transition ${
                        item.unread
                          ? 'border border-[#FF3F6C]/40 hover:border-[#FF3F6C]'
                          : 'border border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                            item.category === 'orders'
                              ? 'bg-[#14CDA8]/10 text-[#14CDA8]'
                              : item.category === 'promos'
                              ? 'bg-red-50 text-[#FF3F6C]'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {item.category === 'orders' ? (
                            <Truck className="w-4 h-4 stroke-[1.8]" />
                          ) : item.category === 'promos' ? (
                            <Sparkles className="w-4 h-4 stroke-[1.8]" />
                          ) : (
                            <Lock className="w-4 h-4 stroke-[1.8]" />
                          )}
                        </div>

                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <h3 className="text-xs font-bold text-gray-900">{item.title}</h3>
                              {item.unread && <span className="w-2 h-2 rounded-full bg-[#FF3F6C]" />}
                              <span
                                className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase ${item.badgeColor}`}
                              >
                                {item.badge}
                              </span>
                            </div>
                            <span className="text-[11px] text-gray-400">{item.time}</span>
                          </div>

                          <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>

                          <div className="flex items-center gap-2 pt-2">
                            {item.primaryAction && (
                              <Link
                                href={item.primaryAction.href || '#'}
                                className="border border-gray-300 hover:border-gray-800 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white transition-colors"
                              >
                                {item.primaryAction.label}
                              </Link>
                            )}
                            {item.secondaryAction && (
                              <Link
                                href={item.secondaryAction.href || '#'}
                                className="text-xs font-semibold text-gray-600 hover:text-black py-1.5 px-2.5"
                              >
                                {item.secondaryAction.label}
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </section>
              )}

              {/* Yesterday Section */}
              {yesterdayItems.length > 0 && (
                <section className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Yesterday</h2>
                    <span className="text-[11px] text-gray-400">{yesterdayItems.length} updates</span>
                  </div>

                  {yesterdayItems.map((item) => (
                    <article
                      key={item.id}
                      className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm relative transition hover:border-gray-400"
                    >
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                            item.category === 'security'
                              ? 'bg-gray-100 text-gray-700'
                              : 'bg-[#14CDA8]/10 text-[#14CDA8]'
                          }`}
                        >
                          {item.category === 'security' ? (
                            <Lock className="w-4 h-4 stroke-[1.8]" />
                          ) : (
                            <Tag className="w-4 h-4 stroke-[1.8]" />
                          )}
                        </div>

                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <h3 className="text-xs font-bold text-gray-900">{item.title}</h3>
                              <span
                                className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase ${item.badgeColor}`}
                              >
                                {item.badge}
                              </span>
                            </div>
                            <span className="text-[11px] text-gray-400">{item.time}</span>
                          </div>

                          <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>

                          <div className="flex items-center gap-2 pt-2">
                            {item.primaryAction && (
                              <Link
                                href={item.primaryAction.href || '#'}
                                className="border border-gray-300 hover:border-gray-800 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white transition-colors"
                              >
                                {item.primaryAction.label}
                              </Link>
                            )}
                            {item.secondaryAction && (
                              <Link
                                href={item.secondaryAction.href || '#'}
                                className="text-xs font-semibold text-gray-600 hover:text-black py-1.5 px-2.5"
                              >
                                {item.secondaryAction.label}
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </section>
              )}

              {/* Earlier Section */}
              {earlierItems.length > 0 && (
                <section className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Earlier This Week</h2>
                    <span className="text-[11px] text-gray-400">{earlierItems.length} updates</span>
                  </div>

                  {earlierItems.map((item) => (
                    <article
                      key={item.id}
                      className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm relative transition hover:border-gray-400"
                    >
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                            item.category === 'system'
                              ? 'bg-slate-100 text-slate-800'
                              : 'bg-[#14CDA8]/10 text-[#14CDA8]'
                          }`}
                        >
                          {item.category === 'system' ? (
                            <DollarSign className="w-4 h-4 stroke-[1.8]" />
                          ) : (
                            <PackageCheck className="w-4 h-4 stroke-[1.8]" />
                          )}
                        </div>

                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <h3 className="text-xs font-bold text-gray-900">{item.title}</h3>
                              <span
                                className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase ${item.badgeColor}`}
                              >
                                {item.badge}
                              </span>
                            </div>
                            <span className="text-[11px] text-gray-400">{item.time}</span>
                          </div>

                          <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>

                          <div className="flex items-center gap-2 pt-2">
                            {item.primaryAction && (
                              <Link
                                href={item.primaryAction.href || '#'}
                                className="border border-gray-300 hover:border-gray-800 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white transition-colors"
                              >
                                {item.primaryAction.label}
                              </Link>
                            )}
                            {item.secondaryAction && (
                              <Link
                                href={item.secondaryAction.href || '#'}
                                className="text-xs font-semibold text-gray-600 hover:text-black py-1.5 px-2.5"
                              >
                                {item.secondaryAction.label}
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </section>
              )}

            </div>

            {/* RIGHT COLUMN: Channel Preferences & Trust (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              
              {/* Channel Preferences Card */}
              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide">Channel Preferences</h3>
                  <span className="text-[10px] text-gray-400 font-semibold">4 active</span>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="pr-2">
                      <p className="font-bold text-gray-800 text-xs">Order Milestones &amp; Tracking</p>
                      <p className="text-[11px] text-gray-500">Real-time status of dispatch and delivery</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={milestonesOn}
                      onChange={(e) => setMilestonesOn(e.target.checked)}
                      className="h-4 w-4 text-[#14CDA8] focus:ring-[#14CDA8] border-gray-300 rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="pr-2">
                      <p className="font-bold text-gray-800 text-xs">SMS / WhatsApp Alerts</p>
                      <p className="text-[11px] text-gray-500">Discreet courier pin &amp; OTP codes</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={smsOn}
                      onChange={(e) => setSmsOn(e.target.checked)}
                      className="h-4 w-4 text-[#14CDA8] focus:ring-[#14CDA8] border-gray-300 rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="pr-2">
                      <p className="font-bold text-gray-800 text-xs">Private Drops &amp; Curations</p>
                      <p className="text-[11px] text-gray-500">VIP runway releases and vault sales</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={dropsOn}
                      onChange={(e) => setDropsOn(e.target.checked)}
                      className="h-4 w-4 text-[#14CDA8] focus:ring-[#14CDA8] border-gray-300 rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="pr-2">
                      <p className="font-bold text-gray-800 text-xs">Account &amp; Security Alerts</p>
                      <p className="text-[11px] text-gray-500">Login notices, password updates</p>
                    </div>
                    <input
                      type="checkbox"
                      checked
                      disabled
                      className="h-4 w-4 text-gray-400 border-gray-300 rounded cursor-not-allowed opacity-60"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => alert('Channel preferences saved.')}
                    className="w-full text-center text-xs font-bold text-gray-800 hover:text-black py-1.5 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors"
                  >
                    Save Channel Settings
                  </button>
                </div>
              </div>

              {/* Discreet Delivery Guarantee */}
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#14CDA8]/10 text-[#14CDA8] flex items-center justify-center font-bold text-xs">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </span>
                  <p className="font-bold text-gray-900">Discreet Delivery Guarantee</p>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  SMS and shipping notifications will never display product descriptions or intimate apparel tags on shipping notes.
                </p>
              </div>

              {/* Need Assistance */}
              <div className="bg-white rounded-xl p-4 border border-gray-200/80 text-center space-y-2">
                <p className="text-xs font-semibold text-gray-700">Need assistance with notifications?</p>
                <p className="text-[11px] text-gray-500">Contact our 24/7 dedicated concierge desk anytime.</p>
                <Link href="/help" className="inline-block text-xs font-bold text-[#FF3F6C] hover:underline">
                  Visit Help Center →
                </Link>
              </div>

            </div>

          </div>

        </div>
      </main>

      <StorefrontFooter />
    </div>
  );
}
