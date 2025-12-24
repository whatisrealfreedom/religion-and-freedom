import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { resourceApi, PDFResource } from '../services/api';
import {
  FilmIcon,
  DocumentArrowDownIcon,
  LinkIcon,
  AcademicCapIcon,
  BookOpenIcon,
  UserGroupIcon,
  GlobeAltIcon,
  ArrowLeftIcon,
  PlayIcon,
} from '@heroicons/react/24/outline';

interface VideoResource {
  id: string;
  title: string;
  url: string;
  description: string;
  duration?: string;
}

interface ExternalLink {
  id: string;
  title: string;
  url: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}

const Resources: React.FC = () => {
  const [pdfs, setPdfs] = useState<PDFResource[]>([]);
  const [loading, setLoading] = useState(true);

  // YouTube videos from Jannatkhah
  const jannatkhahVideos: VideoResource[] = [
    {
      id: '1',
      title: 'وبینار اصلی نظریه آزادی و دین',
      url: 'https://www.youtube.com/watch?v=X9PVaxjoVYE&t=12606s',
      description: 'وبینار کامل 4 ساعته محمدعلی جنت‌خواه درباره نظریه آزادی واقعی و ارتباط آن با دین',
      duration: '4 ساعت',
    },
    {
      id: '2',
      title: 'تحلیل عمیق آزادی و مالکیت',
      url: 'https://www.youtube.com/watch?v=3K_RHmSR72w&t=7035s',
      description: 'تحلیل جامع درباره مفهوم آزادی به عنوان مالکیت مطلق',
      duration: '2 ساعت',
    },
    {
      id: '3',
      title: 'دین و نظام آکسیوماتیک',
      url: 'https://www.youtube.com/watch?v=VnEkM8c1_Ds&t=5463s',
      description: 'توضیح نظام صوری آکسیوماتیک دین و نقش آن در آزادی',
      duration: '1.5 ساعت',
    },
    {
      id: '4',
      title: 'کاربرد نظریه در ایران',
      url: 'https://www.youtube.com/watch?v=lyEt5fV75As',
      description: 'بررسی کاربرد نظریه آزادی جنت‌خواه در شرایط ایران معاصر',
    },
    {
      id: '5',
      title: 'آزادی در عصر مدرن',
      url: 'https://www.youtube.com/watch?v=CstsVO0AC_E',
      description: 'بحث درباره چالش‌های آزادی در جهان مدرن و دیجیتال',
    },
    {
      id: '6',
      title: 'مبانی فلسفی آزادی',
      url: 'https://www.youtube.com/watch?v=8vR4OB0hLrc',
      description: 'بررسی مبانی فلسفی نظریه آزادی از دیدگاه جنت‌خواه',
    },
  ];

  // External links and resources
  const externalLinks: ExternalLink[] = [
    {
      id: 'jannatkhah-x',
      title: 'صفحه X (توییتر) جنت‌خواه',
      url: 'https://x.com/jannatkhah_ir',
      description: 'دنبال کردن آخرین مطالب، توییت‌ها و تحلیل‌های محمدعلی جنت‌خواه',
      icon: GlobeAltIcon,
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'rothbard-ethics',
      title: 'کتاب اخلاق آزادی - روتبارد (صوتی)',
      url: 'https://www.youtube.com/playlist?list=PLGB19xH8LOaJjyVYaAiQao_7bOf-M7P1I',
      description: 'پلی‌لیست کامل کتاب "اخلاق آزادی" اثر موری روتبارد به صورت صوتی - بسیار توصیه می‌شود',
      icon: BookOpenIcon,
      color: 'from-purple-500 to-purple-600',
    },
  ];

  // Libertarian thinkers and resources
  const libertarianThinkers = [
    {
      name: 'موری روتبارد (Murray Rothbard)',
      description: 'فیلسوف و اقتصاددان لیبرتارین، نویسنده کتاب‌های "اخلاق آزادی" و "انسان، اقتصاد و دولت"',
      works: [
        { title: 'اخلاق آزادی', type: 'کتاب' },
        { title: 'انسان، اقتصاد و دولت', type: 'کتاب' },
        { title: 'تضاد طبقاتی', type: 'مقاله' },
      ],
    },
    {
      name: 'لودویگ فون میزس (Ludwig von Mises)',
      description: 'اقتصاددان اتریشی، پدر مکتب اتریش در اقتصاد، نویسنده "کنش انسانی"',
      works: [
        { title: 'کنش انسانی', type: 'کتاب' },
        { title: 'لیبرالیسم', type: 'کتاب' },
        { title: 'سوسیالیسم', type: 'کتاب' },
      ],
    },
    {
      name: 'فردریش هایک (Friedrich Hayek)',
      description: 'برنده نوبل اقتصاد، نویسنده "راه بندگی" و "قانون، قانونگذاری و آزادی"',
      works: [
        { title: 'راه بندگی', type: 'کتاب' },
        { title: 'قانون، قانونگذاری و آزادی', type: 'کتاب' },
        { title: 'ساختار کنش', type: 'کتاب' },
      ],
    },
    {
      name: 'آین رند (Ayn Rand)',
      description: 'فیلسوف و نویسنده، بنیانگذار ایدئولوژی عینیت‌گرایی (Objectivism)',
      works: [
        { title: 'آتلس شانه‌هایش را بالا انداخت', type: 'رمان' },
        { title: 'چشمه', type: 'رمان' },
        { title: 'فضیلت خودخواهی', type: 'کتاب فلسفی' },
      ],
    },
    {
      name: 'هانس هرمان هوپ (Hans-Hermann Hoppe)',
      description: 'اقتصاددان و فیلسوف لیبرتارین، شاگرد روتبارد، نویسنده "دموکراسی: خدایی که شکست خورد"',
      works: [
        { title: 'دموکراسی: خدایی که شکست خورد', type: 'کتاب' },
        { title: 'اقتصاد و اخلاق مالکیت خصوصی', type: 'کتاب' },
      ],
    },
  ];

  useEffect(() => {
    const fetchPDFs = async () => {
      try {
        const data = await resourceApi.getPDFs();
        setPdfs(data);
      } catch (error) {
        console.error('Failed to fetch PDFs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPDFs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50 to-white py-8 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <Link
            to="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6 text-sm sm:text-base"
          >
            <ArrowLeftIcon className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            بازگشت به صفحه اصلی
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 sm:mb-6">
            📚 منابع و لینک‌های مفید
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            مجموعه کامل منابع برای مطالعه عمیق‌تر درباره آزادی، دین و حقوق مالکیت
          </p>
        </motion.div>

        {/* Jannatkhah Videos Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
              <FilmIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                ویدیوهای محمدعلی جنت‌خواه
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                وبینارها، تحلیل‌ها و صحبت‌های کامل
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {jannatkhahVideos.map((video, index) => (
              <motion.a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="relative bg-gradient-to-br from-red-500 to-red-600 h-32 sm:h-40 flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  <PlayIcon className="w-12 h-12 sm:w-16 sm:h-16 text-white relative z-10 group-hover:scale-110 transition-transform" />
                  {video.duration && (
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs sm:text-sm px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  )}
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-primary-600 transition-colors leading-tight">
                    {video.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {video.description}
                  </p>
                  <div className="mt-4 flex items-center text-primary-600 font-semibold text-sm sm:text-base">
                    <span>تماشا در YouTube</span>
                    <LinkIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* External Links Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
              <LinkIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                لینک‌های مفید
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                صفحات و منابع مهم
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {externalLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className={`group bg-gradient-to-br ${link.color} rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 text-white`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 group-hover:underline">
                        {link.title}
                      </h3>
                      <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                        {link.description}
                      </p>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </motion.section>

        {/* Libertarian Thinkers Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
              <AcademicCapIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                اندیشمندان لیبرتارین
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                بزرگان فلسفه آزادی و اقتصاد اتریشی
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {libertarianThinkers.map((thinker, index) => (
              <motion.div
                key={thinker.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 sm:p-8 border border-gray-100"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <UserGroupIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                      {thinker.name}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {thinker.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm font-semibold text-gray-700 mb-2">آثار مهم:</p>
                  <ul className="space-y-1">
                    {thinker.works.map((work, workIndex) => (
                      <li key={workIndex} className="flex items-center gap-2 text-sm sm:text-base text-gray-600">
                        <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                        <span className="font-medium">{work.title}</span>
                        <span className="text-xs text-gray-500">({work.type})</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* PDF Resources Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
              <DocumentArrowDownIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                PDF های نظریه آزادی
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                فایل‌های کامل 9 فصل نظریه جنت‌خواه
              </p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
              <p className="mt-4 text-gray-600">در حال بارگذاری...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {pdfs.map((pdf, index) => (
                <motion.a
                  key={pdf.id}
                  href={pdf.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 h-24 sm:h-32 flex items-center justify-center">
                    <DocumentArrowDownIcon className="w-10 h-10 sm:w-12 sm:h-12 text-white group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="text-xs sm:text-sm text-primary-600 font-bold mb-2">
                      PDF {pdf.number}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-primary-600 transition-colors leading-tight">
                      {pdf.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                      {pdf.description}
                    </p>
                    <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                      <span>{pdf.pages} صفحه</span>
                      {pdf.file_size && (
                        <span>{(pdf.file_size / 1024 / 1024).toFixed(1)} MB</span>
                      )}
                    </div>
                    <div className="mt-4 flex items-center text-primary-600 font-semibold text-sm sm:text-base">
                      <span>دانلود PDF</span>
                      <DocumentArrowDownIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </motion.section>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 text-center text-white shadow-2xl"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            📖 مطالعه برای آزادی
          </h3>
          <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
            این منابع، راهنمای شما برای درک عمیق‌تر آزادی واقعی هستند. هر کدام را با دقت بخوانید و تحلیل کنید.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <span>بازگشت به صفحه اصلی</span>
            <ArrowLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Resources;
