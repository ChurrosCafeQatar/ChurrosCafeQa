import { absoluteUrl, SITE_URL } from '../data/site';

export default function SchemaMarkup({
  type,
  branch,
  branches,
  categories,
  menuByCategory,
  categorySlug,
  lang = 'en'
}: any) {
  const schemas: any[] = [];

  // Home Organization and Website Schema
  if (type === 'home') {
    schemas.push({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: 'Churros Cafe',
          alternateName: ['Churros Cafe Qatar', 'churroscafeqa.com'],
          url: absoluteUrl('/'),
          description: 'Churros Cafe serves Spanish churros, desserts, matcha, milkshakes, and coffee across four branches in Qatar.',
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
          sameAs: ['https://www.instagram.com/churroscafe.qa'],
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
      ]
    });
  }

  // Specific location schema
  if (type === 'location' && branch) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': ['CafeOrCoffeeShop', 'FoodEstablishment', 'LocalBusiness'],
      '@id': `${absoluteUrl(`/locations/${branch.id}/`)}#business`,
      name: `Churros Cafe ${branch.name}`,
      url: absoluteUrl(`/locations/${branch.id}/`),
      image: absoluteUrl(`/assets/${branch.image}`),
      description: branch.intro,
      address: {
        '@type': 'PostalAddress',
        streetAddress: branch.locationLabel,
        addressLocality: branch.name === 'Lusail' ? 'Lusail' : 'Doha',
        addressCountry: 'QA'
      },
      hasMap: branch.mapUrl,
      ...(branch.phone ? { telephone: branch.phone } : {}),
      hasMenu: { '@id': `${SITE_URL}/menu/#menu` },
      parentOrganization: { '@id': `${SITE_URL}/#organization`, name: 'Churros Cafe', url: absoluteUrl('/') }
    });
  }

  // All branches location list schema
  if (type === 'locations' && branches) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Churros Cafe locations in Qatar',
      numberOfItems: branches.length,
      itemListElement: branches.map((b: any, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'CafeOrCoffeeShop',
          '@id': `${absoluteUrl(`/locations/${b.id}/`)}#business`,
          name: `Churros Cafe ${b.name}`,
          url: absoluteUrl(`/locations/${b.id}/`),
          address: {
            '@type': 'PostalAddress',
            streetAddress: b.locationLabel,
            addressLocality: b.name === 'Lusail' ? 'Lusail' : 'Doha',
            addressCountry: 'QA'
          },
          ...(b.phone ? { telephone: b.phone } : {}),
        },
      })),
    });
  }

  // Global or Category-specific Menu schema (without transactional ecommerce data)
  if (type === 'menu' && categories && menuByCategory) {
    const cats = categorySlug ? categories.filter((c: any) => c.slug === categorySlug) : categories;
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Menu',
      '@id': `${SITE_URL}/menu/#menu`,
      name: categorySlug ? `Churros Cafe ${cats[0]?.label} Menu` : 'Churros Cafe Menu',
      url: absoluteUrl('/menu/'),
      inLanguage: lang,
      hasMenuSection: cats.map((category: any) => ({
        '@type': 'MenuSection',
        name: category.label,
        hasMenuItem: menuByCategory[category.slug]?.map((item: any) => ({
          '@type': 'MenuItem',
          name: item.displayName,
          ...(item.description ? { description: item.description } : {}),
          ...(item.imageExists && item.image ? { image: absoluteUrl(`/assets/${item.image}`) } : {})
        })) || []
      }))
    });
  }

  if (schemas.length === 0) return null;

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
        />
      ))}
    </>
  );
}
