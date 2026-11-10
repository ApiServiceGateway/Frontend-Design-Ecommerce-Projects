# Page Blueprint: Fashion Account - My Reviews & Ratings

---

## 1. Page Overview
- **Screen Name:** Fashion Account - My Reviews & Ratings
- **Stitch Screen ID:** `4015455779403067258`
- **Core Purpose:** Customer ke dwara submit kiye gaye product reviews, 5-star ratings, community feedback metrics, aur verified purchase endorsements ka dedicated hub. Isme user review metrics (`Reviews Written: 12`, `Average Rating: 4.8`, `Helpful Votes: 15`), write review action gateway, published feedback cards with photo thumbnails and star ratings, aur community management controls (`Edit Review`, `Delete`) shamil hain.
- **Entry Point / Navigation Route:** Account Dashboard left sidebar link "Reviews" (`/account/reviews`), ya My Orders screen par "Write a Review" button click karne par.
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
- **Right Column (8/12 grid span): Reviews & Ratings Management Panel (`RightProfileContent`)**

#### 2.1 Left Column: Universal Account Navigation Sidebar (`LeftSidebar`)
- **Active Navigation Item:** `Help & Legal Links` category me `Reviews` active highlighted state me hai.
- **All Sidebar Links:** Profile summary, `Edit profile`, `Manage address`, `Gift Cards`, `Save UPI`, `Save Card`, `Save Crypto address`, `Two-Factor Auth`, `Change password`, `Change Email`, `Reviews` (Active), `Q&A`, `Policies`, and `Logout`.

#### 2.2 Right Column: Reviews & Ratings Showcase (`RightProfileContent`)
- **Header Section & Action Gateway:**
  - Headline (`h1`): `My Reviews & Ratings` (`text-xl font-bold text-slate-800 leading-tight`).
  - Subtitle: `Manage and track reviews you have shared on purchased items`.
  - Primary Action CTA: `Write a Review` button (`px-4 py-2 bg-[#14cda8] text-white hover:bg-[#14cda8]/90 text-xs font-semibold rounded-lg shadow-sm transition`).
- **Review Analytics Bar (3-Metric Stat Grid):**
  - Metric Card 1:
    - Label: `Reviews Written` (`text-[11px] font-bold tracking-wider text-slate-500 uppercase`).
    - Stat: `12` (`text-2xl font-bold text-slate-900`).
    - Tag: `100% verified` (`text-[10px] text-emerald-600 font-semibold`).
  - Metric Card 2:
    - Label: `Average Rating`.
    - Stat: `4.8` with golden star icon (`fa-solid fa-star text-amber-400`).
  - Metric Card 3:
    - Label: `Helpful Votes`.
    - Stat: `15` (`text-2xl font-bold text-slate-900`).
    - Tag: `from community` (`text-[10px] text-slate-400`).
- **Published Customer Reviews List (Vertical Stack):**

  ##### Review Card 1: Oversized Silk Blend Shirt
  - **Product Meta Row:**
    - Garment Thumbnail: Square thumbnail image (`w-12 h-12 rounded-lg object-cover`).
    - Title (`h3`): `Oversized Silk Blend Shirt` (`font-bold text-sm text-slate-900`).
    - Variant Details: `Champagne • Size M` (`text-xs text-slate-500`).
    - Verification Badge: `Verified Purchase` (emerald pill badge `bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded`).
    - Review Date: `Reviewed Oct 14, 2024` (`text-xs text-slate-400`).
  - **Rating & Review Feedback:**
    - Star Rating: 5 gold stars (`★★★★★ text-amber-400 text-xs`).
    - Review Headline (`h4`): `Exceptional drape and luxurious fabric quality` (`font-bold text-xs text-slate-800 mt-1`).
    - Review Commentary: `"The fit is effortlessly relaxed and the fabric feels substantial yet breathable. Colors match the photography perfectly."` (`text-xs text-slate-600 mt-1 leading-relaxed`).
  - **Community Engagement Proof:**
    - Thumbs-up indicator: `14 people found this helpful` (`text-xs text-slate-500 flex items-center gap-1.5` with `fa-regular fa-thumbs-up`).
  - **Management Action Links:**
    - Action 1: `Edit Review` (`text-xs text-slate-700 hover:text-black font-semibold`).
    - Action 2: `Delete` (`text-xs text-rose-600 hover:text-rose-700 font-semibold ml-4`).

  ##### Review Card 2: Tailored Pleated Wool Trousers
  - **Product Meta Row:**
    - Garment Thumbnail: Square trouser thumbnail.
    - Title (`h3`): `Tailored Pleated Wool Trousers`.
    - Variant Details: `Charcoal Grey • Size 32`.
    - Verification Badge: `Verified Purchase`.
    - Review Date: `Reviewed Sep 28, 2024`.
  - **Rating & Review Feedback:**
    - Star Rating: 4.5 stars (`★★★★½ text-amber-400 text-xs`).
    - Review Headline (`h4`): `Flattering silhouette, slightly long inseam`.
    - Review Commentary: `"Stitching and structure are top tier. Needed a minor hem adjustment for my height, but the drape with loafers is remarkable."`
  - **Community Engagement Proof:**
    - Thumbs-up indicator: `8 people found this helpful`.
  - **Management Action Links:**
    - Action 1: `Edit Review`.
    - Action 2: `Delete`.

- **Community Guidelines Notice Footer:**
  - Text: `"Your reviews help fellow members discover the perfect fit and curation. Reviews adhere to community guidelines."`

### Section 3: Global Site Footer (Shared Component)
- **Reference:** Dekhein [footer.md](../shared/footer.md)
- **Short Purpose:** Global footer with legal policies and community links.

---

## 3. Options aur Sub-options
- **Review Actions:**
  - `Write a Review`
  - `Edit Review`
  - `Delete`
- **Rating Scale:** 1 to 5 Stars (Full and Half star increments)
- **Review Attributes:**
  - Star Rating (1-5)
  - Review Title
  - Detailed Description Body
  - Helpful votes count

---

## 4. Interactions aur Navigation
- `[Write a Review Button]` → Click → Opens modal with list of delivered purchases pending review
- `[Edit Review Link on Card]` → Click → Opens inline review editor pre-filled with star rating, headline, and comments
- `[Delete Link on Card]` → Click → Triggers review removal confirmation dialog with warning that helpful community votes will be reset
- `[Product Title / Thumbnail Click]` → Click → Navigates to that product's PDP (`3907466636638916715`)
- `[Sidebar Navigation Links]` → Click → Navigates to corresponding account sections

---

## 5. Content aur Data Classification

| Element / Field | Data Type | Example Value Shown in Design | Notes & Source Confirmation |
| :--- | :--- | :--- | :--- |
| **Reviews Written Count**| Dynamic Metric | `12` | Total reviews submitted by user |
| **Average Rating** | Calculated Metric | `4.8 ★` | Mean rating score given by user |
| **Helpful Votes Total** | Community Social Metric| `15 from community` | Aggregated helpful reactions |
| **Product Title** | Product Data | `Oversized Silk Blend Shirt` | Reviewed catalog item |
| **Variant Attributes** | Order Snapshot Data | `Champagne • Size M` | Size and color purchased |
| **Review Headline** | User Created Text | `Exceptional drape and luxurious fabric quality` | Short summary title |
| **Review Description** | User Created Text | Long-form paragraph | In-depth fit and quality review |
| **Helpful Upvotes** | Social Metric | `14 people found this helpful` | Single review upvote tally |

---

## 6. States aur Variations
- **Helpful Reaction State:** Upvotes display count; user can upvote other reviews across PDPs.
- **Verification Status:** `Verified Purchase` badge confirms order placement and delivery fulfillment.
- **Empty Reviews State:** Design mein specified nahi (current state displays 2 populated reviews and 12 total count).

---

## 7. Visual & Styling Notes
- **Color Accents:**
  - Primary Action Mint: `#14cda8` (Write a Review button)
  - Rating Gold: `#fbbf24` (Stars)
  - Verified Emerald: `#059669` (`bg-emerald-50 text-emerald-700`)
  - Destructive Link: `#e11d48` (Delete)
  - Canvas Neutral: `#FAF4F4`
  - Card Surfaces: Pure white `#ffffff`
- **Typography:** `Plus Jakarta Sans` for clean, contemporary editorial layout.
- **Border Radius:** `rounded-xl` for cards and metric boxes, `rounded-lg` for buttons and image thumbnails.

---

## 8. Confirm Karna Baaki (Gaps & Questions)
1. **Photo / Video Upload in Reviews:** PDP reviews me user-submitted photos/videos common hote hain. Kya `Write a Review` modal customer photo uploads support karega?
2. **Pending Reviews Queue:** User ke delivered orders me se kitne items par review likhna baaki hai, iska dedicated "Pending Reviews" tab missing hai.
3. **Review Deletion Soft vs Hard:** Review delete karne par kya review soft-hide hoga ya database se permanent delete hoga?
