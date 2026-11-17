'use client';

import React, { useState, useMemo } from 'react';
import cardValidator from 'card-validator';
import {
  CreditCard,
  Plus,
  ArrowLeft,
  Lock,
  Trash2,
  Check,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Sparkles,
  Wifi,
} from 'lucide-react';

// Register RuPay network in card-validator if not present
try {
  cardValidator.creditCardType.addCard({
    niceType: 'RuPay',
    type: 'rupay',
    patterns: [
      [6061, 6085],
      [6521, 6530],
      508,
      81,
      82,
      353,
      356,
    ],
    gaps: [4, 8, 12],
    lengths: [16],
    code: { name: 'CVV', size: 3 },
  });
} catch {
  // Already registered or initialized
}

export type CardBrand =
  | 'visa'
  | 'mastercard'
  | 'rupay'
  | 'american-express'
  | 'discover'
  | 'diners-club'
  | 'jcb'
  | 'maestro'
  | 'unknown';

export interface SavedCardItem {
  id: string;
  cardholder: string;
  last4: string;
  brand: CardBrand;
  brandName: string;
  exp: string;
  bankName: string;
  isDefault: boolean;
  addedOn: string;
}

// ==========================================
// HIGH-FIDELITY VECTOR BRAND LOGOS
// ==========================================

export const VisaLogo: React.FC<{ className?: string }> = ({ className = 'h-9 px-2' }) => (
  <div
    className={`${className} rounded-lg bg-white border border-slate-200/90 flex items-center justify-center shadow-2xs shrink-0 select-none`}
    title="Visa"
  >
    <svg className="h-4 w-11 shrink-0" viewBox="0 0 50 16" fill="none">
      <path
        fill="#1434CB"
        d="M19.5 15.3h-3.1L14.4 3.3h3.1l2 12zm9.8-11.7c-.8-.3-2.1-.6-3.5-.6-3.9 0-6.6 2.1-6.6 5 0 2.2 2 3.4 3.4 4.1 1.5.7 2 1.2 2 1.8 0 1-1.2 1.4-2.4 1.4-1.6 0-2.5-.2-3.8-.8l-.5-.2-.5 2.6c.9.4 2.5.7 4.2.7 4 0 6.6-2 6.6-5 0-1.7-1-3-3.3-4-1.4-.7-2.3-1.2-2.3-1.9 0-.6.7-1.3 2.3-1.3 1.3 0 2.3.3 3 .6l.4.2.7-2.6zm9.5 8.3l1.3-3.4.7 3.4h-2zm3.8-8.6h-2.4c-.7 0-1.3.2-1.6 1l-4.6 11h3.3l.7-1.8h4c.1.4.4 1.8.4 1.8h2.9L42.6 3.3zm-23.9 0L15.9 10.7l-.3-1.6c-.6-2.1-2.4-4.2-4.3-5.2l2.8 11.4h3.3L22.1 3.3h-3.4z"
      />
      <path
        fill="#F7B600"
        d="M9.8 3.3H4.9L4.8 3.5c3.3.8 5.4 2.9 6.3 5.2L10.2 4c-.2-.5-.5-.7-1-.7z"
      />
    </svg>
  </div>
);

export const MastercardLogo: React.FC<{ className?: string }> = ({ className = 'h-9 px-2' }) => (
  <div
    className={`${className} rounded-lg bg-white border border-slate-200/90 flex items-center justify-center shadow-2xs shrink-0 select-none`}
    title="Mastercard"
  >
    <svg className="h-5 w-8" viewBox="0 0 138 107" fill="none">
      <circle cx="43" cy="53.5" r="43" fill="#EB001B" />
      <circle cx="95" cy="53.5" r="43" fill="#F79E1B" fillOpacity="0.92" />
      <path
        d="M69 22.8c-7.9 7.5-12.8 18.3-12.8 30.7s4.9 23.2 12.8 30.7c7.9-7.5 12.8-18.3 12.8-30.7S76.9 30.3 69 22.8z"
        fill="#FF5F00"
      />
    </svg>
  </div>
);

export const RuPayLogo: React.FC<{ className?: string }> = ({ className = 'h-9 px-2.5' }) => (
  <div
    className={`${className} rounded-lg bg-white border border-slate-200/90 flex items-center justify-center gap-1 shadow-2xs shrink-0 select-none`}
    title="RuPay"
  >
    <span className="font-black italic text-xs tracking-tighter text-[#0F75BC] font-sans">Ru</span>
    <span className="font-black italic text-xs tracking-tighter text-[#00A859] font-sans">Pay</span>
    <div className="flex flex-col gap-0.5 ml-0.5">
      <div className="w-1.5 h-1.5 bg-[#F47920] rotate-45"></div>
      <div className="w-1.5 h-1.5 bg-[#00A859] rotate-45"></div>
    </div>
  </div>
);

export const AmexLogo: React.FC<{ className?: string }> = ({ className = 'h-9 px-2.5' }) => (
  <div
    className={`${className} rounded-lg bg-[#006FCF] flex items-center justify-center shadow-2xs shrink-0 select-none text-white`}
    title="American Express"
  >
    <span className="font-black text-[10px] tracking-widest font-sans uppercase">AMEX</span>
  </div>
);

export const DiscoverLogo: React.FC<{ className?: string }> = ({ className = 'h-9 px-2.5' }) => (
  <div
    className={`${className} rounded-lg bg-white border border-slate-200/90 flex items-center justify-center gap-0.5 shadow-2xs shrink-0 select-none`}
    title="Discover"
  >
    <span className="font-bold text-[10px] text-slate-800 tracking-tighter uppercase">DISC</span>
    <div className="w-2.5 h-2.5 rounded-full bg-[#FF6000] -mx-0.5"></div>
    <span className="font-bold text-[10px] text-slate-800 tracking-tighter uppercase">VER</span>
  </div>
);

export const GenericCardLogo: React.FC<{ className?: string }> = ({ className = 'h-8 px-2.5' }) => (
  <div
    className={`${className} rounded-lg bg-slate-50 border border-slate-200/90 flex items-center justify-center shadow-2xs shrink-0 select-none text-slate-400`}
    title="Credit/Debit Card"
  >
    <CreditCard className="w-4 h-4 text-slate-500" />
  </div>
);

export const BrandBadge: React.FC<{ brand: CardBrand; className?: string }> = ({ brand, className }) => {
  switch (brand) {
    case 'visa':
      return <VisaLogo className={className} />;
    case 'mastercard':
      return <MastercardLogo className={className} />;
    case 'rupay':
      return <RuPayLogo className={className} />;
    case 'american-express':
      return <AmexLogo className={className} />;
    case 'discover':
      return <DiscoverLogo className={className} />;
    default:
      return <GenericCardLogo className={className} />;
  }
};

// ==========================================
// MAIN ACCOUNT SAVE CARD COMPONENT
// ==========================================

export const AccountSaveCard: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Saved cards list
  const [cards, setCards] = useState<SavedCardItem[]>([
    {
      id: 'c-1',
      cardholder: 'PARDEEP KUMAR',
      last4: '6574',
      brand: 'visa',
      brandName: 'Visa Platinum',
      exp: '07/28',
      bankName: 'HDFC Bank',
      isDefault: true,
      addedOn: 'Saved Sep 2026',
    },
    {
      id: 'c-2',
      cardholder: 'PARDEEP KUMAR',
      last4: '3257',
      brand: 'mastercard',
      brandName: 'Mastercard World',
      exp: '11/27',
      bankName: 'ICICI Bank',
      isDefault: false,
      addedOn: 'Saved Aug 2026',
    },
    {
      id: 'c-3',
      cardholder: 'PARDEEP KUMAR',
      last4: '8910',
      brand: 'rupay',
      brandName: 'RuPay Select',
      exp: '04/29',
      bankName: 'State Bank of India',
      isDefault: false,
      addedOn: 'Added Today',
    },
  ]);

  // Form State
  const [cardNumber, setCardNumber] = useState('');
  const [cardholder, setCardholder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Show Toast Helper
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // ==========================================
  // REAL-TIME CARD VALIDATION WITH card-validator
  // ==========================================
  const rawNumber = useMemo(() => cardNumber.replace(/\D/g, ''), [cardNumber]);

  const numberValidation = useMemo(() => {
    if (!rawNumber) {
      return {
        isValid: false,
        isPotentiallyValid: true,
        card: null,
      };
    }
    return cardValidator.number(rawNumber);
  }, [rawNumber]);

  const detectedBrand: CardBrand = useMemo(() => {
    if (!numberValidation.card) {
      // Fallback check for RuPay prefixes if not captured
      if (
        rawNumber.startsWith('60') ||
        rawNumber.startsWith('6521') ||
        rawNumber.startsWith('6522') ||
        rawNumber.startsWith('508')
      ) {
        return 'rupay';
      }
      return 'unknown';
    }

    const t = numberValidation.card.type;
    if (t === 'visa') return 'visa';
    if (t === 'mastercard') return 'mastercard';
    if (t === 'american-express') return 'american-express';
    if (t === 'discover') return 'discover';
    if (t === 'rupay') return 'rupay';
    if (t === 'diners-club') return 'diners-club';
    if (t === 'jcb') return 'jcb';
    if (t === 'maestro') return 'maestro';
    return 'unknown';
  }, [numberValidation, rawNumber]);

  const brandNiceName = useMemo(() => {
    if (detectedBrand === 'rupay') return 'RuPay';
    if (numberValidation.card) return numberValidation.card.niceType;
    return 'Debit / Credit Card';
  }, [detectedBrand, numberValidation]);

  // Auto-format card number as user types
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '');

    // Max length based on card type (Amex: 15, default: 16-19)
    const isAmex = detectedBrand === 'american-express' || digits.startsWith('34') || digits.startsWith('37');
    const maxDigits = isAmex ? 15 : 19;
    const truncated = digits.slice(0, maxDigits);

    // Apply spacing gaps dynamically
    let formatted = '';
    if (isAmex) {
      // 4-6-5 format for Amex
      for (let i = 0; i < truncated.length; i++) {
        if (i === 4 || i === 10) formatted += ' ';
        formatted += truncated[i];
      }
    } else {
      // Default 4-4-4-4 format
      for (let i = 0; i < truncated.length; i++) {
        if (i > 0 && i % 4 === 0) formatted += ' ';
        formatted += truncated[i];
      }
    }

    setCardNumber(formatted);
  };

  // Expiration date validation & auto-formatting MM/YY
  const expiryValidation = useMemo(() => {
    return cardValidator.expirationDate(expiry);
  }, [expiry]);

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let digits = e.target.value.replace(/\D/g, '').slice(0, 4);

    // If first digit is 2-9, auto-format with leading zero (e.g. 5 -> 05/)
    if (digits.length === 1 && parseInt(digits, 10) > 1) {
      digits = `0${digits}`;
    }

    if (digits.length >= 3) {
      setExpiry(`${digits.slice(0, 2)}/${digits.slice(2)}`);
    } else if (digits.length === 2 && !expiry.includes('/')) {
      setExpiry(`${digits}/`);
    } else {
      setExpiry(digits);
    }
  };

  // CVV validation
  const maxCvvLength = detectedBrand === 'american-express' ? 4 : 3;
  const cvvValidation = useMemo(() => {
    return cardValidator.cvv(cvv, maxCvvLength);
  }, [cvv, maxCvvLength]);

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, maxCvvLength);
    setCvv(digits);
  };

  // Cardholder name validation (Letters, spaces, dot only, min 2 chars)
  const cardholderRegex = /^[a-zA-Z\s.]{2,50}$/;
  const isHolderFormatValid = cardholder.trim().length >= 2 && cardholderRegex.test(cardholder.trim());

  const handleCardholderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Automatically sanitize and uppercase letters only
    const filtered = e.target.value.replace(/[^a-zA-Z\s.]/g, '').toUpperCase();
    setCardholder(filtered);
  };

  // Overall Luhn and completeness status
  const requiredDigits = detectedBrand === 'american-express' ? 15 : 16;
  const isCardNumberComplete = rawNumber.length >= requiredDigits;
  const isLuhnValid = numberValidation.isValid;

  // Error Message Helpers
  const getCardNumberError = () => {
    if (!rawNumber) return 'Card number is required.';
    if (rawNumber.length < requiredDigits) {
      return `Please enter a complete ${requiredDigits}-digit card number.`;
    }
    if (!isLuhnValid) {
      return 'Invalid card number (Luhn algorithm check failed). Please verify digits.';
    }
    return '';
  };

  const getHolderError = () => {
    if (!cardholder.trim()) return 'Cardholder name as printed on card is required.';
    if (cardholder.trim().length < 2) return 'Please enter at least 2 characters.';
    if (!cardholderRegex.test(cardholder.trim())) return 'Name should contain only alphabets and spaces.';
    return '';
  };

  const getExpiryError = () => {
    if (!expiry) return 'Expiration date (MM/YY) is required.';
    if (expiry.length < 5) return 'Please enter a complete MM/YY date.';
    const month = parseInt(expiry.slice(0, 2), 10);
    if (isNaN(month) || month < 1 || month > 12) return 'Invalid month (must be 01 to 12).';
    if (!expiryValidation.isValid) return 'Card has expired. Enter a valid future date.';
    return '';
  };

  const getCvvError = () => {
    if (!cvv) return `${maxCvvLength}-digit security code required.`;
    if (cvv.length < maxCvvLength) {
      return `Please enter full ${maxCvvLength}-digit ${detectedBrand === 'american-express' ? 'CID' : 'CVV'}.`;
    }
    if (!cvvValidation.isValid) return 'Invalid security code.';
    return '';
  };

  // Field invalid flags (shown after blur or submit attempt)
  const isCardNumberInvalid =
    (touched.cardNumber || formSubmitted) && (!isCardNumberComplete || !isLuhnValid);

  const isExpiryInvalid =
    (touched.expiry || formSubmitted) && (!expiry || expiry.length < 5 || !expiryValidation.isValid);

  const isCvvInvalid =
    (touched.cvv || formSubmitted) && (!cvv || cvv.length < maxCvvLength || !cvvValidation.isValid);

  const isHolderInvalid =
    (touched.cardholder || formSubmitted) && !isHolderFormatValid;

  // Form submission
  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTouched({ cardNumber: true, cardholder: true, expiry: true, cvv: true });

    if (!isLuhnValid || !isHolderFormatValid || !expiryValidation.isValid || !cvvValidation.isValid) {
      return;
    }

    // Check duplicate
    const last4 = rawNumber.slice(-4);
    if (cards.some((c) => c.last4 === last4 && c.brand === detectedBrand)) {
      showToast('This card is already saved in your account.');
      return;
    }

    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);

      const newCardItem: SavedCardItem = {
        id: `card-${Date.now()}`,
        cardholder: cardholder.trim().toUpperCase(),
        last4,
        brand: detectedBrand !== 'unknown' ? detectedBrand : 'visa',
        brandName: brandNiceName,
        exp: expiry,
        bankName:
          detectedBrand === 'rupay'
            ? 'RuPay Direct'
            : detectedBrand === 'visa'
            ? 'Visa International'
            : detectedBrand === 'mastercard'
            ? 'Mastercard Global'
            : 'Payment Card',
        isDefault: cards.length === 0,
        addedOn: 'Added Today',
      };

      setCards([newCardItem, ...cards]);
      setCardNumber('');
      setCardholder('');
      setExpiry('');
      setCvv('');
      setFormSubmitted(false);
      setTouched({});
      setShowAddForm(false);
      showToast(`Card ending in •••• ${last4} saved successfully!`);
    }, 600);
  };

  const handleSetDefault = (id: string) => {
    setCards((prev) => prev.map((c) => ({ ...c, isDefault: c.id === id })));
    showToast('Default payment card updated.');
  };

  const handleConfirmRemove = (id: string) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
    setDeleteConfirmId(null);
    showToast('Card removed from your account.');
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
          <h1 className="text-xl font-bold text-slate-800 leading-tight">Saved Cards</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your credit and debit cards with instant brand auto-detection &amp; Luhn validation
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
          <ShieldCheck className="w-4 h-4 text-[#01AFB5]" />
          <span>PCI-DSS Level 1 Encrypted</span>
        </div>
      </div>

      {!showAddForm ? (
        /* SAVED CARDS LIST VIEW — SINGLE ROW CLEAN & PROFESSIONAL */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Your Saved Cards ({cards.length})
            </h2>
            <button
              type="button"
              onClick={() => {
                setShowAddForm(true);
                setFormSubmitted(false);
                setTouched({});
                setCardholder('');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#01AFB5] hover:bg-[#009da2] px-3.5 py-1.5 rounded-xl transition shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Add New Card</span>
            </button>
          </div>

          {cards.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs bg-slate-50 border border-slate-200/80 rounded-xl">
              No saved cards yet. Click &quot;Add New Card&quot; to securely save your first card.
            </div>
          ) : (
            <div className="space-y-3">
              {cards.map((c) => {
                const isDeleting = deleteConfirmId === c.id;

                return (
                  <div
                    key={c.id}
                    className="border border-slate-200/90 hover:border-slate-300 rounded-xl px-4 py-3 bg-white shadow-2xs transition"
                  >
                    {isDeleting ? (
                      /* Inline Delete Confirmation */
                      <div className="p-2 bg-rose-50 border border-rose-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs animate-in fade-in duration-150">
                        <div className="flex items-center gap-2 text-rose-800 font-medium">
                          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          <span>
                            Are you sure you want to remove card ending in{' '}
                            <strong>•••• {c.last4}</strong>?
                          </span>
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
                            onClick={() => handleConfirmRemove(c.id)}
                            className="px-3.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold transition cursor-pointer shadow-2xs"
                          >
                            Confirm Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* SINGLE ROW STREAMLINED CARD ROW */
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3.5 min-w-0 flex-1">
                          {/* Official Vector Brand Logo */}
                          <BrandBadge brand={c.brand} className="h-9 px-2" />

                          {/* Info Flow */}
                          <div className="min-w-0 flex-1 space-y-0.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-mono font-bold text-sm text-slate-900 tracking-tight">
                                •••• •••• •••• {c.last4}
                              </span>

                              {c.isDefault && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shadow-2xs">
                                  <Check className="w-2.5 h-2.5 stroke-[3]" /> Primary Default
                                </span>
                              )}
                            </div>

                            <div className="text-[11px] text-slate-500">
                              Cardholder: <strong className="font-semibold text-slate-700">{c.cardholder}</strong>
                            </div>
                          </div>
                        </div>

                        {/* Right: Actions in Same Row */}
                        <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 sm:self-center">
                          {!c.isDefault && (
                            <button
                              type="button"
                              onClick={() => handleSetDefault(c.id)}
                              className="text-xs font-semibold text-[#01AFB5] hover:text-[#009da2] hover:underline cursor-pointer transition whitespace-nowrap"
                            >
                              Set as Default
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(c.id)}
                            className="text-slate-400 hover:text-rose-600 transition inline-flex items-center gap-1 text-xs font-semibold cursor-pointer"
                            title="Remove Card"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Quick Add Card Row Option */}
          <button
            type="button"
            onClick={() => {
              setShowAddForm(true);
              setFormSubmitted(false);
              setTouched({});
              setCardholder('');
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-slate-50 rounded-xl transition border border-dashed border-slate-300 hover:border-[#01AFB5] text-xs font-semibold text-slate-600 hover:text-[#01AFB5] cursor-pointer"
          >
            <CreditCard className="w-4 h-4" />
            <span>Add another Credit or Debit Card</span>
          </button>
        </div>
      ) : (
        /* ========================================================== */
        /* ADD NEW CARD FORM WITH LIVE PREVIEW & AUTO-DETECTION      */
        /* ========================================================== */
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                title="Go back"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h2 className="text-sm font-bold text-slate-900 leading-snug">
                  Add New Card
                </h2>
                <p className="text-[11px] text-slate-500">
                  Instant brand detection (Visa, Mastercard, RuPay, Amex, Discover) &amp; Luhn checksum
                </p>
              </div>
            </div>

            {/* Brand Support Badges */}
            <div className="hidden md:flex items-center gap-2">
              <VisaLogo className="h-7 px-1.5" />
              <MastercardLogo className="h-7 px-1.5" />
              <RuPayLogo className="h-7 px-1.5" />
              <AmexLogo className="h-7 px-1.5" />
              <DiscoverLogo className="h-7 px-1.5" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LIVE CARD PREVIEW (Left / Top) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-sm rounded-2xl p-5 shadow-lg relative overflow-hidden select-none text-white bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 border border-slate-700/60 transition-all duration-300">
                {/* Decorative Subtle Circles */}
                <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-[#01AFB5]/15 blur-2xl pointer-events-none"></div>
                <div className="absolute -left-10 -top-10 w-36 h-36 rounded-full bg-blue-500/10 blur-xl pointer-events-none"></div>

                {/* Top Row: Chip + Contactless + Brand */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2.5">
                    {/* Metallic EMV Smart Chip */}
                    <div className="w-10 h-7 rounded-md bg-gradient-to-tr from-amber-300 via-yellow-200 to-amber-400 border border-amber-400/80 shadow-xs flex items-center justify-center p-0.5">
                      <div className="w-full h-full border border-amber-600/30 rounded-xs grid grid-cols-3 gap-0.5 p-0.5">
                        <div className="border border-amber-600/20"></div>
                        <div className="border border-amber-600/20"></div>
                        <div className="border border-amber-600/20"></div>
                      </div>
                    </div>
                    {/* Contactless Wave */}
                    <Wifi className="w-4 h-4 text-slate-400 rotate-90" />
                  </div>

                  {/* Brand Badge in Card Preview */}
                  <BrandBadge brand={detectedBrand} className="h-8 px-2 bg-white/95" />
                </div>

                {/* Card Number Display */}
                <div className="mt-7 mb-6 relative z-10">
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest font-medium mb-1">
                    Card Number
                  </div>
                  <div className="font-mono font-bold text-base sm:text-lg tracking-widest text-slate-100">
                    {cardNumber || '•••• •••• •••• ••••'}
                  </div>
                </div>

                {/* Bottom Row: Holder & Expiry */}
                <div className="flex items-end justify-between relative z-10 pt-2 border-t border-slate-700/50">
                  <div className="min-w-0 pr-3">
                    <div className="text-[9px] uppercase tracking-wider text-slate-400">Cardholder</div>
                    <div className="font-bold text-xs tracking-wide uppercase truncate text-slate-200">
                      {cardholder || 'CARDHOLDER NAME'}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-[9px] uppercase tracking-wider text-slate-400">Expires</div>
                    <div className="font-mono font-bold text-xs text-slate-200">
                      {expiry || 'MM/YY'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Note under card */}
              <div className="w-full max-w-sm mt-3 px-1 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-[#01AFB5]" />
                  <span>Real-time Brand Detection</span>
                </span>
                <span className="font-bold text-slate-700">{brandNiceName}</span>
              </div>
            </div>

            {/* FORM INPUTS (Right) */}
            <div className="lg:col-span-7">
              <form onSubmit={handleAddCard} noValidate className="space-y-4">
                {/* 1. Card Number Input with Auto-Formatting & Real-time Luhn Check */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-800">
                      Card Number <span className="text-rose-500">*</span>
                    </label>

                    {isLuhnValid && isCardNumberComplete && (
                      <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 animate-in fade-in">
                        <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Valid {brandNiceName} (Luhn Passed)</span>
                      </span>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      onBlur={() => setTouched((p) => ({ ...p, cardNumber: true }))}
                      placeholder={detectedBrand === 'american-express' ? '3782 822463 10005' : '4532 1234 5678 9012'}
                      className={`w-full h-11 pl-3.5 pr-28 text-xs font-mono font-bold rounded-xl border transition outline-none bg-slate-50/70 focus:bg-white tracking-wider ${
                        isLuhnValid && isCardNumberComplete
                          ? 'border-emerald-500 text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                          : isCardNumberInvalid
                          ? 'border-rose-400 text-rose-900 bg-rose-50/20 focus:border-rose-400 focus:ring-1 focus:ring-rose-400'
                          : 'border-slate-200 focus:border-[#01AFB5] focus:ring-1 focus:ring-[#01AFB5] text-slate-800'
                      }`}
                    />

                    {/* Right-Side Brand Badge & Validation Icon */}
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                      <BrandBadge brand={detectedBrand} className="h-7 px-1.5" />

                      {isLuhnValid && isCardNumberComplete ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 stroke-[2.5]" />
                      ) : isCardNumberInvalid ? (
                        <AlertCircle className="w-4 h-4 text-rose-500 stroke-[2.5]" />
                      ) : null}
                    </div>
                  </div>

                  {isCardNumberInvalid && (
                    <p className="text-[11px] font-medium text-rose-600 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{getCardNumberError()}</span>
                    </p>
                  )}
                </div>

                {/* 2. Cardholder Name */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-800">
                      Cardholder Name <span className="text-rose-500">*</span>
                    </label>
                    {isHolderFormatValid && (
                      <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 animate-in fade-in">
                        <Check className="w-3 h-3 stroke-[2.5]" /> Valid Name
                      </span>
                    )}
                  </div>

                  <input
                    type="text"
                    value={cardholder}
                    onChange={handleCardholderChange}
                    onBlur={() => setTouched((p) => ({ ...p, cardholder: true }))}
                    placeholder="Full name as printed on card"
                    className={`w-full h-11 px-3.5 text-xs font-semibold rounded-xl border transition outline-none bg-slate-50/70 focus:bg-white tracking-wide placeholder:normal-case placeholder:font-normal placeholder:text-slate-400 ${
                      isHolderInvalid
                        ? 'border-rose-400 text-rose-900 bg-rose-50/20 focus:border-rose-400 focus:ring-1 focus:ring-rose-400'
                        : isHolderFormatValid
                        ? 'border-emerald-500 text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                        : 'border-slate-200 focus:border-[#01AFB5] focus:ring-1 focus:ring-[#01AFB5] text-slate-800'
                    }`}
                  />

                  {isHolderInvalid && (
                    <p className="text-[11px] font-medium text-rose-600 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{getHolderError()}</span>
                    </p>
                  )}
                </div>

                {/* 3. Expiration Date & CVV Row */}
                <div className="grid grid-cols-2 gap-3.5">
                  {/* Expiration */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-slate-800">
                        Expiry Date <span className="text-rose-500">*</span>
                      </label>
                      {expiryValidation.isValid && (
                        <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 animate-in fade-in">
                          <Check className="w-3 h-3 stroke-[3]" /> Valid
                        </span>
                      )}
                    </div>

                    <input
                      type="text"
                      value={expiry}
                      onChange={handleExpiryChange}
                      onBlur={() => setTouched((p) => ({ ...p, expiry: true }))}
                      placeholder="MM/YY"
                      maxLength={5}
                      className={`w-full h-11 px-3.5 text-xs font-mono font-bold rounded-xl border transition outline-none bg-slate-50/70 focus:bg-white ${
                        isExpiryInvalid
                          ? 'border-rose-400 text-rose-900 bg-rose-50/20 focus:border-rose-400 focus:ring-1 focus:ring-rose-400'
                          : expiryValidation.isValid
                          ? 'border-emerald-500 text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                          : 'border-slate-200 focus:border-[#01AFB5] focus:ring-1 focus:ring-[#01AFB5] text-slate-800'
                      }`}
                    />

                    {isExpiryInvalid && (
                      <p className="text-[11px] font-medium text-rose-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{getExpiryError()}</span>
                      </p>
                    )}
                  </div>

                  {/* CVV / CVC */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-slate-800">
                        {detectedBrand === 'american-express' ? '4-Digit CID' : '3-Digit CVV'}{' '}
                        <span className="text-rose-500">*</span>
                      </label>
                      {cvvValidation.isValid && cvv.length === maxCvvLength && (
                        <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 animate-in fade-in">
                          <Check className="w-3 h-3 stroke-[3]" /> Valid
                        </span>
                      )}
                    </div>

                    <input
                      type="password"
                      value={cvv}
                      onChange={handleCvvChange}
                      onBlur={() => setTouched((p) => ({ ...p, cvv: true }))}
                      placeholder={detectedBrand === 'american-express' ? '1234' : '123'}
                      maxLength={maxCvvLength}
                      className={`w-full h-11 px-3.5 text-xs font-mono font-bold rounded-xl border transition outline-none bg-slate-50/70 focus:bg-white tracking-widest ${
                        isCvvInvalid
                          ? 'border-rose-400 text-rose-900 bg-rose-50/20 focus:border-rose-400 focus:ring-1 focus:ring-rose-400'
                          : cvvValidation.isValid && cvv.length === maxCvvLength
                          ? 'border-emerald-500 text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                          : 'border-slate-200 focus:border-[#01AFB5] focus:ring-1 focus:ring-[#01AFB5] text-slate-800'
                      }`}
                    />

                    {isCvvInvalid && (
                      <p className="text-[11px] font-medium text-rose-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{getCvvError()}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Form Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 transition cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={
                      isSaving ||
                      !isLuhnValid ||
                      !isCardNumberComplete ||
                      !isHolderFormatValid ||
                      !expiryValidation.isValid ||
                      !cvvValidation.isValid ||
                      cvv.length < maxCvvLength
                    }
                    className={`px-6 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-xs cursor-pointer ${
                      isLuhnValid &&
                      isCardNumberComplete &&
                      isHolderFormatValid &&
                      expiryValidation.isValid &&
                      cvvValidation.isValid &&
                      cvv.length === maxCvvLength &&
                      !isSaving
                        ? 'bg-[#01AFB5] hover:bg-[#009da2] text-white shadow-md'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {isSaving ? (
                      <span>Verifying with PCI-Vault...</span>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Save Card Securely</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Security Note Footer */}
      <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-start gap-3 text-xs text-slate-600">
        <Lock className="w-4 h-4 text-[#01AFB5] mt-0.5 shrink-0" />
        <div className="space-y-0.5 text-[11px] leading-relaxed">
          <strong className="font-semibold text-slate-800 block">
            PCI-DSS Level 1 Certified Tokenization
          </strong>
          <p>
            Your card details are tokenized with 256-bit AES encryption conforming to RBI tokenization mandates and international PCI-DSS Level 1 standards. CVV is never stored on our servers.
          </p>
        </div>
      </div>
    </div>
  );
};
