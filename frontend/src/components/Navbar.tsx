import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bars3Icon, GlobeAltIcon, XMarkIcon } from '@heroicons/react/24/outline';
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
  // کامنت شده - چون بخش progress غیرفعال است
  // const { progress } = useProgress();
  const { locale, setLocale, t, isRTL } = useLocale();
  const navigate = useNavigate();
  const location = useLocation();

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
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
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
            <Link to={withLocalePath(locale, '/resources')} className="text-gray-700 hover:text-primary-600 font-semibold text-sm md:text-base transition-colors px-2 md:px-3 py-2 rounded-lg hover:bg-gray-50">
              {t('nav.resources')}
            </Link>
            <Link to={withLocalePath(locale, '/discussions')} className="text-gray-700 hover:text-primary-600 font-semibold text-sm md:text-base transition-colors px-2 md:px-3 py-2 rounded-lg hover:bg-gray-50">
              {isRTL ? 'بحث و گفتگو' : 'Discussions'}
            </Link>
            <Link to={withLocalePath(locale, '/critics')} className="text-gray-700 hover:text-primary-600 font-semibold text-sm md:text-base transition-colors px-2 md:px-3 py-2 rounded-lg hover:bg-gray-50">
              {t('nav.critics')}
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
            <Link
              to={withLocalePath(locale, '/resources')}
              className="block px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.resources')}
            </Link>
            <Link
              to={withLocalePath(locale, '/discussions')}
              className="block px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {isRTL ? 'بحث و گفتگو' : 'Discussions'}
            </Link>
            <Link
              to={withLocalePath(locale, '/critics')}
              className="block px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.critics')}
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

