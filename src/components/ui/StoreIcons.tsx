import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  fill?: string;
}

export const WishlistIcon: React.FC<IconProps> = ({
  className = 'w-4 h-4',
  fill = 'none',
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export const BagIcon: React.FC<IconProps> = ({
  className = 'w-4 h-4',
  fill = 'none',
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M16 11V7a4 4 0 00-8 0v4M4 9h16l1.2 12H2.8L4 9z" />
    <path d="M9 13a3 3 0 0 0 6 0" strokeWidth="1.5" />
  </svg>
);
