import { notFound } from 'next/navigation';
import CafeSite from '../../components/cafe-site';
import { CHURROS_CAFE, translations } from '../../data/content';
import { MENU_CATEGORIES, categoryBySlug } from '../../data/menu';

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
  home: ['Churros Cafe — Desserts & Coffee', 'Fresh churros, desserts, matcha, milkshakes, and coffee from Churros Cafe in Qatar.'],
  menu: ['Churros Cafe Menu', 'Browse all current Churros Cafe products, categories and QAR prices from the supplied menu.'],
  locations: ['Find your café', 'Find Churros Cafe branches in Lusail, Abu Hamour, Duhail, Downtown, and Mall of Qatar.'],
  about: ['Our story', 'Learn more about the Churros Cafe story.'],
  reservations: ['Plan a visit', 'Plan your visit to Churros Cafe.'],
  offers: ['Winter menu moments', 'Warm churros, comforting coffee, and sweet winter pairings at Churros Cafe.'],
  stories: ['The Churros Cafe journal', 'Explore the debated origins of churros and the desserts that share the Churros Cafe table.'],
  privacy: ['Privacy & cookies', 'Template privacy notice.'],
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
  const [baseTitle, description] = branch
    ? [route.lang === 'ar' ? branch.ar : branch.name, branch.intro]
    : category
      ? [`${category.label} Menu`, category.intro]
      : metadataMap[route.page];
  const title = route.lang === 'ar' ? translations[baseTitle] || baseTitle : baseTitle;
  return {
    title: route.page === 'home' ? { absolute: title } : title,
    description,
    openGraph: { title, description, type: 'website' },
  };
}

export default async function CatchAllPage({ params }) {
  const { slug = [] } = await params;
  const route = resolveRoute(slug);
  if (!route) notFound();
  return <CafeSite {...route} />;
}
