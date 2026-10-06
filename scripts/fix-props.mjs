import fs from 'fs';
let codeInteractive = fs.readFileSync('components/cafe-interactive.tsx', 'utf-8');

// Inside cafe-interactive.tsx, redefine `t` using `translations` that is already imported:
codeInteractive = codeInteractive.replace(
  /export function ProductGrid\(\{ lang, t, openProduct/g,
  `export function ProductGrid({ lang, openProduct`
).replace(
  /export function BranchExplorer\(\{ lang, t \}\)/g,
  `export function BranchExplorer({ lang })`
).replace(
  /export function SiteDialog\(\{ lang, t \}\)/g,
  `export function SiteDialog({ lang })`
);

// We need to inject `const t = text => lang === 'ar' ? translations[text] || text : text;` into each of those functions.
codeInteractive = codeInteractive.replace(
  /export function ProductGrid\(\{([^)]+)\}\) \{/g,
  `export function ProductGrid({$1}) {\n  const t = text => lang === 'ar' ? translations[text] || text : text;`
).replace(
  /export function BranchExplorer\(\{([^)]+)\}\) \{/g,
  `export function BranchExplorer({$1}) {\n  const t = text => lang === 'ar' ? translations[text] || text : text;`
).replace(
  /export function SiteDialog\(\{([^)]+)\}\) \{/g,
  `export function SiteDialog({$1}) {\n  const t = text => lang === 'ar' ? translations[text] || text : text;`
);

fs.writeFileSync('components/cafe-interactive.tsx', codeInteractive);

let codeSite = fs.readFileSync('components/cafe-site.tsx', 'utf-8');
// Remove t={t} from ProductGrid, BranchExplorer, SiteDialog invocations
codeSite = codeSite.replace(/<ProductGrid[^>]*>/g, match => match.replace(/ t=\{t\}/g, ''))
                   .replace(/<BranchExplorer[^>]*>/g, match => match.replace(/ t=\{t\}/g, ''))
                   .replace(/<SiteDialog[^>]*>/g, match => match.replace(/ t=\{t\}/g, ''));

// Wait, I should also remove openProduct={openProduct} from ProductGrid since ProductGrid doesn't need it!
// Oh, ProductGrid passes openProduct to ProductCard. And ProductCard no longer expects it either, because it dispatches an event!
// So let's remove openProduct from ProductGrid and ProductCard definitions too!
// Actually, earlier I already removed openProduct invocation in ProductCard via `onClick={() => window.dispatchEvent...}`.
// I will just remove `openProduct` from `<ProductGrid openProduct={openProduct}` in `cafe-site.tsx`.
codeSite = codeSite.replace(/ openProduct=\{openProduct\}/g, '');

fs.writeFileSync('components/cafe-site.tsx', codeSite);
