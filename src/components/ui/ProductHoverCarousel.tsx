'use client';

import React, { useState, useRef, useEffect } from 'react';

interface ProductHoverCarouselProps {
  images: string[];
  alt: string;
  className?: string;
}

export const ProductHoverCarousel: React.FC<ProductHoverCarouselProps> = ({
  images,
  alt,
  className = "w-full h-full object-cover",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startCycling = () => {
    if (!images || images.length <= 1) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 1000);
  };

  const stopCycling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentIndex(0);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const safeImages = images && images.length > 0 ? images : [''];
  const currentSrc = safeImages[currentIndex] || safeImages[0];

  return (
    <div
      className="w-full h-full relative cursor-pointer select-none"
      onMouseEnter={startCycling}
      onMouseLeave={stopCycling}
    >
      <img
        src={currentSrc}
        alt={alt}
        className={className}
      />

      {/* Slide indicator dots */}
      {safeImages.length > 1 && (
        <div className="absolute bottom-2 inset-x-0 flex items-center justify-center gap-1 z-10 pointer-events-none opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity duration-300">
          {safeImages.map((_, idx) => (
            <span
              key={idx}
              className={`h-1 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-3.5 bg-white shadow-xs'
                  : 'w-1 bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
