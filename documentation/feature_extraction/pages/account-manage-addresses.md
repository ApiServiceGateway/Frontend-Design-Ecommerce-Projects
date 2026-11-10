# Page Blueprint: Fashion Account - Manage Addresses

---

## 1. Page Overview
- **Screen Name:** Fashion Account - Manage Addresses
- **Stitch Screen ID:** `8849595718709894963`
- **Core Purpose:** Customer ke saved shipping aur billing address book ka central configuration interface. Isme 2 distinct toggleable views shamil hain: (1) Saved address cards display with `DEFAULT ADDRESS` badges, quick `EDIT` and `REMOVE` actions, aur (2) An in-place multi-field `Add New Delivery Address` form with Home/Work time delivery preferences aur default address toggles.
- **Entry Point / Navigation Route:** Account Dashboard left sidebar link "Manage address" (`/account/addresses`), ya Checkout Delivery Address page par manage address shortcut.
- **Shared Components Used:**
  - Header & Global Navigation: [navigation.md](../shared/navigation.md)
  - Footer & Brand Links: [footer.md](../shared/footer.md)

---

## 2. Layout aur Sections (Top to Bottom)

### Section 1: Global Navigation Header (Shared Component)
- **Reference:** Dekhein [navigation.md](../shared/navigation.md)
- **Short Purpose:** Persistent top utility header.

### Section 2: Account Split Layout (`MainContent`)
Split 2-column layout:
- **Left Column (4/12 grid span): Universal Account Navigation Sidebar (`LeftSidebar`)**
- **Right Column (8/12 grid span): Saved Addresses Hub & Form Panel (`RightProfileContent`)**

#### 2.1 Left Column: Universal Account Navigation Sidebar (`LeftSidebar`)
- **Active Navigation Item:** `Account Settings` group me `Manage address` highlighted hai.
- **All Sidebar Links:** Quick profile preview card, `Edit profile`, `Manage address` (Active), `Gift Cards`, `Save UPI`, `Save Card`, `Save Crypto address`, `Two-Factor Auth`, `Change password`, `Change Email`, `Reviews`, `Q&A`, `Policies`, and `Logout`.

#### 2.2 Right Column: Addresses Manager (`RightProfileContent`)

##### View 1: Saved Addresses List View (`view-address-list` - Initial Active State)
- **Header Section:**
  - Headline (`h1`): `Saved Addresses` (`text-xl font-bold text-slate-800`).
  - Subtitle: `Manage your delivery locations and preferences`.
  - Primary Action Button: `+ ADD NEW ADDRESS` (`px-4 py-2 bg-[#14cda8] hover:bg-[#11b896] text-slate-900 text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm transition`).
- **Saved Address Cards Container (Vertical Stack):**
  - **Card 1 (Default Address - Home):**
    - Container: White card with active border (`bg-white rounded-xl border border-slate-200/90 p-5 shadow-sm relative`).
    - Badges Strip:
      - `DEFAULT ADDRESS` (solid dark badge `bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded`).
      - `HOME` (emerald pill badge `bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200/60`).
    - Recipient Name: `Julian Vance` (`font-bold text-slate-900 text-sm mt-2`).
    - Postal Location: `742 Evergreen Terrace, San Francisco, CA 94107, USA` (`text-xs text-slate-600 leading-relaxed mt-1`).
    - Phone Number: `Mobile: +1 (555) 234-8901` (`text-xs text-slate-700 font-medium mt-1`).
    - Card Action Controls:
      - `EDIT` (text button with pen icon `fa-solid fa-pen-to-square text-xs text-slate-700 hover:text-black font-semibold`).
      - Divider line (`|`).
      - `REMOVE` (text button with trash icon `fa-solid fa-trash-can text-xs text-rose-600 hover:text-rose-700 font-semibold`).
  - **Card 2 (Work / Secondary Address):**
    - Container: White card (`bg-white rounded-xl border border-slate-200/90 p-5 shadow-sm relative`).
    - Badge: `WORK` (sky-blue pill badge `bg-sky-50 text-sky-700 text-[10px] font-bold px-2 py-0.5 rounded border border-sky-200/60`).
    - Recipient Name: `Julian Vance` (`font-bold text-slate-900 text-sm mt-2`).
    - Postal Location: `450 Mission St, Suite 1200, Financial District, San Francisco, CA 94105, USA`.
    - Phone Number: `Mobile: +1 (555) 234-8901`.
    - Card Action Controls: `EDIT` | `REMOVE`.
- **Security Privacy Footer:**
  - Shield icon (`fa-solid fa-shield text-slate-400 text-xs`).
  - Disclaimer: `"Your saved addresses are encrypted and strictly used to ensure accurate, contactless delivery and order fulfillment."`

##### View 2: Add New Delivery Address Form (`view-add-address-form` - Hidden Initially)
- **Top Bar:**
  - Back Navigation: `Back to Saved Addresses` with left arrow icon (`fa-solid fa-arrow-left text-xs`).
- **Header:**
  - Headline (`h1`): `Add New Delivery Address` (`text-xl font-bold text-slate-800`).
  - Subtitle: `Please ensure your contact details and address are accurate for prompt delivery.`
- **Form Inputs Grid:**
  - **Row 1:**
    - `Full Name *` (text input, placeholder: `Enter recipient's name`).
    - `10-digit Mobile Number *` (tel input, placeholder: `Mobile phone number`).
  - **Row 2:**
    - `Pincode / Postal Code *` (text input, placeholder: `ZIP or Postal code`).
    - `Locality / Town` (text input, placeholder: `Locality, Area, or Colony`).
  - **Row 3 (Full Width):**
    - `Flat, House no., Building, Company, Apartment *` (text input, placeholder: `Street address and apartment/unit`).
  - **Row 4:**
    - `City / District *` (text input, placeholder: `City name`).
    - `State / Province *` (text input / dropdown, placeholder: `State or Province`).
  - **Address Type Radio Selector:**
    - Label: `Address Type`
    - Option 1: `Home (All day delivery)` (with house icon).
    - Option 2: `Work (Delivery between 9 AM - 6 PM)` (with briefcase icon).
  - **Default Address Checkbox:**
    - Checkbox: `Make this my default delivery address`.
- **Form Action Controls:**
  - Primary CTA: `Save Address` (mint-green button `bg-[#14cda8] hover:bg-[#11b896] text-slate-900 font-bold px-6 py-2.5 rounded-lg text-xs`).
  - Secondary Action: `Cancel` (white outline button `bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-lg text-xs`).

### Section 3: Global Site Footer (Shared Component)
- **Reference:** Dekhein [footer.md](../shared/footer.md)
- **Short Purpose:** Global footer with legal policies and community links.

---

## 3. Options aur Sub-options
- **Address Types:**
  - `Home (All day delivery)`
  - `Work (Delivery between 9 AM - 6 PM)`
- **Address Card Actions:**
  - `EDIT`
  - `REMOVE`
  - `DEFAULT ADDRESS` indicator
- **Address Form Checkbox:**
  - `Make this my default delivery address`

---

## 4. Interactions aur Navigation
- `[+ ADD NEW ADDRESS Button]` → Click → Hides `view-address-list`, reveals `view-add-address-form` with empty inputs
- `[Back to Saved Addresses Link]` → Click → Hides form view, restores address list view
- `[EDIT Link on Card]` → Click → Opens address form prefilled with corresponding address data for editing
- `[REMOVE Link on Card]` → Click → Deletion confirmation prompt khulna confirm karna baaki
- `[Address Type Radio Select]` → Click → Toggles delivery time expectation metadata (All day vs Business hours)
- `[Save Address Button]` → Click → Validates required fields, saves address payload, switches back to address list view with newly created card
- `[Cancel Form Button]` → Click → Discards changes, reverts view back to `view-address-list`

---

## 5. Content aur Data Classification

| Element / Field | Data Type | Example Value Shown in Design | Notes & Source Confirmation |
| :--- | :--- | :--- | :--- |
| **Recipient Full Name**| User Input / Data | `Julian Vance` | Required field (\*) |
| **Mobile Number** | User Contact Data | `+1 (555) 234-8901` | Required field (\*) |
| **Street & Unit** | User Location Data | `742 Evergreen Terrace` | Required field (\*) |
| **City & State** | User Location Data | `San Francisco, CA` | Required field (\*) |
| **Postal Code** | User Location Data | `94107` | Required field (\*) |
| **Address Tag** | Taxonomy Enum | `HOME`, `WORK` | Delivery classification |
| **Default Flag** | Boolean State | `DEFAULT ADDRESS: true` | Primary shipping location |

---

## 6. States aur Variations
- **View States:**
  - List View: `view-address-list` active (`display: block`).
  - Form View: `view-add-address-form` active (`display: block`).
- **Default Card State:** Card 1 has solid dark badge `DEFAULT ADDRESS` and dark border highlight; secondary cards have standard border and lack default badge.
- **Empty Address State:** Design mein specified nahi (current state displays 2 populated address cards).

---

## 7. Visual & Styling Notes
- **Color Accents:**
  - Primary Action Mint: `#14cda8` (Add New Address, Save Address)
  - Home Badge Green: `#059669` (Emerald)
  - Work Badge Blue: `#0284c7` (Sky Blue)
  - Destructive Link: `#e11d48` (Rose)
  - Canvas Neutral: `#FAF4F4`
  - Card Surfaces: Pure white `#ffffff`
- **Typography:** `Plus Jakarta Sans` for clean tabular numbers and address data.
- **Border Radius:** `rounded-xl` for cards, `rounded-lg` for buttons and form inputs.

---

## 8. Confirm Karna Baaki (Gaps & Questions)
1. **Set as Default Shortcut:** Card 2 (secondary work address) par kya quick 1-click `Set as Default` button hona chahiye?
2. **Address Limit:** Maximum kitne addresses customer save kar sakta hai (e.g. 5 ya 10 max)?
3. **Country / Phone Code Internationalization:** Phone number format US style `+1 (555)` dikha raha hai jabki checkout screen me Indian address format bhi tha. Country selector dropdown form me add karna zaroori hai.
