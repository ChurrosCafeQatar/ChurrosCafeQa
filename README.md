# Churros Cafe — Next.js café website

A bilingual, responsive café website built with Next.js 16, React 19, the App Router, and a semantic CSS design system. It includes English and Arabic pages, a searchable menu, product dialogs, branch discovery, a visit-planning flow, and a local content studio.

## Run locally

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`.

For a production build:

```powershell
npm run build
npm start
```

Additional commands:

```powershell
npm test                 # Build first, then run the Playwright browser suite
npm run images:optimize  # Rebuild AVIF/WebP assets in public/assets
npm run menu:validate    # Validate menu names, prices, categories, images, and duplicates
npm run menu:import -- "C:\path\to\menu_churro.xlsx"  # Refresh the source snapshot from Excel
```

## Menu source of truth

`data/menu-source.json` is the checked-in source snapshot used by builds. It preserves source names, categories, image filenames, price strings, and supplied descriptions. `data/menu.js` derives safe display names, customer-facing categories, structured prices, product options, search text, schema data, and category collections without changing the source fields.

When an updated workbook is supplied, run `menu:import` and then `menu:validate`. The production build runs validation automatically. The report is written to `reports/menu-validation-report.json`; unavailable files use a visible placeholder instead of a guessed product image.

## Project structure

- `app/layout.jsx` — root metadata, viewport, global CSS, and local font stylesheet.
- `app/[[...slug]]/page.jsx` — statically generated English/Arabic route resolver and page metadata.
- `app/llms.txt/route.js` and `app/llms-full.txt/route.js` — source-backed AEO/GEO discovery documents for language models and answer engines.
- `app/admin/page.jsx` — local content-studio route.
- `components/cafe-site.jsx` — shared site shell and interactive page components.
- `components/content-studio.jsx` — React-based local draft editor with JSON import/export.
- `data/menu-source.json` — exact menu source snapshot.
- `data/menu.js` — normalized menu model shared by UI, SEO pages, search, schema, and analytics.
- `data/site.js` and `data/llms.js` — canonical-domain helpers and generated machine-readable business references.
- `scripts/import-menu.mjs` — Excel-to-source import pipeline.
- `scripts/validate-menu.mjs` — build-time menu and image validation.
- `data/content.js` — branch and Arabic translation content, with products imported from the menu model.
- `styles.css` — responsive layout and component foundations.
- `theme.css` — semantic dessert-and-coffee brand colors and themed component states.
- `public/assets/` — locally served images, fonts, and favicon.
- `tests/site.spec.cjs` — end-to-end interaction, routing, RTL, and asset checks.

## Routes

Every public route has an Arabic equivalent under `/ar/`:

- `/`, `/menu/`, `/about/`, `/locations/`
- `/menu/churros/`, `/menu/waffles/`, `/menu/crepes/`, `/menu/pancakes/`, `/menu/desserts/`, `/menu/ice-cream/`, `/menu/matcha/`, `/menu/hot-coffee/`, `/menu/iced-coffee/`, `/menu/milkshakes/`, `/menu/iced-drinks/`
- `/locations/lusail/`, `/locations/abu-hamour/`, `/locations/duhail/`, `/locations/downtown/`, `/locations/mall-of-qatar/`
- `/reservations/`, `/offers/`, `/stories/`, `/privacy/`
- `/admin/` for the local content studio

Routes are statically generated during `next build`. Unknown routes use the Next.js 404 boundary, and `trailingSlash: true` preserves the original URL convention.

## Data boundaries

Menu content comes from the supplied dataset. Blank descriptions remain blank, missing image files are reported, and delivery partners or branch-specific availability are omitted until approved source data is supplied. Forms and reservations remain previews and do not send customer data. Canonical, sitemap, structured-data, and LLM-reference URLs use the production origin `https://www.churroscafeqa.com`.
