'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SiteImage from './site-image';
import { translations } from '../data/content';
import { MenuIcon } from './icons';

function prefix(lang: string, path: string = '/') {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return lang === 'ar' ? `/ar${clean}` : clean;
}

export default function Header() {
  const pathname = usePathname();
  const isArabic = pathname.startsWith('/ar');
  const lang = isArabic ? 'ar' : 'en';
  const t = (text: string) => (lang === 'ar' ? (translations as any)[text] || text : text);

  const [open, setOpen] = useState(false);

  const currentPath = pathname.replace(/^\/ar/, '') || '/';
  const otherLanguage = isArabic ? currentPath : `/ar${currentPath}`;

  // Apply body classes dynamically
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
    document.body.classList.toggle('arabic', isArabic);
  }, [isArabic, lang]);

  return (
    <>
      <a className="skip" href="#main">{t('Skip to content')}</a>
      <div className="announcement">
        <span>{t('A little coffee. A little cinnamon. A lot to love.')}</span>
        <span className="concept-label">{t('Churros Cafe · Qatar')}</span>
      </div>
      <header className="header">
        <Link href={prefix(lang)} className="logo brand-logo" aria-label="Churros Cafe Qatar - Home">
          <SiteImage className="brand-logo-image" src="/assets/churros_logo.webp" alt="Churros Cafe Qatar Logo" width={181} height={130} />
        </Link>
        <nav id="nav" className={open ? 'open' : ''} aria-label={t('Main navigation')}>
          <Link href={prefix(lang, '/menu/')}>{lang === 'ar' ? 'القائمة' : 'Dessert & Coffee Menu'}</Link>
          <Link href={prefix(lang, '/about/')}>{t('Our story')}</Link>
          <Link href={prefix(lang, '/locations/')}>{lang === 'ar' ? 'فروعنا' : 'Cafe Locations'}</Link>
          <Link href={prefix(lang, '/offers/')}>{lang === 'ar' ? 'العروض الشتوية' : 'Winter Offers'}</Link>
        </nav>
        <div className="header-actions">
          {/* New Growth CTA */}
          <Link href={prefix(lang, '/locations/')} className="button compact" style={{ minHeight: '38px', padding: '8px 16px', fontSize: '10px' }}>
            {lang === 'ar' ? 'فروعنا' : 'Find Nearest Cafe'}
          </Link>
          <Link href={otherLanguage} className="language" lang={isArabic ? 'en' : 'ar'}>
            {isArabic ? 'EN' : 'عربي'}
          </Link>
          <button
            className="nav-toggle"
            aria-label={open ? 'Close navigation' : t('Open navigation')}
            aria-expanded={open}
            aria-controls="nav"
            onClick={() => setOpen((value) => !value)}
          >
            <MenuIcon />
          </button>
        </div>
      </header>
    </>
  );
}
