const { test, expect } = require('@playwright/test');
const sourceRows = require('../data/menu-source.json');
const categories = ['churros', 'waffles', 'crepes', 'pancakes', 'desserts', 'ice-cream', 'matcha', 'hot-coffee', 'iced-coffee', 'milkshakes', 'iced-drinks'];
const slug = value => value.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

test('every menu schema matches visible source products, exact prices and language', async ({ browser }) => {
  test.setTimeout(120000);
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const prefix of ['', '/ar']) {
    for (const suffix of ['', ...categories.map(c => `${c}/`)]) {
      const path = `${prefix}/menu/${suffix}`;
      await page.goto(`http://127.0.0.1:4173${path}`, { waitUntil: 'domcontentloaded' });
      const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).map(JSON.parse);
      const menu = schemas.find(s => s['@type'] === 'Menu');
      expect(menu.url).toBe(`https://churroscafeqa.com${path}`);
      expect(menu['@id']).toBe(`${menu.url}#menu`);
      expect(menu.inLanguage).toBe(prefix ? 'ar' : 'en');
      const items = menu.hasMenuSection.flatMap(s => s.hasMenuItem);
      expect(items.length).toBe(await page.locator('[data-product]').count());
      if (!suffix) expect(items.length).toBe(53);
      for (const section of menu.hasMenuSection) {
        expect(section.url).toMatch(new RegExp(`${prefix}/menu/[^/]+/$`));
        if (prefix) expect(section.name).toMatch(/[\u0600-\u06ff]/);
        for (const item of section.hasMenuItem) {
          const id = new URL(item.url).hash.replace('#product-', '');
          const source = sourceRows.find(row => slug(row.sourceName) === id);
          expect(source, item.name).toBeTruthy();
          const card = page.locator(`[data-product="${id}"]`);
          await expect(card).toHaveAttribute('id', `product-${id}`);
          await expect(card.locator('h3')).toHaveText(item.name);
          if (prefix) expect(item.name).toMatch(/[\u0600-\u06ff]/);
          expect(item.description || '').toBe(source.description);
          const amounts = [...source.price.matchAll(/\d+(?:\.\d+)?/g)].map(m => Number(m[0]));
          const visiblePrice = await card.locator('.product-price').innerText();
          for (const amount of amounts) expect(visiblePrice).toContain(amount.toFixed(2));
          if (amounts.length === 1) {
            expect(item.offers).toEqual({ '@type': 'Offer', price: amounts[0], priceCurrency: 'QAR' });
          } else {
            expect(item.offers).toEqual({ '@type': 'Offer', priceSpecification: { '@type': 'PriceSpecification', minPrice: amounts[0], maxPrice: amounts[1], priceCurrency: 'QAR' } });
          }
          for (const property of ['aggregateRating', 'review', 'suitableForDiet', 'nutrition']) expect(item).not.toHaveProperty(property);
          expect(item.offers).not.toHaveProperty('availability');
        }
      }
    }
  }
  await context.close();
});

test('Arabic branch metadata, labels and descriptions preserve business facts', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const path of ['/ar/', '/ar/locations/', '/ar/about/']) {
    await page.goto(`http://127.0.0.1:4173${path}`, { waitUntil: 'domcontentloaded' });
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toContain('الأربعة');
    expect(description).not.toMatch(/مول قطر|قطر مول|الخمسة/);
    expect(await page.locator('main').innerText()).not.toContain('U?OU');
    await expect(page.locator('footer a[href*="mall-of-qatar"]')).toHaveCount(0);
  }
  await page.goto('http://127.0.0.1:4173/ar/menu/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('h1')).toContainText('تشوروز كافيه');
  await expect(page.locator('.page-heading > p').last()).toContainText('تصفح الأصناف');
  for (const title of await page.locator('.menu-category-heading h2').allTextContents()) expect(title).toMatch(/[\u0600-\u06ff]/);
  await expect(page.getByRole('button', { name: 'وافل', exact: true })).toHaveCount(1);
  await expect(page.locator('[data-product="mini-waffle"] h3')).toHaveText('ميني وافل');
  await context.close();
});

test('menu section headings link to existing categories without changing anchor navigation', async ({ page }) => {
  await page.goto('/menu/');
  for (const category of categories) {
    await expect(page.locator(`#${category} h2 a`)).toHaveAttribute('href', `/menu/${category}/`);
    await expect(page.locator(`.menu-controls a[href="#${category}"]`)).toHaveCount(1);
  }
});

test('missing descriptions are omitted in the modal and source descriptions remain', async ({ page }) => {
  await page.route('https://www.googletagmanager.com/**', r => r.fulfill({ contentType: 'application/javascript', body: '' }));
  await page.goto('/menu/');
  await page.locator('[data-product="espresso"] .product-open').click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.locator('.product-modal-about-section')).toHaveCount(0);
  await expect(page.getByRole('dialog')).toContainText('QAR 14.00');
  await page.keyboard.press('Escape');
  await page.locator('[data-product="classic-churros"] .product-open').click();
  await expect(page.locator('.product-modal-about-text')).toHaveText(sourceRows.find(r => r.sourceName === 'Classic Churros').description);
});
