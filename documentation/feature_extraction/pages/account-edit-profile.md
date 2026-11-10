# Page Blueprint: Fashion Account - Edit Profile

---

## 1. Page Overview
- **Screen Name:** Fashion Account - Edit Profile
- **Stitch Screen ID:** `16457286814936185481`
- **Core Purpose:** User ki core personal identity aur contact credentials update karne ka dedicated interface. Isme profile avatar & landscape cover photo uploaders, primary & alternate phone numbers with verification status badges, gender selection, birthdate formatting, city/location coordinates, aur 256-bit data encryption guarantees shamil hain.
- **Entry Point / Navigation Route:** Account Dashboard (`2b3693b6b629426085c21723956f5ca8`) me left sidebar se "Edit profile" link click karne par (`/account/profile/edit`).
- **Shared Components Used:**
  - Header & Global Navigation: [navigation.md](../shared/navigation.md)
  - Footer & Brand Links: [footer.md](../shared/footer.md)

---

## 2. Layout aur Sections (Top to Bottom)

### Section 1: Global Navigation Header (Shared Component)
- **Reference:** Dekhein [navigation.md](../shared/navigation.md)
- **Short Purpose:** Persistent top utility navigation.

### Section 2: Account Split Layout (`MainContent`)
Split 2-column layout:
- **Left Column (4/12 grid span): Universal Account Navigation Sidebar (`LeftSidebar`)**
- **Right Column (8/12 grid span): Edit Profile Form Container (`RightProfileContent`)**

#### 2.1 Left Column: Universal Account Navigation Sidebar (`LeftSidebar`)
- **Active Selection:** `Edit profile` under `Account Settings` is highlighted as the active state.
- **Navigation Groups:**
  - `Account Settings`: `Edit profile` (Active), `Manage address`.
  - `PAYMENTS`: `Gift Cards`, `Save UPI`, `Save Card`, `Save Crypto address`.
  - `Security`: `Add Two-Factor Authentication`, `Change password`, `Change your Email`.
  - `Help & Legal`: `Reviews`, `Questions & Answers`, `Terms and Conditions`, `Privacy Policy`.
  - `Logout` Action button.

#### 2.2 Right Column: Edit Profile Form (`RightProfileContent`)
- **Landscape Cover Media Strip:**
  - Full-width sunset gradient cover photo (`h-44 sm:h-52 w-full`).
  - Top-Right Floating Control: `Edit Cover` button with camera icon (`fa-solid fa-camera px-3 py-1.5 bg-white/90 backdrop-blur-sm`).
- **Profile Avatar & Header Strip:**
  - Floating Circular Avatar: Large circular headshot (`w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white shadow-md -mt-12 sm:-mt-14`).
  - Avatar Edit Overlay: Center edit icon with camera/pen graphic.
  - Page Heading (`h1`): `Edit Profile` (`text-xl font-bold text-slate-800`).
  - Subtitle: `Update your personal details and contact information`.
- **Form Section: Basic Information (`BASIC INFORMATION`):**
  - Section Header: `BASIC INFORMATION` | Subtext: `Fields marked with * are required` (rose asterisk indicator).
  - Input Grid (2-column on desktop):
    - **Field 1 (Full Name \*):** Left user icon (`fa-regular fa-user`), text input, prefilled value: `Julian Vance`.
    - **Field 2 (Email ID \*):** Left envelope icon (`fa-regular fa-envelope`), text input, prefilled value: `julian.vance@example.com`, status badge: `Primary` (emerald pill).
    - **Field 3 (Mobile Number):** Left phone icon (`fa-solid fa-phone`), tel input, prefilled value: `+1 (555) 234-8901`, status badge: `Verified` (sky blue pill).
    - **Field 4 (Alternate Mobile):** Left phone icon, tel input, placeholder: `Enter alternative phone`, label tag: `(Optional)`.
    - **Field 5 (Gender):** Left gender icon (`fa-solid fa-venus-mars`), select dropdown with options (`Male`, `Female`, `Non-binary`, `Prefer not to say`).
    - **Field 6 (Date of Birth):** Left calendar icon (`fa-regular fa-calendar`), text input, placeholder: `DD/MM/YYYY`, prefilled value: `23/04/2001`.
    - **Field 7 (Location / City - Full Width):** Left pin icon (`fa-solid fa-location-dot`), text input, prefilled value: `San Francisco, California, USA`.
- **Privacy & Compliance Callout Box:**
  - Lock icon (`fa-solid fa-lock text-slate-400`).
  - Text: `"Your contact details are encrypted and utilized solely for order tracking notifications, SMS dispatch alerts, and secure two-factor account recovery."`
- **Bottom Form Actions Bar:**
  - Security Seal: `256-bit encrypted data protection` with shield icon (`fa-solid fa-shield text-slate-400 text-xs`).
  - Secondary Action: `Cancel` button (white outline button).
  - Primary Action: `Save Changes` button (mint-green button `bg-[#14cda8]` with check icon `fa-solid fa-check text-slate-900 font-semibold px-5 py-2 rounded-lg`).

### Section 3: Global Site Footer (Shared Component)
- **Reference:** Dekhein [footer.md](../shared/footer.md)
- **Short Purpose:** Global footer with legal policies and community links.

---

## 3. Options aur Sub-options
- **Gender Dropdown Options:**
  - `Male` (Default active)
  - `Female`
  - `Non-binary`
  - `Prefer not to say`
- **Cover & Avatar Actions:**
  - `Edit Cover` (file picker for landscape banner)
  - `Edit Avatar` (file picker for profile photo)

---

## 4. Interactions aur Navigation
- `[Edit Cover Button]` → Click → Triggers file upload dialogue for header background photo
- `[Avatar Overlay Edit Icon]` → Click → Triggers file upload dialogue for user headshot avatar
- `[Gender Select Dropdown]` → Change → Updates chosen gender value
- `[Cancel Button]` → Click → Discards unsaved modifications, redirects back to Account Dashboard (`2b3693b6b629426085c21723956f5ca8`)
- `[Save Changes Button]` → Click → Validates required inputs (Full Name, Email), dispatches update payload to user API, displays success toast
- `[Sidebar Navigation Links]` → Click → Navigates to corresponding account sub-pages

---

## 5. Content aur Data Classification

| Element / Field | Data Type | Example Value Shown in Design | Notes & Source Confirmation |
| :--- | :--- | :--- | :--- |
| **Full Name** | User Dynamic Input | `Julian Vance` | Required field (\*) |
| **Email ID** | User Dynamic Input | `julian.vance@example.com` | Primary account email (\*) |
| **Email Status** | System Verification State | `Primary` | Verified primary email badge |
| **Mobile Number** | Sensitive User Input | `+1 (555) 234-8901` | Phone number |
| **Mobile Status** | Verification State | `Verified` | OTP verified badge |
| **Alternate Phone** | User Dynamic Input | Empty / Placeholder | Optional backup contact |
| **Gender** | Taxonomy Enum | `Male` | Selected gender option |
| **Date of Birth** | User Personal Data | `23/04/2001` | Formatted birthday |
| **Location / City** | User Geographical Data | `San Francisco, California, USA` | User residential city |

---

## 6. States aur Variations
- **Input Focus State:** Focused input switches from background `bg-slate-50` to `focus:bg-white` with focus ring `focus:ring-slate-300`.
- **Field Required Indicator:** Required fields clearly marked with red asterisk (`text-rose-500 *`).
- **Unverified Mobile State:** Agar mobile number verify na ho, toh `Verified` badge ki jagah `Verify Now` action link render hona chahiye: Design mein specified nahi.
- **Save Changes Loading State:** Design mein specified nahi.

---

## 7. Visual & Styling Notes
- **Color Accents:**
  - Save Button Mint Accent: `#14cda8` (Hover `#11b896`)
  - Status Badges: Emerald `#059669` (Primary), Sky Blue `#0284c7` (Verified)
  - Required Asterisk: Rose `#f43f5e`
  - Input Background: `#f8fafc` (`bg-slate-50`)
- **Typography:** `Plus Jakarta Sans` for clean data entry ergonomics.
- **Icons:** Left-aligned contextual Font Awesome icons inside inputs (`fa-user`, `fa-envelope`, `fa-phone`, `fa-calendar`, `fa-location-dot`).

---

## 8. Confirm Karna Baaki (Gaps & Questions)
1. **Email / Phone Change Re-Verification:** Email ya Phone number change karne par kya in-place OTP verification trigger hogi, ya separate `Change Email` screen (`628386866999325939`) use hogi?
2. **Avatar Image Cropper:** Avatar ya Cover image select karne par kya client-side image cropping widget available hoga?
3. **Date of Birth Datepicker:** Input plain text field (`placeholder="DD/MM/YYYY"`) ke roop me hai. Kya native calendar datepicker modal integrate hoga?
