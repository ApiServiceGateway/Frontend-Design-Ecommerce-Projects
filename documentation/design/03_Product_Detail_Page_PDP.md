# 💎 03: Product Detail Page (PDP) Blueprint

> **Design Objective:**  
> High-Trust Conversion Engine. Address all intimate purchase anxieties (fear of exposure, noisy operation, unhygienic materials, fear of receiving a broken product with no return option) right beside the "Buy Now" button.

---

## 📐 Wireframe & Page Layout

```
+-----------------------------------------------------------------------------------+
| GLOBAL HEADER (Search, Account, Cart Drawer, Announcement Bar)                    |
+-----------------------------------------------------------------------------------+
| Breadcrumb: Home > For Her > Pulse Air Wave Massager                              |
+-----------------------------------------------------------------------------------+
| [ LEFT: 360° & IMAGE GALLERY ]       | [ RIGHT: PURCHASE & TRUST ACTION BOX ]      |
|                                       |                                           |
|  +---------------------------------+  |  Title: Aura Velvet Pulse Air Massager     |
|  |                                 |  |  Sub: 10 Air-Pulse Frequencies • Ultra-Soft|
|  |       [ HIGH-RES 360° / ]       |  |  Rating: ★★★★★ 4.9 (428 Verified Reviews) |
|  |       [ GALLERY IMAGE ]         |  |                                           |
|  |                                 |  |  Price: ₹2,799  ~~₹4,499~~ (Save 38%)     |
|  |  Badge: [100% Medical Silicone] |  |  Tax: Inclusive of all GST & Discreet Ship|
|  +---------------------------------+  |                                           |
|  [Thumb 1] [Thumb 2] [Thumb 3] [360°] |  Color: [ Rose Gold ● ] [ Plum ● ] [ Onyx ●]|
|                                       |                                           |
|                                       |  📍 PINCODE & DISCREET DELIVERY ESTIMATE: |
|                                       |  [ 560001 ] [ Check ]                     |
|                                       |  ✅ Delivery by Friday, Nov 3             |
|                                       |  📦 [View Plain Packaging Demo 👁️]         |
|                                       |                                           |
|                                       |  [ Qty: - 1 + ]                           |
|                                       |  [ ADD TO CART ]                          |
|                                       |  [ ⚡ BUY NOW - CASH ON DELIVERY / UPI ]  |
|                                       |                                           |
|                                       |  🛡️ 4-POINT DISCRETION BADGES:            |
|                                       |  • 📦 Blind Box (Zero product name outside)|
|                                       |  • 💳 Disguised Bank Name ("B-DOT TECH")  |
|                                       |  • 🎥 48h Video DOA Replacement Guarantee |
|                                       |  • 🤫 Whisper Quiet (<38dB sound level)   |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  🎁 FREQUENTLY BOUGHT TOGETHER (Smart Companion Bundle)                           |
|  [This Device: ₹2,799] + [Organic Aloe Lube: ₹599] + [Toy Wash Cleaner: ₹399]      |
|  Total: ₹3,797  Bundle Price: ₹3,199 (Save Extra ₹598)                            |
|  [ ☑️ Add All 3 to Cart with 1-Click ]                                             |
|                                                                                   |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  📋 DETAILED SPECIFICATIONS & HYGIENE POLICY ACCORDIONS                           |
|  [v] Technical Specs (Battery, Run Time, IPX7 Waterproofing, Decibels)            |
|  [v] Safe Body Materials (100% Phthalate-free, Non-porous Medical Silicone)       |
|  [v] How to Clean & Charge (USB Magnetic Charging Cable included)                 |
|  [v] Hygiene & Video DOA Warranty Policy:                                         |
|      - Non-returnable once opened for intimate hygiene safety.                    |
|      - Arrived damaged or not working? Upload a 10s unboxing video for instant    |
|        replacement within 48 hours without shipping back intimate goods.          |
|                                                                                   |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  ⭐ VERIFIED ANONYMOUS CUSTOMER REVIEWS                                           |
|  Overall Score: 4.9 / 5.0 (428 Ratings)                                           |
|  [ ★★★★★ 88% ] [ ★★★★☆ 9% ] [ ★★★☆☆ 2% ] [ ★★☆☆☆ 1% ] [ ★☆☆☆☆ 0% ]                |
|                                                                                   |
|  Review 1: "Super discreet! Arrived in a generic cardboard box with no hint of    |
|  what was inside. Works like a charm, virtually silent."                          |
|  - R***a S., Verified Buyer, New Delhi  ★★★★★                                    |
|                                                                                   |
+-----------------------------------------------------------------------------------+
| FOOTER & FLOATING QUICK EXIT BUTTON                                               |
+-----------------------------------------------------------------------------------+
```

---

## 🔬 Component Breakdown & Interaction Details

### 1. 360° Visual Gallery & Material Zoom
* **Visual Presentation:** 6 to 8 ultra-clean studio images showing the device in different lighting, showing the magnetic charging port, curvature, and button controls.
* **Material Purity Certification:** Overlay chip certifying `100% Medical-Grade Body-Safe Silicone` and `IPX7 Waterproof (Submersible up to 1m for 30 min)`.

### 2. Discretion Promise Micro-Modal
* Beside the pincode estimator is an interactive trigger: `[ 📦 What will my parcel look like? ]`.
* Clicking launches a small modal showcasing:
  * Exterior picture of the plain brown cardboard box.
  * Tamper-evident brown security tape.
  * Real shipping label snippet: Consignor listed as *"B-Dot Tech Logistics"*, Item description listed as *"Personal Massager / Electronics"*.

### 3. Frequently Bought Together (AOV Multiplier)
* Intimate toys require proper maintenance (water-based lubricant and antimicrobial spray).
* The bundle presents the 3 companion products pre-selected with one single CTA: `[ Add Bundle to Cart - ₹3,199 ]`.
* Drives Average Order Value (AOV) by +25% while educating the consumer on proper product care.

### 4. Transparent Hygiene & 48-Hour Video DOA Protocol
* Prominently displayed accordion tab:
  * **Hygiene Rule:** Due to medical safety and personal sanitary regulations, intimate wellness devices cannot be returned once their tamper-proof hygiene seal is broken.
  * **Buyer Protection (Video DOA):** To eliminate the risk of receiving a defective item, buyers are instructed: *"Simply record a quick 10-second video while opening your parcel and testing charging. If defective, upload it in your account or WhatsApp support for an immediate, hassle-free replacement with zero return shipping required."*

### 5. Anonymous Verified Reviews Architecture
* Reviewers' real names are masked (e.g., `A****k M.`, `Verified Purchaser`).
* Users can filter reviews by: `Verified Purchase Only`, `With Video/Photo`, or `Mentioning Packaging/Discretion`.
