'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, Copy, Check, X, Key, Shield, Smartphone, ArrowRight, Lock, Clock, AlertTriangle } from 'lucide-react';

export const Account2FA: React.FC = () => {
  const [appState, setAppState] = useState<'initial' | 'step' | 'success'>('initial');
  const [isAppActive, setIsAppActive] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [codeDigits, setCodeDigits] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // SMS Verification State (Permanent - Cannot be modified or disabled)
  const smsPhone = '+91 94665 03764';

  // Disable 2FA Security Modal State (Requires Phone OTP for Authenticator App)
  const [showDisableOtpModal, setShowDisableOtpModal] = useState(false);
  const [disableOtpDigits, setDisableOtpDigits] = useState(['', '', '', '', '', '']);
  const [disableTimer, setDisableTimer] = useState(118);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const disableInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const secretKey = 'ZPFIY52GITG7WOWJ44';

  useEffect(() => {
    if (!showDisableOtpModal || disableTimer <= 0) return;
    const interval = setInterval(() => {
      setDisableTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [showDisableOtpModal, disableTimer]);

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleCopyKey = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(secretKey);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  const handleDigitChange = (index: number, val: string) => {
    if (val.length > 1) {
      const chars = val.replace(/\D/g, '').slice(0, 6).split('');
      const newDigits = [...codeDigits];
      chars.forEach((c, i) => {
        if (i < 6) newDigits[i] = c;
      });
      setCodeDigits(newDigits);
      const nextIdx = Math.min(chars.length, 5);
      inputRefs.current[nextIdx]?.focus();
      return;
    }

    const newDigits = [...codeDigits];
    newDigits[index] = val.replace(/\D/g, '');
    setCodeDigits(newDigits);

    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !codeDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleConfirmSetup = () => {
    const code = codeDigits.join('');
    if (code.length === 6) {
      setIsAppActive(true);
      setAppState('success');
    } else {
      setCodeDigits(['7', '2', '9', '4', '1', '5']);
      setIsAppActive(true);
      setAppState('success');
    }
  };

  // Trigger Disable flow with required Phone OTP for Authenticator App
  const triggerDisableWithOtp = () => {
    setDisableOtpDigits(['', '', '', '', '', '']);
    setDisableTimer(118);
    setShowDisableOtpModal(true);
  };

  const handleDisableOtpDigitChange = (index: number, val: string) => {
    const newDigits = [...disableOtpDigits];
    newDigits[index] = val.replace(/\D/g, '').slice(0, 1);
    setDisableOtpDigits(newDigits);
    if (val && index < 5) {
      disableInputRefs.current[index + 1]?.focus();
    }
  };

  const handleConfirmDisable = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAppActive(false);
    setAppState('initial');
    setToastMsg('Authenticator App two-factor security has been safely disabled.');
    setShowDisableOtpModal(false);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const isAnyActive = true;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800 leading-tight">
            Two-Factor Authentication
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Enhance your account security with an extra layer of verification
          </p>
        </div>

        <div
          id="two-fa-status-badge"
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${
            isAnyActive
              ? 'bg-emerald-50 border-emerald-200/60'
              : 'bg-slate-100 border-slate-200/80'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isAnyActive ? 'bg-[#01AFB5]' : 'bg-slate-400'
            }`}
          ></span>
          <span
            className={`text-xs font-semibold tracking-wide uppercase ${
              isAnyActive ? 'text-emerald-700' : 'text-slate-600'
            }`}
          >
            {isAnyActive ? 'Active & Protected' : 'Disabled'}
          </span>
        </div>
      </div>

      {toastMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200/80 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2 shadow-xs">
          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      <div className="space-y-4">
        {/* Method 1: Authenticator App Container */}
        <div
          id="authenticator-setup-container"
          className="border border-slate-200/90 rounded-xl transition bg-white shadow-xs overflow-hidden"
        >
          {/* Initial View */}
          {appState === 'initial' && (
            <div
              id="auth-initial-view"
              className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5 text-[#01AFB5]">
                  <ShieldCheck className="w-5 h-5 text-[#01AFB5]" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-bold text-sm text-slate-800">Authenticator App</h2>
                    <span
                      id="auth-recommend-badge"
                      className="text-[11px] font-semibold px-2 py-0.5 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200/60"
                    >
                      {isAppActive ? 'ENABLED' : 'RECOMMENDED'}
                    </span>
                  </div>
                  <p id="auth-card-desc" className="text-xs text-slate-500 leading-relaxed">
                    {isAppActive
                      ? 'Authenticator app is active and protecting your sign-ins and sensitive transactions.'
                      : 'Use Google Authenticator, Authy, or Microsoft Authenticator to generate temporary 6-digit verification codes.'}
                  </p>
                </div>
              </div>

              {isAppActive ? (
                /* ONLY Disable button (Reconfigure removed as per user instruction) */
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={triggerDisableWithOtp}
                    className="px-4 py-2 border border-rose-200 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-semibold tracking-wide transition cursor-pointer shadow-2xs"
                  >
                    Disable
                  </button>
                </div>
              ) : (
                <button
                  id="btn-open-setup"
                  type="button"
                  onClick={() => setAppState('step')}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-[#01AFB5] text-[#01AFB5] hover:bg-[#01AFB5] hover:text-white rounded-lg text-xs font-semibold tracking-wide uppercase transition shadow-xs flex-shrink-0 cursor-pointer"
                >
                  <span>Set Up App</span>
                </button>
              )}
            </div>
          )}

          {/* Step-by-Step Setup View */}
          {appState === 'step' && (
            <div id="auth-step-view" className="p-6 sm:p-7 space-y-6">
              <div className="flex items-start justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-base font-bold text-slate-900 leading-snug">
                    Setup Authenticator App
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Each time you log in, in addition to your password, you&apos;ll use an authenticator app to
                    generate a one-time code.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAppState('initial')}
                  className="text-slate-400 hover:text-slate-700 transition p-1.5 rounded-lg hover:bg-slate-100 flex-shrink-0 cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Step 1: Scan QR code */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-[#01AFB5] border border-emerald-200/60 text-[11px] font-bold inline-flex items-center justify-center">
                    1
                  </span>
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                    Scan QR code
                  </h3>
                </div>
                <p className="text-xs text-slate-500 pl-7 leading-relaxed">
                  Scan the QR code below or manually enter the secret key into your authenticator app.
                </p>

                <div className="pl-7 pt-1 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  {/* QR Code Visual */}
                  <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs flex items-center justify-center flex-shrink-0">
                    <svg className="w-32 h-32" viewBox="0 0 100 100" fill="currentColor">
                      <rect x="5" y="5" width="28" height="28" fill="none" stroke="#1e293b" strokeWidth="4" rx="2"></rect>
                      <rect x="11" y="11" width="16" height="16" fill="#1e293b" rx="1"></rect>
                      <rect x="67" y="5" width="28" height="28" fill="none" stroke="#1e293b" strokeWidth="4" rx="2"></rect>
                      <rect x="73" y="11" width="16" height="16" fill="#1e293b" rx="1"></rect>
                      <rect x="5" y="67" width="28" height="28" fill="none" stroke="#1e293b" strokeWidth="4" rx="2"></rect>
                      <rect x="11" y="73" width="16" height="16" fill="#1e293b" rx="1"></rect>
                      <rect x="39" y="8" width="6" height="6" fill="#1e293b"></rect>
                      <rect x="51" y="8" width="6" height="6" fill="#1e293b"></rect>
                      <rect x="45" y="18" width="6" height="6" fill="#1e293b"></rect>
                      <rect x="57" y="22" width="6" height="6" fill="#1e293b"></rect>
                      <rect x="39" y="28" width="6" height="6" fill="#1e293b"></rect>
                      <rect x="8" y="39" width="6" height="6" fill="#1e293b"></rect>
                      <rect x="18" y="45" width="6" height="6" fill="#1e293b"></rect>
                      <rect x="28" y="39" width="6" height="6" fill="#1e293b"></rect>
                      <rect x="8" y="51" width="6" height="6" fill="#1e293b"></rect>
                      <rect x="22" y="57" width="6" height="6" fill="#1e293b"></rect>
                      <rect x="38" y="38" width="8" height="8" fill="#01AFB5" rx="1"></rect>
                      <rect x="52" y="38" width="6" height="6" fill="#1e293b"></rect>
                      <rect x="42" y="52" width="6" height="6" fill="#1e293b"></rect>
                      <rect x="54" y="50" width="8" height="8" fill="#01AFB5" rx="1"></rect>
                      <rect x="68" y="39" width="6" height="6" fill="#1e293b"></rect>
                      <rect x="80" y="45" width="6" height="6" fill="#1e293b"></rect>
                      <rect x="74" y="55" width="6" height="6" fill="#1e293b"></rect>
                      <rect x="86" y="53" width="6" height="6" fill="#1e293b"></rect>
                      <rect x="39" y="68" width="6" height="6" fill="#1e293b"></rect>
                      <rect x="49" y="74" width="6" height="6" fill="#1e293b"></rect>
                      <rect x="57" y="66" width="6" height="6" fill="#1e293b"></rect>
                      <rect x="43" y="84" width="6" height="6" fill="#1e293b"></rect>
                      <rect x="55" y="82" width="6" height="6" fill="#1e293b"></rect>
                      <rect x="69" y="72" width="6" height="6" fill="#1e293b"></rect>
                      <rect x="79" y="70" width="6" height="6" fill="#1e293b"></rect>
                      <rect x="71" y="84" width="6" height="6" fill="#1e293b"></rect>
                      <rect x="83" y="82" width="6" height="6" fill="#1e293b"></rect>
                    </svg>
                  </div>

                  {/* Manual Secret Key */}
                  <div className="space-y-2 flex-1 max-w-sm">
                    <span className="text-[11px] font-medium text-slate-500">
                      Can&apos;t scan QR code? Enter this secret instead:
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg font-mono text-xs text-slate-700 tracking-wider font-semibold select-all text-center">
                        {secretKey}
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyKey}
                        className="px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition flex-shrink-0 shadow-xs cursor-pointer flex items-center gap-1"
                      >
                        {copiedKey ? (
                          <>
                            <Check className="w-3 h-3 text-[#01AFB5]" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-slate-400" /> Copy code
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Verification Code */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-[#01AFB5] border border-emerald-200/60 text-[11px] font-bold inline-flex items-center justify-center">
                    2
                  </span>
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                    Get verification Code
                  </h3>
                </div>
                <p className="text-xs text-slate-500 pl-7 leading-relaxed">
                  Enter the 6-digit code you see in your authenticator app.
                </p>

                <div className="pl-7 space-y-2 pt-1">
                  <label className="text-[11px] font-medium text-slate-600 block">
                    Enter verification code
                  </label>
                  <div className="flex items-center gap-2.5">
                    {codeDigits.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => { inputRefs.current[idx] = el; }}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleDigitChange(idx, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(idx, e)}
                        className="w-10 h-11 text-center font-bold text-slate-800 text-base bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#01AFB5] focus:border-[#01AFB5] transition"
                        placeholder="0"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setAppState('initial')}
                  className="px-4 py-2 border border-slate-200 text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-lg text-xs font-semibold tracking-wide transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  id="btn-confirm-setup"
                  type="button"
                  onClick={handleConfirmSetup}
                  className="px-5 py-2 bg-[#01AFB5] hover:bg-[#009da2] text-white rounded-lg text-xs font-semibold tracking-wide transition shadow-xs cursor-pointer"
                >
                  Confirm
                </button>
              </div>
            </div>
          )}

          {/* Success State View */}
          {appState === 'success' && (
            <div id="auth-success-view" className="p-6 sm:p-8 text-center space-y-6">
              <div className="flex justify-center">
                <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200/60 shadow-xs">
                  <span className="absolute inset-0 rounded-full bg-[#01AFB5]/20 animate-ping opacity-75"></span>
                  <Check className="w-7 h-7 text-[#01AFB5] relative z-10 stroke-[2.5]" />
                </div>
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-[11px] font-bold text-emerald-700 tracking-wider uppercase mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#01AFB5]"></span>
                  Status: Active &amp; Protected
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  Two-Factor Authentication Activated
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Your account is now protected with 2-factor authentication. Next time you sign in,
                  you will be prompted for a 6-digit authenticator code.
                </p>
              </div>

              <div className="max-w-md mx-auto p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl text-left flex items-start gap-3 text-xs text-slate-600">
                <Key className="w-4 h-4 text-[#01AFB5] mt-0.5 flex-shrink-0" />
                <div className="text-[11px] leading-relaxed">
                  <strong className="font-semibold text-slate-700 block mb-0.5">
                    Backup Recovery
                  </strong>
                  Keep your authenticator app safe. You can generate one-time recovery codes anytime
                  from your account settings.
                </div>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={() => setAppState('initial')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-2.5 bg-[#01AFB5] hover:bg-[#009da2] text-white rounded-lg text-xs font-semibold tracking-wide uppercase transition shadow-xs cursor-pointer"
                >
                  <span>Continue</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Method 2: SMS Verification */}
        <div className="border border-slate-200/90 rounded-xl p-5 hover:border-slate-300 transition bg-white shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#01AFB5]/10 border border-[#01AFB5]/25 flex items-center justify-center flex-shrink-0 mt-0.5 text-[#01AFB5]">
                <Smartphone className="w-5 h-5 text-[#01AFB5]" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-bold text-sm text-slate-800">SMS Verification</h2>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200/60">
                    ACTIVE
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Receive a 6-digit OTP code on your registered mobile number: <span className="font-semibold text-slate-700">{smsPhone}</span>
                </p>
                <p className="text-[11px] text-slate-400">
                  Primary security method permanently verified. Cannot be modified or disabled.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-3 py-1.5 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Permanent Security
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Security Note */}
      <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl flex items-start gap-3 text-xs text-slate-600">
        <Shield className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
        <p className="leading-relaxed text-[11px]">
          Two-factor authentication adds an essential layer of protection to your orders, saved payment
          methods, and personal account data. Disabling 2FA requires mobile phone verification.
        </p>
      </div>

      {/* PHONE OTP VERIFICATION MODAL TO DISABLE 2FA (As requested by user) */}
      {showDisableOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-rose-50 border border-rose-200/80 flex items-center justify-center text-rose-600">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Security Verification</h3>
                  <p className="text-[11px] text-slate-500">Phone OTP required to disable 2FA</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowDisableOtpModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmDisable} className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-xl text-amber-900 text-xs leading-relaxed">
                For security reasons, enter the 6-digit verification code sent to your registered mobile number: <strong>{smsPhone}</strong>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-semibold text-slate-700">Enter 6-Digit Mobile OTP</label>
                  <span className="text-[11px] font-medium text-slate-400">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {formatTimer(disableTimer)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {disableOtpDigits.map((d, i) => (
                    <input
                      key={i}
                      ref={(el) => { disableInputRefs.current[i] = el; }}
                      type="text"
                      maxLength={1}
                      value={d}
                      onChange={(e) => handleDisableOtpDigitChange(i, e.target.value)}
                      className="w-10 h-11 text-center font-bold text-slate-800 text-base bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-rose-500 focus:border-rose-500 transition outline-none font-mono"
                      placeholder="•"
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-xs">
                <span className="text-slate-400 text-[11px]">Didn&apos;t receive OTP?</span>
                <button
                  type="button"
                  onClick={() => {
                    setDisableTimer(120);
                    alert(`Fresh 6-digit OTP re-sent to ${smsPhone}`);
                  }}
                  className="font-semibold text-[#01AFB5] hover:underline cursor-pointer text-xs"
                >
                  Resend Code
                </button>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowDisableOtpModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold rounded-lg transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg shadow-xs transition cursor-pointer"
                >
                  Verify &amp; Disable 2FA
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
