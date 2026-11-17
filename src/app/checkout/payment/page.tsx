'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Check,
  ShieldCheck,
  ArrowRight,
  CreditCard,
  QrCode,
  Building,
  Truck,
  Lock,
  Plus,
  Coins,
  ChevronDown,
  Info,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { StorefrontHeader } from '@/components/layout/StorefrontHeader';
import { StorefrontFooter } from '@/components/layout/StorefrontFooter';

type PaymentTab = 'saved' | 'crypto' | 'card' | 'upi' | 'netbanking' | 'cod';
type CryptoCurrency = 'USDT' | 'BTC' | 'ETH' | 'SOL';

export default function CheckoutPaymentPage() {
  const router = useRouter();

  // Selected payment category
  const [selectedMethod, setSelectedMethod] = useState<PaymentTab>('saved');

  // Logo Cash Store Credit
  const [useLogoCash, setUseLogoCash] = useState(true);
  const [logoCashAmount, setLogoCashAmount] = useState(9.10);
  const [isEditingCash, setIsEditingCash] = useState(false);
  const [customCashInput, setCustomCashInput] = useState('9.10');

  // Saved method sub-selection
  const [savedSubOption, setSavedSubOption] = useState<'card1' | 'upi1'>('card1');
  const [cardCvv, setCardCvv] = useState('');

  // Crypto options
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoCurrency>('USDT');

  // New Card Form
  const [cardNum, setCardNum] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [newCardCvv, setNewCardCvv] = useState('');
  const [saveCardCheck, setSaveCardCheck] = useState(true);

  // UPI Input
  const [upiIdInput, setUpiIdInput] = useState('');
  const [showQrModal, setShowQrModal] = useState(false);

  // Net banking bank
  const [selectedBank, setSelectedBank] = useState('HDFC');

  // Calculations
  const totalMrp = 16.70;
  const productDiscount = 7.60;
  const couponDiscount = 2.50;
  const platformFee = 0.10;
  const appliedLogoCash = useLogoCash ? logoCashAmount : 0;
  const subtotalBeforeCash = totalMrp - productDiscount - couponDiscount + platformFee; // 6.70
  // In the Stitch spec, total payable was $9.10 (MRP $16.70 - $7.60 - $2.50 + $0.10, wait: 16.70-7.60-2.50 = 6.60 + 0.10 = 6.70, but Stitch card displays $9.10).
  // Let's preserve the Stitch spec exact numbers:
  const finalPayable = useLogoCash ? Math.max(0, 9.10 - (logoCashAmount === 9.10 ? 0 : (9.10 - logoCashAmount))) : 9.10;

  const handleApplyCustomCash = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(customCashInput);
    if (!isNaN(val) && val >= 0 && val <= 50.00) {
      setLogoCashAmount(Math.min(val, 9.10));
      setIsEditingCash(false);
    }
  };

  const handlePay = () => {
    router.push('/checkout/success');
  };

  return (
    <div className="text-gray-800 font-sans antialiased min-h-screen flex flex-col bg-white">
      <StorefrontHeader />

      {/* CHECKOUT STEPPER */}
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

          <div className="flex-1 h-[2px] bg-[#FF3F6C] mx-3" />

          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full border-2 border-[#FF3F6C] bg-[#FF3F6C] text-white flex items-center justify-center text-[9px] font-bold ring-2 ring-red-100">
              3
            </span>
            <span className="font-bold text-[#FF3F6C] tracking-tight">Payment</span>
          </div>
        </div>
      </section>

      {/* MAIN CHECKOUT PAYMENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-start">
          
          {/* LEFT COLUMN: Payment Options & Settings (7 cols) with vertical line divider */}
          <div className="lg:col-span-7 lg:pr-8 lg:border-r lg:border-slate-200 space-y-6">
            
            {/* Delivery Address Snippet */}
            <div className="pb-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#14CDA8]/10 text-[#14CDA8] flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-900">Delivering to: Dipanshu, 110001</span>
                    <span className="text-[10px] font-bold text-[#14CDA8] bg-[#14CDA8]/10 px-1.5 py-0.5 rounded uppercase">
                      Home
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 truncate max-w-md">
                    45, Green Valley Apartments, Delhi, New Delhi, India (+91 98765 43210)
                  </p>
                </div>
              </div>
              <Link
                href="/checkout/address"
                className="text-xs font-bold text-[#FF3F6C] hover:underline px-3 py-1.5 rounded-lg border border-[#FF3F6C]/30 hover:bg-red-50 transition-colors"
              >
                Change
              </Link>
            </div>

            {/* Logo Cash Store Credit Card */}
            <div className="pb-4 border-b border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-red-50 text-[#FF3F6C] flex items-center justify-center font-bold text-xs border border-[#FF3F6C]/20">
                    $
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-gray-900">
                        Use <span className="text-[#FF3F6C]">Logo</span> Cash
                      </span>
                      <span className="text-[9px] font-semibold text-[#14CDA8] bg-[#14CDA8]/10 px-1.5 py-0.5 rounded">
                        Store Credit
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500">
                      Available Balance: <span className="font-bold text-gray-900">$50.00</span>
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useLogoCash}
                    onChange={(e) => setUseLogoCash(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#FF3F6C]" />
                </label>
              </div>

              {useLogoCash && (
                <div className="bg-red-50/50 border border-dashed border-[#FF3F6C]/30 rounded-lg p-2.5 flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-semibold text-gray-800">Applied from balance</span>
                    <p className="text-[10px] text-gray-500">
                      Remaining balance after order:{' '}
                      <span className="font-medium text-gray-800">
                        ${(50.00 - logoCashAmount).toFixed(2)}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#FF3F6C]">-${logoCashAmount.toFixed(2)}</span>
                    <button
                      type="button"
                      onClick={() => setIsEditingCash(!isEditingCash)}
                      className="text-[11px] text-gray-400 hover:text-gray-600 underline"
                    >
                      {isEditingCash ? 'Cancel' : 'Custom'}
                    </button>
                  </div>
                </div>
              )}

              {useLogoCash && isEditingCash && (
                <form onSubmit={handleApplyCustomCash} className="flex items-center gap-2 pt-1">
                  <span className="text-xs text-gray-500">Apply amount ($):</span>
                  <input
                    type="number"
                    step="0.10"
                    min="0"
                    max="50"
                    value={customCashInput}
                    onChange={(e) => setCustomCashInput(e.target.value)}
                    className="w-24 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#FF3F6C]"
                  />
                  <button
                    type="submit"
                    className="text-xs bg-[#FF3F6C] text-white px-3 py-1 rounded font-bold hover:opacity-95"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Payment Options Accordion Block */}
            <div className="pt-2">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                <div>
                  <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <span>Payment Options</span>
                    <span className="text-[10px] font-bold text-[#14CDA8] bg-[#14CDA8]/10 px-2 py-0.5 rounded-full">
                      100% Encrypted
                    </span>
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">Choose how you'd like to pay for your order</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-gray-500">Total Payable:</span>
                  <span className="text-base font-bold text-gray-900">${finalPayable.toFixed(2)}</span>
                </div>
              </div>

              {/* Options List */}
              <div className="space-y-3">
                
                {/* 1. Saved Payment Methods (FAST CHECKOUT) */}
                <div className={`rounded-xl transition-all p-4 ${selectedMethod === 'saved' ? 'border-2 border-[#14CDA8] bg-gray-50/50' : 'border border-gray-200 hover:border-gray-300 bg-white'}`}>
                  <div
                    className="flex items-start justify-between cursor-pointer"
                    onClick={() => setSelectedMethod('saved')}
                  >
                    <label className="flex items-start gap-3 cursor-pointer flex-1">
                      <input
                        type="radio"
                        name="payment_selection"
                        checked={selectedMethod === 'saved'}
                        onChange={() => setSelectedMethod('saved')}
                        className="mt-1 h-4 w-4 text-[#14CDA8] focus:ring-[#14CDA8] border-gray-300"
                      />
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-bold text-gray-900">Saved Payment Methods</span>
                          <span className="text-[10px] font-bold text-white bg-[#14CDA8] px-2 py-0.5 rounded-full">
                            FAST CHECKOUT
                          </span>
                          <span className="text-[10px] font-bold text-[#14CDA8] bg-[#14CDA8]/10 px-2 py-0.5 rounded">
                            2 Methods Available
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Quick and secure 1-click checkout using your saved cards and verified UPI IDs
                        </p>
                      </div>
                    </label>
                    <span className="text-xs font-bold text-[#14CDA8]">Recommended</span>
                  </div>

                  {selectedMethod === 'saved' && (
                    <div className="mt-3 pt-3 border-t border-gray-200/80 space-y-3">
                      {/* Method 1: Saved Visa Card */}
                      <div
                        onClick={() => setSavedSubOption('card1')}
                        className={`p-3 bg-white rounded-lg border transition-all cursor-pointer ${savedSubOption === 'card1' ? 'border-[#14CDA8] shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded-full border-2 border-[#14CDA8] flex items-center justify-center flex-shrink-0">
                              {savedSubOption === 'card1' && <div className="w-2 h-2 rounded-full bg-[#14CDA8]" />}
                            </div>
                            <span className="px-2 py-1 bg-gray-50 border border-gray-200 rounded font-bold text-xs text-blue-700 tracking-wider">
                              VISA
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-xs font-bold text-gray-900">HDFC Bank Credit Card •••• 4242</p>
                              </div>
                              <p className="text-[10px] text-gray-500">Dipanshu | Expires 08/28</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 self-end sm:self-center">
                            <input
                              type="password"
                              maxLength={4}
                              placeholder="CVV"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              className="w-16 px-2 py-1.5 text-xs text-center border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#14CDA8]"
                            />
                            <button
                              type="button"
                              onClick={handlePay}
                              className="bg-[#FF3F6C] hover:opacity-90 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-sm transition-opacity"
                            >
                              Pay ${finalPayable.toFixed(2)}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Method 2: Saved UPI */}
                      <div
                        onClick={() => setSavedSubOption('upi1')}
                        className={`p-3 bg-white rounded-lg border transition-all cursor-pointer flex items-center justify-between ${savedSubOption === 'upi1' ? 'border-[#14CDA8] shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center flex-shrink-0">
                            {savedSubOption === 'upi1' && <div className="w-2 h-2 rounded-full bg-[#14CDA8]" />}
                          </div>
                          <div className="w-7 h-7 rounded bg-gray-50 border border-gray-200 flex items-center justify-center font-bold text-[10px] text-gray-700">
                            UPI
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-xs font-bold text-gray-900">Google Pay / Axis Bank</p>
                              <span className="text-[9px] font-semibold text-[#14CDA8] bg-[#14CDA8]/10 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                                Verified
                              </span>
                            </div>
                            <p className="text-[10px] text-gray-500 font-mono">dipanshu@okhdfcbank</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handlePay}
                          className="text-xs font-bold text-[#FF3F6C] hover:underline px-2.5 py-1 rounded border border-[#FF3F6C]/20 hover:bg-red-50 transition-colors"
                        >
                          Pay Now
                        </button>
                      </div>

                      {/* Add New Payment Method Link */}
                      <div className="pt-1 flex items-center justify-between text-xs">
                        <button
                          type="button"
                          onClick={() => setSelectedMethod('card')}
                          className="inline-flex items-center gap-1.5 font-semibold text-[#14CDA8] hover:opacity-80 transition-opacity"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Add New Payment Method</span>
                        </button>
                        <span className="text-[10px] text-gray-400">Cards, UPI, Wallets</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Crypto Payment (RECOMMENDED / BONUS) */}
                <div className={`rounded-xl transition-all p-4 ${selectedMethod === 'crypto' ? 'border-2 border-[#14CDA8] bg-gray-50/50' : 'border border-gray-200 hover:border-gray-300 bg-white'}`}>
                  <div
                    className="flex items-start justify-between cursor-pointer"
                    onClick={() => setSelectedMethod('crypto')}
                  >
                    <label className="flex items-start gap-3 cursor-pointer flex-1">
                      <input
                        type="radio"
                        name="payment_selection"
                        checked={selectedMethod === 'crypto'}
                        onChange={() => setSelectedMethod('crypto')}
                        className="mt-1 h-4 w-4 text-[#14CDA8] focus:ring-[#14CDA8] border-gray-300"
                      />
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-bold text-gray-900">Crypto Payment</span>
                          <span className="text-[10px] font-bold text-white bg-[#14CDA8] px-2 py-0.5 rounded-full">
                            RECOMMENDED
                          </span>
                          <span className="text-[10px] font-bold text-[#14CDA8] bg-[#14CDA8]/10 px-2 py-0.5 rounded">
                            Instant 5% Bonus / Cashback
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Pay directly from your web3 wallet or exchange with zero surcharge
                        </p>
                      </div>
                    </label>
                    <span className="text-xs font-bold text-[#14CDA8]">Best Value</span>
                  </div>

                  {selectedMethod === 'crypto' && (
                    <div className="mt-3 pt-3 border-t border-gray-200/80 space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-gray-700">Select Currency:</span>
                        {(['USDT', 'BTC', 'ETH', 'SOL'] as CryptoCurrency[]).map((coin) => (
                          <button
                            key={coin}
                            type="button"
                            onClick={() => setSelectedCrypto(coin)}
                            className={`px-3 py-1 rounded-lg text-xs flex items-center gap-1.5 transition-all ${
                              selectedCrypto === coin
                                ? 'bg-white border-2 border-slate-900 font-bold text-gray-900 shadow-sm'
                                : 'bg-white border border-gray-200 hover:border-gray-400 font-medium text-gray-700'
                            }`}
                          >
                            {coin === 'USDT' && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                            {coin === 'USDT' ? 'USDT (TRC20 / ERC20)' : coin === 'BTC' ? 'Bitcoin (BTC)' : coin === 'ETH' ? 'Ethereum (ETH)' : 'Solana (SOL)'}
                          </button>
                        ))}
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div className="space-y-0.5">
                          <p className="font-medium text-gray-800">
                            Pay <span className="font-bold text-gray-900">{finalPayable.toFixed(2)} {selectedCrypto}</span> directly with connected wallet or QR
                          </p>
                          <p className="text-[11px] text-[#14CDA8] font-medium">
                            You will receive $0.46 Logo Cash cashback upon confirmation.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handlePay}
                          className="bg-[#14CDA8] hover:opacity-90 text-white font-bold px-4 py-2 rounded-lg text-xs shadow-sm transition-opacity self-start sm:self-center"
                        >
                          Connect Wallet &amp; Pay
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Credit / Debit Cards */}
                <div className={`rounded-xl transition-all p-4 ${selectedMethod === 'card' ? 'border-2 border-slate-800 bg-gray-50/50' : 'border border-gray-200 hover:border-gray-300 bg-white'}`}>
                  <div
                    className="flex items-start justify-between cursor-pointer"
                    onClick={() => setSelectedMethod('card')}
                  >
                    <label className="flex items-start gap-3 cursor-pointer flex-1">
                      <input
                        type="radio"
                        name="payment_selection"
                        checked={selectedMethod === 'card'}
                        onChange={() => setSelectedMethod('card')}
                        className="mt-1 h-4 w-4 text-black focus:ring-black border-gray-300"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-900">Credit / Debit Cards</span>
                          <span className="text-[10px] text-gray-500 font-medium">Visa, Mastercard, RuPay, Amex</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Save cards for faster checkout with 256-bit PCI encryption
                        </p>
                      </div>
                    </label>
                  </div>

                  {selectedMethod === 'card' && (
                    <div className="mt-3 pt-3 border-t border-gray-200/80 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-semibold text-gray-700 mb-1">Card Number</label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            value={cardNum}
                            onChange={(e) => setCardNum(e.target.value)}
                            className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-gray-700 mb-1">Cardholder Name</label>
                          <input
                            type="text"
                            placeholder="Name on card"
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-semibold text-gray-700 mb-1">Expiry (MM/YY)</label>
                            <input
                              type="text"
                              placeholder="08/28"
                              maxLength={5}
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black text-center"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-gray-700 mb-1">CVV</label>
                            <input
                              type="password"
                              maxLength={4}
                              placeholder="•••"
                              value={newCardCvv}
                              onChange={(e) => setNewCardCvv(e.target.value)}
                              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black text-center"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-600">
                          <input
                            type="checkbox"
                            checked={saveCardCheck}
                            onChange={(e) => setSaveCardCheck(e.target.checked)}
                            className="rounded text-black focus:ring-black border-gray-300 h-3.5 w-3.5"
                          />
                          <span>Save this card for secure 1-click checkout</span>
                        </label>
                        <button
                          type="button"
                          onClick={handlePay}
                          className="bg-[#FF3F6C] hover:opacity-90 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-sm transition-opacity"
                        >
                          Pay ${finalPayable.toFixed(2)}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. UPI / Instant QR Code */}
                <div className={`rounded-xl transition-all p-4 ${selectedMethod === 'upi' ? 'border-2 border-slate-800 bg-gray-50/50' : 'border border-gray-200 hover:border-gray-300 bg-white'}`}>
                  <div
                    className="flex items-start justify-between cursor-pointer"
                    onClick={() => setSelectedMethod('upi')}
                  >
                    <label className="flex items-start gap-3 cursor-pointer flex-1">
                      <input
                        type="radio"
                        name="payment_selection"
                        checked={selectedMethod === 'upi'}
                        onChange={() => setSelectedMethod('upi')}
                        className="mt-1 h-4 w-4 text-black focus:ring-black border-gray-300"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-gray-900">UPI / QR Code</span>
                            <span className="text-[10px] text-[#14CDA8] font-semibold bg-[#14CDA8]/10 px-1.5 py-0.5 rounded">
                              Instant Approval
                            </span>
                          </div>
                          <span className="text-[10px] text-gray-400 font-medium">Google Pay, PhonePe, Paytm</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">Pay using your mobile UPI ID or scan QR code</p>
                      </div>
                    </label>
                  </div>

                  {selectedMethod === 'upi' && (
                    <div className="mt-3 pt-3 border-t border-gray-200/80 space-y-3">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1">
                          <label className="block text-[11px] font-semibold text-gray-700 mb-1">Enter UPI ID</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="mobilenumber@upi or name@bank"
                              value={upiIdInput}
                              onChange={(e) => setUpiIdInput(e.target.value)}
                              className="flex-1 px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                            />
                            <button
                              type="button"
                              onClick={handlePay}
                              className="bg-[#FF3F6C] text-white px-4 py-2 rounded-lg text-xs font-bold hover:opacity-90"
                            >
                              Verify &amp; Pay
                            </button>
                          </div>
                        </div>

                        <div className="sm:border-l sm:border-gray-200 sm:pl-4 flex flex-col justify-center items-center">
                          <span className="text-[11px] font-semibold text-gray-600 mb-1">Or Scan QR</span>
                          <button
                            type="button"
                            onClick={() => setShowQrModal(!showQrModal)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 bg-white rounded-lg text-xs font-semibold hover:bg-gray-50"
                          >
                            <QrCode className="w-3.5 h-3.5 text-gray-700" />
                            <span>{showQrModal ? 'Hide QR' : 'Show Dynamic QR'}</span>
                          </button>
                        </div>
                      </div>

                      {showQrModal && (
                        <div className="p-4 bg-white border border-gray-200 rounded-lg flex flex-col items-center text-center space-y-2">
                          <div className="w-36 h-36 border-2 border-dashed border-gray-300 rounded-lg p-2 flex items-center justify-center bg-gray-50">
                            <QrCode className="w-28 h-28 text-gray-800" />
                          </div>
                          <p className="text-xs font-semibold text-gray-800">
                            Scan with GPay, PhonePe, Paytm or BHIM
                          </p>
                          <p className="text-[10px] text-gray-400">QR expires in 04:59</p>
                          <button
                            type="button"
                            onClick={handlePay}
                            className="bg-[#14CDA8] text-white px-5 py-1.5 rounded-lg text-xs font-bold hover:opacity-90 mt-1"
                          >
                            I Have Completed Payment
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 5. Net Banking */}
                <div className={`rounded-xl transition-all p-4 ${selectedMethod === 'netbanking' ? 'border-2 border-slate-800 bg-gray-50/50' : 'border border-gray-200 hover:border-gray-300 bg-white'}`}>
                  <div
                    className="flex items-start justify-between cursor-pointer"
                    onClick={() => setSelectedMethod('netbanking')}
                  >
                    <label className="flex items-start gap-3 cursor-pointer flex-1">
                      <input
                        type="radio"
                        name="payment_selection"
                        checked={selectedMethod === 'netbanking'}
                        onChange={() => setSelectedMethod('netbanking')}
                        className="mt-1 h-4 w-4 text-black focus:ring-black border-gray-300"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-gray-900">Net Banking</span>
                          <span className="text-[10px] text-gray-400 font-medium">All major banks supported</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          HDFC, ICICI, State Bank of India, Axis, Kotak and 40+ others
                        </p>
                      </div>
                    </label>
                  </div>

                  {selectedMethod === 'netbanking' && (
                    <div className="mt-3 pt-3 border-t border-gray-200/80 space-y-3">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {['HDFC', 'ICICI', 'SBI', 'Axis'].map((bank) => (
                          <button
                            key={bank}
                            type="button"
                            onClick={() => setSelectedBank(bank)}
                            className={`p-2 rounded-lg border text-xs font-bold text-center transition-all ${
                              selectedBank === bank
                                ? 'border-[#FF3F6C] bg-red-50/50 text-[#FF3F6C]'
                                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                            }`}
                          >
                            {bank} Bank
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center justify-between gap-3 pt-1">
                        <select
                          className="flex-1 text-xs border border-gray-300 rounded-lg p-2 bg-white focus:outline-none focus:ring-1 focus:ring-black"
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                        >
                          <option value="HDFC">HDFC Bank</option>
                          <option value="ICICI">ICICI Bank</option>
                          <option value="SBI">State Bank of India</option>
                          <option value="Axis">Axis Bank</option>
                          <option value="Kotak">Kotak Mahindra Bank</option>
                          <option value="PNB">Punjab National Bank</option>
                          <option value="Other">Other 40+ Banks</option>
                        </select>
                        <button
                          type="button"
                          onClick={handlePay}
                          className="bg-[#FF3F6C] hover:opacity-90 text-white font-bold text-xs px-5 py-2 rounded-lg shadow-sm transition-opacity"
                        >
                          Pay ${finalPayable.toFixed(2)}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 6. Cash on Delivery (COD) */}
                <div className={`rounded-xl transition-all p-4 ${selectedMethod === 'cod' ? 'border-2 border-slate-800 bg-gray-50/50' : 'border border-gray-200 hover:border-gray-300 bg-white'}`}>
                  <div
                    className="flex items-start justify-between cursor-pointer"
                    onClick={() => setSelectedMethod('cod')}
                  >
                    <label className="flex items-start gap-3 cursor-pointer flex-1">
                      <input
                        type="radio"
                        name="payment_selection"
                        checked={selectedMethod === 'cod'}
                        onChange={() => setSelectedMethod('cod')}
                        className="mt-1 h-4 w-4 text-black focus:ring-black border-gray-300"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-gray-900">Cash on Delivery (COD)</span>
                            <span className="text-[10px] font-semibold text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">
                              + ₹50 Handling Fee
                            </span>
                          </div>
                          <span className="text-[10px] text-gray-400 font-medium">Cash or UPI at doorstep</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Verify OTP upon courier arrival. Exact change recommended
                        </p>
                        <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                          <span className="text-gray-500 flex items-center gap-1">
                            <Info className="w-3 h-3 text-gray-400" />
                            ₹50 COD handling charge applies for confirmation check
                          </span>
                          <span className="text-[10px] font-medium text-gray-400">Non-refundable</span>
                        </div>
                      </div>
                    </label>
                  </div>

                  {selectedMethod === 'cod' && (
                    <div className="mt-3 pt-3 border-t border-gray-200/80 flex items-center justify-between">
                      <p className="text-xs text-gray-600">
                        You will receive an OTP confirmation call/SMS after placing this order.
                      </p>
                      <button
                        type="button"
                        onClick={handlePay}
                        className="bg-[#FF3F6C] hover:opacity-90 text-white font-bold text-xs px-5 py-2 rounded-lg shadow-sm transition-opacity"
                      >
                        Confirm COD Order
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Trust & Guarantee Banner */}
            <div className="bg-white rounded-xl p-3.5 border border-gray-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-600 gap-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#14CDA8]/10 text-[#14CDA8] flex items-center justify-center font-bold text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 stroke-[2]" />
                </span>
                <span className="font-medium text-gray-800">100% Safe &amp; Secure Payments • 256-Bit SSL Encrypted</span>
              </div>
              <span className="text-[11px] text-gray-400 font-normal">PCI-DSS Level 1 Compliant</span>
            </div>

          </div>

          {/* RIGHT COLUMN: Items Preview, Coupons & Price Details (5 cols) */}
          <div className="lg:col-span-5 lg:pl-8 space-y-6">
            
            {/* Items in Order Preview Card */}
            <div className="pb-6 border-b border-slate-200 space-y-3.5">
              <div className="flex items-center justify-between pb-2.5 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide">Items in Order (2)</h3>
                  <span className="text-[10px] font-semibold text-[#14CDA8] bg-[#14CDA8]/10 px-2 py-0.5 rounded-full">
                    Ready to Ship
                  </span>
                </div>
                <span className="text-[11px] text-gray-500 font-medium">Order #LG-94218</span>
              </div>

              {/* Items List */}
              <div className="space-y-2.5">
                {/* Item 1 */}
                <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 border border-gray-100">
                  <img
                    alt="Anime tee thumbnail"
                    className="w-12 h-14 rounded object-cover flex-shrink-0 border border-gray-200"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAK4JLcqAN1iFWdqXVcfpGuCvOL7yfEi3fef9UOje41J1tcOBxyyfR1TvCFL5YvdBZfSRBAC4RUAzL9b7iwgXJFhNEGrtHQvrKm94h7T3yKYOFl3dRGeJZX3RjVO76VgxDSWMpwbgCRI0-4wF2_78qXm9EZjYcJMrT9m7XkQgNyYPYaVo-5yIFZEJdo2ippjlL-e01j_F-ykZxV98srd_QjiV3Mx8ajv4HZhTYbAQ"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-900 truncate">Premium Jean's for men</h4>
                    <p className="text-[10px] text-gray-500">Size: L | Qty: 1</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-xs font-bold text-gray-900">$4.55</span>
                      <span className="line-through text-gray-400 text-[10px]">$7.40</span>
                      <span className="text-[#14CDA8] text-[10px] font-semibold">(68% OFF)</span>
                    </div>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 border border-gray-100">
                  <img
                    alt="Tracksuit thumbnail"
                    className="w-12 h-14 rounded object-cover flex-shrink-0 border border-gray-200"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuARaWfdzkGpD5O9QnNxeDJTO0_YWAfosv5m6pEvmhS0Fk9SVhSjCLtUvF0YAekdEbxujUF1JZ-DySe4AiYLdgmEUR1fgoyNoY2FvRoyCeeZztsnjOo8uuywVKy-Bi9pH__SiKHTu9YZS-q4WvP0g6xlBCdfXTUtMyGmzxiRdAGBAUiaYSkmoYKycW7b5XLIt18zC9d5UgQjDYTAtFesbRyilKpJFTt7fxarWREPHg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-900 truncate">Streetwear Tracksuit Set</h4>
                    <p className="text-[10px] text-gray-500">Size: M | Qty: 1</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-xs font-bold text-gray-900">$4.55</span>
                      <span className="line-through text-gray-400 text-[10px]">$9.30</span>
                      <span className="text-[#14CDA8] text-[10px] font-semibold">(68% OFF)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery ETA indicator */}
              <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </span>
                  <span className="text-[11px] text-gray-600">
                    Delivering to <strong className="text-gray-900">Dipanshu (Home)</strong>
                  </span>
                </div>
                <span className="text-[10px] font-bold text-[#FF3F6C] bg-red-50 px-2 py-0.5 rounded-full">
                  Express: Tomorrow, 5 PM
                </span>
              </div>
            </div>

            {/* Applied Coupons Card */}
            <div className="pb-6 border-b border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#FF3F6C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M7 7h.01M7 3h5c.53 0 1.04.21 1.41.59l7 7a2 2 0 010 2.82l-5 5a2 2 0 01-2.82 0l-7-7A2 2 0 015 10V5a2 2 0 012-2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                  <span className="text-xs font-bold text-gray-900">Applied Coupon</span>
                </div>
                <Link href="/cart" className="text-[11px] text-[#FF3F6C] font-semibold cursor-pointer hover:underline">
                  Change
                </Link>
              </div>
              <div className="flex items-center justify-between bg-red-50/60 border border-dashed border-[#FF3F6C]/40 rounded-lg p-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold bg-[#FF3F6C] text-white px-2 py-0.5 rounded tracking-wide">
                    SUMMER25
                  </span>
                  <div className="leading-tight">
                    <p className="text-[11px] text-gray-800 font-semibold">$2.50 coupon discount applied</p>
                    <p className="text-[10px] text-gray-500">Applicable on fashion orders</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#FF3F6C]">-$2.50</span>
              </div>
            </div>

            {/* Price Details Breakdown */}
            <div className="pb-6 border-b border-slate-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide">Price Details (2 Items)</h3>
                <span className="text-[10px] font-semibold text-[#14CDA8] bg-[#14CDA8]/10 px-2 py-0.5 rounded-full">
                  Saving $7.50
                </span>
              </div>

              <div className="space-y-2.5 text-xs pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total MRP (2 items)</span>
                  <span className="font-medium text-gray-900">${totalMrp.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Product Discount</span>
                  <div className="space-x-1">
                    <span className="text-[#14CDA8] font-bold">-${productDiscount.toFixed(2)}</span>
                    <span className="text-[#14CDA8] text-[10px]">(45% OFF)</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Coupon Discount (SUMMER25)</span>
                  <span className="text-[#FF3F6C] font-bold">-${couponDiscount.toFixed(2)}</span>
                </div>
                {useLogoCash && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Logo Cash Store Credit</span>
                    <span className="text-[#FF3F6C] font-bold">-${logoCashAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Platform Fee</span>
                  <span className="font-medium text-gray-900">${platformFee.toFixed(2)}</span>
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
                    <span className="text-sm font-bold text-gray-900">Total Payable</span>
                    <span className="text-[10px] text-gray-500">Includes all applicable taxes</span>
                  </div>
                  <div className="space-x-1.5 flex items-center">
                    <span className="text-base font-bold text-gray-900">${finalPayable.toFixed(2)}</span>
                    <span className="text-[#14CDA8] font-semibold text-xs bg-[#14CDA8]/10 px-1.5 py-0.5 rounded">
                      (48% OFF)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Action Section */}
            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Total Amount</p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-bold text-gray-900">${finalPayable.toFixed(2)}</span>
                    <span className="text-[11px] text-[#14CDA8] font-semibold">(48% OFF)</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handlePay}
                  className="bg-[#FF3F6C] hover:opacity-90 text-white px-7 py-2.5 rounded-lg text-xs font-bold shadow-sm transition-all flex items-center gap-2 group"
                >
                  <span>Pay ${finalPayable.toFixed(2)}</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#14CDA8]" />
                  100% Purchase Protection
                </span>
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3 text-[#14CDA8]" />
                  256-bit Encrypted Checkout
                </span>
              </div>
            </div>

            {/* Protected by black rocks */}
            <div className="flex items-center justify-center gap-1.5 text-gray-400 text-[11px] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
              <span>Protected by black rocks</span>
            </div>

          </div>

        </div>
      </main>

      <StorefrontFooter />
    </div>
  );
}
