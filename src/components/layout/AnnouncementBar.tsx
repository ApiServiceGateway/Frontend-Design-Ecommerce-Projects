'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Truck } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [secondsLeft, setSecondsLeft] = useState(8078); // 02h 14m 38s

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = String(Math.floor(secondsLeft / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, '0');
  const seconds = String(secondsLeft % 60).padStart(2, '0');

  return (
    <aside
      id="home-announcement-bar"
      aria-label="Announcement ticker"
      className="bg-black text-white text-xs px-4 sm:px-6 py-2 border-b border-stone-800 z-50 relative"
    >
      <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            id="home-announcement-live-tag"
            className="bg-stone-900 border border-red-500/50 text-brand-primary text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1.5 uppercase tracking-wider"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
            LIVE VAULT
          </span>
          <span className="text-[11px] text-stone-300 font-medium">
            <strong className="text-white font-semibold">Drop Window Active:</strong> High-Velocity Allocations in progress
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-stone-300 font-medium flex-wrap">
          <span id="home-announcement-timer" className="flex items-center gap-1 text-white">
            <Clock className="w-3.5 h-3.5 text-brand-primary" aria-hidden="true" />
            Tier 1 Closes in:{' '}
            <span className="font-mono font-bold text-white tracking-wider">
              {hours}:{minutes}:{seconds}
            </span>
          </span>
          <span className="text-stone-600 hidden sm:inline" aria-hidden="true">|</span>
          <span className="flex items-center gap-1.5 text-stone-300">
            <Truck className="w-3.5 h-3.5 text-brand-primary" aria-hidden="true" />
            Immediate Dispatch Vault: Orders ship &lt;3hrs
          </span>
        </div>
      </div>
    </aside>
  );
};
