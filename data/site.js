export const SITE_NAME = 'Churros Cafe';
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://churroscafeqa.com').replace(/\/$/, '');

export function absoluteUrl(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}
