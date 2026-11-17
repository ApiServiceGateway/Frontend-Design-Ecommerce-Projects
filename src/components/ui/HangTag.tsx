import React from 'react';

interface HangTagProps {
  text?: string;
  className?: string;
}

export function HangTag({ text = "Just In", className = "" }: HangTagProps) {
  return (
    <div
      className={`absolute -top-1 left-2.5 z-20 pointer-events-none drop-shadow-xs select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        width="20"
        height="54"
        viewBox="0 0 24 58"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[18px] sm:w-[20px] h-auto drop-shadow-xs"
      >
        {/* 1. Green string line hanging from card top into punch hole */}
        <line
          x1="12"
          y1="0"
          x2="12"
          y2="14"
          stroke="#00a896"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* 2. Yellow Tag Body with angled chamfered top corners (compact height 58) */}
        <path
          d="M 2 15 L 6 8 L 18 8 L 22 15 L 22 58 L 2 58 Z"
          fill="#F7C02B"
        />

        {/* Subtle darker gold/yellow bottom strip */}
        <rect
          x="2"
          y="52"
          width="20"
          height="6"
          fill="#E5A716"
          fillOpacity="0.35"
        />

        {/* 3. White Punch Hole with green string entering it */}
        <circle cx="12" cy="13" r="2.4" fill="#FFFFFF" />
        <line
          x1="12"
          y1="8"
          x2="12"
          y2="14"
          stroke="#00a896"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* 4. Vertical text: horizontally centered, flipped (-90deg), reading upwards with tops facing right */}
        {text && (
          <text
            x="12"
            y="34"
            fill="#111827"
            fontSize="8.5"
            fontWeight="700"
            fontFamily="var(--font-figtree), Figtree, sans-serif"
            textAnchor="middle"
            dominantBaseline="central"
            transform="rotate(-90, 12, 34)"
            letterSpacing="0.03em"
          >
            {text}
          </text>
        )}
      </svg>
    </div>
  );
}

export default HangTag;
