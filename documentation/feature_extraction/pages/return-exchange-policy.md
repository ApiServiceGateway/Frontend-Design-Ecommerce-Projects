# Screen Documentation: Fashion Store - Return & Exchange Policy

## 1. Page Overview
- **Screen Name:** Fashion Store - Return & Exchange Policy
- **Stitch Screen ID:** `e8fbbb4e2424418d8627b370d083d13f`
- **File Source ID:** `7751557737171193833`
- **Core Purpose:** Store ke return, exchange, aur reverse logistics policies ko transparently present karna. Isme 30-day window, 100% discreet packaging reverse handover, instant store credit bonus (+5%), aur medical-grade silicone wellness devices / intimate apparel ke strict hygiene protocols (unopened holographic security seal rule & 1-Year Atelier Replacement Warranty) shamil hain. Sath hi automated self-service order lookup widget aur instant concierge assistance provide ki gayi hai.
- **Route:** `/return-exchange-policy` ya `/support/returns`
- **Shared Components:**
  - Header: [`feature_extraction/shared/navigation.md`](../shared/navigation.md)
  - Footer: [`feature_extraction/shared/footer.md`](../shared/footer.md)

---

## 2. Layout aur Sections (Top to Bottom Visual Order)

### 2.1. Global Navigation Bar (Header)
- Full standard global header (Logo, Global Search bar with live shortcuts, Currencies/Language selectors, Wishlist badge, Cart popover, Profile avatar menu).
- Refer to [`shared/navigation.md`](../shared/navigation.md).

### 2.2. Breadcrumb Navigation Bar
- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs text-gray-500 flex items-center gap-2`
- Hierarchy: `Home` → `Customer Support` → `Return & Exchange Policy`.

### 2.3. Hero Header & Trust Badges
- Eyebrow Tag: `CLEAR, FAIR & CONFIDENTIAL` (text-xs uppercase font-semibold text-gray-400 tracking-wider).
- Main Heading: `Return & Exchange Policy` (h1, font-serif / Playfair Display, text-3xl sm:text-5xl font-normal text-gray-900).
- Subtitle: `"Hassle-free 30-day returns and exchanges crafted for complete peace of mind. We stand behind every silhouette, wellness essential, and intimate accessory."`
- **4 Key Value Proposition Highlights (Grid Badges):**
  1. `30-Day Window`: Full refund or exchange on eligible catalog items.
  2. `100% Discreet Reverse`: Unmarked packages, zero awkward questions asked.
  3. `Instant Store Credit`: Processed within 24–48 hours with +5% perk bonus.
  4. `Free First Exchange`: Complimentary doorstep size or tone swaps.

### 2.4. Interactive Self-Service Lookup & Concierge Widget (2 Columns)
- **Left Column: Start a Return or Exchange Tool:**
  - Container: `bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 delicate-shadow`.
  - Header: `Start a Return or Exchange` (h3, font-bold text-gray-900).
  - Subtext: `"Enter your order credentials to initiate an automated reverse pickup, monitor parcel status, or select a new replacement item."`
  - Form Fields:
    - Input 1: `Order Number` (Placeholder: e.g. `#ORD-8921`).
    - Input 2: `Registered Email / Phone` (Placeholder: email or mobile).
  - Submit Button: `Find My Order` (Ghost / fine-bordered action button).
  - Micro-copy: `"Average lookup time: 2 seconds"`.
- **Right Column: Dedicated Sizing Concierge Card:**
  - Profile: `Sarah J. • Private Client Advisor` (Avatar with active status).
  - Value: `"Our atelier stylists and confidential sizing concierges can help exchange items before initiating reverse shipping."`
  - Actions:
    - `Instant WhatsApp Concierge` button.
    - `Consult Fit & Size Guide →` link.

### 2.5. Step-by-Step Reverse Logistics Process (4 Simple Steps)
- Header: `How It Works: 4 Simple Steps` (h2) / `"Fast, streamlined, and discrete reversed logistics"`.
- **Steps Grid:**
  - **01 Step 1 — Request Online:** Select items from order summary, specify return/exchange reason, and choose payout method (Takes under 60 seconds).
  - **02 Step 2 — Stealth Pack:** Place items in original packaging with barcode tags attached. For wellness items, courier supplies heavy-duty opaque tamper-evident seal (Zero outer branding).
  - **03 Step 3 — Doorstep Pickup or Drop-off:** Complimentary contactless reverse pickup in 40+ countries or drop-off at verified partner hub (Scheduled at your slot).
  - **04 Step 4 — Rapid Resolution:** Store credit credited instantly upon carrier pickup scan; bank/card/crypto settlements finalized in 3-5 days (Automatic notifications).

### 2.6. Packaging & Doorstep Handover Guides (Side-by-Side Callouts)
- **Guide 1: Pristine Packaging & Secure Repackaging Guide:**
  - Repack fine silk garments in atelier gift box with designer tags intact. Every return kit includes tamper-proof seals ensuring discreet logistics (`Complimentary protective sleeve supplied`).
- **Guide 2: Doorstep Concierge & Discreet Handover:**
  - White-glove doorstep collections across 40+ countries. Digital receipt handovers without unboxing or friction (`Flexible 2-hour scheduled collection windows`).

### 2.7. Category Eligibility Guidelines (Strict Hygiene Matrix)
- Header: `Category Eligibility Guidelines` (h2) + Badge: `Strict Hygiene Guarantee`.
- **4 Category Rules Cards:**
  1. **Ready-to-Wear Apparel & Silhouettes:**
     - Status: `Eligible (30 Days)`
     - Conditions: Jackets, knitwear, denim, shirts, trousers, dresses. Must be unworn, unwashed, unaltered with all original tags attached. Free size exchange available.
  2. **Shoes & Footwear:**
     - Status: `Eligible (30 Days)`
     - Conditions: Must be in immaculate condition; tried on soft carpeted surfaces only to prevent sole scuffing. Returned with dust bags and undamaged shoe box.
  3. **Intimate Apparel & Wellness Devices:**
     - Status: `Sealed / Untampered Only`
     - **Hygiene & Safety Rule:** Due to international health & safety hygiene standards, medical-grade silicone wellness devices, lingerie, and intimate base layers must remain completely unopened with the factory holographic security seal intact.
     - **Defect Warranty:** Defective items or seal breaches on delivery are 100% covered under our **1-Year Atelier Replacement Warranty**.
  4. **Gift Cards & Final Sale Items:**
     - Status: `Non-Refundable`
     - Conditions: Digital gift vouchers, customized atelier monogramming, and promotional archive clearance marked as 'Final Sale' cannot be refunded to cash. Store credit / exchange may apply.

### 2.8. Refund Channels & Settlement Timelines (3 Payout Methods)
- Header: `Refund Channels & Settlement Timelines` (h2).
- Subtitle: `"Select your preferred payout option when booking your online return."`
- **Payout Cards:**
  1. **Original Payment / UPI / Cards:**
     - Timeline: `3–5 Days`
     - Details: Refunded straight back to Visa, Mastercard, AMEX, or UPI handle used during checkout following receipt inspection.
  2. **Logo Cash / Store Credit (Featured Bonus Option):**
     - Timeline: `Instant`
     - Perk: `+5% Bonus`
     - Details: Credited instantly upon courier barcode scan. No expiry, usable on any drop, and earns an additional 5% credit perk immediately.
  3. **Crypto Settlements (USDT / BTC):**
     - Timeline: `< 24 Hours`
     - Details: Settled in equivalent USDT (TRC20 / ERC20) to your verified crypto address within 24 hours of package arrival at our facility.

### 2.9. Frequently Asked Questions (FAQ Accordions)
- Expandable accordions covering:
  - Reverse pickup scheduling in international locations.
  - Exchanging sizes without waiting for the return parcel inspection.
  - What happens if the holographic hygiene seal on an intimate wellness device was broken during transit.
  - Taxes and customs duties refund rules on international orders.

### 2.10. Help & Concierge Contact Banner
- Container: Outlined / ghost style banner with support icon.
- Copy: `"Still have questions regarding your item? Our concierge specialists are available 24/7."`
- Actions: `Chat with Concierge` button and `Open Help Ticket` button.

### 2.11. Global Footer
- Full standard global footer with newsletter, multi-column directory, and discreet shipping certifications.
- Refer to [`shared/footer.md`](../shared/footer.md).

---

## 3. Options aur Sub-options

| Element | Type | Options / Formats | Description |
| :--- | :--- | :--- | :--- |
| **Order Lookup Form** | Input Box Pair | Order # + Phone/Email | Guest ya registered user ke specific order ki return eligibility fetch karta hai. |
| **Payout Channel Selection** | Radio / Card Selector | 1. Original Payment (3-5 days)<br>2. Store Credit (+5% bonus, instant)<br>3. Crypto Settlement (<24h) | User return ke waqt apna preferred refund channel choose karta hai. |
| **Category Eligibility Matrix** | Informational Cards | 4 Distinct Categories | Category-specific hygiene, tag, and seal rules display karta hai. |
| **Reverse Handover Mode** | Selection Option | Doorstep Pickup vs Partner Hub Drop-off | User pickup slot book kar sakta hai ya partner hub par drop kar sakta hai. |

---

## 4. Interactions aur Navigation Flow

| Element / Trigger | Action | Target / Result |
| :--- | :--- | :--- |
| `Find My Order` Click | User enters Order # and clicks | System validates order; user seedha Help Center item-level query modal [`feature_extraction/pages/help-center-query-hub.md#panel-1-order-related-issues-default-active-view`](./help-center-query-hub.md) par redirect hota hai. |
| `Instant WhatsApp Concierge` Click | User clicks WhatsApp button | WhatsApp Web / App opens pre-filled with concierge sizing request. |
| `Consult Fit & Size Guide →` Click | User clicks size guide | Help Center Size & Fit Guide panel khulta hai. |
| FAQ Accordion Toggle | User clicks question title | Detailed answer expand hota hai; arrow icon 180-deg rotate hota hai. |
| `Chat with Concierge` Click | User clicks bottom support CTA | Global 24/7 Concierge Live Chat drawer open hota hai. |

---

## 5. Content aur Data Classification Table

| Field / Content Key | Content Type | Static / Dynamic | Data Source / Mapping |
| :--- | :--- | :--- | :--- |
| **Policy Headlines & Terms** | Legal Copy | Static / CMS | Legal & Compliance Policy CMS |
| **Window Periods (30 Days)** | Number / Rule | Static / Config | Return policy configuration |
| **Intimate Hygiene Protocol** | Compliance Rule | Static | Global Medical Device & Sanitary Standard |
| **Order Lookup Verification** | Form Service | Dynamic API | `POST /api/orders/lookup` |
| **Bonus Cashback Percentage** | Incentive Rate | Dynamic / Config | `5%` Store Credit Incentive Setting |
| **Crypto Settlement SLA** | Time Window | Static / Policy | 24 Hours SLA configuration |

---

## 6. States aur Variations

### 6.1. Product Type Condition Variations
- **Standard Apparel:** Requires original designer tag intact and unworn condition.
- **Intimate Wellness Devices:** Strict requirement — factory holographic seal must be **unbroken/unopened** for general returns. If received defective, full coverage under **1-Year Atelier Replacement Warranty**.

### 6.2. Lookup Form Validation States
- **Valid Order:** Displays order item list with return-eligible checkboxes.
- **Order Not Found / Mismatched Phone:** Shows error alert: *"No matching order found for this combination. Please verify your details or contact concierge."*

---

## 7. Visual & Styling Notes
- **Editorial Cleanliness:** Soft backgrounds (`bgLight: #FAF5F5`, `surface: #FDF8F8`), delicate shadows, and subtle borders (`borderSubtle: #E5E7EB`).
- **Color Accents:** Emerald Mint (`#14CDA8`) for store credit bonus and delivery badges; Coral Pink (`#FF3F6C`) for urgent notices.
- **Confidentiality Badges:** Shield and padlock icons prominently featured to communicate discreet logistics and untampered safety.

---

## 8. Confirm Karna Baaki (Gaps & Questions)
- **Holographic Seal Replacement Flow:** Agar customer ko sealed wellness toy deliver hua aur seal pehle se cracked/tampered tha, to kya unhe delivery ke 24 ghante ke andar photo upload karna anivarya hai?
- **International Reverse Shipping Fees:** Kya doorstep return pickup international orders (outside India/US) ke liye bhi 100% free hai, ya non-member orders par nominal freight deduction lagta hai?
- **Warranty Claim Portal:** 1-Year Atelier Replacement Warranty claim karne ke liye kya alag warranty registration page banaya jayega ya Help Center se hi claim manage hoga?
