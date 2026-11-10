# Page Blueprint: Fashion Store - Checkout Payment

---

## 1. Page Overview
- **Screen Name:** Fashion Store - Checkout Payment
- **Stitch Screen ID:** `74baeee3a5794f839bbc1d149744e1e4`
- **Core Purpose:** Checkout Funnel Step 3 (Final Payment). Is page par user multiple payment rails (Saved Cards/UPI 1-Click checkout, Web3/Crypto with 5% cashback, Debit/Credit Cards, UPI/QR Code, Net Banking, aur Cash on Delivery) me se preferred channel select karke order transaction finalize karta hai, aur Logo Cash store credit apply kar sakta hai.
- **Entry Point / Navigation Route:** Checkout Delivery Address page (`2417882353337703871`) se "Continue to Payment" CTA click karne par.
- **Shared Components Used:**
  - Header & Global Navigation: [navigation.md](../shared/navigation.md)
  - Footer & Brand Links: [footer.md](../shared/footer.md)

---

## 2. Layout aur Sections (Top to Bottom)

### Section 1: Global Navigation Header (Shared Component)
- **Reference:** Dekhein [navigation.md](../shared/navigation.md)
- **Short Purpose:** Top brand header with search and utility icons.

### Section 2: Checkout Progression Stepper (`CheckoutStepper`)
- **Elements:**
  - Step 1: `Cart` (Completed checkmark/link).
  - Step 2: `Address` (Completed checkmark/link).
  - Step 3: `3 Payment` (Active step highlighted with dark badge / accent underline).
- **Short Purpose:** Final step indication in checkout funnel.

### Section 3: Split Payment Methods & Order Summary (`CartMainSection`)
Split 2-column layout:
- **Left Column (8/12 grid span): Destination Snippet, Store Credit, & Payment Methods Accordion**
- **Right Column (4/12 grid span): Itemized Order Summary & Sticky Pay Card**

#### 3.1 Left Column: Payment Rail Selection
- **Delivery Destination Preview Banner:**
  - Recipient: `Delivering to: Dipanshu, 110001 (Home)`
  - Full Address: `45, Green Valley Apartments, Delhi, New Delhi, India (+91 98765 43210)`
  - Action Link: `Change` (routes back to Address selection step).
- **Store Credit / Loyalty Cash Strip (`Use Logo Cash Store Credit`):**
  - Checkbox toggle: `Use Logo Cash Store Credit`.
  - Available Balance: `$50.00`.
  - Calculation Preview: `Applied from balance -$9.10 • Remaining balance after order: $40.90`.
- **Payment Methods Master Container:**
  - Header: `Payment Options` | Security Badge: `100% Encrypted`.
  - Subhead: `Choose how you'd like to pay for your order` | `Total Payable: $9.10`.
- **Method 1: Saved Payment Methods (Fast Checkout):**
  - Badge: `FAST CHECKOUT - 2 Methods Available`.
  - Card 1 (Saved Visa Card):
    - Logo: `VISA` badge.
    - Title: `HDFC Bank Credit Card •••• 4242`.
    - Cardholder & Expiry: `Dipanshu | Expires 08/28`.
    - Direct Action CTA: `Pay $9.10`.
  - Card 2 (Saved UPI ID):
    - Logo: `UPI` badge.
    - Provider & Handle: `Google Pay / Axis Bank Verified - dipanshu@okhdfcbank`.
    - Direct Action CTA: `Pay Now`.
  - Shortcut Action: `+ Add New Payment Method (Cards, UPI, Wallets)`.
- **Method 2: Crypto Payment (Web3 Recommended):**
  - Badges: `RECOMMENDED`, `Instant 5% Bonus / Cashback`, `Best Value`.
  - Value Proposition: `Pay directly from your web3 wallet or exchange with zero surcharge.`
  - Supported Token Selector Chips:
    - `USDT (TRC20 / ERC20)` (Active/selected chip)
    - `Bitcoin (BTC)`
    - `Ethereum (ETH)`
    - `Solana (SOL)`
  - Cashback Notice: `You will receive $0.46 Logo Cash cashback upon confirmation.`
  - Action CTA Button: `Connect Wallet & Pay` (styled in vibrant Web3/accent pill).
- **Method 3: Credit / Debit Cards:**
  - Card Brand Badges: `Visa, Mastercard, RuPay, Amex`.
  - Security Tag: `Save cards for faster checkout with 256-bit PCI encryption`.
  - Saved Card Entry: `VISA •••• •••• •••• 4242` with CVV input field.
  - Action Button: `Pay $9.10`.
- **Method 4: UPI / Instant QR Code:**
  - Badge: `Instant Approval`.
  - Supported Apps: `Google Pay, PhonePe, Paytm, BHIM`.
  - Feature: Enter custom VPA handle or generate Dynamic Merchant QR Code on screen.
- **Method 5: Net Banking:**
  - Tag: `All major banks supported`.
  - Popular Bank Quick Icons: `HDFC, ICICI, State Bank of India, Axis, Kotak and 40+ others`.
- **Method 6: Cash on Delivery (COD):**
  - Surcharge Tag: `+ ₹50 Handling Fee`.
  - Instructions: `Cash or UPI at doorstep. Verify OTP upon courier arrival. Exact change recommended. ₹50 COD handling charge is non-refundable.`
- **Trust Assurance Footer Strip:**
  - Safe checkout badges, 256-bit encryption guarantee.

#### 3.2 Right Column: Order Summary & Sticky Pay Details
- **Order Items Summary (`Items in Order (2)`):**
  - Status Tag: `Ready to Ship • Order #LG-94218`.
  - Item 1: `Premium Jean's for men` (Size: L | Qty: 1) | `$4.55` (Orig: `$7.40`, `68% OFF`).
  - Item 2: `Streetwear Tracksuit Set` (Size: M | Qty: 1) | `$4.55` (Orig: `$9.30`, `68% OFF`).
- **Delivery Confirmation Summary:**
  - `Delivering to Dipanshu (Home) - Express: Tomorrow, 5 PM`.
- **Applied Coupon Summary:**
  - Tag: `SUMMER25 - $2.50 coupon discount applied`.
  - Action: `Change` coupon link.
- **Price Details Breakdown Card (`Price Details (2 Items)`):**
  - Total Savings Header: `Saving $7.50`.
  - Total MRP: `$16.70`.
  - Product Discount: `-$7.60 (45% OFF)`.
  - Coupon Discount: `-$2.50`.
  - Logo Cash Credit: `-$9.10` (if toggled).
  - Platform Fee: `$0.10`.
  - Delivery Fee: `$0.89` (Marked `Free`).
  - Net Total Payable: `$9.10 (48% OFF)`.
- **Sticky Checkout Action CTA:**
  - Button: `Pay $9.10` (full-width high contrast black pill button).
- **Security Seals:**
  - `100% Purchase Protection • 256-bit Encrypted Checkout • Protected by black rocks`.

### Section 4: Global Site Footer (Shared Component)
- **Reference:** Dekhein [footer.md](../shared/footer.md)
- **Short Purpose:** Site footer with legal links, accepted methods, and Telegram community CTA.

---

## 3. Options aur Sub-options
- **Payment Rails Accordion:**
  - `Saved Payment Methods` (Visa card, Google Pay UPI)
  - `Crypto Payment` (USDT, BTC, ETH, SOL)
  - `Credit / Debit Cards` (Visa, Mastercard, RuPay, Amex)
  - `UPI / QR Code` (GPay, PhonePe, Paytm, QR)
  - `Net Banking` (40+ Indian banks)
  - `Cash on Delivery (COD)` (+ ₹50 surcharge)
- **Store Credit Toggle:**
  - `Use Logo Cash Store Credit` (Checkbox toggle)
- **Crypto Network Tokens:**
  - `USDT (TRC20 / ERC20)`
  - `Bitcoin (BTC)`
  - `Ethereum (ETH)`
  - `Solana (SOL)`

---

## 4. Interactions aur Navigation
- `[Change Delivery Address Link]` → Click → Navigates back to Step 2 (`2417882353337703871`)
- `[Use Logo Cash Checkbox]` → Toggle → Deducts $9.10 from total payable, updates price details line item
- `[Saved Card Pay $9.10 Button]` → Click → Triggers CVV verification / 3D Secure bank OTP flow
- `[Saved UPI Pay Now Button]` → Click → Triggers push notification to UPI app (Google Pay)
- `[Crypto Token Selector Chip]` → Click → Updates active crypto currency, calculates exact token equivalent
- `[Connect Wallet & Pay Button]` → Click → Triggers Web3 wallet connect (MetaMask, Phantom, WalletConnect)
- `[COD Radio Select]` → Click → Adds ₹50 handling fee to price breakdown, sets COD OTP flow
- `[Change Coupon Link]` → Click → Opens coupon selection drawer/modal
- `[Pay $9.10 CTA Button]` → Click → Upon successful transaction, navigates to Order Confirmation page (`c5521348b6c346b2acfb7b50b721f6a1`)

---

## 5. Content aur Data Classification

| Element / Field | Data Type | Example Value Shown in Design | Notes & Source Confirmation |
| :--- | :--- | :--- | :--- |
| **Order ID Preview** | System Generated | `#LG-94218` | Pre-order reference number |
| **Store Credit Balance**| User Dynamic Data | `$50.00` | Account Logo Cash balance |
| **Saved Card Details** | Tokenized Payment Data | `HDFC Bank Credit Card •••• 4242 (Expires 08/28)` | Masked PCI-compliant card token |
| **Saved UPI Handle** | User Payment Data | `dipanshu@okhdfcbank` | Verified VPA handle |
| **Crypto Cashback** | Calculated Marketing | `$0.46 Logo Cash (5%)` | Crypto payment reward incentive |
| **COD Surcharge** | Pricing Config | `₹50 Handling Fee` | Cash on delivery extra charge |
| **Total Payable** | Calculated Data | `$9.10 (48% OFF)` | Final debit amount |

---

## 6. States aur Variations
- **Payment Method Accordion State:** Only one payment rail expanded with active radio state; others collapsed with category header.
- **Logo Cash Full Cover State:** Agar Logo Cash balance order total se zyada ho, toh payable amount `$0.00` ho sakta hai, allowing 1-click zero-gateway checkout.
- **Crypto Connected State:** Wallet connected state displays user public address (`0x...`) with transaction confirmation button.
- **Payment Failure / Timeout State:** Design mein specified nahi.

---

## 7. Visual & Styling Notes
- **Color Accents:**
  - Web3 / Accent Purple: `#793b82` (Crypto highlight)
  - Emerald Green: `#22c55e` (Cashback tag, free delivery)
  - Deep Charcoal: `#111827` (Main buttons, bold typography)
  - Soft Page Background: `#FAF6F6`
- **Typography:** `Inter` for clear financial data readability.
- **Card Framing:** High-contrast border highlights on selected payment rails (`border-slate-800`).

---

## 8. Confirm Karna Baaki (Gaps & Questions)
1. **Web3 Wallet Provider Integration:** `Connect Wallet & Pay` button ke liye specific wallet adapter library (e.g. RainbowKit, Web3Modal, Phantom SDK) confirm karna baaki hai.
2. **COD Pincode Restrictions:** Kya COD high-value orders ya specific rural pincodes par auto-disable hoga?
3. **Crypto Slippage & Buffer:** Crypto tokens (ETH, SOL, BTC) ke volatile exchange rates ke liye slippage tolerance window (e.g. 15 minutes price lock) handle karne ki specification design me mapped nahi hai.
