import fs from 'node:fs/promises';
import path from 'node:path';

const sourcePath = path.resolve('data/menu-source.json');
const imageDirectory = path.resolve('public/assets/menu');
const rows = JSON.parse(await fs.readFile(sourcePath, 'utf8'));
const sourceCategories = new Set(['Churros', 'DESSERT', 'ICECREAM', 'Matcha', 'MILKSHAKES', 'HOT COFFEE', 'COLD COFFEE', 'ICED']);
const slugify = value => value.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const issues = [];
const warnings = [];
const seenNames = new Map();
const seenSlugs = new Map();
const seenImages = new Map();
const assetStatus = {};

for (const [index, row] of rows.entries()) {
  const location = `row ${index + 2}`;
  if (!row.sourceName?.trim()) issues.push({ type: 'empty-required-name', location });
  if (!row.sourceCategory?.trim()) issues.push({ type: 'missing-category', product: row.sourceName, location });
  else if (!sourceCategories.has(row.sourceCategory)) issues.push({ type: 'unsupported-category', product: row.sourceName, value: row.sourceCategory, location });

  const amounts = [...String(row.price || '').matchAll(/(\d+(?:\.\d+)?)/g)].map(match => Number(match[1]));
  if (!/^QAR\s+\d+(?:\.\d+)?(?:\s*-\s*QAR\s+\d+(?:\.\d+)?)?$/.test(String(row.price || ''))) {
    issues.push({ type: 'invalid-price', product: row.sourceName, value: row.price, location });
  } else if (amounts.length === 2 && amounts[0] > amounts[1]) {
    issues.push({ type: 'malformed-price-range', product: row.sourceName, value: row.price, location });
  }

  const normalizedName = row.sourceName?.trim().toLowerCase();
  const slug = slugify(row.sourceName || '');
  if (seenNames.has(normalizedName)) issues.push({ type: 'duplicate-product', product: row.sourceName, rows: [seenNames.get(normalizedName), index + 2] });
  else seenNames.set(normalizedName, index + 2);
  if (seenSlugs.has(slug)) issues.push({ type: 'duplicate-slug', product: row.sourceName, slug, rows: [seenSlugs.get(slug), index + 2] });
  else seenSlugs.set(slug, index + 2);

  if (!row.image?.trim()) {
    warnings.push({ type: 'missing-image-reference', product: row.sourceName, location });
  } else {
    const imagePath = path.join(imageDirectory, row.image);
    let exists = true;
    try { await fs.access(imagePath); } catch { exists = false; }
    assetStatus[row.image] = exists;
    if (!exists) warnings.push({ type: 'missing-image-file', product: row.sourceName, filename: row.image, expectedPath: imagePath });
    if (seenImages.has(row.image)) warnings.push({ type: 'duplicate-image-reference', filename: row.image, products: [seenImages.get(row.image), row.sourceName] });
    else seenImages.set(row.image, row.sourceName);
  }

  for (const branch of row.availableLocations || []) warnings.push({ type: 'unvalidated-branch-reference', product: row.sourceName, branch });
  for (const partner of row.deliveryPartners || []) warnings.push({ type: 'unvalidated-delivery-partner-reference', product: row.sourceName, partner });
}

const report = {
  generatedAt: new Date().toISOString(),
  source: 'data/menu-source.json',
  expectedWorkbook: 'menu_churro.xlsx',
  productCount: rows.length,
  valid: issues.length === 0,
  errors: issues,
  warnings,
  summary: {
    errors: issues.length,
    warnings: warnings.length,
    missingImages: warnings.filter(item => item.type === 'missing-image-file').length,
    descriptionsMissing: rows.filter(row => !row.description?.trim()).length
  },
  developmentTodos: [
    'Place menu_churro.xlsx in the project and run npm run menu:import -- menu_churro.xlsx when the workbook is supplied.',
    'Add approved delivery partners only after business confirmation.',
    'Add branch-specific product availability only after business confirmation.',
    'Do not fill blank descriptions without an updated official menu source.'
  ]
};

await fs.mkdir(path.resolve('reports'), { recursive: true });
await fs.writeFile(path.resolve('data/menu-asset-status.json'), `${JSON.stringify(assetStatus, null, 2)}\n`, 'utf8');
await fs.writeFile(path.resolve('reports/menu-validation-report.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(report, null, 2));
if (issues.length) process.exitCode = 1;

