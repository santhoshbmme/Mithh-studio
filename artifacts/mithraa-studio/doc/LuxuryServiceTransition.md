# Luxury Service Transition Component Documentation

The `LuxuryServiceTransition` component (`src/components/layout/LuxuryServiceTransition.tsx`) is an ultra-premium, scroll-linked full-screen transition section inspired by luxury editorial art books, anti-gravity physics, and cinematic storytelling.

## 1. Component Overview
- **Path:** [LuxuryServiceTransition.tsx](file:///c:/Antigravity/Mith%20%20studio/artifacts/mithraa-studio/src/components/layout/LuxuryServiceTransition.tsx)
- **Role:** Replaces static service previews on the Home page. It binds a 3D page ascension gesture directly to the scroll axis, where the cover page lifts vertically and tilts forward, revealing an ascending golden "THEARTNDRAW" creative universe from below.

## 2. Technical Implementation Details

### Scroll-Driven 3D Page Ascension
The component pins the viewport utilizing a sticky container of `h-screen` within a `200vh` track.
Using Framer Motion's `useScroll` with the parent container `ref` target, the scroll position (`scrollYProgress` from `0.0` to `1.0`) is mapped to the vertical lifting dynamics of the cover page:
- **`y`:** Maps `[0, 0.6]` to `["0%", "-120%"]` vertical displacement, lifting the cover page up and out of the viewport.
- **`scale`:** Maps `[0, 0.55]` to `[1, 0.92]` to create 3D recession depth.
- **`rotateX`:** Maps `[0, 0.55]` to `[0, 14]` degrees.
- **`skewX`:** Maps `[0, 0.55]` to `[0, -3]` degrees.
- **`transformOrigin`:** Anchored to `"center top"` to make the page pivot forward at its top margin as it loses gravity.
- **`pageShadow`:** A dynamic shadow overlay opacity mapping `[0, 0.5]` to `["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]` to darken the page as it floats away.

### Ascending Reveal of Underlying Universe
As the scroll progress advances, the hidden creative universe is fade-revealed and moves upward into focus:
- **`universeOpacity`:** Maps `[0.12, 0.55]` to `[0, 1]`.
- **`universeScale`:** Maps `[0.12, 0.6]` to `[0.93, 1]`.
- **`centerpieceY`:** The centerpiece artwork and CTA button translate from `160px` to `0px` (`[0.15, 0.65]`), producing an ascending float reveal.
- **`fragmentsAscentY`:** Floating elements translate from `200px` to `0px` (`[0.1, 0.65]`).
- **`fogY` and `fogOpacity`:** Volumetric fog layers drift from `350px` to `-180px` to add a sense of rising atmosphere.

### "THEARTNDRAW" Double-Exposure Typography
- **Font Styling:** Elegant editorial serif using Google Font `Cormorant Garamond` set at a massive scale (`9vw`).
- **Composite Effect:** Formed using `-webkit-background-clip: text` overlaying multiple assets:
  - An Unsplash artwork background collage blended with a warm luxury golden linear gradient (`#FDE68A` to `#78350F`) set in a `multiply` blend mode.
  - A gold shimmer linear light overlay shifting across the text.
  - Embossed drop shadow filters `drop-shadow(0px 10px 25px rgba(0,0,0,0.5))` providing volumetric depth.

### Anti-gravity Floating Fragments
- Five absolute cards detailing Mithra Studio's creative work float freely around the typography.
- **Drift Motion:** Each fragment operates on independent looping paths (`duration` range `6.5` to `9` seconds) swinging through relative translations (e.g. `driftY: [-20, 20]` pixels and `rotate: [-6, 6]` degrees) using reverse easing.
- **Parallax Offset:** Tracks mouse movements relative to the viewport center. Each cursor shift translates the card offset based on its unique weight parameter (from `-0.07` to `0.08`), creating a deep layered field of view.

### Magnetic CTA Button
- Outlined glass button with hover glow effects and a soft subtext descriptor.
- **Magnetic Pull:** Computes relative cursor offsets from the center coordinates of the button during the `onMouseMove` event:
  $$\Delta X = X_{cursor} - (X_{left} + \frac{Width}{2})$$
  $$\Delta Y = Y_{cursor} - (Y_{top} + \frac{Height}{2})$$
- On hover proximity, the button content shifts toward the cursor coordinates at a 30% intensity coefficient, returning to resting state `(0, 0)` smoothly via custom spring parameters (`stiffness: 200`, `damping: 14`) when the cursor leaves.

---

## 3. Configuration & Styling
- CSS classes are bound using tailwind styles, using the new font utility `--font-luxury` configured in `index.css`.
- Ambient spotlights utilize radial gradients (`radial-gradient(circle_at_50%_50%,rgba(217,119,6,0.08)_0%,transparent_65%)`) layered with moving particle variables.
- Uses SVG-embedded noise filters in overlay properties to supply high-end luxury film grain.

---

## 4. Verification Methods
- **Linter Check:** Checked using strict TypeScript compile flags (`pnpm run typecheck`).
- **Interactive Check:** Verified using browser subagent scroll sweeps and pixel hover coordinators on `http://localhost:19285/`.
