import sourceRows from './menu-source.json';
import assetStatus from './menu-asset-status.json';

export const MENU_SOURCE = {
  expectedWorkbook: 'menu_churro.xlsx',
  currentSnapshot: 'data/menu-source.json',
  note: 'Snapshot transcribed from the supplied menu dataset. Re-run npm run menu:import when the workbook is available.'
};

export const MENU_CATEGORIES = [
  { slug: 'churros', label: 'Churros', intro: 'Explore the current Churros Cafe churros menu, with real products and prices from the supplied menu.' },
  { slug: 'waffles', label: 'Waffles', intro: 'Belgian waffle products currently listed on the Churros Cafe menu.' },
  { slug: 'crepes', label: 'Crepes', intro: 'Crepes currently available on the Churros Cafe menu, including the Dubai Chocolate Crepe.' },
  { slug: 'pancakes', label: 'Pancakes', intro: 'Mini pancakes from the current Churros Cafe menu.' },
  { slug: 'desserts', label: 'Desserts', intro: 'Dessert boxes, puffy donuts and strawberry chocolate from the current menu.' },
  { slug: 'ice-cream', label: 'Ice Cream', intro: 'Ice cream products currently listed on the Churros Cafe menu.' },
  { slug: 'matcha', label: 'Matcha', intro: 'Matcha lattes, frappe and current matcha specials from the supplied menu.' },
  { slug: 'hot-coffee', label: 'Hot Coffee', intro: 'Hot coffee and chocolate drinks from the current Churros Cafe menu.' },
  { slug: 'iced-coffee', label: 'Cold Coffee', intro: 'Cold brew, iced coffee, frappes and shaken espresso from the current menu.' },
  { slug: 'milkshakes', label: 'Milkshakes', intro: 'The milkshake flavours currently listed on the Churros Cafe menu.' },
  { slug: 'iced-drinks', label: 'Iced Drinks', intro: 'Mojitos, iced teas, lemonade and other non-coffee iced drinks from the current menu.' }
];

const DISPLAY_NAMES = {
  '24 hour - Cold brew': '24 Hour Cold Brew',
  Flatwhite: 'Flat White',
  'Iced v60': 'Iced V60',
  'NewYork Cheesecake': 'New York Cheesecake',
  'Pour me Choco spanish': 'Pour Me Choco Spanish',
  'Pour me matcha - rasberry': 'Pour Me Matcha - Raspberry',
  'Rasberry  Hibiscus': 'Raspberry Hibiscus',
  'Signature Icecream  crepe': 'Signature Ice Cream Crepe',
  'Strawberry Choclate': 'Strawberry Chocolate'
};

const DISPLAY_CATEGORY_OVERRIDES = {
  'Mini Waffle': 'waffles',
  'Waffle Triple': 'waffles',
  'Mini Crepe': 'crepes',
  'Dubai Chocolate Crepe': 'crepes',
  'Signature Icecream  crepe': 'crepes',
  'Mini Pancake': 'pancakes',
  'Hola Box': 'desserts',
  'Puffy Donut': 'desserts',
  'Strawberry Choclate': 'desserts'
};

const SOURCE_CATEGORY_TO_DISPLAY = {
  Churros: 'churros',
  ICECREAM: 'ice-cream',
  Matcha: 'matcha',
  'HOT COFFEE': 'hot-coffee',
  'COLD COFFEE': 'iced-coffee',
  MILKSHAKES: 'milkshakes',
  ICED: 'iced-drinks',
  DESSERT: 'desserts'
};

const PRODUCT_OPTIONS = {
  'Classic Churros': { servingQuantity: '5 pieces', sauceOptions: ['Nutella', 'Kinder', 'Pistachio', 'Lotus', 'Caramel'] },
  'Mini Churros': { servingQuantity: '15 pieces', sauceOptions: ['Nutella', 'Kinder', 'Pistachio', 'Lotus', 'Caramel'] },
  'Wonder Churros': { servingQuantity: '5 pieces', sauceOptions: ['Nutella', 'Kinder', 'Pistachio', 'Lotus', 'Caramel'] },
  'Mini Loops': { servingQuantity: '5 pieces' },
  'Mixed Churros': { servingQuantity: '16 pieces' },
  'Mini Pancake': { servingQuantity: '10 pieces', sauceOptions: ['Nutella', 'Kinder', 'Pistachio', 'Lotus', 'Caramel', 'White Chocolate'] },
  'Mini Waffle': { servingQuantity: '10 pieces', sauceOptions: ['Nutella', 'Kinder', 'Pistachio', 'Lotus', 'Caramel', 'White Chocolate'] },
  'Waffle Triple': { sauceOptions: ['Nutella', 'Kinder', 'Pistachio', 'Lotus', 'Caramel', 'White Chocolate'] },
  'Puffy Donut': { servingQuantity: '6 pieces', sauceOptions: ['Pistachio', 'Kinder', 'Nutella', 'Caramel', 'Lotus'] }
};

const ARABIC_NAMES = {
  'Classic Churros': 'تشوروز كلاسيكي', 'Mini Churros': 'ميني تشوروز', 'Wonder Churros': 'وندر تشوروز',
  'Cafe Latte': 'كافيه لاتيه', 'Matcha Latte': 'ماتشا لاتيه', 'Iced Latte': 'آيسد لاتيه',
  'Iced Spanish Latte': 'آيسد سبانيش لاتيه', 'Spanish Latte': 'سبانيش لاتيه',
  Americano: 'أمريكانو', Espresso: 'إسبريسو', Cappuccino: 'كابتشينو', 'Arabic Qahwa': 'قهوة عربية'
};

export function slugify(value) {
  return value.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function parsePrice(rawPrice) {
  const numbers = [...rawPrice.matchAll(/(\d+(?:\.\d+)?)/g)].map(match => Number(match[1]));
  if (numbers.length === 1) return { type: 'fixed', amount: numbers[0], currency: 'QAR' };
  if (numbers.length === 2) return { type: 'range', min: numbers[0], max: numbers[1], currency: 'QAR' };
  return undefined;
}

export function formatPrice(price) {
  if (!price) return '';
  if (price.type === 'range') return `${price.currency} ${price.min.toFixed(2)} – ${price.currency} ${price.max.toFixed(2)}`;
  return `${price.currency} ${price.amount.toFixed(2)}`;
}

export const menuItems = sourceRows.map(row => {
  const displayCategory = DISPLAY_CATEGORY_OVERRIDES[row.sourceName] || SOURCE_CATEGORY_TO_DISPLAY[row.sourceCategory];
  const displayName = DISPLAY_NAMES[row.sourceName] || row.sourceName;
  return {
    id: slugify(row.sourceName),
    sourceName: row.sourceName,
    displayName,
    ar: ARABIC_NAMES[row.sourceName] || displayName,
    slug: slugify(displayName),
    sourceCategory: row.sourceCategory,
    displayCategory,
    description: row.description || undefined,
    price: parsePrice(row.price),
    sourcePrice: row.price,
    image: row.image ? `menu/${row.image}` : undefined,
    sourceImage: row.image || undefined,
    imageExists: row.image ? assetStatus[row.image] !== false : false,
    imageAlt: displayName,
    ...PRODUCT_OPTIONS[row.sourceName],
    tags: [],
    seo: { indexableProductPage: false }
  };
});

export const menuByCategory = Object.fromEntries(
  MENU_CATEGORIES.map(category => [category.slug, menuItems.filter(item => item.displayCategory === category.slug)])
);

export const categoryBySlug = Object.fromEntries(MENU_CATEGORIES.map(category => [category.slug, category]));

export function getMenuSearchText(item) {
  return [item.displayName, item.sourceName, item.ar, item.displayCategory, item.sourceCategory, item.description, ...(item.tags || [])]
    .filter(Boolean).join(' ').toLowerCase();
}
