# Page Blueprint: Fashion Account - Save Card

---

## 1. Page Overview
- **Screen Name:** Fashion Account - Save Card
- **Stitch Screen ID:** `13504245064707494491`
- **Core Purpose:** Customer ke saved debit aur credit cards ka PCI-DSS compliant management interface. Isme saved payment cards list with default payment method tags (`Default for payments`, `Secondary card`), 1-click tokenized card deletion/selection, aur an inline `Add card` form with Cardholder name, Card number, Expiry (MM/YY), CVV, and 256-bit SSL bank-grade security assurances shamil hain.
- **Entry Point / Navigation Route:** Account Dashboard left sidebar link "Save Card" (`/account/payments/cards`), ya checkout payment page par "Add New Card" shortcut.
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
- **Right Column (8/12 grid span): Saved Cards Hub & Add Card Panel (`RightProfileContent`)**

#### 2.1 Left Column: Universal Account Navigation Sidebar (`LeftSidebar`)
- **Active Navigation Item:** `PAYMENTS` category me `Save Card` active highlighted state me hai.
- **All Sidebar Links:** Profile summary, `Edit profile`, `Manage address`, `Gift Cards`, `Save UPI`, `Save Card` (Active), `Save Crypto address`, `Two-Factor Auth`, `Change password`, `Change Email`, `Reviews`, `Q&A`, `Policies`, and `Logout`.

#### 2.2 Right Column: Cards Management (`RightProfileContent`)

##### View 1: Saved Payment Methods List View (`Payment Methods List View`)
- **Header Section:**
  - Headline (`h1`): `Save Card` (`text-xl font-bold text-slate-800`).
  - Subtitle: `Choose how you want to pay`.
- **Payment Methods Rows Container:**
  - **Row 1: Visa Card (Default Payment Method):**
    - Brand Logo: Visa blue/gold card mark (`fa-brands fa-cc-visa text-2xl`).
    - Masked Card Number: `•••• 6574` (`font-mono text-sm font-semibold text-slate-800`).
    - Status Badge: `Default for payments` (emerald badge `bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200/60`).
    - Selector / Action: Radio indicator / More options kebab menu.
  - **Row 2: Mastercard (Secondary Card):**
    - Brand Logo: Mastercard red/orange circles mark (`fa-brands fa-cc-mastercard text-2xl`).
    - Masked Card Number: `•••• 3257` (`font-mono text-sm font-semibold text-slate-800`).
    - Status Badge: `Secondary card` (neutral pill badge `bg-slate-100 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded`).
    - Selector / Action: Radio indicator / More options kebab menu.
  - **Row 3: Add New Card Trigger Tile (`Add new card`):**
    - Icon: Circular plus icon button (`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700`).
    - Action Label: `Add new` / `Add new card` (`text-xs font-semibold text-slate-800 hover:text-black`).
- **Security Footnote:**
  - Shield Lock icon (`fa-solid fa-shield-halved text-xs text-slate-400`).
  - Compliance Guarantee: `"Your card details are protected with bank-grade 256-bit SSL encryption and PCI-DSS Level 1 compliance. CVV is never stored."`

##### View 2: Inline Add Card View Form (`Inline Add Card View`)
- **Header Block:**
  - Back Navigation: `Back` link button with left arrow icon (`fa-solid fa-arrow-left text-xs`).
  - Headline (`h1`): `Add card` (`text-xl font-bold text-slate-800`).
  - Subtitle: `Enter the card details`.
- **Card Input Form Fields:**
  - **Field 1: Cardholder Name:**
    - Label: `Cardholder name`
    - Input: Text field, placeholder: `Enter name as printed on card`.
  - **Field 2: Card Number:**
    - Label: `Card number`
    - Input: Text/numeric field with inline dynamic card brand detection logo (Visa / Mastercard icon inside right field boundary).
  - **Row 2 (Split Columns): Expiry Date & CVV:**
    - Column 1: `Expiration date` (with calendar icon `fa-regular fa-calendar`, placeholder: `MM / YY`).
    - Column 2: `CVV` (with lock icon `fa-solid fa-lock`, password-masked 3-digit numeric input, placeholder: `•••`, with info tooltip trigger).
- **Form Actions Bar:**
  - Secondary Action: `Cancel` (white outline button).
  - Primary Action: `Add Card` (mint-green button `bg-[#14cda8] hover:bg-[#11b896] text-slate-900 font-bold px-6 py-2.5 rounded-lg text-xs`).
- **Security Notice Footer:**
  - Note: `"Your card details are protected with bank-grade 256-bit SSL encryption. We never store your full card number or security code."`

### Section 3: Global Site Footer (Shared Component)
- **Reference:** Dekhein [footer.md](../shared/footer.md)
- **Short Purpose:** Global footer with policies, accepted payments, and Telegram community link.

---

## 3. Options aur Sub-options
- **Saved Cards Actions:**
  - Select active card
  - `Default for payments`
  - `Secondary card`
  - Remove / delete saved card
- **Supported Card Networks:**
  - Visa
  - Mastercard
  - RuPay
  - American Express

---

## 4. Interactions aur Navigation
- `[Add new / Add new card Trigger]` → Click → Toggles card list view to display the `Add card` input form
- `[Back Button on Add Form]` → Click → Reverts view back to saved cards list
- `[Card Number Input Formatting]` → Typing → Auto-inserts space after every 4 digits, detects card network (Visa / Mastercard) dynamically
- `[Expiry Date Input]` → Typing → Enforces `MM/YY` slash formatting
- `[CVV Tooltip]` → Hover / Click → Displays visual guide on where to find the 3-digit CVV on back of card
- `[Add Card Submit Button]` → Click → Tokenizes card details with payment gateway vault, adds card token to saved list
- `[Cancel Form Button]` → Click → Discards inputs and restores list view

---

## 5. Content aur Data Classification

| Element / Field | Data Type | Example Value Shown in Design | Notes & Source Confirmation |
| :--- | :--- | :--- | :--- |
| **Masked Card 1** | Tokenized Payment Data | `•••• 6574` | Visa card last 4 digits |
| **Masked Card 2** | Tokenized Payment Data | `•••• 3257` | Mastercard last 4 digits |
| **Default Badge** | System Payment State | `Default for payments` | Primary auto-debit card |
| **Cardholder Name** | Sensitive User Input | Form text input | Printed card name |
| **Card Number** | Sensitive Financial Data | Form numeric input (16 digits) | Vault tokenized string |
| **Expiration Date** | Sensitive Financial Data | Form input (`MM / YY`) | Card validity date |
| **CVV Code** | Highly Sensitive Ephemeral | Form input (`3 digits`) | Never stored on server |

---

## 6. States aur Variations
- **View States:**
  - List View: Displays saved cards and `Add new card` button.
  - Form View: Displays cardholder, card number, expiry, CVV form.
- **Card Network Auto-Detection:** Typing `4...` switches icon to Visa; typing `5...` switches icon to Mastercard.
- **CVV Masking State:** Always obscured with bullet dots (`•••`).
- **Empty Cards State:** Design mein specified nahi (current state displays 2 populated card tokens).

---

## 7. Visual & Styling Notes
- **Color Accents:**
  - Primary CTA Mint: `#14cda8` (Add Card button)
  - Default Tag Emerald: `#059669` (Default for payments)
  - Canvas Neutral: `#FAF4F4`
  - Card Surfaces: Pure white `#ffffff` with subtle slate borders
- **Typography:** `Plus Jakarta Sans` with monospace font (`font-mono`) for masked card digits.
- **Border Radius:** `rounded-xl` for card rows, `rounded-lg` for inputs and buttons.

---

## 8. Confirm Karna Baaki (Gaps & Questions)
1. **RBI / Regulatory Tokenization Mandate:** Indian payment gateways me card details direct save nahi hoti, network tokenization (CoFT) consent required hota hai. Kya form me mandatory tokenization consent checkbox include hoga?
2. **Card Nickname / Label Field:** Customer agar multiple cards distinguish karna chahe (e.g. "Personal Card", "Office Card"), toh kya custom label field support hoga?
3. **Card Deletion Confirmation:** Saved card delete karne par OTP requirement hogi ya direct removal?
