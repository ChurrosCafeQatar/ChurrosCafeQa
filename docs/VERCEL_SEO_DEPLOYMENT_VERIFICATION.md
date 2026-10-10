# Vercel Production Deployment Preparation - Phase 2

## 1. Pre-Deployment Review & Status
All local QA, technical audits, and schema corrections have been successfully completed. 
*   **Changed Files Reviewed:**
    *   `app/page.tsx` (Homepage metadata and H1 targeted optimization)
    *   `app/sitemap.ts` (Restored missing closed-branch route)
    *   `app/[...slug]/page.tsx` (Removed duplicate/dead schema code)
    *   `components/SchemaMarkup.tsx` (Injected Knowledge Graph `sameAs` and robust branch URLs)
    *   `components/cafe-site.tsx` (Fixed closed-branch H1 for branded search capture)
*   **Unrelated Frontend Changes:** Confirmed ZERO unrelated frontend modifications. The visual design, responsive layout, animations, and existing integrations remain untouched.
*   **Build & Tests:** The production build (`npm run build`) completed locally without errors, executing TypeScript type checks perfectly.
*   **Canonical & Production Domain:** Verified `https://churroscafeqa.com/` configuration and Vercel edge redirects (implemented in Phase 1) are stable.

## 2. Deployment Risks
*   **Risk Level:** Very Low.
*   **Mitigation:** The application is completely statically exported (`output: 'export'`), meaning there are no dynamic database connections to fail at runtime. Vercel will simply serve the new static HTML payload. The removal of dead schema code actively reduces the risk of future conflicts.

## 3. Explicit Deployment Authorization Required
Per deployment protocols, **automatic pushing to production is paused pending explicit authorization.**

**To deploy these changes manually (or authorize me to execute them), run:**
```bash
git add .
git commit -m "feat: complete comprehensive SEO recovery (schema, branches, crawlability, H1s)"
git push origin main
```
*Pushing to `main` will automatically trigger Vercel's production deployment pipeline.*

## 4. Post-Deployment Verification Plan
*Once deployment is authorized and complete on Vercel, the following live checks must be executed independently on `https://churroscafeqa.com/`:*
1.  **Live HTTP Response Codes:** Confirm active 200 responses across all branch pages.
2.  **Live Redirects:** Verify no new redirect loops were introduced.
3.  **Live Canonical Tags:** Ensure `<link rel="canonical">` matches the deployment domain.
4.  **Live Metadata:** Check homepage `<title>` and `og:tags` via external testing tools.
5.  **Live Sitemap & Robots:** Validate `sitemap.xml` includes `mall-of-qatar`.
6.  **Live Structured Data:** Pass the live homepage through the Google Rich Results Test to verify the new `sameAs` array.
