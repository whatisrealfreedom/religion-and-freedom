import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Locale, messages } from './messages';

type Dir = 'rtl' | 'ltr';

type LocaleContextValue = {
  locale: Locale;
  dir: Dir;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  isRTL: boolean;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

const STORAGE_KEY = 'freedom-locale';

function getFromPath(obj: any, path: string): unknown {
  const parts = path.split('.');
  let cur: any = obj;
  for (const p of parts) {
    if (cur == null) return undefined;
    cur = cur[p];
  }
  return cur;
}

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return (saved === 'en' || saved === 'fa') ? (saved as Locale) : 'fa';
  });

  const dir: Dir = messages[locale]?.meta?.dir ?? 'rtl';
  const isRTL = dir === 'rtl';

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const t = useCallback(
    (key: string) => {
      const value = getFromPath(messages[locale], key);
      if (typeof value === 'string') return value;
      // fallback to Persian if key missing in current locale
      const fallback = getFromPath(messages.fa, key);
      if (typeof fallback === 'string') return fallback;
      return key;
    },
    [locale]
  );

  useEffect(() => {
    // Apply HTML attributes for direction + language (helps accessibility + layout)
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    document.documentElement.dataset.lang = locale;
  }, [dir, locale]);

  const value = useMemo(
    () => ({ locale, dir, setLocale, t, isRTL }),
    [dir, isRTL, locale, setLocale, t]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used inside LocaleProvider');
  return ctx;
}


