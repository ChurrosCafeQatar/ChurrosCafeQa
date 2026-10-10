const fs = require('fs');

function checkFile(filePath, regexes) {
  try {
    const html = fs.readFileSync(filePath, 'utf8');
    const results = {};
    for (const [name, regex] of Object.entries(regexes)) {
      const match = html.match(regex);
      results[name] = match ? true : false;
      if (!match) console.log(`[FAIL] ${filePath} missing: ${name}`);
    }
    return results;
  } catch (err) {
    console.error(`[ERROR] ${filePath} read error:`, err.message);
    return null;
  }
}

console.log('--- Homepage ---');
checkFile('out/index.html', {
  canonical: /<link rel="canonical" href="https:\/\/churroscafeqa\.com\/"[^>]*>/,
  title: /<title>Churros Cafe Qatar \| Official Website, Menu &amp; Locations<\/title>/,
  h1: /Churros Cafe Qatar\. Golden, crispy churros drenched in liquid gold\./,
  schema: /application\/ld\+json/,
  mobileNav: /mobile-bar/,
  navbar: /header-main/,
  relatedCategories: /related-categories/
});

console.log('\n--- Lusail Branch ---');
checkFile('out/locations/lusail/index.html', {
  canonical: /<link rel="canonical" href="https:\/\/churroscafeqa\.com\/locations\/lusail\/"[^>]*>/,
  title: /Lusail/,
  h2: /Lusail/,
  mapEmbed: /iframe[^>]*src="https:\/\/www\.google\.com\/maps[^>]*"/,
  schema: /application\/ld\+json/
});

console.log('\n--- Mall of Qatar Branch (Closed) ---');
checkFile('out/locations/mall-of-qatar/index.html', {
  canonical: /<link rel="canonical" href="https:\/\/churroscafeqa\.com\/locations\/mall-of-qatar\/"[^>]*>/,
  title: /Mall of Qatar/,
  h1: /Churros Cafe Mall of Qatar/,
  closureNotice: /PERMANENTLY CLOSED/
});

console.log('\n--- Menu ---');
checkFile('out/menu/index.html', {
  canonical: /<link rel="canonical" href="https:\/\/churroscafeqa\.com\/menu\/"[^>]*>/,
  title: /Menu/,
  products: /product-title/
});

console.log('\n--- Sitemap & Robots ---');
console.log('sitemap.xml contains Mall of Qatar?', fs.readFileSync('out/sitemap.xml', 'utf8').includes('mall-of-qatar'));
console.log('robots.txt exists?', fs.existsSync('out/robots.txt'));
