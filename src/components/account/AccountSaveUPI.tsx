'use client';

import React, { useState } from 'react';
import {
  Plus,
  ShieldCheck,
  Lock,
  Trash2,
  Check,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Copy,
  Shield,
  CreditCard,
} from 'lucide-react';

interface UPIItem {
  id: string;
  upiId: string;
  holder: string;
  bank: string;
  app: 'gpay' | 'phonepe' | 'paytm' | 'amazonpay' | 'bhim' | 'generic';
  isDefault: boolean;
  addedOn: string;
}

// 1. Google Pay (GPay) Official Brand Badge
const GooglePayLogo: React.FC<{ className?: string }> = ({ className = 'h-9 px-2.5' }) => (
  <div
    className={`${className} rounded-lg bg-white border border-slate-200/90 flex items-center justify-center gap-1.5 shadow-2xs shrink-0 select-none`}
    title="Google Pay"
  >
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
    <span className="font-bold text-xs text-slate-700 tracking-tight font-sans">Pay</span>
  </div>
);

// 2. PhonePe Official Brand Badge
const PhonePeLogo: React.FC<{ className?: string }> = ({ className = 'h-9 px-2.5' }) => (
  <div
    className={`${className} rounded-lg bg-[#5f259f] flex items-center justify-center gap-1 shadow-2xs shrink-0 select-none text-white`}
    title="PhonePe"
  >
    <svg viewBox="0 0 100 100" className="w-4 h-4 shrink-0" fill="none">
      <path
        d="M54 22c-2.2 0-4 1.8-4 4v4H36c-2.2 0-4 1.8-4 4s1.8 4 4 4h14v10H36c-2.2 0-4 1.8-4 4s1.8 4 4 4h14v22c0 2.2 1.8 4 4 4s4-1.8 4-4V52h6c11 0 20-9 20-20s-9-20-20-20H58v-4c0-2.2-1.8-4-4-4zm4 16h6c6.6 0 12 5.4 12 12s-5.4 12-12 12h-6V38z"
        fill="white"
      />
      <circle cx="58" cy="14" r="3.5" fill="white" />
    </svg>
    <span className="font-bold text-xs tracking-tight font-sans">PhonePe</span>
  </div>
);

// 3. Paytm Official Brand Badge
const PaytmLogo: React.FC<{ className?: string }> = ({ className = 'h-9 px-3' }) => (
  <div
    className={`${className} rounded-lg bg-white border border-slate-200/90 flex items-center justify-center shadow-2xs shrink-0 select-none`}
    title="Paytm"
  >
    <span className="text-[#002970] font-black text-xs tracking-tight font-sans">pay</span>
    <span className="text-[#00BAF2] font-black text-xs tracking-tight font-sans">tm</span>
  </div>
);

// 4. Amazon Pay Official Brand Badge
const AmazonPayLogo: React.FC<{ className?: string }> = ({ className = 'h-9 px-2.5' }) => (
  <div
    className={`${className} rounded-lg bg-[#232F3E] text-white border border-slate-800 flex items-center justify-center gap-0.5 shadow-2xs shrink-0 select-none`}
    title="Amazon Pay"
  >
    <span className="font-bold text-[11px] tracking-tight font-sans">amazon</span>
    <span className="font-black text-[11px] text-[#FF9900] tracking-tight font-sans">pay</span>
  </div>
);

// 5. BHIM / NPCI UPI Official Brand Badge
const BhimUpiLogo: React.FC<{ className?: string }> = ({ className = 'h-9 px-2.5' }) => (
  <div
    className={`${className} rounded-lg bg-white border border-slate-200/90 flex items-center justify-center gap-1.5 shadow-2xs shrink-0 select-none`}
    title="UPI"
  >
    <svg className="h-3.5 w-4 shrink-0" viewBox="0 0 32 24" fill="none">
      <polygon points="10,2 24,2 16,10 2,10" fill="#00843D" />
      <polygon points="10,14 24,14 16,22 2,22" fill="#F47920" />
    </svg>
    <span className="text-slate-800 font-black italic text-xs tracking-tighter font-sans">UPI</span>
  </div>
);

// Provider Logo Component Helper
const ProviderLogo: React.FC<{ app: string }> = ({ app }) => {
  switch (app) {
    case 'gpay':
      return <GooglePayLogo />;
    case 'phonepe':
      return <PhonePeLogo />;
    case 'paytm':
      return <PaytmLogo />;
    case 'amazonpay':
      return <AmazonPayLogo />;
    case 'bhim':
      return <BhimUpiLogo />;
    default:
      return (
        <div className="h-9 px-2.5 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center shadow-2xs text-[#01AFB5] font-black text-xs shrink-0">
          UPI
        </div>
      );
  }
};

export const AccountSaveUPI: React.FC = () => {
  const [upis, setUpis] = useState<UPIItem[]>([
    {
      id: 'upi-1',
      upiId: 'kumarpardeep8010@okaxis',
      holder: 'Pardeep kumar',
      bank: 'Google Pay • Axis Bank',
      app: 'gpay',
      isDefault: false,
      addedOn: 'Added Today',
    },
    {
      id: 'upi-2',
      upiId: '9466503764@paytm',
      holder: 'Pardeep kumar',
      bank: 'Paytm Payments Bank',
      app: 'paytm',
      isDefault: false,
      addedOn: 'Saved Sep 2026',
    },
    {
      id: 'upi-3',
      upiId: '9466503764@ybl',
      holder: 'Pardeep kumar',
      bank: 'YES Bank • PhonePe',
      app: 'phonepe',
      isDefault: true,
      addedOn: 'Saved Aug 2026',
    },
  ]);

  // Form input states
  const [newUpiId, setNewUpiId] = useState('');
  const [newHolder, setNewHolder] = useState('Pardeep kumar');
  const [detectedApp, setDetectedApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'amazonpay' | 'bhim' | 'generic'>('generic');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Inline delete confirmation state (No popup window!)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Strict UPI Regex
  const UPI_REGEX = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;

  const analyzeUpi = (value: string) => {
    const val = value.trim().toLowerCase();

    if (!val) {
      setDetectedApp('generic');
      setIsValid(null);
      setErrorMsg('');
      return;
    }

    // App Handle Recognition
    let recognized: 'gpay' | 'phonepe' | 'paytm' | 'amazonpay' | 'bhim' | 'generic' = 'generic';

    if (
      val.endsWith('@okhdfcbank') ||
      val.endsWith('@okaxis') ||
      val.endsWith('@oksbi') ||
      val.endsWith('@okicici')
    ) {
      recognized = 'gpay';
    } else if (
      val.endsWith('@ybl') ||
      val.endsWith('@ibl') ||
      val.endsWith('@axl')
    ) {
      recognized = 'phonepe';
    } else if (
      val.endsWith('@paytm') ||
      val.endsWith('@ptaxis') ||
      val.endsWith('@ptyes')
    ) {
      recognized = 'paytm';
    } else if (val.endsWith('@apl') || val.endsWith('@raxis')) {
      recognized = 'amazonpay';
    } else if (val.endsWith('@upi') || val.endsWith('@barodampay')) {
      recognized = 'bhim';
    }

    setDetectedApp(recognized);

    // Regex Syntax Check
    if (UPI_REGEX.test(val)) {
      setIsValid(true);
      setErrorMsg('');
    } else if (!val.includes('@')) {
      setIsValid(null); // Still typing username
      setErrorMsg('');
    } else {
      const parts = val.split('@');
      if (parts[0].length < 2) {
        setIsValid(false);
        setErrorMsg('UPI username must contain at least 2 alphanumeric characters.');
      } else if (!parts[1] || parts[1].length < 2) {
        setIsValid(null);
        setErrorMsg('');
      } else {
        setIsValid(false);
        setErrorMsg('Invalid UPI handle syntax. Expected format: username@bankname');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    setNewUpiId(val);
    analyzeUpi(val);
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleCopyUpi = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    showToast(`Copied "${text}" to clipboard`);
  };

  const handleAddUPI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || !newUpiId.trim()) {
      setErrorMsg('Please enter a valid and verified UPI ID before saving.');
      return;
    }

    // Check duplicate
    if (upis.some((u) => u.upiId.toLowerCase() === newUpiId.toLowerCase())) {
      setErrorMsg('This UPI ID is already saved in your account.');
      return;
    }

    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);

      const bankLabel =
        detectedApp === 'gpay'
          ? 'Google Pay • Direct VPA'
          : detectedApp === 'phonepe'
          ? 'PhonePe • Direct VPA'
          : detectedApp === 'paytm'
          ? 'Paytm Payments Bank'
          : detectedApp === 'amazonpay'
          ? 'Amazon Pay UPI'
          : 'Unified Payments Interface';

      const item: UPIItem = {
        id: `upi-${Date.now()}`,
        upiId: newUpiId.trim().toLowerCase(),
        holder: newHolder.trim() || 'Pardeep kumar',
        bank: bankLabel,
        app: detectedApp,
        isDefault: upis.length === 0,
        addedOn: 'Added Today',
      };

      setUpis([item, ...upis]);
      setNewUpiId('');
      setDetectedApp('generic');
      setIsValid(null);
      setErrorMsg('');
      showToast(`UPI ID "${item.upiId}" verified and saved successfully!`);
    }, 600);
  };

  const handleSetDefault = (id: string) => {
    setUpis((prev) => prev.map((u) => ({ ...u, isDefault: u.id === id })));
    showToast('Default UPI payment method updated.');
  };

  const handleConfirmRemove = (id: string) => {
    setUpis((prev) => prev.filter((u) => u.id !== id));
    setDeleteConfirmId(null);
    showToast('UPI ID removed from your account.');
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800 leading-tight">Saved UPI</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your verified UPI IDs and VPA handles for instant 1-click checkout
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
          <ShieldCheck className="w-4 h-4 text-[#01AFB5]" />
          <span>NPCI Verified &amp; Encrypted</span>
        </div>
      </div>

      {/* ADD NEW UPI ID WITH INSTANT VPA FORMAT CHECK & OFFICIAL LOGO */}
      <div className="border border-slate-200 rounded-2xl p-5 sm:p-6 bg-white shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#01AFB5]/10 border border-[#01AFB5]/25 flex items-center justify-center text-[#01AFB5]">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 leading-snug">
                Add New UPI ID (VPA)
              </h2>
              <p className="text-[11px] text-slate-500">
                Instant format check with real provider logo identification
              </p>
            </div>
          </div>

          {/* Official Provider Logos Banner */}
          <div className="hidden sm:flex items-center gap-2">
            <GooglePayLogo />
            <PhonePeLogo />
            <PaytmLogo />
          </div>
        </div>

        <form onSubmit={handleAddUPI} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-start">
            {/* UPI ID Input */}
            <div className="sm:col-span-7 space-y-1">
              <label className="block text-xs font-bold text-slate-800">
                UPI ID / VPA <span className="text-rose-500">*</span>
              </label>

              <div className="relative">
                <input
                  type="text"
                  value={newUpiId}
                  onChange={handleInputChange}
                  placeholder="e.g. 9466503764@okhdfcbank, name@okaxis, or user@ybl"
                  className={`w-full h-11 pl-3.5 pr-28 text-xs font-mono font-bold rounded-xl border transition outline-none bg-slate-50/70 focus:bg-white ${
                    isValid === true
                      ? 'border-emerald-500 text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                      : isValid === false
                      ? 'border-rose-400 text-rose-900 bg-rose-50/20 focus:border-rose-400 focus:ring-1 focus:ring-rose-400'
                      : 'border-slate-200 focus:border-[#01AFB5] focus:ring-1 focus:ring-[#01AFB5] text-slate-800'
                  }`}
                />

                {/* Right-Side Official Provider Logo & Validation Status */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  {detectedApp !== 'generic' && (
                    <div className="animate-in zoom-in-95 flex items-center">
                      <ProviderLogo app={detectedApp} />
                    </div>
                  )}

                  {isValid === true && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 stroke-[2.5]" />
                  )}
                  {isValid === false && (
                    <AlertCircle className="w-4 h-4 text-rose-500 stroke-[2.5]" />
                  )}
                </div>
              </div>
            </div>

            {/* Account Holder Name */}
            <div className="sm:col-span-5 space-y-1">
              <label className="block text-xs font-bold text-slate-800">
                Account Holder Name
              </label>
              <input
                type="text"
                value={newHolder}
                onChange={(e) => setNewHolder(e.target.value)}
                placeholder="Pardeep kumar"
                className="w-full h-11 px-3.5 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:border-[#01AFB5] focus:ring-1 focus:ring-[#01AFB5] outline-none transition"
              />
            </div>
          </div>

          {/* Validation Banner / Error State */}
          {errorMsg ? (
            <p className="text-[11px] font-medium text-rose-600 flex items-center gap-1.5 pt-0.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMsg}</span>
            </p>
          ) : isValid === true ? (
            <div className="p-3 bg-emerald-50 border border-emerald-200/80 rounded-xl flex items-center justify-between text-xs text-emerald-800">
              <div className="flex items-center gap-2.5">
                <ProviderLogo app={detectedApp} />
                <div>
                  Valid UPI handle detected.
                  <span className="block text-[11px] text-emerald-700">
                    Format syntax verified. Ready to save for instant checkout.
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-bold font-mono bg-white/70 px-2 py-0.5 rounded border border-emerald-200 text-emerald-700">
                Verified Syntax
              </span>
            </div>
          ) : null}

          {/* Submit Action */}
          <div className="flex items-center justify-end pt-2 border-t border-slate-100">
            <button
              type="submit"
              disabled={isVerifying || isValid === false || !newUpiId.trim()}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-xs cursor-pointer ${
                isValid === true && !isVerifying
                  ? 'bg-[#01AFB5] hover:bg-[#009da2] text-white shadow-md'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {isVerifying ? (
                <span>Verifying VPA...</span>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Verify &amp; Save UPI ID</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* SAVED UPIS LIST — SINGLE ROW CLEAN & PROFESSIONAL LAYOUT */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Your Saved UPI Handles ({upis.length})
          </h2>
          <span className="text-[11px] text-slate-400">
            Click copy to use anywhere
          </span>
        </div>

        {upis.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs bg-slate-50 border border-slate-200/80 rounded-xl">
            No UPI IDs saved yet. Add your Google Pay, PhonePe, or Paytm handle above.
          </div>
        ) : (
          upis.map((item) => {
            const isDeleting = deleteConfirmId === item.id;

            return (
              <div
                key={item.id}
                className="border border-slate-200/90 hover:border-slate-300 rounded-xl px-4 py-3 bg-white shadow-2xs transition"
              >
                {/* Inline Delete Confirmation View */}
                {isDeleting ? (
                  <div className="p-2 bg-rose-50 border border-rose-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs animate-in fade-in duration-150">
                    <div className="flex items-center gap-2 text-rose-800 font-medium">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>Are you sure you want to remove <strong>{item.upiId}</strong>?</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(null)}
                        className="px-3 py-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold transition cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handleConfirmRemove(item.id)}
                        className="px-3.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold transition cursor-pointer shadow-2xs"
                      >
                        Confirm Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  /* SINGLE ROW STREAMLINED LAYOUT (NO 100% VERIFIED BADGE) */
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {/* Left: Official Logo + UPI ID + Holder details in single cohesive flow */}
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      {/* Official Provider Logo */}
                      <ProviderLogo app={item.app} />

                      {/* Info Flow */}
                      <div className="min-w-0 flex-1 space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono font-bold text-sm text-slate-900 tracking-tight">
                            {item.upiId}
                          </span>

                          <button
                            type="button"
                            onClick={() => handleCopyUpi(item.upiId, item.id)}
                            className="text-slate-400 hover:text-[#01AFB5] transition p-0.5 rounded cursor-pointer"
                            title="Copy UPI ID"
                          >
                            {copiedId === item.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>

                          {item.isDefault && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shadow-2xs">
                              <Check className="w-2.5 h-2.5 stroke-[3]" /> Primary Default
                            </span>
                          )}
                        </div>

                        <div className="text-[11px] text-slate-500 flex items-center gap-2 flex-wrap">
                          <span>
                            Account Holder: <strong className="font-semibold text-slate-700">{item.holder}</strong>
                          </span>
                          <span className="text-slate-300 hidden sm:inline">•</span>
                          <span className="text-slate-400 hidden sm:inline">{item.bank}</span>
                          <span className="text-slate-300 hidden md:inline">•</span>
                          <span className="text-slate-400 hidden md:inline">{item.addedOn}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions in Same Row */}
                    <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 sm:self-center">
                      {!item.isDefault && (
                        <button
                          type="button"
                          onClick={() => handleSetDefault(item.id)}
                          className="text-xs font-semibold text-[#01AFB5] hover:text-[#009da2] hover:underline cursor-pointer transition whitespace-nowrap"
                        >
                          Set as Default
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleCopyUpi(item.upiId, item.id)}
                        className="text-slate-500 hover:text-[#01AFB5] transition inline-flex items-center gap-1 text-xs font-medium cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy</span>
                      </button>

                      <span className="h-3 w-px bg-slate-200"></span>

                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(item.id)}
                        className="text-slate-400 hover:text-rose-600 transition inline-flex items-center gap-1 text-xs font-semibold cursor-pointer"
                        title="Remove UPI ID"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Security Note Footer */}
      <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-start gap-3 text-xs text-slate-600">
        <Lock className="w-4 h-4 text-[#01AFB5] mt-0.5 shrink-0" />
        <div className="space-y-0.5 text-[11px] leading-relaxed">
          <strong className="font-semibold text-slate-800 block">
            National Payments Corporation of India (NPCI) Certified
          </strong>
          <p>
            Your UPI Virtual Private Addresses (VPA) are secured with 256-bit encryption. UPI MPIN is never requested, collected, or stored on this platform. Payment authentication occurs directly within your banking application.
          </p>
        </div>
      </div>
    </div>
  );
};