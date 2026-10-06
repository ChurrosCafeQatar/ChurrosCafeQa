'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SiteImage from './site-image';
import { translations, CHURROS_CAFE } from '../data/content';
import { analyticsEnabled } from '../data/analytics';
import { ArrowIcon } from './icons';

function prefix(lang: string, path: string = '/') {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return lang === 'ar' ? `/ar${clean}` : clean;
}

export default function Footer() {
  const pathname = usePathname();
  const isArabic = pathname.startsWith('/ar');
  const lang = isArabic ? 'ar' : 'en';
  const t = (text: string) => (lang === 'ar' ? (translations as any)[text] || text : text);

  return (
    <>
      <footer>
        <div className="footer-main">
          <div>
            <Link className="footer-logo brand-footer-logo" href={prefix(lang)} aria-label="Churros Cafe home">
              <SiteImage className="brand-logo-image" src="/assets/churros_logo.webp" alt="Churros Cafe" width={181} height={130} />
            </Link>
            <p>{t('Your daily dose of golden.')}</p>
            <span className="footer-tag">{t('COFFEE. CHURROS. CONNECTION.')}</span>
          </div>
          <div>
            <h3>{lang === 'ar' ? 'اكتشف القائمة' : 'Explore'}</h3>
            <Link href={prefix(lang, '/menu/')}>{lang === 'ar' ? 'قائمة الحلويات والقهوة' : 'Dessert & Coffee Menu'}</Link>
            <Link href={prefix(lang, '/locations/')}>{lang === 'ar' ? 'الفروع والمواقع' : 'Branches & Locations'}</Link>
            <Link href={prefix(lang, '/about/')}>{t('Our story')}</Link>
            {/* Growth: Link to social media */}
            <a href="https://instagram.com/churroscafe.qa" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
          <div>
            <h3>{lang === 'ar' ? 'فروعنا في قطر' : 'Our Branches in Qatar'}</h3>
            {CHURROS_CAFE.branches.map(branch => (
              <Link key={branch.id} href={prefix(lang, `/locations/${branch.id}/`)}>
                {lang === 'ar' ? `تشوروز كافيه ${branch.ar}` : `Churros Cafe ${branch.name}`}
              </Link>
            ))}
          </div>
          <div>
            <h3>{t('A little more')}</h3>
            <Link href={prefix(lang, '/stories/')}>{t('The Churros Cafe journal')}</Link>
            <Link href={prefix(lang, '/offers/')}>{t('Winter menu moments')}</Link>
            <Link href={prefix(lang, '/locations/')}>{lang === 'ar' ? 'خطط لزيارتك' : 'Plan a visit'} <ArrowIcon /></Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {t('Churros Cafe · Qatar')}</span>
          <span>{t('CONCEIVED WITH WARMTH. SERVED WITH JOY.')}</span>
          <Link href={prefix(lang, '/privacy/')}>{t('Privacy & cookies')}</Link>
          {analyticsEnabled && (
            <button onClick={() => window.dispatchEvent(new Event('churros:privacy-settings'))}>
              {lang === 'ar' ? 'إعدادات الخصوصية' : 'Privacy settings'}
            </button>
          )}
        </div>
      </footer>
      <div className="mobile-bar">
        <Link href={prefix(lang, '/menu/')}>{t('Menu')}</Link>
        <Link href={prefix(lang, '/locations/')}>{t('Find a café')}</Link>
      </div>
    </>
  );
}
