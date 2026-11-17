'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Check, Key, Shield, Clock, ArrowRight } from 'lucide-react';

interface AccountChangeEmailProps {
  currentEmail?: string;
  onEmailUpdated?: (newEmail: string) => void;
}

export const AccountChangeEmail: React.FC<AccountChangeEmailProps> = ({
  currentEmail = 'dipanshu@example.com',
  onEmailUpdated,
}) => {
  const [newEmail, setNewEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [verificationMethod, setVerificationMethod] = useState<'old-email' | '2fa'>('old-email');
  const [code, setCode] = useState('');
  const [timerSeconds, setTimerSeconds] = useState(299); // 04:59
  const [isResending, setIsResending] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (timerSeconds <= 0) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timerSeconds]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleResendCode = () => {
    setIsResending(true);
    setTimeout(() => {
      setTimerSeconds(300);
      setIsResending(false);
      setToastMessage('A fresh verification code has been dispatched.');
      setTimeout(() => setToastMessage(null), 3500);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || !confirmEmail) {
      alert('Please fill out both email fields.');
      return;
    }
    if (newEmail !== confirmEmail) {
      alert('New email address and confirmation do not match.');
      return;
    }
    if (!code) {
      alert('Please enter your 6-digit verification code.');
      return;
    }

    onEmailUpdated?.(newEmail);
    setToastMessage(`Email address successfully changed to ${newEmail}!`);
    setNewEmail('');
    setConfirmEmail('');
    setCode('');
    setTimeout(() => setToastMessage(null), 4000);
  };

  const maskedEmail =
    currentEmail.length > 5
      ? `${currentEmail.slice(0, 3)}•••@${currentEmail.split('@')[1] || 'example.com'}`
      : currentEmail;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-5 border-b border-slate-100">
        <h1 className="text-xl font-semibold text-slate-900 leading-tight">Change Email</h1>
        <p className="text-xs text-slate-500 mt-1">
          Update your registered email address and verification preferences
        </p>
      </div>

      {toastMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200/80 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Current Email Display Card */}
      <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
            Current Email Address
          </span>
          <span className="text-sm font-semibold text-slate-800">{currentEmail}</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-medium rounded-full self-start sm:self-auto">
          <Check className="w-3.5 h-3.5 text-[#14cda8]" />
          <span>Verified</span>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* New Email */}
        <div className="space-y-1.5">
          <label htmlFor="new-email" className="block text-xs font-semibold text-slate-700">
            New Email Address
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 pointer-events-none text-slate-400 flex items-center">
              <Mail className="w-3.5 h-3.5" />
            </div>
            <input
              type="email"
              id="new-email"
              required
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Enter new email address"
              className="w-full h-10 pl-10 pr-4 text-xs bg-white text-slate-800 placeholder-slate-400 rounded-lg border border-slate-200 focus:border-[#14cda8] focus:ring-1 focus:ring-[#14cda8] transition outline-none"
            />
          </div>
          <p className="text-[11px] text-slate-400">We will send a 6-digit verification code to this address.</p>
        </div>

        {/* Confirm Email */}
        <div className="space-y-1.5" id="security-verification-section">
          <label htmlFor="confirm-email" className="block text-xs font-semibold text-slate-700">
            Confirm New Email Address
          </label>
          <div id="email-otp-panel" className="relative flex items-center">
            <div className="absolute left-3.5 pointer-events-none text-slate-400 flex items-center">
              <Mail className="w-3.5 h-3.5" />
            </div>
            <input
              type="email"
              id="confirm-email"
              required
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              placeholder="Re-enter new email address"
              className="w-full h-10 pl-10 pr-4 text-xs bg-white text-slate-800 placeholder-slate-400 rounded-lg border border-slate-200 focus:border-[#14cda8] focus:ring-1 focus:ring-[#14cda8] transition outline-none"
            />
          </div>
        </div>

        {/* Identity Verification Method Selector */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-slate-700">Identity Verification</label>
            <span className="text-[11px] text-slate-400 font-medium">Choose 1 of 2 methods</span>
          </div>

          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              id="method-email-btn"
              onClick={() => setVerificationMethod('old-email')}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition cursor-pointer ${
                verificationMethod === 'old-email'
                  ? 'bg-white text-slate-800 shadow-xs border border-slate-200/60'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Mail className="w-3.5 h-3.5 text-[#14cda8]" />
              <span>Old Email Code</span>
            </button>
            <button
              type="button"
              id="method-2fa-btn"
              onClick={() => setVerificationMethod('2fa')}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition cursor-pointer ${
                verificationMethod === '2fa'
                  ? 'bg-white text-slate-800 shadow-xs border border-slate-200/60'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Key className="w-3.5 h-3.5 text-slate-500" />
              <span>Authenticator (2FA)</span>
            </button>
          </div>

          {/* Old Email OTP View */}
          {verificationMethod === 'old-email' && (
            <div id="view-email-otp" className="space-y-2 p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">
                  Code sent to <span className="font-semibold text-slate-800">{maskedEmail}</span>
                </span>
                <span className="text-[11px] font-medium text-slate-400">
                  <Clock className="w-3 h-3 inline mr-1" />
                  Expires in <span className="text-emerald-700 font-semibold">{formatTimer(timerSeconds)}</span>
                </span>
              </div>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 pointer-events-none text-slate-400 flex items-center">
                  <Shield className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <input
                  type="text"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="w-full h-10 pl-10 pr-24 text-xs font-mono tracking-widest bg-white text-slate-800 placeholder-slate-400 rounded-lg border border-slate-200 focus:border-[#14cda8] focus:ring-1 focus:ring-[#14cda8] transition outline-none"
                />
                <button
                  type="button"
                  disabled={isResending}
                  onClick={handleResendCode}
                  className="absolute right-2 px-2.5 py-1 text-[11px] font-semibold text-[#14cda8] hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition cursor-pointer disabled:opacity-50"
                >
                  {isResending ? 'Sending...' : 'Resend Code'}
                </button>
              </div>
              <p className="text-[11px] text-slate-400">
                Check your inbox or spam folder for the one-time verification passcode.
              </p>
            </div>
          )}

          {/* 2FA OTP View */}
          {verificationMethod === '2fa' && (
            <div id="view-2fa-otp" className="space-y-2 p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Enter 6-Digit Authenticator Code</span>
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium border border-emerald-200/80">
                  <Shield className="w-3 h-3" />
                  2FA Active
                </span>
              </div>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 pointer-events-none text-slate-400 flex items-center">
                  <Key className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <input
                  type="text"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="000 000"
                  className="w-full h-10 pl-10 pr-4 text-xs font-mono tracking-widest bg-white text-slate-800 placeholder-slate-400 rounded-lg border border-slate-200 focus:border-[#14cda8] focus:ring-1 focus:ring-[#14cda8] transition outline-none"
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Open Google Authenticator, 1Password, or Authy on your mobile device to view your dynamic code.
              </p>
            </div>
          )}
        </div>

        {/* Security Alert Note */}
        <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl flex items-start gap-3 text-xs text-slate-600">
          <Shield className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
          <p className="leading-relaxed text-[11px]">
            For your security, a verification link and security notification will be dispatched to both addresses.
            You must verify the new email within 24 hours to finalize the change.
          </p>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => {
              setNewEmail('');
              setConfirmEmail('');
              setCode('');
            }}
            className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-[#14cda8] hover:bg-emerald-600 text-white text-xs font-semibold shadow-xs transition inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Update Email</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
};
