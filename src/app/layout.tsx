import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { StorefrontHeader } from '@/components/layout/StorefrontHeader';
import { StorefrontFooter } from '@/components/layout/StorefrontFooter';

const figtree = localFont({
  src: [
    {
      path: './fonts/Figtree-VariableFont_wght.ttf',
      style: 'normal',
    },
    {
      path: './fonts/Figtree-Italic-VariableFont_wght.ttf',
      style: 'italic',
    },
  ],
  variable: '--font-figtree',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aura Retail & Lifestyle | Luxury Fashion & Discreet Intimate Wellness',
  description:
    'Curated luxury fashion drops, quiet sensory wellness devices, and 100% blind-box plain packaging with zero-trace billing.',
  keywords: [
    'luxury fashion',
    'discreet intimate wellness',
    'atelier drops',
    'plain packaging',
    'whisper quiet',
    'crypto fashion',
  ],
  openGraph: {
    title: 'Aura Retail & Lifestyle | Atelier Fashion & Discreet Intimacy',
    description: 'High-velocity allocations, tactile luxury, and guaranteed anonymous delivery.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${figtree.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      <body className={`min-h-screen flex flex-col bg-white text-content-primary antialiased ${figtree.className} font-sans`}>
        <StorefrontHeader />
        <main id="storefront-main-content" className="flex-1 bg-white">
          {children}
        </main>
        <StorefrontFooter />
      </body>
    </html>
  );
}
