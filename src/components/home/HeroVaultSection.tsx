'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Bolt, X } from 'lucide-react';

export const HeroVaultSection: React.FC = () => {
  const [filmOpen, setFilmOpen] = useState(false);
  const [countdown, setCountdown] = useState(8078); // 02h 14m 38s

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = String(Math.floor(countdown / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((countdown % 3600) / 60)).padStart(2, '0');
  const seconds = String(countdown % 60).padStart(2, '0');

  return (
    <section
      id="home-hero-section"
      aria-label="Hero campaign and allocation vault"
      className="w-full overflow-hidden shadow-sm relative"
    >
      <div className="relative w-full min-h-[460px] sm:min-h-[520px] max-h-[620px] flex items-center justify-center overflow-hidden bg-stone-900">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGayduW0V28ALJux_xs-j79LlCYZzNZfj_t3x18QfdMrhBiOAv5hhDiICJFVzWs_ln2etL65T4V55YR1Z02rObvquZ-GXn_9F9IsiGhk6xssOLJ_9JyNXxiXf1n2xwJ41sTIVSTRA6ZNNTeyqYBzr2shI34icvSgPnIMaP5R4wdx04UZEml5SCLx3vmi7XpiQ-s9V42oqrEpHBIbtkdg7cDVho9qVtJ5qT_PUuGxgRkt10NhjEwrDZW4e-dpBJ_EE"
          alt="Quiet Luxury Autumn Outerwear Campaign"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center z-0"
        />

        {/* Ambient Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-900/30 z-10" />

        {/* Slide Carousel Chevrons */}
        <button
          id="home-hero-btn-prev"
          type="button"
          aria-label="Previous campaign slide"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 sm:w-11 h-10 sm:h-11 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md backdrop-blur-sm flex items-center justify-center transition-all cursor-pointer border border-white/40 group"
        >
          <ChevronLeft className="w-5 h-5 text-gray-800 group-hover:scale-110 transition-transform" />
        </button>
        <button
          id="home-hero-btn-next"
          type="button"
          aria-label="Next campaign slide"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 sm:w-11 h-10 sm:h-11 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md backdrop-blur-sm flex items-center justify-center transition-all cursor-pointer border border-white/40 group"
        >
          <ChevronRight className="w-5 h-5 text-gray-800 group-hover:scale-110 transition-transform" />
        </button>

        {/* Hero Bottom Slogan Overlay */}
        <div className="absolute bottom-6 left-4 sm:left-8 z-20 max-w-xl text-white">
          <span className="text-[11px] font-bold tracking-widest uppercase text-brand-primary drop-shadow-md">
            Atelier Autumn Edition
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-1 drop-shadow-md">
            Sensory Luxury. Discreet Precision.
          </h1>
        </div>
      </div>

      {/* Allocation Status Bar */}
      <div
        id="home-hero-status-strip"
        className="bg-[#111827] border-t border-stone-800 text-white px-4 sm:px-8 py-3.5"
      >
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 flex-wrap">
            <span
              id="home-hero-badge-batch"
              className="bg-brand-primary text-white text-[10px] font-black px-2.5 py-1 rounded tracking-wider uppercase"
            >
              FLASH BATCH 04
            </span>
            <span className="font-medium text-stone-200 text-xs sm:text-sm">
              High-Velocity Allocations:{' '}
              <strong className="text-white font-bold">420 items</strong> released every 6 hours
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <div id="home-hero-timer-countdown" className="flex items-center gap-1 font-mono text-xs">
              <span className="text-stone-400 font-sans text-[11px] uppercase tracking-wider mr-1">
                CLOSES IN:
              </span>
              <span className="bg-stone-800 border border-stone-700 px-2 py-0.5 rounded font-bold text-white">
                {hours}h
              </span>
              <span className="text-stone-400">:</span>
              <span className="bg-stone-800 border border-stone-700 px-2 py-0.5 rounded font-bold text-white">
                {minutes}m
              </span>
              <span className="text-stone-400">:</span>
              <span className="bg-brand-primary text-white px-2 py-0.5 rounded font-bold">
                {seconds}s
              </span>
            </div>
            <span className="text-stone-500 font-light hidden sm:inline">•</span>
            <span className="text-stone-300 font-semibold text-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />
              84% Allocated
            </span>
          </div>
        </div>
      </div>

      {/* Modal Dialog for Campaign Film */}
      {filmOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Campaign Film Preview"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <div className="relative w-full max-w-2xl bg-stone-900 rounded-2xl overflow-hidden border border-stone-700 p-6 text-white text-center">
            <button
              onClick={() => setFilmOpen(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full bg-stone-800"
              aria-label="Close video modal"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold mb-2">Autumn Atelier Campaign</h3>
            <p className="text-sm text-stone-400 mb-6">
              A sensory exploration of modern intimate wellness and tactile luxury craft.
            </p>
            <div className="aspect-video w-full bg-stone-950 rounded-xl flex items-center justify-center border border-stone-800">
              <span className="text-xs text-stone-400 font-mono">
                [ High Definition Campaign Video Stream Loaded ]
              </span>
            </div>
            <button
              onClick={() => setFilmOpen(false)}
              className="mt-6 px-6 py-2 bg-brand-primary text-white rounded-lg text-xs font-bold"
            >
              Close Film
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
