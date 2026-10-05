export const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
export const analyticsEnabled = /^G-[A-Z0-9]+$/.test(GA_ID);
export const consentKey = 'churros-analytics-consent';

export function track(event, details = {}) {
  if (typeof window === 'undefined') return;
  // Never send typed menu queries, exact geolocation, query strings, or form values.
  const allowed = ['branch', 'category', 'product', 'price', 'currency', 'source', 'results', 'language', 'partner'];
  const safe = Object.fromEntries(Object.entries(details).filter(([key]) => allowed.includes(key)));
  const payload = { event, ...safe, page_path: window.location.pathname };
  window.dispatchEvent(new CustomEvent('churros:analytics', { detail: payload }));
  if (analyticsEnabled && window.churrosAnalyticsReady && typeof window.gtag === 'function') {
    window.gtag('event', event, { ...safe, page_path: window.location.pathname });
  }
}
