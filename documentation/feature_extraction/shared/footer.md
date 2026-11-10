# Shared Component: Global Footer (Single Source of Truth)

---

## 1. Component Overview
- **Component Name:** Global Site Footer
- **Type:** Global Shared Component (Multi-column Desktop & Responsive Footer)
- **Design Source:** Stitch Project `9995166603861659886`
- **Design Attributes:** White background (`bg-white`), top border (`border-t border-[#e5e7eb]`), structured 6-column grid layout, bottom callout community strip.
- **Core Purpose:** Persistent site-wide footer providing brand identity, social channels, trust badges, customer support navigation, legal policies, accepted payment methods, and external community engagement.

---

## 2. Layout & Columns Architecture (Left to Right)

```text
[Column 1 & 2: Brand, Tagline, Socials, Trust Badges]
├── [Column 3: Customer Support Links]
├── [Column 4: Company / About Links]
├── [Column 5: Policies & Legal Links]
└── [Column 6: Payment & Security Methods]
────────────────────────────────────────────────────
[Bottom Strip: Style Mining Journey / Telegram CTA]
```

---

## 3. Detailed Column Specifications

### 3.1 Left Column: Brand & Socials (`lg:col-span-2`)
- **Brand Logo:** `<a href="#">Logo</a>` styled in vibrant Coral/Pink (`#ff3f6c`), font-extrabold `text-3xl`.
- **Brand Tagline:** `"Unleash Your Fashion Journey with Us."` (styled in `text-xs text-[#4B5563]`).
- **Social Media Hub ("Keep in touch"):**
  - Section heading: `KEEP IN TOUCH` (`text-[11px] font-bold text-gray-900 uppercase tracking-wider`).
  - Circular icon buttons (`w-8 h-8 rounded-full bg-stone-100 hover:bg-black hover:text-white transition-all`):
    - **LinkedIn:** `<i class="fa-brands fa-linkedin-in"></i>`
    - **Instagram:** `<i class="fa-brands fa-instagram"></i>`
    - **Telegram:** `<i class="fa-brands fa-telegram"></i>`
    - **WhatsApp:** `<i class="fa-brands fa-whatsapp"></i>`
- **Trust Badges Strip:**
  - Border separator top and horizontal dividers (`border-[#f2eded]`).
  - Badge 1: `%` Symbol → **"100% Original"** (`text-[10px] text-gray-500 font-medium`).
  - Badge 2: `XM` Mark → **"Premium Quality"** (`text-[10px] text-gray-500 font-medium`).
  - Badge 3: Fast Truck Icon (`fa-solid fa-truck-fast`) → **"Trusted Seller"** (`text-[10px] text-gray-500 font-medium`).

### 3.2 Column 3: Customer Support
- **Heading:** `CUSTOMER SUPPORT` (`text-xs font-bold text-gray-900 uppercase tracking-wider`).
- **Links List (`text-xs text-[#4B5563] hover:text-black`):**
  1. `Help Center` → Navigates to Help Center & Query Hub (`a7e8450a14ba4af5a9eaad7e6104f5a2`)
  2. `Questions & Answers` → Navigates to FAQ / Q&A section
  3. `Shipping & Delivery` → Navigates to Shipping information
  4. `Return & Exchange Policy` → Navigates to Return & Exchange Policy screen (`e8fbbb4e2424418d8627b370d083d13f`)

### 3.3 Column 4: About / Company
- **Heading:** `CUSTOMER SUPPORT` / `ABOUT` (`text-xs font-bold text-gray-900 uppercase tracking-wider`).
- **Links List (`text-xs text-[#4B5563] hover:text-black`):**
  1. `Contact Us` → Navigates to Contact / Support query form
  2. `About Us` → Navigates to Fashion Store About Us screen (`404964886492905488`)
  3. `Size Guide` → Opens standard sizing modal or reference table

### 3.4 Column 5: Policies & Legal
- **Heading:** `POLICIES & LEGAL` (`text-xs font-bold text-gray-900 uppercase tracking-wider`).
- **Links List (`text-xs text-[#4B5563] hover:text-black`):**
  1. `Terms and Conditions` → Navigates to Terms & Conditions screen (`9ac3f30d866a41f8a0bc026fa7491c70`)
  2. `Privacy Policy` → Navigates to Privacy Policy screen (`da4770fd174546408f8bb7cd22b3a8f6`)

### 3.5 Column 6: Payment & Security
- **Heading:** `PAYMENT & SECURITY` (`text-xs font-bold text-gray-900 uppercase tracking-wider`).
- **Content:**
  - Link: `Accepted Payment Methods`
  - Payment Brand Icons strip (`flex items-center gap-2 text-gray-500 text-sm`):
    - Bitcoin (`fa-brands fa-bitcoin`)
    - Ethereum (`fa-brands fa-ethereum`)
    - Visa (`fa-brands fa-cc-visa`)
    - MasterCard (`fa-brands fa-cc-mastercard`)

---

## 4. Bottom Community Callout Strip
- **Container:** Centered column block (`pt-8 text-center flex flex-col items-center justify-center gap-1.5`).
- **Tagline:** `"Start Your Style Mining Journey with Us!"` (`text-xs text-gray-500`).
- **CTA Action:** Inline button / anchor with Telegram brand blue (`text-[#229ED9] hover:underline text-xs font-bold`):
  - Icon: `<i class="fa-brands fa-telegram text-base"></i>`
  - Text: `Telegram`

---

## 5. Visual & Styling Notes
- **Max Width:** `max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8`
- **Padding:** Top `pt-16`, bottom `pb-12`, margin top `mt-16`
- **Divider Lines:** Subtle borders `#e5e7eb` and `#f2eded`
- **Typography:** Uppercase letter-spaced section headings with lowercase/sentence case link lists.

---

## 6. Design Gaps & Questions
- **Copyright Notice:** Traditional copyright line (e.g. `© 2026 Store Name. All rights reserved.`) is omitted from the visual design in favor of the Telegram Community strip. Confirmation needed if standard legal copyright statement should be appended.
