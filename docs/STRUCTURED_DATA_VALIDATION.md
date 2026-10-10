# Structured Data & Schema Validation - Churros Cafe

## 1. Objective
Ensure the Churros Cafe JSON-LD structured data accurately and consistently identifies the official website, verified branch locations, and related brand entities, without resorting to spammy or unsupported rich-result tactics.

## 2. Methodology & Inspection
An audit of `components/SchemaMarkup.tsx` and `app/[...slug]/page.tsx` was conducted against Google's schema guidelines. 

### Identified Issues:
1.  **Missing Social Verification:** The `Organization` schema lacked the `sameAs` property linking to the verified Instagram account.
2.  **Weak Entity Referencing:** The branch schema correctly identified `parentOrganization` by name and `@id`, but lacked the explicit `url` attribute, making it harder for crawlers to resolve the entity if the branch page was crawled in isolation.
3.  **Dead Code Risk:** A duplicate `PageStructuredData` function containing 50+ lines of unused schema definitions was found inside the dynamic `CatchAllPage` (`app/[...slug]/page.tsx`), creating a long-term risk of conflicting schema if a developer accidentally activated it.

## 3. Implemented Fixes
*   **Social Connectivity:** Injected `sameAs: ['https://www.instagram.com/churroscafe.qa']` into the `Organization` schema to establish a verified knowledge graph connection.
*   **Robust Parent Referencing:** Appended `url: absoluteUrl('/')` to the `parentOrganization` object within the local branch schema (`LocalBusiness`, `CafeOrCoffeeShop`, `FoodEstablishment`).
*   **Codebase Cleanup:** Completely removed the unused `PageStructuredData` block from `app/[...slug]/page.tsx` to ensure `components/SchemaMarkup.tsx` acts as the single, unpolluted source of truth for all JSON-LD.

## 4. Why These Improvements Help (Without Guaranteeing Rankings)
It is important to note that modifying schema does not natively guarantee higher rankings. However, these specific improvements enhance clarity for Google's Knowledge Graph in the following ways:
*   **The `sameAs` array** confirms that the active Instagram account and this official website belong to the exact same business entity. This prevents Google from treating them as separate competing digital assets.
*   **The robust `parentOrganization` reference** helps Google understand that "Churros Cafe Lusail" is a physical branch of the broader "Churros Cafe Qatar" entity, rather than an independent restaurant.

## 5. Validation Results
A local parser script (`validate-schema.js`) was run against the compiled static HTML (`out/` directory) to verify JSON syntax and injection.
*   `out/index.html`: **PASS** (Valid JSON-LD `Organization` and `WebSite` graph).
*   `out/locations/lusail/index.html`: **PASS** (Valid JSON-LD `CafeOrCoffeeShop`, `FoodEstablishment`, `LocalBusiness`, and `BreadcrumbList`).
*   `out/menu/index.html`: **PASS** (Valid JSON-LD `Menu`).
