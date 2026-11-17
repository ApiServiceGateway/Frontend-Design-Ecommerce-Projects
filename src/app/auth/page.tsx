'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  Eye, 
  EyeOff, 
  KeyRound, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  Lock,
  Mail,
  UserCheck
} from 'lucide-react';
import { StorefrontHeader } from '@/components/layout/StorefrontHeader';
import { StorefrontFooter } from '@/components/layout/StorefrontFooter';

type AuthView = 'login' | 'register' | 'forgot';

export default function AuthPage() {
  const router = useRouter();
  const [view, setView] = useState<AuthView>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg('Signed in successfully! Redirecting to account...');
      setTimeout(() => {
        router.push('/account');
      }, 1000);
    }, 800);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg('Account created successfully! Welcome to BOS Atelier.');
      setTimeout(() => {
        router.push('/account');
      }, 1000);
    }, 900);
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSent(true);
    setTimeout(() => {
      setResetSent(false);
    }, 6000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F7] text-gray-800 antialiased font-sans">
      <StorefrontHeader />

      <main className="flex-1 flex items-center justify-center px-4 py-8 md:py-14">
        <div 
          className="w-full max-w-[1020px] bg-white rounded-3xl overflow-hidden shadow-[0_25px_70px_-15px_rgba(0,0,0,0.08),0_10px_25px_-10px_rgba(0,0,0,0.04)] flex flex-col md:flex-row min-h-[640px] border border-gray-100"
          data-purpose="auth-container"
        >
          {/* Left Form Column */}
          <section className="w-full md:w-1/2 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-white relative">
            <div className="max-w-sm w-full mx-auto">
              
              {/* Flash Success Message */}
              {successMsg && (
                <div className="mb-6 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2.5 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* 1. LOGIN PANEL */}
              {view === 'login' && (
                <div className="animate-fadeIn">
                  <header className="mb-6">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-1.5">Welcome</h1>
                    <p className="text-xs sm:text-sm text-gray-500 font-normal leading-relaxed">
                      Get started for a seamless luxury shopping &amp; discreet delivery experience.
                    </p>
                  </header>

                  {/* Social Logins */}
                  <div className="grid grid-cols-2 gap-3 mb-6" data-purpose="social-auth-buttons">
                    <button 
                      type="button" 
                      onClick={() => handleLogin({ preventDefault: () => {} } as any)}
                      className="flex items-center justify-center gap-2.5 py-2.5 px-4 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-2xs"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                      </svg>
                      <span>Google</span>
                    </button>

                    <button 
                      type="button" 
                      onClick={() => handleLogin({ preventDefault: () => {} } as any)}
                      className="flex items-center justify-center gap-2.5 py-2.5 px-4 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-2xs"
                    >
                      <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span>Facebook</span>
                    </button>
                  </div>

                  {/* Hairline Divider */}
                  <div className="relative flex items-center justify-center mb-5">
                    <div className="border-t border-gray-200 w-full"></div>
                    <span className="bg-white px-3 text-[10px] font-bold tracking-widest text-gray-400 absolute uppercase">OR</span>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5" htmlFor="login-email">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          id="login-email"
                          type="email"
                          required
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          placeholder="johndoe@example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00C9A7]/30 focus:border-[#00C9A7] transition-all text-gray-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5" htmlFor="login-password">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          id="login-password"
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="At least 8 characters"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00C9A7]/30 focus:border-[#00C9A7] transition-all text-gray-800 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      <div className="flex justify-end mt-1.5">
                        <button
                          type="button"
                          onClick={() => setView('forgot')}
                          className="text-[11px] font-semibold text-[#FF3F6C] hover:underline"
                        >
                          Forgot password?
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#00C9A7] hover:bg-[#00B596] active:scale-[0.99] text-white py-3 px-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md shadow-[#00C9A7]/20 flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        <span>Sign In</span>
                      )}
                    </button>
                  </form>

                  <p className="mt-6 text-center text-xs text-gray-500 font-medium">
                    Don&apos;t have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setView('register')}
                      className="text-[#FF3F6C] font-bold hover:underline ml-1"
                    >
                      Register
                    </button>
                  </p>
                </div>
              )}

              {/* 2. REGISTER PANEL */}
              {view === 'register' && (
                <div className="animate-fadeIn">
                  <header className="mb-5">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-1.5">Create Account</h1>
                    <p className="text-xs sm:text-sm text-gray-500 font-normal leading-relaxed">
                      Join BOS Unlimited for discreet allocation drops &amp; members-only perks.
                    </p>
                  </header>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <button 
                      type="button" 
                      onClick={() => handleRegister({ preventDefault: () => {} } as any)}
                      className="flex items-center justify-center gap-2 py-2 px-3 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-2xs"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                      </svg>
                      <span>Google</span>
                    </button>
                    <button 
                      type="button" 
                      onClick={() => handleRegister({ preventDefault: () => {} } as any)}
                      className="flex items-center justify-center gap-2 py-2 px-3 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-2xs"
                    >
                      <svg className="w-3.5 h-3.5 fill-[#1877F2]" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span>Facebook</span>
                    </button>
                  </div>

                  <div className="relative flex items-center justify-center mb-4">
                    <div className="border-t border-gray-200 w-full"></div>
                    <span className="bg-white px-3 text-[10px] font-bold tracking-widest text-gray-400 absolute uppercase">OR</span>
                  </div>

                  <form onSubmit={handleRegister} className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1" htmlFor="reg-name">
                        Full Name
                      </label>
                      <input
                        id="reg-name"
                        type="text"
                        required
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="Jane Doe"
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00C9A7]/30 focus:border-[#00C9A7] transition-all text-gray-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1" htmlFor="reg-email">
                        Email Address
                      </label>
                      <input
                        id="reg-email"
                        type="email"
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="janedoe@example.com"
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00C9A7]/30 focus:border-[#00C9A7] transition-all text-gray-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1" htmlFor="reg-password">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          id="reg-password"
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          placeholder="At least 8 characters"
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00C9A7]/30 focus:border-[#00C9A7] transition-all text-gray-800 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1" htmlFor="reg-confirm">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          id="reg-confirm"
                          type={showConfirmPassword ? 'text' : 'password'}
                          required
                          value={regConfirmPassword}
                          onChange={(e) => setRegConfirmPassword(e.target.value)}
                          placeholder="Confirm your password"
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00C9A7]/30 focus:border-[#00C9A7] transition-all text-gray-800 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#00C9A7] hover:bg-[#00B596] text-white py-2.5 px-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md shadow-[#00C9A7]/20"
                      >
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                      </button>
                    </div>
                  </form>

                  <p className="mt-4 text-center text-xs text-gray-500 font-medium">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setView('login')}
                      className="text-[#FF3F6C] font-bold hover:underline ml-1"
                    >
                      Login
                    </button>
                  </p>
                </div>
              )}

              {/* 3. FORGOT PASSWORD PANEL */}
              {view === 'forgot' && (
                <div className="animate-fadeIn">
                  <header className="mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-teal-50 text-[#00C9A7] flex items-center justify-center mb-3">
                      <KeyRound className="w-5 h-5" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mb-1.5">
                      Reset Password
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 font-normal leading-relaxed">
                      Enter your registered email and we&apos;ll send you an encrypted token to reset your password.
                    </p>
                  </header>

                  <form onSubmit={handleReset} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5" htmlFor="reset-email">
                        Email Address
                      </label>
                      <input
                        id="reset-email"
                        type="email"
                        required
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        placeholder="johndoe@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00C9A7]/30 focus:border-[#00C9A7] transition-all text-gray-800"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-[#00C9A7] hover:bg-[#00B596] text-white py-3 px-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md shadow-[#00C9A7]/20"
                      >
                        Send Reset Link
                      </button>
                    </div>

                    {resetSent && (
                      <div className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Reset link sent! Please check your inbox.</span>
                      </div>
                    )}
                  </form>

                  <div className="mt-6 text-center">
                    <button
                      type="button"
                      onClick={() => setView('login')}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-black transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Login</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Discreet Security Footer Notice */}
              <div className="mt-8 pt-5 border-t border-gray-100 flex items-center justify-center gap-2 text-[11px] text-gray-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-Bit SSL Encrypted &bull; 100% Zero-Trace Discreet Sessions</span>
              </div>

            </div>
          </section>

          {/* Right Showcase Column (From Stitch Design) */}
          <aside 
            className="w-full md:w-1/2 relative overflow-hidden flex flex-col justify-end bg-gray-900 min-h-[380px] md:min-h-full"
            data-purpose="product-visual-showcase"
          >
            <img 
              alt="High-fashion editorial model posing in luxury minimalist studio apparel" 
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-95" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtItHn7LjbA2eq4Z0x1vRiPBdYMWWjEm-NIH8zCFAvv4raDthNJbMI8IruokXxeDBAiXV0PWroyr35KTdOoZXDFIOWow3oqJQgw0zFDQ_RsWd-u5iQ7expKZkIcFbHtSs7R1ltYMuU7P5TDTKhyuhMp03U7drul3oz2lgX6Lzlk-Dz8hdNBJJLtx1A4956GBJPYt7j7d_R9OuAw3aKZzimgdrr1nwAlbFBbrD3Hw"
            />
            
            {/* Atmospheric overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 pointer-events-none" />

            <div className="relative z-10 p-8 sm:p-10 lg:p-12 text-white">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[11px] font-bold tracking-widest uppercase mb-3 border border-white/30 text-white">
                <Sparkles className="w-3 h-3 text-amber-300" />
                Atelier Haute Couture
              </span>
              
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2 leading-tight">
                Autumn / Winter Collection
              </h2>
              
              <p className="text-xs sm:text-sm text-gray-200 font-normal leading-relaxed max-w-sm mb-6">
                Discover bespoke garments crafted with pristine tailoring and timeless elegance. Guaranteed anonymous blind-box dispatch on every order.
              </p>

              {/* Badges */}
              <div className="flex items-center gap-3 text-[11px] text-white/90">
                <span className="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-[#00C9A7]" /> Plain Parcel
                </span>
                <span className="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1.5">
                  <UserCheck className="w-3 h-3 text-[#00C9A7]" /> VIP Member Access
                </span>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <StorefrontFooter />
    </div>
  );
}
