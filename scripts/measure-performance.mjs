import { chromium } from '@playwright/test';
import { writeFile, mkdir } from 'node:fs/promises';
const origin = process.argv[2] || 'http://127.0.0.1:4194';
const label = process.argv[3] || 'sample';
await mkdir('reports/performance', { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const runs = [];
try {
  for (const [name, width, height, deviceScaleFactor] of [['mobile',390,844,2],['desktop',1440,900,1]]) {
    const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor });
    if (origin.includes('127.0.0.1')) await context.route('https://www.googletagmanager.com/**', r => r.fulfill({ contentType:'application/javascript', body:'' }));
    const page = await context.newPage();
    await page.addInitScript(() => {
      window.layoutShifts = 0;
      new PerformanceObserver(list => list.getEntries().forEach(e => { if (!e.hadRecentInput) window.layoutShifts += e.value; })).observe({ type: 'layout-shift', buffered: true });
    });
    const snapshot = () => page.evaluate(() => {
      const resources = performance.getEntriesByType('resource').map(r => ({url:r.name, type:r.initiatorType, bytes:r.transferSize, decoded:r.decodedBodySize, duration:r.duration}));
      return { resources, requests:resources.length+1, transferBytes:resources.reduce((n,r)=>n+r.bytes,0)+performance.getEntriesByType('navigation')[0].transferSize,
        imageBytes:resources.filter(r=>/\.(png|webp|avif|jpe?g|gif|svg)(\?|$)/i.test(r.url)).reduce((n,r)=>n+r.bytes,0), cls:window.layoutShifts,
        fcp:performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
        images:[...document.images].map(i=>({src:i.currentSrc||i.src,alt:i.alt,width:i.width,height:i.height,naturalWidth:i.naturalWidth,naturalHeight:i.naturalHeight,fit:getComputedStyle(i).objectFit,loading:i.loading,sizes:i.sizes})) };
    });
    await page.goto(origin, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    const initial = await snapshot();
    await page.screenshot({ path:`reports/performance/${label}-${name}.png`, fullPage:true });
    for(let y=0;y<await page.evaluate(()=>document.body.scrollHeight);y+=600) { await page.evaluate(y=>scrollTo(0,y),y); await page.waitForTimeout(100); }
    await page.waitForTimeout(500);
    runs.push({name,width,height,deviceScaleFactor,initial,full:await snapshot()});
    await context.close();
  }
} finally { await browser.close(); }
await writeFile(`reports/performance/${label}.json`, JSON.stringify({origin,date:new Date().toISOString(),runs},null,2));
console.log(runs.map(r=>({name:r.name,initialKB:Math.round(r.initial.transferBytes/1024),imageKB:Math.round(r.initial.imageBytes/1024),requests:r.initial.requests,fullKB:Math.round(r.full.transferBytes/1024),cls:r.initial.cls})));
