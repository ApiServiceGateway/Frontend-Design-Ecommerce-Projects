---
title: Detailed Feature Specifications
phase: Phase 2 - Features
document_id: 02_Feature_Specifications
last_updated: 2026-10-27
status: Confirmed
summary: Granular functional specifications for each critical feature of the adult wellness e-commerce marketplace, incorporating interview decisions, flows, rules, edge cases, and acceptance criteria.
---

# 📝 Feature Specifications: Discreet Adult Wellness & Intimate Care Platform (Aura Retail & Lifestyle)

> **Purpose:** Provide complete, step-by-step specifications for every important feature. Developers and AI will write code directly against these specifications.

---

## 🛠️ Live Feature Specifications

---

### Feature 1: 18+ Age Verification Gate & Discreet Camouflage Mode (Panic Button)

- **User Role:** All Visitors & Customers
- **User Goal:** Verify adult legal age to browse compliant wellness products, and have immediate client-side camouflage protection if privacy is compromised.
- **Priority & Status:** First Version | Confirmed

#### 1. Available User Actions
- Click **"I am 18 or Older (Enter)"** on the age gate modal.
- Click **"I am Under 18 (Exit)"** on the age gate modal.
- Click the floating **"Quick Exit / Panic Button"** (fixed in the header/bottom bar on mobile/desktop).
- Click **"Back to Store"** or **"Close Decoy"** while in Camouflage Mode.

#### 2. Main Happy Path Flow
1. First-time visitor lands on any page on the website.
2. System checks for the presence of the `age_verified_30d` cookie/localStorage token.
3. If not found, a discreet modal appears over a blurred background: *"Welcome to Aura Lifestyle. You must be at least 18 years old to view wellness products."*
4. User clicks *"I am 18 or Older"*.
5. Modal dismisses smoothly; system writes a secure cookie with a 30-day expiration (`age_verified_30d=true; Max-Age=2592000; SameSite=Lax`).
6. At any time while browsing, if someone enters the room, user clicks the floating **"Quick Exit"** button.
7. The application immediately swaps the active viewport DOM with **Discreet Camouflage Mode** (a clean, realistic lifestyle article titled *"Top 10 Morning Habits for Balanced Productivity"*), replacing browser tab title to *"Morning Productivity - Daily Lifestyle"*.
8. User can safely close the tab or click a subtle disguised exit icon to restore browsing when privacy is restored.

#### 3. Business & Validation Rules
- **Rule 1 (Age Enforcement):** Access to product catalog, images, cart, and search is strictly blocked until 18+ affirmation is given.
- **Rule 2 (Under-18 Fallback):** If the user clicks *"I am Under 18 (Exit)"*, window immediately executes `window.location.replace("https://www.google.com")`.
- **Rule 3 (SEO Crawlers):** Search engine bots (Googlebot, Bingbot) must bypass the interactive modal via server-side user-agent evaluation so product SSR and schema metadata are fully indexed.
- **Rule 4 (Camouflage Latency):** Camouflage Mode must execute 100% client-side with 0ms network latency; the decoy article assets must be pre-rendered in memory.

#### 4. Error States & Edge Cases
- **Cookies Disabled:** If user has disabled browser cookies, fallback to `sessionStorage`. If both fail, allow session-only viewing but show warning on refresh.
- **Browser History Back Button in Decoy Mode:** Clicking "Back" in browser must not reveal the adult product page. Camouflage mode pushes a benign state into the history stack via `history.pushState()`.
- **Accidental Click on Panic Button:** Decoy screen includes a discreet double-tap or corner escape icon enabling the customer to return without losing their active shopping cart.

#### 5. Acceptance Criteria (Definition of Done)
- [ ] 18+ modal displays on first visit and stays suppressed for 30 days after affirmation.
- [ ] Clicking "Under 18" redirects immediately to Google.com with no ability to click browser back.
- [ ] Floating Panic button instantly disguises entire screen into neutral lifestyle blog in < 50ms.
- [ ] Active cart and session are retained in background memory during camouflage mode.
- [ ] Search crawlers index product pages without being blocked by age modal.

#### 6. Open Decisions
- None (All mechanics, decoy design, and cookie durations confirmed during interview).

---

### Feature 2: Standard Account Authentication & DOB Verification

- **User Role:** Customer / Buyer
- **User Goal:** Securely register and log in to track intimate orders, manage addresses, and verify adult age permanently.
- **Priority & Status:** First Version | Confirmed

#### 1. Available User Actions
- Enter mobile number or email address on the `/login` or `/register` screen.
- Select preferred OTP delivery channel: **SMS**, **Email**, or **WhatsApp**.
- Enter Date of Birth (DD/MM/YYYY) during mandatory account creation.
- Submit 6-digit one-time password (OTP).
- View and update saved delivery addresses and notification preferences.

#### 2. Main Happy Path Flow
1. User proceeds from cart to checkout or clicks *"My Account"*.
2. System displays login/signup form requesting Phone Number or Email.
3. If new user, registration form additionally requires Full Name and **Date of Birth (DOB)**.
4. User selects OTP channel (SMS, WhatsApp, or Email) and clicks *"Get OTP"*.
5. Background service generates a cryptographic 6-digit code with a 5-minute TTL and dispatches it via the selected provider.
6. User inputs the 6-digit code.
7. Backend validates the code and calculates age from DOB (`age >= 18`).
8. System issues HTTP-only JWT access and refresh tokens, creates the customer profile, and redirects to checkout.

#### 3. Business & Validation Rules
- **Rule 1 (DOB Age Gate):** Customer must be strictly >= 18 years old on the current date. Registrations with DOB < 18 are rejected with error: *"You must be at least 18 years old to create an account."*
- **Rule 2 (Mandatory Account for Tracking):** Standard Account creation is strictly required for order placement and order tracking.
- **Rule 3 (OTP Rate Limiting):** Maximum 3 OTP requests per phone/email within a 15-minute window to prevent SMS toll fraud and spam.
- **Rule 4 (Neutral SMS/WhatsApp Wording):** OTP messages must use neutral sender IDs and text: *"Your Aura Lifestyle security verification code is 482910. Valid for 5 mins."*

#### 4. Error States & Edge Cases
- **Expired / Incorrect OTP:** Show clear inline message: *"Incorrect code. 2 attempts remaining"* or *"Code expired. Resend OTP"*.
- **Primary Channel Gateway Failure:** If SMS gateway fails, UI automatically offers 1-click fallback: *"Did not receive SMS? Send code via WhatsApp or Email"*.
- **Invalid DOB Entry:** Reject future dates, non-existent calendar dates (e.g., 31/02/1995), or ages under 18 with explicit inline field errors.

#### 5. Acceptance Criteria
- [ ] User can authenticate via SMS, Email, or WhatsApp OTP.
- [ ] System strictly rejects account creation if age is under 18 years.
- [ ] JWT tokens stored securely in `httpOnly`, `SameSite=Strict`, `Secure` cookies.
- [ ] Rate limiting enforces a 60-second cooldown between resend requests.

#### 6. Open Decisions
- None (Standard Account model with mandatory DOB verified in interview).

---

### Feature 3: Interactive Toy Finder Quiz & Medical-Grade Catalog

- **User Role:** Customer / Buyer
- **User Goal:** Overcome purchase hesitation through an anonymous 3-question guided quiz, and browse curated products with verified medical safety disclosures.
- **Priority & Status:** First Version | Confirmed

#### 1. Available User Actions
- Launch the 3-question "Toy Finder Quiz" from header or homepage banner.
- Select preferences: Experience Level (Beginner / Intermediate / Advanced), Sensation Goals (Gentle clitoral / Deep vibration / Couple intimacy), and Waterproof/Size preferences.
- View personalized recommended starter kits with 1-click "Add Bundle to Cart".
- Filter catalog by verified Medical Badges: *100% Medical-Grade Silicone*, *Phthalate-Free*, *IPX7 100% Waterproof*, *Whisper Quiet (<50dB)*.
- Read comprehensive care, charging, and cleaning instructions on each product page.

#### 2. Main Happy Path Flow
1. User clicks *"Find Your Perfect Match (Quiz)"*.
2. Modal opens presenting Question 1: *"What is your comfort level?"* with 3 visual non-explicit cards.
3. User selects an option; quiz transitions smoothly to Question 2 (Anatomy/Sensation) and Question 3 (Key Features: e.g., Travel-friendly, Couple-friendly).
4. System processes responses against product tags and displays 2 recommended options: a Single Hero Toy and a Curated Starter Bundle (Hero Toy + Water-Based Lube + Sanitizing Foam).
5. User clicks *"Add Curated Bundle to Cart"* with automatic 10% bundle savings applied.

#### 3. Business & Validation Rules
- **Rule 1 (100% Anonymous Quiz):** The quiz does not ask for name, email, or phone number before showing recommendations.
- **Rule 2 (Medical Badge Certification):** Badges cannot be displayed unless verified supplier documentation is uploaded in the Admin panel.
- **Rule 3 (Discreet Media):** Product imagery must be refined, medical-grade, and aesthetic (clean pastel studio lighting; zero sleazy or explicit graphics).

#### 4. Error States & Edge Cases
- **No Direct Match in Inventory:** If user selects an unusual combination of filters with zero matching products, system gracefully displays the closest top-rated beginner bestseller with an explanatory note: *"Here is our gentlest, most popular wellness match for your preferences"*.
- **Out of Stock Bundle Component:** If the companion lube in a bundle is out of stock, system substitutes a matching compatible alternative without breaking checkout.

#### 5. Acceptance Criteria
- [ ] Quiz completes in under 60 seconds with smooth step transitions.
- [ ] Product detail pages prominently showcase verified medical badges and noise level decibel ratings.
- [ ] Adding recommended bundle applies correct companion product pricing.

#### 6. Open Decisions
- None (Flow confirmed).

---

### Feature 4: Anti-RTO Cart & Multi-Payment Checkout Engine

- **User Role:** Customer / Buyer
- **User Goal:** Review cart, choose between prepaid discount or cash-on-delivery, verify checkout with OTP, and complete order securely.
- **Priority & Status:** First Version | Confirmed

#### 1. Available User Actions
- View cart, modify quantities, and remove items.
- View "Complete the Experience" 1-click add-on suggestions (Body-safe lubricant, Toy cleaner).
- Enter delivery pin code to auto-populate City and State.
- Select Payment Method: **Prepaid (UPI / Cards / NetBanking)** with instant 5% discount, or **Cash on Delivery (COD)** with flat ₹50 surcharge.
- Complete multi-channel OTP verification before order confirmation.
- View neutral billing descriptor notice: *"Will appear as 'Aura Retail & Lifestyle' on your statement"*.

#### 2. Main Happy Path Flow
1. User navigates to `/cart` and reviews items.
2. User proceeds to `/checkout` and logs in/registers with mandatory DOB.
3. User enters shipping address; delivery PIN code auto-validates serviceable zones via courier API.
4. User selects **Cash on Delivery (COD)**; system dynamically adds a flat ₹50 convenience surcharge to the order summary.
5. System displays checkout OTP verification modal; customer receives 6-digit OTP on Phone/WhatsApp/Email.
6. Customer enters OTP and clicks *"Confirm Order"*.
7. Order is created in state `confirmed`, inventory is deducted, neutral confirmation SMS is dispatched, and user sees order confirmation screen.

#### 3. Business & Validation Rules
- **Rule 1 (COD Surcharge):** Every COD order incurs an irreversible ₹50 convenience fee.
- **Rule 2 (Prepaid Incentive):** Prepaid orders receive an instant 5% discount (capped at ₹150) and free discreet shipping to maximize prepaid conversion (>80%).
- **Rule 3 (Checkout OTP):** No order (Prepaid or COD) can be finalized without a valid multi-channel OTP verification at checkout.
- **Rule 4 (Neutral Billing):** Gateway statement descriptor is locked to *"Aura Retail & Lifestyle"*.

#### 4. Error States & Edge Cases
- **Unserviceable PIN Code:** If customer PIN code is not serviceable for COD by Shiprocket/Delhivery, system automatically disables the COD option and displays: *"COD is temporarily unavailable in your postal code. Please choose Prepaid UPI/Card for guaranteed delivery."*
- **Order Total Below Minimum:** Orders below ₹499 trigger a notice: *"Minimum order value is ₹499"*.
- **High Risk COD Address:** If an address has had 2 prior consecutive RTO rejections, COD is blocked for that account.

#### 5. Acceptance Criteria
- [ ] ₹50 COD surcharge automatically recalculates total when COD radio button is toggled.
- [ ] Prepaid discount applies correctly when UPI/Card option is selected.
- [ ] Checkout requires valid multi-channel OTP before creating order record.
- [ ] Neutral billing descriptor displayed clearly to eliminate statement anxiety.

#### 6. Open Decisions
- None (All rules locked in interview).

---

### Feature 5: 30-Minute Reservation Hold & Payment Recovery Engine

- **User Role:** Customer / System
- **User Goal:** Ensure stock is temporarily reserved during active checkout, provide seamless 1-click recovery if payment drops, and prevent inventory hoarding.
- **Priority & Status:** First Version | Confirmed

#### 1. Available User Actions
- Click *"Retry Payment"* on checkout failure screen or from neutral recovery SMS/Email.
- Click *"Switch to Cash on Delivery (COD)"* directly from the payment retry screen.
- Receive automated notification with secure 1-click payment continuation link.

#### 2. Main Happy Path Flow
1. User clicks *"Pay Now"* via Razorpay/Cashfree.
2. System places a **30-minute reservation hold** on cart items in Redis/Database (`stock_reserved = true`, `expires_at = NOW() + 30 mins`).
3. User’s UPI app times out or bank server fails; payment status returns `FAILED`.
4. User is redirected to `/checkout/recovery?order_id=xyz`.
5. Screen displays: *"Payment could not be completed. Your items are reserved for the next 28:45 minutes."*
6. User clicks *"Switch to COD (+₹50)"* or *"Retry UPI"*.
7. If user completes payment within the window, status updates to `PAID`, reservation converts to permanent sale, and order proceeds to fulfillment.

#### 3. Business & Validation Rules
- **Rule 1 (Strict 30-Minute Window):** Items are locked for exactly 30 minutes. A background worker runs every 60 seconds to release expired holds.
- **Rule 2 (Stock Availability):** Other users browsing the site see available stock decremented by reserved units to prevent overselling.
- **Rule 3 (Neutral Recovery Communication):** Recovery message sent via SMS/Email: *"Your Aura Lifestyle order reservation is holding for 30 minutes. Complete order here: [Discreet Link]"*.

#### 4. Error States & Edge Cases
- **Reservation Expired:** If customer clicks retry link at minute 35, system checks current stock:
  - If stock available: Re-establishes a fresh reservation and opens payment.
  - If sold out: Shows graceful notification: *"Your reservation has expired and items have been claimed. Would you like to join the waitlist?"*
- **Double Payment Race Condition:** If bank confirms payment after the 30-minute window has lapsed and stock was reallocated, system automatically captures payment and flags order for manual Admin fulfillment or immediate refund.

#### 5. Acceptance Criteria
- [ ] Reservation hold locks stock for exactly 30 minutes upon payment initiation.
- [ ] Background worker reliably releases uncompleted reservations at minute 30.
- [ ] 1-click retry payment link and COD switch function seamlessly without re-entering shipping address.

#### 6. Open Decisions
- None (Confirmed during interview).

---

### Feature 6: Neutral Order Fulfillment & Discreet Post-Purchase Tracking

- **User Role:** Customer & Store Admin
- **User Goal:** Ensure 100% discreet physical packaging, neutral labeling, and private tracking without revealing intimate contents to couriers or family.
- **Priority & Status:** First Version | Confirmed

#### 1. Available User Actions
- **Customer:** Track order status in customer account or via neutral tracking link using Order ID + OTP.
- **Admin:** Review confirmed orders, print neutral shipping labels, generate Airway Bills (AWB), and hand over to courier partner.

#### 2. Main Happy Path Flow
1. Admin opens `/admin/orders` and selects new orders ready for packing.
2. Admin clicks *"Generate Neutral AWB"*.
3. Logistics API (Shiprocket/Delhivery) generates shipping label with:
   - **Sender:** Aura Retail & Lifestyle, Warehouse Hub #4, Industrial Area.
   - **Item Category:** *Personal Grooming & Wellness Kits* (Zero mentions of adult toys, vibrators, or brand names).
4. Warehouse packs item in a heavy-duty, unprinted, tamper-evident plain brown outer box with bubble wrap and water-activated security tape.
5. Courier picks up package and scans barcode.
6. System sends dispatch update to customer via neutral SMS: *"Aura Lifestyle Order #10482 dispatched via Delhivery. Track: [Discreet Link]"*.
7. Customer tracks delivery milestones to their doorstep without any explicit product terminology.

#### 3. Business & Validation Rules
- **Rule 1 (Strict Neutrality):** No courier label, invoice, SMS, or WhatsApp notification may contain the words "Sex", "Toy", "Vibrator", "Condom", or intimate wellness terminology.
- **Rule 2 (Tamper-Evident Packaging):** Plain box must have zero external brand logos or transparent windows.
- **Rule 3 (No Telemarketing / No Robocalls):** Courier instructions strictly specify "Call only upon arrival at gate. Do not leave parcel with neighbors without customer OTP consent."

#### 4. Error States & Edge Cases
- **Courier Delivery Failure (Door Closed / Buyer Not Available):** Customer receives discreet automated WhatsApp: *"Courier attempted delivery for Aura Lifestyle parcel. Reply 1 to reschedule for tomorrow or 2 to hold at local hub"*.
- **Package Damaged in Transit:** If outer packaging arrives damaged, customer is instructed to record the mandatory unboxing video before breaking the seal.

#### 5. Acceptance Criteria
- [ ] Generated shipping labels enforce "Aura Retail & Lifestyle" and "Personal Grooming & Wellness Kits".
- [ ] Customer tracking portal displays discreet status updates with zero intimate imagery or terminology.
- [ ] Outgoing SMS and WhatsApp templates verified neutral by compliance review.

#### 6. Open Decisions
- None (Branding and neutral categories locked in interview).

---

### Feature 7: 24-Hour DOA / Defect Unboxing Video Claim & Store Credit Engine

- **User Role:** Customer, Support Specialist, Store Admin
- **User Goal:** Fair resolution for Dead-On-Arrival (DOA) or motor failure items under strict hygiene constraints where open items cannot be restocked.
- **Priority & Status:** First Version | Confirmed

#### 1. Available User Actions
- Customer accesses `/account/orders/{id}/claim-warranty` within 24 hours of marked delivery.
- Customer uploads continuous unboxing video (showing tamper-evident courier box, unbroken internal product seal, and motor failure demonstration).
- Support / Store Admin reviews video in internal dashboard and clicks **"Approve Replacement"**, **"Approve Store Credit"**, or **"Reject Claim"** (with detailed reasoning).
- Customer receives instant replacement tracking or digital Store Credit voucher.

#### 2. Main Happy Path Flow
1. Customer receives parcel at 2:00 PM on Tuesday. Courier webhook marks status as `DELIVERED` at 2:02 PM.
2. The 24-hour claim countdown timer initiates (expires Wednesday 2:02 PM).
3. The toy motor fails to vibrate upon unboxing.
4. Customer opens `/account/orders/{id}/claim-warranty` before 24 hours lapse.
5. Customer records and uploads a continuous MP4 video (max 50MB) directly to secure cloud storage (Cloudflare R2/S3).
6. Claim record is created with status `PENDING_ADMIN_REVIEW`.
7. Store Admin inspects video in dashboard, verifies genuine defect and original packaging.
8. Admin checks stock:
   - If SKU is in stock: Admin clicks *"Approve Replacement"*; warehouse automatically generates dispatch order for brand-new replacement unit at zero cost.
   - If SKU is out of stock: Admin clicks *"Approve Store Credit"*; system issues an instant 100% store credit voucher code sent via email.
9. Claim status updates to `RESOLVED`. Defective unit is safely disposed of by user (strictly non-returnable to warehouse for hygiene compliance).

#### 3. Business & Validation Rules
- **Rule 1 (Strict 24-Hour Limit):** Claim portal automatically locks 24 hours after courier delivery timestamp. After 24 hours, button disables with message: *"Warranty claim window expired (24 hours from delivery)"*.
- **Rule 2 (Admin Approval Mandatory):** No replacement or store credit voucher can be generated automatically by the system; manual Admin/Support approval is required.
- **Rule 3 (Hygiene Non-Return Rule):** Intimate wellness toys cannot be physically returned or sent back to warehouse under any circumstances once unboxed.
- **Rule 4 (Out of Stock Fallback):** If exact SKU is unavailable, system issues 100% Store Credit Voucher valid for 1 year.

#### 4. Error States & Edge Cases
- **Large Video File Size (>50MB):** Frontend video uploader compresses video client-side or directs customer to attach a private Google Drive link via support ticket.
- **Fraudulent / Tampered Video Claim:** Admin rejects claim with recorded reason: *"Video shows seal was broken prior to recording"*. Customer receives respectful, professional rejection notice via email.
- **Delayed Courier Delivery Webhook:** If delivery webhook was delayed by 6 hours, claim window calculates from actual webhook timestamp, giving customer the benefit of full 24 hours.

#### 5. Acceptance Criteria
- [ ] Warranty claim button is active for exactly 24 hours post-delivery, then disables.
- [ ] Direct-to-cloud signed video upload works reliably for MP4/MOV files up to 50MB.
- [ ] Admin dashboard provides embedded video playback and 1-click Approval/Rejection buttons.
- [ ] Approving replacement creates automated zero-value dispatch order; approving credit generates valid store voucher.

#### 6. Open Decisions
- None (24-hour limit, Admin review mandate, and Store Credit voucher fallback confirmed in interview).

---

### Feature 8: AI Wellness Assistant & Full-Visibility Support Helpdesk

- **User Role:** Customer, Support Specialist, Admin
- **User Goal:** Provide 24/7 empathetic, non-judgmental guidance for buyers, with full customer data visibility for support staff to resolve issues rapidly.
- **Priority & Status:** First Version | Confirmed

#### 1. Available User Actions
- Customer interacts with floating AI Wellness Assistant chat widget on any catalog or product page.
- Customer asks questions regarding product sizing, material compatibility (e.g., silicone vs water-based lube), cleaning instructions, and battery care.
- Customer clicks *"Email Human Support"* if question requires specialized assistance.
- Support Specialist logs in to `/admin/support` and views customer tickets with complete visibility (Customer Name, Phone, Delivery Address, and Order Line Items).
- Support Specialist responds via email or triggers warranty claim review.

#### 2. Main Happy Path Flow
1. User clicks the *"Aura Wellness Guide"* chat bubble.
2. Bot displays non-judgmental welcome prompt: *"Hello! I am your confidential wellness guide. Ask me anything about body-safe materials, sizing, or product care."*
3. User asks: *"Can I use silicone lube with the Velvet Vibrator?"*
4. AI queries curated knowledgebase and responds: *"No. Silicone-based lubricants can degrade 100% medical-grade silicone toys over time. We recommend our natural Water-Based Organic Lubricant instead."*
5. User asks a medical or injury-related query (*"I feel pain or bleeding after using this"*).
6. Bot immediately invokes medical disclaimer fallback: *"I am an AI wellness guide and cannot provide medical advice. Please discontinue use immediately and consult a medical healthcare professional. For order or product questions, you can reach our discreet support team at support@auralifestyle.com."*
7. Bot displays curated Hygiene & Safety Care links and an email support shortcut button.

#### 3. Business & Validation Rules
- **Rule 1 (Medical Non-Liability Disclaimer):** AI must never diagnose physical symptoms, prescribe treatments, or guarantee medical outcomes.
- **Rule 2 (Full Staff Visibility):** Authorized Customer Support Specialists and Admins have complete visibility of Customer Name, Phone Number, Delivery Address, and Purchased Items in their dashboard to enable immediate, high-trust dispute resolution.
- **Rule 3 (Zero Marketing Telecalling):** Support specialists are strictly prohibited from placing outbound phone calls to customers without explicit prior email ticket permission.
- **Rule 4 (Confidential Chat Logs):** Anonymous guest chat sessions are deleted after 24 hours to protect user privacy.

#### 4. Error States & Edge Cases
- **AI Service Rate Limit / Downtime:** If LLM API experiences an outage, chat widget gracefully renders an offline FAQ accordion with top 10 wellness answers and a direct contact form.
- **Offensive / Inappropriate Input:** System prompt enforces strict boundary guardrails: treats inappropriate messages neutrally, redirects back to product care, and terminates abusive sessions.

#### 5. Acceptance Criteria
- [ ] AI Wellness bot responds within 2 seconds with curated, medically accurate wellness advice.
- [ ] Medical or safety queries trigger disclaimer and email support link.
- [ ] Support dashboard displays complete, unmasked customer order and contact records to authorized staff.
- [ ] No unsolicited phone calls are ever triggered by the platform.

#### 6. Open Decisions
- None (Full staff visibility and FAQ/Email fallback confirmed in interview).
