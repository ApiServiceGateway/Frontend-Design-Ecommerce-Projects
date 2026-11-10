# Shared Component: Global Navigation & Header (Single Source of Truth)

---

## 1. Component Overview
- **Component Name:** Global Navigation Header
- **Type:** Global Shared Component (Desktop & Responsive Sticky Header)
- **Design Source:** Stitch Project `9995166603861659886`
- **Design Attributes:** Sticky top (`sticky top-0 z-50`), solid white background (`#ffffff`), subtle lower border (`border-[#e5e7eb]`), subtle drop shadow (`shadow-xs`).
- **Core Purpose:** Store-wide persistent brand identity, primary category routing, search discovery input, and direct access to essential user account, cart, wishlist, and notification hubs.

---

## 2. Visual Hierarchy & Layout (Left to Right)

```text
[Brand Logo] ──── [Category Navigation Links] ──── [Search Bar] ──── [Action Utility Icons]
```

### 2.1 Brand Logo
- **Element:** Text / Brand Mark Link (`<a href="#">Logo</a>`).
- **Styling:** Extra-bold (`font-extrabold`), large size (`text-3xl`), tracking tight.
- **Color Accent:** Vibrant Pink/Coral (`#ff3f6c` / `rgb(255, 63, 108)`).
- **Behavior:** Links to Home Page (`/` or Home screen).

### 2.2 Category Navigation Menu (Desktop)
Horizontal navigation bar with medium weight (`font-medium text-[15px] text-[#4B5563]`), hover state changes to black (`hover:text-black`):

| Menu Item | Icon / Indicator | Badge | Target / Destination |
| :--- | :--- | :--- | :--- |
| **Men's wear** | Down chevron (`fa-solid fa-chevron-down text-[10px] text-gray-400`) | None | Men's category PLP |
| **Women's wear** | Down chevron (`fa-solid fa-chevron-down text-[10px] text-gray-400`) | None | Women's category PLP |
| **Kid's wear** | Down chevron (`fa-solid fa-chevron-down text-[10px] text-gray-400`) | None | Kids category PLP |
| **Spotlight** | Down chevron (`fa-solid fa-chevron-down text-[10px] text-gray-400`) | None | Curated / Spotlight collections |
| **Mining** | None | `NEW` Pill Badge (`bg-[#ba1a1a] text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider`) | Mining / Style rewards page |

### 2.3 Search Field
- **Position:** Centered flexible container (`flex-1 max-w-md mx-4`).
- **Input Type:** Search text input inside a rounded capsule container.
- **Icon:** Left-aligned magnifying glass icon (`fa-solid fa-magnifying-glass text-xs text-gray-400`).
- **Input Styling:** Rounded pill (`rounded-full`), background light stone (`bg-stone-100`), hover slight darken (`hover:bg-stone-100/80`), focus state pure white (`focus:bg-white`) with border stone (`border-stone-300`).
- **Placeholder Text:** `"What you are looking for..."`
- **Data Classification:** User Search Input (Dynamic query).

### 2.4 Utility & Action Icons (Right Wing)
Container with horizontal gap (`flex items-center gap-5 text-[#4B5563]`):

| Icon / Button | Element / Graphic | Badge / Indicator | User Action | Destination / Behavior |
| :--- | :--- | :--- | :--- | :--- |
| **User Profile** | `<i class="fa-regular fa-user text-lg"></i>` | None | Click | Opens User Account Dashboard / Login Hub |
| **Shopping Cart** | `<i class="fa-solid fa-bag-shopping text-lg"></i>` | Active item counter pill (`bg-[#ff3f6c] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold`) — e.g., `2` | Click | Opens Shopping Cart & Checkout Page |
| **Wishlist** | `<i class="fa-regular fa-heart text-lg"></i>` | None | Click | Opens Wishlist Page (`ce90bd7999304498b3fe74d1e925775f`) |
| **Notifications** | `<i class="fa-regular fa-bell text-lg"></i>` | None (or unread dot if active) | Click | Opens Notifications Center (`2ac6eedf6f1a4bb59f14b995b43fc469`) |

---

## 3. Responsive & Mobile Behavior
- **Mobile Drawer / Hamburger:** Category navigation (`nav`) hides on mobile screens (`hidden lg:flex`).
- **Search & Action Icons:** Remain accessible or condense on smaller screen viewports.

---

## 4. Visual & Styling Notes
- **Container Constraints:** `max-w-[1440px] mx-auto px-6 h-20`
- **Border:** Bottom line `#e5e7eb`
- **Primary Text Color:** `#4B5563` (Neutral gray)
- **Active / Accent Color:** `#ff3f6c` (Logo & Cart count)
- **Badge Color:** `#ba1a1a` (New badge)
- **Typography:** Modern sans-serif, clean letter tracking.

---

## 5. Design Gaps & Questions
- **Mega Menu Details:** Chevrons suggest category drop-downs or flyout mega-menus for "Men's wear", "Women's wear", "Kid's wear", and "Spotlight"; exact multi-level subcategories are not rendered in a flyout state in the static screen snapshot.
- **Cart Count Dynamic State:** When cart count is 0, does badge hide completely or show 0? (Standard: badge is hidden when empty).
