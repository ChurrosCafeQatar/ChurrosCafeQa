# SEO Architecture

## URL Architecture
The application uses a flat, simple URL structure:
- `/` (Home)
- `/menu/` (Menu Hub)
- `/locations/` (Locations Hub)
- `/about/`, `/privacy/`, `/stories/`, `/offers/` (Standard Pages)
- `/menu/[category]/` (Category pages, e.g. `/menu/churros/`)
- `/locations/[branch]/` (Branch pages, e.g. `/locations/lusail/`)

Arabic equivalents mirror this exactly under `/ar/`:
- `/ar/menu/`, `/ar/locations/lusail/`

## Page Types
1. **Hub Pages:** English hubs use distinct Next.js App Router folders (`app/page.tsx`, `app/menu/page.tsx`, `app/locations/page.tsx`) for granular control and statically exported performance.
2. **Dynamic / Arabic / Info Pages:** Handled by the Next.js catch-all router `app/[...slug]/page.tsx` for highly reusable component logic while rendering distinct semantic HTML metadata.
3. **Closed Location Pages:** Handled as a special static case avoiding standard 404 behavior to retain historical link equity and appropriately redirect users.

## Schema Strategy
Implemented primarily in `components/SchemaMarkup.tsx` avoiding duplication:
- **Home:** `Organization` and `WebSite`
- **Locations Hub:** `ItemList` containing `CafeOrCoffeeShop` schemas for all branches.
- **Individual Location:** Distinct `CafeOrCoffeeShop` (LocalBusiness) schema mapping parent relationships.
- **Menu:** Uses `Menu`, `MenuSection`, and `MenuItem` schemas populated directly from the central data model.

## Canonical & Localization Strategy
- Every indexable page declares its `canonical` URL.
- Every translated page explicitly defines `alternates.languages` with `en`, `ar`, and `x-default` (pointing to English).
- The `<html>` tag behavior is managed implicitly by Next.js defaults, while Arabic content blocks render distinct `<div dir="rtl" lang="ar">` attributes to guarantee screen reader and search engine alignment without relying on client-side JS mutations.

## Sitemap Strategy
- Centralized in `app/sitemap.ts`.
- Yields all standard routes, valid menu categories, and active location routes.
- Specifically excludes closed/legacy branches (Mall of Qatar) to prevent active crawling priority, and excludes backend/admin interfaces.
