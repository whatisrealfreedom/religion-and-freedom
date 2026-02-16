import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useLocale } from '../i18n/LocaleProvider';
import { withLocalePath } from '../i18n/localePath';

const content = {
  fa: {
    title: 'عرفان و دین',
    subtitle: 'هایلایت‌های اینستاگرام',
    comingSoon: 'محتوا به زودی در این صفحه قرار می‌گیرد.',
  },
  en: {
    title: 'Erfan & Religion',
    subtitle: 'Instagram highlights',
    comingSoon: 'Content will be added here soon.',
  },
};

const HighlightsErfanDin: React.FC = () => {
  const { locale, isRTL } = useLocale();
  const t = content[locale];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-indigo-50/30 to-white py-8 sm:py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to={withLocalePath(locale, '/')}
            className={`inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8 text-sm font-semibold ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <ArrowLeftIcon className="w-4 h-4" />
            {locale === 'fa' ? 'بازگشت به صفحه اصلی' : 'Back to Home'}
          </Link>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-12 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-100 flex items-center justify-center mb-6">
              <SparklesIcon className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              {t.title}
            </h1>
            <p className="text-gray-500 mb-6">{t.subtitle}</p>
            <p className="text-gray-600 leading-relaxed">{t.comingSoon}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HighlightsErfanDin;
