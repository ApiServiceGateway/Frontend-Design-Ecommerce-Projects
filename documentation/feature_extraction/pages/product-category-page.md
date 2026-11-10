# Page Blueprint: Fashion Store - Product Category Page (PLP)

---

## 1. Page Overview
- **Screen Name:** Fashion Store - Product Category Page
- **Stitch Screen ID:** `8407b632271a4d62b7ef592b97f0c167`
- **Core Purpose:** Category aur search-based catalog browsing view jahan multi-facet filters (Gender, Brand, Category, Discounts, Offers), dynamic sorting, active filter tags aur 4-column product grid with quick-view aur wishlist controls provide kiye gaye hain.
- **Entry Point / Navigation Route:** Header category menu click (`/category/[slug]`), Home page seasonal pills ya search bar query submission.
- **Shared Components Used:**
  - Header & Global Navigation: [navigation.md](../shared/navigation.md)
  - Footer & Brand Links: [footer.md](../shared/footer.md)

---

## 2. Layout aur Sections (Top to Bottom)

### Section 1: Global Navigation Header (Shared Component)
- **Reference:** Dekhein [navigation.md](../shared/navigation.md)
- **Short Purpose:** Persistent top bar with search, category menus, user profile, cart counter, wishlist, aur notifications.

### Section 2: Page Header & Breadcrumbs Area (`PageTitleArea`)
- **Elements:**
  - Category Main Title: `Sports Track Pants for Women` (`h1` bold display text).
  - Catalog Product Counter: `208 Products` (`text-sm text-gray-500 font-normal`).
  - Breadcrumb Trail: `Home / Women / Sports & Activewear / Track Pants`.
  - Top Sort Dropdown: `Sort by: Popular` with dropdown chevron icon.
  - Active Filters Strip:
    - Section Label: `Active Filters (1)`
    - Dismissible Filter Pill: `Category - Track Pants` with remove (`✕`) icon.
- **Short Purpose:** Category context, total item availability count, navigation hierarchy aur applied filter status confirm karna.

### Section 3: Main Split Content Area (`MainContentArea`)
Split 2-column layout:
- **Left Column:** Sticky Multi-Facet Filter Sidebar (`w-64 flex-shrink-0`).
- **Right Column:** 4-Column Responsive Product Catalog Grid (`flex-1`).

#### 3.1 Left Filter Sidebar (`LeftFilterSidebar`)
- **Sidebar Heading:** `Filter's` with clean reset/clear option.
- **Facet 1: Gender Accordion (Radio Selection):**
  - Radio items: `Boy`, `Girl`, `Men`, `Women` (Checked/Active), `Boy & Girl`.
- **Facet 2: Brand Accordion:** Expandable chevron list of fashion brands.
- **Facet 3: Category Accordion:** Subcategory drill-down selector.
- **Facet 4: New Arrival Accordion:** Recent drops filter.
- **Facet 5: Discount Accordion:** Percentage discount brackets (e.g. 10%, 30%, 50%+).
- **Facet 6: Offer's Accordion:** Bundle offers, promotional coupon applicability.
- **Facet 7: Sorting Section (Radio Options):**
  - Radio options:
    - `Popular` (Default checked)
    - `Newest First`
    - `Price : Low to High`
    - `Price : High to Low`
    - `Top Deals`

#### 3.2 Right Product Grid Section (`RightProductsGridSection`)
- **Grid Layout:** 4 products per row (`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4`).
- **Product Card Anatomy:**
  - Card Container: White card with subtle hover elevation (`article data-purpose="product-card"`).
  - Image Frame: Aspect ratio `3/4.2`, zoom transition on card hover (`group-hover:scale-105`).
  - Badge (Top Left): `Just In` badge in mint green (`bg-[#14CDA8] text-white text-[11px]`).
  - Hover Action Floating Buttons (Top Right):
    - Similar Items Icon: Overlapping double-square icon (`w-7 h-7 rounded-full bg-white/95 shadow-sm`).
    - Wishlist Icon: Heart icon (`w-7 h-7 rounded-full bg-white/95 shadow-sm`).
  - Hover Multi-Image Indicator (Bottom Center of Image): 5 dot pagination bullets (`bg-[#14CDA8]` for active image, `bg-white/80` for inactive).
  - Hover Quick View Bar (Bottom Full Width of Image): Slide-up button `QUICK VIEW` (`bg-white/95 hover:bg-white text-gray-900 text-xs font-bold uppercase tracking-wider`).
  - Product Information Block (Below Image):
    - Brand Name: `HONEY CURVYTUDE`, `AJILE`, `PETER ENGLAND`, etc. (`font-bold text-[13px] uppercase tracking-wider text-gray-900`).
    - Product Description / Title: `Black Straight Fit Track Pants` (`text-xs text-gray-700 line-clamp-1`).
    - Retail Price: `₹ 1,599` (`text-xs font-bold text-gray-900`).

### Section 4: Pagination Placeholder (`PaginationControls`)
- **Elements:** Design me comment placeholder `<!-- PaginationControls -->` maujood hai.
- **Short Purpose:** Multi-page browsing ya infinite-scroll loading trigger point.

### Section 5: Global Site Footer (Shared Component)
- **Reference:** Dekhein [footer.md](../shared/footer.md)
- **Short Purpose:** Multi-column links, support, policy disclaimers aur payment badges.

---

## 3. Options aur Sub-options
- **Gender Radio Options:**
  - `Boy`
  - `Girl`
  - `Men`
  - `Women` (Selected)
  - `Boy & Girl`
- **Expandable Facet Headers:**
  - `Brand`
  - `Category`
  - `New Arrival`
  - `Discount`
  - `Offer's`
- **Sorting Options:**
  - `Popular` (Default)
  - `Newest First`
  - `Price : Low to High`
  - `Price : High to Low`
  - `Top Deals`
- **Active Filter Tag:**
  - `Category - Track Pants` (with dismiss action)

---

## 4. Interactions aur Navigation
- `[Breadcrumb Link: Home]` → Click → Navigates to Home Page (`3775121018898025092`)
- `[Breadcrumb Link: Women]` → Click → Navigates to Women's Master Category Page
- `[Active Filter Tag ✕]` → Click → Clears Track Pants filter, re-fetches wider Women's catalog
- `[Gender Radio Option]` → Click → Changes active radio, updates product query
- `[Facet Accordion Header]` → Click → Toggles accordion open/close to reveal sub-options
- `[Sort By Radio / Dropdown]` → Select → Sorts grid products by chosen criteria (Price, Newest, Popular)
- `[Product Card Image / Title]` → Click → Navigates to Product Detail Page (`3907466636638916715`)
- `[Hover Similar Items Icon]` → Click → Similar items drawer / recommendations overlay
- `[Hover Wishlist Heart Icon]` → Click → Toggles heart fill, adds item to Wishlist (`ce90bd7999304498b3fe74d1e925775f`)
- `[Hover QUICK VIEW Button]` → Click → Quick View modal khulna confirm karna baaki
- `[Dot Carousel Indicators]` → Hover / Swipe → Product card image angle switch hona

---

## 5. Content aur Data Classification

| Element / Field | Data Type | Example Value Shown in Design | Notes & Source Confirmation |
| :--- | :--- | :--- | :--- |
| **Category Title** | Dynamic Taxonomy | `Sports Track Pants for Women` | Category page heading |
| **Product Count** | Dynamic Number | `208 Products` | Total matched query items |
| **Breadcrumb Path** | Dynamic Navigation | `Home / Women / Sports & Activewear / Track Pants` | Hierarchy chain |
| **Sort By Selection** | User Input / Preference | `Popular` | Active sort enum |
| **Active Filter Tag** | Dynamic Filter State | `Category - Track Pants` | Applied filter chip |
| **Product Badge** | Product Tag | `Just In` | Fresh arrival pill |
| **Brand Name** | Product Data | `HONEY CURVYTUDE`, `AJILE` | Brand taxonomy |
| **Product Title** | Product Data | `Black Straight Fit Track Pants` | Product display name |
| **Price** | Product Data | `₹ 1,599` | Currency formatted price |
| **Image URLs** | Product Media | Cloud URLs (`lh3.googleusercontent.com/...`) | Primary and thumbnail views |

---

## 6. States aur Variations
- **Filter Accordion State:** Expanded state shows options with radio/checkboxes; collapsed state shows only title with chevron.
- **Card Hover State:**
  - Image scales up subtly (`scale-105`).
  - Top right floating buttons (Similar & Wishlist) fade in (`opacity-100`).
  - Image dots indicators fade in (`opacity-100`).
  - Bottom `QUICK VIEW` bar slides up into view from image bottom (`translate-y-0`).
- **Empty State (0 Products):** Design mein specified nahi (currently renders 208 products).
- **Loading / Skeleton State:** Design mein specified nahi.

---

## 7. Visual & Styling Notes
- **Color Accents:**
  - Teal/Mint Accent: `#14CDA8` (Badges, active carousel dot, hover states)
  - Background Neutral: Very soft pink/tinted gray (`#FAF5F5` / `#FBF7F7`)
  - Text: Dark Charcoal `#1F2937` and `#111827`
  - Subtle Gray Borders: `#E5E7EB`
- **Typography:** `Plus Jakarta Sans` for clean, contemporary legibility.
- **Custom Radio Buttons:** Circular border with filled inner circle on active (`14px` diameter with `7px` inner dot).
- **Aspect Ratio:** Card image containers fixed at `aspect-[3/4.2]`.

---

## 8. Confirm Karna Baaki (Gaps & Questions)
1. **Pagination vs Infinite Scroll:** `<!-- PaginationControls -->` comment empty chhod diya gaya hai. Kya production me numeric pagination (1, 2, 3... Next) use hogi ya continuous infinite scroll on scroll threshold?
2. **Facet Values for Collapsed Accordions:** `Brand`, `Category`, `New Arrival`, `Discount`, aur `Offer's` ke accordion headings hain par inke andar ke checkable items static design me expanded render nahi kiye gaye hain. Inki taxonomy backend data se map karni hogi.
3. **Quick View Overlay:** `QUICK VIEW` button click par lightweight modal open hona chahiye ya inline drawer slide-in?
