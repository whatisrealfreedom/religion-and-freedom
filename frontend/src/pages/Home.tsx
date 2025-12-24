import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { chapterApi, ChapterSummary } from '../services/api';
import { useProgress } from '../hooks/useProgress';
import FreedomBird from '../components/FreedomBird';
import AchievementBadge from '../components/AchievementBadge';
import FireQuoteSection from '../components/FireQuote';
import { useLocale } from '../i18n/LocaleProvider';
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

const achievements = [
  { id: 'first-step', icon: '🎯', title: 'اولین قدم', description: 'خواندن اولین فصل' },
  { id: 'trinity', icon: '🔺', title: 'سه‌گانه', description: 'خواندن 3 فصل' },
  { id: 'halfway', icon: '📊', title: 'نیمه راه', description: 'خواندن 5 فصل' },
  { id: 'complete', icon: '🏆', title: 'تکمیل', description: 'خواندن همه فصول' },
  { id: 'scholar', icon: '🎓', title: 'عالم', description: '60 دقیقه مطالعه' },
];

const Home: React.FC = () => {
  const [chapters, setChapters] = useState<ChapterSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const { progress } = useProgress();
  const { t, isRTL } = useLocale();
  const ForwardIcon = isRTL ? ArrowLeftIcon : ArrowRightIcon;

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
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-blue-50 mb-8 sm:mb-10 md:mb-12 max-w-4xl mx-auto leading-relaxed font-light px-4"
            >
              {t('home.heroSubtitle')}
            </motion.p>

            {/* Main CTA Button */}
            {chapters.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="mb-8 sm:mb-10 md:mb-12"
              >
                <Link
                  to={`/chapter/${chapters[0].id}`}
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

      {/* Progress & Achievements Section */}
      {progress.chaptersRead.length > 0 && (
        <section className="py-8 sm:py-10 md:py-12 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">{t('nav.progress')}</h2>
              <div className="max-w-2xl mx-auto px-2">
                <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
                  <span className="text-base sm:text-lg font-semibold text-gray-700">
                    {progress.chaptersRead.length} از {progress.totalChapters} فصل
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-primary-600">
                    {Math.round(progress.progressPercent)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 overflow-hidden shadow-inner">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress.progressPercent}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>

            {progress.achievements.length > 0 && (
              <div className="mt-6 sm:mt-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">دستاوردهای شما</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                  {achievements.map((achievement) => (
                    <AchievementBadge
                      key={achievement.id}
                      icon={achievement.icon}
                      title={achievement.title}
                      description={achievement.description}
                      unlocked={progress.achievements.includes(achievement.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

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
              const isRead = progress.chaptersRead.includes(chapter.id);
              
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
                  {isRead && (
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-primary-500 text-white rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-bold shadow-lg">
                      ✓
                    </div>
                  )}
                  
                  <Link to={`/chapter/${chapter.id}`} className="block h-full">
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
                          فصل {chapter.number}
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-primary-600 transition-colors leading-tight">
                          {chapter.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-5 flex-grow">
                          {chapter.description}
                        </p>
                        <div className="flex items-center justify-between text-xs sm:text-sm flex-wrap gap-2 mt-auto">
                          <span className="text-gray-500 font-medium flex items-center gap-1">
                            <span>⏱️</span>
                            <span>{chapter.read_time} دقیقه</span>
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
