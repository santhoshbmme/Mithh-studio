# Navbar Component Documentation

The `Navbar` component (`src/components/layout/Navbar.tsx`) is the primary global navigation header for the Mithra Studio application.

## 1. Component Overview
- **Path:** [Navbar.tsx](file:///c:/Antigravity/Mith%20%20studio/artifacts/mithraa-studio/src/components/layout/Navbar.tsx)
- **Role:** Floating header managing route navigation and mobile hamburger responsive drawers.

## 2. Technical Implementation
- **Scroll Hook:** Tracks real-time vertical window scroll status. When scroll offset is greater than 20px, applies glassmorphic white styling (`bg-white/95 backdrop-blur-md shadow-sm`), otherwise renders transparent backdrop to fit overlay designs.
- **Mobile Toggle:** Local boolean state `mobileMenuOpen` controls rendering of layout hamburger menu drawer on screens below `md` breakpoint.
- **Routing Integration:** Integrates `wouter` links with current route tracking via `useLocation` to highlight active links.

---

## 3. Historical Bugs & Resolutions
- **Scroll Event Leak:** Fixed scroll handler lifecycle leak by returning cleanup listener in `useEffect`.

---

## 4. Chronological Changes
- **June 19, 2026:**
  - Connected mobile CTA triggers.
  - Linked to "/" and "/services".
