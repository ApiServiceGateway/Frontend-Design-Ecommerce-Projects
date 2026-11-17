'use client';

import React from 'react';
import { Package, CreditCard, ShieldCheck, VolumeX } from 'lucide-react';

const TRUST_PILLARS = [
  {
    id: 'packaging',
    icon: Package,
    title: '100% Plain Packaging',
    description:
      'Zero logos, brand names, or product mentions on the external parcel. Delivered in a tamper-evident brown box.',
  },
  {
    id: 'billing',
    icon: CreditCard,
    title: 'Disguised Billing',
    description:
      'Bank and card statements reflect neutral merchant naming: "B-DOT RETAIL / AURA LIFESTYLE". Absolute financial privacy.',
  },
  {
    id: 'warranty',
    icon: ShieldCheck,
    title: '48H Video Warranty',
    description:
      'Complete peace of mind. Simply record an unboxing video upon delivery for instant replacement coverage.',
  },
  {
    id: 'whisper',
    icon: VolumeX,
    title: 'Medical Grade & Quiet',
    description:
      'Certified body-safe materials with precision whisper-quiet motors (<40dB) for calm, discreet enjoyment.',
  },
];

export const DiscreetTrustSection: React.FC = () => {
  return (
    <section
      id="home-trust-section"
      data-purpose="discreet-trust-guarantees"
      className="px-4 sm:px-6 lg:px-8 py-10 bg-white"
      aria-labelledby="home-trust-heading"
    >
      <div className="max-w-[1440px] mx-auto border-t border-stone-200 pt-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-[11px] font-bold text-brand-primary uppercase tracking-widest block mb-1">
            THE AURA DISCRETION COVENANT
          </span>
          <h2
            id="home-trust-heading"
            className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight"
          >
            Intimacy Engineered with Absolute Privacy
          </h2>
          <p className="text-xs text-content-secondary mt-1.5">
            Every step from payment to doorstep handover is shielded by our zero-trace privacy protocol.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                id={`home-trust-card-${pillar.id}`}
                className="bg-stone-50 rounded-2xl p-5 border border-stone-200/80 flex flex-col items-center text-center shadow-xs"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-brand-primary mb-3 shadow-xs">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">{pillar.title}</h3>
                <p className="text-xs text-content-secondary leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
