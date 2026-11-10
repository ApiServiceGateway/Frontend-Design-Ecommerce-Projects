# Page Blueprint: Fashion Store - Checkout Delivery Address

---

## 1. Page Overview
- **Screen Name:** Fashion Store - Checkout Delivery Address
- **Stitch Screen ID:** `2417882353337703871`
- **Core Purpose:** Checkout Funnel Step 2 jahan user saved shipping addresses me se primary destination select karta hai, naya delivery address create/edit karta hai, delivery speed/estimates verify karta hai aur final payment step ke liye proceed karta hai.
- **Entry Point / Navigation Route:** Cart page (`34be094d0f524a249a58ed95b4c9e07e`) se "Continue" CTA click karne par.
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
  - Step 1: `Cart` with count badge `2` (Completed).
  - Step 2: `Address` (Active step with bold accent underline).
  - Step 3: `Payment` (Upcoming step).
- **Short Purpose:** Checkout stage clarity ensure karna.

### Section 3: Split Address Management & Order Summary (`CartMainSection`)
Split 2-column layout:
- **Left Column (8/12 grid span): Saved Address Cards & Add New Address Form**
- **Right Column (4/12 grid span): Sticky Shipping & Price Details Card**

#### 3.1 Left Column: Address Selection & Form
- **Header Section:**
  - Title: `Select Delivery Address` (with total saved count).
  - Quick action: `+ Add New Address` shortcut button.
- **Saved Address Card 1 (Default / Selected):**
  - Radio Indicator: Selected state circle.
  - Recipient Name: `Dipanshu`
  - Address Type Pill: `Home • Default` (badge styling).
  - Street & City: `45, Green Valley Apartments, Delhi, New Delhi, India - 110001`.
  - Phone: `Mobile: +91 98765 43210`.
  - Action Controls: `Edit | Remove` text links.
  - Delivery SLA Indicator: `Estimated Delivery by Tomorrow, 5 PM`.
  - Selection CTA Button: `Deliver Here` (prominent active button).
- **Saved Address Card 2 (Secondary / Work):**
  - Radio Indicator: Unselected circle.
  - Recipient Name: `Julian Vance`
  - Address Type Pill: `Work / Office`.
  - Street & City: `742 Evergreen Terrace, San Francisco, CA, USA - 94107`.
  - Phone: `Mobile: +1 (555) 234-8901`.
  - Action Controls: `Edit | Remove` text links.
  - Delivery SLA Note: `Standard international dispatch available`.
  - Selection CTA Button: `Deliver to this Address` (secondary outline button).
- **Add New Delivery Address Form (`Add New Address Form Section`):**
  - Container Heading: `Add New Delivery Address` (`* All fields required`).
  - Input Fields (Grid 2-column on desktop):
    - `Full Name` (Text input).
    - `10-digit Mobile Number` (Tel input with numeric validation).
    - `Pincode / Postal Code` (Text/numeric input).
    - `Locality / Town` (Text input).
    - `Flat, House no., Building, Street` (Text input / multi-line).
    - `City / District` (Text input).
    - `State` (Dropdown or text input).
  - Address Type Radio Group:
    - Option 1: `Home (All day delivery)`.
    - Option 2: `Work (Delivery 10 AM - 5 PM)`.
  - Form Action Buttons:
    - Primary CTA: `Save and Deliver Here` (solid black pill button).
    - Secondary CTA: `Cancel` (neutral text/outline button).
- **Trust Assurance Strip:**
  - `100% Secure Delivery & Verified Courier Partners` (Shield icon).
  - `Contactless Delivery Available` (Box/hand icon).

#### 3.2 Right Column: Sticky Summary & Checkout CTA
- **Delivery Destination Preview Box:**
  - Label: `Delivery to Dipanshu , 110001`
  - Address Summary: `45, Green Valley Apartments, Delhi, New Delhi, India`
  - Action Link: `Change`
- **Price Details Breakdown Card:**
  - Header: `Price Details (2 item)`.
  - Subtotal Gross: `$16.7`.
  - Total Savings / Discount: `-$7.50 (48% OFF)`.
  - Platform Fee: `$0.1`.
  - Delivery Charge: `$0.89` (Marked `Free`).
  - Net Payable Total: `$9.10 (48% OFF)`.
- **Sticky Checkout Action Button:**
  - CTA Button: `$9.10 Continue to Payment` (prominent black pill).
- **Security Assurance Badge:**
  - `Protected by black rocks` / 256-Bit SSL encryption badge.

### Section 4: Global Site Footer (Shared Component)
- **Reference:** Dekhein [footer.md](../shared/footer.md)
- **Short Purpose:** Support links, trust assurances, policies, and Telegram community callout.

---

## 3. Options aur Sub-options
- **Address Selection:**
  - `Dipanshu (Home • Default)`
  - `Julian Vance (Work / Office)`
- **Address Type Radios (In Add Address Form):**
  - `Home (All day delivery)`
  - `Work (Delivery 10 AM - 5 PM)`
- **Address Card Actions:**
  - `Edit` (populates form for modifications)
  - `Remove` (triggers deletion confirmation)

---

## 4. Interactions aur Navigation
- `[Stepper: Cart 2]` → Click → Navigates back to Cart Page (`34be094d0f524a249a58ed95b4c9e07e`)
- `[Deliver Here / Deliver to this Address Button]` → Click → Sets selected address as active destination, updates Right Column preview
- `[Edit Link on Address Card]` → Click → Expands address form pre-filled with card data
- `[Remove Link on Address Card]` → Click → Deletion confirmation prompt khulna confirm karna baaki
- `[+ Add New Address Button]` → Click → Scrolls down to open empty Add Address form
- `[Save and Deliver Here Button]` → Click → Validates required inputs, saves address to user account, selects it as shipping destination
- `[Cancel Form Button]` → Click → Collapses form without saving
- `[Continue to Payment CTA]` → Click → Navigates to Checkout Payment Page (`74baeee3a5794f839bbc1d149744e1e4`)

---

## 5. Content aur Data Classification

| Element / Field | Data Type | Example Value Shown in Design | Notes & Source Confirmation |
| :--- | :--- | :--- | :--- |
| **Recipient Name** | User Input / Data | `Dipanshu`, `Julian Vance` | Contact name |
| **Address Type** | Taxonomy Option | `Home • Default`, `Work / Office` | Delivery classification |
| **Street Address** | User Input / Data | `45, Green Valley Apartments` | Physical location line 1 |
| **City & Country** | User Input / Data | `Delhi, New Delhi, India - 110001` | City, State, Postal code |
| **Mobile Number** | User Contact Data | `+91 98765 43210` | 10-digit mobile number |
| **Delivery ETA** | Calculated Logistics | `Estimated Delivery by Tomorrow, 5 PM` | Real-time courier SLA |
| **Address Form: State**| Form Field | Text / Select | Geographical state |
| **Net Payable Total** | Calculated Number | `$9.10 (48% OFF)` | Checkout order amount |

---

## 6. States aur Variations
- **Selected Address Card:** Darker solid border (`border-slate-800`), filled radio indicator, active `Deliver Here` CTA button.
- **Unselected Address Card:** Neutral light border (`border-gray-200`), outline radio indicator, `Deliver to this Address` button.
- **Form Validation State:** Required fields indicator `* All fields required`. Empty submission error states: Design mein specified nahi.
- **Empty Address Book State:** Design mein specified nahi (current state displays 2 saved addresses).

---

## 7. Visual & Styling Notes
- **Color Accents:**
  - Accent Coral/Pink: `#FF3F6C` (Stepper completed badge)
  - Dark Charcoal: `#111827` (Text, primary action button)
  - Success Green: `#22c55e` (Free delivery tag)
  - Background Neutral: `#FAF6F6` (Page background)
  - Card Surfaces: White `#ffffff` with subtle borders (`#e5e7eb`)
- **Typography:** Modern clean sans-serif (`Inter`).
- **Form Inputs:** Soft gray border with subtle focus ring (`focus:border-slate-800`).

---

## 8. Confirm Karna Baaki (Gaps & Questions)
1. **International vs Domestic Address Constraints:** Card 1 has Indian format (`+91`, Pincode `110001`) while Card 2 has US format (`CA, USA - 94107`). Form me country selector field missing hai. Kya form dynamic country dropdown include karega?
2. **Pincode Serviceability Validation:** Pincode input par kya real-time courier API call hogi jo non-serviceable locations ko block karegi?
3. **Address Deletion Confirmation:** `Remove` link click karne par direct delete hoga ya confirmation modal khulega?
