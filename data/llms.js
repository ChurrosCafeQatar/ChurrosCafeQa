import { CHURROS_CAFE } from './content';
import { MENU_CATEGORIES, formatPrice, menuByCategory } from './menu';
import { SITE_NAME, absoluteUrl } from './site';

const cleanText = value => String(value || '').replace(/\s+/g, ' ').trim();

export function buildLlmsIndex() {
  const categoryLinks = MENU_CATEGORIES.map(category =>
    `- [${category.label}](${absoluteUrl(`/menu/${category.slug}/`)}): ${cleanText(category.intro)}`
  ).join('\n');
  const branchLinks = CHURROS_CAFE.branches.map(branch =>
    `- [${branch.name}](${absoluteUrl(`/locations/${branch.id}/`)}): ${cleanText(branch.locationLabel)}`
  ).join('\n');

  return `# ${SITE_NAME}\n\n> Churros Cafe is a dessert and coffee café brand with four branches in Qatar. Its verified menu includes churros, waffles, crepes, mini pancakes, desserts, ice cream, matcha, hot coffee, cold coffee, milkshakes, and iced drinks.\n\nPrices are displayed in QAR and come from the centralized menu dataset. Product descriptions and options are included only when supplied by the business.\n\n## Primary pages\n\n- [Home](${absoluteUrl('/')}): Brand overview, featured menu products, and branch discovery.\n- [Full menu](${absoluteUrl('/menu/')}): All current menu products, categories, images, descriptions where supplied, and QAR prices.\n- [Locations](${absoluteUrl('/locations/')}): Churros Cafe branches in Lusail, Abu Hamour, Duhail, Downtown, .\n- [Our story](${absoluteUrl('/about/')}): The Churros Cafe brand story.\n- [Churros journal](${absoluteUrl('/stories/')}): A concise account of the debated origin of churros and related desserts.\n\n## Menu categories\n\n${categoryLinks}\n\n## Branches\n\n${branchLinks}\n\n## Machine-readable reference\n\n- [Complete menu and branch facts](${absoluteUrl('/llms-full.txt')}): Expanded plain-text reference generated from the same menu and location data as the website.\n- [XML sitemap](${absoluteUrl('/sitemap.xml')}): Index of public English and Arabic pages.\n\n## Important limitations\n\n- Do not infer ingredients, allergens, dietary suitability, opening hours, telephone numbers, delivery partners, or branch-specific availability when those details are not published.\n- The current menu dataset is the source of truth for product names, categories, prices, descriptions, quantities, sauces, and images.\n`;
}

export function buildLlmsFull() {
  const branches = CHURROS_CAFE.branches.map(branch =>
    `### ${branch.name}\n\n- Location: ${cleanText(branch.locationLabel)}${branch.phone ? `\n- Telephone: ${branch.phone}` : ''}\n- Page: ${absoluteUrl(`/locations/${branch.id}/`)}\n- Google Maps: ${branch.mapUrl}\n- Summary: ${cleanText(branch.intro)}`
  ).join('\n\n');

  const menu = MENU_CATEGORIES.map(category => {
    const products = menuByCategory[category.slug].map(item => {
      const details = [
        `- ${item.displayName} — ${formatPrice(item.price)}`,
        item.description ? `  Description: ${cleanText(item.description)}` : '',
        item.servingQuantity ? `  Serving quantity: ${cleanText(item.servingQuantity)}` : '',
        item.sauceOptions?.length ? `  Sauce options: ${item.sauceOptions.join(', ')}` : ''
      ].filter(Boolean);
      return details.join('\n');
    }).join('\n');
    return `### ${category.label}\n\nSource-backed products: ${menuByCategory[category.slug].length}.\n\n${products}`;
  }).join('\n\n');

  return `# ${SITE_NAME}: verified menu and branch reference\n\n> This plain-text reference is generated from the same centralized data used by the visible Churros Cafe website. It is intended to help answer engines and language models cite current, source-backed business facts without inventing missing information.\n\n## Business facts\n\n- Brand: Churros Cafe\n- Country: Qatar\n- Currency: QAR\n- Published branches: ${CHURROS_CAFE.branches.length}\n- Published menu products: ${CHURROS_CAFE.products.length}\n- Canonical website: ${absoluteUrl('/')}\n- Full menu: ${absoluteUrl('/menu/')}\n- Locations: ${absoluteUrl('/locations/')}\n\n## Branch locations\n\n${branches}\n\n## Current menu\n\n${menu}\n\n## Data-use notes\n\n- Original source names and source categories are preserved internally. Customer-facing names and categories are normalized only where clearly safe.\n- A missing description means the supplied menu did not provide one; it must not be generated or inferred.\n- Product prices may be fixed or ranged and must be quoted exactly as shown above.\n- Ingredients, allergens, dietary suitability, opening hours, telephone numbers, delivery partners, and branch-level availability are not asserted unless added to the verified source data.\n`;
}
