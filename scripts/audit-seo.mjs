import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
import { SITE_URL } from '../data/site.js';

const origin = process.argv[2] || 'http://127.0.0.1:4173';
const output = process.argv[3] || 'reports/seo-audit.json';
const canonicalOrigin = SITE_URL;
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const context = await browser.newContext({ javaScriptEnabled: false });
const sitemapResponse = await context.request.get(`${origin}/sitemap.xml`);
const xml = await sitemapResponse.text();
const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
const rows = [];
for (const url of urls) {
  const page = await context.newPage();
  const path = new URL(url).pathname;
  const response = await page.goto(`${origin}${path}`);
  const row = await page.evaluate(() => ({
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content,
    canonical: document.querySelector('link[rel="canonical"]')?.href,
    robots: document.querySelector('meta[name="robots"]')?.content,
    h1: [...document.querySelectorAll('h1')].map(el => el.textContent),
    links: [...document.querySelectorAll('a[href^="/"]')].map(el => el.getAttribute('href')),
    products: document.querySelectorAll('[data-product]').length,
    schemas: [...document.querySelectorAll('script[type="application/ld+json"]')].map(el => JSON.parse(el.textContent)),
    imagesWithoutAlt: document.querySelectorAll('img:not([alt])').length,
    imagesWithoutDimensions: document.querySelectorAll('img:not([width]),img:not([height])').length,
    ogSiteName: document.querySelector('meta[property="og:site_name"]')?.content,
  }));
  rows.push({ path, status: response.status(), ...row });
  await page.close();
}
const paths = new Set(rows.map(row => row.path));
const errors = rows.flatMap(row => [
  ...(row.status !== 200 ? [`${row.path}: HTTP ${row.status}`] : []),
  ...(!row.title || !row.description ? [`${row.path}: missing metadata`] : []),
  ...(row.canonical !== `${canonicalOrigin}${row.path}` ? [`${row.path}: incorrect canonical`] : []),
  ...(row.h1.length !== 1 ? [`${row.path}: ${row.h1.length} H1s`] : []),
  ...(/noindex/.test(row.robots) ? [`${row.path}: noindex in sitemap`] : []),
  ...row.links.filter(link => !paths.has(link) && !link.startsWith('/admin')).map(link => `${row.path}: link outside sitemap ${link}`),
]);
const duplicates = field => rows.filter((row, i) => rows.findIndex(other => other[field] === row[field]) !== i).map(row => row.path);
const report = { checkedAt: new Date().toISOString(), origin, sitemapStatus: sitemapResponse.status(), count: urls.length,
  duplicateTitles: duplicates('title'), duplicateDescriptions: duplicates('description'), errors, rows };
await writeFile(output, JSON.stringify(report, null, 2));
await browser.close();
console.log(JSON.stringify({ output, pages: rows.length, errors, duplicateTitles: report.duplicateTitles, duplicateDescriptions: report.duplicateDescriptions }));
if (errors.length) process.exitCode = 1;
