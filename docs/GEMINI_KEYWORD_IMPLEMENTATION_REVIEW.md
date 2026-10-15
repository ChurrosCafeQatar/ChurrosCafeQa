# Keyword research implementation review

Date: 2026-10-14 (Asia/Riyadh). Status: implemented and tested locally, not deployed.

## Verdict: mixed; unsafe to implement wholesale

Inputs: the user's Gemini report and unchanged research workbook, `Churros-Cafe-Keyword-and-Backlink-Research.xlsx`, plus current source code, SEO history and a fresh 48-page live crawl. The workbook is a research baseline, not an instruction to insert all 218 proposals. Its scores measure assessed business fit, not Qatar search volume, difficulty or ranking probability.

Gemini identifies relevant menu topics but contradicts the business's confirmed closure of Mall of Qatar, supplies unsupported revenue/demand/rank claims, changes Espresso from QAR 14 to QAR 16, adds unapproved product details and treats existing category pages as missing. Its report also inconsistently describes 46 versus 53 products. No external menu or directory overrides the supplied 53-product source.

No GSC, GA4, Keyword Planner or paid backlink/rank dataset was available. A public search result's absence is not proof that a URL is unindexed. No first-place ranking can be promised.

## Recommendation verification before implementation

| Recommendation | Classification | Current evidence | Impact / risk | Action |
|---|---|---|---|---|
| Consolidate www and apex | ALREADY IMPLEMENTED | Fresh request to www `/menu/waffles/` returns 308 to apex; 48 live self-canonicals agree with `data/site.js` | Avoid reversing a recent host decision | Preserve redirects, canonicals and sitemap |
| Create waffles, crepes, pancakes, matcha and other category pages | ALREADY IMPLEMENTED | All eleven English and Arabic category routes resolve; fresh crawl has 48 HTTP 200 pages | Duplicate pages would compete for the same intent | No new routes |
| Restore/promote Mall of Qatar as the fifth branch | INCORRECT / POTENTIALLY HARMFUL | User confirms permanent closure; active branch data and schema contain four | Customer misinformation | Keep closed pages historical; correct three stale Arabic descriptions |
| Expand Arabic menu coverage | VALID | Missing category translations, 41 English product-name fallbacks, English menu H1/lead, two corrupted branch sentences | Better language usability; no claim that translation alone raises rankings | Add faithful display translations/transliterations, retain original product data |
| Fix menu structured data | VALID | Every category/language was described using the English full-menu ID/URL; prices absent despite visible source prices | Clearer entity/page relationship; not a promised Google rich result | Page-specific Menu identities, stable section/item anchors, source-backed fixed/range offers |
| Improve direct category navigation | PARTIALLY VALID | English hub's section headings were plain text; card links existed | Low-risk navigation improvement, not orphan repair | Link headings to existing categories; keep anchor filter UI |
| Fill missing item descriptions from aggregators | POTENTIALLY HARMFUL | 21 descriptions intentionally blank; modal invented a fresh-to-order/premium-ingredients fallback | Unsupported product claims | Remove fallback; no invented replacements |
| Change homepage title/H1 and add more keyword text | NOT SUPPORTED NOW | Strong existing brand/category copy, recent changes protected by history, no query baseline | Repeated changes obscure attribution | Preserve homepage copy and titles; keep November 6 review |
| Remove template footer / install missing analytics | OUTDATED for current code | Branded footer and existing GA4 already implemented locally; production privacy text is older | Duplicating analytics risks duplicate collection | Preserve existing implementation; deploy/recheck separately |
| Treat claimed #1/Top 3/high demand/high margin as measured facts | INCORRECT as supplied evidence | No reproducible Qatar rank dataset, sales data or authenticated metrics supplied | False prioritization and unsupported marketing claims | Do not publish those claims |
| Acquire guaranteed free/follow links, reopen mall listing or claim unknown assets | POTENTIALLY HARMFUL as blanket execution | Eligibility, asset ownership, costs and link attributes not established; mall closed | Inaccurate citations, spending or link-spam risk | No submissions, messages, purchases or account edits |

## Implemented changes and safety

### 1. Arabic branch facts

- Current state: Arabic home/locations metadata named the closed mall; About described five branches. Two visible branch translations were corrupted.
- Change: correct only these facts to four active branches: Lusail, Abu Hamour, Duhail, Downtown; restore legible Arabic sentences.
- Evidence: `CHURROS_CAFE.branches`, user business instructions, live metadata in `reports/gemini-review-live-before.json`.
- Benefit: accurate local information and readable branch discovery.
- Risk: low. Factual-error exception to recent-change protection.
- URLs: `/ar/`, `/ar/locations/`, `/ar/about/` and shared Arabic branch copy.

### 2. Arabic menu display and source accuracy

- Current state: only 12 product names had Arabic labels. Several category filters, links, menu H1/lead and closed-page H1 fell back to English.
- Change: complete all 53 product display names; translate missing navigation labels and affected Arabic headings. Preserve English/source names, categories, all prices, images, sauces and descriptions. English descriptions/sauce names are explicitly marked `lang="en"` rather than silently machine-rewritten. No new products or claims.
- Remove modal About section when the source description is absent. Existing supplied descriptions remain exact.
- Benefit: Arabic readers can identify/search actual products and navigate current categories.
- Risk: localized branded spellings may still benefit from business/native-speaker editorial review. These are display translations, not measured keyword targets.
- URLs: existing Arabic product-bearing pages, shared product dialogs; `/ar/menu/` and historical `/ar/locations/mall-of-qatar/` heading localization.

### 3. Structured data

- Current state: all categories/languages reused `https://churroscafeqa.com/menu/#menu`; no prices.
- Change: each rendered Menu uses its own page URL/ID. MenuSection and MenuItem IDs resolve to existing category routes and product anchors. Names match each page's displayed language. Offers derive from the same source prices as UI. Blue Lagoon Mojito remains QAR 20–25 and Iced V60 remains QAR 25–27, represented with `PriceSpecification.minPrice/maxPrice`; neither is replaced by a fixed starting price.
- Benefit: accurate machine-readable menu facts; no invented availability, checkout, ratings, nutrition, dietary suitability, offer dates or delivery promises.
- Risk: low, covered by full schema-to-source assertions. This is Menu schema, not a claim of Product rich-result eligibility.
- URLs: `/menu/`, `/ar/menu/` and all 22 existing category URLs.

### 4. Navigation

- Current state: English menu categories had card links but no linked section headings.
- Change: make all eleven section headings normal links to their existing category routes. Product cards gain stable IDs matching schema URLs. Anchor-based menu navigation remains intact.
- Benefit: clearer category navigation on desktop/mobile; no competing landing pages.
- Risk: low. No homepage/internal-link campaign, footer link block or new content section added.

## Keyword ownership retained

| Intent / relevant research cluster | Existing target |
|---|---|
| Churros Cafe, official brand and Qatar identity | `/` and `/ar/` |
| Full menu and prices | `/menu/` and `/ar/menu/` |
| Spanish/mini/filled churros, Mixed Churros and Celebration Box | `/menu/churros/` |
| Belgian waffles and Mini Waffle | `/menu/waffles/` |
| Dubai Chocolate Crepe, pistachio kunafa, other verified crepes | `/menu/crepes/` |
| Dessert mini pancakes, not unverified breakfast | `/menu/pancakes/` |
| Hola Box, Puffy Donut, Strawberry Chocolate | `/menu/desserts/` |
| Two existing ice cream products only | `/menu/ice-cream/` |
| Matcha Latte, Frappe, Raspberry and Salted Caramel Matcha | `/menu/matcha/` |
| Arabic Qahwa, Spanish Latte, hot coffee and Hot Chocolate | `/menu/hot-coffee/` |
| Cold Brew, Iced Spanish Latte, Iced V60 and shaken espresso | `/menu/iced-coffee/` |
| Actual milkshakes, including New York Cheesecake milkshake | `/menu/milkshakes/` |
| Verified mojitos, iced teas, Karkade and lemonade | `/menu/iced-drinks/` |
| Near-me / all branch discovery | `/locations/` |
| Specific active branch intent | `/locations/lusail/`, `/locations/abu-hamour/`, `/locations/duhail/`, `/locations/downtown/` |

Each category/branch already has an `/ar/` equivalent. No keyword-list block, hidden text, meta-keywords tag, typo stuffing, alternate keyword URL or additional product URL was added. Existing commercial keyword coverage was retained rather than rewritten speculatively.

## What was intentionally protected

- Homepage title, H1, description, brand copy, layout, colors, fonts and imagery.
- Menu-source JSON, exact English/source product names, prices, quantities, sauces and optional descriptions.
- All public paths, sitemap, robots, canonical host, hreflang and closure-page status.
- Existing GA4, privacy controls, performance/image work and all pre-existing local edits.
- Existing structured Organization/branch facts, phone numbers and approved maps.
- No outreach, paid links, listing claims, hosting changes, DNS updates, Git push or deployment.

## Remaining issues and owner actions

1. Deploy the tested local changes through the normal hosting workflow, then run a fresh live audit. Local success is not proof of deployment.
2. Arabic root `<html>` still initially says `lang="en"`; Arabic main content has `lang="ar"`/RTL, and the header sets document language after hydration. A proper server-rendered root-language fix needs route-layout refactoring and separate navigation/export regression coverage. No client-only SEO workaround was added. Google says it determines page language from visible content, not `lang`; this remains an accessibility/document-language issue, not a demonstrated ranking cause.
3. Supplied product descriptions remain English on Arabic pages. Do not claim a fully translated Arabic menu. Approve source-faithful Arabic descriptions with the business before further translation; blank descriptions must remain blank.
4. Get GSC Qatar query/page exports and inspect individual URLs before claiming indexing exclusions or cannibalization. Private metrics remain unavailable. Existing GA4 event dispatch tests do not verify receipt in the property.
5. Business Profile: owner should confirm four distinct active records, branch-specific URLs/phones and approved opening hours; the mall must stay permanently closed. Do not create duplicate profiles or infer service areas/hours.
6. Backlinks: prepare factual corrections for existing Qatar Living/ILQ mentions, not guaranteed link purchases. Verify eligibility and ownership before any directory or FollowMe update. No backlink can be created just by changing local website code.
7. Existing performance audit still records mobile lab LCP/contrast concerns. This patch adds no heavy libraries or assets and passes local payload/CLS tests, but no field CWV improvement is claimed.

### Verified prior-research outreach candidates, not executed

- Qatar Living existing Churros Cafe mention: https://www.qatarliving.com/en/article/where-get-churros-qatar — update obsolete branch facts and optionally request the official URL; editorial acceptance unknown.
- ILQ existing mention: https://www.iloveqatar.net/dining/foodieNews/desserts-sweets-different-countries-cuisines-doha — factual/official-link review, not an assumed follow backlink.
- ILQ matcha guide: https://www.iloveqatar.net/dining/foodieNews/unique-matcha-desserts-drinks-cafes-doha — genuine verified matcha products only; editorial inclusion not guaranteed.
- Mall of Qatar listing: correction/closure only. Never announce an opening to get a link.
- FollowMe/YallaDine: business must verify ownership and data accuracy. Their extra products or labels cannot replace the website's approved menu.

Source workbook's retrieval date: 2026-10-14. No new contact or submission was made in this implementation.

## QA

- Production static build and TypeScript pass.
- Source validator: 53 products, 0 errors, 0 warnings, 0 missing images, 21 intentionally absent descriptions.
- 14 browser tests pass, including all 24 menu/category language pages checked against visible cards and source prices; all 48 sitemap routes; mobile/desktop widths 320–1920; navigation, search, dialogs, analytics events, local payload and CLS budgets.
- Live-before and local-after 48-page audits: zero missing metadata/canonical/H1/indexability errors; zero duplicate titles/descriptions.
- Desktop and mobile menu/category screenshots inspected; no overflow or page exceptions in checked views.
- Repository hashes compared with the turn-start dirty-worktree baseline. No menu-source, homepage, canonical/redirect/sitemap, styling or dependency changes. Pre-existing edits preserved.
- This does not establish field CWV, authenticated ranking, rich-result eligibility or production deployment.

## Measurement plan

| Change | Baseline | Target / metric | Evaluation |
|---|---|---|---|
| Arabic factual corrections | Three inaccurate descriptions and two corrupted sentences | Zero inaccurate active-branch references; accurate branch visits/calls | Immediately after deployment; organic trends after 28–30 days |
| Arabic product/navigation localization | 12/53 product labels translated; some English headings/filter labels | 53/53 display labels; Arabic menu search/engagement and GSC query-to-page alignment | QA immediately; compare matched 28-day Qatar periods |
| Schema accuracy | Reused Menu IDs and absent prices | 24 distinct page Menu identities, all published prices match source | Every build and after deployment |
| Category navigation | Plain section headings, existing card links | Eleven working heading links; category visits and qualified menu actions | QA immediately; 28–30-day post-deployment comparison |
| Organic impact | GSC/GA4/GBP baseline unavailable, not zero | Compare clicks, CTR, relevant queries, calls/directions/menu actions; no rank promise | Keep planned 2026-11-06 review; use actual deployment date for full measurement window |

Collect baseline exports before deployment where possible. Filter GSC to Qatar and split language, device, brand/nonbrand and landing URL. Compare equivalent periods, documenting other deployments. Never infer causation from one ranking movement. Periodic 30-day/3/6/12-month review dates have not been reset.

## Official references checked 2026-10-14

- Google multilingual guidance: https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites
- Google link-spam policies: https://developers.google.com/search/docs/essentials/spam-policies#link-spam
- Schema.org MenuItem and offers: https://schema.org/MenuItem
- Schema.org price bounds: https://schema.org/PriceSpecification
- Schema.org MenuSection: https://schema.org/MenuSection

Live site reader requests failed in the web tool; the direct HTTP and browser crawls succeeded. Evidence is in `reports/gemini-review-live-before.json` and `reports/gemini-review-local-after.json`.
