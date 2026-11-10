---
title: Business Rules, Decisions & Assumptions Register
phase: Phase 2 - Features
document_id: 05_Business_Rules_and_Decisions
last_updated: 2026-10-27
status: Confirmed
summary: Central log of non-negotiable business rules, architectural tradeoffs, working assumptions, and decision records for the adult wellness e-commerce platform.
---

# ⚖️ Business Rules & Decisions: Discreet Adult Wellness & Intimate Care Platform (Aura Retail & Lifestyle)

> **Purpose:** Document all critical business rules, architectural tradeoffs, working assumptions, and unresolved questions in one place. Prevents mid-development debates and conflicting implementations.

---

## 1. Non-Negotiable Business Rules
*Hard logic and policies that the code MUST enforce without exception:*

### A. Ordering, Anti-RTO & Checkout Logic
- **BR-01 (Mandatory DOB 18+ Verification):** Every customer account registration must collect and validate Date of Birth (DOB). Accounts where `Age < 18` on registration date must be blocked at the database level.
- **BR-02 (Checkout Multi-Channel OTP):** No order (Prepaid or COD) can transition to `CONFIRMED` without a verified 6-digit OTP delivered via SMS, Email, or WhatsApp.
- **BR-03 (COD Surcharge):** Every Cash on Delivery order incurs an immutable flat ₹50 convenience fee. Free delivery applies only to prepaid orders above ₹499.
- **BR-04 (Prepaid Incentive):** Digital prepaid payments (UPI / NetBanking / Cards) automatically receive an instant 5% discount (capped at ₹150) to incentivize prepaid ratio > 80%.
- **BR-05 (30-Minute Stock Reservation):** When payment is initiated or fails/drops, stock is held for exactly 30 minutes. An automated worker releases reserved stock back to public catalog at minute 30:01 if unpaid.

### B. Privacy, Packaging & Neutral Descriptors
- **BR-06 (Neutral Billing Statement):** The merchant name sent to payment aggregators (Razorpay/Cashfree/PhonePe) is permanently locked to **"Aura Retail & Lifestyle"**. Intimate terms must never appear on bank/UPI statements.
- **BR-07 (Plain Brown Box Packaging):** Outbound packages must use heavy-duty, unbranded plain brown cardboard boxes sealed with tamper-evident security tape. Zero brand logos or transparent windows are permitted.
- **BR-08 (Neutral Shipping Label):** All logistics labels and Airway Bills (AWBs) must declare the sender as **"Aura Retail & Lifestyle"** and item category as **"Personal Grooming & Wellness Kits"**. Product-specific names (e.g., Vibrator, Kegel, Lube) are strictly banned from labels.
- **BR-09 (Zero Latency Decoy Panic Button):** Clicking the floating "Quick Exit" button must instantly render **Discreet Camouflage Mode** (neutral lifestyle/productivity blog) on the client side with 0ms network latency.

### C. Hygiene & 24-Hour DOA Replacement Policy
- **BR-10 (Strict Hygiene Non-Return Rule):** Adult wellness products and intimate toys cannot be physically returned or accepted back into the warehouse under any circumstance once the outer or inner seal is unboxed.
- **BR-11 (24-Hour Claim Window):** Dead-on-Arrival (DOA) or motor defect claims must be submitted within exactly 24 hours of the courier delivery webhook timestamp. After 24 hours, the claim interface is automatically locked.
- **BR-12 (Continuous Unboxing Video Mandate):** Defect claims require an uninterrupted unboxing video demonstrating the sealed courier packaging, opening of the box, and the motor defect.
- **BR-13 (Mandatory Admin Review Gate):** No replacement order or store credit can be triggered automatically; human Admin or Support review and approval of the unboxing video is required.
- **BR-14 (Out-of-Stock Store Credit Fallback):** If an approved defective SKU is out of stock, the system generates an instant 100% Store Credit Voucher valid for 12 months (no cash refund to protect working capital).

### D. Support Conduct & PII Access Rules
- **BR-15 (Full Internal Support Visibility):** Support Specialists and Store Admins have complete visibility of Customer Name, Phone, Delivery Address, and Purchased Items in the support dashboard to guarantee fast resolution.
- **BR-16 (Zero Unsolicited Telecalling):** Outbound phone calls to customers are strictly prohibited across all staff roles. Customer service communications are restricted exclusively to neutral email, SMS, and WhatsApp bots.
- **BR-17 (AI Non-Liability Disclaimer):** The AI Wellness Chatbot must display a medical disclaimer on any health or injury query, provide curated care FAQs, and suggest email support (`support@auralifestyle...`).

---

## 2. Decision Log (ADR - Architectural & Product Decisions)
*What was decided, why, and what alternative was rejected?*

| Decision ID | Topic / Question | Decision Taken | Why This Was Chosen | Alternatives Considered | Date Decided | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **DEC-01** | **Panic Button Behavior** | **Discreet Camouflage Mode** (Decoy Lifestyle Blog) | Immediate in-place camouflage avoids suspicious window switching or abrupt blanks if someone peeks at the screen | Simple Google redirect; tab closing | 2026-10-27 | Confirmed |
| **DEC-02** | **Account Model** | **Standard Account** with Mandatory DOB (18+) | Order tracking, post-purchase dispute history, and legal compliance require authenticated identity with verified age | 100% Guest-only checkout; Social login | 2026-10-27 | Confirmed |
| **DEC-03** | **COD Anti-RTO Architecture** | **Flat ₹50 Fee + Checkout Multi-Channel OTP** | Disincentivizes frivolous COD orders and curbs high return-to-origin courier losses while offering customer flexibility | 100% Prepaid only; Manual call confirmation | 2026-10-27 | Confirmed |
| **DEC-04** | **DOA Defect Claim Window** | **Strict 24-Hour Window** from Courier Delivery Webhook | Restricts abuse while honoring genuine manufacturing defects and battery/motor failures | 7-day return window; 48-hour window | 2026-10-27 | Confirmed |
| **DEC-05** | **Defect Approval Mechanism** | **Mandatory Human Review** before Dispatch/Credit | Protects against fraudulent video claims and ensures fair inspection of tamper seals | Automated AI video analysis; Instant auto-refund | 2026-10-27 | Confirmed |
| **DEC-06** | **Out-of-Stock Defect Fallback** | **100% Store Credit Voucher** (1-Year Validity) | Retains platform GMV while ensuring the customer receives immediate, fair store value | Gateway cash refund; Backorder waitlist | 2026-10-27 | Confirmed |
| **DEC-07** | **Customer Support PII Scope** | **Full Visibility** (Name, Phone, Address, Items) | Enables support staff to immediately resolve shipping discrepancies and delivery issues without escalation delays | Masked PII (e.g. +91 98***); Anonymized tickets | 2026-10-27 | Confirmed |
| **DEC-08** | **AI Wellness Chatbot Fallback** | **Medical Disclaimer + Care FAQs + Email Suggestion** | Protects platform from medical liability while offering seamless escalation to human email support | Live agent handoff; Auto-ticket generation | 2026-10-27 | Confirmed |
| **DEC-09** | **Payment Failure Recovery** | **30-Minute Reservation Hold + COD Switch** | Recovers abandoned checkouts by giving buyers a 30-min window with 1-click retry or COD switch | Immediate cart cancellation; Indefinite stock lock | 2026-10-27 | Confirmed |
| **DEC-10** | **Neutral Branding Identity** | **"Aura Retail & Lifestyle"** (*Personal Grooming & Wellness Kits*) | Completely neutral descriptor that raises zero suspicion on financial statements or delivery labels | BLKD Retail; Generic Logistics India | 2026-10-27 | Confirmed |

---

## 3. Working Assumptions Register
*Assumptions currently treated as true during feature definition, pending live verification:*

| Assumption ID | Working Assumption | Affected Features / Workflows | Risk if False | How to Validate |
| :--- | :--- | :--- | :--- | :--- |
| **ASM-01** | A ₹50 COD surcharge is high enough to deter fake orders but low enough not to destroy overall checkout conversion | Cart & Checkout Surcharge Engine | If too high, drops checkout conversion; if too low, RTO remains high | A/B test ₹50 vs ₹75 surcharge during pilot |
| **ASM-02** | Customers with genuine DOA defects can easily record and upload a 30-60 second unboxing video on their smartphone (<50MB) | Warranty Claim Portal & S3 Upload | Customer frustration if file size is too big or slow connection | Implement client-side video compression before upload |
| **ASM-03** | Indian courier agents will strictly honor "Do not call unless at gate" delivery instructions | Shipping & Logistics Integration | Courier may call family members if address is hard to find | Standardize dispatch notes in Shiprocket/Delhivery API |
| **ASM-04** | Target audience (21–40 urban adults) prefers WhatsApp OTP over SMS OTP due to better delivery rates | Auth & Checkout OTP Engine | High SMS failure rates in Tier-2/3 regions | Track delivery completion rate across SMS vs WhatsApp |

---

## 4. Open Questions & Pending Decisions
*Critical questions that still need resolution before development starts:*

| Question ID | Question / Dilemma | Options Under Consideration | Impacted Module | Owner / Needed By |
| :--- | :--- | :--- | :--- | :--- |
| **OQ-01** | Which Indian payment gateway aggregator provides the lowest transaction fee while officially approving adult wellness products under neutral descriptors? | Option A: Cashfree Payments<br>Option B: PhonePe Payment Gateway<br>Option C: Razorpay (High-risk approval) | Payments & Finance | Founder / Tech Lead |
| **OQ-02** | What is the automated fallback if an unboxing video file exceeds 50MB on slow mobile 4G connections? | Option A: Client-side WebAssembly video compressor<br>Option B: Allow customer to provide a private Google Drive link via email | Warranty Claim Engine | Frontend Lead |
| **OQ-03** | Should courier delivery OTP (from Delhivery/Shiprocket) be mandated at the customer's doorstep for COD deliveries? | Option A: Yes (Guarantees parcel handed directly to buyer)<br>Option B: No (May cause friction if delivery agent is delayed) | Courier Logistics Integration | Ops Lead |
