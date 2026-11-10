# Screen Documentation: Fashion Store - Notifications

## 1. Page Overview
- **Screen Name:** Fashion Store - Notifications
- **Stitch Screen ID:** `2ac6eedf6f1a4bb59f14b995b43fc469`
- **File Source ID:** `2ac6eedf6f1a4bb59f14b995b43fc469`
- **Core Purpose:** User ko unke account se jude sabhi updates, milestones aur promotions ka comprehensive activity hub pradan karna. Isme order delivery tracking, private VIP vault drops, price drop alerts, wallet credits aur security events shamil hain, sath hi notification channels aur discreet shipping communication preferences manage karne ki suvidha bhi hai.
- **Route:** `/notifications` ya `/account/notifications`
- **Shared Components:**
  - Header: [`feature_extraction/shared/navigation.md`](../shared/navigation.md)
  - Footer: [`feature_extraction/shared/footer.md`](../shared/footer.md)

---

## 2. Layout aur Sections (Top to Bottom Visual Order)

### 2.1. Global Navigation Bar (Header)
- Full standard global header (Logo, Global Search bar with live shortcuts, Currencies/Language selectors, Wishlist badge, Cart popover, Profile avatar menu).
- Refer to [`shared/navigation.md`](../shared/navigation.md).

### 2.2. Page Body Container
- **Layout Grid:** Responsive 12-column layout (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8`).
- **Left/Main Feed Column (8 cols / `lg:col-span-8`):** Header, Category Filter Tabs, Timeline Groups (Today, Yesterday, Earlier This Week).
- **Right Sidebar Column (4 cols / `lg:col-span-4`):** Channel Preferences Manager, Discreet Delivery Guarantee card, Concierge Helpdesk card.

### 2.3. Main Notifications Feed (8 cols)
1. **Header & Quick Actions:**
   - Eyebrow: `Activity & Preferences` (text-[11px] font-semibold text-gray-400 uppercase tracking-wider).
   - Heading: `Notifications & Updates` (h1, text-2xl font-bold text-gray-900).
   - Description: `Stay informed about order milestones, flash curations, security events, and member-exclusive private showroom drops.`
   - Header Controls:
     - `Mark All as Read` (Button with double-check icon, text-xs font-semibold text-gray-700 hover:text-black).
     - `Settings` (Button with gear icon, triggers quick navigation or channel scroll).

2. **Category Filter Tabs:**
   - Horizontal scrollable filter pill bar:
     1. `All Notifications (8)` — Active/Selected state (`bg-black text-white font-semibold rounded-full px-4 py-1.5`).
     2. `Orders & Delivery (3)` — Inactive state (`bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full px-4 py-1.5`).
     3. `Promos & Offers (2)`
     4. `Security & Account (2)`
     5. `System Updates (1)`

3. **Timeline Group: Today (2 unread):**
   - Group Header: `Today` (h2, text-sm font-bold text-gray-900) + Badge: `2 unread` (Coral pill `bg-red-50 text-[#FF3F6C]`).
   - **Notification Card 1: Order Out for Delivery (Unread):**
     - Left Icon: Shipping box icon in teal circle (`bg-[#14CDA8]/10 text-[#14CDA8]`).
     - Title: `Order Out for Delivery` (h3, text-xs font-bold).
     - Unread Dot: Coral pink dot (`w-2 h-2 rounded-full bg-[#FF3F6C]`).
     - Category Tag: `DELIVERY` (uppercase, emerald badge).
     - Timestamp: `25m ago`.
     - Description: `"Your order #ORD-8921 (Oversized Linen Shirt & Pants) is out for delivery today with discreet courier dispatch."`
     - Action Buttons: `Track Package` (bordered white button), `View Order` (text link button).
     - Card Border: Pink border highlight (`border-[#FF3F6C]/40`).
   - **Notification Card 2: Private Vault Access Open (Unread):**
     - Left Icon: Sparkles / Star icon in red circle (`bg-red-50 text-[#FF3F6C]`).
     - Title: `Private Vault Access Open` (h3, text-xs font-bold).
     - Unread Dot: Coral pink dot (`w-2 h-2 rounded-full bg-[#FF3F6C]`).
     - Category Tag: `EXCLUSIVE` (uppercase, coral pink badge).
     - Timestamp: `3h ago`.
     - Description: `"Private Vault Access: Atelier Winter 2025 Silk Capsule is now live for VIP members with limited allocation quantities."`
     - Action Button: `Shop Collection` (bordered white button).
     - Card Border: Pink border highlight (`border-[#FF3F6C]/40`).

4. **Timeline Group: Yesterday (2 updates):**
   - Group Header: `Yesterday` (h2, text-sm font-bold) + Badge: `2 updates` (slate badge).
   - **Notification Card 3: Two-Factor Authentication Confirmed (Read):**
     - Left Icon: Shield icon in blue circle (`bg-blue-50 text-blue-600`).
     - Title: `Two-Factor Authentication Confirmed` (h3).
     - Category Tag: `SECURITY` (blue badge).
     - Timestamp: `Yesterday, 4:15 PM`.
     - Description: `"Two-Factor Authentication was enabled from a new desktop session (Chrome on macOS, San Francisco, USA)."`
     - Action Button: `Review Security` (bordered white button).
     - Card Border: Standard neutral (`border-gray-200`).
   - **Notification Card 4: Wishlist Price Drop Alert (Read):**
     - Left Icon: Tag / Percent icon in purple circle (`bg-purple-50 text-purple-600`).
     - Title: `Wishlist Price Drop Alert` (h3).
     - Category Tag: `PRICE DROP` (purple badge).
     - Timestamp: `Yesterday, 11:30 AM`.
     - Description: `"An item saved in your Wishlist (Tailored Pleated Trousers) has dropped in price by 15% OFF."`
     - Action Buttons: `Move to Cart` (bordered white button), `View Item` (text link).

5. **Timeline Group: Earlier This Week (2 updates):**
   - Group Header: `Earlier This Week` + Badge: `2 updates`.
   - **Notification Card 5: Logo Cash Credited (Read):**
     - Left Icon: Wallet / Coins icon in amber circle (`bg-amber-50 text-amber-600`).
     - Title: `Logo Cash Credited` (h3).
     - Category Tag: `WALLET` (amber badge).
     - Timestamp: `3 days ago`.
     - Description: `"Logo Cash Credited: +$25.00 promotional shopping credit added to your account for crypto payments anniversary."`
     - Action Button: `Check Balance` (bordered white button).
   - **Notification Card 6: Delivered: Order #ORD-8730 (Read):**
     - Left Icon: Checkmark circle icon in gray circle (`bg-gray-100 text-gray-600`).
     - Title: `Delivered: Order #ORD-8730` (h3).
     - Category Tag: `COMPLETED` (gray badge).
     - Timestamp: `4 days ago`.
     - Description: `"Order #ORD-8730 was safely delivered to your designated address in Delhi. Thank you for shopping with us."`
     - Action Buttons: `Write a Review` (bordered white button), `Download Invoice` (text link).

### 2.4. Right Column: Preferences & Support Sidebar (4 cols)
1. **Channel Preferences Card:**
   - Container: `bg-white rounded-xl p-5 border border-gray-200 shadow-sm space-y-4`.
   - Header: `CHANNEL PREFERENCES` (text-xs font-bold uppercase tracking-wide) + Status: `4 active`.
   - Toggles / Checkboxes:
     1. `Order Milestones & Tracking`: Subtitle `"Real-time status of dispatch and delivery"` (Checkbox checked, Teal active color `#14CDA8`).
     2. `SMS / WhatsApp Alerts`: Subtitle `"Discreet courier pin & OTP codes"` (Checkbox checked, Teal active color `#14CDA8`).
     3. `Private Drops & Curations`: Subtitle `"VIP runway releases and vault sales"` (Checkbox checked, Teal active color `#14CDA8`).
     4. `Account & Security Alerts`: Subtitle `"Login notices, password updates"` (Checkbox checked, **Disabled / Locked** with `cursor-not-allowed` — mandatory security compliance).
   - Action: `Save Channel Settings` button (`w-full text-center text-xs font-bold border border-gray-200 rounded-lg py-1.5 hover:border-gray-400`).

2. **Discreet Delivery Guarantee Card:**
   - Container: `bg-white rounded-xl p-4 border border-gray-200 shadow-sm space-y-2 text-xs`.
   - Header: Shield check icon in teal bubble + `Discreet Delivery Guarantee` (font-bold text-gray-900).
   - Policy Text: `"SMS and shipping notifications will never display product descriptions or intimate apparel tags on shipping notes."`

3. **Concierge Desk Support Card:**
   - Container: `bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-2 text-xs`.
   - Text: `"Need assistance with notifications? Contact our 24/7 dedicated concierge desk anytime."`
   - Link: `Visit Help Center →` (text-xs font-semibold text-[#14CDA8] hover:underline).

### 2.5. Global Footer
- Full standard global footer with newsletter, multi-column directory, customer service, and payment badges.
- Refer to [`shared/footer.md`](../shared/footer.md).

---

## 3. Options aur Sub-options

| Element | Type | Options / Values | Description |
| :--- | :--- | :--- | :--- |
| **Category Tabs** | Filter Navigation | 1. `All Notifications (8)`<br>2. `Orders & Delivery (3)`<br>3. `Promos & Offers (2)`<br>4. `Security & Account (2)`<br>5. `System Updates (1)` | Main feed me displayed notifications ko category ke hisaab se filter karta hai. |
| **Mark All as Read** | Global Action | Click to trigger | Sabhi unread notifications ko read mark karta hai, unread counter zero karta hai. |
| **Notification Card Actions** | Contextual Action Buttons | • `Track Package`<br>• `View Order`<br>• `Shop Collection`<br>• `Review Security`<br>• `Move to Cart`<br>• `Check Balance`<br>• `Write a Review`<br>• `Download Invoice` | Notification type ke specific relevant target page par navigate karta hai. |
| **Channel Preference Toggles** | Form Checkbox Controls | • Order Milestones (Toggle)<br>• SMS / WhatsApp Alerts (Toggle)<br>• Private Drops (Toggle)<br>• Account & Security (Locked ON) | User kin mediums par notifications chahta hai use customize karne ki suvidha. |
| **Save Channel Settings** | Form Submit Button | Normal, Saving, Saved | Modified channel preferences ko account profile me save karta hai. |

---

## 4. Interactions aur Navigation Flow

| Element / Trigger | Action | Target / Result |
| :--- | :--- | :--- |
| Category Tab Click | User clicks a category (e.g. `Orders & Delivery`) | Feed filtered ho jata hai, sirf relevant category ke cards dikhte hain. Tab active style leta hai. |
| `Mark All as Read` Click | User clicks header button | Sabhi unread dots (`#FF3F6C`) aur pink card borders clear ho jate hain; unread counters hide ho jate hain. |
| `Track Package` Click | User clicks on out-for-delivery card | Order tracking modal ya `/orders/:id/tracking` page khulta hai real-time courier status ke sath. |
| `Shop Collection` Click | User clicks exclusive drop card | Private collection page `/collections/atelier-winter-2025` par navigate hota hai. |
| `Review Security` Click | User clicks 2FA confirmation card | Account Security hub `/account/security` par redirect hota hai active sessions dekhne ke liye. |
| `Move to Cart` Click | User clicks price drop card | Wishlist item seedha Shopping Cart me add ho jata hai aur cart flyout open hota hai. |
| Toggle Channel Checkbox | User unchecks Private Drops & clicks Save | Preferences API call hoti hai (`PATCH /api/user/notification-preferences`) aur success toast show hota hai. |
| `Visit Help Center →` Click | User clicks support link | Help Center query hub [`feature_extraction/pages/help-center-query-hub.md`](./help-center-query-hub.md) par navigate hota hai. |

---

## 5. Content aur Data Classification Table

| Field / Content Key | Content Type | Static / Dynamic | Data Source / Mapping |
| :--- | :--- | :--- | :--- |
| **Notification Counters** | Numeric Badges | Dynamic | Aggregation query (`unreadCount`, `categoryCounts`) |
| **Notification ID & Timestamp** | Metadata | Dynamic | `notification.id`, `notification.createdAt` (Relative: "25m ago", "Yesterday") |
| **Notification Title & Copy** | Rich Text | Dynamic | `notification.title`, `notification.message` |
| **Category Tag & Color Scheme** | Enumeration Badge | Dynamic | `notification.category` (`DELIVERY`, `EXCLUSIVE`, `SECURITY`, `PRICE_DROP`, `WALLET`, `COMPLETED`) |
| **Unread Status** | Boolean Flag | Dynamic | `notification.isRead` (`false` = coral dot + pink border) |
| **Action Deep-links** | Link / Callback | Dynamic | `notification.actionUrl`, `notification.actionType` |
| **Channel Preferences** | User Settings Map | Dynamic | `user.preferences.notifications` (`orderTracking`, `smsWhatsapp`, `marketingDrops`, `securityAlerts: true [readonly]`) |
| **Discreet Guarantee Copy** | Privacy Notice | Static | Brand compliance policy string |

---

## 6. States aur Variations

### 6.1. Notification Card States
- **Unread State:**
  - Border: Soft coral pink outline (`border-[#FF3F6C]/40`).
  - Indicator: Visible solid pink dot (`bg-[#FF3F6C]`) next to title.
- **Read State:**
  - Border: Neutral slate border (`border-gray-200`).
  - Indicator: Pink dot removed.

### 6.2. Empty State
- Agar kisi category filter me koi notification na ho (e.g., zero system updates):
  - Card feed me empty state graphic display hota hai: Bell icon + *"No notifications in this category yet"*.

### 6.3. Mandatory Security Setting State
- `Account & Security Alerts` toggle permanently checked aur disabled hota hai (`disabled="" cursor-not-allowed`) taaki compliance aur user security reasons se login/password notices kabhi miss na hon.

---

## 7. Visual & Styling Notes
- **Badge Color Palette:**
  - Delivery: Emerald green (`#14CDA8` on `#14CDA8]/10`).
  - Exclusive / Unread: Coral pink (`#FF3F6C` on `red-50`).
  - Security: Deep blue (`text-blue-600` on `bg-blue-50`).
  - Price Drop: Royal purple (`text-purple-600` on `bg-purple-50`).
  - Wallet: Warm amber (`text-amber-600` on `bg-amber-50`).
- **Sidebar Integration:** Unlike other account sub-pages that use the standard 5-card account sidebar, this screen uses a specialized 2-column productivity layout where the right 4 columns contain direct channel controls and discreet privacy assurances.

---

## 8. Confirm Karna Baaki (Gaps & Questions)
- **Push Notification Integration:** Kya browser web push notifications (Service Worker WebPush API) ke liye bhi sidebar me opt-in permission prompt hona chahiye?
- **Retention Period:** Kya puraani notifications kitne dino baad auto-archive ya delete hoti hain (e.g. 30 days, 60 days, ya 90 days)?
- **Bulk Delete / Clear:** Kya user ke paas purani notifications ko delete/clear karne ka option hona chahiye ya notifications hamesha immutable audit trail ke roop me rehti hain?
