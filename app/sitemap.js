import { CHURROS_CAFE } from '../data/content';
import { MENU_CATEGORIES } from '../data/menu';
import { SITE_URL } from '../data/site';

export default function sitemap() {
  const staticRoutes = ['', '/menu/', '/locations/', '/about/', '/reservations/', '/offers/', '/stories/', '/privacy/'];
  const categoryRoutes = MENU_CATEGORIES.map(category => `/menu/${category.slug}/`);
  const locationRoutes = CHURROS_CAFE.branches.map(branch => `/locations/${branch.id}/`);
  return [...staticRoutes, ...categoryRoutes, ...locationRoutes].flatMap(route => {
    const englishUrl = `${SITE_URL}${route || '/'}`;
    const arabicUrl = `${SITE_URL}/ar${route || '/'}`;
    const alternates = { languages: { en: englishUrl, ar: arabicUrl, 'x-default': englishUrl } };
    return [
      { url: englishUrl, alternates, changeFrequency: route.startsWith('/menu') ? 'weekly' : 'monthly', priority: route === '' ? 1 : route === '/menu/' ? 0.9 : 0.7 },
      { url: arabicUrl, alternates, changeFrequency: route.startsWith('/menu') ? 'weekly' : 'monthly', priority: route === '' ? 0.8 : 0.6 }
    ];
  });
}
