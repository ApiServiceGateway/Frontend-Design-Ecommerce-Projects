import React from 'react';

interface HangTagProps {
  text?: string;
  className?: string;
}

export function HangTag({ text = "Just In", className = "" }: HangTagProps) {
  // Center the vertical text nicely based on length
  const yPos = text.length > 8 ? 26 : 32;
  const fontSize = text.length > 8 ? "8.2" : "9.2";

  return (
    <div
      className={`absolute -top-1 left-2.5 z-20 pointer-events-none drop-shadow-xs select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        width="22"
        height="76"
        viewBox="0 0 24 88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[20px] sm:w-[22px] h-auto drop-shadow-xs"
      >
        {/* 1. Green string line hanging from the card top into the punch hole */}
        <line
          x1="12"
          y1="0"
          x2="12"
          y2="16"
          stroke="#00a896"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* 2. Yellow Tag Body with angled chamfered top corners */}
        <path
          d="M 2 17 L 6 9 L 18 9 L 22 17 L 22 88 L 2 88 Z"
          fill="#F7C02B"
        />

        {/* Subtle darker gold/yellow bottom strip */}
        <rect
          x="2"
          y="80"
          width="20"
          height="8"
          fill="#E5A716"
          fillOpacity="0.35"
        />

        {/* 3. White Punch Hole with green string entering it */}
        <circle cx="12" cy="15" r="2.8" fill="#FFFFFF" />
        <line
          x1="12"
          y1="9"
          x2="12"
          y2="16"
          stroke="#00a896"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* 4. Vertical text (90 degrees clockwise) */}
        {text && (
          <text
            x="12"
            y={yPos}
            fill="#111827"
            fontSize={fontSize}
            fontWeight="600"
            fontFamily="var(--font-figtree), Figtree, sans-serif"
            textAnchor="start"
            transform={`rotate(90, 12, ${yPos})`}
            letterSpacing="0.02em"
          >
            {text}
          </text>
        )}
      </svg>
    </div>
  );
}

export default HangTag;
