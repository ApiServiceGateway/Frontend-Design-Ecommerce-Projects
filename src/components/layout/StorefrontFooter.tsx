'use client';

import React from 'react';
import BeamWordmarkFooter from '@/components/ui/beam-wordmark-footer';

export const StorefrontFooter: React.FC = () => {
  return (
    <div id="site-primary-footer-root" className="w-full m-0 p-0">
      <BeamWordmarkFooter
        brand="Midnight"
        wordmark="MIDNIGHT"
        company="Midnight Luxury & Intimate Care"
        accent="#FF3F6C"
        wordTop="#FF3F6C"
        wordFoot="#060b22"
        background="#02040b"
        wordWeight={300}
        cut={-0.12}
        socials={[
          { label: "Telegram VIP", href: "https://t.me", icon: "x" },
          { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
          { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
          { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
        ]}
        credits={[
          { lead: "Curated by ", label: "Midnight Private Atelier", href: "#" },
          { lead: "Guaranteed ", label: "100% Blind-Box Plain Packaging", tail: " & Zero PII Storage" },
        ]}
        columns={[
          {
            title: "Atelier & Vault",
            links: [
              { label: "Boutique Catalog", href: "/category" },
              { label: "Women's Collection", href: "/category?cat=women" },
              { label: "Men's Collection", href: "/category?cat=men" },
            ],
          },
          {
            title: "Discreet Privacy",
            links: [
              { label: "Zero-PII Checkout", href: "/cart" },
              { label: "Save Crypto Address", href: "/account?tab=crypto" },
              { label: "Order Tracking", href: "/account?tab=orders" },
            ],
          },
          {
            title: "Concierge & Support",
            links: [
              { label: "Customer FAQs", href: "/faq" },
              { label: "My Account Hub", href: "/account" },
              { label: "Notifications & Drops", href: "/notifications" },
              { label: "Saved Wishlist", href: "/wishlist" },
            ],
          },
        ]}
      />
    </div>
  );
};
