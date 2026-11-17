'use client';

import React, { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const PanicButton: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        triggerPanicExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerPanicExit = () => {
    if (typeof window !== 'undefined') {
      document.title = 'Google Search';
      window.location.replace('https://www.google.com');
    }
  };

  if (!mounted) return null;

  return (
    <aside
      aria-label="Discreet Emergency Escape"
      className="fixed bottom-5 right-5 z-50 group select-none print:hidden"
    >
      <Button
        id="global-floating-btn-panic"
        type="button"
        variant="outline"
        onClick={triggerPanicExit}
        className="flex items-center gap-2 h-auto px-3.5 py-2.5 bg-stone-900/90 hover:bg-black text-white text-xs font-semibold rounded-full shadow-lg backdrop-blur-md border border-stone-700 hover:border-[#FF3F6C] transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
        title="Emergency Quick Exit (Press ESC key anytime)"
        aria-label="Emergency discreet exit to neutral search engine"
      >
        <span className="w-2 h-2 rounded-full bg-[#FF3F6C] animate-ping" />
        <Zap className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
        <span className="tracking-wide">Quick Exit</span>
        <Badge
          variant="secondary"
          className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-stone-800 rounded border border-stone-600 text-stone-300 font-mono hover:bg-stone-800"
        >
          ESC
        </Badge>
      </Button>
    </aside>
  );
};
