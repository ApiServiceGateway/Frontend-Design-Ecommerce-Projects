# Page Blueprint: Fashion Account - My Coupons & Vouchers

---

## 1. Page Overview
- **Screen Name:** Fashion Account - My Coupons & Vouchers
- **Stitch Screen ID:** `6314097128468934536`
- **Core Purpose:** Customer ke available promo codes, storewide discount vouchers, exclusive seasonal rebates, aur free express delivery privileges ka central loyalty management view. Isme status filter tabs (`All Coupons`, `Discount Vouchers`, `Free Shipping`, `Expired / Used`), coupon redemption code input, 1-click clipboard code copy actions (`Copy Code`), minimum cart value conditions, expiry dates, aur terms of use (`T&C Apply`) shamil hain.
- **Entry Point / Navigation Route:** Account Dashboard quick tile `Coupons` click karne par, ya left sidebar activity links se (`/account/coupons`).
- **Shared Components Used:**
  - Header & Global Navigation: [navigation.md](../shared/navigation.md)
  - Footer & Brand Links: [footer.md](../shared/footer.md)

---

## 2. Layout aur Sections (Top to Bottom)

### Section 1: Global Navigation Header (Shared Component)
- **Reference:** Dekhein [navigation.md](../shared/navigation.md)
- **Short Purpose:** Persistent top utility navigation header.

### Section 2: Account Split Layout (`MainContent`)
Split 2-column layout:
- **Left Column (4/12 grid span): Universal Account Navigation Sidebar (`LeftSidebar`)**
- **Right Column (8/12 grid span): Coupons & Vouchers Showcase (`RightProfileContent`)**

#### 2.1 Left Column: Universal Account Navigation Sidebar (`LeftSidebar`)
- **Active Navigation Item:** Profile summary, `Edit profile`, `Manage address`, `Gift Cards`, `Save UPI`, `Save Card`, `Save Crypto address`, `Two-Factor Auth`, `Change password`, `Change Email`, `Reviews`, `Q&A`, `Policies`, and `Logout`.

#### 2.2 Right Column: Coupons Main Content (`RightProfileContent`)
- **Header Section & Quick Input:**
  - Headline (`h1`): `My Coupons & Vouchers` (`text-xl font-bold text-slate-800 leading-tight`).
  - Subtitle: `Available discounts, promo codes, and special promotional offers applicable at checkout`.
  - Manual Promo Code Input Strip:
    - Input: Text field, placeholder: `Enter coupon code` (`w-48 px-3.5 py-2 text-xs border border-gray-200 rounded-lg`).
    - Action CTA: `Apply` button (`px-4 py-2 border border-[#14cda8] text-[#14cda8] hover:bg-[#14cda8]/10 text-xs font-medium rounded-lg`).
- **Filter Tabs Strip:**
  - Tab 1: `All Coupons (4)` (Active underlined pill).
  - Tab 2: `Discount Vouchers (2)`
  - Tab 3: `Free Shipping (1)`
  - Tab 4: `Expired / Used (1)`
- **Coupons Grid Container (`grid grid-cols-1 sm:grid-cols-2 gap-4`):**

  ##### Card 1: Spring/Summer Discount (`SUMMER25`)
  - **Header Tag:** `LIMITED OFFER` (amber pill tag `bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded`).
  - **Discount Title (`h3`):** `SAVE $25 OFF` (`text-lg font-extrabold text-slate-900 tracking-tight`).
  - **Eligibility Terms:** `Applicable on all Spring & Summer luxury collections.`
  - **Code Pill & Action Strip:**
    - Code Display: `Code: SUMMER25` (dashed outline border, monospace text `font-mono font-bold text-xs text-slate-800`).
    - Action CTA: `Copy Code` button (`text-[#14cda8] hover:text-[#11b896] text-xs font-semibold`).
  - **Footer Metadata:**
    - Expiration: `Valid till Nov 30, 2024` (`text-[11px] text-slate-400`).
    - Legal Link: `T&C Apply` (`text-[11px] text-slate-500 hover:underline`).

  ##### Card 2: Storewide Designer Apparel (`ATELIER15`)
  - **Header Tag:** `STOREWIDE` (sky blue pill tag `bg-sky-50 text-sky-700 text-[10px] font-bold px-2 py-0.5 rounded`).
  - **Discount Title (`h3`):** `15% OFF ENTIRE ORDER` (`text-lg font-extrabold text-slate-900 tracking-tight`).
  - **Eligibility Terms:** `Valid across all designer ready-to-wear apparel.`
  - **Code Pill & Action Strip:**
    - Code Display: `Code: ATELIER15` (dashed outline border, monospace font).
    - Action CTA: `Copy Code` button.
  - **Footer Metadata:**
    - Expiration: `Valid till Dec 15, 2024`.
    - Legal Link: `T&C Apply`.

  ##### Card 3: Free Domestic Delivery (`FREESHIP`)
  - **Header Tag:** `FREE SHIPPING` (emerald pill tag `bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded`).
  - **Discount Title (`h3`):** `FREE EXPRESS DELIVERY` (`text-lg font-extrabold text-slate-900 tracking-tight`).
  - **Eligibility Terms:** `Applicable on all standard & express domestic parcels.`
  - **Code Pill & Action Strip:**
    - Code Display: `Code: FREESHIP` (dashed outline border).
    - Action CTA: `Copy Code` button.
  - **Footer Metadata:**
    - Expiration: `Valid till Dec 31, 2024`.
    - Legal Link: `T&C Apply`.

  ##### Card 4: Outerwear Flat Rebate (`WINTER50`)
  - **Header Tag:** `EXCLUSIVE OFFER` (purple pill tag `bg-purple-50 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded`).
  - **Discount Title (`h3`):** `FLAT $50 OFF` (`text-lg font-extrabold text-slate-900 tracking-tight`).
  - **Eligibility Terms:** `Exclusive for premium outerwear, suits & fine knitwear.`
  - **Code Pill & Action Strip:**
    - Code Display: `Code: WINTER50` (dashed outline border).
    - Action CTA: `Copy Code` button.
  - **Footer Metadata:**
    - Expiration: `Valid till Jan 15, 2025`.
    - Legal Link: `T&C Apply`.

- **Usage Rule & Trust Footer:**
  - Notice: `"Coupons are automatically applied at checkout or can be entered manually. One coupon per order."`
  - Trust Seal: `Protected by black rocks` with shield icon.

### Section 3: Global Site Footer (Shared Component)
- **Reference:** Dekhein [footer.md](../shared/footer.md)
- **Short Purpose:** Global footer with legal policies and community links.

---

## 3. Options aur Sub-options
- **Category Filter Tabs:**
  - `All Coupons (4)`
  - `Discount Vouchers (2)`
  - `Free Shipping (1)`
  - `Expired / Used (1)`
- **Available Promotional Codes in Design:**
  - `SUMMER25` (Save $25)
  - `ATELIER15` (15% Off Storewide)
  - `FREESHIP` (Free Express Delivery)
  - `WINTER50` (Flat $50 Off Outerwear)
- **Card Actions:**
  - `Copy Code` (copies code to system clipboard)
  - `T&C Apply` (opens terms drawer)

---

## 4. Interactions aur Navigation
- `[Filter Tab Click]` → Click → Re-filters the coupon grid based on category (e.g. Free Shipping shows only `FREESHIP`)
- `[Manual Code Input + Apply Button]` → Click → Validates custom promo code, binds to user account
- `[Copy Code Button on Card]` → Click → Copies promo code string to clipboard, switches button text temporarily to `Copied!` with green checkmark
- `[T&C Apply Link]` → Click → Opens modal with minimum order threshold, excluded product categories, and maximum discount caps
- `[Sidebar Navigation Links]` → Click → Navigates to corresponding account sections

---

## 5. Content aur Data Classification

| Element / Field | Data Type | Example Value Shown in Design | Notes & Source Confirmation |
| :--- | :--- | :--- | :--- |
| **Total Coupons Count**| System Counter | `All Coupons (4)` | Number of eligible vouchers |
| **Coupon Code** | Marketing Key | `SUMMER25`, `ATELIER15`, `FREESHIP`, `WINTER50` | Alphanumeric promo string |
| **Discount Title** | Marketing Headline | `SAVE $25 OFF`, `15% OFF ENTIRE ORDER` | Savings headline |
| **Applicability Terms**| Policy Copy | `Applicable on all Spring & Summer luxury collections.` | Category restriction rule |
| **Expiration Date** | System Timestamp | `Nov 30, 2024`, `Dec 15, 2024`, `Dec 31, 2024` | Validity cutoff date |
| **Category Pill Tag** | Marketing Taxonomy | `LIMITED OFFER`, `STOREWIDE`, `FREE SHIPPING`, `EXCLUSIVE` | Voucher classification tag |

---

## 6. States aur Variations
- **Active Filter Tab State:** Selected tab has bold text with active indicator; inactive tabs show gray text.
- **Copy Code State:**
  - Inactive: `Copy Code` with copy icon.
  - Copied: Green `Copied!` with checkmark icon for 2 seconds.
- **Expired / Used Tab State:** Renders greyed-out inactive vouchers with strikethrough code and `EXPIRED` badge.
- **Stacking Policy:** Explicitly specified: *"One coupon per order"*. Multiple coupon stacking disabled.

---

## 7. Visual & Styling Notes
- **Color Accents:**
  - Copy Button Mint: `#14cda8`
  - Offer Badges: Amber (`bg-amber-50 text-amber-700`), Sky (`bg-sky-50 text-sky-700`), Emerald (`bg-emerald-50 text-emerald-700`), Purple (`bg-purple-50 text-purple-700`)
  - Canvas Neutral: `#FAF4F4`
  - Card Surfaces: Pure white `#ffffff` with dashed code borders
- **Typography:** `Plus Jakarta Sans` with monospace font (`font-mono`) for coupon codes.
- **Border Radius:** `rounded-xl` for coupon cards, `rounded-lg` for inputs and action buttons.

---

## 8. Confirm Karna Baaki (Gaps & Questions)
1. **Minimum Order Value Thresholds:** Coupon terms me minimum purchase requirements (e.g. "Save $25 on orders above $150") design cards par explicitly mentioned nahi hain.
2. **Apply Directly to Cart Shortcut:** Kya card par `Apply to Cart` button hona chahiye jo code copy karne ke bajaye user ko direct cart me apply karke redirect karde?
3. **Crypto Exclusive Coupons:** Cart page me `CRYPTOBOUTIQUE` code maujood tha. Kya Crypto-exclusive vouchers is list me alag tag ke saath render honge?
