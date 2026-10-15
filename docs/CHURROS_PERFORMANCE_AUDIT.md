# Performance recovery baseline — 2026-10-14

Rollback: clean starting commit c2fe2b826f47722ff00444b4ef72e7b62f8691e7, preserved on local branch perf-baseline-2026-10-14. No branch checkout or deployment performed. Originals will be retained.

Framework: Next.js 16.3.6 App Router, React 19.3, TypeScript, output: export with trailing slashes. Vercel serves the deployed site; local production output is out/. Canonical origin https://churroscafeqa.com. 48 sitemap routes, English/Arabic, four active branches. Mall of Qatar remains permanently closed. No contact page is to be created.

Supplied audit (different/unknown test conditions): 10.07 MB total, 9.81 MB images, 44 requests, FCP 2.032 s. These are not independently reproduced measurements. Comparable local production before/after artifacts will be saved under reports/performance and reports/perf-*.json. No real-user INP/CrUX access is available.

| Finding / initial status | Affected URLs and source | Root cause / evidence | Planned safe action | Verification |
|---|---|---|---|---|
| Oversized/nonmodern images: confirmed | /, /ar/, /about/, branch pages; components/site-image.jsx and all callers | Static export disables Next image optimization; campaign PNGs are 1.8–2.8 MB; sizes has no effect without srcset | Build-time hashed WebP widths, intrinsic metadata, correct sizes; preserve originals and crops | Resource bytes, responsive candidates, visual comparison, all-route images |
| Render-blocking CSS: confirmed opportunity | All pages, app/layout.tsx | Separate fonts.css request contains only local Cooper font declaration; bundled CSS is still legitimately critical | Bundle that declaration into existing CSS; retain next/font and font-display swap | Lighthouse request chain; no FOUC or font removal |
| Alt warning: needs classification | All image components, category thumbnails | Decorative thumbnails intentionally empty; informative product and branch images have descriptions; Arabic alternatives need attention | Preserve decorative alts, use localized product/branch names, inspect all routes | DOM audit, accessible names, keyboard checks |
| Distortion: dimensions need correction | Campaign/branch/logo imagery via SiteImage | Callers supply guessed 2048 square dimensions; object-fit crops are intentional | Actual intrinsic width/height from source manifest; retain object-fit and CSS | Natural/rendered ratios, cover/contain, viewport tests |
| CDN missing: incorrect | Production HTML and campaign image | Server: Vercel, X-Vercel-Cache: HIT, age headers observed 2026-10-14 | Keep Vercel; add immutable caching only for hashed generated variants | Production headers baseline; deployment verification pending |
| GA4 missing: outdated in code | components/analytics.jsx, data/analytics.js | G-CZHKZXTHKC already configured with async script and SPA pageviews | Preserve ID, opt-out, privacy disclosure; inspect duplicate route events | Mocked queue tests and live loading evidence; DebugView external |
| SPF missing: confirmed DNS gap | Domain DNS | TXT only GSC verification; no MX result, no DMARC; outbound sender unknown | No speculative SPF; obtain sender confirmation; no DNS writes | DNS lookups, provider-dependent instructions |
| HTTP request count: diagnostic, not fixed threshold | Homepage resource log | Full-size filter photos and image variants absent; one avoidable stylesheet | Right-size images and remove avoidable stylesheet; retain necessary assets | Initial/full-scroll request inventory |
| Short description: supplied wording outdated | app/layout.tsx and route metadata | Current description starts Visit Churros Cafe, not supplied Discover wording | Preserve accurate unique descriptions unless crawl finds defect | All-route titles, descriptions and canonical checks |
| FCP/CWV: baseline required | / and /ar/ | Image contention and extra CSS request plausible causes, to measure | Above optimizations, explicit hero eager/high priority | Comparable Lighthouse mobile/desktop, CLS; field INP unavailable |
| ads.txt missing: not applicable to inspected implementation | package and application sources | No AdSense, Ad Manager or seller integration found | Do not invent publisher IDs or create file | Source inspection; owner confirmation if ads selling introduced |
| Accessibility defects beyond audit | app/layout.tsx, ProductCard | Nested main landmarks with duplicate id=main; product button accessible name excludes price | Single main landmark and visible-name-derived buttons | Automated accessibility and interaction tests |

Protection: do not change headlines, category URLs, canonical host, verified menu facts, branch count, campaigns or photography. Any global contrast failures that require changing protected colors will be reported separately rather than silently redesigning the brand.

## Completed investigation follow-up

Implementation, test results, all issue dispositions, exact before/after measurements and external limitations are documented in `CHURROS_OPTIMIZATION_RESULTS.md`. Route-level evidence is in `reports/performance-live-seo-before.json` and `reports/performance-seo-after.json`; the current sitemap has 48 routes. Live CDN header evidence is in `reports/performance/live-delivery.json`. Actual branch/About LCP photos were additionally identified and prioritized. Shared-navigation prefetch was reduced after request-inventory inspection. No deployment has been performed.
