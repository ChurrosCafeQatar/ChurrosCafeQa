import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';

const origin = process.argv[2] || 'http://127.0.0.1:4187';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const width of [320, 390, 760, 1280]) {
    await page.setViewportSize({ width, height: 844 });
    for (const path of ['/', '/menu/', '/menu/churros/', '/ar/menu/']) {
      await page.goto(origin + path);
      const state = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        descriptions: [...document.querySelectorAll('.product-grid .product-description')].map(el => getComputedStyle(el).display),
        nameSize: parseFloat(getComputedStyle(document.querySelector('.product-title h3')).fontSize),
        columns: getComputedStyle(document.querySelector('.product-grid')).gridTemplateColumns.split(' ').length,
      }));
      assert.ok(!state.overflow, `${path} overflow at ${width}`);
      if (path !== '/') assert.ok(state.descriptions.length, `${path}: description content must remain in HTML`);
      assert.ok(state.descriptions.every(display => width <= 760 ? display === 'none' : display !== 'none'));
      if (width <= 760) {
        assert.equal(state.columns, 2);
        assert.ok(state.nameSize >= 15 && state.nameSize <= 18);
      }
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(origin + '/menu/');
  const card = page.locator('.product').filter({ has: page.locator('.product-description') }).first();
  const description = await card.locator('.product-description').textContent();
  await card.locator('.product-open').click();
  await page.locator('dialog[open]').waitFor({ state: 'visible' });
  assert.ok((await page.locator('dialog[open]').innerText()).includes(description));
  await page.keyboard.press('Escape');
  await card.scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'reports/mobile-menu-cards.png' });
  assert.deepEqual(errors, []);
  console.log('PASS: four routes at four widths; mobile descriptions hidden, 2-column grid, smaller names, desktop descriptions and mobile dialog intact.');
} finally {
  await browser.close();
}
