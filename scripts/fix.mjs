import fs from 'fs';
let code = fs.readFileSync('components/cafe-site.tsx', 'utf-8');

code = code.replace(/import \{ useEffect, useMemo, useRef, useState \} from 'react';/, '');

const regex = /function SiteDialog[\s\S]*?export function BranchExplorer[^}]*\}\s*\}/;
code = code.replace(regex, '');

const newCafeSite = `
export default function CafeSite({ lang = 'en', page, branchId = '', categorySlug = '', currentPath = '' }) {
  const t = text => lang === 'ar' ? translations[text] || text : text;

  const openProduct = () => {};

  let content;
  if (page === 'home') content = <HomePage lang={lang} t={t} openProduct={openProduct} />;
  else if (page === 'menu') content = <MenuPage lang={lang} t={t} openProduct={openProduct} />;
  else if (page === 'menu-category') content = <MenuCategoryPage lang={lang} t={t} openProduct={openProduct} categorySlug={categorySlug} />;
  else if (page === 'locations') content = <LocationsPage lang={lang} t={t} />;
  else if (page === 'location') content = <LocationPage lang={lang} t={t} branchId={branchId} openProduct={openProduct} />;
  else content = <StandardPage page={page} lang={lang} t={t} />;

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang}>
      {content}
      <SiteDialog lang={lang} t={t} />
    </div>
  );
}
`;

code = code.replace(/export default function CafeSite[\s\S]*$/, newCafeSite);

fs.writeFileSync('components/cafe-site.tsx', code);
