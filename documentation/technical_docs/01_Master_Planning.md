# 🏛️ Document 1: Master Planning

**Project Name:** Aura Retail & Lifestyle (Discreet Adult Wellness & Intimate Care E-Commerce Marketplace)  
**Document Status:** Confirmed / Approved by User (Green Light on 2026-11-09)  
**Version:** 1.0.0  
**Date:** 2026-11-09  
**Author / Partner:** Planning & Technical Documentation Partner  

---

## 1. Purpose

Yeh document is project ka high-level **Source of Truth** aur foundational blueprint hai. Iska maqsad project ke business goals, core problem, target audience, v1 scope boundaries, high-level architecture, non-negotiable constraints, working assumptions aur risks ko ek jagah consolidate karna hai, taaki aage aane wale sabhi technical documents (Architecture, Tech Stack, Database, Security, APIs wagairah) aur development implementation isi par tightly aligned rahein.

---

## 2. Existing Approved Context & Workspace Findings

Shuru karne se pehle workspace aur conversation repository ka thorough inspection kiya gaya. Niche diye gaye existing records aur unka status paya gaya:

* **Inspect kiye gaye files:**
  * [`Idea/01_Idea.md`](file:///c:/Users/20092/OneDrive/Desktop/Dev/Projects/Active/Black%20Dot%20ecosystem/eoc_system%20Products/ecomerce%20website%20{wellness%20toys}/Idea/01_Idea.md): Core concept, UVP, KPIs, target audience aur early validation notes.
  * [`Idea/04_Requirements.md`](file:///c:/Users/20092/OneDrive/Desktop/Dev/Projects/Active/Black%20Dot%20ecosystem/eoc_system%20Products/ecomerce%20website%20{wellness%20toys}/Idea/04_Requirements.md): Functional/Non-functional requirements, v1 in-scope vs out-of-scope boundaries.
  * [`Feature/01_Feature_Map.md`](file:///c:/Users/20092/OneDrive/Desktop/Dev/Projects/Active/Black%20Dot%20ecosystem/eoc_system%20Products/ecomerce%20website%20{wellness%20toys}/Feature/01_Feature_Map.md): Role-based feature inventory (Customer, Store Admin, Support Agent, Super Admin).
  * [`Feature/03_Roles_and_Permissions.md`](file:///c:/Users/20092/OneDrive/Desktop/Dev/Projects/Active/Black%20Dot%20ecosystem/eoc_system%20Products/ecomerce%20website%20{wellness%20toys}/Feature/03_Roles_and_Permissions.md): RBAC matrix across 5 system roles.
  * [`Feature/05_Business_Rules_and_Decisions.md`](file:///c:/Users/20092/OneDrive/Desktop/Dev/Projects/Active/Black%20Dot%20ecosystem/eoc_system%20Products/ecomerce%20website%20{wellness%20toys}/Feature/05_Business_Rules_and_Decisions.md): Locked business rules (BR-01 to BR-17), previous decision log (DEC-01 to DEC-10), working assumptions, open questions.
  * `feature_extraction/pages/*.md`: 40+ granular UI screen feature extractions.

* **Pehle ke conflicts aur unka proposed resolution:**
  1. **Guest Checkout vs Mandatory Account (DOB 18+):**
     * *Conflict:* `Idea/04_Requirements.md` mein 100% Guest Checkout (FR-05) likha tha, jabki `Feature/05_Business_Rules_and_Decisions.md` (DEC-02 / BR-01) ne mandatory account with verified DOB (18+) decide kiya tha legal compliance aur DOA claim verification ke liye.
     * *Resolution (Confirmed):* Standard account with mandatory DOB verification enforced. Checkout ke dauran progressive seamless onboarding hogi (OTP verification se automatic account create hoga bina complex password friction ke).
  2. **Panic Button Behavior (Redirect vs Client Camouflage):**
     * *Conflict:* `Idea/01_Idea.md` mein Google/Wikipedia redirect likha tha, jabki DEC-01 ne in-place "Discreet Camouflage Mode" (Decoy lifestyle blog rendering with 0ms network latency) lock kiya tha.
     * *Resolution (Confirmed):* Client-side Decoy Blog Camouflage primary behavior rahega; emergency external redirect secondary fallback ke roop mein rahega.

---

## 3. High-Level Decisions Register

| Decision ID | Decision Title | Status | Reason / Justification | Source / Assumption |
| :--- | :--- | :--- | :--- | :--- |
| **MP-DEC-01** | **Monolith-First Modular Architecture** | **Proposed** | V1 speed to market, atomic inventory transactions (30-min reservation hold), simplified deployment, aur low operational overhead. | Best practice for early-stage D2C platforms. |
| **MP-DEC-02** | **Discreet Camouflage Mode (Panic Button)** | **Confirmed** (per DEC-01) | In-place client decoy view zero network latency par render hota hai; browser history ya awkward redirects se privacy exposure nahi hoti. | [`Feature/05_Business_Rules_and_Decisions.md`](file:///c:/Users/20092/OneDrive/Desktop/Dev/Projects/Active/Black%20Dot%20ecosystem/eoc_system%20Products/ecomerce%20website%20{wellness%20toys}/Feature/05_Business_Rules_and_Decisions.md) |
| **MP-DEC-03** | **Standard Account with Progressive OTP & Mandatory DOB** | **Confirmed** (per DEC-02 / BR-01) | Indian legal protection (18+ verification) aur 24-hr unboxing claim integrity ke liye buyer identity record zaroori hai. | [`Feature/05_Business_Rules_and_Decisions.md`](file:///c:/Users/20092/OneDrive/Desktop/Dev/Projects/Active/Black%20Dot%20ecosystem/eoc_system%20Products/ecomerce%20website%20{wellness%20toys}/Feature/05_Business_Rules_and_Decisions.md) |
| **MP-DEC-04** | **Anti-RTO Dual Surcharge & Discount Engine** | **Confirmed** (per DEC-03 / BR-03 / BR-04) | Flat ₹50 surcharge on COD + instant 5% prepaid discount + checkout OTP ensures COD RTO drops below 8-10%. | E-commerce benchmark in Indian wellness sector. |
| **MP-DEC-05** | **Neutral Business Identity ("Aura Retail & Lifestyle")** | **Confirmed** (per DEC-10 / BR-06 / BR-08) | Zero privacy leak on bank statements, UPI handles, courier waybills, and SMS alerts. | [`Feature/05_Business_Rules_and_Decisions.md`](file:///c:/Users/20092/OneDrive/Desktop/Dev/Projects/Active/Black%20Dot%20ecosystem/eoc_system%20Products/ecomerce%20website%20{wellness%20toys}/Feature/05_Business_Rules_and_Decisions.md) |
| **MP-DEC-06** | **Strict Hygiene Non-Return + 24-Hour DOA Video Replacement** | **Confirmed** (per BR-10 / BR-11 / BR-12) | Intimate products cannot be restocked once unboxed. Genuine manufacturing defects handled via mandatory unboxing video review within 24h of delivery. | Indian D2C hygiene standards. |
| **MP-DEC-07** | **Zero Unsolicited Outbound Telecalling** | **Confirmed** (per BR-16) | Intimate wellness customers prioritize silent communication. Outbound sales/support calling strictly banned; interactions limited to AI bot, email, neutral SMS/WhatsApp. | Core privacy brand promise. |
| **MP-DEC-08** | **Next.js Full SSR / Hybrid Architecture** | **Proposed** | Sexual wellness brands cannot rely on paid ads (Google/Meta adult bans). Server-Side Rendering (SSR) and automated Schema.org metadata are mandatory for organic search dominance. | High-intent SEO growth requirement. |

---

## 4. Project Goal & High-Level Vision

### Vision
India ka sabse trusted, aesthetically refined aur privacy-first sexual wellness marketplace banana, jo body-safe intimate care products ko medical safety, transparent education aur 100% discrete logistics ke saath deliver kare—shame aur stigma ko eliminate karte hue.

### Primary Goals
1. **Unshakeable Privacy:** Browsing se lekar bank statement aur doorstep delivery tak buyer ki privacy 100% protected rahe.
2. **Body Safety & Quality Standard:** Catalog mein sirf 100% certified medical-grade silicone, phthalate-free, non-toxic aur IPX7 waterproof products hon. Cheap toxic jelly rubber items strictly banned hon.
3. **Sustainable Unit Economics (Anti-RTO):** High prepaid conversion (>80%) achieve karna aur COD RTO rate ko <8% par restrict karna taaki reverse logistics losses business ko affect na karein.
4. **Organic Growth Engine:** Deep educational content, buying guides, aur interactive quizzes ke zariye organic search ranking capture karna, jahan paid advertising channels restricted hain.

---

## 5. Problem Statement & Indian Market Context

### The Core Problem
India mein adult wellness products khareedna teeno aspects par extreme friction se bhara hai:
* **Social Taboo & Extreme Delivery Anxiety:** Family members, roommates ya courier delivery agents ko pata chalne ka darr. Sleazy packaging ya reveal hone wale brand names transaction abandon kara dete hain.
* **Toxic Materials & Health Hazard:** Indian grey market aur generic marketplaces mein uncertified, porous jelly rubber aur phthalates se bane low-grade items bhare hain jo infections aur health complications paida karte hain.
* **Sleazy & Intimidating User Experience:** Existing websites ka aesthetic pornographic, cheap aur scammy lagta hai, jo modern women, progressive individuals aur couples ko alienate karta hai.
* **Logistics Nightmare (RTO Destruction):** Delivery ke waqt sharam ki wajah se customers parcel reject kar dete hain, jisse D2C brands ka 25–40% inventory RTO mein fans kar capital barbaad karta hai.

---

## 6. Target Audience & Personas

| User Persona | Demographics | Core Motivations | Primary Pain Points |
| :--- | :--- | :--- | :--- |
| **The Mindful Explorer (Primary)** | Urban Women / Individuals, Age 22–38, Tier-1 & Tier-2 cities | Safe self-care, sexual wellness, premium aesthetics, stress relief | Delivery shame, toxic materials, sleazy website UI |
| **The Modern Couple (Secondary)** | Married / Cohabiting partners, Age 25–42 | Re-igniting intimacy, exploring together, romantic gifting | Confusion regarding product safety, fear of awkward household delivery |
| **The Curious Beginner** | Young adults (18–25), College/Young professionals | Curiosity, guided recommendation, affordable entry bundles | Zero prior knowledge, fear of ordering wrong product, panic if someone enters room |

---

## 7. Product Scope & Boundaries (V1 vs Future Releases)

### 🟢 In-Scope for Version 1 (V1 MVP)
1. **Discreet Entry & Browsing Engine:**
   * 18+ Age Verification modal (non-blocking for SEO bots, persistent 30-day cookie).
   * Floating "Quick Exit / Panic Button" rendering **Discreet Camouflage Mode** (client-side decoy lifestyle/productivity blog with zero network lag).
2. **Curated Catalog & Medical Badges:**
   * Filterable catalog by category (Solo Female, Couples, Solo Male, Lubes & Cleaners, Starter Kits).
   * Verified badges on PDPs: 100% Medical-Grade Silicone, Phthalate-Free, IPX7 Waterproof, Noise Level (<50dB), USB Rechargeable.
   * Educational hygiene and care guides on every product page.
3. **Interactive Toy Finder Quiz:**
   * 3-question guided anonymous quiz with 1-click cart addition of recommended starter kits.
4. **Progressive Identity & Account Management:**
   * Multi-channel OTP login/registration (SMS/WhatsApp/Email) with mandatory Date of Birth (DOB) validation (Age ≥ 18).
   * Saved addresses, order tracking, and dispute/warranty history.
5. **Anti-RTO Cart & Checkout Engine:**
   * 30-minute stock reservation hold on pending payments.
   * Instant 5% prepaid discount nudge for UPI / Cards / NetBanking.
   * Flat ₹50 convenience fee on Cash on Delivery (COD) + mandatory checkout OTP.
   * Address auto-fill via Indian PIN codes.
6. **Neutral Operations & Fulfillment:**
   * Merchant entity name locked to **"Aura Retail & Lifestyle"** across payment gateways, invoices, SMS, and courier AWBs (category declared as "Personal Grooming & Wellness Kits").
   * Tamper-evident, unbranded plain brown cardboard packaging specification.
7. **Post-Purchase & Warranty Workflow:**
   * Live neutral tracking portal.
   * 24-Hour Dead-on-Arrival (DOA) / Motor Defect claim portal with direct video upload to secure cloud storage.
   * Human admin review portal for claim approval and automatic Store Credit Voucher generation.
8. **Discreet Customer Care & AI Assistant:**
   * 24/7 AI Wellness Chatbot for product care, sizing, and hygiene FAQs (with strict medical disclaimer).
   * Dedicated email ticketing desk for escalations (zero unsolicited outbound phone calls).
9. **Back-Office Portals:**
   * Store Admin dashboard for multi-brand inventory management, stock threshold alerts, and COD order review.
   * Super Admin dashboard for financial BI metrics (Prepaid vs COD ratio, RTO tracking, GMV).

### 🔴 Explicitly Out-of-Scope for Version 1 (Deferred)
* **Native Mobile Apps (iOS/Android):** Deferred to v3 due to Apple/Google app store adult content restrictions and device app-icon privacy risks.
* **Open Multi-Vendor Marketplace:** V1 will run strictly as a direct-inventory / curated multi-brand model to guarantee product authenticity and packaging quality.
* **Cryptocurrency / Web3 Payments:** INR UPI and standard digital payments cover 99%+ of the target audience; crypto adds unnecessary tax/compliance complexity.
* **Telehealth Video Consultations:** Live doctor/sexologist video consultations deferred to a future medical expansion phase.
* **Public Unverified User Reviews:** Community review platform deferred to v2 to prevent vulgar, fake, or unmoderated content.

---

## 8. High-Level Architecture Overview

System ek **Modular Monolithic Web Application** ke roop mein build hoga, jo deployment complexity ko minimum aur performance ko maximum rakhega.

```mermaid
graph TD
    User["👤 Customer Browser (Mobile/Desktop)"]
    AdminUser["👨‍💼 Admin & Support Team"]

    subgraph CDN & Edge Layer
        CF["Cloudflare Edge (WAF, SSL, DDoS, Caching)"]
    end

    subgraph Core Application (Next.js Modular Monolith)
        Storefront["🎨 Responsive Storefront (SSR / App Router)"]
        CamouflageEngine["🛡️ In-Memory Decoy Camouflage Engine"]
        AdminDashboard["📊 Back-Office & Support Helpdesk"]
        
        subgraph Modular Services
            AuthService["🔐 Auth & Progressive Account (DOB 18+)"]
            CatalogService["📦 Curated Catalog & Medical Badges"]
            CartService["🛒 Cart & 30-Min Reservation Hold"]
            CheckoutService["💳 Anti-RTO Checkout (Prepaid / ₹50 COD)"]
            WarrantyService["📹 24-Hr DOA Claim & Video Handler"]
            AIService["🤖 AI Wellness Bot (RAG / Care FAQs)"]
        end
    end

    subgraph Data & Storage Layer
        PrimaryDB[("🐘 PostgreSQL (Orders, Users, Catalog, Claims)")]
        CacheQueue[("⚡ Redis (Sessions, Rate-Limits, 30-min Stock Locks)")]
        MediaStorage[("☁️ Object Storage S3/R2 (Product Assets & Unboxing Videos)")]
    end

    subgraph External Partner Integrations
        PG["💳 Payment Gateway (Cashfree / PhonePe / Razorpay)"]
        Logistics["🚚 3PL Logistics (Shiprocket / Delhivery)"]
        Messaging["💬 OTP & Neutral Alerts (MSG91 / WhatsApp / Resend)"]
        LLM["🧠 AI Provider (OpenAI / Gemini API)"]
    end

    User --> CF
    AdminUser --> CF
    CF --> Storefront
    CF --> AdminDashboard
    
    Storefront --> CamouflageEngine
    Storefront --> AuthService
    Storefront --> CatalogService
    Storefront --> CartService
    Storefront --> CheckoutService
    Storefront --> WarrantyService
    Storefront --> AIService

    AuthService --> PrimaryDB
    CatalogService --> PrimaryDB
    CartService --> CacheQueue
    CheckoutService --> PrimaryDB
    WarrantyService --> MediaStorage
    
    CheckoutService --> PG
    CheckoutService --> Logistics
    AuthService --> Messaging
    AIService --> LLM
```

---

## 9. Major Constraints & Guardrails

1. **Legal & Regulatory Compliance (India):**
   * Products must be marketed strictly as personal wellness, massagers, and intimate hygiene products—avoiding any vulgar or legally obscene marketing under Section 292 of IPC / Section 67 IT Act.
   * All buyers must be legally adults (DOB validation ≥ 18 years mandatory).
   * Lubricants and wash consumables must carry necessary cosmetic/Ayush/FDA approvals.
2. **Payment Aggregator Guardrails:**
   * Payment gateways in India restrict explicit adult content. Store branding, product naming, and merchant categorization must strictly remain under personal grooming, massagers, and lifestyle self-care under the entity **"Aura Retail & Lifestyle"**.
3. **Logistics & Delivery Constraints:**
   * Zero product disclosure on shipping waybills (AWBs). Labels will state: "Personal Grooming & Wellness Kits".
   * Strict tamper-evident brown box packaging without outer logos.
4. **Strict Hygiene Policy:**
   * Opened intimate wellness products cannot be returned or restocked under any circumstance due to hygiene and health safety.

---

## 10. Working Assumptions Register

| Assumption ID | Working Assumption | Affected Module | Risk if Invalid | Validation Plan | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **ASM-01** | Flat ₹50 COD surcharge frivolous COD orders ko 70%+ kam karega bina checkout abandonment badhaye. | Checkout & Cart | Agar drop-off zyada hua toh sales affect hongi. | Pilot launch mein ₹50 vs ₹0 (with mandatory OTP) ka A/B test monitor karna. | **Proposed—confirmation pending** |
| **ASM-02** | Customers DOA motor defects ke liye smartphone se 30–60 second unboxing video record karke upload kar sakte hain (<50MB). | Warranty Claim Portal | Customer frustration agar video upload fail ho slow network par. | Client-side video compression aur direct-to-cloud signed upload implement karna. | **Proposed—confirmation pending** |
| **ASM-03** | Indian courier delivery agents neutral parcel instructions ("Do not call family/flatmates, call only on reaching location") follow karenge. | Logistics Integration | Delivery agent ghar par awkward call kar de. | Shiprocket/Delhivery dispatch notes mein automated standard courier delivery instructions transmit karna. | **Proposed—confirmation pending** |
| **ASM-04** | SMS ki tulna mein WhatsApp OTP delivery rates Tier-1/Tier-2 users ke liye significantly higher (>95%) aur faster hain. | Auth & Verification Engine | High drop-off agar SMS deliver na ho. | Multi-channel fallback (WhatsApp primary, SMS secondary fallback). | **Proposed—confirmation pending** |

---

## 11. Risk Matrix & Mitigation Strategies

| Risk ID | Description & Impact | Severity / Likelihood | Proposed Mitigation Strategy | Status |
| :--- | :--- | :--- | :--- | :--- |
| **RSK-01** | **Payment Gateway Account Suspension:** Aggregator intimate wellness catalog ko policy violation maan kar freeze kar de. | **High / Medium** | Neutral merchant descriptor ("Aura Retail & Lifestyle"), clean medical aesthetic, zero explicit imagery, pre-approval of product categories with Cashfree/PhonePe prior to launch, aur multi-gateway failover setup. | **Mitigated in Design** |
| **RSK-02** | **High COD Return-to-Origin (RTO):** Sharam ya buyer regret ki wajah se doorstep rejection. | **High / High** | 3-tier barrier: Mandatory ₹50 COD surcharge, instant 5% prepaid discount nudge, aur mandatory checkout phone OTP confirmation. | **Mitigated in Design** |
| **RSK-03** | **Customer Privacy Leak at Doorstep:** Courier packaging damage ya label reveal hone se customer breach feel kare. | **Critical / Low** | Standardized 3-ply corrugated plain brown boxes, opaque security tape, and neutral sender labels strictly enforced at the warehouse fulfillment stage. | **Mitigated in Design** |
| **RSK-04** | **Medical Liability from AI Chatbot Advice:** User chatbot se injury ya infection query poochhe aur bot galat medical advice de de. | **High / Low** | Strict system prompt guardrails: AI bot must output bold medical disclaimer on health queries, refuse diagnostic advice, and point to curated care guides or professional medical help. | **Mitigated in Design** |
| **RSK-05** | **Zero Paid Advertising (Customer Acquisition Bottleneck):** Google and Meta ad bans preventing standard digital ad scaling. | **High / High** | Architecture built from Day 1 for programmatic SEO, comprehensive wellness guides, structured schema markup, and affiliate/creator partnerships. | **Mitigated in Design** |

---

## 12. Open Questions & Pending Confirmations

* [ ] **OQ-01 (Payment Gateway Finalization):** Cashfree vs PhonePe vs Razorpay—Kisme lowest transaction fee aur adult wellness categories ke liye guaranteed smooth merchant onboarding mil rahi hai? *(Target Owner: Platform Owner / Tech Lead)*
* [ ] **OQ-02 (Logistics API Selection):** Kya Shiprocket multi-courier aggregator model V1 ke liye best hai, ya direct Delhivery API integration better privacy/discreet handling guarantee karta hai? *(Target Owner: Operations Lead)*
* [ ] **OQ-03 (Doorstep Delivery OTP):** Kya COD deliveries ke liye doorstep courier delivery OTP mandate kiya jaye taaki parcel sirf actual buyer ke haath mein deliver ho? *(Target Owner: Product / Ops Lead)*

---

## 13. Related Documents / Dependencies

Agla workflow tabhi shuru hoga jab yeh Master Planning document review hokar **Green Light** receive karega. Is document ke approved decisions in agle documents ke foundation banenge:
* `Document 02: Architecture` *(Next in line)*
* `Document 03: Tech Stack`
* `Document 04: Database Design`
* `Document 05: Authentication & Authorization`
* `Document 06: Security Plan`
* `Document 07: Third-party Services & Integrations`
* `Document 08: Folder Structure & Coding Standards`
* `Document 09: Environments`
* `Document 10: Git & Version Control Strategy`
* `Document 11: Performance & Scalability`
* `Document 12: Testing Strategy`
* `Document 13: Deployment & DevOps Plan`
* `Document 14: Monitoring & Logging`
* `Document 15: API Design`

---

## 14. Sources & Research Context

1. **The Indian Penal Code, 1860 (Section 292) & Information Technology Act, 2000 (Section 67):** Regulatory framework governing obscenity vs personal wellness, adult novelty classification in India.
2. **Indian D2C E-Commerce Logistics Benchmarks (2024–2026):** COD Return to Origin (RTO) averages across sensitive lifestyle goods and the impact of ₹50 convenience fees on prepaid conversion.
3. **Payment Aggregator Guidelines (RBI & Merchant Category Codes):** MCC guidelines for personal care, massagers, and personal grooming lifestyle products.

---

## 15. Review Checklist (Aapke Approval ke Liye Key Points)

Kripya is draft ko review karein aur in key points par feedback ya confirmation dein:

- [ ] **1. High-Level Vision & Scope:** Kya V1 ki boundaries (in-scope vs out-of-scope) aur target audience framing aapke vision ke mutabiq sahi hain?
- [ ] **2. Progressive Account + DOB Verification:** Kya checkout ke dauran progressive account creation (phone OTP + mandatory DOB verification for 18+) approved hai?
- [ ] **3. Anti-RTO Economics:** Kya ₹50 COD convenience surcharge + 5% prepaid discount incentive model confirmed hai?
- [ ] **4. Discreet Camouflage Mode:** Kya client-side instant decoy lifestyle blog rendering panic button ka primary behavior confirmed hai?
- [ ] **5. Architecture Style:** Kya Next.js Modular Monolith approach V1 ke liye approved hai?
