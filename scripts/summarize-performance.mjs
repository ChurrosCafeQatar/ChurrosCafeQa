import { readFile, writeFile } from 'node:fs/promises';
const before = JSON.parse(await readFile('reports/performance/before.json'));
const after = JSON.parse(await readFile('reports/performance/release.json'));
function classify(resource) {
  const url = new URL(resource.url);
  if (/\.css$|\.woff2$|campaign-dessert-spread|churros-logo/.test(url.pathname)) return 'Critical: visible brand imagery, stylesheet or fonts';
  if (url.hostname === 'www.googletagmanager.com') return 'Necessary but deferrable: async analytics; mocked in this payload measurement';
  if (resource.type === 'fetch') return 'Deferrable: Next route navigation prefetch (primary content links retained)';
  if (/\.js$/.test(url.pathname)) return 'Necessary: async framework/navigation/menu hydration; not synchronous';
  if (/favicon|churros-icon/.test(url.pathname)) return 'Necessary browser icon; repeated zero-byte favicon entries do not imply duplicate transferred payload';
  if (/\.webp$|\.png$/.test(url.pathname)) return 'Necessary but deferrable: lazy image, thumbnail or card variant';
  return 'Review resource in raw inventory';
}
const comparison = after.runs.map(run => {
  const baseline = before.runs.find(r => r.name === run.name);
  return { device:run.name, measurements:Object.fromEntries(['transferBytes','imageBytes','requests'].map(key=>[key,{before:baseline.initial[key],after:run.initial[key],reductionPercent:100*(1-run.initial[key]/baseline.initial[key])}])),
    resources:run.initial.resources.map(r=>({...r,classification:classify(r)})),
    note:'HTML navigation is an additional critical request. Local uncompressed static export, GA mocked; supplied external audit is not a comparable baseline.' };
});
await writeFile('reports/performance/comparison-and-requests.json',JSON.stringify(comparison,null,2));
console.log(comparison.map(({device,measurements})=>({device,measurements})));
