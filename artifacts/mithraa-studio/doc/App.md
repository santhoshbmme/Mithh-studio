# App Routing & Provider Documentation

The `App` component (`src/App.tsx`) is the entry point, router, and context wrapper configuration of the client application.

## 1. Structure Overview
- **Path:** [App.tsx](file:///c:/Antigravity/Mith%20%20studio/artifacts/mithraa-studio/src/App.tsx)
- **Role:** Sets up core global state, tooltips, toast feedback, and router paths.

## 2. Technical Provider Tree
- **`QueryClientProvider`:** Wraps the tree with TanStack React Query cache configurations.
- **`TooltipProvider`:** Provides context properties for hover-bound Radix tooltip components.
- **`WouterRouter`:** Handles clean routing, parsing `import.meta.env.BASE_URL` to strip trailing slashes for correct relative base-path configurations.
- **`Toaster`:** Handles global flash notifications.

## 3. Router Paths
- `/` maps to `Home` page component.
- `/services` maps to the new `Services` showcase component.
- Fallback maps to the `NotFound` page component.

---

## 4. Historical Bugs & Resolutions
- **Base Path Prefix Mismatches:** Solved by explicitly stripping trailing slashes dynamically from environment variables before passing them as wouter's base URL parameter.
