import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useLocale } from '../../../i18n/LocaleProvider';
import { withLocalePath } from '../../../i18n/localePath';
import { ArrowLeftIcon, ArrowRightIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-16 left-4 z-40">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white shadow-xl rounded-full p-3 border-2 border-amber-400 hover:bg-amber-50 transition-all"
        >
          {sidebarOpen ? (
            <XMarkIcon className="w-6 h-6 text-amber-700" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-amber-700" />
          )}
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Link
              to={withLocalePath(validLocale, '/shahnameh')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              {isRTL ? 'فهرست شاهنامه' : 'Shahnameh Index'}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-sm font-semibold text-gray-700">
              {isRTL ? story.faTitle : story.enTitle}
            </span>
          </div>
          <Link
            to={withLocalePath(validLocale, '/')}
            className="text-sm font-semibold text-gray-700 hover:text-primary-700 transition-colors"
          >
            {isRTL ? 'خانه' : 'Home'}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Sidebar - Table of Contents */}
          <aside
            className={`lg:col-span-3 ${
              sidebarOpen ? 'fixed inset-0 lg:static' : 'hidden lg:block'
            } z-30 lg:z-auto`}
          >
            <div className="lg:sticky lg:top-24 h-full">
              {/* Mobile Overlay */}
              {sidebarOpen && (
                <div
                  className="lg:hidden fixed inset-0 bg-black/50 z-[-1]"
                  onClick={() => setSidebarOpen(false)}
                />
              )}

              <motion.div
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-3xl shadow-2xl border-2 border-amber-200 p-6 lg:p-8 h-full lg:max-h-[calc(100vh-8rem)] overflow-y-auto"
              >
                {/* Story Header in Sidebar */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h2 className="text-2xl font-black text-gray-900 mb-2">
                    {isRTL ? story.faTitle : story.enTitle}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {isRTL ? story.faSubtitle : story.enSubtitle}
                  </p>
                </div>

                {/* Section Navigation */}
                <nav className="space-y-2">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                    {isRTL ? 'بخش‌ها' : 'Sections'}
                  </div>
                  {story.sections.map((s) => {
                    const sSlug = getSlugForSection(s.id);
                    const sUrl = withLocalePath(validLocale, `/shahnameh/${storyId}/${sSlug}`);
                    const isActive = s.id === sectionId;

                    return (
                      <Link
                        key={s.id}
                        to={sUrl}
                        onClick={() => setSidebarOpen(false)}
                        className={`w-full flex items-start gap-2 px-3 py-2.5 rounded-lg text-right transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                            : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <span className="text-base flex-shrink-0 mt-0.5">{isRTL ? s.faIcon : s.enIcon}</span>
                        <span className={`flex-1 text-xs font-medium leading-relaxed min-w-0 line-clamp-2 ${isActive ? 'text-white' : 'text-gray-700'}`}>
                          {isRTL ? s.faTitle : s.enTitle}
                        </span>
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0 mt-1"
                          />
                        )}
                      </Link>
                    );
                  })}
                </nav>

                {/* Progress Indicator */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                    {isRTL ? 'پیشرفت' : 'Progress'}
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${((currentIndex + 1) / story.sections.length) * 100}%`,
                      }}
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                    />
                  </div>
                  <div className="mt-2 text-xs text-gray-600 text-center">
                    {currentIndex + 1} / {story.sections.length}
                  </div>
                </div>
              </motion.div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={sectionId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl shadow-xl border-2 border-amber-200 p-8 sm:p-10 md:p-12"
              >
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

                {/* Section Content */}
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
              </motion.div>
            </AnimatePresence>

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
          </main>
        </div>
      </div>
    </div>
  );
};

export default ShahnamehSection;
