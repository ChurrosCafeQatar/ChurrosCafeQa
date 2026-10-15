# Churros Cafe — performance recovery results

Review date: 2026-10-14. Implementation is LOCAL and has NOT been pushed or deployed.

## Summary

Responsive, content-hashed WebP photography substantially reduces transferred bytes without replacing any photographs. Originals, fonts, colors, headings, animation rules, menu data, route architecture and canonical host are preserved. All 48 sitemap URLs pass the no-JavaScript SEO crawl. Four active branches remain; the two existing Mall of Qatar closure URLs remain closed, not active branches.

The production build and TypeScript check pass. Ten Playwright tests cover navigation, English/Arabic menu interactions, product dialogs, maps/contacts, local admin drafts, SEO, responsive geometry and a mobile payload budget. These are local production-export tests, not a deployment certification.

Not everything is resolved: mobile simulated LCP remains above target; some protected brand colors fail contrast; DNS email configuration needs sender confirmation; GA4 property receipt and deployed new cache headers require external verification. Dependency advisories were also found and recorded separately below.

Rollback reference: local branch `perf-baseline-2026-10-14`, commit `c2fe2b826f47722ff00444b4ef72e7b62f8691e7`. The starting working tree was clean. No reset, branch checkout, remote push or source-image deletion was performed. Review/revert this patch selectively if needed, preserving any subsequent work.

## Measurement method and limitations

- Framework: Next.js 16.3.6, React 19.3, App Router, static export. Production host confirmed as Vercel. Canonical origin remains `https://churroscafeqa.com`.
- Supplied audit: 10.07 MB overall, 9.81 MB images, 44 requests, FCP 2.032 seconds. Its viewport, cache, compression, scrolling and throttling settings are unknown. It is not a controlled comparison with our results.
- Controlled payload runs: `scripts/measure-performance.mjs`, Edge headless, mobile 390×844/DPR 2 and desktop 1440×900/DPR 1, fresh browser contexts, same uncompressed local production static export on port 4194 before/after. Initial sample follows network-idle plus one second; full sample follows a scripted page scroll. Google tag download is mocked in these payload tests to isolate application bytes; real GA traffic is NOT included. MB below means 1,000,000 bytes.
- Lighthouse: production export, not Next development mode; Edge remote-debug port 9236, simulated mobile/default and desktop preset, two baseline and two release runs per profile. GA is not mocked by Lighthouse. Scores/timings are lab estimates, NOT field CWV or rankings.
- Baseline used Python's simple static server. It returned 404 for Next's flattened segment-prefetch paths even though the live Vercel URL returned 200. The final local preview server emulates those existing Vercel mappings and has no console/network errors in the sampled checks. This improves test accuracy; it is NOT a claimed production bug fix. Payload comparisons retain the same Python server on both sides. Lighthouse release uses the corrected preview server on port 4195; therefore its timing comparisons have this hosting-emulation caveat. Do not attribute its Best Practices change to production code alone.
- Raw local JS/CSS is uncompressed, unlike deployed immutable Next assets. Mobile Lighthouse identifies the large H1 as LCP, not the hero image. Simulated LCP varies substantially with the JS/network simulation; unused framework/client JS and real GA remain contributors. Do not substitute the fast unthrottled local observed text paint for the simulated result or claim the field target is met.
- `before*` are baseline evidence, `after*` and `final*` are intermediate experiments, `release*` are the reported final homepage measurements. Subsequent About/branch eager-loading corrections do not change homepage composition. Final build/tests include those corrections.

## Issue-resolution table

FIXED here means implemented/verified locally, or an existing production feature verified. Publishing all new code remains pending.

| Issue | Before | After | Status | Evidence |
|---|---|---|---|---|
| Render-blocking resources | Separate font declaration stylesheet plus main CSS | Font declarations bundled; one necessary critical CSS file retained; async scripts; shared navigation no longer prefetches unrelated destinations | FIXED | `app/layout.tsx`, `components/navigation-link.tsx`; regression test; Lighthouse still flags the legitimate ~50 KB uncompressed critical stylesheet (~120 ms estimated opportunity), deliberately not deferred |
| Modern image formats | Menu WebP already existed; large campaign/branch PNGs lacked responsive variants | Build-time WebP variants for 80 source assets; browser icons and stable social/schema source references retained intentionally | FIXED | `scripts/build-images.mjs`, image inventory and rendered srcsets |
| Missing/empty alt text | No blanket missing-alt defect reproduced; decorative filter thumbnails valid; Arabic informative alternatives needed improvement | Product/branch/campaign/logo alternatives localized; intentional decorative empty alts retained | FIXED | 48-route crawl: zero missing alt attributes; responsive/keyboard tests; sampled English/Arabic screenshots |
| No CDN detected | Generic scanner warning | Production HTML, source image, robots, sitemap and CSS return Vercel cache HIT; hashed Next CSS already immutable | FIXED | `reports/performance/live-delivery.json`; no second CDN added |
| Optimized-image cache delivery | New variants not deployed | Immutable one-year Vercel header configured only for hashed variants; existing www-to-apex permanent redirect preserved | PENDING EXTERNAL ACTION | `vercel.json`; deploy and inspect a generated WebP response header |
| Distorted images | Guessed intrinsic dimensions; intentional cover crops were not proof of distortion | True source dimensions, same intentional cover/contain behavior, stable aspect geometry; branch cover uses 90vw responsive sizing | FIXED | Image manifest; seven-width tests; visual checks of hero, story, product and branch samples |
| Oversized images | Mobile initial images 3,218,557 bytes; full-scroll images 10,318,237 bytes | Initial 303,509 bytes; full-scroll 890,893 bytes; originals retained | FIXED | `before.json` vs `release.json`; food photos quality 85, logo quality 95; no upscaling |
| LCP photo loading | Hero prioritized; observed About/branch/first location photo LCP candidates were lazy | Hero, About photo, branch cover and first directory photo eager/high; offscreen photos lazy | FIXED | Browser LCP-element inspection and regression checks |
| GA4 missing | Already configured as G-CZHKZXTHKC with public environment override and saved opt-out | One async tag; one tested page_view per route navigation; canonical interaction events added while preserving legacy direction/call events | FIXED | Analytics queue/network-mock tests; no new property or heavy dependency introduced |
| GA4 property delivery | No authenticated property access | Client behavior verified, but receipt/DebugView/Realtime not independently verified | PENDING EXTERNAL ACTION | Property administrator must confirm page and interaction events after deployment |
| SPF | No SPF TXT record; no MX answer (authority SOA only) | No unverified DNS edits | PENDING EXTERNAL ACTION | 2026-10-14 DNS lookup: only Search Console verification TXT; outbound provider unknown |
| HTTP requests | Supplied 44; measured mobile initial 46, desktop 50 | Mobile 42, desktop 43; full-scroll 59/65 versus 66/74 | FIXED | Request inventory; redundant global navigation prefetch reduced; remaining split bundles, fonts, icons and meaningful image variants preserved |
| Meta description | Supplied 120-character wording was outdated; current home copy already accurate | Home unchanged; location description no longer promises absent opening hours; zero missing/duplicate descriptions across 48 routes | FIXED | Live baseline and final crawl reports; `app/locations/page.tsx` |
| FCP | Supplied 2.032 s; controlled mobile baseline mean 1.435 s | Mobile mean 1.209 s; desktop ~0.289 s | FIXED | Two runs per profile; local lab only; production validation pending |
| Mobile LCP | Baseline 7.21–7.68 s simulated | Release 5.34–7.32 s; still above 2.5 s | UNRESOLVED | H1 is LCP; raw client/framework JS and real GA remain in the mobile simulation; next step is deployed compressed-network trace, not removing the design |
| Contrast | Existing small cream text on orange and other palette combinations flagged | Brand colors and type sizes preserved as instructed; accessibility 96, not 100 | UNRESOLVED | Lighthouse color-contrast audit; #FFF3E0 on #d0551d is about 3.83:1, below 4.5:1 for normal text; needs a separately agreed color/type adjustment |
| ads.txt | No file | No inventory-selling/AdSense/Ad Manager integration found; no fabricated seller declarations | NOT APPLICABLE | Application/dependency inspection; reassess only if advertising inventory monetization is introduced |

## Performance comparison

### Supplied audit versus this run — not a controlled comparison

| Metric | Original supplied audit | Optimized measurement | Improvement |
|---|---|---|---|
| Homepage transfer | 10.07 MB | 1.05 MB mobile initial / 1.65 MB full-scroll, application-only | Not attributable across unknown settings; controlled comparison below |
| Image payload | 9.81 MB | 0.304 MB initial / 0.891 MB full-scroll | Not a like-for-like external comparison |
| HTTP requests | 44 | 42 initial / 59 full-scroll | Sampling differs |
| FCP | 2.032 s | 1.209 s mobile mean | External settings unknown |
| LCP | Not supplied | Mobile 5.34–7.32 s; desktop ~1.41 s | Target still missed on mobile |
| INP | Not supplied | Unavailable | No CrUX/real-user 75th-percentile measurement; TBT is not INP |
| CLS | Not supplied | 0 in tested homepage runs | No field guarantee |
| Mobile Lighthouse performance | Not supplied | 75–80 | See controlled baseline below |
| Desktop Lighthouse performance | Not supplied | 96 | See baseline below |
| Accessibility | Not supplied | 96 | Remaining contrast limitations |
| SEO | Not supplied | 100 | Audit score does not establish ranking or complete SEO correctness |

### Independently measured before/after

| Metric | Baseline | Optimized | Change |
|---|---:|---:|---:|
| Mobile initial application transfer | 3,943,177 B | 1,053,081 B | 73.3% smaller |
| Mobile initial images | 3,218,557 B | 303,509 B | 90.6% smaller |
| Mobile full-scroll application transfer | 11,053,331 B | 1,648,503 B | 85.1% smaller |
| Mobile full-scroll images | 10,318,237 B | 890,893 B | 91.4% smaller |
| Desktop initial application transfer | 3,981,056 B | 1,076,999 B | 72.9% smaller |
| Desktop full-scroll application transfer | 11,058,701 B | 1,711,116 B | 84.5% smaller |
| Initial requests, mobile / desktop | 46 / 50 | 42 / 43 | 4 / 7 fewer |
| Full-scroll requests, mobile / desktop | 66 / 74 | 59 / 65 | 7 / 9 fewer |
| Mobile simulated FCP, two-run mean | 1.435 s | 1.209 s | ~15.7% lower, hosting-emulation caveat above |
| Mobile simulated LCP, two-run mean | 7.446 s | 6.326 s | ~15.0% lower; target NOT met |
| Desktop simulated LCP, two-run mean | 4.818 s | 1.408 s | ~70.8% lower |
| Mobile performance scores | 75 / 75 | 80 / 75 | Variable; do not promise 80 consistently |
| Desktop performance scores | 77 / 79 | 96 / 96 | +18 points on two-run mean |
| Accessibility / SEO | 96 / 100 | 96 / 100 | Maintained |
| Best Practices | 96 | 100 | Local prefetch-server emulation correction, not a proven production gain |
| CLS | 0 | 0 | No observed homepage shifts |
| Mobile TBT | 92.5–99 ms | 81–107 ms | Similar range; not INP |

Application-only initial transfer meets the requested byte targets locally. Third-party bytes, live compression, geographic latency and real-user CWV must be checked after deployment. Do not publish these numbers as live PageSpeed results.

## Request inventory and critical path

The supplied 44-request list itself was not provided. Every captured initial request is retained in `before.json` and `release.json`, with final classifications in `comparison-and-requests.json`.

- Critical: HTML, one stylesheet, the two existing local next/font files, responsive logo/hero imagery.
- Necessary async: split Next/React runtime, navigation/menu/dialog hydration and analytics. The native static export does not use a server image optimizer, so build-time responsive variants are necessary.
- Deferrable: lazy section/product photography and thumbnails; primary content-link prefetch retained for their navigation behavior. Shared header/footer automatic prefetch removed. Different thumbnail/card widths are intentional, not duplicate full-size image downloads.
- Browser-managed: favicon/icon checks; repeated zero-transfer favicon entries are counted as recorded requests, not falsely claimed as two payload downloads.
- Removed: separate font declaration stylesheet and unnecessary shared-navigation destination prefetch. No navigation code, typography, menus or animations were removed to game a score.
- A normal Next nomodule fallback remains for older browsers; modern browsers do not fetch/execute it. No synchronous applicable external script was found by the regression check.
- Remaining Lighthouse CSS warning is for necessary critical styles. Delaying that stylesheet would risk FOUC/CLS. Its uncompressed ~50 KB is not its deployed compressed transfer size.

## Image delivery, visual and accessibility verification

The build scans 80 source assets, retains originals, and creates content-hashed WebP widths 96–1600 with no upscaling. Actual intrinsic dimensions and a responsive srcset are used by SiteImage; filter thumbnails use 48px sizing; modal and branch cover sizing are explicit. Source metadata, original bytes, generated dimensions and variant bytes are recorded in `image-inventory.json`. Rendered/current-source observations are in payload reports. Social/schema URLs and browser favicon formats remain stable intentional exceptions.

Screenshots inspected: desktop/mobile home, desktop/mobile story, Arabic home, mobile menu, product cards and branch photography. Food detail, sauce texture, packaging, typography/layout and intentional crops were retained in these samples. Screenshots are saved under `reports/performance/verified-*.png`; full-page payload screenshots may contain lazy images that were offscreen at capture time and are not evidence of broken images.

Layout checks: 320, 375, 390, 768, 1024, 1440 and 1920px on home, menu, locations and Arabic menu; no page overflow; width/height attributes and responsive srcsets; cover/contain or matching natural ratios. Product descriptions remain hidden on mobile as before. Only the locations grid minimum was adjusted to fit a 320px viewport.

Removed nested main landmarks/duplicate `id=main`; product buttons now derive their names from visible content instead of an overriding English-only aria-label. Escape dismissal/focus return and mobile navigation/language switching pass. No exhaustive assistive-technology certification is claimed. Existing local-only Cooper Black font lookup remains unchanged; an actual licensed webfont would be needed to make that pre-existing font fallback identical on devices without Cooper installed.

## Analytics, DNS and external follow-up

GA4 remains `G-CZHKZXTHKC`, overrideable with `NEXT_PUBLIC_GA_MEASUREMENT_ID`. There is no second tag/container. Saved rejection still prevents loading; privacy settings still work. Existing immediate-loading policy was preserved, not represented as a legal consent-compliance assessment.

Tested: one config with send_page_view false, one manual page view per tested client navigation, one tag, menu/category/product actions, branch view, call/directions, nearest-location and Instagram clicks. Offer view/click handlers are retained. Typed search queries, precise geolocation, phone values and form data are not passed through the event allowlist. Legacy `location_call_click`/`location_direction_click` continue alongside requested `call_click`/`direction_click` aliases; do NOT sum both event names as separate business actions. GA4 DebugView/Realtime receipt is pending property access.

DNS on 2026-10-14: root TXT contains Search Console verification but no SPF; MX lookup returned no MX answer; `_dmarc` returned NXDOMAIN. DKIM cannot be reliably tested without the sender's selector. No SMTP/contact-form email provider was found in app configuration. Exact remaining action: identify every real outbound email service (or confirm no sending), obtain that provider's authorized SPF/DKIM values, then publish ONE root SPF TXT in Porkbun and verify DNS. Do not delete Search Console TXT, invent includes, or publish a deny-all SPF before confirming whether the business sends email. DMARC policy should be planned with the verified sender, not guessed in this patch.

No advertising inventory seller integration was found. Buying Google/Meta ads is not a reason to create ads.txt. If monetization is added, use only the seller's actual publisher declarations.

## Additional dependency finding

`npm audit --json` reports 8 affected packages (6 high, 2 moderate), saved as `reports/performance/dependency-audit.json`. Next advisories include server/cache/image-optimizer paths and development-server access; this project exports static files and does not operate those runtime features in the inspected deployment. This is not a blanket claim of no risk. Restrict dev-server access, assess a targeted Next patch upgrade, and review Tailwind's transitive tooling advisories separately. No forced Tailwind 4 migration or untested dependency update was made during this design-preserving performance change. Dependency remediation remains UNRESOLVED, not silently passed.

## Modified files and purpose

| Files | Reason |
|---|---|
| `scripts/build-images.mjs`, `data/image-manifest.json` | Repeatable optimized variants and exact source geometry |
| `components/site-image.jsx` | Static-export responsive WebP delivery, sizes, priority and localized campaign alt |
| `components/cafe-interactive.tsx` | Localized product/branch alt, modal/filter sizing, visible accessible names, nonduplicate menu events |
| `components/cafe-site.tsx` | Localized informative photos; eager About/branch LCP candidates and branch sizing |
| `components/Header.tsx`, `components/Footer.tsx` | Localized logo alternatives, eager header logo, nearest-location instrumentation, navigation prefetch policy |
| `components/navigation-link.tsx` | Preserve Next Link semantics while disabling global automatic prefetch |
| `components/analytics.jsx` | Category/anchor and requested action events; preserve tag, opt-out, legacy events and SPA pageviews |
| `app/layout.tsx` | Bundle existing font CSS; remove nested main landmark |
| `app/menu/page.tsx` | Correct category thumbnail sizes |
| `app/locations/page.tsx` | Accurate description/lead, mobile grid fit, first-photo priority and sizes |
| `package.json` | Optimize assets before build/dev; preview actual static output |
| `.gitignore` | Ignore generated optimized binaries and TypeScript incremental cache |
| `vercel.json` | Hashed-image immutable caching while retaining host redirect |
| `scripts/serve-export.mjs`, `playwright.config.cjs` | Production static-export preview/test server, including Vercel-style segment mapping |
| `tests/site.spec.cjs` | Ten current regression tests replacing stale page assumptions |
| `scripts/measure-performance.mjs`, `scripts/summarize-performance.mjs` | Reproducible payload/geometry/CLS capture and request classification |
| `reports/menu-validation-report.json` | Regenerated validation timestamp; 53 products, zero errors/warnings/missing images |
| `reports/perf-*.json`, `reports/performance/**`, live/final SEO crawl reports | Baseline, intermediate and release measurement/visual evidence |
| `docs/CHURROS_PERFORMANCE_AUDIT.md`, this report, `Churros_SEO(UPDATE).md` | Investigation, results, limits and SEO history |

No menu prices/descriptions/source names, page URLs, H1s, title tags, canonicals, hreflang, structured data, Search Console verification or active-branch records changed. Homepage meta description was intentionally not padded. The locations metadata and matching lead only remove unsupported opening-hours promises.

## Verification commands and release checklist

Passed: `npm run build` (55 generated outputs, including special routes), `node node_modules/typescript/bin/tsc --noEmit`, `npm test` (10 tests), `node scripts/check-analytics.mjs http://127.0.0.1:4195`, 48-route SEO audit, `git diff --check`. Build-time menu validation: 53 products, zero errors/warnings/missing images; 21 missing official descriptions remain intentionally blank.

There is no configured lint script/ESLint setup. Lint is NOT claimed to pass; TypeScript, build, script syntax, tests and diff checks were used. No large lint dependency was added for this task.

Reproduce locally:

```text
npm run build
npm test
npm run preview
node scripts/check-analytics.mjs http://127.0.0.1:4173
node scripts/audit-seo.mjs http://127.0.0.1:4173 reports/seo-audit.json
node scripts/measure-performance.mjs http://127.0.0.1:4173 next-review
```

Deploy through the existing Vercel project only when ready. After deployment:

1. Verify generated WebP 200 responses and `Cache-Control: public, max-age=31536000, immutable`; no old mutable assets should gain immutable caching.
2. Recheck canonical redirect, robots, sitemap, all 48 routes, English/Arabic rendering and image candidates on real mobile devices.
3. Run several mobile/desktop PageSpeed or Lighthouse tests against the live compressed responses, then investigate the mobile H1/font/JS critical path if LCP remains high. Do not remove essential navigation or branding.
4. Verify GA4 events in Realtime/DebugView, including client navigation and saved opt-out, without counting legacy aliases twice.
5. Confirm email sender information and resolve SPF/DKIM/DMARC through the domain administrator. Contrast and dependency findings require their documented follow-up.
6. Monitor field p75 LCP/INP/CLS over 28 days where data exists; target <=2.5s / <=200ms / <=0.1. No field baseline was accessible. Retain the prior SEO review schedule; do not claim ranking improvements or restart title/H1 experiments.

Reference decisions: [Next.js static export and image-loader constraints](https://nextjs.org/docs/app/guides/static-exports), [Lighthouse simulated versus applied throttling](https://github.com/GoogleChrome/lighthouse/blob/main/docs/throttling.md). These explain implementation/measurement choices, not proof of the site's deployed performance.
