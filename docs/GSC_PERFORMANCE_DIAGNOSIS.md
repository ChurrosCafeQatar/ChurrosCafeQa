# GSC Performance Diagnosis - Churros Cafe Qatar

## 1. Date Coverage & Reporting Context
* **Report Range Filter:** Last 7 days
* **Active Data Dates:** October 3, 2026 – October 6, 2026 (4 days of recorded data). 
* **Baseline Verification:** The aggregated data matches the provided baseline perfectly: 32 clicks and 187 impressions. The first date (Oct 3) shows 0 clicks and 0 impressions, suggesting either tracking just began, the site was recently launched, or a severe indexing drop/recovery occurred prior to Oct 4.

## 2. Search Query Performance (Top Queries)
* **Anonymized Query Gap:** GSC reports 32 total clicks, but the `Queries.csv` export only accounts for 14 clicks. This means 18 clicks (56%) and 109 impressions are from "anonymized queries" that Google hides for privacy.

| Query | Clicks | Impressions | CTR | Position | Type |
|-------|--------|-------------|-----|----------|------|
| churros cafe | 10 | 38 | 26.32% | 7.34 | Branded |
| churroscafe | 2 | 5 | 40.00% | 2.00 | Branded |
| churros qatar | 1 | 6 | 16.67% | 3.67 | Non-branded |
| churros cafe qatar | 1 | 4 | 25.00% | 8.50 | Branded |
| churros | 0 | 4 | 0.00% | 1.25 | Non-branded |
| churro near me | 0 | 2 | 0.00% | 1.50 | Non-branded |

## 3. Brand Visibility Analysis
* **Identified Branded Queries:** "churros cafe", "churroscafe", "churros cafe qatar", "churros cafe near me".
* **Branded Performance (Known):** 13 clicks, 48 impressions.
* **Non-Branded Performance (Known):** 1 click, 30 impressions.
* **Observation:** Branded terms dominate the *known* clicks. Ranking for the primary brand term "churros cafe" is abnormally low (Position 7.34), indicating a potential penalty, canonicalization issue, or intense competition from third-party directories outranking the official site for its own name.

## 4. Page-Level Findings & Canonicalization Crisis
The `Pages.csv` report reveals a critical SEO technical failure. Google is indexing and serving three different variations of the homepage simultaneously:

| URL Variation | Clicks | Impressions | Position | Issue |
|---------------|--------|-------------|----------|-------|
| `http://churroscafeqa.com/` | 11 | 120 | 8.81 | Unsecured (HTTP) indexed |
| `https://www.churroscafeqa.com/` | 10 | 37 | 10.76 | WWW subdomain indexed |
| `https://churroscafeqa.com/` | 3 | 26 | 5.62 | Bare HTTPS indexed |

**Diagnosis:** The site's ranking power is severely diluted across three separate URL entities. Google treats HTTP, HTTPS, WWW, and non-WWW as distinct websites unless they are explicitly joined via 301 redirects and canonical tags. 

Other indexed pages include `/menu/`, `/menu/hot-coffee/`, `/menu/churros/`, `/reservations/`, and `/ar/about/`.

## 5. Mobile vs. Desktop Differences
* **Desktop:** 22 clicks, 74 impressions, 29.73% CTR, Average Position 7.58
* **Mobile:** 10 clicks, 113 impressions, 8.85% CTR, Average Position 9.52
* **Observation:** Mobile generates significantly more impressions but performs poorly in CTR and rankings compared to Desktop. This could point to a poor mobile Core Web Vitals score, non-responsive design issues, or a Google mobile-first indexing penalty.

## 6. Country Performance
* **Qatar:** 31 clicks, 173 impressions (92.5% of total visibility). The traffic is highly localized and relevant to the business.
* **Other:** Minimal impressions from US, Brazil, India, etc.

## 7. Unusual Patterns & Low-Click Queries
* Queries like "churros" (Position 1.25) and "churro near me" (Position 1.50) report 0 clicks despite excellent positions. 
* **Hypothesis:** This could be due to the extremely low sample size (4 and 2 impressions respectively), or these impressions might be surfacing in Google Image Search or Local Pack (Google Maps) where standard web clicks are less frequent. No solid conclusions should be drawn from <5 impressions.

## 8. Summary & Next Steps
### What the Report Proves:
1. Google's index is highly fragmented for this domain (HTTP vs HTTPS, WWW vs non-WWW).
2. The site suffers from poor branded search rankings (Position 7+ for its exact name).
3. Mobile performance is lagging behind desktop.

### Unverified Hypotheses & Prioritized Live Investigations:
1. **Live Redirect Check:** We must test if `http://` and `www.` currently 301 redirect to `https://churroscafeqa.com/`. The GSC data shows they *were* indexed recently, but we need to verify if the Vercel hosting is configured correctly *right now*.
2. **Canonical Tags:** Verify if the HTML source `<link rel="canonical">` points to a single unified domain variation to prevent further dilution.
3. **Mobile Usability:** Run Lighthouse / Mobile-Friendly tests to see why mobile ranks worse than desktop.
