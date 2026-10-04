const {test,expect}=require('@playwright/test');
test('home menu filters and product details work',async({page})=>{
 await page.goto('/');await expect(page).toHaveTitle(/Churros Cafe/);await expect(page.locator('#products .product')).toHaveCount(3);await expect(page.locator('.header .brand-logo-image')).toBeVisible();
 const homeCards=await page.locator('#products .product').evaluateAll(cards=>cards.map(card=>({height:card.getBoundingClientRect().height,display:getComputedStyle(card).display})));expect(new Set(homeCards.map(card=>Math.round(card.height))).size).toBe(1);expect(homeCards.every(card=>card.display==='flex')).toBeTruthy();const homePhoto=await page.locator('#products .product-photo').first().boundingBox();expect(Math.abs(homePhoto.width-homePhoto.height)).toBeLessThan(1);
 await page.getByRole('button',{name:'Churros',exact:true}).click();await expect(page.locator('#products .product')).toHaveCount(7);
 await page.locator('#products .product-open').first().click();await expect(page.getByRole('dialog')).toBeVisible();await expect(page.getByRole('dialog')).toContainText('QAR 170.00');
 await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).not.toBeVisible();await expect(page.locator('#products .product-open').first()).toBeFocused();
});
test('full menu supports search and an empty result',async({page})=>{
 await page.goto('/menu/');await expect(page.locator('#products .product')).toHaveCount(53);expect(await page.locator('.menu-controls').evaluate(el=>getComputedStyle(el).position)).toBe('sticky');await page.locator('#category-hot-coffee').scrollIntoViewIfNeeded();expect(Math.round((await page.locator('.menu-controls').boundingBox()).y)).toBe(0);expect(await page.locator('.menu-category-heading h2').allTextContents()).toEqual(['Churros','Waffles','Crepes','Pancakes','Desserts','Ice Cream','Matcha','Hot Coffee','Cold Coffee','Milkshakes','Iced Drinks']);await page.getByRole('button',{name:'Matcha',exact:true}).click();await expect(page.locator('#products .product')).toHaveCount(4);await expect(page.locator('.menu-category-number')).toHaveText('07');await expect.poll(async()=>{const controls=await page.locator('.menu-controls').boundingBox();const heading=await page.locator('.menu-category-heading').boundingBox();return Math.round(heading.y-controls.height)}).toBe(16);await page.getByRole('button',{name:'All',exact:true}).click();await expect(page.locator('#products .product')).toHaveCount(53);await expect(page.locator('.menu-category-number').first()).toHaveText('01');await expect(page.locator('.filters .filter-image img')).toHaveCount(12);await expect(page.locator('.product-image-placeholder')).toHaveCount(0);await page.locator('#products img,.filters .filter-image img').evaluateAll(imgs=>imgs.forEach(i=>i.loading='eager'));await page.waitForFunction(()=>[...document.querySelectorAll('#products img,.filters .filter-image img')].every(i=>i.complete));expect(await page.locator('#products img,.filters .filter-image img').evaluateAll(imgs=>imgs.filter(i=>!i.naturalWidth).map(i=>i.src))).toEqual([]);await page.getByRole('searchbox').fill('latte');await expect(page.locator('#products .product')).toHaveCount(5);
 await page.getByRole('searchbox').fill('nothingmatches');await expect(page.locator('#products')).toContainText('No matches');
});
test('branch discovery changes preview and opens a unique page',async({page})=>{
 await page.goto('/');await page.locator('[data-branch="abu-hamour"]').click();await expect(page.locator('#branch-preview')).toContainText('Abu Hamour');await page.locator('#branch-preview a').click();await expect(page).toHaveURL(/locations\/abu-hamour\//);await expect(page.locator('h1')).toContainText('Abu Hamour');await expect(page.locator('.location-cover')).toBeVisible();await expect.poll(()=>page.locator('.location-cover').evaluate(img=>img.naturalWidth)).toBeGreaterThan(0);await expect(page.locator('.map-preview iframe')).toHaveCount(1);
 await page.getByRole('link',{name:'Plan a visit'}).first().click();await expect(page).toHaveURL(/\/locations\/$/);
});
test('menu category pages use the same source data and schema',async({page})=>{
 await page.goto('/menu/crepes/');await expect(page.locator('h1')).toContainText('Crepes');await expect(page.locator('#products .product')).toHaveCount(3);await expect(page.locator('#products')).toContainText('Dubai Chocolate Crepe');await expect(page.locator('#products')).toContainText('QAR 35.00');
 const schema=JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());expect(schema['@type']).toBe('Menu');expect(schema.hasMenuSection[0].hasMenuItem).toHaveLength(3);
});
test('location directory is image-free and lists all real branches',async({page})=>{
 await page.goto('/locations/');await expect(page.locator('.branch-card')).toHaveCount(5);await expect(page.locator('.branch-card img')).toHaveCount(0);await expect(page.locator('.branch-card')).toContainText(['Lusail','Abu Hamour','Duhail','Downtown','Mall of Qatar']);
});
test('mobile navigation and Arabic menu work without overflow',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');await expect(page.locator('#products .product-category-link').first()).toBeHidden();const mobileCards=await page.locator('#products .product').evaluateAll(cards=>cards.slice(0,3).map(card=>({x:Math.round(card.getBoundingClientRect().x),y:Math.round(card.getBoundingClientRect().y)})));expect(mobileCards[0].y).toBe(mobileCards[1].y);expect(mobileCards[0].x).not.toBe(mobileCards[1].x);expect(mobileCards[2].y).toBeGreaterThan(mobileCards[0].y);await page.getByRole('button',{name:'Open navigation'}).click();await expect(page.locator('#nav')).toBeVisible();await page.locator('#nav a').first().click();await expect(page).toHaveURL(/menu/);expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBe(390);
 await page.goto('/ar/');await expect(page.locator('html')).toHaveAttribute('dir','rtl');await expect(page.locator('.language')).toHaveText('EN');await page.goto('/ar/menu/');await page.locator('#menu-search').fill('لاتيه');await expect(page.locator('#products .product')).toHaveCount(5);expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBe(390);
});
test('all public pages have valid internal links and no failed image loads',async({page,request})=>{
 const routes=['/','/menu/','/menu/churros/','/menu/waffles/','/menu/crepes/','/menu/pancakes/','/menu/desserts/','/menu/ice-cream/','/menu/matcha/','/menu/hot-coffee/','/menu/iced-coffee/','/menu/milkshakes/','/menu/iced-drinks/','/locations/','/about/','/reservations/','/offers/','/stories/','/privacy/','/locations/lusail/','/locations/abu-hamour/','/locations/duhail/','/locations/downtown/','/locations/mall-of-qatar/'];
 const errors=[];page.on('pageerror',e=>errors.push(e.message));const links=new Set();
 for(const route of [...routes,...routes.map(r=>'/ar'+r)]){
  const response=await page.goto(route);expect(response.status(),route).toBe(200);await expect(page.locator('h1')).toHaveCount(1);
  (await page.locator('a[href^="/"]').evaluateAll(as=>as.map(a=>a.getAttribute('href')))).forEach(h=>links.add(h));
 }
 for(const href of links)expect((await request.get(href)).status(),href).toBe(200);
 await page.goto('/');await page.locator('img').evaluateAll(imgs=>imgs.forEach(i=>i.loading='eager'));await page.waitForFunction(()=>[...document.images].every(i=>i.complete));expect(await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>!i.naturalWidth).map(i=>i.src))).toEqual([]);expect(errors).toEqual([]);
});
test('404 and normalization return correct status',async({request})=>{
 expect((await request.get('/not-a-real-page/')).status()).toBe(404);expect((await request.get('/catering/')).status()).toBe(404);expect((await request.get('/contact/')).status()).toBe(404);expect((await request.get('/menu',{maxRedirects:0})).status()).toBe(308);
});
test('content editor saves and exports a draft',async({page})=>{
 await page.goto('/admin/');await page.locator('[name="displayName"]').fill('My signature churros');await page.getByRole('button',{name:'Save draft on this device'}).click();await page.reload();await expect(page.locator('[name="displayName"]')).toHaveValue('My signature churros');
 const download=page.waitForEvent('download');await page.getByRole('button',{name:'Export draft JSON'}).click();expect((await download).suggestedFilename()).toBe('churros-cafe-content-draft.json');await page.getByRole('button',{name:'Clear saved draft'}).click();await expect(page.locator('[name="displayName"]')).toHaveValue('24 Hour Cold Brew');
});
test('AEO and GEO references expose verified business data',async({page,request})=>{
 const index=await request.get('/llms.txt');expect(index.status()).toBe(200);expect(index.headers()['content-type']).toContain('text/plain');const indexText=await index.text();expect(indexText).toContain('# Churros Cafe');expect(indexText).toContain('https://churroscafeqa.com/menu/');expect(indexText).toContain('Lusail Night Market, Lusail, Qatar');
 const full=await request.get('/llms-full.txt');expect(full.status()).toBe(200);const fullText=await full.text();expect(fullText).toContain('Published menu products: 53');expect(fullText).toContain('Classic Churros — QAR 30.00');expect(fullText).toContain('Published branches: 5');
 await page.goto('/');await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href','https://churroscafeqa.com/');await expect(page.locator('link[rel="alternate"][hreflang="ar"]')).toHaveAttribute('href','https://churroscafeqa.com/ar/');const homeSchemas=await page.locator('script[type="application/ld+json"]').allTextContents();expect(homeSchemas.map(JSON.parse).some(schema=>schema['@graph']?.some(item=>item['@type']==='Organization'))).toBeTruthy();
 await page.goto('/locations/lusail/');const locationSchemas=(await page.locator('script[type="application/ld+json"]').allTextContents()).map(JSON.parse);const cafe=locationSchemas.find(schema=>schema['@type']==='CafeOrCoffeeShop');expect(cafe.name).toBe('Churros Cafe Lusail');expect(cafe.address.streetAddress).toBe('Lusail Night Market, Lusail, Qatar');
});

