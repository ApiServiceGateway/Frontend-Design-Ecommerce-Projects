# Page Blueprint: Fashion Account - Saved UPI

---

## 1. Page Overview
- **Screen Name:** Fashion Account - Saved UPI
- **Stitch Screen ID:** `478003447444245128`
- **Core Purpose:** Customer ke verified Unified Payments Interface (UPI) VPA handles ka management interface. Isme in-line `Add New UPI ID` input strip with instant validation, saved VPAs cards list with `DEFAULT` aur `SECONDARY` status tags, bank provider labels (Google Pay/Axis Bank, Paytm Payments Bank), 1-click `SET AS DEFAULT`, `EDIT`, and `REMOVE` actions, aur strict "UPI PIN is never stored" security disclaimers shamil hain.
- **Entry Point / Navigation Route:** Account Dashboard left sidebar link "Save UPI" (`/account/payments/upi`), ya checkout payment page par "Save UPI" option.
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
- **Right Column (8/12 grid span): Saved UPI Management Panel (`RightProfileContent`)**

#### 2.1 Left Column: Universal Account Navigation Sidebar (`LeftSidebar`)
- **Active Navigation Item:** `PAYMENTS` category me `Save UPI` highlighted active state me hai.
- **All Sidebar Links:** Profile summary, `Edit profile`, `Manage address`, `Gift Cards`, `Save UPI` (Active), `Save Card`, `Save Crypto address`, `Two-Factor Auth`, `Change password`, `Change Email`, `Reviews`, `Q&A`, `Policies`, and `Logout`.

#### 2.2 Right Column: Saved UPI Management Panel (`RightProfileContent`)
- **Header Section:**
  - Headline (`h1`): `Saved UPI` (`text-xl font-bold text-slate-800 leading-tight`).
  - Subtitle: `Manage your verified UPI IDs and VPA handles for instant payments`.
- **In-Line Add New UPI ID Box (`Add New UPI ID`):**
  - Container: Soft slate background card (`bg-slate-50 border border-slate-200/80 rounded-xl p-4 mb-6`).
  - Form Header: `Add New UPI ID` with plus icon (`fa-solid fa-plus text-[#14cda8]`).
  - Input Strip (12-column responsive layout):
    - Input 1 (5/12 span): `Enter your UPI ID (e.g. name@okhdfcbank)` (Text input with white background).
    - Input 2 (4/12 span): `Account Holder Name` (Text input, placeholder: `Account Holder Name`).
    - Action CTA (3/12 span): `Add UPI` button (`w-full bg-[#14cda8] hover:bg-[#14cda8]/90 text-white font-semibold py-2 px-4 rounded-lg text-xs shadow-sm inline-flex items-center justify-center gap-1.5`).
- **Saved UPI Cards List (Vertical Stack):**

  ##### Card 1: Default Verified UPI Handle
  - **Header Meta:**
    - Status Badge 1: `DEFAULT` (`text-[11px] font-bold tracking-wider text-slate-500 uppercase`).
    - Status Badge 2: `VERIFIED` (`bg-emerald-50 text-[#14cda8] text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1` with shield icon).
    - Provider Brand: `Google Pay / Axis Bank` (`text-[11px] font-medium text-slate-400`).
  - **VPA & Account Identity:**
    - VPA Handle: `julianvance@okaxis` (Monospace bold text `font-mono text-sm font-bold text-slate-800`).
    - Account Holder: `Account Holder: Julian Vance` (`text-xs text-slate-600`).
  - **Card Action Controls:**
    - Button 1: `EDIT` (with file icon `fa-regular fa-file-lines text-xs text-slate-400 hover:text-[#14cda8]`).
    - Divider: Vertical line separator (`h-3.5 w-px bg-slate-200`).
    - Button 2: `REMOVE` (with trash icon `fa-regular fa-trash-can text-xs hover:text-rose-600`).

  ##### Card 2: Secondary Verified UPI Handle
  - **Header Meta:**
    - Status Badge 1: `SECONDARY` (`bg-slate-100 text-slate-600 text-[11px] font-semibold px-2 py-0.5 rounded-full`).
    - Status Badge 2: `VERIFIED` (`bg-emerald-50 text-[#14cda8]`).
    - Provider Brand: `Paytm Payments Bank` (`text-[11px] font-medium text-slate-400`).
  - **VPA & Account Identity:**
    - VPA Handle: `919876543210@paytm` (Monospace bold text).
    - Account Holder: `Account Holder: Julian Vance`.
  - **Card Action Controls:**
    - Button 1: `SET AS DEFAULT` (with shield icon `fa-solid fa-shield-halved text-xs text-slate-400 hover:text-[#14cda8]`).
    - Divider: Vertical line separator.
    - Button 2: `REMOVE` (hover rose text).

- **Security Compliance Note Footer:**
  - Container: Soft gray pill card (`bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 mt-4 flex items-start gap-3`).
  - Icon: Lock icon (`fa-solid fa-lock text-slate-400 mt-0.5`).
  - Text: `"Your UPI IDs are secured with 256-bit encryption. UPI PIN will never be stored or requested on this platform."`

### Section 3: Global Site Footer (Shared Component)
- **Reference:** Dekhein [footer.md](../shared/footer.md)
- **Short Purpose:** Global footer with legal policies and community links.

---

## 3. Options aur Sub-options
- **UPI Actions:**
  - `Add UPI`
  - `EDIT` VPA name/handle
  - `SET AS DEFAULT`
  - `REMOVE`
- **Supported UPI Apps/Handles Recognized in Design:**
  - `@okaxis` (Google Pay Axis Bank)
  - `@paytm` (Paytm Payments Bank)
  - Other popular handles: `@okhdfcbank`, `@icici`, `@ybl`

---

## 4. Interactions aur Navigation
- `[Add UPI Button]` → Click → Validates VPA format regex (`[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}`), initiates NPCI bank verification ping, adds verified VPA card to list
- `[SET AS DEFAULT Button on Card 2]` → Click → Promotes secondary UPI handle to `DEFAULT`, demotes previous default handle
- `[EDIT Button on Card 1]` → Click → Opens inline input to update custom label or name
- `[REMOVE Button on Card]` → Click → Triggers deletion confirmation prompt
- `[Sidebar Navigation Links]` → Click → Navigates to corresponding account sections

---

## 5. Content aur Data Classification

| Element / Field | Data Type | Example Value Shown in Design | Notes & Source Confirmation |
| :--- | :--- | :--- | :--- |
| **UPI ID / VPA** | Financial Address String | `julianvance@okaxis`, `919876543210@paytm` | Unique virtual payment address |
| **Account Holder** | User Name | `Julian Vance` | Associated bank account holder |
| **UPI Provider Bank**| System Taxonomy | `Google Pay / Axis Bank`, `Paytm Payments Bank` | VPA handle bank issuer |
| **Verification State**| Security Tag | `VERIFIED` | Green verified shield tag |
| **Priority State** | User Setting | `DEFAULT`, `SECONDARY` | Checkout auto-selection order |

---

## 6. States aur Variations
- **Default vs Secondary Card State:** Default card displays `DEFAULT` label and `EDIT` link; secondary card displays `SECONDARY` badge and `SET AS DEFAULT` link.
- **VPA Format Validation:**
  - Valid: Green check or instant submission.
  - Invalid / Bank Not Found: Design mein specified nahi (standard inline red error: "Please enter a valid UPI ID").
- **Empty State:** Design mein specified nahi (current state displays 2 active verified handles).

---

## 7. Visual & Styling Notes
- **Color Accents:**
  - Primary Action Mint: `#14cda8` (Add UPI button, Verified badge text)
  - Verified Background Pill: `#ecfdf5` (`bg-emerald-50`)
  - Canvas Neutral: `#FAF4F4`
  - Card Surfaces: Pure white `#ffffff` with subtle borders (`border-slate-200/90`)
- **Typography:** `Plus Jakarta Sans` with monospace font (`font-mono`) for virtual payment address handles.
- **Border Radius:** `rounded-xl` for cards, `rounded-lg` for inputs and action buttons.

---

## 8. Confirm Karna Baaki (Gaps & Questions)
1. **Live NPCI Bank Name Verification:** UPI ID enter karne par kya background me penny-drop ya NPCI VPA lookup API call karke registered account holder name auto-fetch hoga?
2. **Maximum UPI Limit:** Ek account me kitne VPAs maximum save kiye ja sakte hain?
3. **Mandate / Autopay Support:** Kya subscription ya recurring orders ke liye UPI Autopay / e-mandate registration support hoga?
