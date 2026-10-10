# Churros Cafe SEO Recovery Final Report

## 1. Original SEO Problem
Churros Cafe was suffering from a severe "Parasite SEO" condition. When searching for branded terms like "Churros Cafe Qatar," the official website (`churroscafeqa.com`) was being outranked by third-party delivery aggregators (Talabat, Snoonu) and local directories (Qatar Living). This occurred due to a botched domain migration where the legacy domain (`churroscafeme.com`) was parked without a 301 redirect, stranding all historical authority and forcing the new domain to start with zero trust.

## 2. Google Search Console Baseline
Based on the provided GSC exports (`C:\Users\WORK\Downloads\churroscafeqa.com-Performance-on-Search-2026-10-10\`), the baseline performance was minimal:
*   **Overall:** 32 clicks, 187 impressions, 17.11% CTR.
*   **Primary Branded Query ("churros cafe"):** 38 impressions, 10 clicks, average position 7.34.
*   *Limitation:* The sample size is extremely small, indicating the site is barely registering in Google's index.

## 3. Confirmed Technical Problems
1.  **Rogue Robots.txt:** A staging `robots.txt` was located in the root directory actively blocking crawling (`Disallow: /`).
2.  **Canonical Fragmentation:** The Vercel edge network was serving HTTP, HTTPS, WWW, and non-WWW traffic independently, diluting the already weak domain authority.
3.  **Weak Schema Linking:** Branch schemas lacked URLs pointing to the parent organization, and the main organization lacked a verified social `sameAs` link.
4.  **Sitemap Omissions:** The closed "Mall of Qatar" branch was removed from the sitemap abruptly, preventing Google from gracefully de-indexing the entity.
5.  **Missing Branded H1s:** The homepage H1 was purely stylistic ("Golden, crispy...") and lacked the brand entity name.

## 4. Unverified Potential Ranking Factors
*   **External Backlink Profile:** We suspect legacy blogs and directories still point to the old `churroscafeme.com` domain, but without third-party backlink tools (Ahrefs/Semrush), the exact volume of lost links is unverified.
*   **User Behavior Signals:** The high aggregator rankings may be partially sustained by high user click-through rates on Talabat, a behavior we cannot control.

## 5. Canonical and Redirect Findings
*   Vercel was natively issuing `307 Temporary Redirects` for domain normalization.
*   **Fix:** We created `vercel.json` to force strict `308 Permanent Redirects` from `www.churroscafeqa.com` to `https://churroscafeqa.com/`.

## 6. Branded-Search Findings
*   `churroscafeme.com` is permanently parked. Because it lacks a redirect, `churroscafeqa.com` inherited zero authority.
*   Aggregators rank higher because Google trusts their domain authority over the unverified new Churros Cafe domain.

## 7. Homepage SEO Changes
*   **H1 Update:** Modified the stylistic H1 to include the brand: `"Churros Cafe Qatar. Golden, crispy churros drenched in liquid gold."`
*   **Title/Meta:** Updated `app/page.tsx` to explicitly export: `Churros Cafe Qatar | Official Website, Menu & Locations` to differentiate the site from third-party delivery listings in the SERPs.

## 8. Structured-Data Changes
*   **Social Verification:** Injected `sameAs: ['https://www.instagram.com/churroscafe.qa']` into `components/SchemaMarkup.tsx` to build Knowledge Graph trust.
*   **Entity Relationships:** Added absolute URLs to the `parentOrganization` attribute inside all local branch schemas.
*   **Cleanup:** Deleted a 50-line block of dead, duplicate schema code (`PageStructuredData`) from `app/[...slug]/page.tsx`.

## 9. Five-Branch SEO Improvements
*   Verified that Abu Hamour, Lusail, Duhail, and Downtown branches correctly generate unique metadata, H1s, and Maps embeds.
*   **Mall of Qatar Fix:** Explicitly re-added `/locations/mall-of-qatar/` to `app/sitemap.ts` and updated its H1 to `"Churros Cafe Mall of Qatar Branch"`. This ensures Google crawls the closure notice and gracefully un-lists the location.

## 10. Crawlability Improvements
*   **Validation:** Verified the Next.js `output: 'export'` SSG configuration physically embeds product titles (`<h3>Classic Churros</h3>`), descriptions, and prices in the raw HTML payload.
*   **JS Fallbacks:** Confirmed the interactive map and menu modals are safely backed by standard `<a href="...` links in the footer and grid to ensure Googlebot crawls deeply without executing JS.

## 11. External Platform Actions Needed
*   **Google Business Profile:** *Must manually update* the "Website" field to `https://churroscafeqa.com/`. Mark Mall of Qatar as "Permanently Closed".
*   **Instagram/Facebook:** *Must manually update* the bio link to the new domain.
*   **Talabat/Keeta/Rafeeq:** *Must manually contact* reps to update the vendor website and disable the closed Mall of Qatar branch.

## 12. All Modified Project Files
1.  `vercel.json` (Created)
2.  `robots.txt` (Deleted rogue staging file)
3.  `app/page.tsx` (Modified metadata & H1)
4.  `app/sitemap.ts` (Added closed location)
5.  `app/[...slug]/page.tsx` (Removed dead schema)
6.  `components/SchemaMarkup.tsx` (Enhanced JSON-LD)
7.  `components/cafe-site.tsx` (Fixed closed location H1)
8.  `docs/*.md` (Created audit and reporting documentation)
9.  `scripts/seo-qa.js`, `scripts/validate-schema.js` (Created QA tests)

## 13. Validation and Test Results
*   **Build:** `npm run build` completed successfully. Zero TypeScript errors.
*   **Schema Check:** Node script verified JSON-LD syntax is 100% valid.
*   **HTML QA:** Regex tests verified canonical tags, H1s, and Navbar components exist in the static `out/` payloads.

## 14. Deployment Status
*   **Status:** BLOCKED / PENDING AUTHORIZATION
*   **Details:** All local preparations and QA are complete. Deployment is halted per strict user protocols requiring explicit authorization before pushing to Vercel production.

## 15. Remaining Google Search Console Actions
Upon deployment authorization and completion, the user must:
1.  Navigate to GSC URL Inspection.
2.  Request Indexing for `https://churroscafeqa.com/`.
3.  Request Indexing for `https://www.churroscafeqa.com/` (to force Google to register the 308 redirect).
4.  Request Indexing for `https://churroscafeqa.com/locations/mall-of-qatar/` (to register the closure).
5.  Resubmit `https://churroscafeqa.com/sitemap.xml`.

---

## MONITORING PLAN

**After 7 days:**
*   Brand query impressions
*   Brand query clicks
*   CTR
*   Average position
*   Homepage indexing
*   Google-selected canonical

**After 14 days:**
*   Query trends
*   Homepage visibility
*   Branch performance
*   Mobile versus desktop performance
*   Search result changes

**After 30 days:**
*   Branded-query trend comparison
*   Organic clicks
*   Search impressions
*   Homepage and branch visibility
*   Remaining technical problems
*   Next SEO priorities

*Note: All data comparisons must use comparable date ranges, recognize small-sample limitations, isolate country/device filters accurately, and account for normal algorithm fluctuations. First-place rankings are never guaranteed.*
