# Page Blueprint: Fashion Store - Welcome Authentication Hub

---

## 1. Page Overview
- **Screen Name:** Fashion Store - Welcome Authentication Hub
- **Stitch Screen ID:** `1639db33c4494ca8921e3c5c043c0dbc`
- **Core Purpose:** Storefront ka central authentication gateway jo 3 interconnected tabbed views (`Login`, `Create Account / Register`, aur `Reset Password / Forgot Password`) provide karta hai, along with social login integrations (Google, Facebook) aur luxury brand editorial showcase panel.
- **Entry Point / Navigation Route:** Header profile icon click (`fa-regular fa-user`) jab user logged-in na ho, checkout flow guest redirect, ya direct `/login` / `/auth` route.
- **Shared Components Used:**
  - Header & Global Navigation: [navigation.md](../shared/navigation.md)
  - Footer: *Design me footer omit kiya gaya hai (focused modal / auth layout)*.

---

## 2. Layout aur Sections (Top to Bottom)

### Section 1: Global Navigation Header (Shared Component)
- **Reference:** Dekhein [navigation.md](../shared/navigation.md)
- **Short Purpose:** Persistent top utility bar with logo, category navigation, search input, and action icons.

### Section 2: Split Authentication Card (`MainAuthenticationCard`)
Container with elevated drop shadow (`main-modal-shadow`, `bg-white rounded-3xl max-w-5xl mx-auto overflow-hidden`):
- **Left Column (Flexible Form Panel):** Multi-State Authentication Form (`LeftFormColumn`)
- **Right Column (Editorial Visuals):** Brand Lifestyle Showcase (`RightShowcaseColumn`)

#### 2.1 View 1: Login Panel (`login-panel` - Default View)
- **Header Block:**
  - Headline: `Welcome` (`font-bold text-2xl text-gray-900`).
  - Subtitle: `Get started for a seamless shopping experience`.
- **Social Login Hub:**
  - Button 1: `Google` with colorful G icon (`w-full border border-gray-200 rounded-xl py-2.5`).
  - Button 2: `Facebook` with Facebook brand blue icon.
- **Separator:** Centered divider line with text `OR` in subtle gray.
- **Input Fields:**
  - Field 1: `Email` (text input, placeholder `name@example.com`).
  - Field 2: `Password` (password input with toggle eye icon `fa-regular fa-eye`).
- **Secondary Actions:**
  - Link: `Forgot password?` (triggers transition to `forgot-panel`).
- **Submit Action:**
  - Button: `Login` (full-width coral button `bg-[#eb6363] hover:bg-[#df5454] text-white font-semibold py-3 rounded-xl`).
- **Footer Switch Link:**
  - Text: `Don't have an account?` → Link: `Register` (triggers transition to `register-panel`).

#### 2.2 View 2: Register / Create Account Panel (`register-panel`)
- **Header Block:**
  - Headline: `Create Account` (`font-bold text-2xl text-gray-900`).
  - Subtitle: `Join BOS Unlimited for custom styling & perks`.
- **Social Login Hub:**
  - Quick signup with `Google` and `Facebook`.
- **Separator:** `OR` divider.
- **Input Fields:**
  - Field 1: `Full Name` (Text input).
  - Field 2: `Email` (Email input).
  - Field 3: `Password` (Password input with visibility toggle).
  - Field 4: `Confirm Password` (Password match input).
- **Submit Action:**
  - Button: `Create Account` (full-width coral button `bg-[#eb6363] text-white py-3 rounded-xl`).
- **Footer Switch Link:**
  - Text: `Already have an account?` → Link: `Login` (transitions back to `login-panel`).

#### 2.3 View 3: Forgot Password Panel (`forgot-panel`)
- **Header Block:**
  - Headline: `Reset Password` (`font-bold text-2xl text-gray-900`).
  - Instructions: `Enter your registered email address and we'll send you a link to reset your password.`
- **Input Fields:**
  - Field: `Email Address` (Email input).
- **Submit Action:**
  - Button: `Send Reset Link` (full-width coral button `bg-[#eb6363] text-white py-3 rounded-xl`).
- **Status Notification Banner:**
  - Banner: `Reset link sent! Please check your inbox.` (green alert notification on submission).
- **Footer Navigation:**
  - Link: `Back to Login` (transitions back to `login-panel`).

#### 2.4 Right Column: Brand Lifestyle Showcase (`RightShowcaseColumn`)
- **Surface Styling:** Warm tinted background (`sideBg: #f2f1ee`).
- **Elements:**
  - Category Badge: `Atelier Haute Couture` (`text-xs uppercase tracking-widest text-gray-500 font-semibold`).
  - Headline (`h2`): `Autumn / Winter Collection` (`font-serif text-3xl text-gray-900 font-bold`).
  - Editorial Description: `"Discover bespoke garments crafted with pristine tailoring and timeless elegance."`
  - High-Fashion Editorial Image: Styled portrait with layered card shadow (`preview-card-shadow`, `rounded-2xl`).

---

## 3. Options aur Sub-options
- **Authentication Modes:**
  - `Login` (Active default)
  - `Create Account`
  - `Reset Password`
- **Social Auth Providers:**
  - `Google` OAuth
  - `Facebook` OAuth
- **Password Visibility Control:**
  - Toggle between `password` and `text` input modes via eye icon.

---

## 4. Interactions aur Navigation
- `[Login / Register / Forgot Tab Switchers]` → Click → Smooth DOM panel crossfade (`form-panel` toggle between `login-panel`, `register-panel`, and `forgot-panel`)
- `[Password Eye Toggle]` → Click → Toggles password masking and eye icon (`fa-eye` vs `fa-eye-slash`)
- `[Google Button]` → Click → Triggers Google OAuth sign-in flow
- `[Facebook Button]` → Click → Triggers Facebook OAuth sign-in flow
- `[Login Submit Button]` → Click → Validates credentials, on success creates authenticated session and redirects to Home Page (`3775121018898025092`) or previous checkout route
- `[Create Account Submit Button]` → Click → Validates registration inputs, creates user record, logs user in
- `[Send Reset Link Button]` → Click → Dispatches password reset token to email, displays `Reset link sent! Please check your inbox.` success banner
- `[Back to Login Link]` → Click → Resets form and switches back to Login panel

---

## 5. Content aur Data Classification

| Element / Field | Data Type | Example Value Shown in Design | Notes & Source Confirmation |
| :--- | :--- | :--- | :--- |
| **Login Title** | Fixed Copy | `Welcome` | Primary form header |
| **Register Subtitle** | Marketing Copy | `Join BOS Unlimited for custom styling & perks` | Value proposition |
| **Social Providers** | OAuth Config | `Google`, `Facebook` | Third-party auth channels |
| **Full Name** | User Input | Form text field | Registration name input |
| **Email Address** | User Input | Form email field (`name@example.com`) | Account login identifier |
| **Password** | Sensitive User Input | Masked text string | User security password |
| **Editorial Heading** | Fixed Catalog Data | `Autumn / Winter Collection` | Showcase billboard title |
| **Editorial Brand** | Brand Label | `Atelier Haute Couture` | Luxury line tag |

---

## 6. States aur Variations
- **Form Active View States:**
  - State 1: `login-panel` visible (`display: block`).
  - State 2: `register-panel` visible (`display: block`).
  - State 3: `forgot-panel` visible (`display: block`).
- **Password Masking State:**
  - Masked (Default): Input type `password`, eye icon visible.
  - Unmasked: Input type `text`, eye-slash icon visible.
- **Reset Link Sent State:** Hidden banner reveals green confirmation text (`Reset link sent! Please check your inbox.`).
- **Validation Errors (Invalid email/password):** Design mein specified nahi (standard inline field error required).

---

## 7. Visual & Styling Notes
- **Color Accents:**
  - Primary Brand Coral: `#eb6363` (Submit CTA buttons)
  - Hover Coral: `#df5454`
  - Soft Card Background: `#f6f5f4`
  - Side Panel Background: `#f2f1ee`
  - High Elevation Shadows: `0 25px 70px -15px rgba(0, 0, 0, 0.07)`
- **Typography:** `Plus Jakarta Sans` for form inputs with `Playfair Display` serif font on the editorial right showcase.
- **Border Radius:** `rounded-3xl` for main split modal, `rounded-xl` for inputs and buttons.

---

## 8. Confirm Karna Baaki (Gaps & Questions)
1. **Modal Overlay vs Dedicated Route:** Design me yeh component standalone centered container me render hua hai. Kya production me yeh popup overlay modal banega ya dedicated `/login` page?
2. **Web3 Wallet Login:** Checkout pages me Crypto/Web3 payments supported hain. Kya Authentication Hub me bhi Web3 / Crypto Wallet sign-in option (e.g. Sign-in with Ethereum / Solana) add karna zaroori hai?
3. **Password Policy Constraints:** Registration form me minimum character length, uppercase, numbers ya special symbol requirements design me explicitly mentioned nahi hain.
