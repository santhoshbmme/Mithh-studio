# Home Component Documentation

The `Home` component (`src/pages/Home.tsx`) represents the homepage landing experience of Mithra Studio, introducing clients to the brand vision, core offerings, and target audiences.

## 1. Component Overview
- **Path:** [Home.tsx](file:///c:/Antigravity/Mith%20%20studio/artifacts/mithraa-studio/src/pages/Home.tsx)
- **Role:** Displays brand storytelling sections: Hero Section with SVG noise texture, Brand Mission, Target Audience Pain Points, and Curated Services previews.

## 2. Page Sections
1. **Hero Header:** Parallax image section using a custom inline SVG noise filter overlaying an image from Unsplash.
2. **Scroll-Driven Brand Narrative (About Mithraa Studio):** A sticky viewport wrapper tracking scroll progress. Inside, a card containing the atelier image slides from the right of the viewport (`20vw` offset) to the center (`0vw`) while expanding horizontally/vertically to full-screen (transitioning border-radius from `24px` to `0px` and scale from `1.0` to `1.15`). A dark velvet overlay fades in on the image, showing centered, stable high-contrast "About Mithraa Studio" copy overlay.
3. **Audience Demographics:** Multi-column grids addressing:
   - Families & Individuals (milestones & wedding captures).
   - Students & Professionals (certificate & trophy framing).
   - Corporates & Institutions (branded gift boxes & volume art installations).
4. **Offerings Showcase Grid:** Summarized cards previewing the 6 core services, linking directly to the high-end showcase.

---

## 3. Historical Bugs & Resolutions

### strict-typecheck: Framer Motion Variant Easing
- **Bug:** The transition configuration on `fadeIn` variants threw strict type errors.
- **Fix:** Easing configuration changed from `"easeOut"` to `"easeOut" as const`.

---

## 4. Chronological Changes
- **June 25, 2026:**
  - Refactored Section 2 to use a scroll-driven viewport reveal and expansion animation inspired by `intergestcanada.com`.
  - Added horizontal card slide-in from the right (`20vw`) to center (`0vw`) linked to scroll progress.
  - Set up sticky pinning, scroll-linked card width/height transitions, image scaling, overlay fades, and stable text copy reveals.
  - Erased the "Our Vision" and "Our Mission" sub-blocks and updated copy to the requested "About Mithraa Studio" story with centered camera-roll quote overlay.
- **June 19, 2026:**
  - Added Framer Motion fade-in and stagger entrance animations.
  - Linked all CTA buttons directly to `/services` routes.
  - Cleaned up custom responsive styling rules.
