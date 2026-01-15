import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useLocale } from '../../../i18n/LocaleProvider';
import { withLocalePath } from '../../../i18n/localePath';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { getSectionIdForSlug, getSlugForSection } from './sectionSlugs';
import { storyData } from '../../ShahnamehStory';

const ShahnamehSection: React.FC = () => {
  const { locale, storyId, sectionSlug } = useParams<{ 
    locale: string; 
    storyId: string; 
    sectionSlug: string;
  }>();
  const { isRTL } = useLocale();
  const validLocale = (locale === 'fa' || locale === 'en') ? locale : 'fa';

  // Get section ID from slug
  const sectionId = getSectionIdForSlug(sectionSlug || '');
  
  // Get story data
  const story = storyData[storyId || ''];
  if (!story) {
    return <Navigate to={withLocalePath(validLocale, '/shahnameh')} replace />;
  }

  // Find the section
  const section = story.sections.find(s => s.id === sectionId);
  if (!section) {
    return <Navigate to={withLocalePath(validLocale, `/shahnameh/${storyId}`)} replace />;
  }

  // Navigation helpers
  const currentIndex = story.sections.findIndex(s => s.id === sectionId);
  const nextSection = currentIndex < story.sections.length - 1 ? story.sections[currentIndex + 1] : null;
  const prevSection = currentIndex > 0 ? story.sections[currentIndex - 1] : null;
  const ForwardIcon = isRTL ? ArrowLeftIcon : ArrowRightIcon;
  const BackIcon = isRTL ? ArrowRightIcon : ArrowLeftIcon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Link
              to={withLocalePath(validLocale, `/shahnameh/${storyId}`)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              {isRTL ? `بازگشت به ${story.faTitle}` : `Back to ${story.enTitle}`}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-sm font-semibold text-gray-700">
              {isRTL ? section.faTitle : section.enTitle}
            </span>
          </div>
          <Link
            to={withLocalePath(validLocale, '/shahnameh')}
            className="text-sm font-semibold text-gray-700 hover:text-primary-700 transition-colors"
          >
            {isRTL ? 'فهرست شاهنامه' : 'Shahnameh Index'}
          </Link>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-amber-200 p-8 sm:p-10 md:p-12">
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center text-3xl shadow-lg">
              {isRTL ? section.faIcon : section.enIcon}
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                {isRTL ? section.faTitle : section.enTitle}
              </h2>
            </div>
          </div>

          <div
            className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-gray-900
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-lg
              prose-ul:text-gray-700 prose-li:my-2
              prose-strong:text-gray-900 prose-strong:font-bold
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
              prose-img:rounded-2xl prose-img:shadow-xl prose-img:my-8 prose-img:w-full prose-img:h-auto"
            dangerouslySetInnerHTML={{ __html: section.content }}
          />
        </div>

        {/* Section Navigation */}
        <div className="mt-8 flex items-center justify-between gap-4 flex-wrap">
          {prevSection ? (
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={withLocalePath(validLocale, `/shahnameh/${storyId}/${getSlugForSection(prevSection.id)}`)}
                className="flex items-center gap-3 px-6 py-4 bg-white rounded-xl shadow-lg border-2 border-gray-200 hover:border-amber-400 transition-all font-semibold text-gray-700 hover:text-amber-700"
              >
                <BackIcon className="w-5 h-5" />
                <div className="text-right">
                  <div className="text-xs text-gray-500">{isRTL ? 'بخش قبلی' : 'Previous'}</div>
                  <div className="font-bold">
                    {isRTL ? prevSection.faTitle : prevSection.enTitle}
                  </div>
                </div>
              </Link>
            </motion.div>
          ) : (
            <div />
          )}

          {nextSection ? (
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={withLocalePath(validLocale, `/shahnameh/${storyId}/${getSlugForSection(nextSection.id)}`)}
                className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold"
              >
                <div className="text-left">
                  <div className="text-xs text-amber-100">{isRTL ? 'بخش بعدی' : 'Next'}</div>
                  <div className="font-bold">
                    {isRTL ? nextSection.faTitle : nextSection.enTitle}
                  </div>
                </div>
                <ForwardIcon className="w-5 h-5" />
              </Link>
            </motion.div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={withLocalePath(validLocale, '/shahnameh')}
                className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold"
              >
                <div className="text-left">
                  <div className="text-xs text-green-100">{isRTL ? 'بازگشت به فهرست' : 'Back to Index'}</div>
                  <div className="font-bold">{isRTL ? 'همه داستان‌ها' : 'All Stories'}</div>
                </div>
                <ForwardIcon className="w-5 h-5" />
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShahnamehSection;
