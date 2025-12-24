import React from 'react';
import { Link } from 'react-router-dom';
import { useLocale } from '../i18n/LocaleProvider';
import { withLocalePath } from '../i18n/localePath';

const Footer: React.FC = () => {
  const { t, locale } = useLocale();
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-12 sm:mt-16 md:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{t('nav.journey')}</h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              {t('home.heroSubtitle')}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{t('nav.resources')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to={withLocalePath(locale, '/')} className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors block">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to={withLocalePath(locale, '/resources')} className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors block">
                  {t('nav.resources')}
                </Link>
              </li>
              <li>
                <Link to={withLocalePath(locale, '/critics')} className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors block">
                  {t('nav.critics')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{t('nav.about')}</h3>
            <p className="text-sm sm:text-base text-gray-300">
              {t('resources.subtitle')}
            </p>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-700 text-center text-gray-400">
          <p className="text-xs sm:text-sm md:text-base">
            &copy; {new Date().getFullYear()} {t('nav.journey')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

