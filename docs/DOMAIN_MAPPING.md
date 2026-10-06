# Churros Cafe → Vercel Production Domain Mapping

## Deployment Summary
This document serves as the authoritative production runbook for migrating the Churros Cafe Qatar website (churroscafeqa.com) to a new Next.js application hosted on Vercel. This procedure ensures near-zero user-visible downtime, complete SEO continuity, active SSL protection, and a safe, tested rollback strategy.

## Authoritative Vercel DNS Records

| Type | Host | Value / Target | TTL | Purpose |
|---|---|---|---:|---|
| A | @ | `216.198.79.1` | 600 | Route `churroscafeqa.com` to Vercel |
| CNAME | www | `453c11ce18cd8f89.vercel-dns-017.com.` | 600 | Route `www.churroscafeqa.com` to Vercel |

*Note: These are the exact project-specific records provided by Vercel for this deployment.*

## Current DNS Backup
**⚠️ CRITICAL STEP:** Before making any changes, you must log into your current DNS provider and record the existing values to form your rollback configuration.

```text
Current @ / root record: [RECORD ACTUAL VALUE HERE]
Current www record: [RECORD ACTUAL VALUE HERE]
Current AAAA record: [RECORD ACTUAL VALUE HERE]
Current hosting provider: [RECORD ACTUAL PROVIDER HERE]
Current server IP: [RECORD ACTUAL IP HERE]
Current deployment URL: [RECORD ACTUAL URL HERE]
```

## Records That Must Not Change
> ⚠️ Only the website-routing records for `@` and `www` should normally change. Do not replace the complete DNS zone.

The website migration must not affect Churros Cafe business email. Do NOT modify or remove any of the following:
- MX records
- SPF records
- DKIM records
- DMARC records
- Google Workspace / Microsoft 365 records
- Domain verification TXT records
- Unrelated CNAME records or subdomains

## Canonical Domain Strategy
The preferred canonical production hostname is:
`https://churroscafeqa.com`

Vercel will be configured to route `www.churroscafeqa.com` → `https://churroscafeqa.com`.

*(Note: Verify the existing site's canonical configuration first. If the existing website intentionally uses `www` as canonical, preserve that architecture unless there is a deliberate migration decision.)*

## Vercel Domain Configuration
Before making the DNS cutover, verify in the **Vercel Dashboard → Project → Settings → Domains** that both domains are attached:
- `churroscafeqa.com` (A → 216.198.79.1)
- `www.churroscafeqa.com` (CNAME → 453c11ce18cd8f89.vercel-dns-017.com.)

Do not modify public DNS before the new Vercel deployment is production-ready.

## Pre-Launch Verification
Before changing DNS, verify the production Vercel deployment URL (e.g. `https://churroscafe-project.vercel.app`).
Check all key routes:
- `/`
- `/menu/`
- `/locations/`
- Existing branch pages

Verify functionality:
- Navigation, images, and fonts load correctly
- WhatsApp and Google Maps links work
- Structured data (JSON-LD) and metadata renders
- Canonical URLs are correct
- `robots.txt` and `sitemap.xml` are accessible

Also, ensure the production build passes successfully using `npm run build`.

## Environment Variables
Verify production variables in **Vercel → Project → Settings → Environment Variables**.
Ensure any site URL variables point to the canonical domain:
- `NEXT_PUBLIC_SITE_URL` = `https://churroscafeqa.com`
- `NEXT_PUBLIC_GA_ID` = [Analytics ID]

*(Note: Do not put secret values inside this document.)*

## TTL Preparation
Where supported by the DNS provider, temporarily lower the existing DNS TTL for `@` and `www` to `600` (10 minutes) well in advance of the cutover. This ensures old cached values expire sooner during the migration. Do not modify unrelated MX/TXT records unnecessarily.

## Production Cutover Procedure

### Step 1 — Confirm Vercel deployment
Confirm the latest production deployment is healthy.

### Step 2 — Confirm domains in Vercel
Verify `churroscafeqa.com` and `www.churroscafeqa.com` are attached to the correct Vercel project.

### Step 3 — Back up DNS
Record all current web-routing records (see Current DNS Backup section).

### Step 4 — Update apex/root domain
Set:
Type: A
Host: @
Value: 216.198.79.1
TTL: 600

### Step 5 — Update WWW
Set:
Type: CNAME
Host: www
Value: 453c11ce18cd8f89.vercel-dns-017.com.
TTL: 600

### Step 6 — Remove conflicting old web-host records
Check carefully for existing `AAAA`, `ALIAS`, or `ANAME` records on `@` or `www`. Remove obsolete website-related A/AAAA/CNAME records only if they belong to the previous website and conflict with the Vercel configuration.

### Step 7 — Leave all other DNS records untouched
Especially preserve email.

## DNS Propagation Strategy
Do NOT disable the existing website before making the DNS change. During DNS propagation, some users may temporarily reach the old host while others reach Vercel. Both environments should therefore remain functional during the transition. Retire old hosting only after stability is confirmed.

## SSL / HTTPS Validation
Vercel should provision SSL automatically after DNS validation succeeds. Do not manually purchase or install SSL unless there is an external requirement. Check for a valid certificate, no certificate warnings, and no mixed-content warnings.

## DNS Verification
After the change, use these commands to verify DNS routing:
```bash
dig churroscafeqa.com
dig www.churroscafeqa.com
```
*(Alternatively, use `nslookup churroscafeqa.com` and `nslookup www.churroscafeqa.com`)*

The expected root result should be `216.198.79.1`.
For `www`, the CNAME chain should point through `453c11ce18cd8f89.vercel-dns-017.com.`.

## Redirect Validation
After DNS propagation, run:
```bash
curl -I https://churroscafeqa.com
curl -I https://www.churroscafeqa.com
```
The preferred hostname (`https://churroscafeqa.com`) should return `200`. The alternate hostname should return a `301` or `308` redirect to the preferred hostname.

## SEO Validation
This is a hosting migration, not a domain migration. Preserve all existing SEO structure:
- Canonical URLs must reference the production domain (`https://churroscafeqa.com/...`), NOT `*.vercel.app`.
- Verify `robots.txt` and `sitemap.xml` return `200`.
- Verify no important page accidentally contains `<meta name="robots" content="noindex">`.
- Ensure Vercel static assets (`/_next/static/`) and local fonts/images load correctly.

## Google Search Console
Because the domain remains `churroscafeqa.com`, do not treat this as a Google Search Console domain migration. Do NOT use Google's Change of Address tool. After launch, monitor indexing, 404s, crawl errors, and Core Web Vitals.

## Analytics Validation
Verify production analytics (GA4, Meta Pixel, etc.) after launch. Ensure tracking integrations are firing correctly and do not duplicate tags during migration.

## Rollback Procedure
If a critical production problem occurs:
1. Restore the previous root (`@`) record.
2. Restore the previous `www` record.
3. Leave MX/TXT/email records untouched.
4. Confirm the old site responds normally.
5. Troubleshoot Vercel separately.

Keep the old website deployment available until the migration has been confirmed stable.

## Go / No-Go Checklist
[ ] Production build passes
[ ] Production Vercel deployment tested
[ ] churroscafeqa.com attached to Vercel
[ ] www.churroscafeqa.com attached to Vercel
[ ] Root A record confirmed as 216.198.79.1
[ ] WWW CNAME confirmed as 453c11ce18cd8f89.vercel-dns-017.com.
[ ] Existing DNS backed up
[ ] Old website remains online
[ ] Email records documented
[ ] MX records protected
[ ] SPF protected
[ ] DKIM protected
[ ] DMARC protected
[ ] Conflicting AAAA records checked
[ ] TTL lowered
[ ] Environment variables configured
[ ] Canonical hostname verified
[ ] robots.txt verified
[ ] sitemap.xml verified
[ ] Analytics verified
[ ] Rollback DNS values recorded

## Post-Cutover Checklist
[ ] churroscafeqa.com resolves to 216.198.79.1 / Vercel
[ ] www CNAME points to Vercel
[ ] Vercel reports valid domain configuration
[ ] SSL certificate active
[ ] HTTP redirects to HTTPS
[ ] www redirects correctly
[ ] No redirect loops
[ ] Homepage returns 200
[ ] /menu/ returns 200
[ ] /locations/ returns 200
[ ] Branch routes return 200
[ ] Images load
[ ] Fonts load
[ ] Videos load
[ ] WhatsApp links work
[ ] Google Maps links work
[ ] robots.txt works
[ ] sitemap.xml works
[ ] Canonicals are correct
[ ] JSON-LD renders
[ ] Analytics works
[ ] Business email still works
[ ] No major 404 errors
[ ] No unexpected 5xx errors
[ ] No critical browser-console errors

---

# FINAL DNS SUMMARY

PRODUCTION PROVIDER
Vercel

PRIMARY DOMAIN
https://churroscafeqa.com

ROOT / A RECORD
Host: @
Value: 216.198.79.1
TTL: 600

WWW / CNAME RECORD
Host: www
Target: 453c11ce18cd8f89.vercel-dns-017.com.
TTL: 600

SSL
Automatically managed by Vercel after DNS validation

EMAIL
Preserve existing MX/SPF/DKIM/DMARC records

OLD HOST
Keep operational until the Vercel migration has been verified

ROLLBACK
Restore the original @ and www DNS records if a critical production issue occurs
