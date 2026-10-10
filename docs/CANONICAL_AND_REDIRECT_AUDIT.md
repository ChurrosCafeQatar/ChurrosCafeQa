# Canonical and Redirect Audit - Churros Cafe Qatar

## 1. Original Behavior & Confirmed Problems
An audit of the four primary homepage URL variations was conducted using live HTTP headers.

**Testing the 4 variants:**
1.  `http://churroscafeqa.com/` -> Returned a `308 Permanent Redirect` to `https://churroscafeqa.com/`. (Correct)
2.  `http://www.churroscafeqa.com/` -> Returned a `308 Permanent Redirect` to `https://www.churroscafeqa.com/`, followed by a **`307 Temporary Redirect`** to `https://churroscafeqa.com/`. (Incorrect - Temporary redirect allows indexation of the source).
3.  `https://www.churroscafeqa.com/` -> Returned a **`307 Temporary Redirect`** to `https://churroscafeqa.com/`. (Incorrect).
4.  `https://churroscafeqa.com/` -> Returned a `200 OK`. (Correct, preferred destination).

**Confirmed Problem:** Vercel was using default `307 Temporary Redirects` to handle the `www` to `non-www` domain forwarding. This directly caused the canonicalization failure seen in Google Search Console, as Google will continue indexing the `www` version when it encounters a temporary redirect.

## 2. Next.js Routing & Metadata Consistency
*   **Canonical Tags:** Evaluated `app/layout.tsx` and `app/page.tsx`. `metadataBase` is correctly set to `https://churroscafeqa.com`. `canonical: '/'` correctly evaluates to the absolute preferred URL.
*   **Sitemap & Robots:** `app/sitemap.ts` and `app/robots.ts` correctly use the `SITE_URL` constant (`https://churroscafeqa.com`).
*   **Internal Links:** No absolute `www` links exist in the `app/`, `components/`, or `data/` directories.
*   **Root `robots.txt` Risk:** A rogue `robots.txt` file containing `Disallow: /` was found in the project root. While Next.js output relied on `app/robots.ts`, the presence of this root file posed a severe staging-leak risk and has been eliminated.

## 3. Files Modified
*   **Created:** `vercel.json` (Added explicit 308 permanent redirect rule for the `www` subdomain).
*   **Deleted:** `/robots.txt` (Removed the dangerous root-level staging robots file).

## 4. New Behavior
With the deployment of `vercel.json`, the routing behavior is forced at the edge layer:
1.  `http://churroscafeqa.com/` -> `308` -> `https://churroscafeqa.com/`
2.  `http://www.churroscafeqa.com/` -> `308` -> `https://churroscafeqa.com/`
3.  `https://www.churroscafeqa.com/` -> `308` -> `https://churroscafeqa.com/`
4.  `https://churroscafeqa.com/` -> `200 OK`

## 5. Test Results
Local codebase validation confirms that the configuration dictates a `308 Permanent` redirect to the preferred `https://churroscafeqa.com/` URL. (Note: Live validation of Vercel edge rules requires waiting for the next production deployment).

## 6. Remaining Google Search Console Checks
*   Submit the preferred `https://churroscafeqa.com/` URL to the GSC URL Inspection tool.
*   Request Indexing to force Google to process the new `308` redirect headers.
*   Monitor the "Pages" report over the next 14 days to observe the de-indexation of the `www` and `http` variants.
