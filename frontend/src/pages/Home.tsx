import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { chapterApi, ChapterSummary } from '../services/api';
import { useProgress } from '../hooks/useProgress';
import FreedomBird from '../components/FreedomBird';
import AchievementBadge from '../components/AchievementBadge';
import { 
  KeyIcon, 
  Cog6ToothIcon, 
  ShieldCheckIcon, 
  FlagIcon,
  ArrowLeftIcon,
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
  brain: LightBulbIcon,
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
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-bg text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-black/5"></div>
        {/* Animated background elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-8 flex justify-center"
            >
              <FreedomBird size="lg" animated />
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="block mb-2">سفر به سوی</span>
              <span className="block text-yellow-300 drop-shadow-lg">آزادی واقعی</span>
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-blue-50 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              نظریه‌ای انقلابی از محمدعلی جنت‌خواه که دین و آزادی را برای همیشه آشتی می‌دهد
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/20 backdrop-blur-md rounded-2xl px-8 py-6 shadow-xl border border-white/30"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">9</div>
                <div className="text-base md:text-lg">فصل جامع</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/20 backdrop-blur-md rounded-2xl px-8 py-6 shadow-xl border border-white/30"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">∞</div>
                <div className="text-base md:text-lg">آزادی</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white/20 backdrop-blur-md rounded-2xl px-8 py-6 shadow-xl border border-white/30"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">100%</div>
                <div className="text-base md:text-lg">واقعی</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Progress & Achievements Section */}
      {progress.chaptersRead.length > 0 && (
        <section className="py-12 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">پیشرفت شما</h2>
              <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold text-gray-700">
                    {progress.chaptersRead.length} از {progress.totalChapters} فصل
                  </span>
                  <span className="text-2xl font-bold text-primary-600">
                    {Math.round(progress.progressPercent)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
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
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">دستاوردهای شما</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
            فصول آزادی
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            سفر کامل به درک آزادی واقعی از طریق 9 فصل جامع و عمیق با تحلیل‌های دقیق
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500"></div>
            <p className="mt-6 text-gray-600 text-lg">در حال بارگذاری...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    <div className="absolute top-4 left-4 bg-primary-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">
                      ✓
                    </div>
                  )}
                  
                  <Link to={`/chapter/${chapter.id}`}>
                    <div className="flex items-start space-x-4 space-x-reverse mb-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform ${
                        isRead ? 'ring-4 ring-primary-200' : ''
                      }`}>
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-primary-600 font-bold mb-2">
                          فصل {chapter.number}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-primary-600 transition-colors leading-tight">
                          {chapter.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-5 text-base">
                          {chapter.description}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500 font-medium">
                            ⏱️ {chapter.read_time} دقیقه
                          </span>
                          <span className="flex items-center text-primary-600 font-semibold group-hover:text-primary-700 transition-colors">
                            مطالعه
                            <ArrowLeftIcon className="w-5 h-5 mr-1" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* Quote Section */}
      <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 py-20 my-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.blockquote
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-relaxed drop-shadow-lg"
          >
            «آزادی واقعی، مالکیت مطلق انسان بر جسم، ذهن، زمان و دارایی خویش است — و دین،
            تنها نظام پایدار تاریخ برای حفاظت از این مالکیت.»
          </motion.blockquote>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-xl text-blue-100 font-medium"
          >
            — محمدعلی جنت‌خواه
          </motion.p>
        </div>
      </section>
    </div>
  );
};

export default Home;
