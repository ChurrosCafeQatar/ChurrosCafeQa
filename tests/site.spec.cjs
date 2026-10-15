const {test,expect}=require('@playwright/test');
const fs=require('node:fs');
const manifest=require('../data/image-manifest.json');
test.setTimeout(180000);
test.beforeEach(async({page})=>{
 await page.route('https://www.googletagmanager.com/**',r=>r.fulfill({contentType:'application/javascript',body:''}));
 await page.route('https://www.google.com/maps**',r=>r.fulfill({contentType:'text/html',body:'<p>Map provider mocked for local UI tests.</p>'}));
});
test('home filters, details, keyboard dismissal and focus restoration',async({page})=>{
 await page.goto('/');await expect(page.locator('main')).toHaveCount(1);await expect(page.locator('#products .product')).toHaveCount(3);
 await page.getByRole('button',{name:'Churros',exact:true}).click();await expect(page.locator('#products .product')).toHaveCount(7);
 const trigger=page.locator('#products .product-open').first();await trigger.click();await expect(page.getByRole('dialog')).toContainText('QAR 170.00');
 await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).not.toBeVisible();await expect(trigger).toBeFocused();
});
test('English anchor menu and Arabic filters retain products and search',async({page})=>{
 await page.goto('/menu/');await expect(page.locator('[data-product]')).toHaveCount(53);
 await page.locator('.menu-controls a[href="#matcha"]').click();await expect(page).toHaveURL(/#matcha$/);await expect(page.locator('#matcha .product')).toHaveCount(4);
 await page.goto('/ar/menu/');await page.locator('#menu-search').fill('لاتيه');await expect(page.locator('[data-product]')).toHaveCount(5);
 await page.locator('#menu-search').fill('nothingmatches');await expect(page.locator('[data-product]')).toHaveCount(0);
});
test('active branch navigation, contacts, maps and closed branch',async({page})=>{
 await page.goto('/');await page.locator('[data-branch="abu-hamour"]').click();await page.locator('#branch-preview a').click();await expect(page).toHaveURL(/locations\/abu-hamour/);
 await expect(page.locator('.map-preview iframe')).toHaveCount(1);await expect(page.locator('a[href="tel:+97477919555"]')).toHaveCount(1);
 await expect(page.locator('.location-cover')).toHaveAttribute('loading','eager');await expect(page.locator('.location-cover')).toHaveAttribute('fetchpriority','high');
 await page.goto('/locations/');await expect(page.locator('.location-card')).toHaveCount(4);
 await page.goto('/locations/mall-of-qatar/');await expect(page.locator('main')).toContainText('permanently closed');await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
 await page.goto('/about/');await expect(page.locator('.story-photo img')).toHaveAttribute('loading','eager');
});
test('responsive image geometry at every requested width',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const width of [320,375,390,768,1024,1440,1920]) {
  await page.setViewportSize({width,height:900});
  for(const route of ['/','/menu/','/locations/','/ar/menu/']) {
   await page.goto(route);await expect(page.locator('h1')).toHaveCount(1);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),route+' at '+width).toBe(true);
   const images=await page.locator('img').evaluateAll(imgs=>imgs.map(i=>({alt:i.hasAttribute('alt'),width:i.getAttribute('width'),height:i.getAttribute('height'),srcset:i.srcset,fit:getComputedStyle(i).objectFit,actual:i.width/Math.max(i.height,1),natural:i.naturalWidth/Math.max(i.naturalHeight,1)})));
   for(const i of images){expect(i.alt).toBe(true);expect(Number(i.width)).toBeGreaterThan(0);expect(Number(i.height)).toBeGreaterThan(0);expect(i.srcset).toContain('/assets/optimized/');expect(['cover','contain','scale-down'].includes(i.fit)||Math.abs(i.actual-i.natural)<.05).toBe(true);}
   if(width<=760)for(const el of await page.locator('.product-description').all())await expect(el).toBeHidden();
  }
 }
 expect(errors).toEqual([]);
});
test('all sitemap routes retain crawlable SEO, schema, links and images',async({browser,request})=>{
 const xml=await(await request.get('/sitemap.xml')).text();const urls=[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);expect(urls.length).toBe(48);
 const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();const titles=new Set(),descriptions=new Set(),links=new Set();
 for(const url of urls){const route=new URL(url).pathname;const r=await page.goto('http://127.0.0.1:4173'+route,{waitUntil:'domcontentloaded'});expect(r.status()).toBe(200);await expect(page.locator('h1')).toHaveCount(1);await expect(page.locator('main')).toHaveCount(1);await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href',url);
  const title=await page.title(),description=await page.locator('meta[name=description]').getAttribute('content');expect(title.length).toBeGreaterThan(0);expect(description.length).toBeGreaterThan(0);expect(titles.has(title)).toBe(false);expect(descriptions.has(description)).toBe(false);titles.add(title);descriptions.add(description);
  expect(await page.locator('meta[name=robots]').getAttribute('content')).not.toContain('noindex');
  const schemas=await page.locator('script[type="application/ld+json"]').allTextContents();for(const s of schemas)expect(JSON.parse(s)['@context']).toBe('https://schema.org');
  for(const href of await page.locator('a[href^="/"]').evaluateAll(as=>as.map(a=>a.getAttribute('href'))))links.add(href);
  expect(await page.locator('img:not([alt])').count()).toBe(0);
 }
 for(const link of links)expect((await request.get(link)).status(),link).toBe(200);
 for(const entry of Object.values(manifest))for(const v of entry.variants)expect(fs.existsSync('public'+v.src),v.src).toBe(true);
 await context.close();
});
test('mobile navigation and language switching',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');await page.getByRole('button',{name:'Open navigation'}).click();await expect(page.locator('#nav')).toBeVisible();await page.locator('#nav a').first().click();await expect(page).toHaveURL(/menu/);
 await page.locator('.language').click();await expect(page).toHaveURL(/ar\/menu/);await expect(page.locator('html')).toHaveAttribute('dir','rtl');
});
test('404, robots, favicon and admin noindex',async({page,request})=>{
 expect((await request.get('/not-a-real-page/')).status()).toBe(404);expect((await request.get('/contact/')).status()).toBe(404);
 expect(await(await request.get('/robots.txt')).text()).toContain('Sitemap: https://churroscafeqa.com/sitemap.xml');expect((await request.get('/favicon.ico')).status()).toBe(200);
 await page.goto('/admin/');await expect(page.locator('meta[name=robots]')).toHaveAttribute('content',/noindex/);
});
test('content editor saves a local draft',async({page})=>{
 await page.goto('/admin/');await page.locator('[name="displayName"]').fill('My signature churros');await page.getByRole('button',{name:'Save draft on this device'}).click();await page.reload();await expect(page.locator('[name="displayName"]')).toHaveValue('My signature churros');await page.getByRole('button',{name:'Clear saved draft'}).click();
});

test('mobile initial payload, image priorities and rendering stay within budgets',async({browser})=>{
 const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:2});
 await context.route('https://www.googletagmanager.com/**',r=>r.fulfill({contentType:'application/javascript',body:''}));
 const page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('response',r=>{if(r.url().startsWith('http://127.0.0.1:4173')&&r.status()>=400)errors.push(r.status()+' '+r.url());});
 await page.addInitScript(()=>{window.testCLS=0;new PerformanceObserver(l=>l.getEntries().forEach(e=>{if(!e.hadRecentInput)window.testCLS+=e.value;})).observe({type:'layout-shift',buffered:true});});
 await page.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});
 const metrics=await page.evaluate(()=>({bytes:performance.getEntriesByType('resource').reduce((s,r)=>s+r.transferSize,0)+performance.getEntriesByType('navigation')[0].transferSize,fcp:performance.getEntriesByName('first-contentful-paint')[0].startTime,cls:window.testCLS}));
 expect(metrics.bytes).toBeLessThan(1500000);expect(metrics.fcp).toBeLessThan(1800);expect(metrics.cls).toBeLessThan(.1);
 await expect(page.locator('.hero-photo img')).toHaveAttribute('fetchpriority','high');await expect(page.locator('.hero-photo img')).toHaveAttribute('loading','eager');
 expect(await page.locator('link[rel=stylesheet]').count()).toBeLessThanOrEqual(1);
 // Next's nomodule fallback is not fetched/executed by modern browsers.
 expect(await page.locator('script[src]:not([async]):not([defer]):not([nomodule])').count()).toBe(0);
 expect(await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>i.complete&&i.naturalWidth>0).every(i=>i.currentSrc.includes('/assets/optimized/')))).toBe(true);
 expect(errors).toEqual([]);await context.close();
});

test('analytics emits actual category, product, branch and social interactions once',async({page})=>{
 const events=()=>page.evaluate(()=>window.dataLayer.filter(a=>a[0]==='event').map(a=>({name:a[1],details:a[2]})));
 await page.goto('/menu/');await page.waitForFunction(()=>window.churrosAnalyticsReady);
 expect((await events()).filter(e=>e.name==='menu_view')).toHaveLength(1);
 await page.locator('.menu-controls a[href="#matcha"]').click();
 expect((await events()).filter(e=>e.name==='menu_category_view'&&e.details.category==='matcha')).toHaveLength(1);
 await page.locator('#matcha .product-open').first().click();expect((await events()).filter(e=>e.name==='product_view')).toHaveLength(1);await page.keyboard.press('Escape');
 await page.locator('header [data-analytics="nearest-location"]').click();
 expect((await events()).filter(e=>e.name==='nearest_location_click')).toHaveLength(1);
 await page.goto('/locations/abu-hamour/');await page.waitForFunction(()=>window.churrosAnalyticsReady);
 // Exercise DOM click handlers while preventing external navigation/calls.
 await page.evaluate(()=>document.addEventListener('click',e=>{if(e.target.closest('a'))e.preventDefault();}));
 await page.locator('a[href="tel:+97477919555"]').click();
 await page.locator('a[href*="maps.app.goo.gl"]').first().click();
 await page.locator('footer a[href*="instagram.com"]').click();
 for(const name of ['location_view','call_click','direction_click','social_click'])expect((await events()).filter(e=>e.name===name),name).toHaveLength(1);
 const config=require('../vercel.json');expect(config.redirects[0].destination).toBe('https://churroscafeqa.com/$1');expect(config.redirects[0].permanent).toBe(true);
});

