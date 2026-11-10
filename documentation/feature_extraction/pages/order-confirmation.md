# Page Blueprint: Fashion Store - Order Confirmation

---

## 1. Page Overview
- **Screen Name:** Fashion Store - Order Confirmation
- **Stitch Screen ID:** `c5521348b6c346b2acfb7b50b721f6a1`
- **Core Purpose:** Successful checkout ke baad post-purchase acknowledgment screen. Yeh order reference number (`#LG-94218`), live logistics courier tracking timeline, shipment package contents, verified payment receipt/blockchain transaction hash, invoice download CTA, concierge support triggers, aur next-purchase recommendations display karta hai.
- **Entry Point / Navigation Route:** Checkout Payment page (`74baeee3a5794f839bbc1d149744e1e4`) par payment transaction successfully authenticate hone ke baad automatic redirect.
- **Shared Components Used:**
  - Header & Global Navigation: [navigation.md](../shared/navigation.md)
  - Footer & Brand Links: [footer.md](../shared/footer.md)

---

## 2. Layout aur Sections (Top to Bottom)

### Section 1: Global Navigation Header (Shared Component)
- **Reference:** Dekhein [navigation.md](../shared/navigation.md)
- **Short Purpose:** Persistent top bar with brand logo, search bar, and user profile utilities.

### Section 2: Checkout Progression Stepper (`CheckoutStepper`)
- **Elements:**
  - Step 1: `Cart` (Completed checkmark).
  - Step 2: `Address` (Completed checkmark).
  - Step 3: `Payment` (Completed checkmark).
  - Step 4: `Order Confirmed` (Active celebration step with green checkmark badge).
- **Short Purpose:** Checkout completion milestone visual confirmation.

### Section 3: Success Hero Celebration Banner
- **Elements:**
  - Success Icon: Circular animated green checkmark badge (`Order Placed Successfully`).
  - Heading 1 (`h1`): `Thank You For Your Order!`.
  - Notification Confirmation: `Order #LG-94218 has been confirmed. Confirmation details sent to dipanshu@example.com & +91 98765 43210.`
  - Express Delivery Logistics Pill: `Express Delivery: Tomorrow by 5:00 PM • Courier Assigned: BlueDart Air`.
  - Primary Action CTAs:
    - Button 1: `Track Order` (solid black primary pill).
    - Button 2: `Download Invoice` (outline button with download icon).
    - Button 3: `Continue Shopping →` (accent link button).
- **Short Purpose:** Immediate order confirmation, invoice access, aur tracking shortcut provide karna.

### Section 4: Split Logistics Tracking & Financial Summary (`CartMainSection`)
Split 2-column layout:
- **Left Column (8/12 grid span): Live Tracking Timeline, Delivery Destination, & Package Items**
- **Right Column (4/12 grid span): Payment Receipt, Final Price Summary, & Support Concierge**

#### 4.1 Left Column: Logistics & Shipment Breakdown
- **Order Tracking Status Timeline (`Order Tracking Status`):**
  - Tracking Bar Header: `Order Tracking Status` | Status Badge: `On Schedule` | Airway Bill No: `AWB: BD-84920188`.
  - 4-Stage Horizontal Stepper:
    - Stage 1: `Confirmed` (Timestamp: `Today, 11:42 AM` - Green Checkmark).
    - Stage 2: `Processing` (Status: `Packing at Hub` - Active in-progress pulse).
    - Stage 3: `Shipped` (ETA: `Expected 6 PM` - Upcoming pending).
    - Stage 4: `Delivered` (Target: `Tomorrow, 5 PM` - Final destination).
- **Delivery Address Box (`Delivery Address`):**
  - Section Label: `Delivery Address` | Tag: `Home Delivery`.
  - Recipient Name: `Dipanshu`.
  - Address: `45, Green Valley Apartments, Delhi, New Delhi, India - 110001`.
  - Contact & Delivery Instruction: `Phone: +91 98765 43210 • Contactless Delivery Preferred`.
- **Shipment Package Items (`Items in this Shipment (2)`):**
  - Package Header: `Ready for Courier • Package 1 of 1`.
  - Item 1 Card:
    - Title: `Premium Jean's for men` (`h4`).
    - Variant Details: `Size: L | Qty: 1 | Color: Indigo Wash`.
    - Pricing: `$4.55` (Orig: `$7.40`, `68% OFF`).
    - Item Status Badge: `Confirmed` (green tag).
  - Item 2 Card:
    - Title: `Streetwear Tracksuit Set` (`h4`).
    - Variant Details: `Size: M | Qty: 1 | Color: Ash Black`.
    - Pricing: `$4.55` (Orig: `$9.30`, `68% OFF`).
    - Item Status Badge: `Confirmed` (green tag).

#### 4.2 Right Column: Payment Receipt & Price Breakdown
- **Payment Information Card (`Payment Information`):**
  - Payment Status Badge: `Paid` (Solid green badge).
  - Payment Rail / Channel: `USDT (TRC20 Web3 Wallet)`.
  - Blockchain Transaction Hash: `0x8f2a...c94e` (with copy hash trigger).
  - Cashback Reward Notice: `Logo Cash Reward: +$0.46 Credited`.
  - Security Clearance: `256-bit Encrypted Checkout`.
- **Final Price Summary Card (`Final Price Summary`):**
  - Savings Header: `Saved $7.50`.
  - Total MRP (2 items): `$16.70`.
  - Product Discount: `-$7.60 (45% OFF)`.
  - Coupon Discount (`SUMMER25`): `-$2.50`.
  - Logo Cash Store Credit Applied: `-$9.10`.
  - Platform Fee: `$0.10`.
  - Delivery Fee: `$0.89` (Marked `Free`).
  - Total Amount Paid: `$9.10 (48% OFF)` (Includes all applicable taxes).
- **24/7 Concierge Support Card:**
  - Description: `"Our concierge support is available 24/7. You can easily modify, return, or request exchanges within 14 days of delivery."`
  - Action Links: `Chat With Support` | `Return Policy` (links to `e8fbbb4e2424418d8627b370d083d13f`).
  - Guarantee Seal: `Protected by 100% Purchase Guarantee`.

### Section 5: Post-Purchase Discovery ("You May Also Like")
- **Heading:** `You May Also Like`
- **4-Column Product Grid:**
  - Card 1: `Classic Denim Overshirt`
  - Card 2: `Urban Cargo Sweatpants`
  - Card 3: `Vintage Graphic Cotton Tee`
  - Card 4: `Minimalist Fleece Hoodie`

### Section 6: Global Site Footer (Shared Component)
- **Reference:** Dekhein [footer.md](../shared/footer.md)
- **Short Purpose:** Global footer with legal terms, policies, accepted methods, and Telegram community CTA.

---

## 3. Options aur Sub-options
- **Post-Purchase Actions:**
  - `Track Order` (triggers live map / courier tracking view)
  - `Download Invoice` (downloads PDF receipt)
  - `Continue Shopping` (navigates back to storefront)
- **Support Triggers:**
  - `Chat With Support` (opens live chat / help desk)
  - `Return Policy` (opens return policy document)

---

## 4. Interactions aur Navigation
- `[Track Order Button]` → Click → Navigates to user's My Orders screen (`e3e45c6ce88f4cafa63af67d7cc171b6`) with tracking timeline active
- `[Download Invoice Button]` → Click → Triggers PDF generation and browser download
- `[Continue Shopping Link]` → Click → Navigates to Home Page (`3775121018898025092`)
- `[Copy Hash on Transaction ID]` → Click → Copies Web3 tx hash (`0x8f2a...c94e`) to clipboard
- `[Chat With Support Link]` → Click → Opens Help Center / Live Chat widget (`a7e8450a14ba4af5a9eaad7e6104f5a2`)
- `[Return Policy Link]` → Click → Navigates to Return & Exchange Policy screen (`e8fbbb4e2424418d8627b370d083d13f`)
- `[You May Also Like Card]` → Click → Navigates to Product Detail Page (`3907466636638916715`)

---

## 5. Content aur Data Classification

| Element / Field | Data Type | Example Value Shown in Design | Notes & Source Confirmation |
| :--- | :--- | :--- | :--- |
| **Order Number** | Unique Transaction Key | `#LG-94218` | Master order reference |
| **Airway Bill (AWB)**| Logistics Carrier Data | `BD-84920188` | BlueDart tracking number |
| **Courier Carrier** | Logistics Data | `BlueDart Air` | Assigned express delivery partner |
| **Recipient Email** | User Data | `dipanshu@example.com` | Order confirmation email recipient |
| **Recipient Phone** | User Data | `+91 98765 43210` | SMS notification recipient |
| **Estimated Delivery**| Calculated Logistics | `Tomorrow by 5:00 PM` | Guaranteed delivery window |
| **Payment Rail** | Transaction Data | `USDT (TRC20 Web3 Wallet)` | Selected payment method |
| **Blockchain Hash** | Crypto Ledger Key | `0x8f2a...c94e` | On-chain settlement transaction |
| **Loyalty Reward** | Account Incentive | `+$0.46 Credited` | Logo Cash cashback credit |
| **Net Amount Paid** | Transaction Total | `$9.10 (48% OFF)` | Total settled amount |

---

## 6. States aur Variations
- **Logistics Timeline States:**
  - Completed: Green solid circle with white checkmark (`Confirmed`).
  - Current Active: Animated pulsing ring (`Processing - Packing at Hub`).
  - Future Pending: Muted gray circle with step number (`Shipped`, `Delivered`).
- **Payment Method Variations:**
  - Crypto Payment: Displays Blockchain Tx Hash + Logo Cash reward.
  - Card/Fiat Payment: Displays Masked Card Number (`•••• 4242`) + Bank Approval Ref: Design mein specified nahi (standard fallback).

---

## 7. Visual & Styling Notes
- **Color Accents:**
  - Success Green: `#22c55e` (Hero celebration badge, timeline checkmarks, paid badge)
  - Dark Charcoal: `#111827` (Primary buttons, text headers)
  - Warm Neutral Background: `#FAF6F6`
  - Card Surfaces: White `#ffffff` with subtle borders (`#e5e7eb`)
- **Typography:** `Inter` for clean structured data and timeline labels.
- **Button Variants:** Black pill button for `Track Order`, subtle outline pill for `Download Invoice`.

---

## 8. Confirm Karna Baaki (Gaps & Questions)
1. **Invoice PDF Generation Source:** Kya invoice server-side PDF stream se download hoga ya client-side HTML printable view render karega?
2. **Order Modification Window:** Subtitle me likha hai *"You can easily modify, return, or request exchanges within 14 days"*. Order placement ke baad address ya size modify karne ke liye kya cancel/edit button active window hoti hai?
3. **Multi-Package Split Handling:** Design me `Ready for Courier Package 1 of 1` specified hai. Agar multiple vendors se split order ho toh multiple package tracking cards render honge ya consolidated?
