# Page Blueprint: Fashion Account - Change Password

---

## 1. Page Overview
- **Screen Name:** Fashion Account - Change Password (Security)
- **Stitch Screen ID:** `10390789588986193197`
- **Core Purpose:** Authenticated account password rotation aur credential update interface. Isme current password verification, alternative OTP verification fallback (`Verify via OTP - Sent to j•••@example.com` with 2-minute countdown timer), new password aur confirm password inputs with visibility eye toggles, real-time password strength checklist requirements (8+ chars, uppercase, number, symbol), aur multi-device session invalidation security warnings shamil hain.
- **Entry Point / Navigation Route:** Account Dashboard left sidebar link "Change password" under `Security` category (`/account/security/password`).
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
- **Right Column (8/12 grid span): Change Password Form Panel (`RightProfileContent`)**

#### 2.1 Left Column: Universal Account Navigation Sidebar (`LeftSidebar`)
- **Active Navigation Item:** `Security` group me `Change password` active highlighted state me hai.
- **All Sidebar Links:** Profile summary, `Edit profile`, `Manage address`, `Gift Cards`, `Save UPI`, `Save Card`, `Save Crypto address`, `Two-Factor Auth`, `Change password` (Active), `Change Email`, `Reviews`, `Q&A`, `Policies`, and `Logout`.

#### 2.2 Right Column: Password Management Form (`RightProfileContent`)
- **Header Section:**
  - Headline (`h1`): `Change Password` (`text-xl font-bold text-slate-800 leading-tight`).
  - Subtitle: `Ensure your account stays secure by using a strong, unique password`.
- **Form Inputs Container (`space-y-5 max-w-lg`):**

  ##### Field 1: Current Password & OTP Fallback
  - Label: `Current Password` (`font-semibold text-xs text-slate-700`).
  - Input Container: Password field with lock icon (`fa-solid fa-lock`) and eye visibility toggle (`fa-regular fa-eye text-slate-400`).
  - Action Shortcut: `Verify via OTP` text link (`text-xs text-[#14cda8] hover:underline font-semibold`).
  - **Quick Verification via OTP Expandable Box:**
    - Header: `Quick Verification via OTP • Sent to j•••@example.com` (`bg-slate-50 border border-slate-200/80 rounded-xl p-4`).
    - Explanatory Note: `"Can't recall your current password? We can send a one-time verification passcode (OTP) to your verified phone or email."`
    - Countdown Timer & Resend: `01:58 Resend OTP` (`text-xs text-slate-500 font-mono`).

  ##### Field 2: New Password
  - Label: `New Password *` (`text-xs font-semibold text-slate-700`).
  - Input: Password field with left key icon (`fa-solid fa-key`) and right eye toggle.

  ##### Field 3: Confirm New Password
  - Label: `Confirm New Password *` (`text-xs font-semibold text-slate-700`).
  - Input: Password field with matching confirmation validation and right eye toggle.

  ##### Password Requirements Checklist Card:
  - Header: `Password Requirements` (`text-xs font-bold text-slate-700 uppercase tracking-wider`).
  - Interactive Criteria List:
    - Rule 1: `Minimum 8 characters` (with check/bullet indicator).
    - Rule 2: `At least one uppercase letter & one number` (with check/bullet indicator).
    - Rule 3: `At least one special symbol (@, #, $, etc.)` (with check/bullet indicator).

- **Form Actions Bar:**
  - Secondary Action: `Cancel` (white outline button `border border-slate-200 text-slate-700 text-xs font-semibold px-4 py-2 rounded-lg`).
  - Primary Action: `Update Password` (mint-green button `bg-[#14cda8] hover:bg-[#11b896] text-slate-900 text-xs font-bold px-6 py-2.5 rounded-lg shadow-sm transition`).

- **Security Session Invalidation Notice Footer:**
  - Icon: Info shield icon (`fa-solid fa-shield-halved text-slate-400 text-xs`).
  - Text: `"Password changes will invalidate active sessions on unrecognized devices. You may be asked to re-login."`

### Section 3: Global Site Footer (Shared Component)
- **Reference:** Dekhein [footer.md](../shared/footer.md)
- **Short Purpose:** Global footer with legal policies and community links.

---

## 3. Options aur Sub-options
- **Authentication Alternatives:**
  - Enter Current Password
  - Alternative OTP Verification (`Verify via OTP`)
- **Password Visibility:**
  - Show / Hide password toggle for each field
- **Password Complexity Rules:**
  - 8+ Characters
  - Uppercase & Numeric presence
  - Special character presence

---

## 4. Interactions aur Navigation
- `[Password Visibility Eye Icon Click]` → Click → Toggles input type between `password` and `text`
- `[Verify via OTP Link]` → Click → Expands OTP verification container, triggers 6-digit code dispatch to registered email/mobile
- `[Resend OTP Link]` → Click → Restarts 2-minute countdown timer, re-sends OTP code
- `[New Password Typing]` → Input → Dynamically updates requirement checklist checkmarks from gray to green
- `[Update Password Button]` → Click → Validates current password/OTP, checks new password complexity and equality with confirm field, invalidates other active sessions, displays success toast
- `[Cancel Button]` → Click → Discards inputs, returns to Account Dashboard (`2b3693b6b629426085c21723956f5ca8`)
- `[Sidebar Navigation Links]` → Click → Navigates to corresponding account sections

---

## 5. Content aur Data Classification

| Element / Field | Data Type | Example Value Shown in Design | Notes & Source Confirmation |
| :--- | :--- | :--- | :--- |
| **Masked Email** | Truncated User Data | `j•••@example.com` | OTP destination preview |
| **OTP Timer** | Real-time Countdown | `01:58` | Decrementing resend timer |
| **Current Password** | Highly Sensitive Input | Masked text string | Old security credential |
| **New Password** | Highly Sensitive Input | Masked text string | New security credential |
| **Confirm Password** | Highly Sensitive Input | Masked text string | Password confirmation match |
| **Complexity Rules** | Fixed System Policy | `8+ chars, 1 uppercase, 1 number, 1 symbol` | Enforced security policy |

---

## 6. States aur Variations
- **OTP Alternative State:** Collapsed by default; expands when user clicks `Verify via OTP`.
- **Requirement Rule Checklist State:**
  - Unmet: Muted gray bullet icon.
  - Satisfied: Emerald green checkmark icon (`fa-solid fa-check text-emerald-600`).
- **Mismatch Error State:** When Confirm Password does not match New Password: Design mein specified nahi (standard inline red error: "Passwords do not match").

---

## 7. Visual & Styling Notes
- **Color Accents:**
  - Primary Action Mint: `#14cda8` (Update Password button, Verify via OTP link)
  - Requirement Green: `#059669` (Satisfied checkmark)
  - Canvas Neutral: `#FAF4F4`
  - Card Surfaces: Pure white `#ffffff` with subtle borders (`border-slate-200/90`)
- **Typography:** `Plus Jakarta Sans` for clean, secure data input layout.
- **Border Radius:** `rounded-xl` for cards, `rounded-lg` for inputs and action buttons.

---

## 8. Confirm Karna Baaki (Gaps & Questions)
1. **Password History Constraint:** Kya customer recent previous passwords (e.g. last 3 used passwords) reuse kar sakta hai ya restrict hoga?
2. **Current Session Status:** Password change hone ke baad kya current browser session bhi force-logout hoga ya current device logged-in rahega?
3. **Biometric / Passkey Support:** Kya passwordless passkey (WebAuthn / Apple TouchID / Windows Hello) support add karne ka plan hai?
