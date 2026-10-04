import fs from 'node:fs/promises';
import path from 'node:path';
import readXlsxFile from 'read-excel-file/node';

const input = process.argv[2];
if (!input) {
  console.error('Usage: npm run menu:import -- <path-to-menu_churro.xlsx>');
  process.exit(1);
}

const workbookPath = path.resolve(input);
const rows = await readXlsxFile(workbookPath);
if (!rows.length) throw new Error('The menu workbook is empty.');

const normalizeHeader = value => String(value || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '');
const headers = rows[0].map(normalizeHeader);
const findColumn = (...names) => headers.findIndex(header => names.includes(header));
const columns = {
  sourceName: findColumn('menuitem', 'product', 'productname', 'name'),
  image: findColumn('imageid', 'image', 'imagefilename'),
  price: findColumn('price'),
  sourceCategory: findColumn('category', 'sourcecategory'),
  description: findColumn('description', 'descripton')
};

const missingHeaders = Object.entries(columns).filter(([key, index]) => key !== 'description' && index < 0).map(([key]) => key);
if (missingHeaders.length) throw new Error(`Missing required menu columns: ${missingHeaders.join(', ')}`);

const source = rows.slice(1)
  .filter(row => row.some(value => value !== null && value !== undefined && String(value).trim()))
  .map(row => ({
    sourceName: String(row[columns.sourceName] || '').trim(),
    image: String(row[columns.image] || '').trim().replace('\\.webp', '.webp'),
    price: String(row[columns.price] || '').trim(),
    sourceCategory: String(row[columns.sourceCategory] || '').trim(),
    description: columns.description >= 0 ? String(row[columns.description] || '').trim() : ''
  }));

const outputPath = path.resolve('data/menu-source.json');
await fs.writeFile(outputPath, `${JSON.stringify(source, null, 2)}\n`, 'utf8');
console.log(`Imported ${source.length} menu products from ${workbookPath}`);
console.log(`Wrote ${outputPath}`);

