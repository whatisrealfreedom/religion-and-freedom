import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLocale } from '../i18n/LocaleProvider';
import { withLocalePath } from '../i18n/localePath';
import { 
  BookOpenIcon, 
  SparklesIcon,
  PhotoIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  ArrowLeftIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

// نوع‌شناسی داستان‌ها
type StoryCategory = 'epic' | 'legend' | 'myth' | 'historical';

type Story = {
  id: string;
  faTitle: string;
  faSubtitle: string;
  enTitle: string;
  enSubtitle: string;
  category: StoryCategory;
  icon: string;
  description: string;
  sections: {
    text: boolean;
    analysis: boolean;
    images: boolean;
    references: boolean;
    commentary: boolean;
  };
  pages: number;
  readingTime: number;
  featured: boolean;
};

// داستان‌های شاهنامه - این ساختار placeholder است و می‌تواند از API یا فایل i18n بیاید
const stories: Story[] = [
  {
    id: 'zahhak',
    faTitle: 'ضحاک',
    faSubtitle: 'پادشاه اهریمنی',
    enTitle: 'Zahhak',
    enSubtitle: 'The Demon King',
    category: 'epic',
    icon: '🐍',
    description: 'داستان ضحاک و هزاره ظلم و ستم - دوازده بخش کامل',
    sections: {
      text: true,
      analysis: true,
      images: true,
      references: true,
      commentary: true,
    },
    pages: 120,
    readingTime: 180,
    featured: true,
  },
  {
    id: 'feraydun',
    faTitle: 'فریدون',
    faSubtitle: 'پادشاه دادگر',
    enTitle: 'Fereydun',
    enSubtitle: 'The Just King',
    category: 'epic',
    icon: '👑',
    description: 'داستان فریدون و نابودی ضحاک و حکومت دادگرانه',
    sections: {
      text: true,
      analysis: true,
      images: true,
      references: true,
      commentary: true,
    },
    pages: 45,
    readingTime: 120,
    featured: true,
  },
  {
    id: 'rostam-sohrab',
    faTitle: 'رستم و سهراب',
    faSubtitle: 'تراژدی پدر و پسر',
    enTitle: 'Rostam and Sohrab',
    enSubtitle: 'Father and Son Tragedy',
    category: 'epic',
    icon: '⚔️',
    description: 'یکی از زیباترین و غم‌انگیزترین داستان‌های شاهنامه',
    sections: {
      text: true,
      analysis: true,
      images: true,
      references: true,
      commentary: true,
    },
    pages: 68,
    readingTime: 150,
    featured: true,
  },
  {
    id: 'siyavash',
    faTitle: 'سیاوش',
    faSubtitle: 'قهرمان پاک',
    enTitle: 'Siyavash',
    enSubtitle: 'The Pure Hero',
    category: 'epic',
    icon: '🌟',
    description: 'داستان سیاوش و عدالت و پاکی او',
    sections: {
      text: true,
      analysis: true,
      images: true,
      references: true,
      commentary: true,
    },
    pages: 52,
    readingTime: 135,
    featured: false,
  },
];

function categoryStyles(category: StoryCategory) {
  switch (category) {
    case 'epic':
      return 'from-amber-600 to-orange-700';
    case 'legend':
      return 'from-purple-600 to-indigo-700';
    case 'myth':
      return 'from-cyan-600 to-blue-700';
    case 'historical':
      return 'from-emerald-600 to-teal-700';
    default:
      return 'from-gray-600 to-gray-700';
  }
}

function categoryLabel(category: StoryCategory, isRTL: boolean) {
  const labels: Record<StoryCategory, { fa: string; en: string }> = {
    epic: { fa: 'حماسی', en: 'Epic' },
    legend: { fa: 'افسانه', en: 'Legend' },
    myth: { fa: 'اسطوره', en: 'Myth' },
    historical: { fa: 'تاریخی', en: 'Historical' },
  };
  return isRTL ? labels[category].fa : labels[category].en;
}

const ShahnamehIndex: React.FC = () => {
  const { locale } = useParams<{ locale: string }>();
  const { isRTL } = useLocale();
  const validLocale = (locale === 'fa' || locale === 'en') ? locale : 'fa';
  const ForwardIcon = isRTL ? ArrowLeftIcon : ArrowRightIcon;
  const BackIcon = isRTL ? ArrowRightIcon : ArrowLeftIcon;

  const featuredStories = stories.filter(s => s.featured);
  const otherStories = stories.filter(s => !s.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            to={withLocalePath(validLocale, '/')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
          >
            <BackIcon className="w-4 h-4" />
            {isRTL ? 'بازگشت به خانه' : 'Back to Home'}
          </Link>
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <div className="relative overflow-hidden rounded-3xl shadow-2xl border-4 border-amber-600/30"
            style={{
              background: 'linear-gradient(135deg, rgba(251,191,36,0.15) 0%, rgba(255,255,255,0.95) 40%, rgba(249,115,22,0.15) 100%)',
            }}
          >
            {/* Decorative background elements */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl" />
            </div>

            <div className="relative p-8 sm:p-10 md:p-12 lg:p-16">
              <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 border-2 border-amber-600/30 text-amber-900 font-bold">
                  <BookOpenIcon className="w-5 h-5" />
                  <span>{isRTL ? 'گنجینه ادبیات فارسی' : 'Treasure of Persian Literature'}</span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-4 leading-tight">
                {isRTL ? (
                  <>
                    <span className="block mb-2">شاهنامه</span>
                    <span className="block text-amber-600">فردوسی</span>
                  </>
                ) : (
                  <>
                    <span className="block mb-2">Shahnameh</span>
                    <span className="block text-amber-600">by Ferdowsi</span>
                  </>
                )}
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mb-8">
                {isRTL
                  ? 'سفر به اعماق اسطوره‌ها و حماسه‌های ایرانی. در این بخش، داستان‌های شاهنامه را با تحلیل عمیق، تصاویر زیبا، و منابع معتبر تجربه کنید. هر داستان چندین بخش دارد: متن اصلی، تحلیل و تفسیر، تصاویر و نگاره‌ها، و منابع و رفرنس‌ها.'
                  : 'Journey into the depths of Iranian myths and epics. Experience Shahnameh stories with deep analysis, beautiful images, and reliable sources. Each story has multiple sections: original text, analysis and commentary, images and illustrations, and references.'}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-amber-200 p-4 text-center">
                  <div className="text-3xl font-black text-amber-700 mb-1">{stories.length}+</div>
                  <div className="text-sm text-gray-700 font-semibold">{isRTL ? 'داستان' : 'Stories'}</div>
                </div>
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-amber-200 p-4 text-center">
                  <div className="text-3xl font-black text-amber-700 mb-1">{stories.reduce((sum, s) => sum + s.pages, 0)}+</div>
                  <div className="text-sm text-gray-700 font-semibold">{isRTL ? 'صفحه' : 'Pages'}</div>
                </div>
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-amber-200 p-4 text-center">
                  <div className="text-3xl font-black text-amber-700 mb-1">
                    {Math.round(stories.reduce((sum, s) => sum + s.readingTime, 0) / 60)}+
                  </div>
                  <div className="text-sm text-gray-700 font-semibold">{isRTL ? 'ساعت مطالعه' : 'Hours'}</div>
                </div>
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-amber-200 p-4 text-center">
                  <div className="text-3xl font-black text-amber-700 mb-1">∞</div>
                  <div className="text-sm text-gray-700 font-semibold">{isRTL ? 'حکمت' : 'Wisdom'}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Featured Stories */}
        {featuredStories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {isRTL ? 'داستان‌های برجسته' : 'Featured Stories'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredStories.map((story, idx) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                  className="group"
                >
                  <Link
                    to={withLocalePath(validLocale, `/shahnameh/${story.id}`)}
                    className="block h-full"
                  >
                    <div className="relative overflow-hidden bg-white rounded-3xl shadow-xl hover:shadow-2xl border-2 border-gray-200 hover:border-amber-400 transition-all transform hover:scale-[1.02] h-full">
                      {/* Background gradient */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${categoryStyles(story.category)} opacity-5`}
                      />

                      {/* Featured badge */}
                      <div className="absolute top-4 right-4 z-10">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-bold shadow-lg">
                          <SparklesIcon className="w-3 h-3" />
                          {isRTL ? 'برجسته' : 'Featured'}
                        </span>
                      </div>

                      <div className="relative p-6 sm:p-8 h-full flex flex-col">
                        <div className="flex items-start gap-4 mb-4">
                          <div
                            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${categoryStyles(story.category)} text-white flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform`}
                          >
                            {story.icon}
                          </div>
                          <div className="flex-1">
                            <div className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-bold mb-2">
                              {categoryLabel(story.category, isRTL)}
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-1">
                              {isRTL ? story.faTitle : story.enTitle}
                            </h3>
                            <p className="text-sm text-gray-600 font-semibold">
                              {isRTL ? story.faSubtitle : story.enSubtitle}
                            </p>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-6 leading-relaxed flex-grow">
                          {story.description}
                        </p>

                        {/* Sections indicator */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {story.sections.text && (
                            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold">
                              <DocumentTextIcon className="w-3 h-3" />
                              {isRTL ? 'متن' : 'Text'}
                            </div>
                          )}
                          {story.sections.analysis && (
                            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-purple-50 text-purple-700 text-xs font-semibold">
                              <AcademicCapIcon className="w-3 h-3" />
                              {isRTL ? 'تحلیل' : 'Analysis'}
                            </div>
                          )}
                          {story.sections.images && (
                            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-pink-50 text-pink-700 text-xs font-semibold">
                              <PhotoIcon className="w-3 h-3" />
                              {isRTL ? 'تصاویر' : 'Images'}
                            </div>
                          )}
                          {story.sections.references && (
                            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-green-50 text-green-700 text-xs font-semibold">
                              <BookOpenIcon className="w-3 h-3" />
                              {isRTL ? 'منابع' : 'Refs'}
                            </div>
                          )}
                        </div>

                        {/* Footer stats */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <span>📄</span>
                              <span>{story.pages} {isRTL ? 'صفحه' : 'pages'}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <span>⏱️</span>
                              <span>{story.readingTime} {isRTL ? 'دقیقه' : 'min'}</span>
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-amber-700 font-bold group-hover:gap-3 transition-all">
                            <span>{isRTL ? 'مطالعه' : 'Read'}</span>
                            <ForwardIcon className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Stories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {isRTL ? 'همه داستان‌ها' : 'All Stories'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story, idx) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
                className="group"
              >
                <Link
                  to={withLocalePath(validLocale, `/shahnameh/${story.id}`)}
                  className="block h-full"
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 hover:border-amber-400 transition-all transform hover:scale-[1.02] h-full">
                    <div className="p-6 h-full flex flex-col">
                      <div className="flex items-start gap-3 mb-4">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${categoryStyles(story.category)} text-white flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform`}
                        >
                          {story.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="inline-block px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs font-bold mb-1">
                            {categoryLabel(story.category, isRTL)}
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">
                            {isRTL ? story.faTitle : story.enTitle}
                          </h3>
                          <p className="text-xs text-gray-600 truncate">
                            {isRTL ? story.faSubtitle : story.enSubtitle}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 mb-4 leading-relaxed line-clamp-2 flex-grow">
                        {story.description}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                        <div className="text-xs text-gray-600">
                          <span>{story.pages} {isRTL ? 'صفحه' : 'p'}</span>
                          <span className="mx-2">•</span>
                          <span>{story.readingTime} {isRTL ? 'دقیقه' : 'min'}</span>
                        </div>
                        <div className="flex items-center gap-1 text-amber-700 font-semibold text-sm group-hover:gap-2 transition-all">
                          <span>{isRTL ? 'مطالعه' : 'Read'}</span>
                          <ForwardIcon className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 rounded-3xl bg-gradient-to-r from-amber-600 to-orange-600 p-8 sm:p-10 md:p-12 text-center text-white shadow-2xl"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4">
            {isRTL ? 'سفر خود را آغاز کنید' : 'Start Your Journey'}
          </h3>
          <p className="text-lg sm:text-xl text-amber-50 mb-6 max-w-2xl mx-auto">
            {isRTL
              ? 'شاهنامه فردوسی یکی از بزرگ‌ترین آثار ادبی جهان است. با ما همراه شوید و به اعماق این حماسه‌های جاودان سفر کنید.'
              : 'Ferdowsi\'s Shahnameh is one of the greatest literary works in the world. Join us and journey into the depths of these eternal epics.'}
          </p>
          {stories.length > 0 && (
            <Link
              to={withLocalePath(validLocale, `/shahnameh/${stories[0].id}`)}
              className="inline-flex items-center gap-3 bg-white text-amber-700 font-bold text-lg px-8 py-4 rounded-xl hover:bg-amber-50 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              <span>{isRTL ? 'شروع از اولین داستان' : 'Start with First Story'}</span>
              <ForwardIcon className="w-6 h-6" />
            </Link>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ShahnamehIndex;
