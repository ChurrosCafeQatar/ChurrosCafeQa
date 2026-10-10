import type { MetadataRoute } from "next";
import { CHURROS_CAFE } from "../data/content";
import { MENU_CATEGORIES } from "../data/menu";
import { SITE_URL } from "../data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/menu", "/locations", "/about", "/reservations", "/offers", "/stories", "/privacy"];
  
  // The existing setup uses trailing slashes (e.g. /menu/), but let's look at Next.js default behavior.
  // Next.js App Router usually prefers no trailing slash unless configured.
  // Wait, the previous sitemap.js had `route || '/'` and `/menu/` etc. Let me maintain the URL format that was there.
  
  const categoryRoutes = MENU_CATEGORIES.map(category => `/menu/${category.slug}`);
  const locationRoutes = [...CHURROS_CAFE.branches.map(branch => `/locations/${branch.id}`), "/locations/mall-of-qatar"];
  
  return [...staticRoutes, ...categoryRoutes, ...locationRoutes].flatMap(route => {
    // Append trailing slash to match original structure, except for the root route.
    // Wait, the previous implementation did `/menu/` etc.
    const path = route === "" ? "/" : `${route}/`;
    
    const englishUrl = `${SITE_URL}${path}`;
    const arabicUrl = `${SITE_URL}/ar${path}`;
    
    const alternates = { languages: { en: englishUrl, ar: arabicUrl, 'x-default': englishUrl } };
    
    return [
      { url: englishUrl, alternates },
      { url: arabicUrl, alternates }
    ];
  });
}
