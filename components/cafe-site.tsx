// @ts-nocheck


import { SiteDialog, ProductCard, ProductGrid, BranchExplorer } from './cafe-interactive';

import Link from 'next/link';
import SiteImage from './site-image';
import { categoryCopy, relatedCategories } from '../data/seo';
import { analyticsEnabled, track } from '../data/analytics';
import { CHURROS_CAFE, translations } from '../data/content';
import { MENU_CATEGORIES, categoryBySlug, formatPrice, getMenuSearchText, menuByCategory } from '../data/menu';
import { absoluteUrl } from '../data/site';
import { ArrowIcon, BurstIcon, CloseIcon, DownIcon, MenuIcon, SparkIcon } from './icons';

const filters = [
  { value: 'all', label: 'All', heading: 'All' },
  ...MENU_CATEGORIES.map(category => ({ value: category.slug, label: category.label, heading: category.label }))
];

const categoryFilters = filters.filter(filter => filter.value !== 'all');


export function Rich({ as: Tag = 'span', children, ...props }: any) {
  return <Tag {...props} dangerouslySetInnerHTML={{ __html: children }} />;
}

function prefix(lang, path = '/') {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return lang === 'ar' ? `/ar${clean}` : clean;
}


function PageHeading({ lang, t, kicker, title, description, parent }) {
  const crumbs = [{ name: t('Home'), item: absoluteUrl(prefix(lang)) }];
  if (parent) crumbs.push({ name: t(parent.label), item: absoluteUrl(prefix(lang, parent.href)) });
  crumbs.push({ name: t(kicker) });
  const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs.map((crumb, index) => ({ '@type': 'ListItem', position: index + 1, ...crumb })) };
  return (
    <section className="page-heading">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }} />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href={prefix(lang)}>{t('Home')}</Link><span>/</span>
        {parent && <><Link href={prefix(lang, parent.href)}>{t(parent.label)}</Link><span>/</span></>}
        <span>{t(kicker)}</span>
      </nav>
      <p className="eyebrow">{t(kicker)}</p>
      <Rich as="h1">{t(title)}</Rich>
      {description && <p>{t(description)}</p>}
    </section>
  );
}

function BranchPhone({ branch, lang }) {
  if (!branch.phone) return null;
  return <p className="branch-phone"><a className="link" href={`tel:${branch.phone.replace(/\s/g, '')}`} data-branch-id={branch.id}>
    {lang === 'ar' ? `اتصل بتشوروز كافيه ${branch.ar}` : `Call Churros Cafe ${branch.name}`}: <bdi dir="ltr">{branch.phone}</bdi>
  </a></p>;
}

function HomePage({ lang, t, openProduct }) {
  return (
    <main id="main" className="home-page">
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="tiny-sun"><SparkIcon /></span> {t('CHURROS CAFE · QATAR')}</div>
          <Rich as="h1">{t('Golden, crispy,<br>and drenched in <em>liquid gold.</em><br>Elevate your sweet tooth.')}</Rich>
          <Rich as="p">{t('Perfectly pulled coffee. Warm, cinnamon-dusted churros.<br class="desktop"> A little escape from the everyday.')}</Rich>
          <p>{lang === 'ar' ? 'تشوروز كافيه في قطر: تشوروز ووافل وكريب وماتشا وقهوة. تصفح القائمة واعثر على فرعك.' : 'Churros Cafe in Qatar brings together churros, waffles, crepes, matcha, and coffee. Explore our menu and find your branch.'}</p>
          <div className="hero-actions"><Link href={prefix(lang, '/menu/')} className="button">{t('Explore the menu')} <ArrowIcon /></Link><Link href={prefix(lang, '/locations/')} className="link">{t('Find your café')} <ArrowIcon /></Link></div>
          <div className="hero-note"><span className="line-drawing" aria-hidden="true"><BurstIcon /></span><Rich>{t('Made for slow sips<br>and sweet little moments.')}</Rich></div>
          <div className="hero-foot"><span>{t('COFFEE & CHURROS, BEAUTIFULLY TOGETHER.')}</span><a href="#favorites" aria-label="Discover our favorites"><DownIcon /></a></div>
        </div>
        <div className="hero-photo">
          <SiteImage src="/assets/campaign-dessert-spread.png" width={2048} height={2048} fetchPriority="high" alt="Churros Cafe dessert trays topped with chocolate, pistachio, strawberries, and banana" />
          <div className="photo-caption"><span>{t('A MATCH MADE FOR CHURROS.')}</span><span>{t('01 / THE EVERYDAY RITUAL')}</span></div>
          <div className="round-seal" aria-hidden="true"><span>{t('A LITTLE SIP')}</span><b><SparkIcon /></b><span>{t('A LITTLE JOY')}</span></div>
        </div>
      </section>
      <div className="ribbon" aria-hidden="true"><span>{t('COFFEE WITH CHARACTER')}</span><b><SparkIcon /></b><span>{t('CHURROS WORTH SHARING')}</span><b><SparkIcon /></b><span>{t('YOUR KIND OF PLACE')}</span><b><SparkIcon /></b><span>{t('A LITTLE EVERYDAY JOY')}</span><b><SparkIcon /></b></div>
      <section className="section favorites" id="favorites">
        <div className="section-top"><div><p className="eyebrow">{t('THE GOOD STUFF')}</p><Rich as="h2">{t('Meet your next <em>favorite.</em>')}</Rich></div><Link className="link" href={prefix(lang, '/menu/')}>{t('Discover the full menu')} <ArrowIcon /></Link></div>
        <ProductGrid lang={lang} filtersVisible />
        <div className="menu-bottom"><span>{t('Something sweet. Something bold. Always a good idea.')}</span><span>{t('53 menu selections · prices in QAR')}</span></div>
      </section>
      <section className="story section" id="story">
        <div className="story-photo"><SiteImage src="/assets/campaign-churros-moment.png" width={2048} height={2048} alt="A customer enjoying a fresh loop churro with dipping sauces" loading="lazy" /><span className="vertical-caption">{t('GOOD THINGS TAKE A LITTLE CARE.')}</span></div>
        <div className="story-copy"><p className="eyebrow">{t('HELLO, WE’RE CHURROS CAFE')}</p><Rich as="h2">{lang === 'ar' ? 'تشوروز كافيه في قطر' : 'Churros Cafe in Qatar'}</Rich><p className="lead">{t('Between the rush and the routine, there’s a little room for something lovely.')}</p><p>{t('A warm cup held in both hands. The first bite of a golden churro. A conversation that lasts longer than you planned. That’s the feeling behind Churros Cafe.')}</p><p>{t('We’re a café concept built around a simple idea: the little things can make the whole day.')}</p><Link className="link" href={prefix(lang, '/about/')}>{t('A little more about us')} <ArrowIcon /></Link><div className="story-signature">{t('Stay a little. Smile a lot.')} <span><SparkIcon /></span></div></div>
      </section>
      <section className="moment"><SiteImage src="/assets/campaign-seaside-churros.png" width={2048} height={2048} alt="Chocolate being poured over fresh churros in a Churros Cafe box by the sea" loading="lazy" /><div><p className="eyebrow">{t('LESS RUSH. MORE RITUAL.')}</p><Rich as="h2">{t('Some things are better<br><em>enjoyed slowly.</em>')}</Rich><Link href={prefix(lang, '/locations/')} className="button light">{t('Find your little escape')} <ArrowIcon /></Link></div></section>
      <section className="section locations" id="locations"><div className="section-top"><div><p className="eyebrow">{t('SAME WARM WELCOME. A NEW LITTLE CORNER.')}</p><Rich as="h2">{t('Find your <em>Churros Cafe.</em>')}</Rich></div><Rich as="p">{t('Four branches across Qatar.<br>One unmistakable taste.')}</Rich></div><BranchExplorer lang={lang} /><nav className="related-categories" aria-label={lang === 'ar' ? 'فروع تشوروز كافيه' : 'Churros Cafe branches'}>{CHURROS_CAFE.branches.map(branch => <Link className="link" key={branch.id} href={prefix(lang, `/locations/${branch.id}/`)}>{lang === 'ar' ? `تشوروز كافيه ${branch.ar}` : `Churros Cafe ${branch.name}`}</Link>)}</nav></section>
      <section className="gather section"><div><p className="eyebrow">{t('GOOD COMPANY, GREAT TASTE')}</p><Rich as="h2">{t('A table full of<br><em>golden favorites.</em>')}</Rich><Rich as="p">{t('Classic churros, little loops, waffles, pancakes, and coffee made for sharing.<br>Find the combination that makes your moment sweeter.')}</Rich><Link className="button" href={prefix(lang, '/menu/')}>{t('Explore the full menu')} <ArrowIcon /></Link></div><div className="gather-image"><SiteImage src="/assets/campaign-coffee-treats.png" width={2048} height={2048} loading="lazy" alt="Churros Cafe latte and wrapped treats on a warm peach background" /><span>{t('BETTER TOGETHER. ALWAYS.')}</span></div></section>
      <section className="newsletter section"><div className="newsletter-star" aria-hidden="true"><SparkIcon /></div><div><p className="eyebrow">{t('FIND YOUR NEXT FAVORITE')}</p><Rich as="h2">{t('Fifty-three reasons<br><em>to treat yourself.</em>')}</Rich><p>{t('From warm churros and Belgian waffles to matcha, milkshakes, and coffee—there is always something worth coming back for.')}</p></div><Link className="button" href={prefix(lang, '/menu/')}>{t('See every menu item')} <ArrowIcon /></Link></section>
    </main>
  );
}

function MenuPage({ lang, t, openProduct }) {
  return <main id="main"><PageHeading lang={lang} t={t} kicker="THE CHURROS CAFE MENU" title="Churros Cafe<br><em>Menu.</em>" description="See every current product and price, then filter by the category you are craving." /><section className="page-body"><ProductGrid lang={lang} full filtersVisible /><p className="template-note">{t('Prices are shown in QAR. Descriptions and options appear only where they exist in the supplied menu.')}</p></section></main>;
}


function MenuCategoryPage({ lang, t, openProduct, categorySlug }) {
  const category = categoryBySlug[categorySlug];
  
  if (!category) return null;
  const related = relatedCategories[category.slug].map(slug => categoryBySlug[slug]);
  return <main id="main">
    
    <PageHeading lang={lang} t={t} kicker={lang === 'ar' ? categoryCopy[categorySlug][1] : category.label} title={lang === 'ar' ? `${categoryCopy[categorySlug][1]}<br><em>في تشوروز كافيه</em>` : `${category.label}<br><em>at Churros Cafe.</em>`} description={categoryCopy[categorySlug][lang === 'ar' ? 2 : 0]} parent={{ href: '/menu/', label: 'Full menu' }} />
    <section className="page-body category-landing">
      <ProductGrid lang={lang} full fixedCategory={categorySlug} />
      <div className="category-conversion">
        <div><p className="eyebrow">{t('VISIT CHURROS CAFE')}</p><h2>{t('Find your nearest café.')}</h2><p>{t('Choose from four Churros Cafe branches across Qatar.')}</p></div>
        <Link className="button" href={prefix(lang, '/locations/')}>{t('Find nearest café')} <ArrowIcon /></Link>
      </div>
      <nav className="related-categories" aria-label={t('Related menu categories')}>
        <h2>{t('Explore more of the menu')}</h2>
        <div>{related.map(item => <Link key={item.slug} className="link" href={prefix(lang, `/menu/${item.slug}/`)}>{t(item.label)} <ArrowIcon /></Link>)}</div>
        <Link className="link" href={prefix(lang, '/menu/')}>{t('View the full menu')} <ArrowIcon /></Link>
      </nav>
    </section>
  </main>;
}

function LocationsPage({ lang, t }) {
  
  const branches = CHURROS_CAFE.branches;
  return <main id="main"><PageHeading lang={lang} t={t} kicker="OUR LOCATIONS" title="Find your nearest<br><em>Churros Cafe.</em>" description="Four real branches across Qatar, each serving the churros, desserts, and drinks you love." /><section className="page-body"><label htmlFor="branch-search">{t('Find a branch')}</label><p role="status" className="template-note">{branches.length ? (lang === 'ar' ? `${branches.length} فروع` : `${branches.length} branches`) : (lang === 'ar' ? 'لا توجد فروع مطابقة.' : 'No branches match your search.')}</p><div className="branch-grid branch-directory">{branches.map(branch => <article className="branch-card" key={branch.id}><div><p className="eyebrow">{t('BRANCH')} {branch.number}</p><h2>{lang === 'ar' ? branch.ar : branch.name}</h2><p>{branch.locationLabel}</p><BranchPhone branch={branch} lang={lang} /><p>{t(branch.intro)}</p><div className="branch-actions"><Link className="link" href={prefix(lang, `/locations/${branch.id}/`)}>{t('View branch and map')} <ArrowIcon /></Link><a className="link" href={branch.mapUrl} target="_blank" rel="noreferrer">{t('Open in Google Maps')} <ArrowIcon /></a></div></div></article>)}</div></section></main>;
}

function LocationPage({ lang, t, branchId, openProduct }) {
  const branch = CHURROS_CAFE.branches.find(item => item.id === branchId);
  if (!branch) return null;
  const displayName = lang === 'ar' ? branch.ar : branch.name;
  const title = `${displayName}<br><em>Churros Cafe.</em>`;
  return <main id="main"><PageHeading lang={lang} t={t} kicker={`${t('BRANCH')} ${branch.number}`} title={title} description={branch.intro} parent={{ href: '/locations/', label: 'Find your café' }} /><section className="page-body"><SiteImage className="location-cover" src={`/assets/${branch.image}`} width={1600} height={900} alt={`${branch.name} Churros Cafe branch`} /><div className="info-grid location-detail-grid"><article className="info-panel location-address"><p className="eyebrow">{t('VISIT THIS BRANCH')}</p><h2>{displayName}</h2><p>{t(branch.intro)}</p><p><strong>{t('Location')}</strong><br />{branch.locationLabel}</p><BranchPhone branch={branch} lang={lang} /><a className="button" href={branch.mapUrl} target="_blank" rel="noreferrer">{t('Get directions')} <ArrowIcon /></a></article><div className="map-preview"><iframe title={`${branch.name} map`} src={branch.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div></div><div className="section-top" style={{ marginTop: 55 }}><div><p className="eyebrow">{t('SOMETHING LOVELY AWAITS')}</p><Rich as="h2">{t('Pick your <em>moment.</em>')}</Rich></div><Link href={prefix(lang, '/menu/')} className="link">{t('Explore the full menu')} <ArrowIcon /></Link></div><ProductGrid lang={lang} /><div className="info-panel" style={{ marginTop: 30 }}><h3>{t('Discover another branch.')}</h3>{CHURROS_CAFE.branches.filter(item => item.id !== branch.id).map(item => <Link key={item.id} className="link" style={{ marginInlineEnd: 25 }} href={prefix(lang, `/locations/${item.id}/`)}>{lang === 'ar' ? item.ar : item.name} <ArrowIcon /></Link>)}</div></section></main>;
}

function StandardPage({ page, lang, t }) {
  if (page === 'about') return <main id="main"><PageHeading lang={lang} t={t} kicker="THE CHURROS CAFE STORY" title="Small rituals.<br><em>Lasting feelings.</em>" description="A little coffee, a little cinnamon, and a place to make yourself at home." /><section className="story section"><div className="story-photo"><SiteImage src="/assets/campaign-coffee-splash.png" width={2048} height={2048} alt="Churros Cafe iced specialty coffee surrounded by a dramatic coffee splash and ice" loading="lazy" /></div><div className="story-copy"><p className="eyebrow">{t('A NOTE FROM THE CONCEPT')}</p><Rich as="h2">{t('Life happens.<br><em>Pause here.</em>')}</Rich><p className="lead">{t('Churros Cafe is a warm pause in a busy day.')}</p><p>{t('We believe there is something lovely in the ordinary: a shared plate, a familiar greeting, a cup made with care. Our café brings coffee and churros together around that feeling.')}</p><Link href={prefix(lang, '/menu/')} className="link">{t('Find your little ritual')} <ArrowIcon /></Link></div></section></main>;
  if (page === 'reservations') return <main id="main"><PageHeading lang={lang} t={t} kicker="PLAN A VISIT" title="Make time for<br><em>your people.</em>" description="Choose a café concept and find the setting for your next visit." /><section className="page-body"><Link className="button" href={prefix(lang, '/locations/')}>{t('Plan a visit')} <ArrowIcon /></Link></section></main>;
  if (page === 'offers') return <main id="main"><PageHeading lang={lang} t={t} kicker="WINTER MENU MOMENTS" title="Cold days.<br><em>Warmer cravings.</em>" description="Winter makes every cinnamon-dusted churro taste a little more comforting—and every cup of coffee feel like the perfect companion." /><section className="page-body"><div className="info-grid"><article className="info-panel"><p className="eyebrow">{t('WARM, CRISP, MADE TO DIP')}</p><h2>{t('Churros taste better in winter.')}</h2><p>{t('That first crisp bite, the soft center, and a warm ribbon of chocolate feel made for cooler evenings. Choose Classic Churros, Mini Loops, or Wonder Churros, then add your favorite sauces.')}</p></article><article className="info-panel"><p className="eyebrow">{t('YOUR WINTER PAIRING')}</p><h2>{t('Something warm. Something golden.')}</h2><p>{t('Pair a fresh batch with a Spanish Latte, rich Hot Chocolate, or Arabic Qahwa. For an extra-sweet table, add Mini Pancakes, Waffle Triple, or the Celebration Box.')}</p><Link className="link" href={prefix(lang, '/menu/')}>{t('Build your winter order')} <ArrowIcon /></Link></article></div></section></main>;
  if (page === 'stories') return <main id="main"><PageHeading lang={lang} t={t} kicker="THE CHURROS CAFE JOURNAL" title="The long road<br>to <em>something golden.</em>" description="From the debated beginnings of churros to the waffles, pancakes, crepes, and coffee that now share the table." /><section className="page-body"><article className="info-panel prose"><p className="eyebrow">{t('A BRIEF HISTORY OF CHURROS')}</p><h2>{t('Where did churros begin?')}</h2><p>{t('The honest answer is that their exact origin is still debated. One familiar theory connects them to youtiao, a Chinese fried dough that Portuguese travelers may have encountered and adapted. Food historians also point to older Iberian and Mediterranean traditions of fried, scalded dough, which means the story is likely more complex than one neat invention.')}</p><p>{t('What is clear is that Spain helped shape the ridged, freshly fried churro tradition we recognize today. Churros became part of the breakfast and café ritual—especially beside thick hot chocolate—before traveling widely through Spanish- and Portuguese-speaking communities, where local tastes gave them new shapes, fillings, and finishes.')}</p></article><div className="info-grid"><article className="info-panel"><p className="eyebrow">{t('THE CHURROS CAFE TABLE')}</p><h2>{t('A classic that keeps evolving.')}</h2><p>{t('Our menu follows that spirit with Classic Churros, cinnamon-sugar Mini Churros, sauce-topped Mega Loops, filled Wonder Churros, and sharing boxes built for trying a little of everything.')}</p><Link className="link" href={prefix(lang, '/menu/')}>{t('Explore every churro')} <ArrowIcon /></Link></article><article className="info-panel"><p className="eyebrow">{t('BEYOND THE CHURRO')}</p><h2>{t('More ways to make dessert a moment.')}</h2><p>{t('Belgian-style waffles bring crisp edges and tender centers. Mini pancakes arrive soft and fluffy, while French crepes make a delicate canvas for chocolate, pistachio kunafa, fruit, and ice cream. Puffy Donuts, Vanilla Softy, and rich milkshakes complete the sweet side of the menu.')}</p><Link className="link" href={prefix(lang, '/menu/')}>{t('Discover desserts and drinks')} <ArrowIcon /></Link></article></div><p className="source-note">{t('History note: the origin of churros remains disputed; this overview reflects food-history reporting rather than claiming one definitive inventor.')}</p></section></main>;
  if (page === 'privacy') return <main id="main"><PageHeading lang={lang} t={t} kicker="PRIVACY POLICY" title="Your privacy,<br><em>with care.</em>" description="How this website handles browsing data and third-party map services." /><section className="page-body prose"><p>{t('The Churros Cafe website provides information about our menu and branches. It does not currently collect personal information through contact, reservation, or newsletter forms.')}</p><p>{t('No analytics or advertising cookies are currently set by this website. Fonts and images are hosted locally.')}</p><p>{t('Branch pages include embedded Google Maps. Opening those pages may allow Google to receive technical connection information according to Google’s own privacy terms.')}</p><p>{t('This policy will be updated if the website introduces analytics, forms, online ordering, or other services that collect personal information.')}</p></section></main>;
  if (page === 'closed-location') return <main id="main"><PageHeading lang={lang} t={t} kicker="PERMANENTLY CLOSED" title="Churros Cafe Mall of Qatar<br><em>Branch</em>" description={lang === 'ar' ? 'تم إغلاق فرع تشوروز كافيه في قطر مول بشكل دائم. اعثر على أقرب فرع لك.' : 'The Churros Cafe location at Mall of Qatar is permanently closed.'} /><section className="page-body"><div className="info-grid"><article className="info-panel"><p className="eyebrow">{t('VISIT CHURROS CAFE')}</p><h2>{t('Find your nearest café.')}</h2><p>{t('Choose from four Churros Cafe branches across Qatar.')}</p><Link className="button" href={prefix(lang, '/locations/')}>{t('Find nearest café')} <ArrowIcon /></Link></article></div></section></main>;
  return null;
}


export default function CafeSite({ lang = 'en', page, branchId = '', categorySlug = '', currentPath = '' }) {
  const t = text => lang === 'ar' ? translations[text] || text : text;

  const openProduct = () => {};

  let content;
  if (page === 'home') content = <HomePage lang={lang} t={t} />;
  else if (page === 'menu') content = <MenuPage lang={lang} t={t} />;
  else if (page === 'menu-category') content = <MenuCategoryPage lang={lang} t={t} categorySlug={categorySlug} />;
  else if (page === 'locations') content = <LocationsPage lang={lang} t={t} />;
  else if (page === 'location') content = <LocationPage lang={lang} t={t} branchId={branchId} />;
  else if (page === 'closed-location') content = <StandardPage page={page} lang={lang} t={t} />;
  else content = <StandardPage page={page} lang={lang} t={t} />;

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang}>
      {content}
      <SiteDialog lang={lang} />
    </div>
  );
}
