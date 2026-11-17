'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Check,
  Truck,
  FileText,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Package,
  Calendar,
  MessageSquare,
  HelpCircle,
  Download,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Clock,
  Sparkles,
  MapPin,
  X,
} from 'lucide-react';
import { StorefrontHeader } from '@/components/layout/StorefrontHeader';
import { StorefrontFooter } from '@/components/layout/StorefrontFooter';

export default function OrderConfirmationPage() {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showTrackModal, setShowTrackModal] = useState(false);
  const [invoiceDownloaded, setInvoiceDownloaded] = useState(false);

  const handleDownloadInvoice = () => {
    setInvoiceDownloaded(true);
    setTimeout(() => setInvoiceDownloaded(false), 3000);
  };

  return (
    <div className="text-gray-800 font-sans antialiased min-h-screen flex flex-col bg-white">
      <StorefrontHeader />

      {/* CHECKOUT STEPPER (Step 4 / All Confirmed) */}
      <section className="border-b border-gray-200 py-3.5 bg-white">
        <div className="max-w-xl mx-auto flex items-center justify-between text-xs tracking-wide px-4">
          <Link href="/cart" className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors">
            <span className="w-4 h-4 rounded-full bg-[#14CDA8] text-white flex items-center justify-center text-[10px] font-bold">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
            <span className="font-medium text-gray-700">Cart</span>
          </Link>

          <div className="flex-1 h-[2px] bg-[#14CDA8] mx-3" />

          <Link href="/checkout/address" className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors">
            <span className="w-4 h-4 rounded-full bg-[#14CDA8] text-white flex items-center justify-center text-[10px] font-bold">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
            <span className="font-medium text-gray-700">Address</span>
          </Link>

          <div className="flex-1 h-[2px] bg-[#14CDA8] mx-3" />

          <Link href="/checkout/payment" className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors">
            <span className="w-4 h-4 rounded-full bg-[#14CDA8] text-white flex items-center justify-center text-[10px] font-bold">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
            <span className="font-medium text-gray-700">Payment</span>
          </Link>

          <div className="flex-1 h-[2px] bg-[#14CDA8] mx-3" />

          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-[#14CDA8] text-white flex items-center justify-center text-[10px] font-bold">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
            <span className="font-bold text-[#14CDA8] tracking-tight">Order Confirmed</span>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        <div className="space-y-8">
          
          {/* HERO ORDER SUCCESS CELEBRATION CARD */}
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-sm text-center relative overflow-hidden">
            <div className="flex flex-col items-center justify-center max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-[#14CDA8]/10 text-[#14CDA8] flex items-center justify-center mb-4 ring-8 ring-[#14CDA8]/10 animate-bounce">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div className="inline-flex items-center gap-2 bg-[#14CDA8]/10 text-[#14CDA8] text-xs font-bold px-3 py-1 rounded-full mb-2">
                <span className="w-2 h-2 rounded-full bg-[#14CDA8]" />
                <span>Order Placed Successfully</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                Thank You For Your Order!
              </h1>

              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                Order <span className="font-bold text-gray-900">#LG-94218</span> has been confirmed. Confirmation details sent to{' '}
                <span className="font-medium text-gray-800">dipanshu@example.com</span> &amp;{' '}
                <span className="font-medium text-gray-800">+91 98765 43210</span>.
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs">
                <span className="bg-red-50 text-[#FF3F6C] font-semibold px-3 py-1 rounded-full border border-[#FF3F6C]/20">
                  Express Delivery: Tomorrow by 5:00 PM
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600 font-medium">Courier Assigned: BlueDart Air</span>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowTrackModal(true)}
                  className="bg-[#FF3F6C] hover:opacity-90 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm transition-opacity flex items-center gap-1.5"
                >
                  <Truck className="w-4 h-4 stroke-[1.8]" />
                  <span>Track Order</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowInvoiceModal(true)}
                  className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-bold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-4 h-4 text-gray-500 stroke-[1.8]" />
                  <span>Download Invoice</span>
                </button>

                <Link
                  href="/"
                  className="text-xs font-bold text-[#FF3F6C] hover:underline px-3 py-2.5 transition-colors"
                >
                  Continue Shopping →
                </Link>
              </div>
            </div>
          </div>

          {/* TWO-COLUMN DETAILS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Tracking, Address & Shipment Items (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Order Tracking Status Card */}
              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wide">Order Tracking Status</h2>
                    <span className="text-[10px] font-semibold text-[#14CDA8] bg-[#14CDA8]/10 px-2 py-0.5 rounded-full">
                      On Schedule
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium">AWB: BD-84920188</span>
                </div>

                <div className="grid grid-cols-4 gap-2 pt-2 text-center relative">
                  {/* Step 1: Confirmed */}
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-[#14CDA8] text-white flex items-center justify-center text-xs font-bold ring-4 ring-[#14CDA8]/20">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <p className="text-xs font-bold text-gray-900 mt-2">Confirmed</p>
                    <span className="text-[10px] text-gray-400">Today, 11:42 AM</span>
                  </div>

                  {/* Step 2: Processing */}
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-[#14CDA8] text-white flex items-center justify-center text-xs font-bold ring-4 ring-[#14CDA8]/20 animate-spin">
                      <RefreshCw className="w-3.5 h-3.5 stroke-[2]" />
                    </div>
                    <p className="text-xs font-bold text-gray-900 mt-2">Processing</p>
                    <span className="text-[10px] text-[#14CDA8] font-medium">Packing at Hub</span>
                  </div>

                  {/* Step 3: Shipped */}
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-gray-100 border border-gray-300 text-gray-400 flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <p className="text-xs font-semibold text-gray-500 mt-2">Shipped</p>
                    <span className="text-[10px] text-gray-400">Expected 6 PM</span>
                  </div>

                  {/* Step 4: Delivered */}
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-gray-100 border border-gray-300 text-gray-400 flex items-center justify-center text-xs font-bold">
                      4
                    </div>
                    <p className="text-xs font-semibold text-gray-500 mt-2">Delivered</p>
                    <span className="text-[10px] text-gray-400">Tomorrow, 5 PM</span>
                  </div>
                </div>
              </div>

              {/* Delivery Address Card */}
              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide">Delivery Address</h3>
                  <span className="text-[10px] font-bold text-[#14CDA8] bg-[#14CDA8]/10 px-2 py-0.5 rounded uppercase">
                    Home Delivery
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#14CDA8]/10 text-[#14CDA8] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 stroke-[2]" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-gray-900">Dipanshu</p>
                    <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                      45, Green Valley Apartments, Delhi, New Delhi, India - 110001
                    </p>
                    <p className="text-[11px] text-gray-500 mt-1">
                      Phone: +91 98765 43210 • Contactless Delivery Preferred
                    </p>
                  </div>
                </div>
              </div>

              {/* Items in this Shipment Card */}
              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm space-y-3.5">
                <div className="flex items-center justify-between pb-2.5 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                      Items in this Shipment (2)
                    </h3>
                    <span className="text-[10px] font-semibold text-[#14CDA8] bg-[#14CDA8]/10 px-2 py-0.5 rounded-full">
                      Ready for Courier
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium">Package 1 of 1</span>
                </div>

                <div className="space-y-3">
                  {/* Item 1 */}
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/70 border border-gray-100">
                    <img
                      alt="Anime tee thumbnail"
                      className="w-14 h-16 rounded object-cover flex-shrink-0 border border-gray-200"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAK4JLcqAN1iFWdqXVcfpGuCvOL7yfEi3fef9UOje41J1tcOBxyyfR1TvCFL5YvdBZfSRBAC4RUAzL9b7iwgXJFhNEGrtHQvrKm94h7T3yKYOFl3dRGeJZX3RjVO76VgxDSWMpwbgCRI0-4wF2_78qXm9EZjYcJMrT9m7XkQgNyYPYaVo-5yIFZEJdo2ippjlL-e01j_F-ykZxV98srd_QjiV3Mx8ajv4HZhTYbAQ"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-gray-900 truncate">Premium Jean's for men</h4>
                      <p className="text-[10px] text-gray-500">Size: L | Qty: 1 | Color: Indigo Wash</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-xs font-bold text-gray-900">$4.55</span>
                        <span className="line-through text-gray-400 text-[10px]">$7.40</span>
                        <span className="text-[#14CDA8] text-[10px] font-semibold">(68% OFF)</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                      Confirmed
                    </span>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/70 border border-gray-100">
                    <img
                      alt="Tracksuit thumbnail"
                      className="w-14 h-16 rounded object-cover flex-shrink-0 border border-gray-200"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuARaWfdzkGpD5O9QnNxeDJTO0_YWAfosv5m6pEvmhS0Fk9SVhSjCLtUvF0YAekdEbxujUF1JZ-DySe4AiYLdgmEUR1fgoyNoY2FvRoyCeeZztsnjOo8uuywVKy-Bi9pH__SiKHTu9YZS-q4WvP0g6xlBCdfXTUtMyGmzxiRdAGBAUiaYSkmoYKycW7b5XLIt18zC9d5UgQjDYTAtFesbRyilKpJFTt7fxarWREPHg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-gray-900 truncate">Streetwear Tracksuit Set</h4>
                      <p className="text-[10px] text-gray-500">Size: M | Qty: 1 | Color: Ash Black</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-xs font-bold text-gray-900">$4.55</span>
                        <span className="line-through text-gray-400 text-[10px]">$9.30</span>
                        <span className="text-[#14CDA8] text-[10px] font-semibold">(68% OFF)</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                      Confirmed
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Payment Info, Price Summary & Concierge (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Payment Information Card */}
              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide">Payment Information</h3>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3 stroke-[3]" />
                    Paid
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Payment Method</span>
                    <span className="font-bold text-gray-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      USDT (TRC20 Web3 Wallet)
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Transaction ID</span>
                    <span className="font-mono text-gray-700 text-[11px]">0x8f2a...c94e</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Logo Cash Reward</span>
                    <span className="text-[#14CDA8] font-bold">+$0.46 Credited</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Security</span>
                    <span className="text-[11px] text-gray-500">256-bit Encrypted Checkout</span>
                  </div>
                </div>
              </div>

              {/* Final Price Summary Card */}
              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide">Final Price Summary</h3>
                  <span className="text-[10px] font-semibold text-[#14CDA8] bg-[#14CDA8]/10 px-2 py-0.5 rounded-full">
                    Saved $7.50
                  </span>
                </div>

                <div className="space-y-2.5 text-xs pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total MRP (2 items)</span>
                    <span className="font-medium text-gray-900">$16.70</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Product Discount</span>
                    <div className="space-x-1">
                      <span className="text-[#14CDA8] font-bold">-$7.60</span>
                      <span className="text-[#14CDA8] text-[10px]">(45% OFF)</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Coupon Discount (SUMMER25)</span>
                    <span className="text-[#FF3F6C] font-bold">-$2.50</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Logo Cash Store Credit</span>
                    <span className="text-[#FF3F6C] font-bold">-$9.10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Platform Fee</span>
                    <span className="font-medium text-gray-900">$0.10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Delivery Fee</span>
                    <div className="space-x-1.5 items-center flex">
                      <span className="line-through text-gray-400 text-[11px]">$0.89</span>
                      <span className="text-[#FF3F6C] font-bold text-[11px] uppercase">Free</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900">Total Amount Paid</span>
                      <span className="text-[10px] text-gray-500">Includes all applicable taxes</span>
                    </div>
                    <div className="space-x-1.5 flex items-center">
                      <span className="text-base font-bold text-gray-900">$9.10</span>
                      <span className="text-[#14CDA8] font-semibold text-xs bg-[#14CDA8]/10 px-1.5 py-0.5 rounded">
                        (48% OFF)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Need Help Concierge Card */}
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm space-y-2.5">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#FF3F6C]" />
                  <span className="text-xs font-bold text-gray-900">Need Help With This Order?</span>
                </div>
                <p className="text-[11px] text-gray-500">
                  Our concierge support is available 24/7. You can easily modify, return, or request exchanges within 14 days of delivery.
                </p>
                <div className="flex items-center gap-3 pt-1 text-xs">
                  <button
                    type="button"
                    onClick={() => alert('Connecting to 24/7 Live Support Concierge...')}
                    className="text-xs font-bold text-[#FF3F6C] hover:underline"
                  >
                    Chat With Support
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    type="button"
                    onClick={() => alert('Standard 14-day hassle-free return and doorstep pickup available.')}
                    className="text-xs font-semibold text-gray-600 hover:text-gray-900"
                  >
                    Return Policy
                  </button>
                </div>
              </div>

              {/* Trust Guarantee Badge */}
              <div className="flex items-center justify-center gap-1.5 text-gray-400 text-[11px] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
                <span>Protected by 100% Purchase Guarantee</span>
              </div>

            </div>

          </div>

          {/* BOTTOM RECOMMENDATIONS SECTION ("You May Also Like") */}
          <section className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm mt-8">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-gray-900">You May Also Like</h3>
                <span className="text-[10px] font-semibold text-[#14CDA8] bg-[#14CDA8]/10 px-2 py-0.5 rounded-full">
                  Exclusive Recommendations
                </span>
              </div>
              <Link href="/catalog" className="text-xs font-bold text-[#FF3F6C] hover:underline">
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              {/* Product 1 */}
              <Link href="/product/p1" className="group cursor-pointer">
                <div className="rounded-lg overflow-hidden bg-gray-50 border border-gray-200 aspect-square">
                  <img
                    alt="Classic Denim Overshirt"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAK4JLcqAN1iFWdqXVcfpGuCvOL7yfEi3fef9UOje41J1tcOBxyyfR1TvCFL5YvdBZfSRBAC4RUAzL9b7iwgXJFhNEGrtHQvrKm94h7T3yKYOFl3dRGeJZX3RjVO76VgxDSWMpwbgCRI0-4wF2_78qXm9EZjYcJMrT9m7XkQgNyYPYaVo-5yIFZEJdo2ippjlL-e01j_F-ykZxV98srd_QjiV3Mx8ajv4HZhTYbAQ"
                  />
                </div>
                <h4 className="text-xs font-bold text-gray-900 mt-2 truncate">Classic Denim Overshirt</h4>
                <p className="text-[10px] text-gray-500">Men's Outerwear</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs font-bold text-gray-900">$8.20</span>
                  <span className="line-through text-gray-400 text-[10px]">$14.00</span>
                  <span className="text-[#14CDA8] text-[10px] font-semibold">41% OFF</span>
                </div>
              </Link>

              {/* Product 2 */}
              <Link href="/product/p2" className="group cursor-pointer">
                <div className="rounded-lg overflow-hidden bg-gray-50 border border-gray-200 aspect-square">
                  <img
                    alt="Urban Cargo Sweatpants"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuARaWfdzkGpD5O9QnNxeDJTO0_YWAfosv5m6pEvmhS0Fk9SVhSjCLtUvF0YAekdEbxujUF1JZ-DySe4AiYLdgmEUR1fgoyNoY2FvRoyCeeZztsnjOo8uuywVKy-Bi9pH__SiKHTu9YZS-q4WvP0g6xlBCdfXTUtMyGmzxiRdAGBAUiaYSkmoYKycW7b5XLIt18zC9d5UgQjDYTAtFesbRyilKpJFTt7fxarWREPHg"
                  />
                </div>
                <h4 className="text-xs font-bold text-gray-900 mt-2 truncate">Urban Cargo Sweatpants</h4>
                <p className="text-[10px] text-gray-500">Streetwear Collection</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs font-bold text-gray-900">$5.90</span>
                  <span className="line-through text-gray-400 text-[10px]">$11.50</span>
                  <span className="text-[#14CDA8] text-[10px] font-semibold">48% OFF</span>
                </div>
              </Link>

              {/* Product 3 */}
              <Link href="/product/p3" className="group cursor-pointer">
                <div className="rounded-lg overflow-hidden bg-gray-50 border border-gray-200 aspect-square">
                  <img
                    alt="Vintage Graphic Tee"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAK4JLcqAN1iFWdqXVcfpGuCvOL7yfEi3fef9UOje41J1tcOBxyyfR1TvCFL5YvdBZfSRBAC4RUAzL9b7iwgXJFhNEGrtHQvrKm94h7T3yKYOFl3dRGeJZX3RjVO76VgxDSWMpwbgCRI0-4wF2_78qXm9EZjYcJMrT9m7XkQgNyYPYaVo-5yIFZEJdo2ippjlL-e01j_F-ykZxV98srd_QjiV3Mx8ajv4HZhTYbAQ"
                  />
                </div>
                <h4 className="text-xs font-bold text-gray-900 mt-2 truncate">Vintage Graphic Cotton Tee</h4>
                <p className="text-[10px] text-gray-500">Essential Fit</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs font-bold text-gray-900">$3.40</span>
                  <span className="line-through text-gray-400 text-[10px]">$6.00</span>
                  <span className="text-[#14CDA8] text-[10px] font-semibold">43% OFF</span>
                </div>
              </Link>

              {/* Product 4 */}
              <Link href="/product/p4" className="group cursor-pointer">
                <div className="rounded-lg overflow-hidden bg-gray-50 border border-gray-200 aspect-square">
                  <img
                    alt="Minimalist Hoodie"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuARaWfdzkGpD5O9QnNxeDJTO0_YWAfosv5m6pEvmhS0Fk9SVhSjCLtUvF0YAekdEbxujUF1JZ-DySe4AiYLdgmEUR1fgoyNoY2FvRoyCeeZztsnjOo8uuywVKy-Bi9pH__SiKHTu9YZS-q4WvP0g6xlBCdfXTUtMyGmzxiRdAGBAUiaYSkmoYKycW7b5XLIt18zC9d5UgQjDYTAtFesbRyilKpJFTt7fxarWREPHg"
                  />
                </div>
                <h4 className="text-xs font-bold text-gray-900 mt-2 truncate">Minimalist Fleece Hoodie</h4>
                <p className="text-[10px] text-gray-500">Unisex Casual</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs font-bold text-gray-900">$7.80</span>
                  <span className="line-through text-gray-400 text-[10px]">$13.90</span>
                  <span className="text-[#14CDA8] text-[10px] font-semibold">44% OFF</span>
                </div>
              </Link>
            </div>
          </section>

        </div>
      </main>

      {/* TRACK ORDER MODAL */}
      {showTrackModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowTrackModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-50 text-[#FF3F6C] flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Live Delivery Tracking</h3>
                <p className="text-xs text-gray-500">BlueDart Air Tracking #BD-84920188</p>
              </div>
            </div>
            <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50 space-y-3 text-xs mb-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Estimated Delivery:</span>
                <span className="font-bold text-emerald-600">Tomorrow by 5:00 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Current Location:</span>
                <span className="font-semibold text-gray-800">Regional Sort Facility, New Delhi</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Delivery Boy Assigned:</span>
                <span className="font-semibold text-gray-800">Rajesh K. (+91 99887 76655)</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowTrackModal(false)}
              className="w-full bg-[#FF3F6C] text-white py-2.5 rounded-lg text-xs font-bold hover:opacity-95"
            >
              Close Tracking Window
            </button>
          </div>
        </div>
      )}

      {/* INVOICE MODAL */}
      {showInvoiceModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowInvoiceModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#14CDA8] flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Official Tax Invoice</h3>
                <p className="text-xs text-gray-500">Invoice ID: INV-2025-94218</p>
              </div>
            </div>
            <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50 space-y-2 text-xs mb-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Billed To:</span>
                <span className="font-bold text-gray-900">Dipanshu</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total Items:</span>
                <span className="font-semibold text-gray-800">2 Items</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Net Amount Paid:</span>
                <span className="font-bold text-[#FF3F6C]">$9.10 USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status:</span>
                <span className="font-semibold text-emerald-600">PAID &amp; VERIFIED</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleDownloadInvoice}
                className="flex-1 bg-[#14CDA8] text-white py-2.5 rounded-lg text-xs font-bold hover:opacity-90 flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{invoiceDownloaded ? 'Downloaded (PDF)' : 'Download PDF'}</span>
              </button>
              <button
                type="button"
                onClick={() => setShowInvoiceModal(false)}
                className="px-4 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <StorefrontFooter />
    </div>
  );
}
