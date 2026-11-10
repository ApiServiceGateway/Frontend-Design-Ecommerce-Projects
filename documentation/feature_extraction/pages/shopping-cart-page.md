# Page Blueprint: Fashion Store - Shopping Cart & Checkout with Product Grids

---

## 1. Page Overview
- **Screen Name:** Fashion Store - Shopping Cart & Checkout with Product Grids
- **Stitch Screen ID:** `34be094d0f524a249a58ed95b4c9e07e`
- **Core Purpose:** Selected cart items ka review, quantity/size adjustment, coupon application, integrated checkout tabs (Payment Method preferences, EcoGreen donation, gift packaging instructions), comprehensive price breakdown, aur personalized cross-sell recommendations (`You may also like`).
- **Entry Point / Navigation Route:** Header shopping bag icon click, PDP "Add to Cart" or "Shop Now" action button.
- **Shared Components Used:**
  - Header & Global Navigation: [navigation.md](../shared/navigation.md)
  - Footer & Brand Links: [footer.md](../shared/footer.md)

---

## 2. Layout aur Sections (Top to Bottom)

### Section 1: Global Navigation Header (Shared Component)
- **Reference:** Dekhein [navigation.md](../shared/navigation.md)
- **Short Purpose:** Persistent top utility bar with logo, categories, search, profile, cart counter, wishlist, and notifications.

### Section 2: Checkout Stepper Header (`CheckoutStepper`)
- **Elements:**
  - Step 1: `Cart` (Active step highlighted with bold text and accent underline).
  - Step 2: `Address` (Inactive upcoming step).
  - Step 3: `Summary` / `Payment` (Inactive upcoming step).
- **Short Purpose:** Multi-step checkout progression bar.

### Section 3: Split Cart & Checkout Hub (`CartMainSection`)
Split 2-column layout:
- **Left Column (8/12 grid span): Cart Items List & Delivery Address**
- **Right Column (4/12 grid span): Interactive Checkout Tabs & Price Breakdown**

#### 3.1 Left Column: Cart Items & Destination
- **Cart Items (Multi-Item List):**
  - Item Checkbox: Individual select/deselect item toggle.
  - Product Image Frame: Vertical portrait aspect ratio with rounded corners.
  - Product Metadata:
    - Brand Name: `Peter England` (`h3` bold).
    - Product Title: `Premium Jean's for men`.
    - Badge Tag: `Hot Deal` (pill tag).
    - Attribute Selectors: `Size: 41` dropdown/label, `Qty: 2` dropdown counter.
  - Dual Currency Price Block:
    - Fiat: `Rs. 899` (Strikethrough `Rs. 1099` / `Rs. 1599`, `68% OFF`).
    - Crypto Stablecoin: `$4.55 USDT` (Strikethrough `$7.4` / `$9.3`, `68% OFF`).
  - Delivery Incentive Tag: `Delivery $0.55 FREE`.
  - Payment Advantage Badge: `Best Price with crypto payment`.
  - Item Action Controls: Remove / Delete icon button.
- **Delivery Destination Preview Strip:**
  - Pincode & Name: `Delivery to Dipanshu , 110001`
  - Full Address: `45, Green Valley Apartments , Delhi, New Delhi, India`
  - Action Link: `Change` (triggers address selection modal).

#### 3.2 Right Column: Interactive Tabs, Coupons & Price Summary
- **Three-Way Utility Tab Switcher:**
  - Tab 1: `Payment method` (Default active).
  - Tab 2: `Donation`.
  - Tab 3: `Instructions`.
- **Tab Panel 1: Payment Method:**
  - Radio Card 1 (Crypto): `Crypto (Instant & 5% Bonus - Pay with Bitcoin, Ethereum, USDT, and more secure & borderless)`.
  - Radio Card 2 (Fiat): `INR / Fiat (Cards • UPI • Wallets - Multiple payment options including cards, UPI, and wallets)`.
- **Tab Panel 2: EcoGreen Donation:**
  - Title: `Donate to EcoGreen Fund`
  - Preset Chips: `$0.1`, `$0.5`, `$1.0`, `Custom`
  - Subtitle: `"Your donation helps us create a better future—every contribution counts!"`
- **Tab Panel 3: Packaging Instructions:**
  - Toggle options: `Gift Pack`, `Greeting Card`, `No Price Tag`.
  - Textarea: `Message for Greeting Card`.
- **Coupon Application Container:**
  - Header: `Apply Coupons` | Link: `View All`
  - Input: Coupon code text field + `Apply` button.
  - Active Suggestion Chip: `SUMMER25 - Save $2.50 on orders above $15` with one-click `Apply`.
- **Price Details Breakdown Card:**
  - Header: `Price Details (2 item)`.
  - Total Price (Gross): `$16.7`.
  - Itemized lines:
    - `1st item (2)`: `$4.55` (was `$7.4`, `68% OFF`).
    - `2nd item (2)`: `$4.55` (was `$9.3`, `68% OFF`).
  - Total Discount: `-$7.50 (48% OFF)`.
  - Coupons Applied: `No coupon applied` (or discount amount if applied).
  - Platform Fee: `$0.1`.
  - Delivery Charges: `$0.89` marked with green `Free`.
  - Net Payable Total: `$9.10 (48% OFF)`.
  - Primary Action Button: `$9.10 Continue` (high-contrast pill CTA).
  - Security Guarantee Seal: `Protected by black rocks` / SSL 256-bit secure badge.

### Section 4: Cross-Sell Recommendations ("You May Also Like")
- **Header:** `You may also like`
- **Grid Layout:** 8-card responsive product showcase.
- **Featured Items (Brand: `FOREVER GLAM`):**
  - `Off-White Structured Shoulder Bag` | `₹ 2099`
  - `Black Trapeze Shoulder Bag` | `₹ 1699`
  - `Taupe Floral Embroidered Mules` | `₹ 1699`
  - `Casual Women Kitten Heels` | `₹ 899` (Orig: `₹ 1999`, `55% OFF`)
  - `Classic Quilted Crossbody` | `₹ 2499` (Orig: `₹ 3999`, `38% OFF`)
  - `Minimalist Block Heel Sandal` | `₹ 1499` (Orig: `₹ 2499`, `40% OFF`)
  - `Suede Slouchy Tote` | `₹ 2899`
  - `Pointed Toe Slingback` | `₹ 1799` (Orig: `₹ 2999`, `40% OFF`)

### Section 5: Global Site Footer (Shared Component)
- **Reference:** Dekhein [footer.md](../shared/footer.md)
- **Short Purpose:** Global footer with trust seals, links, legal policies, and Telegram community CTA.

---

## 3. Options aur Sub-options
- **Checkout Tabs Hierarchy:**
  - `Payment method`
    - Option 1: Crypto (Instant + 5% Bonus)
    - Option 2: INR / Fiat (Cards, UPI, Wallets)
  - `Donation`
    - `$0.1`
    - `$0.5`
    - `$1.0`
    - `Custom` (reveals custom numeric input)
  - `Instructions`
    - `Gift Pack`
    - `Greeting Card`
    - `No Price Tag`
    - `Greeting Card Message`
- **Cart Item Dropdowns:**
  - Size Selector (`Size: 41`)
  - Quantity Selector (`Qty: 2`)
- **Coupon Options:**
  - Promo code text input
  - Suggested coupon list modal (`View All`)

---

## 4. Interactions aur Navigation
- `[Item Select Checkbox]` → Click → Toggles item inclusion in order calculation
- `[Quantity / Size Dropdowns]` → Select → Updates item quantity/size, recalculates total price
- `[Item Remove Trash Icon]` → Click → Removes item from cart with confirmation toast
- `[Change Delivery Address Link]` → Click → Opens saved address selection modal (`2417882353337703871`)
- `[Tab Switcher (Payment / Donation / Instructions)]` → Click → Toggles corresponding configuration panel
- `[Crypto / Fiat Radio Option]` → Click → Selects active checkout currency mode, recalculates 5% bonus if crypto selected
- `[Donation Amount Chip]` → Click → Adds chosen donation amount ($0.1, $0.5, $1.0) to price details total
- `[Packaging Instruction Chips]` → Click → Toggles toggle state (Gift pack, No price tag)
- `[Apply Coupon Button]` → Click → Validates code, applies discount rebate to summary
- `[Continue Button]` → Click → Navigates to Checkout Delivery Address screen (`2417882353337703871`)
- `[Recommendation Card Click]` → Click → Navigates to Product Detail Page (`3907466636638916715`)

---

## 5. Content aur Data Classification

| Element / Field | Data Type | Example Value Shown in Design | Notes & Source Confirmation |
| :--- | :--- | :--- | :--- |
| **Active Stepper Step** | UI Navigation State | `Cart` | Current stage indicator |
| **Product Brand** | Product Data | `Peter England` | Vendor name |
| **Product Title** | Product Data | `Premium Jean's for men` | Catalog product name |
| **Item Quantity** | User Input / Cart State | `Qty: 2` | Selected cart item units |
| **Item Size** | Product Attribute | `Size: 41` | Selected apparel size |
| **Fiat Item Price** | Product Data | `Rs. 899` (Orig: `Rs. 1099`) | Retail price |
| **Crypto Item Price**| Product Data | `$4.55` (Orig: `$7.4`) | Stablecoin price |
| **Delivery Address** | Dynamic User Data | `Dipanshu, 110001 - Delhi, New Delhi` | Active destination |
| **Suggested Coupon** | Marketing Data | `SUMMER25` | Promo discount code |
| **Gross Total Price** | Calculated Data | `$16.7` | Subtotal before discounts |
| **Total Discount** | Calculated Data | `-$7.50 (48% OFF)` | Accumulated savings |
| **Platform Fee** | Pricing Config | `0.1$` | System processing fee |
| **Delivery Fee** | Pricing Config | `$0.89 Free` | Waived shipping fee |
| **Net Payable Total** | Calculated Data | `$9.10 (48% OFF)` | Final transaction amount |

---

## 6. States aur Variations
- **Empty Cart State:** Design mein specified nahi (current design shows 4 active items).
- **Tab State:** Active tab has white background with border and shadow (`bg-white text-slate-900 border border-slate-300 shadow-sm`); inactive tabs have muted gray text.
- **Custom Donation State:** Clicking `Custom` reveals custom numeric input box.
- **Delivery Free State:** Delivery fee shows strike-through `$0.89` with green `Free` tag.

---

## 7. Visual & Styling Notes
- **Color Accents:**
  - Green Success: `#22c55e` (Free delivery, verified discounts)
  - Pink/Coral Accent: `#FF3F6C` (Badges, brand highlights)
  - Discount Teal: `#14CDA8`
  - Surfaces: `#FAF6F6` (Light warm background), pure white `#ffffff` cards with delicate shadows (`box-shadow: 0 2px 10px rgba(0,0,0,0.03)`).
- **Typography:** `Inter` for functional data, `Georgia` serif accents for refined luxury feel.
- **Buttons:** Bold black rounded pill button for `Continue`.

---

## 8. Confirm Karna Baaki (Gaps & Questions)
1. **Multi-Currency Settlement:** Price details card displays prices purely in USD/USDT (`$9.10 Total`), jabki items me dual prices (`Rs. 899` / `$4.55`) dono hain. Kya final checkout fiat INR me hoga ya crypto USDT me?
2. **Gift Message Character Limit:** `Message for Greeting Card` textarea ke liye character count constraint (e.g. 150 chars) specify karna baaki hai.
3. **5% Crypto Bonus Mechanism:** Crypto option me likha hai `Instant & 5% Bonus`. Kya yeh bonus cart total par 5% extra discount ke roop me deduct hota hai ya wallet cash-back banta hai?
