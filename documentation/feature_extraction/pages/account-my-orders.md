# Page Blueprint: Fashion Account - My Orders

---

## 1. Page Overview
- **Screen Name:** Fashion Account - My Orders
- **Stitch Screen ID:** `e3e45c6ce88f4cafa63af67d7cc171b6`
- **Core Purpose:** Customer ke historic aur active orders ka central tracking hub. Isme timeframe filters (Past 3 months, 2024, 2023, Archived), fulfillment status tabs (`All Orders`, `In Transit`, `Delivered`, `Cancelled/Returned`), order package details, in-line 4-stage logistics stepper, invoice view triggers, returns & exchanges, product review actions, aur 1-click reorder ("Buy Again") options shamil hain.
- **Entry Point / Navigation Route:** Account Dashboard quick tile `Orders` click karne par, header profile menu se, ya order confirmation screen par `Track Order` click karne par (`/account/orders`).
- **Shared Components Used:**
  - Header & Global Navigation: [navigation.md](../shared/navigation.md)
  - Footer & Brand Links: [footer.md](../shared/footer.md)

---

## 2. Layout aur Sections (Top to Bottom)

### Section 1: Global Navigation Header (Shared Component)
- **Reference:** Dekhein [navigation.md](../shared/navigation.md)
- **Short Purpose:** Top utility bar with logo, search, and profile tools.

### Section 2: Account Split Layout (`MainContent`)
Split 2-column layout:
- **Left Column (4/12 grid span): Universal Account Navigation Sidebar (`LeftSidebar`)**
- **Right Column (8/12 grid span): Orders List & Tracking Management (`RightProfileContent`)**

#### 2.1 Left Column: Universal Account Navigation Sidebar (`LeftSidebar`)
- **Active Navigation Item:** `Account Settings` group me `My Orders` highlighted hai.
- **Other Sidebar Links:** `Edit profile`, `Manage address`, `Gift Cards`, `Save UPI`, `Save Card`, `Save Crypto address`, `Two-Factor Auth`, `Change password`, `Change Email`, `Reviews`, `Q&A`, `Policies`, and `Logout`.

#### 2.2 Right Column: Orders Content Hub (`RightProfileContent`)
- **Page Title & Timeframe Header:**
  - Headline (`h1`): `My Orders` (`text-xl font-bold text-slate-800`).
  - Subtitle: `Track shipments, manage returns, and view purchase history`.
  - Timeframe Filter Dropdown / Pills:
    - `Past 3 months` (Default active).
    - `2024`
    - `2023`
    - `Archived`
- **Fulfillment Status Filter Tabs:**
  - Tab 1: `All Orders (5)` (Active underlined pill).
  - Tab 2: `In Transit (1)`
  - Tab 3: `Delivered (3)`
  - Tab 4: `Cancelled / Returned (1)`
- **Order Cards Container (Vertical Stack):**

  ##### Card 1: Recently Delivered Order (`Order #ORD-8921`)
  - **Header Bar:**
    - Order Meta: `Order #ORD-8921` • `Placed: Oct 11, 2024` • `Total: $89.00`.
    - Delivery Badge: `Delivered on Oct 14, 2024` (green success pill).
  - **Item Details:**
    - Image: Square garment thumbnail.
    - Title (`h3`): `Oversized Linen Shirt - Ivory White`.
    - Attributes: `Size: M · Qty: 1 · $89.00`.
    - Logistics Tag: `Standard Delivery · Signature on delivery`.
  - **Action Controls Strip:**
    - Button 1: `Track Package` (outline button).
    - Button 2: `Return or Replace Items` (outline button).
    - Button 3: `Write a Review` (outline button with star icon).

  ##### Card 2: Active In-Transit Order with Live Progress Bar (`Order #ORD-8904`)
  - **Header Bar:**
    - Order Meta: `Order #ORD-8904` • `Placed: Oct 19, 2024` • `Total: $120.00`.
    - Status Badge: `In Transit • Expected Oct 22, 2024` (sky-blue in-transit pill).
  - **Item Details:**
    - Image: Charcoal trouser thumbnail.
    - Title (`h3`): `Tailored Pleated Trousers - Charcoal`.
    - Attributes: `Size: 32 · Qty: 1 · $120.00`.
    - Logistics Tag: `Express Courier · Tracking ID #TRK-98310`.
  - **Live Visual Progress Stepper:**
    - Step 1: `Ordered Oct 19` (Green checkmark complete).
    - Step 2: `Shipped Oct 20` (Green checkmark complete).
    - Step 3: `Out for Delivery Today` (Active highlighted step).
    - Step 4: `Delivered Expected Oct 22` (Upcoming target step).
  - **Action Controls Strip:**
    - Button 1: `Live Tracking` (solid primary accent button).
    - Button 2: `Cancel Item` (destructive/neutral button).
    - Button 3: `Need Help?` (concierge query trigger).

  ##### Card 3: Past Delivered Order with Closed Return Window (`Order #ORD-8730`)
  - **Header Bar:**
    - Order Meta: `Order #ORD-8730` • `Placed: Sep 25, 2024` • `Total: $145.00`.
    - Status Badge: `Delivered on Sep 28, 2024`.
  - **Item Details:**
    - Image: Silk blend shirt thumbnail.
    - Title (`h3`): `Oversized Silk Blend Shirt - Champagne`.
    - Attributes: `Size: M · Qty: 1 · $145.00`.
    - Logistics Tag: `Standard Delivery · Delivered to front porch`.
  - **Status Callout:**
    - Note: `Return Window Closed` (muted text indicating expired 14-day return eligibility).
  - **Action Controls Strip:**
    - Button 1: `Buy Again` (reorder CTA button).
    - Button 2: `View Invoice` (downloadable receipt trigger).

- **Bottom Security & Guarantee Seal:**
  - `Protected by Secure Purchase Guarantee` with shield icon.

### Section 3: Global Site Footer (Shared Component)
- **Reference:** Dekhein [footer.md](../shared/footer.md)
- **Short Purpose:** Global footer with legal policies and community links.

---

## 3. Options aur Sub-options
- **Timeframe Selector:**
  - `Past 3 months`
  - `2024`
  - `2023`
  - `Archived`
- **Status Filter Tabs:**
  - `All Orders (5)`
  - `In Transit (1)`
  - `Delivered (3)`
  - `Cancelled / Returned (1)`
- **Order Action Options:**
  - `Track Package` / `Live Tracking`
  - `Return or Replace Items`
  - `Write a Review`
  - `Cancel Item`
  - `Buy Again`
  - `View Invoice`

---

## 4. Interactions aur Navigation
- `[Status Filter Tab Click]` → Click → Re-filters order list (e.g. clicking `In Transit (1)` shows only Card 2)
- `[Timeframe Dropdown Select]` → Select → Re-fetches orders placed within selected timeframe
- `[Track Package / Live Tracking Button]` → Click → Expands real-time courier map modal with GPS status
- `[Return or Replace Items Button]` → Click → Opens return workflow with reason checklist
- `[Write a Review Button]` → Click → Navigates to My Reviews & Ratings page (`4015455779403067258`) with item pre-selected
- `[Cancel Item Button]` → Click → Triggers order cancellation confirmation dialog (only active before shipment)
- `[Buy Again Button]` → Click → Adds item to cart (`34be094d0f524a249a58ed95b4c9e07e`) and redirects to Cart
- `[View Invoice Button]` → Click → Downloads PDF tax invoice receipt
- `[Need Help? Button]` → Click → Navigates to Help Center & Query Hub (`a7e8450a14ba4af5a9eaad7e6104f5a2`)

---

## 5. Content aur Data Classification

| Element / Field | Data Type | Example Value Shown in Design | Notes & Source Confirmation |
| :--- | :--- | :--- | :--- |
| **Order ID** | System Reference Key | `#ORD-8921`, `#ORD-8904`, `#ORD-8730` | Unique purchase key |
| **Placement Date** | Historical Date | `Oct 11, 2024` | Order timestamp |
| **Order Total** | Monetary Amount | `$89.00`, `$120.00`, `$145.00` | Settled price |
| **Fulfillment Status**| Logistics State | `Delivered`, `In Transit` | Current package milestone |
| **Product Title** | Product Data | `Oversized Linen Shirt - Ivory White` | Purchased item name |
| **Item Specs** | Order Snapshot Data | `Size: M · Qty: 1 · $89.00` | Size/Quantity/Price at purchase |
| **Courier Tracking ID**| Logistics Carrier Data | `#TRK-98310` | Third-party courier tracking number |
| **Delivery ETA** | Logistics Estimate | `Expected Oct 22, 2024` | Delivery promise window |

---

## 6. States aur Variations
- **Active Order Tab State:** Selected tab displays bold label with dark underline or pill badge; inactive tabs have muted gray count.
- **Live Tracking Progress Stepper States:**
  - Completed milestones: Filled green circle with checkmark.
  - Current milestone: Pulsing blue indicator (`Out for Delivery Today`).
  - Pending milestone: Gray circle with target text.
- **Return Eligibility State:**
  - Active: `Return or Replace Items` button visible.
  - Expired: Replaced with `Return Window Closed` muted label.
- **Empty Orders State:** Design mein specified nahi (currently renders 3 populated order cards).

---

## 7. Visual & Styling Notes
- **Color Accents:**
  - Success Green: `#22c55e` (Delivered status, completed timeline nodes)
  - In-Transit Sky Blue: `#0284c7` (Live tracking highlights)
  - Neutral Background: `#FAF4F4`
  - Card Surfaces: Pure white `#ffffff` with subtle gray borders (`border-slate-200/80`)
- **Typography:** `Plus Jakarta Sans` for clean tabular numbers and status tags.
- **Card Framing:** High visual distinction between delivered orders and active transit orders.

---

## 8. Confirm Karna Baaki (Gaps & Questions)
1. **Return Window Policy Limit:** Design me Card 3 par `Return Window Closed` dikhta hai jabki order 25 days purana hai. Return window ka exact limit (14 days ya 30 days) backend logic me confirm hona baaki hai.
2. **Order Search Input:** Agar customer ke paas 50+ historic orders ho, toh specific order ID ya product search bar filter missing hai.
3. **Partial Cancellation Handling:** Multiple items wale order me kya individual item cancel ho sakta hai ya poora shipment cancel hoga?
