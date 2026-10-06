import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

// Verify production HTML, not client-only content or development responses.
const phones = { lusail: '+974 3167 7999', 'abu-hamour': '+974 7791 9555', duhail: '+974 3123 3633', downtown: '+974 3149 1515' };
for (const prefix of ['', 'ar/']) {
  const hub = readFileSync(`.next/server/app/${prefix}locations.html`, 'utf8');
  for (const [id, phone] of Object.entries(phones)) {
    const html = readFileSync(`.next/server/app/${prefix}locations/${id}.html`, 'utf8');
    const tel = `href="tel:${phone.replace(/\s/g, '')}"`;
    assert.ok(html.includes(tel), `${prefix}${id}: missing call link`);
    assert.ok(hub.includes(tel), `${prefix}${id}: missing directory call link`);
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
    assert.equal(schemas.find(schema => schema['@type'] === 'CafeOrCoffeeShop').telephone, phone);
  }
  const mall = readFileSync(`.next/server/app/${prefix}locations/mall-of-qatar.html`, 'utf8');
  assert.ok(!mall.includes('href="tel:'), 'Do not invent a Mall of Qatar telephone');
}
const home = readFileSync('.next/server/app/index.html', 'utf8');
assert.ok(home.includes('Churros Cafe in Qatar brings together'));
for (const id of [...Object.keys(phones), 'mall-of-qatar']) assert.ok(home.includes(`href="/locations/${id}/"`));
console.log('PASS: English/Arabic branch contacts, schema, missing-number omission, and homepage brand links.');
