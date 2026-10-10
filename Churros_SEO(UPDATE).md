# Churros Cafe SEO history

Last SEO Run: 2026-10-07 (formal external recommendation review).

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
