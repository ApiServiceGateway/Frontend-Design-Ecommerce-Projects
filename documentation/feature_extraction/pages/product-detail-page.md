# Page Blueprint: Fashion Store - Product Detail Page (PDP)

---

## 1. Page Overview
- **Screen Name:** Fashion Store - Product Detail Page
- **Stitch Screen ID:** `3907466636638916715`
- **Core Purpose:** Individual product ki exhaustive visual presentation, multi-angle thumbnails, dual-currency pricing (Fiat & Crypto USDT), color/size variant selection, pincode/address delivery validation, detailed specifications table, verified customer reviews, aur personalized cross-sell recommendations (`Similar Products` & `TOP PICKUP FOR YOU`).
- **Entry Point / Navigation Route:** Home Page featured cards, Product Category Page (PLP) card click (`/product/[id]`), Wishlist item click, or Cart recommended items.
- **Shared Components Used:**
  - Header & Global Navigation: [navigation.md](../shared/navigation.md)
  - Footer & Brand Links: [footer.md](../shared/footer.md)

---

## 2. Layout aur Sections (Top to Bottom)

### Section 1: Global Navigation Header (Shared Component)
- **Reference:** Dekhein [navigation.md](../shared/navigation.md)
- **Short Purpose:** Persistent top utility header with logo, category dropdowns, search bar, and cart counter.

### Section 2: Product Hero Showcase & Buy Box (`ProductHeroSection`)
Split 2-column hero layout:
- **Left Column: Multi-Angle Media Gallery**
  - Thumbnails Strip (`Thumbnails Column`): Left-aligned vertical column of multi-angle product thumbnail previews. Active thumbnail has an highlighted accent border.
  - Main Hero Showcase Image: Large high-resolution zoomable product image with rounded corners.
  - Floating Action Icons (Top Right of image):
    - Share Icon button (`fa-solid fa-share-nodes` / share trigger)
    - Wishlist Toggle button (`fa-regular fa-heart` / heart toggle)
- **Right Column: Purchase Details & Variant Selectors (`Right: Product Purchase Details`)**
  - Collection & Promo Tags: Badges `PREMIUM ATHLEISURE`, `Hot Deal 🔥 Comfortable & Elegant`.
  - Product Title (`h1`): `Graceful Flow Maxi Dress`.
  - Styling Recommendation Note: `"Layer with a stylish blazer for a semi-formal outfit"`.
  - Dual-Currency Pricing Block:
    - Fiat Currency: Main price `₹ 500 /-`, strikethrough original `₹ 1599`, discount percentage `(68% off)`.
    - Crypto Stablecoin: Crypto price `$ 4.4 USDT`, strikethrough original `$6.8`, discount percentage `(68% off)`.
  - Editorial Description Block:
    - Heading: `Description`
    - Content: `"Step into effortless elegance with our Graceful Flow Maxi Dress, designed for women who love comfort and style. Made from premium chiffon fabric, this long dress offers a soft, breathable feel..."`
  - Color Variant Selector:
    - Active label: `Color Lemon`
    - Interactive circular color swatches (e.g. Lemon yellow, pastel green, sky blue, lavender).
  - Size Variant Selector:
    - Active label: `Size 22`
    - Reference link: `Size Chart` (triggers size guide modal/flyout).
    - Size selection pill buttons: `22`, `23`, `24`, `26`.
  - Primary Action CTAs:
    - `Add to Cart` Button (Prominent outline / secondary button).
    - `Shop Now` / `Buy Now` Button (High-contrast solid primary CTA).

### Section 3: Delivery Details, Specifications & Reviews (`ProductMetadataAndReviews`)
Split 2-column detailed specs and social proof layout:
- **Left Sub-Column: Delivery Address & Trust Guarantees**
  - Pincode / Delivery Estimator Box:
    - Title / Current Destination: `Delivery to Dipanshu , 110001`
    - Address Summary: `45, Green Valley Apartments , Delhi,New Delhi, India`
    - Action: `Change` link button (opens address selector modal).
  - Trust Badges Strip:
    - Badge 1: `%` Symbol → **"100% Original"**
    - Badge 2: `XM` Mark → **"Premium Quality"**
    - Badge 3: Truck Icon → **"Trusted Seller"**
- **Right Sub-Column: Technical Specifications & Customer Reviews**
  - Product Details Table Card (`Product Details Card`):
    - Section Heading: `Product Details`
    - Spec Grid:
      - Product code: `423.42334.55`
      - Material: `Polyester & Spandex Blend`
      - Fit: `Regular Fit`
      - Waistband: `Elastic with Drawstring`
      - Available sizes: `S, M, L, XL, XXL`
      - Available colors: `Black, Navy Blue, Grey, Olive Green`
    - Extended Specs Copy: Experience unmatched comfort, fabric composition notes.
  - Customer Ratings & Reviews Card (`Customer Ratings & Reviews Card`):
    - Section Heading: `Customer Ratings & Reviews`
    - Rating Summary: `4.5 ★` with counter `90 ratings and 2 reviews`
    - Action CTA: `+Add` (triggers review submission form)
    - Review Cards List:
      - Reviewer: `Dipanshu` | Rating: `4.5 ★` | Date: `4 month ago` | Badge: `Purchased verified • 4 months ago`
      - Comment: `"It's very awesome and cool and made of soft fabric"`

### Section 4: Cross-Sell & Upsell Recommendation Carousels
- **Carousel 1: Similar Products (`SimilarProductsCarousel`)**
  - Section Heading: `Similar Products`
  - Horizontal Product Cards:
    - Brand: `FOREVER GLAM`
    - Item 1: `Off-White Structured Shoulder Bag` | `₹ 2099`
    - Item 2: `Black Trapeze Shoulder Bag` | `₹ 1699`
    - Item 3: `Taupe Floral Embroidered Mesh Pointed Toe Flats` | `₹ 1699`
    - Item 4: `Pink Assorted - Others Casual Women Shoes` | `₹ 899` (Orig: `₹ 1999`, `55% OFF`)
- **Carousel 2: Top Pickup For You (`TOP PICKUP FOR YOU`)**
  - Section Heading: `TOP PICKUP FOR YOU`
  - Filtered items matching user taste profile and styling pairing.

### Section 5: Global Site Footer (Shared Component)
- **Reference:** Dekhein [footer.md](../shared/footer.md)
- **Short Purpose:** Global brand footer with support links, policies, and community callout.

---

## 3. Options aur Sub-options
- **Color Selection Options:**
  - `Lemon` (Selected / default active)
  - Color swatches palette (clickable round pills)
- **Size Selection Options:**
  - `22` (Selected / active)
  - `23`
  - `24`
  - `26`
- **Delivery Destination Selector:**
  - Default saved address (`Dipanshu, 110001`)
  - `Change` button for selecting other saved addresses or entering a new pincode
- **Size Chart Trigger:**
  - Modal overlay / table showing measurements (Bust, Waist, Length, Hips)

---

## 4. Interactions aur Navigation
- `[Thumbnail Image Click / Hover]` → Click → Updates main hero showcase image to selected angle
- `[Share Icon Button]` → Click → Triggers native web share dialog or copies product link
- `[Wishlist Heart Icon]` → Click → Toggles heart fill, saves item to user Wishlist (`ce90bd7999304498b3fe74d1e925775f`)
- `[Color Swatch Pill]` → Click → Switches selected color, updates label text, updates image set
- `[Size Pill]` → Click → Selects active size (highlighted with bold border)
- `[Size Chart Link]` → Click → Size chart modal khulna confirm karna baaki
- `[Add to Cart Button]` → Click → Adds selected variant to Cart, increments header cart count badge, displays confirmation drawer/toast
- `[Shop Now Button]` → Click → Direct checkout route (`/checkout` or opens Cart `34be094d0f524a249a58ed95b4c9e07e`)
- `[Delivery Change Link]` → Click → Address selector popup / Pincode checker input
- `[+Add Review Button]` → Click → Review submission modal/form khulna confirm karna baaki
- `[Similar Products Card]` → Click → Navigates to that specific product's PDP

---

## 5. Content aur Data Classification

| Element / Field | Data Type | Example Value Shown in Design | Notes & Source Confirmation |
| :--- | :--- | :--- | :--- |
| **Product Title** | Product Data | `Graceful Flow Maxi Dress` | Catalog product name |
| **Product Subtitle** | Marketing Copy | `Layer with a stylish blazer for a semi-formal outfit` | Styling suggestion |
| **Badge Tag** | Product Tag | `PREMIUM ATHLEISURE`, `Hot Deal 🔥` | Merchandising badges |
| **Fiat Selling Price** | Product Pricing | `₹ 500 /-` | Discounted retail price |
| **Fiat MRP Price** | Product Pricing | `₹ 1599` | Original strikethrough price |
| **Crypto Selling Price**| Product Pricing | `$ 4.4 USDT` | Crypto parity price |
| **Crypto MRP Price** | Product Pricing | `$6.8` | Original crypto price |
| **Discount %** | Calculated Number | `68% off` | Discount percentage tag |
| **Selected Color** | Product Attribute | `Lemon` | Active color variant |
| **Selected Size** | Product Attribute | `22` | Active size variant |
| **Pincode / Destination**| User Dynamic Data | `Dipanshu, 110001 - Delhi, New Delhi, India` | Default shipping address |
| **Product Code** | Fixed Product Data | `423.42334.55` | Unique catalog SKU |
| **Fabric / Material** | Technical Spec | `Polyester & Spandex Blend` | Product material composition |
| **Fit Type** | Technical Spec | `Regular Fit` | Garment fit specification |
| **Average Rating** | Aggregate Metric | `4.5 ★` | Calculated review rating |
| **Total Reviews** | Aggregate Metric | `90 ratings and 2 reviews` | Social proof counters |
| **Reviewer Name** | User Dynamic Data | `Dipanshu` | Verified buyer profile |

---

## 6. States aur Variations
- **Thumbnail Active State:** Selected thumbnail has rounded border in dark `#111827` or accent color.
- **Size Selector State:**
  - Active: Dark solid border / background.
  - Inactive: Neutral gray outline.
  - Out-of-Stock Size: Design mein specified nahi (standard: strikethrough with disabled click).
- **Wishlist Button State:** Inactive outline vs active filled heart icon.
- **Logged-in vs Guest State:** Design demonstrates logged-in user state (`Delivery to Dipanshu`). Guest state should fallback to `Enter Delivery Pincode` input.

---

## 7. Visual & Styling Notes
- **Color Accents:**
  - Background Neutral: Warm off-white (`#faf9f6`)
  - Accent Green: `#22c55e` (Discount badges, verified buyer check)
  - Warning/Flame Accent: `#f59e0b` (Hot Deal flame)
  - Dark Slate/Charcoal: `#111827` (Text, primary buttons)
  - Card Surfaces: Pure white `#ffffff` with soft shadows (`shadow-sm`, `rounded-xl`)
- **Typography:** `Inter` for functional UI data with `Playfair Display` serif headers for high-fashion editorial touch.
- **Interactive Transitions:** Smooth translateY on hover for recommendation cards (`transform: translateY(-3px)`).

---

## 8. Confirm Karna Baaki (Gaps & Questions)
1. **Size Scale Anomaly:** Design me sizes `22`, `23`, `24`, `26` listed hain jabki product specifications table me `S, M, L, XL, XXL` likha hai. Kya apparel sizing standard S/M/L format follow karegi ya waist-inch numbering (22-26)?
2. **Review Form Trigger:** `+Add` review button par click karne se form pop-up aayega ya separate review page par navigate karega?
3. **Pincode Checker Logic for Guests:** Non-logged in guests ke case me delivery box ka behavior kya hoga?
