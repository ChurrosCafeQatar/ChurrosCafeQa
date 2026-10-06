// @ts-nocheck
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import SiteImage from './site-image';
import { categoryCopy, relatedCategories } from '../data/seo';
import { analyticsEnabled, track } from '../data/analytics';
import { CHURROS_CAFE, translations } from '../data/content';
import { MENU_CATEGORIES, categoryBySlug, formatPrice, getMenuSearchText, menuByCategory } from '../data/menu';
import { ArrowIcon, BurstIcon, CloseIcon, DownIcon, MenuIcon, SparkIcon } from './icons';

const filters = [
  { value: 'all', label: 'All', heading: 'All' },
  ...MENU_CATEGORIES.map(category => ({ value: category.slug, label: category.label, heading: category.label }))
];
const categoryFilters = filters.filter(filter => filter.value !== 'all');

function prefix(lang, path = '/') {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return lang === 'ar' ? `/ar${clean}` : clean;
}

export function Rich({ as: Tag = 'span', children, ...props }: any) {
  return <Tag {...props} dangerouslySetInnerHTML={{ __html: children }} />;
}

export function SiteDialog({ lang }) {
  const t = text => lang === 'ar' ? translations[text] || text : text;
  const [modal, setModal] = useState<any>(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    const handleModal = (event: any) => {
      if (event?.detail) {
        setModal(event.detail);
      }
    };
    window.addEventListener('churros:modal', handleModal);
    return () => window.removeEventListener('churros:modal', handleModal);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (modal && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    } else if (!modal && dialog.open) {
      dialog.close();
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [modal]);

  const close = () => {
    dialogRef.current?.close();
    document.body.style.overflow = '';
    setModal(null);
  };

  const onBackdrop = event => {
    if (event.target === dialogRef.current) {
      close();
    }
  };

  const product = modal?.type === 'product'
    ? (CHURROS_CAFE.products.find(item => item.id === modal.id) || modal.product)
    : null;

  return (
    <dialog
      ref={dialogRef}
      className="product-modal"
      aria-label={lang === 'ar' ? 'تفاصيل الصنف' : 'Product details'}
      onClose={close}
      onClick={onBackdrop}
    >
      {product && (
        <div className="product-modal-container" onClick={e => e.stopPropagation()}>
          <button className="product-modal-close" aria-label={t('Close dialog')} onClick={close}>
            <CloseIcon />
          </button>

          <div className="product-modal-hero">
            {product.imageExists !== false && product.image ? (
              <SiteImage
                src={`/assets/${product.image}`}
                width={1000}
                height={1000}
                alt={product.imageAlt || product.displayName}
                loading="eager"
              />
            ) : (
              <div className="product-image-placeholder">{t('Image unavailable')}</div>
            )}
            <div className="product-modal-gradient" />
            <div className="product-modal-badges">
              <span className="badge">
                {categoryBySlug[product.displayCategory]?.label || product.sourceCategory}
              </span>
              {product.featured && <span className="badge featured">★ {t('Featured')}</span>}
              {product.bestseller && <span className="badge popular">🔥 {t('Popular')}</span>}
              {product.newItem && <span className="badge new">✨ {t('New')}</span>}
            </div>
          </div>

          <div className="product-modal-body">
            <div className="product-modal-title-row">
              <div>
                <span className="product-modal-subtitle">
                  <span className="tiny-sun"><SparkIcon /></span>
                  {categoryBySlug[product.displayCategory]?.label || t('Churros Cafe Specialty')}
                </span>
                <h2 className="product-modal-title">{lang === 'ar' ? product.ar : product.displayName}</h2>
              </div>
              {product.price && (
                <div className="product-modal-price-badge">
                  <span>{t('Price')}</span>
                  <strong>{formatPrice(product.price)}</strong>
                </div>
              )}
            </div>

            <div className="product-modal-about-section">
              <h3 className="product-modal-about-title">
                <span className="tiny-sun"><SparkIcon /></span> {t('About this item')}
              </h3>
              <p className="product-modal-about-text">
                {product.description || (lang === 'ar'
                  ? 'محضر طازجاً حسب الطلب بوصفة أصيلة ومكونات متميزة في تشوروز كافيه قطر.'
                  : 'Handcrafted fresh to order with authentic recipes and premium ingredients at Churros Cafe Qatar.')}
              </p>
            </div>

            {(product.servingQuantity || (product.sauceOptions && product.sauceOptions.length > 0) || product.sourceCategory) && (
              <div className="product-modal-specs-grid">
                {product.servingQuantity && (
                  <div className="product-modal-spec-card">
                    <span className="product-modal-spec-label">{t('Serving')}</span>
                    <span className="product-modal-spec-val">{product.servingQuantity}</span>
                  </div>
                )}
                {product.sourceCategory && (
                  <div className="product-modal-spec-card">
                    <span className="product-modal-spec-label">{t('Category')}</span>
                    <span className="product-modal-spec-val">{product.sourceCategory}</span>
                  </div>
                )}
                {product.sauceOptions && product.sauceOptions.length > 0 && (
                  <div className="product-modal-spec-card full-width">
                    <span className="product-modal-spec-label">{t('Sauce options')}</span>
                    <div className="product-modal-sauces">
                      {product.sauceOptions.map((sauce: string) => (
                        <span key={sauce} className="product-modal-sauce-tag">{sauce}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="product-modal-footer">
              <div className="product-modal-footer-links">
                {product.displayCategory && (
                  <Link className="link" href={prefix(lang, `/menu/${product.displayCategory}/`)} onClick={close}>
                    {t('View category')} <ArrowIcon />
                  </Link>
                )}
                <Link className="link" href={prefix(lang, '/menu/')} onClick={close}>
                  {t('Full menu')} <ArrowIcon />
                </Link>
              </div>
              <Link className="button" href={prefix(lang, '/locations/')} onClick={close}>
                {t('Find nearest café')} <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

export function ProductCard({ product, lang }) {
  const displayName = lang === 'ar' ? product.ar : product.displayName;
  return (
    <article className="product" data-product={product.id}>
      <button
        className="product-open"
        onClick={() => {
          track('product_view', {
            product: product.displayName,
            category: categoryBySlug[product.displayCategory]?.label,
            price: product.price?.amount ?? product.price?.min,
            currency: product.price?.currency,
            source: 'menu'
          });
          window.dispatchEvent(new CustomEvent('churros:modal', {
            detail: { type: 'product', id: product.id, product }
          }));
        }}
        aria-label={`View ${displayName}`}
      >
        <div className="product-photo" onPointerEnter={() => track('product_image_interaction', { product: product.displayName, category: categoryBySlug[product.displayCategory]?.label })}>
          {product.imageExists !== false && product.image
            ? <SiteImage src={`/assets/${product.image}`} width={800} height={800} alt={product.imageAlt} loading="lazy" decoding="async" />
            : <div className="product-image-placeholder">Image unavailable</div>}
          {product.featured && <span className="badge">Featured</span>}
          {product.bestseller && <span className="badge">Popular</span>}
          {product.newItem && <span className="badge">New</span>}
        </div>
        <div className="product-title">
          <h3>{displayName}</h3>
          <span className="product-arrow" aria-hidden="true"><ArrowIcon /></span>
        </div>
        <div className="product-meta">
          {product.description && <span className="product-description">{product.description}</span>}
          <strong className="product-price">{formatPrice(product.price)}</strong>
        </div>
        {product.sauceOptions?.length > 0 && <span className="product-options"><strong>Sauces:</strong> {product.sauceOptions.join(', ')}</span>}
      </button>
      <Link className="product-category-link" href={prefix(lang, `/menu/${product.displayCategory}/`)}>{categoryBySlug[product.displayCategory]?.label} <ArrowIcon /></Link>
    </article>
  );
}

export function ProductGrid({ lang, full = false, filtersVisible = false, initialCategory = 'all', fixedCategory = '' }) {
  const t = text => lang === 'ar' ? translations[text] || text : text;
  const [category, setCategory] = useState(fixedCategory || initialCategory);
  const [query, setQuery] = useState('');
  const categoryChangeRequested = useRef(false);
  const products = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const selected = CHURROS_CAFE.products.filter(product =>
      (category === 'all' || product.displayCategory === category) &&
      (!normalized || getMenuSearchText(product).includes(normalized)));
    return full || normalized || category !== 'all' ? selected : selected.slice(0, 3);
  }, [category, query, full]);

  const groups = full
    ? categoryFilters
      .filter(filter => category === 'all' || filter.value === category)
      .map(filter => ({ ...filter, products: products.filter(product => product.displayCategory === filter.value) }))
      .filter(group => group.products.length)
    : [];

  const filterImage = filter => CHURROS_CAFE.products.find(product => product.displayCategory === filter.value && product.imageExists !== false)?.image;

  useEffect(() => {
    if (!full || !categoryChangeRequested.current) return;
    categoryChangeRequested.current = false;
    const frame = requestAnimationFrame(() => {
      const targetCategory = category === 'all' ? categoryFilters[0].value : category;
      const section = document.getElementById(`category-${targetCategory}`);
      const controls = document.querySelector('.menu-controls');
      if (!section || !controls) return;
      const top = section.getBoundingClientRect().top + window.scrollY - controls.offsetHeight - 16;
      window.scrollTo({ top: Math.max(0, top), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    });
    return () => cancelAnimationFrame(frame);
  }, [category, full]);

  const selectCategory = value => {
    categoryChangeRequested.current = true;
    setCategory(value);
    track('menu_filter_click', { category: value === 'all' ? 'All' : categoryBySlug[value]?.label });
  };

  useEffect(() => {
    if (!full) return;
    track('menu_view', { category: fixedCategory ? categoryBySlug[fixedCategory]?.label : 'All' });
  }, [full, fixedCategory]);

  useEffect(() => {
    if (!query.trim()) return;
    const timeout = setTimeout(() => track('menu_search', { query: query.trim(), results: products.length }), 500);
    return () => clearTimeout(timeout);
  }, [query, products.length]);

  return (
    <>
      {filtersVisible && !fixedCategory && (
        <div className={full ? 'menu-controls' : 'filter-row'}>
          <div className="filters" aria-label={full ? 'Menu categories' : 'Filter signature menu'}>
            {filters.map(filter => (
              <button key={filter.value} className={`filter ${category === filter.value ? 'active' : ''}`} aria-pressed={category === filter.value} onClick={() => selectCategory(filter.value)}>
                <span className="filter-image">{filter.value === 'all' ? <SiteImage src="/assets/menu/Classic Churros.webp" alt="" aria-hidden="true" /> : <SiteImage src={`/assets/${filterImage(filter)}`} alt="" aria-hidden="true" />}</span>
                <span>{t(filter.label)}</span>
              </button>
            ))}
          </div>
          {full ? (
            <label><span className="sr-only">{t('Search the menu')}</span><input id="menu-search" className="search-input" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={t('Search your next favorite…')} aria-label={t('Search the menu')} /></label>
          ) : <span className="small-note">{lang === 'ar' ? 'من قائمتنا' : 'FROM OUR MENU'}</span>}
        </div>
      )}
      {full ? (
        <div className="menu-groups" id="products" aria-live="polite">
          {groups.length ? groups.map(group => (
            <section className="menu-category-section" id={`category-${group.value}`} key={group.value}>
              <div className="menu-category-heading">
                <div><span className="menu-category-number">{String(categoryFilters.findIndex(filter => filter.value === group.value) + 1).padStart(2, '0')}</span><h2><Link href={prefix(lang, `/menu/${group.value}/`)}>{t(group.heading)}</Link></h2></div>
                <span>{lang === 'ar' ? `${group.products.length} أصناف` : `${group.products.length} items`}</span>
              </div>
              <div className="product-grid">
                {group.products.map(product => <ProductCard key={product.id} product={product} lang={lang} />)}
              </div>
            </section>
          )) : <p className="empty-state">{lang === 'ar' ? 'لا توجد نتائج. جرّب البحث عن القهوة أو اختر فئة أخرى.' : 'No matches yet. Try “coffee” or choose another category.'}</p>}
        </div>
      ) : (
        <div className="product-grid" id="products" aria-live="polite">
          {products.length ? products.map(product => <ProductCard key={product.id} product={product} lang={lang} />) : <p className="empty-state">{lang === 'ar' ? 'لا توجد نتائج. جرّب البحث عن القهوة أو اختر فئة أخرى.' : 'No matches yet. Try “coffee” or choose another category.'}</p>}
        </div>
      )}
    </>
  );
}

export function BranchExplorer({ lang }) {
  const t = text => lang === 'ar' ? translations[text] || text : text;
  const [active, setActive] = useState(CHURROS_CAFE.branches[0]);
  return (
    <div className="location-layout">
      <div className="branch-list" id="branch-list">
        {CHURROS_CAFE.branches.map(branch => (
          <button key={branch.id} className={`branch-row ${active.id === branch.id ? 'active' : ''}`} data-branch={branch.id} aria-pressed={active.id === branch.id} onClick={() => setActive(branch)}>
            <span className="branch-number">{branch.number}</span>
            <span><h3>{lang === 'ar' ? branch.ar : branch.name}</h3><p>{branch.locationLabel}</p></span>
            <span aria-hidden="true"><ArrowIcon /></span>
          </button>
        ))}
      </div>
      <div className="branch-preview" id="branch-preview">
        <SiteImage src={`/assets/${active.image}`} width={900} height={600} loading="lazy" alt={`${active.name} Churros Cafe branch`} />
        <div className="branch-overlay">
          <div><p>{t('BRANCH')} {active.number}</p><h3>{lang === 'ar' ? active.ar : active.name}</h3></div>
          <Link href={prefix(lang, `/locations/${active.id}/`)}>{t('Explore the space')} <ArrowIcon /></Link>
        </div>
      </div>
    </div>
  );
}

