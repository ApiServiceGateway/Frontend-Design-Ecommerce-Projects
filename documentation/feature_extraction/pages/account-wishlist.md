# Page Blueprint: Fashion Account - Wishlist

---

## 1. Page Overview
- **Screen Name:** Fashion Account - Wishlist
- **Stitch Screen ID:** `ce90bd7999304498b3fe74d1e925775f`
- **Core Purpose:** Customer ke dwara bookmark/save kiye gaye favorite items ka curated catalog. Yeh dedicated grid view ke through category filtering (`All`, `Women`, `Men`), individual item deletion (`✕`), on-hover size variant selection (`S`, `M`, `L`, `XL`, `2XL`), aur 1-click cart transfer (`MOVE TO BAG`) provide karta hai.
- **Entry Point / Navigation Route:** Header wishlist icon click (`fa-regular fa-heart`), Account Dashboard quick tile `Wishlist` (`/account/wishlist`).
- **Shared Components Used:**
  - Header & Global Navigation: [navigation.md](../shared/navigation.md)
  - Footer & Brand Links: [footer.md](../shared/footer.md)

---

## 2. Layout aur Sections (Top to Bottom)

### Section 1: Global Navigation Header (Shared Component)
- **Reference:** Dekhein [navigation.md](../shared/navigation.md)
- **Short Purpose:** Persistent top utility header with brand mark, search input, and profile/cart tools.

### Section 2: Page Title & Breadcrumbs Area (`MainContent` Top)
- **Breadcrumb Navigation Trail:**
  - `Store / My Account / My Wishlist` (clickable navigational path).
- **Page Heading:**
  - Headline (`h1`): `My Wishlist` (`font-bold text-2xl text-slate-900`).
  - Total Items Counter: `6 Products` (`text-sm text-slate-500 font-medium ml-2`).
- **Category Filter Tabs:**
  - Capsule Filter Pills:
    - Tab 1: `All` (Default active, dark solid border / background).
    - Tab 2: `Women` (Muted border outline).
    - Tab 3: `Men` (Muted border outline).
- **Short Purpose:** Context establish karna aur category-based wishlist curation enable karna.

### Section 3: Wishlist Product Grid (Responsive Catalog)
- **Grid Layout:** 4-column responsive product card grid (`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6`).
- **Wishlist Card Anatomy (`group cursor-pointer bg-white`):**
  - **Item Thumbnail Image Container:**
    - High-resolution vertical portrait image (`aspect-[3/4] rounded-lg overflow-hidden relative bg-slate-100`).
    - **Remove Action Button (Top-Right):** Floating circular close icon (`w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-600 hover:text-rose-600 hover:bg-slate-50 transition` with `fa-solid fa-xmark text-xs`).
  - **Product Meta Information Block:**
    - Brand Name: `RANGMANCH`, `AKKRITI`, `AJILE` (`text-xs font-bold tracking-widest text-slate-900 uppercase`).
    - Product Title: `Black Embroidered Festive Ethnic Set` (`text-xs text-slate-600 truncate mt-0.5`).
    - Price: `₹ 4999` (`text-xs font-bold text-slate-900 mt-1`).
  - **On-Hover Interactive Action Drawer (Slide-Up / Fade-In):**
    - Transition: `opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300`.
    - **Size Selection Strip:**
      - Size buttons row: `S`, `M`, `L`, `XL`, `2XL` (`px-2.5 py-1 text-xs border border-slate-800 font-medium hover:bg-slate-900 hover:text-white transition`).
    - **Move to Bag Primary Button:**
      - Full-width CTA button: `MOVE TO BAG` (`w-full py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded transition shadow-sm`).

#### 3.1 Displayed Products Inventory (6 Items in Design)
1. `RANGMANCH` - `Black Embroidered Festive Ethnic Set` | `₹ 4999`
2. `RANGMANCH` - `Off-White Embroidered Festive Ethnic Set` | `₹ 4499`
3. `AKKRITI` - `Green Embroidered Cropped Layered Set` | `₹ 1499`
4. `RANGMANCH` - `Purple Embroidered Tunic, Pants & Dupatta` | `₹ 3799`
5. `AJILE` - `Black Straight Fit Track Pants` | `₹ 1599`
6. `AJILE` - `Brown Flared Active Pant` | `₹ 1299`

### Section 4: Global Site Footer (Shared Component)
- **Reference:** Dekhein [footer.md](../shared/footer.md)
- **Short Purpose:** Global footer with customer support, policies, and Telegram community callout.

---

## 3. Options aur Sub-options
- **Category Filter Tabs:**
  - `All` (6 items)
  - `Women`
  - `Men`
- **Garment Sizes Available on Hover:**
  - `S`
  - `M`
  - `L`
  - `XL`
  - `2XL`
- **Card Actions:**
  - Remove from Wishlist (`✕`)
  - Select Size
  - `MOVE TO BAG`

---

## 4. Interactions aur Navigation
- `[Breadcrumb Link: My Account]` → Click → Navigates to Account Dashboard (`2b3693b6b629426085c21723956f5ca8`)
- `[Category Filter Tab: Women / Men]` → Click → Re-filters the wishlist grid to show gender-specific saved items
- `[Card Image / Title Click]` → Click → Navigates to that product's Product Detail Page (`3907466636638916715`)
- `[Card Remove ✕ Button]` → Click → Instantly removes item from Wishlist, updates total counter badge with undo toast
- `[Card Hover]` → Mouse Enter → Reveals size selection buttons and `MOVE TO BAG` CTA
- `[Size Button Click]` → Click → Selects active size pill (highlighted in black background)
- `[MOVE TO BAG Button Click]` → Click → Transfers selected product & chosen size to Shopping Cart (`34be094d0f524a249a58ed95b4c9e07e`), removes from wishlist, increments header cart count badge

---

## 5. Content aur Data Classification

| Element / Field | Data Type | Example Value Shown in Design | Notes & Source Confirmation |
| :--- | :--- | :--- | :--- |
| **Total Items Count** | Dynamic Metric | `6 Products` | Count of saved items |
| **Category Tabs** | Fixed Taxonomy | `All`, `Women`, `Men` | Filter criteria |
| **Product Brand** | Product Data | `RANGMANCH`, `AKKRITI`, `AJILE` | Brand label |
| **Product Title** | Product Data | `Black Embroidered Festive Ethnic Set` | Item catalog name |
| **Price** | Product Data | `₹ 4999`, `₹ 1499` | Retail selling price |
| **Sizes List** | Product Attributes | `S, M, L, XL, 2XL` | Selectable sizing options |
| **Image URLs** | Product Media | Cloud URLs (`lh3.googleusercontent.com/...`) | Portrait product photo |

---

## 6. States aur Variations
- **Card Hover State:**
  - Default: Clean photo + remove button + title + price.
  - Hover: Size pills row + `MOVE TO BAG` button animate upwards into view.
- **Selected Size State:** Chosen size button has solid black fill (`bg-slate-900 text-white`); unselected buttons have outline borders.
- **Empty Wishlist State:** Design mein specified nahi (current state displays 6 active products).
- **Out of Stock Item State:** Design mein specified nahi (standard: disabled size pills with `Out of Stock` overlay badge).

---

## 7. Visual & Styling Notes
- **Color Accents:**
  - Accent Coral/Brand: `#14cda8` (Header logo)
  - Card & Background: Soft white `#ffffff` surfaces on `#FAF4F4` page canvas
  - Text & Dark Buttons: Slate `#0f172a` and `#334155`
  - Remove Hover: Rose `#e11d48`
- **Typography:** `Plus Jakarta Sans` for clean, modern e-commerce feel.
- **Card Framing:** High-fashion clean cards without heavy drop-shadows, prioritizing imagery.

---

## 8. Confirm Karna Baaki (Gaps & Questions)
1. **Size Requirement Before Move to Bag:** Agar user bina size select kiye `MOVE TO BAG` click kare, toh kya validation prompt aayega ya default size (e.g. M) auto-select hoga?
2. **Move All to Bag Action:** Bulk action button (e.g. `Move All to Bag` ya `Clear Wishlist`) missing hai.
3. **Price Drop / Discount Badges:** PLP cards me discount percentage badges (-68% OFF) maujood hain, lekin Wishlist cards par sirf final price (`₹ 4999`) dikh raha hai. MRP strikethrough add karna zaroori hai ya nahi?
