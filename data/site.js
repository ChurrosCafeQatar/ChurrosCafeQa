export const SITE_NAME = 'Churros Cafe';
export const SITE_URL = 'https://www.churroscafeqa.com';

export function absoluteUrl(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}
