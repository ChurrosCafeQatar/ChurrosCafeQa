import { CHURROS_CAFE } from '../data/content';
import { MENU_CATEGORIES } from '../data/menu';

export default function sitemap() {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
  const staticRoutes = ['', '/menu', '/locations', '/about', '/reservations', '/offers', '/stories', '/privacy'];
  const categoryRoutes = MENU_CATEGORIES.map(category => `/menu/${category.slug}`);
  const locationRoutes = CHURROS_CAFE.branches.map(branch => `/locations/${branch.id}`);
  return [...staticRoutes, ...categoryRoutes, ...locationRoutes].flatMap(route => [
    { url: `${baseUrl}${route || '/'}`, changeFrequency: route.startsWith('/menu') ? 'weekly' : 'monthly', priority: route === '' ? 1 : route === '/menu' ? 0.9 : 0.7 },
    { url: `${baseUrl}/ar${route || '/'}`, changeFrequency: route.startsWith('/menu') ? 'weekly' : 'monthly', priority: route === '' ? 0.8 : 0.6 }
  ]);
}
