# Screen Documentation: Fashion Store - About Us

## 1. Page Overview
- **Screen Name:** Fashion Store - About Us
- **Stitch Screen ID:** `404964886492905488`
- **File Source ID:** `12289300319510487061`
- **Core Purpose:** Brand ki heritage, artisanal craftsmanship, sustainable zero-waste philosophy, leadership team, aur discreet customer-first values ko showcase karne wala high-fashion editorial narrative page. Patrons aur clients ko brand ke trust pillars (conscious luxury, 100% traceable fabrics, unmarked discreet packaging, aur 24/7 private concierge) ke prati deep confidence pradan karta hai.
- **Route:** `/about-us` ya `/brand/about`
- **Shared Components:**
  - Header: [`feature_extraction/shared/navigation.md`](../shared/navigation.md)
  - Footer: [`feature_extraction/shared/footer.md`](../shared/footer.md)

---

## 2. Layout aur Sections (Top to Bottom Visual Order)

### 2.1. Global Navigation Bar (Header)
- Full standard global header (Logo, Global Search bar with live shortcuts, Currencies/Language selectors, Wishlist badge, Cart popover, Profile avatar menu).
- Refer to [`shared/navigation.md`](../shared/navigation.md).

### 2.2. Breadcrumb Navigation Bar
- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs text-gray-500 flex items-center gap-2`
- Hierarchy: `Home` → `/` → `About Us` (Current active page).

### 2.3. Editorial Brand Hero Section
- **Visual & Typography Arrangement:**
  - Eyebrow Tag: `OUR HERITAGE & VISION` (uppercase tracking-widest text-xs font-semibold text-gray-500).
  - Main Heading: `Crafting Timeless Elegance & Modern Expression` (h1, font-serif / Playfair Display, text-3xl sm:text-5xl font-normal text-gray-900 leading-tight).
  - Editorial Narrative: `"Founded on the belief that luxury should be deliberate, personal, and uncompromisingly crafted. Discover the story, artisans, and values behind every piece."`
- **Hero Metadata & Stats Badges (Floating Pills):**
  - Badge 1: `Provenance` — `Est. 2019 • Paris & New York`
  - Badge 2: `Guild Craft` — `45+ Master Artisans`
  - Badge 3: `Philosophy` — `Zero-Waste Curation`
- **Primary Hero Action:**
  - `Explore The Atelier` button (Dark button with subtle hover elevation).

### 2.4. Core Foundations: Our Guiding Pillars (4-Card Grid)
- Header: `CORE FOUNDATIONS` (text-xs uppercase font-bold text-gray-400) / `Our Guiding Pillars` (h2).
- Subtext: `"Every stitch, silhouette, and client interaction is grounded in conscious precision and timeless luxury."`
- **Pillar Cards Grid (4 Columns on Desktop, 2 on Tablet, 1 on Mobile):**
  1. **Pillar 01: Bespoke Craftsmanship:**
     - Tag: `01 Ethical`
     - Heading: `Bespoke Craftsmanship` (h3)
     - Description: `"Sustainable raw fibers, meticulous hand-rolled hems, and ethical multi-point atelier inspection on every tailored silhouette."`
     - Proof Badges: `Artisanal Guild` · `100% Traceable`
  2. **Pillar 02: Conscious Luxury:**
     - Tag: `02 Circular`
     - Heading: `Conscious Luxury` (h3)
     - Description: `"Small-batch numbered drops prevent overproduction and zero deadstock waste, complemented by life-long circular care services."`
     - Proof Badges: `Limited Editions` · `Zero Overstock`
  3. **Pillar 03: Private Discreet Concierge:**
     - Tag: `03 Private`
     - Heading: `Discreet Concierge` (h3)
     - Description: `"One-on-one digital advisory, private unboxing appointments, and unmarked discreet logistics directly to your doorstep."`
     - Proof Badges: `White-Glove Care` · `24/7 Dedicated`
  4. **Pillar 04: Contemporary Global Expression:**
     - Tag: `04 Contemporary`
     - Heading: `Global Expression` (h3)
     - Description: `"Bridging timeless architectural minimalism with neoclassical tailoring to create effortless versatile pieces worldwide."`
     - Proof Badges: `Curated Worldwide` · `40+ Countries`

### 2.5. The Atelier & Craft Process Section
- Header: `THE CRAFT PROCESS` / `From Raw Fiber to Finished Masterpiece` (h2).
- Narrative: `"True luxury cannot be hurried. We deliberate across months of silhouette modeling, organic dye immersion, and bespoke fitting to ensure garments drape with natural grace and enduring longevity."`
- **4-Stage Craft Workflow (Visual Stepper):**
  - **Stage I: Architectural Sketch & Patternmaking:** Drafted in Paris studios with proportional balance focused on fluid movement.
  - **Stage II: Certified Organic & Silk Sourcing:** Sustainably harvested mulberry silks, certified cashmere, and unbleached cottons.
  - **Stage III: Guild Artisan Assembly & French Seams:** Hand-stitched accents, laser-cut reinforcements, and double-bound seam integrity.
  - **Stage IV: Serial Authentication & Discreet Packaging:** Individually boxed in eco-kraft unbranded cartons with archival tissue protection.
- **Accreditation Callout:**
  - `Artisan Batch Inspection`: Each parcel includes an individualized certificate of provenance & serial sign-off (`Authentic 100%`).
  - Action Link: `Read Our Textile Sourcing Manifesto →`.

### 2.6. Leadership & Creative Team Showcase (The Visionaries)
- Header: `THE VISIONARIES` / `Leadership & Creative Curators` (h2).
- Subtext: `"Passionate designers, master tailors, and customer concierges dedicated to an intimate, bespoke fashion standard."`
- **Team Profiles (3 Curators):**
  1. **Sarah Jenkins:**
     - Title: `Head of Client Concierge & Experience`
     - Bio: `"Guiding private appointments, discrete deliveries, and tailored sizing recommendations for global clientele since 2020."`
     - Status: `Available Concierge` (Green live badge)
     - Direct Action: `Private Consultation — Contact Sarah →`
  2. **Antoine Moreau:**
     - Title: `Creative & Design Director`
     - Background: `"Former Senior Designer at Maison Paris. Pioneering modern architectural silhouettes with heritage European tailoring, championing mindful small-batch creation."`
     - Focus: `Design & Textiles • Paris Studio`
  3. **Clara Vance:**
     - Title: `Master of Tailoring & Quality Guild`
     - Background: `"Supervising 45+ guild artisans across pattern construction, hand-taped interlinings, and precision silhouette finishing."`
     - Focus: `Quality Oversight • Guild Standard`

### 2.7. Chronology & Milestones (Our Journey)
- Header: `CHRONOLOGY` / `Our Journey & Milestones` (h2).
- Subtext: `"From a boutique Parisian atelier to an international luxury presence."`
- **Chronological Milestones (Horizontal / Vertical Timeline):**
  - **2019 — Stage I: The Studio Genesis:** Founded as an intimate capsule collection studio focusing on timeless unisex wool tailoring and bespoke commissions.
  - **2021 — Stage II: Zero-Deadstock Pledge:** Transitioned fully to on-demand micro-batches and 100% GOTS-certified organic cotton and Mulberry silk lines.
  - **2023 — Stage III: Flagship & Concierge Hub:** Unveiled our premier showroom atelier and integrated 24/7 private advisor concierge service for international patrons.
  - **2025 — Stage IV: Global Carbon-Neutral Reach:** Expanded door-to-door discrete white glove delivery across 40+ countries with complete carbon offset certification.

### 2.8. Environmental & Ethical Guarantee Callout
- Elevated container (`rounded-3xl p-8 sm:p-10 border border-gray-200 delicate-shadow bg-neutral-surface`).
- Key Commitments: Zero deadstock destruction, non-toxic organic dye baths, 100% recyclable unbranded packaging, fair-wage guild certifications.

### 2.9. Closing Call-To-Action (CTA) Banner
- Badge: `DISCOVER THE COLLECTIONS` (Coral badge `#FF3F6C`).
- Heading: `Step Inside Our World of Considered Fashion` (h2, serif).
- Subtext: `"Whether you desire a private styling appointment, custom sizing consultation, or direct exploration of our latest limited edition drops, our concierge specialists await."`
- **Action Buttons:**
  1. `Explore Boutique Collections` (Primary dark button, links to `/products`).
  2. `Contact Customer Concierge` (Secondary bordered button, links to `/help-center#contact`).

### 2.10. Global Footer
- Full standard global footer with newsletter, multi-column directory, and discreet shipping certifications.
- Refer to [`shared/footer.md`](../shared/footer.md).

---

## 3. Options aur Sub-options

| Element | Type | Options / Formats | Description |
| :--- | :--- | :--- | :--- |
| **Breadcrumbs** | Navigation Breadcrumbs | `Home` > `About Us` | Contextual location aur back navigation path. |
| **Hero Atelier CTA** | Button | Click trigger | Craft process ya collections section par scroll / navigate karta hai. |
| **Pillar Cards** | Informational Cards | 4 Pillars: Craft, Circular, Discreet, Global | Brand ke four foundational values with verifiable proof points. |
| **Craft Stepper** | Visual Process Flow | Stages I to IV | Fabric sketch se lekar final serial discreet delivery tak ke phases. |
| **Concierge Contact Trigger** | Direct Action Link | Contact Sarah | Client concierge desk / appointment booking trigger karta hai. |
| **Closing CTAs** | Action Button Pair | 1. `Explore Collections`<br>2. `Contact Concierge` | Primary shopping catalog ya support booking me conversion funnel. |

---

## 4. Interactions aur Navigation Flow

| Element / Trigger | Action | Target / Result |
| :--- | :--- | :--- |
| `Explore The Atelier` Click | User clicks hero button | Page smoothly scroll karta hai `THE CRAFT PROCESS` section par. |
| `Contact Sarah →` Click | User clicks on Sarah Jenkins profile | Direct concierge appointment scheduler modal ya Help Center contact panel khulta hai. |
| `Read Sourcing Manifesto` Click | User clicks textile link | Sustainability & sourcing documentation modal/page open hoti hai. |
| `Explore Boutique Collections` Click | User clicks primary bottom CTA | Product Category Page [`feature_extraction/pages/product-category-page.md`](./product-category-page.md) par redirect hota hai. |
| `Contact Customer Concierge` Click | User clicks secondary bottom CTA | Help Center Concierge Desk [`feature_extraction/pages/help-center-query-hub.md`](./help-center-query-hub.md#panel-6-contact-customer-concierge) par navigate hota hai. |

---

## 5. Content aur Data Classification Table

| Field / Content Key | Content Type | Static / Dynamic | Data Source / Mapping |
| :--- | :--- | :--- | :--- |
| **Hero Brand Statement** | Editorial Copy | Static / CMS | Brand Identity Guidelines |
| **Provenance Badges** | Key Metrics | Static | Brand history records (Est. 2019, 45+ Artisans) |
| **Core Pillars & Proof Tags** | Feature Cards | Static / CMS | Brand values architecture |
| **Craft Process Steps (I–IV)** | Visual Timeline | Static / CMS | Atelier Operations Documentation |
| **Leadership Profiles** | Team Directory | Static / CMS | Executive & atelier roster (Name, Role, Bio, Status) |
| **Milestones Timeline** | Chronological Data | Static / CMS | Corporate history milestones (2019–2025) |
| **Discreet Logistics Promise** | Privacy Disclosure | Static | E-commerce discreet shipping policy standard |

---

## 6. States aur Variations

### 6.1. Concierge Availability State
- **Online / Available:** Sarah Jenkins card par green pulse indicator (`Available Concierge`) show hota hai, clicking enables instant chat/appointment.
- **Offline / Busy:** Displays *"Private appointments bookable within 24h"*.

### 6.2. Mobile & Responsive Layout
- Desktop par 4-pillar horizontal grid; tablet par 2x2 grid; mobile par single column vertical cards with touch swipe for timeline stages.
- Team cards vertically stack cleanly with full-width consultation action buttons.

---

## 7. Visual & Styling Notes
- **Editorial Typography:** High-contrast pairing of serif headlines (`Playfair Display`, font-serif) for artisanal heritage and geometric sans-serif (`Plus Jakarta Sans`) for body readability.
- **Color Accents:** Warm light backgrounds (`bgLight: #FAF5F5`), discreet gray borders (`borderLight: #F0ECEC`), and signature accent touches (Coral `#FF3F6C`, Mint Teal `#14CDA8`).
- **Card Aesthetics:** Subtle delicate drop shadows (`delicate-shadow: 0 2px 12px rgba(0, 0, 0, 0.03)`), generous white-space padding, and numbered architectural steps (I, II, III, IV).

---

## 8. Confirm Karna Baaki (Gaps & Questions)
- **Direct Appointment Booking:** "Contact Sarah →" kya third-party calendly/acuity booking system kholega ya direct site live concierge chat trigger karega?
- **Intimate Wellness Harmonization:** About Us page me focus luxury fashion aur tailored craftsmanship par diya gaya hai; wellness/intimate toys angle ko discreet concierge shipping guarantee ke tahat present kiya gaya hai ("unmarked discreet logistics directly to your doorstep"). Kya is page par koi specific "Sensual Wellness Philosophy" subsection add karne ki zaroorat hai ya existing subtle discretion narrative behtar hai?
