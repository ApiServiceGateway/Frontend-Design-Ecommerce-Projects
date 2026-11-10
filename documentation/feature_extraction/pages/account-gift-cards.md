# Page Blueprint: Fashion Account - Gift Cards

---

## 1. Page Overview
- **Screen Name:** Fashion Account - Gift Cards
- **Stitch Screen ID:** `8229175514213974612`
- **Core Purpose:** Customer ke store gift card balance, digital vouchers, aur gift card redemption ka dedicated financial hub. Isme aggregate balance preview (`$150.00 Total Available Balance`), top quick code addition input, `Redeem Gift Card` aur `Buy a Gift Card` action gateways, individual active voucher cards with masked 16-digit card numbers and validity dates, aur balance inspection triggers (`CHECK BALANCE`, `VIEW DETAILS`) shamil hain.
- **Entry Point / Navigation Route:** Account Dashboard left sidebar link "Gift Cards" under `PAYMENTS` category (`/account/payments/gift-cards`), ya checkout price breakdown me gift card trigger.
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
- **Right Column (8/12 grid span): Gift Cards Hub & Balance Container (`RightProfileContent`)**

#### 2.1 Left Column: Universal Account Navigation Sidebar (`LeftSidebar`)
- **Active Navigation Item:** `PAYMENTS` category me `Gift Cards` active highlighted state me hai.
- **All Sidebar Links:** Profile summary, `Edit profile`, `Manage address`, `Gift Cards` (Active), `Save UPI`, `Save Card`, `Save Crypto address`, `Two-Factor Auth`, `Change password`, `Change Email`, `Reviews`, `Q&A`, `Policies`, and `Logout`.

#### 2.2 Right Column: Gift Cards Main Content (`RightProfileContent`)
- **Header Block & Quick Add Input:**
  - Title Group:
    - Headline (`h1`): `Gift Cards` (`text-xl font-bold text-slate-800 leading-tight`).
    - Subtitle: `Manage your gift card balance, redeem vouchers, and send digital gift cards`.
  - Quick Voucher Addition Strip:
    - Input: Text input, placeholder: `Enter gift card code` (`w-48 px-3.5 py-2 text-xs border border-gray-200 rounded-lg`).
    - Action CTA: `Add` button (`px-4 py-2 border border-[#14cda8] text-[#14cda8] hover:bg-[#14cda8]/10 text-xs font-medium rounded-lg`).
- **Aggregate Balance Showcase Card (`bg-slate-50 border border-slate-200/80 rounded-xl p-5 sm:p-6`):**
  - Metric Header: `Total Available Balance` (`text-[11px] font-bold tracking-wider text-slate-500 uppercase`).
  - Balance Big Number: `$150.00` (`text-3xl font-bold text-slate-900`).
  - Usage Note: `"Usable instantly across all online purchases and stores"` (`text-xs text-slate-500`).
  - Dual Action CTAs:
    - Button 1: `Redeem Gift Card` (mint-green button `bg-[#14cda8] text-white hover:bg-[#14cda8]/90 text-xs font-semibold px-4 py-2 rounded-lg shadow-sm`).
    - Button 2: `Buy a Gift Card` (white outline button `bg-white border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-semibold px-4 py-2 rounded-lg shadow-sm`).
- **Active Vouchers List Container (Vertical Stack):**

  ##### Card 1: Midnight Atelier Digital Gift Card
  - **Header Row:**
    - Voucher Title: `Midnight Atelier Digital Gift Card` (`text-xs font-bold text-slate-800`).
    - Status Badge: `ACTIVE` (pill badge `bg-emerald-50 text-[#14cda8] border border-[#14cda8]/30 px-2 py-0.5 rounded-full text-[11px] font-semibold`).
    - Stored Value: `$100.00` (`text-base font-bold text-slate-900`).
  - **Voucher Attributes Grid:**
    - Card Number: `Card No: •••• •••• •••• 4892` (`font-mono text-slate-700 tracking-wider text-xs`).
    - Expiration: `Valid Till: Dec 2025` (`text-xs text-slate-600`).
  - **Action Controls Strip:**
    - Button 1: `CHECK BALANCE` (with card icon `fa-regular fa-credit-card text-xs text-slate-400 hover:text-[#14cda8] font-semibold uppercase`).
    - Divider: Vertical separator line (`h-3.5 w-px bg-slate-200`).
    - Button 2: `VIEW DETAILS` (with doc icon `fa-regular fa-file-lines text-xs text-slate-400 hover:text-[#14cda8] font-semibold uppercase`).

  ##### Card 2: Festive Celebration Voucher
  - **Header Row:**
    - Voucher Title: `Festive Celebration Voucher` (`text-xs font-bold text-slate-800`).
    - Status Badge: `ACTIVE` (`bg-emerald-50 text-[#14cda8]`).
    - Stored Value: `$50.00` (`text-base font-bold text-slate-900`).
  - **Voucher Attributes Grid:**
    - Card Number: `Card No: •••• •••• •••• 1024` (`font-mono text-slate-700 tracking-wider text-xs`).
    - Expiration: `Valid Till: Aug 2025` (`text-xs text-slate-600`).
  - **Action Controls Strip:**
    - Button 1: `CHECK BALANCE`
    - Divider: Vertical separator line.
    - Button 2: `VIEW DETAILS`

- **Legal & Encryption Footer Box:**
  - Shield Icon (`fa-solid fa-shield text-slate-400 text-xs`).
  - Notice: `"Gift cards are non-transferable and can be applied seamlessly at checkout. Protected by secure encryption."`

### Section 3: Global Site Footer (Shared Component)
- **Reference:** Dekhein [footer.md](../shared/footer.md)
- **Short Purpose:** Global footer with legal policies and community links.

---

## 3. Options aur Sub-options
- **Balance & Voucher Actions:**
  - Quick Add Voucher by 16-digit code
  - `Redeem Gift Card`
  - `Buy a Gift Card`
  - `CHECK BALANCE`
  - `VIEW DETAILS`
- **Active Gift Card Types in Design:**
  - Digital Gift Card (Fixed denomination e.g. $100.00)
  - Seasonal Promo Voucher (Fixed denomination e.g. $50.00)

---

## 4. Interactions aur Navigation
- `[Enter gift card code Input + Add Button]` → Click → Validates alphanumeric voucher code, triggers PIN prompt if required, merges balance into Total Available Balance
- `[Redeem Gift Card Button]` → Click → Opens redemption modal / voucher binding dialog
- `[Buy a Gift Card Button]` → Click → Navigates to Gift Card purchase storefront to select denomination and recipient email
- `[CHECK BALANCE Button on Card]` → Click → Fetches live remaining balance and transaction deduction history
- `[VIEW DETAILS Button on Card]` → Click → Opens voucher drawer with terms of usage, eligible categories, and original purchase receipt
- `[Sidebar Navigation Links]` → Click → Navigates to corresponding account sections

---

## 5. Content aur Data Classification

| Element / Field | Data Type | Example Value Shown in Design | Notes & Source Confirmation |
| :--- | :--- | :--- | :--- |
| **Total Balance** | Calculated Currency | `$150.00` | Aggregate available gift credit |
| **Quick Code Input** | User Input | Form string | 16-digit gift voucher code |
| **Voucher Name** | Catalog / Promo Name | `Midnight Atelier Digital Gift Card` | Card branding title |
| **Voucher Value** | Stored Financial Value | `$100.00`, `$50.00` | Active voucher denomination |
| **Masked Card No** | Tokenized Financial Data | `•••• •••• •••• 4892` | Masked card identity |
| **Expiration Date** | System Timestamp | `Dec 2025`, `Aug 2025` | Card validity cutoff date |
| **Status Tag** | Operational State | `ACTIVE` | Usability badge |

---

## 6. States aur Variations
- **Voucher Status States:**
  - `ACTIVE`: Usable green status badge.
  - Expired / Depleted: Design mein specified nahi (standard: muted gray badge `EXPIRED` or `REDEEMED`).
- **Zero Balance State:** Design mein specified nahi (currently displays $150.00 balance).
- **Voucher Code Error State:** Invalid code or already redeemed: Design mein specified nahi.

---

## 7. Visual & Styling Notes
- **Color Accents:**
  - Primary Action Mint: `#14cda8` (Redeem Gift Card button, Add button border)
  - Active Tag Emerald: `#059669` (`bg-emerald-50 text-[#14cda8]`)
  - Canvas Neutral: `#FAF4F4`
  - Card Surfaces: Pure white `#ffffff` with subtle slate borders (`border-slate-200/90`)
- **Typography:** `Plus Jakarta Sans` with monospace font (`font-mono`) for masked card digits.
- **Border Radius:** `rounded-xl` for balance and voucher cards, `rounded-lg` for buttons and code input.

---

## 8. Confirm Karna Baaki (Gaps & Questions)
1. **Gift Card PIN Requirement:** Gift card add karte waqt kya 6-digit confidential PIN enter karna zaroori hai?
2. **Buy a Gift Card Recipient Flow:** `Buy a Gift Card` click karne par kya personalized digital greeting template selection aur recipient scheduling modal khulta hai?
3. **Partial Order Utilization:** Agar order total gift card balance se kam ho, toh kya remaining amount store credit balance me intact rehti hai?
