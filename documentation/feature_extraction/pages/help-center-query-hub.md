# Screen Documentation: Help Center & Query Hub

## 1. Page Overview
- **Screen Name:** Help Center & Query Hub
- **Stitch Screen ID:** `a7e8450a14ba4af5a9eaad7e6104f5a2`
- **File Source ID:** `12586423644956154728`
- **Core Purpose:** E-commerce store ka centralized self-service customer care, ticket dispute tracking, aur concierge support hub. Users apne recent orders ke specific items par returns, exchanges, refunds ya delivery issues ke tickets raise kar sakte hain, non-order related policies (account, payments, store credit) browse kar sakte hain, open ticket statuses track kar sakte hain, size guides dekh sakte hain, aur 24/7 live concierge se direct jud sakte hain.
- **Route:** `/help-center` ya `/support`
- **Shared Components:**
  - Header: [`feature_extraction/shared/navigation.md`](../shared/navigation.md)
  - Footer: [`feature_extraction/shared/footer.md`](../shared/footer.md)

---

## 2. Layout aur Sections (Top to Bottom Visual Order)

### 2.1. Global Navigation Bar (Header)
- Full standard global header (Logo, Global Search bar with live shortcuts, Currencies/Language selectors, Wishlist badge, Cart popover, Profile avatar menu).
- Refer to [`shared/navigation.md`](../shared/navigation.md).

### 2.2. Top Header & Quick Action Banner
- Container: `border-b border-neutral-border bg-white px-4 py-8 sm:px-6 lg:px-8`
- **Left Branding:**
  - Eyebrow / Supertitle: `HELP CENTER` (text-xs font-bold text-neutral-muted tracking-wider uppercase).
  - Main Heading: `We are here to help you` (text-2xl sm:text-3xl font-extrabold text-neutral-heading).
  - Highlighted Action Tags: `TRACK, CANCEL, RETURN/EXCHANGE` (text-brand-teal `#14CDA8` font-bold text-xs sm:text-sm).
- **Right Quick Action Card:**
  - Floating card (`bg-neutral-surface border border-neutral-border rounded-xl p-4 flex items-center justify-between gap-4`).
  - Label: `Manage your purchases` with shopping bag icon.
  - Action Button: `ORDERS` (Black button, uppercase font-bold, links to `/account/orders`).

### 2.3. Two-Column Support Hub Architecture
Responsive layout: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8`.
- **Left Column (4 cols / `lg:col-span-4`):** Query Type Navigation Sidebar.
- **Right Column (8 cols / `lg:col-span-8`):** Dynamic Query Workspaces (Panels 1 through 6).

---

### 2.4. Left Sidebar: Query Type Navigation
- Header: `SELECT QUERY TYPE` (text-xs font-bold uppercase text-neutral-muted tracking-wider).
- **Primary Nav Links (Segmented Navigation):**
  1. `Order Related Issues` (Icon: `package_2`, default active state with teal highlight).
  2. `Non-order Related Issues` (Icon: `help_outline`).
  3. `Recent Issues` (Icon: `history`, badge counter for open tickets).
  4. `Frequently Asked Questions` (Icon: `quiz`).
  5. `Size Guide` (Icon: `straighten`).
  6. `Contact Us` (Icon: `headset_mic`).
- **Sidebar Footer Callout:**
  - Traditional Mail Support: `"Want to reach us old style? Here is our postal address..."` with headquarter address snippet.

---

### 2.5. Right Content Area: Dynamic Panels

#### Panel 1: Order-Related Issues (Default Active View)
- Section Title: `Select the item we can help you with`
- Subtitle: `Select a recent shipment to begin your inquiry or dispute`
- **Shipment Status Filter Tabs:**
  - `Delivered (30d)` (Active pill, dark background)
  - `In-Transit`
  - `Returned`
- **Orders List with Item-Level Disputes:**
  - **Order 1: `#ORD-8921` (Multi-item order with collapsible accordion):**
    - Status Badge: `Delivered on Oct 24, 2024` · `2 Items Total` · `Tracking ID: TRK-9921048` · `Apple Pay ($128.00)`.
    - Accordion Toggle: `View 2 Items` (`expand_more`).
    - **Item 1:** *Oversized Linen Vacation Shirt* (SKU: LIN-8921, Size: M, Qty: 1, Sage Green, $72.00) — Badge: `Eligible for Return` — Action: `Add Query` (pen icon).
    - **Item 2:** *Organic Ribbed Cotton Tank* (SKU: COT-4412, Size: M, Qty: 1, Off-White, $56.00) — Badge: `Eligible for Return` — Action: `Add Query`.
  - **Order 2: `#ORD-8904` (Single-item order):**
    - Status: `Delivered on Oct 19, 2024` · `1 Item` · `Tracking ID: TRK-8812904` · `Credit Card ($120.00)`.
    - **Item:** *Tailored Pleated Trousers* (SKU: TRS-8904, Size: 32, Charcoal, $120.00) — Badge: `Eligible for Return` — Action: `Add Query`.
  - **Order 3: `#ORD-8730` (Expired return window):**
    - Status: `Delivered on Sep 25, 2024` · `1 Item` · `Tracking ID: TRK-7654110` · `PayPal ($145.00)`.
    - **Item:** *Oversized Silk Blend Shirt* (SKU: SLK-8730, Size: L, Ivory, $145.00) — Badge: `Return Period Closed` (Muted gray) — Action: `Add Query` (general inquiries only).
- **Common Order Assistance Topics (Quick Prompts):**
  - `"I want to track my order"`
  - `"I want to return or exchange"`
  - `"I have not received my invoice"`
  - `"Delivery was delayed"`
- **Customized Escalation Callout:**
  - Copy: `"Still need customized support? Our support specialists are available 24/7 to help resolve your inquiry"`
  - Actions: `Submit Ticket` button + `Live Chat` button.

---

#### Panel 2: Non-Order Related Issues
- **Sub-Category Top Navigation Strip:**
  1. `Account` (Active tab)
  2. `Returns & Exchanges`
  3. `Store Credit & Insider`
  4. `Offers`
  5. `Payments`
  6. `Cancellations & Charges`
- **Category Content View (e.g. Account):**
  - Header: Icon + Category title + context explanation.
  - Action Triggers: `Add Query` (plus icon button), `Contact Us` (headset button).
  - **Frequently Asked Inquiries Accordion:**
    - *"How do I login to my account?"*
    - *"I am not able to login to my account."*
    - *"How do I change my registered email or mobile number?"*
    - *"What happens if my 2FA authentication app is lost?"*

---

#### Panel 3: Recent Inquiries & Tickets
- Header: `Recent Inquiries & Tickets` (`3 Active / Past`)
- Subtitle: `Check live status, resolution milestones, and communicate with support`
- Header Controls:
  - Date Filter: `Last 30 Days` dropdown.
  - Primary Action: `Raise New Query` button.
- Status Filter Tabs:
  - `All Queries (3)`
  - `In Progress (1)`
  - `Resolved (2)`
- Ticket List Cards:
  1. **Ticket #TCK-4819:** *Size / Fit Exchange - Oversized Linen Vacation Shirt* (Status: `In Progress`, Step 2 of 3: Courier Pickup Scheduled).
  2. **Ticket #TCK-4602:** *Store Credit & Cashback - Welcome Bonus Missing* (Status: `Resolved`, Solution: $25 logo cash credited).
  3. **Ticket #TCK-4190:** *Delivery Address Correction - Order #ORD-8650* (Status: `Resolved`, Delivered to updated address).

---

#### Panel 4: Frequently Asked Questions (FAQ)
- Expandable accordions categorized into:
  - Discreet Shipping & Packaging Guarantees
  - Payment Options (Fiat INR/USD, UPI, Crypto USDT/BTC/ETH)
  - International Customs & Duty-Free Dispatches
  - Warranty, Sanitization & Hygienic Seal Policies

---

#### Panel 5: Size & Fit Guide
- Header: `Size & Fit Guide`
- Section: `Women's Apparel Conversion`
- Measurement Charts:
  - Bust / Chest measurement techniques
  - Natural Waist measuring points
  - Hips & Inseam measuring instructions
- International Size Conversion Table (US, UK, EU, IT, JP).

---

#### Panel 6: Contact Customer Concierge
- Header: `Contact Customer Concierge`
- **Omni-Channel Contact Channels (4 Cards):**
  1. `24/7 Live Concierge`: Instant web chat with specialist support.
  2. `Email Concierge`: Dedicated mailbox (`concierge@fashionstore.com`), guaranteed < 4hr SLA.
  3. `VIP Phone Line`: Toll-free priority line for VIP tier members.
  4. `WhatsApp Concierge`: Direct messaging for quick shipment queries & tracking links.
- **Priority Callback & Inquiry Request Form:**
  - Fields: Full Name, Email, Phone Number, Inquiry Type dropdown, Preferred Callback Time window, Message description.
  - Submit Button: `Request Callback`.
- **Operating Disclosures:**
  - Concierge Working Hours (24/7 Digital, Phone Desk 8:00 AM – 10:00 PM IST).
  - Privacy & Discretion Commitment: Zero mention of intimate merchandise on billing or external communication channels.

---

### 2.6. Dialogs & Modals

1. **Raise Query for Item Modal (`#modal-raise-query`):**
   - Header: `Raise Query for Item` with product thumbnail, order ID `#ORD-8921`, and close (`X`) icon.
   - Issue Category Dropdown: `Size/Fit issue`, `Damaged on arrival`, `Wrong item delivered`, `Quality issue`, `Other`.
   - Resolution Desired Radio Buttons: `Exchange for different size/color`, `Return for Store Credit (+5% bonus)`, `Refund to original payment method`.
   - Textarea: Description of issue.
   - File Upload: Image attachment dropzone (max 3 files, photos of tag/defect).
   - Buttons: `Cancel`, `Submit Query`.

2. **Inquiry Submitted Successfully Confirmation:**
   - Animated checkmark modal with generated Ticket ID (e.g. `Ticket #TCK-5102`), expected resolution SLA (24-48 hours), and `View Ticket Status` action.

### 2.7. Global Footer
- Full standard global footer with newsletter, multi-column directory, and discreet shipping certifications.
- Refer to [`shared/footer.md`](../shared/footer.md).

---

## 3. Options aur Sub-options

| Element | Type | Options / Formats | Description |
| :--- | :--- | :--- | :--- |
| **Query Type Sidebar** | Tab Navigation | 1. Order Related<br>2. Non-order Related<br>3. Recent Issues<br>4. FAQ<br>5. Size Guide<br>6. Contact Us | Right content pane me load hone wale workspace view ko switch karta hai. |
| **Shipment Filters** | Filter Tabs | `Delivered (30d)`, `In-Transit`, `Returned` | User ke orders list ko delivery stage ke according filter karta hai. |
| **Item Query Desired Resolution** | Radio Group | • Exchange Size/Color<br>• Store Credit (+5% bonus)<br>• Refund to Original Payment | Item dispute raise karte waqt user apni preferred remedy choose karta hai. |
| **Ticket Status Filter** | Filter Tabs | `All Queries (3)`, `In Progress (1)`, `Resolved (2)` | Open tickets list ko status ke anusaar filter karta hai. |
| **Contact Channels** | Action Cards | Live Chat, Email, VIP Phone, WhatsApp | Preferred support medium launch karne ke direct triggers. |

---

## 4. Interactions aur Navigation Flow

| Element / Trigger | Action | Target / Result |
| :--- | :--- | :--- |
| Click Sidebar Nav Link | User selects `Recent Issues` | Panel 3 (`Recent Inquiries & Tickets`) active ho jata hai; URL hash `/help-center#tickets` update hota hai. |
| Order Accordion Click | User clicks `View 2 Items` | Order card smoothly expand hota hai aur order ke sabhi product line-items display hote hain. |
| Click `Add Query` on Product Item | User clicks button on Linen Shirt | `#modal-raise-query` popup khulta hai, jisme Linen Shirt ka context (name, size, price, order #) pre-filled hota hai. |
| Submit Item Query Modal | User submits form | Backend ticket create hota hai (`POST /api/support/tickets`), modal dismiss hota hai aur `Inquiry Submitted Successfully` dialog show hota hai. |
| Click `Live Chat` Button | User clicks Concierge Live Chat | Bottom-right live support chat widget flyout open hota hai with customer profile authenticated. |
| Non-Order Tab Click | User clicks `Payments` tab | Non-order FAQ list update hokar UPI, Cards, aur Crypto payments policies display karta hai. |
| Click `ORDERS` Quick Button | User clicks header card | Seedha Account Orders page [`feature_extraction/pages/account-my-orders.md`](./account-my-orders.md) par navigate hota hai. |

---

## 5. Content aur Data Classification Table

| Field / Content Key | Content Type | Static / Dynamic | Data Source / Mapping |
| :--- | :--- | :--- | :--- |
| **Active Orders List** | Order Hierarchy List | Dynamic | `orders.fetchRecent({ limit: 10, days: 30 })` |
| **Item Eligibility Status** | Policy Calculation | Dynamic | `item.deliveredDate + returnWindowDays > now()` (`Eligible for Return` vs `Return Period Closed`) |
| **User Support Tickets** | Ticket Entity List | Dynamic | `support.getTickets({ userId })` |
| **Ticket Status Milestones** | Progress Stage | Dynamic | `ticket.status` (`OPEN`, `IN_PROGRESS`, `RESOLVED`, `CLOSED`) |
| **Category FAQs** | Content Articles | Static / CMS | Help Center Knowledge Base CMS |
| **Size Guide Specifications** | Measurement Tables | Static / CMS | Product Sizing Matrix API |
| **Concierge Contact Channels** | Contact Endpoints | Static / Dynamic | Customer Support Configuration Service |

---

## 6. States aur Variations

### 6.1. Return Eligibility Window State
- **Eligible (< 30 days):**
  - Green tag: `Eligible for Return`.
  - `Add Query` button fully enabled for automatic returns/exchanges.
- **Closed (> 30 days):**
  - Gray tag: `Return Period Closed`.
  - `Add Query` button opens general inquiry / repair / dispute modal instead of automated return label generator.

### 6.2. Ticket Resolution States
- **In Progress:** Yellow/Amber status indicator + progress stepper (e.g., Ticket Received → Inspection → Exchange Dispatched).
- **Resolved:** Emerald checkmark + resolution summary + action to re-open if unsatisfied within 7 days.

### 6.3. Guest vs Authenticated User View
- **Logged In:** Displays personalized order history, recent tickets, and 1-click query generation.
- **Guest / Logged Out:** Displays Order Number + Email lookup input box before showing order-related inquiry workflows.

---

## 7. Visual & Styling Notes
- **Typography:** Clean sans-serif (`Assistant`, system UI font fallback) with high contrast neutral headings (`#282c3f`).
- **Brand Colors:** Distinctive Teal (`#14CDA8`, `brand-teal-light #e8faf5`) for active tabs, action buttons, and success tags.
- **Layout Rhythm:** Dense, information-rich card layouts with subtle borders (`border-neutral-border #eaeaec`) and soft surface grays (`#f5f5f6`).

---

## 8. Confirm Karna Baaki (Gaps & Questions)
- **Live Chat Provider Integration:** Concierge live chat widget kya Zendesk, Intercom, Freshchat, ya in-house WebSocket engine par chalega?
- **Automated Return Label Generation:** Jab user "Exchange/Return" query submit karta hai, to kya system automated prepaid shipping label (BlueDart/Delhivery/DHL PDF) turant issue karta hai ya pehle customer executive manual approve karta hai?
- **Discreet Packaging Queries:** Intimate wellness store hone ke karan kya helpdesk par packaging discretion se related standard FAQs (e.g. "What will the courier label say?", "Will the delivery agent know what is inside?") ko permanent prominent spot milna chahiye?
