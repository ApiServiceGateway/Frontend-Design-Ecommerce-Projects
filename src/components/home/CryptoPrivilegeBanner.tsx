'use client';

import React, { useState } from 'react';
import { Bolt, Check } from 'lucide-react';

export const CryptoPrivilegeBanner: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('CRYPTOBOUTIQUE');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="home-privilege-banner"
      data-purpose="mini-banner"
      aria-label="Crypto Privilege Discount Banner"
      className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="overflow-hidden bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-white p-6 sm:p-10 rounded-2xl shadow-sm border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <span
            id="home-privilege-badge-tag"
            className="bg-brand-primary text-white text-[10px] uppercase font-extrabold px-3 py-1 rounded-full tracking-wider inline-block shadow-xs"
          >
            Mid-Season Exclusive
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Flash Privilege Sale: Extra 25% Off with Crypto
          </h2>
          <p className="text-xs text-stone-300 max-w-xl">
            Use code{' '}
            <code
              id="home-privilege-code-crypto"
              className="font-mono text-white font-bold bg-white/10 px-2 py-0.5 rounded border border-white/20"
            >
              CRYPTOBOUTIQUE
            </code>{' '}
            at checkout for instant rebate on all verified luxury styles.
          </p>
        </div>

        <div className="shrink-0">
          <button
            id="home-privilege-btn-claim"
            type="button"
            onClick={handleCopyCode}
            className="px-6 py-3 rounded-2xl bg-white text-stone-900 font-bold text-xs uppercase tracking-wider hover:bg-brand-primary hover:text-white transition-all inline-flex items-center gap-1.5 shadow-sm cursor-pointer active:scale-95"
            aria-label="Claim crypto offer coupon code"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Code Copied!</span>
              </>
            ) : (
              <>
                <span>Claim Offer</span>
                <Bolt className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
