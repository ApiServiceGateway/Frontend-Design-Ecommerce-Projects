# Screen Documentation: Fashion Account - Change Email

## 1. Page Overview
- **Screen Name:** Fashion Account - Change Email
- **Stitch Screen ID:** `628386866999325939`
- **File Source ID:** `5695937360048946347`
- **Core Purpose:** Registered user ko apna primary account email address badalne aur naye email ko verify karne ke liye dedicated, secure self-service workflow provide karna. Security hijack protection ke liye dual identity verification methods (Old Email OTP ya 2FA Authenticator TOTP) aur 24-hour dual-inbox security notification notice shamil hai.
- **Route:** `/account/change-email` ya `/account/security/change-email`
- **Shared Components:**
  - Header: [`feature_extraction/shared/navigation.md`](../shared/navigation.md)
  - Footer: [`feature_extraction/shared/footer.md`](../shared/footer.md)
  - Profile Navigation Sidebar: [`feature_extraction/pages/account-dashboard-overview.md`](./account-dashboard-overview.md#sidebar-account-navigation-menu)

---

## 2. Layout aur Sections (Top to Bottom Visual Order)

### 2.1. Global Navigation Bar (Header)
- Full standard global header (Logo, Global Search bar with live shortcuts, Currencies/Language selectors, Wishlist badge, Cart popover, Profile avatar menu).
- Refer to [`shared/navigation.md`](../shared/navigation.md).

### 2.2. Page Body Container
- **Layout Grid:** 12-column responsive layout (`md:grid-cols-12 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8`).
- **Left Column (4 cols / `md:col-span-4`):** Persistent Account Sidebar (User mini card, Account Settings, Payments, Security group, Help & Legal links, Logout).
- **Right Column (8 cols / `md:col-span-8`):** Main Change Email card container (`bg-white rounded-2xl shadow-sm border border-slate-100/90 p-6 sm:p-8 space-y-6`).

### 2.3. Right Panel: Change Email Card Structure
1. **Header Section:**
   - Title: `Change Email` (h1, font-semibold, text-slate-900).
   - Subtitle: `Update your registered email address and verification preferences` (text-xs, text-slate-500).
   - Bottom divider line (`border-b border-slate-100`).

2. **Current Email Status Card:**
   - Light grey container (`bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center`).
   - Label: `CURRENT EMAIL ADDRESS` (text-[11px] font-medium uppercase tracking-wider text-slate-400).
   - Value: `julian.vance@example.com` (text-sm font-semibold text-slate-800).
   - Status Badge: `Verified` (Emerald badge with checkmark icon `svg polyline`, `bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-xs font-medium rounded-full px-2.5 py-1`).

3. **Change Email Form:**
   - **New Email Field:**
     - Label: `New Email Address`
     - Input Box: Left mail icon (`fa-regular fa-envelope`), placeholder: `"Enter new email address"`.
     - Hint text: `"We will send a 6-digit verification code to this address."`
   - **Confirm Email Field:**
     - Label: `Confirm New Email Address`
     - Input Box: Left mail icon (`fa-regular fa-envelope`), placeholder: `"Re-enter new email address"`.

4. **Identity Verification Section:**
   - Section Header: `Identity Verification` with helper pill/label `Choose 1 of 2 methods`.
   - **Method Selector Tabs (Segmented Button Group):**
     - Tab 1: `Old Email Code` (Envelope icon `fa-regular fa-envelope text-[#14cda8]`). Default active state (`bg-white text-slate-800 shadow-sm border border-slate-200/60`).
     - Tab 2: `Authenticator (2FA)` (Key icon `fa-solid fa-key`). Inactive state (`text-slate-500 hover:text-slate-700`).

   - **Method View 1: Old Email OTP Panel (`#view-email-otp`):**
     - Target indicator: `Code sent to julian.vance@...`
     - Countdown Timer: Clock icon (`fa-regular fa-clock`) + `Expires in 04:59` (text-emerald-700 font-semibold).
     - Input field: Shield icon (`fa-solid fa-shield-halved`), monospace wide tracking (`font-mono tracking-widest`), `maxlength="6"`, placeholder: `"Enter 6-digit code"`.
     - Inline Action: `Resend Code` link button (emerald green, right-aligned inside input).
     - Helper note: `"Check your inbox or spam folder for the one-time verification passcode."`

   - **Method View 2: Authenticator 2FA Panel (`#view-2fa-otp`, initially hidden):**
     - Subhead: `Enter 6-Digit Authenticator Code`
     - Status Badge: `2FA Active` (Shield icon `fa-solid fa-shield`, emerald pill).
     - Input field: Key icon (`fa-solid fa-key`), monospace wide tracking (`font-mono tracking-widest`), `maxlength="6"`, placeholder: `"000 000"`.
     - Helper note: `"Open Google Authenticator, 1Password, or Authy on your mobile device to view your dynamic code."`

5. **Dual Notification & Security Advisory Banner:**
   - Icon: Shield icon (`fa-solid fa-shield text-slate-400`).
   - Notice Copy: `"For your security, a verification link and security notification will be dispatched to both addresses. You must verify the new email within 24 hours to finalize the change."`

6. **Form Action Footer:**
   - Top border divider (`border-t border-slate-100 pt-4 flex items-center justify-end gap-3`).
   - Secondary Button: `Cancel` (Bordered light button, text-slate-700).
   - Primary Submit Button: `Update Email` (Emerald background `#14cda8`, white text, right arrow svg icon).

### 2.4. Global Footer
- Full standard global footer with newsletter, multi-column site directory, customer service, and payment partners.
- Refer to [`shared/footer.md`](../shared/footer.md).

---

## 3. Options aur Sub-options

| Element | Type | Options / States / Formats | Description |
| :--- | :--- | :--- | :--- |
| **Current Email Display** | Static Field + Badge | Email String + `Verified` | User ka maujuda active email address display hota hai. |
| **New Email Input** | Input (Email) | Valid RFC 5322 email | Naya email address enter karne ke liye input box. |
| **Confirm Email Input** | Input (Email) | Match with New Email | Typos avoid karne ke liye naya email re-enter karne ka verification field. |
| **Verification Method Selector** | Segmented Tab Switch | 1. `Old Email Code`<br>2. `Authenticator (2FA)` | User choose kar sakta hai ki identity verification purane email ke OTP se karni hai ya Authenticator app ke TOTP code se. |
| **OTP Input (Old Email)** | Text / Number Input | 6 alphanumeric/digits, `maxlength="6"`, Monospace | Email par bheja gaya 6-digit verification passcode. |
| **Resend Code Action** | Button / Link | Active, Cooldown Timer | Agar OTP na mile to dobara request bhejne ke liye action. |
| **2FA Code Input** | Text / Number Input | 6 digits, `maxlength="6"`, Monospace | Google Authenticator/Authy ka live 6-digit TOTP code. |
| **Cancel Button** | Button | Reset / Navigate Back | Form input clear karta hai ya pichhle Security overview page par bhejta hai. |
| **Update Email Button** | Primary Action Button | Normal, Disabled, Submitting | Validation pass hone par email update process trigger karta hai. |

---

## 4. Interactions aur Navigation Flow

| Element / Trigger | Action | Target / Result |
| :--- | :--- | :--- |
| `Method: Old Email Code` button click | User clicks Old Email tab | `#view-email-otp` panel visible hota hai; `#view-2fa-otp` hide ho jata hai. Old Email button active styling le leta hai. |
| `Method: Authenticator (2FA)` button click | User clicks 2FA tab | `#view-2fa-otp` panel visible hota hai; `#view-email-otp` hide ho jata hai. 2FA button active styling le leta hai. |
| `Resend Code` click | User clicks resend link | Purane email par naya OTP dispatch hota hai, 5-minute countdown (`04:59`) reset hota hai aur toast notice aata hai. |
| `New Email` != `Confirm Email` | User enters mismatched email | Inline error state trigger hota hai: *"Email addresses do not match"*. |
| Same Email entered | User enters current email | Inline validation: *"New email cannot be the same as current email"*. |
| `Cancel` click | User clicks Cancel | Security Dashboard `/account/security` par return hota hai bina changes save kiye. |
| `Update Email` click | Valid submission | 1. Old email verification / 2FA check verify hoti hai.<br>2. Dono addresses par security alert email send hoti hai.<br>3. Naye email address par confirmation activation link (24hr validity) deliver hota hai.<br>4. Success banner display hota hai: *"Verification email sent. Please check your new inbox within 24 hours."* |

---

## 5. Content aur Data Classification Table

| Field / Content Key | Content Type | Static / Dynamic | Data Source / Mapping |
| :--- | :--- | :--- | :--- |
| **Page Title & Subtitle** | Headline Text | Static | Design System UI strings |
| **Current Email Address** | User Attribute | Dynamic | `user.email` (Auth Profile Service) |
| **Current Email Verification Status** | Status Pill | Dynamic | `user.isEmailVerified` (true = Emerald badge) |
| **New Email Address Input** | Form Field | User Input | State `form.newEmail` |
| **Confirm Email Address Input** | Form Field | User Input | State `form.confirmNewEmail` |
| **Verification Method** | Selection Tab | Interactive State | State `form.verificationMethod` (`email_otp` \| `authenticator_totp`) |
| **Old Email Code** | Passcode Input | User Input | State `form.oldEmailOtp` |
| **OTP Expiry Timer** | Countdown Timer | Dynamic | Session state (e.g. 300s / `04:59` decrementing) |
| **2FA Code** | Passcode Input | User Input | State `form.authenticatorCode` |
| **Security Advisory Text** | Informational Callout | Static | Compliance policy string (24-hour dual notification) |

---

## 6. States aur Variations

### 6.1. Verification Method Switch State
- **Email OTP Selected (Default):**
  - "Old Email Code" tab highlighted with white card elevation.
  - `#view-email-otp` box active: shows current masked email `julian.vance@...`, countdown timer `04:59`, and "Resend Code" trigger.
- **Authenticator (2FA) Selected:**
  - "Authenticator (2FA)" tab highlighted.
  - `#view-2fa-otp` box active: shows "2FA Active" green indicator pill and 6-digit TOTP input (`000 000`).

### 6.2. 2FA Disabled Account State
- Agar user ne 2FA enable nahi kiya hua:
  - "Authenticator (2FA)" option disabled/grayed out ho sakta hai ya ek prompt show karega: *"2FA not configured. Enable 2FA in Security settings to use this method."*

### 6.3. Cooldown / Rate Limit State
- Jab "Resend Code" par click kiya jata hai, cooldown period (60 seconds) tak link disable ho jati hai taaki spamming roki ja sake.

### 6.4. Mobile Responsive Layout
- Current email header and badge vertically stack on mobile screens (`flex-col sm:flex-row`).
- Segmented buttons grid smoothly shrinks to two full-width adjacent touch targets.

---

## 7. Visual & Styling Notes
- **Color Accents:** Emerald Teal (`#14cda8`, `emerald-50`, `emerald-700`) verification highlights aur primary buttons ke liye.
- **Card Styling:** Light, airy dashboard aesthetic (`bg-white rounded-2xl border border-slate-100/90 shadow-sm`).
- **Typography:** Inter/sans-serif with monospace styling (`font-mono tracking-widest`) for 6-digit passcodes.
- **Advisory Box:** Soft slate background (`bg-slate-50 border border-slate-200/80`) with small shield icon for high security compliance.

---

## 8. Confirm Karna Baaki (Gaps & Questions)
- **Direct Update vs Pending Re-verification:** Design me notice likha hai ki "You must verify the new email within 24 hours to finalize the change." Iska matlab backend par email turant update nahi hoti, balki state `PENDING_EMAIL_CHANGE` rehti hai jab tak user naye inbox me aaye link par click na kare. Confirmation chahiye ki kya user tab tak purane email se login kar sakta hai?
- **Session Termination Policy:** Email change finalize hone par kya current active sessions/devices ko force-logout kar dena chahiye security protocols ke tahat?
- **Fallback if Old Email Inaccessible:** Agar user ka purana email account compromised ya lost ho chuka ho aur unhone 2FA enable na kiya ho, to fallback customer support verification path kya hoga?
