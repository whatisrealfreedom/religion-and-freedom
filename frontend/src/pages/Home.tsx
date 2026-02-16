import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { chapterApi, ChapterSummary } from '../services/api';
// کامنت شده - چون بخش progress غیرفعال است
// import { useProgress } from '../hooks/useProgress';
import FreedomBird from '../components/FreedomBird';
import AchievementBadge from '../components/AchievementBadge';
import FireQuoteSection from '../components/FireQuote';
import IranFlag from '../components/IranFlag';
import { useLocale } from '../i18n/LocaleProvider';
import { localizeChapter } from '../i18n/contentMaps';
import { withLocalePath } from '../i18n/localePath';
import { messages } from '../i18n/messages';
import { 
  KeyIcon, 
  Cog6ToothIcon, 
  ShieldCheckIcon, 
  FlagIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  LightBulbIcon,
  AcademicCapIcon,
  UserGroupIcon,
  GlobeAmericasIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';

const iconMap: { [key: string]: React.ComponentType<any> } = {
  key: KeyIcon,
  cogs: Cog6ToothIcon,
  'shield-alt': ShieldCheckIcon,
  flag: FlagIcon,
  brain: LightBulbIcon, // Using LightBulbIcon for AI chapter (brain icon)
  'balance-scale': AcademicCapIcon,
  users: UserGroupIcon,
  globe: GlobeAmericasIcon,
  rocket: RocketLaunchIcon,
};

const achievementsFa = [
  { id: 'first-step', icon: '🎯', title: 'اولین قدم', description: 'خواندن اولین فصل' },
  { id: 'trinity', icon: '🔺', title: 'سه‌گانه', description: 'خواندن 3 فصل' },
  { id: 'halfway', icon: '📊', title: 'نیمه راه', description: 'خواندن 5 فصل' },
  { id: 'complete', icon: '🏆', title: 'تکمیل', description: 'خواندن همه فصول' },
  { id: 'scholar', icon: '🎓', title: 'Scholar', description: '60 دقیقه مطالعه' },
];

const achievementsEn = [
  { id: 'first-step', icon: '🎯', title: 'First step', description: 'Read your first chapter' },
  { id: 'trinity', icon: '🔺', title: 'Trinity', description: 'Read 3 chapters' },
  { id: 'halfway', icon: '📊', title: 'Halfway', description: 'Read 5 chapters' },
  { id: 'complete', icon: '🏆', title: 'Completed', description: 'Read all chapters' },
  { id: 'scholar', icon: '🎓', title: 'Scholar', description: '60 minutes of reading' },
];

const Home: React.FC = () => {
  const [chapters, setChapters] = useState<ChapterSummary[]>([]);
  const [loading, setLoading] = useState(true);
  // کامنت شده - چون بخش progress غیرفعال است
  // const { progress } = useProgress();
  // ایجاد یک object dummy برای جلوگیری از خطا (اگر در آینده استفاده شود)
  const progress = { chaptersRead: [], totalChapters: 10, progressPercent: 0, achievements: [] };
  const { t, isRTL, locale } = useLocale();
  const ForwardIcon = isRTL ? ArrowLeftIcon : ArrowRightIcon;
  const achievements = locale === 'en' ? achievementsEn : achievementsFa;

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const data = await chapterApi.getAll();
        setChapters(data);
      } catch (error) {
        console.error('Failed to fetch chapters:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchChapters();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50 to-white">
      {/* Fire Quote Section - First thing user sees */}
      <FireQuoteSection />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-bg text-white py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32">
        <div className="absolute inset-0 bg-black/5"></div>
        {/* Animated background elements */}
        <div className="absolute top-10 right-10 sm:top-20 sm:right-20 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 sm:bottom-20 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-blue-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Hero Image Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-400/30 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-4 sm:mb-6 md:mb-8 flex justify-center"
            >
              <FreedomBird size="lg" animated />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight px-2"
            >
              <span className="block mb-1 sm:mb-2">{t('home.heroTitleTop')}</span>
              <span className="block text-yellow-300 drop-shadow-lg">{t('home.heroTitleBottom')}</span>
            </motion.h1>
            
            {t('home.heroSubtitle') && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-blue-50 mb-8 sm:mb-10 md:mb-12 max-w-4xl mx-auto leading-relaxed font-light px-4"
              >
                {t('home.heroSubtitle')}
              </motion.p>
            )}

            {/* Main CTA Button */}
            {chapters.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="mb-8 sm:mb-10 md:mb-12"
              >
                <Link
                  to={withLocalePath(locale, `/chapter/${chapters[0].id}`)}
                  className="inline-block group"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-lg sm:text-xl md:text-2xl px-8 sm:px-12 md:px-16 py-4 sm:py-5 md:py-6 rounded-xl sm:rounded-2xl shadow-2xl border-4 border-yellow-300/50 transition-all duration-300 hover:shadow-yellow-400/50 hover:shadow-2xl"
                  >
                    <span className="flex items-center justify-center gap-2 sm:gap-3">
                      <span>{t('home.heroCta')}</span>
                      <ForwardIcon
                        className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 ${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'} transition-transform`}
                      />
                    </span>
                  </motion.button>
                </Link>
              </motion.div>
            )}
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 text-center px-4"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/20 backdrop-blur-md rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-6 shadow-xl border border-white/30 w-full sm:w-auto min-w-[120px] cursor-default"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2">10</div>
                <div className="text-sm sm:text-base md:text-lg">{t('home.statsChapters')}</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/20 backdrop-blur-md rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-6 shadow-xl border border-white/30 w-full sm:w-auto min-w-[120px] cursor-default"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2">∞</div>
                <div className="text-sm sm:text-base md:text-lg">{t('home.statsFreedom')}</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/20 backdrop-blur-md rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-6 shadow-xl border border-white/30 w-full sm:w-auto min-w-[120px] cursor-default"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2">100%</div>
                <div className="text-sm sm:text-base md:text-lg">{t('home.statsReal')}</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Slogan Section - God, Freedom, Family and Homeland */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-primary-50 via-white to-primary-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 bg-clip-text text-transparent mb-4 sm:mb-6">
              {t('home.slogan.title')}
            </h2>
            <div className="inline-block">
              <motion.div
                className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 px-6 py-3 bg-white rounded-2xl shadow-xl border-4 border-primary-500"
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {t('home.slogan.text')}
              </motion.div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
            {Object.entries((messages[locale].home?.slogan?.items || {}) as Record<string, any>).map(([key, item]: [string, any], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-primary-300 transform hover:-translate-y-2 h-full flex flex-col">
                  <div className="text-5xl sm:text-6xl mb-4 text-center transform group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    {key === 'homeland' ? (
                      <IranFlag size={80} className="max-w-full h-auto" />
                    ) : (
                      <span>{item.icon}</span>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 text-center">
                    {item.label}
                  </h3>
                  <p className={`text-sm sm:text-base text-gray-600 text-center leading-relaxed ${isRTL ? 'rtl' : 'ltr'}`}>
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapters Section */}
      <section className="py-12 sm:py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 sm:mb-6 px-2">
            {t('home.chaptersTitle')}
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            {t('home.chaptersSubtitle')}
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12 sm:py-16 md:py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 border-b-2 border-primary-500"></div>
            <p className="mt-4 sm:mt-6 text-gray-600 text-base sm:text-lg">{t('common.loading')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {chapters.map((chapter, index) => {
              const IconComponent = iconMap[chapter.icon] || KeyIcon;
              // کامنت شده - چون بخش progress غیرفعال است
              // const isRead = progress.chaptersRead.includes(chapter.id);
              const isRead = false; // همیشه false چون progress غیرفعال است
              const localized = localizeChapter(locale, chapter.number, { title: chapter.title, description: chapter.description });
              
              return (
                <motion.div
                  key={chapter.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`card group hover:scale-105 relative overflow-hidden ${
                    isRead ? 'ring-2 ring-primary-300 bg-gradient-to-br from-primary-50 to-white' : ''
                  }`}
                >
                  {/* کامنت شده - چون بخش progress غیرفعال است */}
                  {/* {isRead && (
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-primary-500 text-white rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-bold shadow-lg">
                      ✓
                    </div>
                  )} */}
                  
                  <Link to={withLocalePath(locale, `/chapter/${chapter.id}`)} className="block h-full">
                    <motion.div 
                      whileHover={{ x: -4 }}
                      className={`flex items-start space-x-3 sm:space-x-4 ${isRTL ? 'space-x-reverse' : ''} mb-3 sm:mb-4 h-full`}
                    >
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex-shrink-0 ${
                        isRead ? 'ring-2 sm:ring-4 ring-primary-200' : ''
                      }`}>
                        <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col h-full">
                        <div className="text-xs sm:text-sm text-primary-600 font-bold mb-1 sm:mb-2">
                          {t('chapter.chapterLabel')} {chapter.number}
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-primary-600 transition-colors leading-tight">
                          {localized.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-5 flex-grow">
                          {localized.description}
                        </p>
                        <div className="flex items-center justify-between text-xs sm:text-sm flex-wrap gap-2 mt-auto">
                          <span className="text-gray-500 font-medium flex items-center gap-1">
                            <span>⏱️</span>
                            <span>
                              {chapter.read_time} {t('chapter.minutes')}
                            </span>
                          </span>
                          <span className="flex items-center text-primary-600 font-semibold group-hover:text-primary-700 transition-all group-hover:gap-2 gap-1">
                            <span>{t('common.startReading')}</span>
                            <ForwardIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'} transition-transform`} />
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* Beyond Chapters / Special Section */}
      <section className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            {isRTL ? 'فراتر از فصل‌ها' : 'Beyond the Chapters'}
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-3xl">
            {isRTL
              ? 'این بخش‌ها خارج از ساختار فصل‌ها هستند: تحلیل‌های ویژه، بحث و گفتگو، و منابع تکمیلی.'
              : 'These are outside the chapter structure: special analyses, discussions, and extra resources.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Reformists Enemy - خیلی مهم */}
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
            className="relative bg-gradient-to-br from-red-50 to-red-100 rounded-2xl border-4 border-red-500 shadow-lg hover:shadow-2xl transition-all transform hover:scale-105"
            style={{ boxShadow: '0 10px 30px rgba(239, 68, 68, 0.3)' }}
          >
            <Link to={withLocalePath(locale, '/special/reformists-enemy')} className="block p-6 h-full">
              <div className="absolute top-1 right-1 sm:top-2 sm:right-2 z-20">
                <span className="inline-block bg-red-600 text-white text-[7px] sm:text-[8px] font-black px-1 sm:px-1.5 py-0.5 rounded blinking-text whitespace-nowrap" style={{ transform: 'rotate(-15deg)', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                  {isRTL ? '⚠️ خیلی مهم' : '⚠️ IMPORTANT'}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 text-white flex items-center justify-center font-black text-xl shadow-lg flex-shrink-0">
                  ⚠️
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-extrabold text-red-900 mb-1 flex items-center gap-1.5 flex-wrap">
                    <span>{isRTL ? 'اصلاحات دشمن' : 'Reformists Enemy of'}</span>
                    <span className="relative inline-flex items-center">
                      <span className="absolute -top-4 z-20" style={isRTL ? { left: '50%', transform: 'translateX(-50%) rotate(-15deg)' } : { right: '50%', transform: 'translateX(50%) rotate(-15deg)' }}>
                        <span className="inline-block bg-red-600 text-white text-[7px] sm:text-[8px] font-black px-1 sm:px-1.5 py-0.5 rounded blinking-text whitespace-nowrap" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                          {isRTL ? '⚠️ خیلی مهم' : '⚠️ IMPORTANT'}
                        </span>
                      </span>
                      <span>{isRTL ? 'ایران' : 'Iran'}</span>
                    </span>
                  </h3>
                  <p className="text-sm text-red-800 leading-relaxed font-semibold">
                    {isRTL
                      ? 'تحلیل عمیق درباره بزرگ‌ترین دشمن ایران و میراثش.'
                      : 'Deep analysis on Iran\'s greatest enemy and its heritage.'}
                  </p>
                  <div className="mt-4 text-sm font-bold text-red-700">
                    {isRTL ? 'مطالعه فوری' : 'Read Now'} →
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Special analysis */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all"
          >
            <Link to={withLocalePath(locale, '/special/iran-1408')} className="block p-6 h-full">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 text-white flex items-center justify-center font-black text-xl">
                  ✦
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-extrabold text-gray-900 mb-1">
                    {isRTL ? 'تحلیل ویژه: ایران و افق ۱۴۰۸' : 'Special: Iran & the 2029 Horizon'}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {isRTL
                      ? 'بازنویسی و تکمیل یک تحلیل درباره آخرالزمان‌باوری سیاسی، گیم‌تئوری و ژئوپولیتیک.'
                      : 'A structured analysis on apocalyptic political narratives, game theory, and geopolitics.'}
                  </p>
                  <div className="mt-4 text-sm font-semibold text-primary-700">
                    {isRTL ? 'مشاهده صفحه' : 'Open page'} →
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Other links */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all"
          >
            <div className="p-6 h-full">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-white flex items-center justify-center font-black text-xl">
                  ↗
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-extrabold text-gray-900 mb-1">
                    {isRTL ? 'لینک‌های دیگر' : 'Other links'}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {isRTL ? 'منابع و نقدها را هم از اینجا سریع باز کنید.' : 'Quick access to resources and critiques.'}
                  </p>
                  <div className="flex flex-col gap-2">
                    <Link
                      to={withLocalePath(locale, '/resources')}
                      className="text-sm font-semibold text-gray-800 hover:text-primary-700 transition-colors"
                    >
                      {isRTL ? 'منابع' : 'Resources'} →
                    </Link>
                    <Link
                      to={withLocalePath(locale, '/critics')}
                      className="text-sm font-semibold text-gray-800 hover:text-primary-700 transition-colors"
                    >
                      {isRTL ? 'نقدها' : 'Critics'} →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 28 Mordad Section (Below Beyond Chapters) */}
      <section className="pb-10 sm:pb-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            {isRTL ? 'کودتای ۲۸ مرداد: حقیقت یا تحریف؟' : '28 Mordad: Truth or Distortion?'}
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-3xl">
            {isRTL
              ? 'یک پرونده مستقل و فصل‌بندی‌شده: شکستن روایت‌های ساده‌ساز، خواندن سندها، و ترجمه تاریخ به «درس‌های آزادی واقعی و حقوق مالکیت».'
              : 'A standalone dossier: map narratives, read documents, and translate history into lessons for real freedom.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Main 28 Mordad Card */}
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0 }}
            className="relative overflow-hidden rounded-2xl border-4 border-emerald-600 shadow-lg hover:shadow-2xl transition-all transform hover:scale-[1.03]"
            style={{ boxShadow: '0 10px 30px rgba(16, 185, 129, 0.22)' }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.10) 0%, rgba(255,255,255,0.88) 45%, rgba(239,68,68,0.10) 100%)' }} />
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-rose-400/20 rounded-full blur-3xl pointer-events-none" />

            <Link to={withLocalePath(locale, '/28mordad')} className="relative block p-6 h-full">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white flex items-center justify-center font-black text-xl shadow-lg flex-shrink-0">
                  ۲۸
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-extrabold text-gray-900 mb-1">
                    {isRTL ? 'کودتای ۲۸ مرداد: حقیقت یا تحریف؟' : '28 Mordad: Truth or Distortion?'}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed font-semibold">
                    {isRTL
                      ? '۶ فصل + جدول روایت‌ها + تایم‌لاین. از زمینه تاریخی تا نقش مصدق و درس آزادی واقعی.'
                      : '6 chapters + narrative map + timeline.'}
                  </p>
                  <div className="mt-4 text-sm font-bold text-emerald-800">
                    {isRTL ? 'ورود به پرونده' : 'Open dossier'} →
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Quick Start: Chapter 1 */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all"
          >
            <Link to={withLocalePath(locale, '/28mordad/1')} className="block p-6 h-full">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white flex items-center justify-center font-black text-xl">
                  ۱
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-extrabold text-gray-900 mb-1">
                    {isRTL ? 'شروع سریع: زمینه تاریخی' : 'Quick start: Context'}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {isRTL ? 'چرا ۲۸ مرداد رخ داد؟ زمینه را می‌چینیم.' : 'Build context before labeling.'}
                  </p>
                  <div className="mt-4 text-sm font-semibold text-primary-700">
                    {isRTL ? 'مطالعه فصل ۱' : 'Open chapter 1'} →
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Quick Start: Chapter 2 */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all"
          >
            <Link to={withLocalePath(locale, '/28mordad/2')} className="block p-6 h-full">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-white flex items-center justify-center font-black text-xl">
                  ۲
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-extrabold text-gray-900 mb-1">
                    {isRTL ? 'محور اصلی: نقش مصدق' : 'Core: Mossadegh'}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {isRTL ? 'نقد اسطوره و نسبتِ دموکراسی با نهادها.' : 'Myth vs institutions.'}
                  </p>
                  <div className="mt-4 text-sm font-semibold text-primary-700">
                    {isRTL ? 'مطالعه فصل ۲' : 'Open chapter 2'} →
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Shahnameh Section */}
      <section className="pb-10 sm:pb-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            {isRTL ? 'شاهنامه فردوسی: گنجینه ادبیات فارسی' : 'Shahnameh by Ferdowsi: Treasure of Persian Literature'}
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-3xl">
            {isRTL
              ? 'سفر به اعماق اسطوره‌ها و حماسه‌های ایرانی. در این بخش، داستان‌های شاهنامه را با تحلیل عمیق، تصاویر زیبا، و منابع معتبر تجربه کنید. هر داستان چندین بخش دارد: متن اصلی، تحلیل و تفسیر، تصاویر و نگاره‌ها، و منابع و رفرنس‌ها.'
              : 'Journey into the depths of Iranian myths and epics. Experience Shahnameh stories with deep analysis, beautiful images, and reliable sources. Each story has multiple sections: original text, analysis and commentary, images and illustrations, and references.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Shahnameh Card */}
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0 }}
            className="relative overflow-hidden rounded-2xl border-4 border-amber-600 shadow-lg hover:shadow-2xl transition-all transform hover:scale-[1.03]"
            style={{ boxShadow: '0 10px 30px rgba(245, 158, 11, 0.22)' }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.10) 0%, rgba(255,255,255,0.88) 45%, rgba(249,115,22,0.10) 100%)' }} />
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-orange-400/20 rounded-full blur-3xl pointer-events-none" />

            <Link to={withLocalePath(locale, '/shahnameh')} className="relative block p-6 h-full">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-600 to-orange-700 text-white flex items-center justify-center font-black text-xl shadow-lg flex-shrink-0">
                  📜
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-extrabold text-gray-900 mb-1">
                    {isRTL ? 'شاهنامه فردوسی' : 'Shahnameh by Ferdowsi'}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed font-semibold">
                    {isRTL
                      ? 'داستان‌های حماسی با تحلیل، تصاویر، و منابع کامل. هر داستان چندین بخش دارد: متن، تحلیل، نگاره‌ها، و رفرنس‌ها.'
                      : 'Epic stories with analysis, images, and complete references. Each story has multiple sections: text, analysis, illustrations, and references.'}
                  </p>
                  <div className="mt-4 text-sm font-bold text-amber-800">
                    {isRTL ? 'ورود به بخش شاهنامه' : 'Enter Shahnameh section'} →
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Quick Start: First Story */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all"
          >
            <Link to={withLocalePath(locale, '/shahnameh/feraydun')} className="block p-6 h-full">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-600 to-orange-700 text-white flex items-center justify-center font-black text-xl">
                  👑
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-extrabold text-gray-900 mb-1">
                    {isRTL ? 'شروع سریع: فریدون' : 'Quick start: Fereydun'}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {isRTL ? 'داستان فریدون و نابودی ضحاک' : 'The story of Fereydun and the fall of Zahhak'}
                  </p>
                  <div className="mt-4 text-sm font-semibold text-primary-700">
                    {isRTL ? 'مطالعه داستان' : 'Read story'} →
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all"
          >
            <div className="p-6 h-full">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white flex items-center justify-center font-black text-xl">
                  ⚔️
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-extrabold text-gray-900 mb-1">
                    {isRTL ? 'داستان‌های برجسته' : 'Featured Stories'}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {isRTL ? 'رستم و سهراب، سیاوش، فریدون و بسیاری داستان‌های دیگر' : 'Rostam and Sohrab, Siyavash, Fereydun and many more'}
                  </p>
                  <div className="text-xs text-gray-500 space-y-1">
                    <div className="flex items-center gap-2">
                      <span>📚</span>
                      <span>{isRTL ? 'تحلیل عمیق' : 'Deep analysis'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🖼️</span>
                      <span>{isRTL ? 'نگاره‌های زیبا' : 'Beautiful illustrations'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📖</span>
                      <span>{isRTL ? 'منابع معتبر' : 'Reliable sources'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Inspirational Quote Section */}
      <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 py-16 sm:py-20 md:py-24 my-12 sm:my-16 md:my-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-5 right-5 sm:top-10 sm:right-10 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-5 left-5 sm:bottom-10 sm:left-10 w-64 h-64 sm:w-80 sm:w-80 md:w-96 md:h-96 bg-blue-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.blockquote
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-relaxed drop-shadow-2xl px-2 mb-6 sm:mb-8"
          >
            <span className="block mb-4 sm:mb-6 text-yellow-300 text-4xl sm:text-5xl md:text-6xl leading-none">"</span>
            <span className="block mb-4 sm:mb-6">{t('home.quote')}</span>
            <span className="block mt-4 sm:mt-6 text-yellow-300 text-4xl sm:text-5xl md:text-6xl leading-none">"</span>
          </motion.blockquote>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6 sm:mt-8 md:mt-10 text-lg sm:text-xl md:text-2xl text-blue-100 font-semibold"
          >
            {t('home.quoteAuthor')}
          </motion.p>
        </div>
      </section>
    </div>
  );
};

export default Home;
