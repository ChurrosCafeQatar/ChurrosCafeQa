import { notFound } from 'next/navigation';
import CafeSite from '../../components/cafe-site';
import { CHURROS_CAFE, translations } from '../../data/content';
import { MENU_CATEGORIES, categoryBySlug } from '../../data/menu';
import { SITE_URL, absoluteUrl } from '../../data/site';
import { arabicPages, categoryCopy } from '../../data/seo';

const standardPages = new Set(['menu', 'locations', 'about', 'reservations', 'offers', 'stories', 'privacy']);

function resolveRoute(rawSlug = []) {
  const slug = [...rawSlug];
  const lang = slug[0] === 'ar' ? 'ar' : 'en';
  if (lang === 'ar') slug.shift();
  if (!slug.length) return { lang, page: 'home', branchId: '', currentPath: '' };
  if (slug[0] === 'menu' && slug.length === 2 && categoryBySlug[slug[1]]) {
    return { lang, page: 'menu-category', branchId: '', categorySlug: slug[1], currentPath: `menu/${slug[1]}/` };
  }
  if (slug[0] === 'locations' && slug.length === 2 && CHURROS_CAFE.branches.some(branch => branch.id === slug[1])) {
    return { lang, page: 'location', branchId: slug[1], currentPath: `locations/${slug[1]}/` };
  }
  if (slug.length === 1 && standardPages.has(slug[0])) {
    return { lang, page: slug[0], branchId: '', currentPath: `${slug[0]}/` };
  }
  return null;
}

const metadataMap = {
  home: ['Churros Cafe Qatar | Churros, Desserts & Coffee', 'Visit Churros Cafe in Qatar for fresh Spanish churros, desserts, waffles, crepes, matcha, milkshakes, and hot or iced coffee.'],
  menu: ['Menu: Churros, Desserts & Coffee', 'Explore the current Churros Cafe menu with product photography, descriptions, categories, and prices in QAR.'],
  locations: ['Locations in Qatar', 'Find Churros Cafe branches in Lusail, Abu Hamour, Duhail, Downtown, and Mall of Qatar.'],
  about: ['About Us', 'Discover the story and everyday café experience behind Churros Cafe in Qatar.'],
  reservations: ['Plan a visit', 'Plan your visit to Churros Cafe.'],
  offers: ['Winter Menu', 'Warm churros, comforting coffee, and sweet winter pairings at Churros Cafe in Qatar.'],
  stories: ['Churros Stories & Origins', 'Explore the debated origins of churros and the desserts that share the Churros Cafe table.'],
  privacy: ['Privacy Policy', 'Learn how the Churros Cafe website handles browsing data, embedded maps, and cookies.'],
};

export function generateStaticParams() {
  const routes = [[], ...[...standardPages].map(page => [page]), ...MENU_CATEGORIES.map(category => ['menu', category.slug]), ...CHURROS_CAFE.branches.map(branch => ['locations', branch.id])];
  return routes.flatMap(slug => [{ slug }, { slug: ['ar', ...slug] }]);
}

export async function generateMetadata({ params }) {
  const { slug = [] } = await params;
  const route = resolveRoute(slug);
  if (!route) return {};
  const branch = route.page === 'location' ? CHURROS_CAFE.branches.find(item => item.id === route.branchId) : null;
  const category = route.page === 'menu-category' ? categoryBySlug[route.categorySlug] : null;
  let [baseTitle, description] = branch
    ? [route.lang === 'ar' ? branch.ar : branch.name, branch.intro]
    : category
      ? [`${category.label} Menu`, category.intro]
      : metadataMap[route.page];
  if (category) description = categoryCopy[category.slug][route.lang === 'ar' ? 2 : 0];
  if (route.lang === 'ar') {
    if (branch) {
      baseTitle = `فرع ${branch.ar}`;
      description = `اعثر على فرع تشوروز كافيه في ${branch.ar}، وتصفح موقعه على الخريطة وقائمة الحلويات والمشروبات قبل زيارتك.`;
    } else if (category) baseTitle = `قائمة ${categoryCopy[category.slug][1]}`;
    else [baseTitle, description] = arabicPages[route.page];
  }
  const title = route.lang === 'ar' ? translations[baseTitle] || baseTitle : baseTitle;
  const fullTitle = route.page === 'home'
    ? title
    : `${title} | ${route.lang === 'ar' ? 'تشوروز كافيه قطر' : 'Churros Cafe Qatar'}`;
  const englishPath = route.currentPath ? `/${route.currentPath}` : '/';
  const arabicPath = `/ar${englishPath}`;
  const canonicalPath = route.lang === 'ar' ? arabicPath : englishPath;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: {
      canonical: canonicalPath,
      languages: { en: englishPath, ar: arabicPath, 'x-default': englishPath },
    },
    openGraph: {
      title: fullTitle,
      description,
      siteName: 'Churros Cafe',
      type: 'website',
      url: canonicalPath,
      locale: route.lang === 'ar' ? 'ar_QA' : 'en_QA',
      alternateLocale: route.lang === 'ar' ? ['en_QA'] : ['ar_QA'],
      images: [{
        url: '/assets/campaign-dessert-spread.png',
        width: 2048,
        height: 2048,
        alt: 'Churros Cafe desserts with chocolate, pistachio, strawberries, and banana',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: ['/assets/campaign-dessert-spread.png'],
    },
  };
}

function PageStructuredData({ route }) {
  let schema;

  if (route.page === 'home') {
    schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: 'Churros Cafe',
          alternateName: ['Churros Cafe Qatar', 'churroscafeqa.com'],
          url: absoluteUrl('/'),
          description: 'Churros Cafe serves Spanish churros, desserts, matcha, milkshakes, and coffee across five branches in Qatar.',
          logo: {
            '@type': 'ImageObject',
            url: absoluteUrl('/assets/churros-icon-512.png'),
            contentUrl: absoluteUrl('/assets/churros-icon-512.png'),
            width: 512,
            height: 512,
          },
          image: absoluteUrl('/assets/campaign-dessert-spread.png'),
          areaServed: { '@type': 'Country', name: 'Qatar' },
          hasMenu: absoluteUrl('/menu/'),
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          name: 'Churros Cafe',
          alternateName: ['Churros Cafe Qatar', 'churroscafeqa.com'],
          url: absoluteUrl('/'),
          inLanguage: ['en', 'ar'],
          publisher: { '@id': `${SITE_URL}/#organization` },
        },
      ],
    };
  } else if (route.page === 'locations') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Churros Cafe locations in Qatar',
      numberOfItems: CHURROS_CAFE.branches.length,
      itemListElement: CHURROS_CAFE.branches.map((branch, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'CafeOrCoffeeShop',
          '@id': `${absoluteUrl(`/locations/${branch.id}/`)}#cafe`,
          name: `Churros Cafe ${branch.name}`,
          url: absoluteUrl(`/locations/${branch.id}/`),
          address: { '@type': 'PostalAddress', streetAddress: branch.locationLabel, addressCountry: 'QA' },
          ...(branch.phone ? { telephone: branch.phone } : {}),
        },
      })),
    };
  } else if (route.page === 'location') {
    const branch = CHURROS_CAFE.branches.find(item => item.id === route.branchId);
    schema = branch && {
      '@context': 'https://schema.org',
      '@type': 'CafeOrCoffeeShop',
      '@id': `${absoluteUrl(`/locations/${branch.id}/`)}#cafe`,
      name: `Churros Cafe ${branch.name}`,
      url: absoluteUrl(`/locations/${branch.id}/`),
      image: absoluteUrl(`/assets/${branch.image}`),
      description: branch.intro,
      address: { '@type': 'PostalAddress', streetAddress: branch.locationLabel, addressCountry: 'QA' },
      hasMap: branch.mapUrl,
      ...(branch.phone ? { telephone: branch.phone } : {}),
      hasMenu: absoluteUrl('/menu/'),
      parentOrganization: { '@id': `${SITE_URL}/#organization`, name: 'Churros Cafe' },
    };
  }

  if (!schema) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />;
}

export default async function CatchAllPage({ params }) {
  const { slug = [] } = await params;
  const route = resolveRoute(slug);
  if (!route) notFound();
  return <><PageStructuredData route={route} /><CafeSite {...route} /></>;
}
