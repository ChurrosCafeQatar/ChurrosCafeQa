import Link from 'next/link';
import { MENU_CATEGORIES, menuByCategory } from '../../data/menu';
import { SparkIcon, ArrowIcon } from '../../components/icons';
import SchemaMarkup from '../../components/SchemaMarkup';
import { ProductCard, SiteDialog } from '../../components/cafe-interactive';
import SiteImage from '../../components/site-image';

export const metadata = {
  title: 'Churros Cafe Menu Qatar | Desserts, Coffee & Churros',
  description: 'Explore Churros Cafe\'s menu of freshly prepared churros, shareable dessert boxes, sweet bites, and refreshing drinks across our Qatar locations.',
};

export default function MenuPage() {
  const lang = 'en';

  return (
    <>
      <SchemaMarkup type="menu" categories={MENU_CATEGORIES} menuByCategory={menuByCategory} lang={lang} />
      <main id="main" className="menu-page">
      <div className="page-heading">
        <p className="eyebrow"><span className="tiny-sun"><SparkIcon /></span> THE CHURROS CAFE MENU</p>
        <h1>Churros Cafe<br/><em>Menu.</em></h1>
        <p className="lead">Explore Churros Cafe's menu of freshly prepared churros, shareable boxes, sweet bites and refreshing drinks across our Qatar locations.</p>
        <div style={{ marginTop: '24px' }}>
          <Link href="/locations/" className="button">Find nearest cafAc <ArrowIcon /></Link>
        </div>
      </div>

      {/* Lightweight anchor navigation */}
      <div className="page-body">

        <nav className="menu-controls sticky menu-glass-nav" aria-label="Menu categories">
          <Link href="/" className="menu-nav-logo" aria-label="Churros Cafe - Home">
            <SiteImage src="/assets/churros_logo.webp" width={181} height={130} alt="Churros Cafe" />
          </Link>
          <div className="filters">
            {MENU_CATEGORIES.map(category => {
              const items = menuByCategory[category.slug];
              const firstItem = items && items.length > 0 ? items.find((item: any) => item.imageExists !== false && item.image) || items[0] : null;
              const imageSrc = firstItem && firstItem.image ? `/assets/${firstItem.image}` : '/assets/menu/Classic Churros.webp';
              
              return (
                <a key={category.slug} href={`#${category.slug}`} className="filter" style={{ textDecoration: 'none' }}>
                  <span className="filter-image">
                    <SiteImage src={imageSrc} width={100} height={100} alt="" aria-hidden="true" />
                  </span>
                  <span>{category.label}</span>
                </a>
              );
            })}
          </div>
        </nav>
        {MENU_CATEGORIES.map(category => {
          const items = menuByCategory[category.slug];
          if (!items || items.length === 0) return null;

          return (
            <section key={category.slug} id={category.slug} className="menu-section">
              <div className="section-header">
                <h2>{category.label}</h2>
                {category.intro && <p>{category.intro}</p>}
              </div>

              <div className="products-grid product-grid">
                {items.map((item: any) => (
                  <ProductCard key={item.id} product={item} lang={lang} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
    <SiteDialog lang={lang} />
    </>
  );
}
