import { Locale } from './messages';

export function withLocalePath(locale: Locale, path: string) {
  const clean = path.startsWith('/') ? path : `/${path}`;
  // Avoid double-prefix
  if (clean === `/${locale}` || clean.startsWith(`/${locale}/`)) return clean;
  return `/${locale}${clean === '/' ? '' : clean}`;
}

export function replaceLocaleInPath(pathname: string, nextLocale: Locale) {
  const parts = pathname.split('/');
  // parts[0] is ''
  if (parts[1] === 'fa' || parts[1] === 'en') {
    parts[1] = nextLocale;
    return parts.join('/') || '/';
  }
  return `/${nextLocale}${pathname.startsWith('/') ? '' : '/'}${pathname}`;
}


