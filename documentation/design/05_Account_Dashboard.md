# 👤 05: Account Dashboard Blueprint

> **Design Objective:**  
> A clean, streamlined **Standard Profile Hub** structured around 4 fundamental pillars: **My Orders**, **Saved Addresses**, **Edit Profile**, and **Logout**. Delivers essential e-commerce management while upholding discreet billing and tracking standards.

---

## 📐 Wireframe & Dashboard Layout

```
+-----------------------------------------------------------------------------------+
| GLOBAL HEADER (Search, Account, Cart Drawer, Announcement Bar)                    |
+-----------------------------------------------------------------------------------+
| Account Hub: Welcome back, Alex! (+91 98765 43210)                                |
+-----------------------------------------------------------------------------------+
| [ LEFT NAVIGATION TABS ]       | [ RIGHT CONTENT PANE: ACTIVE MODULE ]             |
|                                |                                                   |
|  📦 My Orders (3)              |  📦 MY ORDERS                                     |
|  🏠 Saved Addresses (2)        |                                                   |
|  👤 Edit Profile               |  +---------------------------------------------+  |
|  🚪 Logout                     |  | Order #BDT-89241 • Placed on 28 Oct 2026        |  |
|                                |  | Status: 🚚 IN TRANSIT (Expected Tomorrow)   |  |
|                                |  | Items:                                      |  |
|                                |  | - Aura Velvet Pulse Massager (Plum) x 1     |  |
|                                |  | - Organic Aloe Lube (50ml) x 1              |  |
|                                |  | Total Paid: ₹3,228 (Prepaid UPI)            |  |
|                                |  |                                             |  |
|                                |  | [ Track Blind Waybill ]                     |  |
|                                |  | [ Download Discreet Invoice PDF ]           |  |
|                                |  | [ Need Help / 48h Video DOA Claim ]         |  |
|                                |  +---------------------------------------------+  |
|                                |                                                   |
|                                |  +---------------------------------------------+  |
|                                |  | Order #BDT-84112 • Placed on 12 Sep 2026        |  |
|                                |  | Status: ✅ DELIVERED                        |  |
|                                |  | Items: Pure Silk Duo Kit x 1                |  |
|                                |  | Total Paid: ₹4,199                          |  |
|                                |  | [ Download Discreet Invoice PDF ]           |  |
|                                |  +---------------------------------------------+  |
+-----------------------------------------------------------------------------------+
| FOOTER & FLOATING QUICK EXIT BUTTON                                               |
+-----------------------------------------------------------------------------------+
```

---

## 📂 Detailed Sub-Modules

### 1. My Orders (`/account/orders`)
* **Order History Cards:** Clean chronological list of all orders placed under the customer's phone number.
* **Key Actions on Each Order Card:**
  1. **Track Blind Waybill:** Opens a popup or routes to live courier tracking. Shows transit milestones (Dispatched -> Out for Delivery -> Delivered) with shipper named as *"B-Dot Logistics Hub"*.
  2. **Discreet Invoice Download:** Generates a formal GST tax invoice PDF with neutral legal entity details:
     * *Company:* B-Dot Technologies Private Limited.
     * *Line Items:* "Electronic Massager Device (HSN 9019)" / "Personal Care Lubricant (HSN 3304)".
     * Zero explicit branding or adult keywords.
  3. **48-Hour Video DOA Warranty Claim:** If the order was delivered within the past 48 hours, an action button lets the user upload a brief unboxing clip showing a defect to request an immediate free replacement.

---

### 2. Saved Addresses (`/account/addresses`)
```
+-------------------------------------------------------------+
| 🏠 SAVED ADDRESSES                                          |
|                                                             |
| +-----------------------------+ +-------------------------+ |
| | [DEFAULT] Home              | | Alternate / Work        | |
| | Alex Doe                    | | Alex Doe                | |
| | Flat 402, Green Apts        | | WeWork Galaxy, 4th Fl   | |
| | Koramangala, Bengaluru      | | Residency Rd, Bengaluru | |
| | Pincode: 560001             | | Pincode: 560025         | |
| | Phone: +91 98765 43210      | | Phone: +91 98765 43210  | |
| | Note: "Leave with security" | | Note: "Call upon arrival| |
| |                             | |                         | |
| | [ Edit ]    [ Delete ]      | | [ Make Default ] [Edit] | |
| +-----------------------------+ +-------------------------+ |
|                                                             |
| [ + Add New Delivery Address ]                              |
+-------------------------------------------------------------+
```
* Allows customers to store multiple drop locations with pre-configured delivery preferences.
* Quick Add / Edit Address form with auto-city/state lookup via pincode.

---

### 3. Edit Profile (`/account/profile`)
```
+-------------------------------------------------------------+
| 👤 EDIT PROFILE DETAILS                                     |
|                                                             |
| Full Name:      [ Alex Doe                              ]   |
| Mobile Number:  [ +91 98765 43210 ] (✅ OTP Verified)       |
| Email Address:  [ alex.doe@example.com                  ]   |
|                 *(Used strictly for sending tax receipts)*  |
|                                                             |
| [ Save Profile Changes ]                                    |
+-------------------------------------------------------------+
```
* **Frictionless Security:** Account identity is tied to the verified mobile phone. No password vulnerabilities or complicated security questions.

---

### 4. Secure 1-Click Logout
* **Action:** Clicking `Logout` clears session tokens, purges cached local cart data, and returns the visitor immediately to the clean homepage.
