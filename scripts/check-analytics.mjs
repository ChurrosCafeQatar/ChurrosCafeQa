import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';

const origin = process.argv[2] || 'http://127.0.0.1:4194';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  const context = await browser.newContext();
  // Do not send test traffic to the real business property.
  await context.route('https://www.googletagmanager.com/**', route => route.fulfill({ contentType: 'application/javascript', body: '' }));
  const page = await context.newPage();
  await page.goto(origin);
  await page.waitForFunction(() => window.churrosAnalyticsReady);
  assert.equal(await page.locator('#churros-ga').count(), 1);
  assert.equal(await page.locator('#churros-ga').getAttribute('src'), 'https://www.googletagmanager.com/gtag/js?id=G-CZHKZXTHKC');
  assert.equal(await page.locator('.analytics-choice').count(), 0);
  const commands = await page.evaluate(() => window.dataLayer.map(args => Array.from(args)));
  assert.equal(commands.filter(args => args[0] === 'config' && args[1] === 'G-CZHKZXTHKC').length, 1);
  assert.equal(commands.filter(args => args[0] === 'event' && args[1] === 'page_view').length, 1);
  assert.equal(commands.find(args => args[0] === 'config')[2].send_page_view, false);
  await page.locator('footer a[href="/menu/"]').first().click();
  await page.waitForFunction(() => window.dataLayer.filter(args => args[0] === 'event' && args[1] === 'page_view').length === 2);
  assert.equal(await page.locator('#churros-ga').count(), 1);
  await page.evaluate(() => window.dispatchEvent(new Event('churros:privacy-settings')));
  await page.getByRole('button', { name: 'Reject analytics', exact: true }).click();
  assert.equal(await page.evaluate(() => window.churrosAnalyticsReady), false);
  await page.reload();
  await page.waitForTimeout(600);
  assert.equal(await page.locator('#churros-ga').count(), 0);
  assert.equal(await page.locator('.analytics-choice').count(), 0);
  console.log('PASS: configured ID, one tag, one page view per tested navigation, no initial popup, saved opt-out honored. Google requests mocked; GA4 delivery not verified.');
} finally {
  await browser.close();
}
