# Branch Local SEO Audit - Churros Cafe

## 1. Objective
To systematically audit the local SEO implementation across all five Churros Cafe Qatar locations (Abu Hamour, Lusail, Duhail, Downtown, and Mall of Qatar), ensuring strict adherence to technical SEO best practices without inventing unverifiable business data.

## 2. Methodology & Findings
Each branch route was analyzed for correct routing, indexability, metadata uniqueness, H1 formatting, internal linking, structured data deployment, and Google Maps integration.

The dynamic Next.js App Router (`app/[...slug]/page.tsx`) correctly serves `200 OK` responses for active branches and successfully isolates the permanently closed Mall of Qatar branch with custom messaging.

### 2.1 Branch Comparison Table

| Branch | Issues | Fixes | Verification | Remaining Actions |
| :--- | :--- | :--- | :--- | :--- |
| **Abu Hamour** | Weak Schema entity linking. | Fixed globally in previous structured-data pass (`parentOrganization` URL). | Route active (`/locations/abu-hamour/`). Metadata, canonical, Maps embed, and H1 verified. | Request GSC Indexing. |
| **Lusail** | Weak Schema entity linking. | Fixed globally in previous structured-data pass. | Route active (`/locations/lusail/`). Metadata, canonical, Maps embed, and H1 verified. | Request GSC Indexing. |
| **Duhail** | Weak Schema entity linking. | Fixed globally in previous structured-data pass. | Route active (`/locations/duhail/`). Metadata, canonical, Maps embed, and H1 verified. | Request GSC Indexing. |
| **Downtown** | Weak Schema entity linking. | Fixed globally in previous structured-data pass. | Route active (`/locations/downtown/`). Metadata, canonical, Maps embed, and H1 verified. | Request GSC Indexing. |
| **Mall of Qatar (Closed)** | 1. Missing from `sitemap.xml`.<br>2. H1 lacked brand name. | 1. Injected `/locations/mall-of-qatar` into `app/sitemap.ts`.<br>2. Updated H1 in `components/cafe-site.tsx` to explicitly state "Churros Cafe Mall of Qatar". | Route correctly intercepts as `closed-location`. Closure notice displays properly. | Request GSC Indexing to force Google to process the closure notice and gracefully de-rank it. |

## 3. Technical Corrections Detail

### 3.1 Sitemap Integrity (Mall of Qatar)
*   **Issue:** The Mall of Qatar branch was entirely missing from `app/sitemap.ts` because it had been removed from the active `branches` data array in `data/content.ts`.
*   **Correction:** Hardcoded the `/locations/mall-of-qatar` path into the `sitemap.ts` generation loop.
*   **Why it matters:** Even when a branch is permanently closed, its page must remain in the sitemap temporarily so Googlebot crawls the page, registers the "Permanently Closed" messaging and updated metadata, and cleanly removes it from active map packs rather than encountering a dead end 404.

### 3.2 H1 Brand Injection (Mall of Qatar)
*   **Issue:** The closed-location template rendered an H1 of `Mall of Qatar Branch`, entirely dropping the "Churros Cafe" entity keyword.
*   **Correction:** Updated the translation component in `components/cafe-site.tsx` to render `Churros Cafe Mall of Qatar Branch`.
*   **Why it matters:** Ensures any lingering branded searches for the old branch land on this page to receive the closure notice, rather than bouncing to a third-party directory.

## 4. Validated Elements (No Action Required)
*   **Indexability:** `robots.txt` is clear. No rogue `noindex` tags found on branch pages.
*   **Metadata:** Descriptions are unique per branch (e.g., "A lively Downtown stop..." vs "Your Lusail stop...").
*   **Business Data:** Phone numbers, Google Maps links, and Arabic translations are accurate and pull directly from the verified `data/content.ts` source of truth. No fake addresses or hours were generated.
*   **Mobile Usability:** Branch pages leverage the responsive CSS grid. Map embeds use `allowFullScreen` and `loading="lazy"` for optimal mobile performance.
