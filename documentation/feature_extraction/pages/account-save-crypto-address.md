# Page Blueprint: Save Crypto Address

---

## 1. Page Overview
- **Screen Name:** Save Crypto Address (Trusted Addresses & Allowlist)
- **Stitch Screen ID:** `33113ac089c249d5ad68524479992600`
- **Core Purpose:** Customer ke cryptocurrency withdrawal aur Web3 payment wallet addresses ka high-security allowlist/whitelist management interface. Isme network-wise grouping (Ethereum ERC-20, Bitcoin BTC, Solana SPL, Polkadot Substrate, USDT TRC-20, BNB Smart Chain), allowlisting master toggle with `Active Protection` tag, destination addresses with copyable truncated hashes, aur an in-depth `Add New Crypto Address` form with clipboard paste helper, memo/destination tag, aur 24-hour cooling-off security lock shamil hain.
- **Entry Point / Navigation Route:** Account Dashboard left sidebar link "Save Crypto address" (`/account/payments/crypto`), ya checkout payment page par Crypto wallet configuration link.
- **Shared Components Used:**
  - Header & Global Navigation: [navigation.md](../shared/navigation.md)
  - Footer & Brand Links: [footer.md](../shared/footer.md)

---

## 2. Layout aur Sections (Top to Bottom)

### Section 1: Global Navigation Header (Shared Component)
- **Reference:** Dekhein [navigation.md](../shared/navigation.md)
- **Short Purpose:** Persistent top utility navigation header.

### Section 2: Account Split Layout (`MainContent`)
Split 2-column layout:
- **Left Column (4/12 grid span): Universal Account Navigation Sidebar (`LeftSidebar`)**
- **Right Column (8/12 grid span): Crypto Addresses Hub & Whitelist Form (`RightProfileContent`)**

#### 2.1 Left Column: Universal Account Navigation Sidebar (`LeftSidebar`)
- **Active Navigation Item:** `PAYMENTS` category me `Save Crypto address` active highlighted state me hai.
- **All Sidebar Links:** Profile summary, `Edit profile`, `Manage address`, `Gift Cards`, `Save UPI`, `Save Card`, `Save Crypto address` (Active), `Two-Factor Auth`, `Change password`, `Change Email`, `Reviews`, `Q&A`, `Policies`, and `Logout`.

#### 2.2 Right Column: Crypto Addresses Management (`RightProfileContent`)

##### View 1: Trusted Addresses List & Allowlist Settings (`Address List View Container`)
- **Header Section:**
  - Headline (`h1`): `Trusted addresses` (`text-xl font-bold text-slate-800`).
  - Subtitle: `Whitelist wallets for secure transfers`.
- **Allowlisting Master Toggle Banner (`Address book allowlist`):**
  - Section Title (`h2`): `Address book allowlist`.
  - Informational Disclaimer: `"This is a list of cryptocurrency addresses that you have approved to receive your funds. Important note: Each address is specific to its asset type. Sending Bitcoin to an Ethereum address, for example, will result in loss of funds. Learn more →"`
  - Allowlist Switch Control:
    - Label: `Turn allowlisting`
    - Toggle Status Badge: `Active Protection` (emerald green badge).
    - Interactive Switch: Toggle slider.
- **Network Grouped Addresses Container:**

  ##### Group 1: Ethereum Network (ERC-20) — `2 Addresses`
  - Item 1: Asset `Acala ACA` | Label `Main Wallet` | Masked Address `1A1zP...mv7Di` | Timestamp `added 5m ago`.
  - Item 2: Asset `Flow FLOW` | Label `Binance Vault` | Masked Address `bnb1g...7y6g0` | Timestamp `added 3d ago`.

  ##### Group 2: Bitcoin Network (BTC) — `1 Address`
  - Item 1: Asset `Bitcoin BTC` | Label `Main Wallet` | Masked Address `1A1zP...mv7Di` | Timestamp `added 5m ago`.

  ##### Group 3: Solana Network (SPL) — `1 Address`
  - Item 1: Asset `Solana SOL` | Label `Main Wallet` | Masked Address `1A1zP...mv7Di` | Timestamp `added 5m ago`.

  ##### Group 4: Polkadot / Substrate Network — `2 Addresses`
  - Item 1: Asset `Acala ACA` | Label `Main Wallet` | Masked Address `1A1zP...mv7Di` | Timestamp `added 5m ago`.
  - Item 2: Asset `Flow FLOW` | Label `Binance Vault` | Masked Address `bnb1g...7y6g0` | Timestamp `added 3d ago`.

- **Action Footer Strip:**
  - Primary Action Button: `Add address` (`+ Add address` button with `#14cda8` mint-green background).
  - Summary Metric: `Total 6 addresses whitelisted`.

##### View 2: Add New Crypto Address Form View (`Add New Crypto Address Form View`)
- **Top Bar:**
  - Back Navigation: `← Back to Trusted Addresses` link.
  - Security Badge: `24h Safety Lock Active` (amber/emerald badge).
- **Header:**
  - Headline (`h2`): `Add New Crypto Address`.
  - Subtitle: `Whitelist a destination address for faster, secure withdrawals`.
- **Security Cooling-Off Warning Banner:**
  - Info Icon (`fa-solid fa-circle-info`).
  - Text: `"Please verify your destination address carefully. For security reasons, newly added addresses will undergo a standard 24-hour cooling-off safety lock period before withdrawals are enabled."`
- **Form Inputs:**
  - **Field 1: Asset / Network Selector \*:**
    - Label: `Select Asset / Network *`
    - Dropdown Options:
      - `Choose Network / Asset...`
      - `Ethereum (ERC-20)`
      - `Bitcoin (BTC)`
      - `Solana (SPL)`
      - `Polkadot / Substrate`
      - `USDT (TRC-20)`
      - `BNB Smart Chain (BEP-20)`
  - **Field 2: Wallet Label / Nickname \*:**
    - Label: `Wallet Label / Nickname *`
    - Input: Text field, placeholder: `e.g. My Ledger Cold Storage`.
    - Helper Note: `A recognizable label to identify this address in your list.`
  - **Field 3: Destination Address \*:**
    - Label: `Destination Address *`
    - Input Container: Monospace text field with right-aligned `Paste` button helper (`px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded`).
  - **Field 4: Tag / Memo (Optional):**
    - Label: `Tag / Memo (Optional)`
    - Input: Text/numeric field, placeholder: `Memo / Destination Tag`.
    - Helper Note: `Optional destination tag or memo if required by the receiving platform.`
- **Form Actions Bar:**
  - Secondary Action: `Cancel` (white outline button).
  - Primary Action: `Save & Whitelist Address` (mint-green button `bg-[#14cda8] hover:bg-[#11b896] text-slate-900 font-bold px-6 py-2.5 rounded-lg text-xs`).

### Section 3: Global Site Footer (Shared Component)
- **Reference:** Dekhein [footer.md](../shared/footer.md)
- **Short Purpose:** Global footer with legal policies and community links.

---

## 3. Options aur Sub-options
- **Allowlisting Toggle:**
  - `Turn allowlisting` ON (Active Protection) / OFF
- **Supported Crypto Networks & Assets:**
  - `Ethereum (ERC-20)`
  - `Bitcoin (BTC)`
  - `Solana (SPL)`
  - `Polkadot / Substrate`
  - `USDT (TRC-20)`
  - `BNB Smart Chain (BEP-20)`
- **Address Actions:**
  - Copy Address to clipboard
  - Delete / remove whitelisted address
  - View Explorer transaction / address link

---

## 4. Interactions aur Navigation
- `[Turn allowlisting Toggle]` → Click → Toggles whitelist security requirement for withdrawals (requires 2FA authorization if enabled)
- `[Add address Button]` → Click → Toggles address list view to reveal `Add New Crypto Address Form`
- `[← Back to Trusted Addresses Link]` → Click → Reverts view back to whitelisted addresses list
- `[Paste Button in Destination Address field]` → Click → Reads user system clipboard via Clipboard API and pre-fills address input
- `[Select Asset / Network Dropdown]` → Change → Dynamically adjusts address regex validation pattern (e.g. `0x...` for Ethereum, `1...` or `bc1...` for Bitcoin, base58 for Solana)
- `[Save & Whitelist Address Button]` → Click → Validates blockchain address format, initiates 2FA challenge, schedules 24h cooling-off lock, saves to address book
- `[Copy Address Icon]` → Click → Copies truncated public address to clipboard with confirmation toast

---

## 5. Content aur Data Classification

| Element / Field | Data Type | Example Value Shown in Design | Notes & Source Confirmation |
| :--- | :--- | :--- | :--- |
| **Whitelisted Total** | System Metric | `Total 6 addresses whitelisted` | Aggregate count of approved wallets |
| **Asset Name** | Crypto Taxonomy | `Acala ACA`, `Flow FLOW`, `Bitcoin BTC`, `Solana SOL` | Crypto token identifier |
| **Network Protocol** | Blockchain Protocol | `ERC-20`, `BTC`, `SPL`, `Substrate`, `TRC-20` | Transfer network rail |
| **Wallet Label** | User Custom String | `Main Wallet`, `Binance Vault` | User chosen nickname |
| **Public Address** | Cryptographic Public Key| `1A1zP...mv7Di`, `bnb1g...7y6g0` | Masked blockchain address |
| **Added Timestamp** | Historical String | `added 5m ago`, `added 3d ago` | Relative creation time |
| **Destination Tag/Memo**| Optional Transfer Key | Text string | Exchange routing identifier |

---

## 6. States aur Variations
- **View States:**
  - View 1: `Address List View Container` visible.
  - View 2: `Add New Crypto Address Form View` visible.
- **Cooling-Off Lock State:** Newly saved address shows locked icon with countdown: `Lock active (23h 45m remaining)`.
- **Network Regex Validation:** Invalid address formats display inline red validation error (e.g. "Invalid ERC-20 address length").
- **Empty State:** Design mein specified nahi (current state displays 6 active addresses).

---

## 7. Visual & Styling Notes
- **Color Accents:**
  - Mint Action: `#14cda8` (Add address, Save button)
  - Active Protection Green: `#059669` (Emerald tag)
  - Security Warning Amber: `#d97706` (24h Safety Lock badge)
  - Canvas Neutral: `#FAF4F4`
  - Card Surfaces: Pure white `#ffffff` with subtle borders
- **Typography:** `Plus Jakarta Sans` with monospace font (`font-mono`) for alphanumeric blockchain addresses.
- **Border Radius:** `rounded-xl` for network groupings, `rounded-lg` for inputs and buttons.

---

## 8. Confirm Karna Baaki (Gaps & Questions)
1. **2FA Mandatory Challenge on New Address:** 24-hour cooling lock ke alawa kya new address save karte waqt SMS/Email OTP ya Authenticator 2FA verify karna mandatory hoga?
2. **Blockchain Explorer Deep Link:** Address card par click karne se kya Etherscan / Solscan explorer par direct redirect hona chahiye?
3. **Whitelisted-Only Enforced Mode:** Agar allowlisting toggle ON ho, toh kya checkout/withdrawal me non-whitelisted addresses par funds send karna completely block hoga?
