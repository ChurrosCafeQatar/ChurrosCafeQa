# SEO Recovery Master Log - Churros Cafe Qatar

## 1. Project Architecture
*   **Framework:** Next.js version 16.3.6
*   **Router:** App Router (`app/` directory)
*   **Rendering:** Static Site Generation (SSG). The project is configured with `output: 'export'` in `next.config.js`, meaning it builds entirely static HTML/CSS/JS. Server-side rendering (SSR) is disabled.
*   **Hosting:** Vercel (Implied by instructions, though no custom `vercel.json` overrides exist in the root).

## 2. Route Inventory
*   **Homepage:** `/` (`app/page.tsx`)
*   **Locations Hub:** `/locations/` (`app/locations/page.tsx`)
*   **Menu Hub:** `/menu/` (`app/menu/page.tsx`)
*   **Catch-All Dynamic Routes:** `app/[...slug]/page.tsx`
    *   Arabic routes: `/ar/*`
    *   Dynamic Locations: `/locations/[branchId]/`
    *   Dynamic Menu Categories: `/menu/[categorySlug]/`
    *   Standard static pages built dynamically: `/about/`, `/reservations/`, `/offers/`, `/stories/`, `/privacy/`
*   **Admin/Test Pages:** `/admin/` (JSX file, not heavily integrated into static generation)

## 3. SEO Implementation & Metadata
*   **Default Metadata (Root Layout):** `app/layout.tsx` defines the `metadataBase` (`https://churroscafeqa.com`), standard title templates (`%s | Churros Cafe Qatar`), default OpenGraph/Twitter cards, and the theme viewport.
*   **Static Pages Metadata:** Defined via exported `metadata` constants in `app/page.tsx`, `app/locations/page.tsx`, and `app/menu/page.tsx`.
*   **Dynamic Pages Metadata:** `app/[...slug]/page.tsx` uses `generateMetadata({ params })` to programmatically assign titles, descriptions, canonicals, and localized alternates based on English/Arabic routing logic and data objects.
*   **Canonical Tags & Hreflang:** Implemented comprehensively within the `metadata` objects via the `alternates` property, including `x-default`, `en`, and `ar` variations.

## 4. Configuration Files
*   **next.config.js:**
    *   `output: 'export'` (Enables static export)
    *   `trailingSlash: true` (Critical: Enforces trailing slashes on all URLs, matching the sitemap and canonical logic)
    *   `images: { unoptimized: true }` (Required for Next.js static exports)
*   **Robots & Sitemap Generation:**
    *   `app/robots.ts` and `app/sitemap.ts` are used to dynamically generate the correct SEO files at build time (found in `out/robots.txt` and `out/sitemap.xml`).
*   **Middleware:** No `middleware.ts` exists. Next.js static exports (`output: 'export'`) do not support Middleware.

## 5. Structured Data (Schema.org)
*   **Implementation:** Managed by `components/SchemaMarkup.tsx` which injects JSON-LD into the pages via `<script type="application/ld+json">`.
*   **Types Used:**
    *   Homepage: `Organization`, `WebSite`
    *   Locations Hub: `ItemList` (listing branches)
    *   Individual Locations: `CafeOrCoffeeShop`, `FoodEstablishment`, `LocalBusiness`
    *   Menu: `Menu`, `MenuSection`, `MenuItem`

## 6. Server vs Client Components
*   **Server Components:** Layouts (`app/layout.tsx`) and standard page shells (`app/page.tsx`, `app/menu/page.tsx`) are Server Components, which is excellent for SEO as they statically generate raw HTML without waiting for client-side hydration.
*   **Client Components:** Interactive elements are separated into Client Components (e.g., `components/cafe-interactive.tsx` containing `ProductGrid` and `BranchExplorer`).

## 7. Build Scripts & Testing
*   **Scripts:** Found in `package.json` (`npm run build`, `npm run dev`, `npm run menu:validate`, `npm run images:optimize`).
*   **Testing:** Playwright (`@playwright/test`) is installed for E2E testing (`npm run test`).

## 8. Initial Observations & Issues Requiring Investigation
1.  **Conflicting `robots.txt`:** There is a static `robots.txt` sitting in the project root containing `Disallow: /`. Although the build process uses `app/robots.ts` to output a correct `robots.txt` to the `out/` directory, the existence of the root-level `robots.txt` file blocking all crawlers is a massive red flag. It needs to be verified that this root file isn't inadvertently being served or copied to the deployment.
2.  **Trailing Slashes Consistency:** The project enforces `trailingSlash: true`. We must ensure no external links or Vercel configurations are stripping these slashes, causing unnecessary redirects.
3.  **Static Export Constraints:** Due to `output: 'export'`, advanced Next.js server-side features (like Headers, Redirects, and Rewrites in `next.config.js`, or Middleware) are unsupported. Any 301 redirects required for SEO recovery will need to be configured at the Vercel hosting layer or edge network, not within the Next.js runtime.


## 9. Google Search Console Diagnostic Findings (Oct 2026)
An analysis of the GSC exports (`2026-10-03` to `2026-10-06`) reveals the following critical issues:
*   **Severe Canonicalization Failure:** Google is actively indexing and serving three variations of the homepage simultaneously: `http://churroscafeqa.com/`, `https://www.churroscafeqa.com/`, and `https://churroscafeqa.com/`. This splits ranking signals and heavily penalizes the domain.
*   **Depressed Branded Search:** The site averages Position 7.34 for its exact brand name "churros cafe". This is likely a direct result of the canonicalization dilution.
*   **Mobile Underperformance:** Mobile devices generate the majority of impressions (113 vs 74 for desktop) but have significantly worse rankings (Pos 9.52 vs 7.58) and CTR (8.85% vs 29.73%).
*   **Unverified Needs:** We must perform live checks on the domain to see if HTTP -> HTTPS and WWW -> non-WWW 301 redirects are currently active at the Vercel level, as they are not handled by the static Next.js export.


## 10. Canonicalization Audit & Fix (Oct 2026)
*   **Original Behavior:** Live HTTP header tests revealed that while HTTP `non-www` redirected to HTTPS `non-www` via a `308 Permanent Redirect`, the `www` subdomain was redirecting to the `non-www` domain via a **`307 Temporary Redirect`**. This explains why Google Search Console showed multiple indexed homepage variants.
*   **Confirmed Problems:** Vercel default domain forwarding uses `307` unless explicitly told otherwise. Additionally, a dangerous root `robots.txt` containing `Disallow: /` was left over from staging.
*   **Files Modified:**
    *   Added `vercel.json` to enforce `308 Permanent` redirects from `www.churroscafeqa.com` to `https://churroscafeqa.com`.
    *   Deleted `robots.txt` from the project root.
*   **New Behavior:** Edge routing now explicitly defines `308 Permanent` status codes for all canonical consolidations. 
*   **Next Steps:** Require a live deployment, followed by a GSC URL Inspection and Indexing Request for the preferred homepage.
