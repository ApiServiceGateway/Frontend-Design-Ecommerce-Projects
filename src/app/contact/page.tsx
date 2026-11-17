'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 py-10 px-4 sm:px-6 lg:px-[15%]">
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-black mb-4 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Contact Support
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Need assistance with your orders, discreet packaging, or crypto payment?
          </p>
        </div>

        {submitted ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h3 className="text-sm font-bold text-emerald-900">Message Dispatched Securely</h3>
            <p className="text-xs text-emerald-700">
              Our concierge team will respond within 4–6 business hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dipanshu"
                className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-[#01AFB5] outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="dipanshu@example.com"
                className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-[#01AFB5] outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Inquiry / Message</label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we assist you today?"
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-[#01AFB5] outline-none transition resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#01AFB5] hover:bg-[#009da3] text-white font-bold text-xs rounded-xl transition shadow-xs cursor-pointer inline-flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
