# 🏠 01: Landing Page (Homepage) Blueprint

> **Design Objective:**  
> Create an immediate impression of premium luxury wellness (similar to high-end skincare or luxury personal care) rather than an explicit or shady website. Deliver immediate e-commerce shopping power with a **Product-Heavy Hero**, instant discount banners, and trending bestsellers while keeping user privacy bulletproof.

---

## 📐 Wireframe & Visual Layout

```
+-----------------------------------------------------------------------------------+
| 📢 ANNOUNCEMENT BAR: 100% Plain Brown Packaging | Disguised Bank Billing | Free Ship  |
+-----------------------------------------------------------------------------------+
| [LOGO] Luxury Brand      [Search: 'Find your comfort...']    [Account]   [Cart (2)]|
| Links: Best Sellers | For Her | For Him | Couples | Lubes & Care | Deals | Blog   |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [ HERO SECTION: PRODUCT-HEAVY SHOWCASE & PROMOTIONAL SPOTLIGHT ]                 |
|  - High-res product rendering of Flagship Duo / Bestseller                        |
|  - Heading: "Elevate Your Intimacy with Modern Wellness"                          |
|  - Promo Tag: FLAT 20% OFF | Code: DISCREET20                                     |
|  - Primary CTA: [ SHOP BESTSELLERS NOW ]    Secondary CTA: [ VIEW DEALS ]          |
|                                                                                   |
+-----------------------------------------------------------------------------------+
|  [ VALUE PROPOSITION BAR ]                                                        |
|  📦 100% Blind Box  |  💳 Neutral Statement  |  🛡️ 48H Video Warranty  | 🤫 <40dB |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  🔥 SECTION 1: TRENDING BESTSELLERS GRID (4-8 Items)                              |
|  [Product Card 1]     [Product Card 2]     [Product Card 3]     [Product Card 4]  |
|  - Bestseller Badge   - 4.9 ★ (1.2k)       - Price: ₹2,499 (was ₹3,999) - 37% OFF |
|  - [Quick Add to Cart] button with instant vibration / color selector             |
|                                                                                   |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  ⚡ SECTION 2: FLASH DEALS & LIMITED-TIME DISCOUNTS BANNER                         |
|  - Deal Countdown Timer: [ 06h : 42m : 18s ]                                      |
|  - "Couples Starter Kit - Save ₹1,500"                                            |
|  - [ Copy Coupon & Shop Deal ]                                                    |
|                                                                                   |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  🗂️ SECTION 3: VISUAL CATEGORY CAROUSEL                                          |
|  [ Solo Exploration ]     [ For Couples ]     [ Natural Lubes ]   [ Beginners ]   |
|                                                                                   |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  📦 SECTION 4: "THE DISCRETION PROMISE" (Visual Unboxing Demonstration)           |
|  - Step 1: Plain corrugated box with tamper-evident tape.                          |
|  - Step 2: Shipping label reads: 'Shipped by B-DOT LOGISTICS' (No product mention)|
|  - Step 3: Sealed inner hygiene pouch.                                            |
|                                                                                   |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  ⭐ SECTION 5: ANONYMOUS VERIFIED REVIEWS CAROUSEL                                |
|  "Delivered in a completely plain brown box. Super quiet and premium quality."     |
|  - Verified Buyer (Bengaluru) ★★★★★                                               |
|                                                                                   |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  📚 SECTION 6: WELLNESS JOURNAL / BLOG SNIPPETS                                    |
|  [ Article 1: Beginner Guide ]  [ Article 2: Safe Silicone ]  [ Article 3: Care ] |
|                                                                                   |
+-----------------------------------------------------------------------------------+
| FOOTER: Links, Secure Payment Icons (UPI/Cards), DOA Policy, Contact & Disclaimer |
+-----------------------------------------------------------------------------------+
| 🚪 FLOATING QUICK EXIT BUTTON (Always Visible, Pinned to Bottom-Right)           |
+-----------------------------------------------------------------------------------+
| 🍪 18+ SUBTLE DISCLAIMER BANNER (Bottom-Bar: 'Contains 18+ adult wellness items')|
+-----------------------------------------------------------------------------------+
```

---

## 🛠️ Detailed Component Specifications

### 1. Global Header & Persistent Privacy Controls
* **Floating Quick Exit Button (`Panic Button`):**
  * **Placement:** Fixed at viewport bottom-right (`z-index: 99999`).
  * **Visual Style:** Neutral slate gray pill icon with label: `[ ⚡ Quick Exit / Esc ]`.
  * **Action on Click / Pressing `ESC`:**
    1. Immediately redirect browser window to `https://www.google.com` (or BBC Weather).
    2. Overwrites `document.title` to "Google Search".
    3. Replaces history state so the back button does not return to the product page.
* **18+ Subtle Cookie & Age Banner:**
  * Fixed slim banner at bottom on first visit: *"By entering our store, you confirm you are at least 18 years of age and agree to our discreet terms. [ I Agree ]"*
  * Remembers choice via local storage (`age_verified: true`) for 30 days without showing intrusive full-screen popups that ruin UX.

### 2. Product-Heavy Hero Banner
* **Headline:** *"Sensory Luxury. Zero Embarrassment."*
* **Visual Asset:** High-resolution 3D artistic product shot rendered in warm ambient tones (rose gold, obsidian matte, champagne, warm cream).
* **Direct Promotional Banner:** "Special Launch Offer: Extra 15% OFF on all prepaid UPI orders. Code: `WELLNESS15`".
* **CTAs:**
  * Primary Button: `Shop Best Sellers` (Smooth scroll or route to `/category/bestsellers`).
  * Secondary Button: `Explore Couples Kits` (Route to `/category/couples`).

### 3. Trending Best-Sellers Grid (Conversion Module)
* Displays 4 to 8 top-velocity products in responsive 4-column (desktop) / 2-column (mobile) cards.
* **Card Details:**
  * Product Title (elegant, non-crude naming, e.g., "Aura Whisper Wand", "Siren Rose Pulsator").
  * Pricing: Current Selling Price (₹) with strike-through MRP and calculated `% OFF` badge.
  * Star Rating snippet: `★ 4.9 (420+ reviews)`.
  * Badges: `Best Seller`, `Whisper Quiet (<40dB)`, `100% Waterproof`.
  * `Quick Add` button: Launches slide-in drawer to select color and add to cart without navigating away.

### 4. Interactive "Discretion Guarantee" Interactive Demo
* Interactive 3-tab visual toggle explaining the 100% blind delivery guarantee:
  * **Tab 1: The Box:** Shows a photo of the plain cardboard box without logo or graphic branding.
  * **Tab 2: The Label:** Shows a mock courier waybill displaying sender as *"B-Dot Tech Logistics"*, category as *"Fitness / Wellness Accessory"*.
  * **Tab 3: Bank Statement:** Shows a mock SMS/Netbanking statement entry: *"Txn of ₹2,499 to B-DOT TECHNOLOGIES PVT LTD"*.

---

## 📱 Mobile-First UX Considerations
* **Thumb Zone Action:** The "Quick Exit" button stays on the lower right corner, easily reachable by the thumb.
* **Horizontal Swipeable Carousels:** Best-sellers and categories swipe smoothly horizontally on mobile screens without clunky pagination buttons.
* **Sticky Add-to-Cart / View Deals bar:** Subtle sticky bottom bar when scrolling through the hero section.
