# Update: online ordering removed

Online ordering is not offered in this template. Order buttons, ordering pages, and ordering entry points have been removed in both languages. Any ordering integration discussion below is optional future guidance only.

# Churros Cafe — brand, experience, and local growth launch guide

This document covers deliverables A–X from the brief. **Implemented** means present in this template. **Recommendation** means a production design or operational decision. **Client input** means information required before it can be represented as fact. **Google guidance** is identified with official references. **Schema capability** describes a vocabulary feature, not a promise of a search appearance.

## A. Brand & UX strategy

**Creative recommendation:** an approachable premium café, centered on coffee, churros, and small everyday rituals. Primary audience: English- and Arabic-speaking residents and visitors in Qatar. Emotional proposition: an unhurried, welcoming pause. Voice: warm, concise, sensory, quietly confident. Concept differentiation: a focused coffee-and-churros pairing expressed through editorial photography and human, everyday storytelling. These are proposed positioning choices, not verified claims about sourcing, craft, or operations.

**Implemented:** cream space, espresso typography, amber accents, large serif headlines, a split photographic hero, alternation between intimate product close-ups and spacious story sections. No ratings, testimonials, follower counts, or awards appear because none were supplied.

## B. Complete sitemap

English routes below have Arabic counterparts under `/ar/`.

| Route | Purpose | Main action |
|---|---|---|
| `/` | Brand flagship | Menu / branch discovery |
| `/menu/` | Searchable, filterable sample menu | Product details / order preview |
| `/about/` | Brand concept narrative | Explore menu |
| `/locations/` | Four branch concepts and search | Branch page |
| `/locations/neighborhood/` | Neighborhood concept | Visit / order preview |
| `/locations/city/` | City retreat concept | Visit / order preview |
| `/locations/gathering/` | Gathering place concept | Visit / order preview |
| `/locations/quiet/` | Quiet corner concept | Visit / order preview |
| `/reservations/` | Visit-planning entry | Reservation preview |
| `/catering/` | Catering concept and inquiry | Validated demo form |
| `/contact/` | Contact experience | Validated demo form |
| `/offers/` | Campaign placeholder | Menu |
| `/stories/` | Editorial concept slots | Story / menu |
| `/privacy/` | Accurate template privacy notice | Information |
| `/admin/` | Local draft editor | Save / export |
| Next.js `not-found` boundary | True 404 response | Return home |

## C. URL architecture

**Recommendation:** keep `/locations/[branch]/` initially. Create `/locations/[city]/` only if verified geographic clusters and substantial useful city content justify it. Add `/menu/[category]/` when a category deserves unique, substantial editorial content; current filters deliberately do not create thin pages. Individual menu-item dialogs have no indexable route. Add `/stories/[slug]/`, `/offers/[slug]/`, and `/events/[slug]/` when there are real articles, campaigns, or events. Keep permanent branch slugs after launch; redirect retired slugs to a relevant replacement, or return 410 when no replacement exists. Add country prefixes only for a confirmed multi-market expansion plan.

## D. Design system

| Token / component | Implementation |
|---|---|
| Brand palette | Burnt orange `#d0551d`, amber `#F5A623`, cream `#FFF3E0`, chocolate `#4A2E1B` |
| Secondary text / line | Derived from chocolate and cream with CSS `color-mix()` |
| Type | Local DM Sans UI; local Playfair Display display; system Arabic |
| Display scale | Fluid hero ~58–99px, section titles ~36–60px |
| Body | 12–14px descriptive text; 9–11px supporting labels |
| Containers | Fluid inset 24–84px; large desktop cap 1800px |
| Spacing | 8, 12, 16, 24, 32, 48, 64, 85px rhythm |
| Primary CTA | Terracotta fill, cream text, amber hover, directional arrow, 51px height |
| Secondary CTA | Underlined text and arrow; visible keyboard focus |
| Cards | Flat editorial images, serif title, subtle circular action |
| Forms | Persistent labels, browser validation, explicit demo feedback |
| Dialog | Native modal, Escape, backdrop dismissal, focus return |
| Accordions | Native details/summary, keyboard-operable |
| Motion | Subtle 200ms button / 600ms image transitions; reduced-motion override |

The Next.js/React application uses no external icon library, animation framework, tracking package, or map bundle.

## E. Homepage wireframe

Announcement → brand/navigation → split headline + churros hero → amber brand ribbon → signature product filters → barista/story split → cinematic café image → interactive four-branch selector → gathering/catering feature → newsletter preview → editorial footer. Mobile adds a fixed menu/location/order bar with safe-area spacing.

Reviews, social feeds, and active promotions are omitted until legitimate content exists. All such content can be inserted as sections without changing the page hierarchy.

## F. Menu UX

**Implemented:** React category controls with pressed states, text search, empty results, image cards, product dialog, recipe/allergen verification notice, and no invented prices. Next.js pre-renders core product content and hydrates the interactive controls. Photographs are explicitly illustrative.

**Recommendation:** add a sticky category row for a longer real menu; use verified allergen/dietary fields rather than inferring from names or photographs. Keep branch availability and dietary claims unset until confirmed. Place price/currency and size variants in structured content. Create a category page only when it has a useful independent story, selection, and search purpose.

## G. Locations hub

**Implemented:** four named concepts, name/text search, result count, interactive homepage preview, and individual static pages. No real geography is inferred from the Qatar market alone.

**Client input:** names, area/city, street address, coordinates, map links, IANA time zone, regular/holiday hours, telephone, ordering provider, amenities, wheelchair access, parking, reservation rules. After verification, enable area/city filters, maps on interaction, and proximity sorting with user-initiated geolocation. Geolocation failure must preserve manual search. Opening status should use branch time zones and holiday exceptions, including overnight hours.

## H. Branch page template

**Implemented:** distinctive concept headline/introduction, large illustrative image, address/hour/contact placeholders, visit and ordering previews preselected to the branch, service/amenity/access placeholders, product discovery, FAQ accordion, cross-links to other branches. Do not label other branches “nearby” until coordinates are verified.

**Production content model:** unique hero and local introduction; street address; status/hours; verified Call, WhatsApp, Directions, Order, Reserve links; delayed map embed; branch menu availability; popular items based on real data; gallery; amenities; actual nearby landmarks; access and parking; verified delivery coverage; eligible promotion relationships; local FAQs; legitimate reviews with provenance; breadcrumbs and nearby branches. Do not publish empty local pages.

## I–J. Local SEO strategy and keyword mapping

No real districts, landmarks, or addresses were supplied, so geographic keyword values remain variables. Do not replace these with guessed Qatar locations. Each branch needs its own verified brief using this table:

| Concept | Proposed primary phrase | Unique editorial intent |
|---|---|---|
| Neighborhood | `Churros Cafe [verified neighborhood]` | Everyday access, parking, genuine local routine |
| City | `coffee and churros in [verified district]` | Directions from real transport / business landmarks |
| Gathering | `Churros Cafe [verified branch name]` | Actual seating and group-visit suitability |
| Quiet | `café in [verified neighborhood]` | Accurate atmosphere, access, and visitor information |

For each: secondary phrases `churros in [area]`, `coffee in [area]`; long-tail `how to get to Churros Cafe [branch]`, `Churros Cafe [branch] opening hours`, and verified suitability queries. Intent: local discovery and visit planning. Title template: `Churros Cafe [Branch] | Coffee & Churros in [Area]`. Description: a unique factual invitation including the confirmed setting and primary visit action. H1: real branch name plus one meaningful differentiator. Supporting headings: visit, menu, getting here, hours, local questions. Internal links: location hub, menu, real relevant offer, other branches. GBP URL: the corresponding approved canonical branch URL. Content opportunity: a genuinely useful access guide with real landmarks and original branch photography. Do not use repetitive “near me” copy.

## K. Technical SEO architecture

**Implemented:** statically generated HTML from the Next.js App Router on every public route; normalized trailing slashes via 308; genuine 404; semantic headings; descriptive image text; no parameter-based duplicate pages. Sample pages use `noindex,nofollow` and staging robots exclusion. No sitemap or canonical domain is invented.

**Production build:** configure an owned HTTPS `metadataBase`, approved canonical/hreflang metadata, JSON-LD, sitemap, and production robots through the Next.js Metadata API, then run `npm run build`. Review the generated output before deployment and keep sample routes out of indexing until their content is verified.

**Recommendation:** set unique page-specific descriptions and Open Graph images in the CMS; OG title must match the localized page. Use canonical clean URLs for tracking parameters; do not index filter/search combinations. No pagination is necessary for five sample items/four concepts. For large future listings use crawlable paginated HTML with distinct URLs and self-canonicals. Keep valuable pages within three clicks. Configure the deployment host to match local trailing-slash and 404 behavior. Enable Brotli/gzip and hashed-asset caching through hosting. Include image sitemaps only if important images are not otherwise easily discoverable.

**Google guidance:** multilingual pages can be related with hreflang; maintain reciprocal language variants and canonical language URLs. Source: https://developers.google.com/search/docs/specialty/international/localized-versions

## L. JSON-LD architecture

**Implemented production generator:** stable absolute entity identifiers at `/#brand`, `/#website`, `/<route>/#page`, `/menu/#menu`, `/menu/#category`, `/menu/#product`, and `/locations/[branch]/#cafe`. Graph connects Organization → WebSite → WebPage and branch → parentOrganization / hasMenu. Menu contains MenuSections and MenuItems. BreadcrumbList uses each page path.

Verified branches may emit CafeOrCoffeeShop with only available verified properties. No addresses, coordinates, hours, contact details, or price ranges are synthesized. No branch entity is emitted unless its minimum verified address data is present. In template mode no business entity markup is published.

**Schema capability:** MenuItem can have Offer after real prices/currency/availability are supplied. Add relationships from approved CMS data. FAQPage is appropriate only for visible, eligible question/answer content; do not add it just to request a rich result. AggregateRating is not included. Schema support is separate from Google feature eligibility.

**Google guidance:** use the specific appropriate LocalBusiness type and required/recommended properties. Markup does not guarantee a rich result. Source: https://developers.google.com/search/docs/appearance/structured-data/local-business

## M. Google Business Profile strategy

Map only legitimate physical branches to existing verified profiles; collect profile IDs/URLs from the owner. Keep real-world brand name, street address, individual phone, and hours consistent with the branch page. Use each branch URL as its website link; add the correct menu/order/reservation link only when that service exists. Upload owned exterior, entrance, interior, product, and accessibility photographs. Select the most accurate primary/secondary categories from the live GBP category selector; none are assumed in this template. Maintain special hours for holidays and events.

**Google guidance:** the website/phone should represent the individual business location, and the name should reflect real-world representation. Source: https://support.google.com/business/answer/3038177

## N. Internal linking architecture

Home → menu / story / branch hub / catering. Hub → every branch. Branch → menu / other branches / service journeys. Journal → relevant menu category and real branch where useful. Campaign → participating branches and eligible products. Footer gives stable access to all major public destinations. Language switch preserves the route. Admin stays out of public navigation and sitemaps. Real articles/events/campaigns must receive contextual incoming links before publication.

## O. Content strategy

Prioritize branch access guides and verified menu stories, then seasonal launches and original team/ingredient stories. Ramadan/Eid content requires approved dates, hours, menus, and service terms. Catering guides should answer quantities, lead time, coverage, dietary handling, and booking terms using actual operations. Suggested cadence: one genuinely useful feature per month, plus necessary operational updates. Avoid publishing empty sample journal or offer pages as production landing pages.

## P. Conversion strategy

Home: discover menu/branch. Menu: inspect item → select branch → real ordering provider. Branch: directions/call, then order/reserve when available. Catering: concise inquiry with clear response expectations once staffing is confirmed. Contact: short, labeled form. Mobile action bar prioritizes menu, location, order. Never imply a booking, order, or delivery service is available without verification. Confirmation should reflect provider success, not a button click.

## Q. Analytics and conversion reporting

**Implemented:** inactive consent-gated hooks for `menu_view`, `menu_category_select`, `product_view`, `branch_select`, `order_click`, `reservation_click`. Nothing is transmitted, no cookies are installed, and demo form submissions are deliberately not reported as business conversions.

**Production plan:** connect an approved consent manager before setting `window.churrosCafeAnalyticsConsent = true`; load approved vendors after relevant consent. Add `directions_click`, `phone_click`, `whatsapp_click`, `promotion_click` when real links exist; `catering_lead` and `newsletter_signup` only after successful backend acceptance. Add route-aware page views for normal navigations. Parameters: language, branch ID, item ID, category, CTA placement, campaign ID; never send email, phone, names, or messages as event parameters. Implement purchase/reservation completion in the actual provider and reconcile with clicks. Search Console is site verification, not a client tracking script. Meta/TikTok are optional and absent until explicitly approved.

**Dashboard recommendation:** organic sessions, organic landing pages, local branch traffic, confirmed provider orders/bookings, action clicks, menu engagement, successful leads, top branches/pages, Search Console queries, device/language split, and conversion rates with explicit denominators. Separate micro-conversion clicks from completed transactions. Annotate campaign dates and outages; review weekly, with a monthly branch comparison.

## R. Core Web Vitals plan

Targets: LCP ≤2.5s (stretch <2s), INP ≤200ms, CLS ≤0.1. These are goals, not guaranteed outcomes. Next.js static generation, focused React client components, no embeds on entry, a prioritized AVIF hero, local fonts, explicit image geometry, and reduced motion support are implemented.

Use `npm run preview` for a local unthrottled sample and screenshots. `performance-results.json` records context and observed LCP/CLS; it cannot establish INP or field CWV compliance. Before launch measure deployed pages on representative mobile networks, then use field data after real traffic exists. Investigate the largest image/font request for LCP, actual long interactions for INP, and unexpected content/font shifts for CLS. Validate every third-party integration against the budget.

## S. Image optimization strategy

Hero uses an AVIF source, WebP fallback, 800/1400 responsive candidates, `sizes`, dimensions, and `fetchpriority="high"`; it is not lazy loaded. Below-fold pictures use local WebP, lazy loading and async decoding. Generate derivatives with `npm run images:optimize`. Hero sources are approximately 69KB/140KB AVIF and 144KB/281KB WebP. Other visible images are roughly 65–117KB. Improve future real galleries with matching responsive sizes; do not publish full-size source PNGs in page markup.

```html
<picture>
  <source type="image/avif" srcset="/assets/churros-800.avif 800w, /assets/churros-1400.avif 1400w" sizes="(max-width:760px) 100vw, 52vw">
  <img src="/assets/churros-1400.webp" srcset="/assets/churros-800.webp 800w, /assets/churros-1400.webp 1400w" sizes="(max-width:760px) 100vw, 52vw" width="1400" height="1750" fetchpriority="high" alt="Golden cinnamon churros with chocolate dipping sauce and a cappuccino">
</picture>
```

A future image CDN can generate equivalent widths/formats. Use measured source sizes rather than indiscriminate quality reductions.

## T. Accessibility checklist

Implemented: semantic landmarks/headings, skip link, labeled inputs, browser validation, native dialog/accordion semantics, visible focus, product-focus restoration, keyboard Escape, meaningful image descriptions, button pressed states, polite result/status regions, RTL support, reduced motion and mobile action spacing. Before launch: manually review with screen readers, 200–400% zoom, keyboard-only use, representative Arabic speakers, and real translated content. Decorative small uppercase labels should never carry essential information alone. Confirm contrast for any changed palette and touch sizes after CMS content changes.

## U. CMS structure

**Implemented:** lightweight local content studio at `/admin/`, with menu/branch field editing, validation, local drafts, JSON export/import, and draft removal. It does not authenticate users or publish pages.

**Recommended production collections:** Brand (name/logo/social/locale), Branch (real identity/address/hours/timezone/services/access/media), MenuSection, MenuItem (translations/prices/allergens/verified dietary labels), BranchMenuAvailability, Offer (dates/terms/branches), Story (author/date/body/media), Event, FAQ, Careers, Media (alt/rights/variants), SiteSettings (SEO/providers/consent). Normal edits should flow through staff-friendly fields and preview/review/publish controls. Add role-based access, required-field validation, revision history, scheduling, asset rights, backups, and webhook-triggered static builds. Keep API credentials server-side.

## V. Performance budget

| Resource | Proposed launch budget | Template approach |
|---|---:|---|
| Initial application JS | Monitor per route | Next.js/React route chunks with no optional third-party UI libraries |
| CSS including fonts stylesheet | <30KB raw | Shared stylesheet |
| Fonts | <120KB total WOFF2 | Three locally hosted font files, about 97KB total |
| Hero | <180KB AVIF on desktop | ~140KB high-resolution / ~69KB compact |
| Product image | <160KB per visible asset | Optimized WebP |
| First view overall | <600KB compressed/mobile target | Verify on deployed origin and mobile DPR |
| Third-party blocking scripts | 0 | No tracking/map/widget libraries |
| Layout shift | ≤0.1 | Reserved image/layout geometry |

A low-bandwidth or high-DPR device can select different assets. Local resource transfer numbers do not replace a deployed network profile. Hosting should compress text and cache fingerprinted assets.

## W. Developer implementation / launch checklist

1. Replace concept content with signed-off English/Arabic brand, menu, and branch information. Remove editorial placeholders.
2. Confirm image rights, translations, prices, allergen handling, operational hours, amenities, and services.
3. Update stable branch slugs/routes and city decisions; configure redirects for any existing site URLs.
4. Connect secure backend forms, spam controls, rate limits, input validation, transactional feedback, and provider error handling.
5. Connect authorized ordering/reservation providers; test actual return/cancel/failure states and cross-domain attribution.
6. Connect an authenticated CMS and publishing workflow if staff need production self-service.
7. Add approved legal notices and consent handling; verify no personal data is sent to analytics.
8. Set owned production domain and verified content flags; rebuild; review canonicals/hreflang/schema/sitemap and indexing behavior. Empty concept pages must not enter the production sitemap.
9. Validate entity data against visible content, test Google eligibility tools, and inspect representative URLs in Search Console.
10. Deploy over HTTPS, enable text compression and caching, configure CSP/security headers for actual integrations, and ensure true 404/308 behavior.
11. Run `npm test`, accessibility review, real-device mobile/Arabic review, throttled performance checks, and provider smoke tests.
12. Establish content backups, dependency updates, error monitoring with personal data redaction, and an operational owner for special hours.

## X. Missing client information

Owned domain and legal identity; actual logo; approved brand story; real four branch names/addresses/coordinates/time zones/hours/holiday rules; verified phone/WhatsApp/email; social accounts; GBP IDs/access; menus/prices/currency/tax display; recipes/allergens/dietary verification; sizes/availability; image ownership and real branch photos; parking/access/amenities/landmarks; live order/reservation/delivery links and service coverage; catering operations; authentic reviews and permissions; CMS preference/roles; analytics IDs/vendor approvals; form destination/retention/consent requirements; hosting/deployment details; final Arabic language review.

None of these values is invented by this sample. The current template is a complete interactive demonstration; production operations depend on the integrations and verified content above.
