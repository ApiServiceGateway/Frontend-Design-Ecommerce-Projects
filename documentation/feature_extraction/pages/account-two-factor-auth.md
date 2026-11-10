# Page Blueprint: Fashion Account - Two-Factor Authentication

---

## 1. Page Overview
- **Screen Name:** Fashion Account - Two-Factor Authentication (Security)
- **Stitch Screen ID:** `4510180017937633370`
- **Core Purpose:** Customer account credentials, saved cards, crypto addresses, aur delivery orders ko secure karne ke liye Time-based One-Time Password (TOTP) Authenticator app (Google Authenticator, Authy, Microsoft Authenticator) setup karne ka dedicated security workflow. Isme 3 sequential operational states (Initial Status View, Step-by-Step QR Setup & Key Verification, aur Success Activated State) shamil hain.
- **Entry Point / Navigation Route:** Account Dashboard left sidebar link "Add Two-Factor Authentication" under `Security` category (`/account/security/2fa`).
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
- **Right Column (8/12 grid span): 2FA Setup & Security Configuration Panel (`RightProfileContent`)**

#### 2.1 Left Column: Universal Account Navigation Sidebar (`LeftSidebar`)
- **Active Navigation Item:** `Security` group me `Add Two-Factor Authentication` active highlighted state me hai.
- **All Sidebar Links:** Profile summary, `Edit profile`, `Manage address`, `Gift Cards`, `Save UPI`, `Save Card`, `Save Crypto address`, `Two-Factor Auth` (Active), `Change password`, `Change Email`, `Reviews`, `Q&A`, `Policies`, and `Logout`.

#### 2.2 Right Column: 2FA Operational Views (`RightProfileContent`)

##### View 1: Initial Status View (`Initial View` - When 2FA is Disabled)
- **Header Section:**
  - Headline (`h1`): `Two-Factor Authentication` (`text-xl font-bold text-slate-800 leading-tight`).
  - Subtitle: `Enhance your account security with an extra layer of verification`.
  - Current Status Badge: `Disabled` (muted gray pill badge `bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-full`).
- **Authentication Method Card:**
  - Badge: `RECOMMENDED` (emerald pill badge `bg-emerald-50 text-[#14cda8] text-[10px] font-bold px-2 py-0.5 rounded`).
  - Method Title (`h2`): `Authenticator App` (`text-sm font-bold text-slate-900 mt-2`).
  - Method Description: `"Use Google Authenticator, Authy, or Microsoft Authenticator to generate temporary 6-digit verification codes."` (`text-xs text-slate-600 mt-1`).
  - Action CTA Button: `Set Up App` button (`px-4 py-2 bg-[#14cda8] hover:bg-[#11b896] text-white text-xs font-semibold rounded-lg shadow-sm transition`).

##### View 2: Step-by-Step Setup View (`Step-by-Step Setup View`)
- **Header Section:**
  - Headline (`h2`): `Setup Authenticator App` (`text-base font-bold text-slate-900`).
  - Subtitle: `"Each time you log in, in addition to your password, you'll use an authenticator app to generate a one-time code."`
- **Setup Stepper Flow:**
  - **Step 1: Scan QR code (`Step 1: Scan QR code`):**
    - Step Indicator: Circled number `1` with title `Scan QR code` (`font-bold text-xs text-slate-900`).
    - Instruction: `Scan the QR code below or manually enter the secret key into your authenticator app.`
    - Visual QR Matrix: High-resolution scannable QR code graphic (`w-40 h-40 border border-slate-200 rounded-xl p-2 bg-white shadow-xs`).
    - Manual Secret Key Fallback:
      - Label: `Can't scan QR code? Enter this secret instead:` (`text-[11px] text-slate-500 mt-2`).
      - Secret String: `ZPFIY52GITG7WOWJ44` (styled in bold monospace `font-mono font-bold text-xs text-slate-900 bg-slate-100 px-3 py-1.5 rounded`).
      - Copy Action: `Copy code` button (`text-xs font-semibold text-[#14cda8] hover:underline ml-2`).
  - **Step 2: Get verification Code (`Step 2: Verification Code`):**
    - Step Indicator: Circled number `2` with title `Get verification Code`.
    - Instruction: `Enter the 6-digit code you see in your authenticator app.`
    - Code Input: Numeric 6-digit input box, placeholder: `Enter verification code` (`text-center font-mono tracking-widest text-sm py-2 px-3 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#14cda8]`).
- **Setup Action Footer:**
  - Secondary Action: `Cancel` (white outline button `border border-slate-200 text-slate-700 text-xs font-semibold px-4 py-2 rounded-lg`).
  - Primary Action: `Confirm` (mint-green button `bg-[#14cda8] text-white text-xs font-semibold px-5 py-2 rounded-lg shadow-sm`).

##### View 3: Success State View (`Success State View` - When Activated)
- **Security Confirmation Banner:**
  - Status Tag: `Status: Active & Protected` (green badge `bg-emerald-50 text-emerald-700 text-[11px] font-bold px-3 py-1 rounded-full`).
  - Success Icon: Green animated shield checkmark icon.
  - Headline (`h2`): `Two-Factor Authentication Activated` (`text-xl font-bold text-slate-900 mt-3`).
  - Explanation: `"Your account is now protected with 2-factor authentication. Next time you sign in, you will be prompted for a 6-digit authenticator code."`
- **Backup Code Reminder Card (`Backup code reminder card`):**
  - Header: `Backup Recovery` (`text-xs font-bold text-slate-800`).
  - Description: `"Keep your authenticator app safe. You can generate one-time recovery codes anytime from your account settings."`
- **Action Control:**
  - Button: `Continue` (solid button `bg-slate-900 text-white text-xs font-semibold px-6 py-2.5 rounded-lg`).

- **Security Guidance Footer:**
  - Text: `"Two-factor authentication adds an essential layer of protection to your fashion orders, saved payment methods, and personal data."`

### Section 3: Global Site Footer (Shared Component)
- **Reference:** Dekhein [footer.md](../shared/footer.md)
- **Short Purpose:** Global footer with legal policies and community links.

---

## 3. Options aur Sub-options
- **2FA Methods:**
  - `Authenticator App` (TOTP - Google Authenticator, Authy, Microsoft Authenticator)
- **QR Code Options:**
  - Scan visual QR code
  - Enter manual 16-character alphanumeric secret key (`ZPFIY52GITG7WOWJ44`)
  - Copy secret key
- **Recovery Options:**
  - Backup Recovery Codes generation

---

## 4. Interactions aur Navigation
- `[Set Up App Button]` → Click → Transitions from Initial View to `Step-by-Step Setup View`, generates unique TOTP secret and QR code
- `[Copy code Button]` → Click → Copies secret key string `ZPFIY52GITG7WOWJ44` to clipboard
- `[Cancel Button in Setup View]` → Click → Discards setup attempt, returns to Initial View
- `[Confirm Button in Setup View]` → Click → Submits 6-digit TOTP code to backend API for time-sync validation; on success transitions to `Success State View`
- `[Continue Button on Success View]` → Click → Navigates back to Account Dashboard (`2b3693b6b629426085c21723956f5ca8`)
- `[Sidebar Navigation Links]` → Click → Navigates to corresponding account sections

---

## 5. Content aur Data Classification

| Element / Field | Data Type | Example Value Shown in Design | Notes & Source Confirmation |
| :--- | :--- | :--- | :--- |
| **Current Status** | System Security State | `Disabled`, `Active & Protected` | 2FA activation status |
| **Supported Apps** | System Taxonomy | `Google Authenticator, Authy, Microsoft Authenticator` | Recommended apps |
| **TOTP Secret Key** | Cryptographic Seed | `ZPFIY52GITG7WOWJ44` | Base32 secret string |
| **Verification Code**| Ephemeral User Input | 6-digit numeric string | Time-based one-time code |
| **QR Code Image** | Generated Media | Data URL / Matrix QR | TOTP URI encoded matrix |

---

## 6. States aur Variations
- **State 1 (Disabled):** Shows `Disabled` badge and `Set Up App` button.
- **State 2 (Setup In-Progress):** Displays QR code, secret key, and 6-digit code input field with `Confirm` button.
- **State 3 (Active / Enabled):** Shows `Active & Protected` badge, success confirmation, and backup recovery note.
- **Invalid 6-Digit Code Error:** Design mein specified nahi (standard: inline red error "Invalid or expired code, please try again").

---

## 7. Visual & Styling Notes
- **Color Accents:**
  - Primary Action Mint: `#14cda8` (Set Up App, Confirm button)
  - Active Protection Emerald: `#059669` (`bg-emerald-50 text-emerald-700`)
  - Status Disabled: Slate gray `#64748b` (`bg-slate-100 text-slate-600`)
  - Canvas Neutral: `#FAF4F4`
  - Card Surfaces: Pure white `#ffffff`
- **Typography:** `Plus Jakarta Sans` with monospace font (`font-mono`) for secret key and 6-digit code.
- **Border Radius:** `rounded-xl` for cards, `rounded-lg` for inputs and action buttons.

---

## 8. Confirm Karna Baaki (Gaps & Questions)
1. **SMS / Email 2FA Fallback:** Design me sirf Authenticator App (TOTP) method showcase kiya gaya hai. Kya SMS OTP ya Email OTP fallback authentication option support hoga?
2. **Downloadable Backup Recovery Codes:** Setup complete hone par kya 10 single-use emergency backup recovery codes download karne ka prompt aayega?
3. **Disable 2FA Flow:** Once enabled, user 2FA ko disable kaise karega (password re-entry requirement)?
