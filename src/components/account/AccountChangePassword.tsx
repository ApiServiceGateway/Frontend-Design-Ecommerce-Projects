'use client';

import React, { useState, useEffect } from 'react';
import { Lock, Shield, Key, Eye, EyeOff, CheckCircle2, Clock, Check, LogOut } from 'lucide-react';

export const AccountChangePassword: React.FC = () => {
  const [method, setMethod] = useState<'current-password' | 'otp'>('otp');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(118); // 01:58
  const [isResending, setIsResending] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Timer countdown
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

  const handleResendOtp = () => {
    setIsResending(true);
    setTimeout(() => {
      setTimerSeconds(120);
      setIsResending(false);
      setToastMessage('A fresh 6-digit OTP has been sent to your email and phone.');
      setTimeout(() => setToastMessage(null), 3500);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      alert('Please fill out all required fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match.');
      return;
    }
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters.');
      return;
    }

    setToastMessage('Password updated successfully! Active sessions have been refreshed.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setOtpCode('');
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Password requirement checks
  const hasMinLength = newPassword.length >= 8;
  const hasUpperAndNum = /[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword);
  const hasSpecial = /[^A-Za-z0-9]/.test(newPassword);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-5 border-b border-slate-100">
        <h1 className="text-xl font-bold text-slate-800 leading-tight">Change Password</h1>
        <p className="text-xs text-slate-500 mt-1">
          Ensure your account stays secure by using a strong, unique password
        </p>
      </div>

      {toastMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200/80 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Method Switcher */}
        <div className="p-1 bg-slate-100 rounded-xl flex items-center gap-1 mb-2 text-xs font-medium">
          <button
            type="button"
            onClick={() => setMethod('current-password')}
            className={`flex-1 py-2 px-3 rounded-lg transition text-center flex items-center justify-center gap-1.5 cursor-pointer ${
              method === 'current-password'
                ? 'bg-white text-slate-800 shadow-xs font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Current Password</span>
          </button>
          <button
            type="button"
            onClick={() => setMethod('otp')}
            className={`flex-1 py-2 px-3 rounded-lg transition text-center flex items-center justify-center gap-1.5 cursor-pointer ${
              method === 'otp'
                ? 'bg-white text-slate-800 shadow-xs font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-[#14cda8]" />
            <span>Verify via OTP</span>
          </button>
        </div>

        {/* Option A: Verify via OTP Card */}
        {method === 'otp' ? (
          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#14cda8]"></span>
                <span className="text-xs font-semibold text-slate-700">Quick Verification via OTP</span>
              </div>
              <span className="text-[11px] text-slate-400">Sent to d•••@example.com</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Can&apos;t recall your current password? We can send a one-time verification passcode (OTP) to your verified phone or email.
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center">
              <div className="relative flex-1">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 flex items-center">
                  <Shield className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <input
                  type="text"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="Enter 6-digit OTP code"
                  className="w-full h-11 pl-10 pr-24 text-xs tracking-wider bg-white text-slate-800 rounded-lg border border-slate-200 focus:ring-1 focus:ring-[#14cda8] transition placeholder-slate-400"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatTimer(timerSeconds)}</span>
                </div>
              </div>
              <button
                type="button"
                disabled={isResending}
                onClick={handleResendOtp}
                className="h-11 px-4 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100/80 hover:text-slate-900 transition flex items-center justify-center gap-1.5 flex-shrink-0 cursor-pointer disabled:opacity-50"
              >
                <LogOut className="w-3.5 h-3.5 text-slate-400 rotate-180" />
                <span>{isResending ? 'Sending...' : 'Resend OTP'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Option B: Current Password Input */
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Current Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 pointer-events-none text-slate-400 flex items-center">
                <Key className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <input
                type={showCurrent ? 'text' : 'password'}
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-11 pl-10 pr-10 text-xs bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-800 rounded-lg border border-slate-200 focus:ring-1 focus:ring-[#14cda8] transition placeholder-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition cursor-pointer"
              >
                {showCurrent ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        )}

        {/* 2-Column Grid: New Password & Confirm Password */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              New Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 pointer-events-none text-slate-400 flex items-center">
                <Key className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <input
                type={showNew ? 'text' : 'password'}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-11 pl-10 pr-10 text-xs bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-800 rounded-lg border border-slate-200 focus:ring-1 focus:ring-[#14cda8] transition placeholder-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition cursor-pointer"
              >
                {showNew ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Confirm New Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 pointer-events-none text-slate-400 flex items-center">
                <Key className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <input
                type={showConfirm ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-11 pl-10 pr-10 text-xs bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-800 rounded-lg border border-slate-200 focus:ring-1 focus:ring-[#14cda8] transition placeholder-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition cursor-pointer"
              >
                {showConfirm ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Password Requirements */}
        <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
          <p className="text-xs font-semibold text-slate-700">Password Requirements</p>
          <ul className="text-[11px] text-slate-500 space-y-1.5">
            <li className="flex items-center gap-2">
              <CheckCircle2
                className={`w-3.5 h-3.5 ${
                  hasMinLength ? 'text-[#14cda8]' : 'text-slate-300'
                }`}
              />
              <span className={hasMinLength ? 'text-slate-800 font-medium' : ''}>
                Minimum 8 characters
              </span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2
                className={`w-3.5 h-3.5 ${
                  hasUpperAndNum ? 'text-[#14cda8]' : 'text-slate-300'
                }`}
              />
              <span className={hasUpperAndNum ? 'text-slate-800 font-medium' : ''}>
                At least one uppercase letter &amp; one number
              </span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2
                className={`w-3.5 h-3.5 ${
                  hasSpecial ? 'text-[#14cda8]' : 'text-slate-300'
                }`}
              />
              <span className={hasSpecial ? 'text-slate-800 font-medium' : ''}>
                At least one special symbol (@, #, $, etc.)
              </span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => {
              setCurrentPassword('');
              setNewPassword('');
              setConfirmPassword('');
              setOtpCode('');
            }}
            className="px-5 py-2.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-[#14cda8] hover:bg-[#11b896] text-white text-xs font-semibold shadow-xs transition inline-flex items-center gap-2 cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Update Password</span>
          </button>
        </div>
      </form>

      {/* Footer Security Note */}
      <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl flex items-start gap-3 text-xs text-slate-600">
        <Shield className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
        <p className="leading-relaxed text-[11px]">
          Password changes will invalidate active sessions on unrecognized devices. You may be asked
          to re-login.
        </p>
      </div>
    </div>
  );
};
