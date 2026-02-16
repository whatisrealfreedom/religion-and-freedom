import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bars3Icon, ChevronDownIcon, GlobeAltIcon, XMarkIcon, BookOpenIcon, DocumentTextIcon, UserGroupIcon, SparklesIcon, CalendarDaysIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import FreedomBird from './FreedomBird';
// کامنت شده - چون بخش progress غیرفعال است
// import { useProgress } from '../hooks/useProgress';
// import ProgressBar from './ProgressBar';
import { useLocale } from '../i18n/LocaleProvider';
import { replaceLocaleInPath, withLocalePath } from '../i18n/localePath';
import AuthModal from './AuthModal';
import { removeAuthToken } from '../services/api';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMegaMenuMobileOpen, setIsMegaMenuMobileOpen] = useState(false);
  const megaMenuCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // کامنت شده - چون بخش progress غیرفعال است
  // const { progress } = useProgress();
  const { locale, setLocale, t, isRTL } = useLocale();
  const navigate = useNavigate();
  const location = useLocation();

  // Cleanup mega menu timer on unmount
  useEffect(() => {
    return () => {
      if (megaMenuCloseTimer.current) clearTimeout(megaMenuCloseTimer.current);
    };
  }, []);

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('auth_token');
      setIsAuthenticated(!!token);
    };
    
    checkAuth();
    
    // Listen for auth state changes
    window.addEventListener('authStateChanged', checkAuth);
    
    return () => {
      window.removeEventListener('authStateChanged', checkAuth);
    };
  }, [location]);

  const handleLogout = () => {
    removeAuthToken();
    setIsAuthenticated(false);
    navigate(withLocalePath(locale, '/'));
  };

  const base = `/${locale}`;

  const switchLanguage = (nextLocale: 'fa' | 'en') => {
    setLocale(nextLocale);
    const nextPath = replaceLocaleInPath(location.pathname, nextLocale);
    navigate(`${nextPath}${location.search}${location.hash}`, { replace: true });
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18 md:h-20">
          {/* Logo */}
          <Link
            to={base}
            className={`flex items-center space-x-2 sm:space-x-3 ${isRTL ? 'space-x-reverse' : ''} group`}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 ring-2 ring-white/20">
              <FreedomBird size="sm" animated />
            </div>
            <div className="hidden xs:block">
              <span className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent block">
                {t('nav.journey')}
              </span>
              <span className="text-[10px] sm:text-xs text-gray-500 block">Journey to Freedom</span>
            </div>
          </Link>

          {/* Progress Indicator */}
          {/* کامنت شده - کاربر نمی‌خواهد پیشرفت نمایش داده شود */}
          {/* <div className={`hidden lg:flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''} flex-1 max-w-md mx-4 md:mx-8`}>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs sm:text-sm font-semibold text-gray-700">{t('nav.progress')}</span>
                <span className="text-xs sm:text-sm font-bold text-primary-600">
                  {progress.chaptersRead.length}/{progress.totalChapters}
                </span>
              </div>
              <ProgressBar />
            </div>
          </div> */}

          {/* Desktop Menu */}
          <div className={`hidden md:flex items-center space-x-3 md:space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
            <Link to={base} className="text-gray-700 hover:text-primary-600 font-semibold text-sm md:text-base transition-colors px-2 md:px-3 py-2 rounded-lg hover:bg-gray-50">
              {t('nav.home')}
            </Link>

            {/* Mega menu trigger */}
            <div
              className="relative"
              onMouseEnter={() => {
                if (megaMenuCloseTimer.current) {
                  clearTimeout(megaMenuCloseTimer.current);
                  megaMenuCloseTimer.current = null;
                }
                setIsMegaMenuOpen(true);
              }}
              onMouseLeave={() => {
                megaMenuCloseTimer.current = setTimeout(() => setIsMegaMenuOpen(false), 200);
              }}
            >
              <button
                type="button"
                className={`inline-flex items-center gap-1 text-gray-700 hover:text-primary-600 font-semibold text-sm md:text-base transition-colors px-2 md:px-3 py-2 rounded-lg hover:bg-gray-50 ${isMegaMenuOpen ? 'text-primary-600 bg-gray-50' : ''}`}
                aria-expanded={isMegaMenuOpen}
                aria-haspopup="true"
              >
                <span>{t('nav.sections')}</span>
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Invisible bridge - eliminates gap between button and panel for smooth hover */}
              {isMegaMenuOpen && (
                <div
                  className="absolute top-full left-0 right-0 h-6"
                  style={{ width: 'max(100%, 400px)', minHeight: '48px' }}
                  aria-hidden
                />
              )}

              {/* Mega menu panel - full width below nav */}
              {isMegaMenuOpen && (
                <div className="fixed left-0 right-0 top-20 z-50 px-4 md:px-6 lg:px-8">
                  <div className="mx-auto max-w-7xl bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
                    <div className={`grid grid-cols-5 gap-0 ${isRTL ? 'direction-rtl' : ''}`}>
                    {/* شاهنامه */}
                    <div className="p-6 border-e border-gray-200">
                      <Link
                        to={withLocalePath(locale, '/shahnameh')}
                        className="flex items-center gap-3 mb-4 text-amber-700 hover:text-amber-800 font-bold text-lg"
                        onClick={() => setIsMegaMenuOpen(false)}
                      >
                        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                          <BookOpenIcon className="w-5 h-5 text-amber-700" />
                        </div>
                        {t('nav.shahnameh')}
                      </Link>
                      <ul className="space-y-2">
                        <li>
                          <Link to={withLocalePath(locale, '/shahnameh/feraydun')} className="text-gray-600 hover:text-primary-600 text-sm block py-1" onClick={() => setIsMegaMenuOpen(false)}>
                            {isRTL ? 'فریدون' : 'Fereydun'}
                          </Link>
                        </li>
                        <li>
                          <Link to={withLocalePath(locale, '/shahnameh')} className="text-gray-600 hover:text-primary-600 text-sm block py-1" onClick={() => setIsMegaMenuOpen(false)}>
                            {isRTL ? 'همه داستان‌ها' : 'All stories'}
                          </Link>
                        </li>
                      </ul>
                    </div>
                    {/* منابع */}
                    <div className="p-6 border-e border-gray-200">
                      <Link
                        to={withLocalePath(locale, '/resources')}
                        className="flex items-center gap-3 mb-4 text-primary-700 hover:text-primary-800 font-bold text-lg"
                        onClick={() => setIsMegaMenuOpen(false)}
                      >
                        <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                          <DocumentTextIcon className="w-5 h-5 text-primary-700" />
                        </div>
                        {t('nav.resources')}
                      </Link>
                      <p className="text-gray-500 text-sm">
                        {isRTL ? 'PDF، ویدیو، لینک‌ها و اندیشمندان' : 'PDFs, videos, links & thinkers'}
                      </p>
                    </div>
                    {/* منتقدان */}
                    <div className="p-6 border-e border-gray-200">
                      <Link
                        to={withLocalePath(locale, '/critics')}
                        className="flex items-center gap-3 mb-4 text-gray-800 hover:text-primary-600 font-bold text-lg"
                        onClick={() => setIsMegaMenuOpen(false)}
                      >
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                          <UserGroupIcon className="w-5 h-5 text-gray-700" />
                        </div>
                        {t('nav.critics')}
                      </Link>
                      <p className="text-gray-500 text-sm">
                        {isRTL ? 'نقدهای رایج و پاسخ‌ها' : 'Common critiques & responses'}
                      </p>
                    </div>
                    {/* عرفان و دین */}
                    <div className="p-6 border-e border-gray-200">
                      <Link
                        to={withLocalePath(locale, '/highlights/erfan-din')}
                        className="flex items-center gap-3 mb-4 text-indigo-700 hover:text-indigo-800 font-bold text-lg"
                        onClick={() => setIsMegaMenuOpen(false)}
                      >
                        <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                          <SparklesIcon className="w-5 h-5 text-indigo-700" />
                        </div>
                        {t('nav.erfan')}
                      </Link>
                      <p className="text-gray-500 text-sm">
                        {isRTL ? 'هایلایت‌های عرفان و دین' : 'Highlights: Erfan & religion'}
                      </p>
                    </div>
                    {/* پرونده و تحلیل: ۲۸ مرداد + ایران ۱۴۰۸ */}
                    <div className="p-6">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                        {isRTL ? 'پرونده و تحلیل' : 'Dossier & Analysis'}
                      </p>
                      <ul className="space-y-3">
                        <li>
                          <Link
                            to={withLocalePath(locale, '/28mordad')}
                            className="flex items-center gap-3 text-emerald-700 hover:text-emerald-800 font-bold"
                            onClick={() => setIsMegaMenuOpen(false)}
                          >
                            <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                              <CalendarDaysIcon className="w-4 h-4 text-emerald-700" />
                            </div>
                            {t('nav.mordad28')}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={withLocalePath(locale, '/special/iran-1408')}
                            className="flex items-center gap-3 text-slate-700 hover:text-primary-600 font-bold"
                            onClick={() => setIsMegaMenuOpen(false)}
                          >
                            <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                              <ChartBarIcon className="w-4 h-4 text-slate-600" />
                            </div>
                            {t('nav.iran1408')}
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  </div>
                </div>
              )}
            </div>

            <Link to={withLocalePath(locale, '/discussions')} className="text-gray-700 hover:text-primary-600 font-semibold text-sm md:text-base transition-colors px-2 md:px-3 py-2 rounded-lg hover:bg-gray-50">
              {isRTL ? 'بحث و گفتگو' : 'Discussions'}
            </Link>
            <Link to={withLocalePath(locale, '/special/reformists-enemy')} className="text-red-600 hover:text-red-700 font-bold text-sm md:text-base transition-colors px-2 md:px-3 py-2 rounded-lg hover:bg-red-50 inline-flex items-center gap-1.5">
              <span>{isRTL ? 'اصلاحات دشمن' : 'Reformists Enemy'}</span>
              <span className="relative inline-flex items-center">
                <span className="absolute -top-3.5 sm:-top-4 z-20" style={isRTL ? { left: '50%', transform: 'translateX(-50%) rotate(-15deg)' } : { right: '50%', transform: 'translateX(50%) rotate(-15deg)' }}>
                  <span className="inline-block bg-red-600 text-white text-[7px] sm:text-[8px] font-black px-1 sm:px-1.5 py-0.5 rounded blinking-text whitespace-nowrap" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                    {isRTL ? '⚠️ خیلی مهم' : '⚠️ IMPORTANT'}
                  </span>
                </span>
                <span>{isRTL ? 'ایران' : ''}</span>
              </span>
            </Link>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold text-sm md:text-base px-4 md:px-5 py-2 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                {isRTL ? 'خروج' : 'Logout'}
              </button>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold text-sm md:text-base px-4 md:px-5 py-2 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                {isRTL ? 'ورود' : 'Login'}
              </button>
            )}

            {/* Language switch */}
            <button
              type="button"
              onClick={() => switchLanguage(locale === 'fa' ? 'en' : 'fa')}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 font-semibold text-sm md:text-base shadow-sm"
              aria-label={t('nav.language')}
              title={t('nav.language')}
            >
              <GlobeAltIcon className="w-5 h-5" />
              <span className="hidden lg:inline">{locale === 'fa' ? 'EN' : 'FA'}</span>
              <span className="lg:hidden">{locale === 'fa' ? 'EN' : 'FA'}</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="منوی موبایل"
          >
            {isOpen ? (
              <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            ) : (
              <Bars3Icon className="h-5 w-5 sm:h-6 sm:w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {/* Mobile Progress Indicator */}
            {/* کامنت شده - کاربر نمی‌خواهد پیشرفت نمایش داده شود */}
            {/* {progress.chaptersRead.length > 0 && (
              <div className="px-3 py-3 mb-2 border-b border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700">{t('nav.progress')}</span>
                  <span className="text-sm font-bold text-primary-600">
                    {progress.chaptersRead.length}/{progress.totalChapters}
                  </span>
                </div>
                <ProgressBar />
              </div>
            )} */}
            <Link
              to={base}
              className="block px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.home')}
            </Link>
            {/* Mobile: Sections expandable */}
            <div className="border-b border-gray-100 pb-1">
              <button
                type="button"
                onClick={() => setIsMegaMenuMobileOpen(!isMegaMenuMobileOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-md text-base font-semibold transition-colors"
              >
                <span>{t('nav.sections')}</span>
                <ChevronDownIcon className={`w-5 h-5 transition-transform ${isMegaMenuMobileOpen ? 'rotate-180' : ''}`} />
              </button>
              {isMegaMenuMobileOpen && (
                <div className="pl-4 mt-1 space-y-0.5">
                  <Link to={withLocalePath(locale, '/shahnameh')} className="block px-3 py-2 text-amber-700 hover:bg-amber-50 rounded-md text-sm font-bold" onClick={() => { setIsOpen(false); setIsMegaMenuMobileOpen(false); }}>{t('nav.shahnameh')}</Link>
                  <Link to={withLocalePath(locale, '/resources')} className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md text-sm" onClick={() => { setIsOpen(false); setIsMegaMenuMobileOpen(false); }}>{t('nav.resources')}</Link>
                  <Link to={withLocalePath(locale, '/critics')} className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md text-sm" onClick={() => { setIsOpen(false); setIsMegaMenuMobileOpen(false); }}>{t('nav.critics')}</Link>
                  <Link to={withLocalePath(locale, '/highlights/erfan-din')} className="block px-3 py-2 text-indigo-700 hover:bg-indigo-50 rounded-md text-sm font-medium" onClick={() => { setIsOpen(false); setIsMegaMenuMobileOpen(false); }}>{t('nav.erfan')}</Link>
                  <Link to={withLocalePath(locale, '/28mordad')} className="block px-3 py-2 text-emerald-700 hover:bg-emerald-50 rounded-md text-sm font-medium" onClick={() => { setIsOpen(false); setIsMegaMenuMobileOpen(false); }}>{t('nav.mordad28')}</Link>
                  <Link to={withLocalePath(locale, '/special/iran-1408')} className="block px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-md text-sm" onClick={() => { setIsOpen(false); setIsMegaMenuMobileOpen(false); }}>{t('nav.iran1408')}</Link>
                </div>
              )}
            </div>
            <Link
              to={withLocalePath(locale, '/discussions')}
              className="block px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {isRTL ? 'بحث و گفتگو' : 'Discussions'}
            </Link>
            <Link
              to={withLocalePath(locale, '/special/reformists-enemy')}
              className="block px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-md text-base font-bold transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <span className="inline-flex items-center gap-1.5">
                <span>{isRTL ? 'اصلاحات دشمن' : 'Reformists Enemy'}</span>
                <span className="relative inline-flex items-center">
                  <span className="absolute -top-3.5 z-20" style={isRTL ? { left: '50%', transform: 'translateX(-50%) rotate(-15deg)' } : { right: '50%', transform: 'translateX(50%) rotate(-15deg)' }}>
                    <span className="inline-block bg-red-600 text-white text-[7px] font-black px-1 py-0.5 rounded blinking-text whitespace-nowrap" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                      {isRTL ? '⚠️ خیلی مهم' : '⚠️ IMPORTANT'}
                    </span>
                  </span>
                  <span>{isRTL ? 'ایران' : ''}</span>
                </span>
              </span>
            </Link>
            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-md text-base font-semibold transition-colors"
              >
                {isRTL ? 'خروج' : 'Logout'}
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-md text-base font-semibold transition-colors hover:shadow-lg"
              >
                {isRTL ? 'ورود' : 'Login'}
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                switchLanguage(locale === 'fa' ? 'en' : 'fa');
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 text-gray-800 bg-gray-50 hover:bg-gray-100 rounded-md text-base font-semibold transition-colors"
            >
              <span className="flex items-center gap-2">
                <GlobeAltIcon className="w-5 h-5" />
                {t('nav.language')}
              </span>
              <span className="text-primary-700 font-bold">{locale === 'fa' ? 'EN' : 'FA'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialTab="login"
      />
    </nav>
  );
};

export default Navbar;

