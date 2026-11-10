---
title: Roles and Permissions (RBAC Matrix)
phase: Phase 2 - Features
document_id: 03_Roles_and_Permissions
last_updated: 2026-10-27
status: Confirmed
summary: Definition of system user roles, access boundaries, granular permissions matrix, and restricted administrative operations for the adult wellness marketplace.
---

# 🔐 Roles & Permissions: Discreet Adult Wellness & Intimate Care Platform (Aura Retail & Lifestyle)

> **Purpose:** Define exactly what each user role is permitted to see, create, edit, approve, or delete. Eliminates assumptions about authorization and guides backend middleware, API security, and database Row-Level Security (RLS).

---

## 1. System User Roles Definition
*What distinct roles exist in this system?*

| Role Identifier | Role Name | Description / Scope | Hierarchy Level |
| :--- | :--- | :--- | :--- |
| `anonymous` | Guest Visitor | Unauthenticated visitor browsing catalog post-age verification; can use Camouflage Mode and take Toy Finder Quiz | Level 0 |
| `customer` | Registered Customer | Authenticated adult buyer (DOB verified ≥ 18) who places orders, tracks shipments, and submits DOA claims | Level 1 |
| `support_agent` | Customer Support Specialist | Operational team member with full customer visibility to resolve inquiries, review DOA videos, and issue store credit | Level 2 |
| `store_admin` | Store Admin / Ops Manager | Inventory and fulfillment manager overseeing multi-brand catalog, stock alerts, COD review, and neutral AWB shipping | Level 3 |
| `super_admin` | Platform Owner | Executive authority with full access to payment gateway config, financial BI analytics, staff provisioning, and audit logs | Level 4 |

---

## 2. Granular Permissions Matrix
*What actions can each role perform across the platform?*

| Domain Area | Specific Action | Anonymous | Customer | Support Agent | Store Admin | Super Admin |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Catalog & Discovery** | Pass 18+ Age Verification | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| | Trigger Discreet Camouflage Mode | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| | Take Interactive Toy Finder Quiz | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| | View Medical Badges & Care Guides | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| | Create / Edit Product Listings | ❌ No | ❌ No | ❌ No | ✅ Yes | ✅ Yes |
| | Assign Medical Badges & Certifications | ❌ No | ❌ No | ❌ No | ✅ Yes | ✅ Yes |
| | Adjust Inventory Counts & Stock Alerts | ❌ No | ❌ No | ❌ No | ✅ Yes | ✅ Yes |
| **Identity & Access** | Create Mandatory Account (DOB ≥ 18) | ✅ Yes | ❌ No | ❌ No | ❌ No | ❌ No |
| | Multi-Channel OTP Login (SMS/Email/WhatsApp)| ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| | Edit Own Profile & Delivery Addresses | ❌ No | ✅ (Own) | ❌ No | ❌ No | ❌ No |
| | Create Staff Accounts (Support / Admin) | ❌ No | ❌ No | ❌ No | ❌ No | ✅ Yes |
| | Suspend or Deactivate Customer Account | ❌ No | ❌ No | ❌ No | ✅ Yes | ✅ Yes |
| **Cart & Transactions** | Add Items to Cart & View Bundles | ✅ Yes | ✅ Yes | ❌ No | ❌ No | ❌ No |
| | Trigger 30-Minute Reservation Hold | ❌ No | ✅ (Own) | ❌ No | ❌ No | ❌ No |
| | Place Order (Prepaid Discount / ₹50 COD)| ❌ No | ✅ (Own) | ❌ No | ❌ No | ❌ No |
| | Switch Failed Payment to COD | ❌ No | ✅ (Own) | ❌ No | ❌ No | ❌ No |
| | Cancel Order Before Courier Handover | ❌ No | ✅ (Own) | ✅ Yes | ✅ Yes | ✅ Yes |
| **Fulfillment & Logistics** | View Neutral Tracking ("Aura Lifestyle") | ❌ No | ✅ (Own) | ✅ Yes | ✅ Yes | ✅ Yes |
| | Generate Neutral Courier AWB Label | ❌ No | ❌ No | ❌ No | ✅ Yes | ✅ Yes |
| | Review COD Orders & Risk Signals | ❌ No | ❌ No | ✅ Yes | ✅ Yes | ✅ Yes |
| | Mark Order Dispatched / Delivered | ❌ No | ❌ No | ❌ No | ✅ (Webhook/API) | ✅ Yes |
| **Warranty & Returns** | Upload 24-Hour DOA Unboxing Video | ❌ No | ✅ (Own) | ❌ No | ❌ No | ❌ No |
| | Review & Inspect Customer Unboxing Video| ❌ No | ❌ No | ✅ Yes | ✅ Yes | ✅ Yes |
| | Approve Replacement Dispatch | ❌ No | ❌ No | ✅ Yes | ✅ Yes | ✅ Yes |
| | Issue Store Credit Voucher (Out-of-Stock)| ❌ No | ❌ No | ✅ Yes | ✅ Yes | ✅ Yes |
| | Authorize Physical Restocking of Used Toys| ❌ No | ❌ No | ❌ Strictly Prohibited | ❌ Strictly Prohibited | ❌ Strictly Prohibited |
| **Support & AI Bot** | Chat with AI Wellness Bot | ✅ Yes | ✅ Yes | ❌ No | ❌ No | ❌ No |
| | View Full Customer PII (Name, Phone, Address)| ❌ No | ✅ (Own) | ✅ Yes (Full) | ✅ Yes (Full) | ✅ Yes (Full) |
| | Send Neutral Transactional Email / Ticket| ❌ No | ❌ No | ✅ Yes | ✅ Yes | ✅ Yes |
| | Trigger Unsolicited Telecalling to Buyer | ❌ No | ❌ No | ❌ Strictly Prohibited | ❌ Strictly Prohibited | ❌ Strictly Prohibited |
| **Analytics & Config** | View GMV, RTO & Prepaid Ratio Reports | ❌ No | ❌ No | ❌ No | ✅ (Ops only) | ✅ Yes |
| | Configure Payment Gateway & Billing Descriptor| ❌ No | ❌ No | ❌ No | ❌ No | ✅ Yes |
| | View Staff Activity & Security Audit Logs | ❌ No | ❌ No | ❌ No | ❌ No | ✅ Yes |

---

## 3. Data Access & Boundary Rules
*Which specific records can each role query, read, or export?*

### Customer Data Scope
- **Ownership Boundary:** A customer can query only records associated with their own `customer_id` (orders, addresses, warranty claims, store credit balance).
- **Masking:** Internal administrative notes, inventory wholesale costs, courier margin agreements, and other customers' data are completely hidden.
- **Session Privacy:** Customers cannot access order tracking records of any other user.

### Customer Support Specialist Data Scope
- **Full Operational Visibility:** As confirmed during feature design, Support Specialists have full, unmasked visibility to Customer Name, Mobile Number, Delivery Address, and Order Line Items within the support helpdesk. This is required for fast verification, delivery coordination, and empathetic dispute handling.
- **Financial Boundary:** Support staff cannot view payment gateway merchant credentials, profit margins, or banking settlement accounts.
- **Read-Only Inventory:** Can check stock levels to confirm replacement availability, but cannot modify product prices or catalog descriptions.

### Store Admin / Operations Manager Data Scope
- **Fulfillment & Inventory:** Complete access to catalog inventory, warehouse stock, supplier details, Shiprocket/Delhivery AWB statuses, and COD risk metrics.
- **Order Modification:** Can modify shipping addresses prior to courier pickup, cancel flagged fraudulent COD orders, and reassign stock.
- **Audit Logging:** Every administrative order change, cancellation, or manual status override is immutably recorded with staff user ID and timestamp.

### Super Admin Data Scope
- **Unrestricted System Governance:** Unrestricted read/write access across all database tables, Cloudflare CDN configs, Redis cache stores, and payment gateway keys.
- **Compliance & Security:** Only role authorized to export customer data for legal compliance, view access audit logs, or configure neutral billing statement descriptors.

---

## 4. Restricted Actions & Approval Gates
*Actions that require elevated permissions or multi-step approval:*

1. **Hygiene Policy Restock Prohibition (Strict Anti-Restock Gate):**
   - No user role (including `super_admin`) possesses the system authority to flag a returned or claimed intimate wellness toy as "Restocked" or "Return to Inventory". Defective items must be disposed of; inventory can only increase via verified brand supplier batch receipts.
2. **24-Hour DOA Video Claim Approval:**
   - System strictly requires human review (`support_agent` or `store_admin`) to approve or reject a customer unboxing video before any replacement order or store credit voucher is created. No automated AI approval is permitted.
3. **Store Credit Voucher Generation:**
   - Vouchers can only be issued by authorized support or admin staff when an approved defective SKU is confirmed out of stock, capped at 100% of the original product purchase value.
4. **Outbound Phone Call Ban:**
   - All customer communications must be digital (neutral SMS, WhatsApp, or Email). Placing direct outbound unsolicited voice calls to buyers is an explicit policy violation tracked under staff conduct guidelines.
5. **Payment Gateway & Neutral Descriptor Alterations:**
   - Any modification to the Razorpay/Cashfree merchant descriptor ("Aura Retail & Lifestyle") requires 2-factor authentication (2FA) and is restricted solely to `super_admin`.

---

## 5. Decision Log & Open Questions

- **Confirmed in Interview:** Full Visibility granted to `support_agent` and `store_admin` for customer PII (Name, Phone, Delivery Address, Items) to optimize fast customer dispute resolution.
- **Confirmed in Interview:** Age gate verified permanently at registration via mandatory DOB check (`age >= 18`).
- **Confirmed in Interview:** 24-hour DOA claim requires human Admin review and approval before dispatching replacements or store credit.
- **Confirmed in Interview:** Zero unsolicited phone calls allowed across all staff roles.
- **Open / Future Enhancement:** Biometric or hardware 2FA (WebAuthn/Passkeys) for Super Admin login to be evaluated in Phase 4.
