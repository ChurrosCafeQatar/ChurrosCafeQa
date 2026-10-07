# SEO Monitoring & QA

## Weekly Monitoring
- **Impressions, Clicks, CTR, Average Positions:** Monitor in Google Search Console to detect rapid shifts.
- **Indexed Pages:** Track the ratio of indexed vs. non-indexed pages in GSC.
- **Sitemap Errors:** Review GSC for any 4xx/5xx errors on submitted sitemap routes.
- **Core Web Vitals (CWV):** Check real-world user metrics (LCP, CLS, INP) in GSC.
- **Top Queries & Location Performance:** Verify that local queries ("churros lusail", "churros abu hamour") are landing on the correct `/locations/` subpages.

## Monthly Monitoring
- **Keyword Growth:** Monitor broader unbranded growth (e.g., "dessert cafe qatar").
- **Content Performance:** Assess the traffic share driven by standard pages (e.g., `/stories/`) versus transactional pages.
- **Backlinks:** Audit inbound link profiles for historical locations or new citations.
- **Google Business Profile Traffic:** Track `utm_campaign=gbp_*` performance in Google Analytics.
- **Technical Crawl:** Use third-party crawlers (Screaming Frog, Sitebulb) to detect broken internal links or duplicate H1s that may have slipped into the codebase.
- **Cannibalization:** Ensure the Homepage and Menu pages are not competing directly for local intent keywords against the dedicated branch pages.

## Prevention Checks in CI
- Next.js build step automatically catches missing static routes or malformed sitemaps.
- Automated tests (Playwright) exist for rendering and UI verification; consider expanding to check `lang` attributes, canonicals, and `<title>` existence.
