# Page Blueprint: Fashion Account - Dashboard / Overview

---

## 1. Page Overview
- **Screen Name:** Fashion Account - My Profile (Dashboard Overview)
- **Stitch Screen ID:** `2b3693b6b629426085c21723956f5ca8`
- **Core Purpose:** Authenticated customer ka central account hub. Yeh user profile banner (Cover, avatar, username, membership longevity), persistent account navigation sidebar (Settings, Payments, Security, Legal), 4 primary high-frequency shortcut tiles (`Orders`, `Wishlist`, `Coupons`, `Sell on Store`), aur personalized sponsored shopping campaign display karta hai.
- **Entry Point / Navigation Route:** Header user profile icon click (`fa-regular fa-user`) jab session active ho, ya direct `/account` / `/account/overview` route.
- **Shared Components Used:**
  - Header & Global Navigation: [navigation.md](../shared/navigation.md)
  - Footer & Brand Links: [footer.md](../shared/footer.md)

---

## 2. Layout aur Sections (Top to Bottom)

### Section 1: Global Navigation Header (Shared Component)
- **Reference:** Dekhein [navigation.md](../shared/navigation.md)
- **Short Purpose:** Persistent top utility header with search, categories, profile, cart, wishlist, and notification badges.

### Section 2: Account Split Layout (`MainContent`)
Split 2-column layout:
- **Left Column (4/12 grid span): Universal Account Navigation Sidebar (`LeftSidebar`)**
- **Right Column (8/12 grid span): Profile Hero, Quick Tiles & Sponsored Banner (`RightProfileContent`)**

#### 2.1 Left Column: Universal Account Navigation Sidebar (`LeftSidebar`)
- **User Mini Profile Summary Card:**
  - Avatar thumbnail with username: `Name`.
  - Date of Birth: `born 23 April 2001`.
- **Navigation Group 1: Account Settings (`Account Settings`):**
  - `Edit profile` → Links to `feature_extraction/pages/account-edit-profile.md` (`16457286814936185481`).
  - `Manage address` → Links to `feature_extraction/pages/account-manage-addresses.md` (`8849595718709894963`).
- **Navigation Group 2: Payments (`PAYMENTS`):**
  - `Gift Cards` → Links to `feature_extraction/pages/account-gift-cards.md` (`8229175514213974612`).
  - `Save UPI` → Links to `feature_extraction/pages/account-saved-upi.md` (`478003447444245128`).
  - `Save Card` → Links to `feature_extraction/pages/account-save-card.md` (`13504245064707494491`).
  - `Save Crypto address` → Links to `feature_extraction/pages/account-save-crypto-address.md` (`33113ac089c249d5ad68524479992600`).
- **Navigation Group 3: Security (`Security`):**
  - `Add Two-Factor Authentication` → Links to `feature_extraction/pages/account-two-factor-auth.md` (`4510180017937633370`).
  - `Change password` → Links to `feature_extraction/pages/account-change-password.md` (`10390789588986193197`).
  - `Change your Email` → Links to `feature_extraction/pages/account-change-email.md` (`628386866999325939`).
- **Navigation Group 4: Activity & Legal (`Help & Legal Links`):**
  - `Reviews` → Links to `feature_extraction/pages/account-reviews-ratings.md` (`4015455779403067258`).
  - `Questions & Answers` → FAQ & customer inquiries link.
  - `Terms and Conditions` → Links to `feature_extraction/pages/terms-and-conditions.md` (`9ac3f30d866a41f8a0bc026fa7491c70`).
  - `Privacy Policy` → Links to `feature_extraction/pages/privacy-policy.md` (`da4770fd174546408f8bb7cd22b3a8f6`).
- **Logout Action Card:**
  - `Logout` button (styled with signout icon and destructive red/neutral hover).

#### 2.2 Right Column: Dashboard Main Content (`RightProfileContent`)
- **Profile Header Billboard Card:**
  - Full-width landscape Cover Banner: Silhouette landscape photo with dark gradient overlay (`h-56 sm:h-64`).
  - Centered Floating Avatar: Circular high-resolution profile photo (`w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white shadow-md`).
  - User Identity Block:
    - Display Name (`h2`): `Name` (`text-xl font-bold text-slate-900`).
    - Handle: `@username` (`text-sm font-medium text-slate-700`).
    - Registration & DOB Meta: `born 23 April 2001 • Joined April 2001` (`text-xs text-slate-500`).
- **High-Frequency Quick Shortcut Tiles (2x2 Grid):**
  - Tile 1: `Orders` → Opens order purchase history and live tracking.
  - Tile 2: `Wishlist` → Opens saved products list.
  - Tile 3: `Coupons` → Opens available promo codes and vouchers.
  - Tile 4: `Sell on “Store name”` → Opens seller marketplace onboarding flow.
  - Styling: White cards (`bg-white border border-slate-200 rounded-xl py-4 hover:bg-slate-50 transition text-sm font-semibold text-slate-800 shadow-sm text-center`).
- **Sponsored Brand Billboard Card:**
  - Section Header: `Sponsored` (`text-sm font-bold text-slate-800`).
  - Split Visual Card (`bg-white rounded-2xl shadow-sm border border-slate-200/70 overflow-hidden`):
    - Left Half (5/12 span): Fashion model photo.
    - Right Half (7/12 span): Slate-blue promo banner (`bg-[#558298] text-white p-6`):
      - Sub-tag: `BRAND` (`text-[10px] tracking-widest uppercase font-semibold text-sky-200`).
      - Title (`h4`): `FASHION SALE` (`text-2xl sm:text-3xl font-extrabold uppercase`).
      - Offer Note: `Just For You`.
      - Discount Pill: `DISCOUNT UP TO 30% OFF` (`bg-white/20 text-white rounded-full text-[11px] font-semibold`).
      - Promo Description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.`
      - Action CTA: `SHOP NOW` (white solid button `bg-white text-slate-900 font-bold text-[11px] rounded-md px-4 py-1.5`).
  - Footer Action Bar:
    - Text: `View` with right arrow icon (`fa-solid fa-arrow-right` with slide transition).
- **Security Trust Seal:**
  - Label: `Protected by black rocks` with shield icon (`fa-solid fa-shield text-slate-400 text-[11px]`).

### Section 3: Global Site Footer (Shared Component)
- **Reference:** Dekhein [footer.md](../shared/footer.md)
- **Short Purpose:** Global multi-column footer with legal policies and Telegram community link.

---

## 3. Options aur Sub-options
- **Sidebar Navigation Hierarchy:**
  - `Account Settings`
    - `Edit profile`
    - `Manage address`
  - `PAYMENTS`
    - `Gift Cards`
    - `Save UPI`
    - `Save Card`
    - `Save Crypto address`
  - `Security`
    - `Add Two-Factor Authentication`
    - `Change password`
    - `Change your Email`
  - `Legal & Help`
    - `Reviews`
    - `Questions & Answers`
    - `Terms and Conditions`
    - `Privacy Policy`
  - `Logout`
- **Dashboard Action Cards:**
  - `Orders`
  - `Wishlist`
  - `Coupons`
  - `Sell on “Store name”`

---

## 4. Interactions aur Navigation
- `[Edit profile link in sidebar]` → Click → Navigates to Edit Profile page (`16457286814936185481`)
- `[Manage address link in sidebar]` → Click → Navigates to Manage Addresses page (`8849595718709894963`)
- `[Gift Cards link in sidebar]` → Click → Navigates to Gift Cards page (`8229175514213974612`)
- `[Save UPI link in sidebar]` → Click → Navigates to Saved UPI page (`478003447444245128`)
- `[Save Card link in sidebar]` → Click → Navigates to Saved Cards page (`13504245064707494491`)
- `[Save Crypto address link in sidebar]` → Click → Navigates to Save Crypto Address page (`33113ac089c249d5ad68524479992600`)
- `[Add Two-Factor Authentication link]` → Click → Navigates to 2FA Security page (`4510180017937633370`)
- `[Change password link]` → Click → Navigates to Change Password page (`10390789588986193197`)
- `[Change your Email link]` → Click → Navigates to Change Email page (`628386866999325939`)
- `[Reviews link in sidebar]` → Click → Navigates to My Reviews & Ratings page (`4015455779403067258`)
- `[Terms and Conditions link]` → Click → Navigates to Terms & Conditions page (`9ac3f30d866a41f8a0bc026fa7491c70`)
- `[Privacy Policy link]` → Click → Navigates to Privacy Policy page (`da4770fd174546408f8bb7cd22b3a8f6`)
- `[Logout Button]` → Click → Terminates session, clears tokens, redirects to Home / Auth Hub
- `[Orders Shortcut Tile]` → Click → Navigates to My Orders page (`e3e45c6ce88f4cafa63af67d7cc171b6`)
- `[Wishlist Shortcut Tile]` → Click → Navigates to Wishlist page (`ce90bd7999304498b3fe74d1e925775f`)
- `[Coupons Shortcut Tile]` → Click → Navigates to My Coupons & Vouchers page (`6314097128468934536`)
- `[Sell on “Store name” Tile]` → Click → Seller registration onboarding portal khulna confirm karna baaki
- `[SHOP NOW on Sponsored Banner]` → Click → Navigates to featured sponsored category PLP
- `[View Link on Sponsored Card]` → Click → Navigates to promotional campaign details page

---

## 5. Content aur Data Classification

| Element / Field | Data Type | Example Value Shown in Design | Notes & Source Confirmation |
| :--- | :--- | :--- | :--- |
| **User Full Name** | Dynamic User Data | `Name` | Account profile full name |
| **Username Handle** | Dynamic User Data | `@username` | Unique account handle |
| **Date of Birth** | Dynamic User Data | `23 April 2001` | User birthday string |
| **Member Since** | Dynamic System Data | `Joined April 2001` | Account creation date |
| **Cover Image URL** | User / Default Media | Cloud image URL | Profile header image |
| **Avatar Photo URL**| User Media | Cloud avatar URL | User headshot |
| **Sponsored Brand** | Merchandising Data | `BRAND` | Ad campaign sponsor |
| **Sponsored Campaign**| Merchandising Copy | `FASHION SALE - Just For You` | Promo banner headline |
| **Discount Offer** | Merchandising Copy | `DISCOUNT UP TO 30% OFF` | Campaign incentive pill |

---

## 6. States aur Variations
- **Active Navigation State:** Selected sidebar menu item highlighted with distinct background tint; inactive items show neutral text.
- **Avatar Missing State:** Design shows image headshot; fallback should render user initials (`N`).
- **Cover Image State:** Full banner rendered; fallback neutral dark slate gradient if cover not uploaded.
- **Seller Account State:** User agar already seller ho toh `Sell on “Store name”` tile kya `Seller Dashboard` me convert hoti hai: Design mein specified nahi.

---

## 7. Visual & Styling Notes
- **Color Accents:**
  - Soft Page Background: `#FAF4F4`
  - Card Surfaces: Pure white `#ffffff` with subtle borders (`border-slate-200/70`)
  - Banner Accent: Slate-Blue `#558298` with sky-blue text highlights
  - Typography Color: Deep Slate `#0f172a` and `#334155`
- **Typography:** `Plus Jakarta Sans` for clean, professional layout.
- **Border Radius:** `rounded-2xl` for large cards, `rounded-xl` for shortcut tiles, `rounded-full` for avatar.

---

## 8. Confirm Karna Baaki (Gaps & Questions)
1. **Seller Marketplace Onboarding Flow:** `Sell on “Store name”` button par click karne se kya external merchant dashboard khulta hai ya internal multi-vendor registration form?
2. **Account Deactivation / Delete:** Sidebar me `Logout` action hai, lekin GDPR compliant "Delete Account" ya "Deactivate Account" option missing hai.
3. **Cover Photo Upload Control:** Overview screen me cover banner par edit icon missing hai (jabki `account-edit-profile` me `Edit Cover` button maujood hai).
