# 🛍️ 02: Product Listing Page (PLP) & Catalog Blueprint

> **Design Objective:**  
> Provide a fast, familiar, and frictionless e-commerce browsing experience using **Standard E-Commerce Filtering** (Category, Price, Brand, Rating, In-Stock) without confusing jargon. Allow shoppers to find, compare, and add products to cart effortlessly.

---

## 📐 Wireframe & Page Layout

```
+-----------------------------------------------------------------------------------+
| GLOBAL HEADER (Search, Account, Cart Drawer, Announcement Bar)                    |
+-----------------------------------------------------------------------------------+
| Breadcrumb: Home > Wellness Devices > All Products (Showing 48 items)             |
| Page Title: "Sensory & Intimate Wellness Collection"                              |
| Sort By: [ Popularity / Featured ▼ ]  [ Filter Drawer (Mobile Only) ⚙️ ]           |
+-----------------------------------------------------------------------------------+
| [ DESKTOP SIDEBAR FILTERS ]   |  [ PRODUCT GRID (3 or 4 Columns Desktop / 2 Mobile)]|
|                               |                                                   |
| 1. Categories                 |  +--------------------+   +--------------------+  |
|    [x] For Her (24)           |  | [Tag: 35% OFF]  ❤️ |   | [Tag: Bestseller]❤️ |  |
|    [ ] For Him (14)           |  |                    |   |                    |  |
|    [ ] Couples Kits (8)       |  |  [Product Image]   |   |  [Product Image]   |  |
|    [ ] Lubes & Cleaners (12)  |  |                    |   |                    |  |
|                               |  | Velvet Wave Wand   |   | Rose Glow Pulsator |  |
| 2. Price Range                |  | ★★★★☆ (480)        |   | ★★★★★ (1.4k)       |  |
|    (•) All Prices             |  | ₹2,199  ~~₹3,499~~ |   | ₹2,899  ~~₹4,499~~ |  |
|    ( ) Under ₹1,499           |  | [ Quick Add + ]    |   | [ Quick Add + ]    |  |
|    ( ) ₹1,500 - ₹2,999        |  +--------------------+   +--------------------+  |
|    ( ) ₹3,000 - ₹4,999        |                                                   |
|    ( ) ₹5,000 & Above         |  +--------------------+   +--------------------+  |
|                               |  | [Tag: New Launch]  |   | [Tag: In Stock]    |  |
| 3. Brand                      |  |                    |   |                    |  |
|    [x] Black Dot Core (32)    |  |  [Product Image]   |   |  [Product Image]   |  |
|    [ ] Pure Silk Luxury (16)  |  |                    |   |                    |  |
|                               |  | Horizon Couples Duo|   | Organic Aloe Lube  |  |
| 4. Customer Rating            |  | ★★★★☆ (95)         |   | ★★★★★ (820)        |  |
|    [ ] 4.5 Stars & Above      |  | ₹3,499  ~~₹4,999~~ |   | ₹699    ~~₹999~~   |  |
|    [ ] 4.0 Stars & Above      |  | [ Quick Add + ]    |   | [ Quick Add + ]    |  |
|                               |  +--------------------+   +--------------------+  |
| 5. Availability               |                                                   |
|    [x] In Stock Only (44)     |  [ 📄 PAGINATION / "LOAD MORE PRODUCTS" (12 of 48) ]|
|                               |                                                   |
| [ Reset All Filters ]         |                                                   |
+-----------------------------------------------------------------------------------+
| FOOTER & FLOATING QUICK EXIT BUTTON                                               |
+-----------------------------------------------------------------------------------+
```

---

## 🔍 Filter & Sort Specifications

### 1. Standard E-Commerce Filtering Engine
* **Category Filter (Multi-Select Checkboxes):**
  * `For Her` (Clitoral stimulators, suction toys, wands, kegel balls)
  * `For Him` (Strokers, prostate massagers, vibrating rings)
  * `For Couples` (Remote-controlled toys, shared vibrators, games)
  * `Lubes & Intimate Care` (Water-based lubricants, antibacterial toy wash, silicone oil)
  * `Starter Kits & Bundles` (Curated beginner sets)
* **Price Filter (Radio Buttons / Slider):**
  * Budget (`Under ₹1,499`)
  * Mid-Tier Popular (`₹1,500 – ₹2,999`)
  * Premium High-Performance (`₹3,000 – ₹4,999`)
  * Ultra Luxury Kits (`₹5,000 & Above`)
* **Brand Filter (Multi-Select Checkboxes):**
  * House Label ("Aura / Black Dot Wellness")
  * Curated Global Partners
* **Customer Rating (Single Select):**
  * `★ 4.5 & Up`, `★ 4.0 & Up`, `★ 3.5 & Up`
* **Availability Toggle:**
  * Toggle switch: `In Stock Only` (Default checked to prevent frustration).
* **Reset Button:** Instant 1-click `Clear All Filters` which resets parameters without full page reload via URL query params (`?category=for-her&sort=price_asc`).

### 2. Sorting Engine Dropdown
* **Featured / Best Selling** (Default algorithm: sales velocity + rating weight).
* **Price: Low to High** (Affordability sorting).
* **Price: High to Low** (Premium tier sorting).
* **Highest Rated** (Products with highest average star rating).
* **Newest Arrivals** (Latest catalog additions).

---

## 🎴 Product Card Anatomy

Each card within the listing grid is engineered for rapid decision-making:
1. **Primary & Secondary Image:** High-resolution product render against a clean neutral background. Secondary lifestyle/packaging photo renders upon desktop mouse hover.
2. **Promotional Pill Badges (Top Left):** `BESTSELLER`, `35% OFF`, or `STAFF PICK`.
3. **Wishlist Heart (Top Right):** Instant toggle to save item without login requirement (cached in LocalStorage, syncs when user logs in).
4. **Product Title:** Understated, tasteful title (Max 2 lines, e.g., *"Aura Touch Palm Massager"*).
5. **Rating Stars & Review Count:** E.g., `★ 4.8 (1.2k)`.
6. **Pricing Stack:**
   * Bold Current Price: `₹2,199`
   * Strikethrough Original MRP: `₹3,499`
   * Green Savings Tag: `Save 37%`
7. **Action Button:**
   * `[ Quick Add + ]`: If single variant, directly adds 1 item to cart and slides out the mini-cart drawer. If multiple colors exist, opens a lightweight modal to pick color (e.g., Plum / Midnight / Rose).

---

## 📱 Mobile Catalog UX
* **Sticky Top Action Bar:** When scrolling, a compact header sticks to top showing `Filter (3 active) | Sort By`.
* **Bottom Slide-up Filter Sheet:** On mobile, clicking `Filter` opens a smooth bottom drawer containing all filter accordions with a sticky `[ Show 24 Products ]` button.
* **Two-Column Responsive Grid:** Optimized card sizing for 360px-420px mobile screens with high tap-target sizes (min 44px for buttons).
