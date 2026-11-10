# Screen Documentation: Fashion Store - Terms and Conditions

## 1. Page Overview
- **Screen Name:** Fashion Store - Terms and Conditions
- **Stitch Screen ID:** `9ac3f30d866a41f8a0bc026fa7491c70`
- **File Source ID:** `9ac3f30d866a41f8a0bc026fa7491c70`
- **Core Purpose:** E-commerce platform ke legal rights, user obligations, multi-currency pricing (Fiat & Web3 Crypto), 15-minute crypto rate locks, discreet logistics title transfer, 30-day return standards, intellectual property rules, liability limitations, aur formal dispute mediation protocols ko define karne wala binding legal user agreement.
- **Route:** `/terms-and-conditions` ya `/legal/terms`
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
- Hierarchy: `Home` → `Policies & Legal` → `Terms & Conditions`.

### 2.3. Legal Header & Document Utility Controls
- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100`
- **Left Branding & Metadata:**
  - Eyebrow Tag: `LEGAL FRAMEWORK & USER AGREEMENT` (text-xs uppercase font-semibold text-gray-400 tracking-wider).
  - Main Heading: `Terms & Conditions` (h1, font-serif / Playfair Display, text-3xl sm:text-4xl font-normal text-gray-900).
  - Version Notice: `Last updated: October 2024. Please read these terms carefully before exploring or placing orders on our boutique platform.`
- **Right Utility Action Buttons:**
  - `Print Document` (Button with printer icon, triggers `window.print()`).
  - `Download PDF Copy` (Button with document/download icon, triggers static legal PDF download).

### 2.4. Quick Navigation Anchor Pills Bar
- Horizontally scrollable smooth-scroll anchor strip (`sticky top-20 z-10 bg-white/95 backdrop-blur-md py-3 border-b border-gray-100`):
  1. `1. Account & Membership` (`#article-1`)
  2. `2. Pricing & Orders` (`#article-2`)
  3. `3. Crypto & Payments` (`#article-3`)
  4. `4. Shipping & Title` (`#article-4`)
  5. `5. Returns & Exchanges` (`#article-5`)
  6. `6. Intellectual Property` (`#article-6`)
  7. `7. Disclaimers & Liability` (`#article-7`)
  8. `8. Governing Law` (`#article-8`)

---

### 2.5. Main Terms & Conditions Modular Cards (Articles I to VIII)

#### Article I: Acceptance & Account Registration (`#article-1`)
- Tag: `01 Article I` / Status Badge: `Eligibility & Security`
- Header: `Acceptance & Account Registration` (h2)
- Key Provisions:
  - **Mutual Consent:** Platform access, concierge advisory interaction, ya account create karte hi user Terms & Privacy Policy se legally bound hota hai.
  - **Age & Legal Capacity (h4):** User ki umar kam se kam 18 saal (ya legal majority) honi anivarya hai.
  - **Credential Safeguards (h4):** User apne MFA/2FA credentials aur account session activity ke liye exclusively responsible hai. Identity fraud ya unauthorized account sharing par account bina notice terminate kiya ja sakta hai.

#### Article II: Product Catalog, Pricing & Currency (`#article-2`)
- Tag: `02 Article II` / Status Badge: `Limited Editions`
- Header: `Product Catalog, Pricing & Currency` (h2)
- Key Provisions:
  - **Numbered Drops & Inventory Reservation:** Small-batch limited capsules me items bag me add karne se inventory reserve nahi hoti; reservation payment confirmation par hoti hai.
  - **Dual Pricing Transparency:** Prices concurrently fiat (USD, EUR, GBP, INR) aur cryptocurrencies me quoted rehte hain. Local duties/import tariffs checkout par explicitly dikhaye jate hain.
  - **Typographical Errors:** Rare system latency ya pricing glitch hone par order cancel karne aur full refund process karne ka adhikar store reserve karta hai.

#### Article III: Orders, Payments & Logo Cash / Gift Cards (`#article-3`)
- Tag: `03 Article III` / Status Badge: `Crypto Supported`
- Header: `Orders, Payments & Logo Cash / Gift Cards` (h2)
- Key Provisions:
  - **Binding Contract:** Order place karna ek binding contractual offer hai. Formal acceptance tracking notice issue hone par hoti hai.
  - **Payment Gateways:** PCI-DSS Level 1 tokenized processing for Visa, MasterCard, AMEX, UPI, Apple Pay.
  - **Crypto 15-Minute Guaranteed Lock Rate:** Web3 checkouts (BTC, ETH, USDT) par instant incentive discounts aur 15-minute guaranteed conversion lock window milti hai. Mempool congestion hone par rate recalibrate hota hai.
  - **Logo Store Credit & Gift Vouchers:** Non-expiring validity, applies automatically at checkout.

#### Article IV: White-Glove Shipping & Title Transfer (`#article-4`)
- Tag: `04 Article IV` / Status Badge: `Discreet Logistics`
- Header: `White-Glove Shipping & Title Transfer` (h2)
- Key Provisions:
  - **Discreet Unmarked Logistics:** Tamper-evident, zero exterior branding wale plain packaging me shipments dispatch hote hain.
  - **FOB Shipping Point & Title Transfer:** Title aur risk of loss bonded courier ko handover hote hi transfer ho jata hai, par sabhi consignments transit insurance se 100% covered rehte hain.

#### Article V: Return, Exchange & Refund Rights (`#article-5`)
- Tag: `05 Article V` / Status Badge: `30-Day Guarantee`
- Header: `Return, Exchange & Refund Rights` (h2)
- Key Provisions:
  - **Atelier Condition Standards (h4):** Unwashed, unworn, original security provenance seal tags aur archival box intact hone par hi return swikar kiya jata hai. Monogrammed bespoke items non-refundable hain.
  - **Refund Processing:**
    - Fiat: 5–7 business days me original payment method par refund.
    - Crypto: Token volatility se protect karne ke liye original USD purchase price ke barabar **USDT settlement ya Store Credit** me refund kiya jata hai.

#### Article VI: Intellectual Property & Creative Rights (`#article-6`)
- Tag: `06 Article VI` / Status Badge: `All Rights Reserved`
- Header: `Intellectual Property & Creative Rights` (h2)
- Key Provisions:
  - **Exclusive Ownership:** Visual media, sketches, patterns, trademark logos, aur platform source code exclusive property hain.
  - **Anti-Scraping Covenant:** Automated bot scrapers, reverse-engineering, ya product catalog replication strictly prohibited hai without prior written authorization.

#### Article VII: Limitation of Liability & Warranty Disclaimers (`#article-7`)
- Tag: `07 Article VII` / Status Badge: `Legal Protections`
- Header: `Limitation of Liability & Warranty Disclaimers` (h2)
- Key Provisions:
  - **"As-Is" Provision:** Platform aur services as-is and as-available basis par operate karte hain.
  - **Liability Cap:** Company ki maximum aggregate liability kisi bhi situation me dispute ke under aane wale item ke purchase price se zyada nahi ho sakti. Consequential ya speculative crypto losses excluded hain.

#### Article VIII: Dispute Resolution & Dedicated Legal Contact (`#article-8`)
- Tag: `08 Article VIII` / Status Badge: `Arbitration Protocol`
- Header: `Dispute Resolution & Dedicated Legal Contact` (h2)
- Key Provisions:
  - **Mandatory 30-Day Pre-Arbitration Mediation:** Formal arbitration se pehle parties 30-day good faith mediation process se dispute suljhane par agree karti hain.
  - **Direct Legal Counsel Box (h4):**
    - Email: `legal@brand.com`
    - SLA: `24–48 Business Hours Response Guarantee`
    - Action: `Initiate Legal Inquiry` button.

### 2.6. Global Footer
- Full standard global footer with newsletter, multi-column directory, and discreet shipping certifications.
- Refer to [`shared/footer.md`](../shared/footer.md).

---

## 3. Options aur Sub-options

| Element | Type | Options / Formats | Description |
| :--- | :--- | :--- | :--- |
| **Print Button** | Browser Action | Native Print dialog | Formatted printer-friendly page render karta hai. |
| **Download PDF** | File Download | `.pdf` file format | Offline reference ke liye official legal terms archive download karta hai. |
| **Section Nav Pills** | Sticky Anchor Nav | 8 Anchor sections | Page ke specific articles par instant smooth-scroll karwata hai. |
| **Legal Counsel Inquiry** | Action Trigger | Form / Mailto trigger | Formal legal review ticket generate karne ka interface deta hai. |

---

## 4. Interactions aur Navigation Flow

| Element / Trigger | Action | Target / Result |
| :--- | :--- | :--- |
| Click Quick Nav Pill (e.g. `#article-3`) | User clicks anchor | Smooth scrolling se Article III (Crypto & Payments) screen ke center me align ho jata hai. |
| Click `Print Document` | User clicks print button | Browser ka print dialog open hota hai, unnecessary navs hide ho jate hain (`@media print`). |
| Click `Download PDF Copy` | User clicks download button | `Logo-Terms-And-Conditions-2024.pdf` direct download initiate hota hai. |
| Click `Initiate Legal Inquiry` | User clicks legal button | Legal query submission modal open hota hai ya `legal@brand.com` draft compose hota hai. |

---

## 5. Content aur Data Classification Table

| Field / Content Key | Content Type | Static / Dynamic | Data Source / Mapping |
| :--- | :--- | :--- | :--- |
| **Document Version & Date** | Metadata | Static / CMS | Legal revision date (`October 2024`) |
| **Articles I to VIII Texts** | Legal Clauses | Static / CMS | Compliance Legal Knowledge Base |
| **Crypto Rate Guarantee Window** | Financial Term | Static / Policy | 15-Minute Guaranteed Mempool Rate Lock |
| **Liability Cap Formula** | Legal Rule | Static | Max Liability = `100% of Disputed Order Total` |
| **Legal Email Endpoint** | Contact Data | Static | `legal@brand.com` |

---

## 6. States aur Variations

### 6.1. Sticky Navigation States
- **Top of Page:** Navigation pills sit below the header banner.
- **Scrolled Down:** Navigation pills lock smoothly at `top-20` with a blurred translucent white backdrop (`bg-white/95 backdrop-blur-md`).
- **Active Section Highlight:** User jis article par scroll karta hai, us article ka anchor pill dark background le leta hai (IntersectionObserver state).

### 6.2. Print Styles (`@media print`)
- Header search bar, promotional banners, footer newsletter, and action buttons hide ho jate hain; pure high-contrast black text on white background render hota hai.

---

## 7. Visual & Styling Notes
- **Typography:** Classical serif display headings (`Playfair Display`) paired with clean readable sans-serif (`Plus Jakarta Sans`) for small-print legal clauses.
- **Card Aesthetics:** Modular boxed cards (`delicate-shadow`, `border border-gray-200/80 rounded-2xl p-6 sm:p-8`) giving legal text an organized, reader-friendly structure.
- **Accents:** Teal tags (`#14CDA8`) highlighting key commercial guarantees (e.g., `Crypto Supported`, `Discreet Logistics`, `30-Day Guarantee`).

---

## 8. Confirm Karna Baaki (Gaps & Questions)
- **Jurisdiction & Governing Law:** Article VIII me mediation protocol ka zikr hai, par formal arbitration city/court (e.g., New York, Paris, Singapore, ya New Delhi) explicitly define karni baaki hai.
- **Age Verification for Intimate Toys:** Article I me minimum age 18+ specify ki gayi hai. Kya intimate wellness products view/purchase karne ke liye separate Age-Gate modal consent mandatory karna hai?
- **Digital Signatures:** Kya user checkout ke time checkbox *"I agree to the Terms & Conditions"* par mandatory tick karega ya footer browsing consent sufficient mana jayega?
