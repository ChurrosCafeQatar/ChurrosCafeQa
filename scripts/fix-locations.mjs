import fs from 'fs';
let code = fs.readFileSync('components/cafe-site.tsx', 'utf-8');

const regex = /function LocationsPage\(\[\s\S\]*?\n  \}\n/g;
const newLocationsPage = `
function LocationsPage({ lang, t }) {
  const branches = CHURROS_CAFE.branches;
  return <main id="main"><PageHeading lang={lang} t={t} kicker="OUR LOCATIONS" title="Find your nearest<br><em>Churros Cafe.</em>" description="Five real branches across Qatar, each serving the churros, desserts, and drinks you love." /><section className="page-body"><div className="branch-grid branch-directory">{branches.map(branch => <article className="branch-card" key={branch.id}><div><p className="eyebrow">{t('BRANCH')} {branch.number}</p><h2>{lang === 'ar' ? branch.ar : branch.name}</h2><p>{branch.locationLabel}</p><BranchPhone branch={branch} lang={lang} /><p>{t(branch.intro)}</p><div className="branch-actions"><Link className="link" href={prefix(lang, \`/locations/\${branch.id}/\`)}>{t('View branch and map')} <ArrowIcon /></Link><a className="link" href={branch.mapUrl} target="_blank" rel="noreferrer">{t('Open in Google Maps')} <ArrowIcon /></a></div></div></article>)}</div></section></main>;
}
`;

code = code.replace(/function LocationsPage\(\{[\s\S]*?\} \{(?:\n.*)+\n  \}/, newLocationsPage);

fs.writeFileSync('components/cafe-site.tsx', code);
