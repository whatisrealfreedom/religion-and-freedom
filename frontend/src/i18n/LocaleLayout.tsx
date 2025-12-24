import React, { useEffect, useMemo } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLocale } from './LocaleProvider';
import { Locale } from './messages';

export default function LocaleLayout() {
  const { locale: localeParam } = useParams<{ locale?: string }>();
  const { locale, setLocale } = useLocale();

  // Validate and normalize locale from URL
  const validLocale = useMemo(() => {
    if (localeParam === 'fa' || localeParam === 'en') {
      return localeParam as Locale;
    }
    return null;
  }, [localeParam]);

  // Sync URL locale to context (update context if URL changed)
  useEffect(() => {
    if (validLocale && validLocale !== locale) {
      setLocale(validLocale);
    }
  }, [validLocale, locale, setLocale]);

  // Redirect if invalid locale
  if (!validLocale) {
    // Use 'fa' as default fallback
    return <Navigate to="/fa" replace />;
  }

  return (
    <div className={validLocale === 'en' ? 'min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50' : 'min-h-screen bg-gradient-to-br from-gray-50 to-blue-50'}>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}


