'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ShieldCheck, HelpCircle, ArrowLeft, Mail } from 'lucide-react';

const faqs = [
  {
    q: 'How discreet is the packaging and delivery?',
    a: 'Every single order is dispatched in 100% blind-box plain, unmarked cardboard packaging with zero branding, logos, or product descriptions on the box or shipping label.',
  },
  {
    q: 'What cryptocurrencies do you accept?',
    a: 'We accept USDT and USDC across multiple high-speed blockchains including TRC-20, ERC-20, Solana, Polygon, Arbitrum One, and more.',
  },
  {
    q: 'What is your return and exchange policy?',
    a: 'Due to the intimate and hygienic nature of certain wellness products, opened intimate items cannot be returned. Sealed fashion and accessories can be returned within 15 days of delivery.',
  },
  {
    q: 'How do I track my active order?',
    a: 'You can track real-time delivery status under My Orders in your Account dashboard or via the carrier tracking link provided upon dispatch.',
  },
];

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white text-slate-800 py-10 px-4 sm:px-6 lg:px-[15%]">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-black mb-4 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Everything you need to know about anonymous checkout, delivery, and privacy guarantees.
          </p>
        </div>

        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-4">
              <button
                type="button"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left gap-4 font-bold text-sm text-slate-900 hover:text-[#01AFB5] transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                    openIdx === idx ? 'rotate-180 text-[#01AFB5]' : ''
                  }`}
                />
              </button>
              {openIdx === idx && (
                <p className="text-xs text-slate-600 leading-relaxed mt-2.5 pr-4 animate-in fade-in duration-200">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="pt-4 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#01AFB5]" />
            <span>256-bit encrypted • Anonymous checkout</span>
          </div>
          <Link href="/contact" className="font-semibold text-[#01AFB5] hover:underline">
            Contact Support &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
