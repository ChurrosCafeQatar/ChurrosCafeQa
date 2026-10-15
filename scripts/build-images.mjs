import sharp from 'sharp';
import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('public/assets');
const destination = path.join(root, 'optimized');
await mkdir(destination, { recursive: true });
const manifest = {};
const report = [];
async function walk(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === 'optimized' || entry.name === 'fonts') continue;
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(file));
    else if (/\.(webp|png|jpe?g|avif)$/i.test(entry.name)) files.push(file);
  }
  return files.sort();
}
for (const file of await walk(root)) {
  const relative = path.relative(root, file).replaceAll('\\', '/');
  // Browser icons retain their existing formats/URLs and exact dimensions.
  if (/churros-(icon|favicon|apple)/.test(relative)) continue;
  const buffer = await readFile(file);
  const info = await sharp(buffer).metadata();
  const width = info.autoOrient?.width || info.width;
  const height = info.autoOrient?.height || info.height;
  const quality = /logo/i.test(relative) ? 95 : 85;
  const hash = createHash('sha256').update(buffer).update(`webp-v1-q${quality}`).digest('hex').slice(0,16);
  const stem = path.parse(relative).name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const widths = [...new Set([96,192,320,480,640,960,1280,1600,Math.min(width,1600)].filter(w=>w<=width))].sort((a,b)=>a-b);
  const variants = [];
  for (const size of widths) {
    const name = `${stem}-${hash}-${size}.webp`;
    const target = path.join(destination,name);
    let bytes;
    try { bytes = (await stat(target)).size; }
    catch {
      await sharp(buffer).rotate().resize({ width:size, withoutEnlargement:true }).webp({ quality, effort:5 }).toFile(target);
      bytes = (await stat(target)).size;
    }
    variants.push({width:size,src:`/assets/optimized/${name}`,bytes});
  }
  manifest[`/assets/${relative}`] = { width, height, variants };
  report.push({source:relative,width,height,originalBytes:buffer.length,quality,variants});
}
await writeFile('data/image-manifest.json',JSON.stringify(manifest));
await mkdir('reports/performance',{recursive:true});
await writeFile('reports/performance/image-inventory.json',JSON.stringify(report,null,2));
console.log(`Prepared ${report.length} source images; originals retained. Generated variants are content-hashed and cached between builds.`);
