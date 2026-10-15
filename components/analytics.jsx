'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { analyticsEnabled, consentKey, GA_ID, track } from '../data/analytics';

export default function Analytics() {
  const path = usePathname();
  const [consent, setConsent] = useState(null);
  const [settings, setSettings] = useState(false);
  const lastPage = useRef(null);
  useEffect(() => {
    // No initial prompt. Preserve a visitor's previously saved opt-out.
    try { setConsent(localStorage.getItem(consentKey) === 'rejected' ? 'rejected' : 'accepted'); }
    catch { setConsent('accepted'); }
    const open = () => setSettings(true);
    window.addEventListener('churros:privacy-settings', open);
    return () => window.removeEventListener('churros:privacy-settings', open);
  }, []);
  useEffect(() => {
    if (!analyticsEnabled || consent !== 'accepted') return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window[`ga-disable-${GA_ID}`] = false;
    if (!document.getElementById('churros-ga')) {
      window.gtag('js', new Date());
      window.gtag('config', GA_ID, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false });
      const script = document.createElement('script');
      script.id = 'churros-ga'; script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(script);
    }
    window.churrosAnalyticsReady = true;
    if (lastPage.current === path) return;
    lastPage.current = path;
    window.gtag('event', 'page_view', { page_location: `${location.origin}${path}`, page_path: path, page_title: document.title });
    const route = path.replace(/^\/ar(?=\/)/, '');
    if (route.startsWith('/locations/')) track('location_view', { branch: route.split('/')[2] || 'all' });
    if (route === '/offers/') track('offer_view');
    if (route.startsWith('/menu/')) {
      track('menu_view', { category: route.split('/')[2] || 'all' });
      track('menu_category_view', { category: route.split('/')[2] || 'all' });
    }
  }, [consent, path]);
  useEffect(() => {
    const onClick = event => {
      const link = event.target.closest?.('a');
      if (!link) return;
      const route = path.replace(/^\/ar(?=\/)/, '');
      const branch = link.closest('[data-branch-id]')?.dataset.branchId || (route.startsWith('/locations/') ? route.split('/')[2] : undefined);
      if (link.hostname === 'maps.app.goo.gl') {
        track('location_direction_click', { branch, source: path }); // Preserve existing reports.
        track('direction_click', { branch, source: path });
      }
      if (link.protocol === 'tel:') {
        track('location_call_click', { branch, source: 'branch-contact' });
        track('call_click', { branch, source: 'branch-contact' });
      }
      if (link.dataset.analytics === 'nearest-location') track('nearest_location_click', { source: path });
      if (['instagram.com', 'www.instagram.com'].includes(link.hostname)) track('social_click', { partner: 'instagram', source: path });
      if (link.closest('.menu-controls') && link.hash) {
        track('menu_filter_click', { category: link.hash.slice(1) });
        track('menu_category_view', { category: link.hash.slice(1) });
      }
      if (link.classList.contains('language')) track('language_switch', { language: link.lang });
      if (path.includes('/offers/') && link.pathname.includes('/menu/')) track('offer_click', { source: 'winter-menu' });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [path]);
  function choose(value) {
    try { localStorage.setItem(consentKey, value); } catch { /* Choice still works for this visit. */ }
    if (value === 'rejected') {
      window.churrosAnalyticsReady = false;
      window[`ga-disable-${GA_ID}`] = true;
      document.cookie.split(';').forEach(cookie => {
        const name = cookie.split('=')[0].trim();
        if (!name.startsWith('_ga')) return;
        for (const domain of ['', location.hostname, 'churroscafeqa.com']) {
          document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`;
        }
      });
    }
    setConsent(value); setSettings(false);
  }
  if (!analyticsEnabled || !settings) return null;
  const ar = path.startsWith('/ar/');
  return <aside className="analytics-choice" aria-label={ar ? 'خيارات التحليلات' : 'Analytics preferences'}>
    <p>{ar ? 'هل تسمح بتحليلات Google الاختيارية لتحسين الموقع؟ يمكنك تغيير اختيارك من إعدادات الخصوصية.' : 'Allow optional Google Analytics to help improve this website? You can change your choice in Privacy settings.'}</p>
    <button onClick={() => choose('accepted')}>{ar ? 'السماح' : 'Allow analytics'}</button>
    <button onClick={() => choose('rejected')}>{ar ? 'رفض' : 'Reject analytics'}</button>
  </aside>;
}
