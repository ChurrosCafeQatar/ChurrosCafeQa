# Churros Cafe SEO history

Last SEO Run: 2026-10-14 (performance review plus verified Gemini/workbook keyword implementation review; local implementation, not deployed).

The requested history file did not exist when this review began. This file initializes the history; no previous entries were overwritten. Previous periodic review dates are unknown. Last 30-Day, 3-Month, 6-Month, and 12-Month SEO Review dates have NOT been reset or claimed complete.

Historical evidence consulted: Git commits d57ea42 (2026-10-07), bb633e2 and 91d82a6 (2026-10-06), 0d09fc7 (2026-10-05); docs/SEO_AUDIT.md and docs/SEO_MONITORING.md. Those documents are historical claims, not substitutes for live verification. Recent work includes homepage copy/links, TypeScript/static-export migration, canonical changes to the apex domain, and the removal of Mall of Qatar from active branches. Deployment dates should be confirmed in hosting history.

---

# EXTERNAL SEO AUDIT REVIEW — 2026-10-07

## Source

User-supplied external audit; originating vendor not identified. Verdict: **Mixed**. There are reasonable clarity and linking opportunities, but category creation is redundant and a thin-content claim is not supported by the current page. No ranking guarantee is justified.

## Recommendation Verification Table

| Recommendation | Classification | Current evidence | SEO impact | Risk | Action |
|---|---|---|---|---|---|
| Change creative homepage H1 to a descriptive Qatar-wide H1 | PARTIALLY VALID | One creative H1; title already says Churros Cafe Qatar, Churros, Desserts & Coffee; visible introductory copy and brand H2 | Possible topic clarity benefit, unmeasured | Medium: recent homepage work and no performance baseline | Defer and monitor; retain creative copy |
| Use Best Churros & Specialty Coffee in Doha | POTENTIALLY HARMFUL | No evidence substantiating Best; four Qatar branches include Lusail | No substantiated benefit | Unsupported superlative and geographically narrow positioning | Reject this wording |
| Add 100–250 words because homepage is thin | INCORRECT as a mandatory prescription | Server HTML contains brand/Qatar introduction, products, waffles, crepes, pancakes, coffee, matcha, story and active-branch links | No demonstrated need for additional word count | Filler, repetition, visual clutter | No text added |
| Create separate category pages | ALREADY IMPLEMENTED | Eleven live category routes, HTTP 200 and self-canonicals | None from duplication | Cannibalization and duplicate content | Do not create URLs |
| Strengthen direct category links | PARTIALLY VALID | Homepage links to iced/hot coffee; menu hub links to all eleven categories; related-category and product-card links exist; story links are largely hub links | Modest discovery/context opportunity | Low individually; medium if mixed with recent experiments | Defer homepage expansion; consider contextual story links at next review |
| Remove closed Mall of Qatar from active location data | ALREADY IMPLEMENTED | Four active branches, no closed-branch sitemap URL; retained page visibly says permanently closed | Accurate local information | High if reintroduced as active | Preserve closure page and four-branch source |
| Repair all canonical errors reported by existing audit script | INCORRECT for the website; VALID for the script | Script expected www, but data/site.js, live canonicals and sitemap use https://churroscafeqa.com | Avoid false-positive reports | Low for script-only fix; high for speculative host reversal | Import SITE_URL into audit script |

## Recommendations Reviewed

### Recommendation 1 — Homepage H1

External recommendation: replace Golden, crispy… with Best Churros & Specialty Coffee in Doha, Qatar.

Classification: PARTIALLY VALID for semantic clarity; POTENTIALLY HARMFUL for the literal proposed wording.

Evidence: live homepage has exactly one H1, brand/category title and supporting crawlable copy. Homepage and substantial surrounding elements were edited October 6–7. No GSC export shows intent mismatch or ranking loss.

Decision: do not change now under the 28–30-day protection rule. Candidate for a later controlled test: Churros Cafe Qatar — Fresh Churros, Desserts & Coffee, retaining Golden, crispy… as a visible tagline. This is not an approved implementation yet.

Implementation: none. Expected benefit is a hypothesis, not measured. UX risk: changed headline length and visual hierarchy. Pages: / and localized /ar/ counterpart if approved later. Evaluate after baseline collection and November 6 review.

### Recommendation 2 — Content depth

Classification: INCORRECT as a blanket word-count requirement.

Evidence: JavaScript-disabled crawl sees the existing content and three homepage product cards. Full menu exposes 53 products. Body already supplies the topics requested by the audit.

Decision/implementation: no filler; preserve copy. Add specific helpful information only when verified and demonstrably missing.

### Recommendation 3 — Category pages

Classification: ALREADY IMPLEMENTED.

Existing URLs: /menu/churros/, /menu/waffles/, /menu/crepes/, /menu/pancakes/, /menu/desserts/, /menu/ice-cream/, /menu/matcha/, /menu/hot-coffee/, /menu/iced-coffee/, /menu/milkshakes/, /menu/iced-drinks/. Arabic equivalents exist under /ar/.

Decision/implementation: no new page, URL, redirect or duplicated product dataset. No separate Coffee umbrella page without a distinct evidenced intent.

### Recommendation 4 — Internal linking

Classification: PARTIALLY VALID.

Evidence: filter buttons coexist with crawlable category heading links in the menu. Product cards have category anchors; category pages have related links. Homepage initial HTML links directly to two coffee categories and all four active branches. Stories link mostly to the full menu.

Decision: category URLs are not orphaned. Defer broad new homepage links during change protection. At next review assess a few contextual story links and links on existing relevant homepage phrases, not a large new SEO section. No new intent or competing URLs needed.

Implementation: none. SEO/UX risks are low for individual anchors, but changing multiple elements now makes attribution harder. Affected future pages: /stories/, /ar/stories/, potentially / and /ar/. Measure category impressions, category visits and menu actions for 28–30 days after any approved deployment.

## Changes Implemented

URL: no public URL changed.

Old state: scripts/audit-seo.mjs hardcoded https://www.churroscafeqa.com and incorrectly flagged all 46 current canonical tags.

New state: audit imports SITE_URL from data/site.js. It now checks against the project's current canonical domain, not a historical assumption.

Reason: live pages, sitemap and code consistently use the apex domain. www currently returns a 307 to the apex. This review does not reverse the recent host decision.

Expected impact: accurate QA, not a direct ranking improvement. SEO risk and UX risk: none to public rendering; tooling risk mitigated by recrawl. Measurement period: immediate test passes.

Files changed:
- scripts/audit-seo.mjs: canonical expectation uses shared configuration.
- reports/external-review-live-2026-10-07.json: saved JavaScript-disabled production crawl evidence.
- reports/menu-validation-report.json: regenerated build validation timestamp/results.
- Churros_SEO(UPDATE).md: this newly initialized formal history.

Metadata changes: none. Heading changes: none. Internal-link changes: none. Schema changes: none. Public page layout/CSS/JS changes: none. No deployment or Git push performed.

## Already Implemented Findings

Menu category pages; server-rendered products and links; self-canonicals and language alternatives; robots and sitemap; branch pages with four business-provided phone numbers; Organization/WebSite, Menu and branch schema; four-branch closure correction. Existing JSON-LD parsed successfully; this is not a claim of exhaustive Schema.org or Google rich-result eligibility validation.

## Recommendations Rejected

Unsubstantiated Best wording, Doha-only brand positioning, new duplicate waffle/matcha/coffee keyword URLs, and arbitrary word-count expansion. They risk inaccurate claims, cannibalization, keyword repetition and unnecessary design changes. Do not restore the closed branch or invent hours, coordinates, availability or ratings.

## QA and evidence

- Live apex HTTP 200; www HTTP 307 to apex. Hosting follow-up: confirm intentional permanent 301/308 host redirect, without changing canonical again.
- Live /robots.txt and /sitemap.xml HTTP 200; crawl allowed, sitemap points to apex.
- 46 sitemap URLs crawled with JavaScript disabled: all HTTP 200, exactly one H1 each, no missing title/description, no duplicate titles/descriptions, correct self-canonicals, no noindex in sitemap, no broken internal paths detected by the sitemap-path comparison.
- Menu: 53 server-rendered product cards. All eleven English and Arabic category URLs present.
- Mall of Qatar is absent from sitemap and active branch data. Its retained historical URL visibly says permanently closed; currently index,follow. Do not treat it as an active branch.
- Production npm run build passed; source menu validation: 53 products, zero errors/warnings/missing images.
- Live 390×844 checks on /, /menu/, /locations/, and /locations/mall-of-qatar/: no horizontal page overflow and no pageerror events. No hydration exception observed in these checks. Not an exhaustive browser-console/network audit.
- No frontend changes, dependencies or assets introduced. LCP/INP/CLS were not remeasured; do not claim a CWV improvement or a measured no-regression result. Field data unavailable.
- Current menu/location title strings repeat the brand through inherited templates. Unique, not missing; note for later measured cleanup rather than re-editing today's metadata.

## Search Console / GA4 limitations

No authenticated GSC/GA4 data or fresh query exports were supplied. Previously reported homepage indexing does not establish query rankings, CTR or cannibalization. No claims about ranking gains, current preferred query URL or causes of rank changes are made. Do not perform extra changes merely to improve an audit score.

## Changes To Monitor

| URL / area | Baseline | Metric / target | Evaluation |
|---|---|---|---|
| Homepage / and /ar/ recent copy/links | Crawlable brand copy; performance baseline unavailable | GSC Qatar brand impressions, clicks, CTR, average position; target improvement vs comparable prior 28 days, not guaranteed #1 | 2026-11-06 |
| Eleven category URLs | HTTP 200, all linked by menu; GSC baseline unavailable | Query-to-page alignment, category impressions/clicks, qualified menu actions; avoid duplicate competing URLs | 2026-11-06 |
| Four branch pages | Four active branches, supplied phone numbers, correct closure status | Directions/call actions where consented analytics exists, GSC location-query clicks; target accurate NAP and qualified actions | 2026-11-06 |
| Crawl QA | 46 valid URLs, zero duplicates/errors after script correction | Maintain zero unintended errors; compare deployment changes | Each release |

Collect GSC Search results exports for queries and pages, filtered to Qatar and split by device, for the preceding 28 days now; compare a full 28–30 days after the last material deployment. Inspect Churros Cafe, churros Qatar/Doha/Lusail, waffles Qatar/Doha, crepes Qatar, matcha Qatar, Spanish latte Qatar, dessert cafe Doha. Separate URL-level intent overlap from normal multiple-page impressions. Use GA4 only if configured/consented; missing data is not zero performance.

## Next Review

Date: 2026-11-06. Suggested review only; no scheduled automation was created. Earlier intervention only for wrong facts, technical failure, indexation problems or an evidenced significant regression. Do not reset periodic review dates on a routine external-audit check.

---

# PERFORMANCE / TECHNICAL SEO AUDIT REVIEW — 2026-10-14

## Source and verified current state

User-supplied comprehensive performance/accessibility recovery audit. Starting commit c2fe2b826f47722ff00444b4ef72e7b62f8691e7 preserved on local rollback branch perf-baseline-2026-10-14. Current code/live crawl have 48 sitemap URLs (including English/Arabic permanently closed Mall of Qatar pages), rather than the 46 recorded on October 7. This review did not add those URLs or reactivate that branch. Four active branches remain.

## Recommendations reviewed and decisions

- Oversized photography and absent responsive variants: VALID. Implemented a build-time hashed WebP pipeline with true dimensions and srcsets; originals and appearance retained.
- Separate render-blocking font declaration CSS: VALID. Bundled existing declarations. Necessary critical CSS remains to avoid FOUC/CLS; font families/colors unchanged.
- Missing CDN: INCORRECT. Vercel HIT confirmed for live HTML, source image and other assets. Added immutable cache policy only for new hashed variants, preserving the existing www-to-apex redirect; deployment verification pending.
- Missing GA4: OUTDATED. Existing G-CZHKZXTHKC retained with environment override, async loading and saved opt-out. Added actual category/contact/nearest/social interaction events and prevented duplicate menu_view emission. Property receipt not authenticated.
- Replace all empty image alts: PARTIALLY VALID. Decorative thumbnails keep empty alt; localized meaningful image alternatives added. Nested main landmarks and overridden product accessible names corrected.
- Aspect ratio warning: PARTIALLY VALID. Actual source dimensions replace guesses; intentional cover/contain crops preserved. Locations minimum grid width corrected for 320px screens.
- Short homepage meta description: OUTDATED. Current accurate homepage text retained. Locations description/lead corrected because opening hours were promised but unavailable.
- SPF: VALID DNS gap, PENDING sender confirmation. No email provider invented and no DNS changed. DMARC absent; DKIM selector unknown.
- ads.txt: NOT APPLICABLE to inspected implementation; no advertising inventory seller integration found.
- Excessive requests: PARTIALLY VALID. Disabled shared-navigation auto-prefetch, retained async code splitting and useful content links. Raw request count is not the optimization objective.

## Changes implemented

Affected URLs: shared assets/components across existing English/Arabic routes; locations metadata only at /locations/. No new routes, no H1/title/canonical/hreflang/schema/menu changes. Home creative wording and typography protected. About/branch/first-location photo LCP candidates now eager rather than lazy. Exact file list and evidence: docs/CHURROS_OPTIMIZATION_RESULTS.md; initial investigation: docs/CHURROS_PERFORMANCE_AUDIT.md.

Local mobile initial application bytes: 3,943,177 to 1,053,081 (~73.3% smaller); initial image bytes: 3,218,557 to 303,509 (~90.6% smaller). These are controlled local uncompressed, GA-mocked payload measurements, not deployed production figures. Full-scroll mobile application transfer: 11,053,331 to 1,648,503 bytes. Two release Lighthouse mobile runs: performance 80/75, FCP ~1.21s, LCP 5.34–7.32s (still above target). Desktop scores 96/96, LCP ~1.41s. Accessibility 96 and SEO 100. Hosting-emulation differences and original audit noncomparability are documented; no field INP or ranking result claimed.

## QA and remaining work

Production static build and TypeScript pass; 10 browser tests; 48-route no-JavaScript crawl with zero errors/duplicate titles/descriptions; seven viewport widths; keyboard, mobile navigation, English/Arabic menus and analytics queue checks. New cache policy and performance still need live deployment verification; GA4 receipt needs property access; SPF needs sender details. Protected-color contrast and mobile simulated LCP remain unresolved. Dependency audit reports 8 affected packages; no untested major upgrade was attempted. Do not call this an all-green or completed field-CWV result.

No push, deployment, new subscription, DNS edit, source-image deletion or periodic automation performed. Search Console verification preserved.

## Measurement and next review

Keep the previously recorded 2026-11-06 SEO review date. Last 30-Day / 3-Month / 6-Month / 12-Month SEO Review dates are NOT reset. After deployment record the actual date, re-run live tests immediately and evaluate 28 days of field p75 LCP/INP/CLS where available. Compare qualified menu/branch actions and Qatar organic clicks against the preceding equivalent period; no #1 ranking guarantee. Do not change titles/H1 again to chase lab scores.

---

# EXTERNAL SEO AUDIT REVIEW — 2026-10-14

## Source

User-supplied Gemini keyword/backlink report and unchanged Churros Cafe research workbook. Current request authorizes safe website implementation. Full classification table, evidence, per-change risk/benefit/URLs and measurement plan: `docs/GEMINI_KEYWORD_IMPLEMENTATION_REVIEW.md`.

## Recommendations Reviewed

1. Five-branch promotion: INCORRECT / POTENTIALLY HARMFUL. Mall of Qatar is permanently closed. Live Arabic home/locations metadata and Arabic About metadata were factually stale despite four correct active branch records. Corrected these three descriptions and two corrupted Arabic branch sentences.
2. Missing category pages / canonical consolidation: ALREADY IMPLEMENTED. All eleven bilingual categories exist, live www returns 308 to apex, and 48 live routes have correct self-canonicals. No new route, sitemap or redirect changes.
3. Arabic menu coverage: VALID. Completed display translations/transliterations for all 53 products without changing English/source names. Added missing category/control labels and translated the Arabic menu H1/lead and closed-branch H1 that previously fell back to English. Existing English descriptions are preserved with explicit language markup; this is not a full Arabic description translation.
4. Menu schema: VALID. Fixed category/language Menu ID/URL reuse, linked sections/items to existing category URLs and product anchors, localized visible names and added exact source-backed fixed/range QAR offers. No ratings, availability, checkout, dietary, delivery or sales claims.
5. Internal links: PARTIALLY VALID. Linked eleven English menu section headings to existing category pages. Filters/anchors preserved; no new homepage link campaign or competing pages.
6. Missing descriptions / aggregator additions: POTENTIALLY HARMFUL. Removed fabricated fresh-to-order/premium-ingredients modal fallback. The 21 absent descriptions remain absent; no extra products, sauce options or altered prices from Gemini accepted.
7. Wholesale keyword insertion, demand/rank/revenue claims, homepage H1/title rewrites: rejected/deferred. No authenticated baseline or business data supports them, and recent-change protection still applies. Backlink prospects do not authorize submissions, spending or third-party account modifications.

## Changes Implemented

Application files: `data/seo.js`, `data/content.ts`, `data/menu.js`, `components/SchemaMarkup.tsx`, `components/cafe-interactive.tsx`, `app/menu/page.tsx`.

QA/docs: `tests/seo-source-truth.spec.cjs`, `docs/GEMINI_KEYWORD_IMPLEMENTATION_REVIEW.md`, `reports/gemini-review-live-before.json`, `reports/gemini-review-local-after.json`, regenerated validation timestamp in `reports/menu-validation-report.json`, and this appended history entry.

Metadata: only the three inaccurate Arabic branch descriptions. Headings: translation repair on existing Arabic menu and closed-branch pages; English/homepage H1s retained. Internal links: English menu section headings and stable product fragment IDs. Schema: exact menu entities/prices as above. No source menu, styles, dependencies, canonical host, hreflang, sitemap, robots, homepage copy, branch contacts, images or GA4 changes.

## QA and limitations

Build/TypeScript passed. Fourteen tests passed including schema-to-source checks on all 24 menu/category pages, all 48 sitemap URLs, mobile layout, interactions and local payload/CLS budgets. Live/local audits report zero canonical/indexability/H1/metadata errors or duplicate titles/descriptions. Menu validator: 53 products, no errors/warnings/missing assets, 21 optional descriptions absent. Mobile/desktop screenshots reviewed. Turn-start repository hashes protect pre-existing changes and business-source data.

Arabic root HTML is still initially English until hydration; main content is explicitly Arabic/RTL. Proper root-layout refactoring remains a technical/accessibility follow-up, not an asserted ranking fix. Native editorial review of localized branded spellings and approved translations of supplied English descriptions remain useful. No field CWV or GSC/GA4/GBP results available. No push, deploy, outreach, link purchase, listing submission or DNS change performed.

## Changes To Monitor

URLs: Arabic home/about/locations metadata; Arabic menu/product-bearing pages; English menu heading links; bilingual menu schema. Immediate target: correct facts and source/schema consistency. Organic baseline: unavailable. Compare Qatar query/page clicks, impressions, CTR, menu engagement and branch actions over equivalent 28–30-day periods after actual deployment. No first-place guarantee.

## Next Review

Keep 2026-11-06. Record actual deployment separately and allow a full 28–30-day measurement window for this patch. Last 30-Day, 3-Month, 6-Month and 12-Month SEO Review dates remain unchanged; no automation scheduled.
