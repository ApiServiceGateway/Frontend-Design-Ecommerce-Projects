'use client';

import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Check, X, Plus, Gift, CreditCard, Sparkles, HelpCircle, ExternalLink } from 'lucide-react';

interface TransactionItem {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: 'credit' | 'debit';
  ref: string;
}

export const AccountGiftCards: React.FC = () => {
  const [balance, setBalance] = useState<number>(1250.0);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [showGiftCardModal, setShowGiftCardModal] = useState(false);
  const [showTransactionLog, setShowTransactionLog] = useState(false);
  const [showCreditDetails, setShowCreditDetails] = useState(false);

  // Top Up Form State
  const [topUpAmount, setTopUpAmount] = useState('500');

  // Gift Card Form State
  const [gcNumber, setGcNumber] = useState('');
  const [gcPin, setGcPin] = useState('');

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [transactions, setTransactions] = useState<TransactionItem[]>([
    {
      id: 'tx-1',
      title: 'Cashback Earned on Order #MN-893021 (Silk Blend Shirt)',
      amount: 150.0,
      date: '10 Nov 2026, 04:30 PM',
      type: 'credit',
      ref: 'Product Purchase Cashback',
    },
    {
      id: 'tx-2',
      title: 'Added via Gift Card (•••• •••• •••• 4892)',
      amount: 500.0,
      date: '05 Nov 2026, 02:15 PM',
      type: 'credit',
      ref: 'Gift Card Conversion',
    },
    {
      id: 'tx-3',
      title: 'Cashback Earned on Order #MN-774019 (Wool Trousers)',
      amount: 200.0,
      date: '28 Oct 2026, 11:45 AM',
      type: 'credit',
      ref: 'Product Purchase Cashback',
    },
    {
      id: 'tx-4',
      title: 'Redeemed on Order #MN-661204 at Checkout',
      amount: -350.0,
      date: '12 Oct 2026, 07:10 PM',
      type: 'debit',
      ref: 'Checkout Discount',
    },
  ]);

  const handleTopUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(topUpAmount);
    if (isNaN(val) || val <= 0) return;
    setBalance((prev) => prev + val);
    const newTx: TransactionItem = {
      id: `tx-${Date.now()}`,
      title: `Top-up via UPI / Net-banking`,
      amount: val,
      date: 'Today, Just now',
      type: 'credit',
      ref: 'Instant Top Up',
    };
    setTransactions([newTx, ...transactions]);
    setShowTopUpModal(false);
    setToastMsg(`₹${val.toFixed(2)} topped up to your Logo Credit successfully!`);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const handleAddGiftCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gcNumber.trim() || !gcPin.trim()) {
      alert('Please enter Gift Card Number and 6-digit PIN.');
      return;
    }
    const val = 500.0;
    setBalance((prev) => prev + val);
    const newTx: TransactionItem = {
      id: `tx-${Date.now()}`,
      title: `Added via Gift Card (•••• •••• •••• ${gcNumber.slice(-4) || '8812'})`,
      amount: val,
      date: 'Today, Just now',
      type: 'credit',
      ref: 'Gift Card Conversion',
    };
    setTransactions([newTx, ...transactions]);
    setGcNumber('');
    setGcPin('');
    setShowGiftCardModal(false);
    setToastMsg(`Gift card converted! ₹${val.toFixed(2)} added to your Logo Credit.`);
    setTimeout(() => setToastMsg(null), 4000);
  };

  return (
    <div className="space-y-4 max-w-4xl" data-purpose="account-logo-credit">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200/80 rounded-lg text-emerald-800 text-xs font-semibold flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{toastMsg}</span>
          </div>
          <button
            type="button"
            onClick={() => setToastMsg(null)}
            className="text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* 1. Main Top Card (Exact Layout from Uploaded Myntra Credit Image) */}
      <div className="bg-white border border-slate-200/90 rounded-none shadow-2xs py-8 px-6 text-center">
        <h2 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-800">
          TOP-UP YOUR LOGO CREDIT NOW!
        </h2>

        <div className="text-4xl sm:text-5xl font-bold text-slate-800 my-5 font-sans">
          ₹{balance.toFixed(2)}
        </div>

        <div className="h-px bg-slate-200/80 max-w-2xl mx-auto my-6"></div>

        <div className="grid grid-cols-2 divide-x divide-slate-200 max-w-xl mx-auto">
          {/* Left Column: TOP UP */}
          <div className="px-4 text-center">
            <span className="text-xs text-slate-400 block mb-1">For a quick checkout</span>
            <button
              type="button"
              onClick={() => setShowTopUpModal(true)}
              className="text-xs sm:text-sm font-bold text-[#01AFB5] hover:underline uppercase tracking-wider cursor-pointer"
            >
              TOP UP
            </button>
          </div>

          {/* Right Column: ADD GIFT CARD */}
          <div className="px-4 text-center">
            <span className="text-xs text-slate-400 block mb-1">Have a gift card?</span>
            <button
              type="button"
              onClick={() => setShowGiftCardModal(true)}
              className="text-xs sm:text-sm font-bold text-[#01AFB5] hover:underline uppercase tracking-wider cursor-pointer"
            >
              ADD GIFT CARD
            </button>
          </div>
        </div>
      </div>

      {/* 2. TRANSACTION LOG Bar */}
      <div className="bg-white border border-slate-200/90 rounded-none shadow-2xs">
        <button
          type="button"
          onClick={() => setShowTransactionLog(!showTransactionLog)}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition cursor-pointer"
        >
          <span className="text-xs font-bold text-slate-800 tracking-wider uppercase">
            TRANSACTION LOG
          </span>
          {showTransactionLog ? (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {showTransactionLog && (
          <div className="border-t border-slate-200/80 p-4 space-y-3 bg-slate-50/50">
            {transactions.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No transactions found.</p>
            ) : (
              transactions.map((tx) => (
                <div key={tx.id} className="p-3 bg-white border border-slate-200/70 rounded-lg flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-slate-800 block">{tx.title}</span>
                    <span className="text-[11px] text-slate-400 block">{tx.date} • {tx.ref}</span>
                  </div>
                  <strong className={`font-mono text-sm ${tx.amount > 0 ? 'text-emerald-600' : 'text-slate-800'}`}>
                    {tx.amount > 0 ? `+₹${tx.amount.toFixed(2)}` : `-₹${Math.abs(tx.amount).toFixed(2)}`}
                  </strong>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* 3. CREDIT DETAILS Bar */}
      <div className="bg-white border border-slate-200/90 rounded-none shadow-2xs">
        <button
          type="button"
          onClick={() => setShowCreditDetails(!showCreditDetails)}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition cursor-pointer"
        >
          <span className="text-xs font-bold text-slate-800 tracking-wider uppercase">
            CREDIT DETAILS
          </span>
          {showCreditDetails ? (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {showCreditDetails && (
          <div className="border-t border-slate-200/80 p-5 space-y-3 bg-slate-50/50 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 bg-white border border-slate-200 rounded-lg space-y-1">
                <span className="text-[11px] text-slate-400 block uppercase font-medium">Purchases Cashback</span>
                <strong className="text-sm font-bold text-slate-900 block font-mono">₹750.00</strong>
                <span className="text-[10px] text-emerald-600 font-medium">Earned on product deliveries</span>
              </div>
              <div className="p-3.5 bg-white border border-slate-200 rounded-lg space-y-1">
                <span className="text-[11px] text-slate-400 block uppercase font-medium">Gift Card Balance</span>
                <strong className="text-sm font-bold text-slate-900 block font-mono">₹500.00</strong>
                <span className="text-[10px] text-blue-600 font-medium">Merged from gift vouchers</span>
              </div>
              <div className="p-3.5 bg-white border border-slate-200 rounded-lg space-y-1">
                <span className="text-[11px] text-slate-400 block uppercase font-medium">Promotional Credits</span>
                <strong className="text-sm font-bold text-slate-900 block font-mono">₹0.00</strong>
                <span className="text-[10px] text-slate-400 font-medium">Campaign rewards</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              Guaranteed cashback credits are credited immediately once order delivery is confirmed. Credits can be used 100% on any item.
            </p>
          </div>
        )}
      </div>

      {/* 4. PLEASE NOTE Card (Exact Text & Links from Image) */}
      <div className="bg-white border border-slate-200/90 rounded-none shadow-2xs p-6 space-y-4">
        <h3 className="text-xs font-bold text-slate-900 tracking-wider uppercase">
          PLEASE NOTE
        </h3>

        <ul className="space-y-2 text-xs text-slate-600 leading-relaxed list-disc pl-4">
          <li>Logo Credit can&apos;t be cancelled or transferred to another account.</li>
          <li>It can&apos;t be withdrawn in the form of cash or transferred to any bank account.</li>
          <li>It can&apos;t be used to purchase Gift Cards.</li>
          <li>Net-banking, UPI, and credit/debit cards issued in India can be used for Logo Credit top up.</li>
          <li>Guaranteed credit cashback earned on product purchases gets credited directly upon delivery.</li>
          <li>Credits have lifetime validity for verified accounts. Check FAQs for more details.</li>
        </ul>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4 text-xs font-bold text-[#01AFB5]">
          <button
            type="button"
            onClick={() => alert('Logo Credit Terms: Non-transferable, redeemable 100% at checkout.')}
            className="hover:underline tracking-wide uppercase cursor-pointer"
          >
            LOGO CREDIT T&amp;C &gt;
          </button>
          <button
            type="button"
            onClick={() => alert('Gift Card Terms: Converted credits merge into Logo Credit balance.')}
            className="hover:underline tracking-wide uppercase cursor-pointer"
          >
            GIFT CARD T&amp;C &gt;
          </button>
          <button
            type="button"
            onClick={() => alert('Logo Credit FAQs: Instant checkout deductions, 1 Credit = ₹1.00.')}
            className="hover:underline tracking-wide uppercase cursor-pointer"
          >
            FAQS &gt;
          </button>
        </div>
      </div>

      {/* TOP UP MODAL */}
      {showTopUpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Top Up Logo Credit
              </h3>
              <button
                type="button"
                onClick={() => setShowTopUpModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleTopUpSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">Enter Amount (₹)</label>
                <input
                  type="number"
                  min="100"
                  step="50"
                  required
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  className="w-full h-11 px-3.5 text-base font-bold font-mono bg-slate-50 focus:bg-white rounded-lg border border-slate-200 focus:ring-1 focus:ring-[#01AFB5] outline-none"
                />
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex items-center gap-2">
                {['500', '1000', '2000', '5000'].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setTopUpAmount(amt)}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition cursor-pointer ${
                      topUpAmount === amt
                        ? 'border-[#01AFB5] bg-[#01AFB5]/10 text-[#01AFB5]'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    +₹{amt}
                  </button>
                ))}
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 text-[11px] text-slate-500 leading-relaxed">
                Pay via UPI, Debit Card, Credit Card, or Net-Banking. Balance will be updated instantly.
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowTopUpModal(false)}
                  className="px-4 py-2 border border-slate-200 text-xs font-semibold rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#01AFB5] hover:bg-[#009da2] text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Proceed to Pay ₹{topUpAmount}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD GIFT CARD MODAL */}
      {showGiftCardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Add Gift Card to Balance
              </h3>
              <button
                type="button"
                onClick={() => setShowGiftCardModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddGiftCardSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">16-Digit Gift Card Number</label>
                <input
                  type="text"
                  required
                  maxLength={19}
                  value={gcNumber}
                  onChange={(e) => setGcNumber(e.target.value.toUpperCase())}
                  placeholder="•••• •••• •••• ••••"
                  className="w-full h-10 px-3.5 text-xs font-mono bg-slate-50 focus:bg-white rounded-lg border border-slate-200 focus:ring-1 focus:ring-[#01AFB5] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">6-Digit Card PIN</label>
                <input
                  type="password"
                  required
                  maxLength={6}
                  value={gcPin}
                  onChange={(e) => setGcPin(e.target.value)}
                  placeholder="••••••"
                  className="w-full h-10 px-3.5 text-xs font-mono bg-slate-50 focus:bg-white rounded-lg border border-slate-200 focus:ring-1 focus:ring-[#01AFB5] outline-none text-center"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 text-[11px] text-slate-500 leading-relaxed">
                Once added, the full voucher amount will be credited to your Logo Credit pool immediately.
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowGiftCardModal(false)}
                  className="px-4 py-2 border border-slate-200 text-xs font-semibold rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#01AFB5] hover:bg-[#009da2] text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Add Card to Balance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
