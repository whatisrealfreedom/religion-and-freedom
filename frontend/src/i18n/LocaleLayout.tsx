import React, { useEffect } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLocale } from './LocaleProvider';
import { Locale } from './messages';

export default function LocaleLayout() {
  const { locale: localeParam } = useParams();
  const { locale, setLocale } = useLocale();

  // Validate URL locale
  const isValid = localeParam === 'fa' || localeParam === 'en';
  if (!isValid) {
    return <Navigate to={`/${locale}`} replace />;
  }

  useEffect(() => {
    const next = localeParam as Locale;
    if (next !== locale) setLocale(next);
  }, [locale, localeParam, setLocale]);

  return (
    <div className={locale === 'en' ? 'min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50' : 'min-h-screen bg-gradient-to-br from-gray-50 to-blue-50'}>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}


