---
title: Common Features in Industry
phase: Phase 2 - Feature Map
document_id: 02_Common_Features
last_updated: 2026-10-30
status: Confirmed
summary: Exhaustive benchmark catalog of table-stakes, expected e-commerce, catalog navigation, transaction, fulfillment, and customer care features standard across modern wellness and adult intimate care platforms.
---

# 📦 Common Industry Features: Discreet Adult Wellness & Intimate Care Marketplace

> **Purpose:** Document features that are standard, table-stakes, and universally expected by consumers across mature global and domestic intimate wellness e-commerce platforms (such as Lovehoney, Dame Products, MyMuse, Lelo, and IMBesharam).
> 
> By compiling these industry-standard benchmarks, we ensure our platform does not miss critical foundational capabilities that modern digital buyers take for granted.
> 
> *Note on Scope:* This document captures the standard landscape. It does **not** assign release versions (v1/v2/MVP) or priorities, which will be determined during subsequent planning phases.

---

## 1. Identity, Access & Privacy Control
*Standard identity and session management features expected across modern privacy-conscious retail platforms:*

### Feature 1.1: 18+ Age Gate & Regulatory Verification Modal
- **Description:** A non-intrusive, 1-click modal overlay appearing upon the user's initial visit, prompting them to confirm they are 18 years of age or older before accessing adult wellness content. The system sets an encrypted session cookie (`age_verified=true`) to remember the response without disrupting search engine web crawlers (using client-side rendering or non-blocking markup for SEO).
- **General Purpose:** Complies with Indian statutory regulations regarding adult content and intimate retail, establishing immediate legal compliance while ensuring a smooth, single-click entry for legitimate adult consumers.

### Feature 1.2: Multi-Method Authentication (Phone OTP, Email OTP & Social OAuth)
- **Description:** A flexible login suite allowing users to sign in without remembering complex passwords. Users can choose between instant 6-digit SMS OTP (via mobile number), Email Magic Link / OTP, or single-click Google OAuth. Accounts feature a prominent privacy advisory highlighting that social logins will never post, share, or expose activity to connected external profiles.
- **General Purpose:** Maximizes authentication conversion and accommodates both tech-savvy users wanting rapid social login and hyper-private users who strictly prefer temporary SMS/Email OTP access.

### Feature 1.3: Frictionless Guest Checkout
- **Description:** A streamlined purchase flow that allows buyers to place an order by providing only their shipping address, contact phone/email for tracking, and payment method, without being forced to create a permanent password or register a user account.
- **General Purpose:** Directly eliminates the primary cart-abandonment trigger in taboo wellness e-commerce: fear of having an account on an adult website discovered by partners, roommates, or family members.

### Feature 1.4: Encrypted Address Book & Delivery Profiles
- **Description:** A secure address management module within the user vault where registered buyers can store multiple shipping addresses (e.g., Home, Personal Studio, Friend's Address) with custom friendly labels and designated default billing addresses.
- **General Purpose:** Speeds up repeat checkout and prevents typos or address errors in recurring orders.

### Feature 1.5: Client-Side Session Privacy Reset ("Clear Browsing Cache")
- **Description:** A dedicated utility button in the header or footer that allows the user to immediately flush local storage, cart items, recently viewed products, and session cookies from their device with a single click.
- **General Purpose:** Protects consumers who browse on shared computers, tablets, or family devices, offering instant digital cleanup and emotional reassurance.

---

## 2. Discovery, Catalog Navigation & Search
*Standard catalog discovery, categorization, and filtering capabilities:*

### Feature 2.1: Structured Multi-Level Taxonomy & Category Navigation
- **Description:** An intuitive, organized navigation hierarchy that categorizes products into clear, non-stigmatizing medical/wellness groups:
  - *Solo Exploration:* Wand massagers, bullet vibrators, clitoral air-pulsation devices, prostate massagers, masturbation sleeves.
  - *Couples' Intimacy:* Remote-controlled couples' vibrators, wearable toys, bond/massage candles.
  - *Intimate Care & Consumables:* pH-balanced organic water-based lubricants, antibacterial silicone cleaning foams, toy storage pouches, intimate washes.
  - *Starter & Curated Bundles:* Pre-packaged beginner sets combining a foundational device with companion care items.
- **General Purpose:** Organizes a diverse multi-brand catalog logically so first-time visitors can browse comfortably without feeling overwhelmed or encountering vulgar classifications.

### Feature 2.2: Fast Typeahead Search with Autocomplete & Synonyms
- **Description:** A prominent search engine featuring instant keystroke matching, live predictive suggestions, synonym normalization (e.g., translating "wand" to "vibrator", or "lube" to "lubricant"), recent searches memory, and typo tolerance.
- **General Purpose:** Allows high-intent buyers searching for specific device types or brands (e.g., "Satisfyer Pro 2", "silicone cleaner") to land directly on the relevant product within seconds.

### Feature 2.3: Multi-Faceted Dynamic Filtering & Sorting Engine
- **Description:** A responsive sidebar (desktop) or slide-over drawer (mobile) offering granular parametric filters:
  - *Body-Safe Material:* 100% Medical Silicone, ABS Plastic, Body-Safe Metal, Glass.
  - *Waterproof Rating:* IPX7 Submersible (bath/shower safe), Splashproof, Non-waterproof.
  - *Acoustic Noise Level:* Whisper Quiet (<40dB), Discreet (<50dB), Standard (<60dB).
  - *Power Source:* USB Magnetic Rechargeable, Pin-Rechargeable, AA/AAA Battery.
  - *Price Range:* Slider with minimum and maximum rupee boundaries.
  - *Sorting:* Featured, Most Popular, Highest Rated, Price: Low to High, Price: High to Low, New Arrivals.
- **General Purpose:** Enables informed technical comparison, allowing users with specific requirements (e.g., shower usability, quiet bedroom discretion) to find their exact match quickly.

### Feature 2.4: Anonymous Verified Buyer Reviews & Photo-Free Ratings
- **Description:** A community review module where only confirmed purchasers can leave 1-to-5 star ratings and written feedback. Reviewers are automatically assigned randomized, privacy-preserving display aliases (e.g., "Verified Buyer A.", "K. M.") to protect identity, and external image uploads are disabled on public reviews to prevent inappropriate or offensive imagery.
- **General Purpose:** Builds authentic social proof, validates device longevity and vibration power, and boosts buyer confidence while preserving complete customer anonymity.

---

## 3. Product Presentation & Technical Transparency
*Standard product display page (PDP) specifications standard in medical and wellness e-commerce:*

### Feature 3.1: High-Resolution Product Visuals & Scale Indicators
- **Description:** Multi-angle studio photography and 3D renders displaying the device in realistic lighting, highlighting button placement, silicone texture, and charging ports. Includes a clear scale reference graphic (e.g., device dimensions compared to a standard smartphone or hand) so customers accurately understand physical size.
- **General Purpose:** Prevents customer surprise or disappointment regarding device dimensions upon unboxing, ensuring accurate physical expectations.

### Feature 3.2: Technical Specification & Material Disclosure Tabs
- **Description:** A standardized specification table on every product page detailing exact material composition (e.g., "Platinum-cured Medical Grade Silicone / Phthalate-free / Latex-free"), motor vibration patterns, run-time per full charge, charging duration, and waterproof depth certifications.
- **General Purpose:** Establishes medical credibility, educates users against toxic low-grade plastics, and reassures customers with skin sensitivities or allergies.

### Feature 3.3: Lubricant Compatibility & Hygiene Care Guide
- **Description:** An explicit compatibility badge and guidance callout indicating safe pairing practices (e.g., "Use strictly with Water-Based Lubricants; Silicone Lubes will degrade the surface") alongside step-by-step cleaning and storage instructions.
- **General Purpose:** Prevents accidental product destruction by uneducated buyers, extending device lifespan and reducing invalid warranty complaints.

### Feature 3.4: In-Stock Inventory & Real-Time Availability Indicator
- **Description:** Real-time stock status display (e.g., "In Stock - Ready to Dispatch", "Only 3 Units Left", or "Temporarily Sold Out") with an automated "Notify Me When Available" email/SMS capture form on back-ordered items.
- **General Purpose:** Creates authentic purchasing urgency and captures high-intent leads for restocking events.

---

## 4. Transactions, Cart & Checkout
*Standard commercial transaction flows and conversion-optimized mechanics:*

### Feature 4.1: Slide-Over Mini Cart with Free-Shipping Progress Meter
- **Description:** An interactive slide-over cart drawer that opens immediately when a product is added. It displays line items, quantities, pricing breakdown, and a dynamic progress bar showing the remaining rupee amount required to unlock free shipping (e.g., *"Add ₹400 more for Free Discreet Delivery"*).
- **General Purpose:** Elevates Average Order Value (AOV) and keeps the customer on their current browsing page without forcing a jarring page redirect.

### Feature 4.2: PIN Code Serviceability & Delivery Date Estimator
- **Description:** An inline postal PIN code lookup widget on both the product detail page and the checkout screen. Customers enter their 6-digit Indian PIN code to view courier serviceability, estimated delivery days (e.g., *"Dispatches in 24 hrs; Expected Delivery: 2-3 business days"*), and COD availability.
- **General Purpose:** Sets clear fulfillment expectations upfront and eliminates failed orders originating from unserviceable remote delivery zones.

### Feature 4.3: Multi-Rail Payment Gateway Integration
- **Description:** A PCI-DSS certified payment checkout supporting all major Indian payment rails:
  - Instant UPI (Google Pay, PhonePe, Paytm, BHIM deep-linking and dynamic QR code generation).
  - Credit & Debit Cards (Visa, Mastercard, RuPay with mandatory RBI 2-factor OTP verification).
  - Net Banking across 50+ Indian commercial banks.
  - Cash on Delivery (COD) with transparent convenience fee application.
- **General Purpose:** Maximizes checkout completion across all customer payment preferences while maintaining high bank processing success rates.

### Feature 4.4: Promo Code & Instant Discount Voucher Engine
- **Description:** An expandable coupon input box at checkout that validates single-use discount codes, sitewide seasonal promotions, and affiliate influencer vouchers with real-time rupee discount calculation and error messaging.
- **General Purpose:** Powers marketing campaigns, influencer collaborations, and promotional launch incentives.

### Feature 4.5: Neutral Statement Descriptor Billing Display
- **Description:** A prominent, transparent security badge at checkout clearly showing the exact neutral merchant name that will appear on the customer's bank statement, credit card slip, or UPI transaction history (e.g., *"Billed discreetly as: AURA LOGISTICS"*).
- **General Purpose:** Removes the final and most critical hesitation barrier before payment capture, reassuring the buyer that their financial records remain 100% confidential.

---

## 5. Fulfillment, Tracking & Order Lifecycle
*Standard order fulfillment, shipping communication, and document generation:*

### Feature 5.1: Neutral Automated Air Waybill (AWB) & Shipping Label Generation
- **Description:** Automated backend integration with logistics aggregators (Shiprocket/Delhivery) that prints standardized courier shipping labels. The label displays only the customer's delivery address, barcode, tracking number, and neutral sender entity (*"Aura Logistics & Retail"*). All SKU names, descriptions, and category metadata are stripped from the exterior packaging.
- **General Purpose:** Prevents courier personnel, delivery boys, or neighbors from discovering the nature of the package contents during transit and doorstep handover.

### Feature 5.2: Self-Service Real-Time Order Tracking Portal
- **Description:** A dedicated, web-based order lookup page where customers can enter their Order ID and phone/email to view real-time courier milestone updates (Order Placed -> Packed in Discreet Box -> In Transit -> Out for Delivery -> Delivered) without requiring an account login.
- **General Purpose:** Provides continuous post-purchase reassurance and dramatically reduces repetitive "Where is my order?" (WISMO) support queries.

### Feature 5.3: Silent Event-Triggered Transactional Notifications (SMS / Email)
- **Description:** Automated notifications triggered at critical fulfillment checkpoints (Order Confirmed, Dispatched, Out for Delivery). All notifications use neutral phrasing (e.g., *"Your order #AD-98124 from Aura has been dispatched"*), deliberately omitting specific item names.
- **General Purpose:** Keeps the buyer informed of parcel arrival timing so they can ensure they are personally present to receive the parcel at their doorstep.

### Feature 5.4: Downloadable Digital Tax Invoice (GST Compliant)
- **Description:** A secure, downloadable PDF tax invoice accessible from the order confirmation screen or tracking portal. The invoice meets all Indian GST statutory compliance requirements while utilizing sanitized commodity classifications (e.g., "Personal Massager / Silicone Wellness Device") under registered HSN codes.
- **General Purpose:** Fulfills Indian legal tax obligations while providing a clean, legitimate document for corporate or personal tax records.

---

## 6. Customer Support, Hygiene Governance & Warranty
*Standard post-sales service, issue resolution, and warranty handling:*

### Feature 6.1: Comprehensive Wellness FAQ & Device Troubleshooting Hub
- **Description:** A searchable self-help knowledge base categorized into clear topics: Device Usage & First-Time Charging, Waterproof Testing & Cleaning Guidelines, Shipping & Neutral Packaging Guarantees, Payment & Statement Inquiries, and Hygiene & Warranty Policies.
- **General Purpose:** Deflects up to 60% of common customer service inquiries, allowing anxious buyers to find answers privately without initiating a support chat.

### Feature 6.2: Non-Returnable Hygiene Policy Notice & Acceptance
- **Description:** Clear, legally binding disclosures displayed on product pages and at checkout informing buyers that due to intimate health and sanitation standards, opened products cannot be returned or exchanged for change-of-mind reasons.
- **General Purpose:** Protects business hygiene integrity, prevents cross-contamination risks, and establishes clear legal boundaries compliant with e-commerce consumer protection standards.

### Feature 6.3: Digital Support Ticket & Email Helpdesk
- **Description:** A secure web-based support form where users can submit inquiries, delivery address modifications, or transit issues by inputting their Order ID and query. Tickets are routed to a centralized internal support desk with automated acknowledgment responses.
- **General Purpose:** Provides a structured, trackable, and confidential communication channel between customers and internal support staff.

---

## 📊 Common Features Inventory Summary Table

| Functional Domain | Benchmark Feature Name | Industry Standard Adoption | Primary Strategic Benefit |
| :--- | :--- | :---: | :--- |
| **Identity & Access** | 18+ Regulatory Age Gate Modal | 100% | Legal statutory compliance & age verification |
| **Identity & Access** | Multi-Method OTP & Google OAuth Login | 95% | Low-friction onboarding & secure identity |
| **Identity & Access** | Frictionless Guest Checkout | 90% | Eliminates privacy-related cart abandonment |
| **Identity & Access** | Client-Side Session Privacy Reset | 75% | Privacy reassurance on shared devices |
| **Catalog & Search** | Structured Multi-Level Taxonomy | 100% | Logical, non-vulgar wellness categorization |
| **Catalog & Search** | Typeahead Search with Synonym Tolerance | 95% | High-intent rapid product discovery |
| **Catalog & Search** | Multi-Faceted Parametric Filtering Engine | 90% | Allows targeted filtering by noise, IPX7 & silicone |
| **Catalog & Search** | Anonymous Verified Buyer Reviews | 85% | Authentic social proof without identity exposure |
| **Product Presentation** | Dimensional Scale & Size Visuals | 80% | Eliminates physical sizing surprises |
| **Product Presentation** | Material Disclosure & Certifications Tab | 90% | Establishes medical trust & safety compliance |
| **Product Presentation** | Lubricant & Hygiene Compatibility Guide | 85% | Prevents silicone damage & extends product life |
| **Transactions & Cart** | Mini Cart with Free-Shipping Meter | 90% | Drives Average Order Value (AOV) |
| **Transactions & Cart** | PIN Code Serviceability & TAT Estimator | 95% | Prevents orders to non-serviceable locations |
| **Transactions & Cart** | Multi-Rail Indian Payments (UPI/Cards/COD) | 100% | Maximizes payment completion rates |
| **Transactions & Cart** | Transparent Statement Descriptor Notice | 85% | Eliminates financial disclosure anxiety |
| **Fulfillment & Tracking**| Neutral Blind AWB & Waybill Generation | 100% | Prevents parcel content exposure to couriers |
| **Fulfillment & Tracking**| Real-Time Order Tracking Portal | 95% | Minimizes "Where is my order?" support load |
| **Fulfillment & Tracking**| Silent Neutral SMS/Email Notifications | 100% | Discreet delivery alerts to coordinate handoff |
| **Customer Care** | Device Troubleshooting & Wellness FAQ | 90% | Deflects common operational support tickets |
| **Customer Care** | Non-Returnable Hygiene Policy Enforcement | 100% | Protects sanitary standards & prevents abuse |
