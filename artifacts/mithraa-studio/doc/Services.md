# Services Component Documentation

The `Services` component (`src/pages/Services.tsx`) implements the immersive, Awwwards-level "ANTI-GRAVITY MEMORIES" service showcase. It serves as a cinematic gallery of Mithra Studio's capabilities, visual stories, and pricing sheets.

## 1. Component Overview
- **Path:** [Services.tsx](file:///c:/Antigravity/Mith%20%20studio/artifacts/mithraa-studio/src/pages/Services.tsx)
- **Role:** Handles core user interactions for rotating through 5 emotional service worlds (Portrait, Gifting, Achievement, Preservation, Framing), rendering volumetric environments, floating elements, mouse parallax effects, and rendering the slide-over collections/pricing sheet.

## 2. Interactive Service Worlds
The page manages five service worlds, each associated with distinct emotional aesthetics, backdrop gradients, and interactive floating items:
1. **Portrait Artwork** (Theme: Deep Coral Velvet - `#F4845F`)
2. **Personalized Gifting** (Theme: Deep Rose Gold Velvet - `#E8A0A8`)
3. **Achievement Recognition** (Theme: Deep Royal Gold Velvet - `#D4A017`)
4. **Memory Preservation** (Theme: Deep Lavender Velvet - `#A78BFA`)
5. **Premium Framing** (Theme: Deep Emerald Velvet - `#0F766E`)

## 3. Sub-components & Structures

### `FloatingCard` (Interactive Hover & Parallax Card)
- **Props:** 
  - `item`: Contains details of the card (image URL, style bounds, drift constraints, parallax weight).
  - `mouseX`, `mouseY`: Motion values mapping real-time cursor offsets.
- **Physics & Motion:** 
  - Parallax offsets are derived using `useTransform` and smoothed out with a spring coefficient: `{ damping: 40, stiffness: 200 }`.
  - Floating idle drift is handled via looping `framer-motion` properties: `repeat: Infinity`, `repeatType: "reverse" as const`, using custom easing.

### `Particles` (Atmospheric Dust)
- Generates 20 randomized points floating upward across the viewport.
- Uses infinite loops to drift particles from the bottom to the top of the viewport to establish atmospheric depth.

### `Sheet` (Pricing and Collections Slide-Over)
- Standard Radix-based UI Sheet carrying a clean list of pricing collections:
  - **Discovery Package:** Free styling consultation.
  - **Personal Collection:** Starts at ₹4,999.
  - **Premium Keepsakes:** Bespoke estimations by head artisan.
  - **Corporate Installations:** Bulk volume pricing models.

---

## 4. Historical Bugs & Resolutions

### strict-typecheck: Framer Motion v12 Ease String Warning
- **Bug:** Under strict TypeScript compilation rules, passing regular strings like `"easeOut"` to Framer Motion transitions generated a type mismatch error.
- **Fix:** Easing parameters must be explicitly cast using `as const` (e.g. `ease: "easeInOut" as const` or `repeatType: "reverse" as const`).

### browser-testing: Control Bounds Action Timeout
- **Bug:** Buttons aligned to window bounds (like next/prev arrows) fell outside the default 695px height viewport of the browser test runner, causing click coordinate targets to fail.
- **Fix:** Resized the testing window and switched to tab-indexing and enter keys to fire event handlers safely.

---

## 5. Chronological Changes
- **June 20, 2026:**
  - Integrated `Anton` display font in the document head.
  - Replaced the static pricing grid page structure with the full-screen layout.
  - Added volumetric gradients, film grain overlays, and mouse-follow parallax.
  - Moved pricing lists into the Radix-based Sheet drawer.

---

## 6. Future Requests & Improvements
- **Performance:** Add lazy loading for images and pre-fetch subsequent service world assets.
- **Touch Parallax:** Map touch/gyroscope events to parallax values for tablet and mobile devices.
