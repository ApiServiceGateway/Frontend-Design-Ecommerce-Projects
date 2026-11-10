---
title: High-Level Product Requirements
phase: Phase 1 - Idea
document_id: 04_Requirements
last_updated: 2026-10-27
status: Draft # Draft | In Review | Confirmed
summary: High-level product format, core functional requirements, integrations, quality attributes, and scope boundaries.
---

# 📋 High-Level Requirements: Discreet Adult Wellness & Intimate Care E-Commerce Marketplace

> **Purpose:** Record what the product fundamentally needs to do, the type of solution required, essential constraints, and clear boundaries between v1 and future releases.

---

## 1. Product Type & Form Factor
*What format or platform will the product take?*
- **Primary Platform:** High-performance, mobile-first Web Application (Progressive Web App ready).
- **Target Form Factor:** 
  Responsive Web Application built on **Next.js (React)** for blazing-fast server-side rendering (SSR), optimized for mobile touchscreens (viewports 360px+) with seamless desktop experience.
- **Hosting / Distribution:** 
  Cloud-native deployment (Vercel / AWS) behind Cloudflare CDN/WAF with custom domain and full SSL/TLS termination.

---

## 2. User Roles
*Who interacts with or manages the system?*
- **Role 1 (Customer / Guest Buyer):** 
  Can verify 18+ status, browse wellness products, use the Quick Exit panic button, complete the Toy Finder Quiz, purchase via guest or OTP checkout, make prepaid or COD orders, and submit confidential defect replacement requests.
- **Role 2 (Store Admin / Inventory Manager):** 
  Can manage multi-brand product listings, update stock levels, configure bundles, monitor payment captures, manage ₹50 COD order confirmations, and dispatch tracking details with neutral courier labels.
- **Role 3 (Customer Support Specialist):** 
  Can review customer email tickets, manage escalations from the AI Chatbot, and verify unboxing videos for defective/damaged item replacements under the hygiene policy.

---

## 3. High-Level Functional Requirements
*What core capabilities must users be able to accomplish?*

| Capability ID | User Role | Core Functional Need | Priority (Must / Should / Later) | Status (Confirmed / Proposed / Open) |
| :--- | :--- | :--- | :--- | :--- |
| **FR-01** | Customer | Must encounter a discreet 1-click 18+ age verification modal upon first visit without blocking search engine bots. | Must-have | Confirmed |
| **FR-02** | Customer | Must be able to click a "Quick Exit / Panic Button" in the header to instantly redirect to Google or Wikipedia. | Must-have | Confirmed |
| **FR-03** | Customer | Must be able to take an anonymous 3-question "Interactive Toy Finder Quiz" to get tailored product recommendations. | Must-have | Confirmed |
| **FR-04** | Customer | Must view verified medical badges on every product (100% Body-Safe Silicone, Phthalate-Free, IPX7 Waterproof, Noise Level <50dB). | Must-have | Confirmed |
| **FR-05** | Customer | Must be able to complete a purchase as a Guest with phone/email OTP (no forced social logins or persistent public accounts). | Must-have | Confirmed |
| **FR-06** | Customer | Must be charged a transparent ₹50 COD surcharge on cash-on-delivery orders, alongside an instant prepaid UPI/card discount nudge. | Must-have | Confirmed |
| **FR-07** | Customer | Must receive order confirmation and tracking via SMS/Email using 100% neutral sender details (no explicit product names). | Must-have | Confirmed |
| **FR-08** | Customer | Can interact with a 24/7 AI Wellness Chatbot for non-judgmental product, sizing, and cleaning advice. | Must-have | Confirmed |
| **FR-09** | Customer | Can upload a confidential unboxing video to claim an instant replacement for dead-on-arrival (DOA) or motor defects. | Should-have | Confirmed |
| **FR-10** | Store Admin | Must be able to manage inventory, track RTO rates, and flag suspicious COD orders before dispatch. | Must-have | Confirmed |

---

## 4. Proposed Features (Brainstorm & Feature Pool)
*Candidate features under consideration across all versions:*
- **Core Operations:** 
  - Dynamic multi-brand catalog (categorized by Solo Female, Couples, Solo Male, Lubes & Cleaners, Starter Bundles).
  - Frictionless guest checkout with address auto-fill via PIN code.
  - Neutral invoice generation (branded as "Aura Retail & Logistics").
- **Privacy & Discretion Engine:** 
  - Floating "Quick Exit" panic button on all pages.
  - "Clear Browsing Session" button in the footer that purges local cart and recently viewed products on shared devices.
  - Neutral merchant billing statement descriptor guarantee.
- **Smart / AI Capabilities:** 
  - AI Wellness Assistant trained on medical-grade silicone care, anatomy-friendly guidance, and FAQs.
  - Dynamic SEO metadata generation for high-intent sexual wellness search queries.
- **Growth & AOV Boosters:** 
  - "Complete the Experience" smart bundle recommendations on cart page (e.g., adding organic water-based lube and antibacterial foam).
  - Discreet exit-intent coupon code for first-time visitors.

---

## 5. External Integrations
*What third-party services, APIs, or legacy systems must this product connect with?*

| Service Type | Preferred Service / API | Integration Purpose | Priority |
| :--- | :--- | :--- | :--- |
| **Payments** | Cashfree / Razorpay / PhonePe PG | High-risk compliant payment processing with neutral billing descriptor and UPI deep-linking | Must-have |
| **Logistics & Shipping** | Shiprocket / Delhivery API | Automated airway bill (AWB) generation, tracking webhooks, and neutral shipping labels | Must-have |
| **Customer Authentication** | NextAuth.js / Twilio or MSG91 OTP | Frictionless phone/email OTP guest verification | Must-have |
| **Transactional Email & SMS** | Resend (Email) + MSG91 (SMS/WhatsApp) | Discreet order confirmations, dispatch updates, and OTP delivery | Must-have |
| **AI Assistant** | OpenAI API / Google Gemini API | 24/7 empathetic, discreet, non-judgmental wellness customer guidance chatbot | Must-have |
| **Cloud Storage** | AWS S3 / Cloudflare R2 | Secure, encrypted storage for high-res product photos and customer unboxing video warranty claims | Must-have |
| **Privacy Analytics** | PostHog / Plausible Analytics | Cookieless, privacy-respecting conversion tracking and funnel drop-off analysis | Should-have |

---

## 6. Quality & Non-Functional Requirements (NFRs)
*System performance, accessibility, security, and reliability standards:*
- **Performance:** 
  - Google Lighthouse Performance score > 90.
  - Largest Contentful Paint (LCP) < 1.8 seconds on 4G mobile networks.
- **Privacy & Security:** 
  - End-to-end SSL/TLS 1.3 encryption.
  - No storing of sensitive payment credentials (100% tokenized via PCI-DSS compliant gateways).
  - PII data (phone numbers, delivery addresses) encrypted at rest in the database; customer browsing history purged after order completion.
  - 100% neutral billing statement descriptor to eliminate any disclosure on financial statements.
- **Mobile Responsiveness:** 
  - First-class usability across iOS Safari and Android Chrome, specifically optimized for single-hand mobile operation.
- **SEO & Search Architecture:** 
  - Full Server-Side Rendering (SSR) via Next.js for all category, product, and blog pages.
  - Valid Schema.org Structured Data (`Product`, `FAQPage`, `Article`, `BreadcrumbList`) for rich search snippets.

---

## 7. Scope Boundaries (In-Scope vs Out-of-Scope)
*Crucial rules to prevent scope-creep during initial development:*

### 🟢 In-Scope for First Version (v1)
- Next.js responsive web application with clean, modern, non-sleazy wellness aesthetic.
- 1-Click 18+ age verification entry modal & floating "Quick Exit / Panic Button".
- Curated multi-brand catalog with medical-grade badges and detailed care guides.
- Interactive 3-question Toy Finder Quiz with instant product recommendations.
- Guest checkout with phone/email OTP verification.
- Prepaid UPI/Cards checkout + COD option with automated ₹50 surcharge.
- Neutral packaging & billing integration (Shiprocket/Delhivery + Cashfree/Razorpay).
- 24/7 AI Wellness Chatbot & email ticket support system.
- Strict hygiene policy with video upload defect replacement workflow.

### 🔴 Explicitly Out-of-Scope for First Version (Deferred to later releases)
- **Native iOS & Android mobile apps** (Deferred to v3 due to App Store adult content policies and user device privacy concerns).
- **Multi-vendor open seller marketplace** (Platform operates as a tightly curated direct inventory model in v1; third-party vendor portal deferred to v2).
- **Cryptocurrency / Web3 payments** (Excluded; INR UPI and standard digital payments cover 99% of target demographic).
- **Telehealth Video Consultations** (Doctor/sexologist live video appointments deferred to future wellness expansion phase).
