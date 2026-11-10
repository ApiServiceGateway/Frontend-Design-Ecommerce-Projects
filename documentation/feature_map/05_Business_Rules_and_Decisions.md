---
title: Business Rules and Decisions Log
phase: Phase 2 - Feature Map
document_id: 05_Business_Rules_and_Decisions
last_updated: 2026-10-30
status: Confirmed
summary: Authoritative registry of operational business logic, privacy protocols, anti-RTO rules, hygiene warranty policies, and chronological decision records for the adult wellness e-commerce marketplace.
---

# ⚖️ Business Rules & Decisions: Discreet Adult Wellness & Intimate Care Marketplace

> **Purpose:** Document how the platform, fulfillment operations, payment transactions, and customer relationships must strictly behave. This file records foundational business logic and maintains an immutable chronological record of critical architectural decisions made during development.
> 
> Having this explicit registry prevents circular debates, establishes unambiguous operational boundaries, and provides an authoritative reference for subsequent UI/UX design, database schema modeling, and feature implementation.

---

## 1. Core Business Rules

---

### A. Privacy, Discretion & Communication Policies

- **Rule BR-01 (Statutory Age Gate Verification):** 
  Every visitor must pass a 1-click 18+ age verification modal upon their initial session before accessing wellness device listings. The verification status is retained client-side via an encrypted session cookie (`age_verified=true`). Search engine bots and crawlers must be served non-blocking, sanitized metadata so SEO indexing is preserved without bypassing user-facing age safeguards.
  
- **Rule BR-02 (Strict Blind Packaging Mandate):** 
  100% of outbound parcels must be dispatched in plain, unmarked, heavy-duty brown corrugated cardboard boxes sealed with tamper-evident security tape. The exterior shipping label must display only the customer's delivery details and the registered neutral business trade name **"Aura Logistics & Retail"**. Under no circumstances may terms such as "adult toy", "vibrator", "wellness device", "intimate care", or individual product SKU names appear on courier manifests, shipping labels, or outer packaging.

- **Rule BR-03 (Strict Zero-Voice-Call Customer Policy):** 
  Customer support specialists, platform administrators, and warehouse operators are strictly prohibited from initiating unsolicited voice telephone calls to customers. All communications (order confirmations, delivery tracking, support responses, and warranty updates) must be conducted exclusively via silent channels: transactional SMS, encrypted email, transactional WhatsApp OTP alerts, or in-platform text ticketing. Delivery courier partner instructions must mandate doorstep delivery without unsolicited phone disclosure of package contents.

- **Rule BR-04 (Neutral Statement Billing Descriptor Guarantee):** 
  All payment gateway integrations (Cashfree, Razorpay, PhonePe) must process customer payments under the pre-configured neutral merchant descriptor **"AURA LOGISTICS"** or **"AURA RETAIL"**. No customer's bank statement, credit card invoice, net banking log, or UPI transaction history may ever reflect adult wellness or intimate toy terminology.

- **Rule BR-05 (Ephemeral AI Chat & Browsing Session Privacy):** 
  Conversations conducted with the 24/7 AI Wellness Assistant are strictly ephemeral. Chat transcripts must never be stored in persistent relational databases, attached to customer accounts, or logged against personal identifiable information (PII). Clicking the floating "Quick Exit" button or closing the browser tab must instantly purge local session storage, active cart preview states, and chat memory on the client device.

---

### B. Transactions, Anti-RTO & Order Fulfillment Rules

- **Rule BR-06 (Anti-RTO Dual-Incentive Framework):** 
  To combat the crippling 30%+ Return-to-Origin (RTO) failure rate common to taboo e-commerce in India, the platform enforces a non-negotiable two-pronged economic rule at checkout:
  1. *Cash on Delivery (COD) Surcharge:* Every COD order is subject to a transparent, non-refundable **₹50 COD Convenience & Handling Surcharge**.
  2. *Prepaid Nudge Incentive:* Customers opting for instant digital prepaid payment (UPI, Credit/Debit Cards, NetBanking) have the ₹50 COD fee completely waived and receive an instant **5% Prepaid Discount Nudge**.

- **Rule BR-07 (Automated COD Pre-Dispatch OTP Verification):** 
  Placing a COD order does not immediately transition the order to the warehouse fulfillment queue. The order is placed in an automated `Pending_Verification` hold state. The system automatically dispatches a 1-click confirmation prompt via WhatsApp and SMS. The customer must submit a 6-digit OTP or click the verification link within 24 hours. Unconfirmed COD orders are automatically canceled after 24 hours to prevent phantom shipments and protect logistics capital.

- **Rule BR-08 (Inventory Reservation & Cart Locking):** 
  Adding an item or bundle to a shopping cart does **NOT** reserve warehouse inventory. Stock is reserved exclusively when a customer advances to the active payment gateway checkout step, initiating a 15-minute temporary inventory lock. If payment confirmation is not received from the gateway webhook within 15 minutes, the inventory lock is immediately released back to the public catalog.

- **Rule BR-09 (PIN Code Serviceability & Transit Gate):** 
  Checkout forms must validate the customer's 6-digit Indian postal PIN code against the live 3PL logistics partner API (Shiprocket / Delhivery) prior to payment capture. If a PIN code is classified as non-serviceable for delivery or excluded from COD service, the checkout engine must immediately inform the user and disable the unavailable payment/shipping method before funds are captured.

---

### C. Hygiene Governance, Warranty & Returns

- **Rule BR-10 (Strict Non-Returnable Hygiene Policy):** 
  In accordance with Indian Consumer Protection guidelines and global intimate hygiene standards, all adult toys, massagers, intimate cosmetics, and wellness consumables are strictly **Non-Returnable and Non-Refundable** once the tamper-evident exterior packaging or protective hygiene seal has been opened or breached. "Change of mind", "unwanted gift", or "unsatisfied with sensation" claims are ineligible for return or exchange under any circumstances.

- **Rule BR-11 (Dead-on-Arrival [DOA] Unboxing Video Warranty Standard):** 
  To protect consumers against electronic manufacturing or battery defects without compromising hygiene protocols, the platform enforces a silent video warranty rule:
  - If a device arrives with a non-functional motor, broken charging circuit, or dead battery, the customer must submit a replacement claim via the Silent Warranty Portal within **48 hours of confirmed courier delivery**.
  - The customer must provide an unedited, continuous **Unboxing Video** clearly showing the unopened shipping box with courier label, the unsealing of the tamper-evident pouch, and the electronic defect.
  - Upon video verification by internal support, a brand-new replacement unit is dispatched at zero additional cost. The customer is explicitly instructed to safely dispose of the defective unit—**no return shipping of contaminated goods is ever mandated**.

- **Rule BR-12 (Sanitized GST Tax Invoice Classification):** 
  All legally required GST tax invoices generated by the system must utilize neutral, legally recognized Harmonized System of Nomenclature (HSN) commodity classifications (such as *"Electronic Personal Massager"*, *"Skin Care Formulation"*, or *"Silicone Wellness Appliance"*). Invoices packed inside cartons must be sealed in an opaque, unprinted internal envelope rather than affixed transparently to the box exterior.

---

## 2. Chronological Decision Record (ADR)

*Authoritative log of key architectural, product, and business decisions decided during Phase 1 and Phase 2 discovery:*

| Decision ID | Date | Decision Summary | Context & Core Rationale | Alternatives Rejected & Trade-offs | Status |
| :---: | :---: | :--- | :--- | :--- | :---: |
| **ADR-01** | 2026-10-30 | **Multi-Method Auth with Guest Checkout & Vault Mode** | Maximizes conversion by allowing zero-account guest orders via OTP, while offering an optional passwordless Vault account (OTP/Google OAuth) for tracking and warranty. | *Rejected pure account-only model* (creates high drop-off due to discovery fear) and *rejected 100% ephemeral-only* (makes recurring order tracking difficult). | **Decided** |
| **ADR-02** | 2026-10-30 | **Dual Guidance Engine (Quiz + Ephemeral AI Assistant)** | Pairs a rapid 3-question visual Toy Finder Quiz (under 45 sec) for beginners with a confidential 24/7 AI conversational chatbot for nuanced anatomy and care questions. | *Rejected static-only guides* (lacks personalization) and *rejected live human chat-only* (high operational cost, customer embarrassment with live humans). | **Decided** |
| **ADR-03** | 2026-10-30 | **₹50 COD Surcharge + Prepaid UPI Nudge + Pre-Dispatch OTP** | Addresses the 30%+ RTO crisis in Indian adult retail by economically disincentivizing frivolous COD and requiring interactive WhatsApp/SMS confirmation before boxing. | *Rejected flat COD ban* (would cut overall Indian market addressability by 40%+) and *rejected standard free COD* (destroys logistics margins). | **Decided** |
| **ADR-04** | 2026-10-30 | **Universal Neutral Trade Identity ("Aura Logistics & Retail")** | Enforces complete neutral branding across waybills, bank statements, SMS alerts, and exterior packaging to permanently dissolve delivery shame. | *Rejected partial branding* (any visible adult logo leaks privacy) and *rejected multiple shell names* (creates merchant accounting confusion). | **Decided** |
| **ADR-05** | 2026-10-30 | **Strict Non-Returnable Hygiene Policy with Video DOA Warranty** | Balances absolute biological sanitation (preventing resale of contaminated items) with trusted buyer warranty protection via silent unboxing video uploads. | *Rejected physical returns for inspection* (creates hazardous material contamination for warehouse workers) and *rejected zero-warranty policy* (destroys buyer trust). | **Decided** |
| **ADR-06** | 2026-10-27 | **Responsive Next.js Web Application / PWA over Native App** | Maximizes organic search engine dominance (SEO) and avoids prohibitive adult app bans on the Apple App Store and Google Play Store. | *Rejected native iOS/Android apps* (app store adult content restrictions and high 30% platform fees). | **Decided** |

---

## 3. Working Assumptions Register

*Key operational hypotheses treated as true for Phase 2 feature mapping, subject to ongoing verification:*

- **Assumption 1 (Prepaid Conversion Receptivity):** Indian consumers in Tier-1 and Tier-2 cities will readily opt for prepaid UPI over COD if guaranteed a 5% discount, zero COD surcharge, and a verified neutral bank descriptor (*"AURA LOGISTICS"*).
- **Assumption 2 (Unboxing Video Compliance):** Genuine customers receiving a defective electronic item will willingly record a short 30-second continuous unboxing video if clearly informed at checkout that this eliminates the need to package and return contaminated intimate items.
- **Assumption 3 (Organic Search as Primary Acquisition Engine):** In the absence of paid performance marketing on Meta and Google Ads, deep medically backed buying guides, interactive quizzes, and comparison matrices can capture over 25,000 monthly organic search visitors within 6 months of launch.
- **Assumption 4 (Courier Driver Neutrality):** 3PL logistics carriers (Delhivery, Shiprocket) will consistently deliver parcels without opening outer packaging or altering the sender trade name on delivery run sheets.

---

## 4. Open Questions Requiring Resolution (Deferred to Later Phases)

*Strategic and technical items flagged for resolution during Phase 3 (Architecture) and Phase 6 (Planning):*

- **Question 1 (Payment Gateway High-Risk Classification):** Which Indian payment gateway aggregator (Cashfree vs. Razorpay) provides the highest underwriting success rate for adult wellness catalog categories with pre-approved neutral billing descriptors without requiring an expensive offshore merchant account?
- **Question 2 (Logistics Courier API Webhook Precision):** Does Shiprocket or direct Delhivery enterprise API provide more granular real-time webhooks to trigger instantaneous neutral SMS delivery alerts to buyers when the courier is within a 1-kilometer radius?
- **Question 3 (Supplier Minimum Order Quantities & Authorized Margins):** What are the contractual MOQs and direct distributor margins available from premier international brands (Satisfyer, Lelo, Womanizer) versus established domestic white-label manufacturers?
