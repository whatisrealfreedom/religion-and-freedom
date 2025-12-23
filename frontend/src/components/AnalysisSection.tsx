import React from 'react';
import { motion } from 'framer-motion';
import { 
  LightBulbIcon, 
  AcademicCapIcon, 
  BeakerIcon,
  BookOpenIcon 
} from '@heroicons/react/24/outline';

interface AnalysisSectionProps {
  chapterId: number;
  title: string;
}

const AnalysisSection: React.FC<AnalysisSectionProps> = ({ chapterId, title }) => {
  const analyses = [
    {
      icon: LightBulbIcon,
      title: 'تحلیل مفهومی',
      description: 'بررسی عمیق مفاهیم و ارتباطات بین ایده‌های اصلی',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      icon: AcademicCapIcon,
      title: 'تحلیل فلسفی',
      description: 'جایگاه نظریه در فلسفه اسلامی و غربی',
      color: 'from-purple-400 to-pink-500',
    },
    {
      icon: BeakerIcon,
      title: 'تحلیل کاربردی',
      description: 'کاربرد عملی نظریه در جامعه و سیاست',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      icon: BookOpenIcon,
      title: 'تحلیل تاریخی',
      description: 'ریشه‌های تاریخی و تحولات فکری',
      color: 'from-green-400 to-emerald-500',
    },
  ];

  return (
    <section className="py-10 sm:py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4 px-2">
            تحلیل جامع: {title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            بررسی عمیق و چندبعدی نظریه آزادی جنت‌خواه از زوایای مختلف
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12">
          {analyses.map((analysis, index) => {
            const Icon = analysis.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 md:p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${analysis.color} flex items-center justify-center mb-4 sm:mb-6 shadow-lg`}>
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
                  {analysis.title}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                  {analysis.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Deep Analysis Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-12 border border-primary-100"
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
            تحلیل عمیق قدم به قدم
          </h3>
          
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 shadow-md">
              <h4 className="text-lg sm:text-xl font-bold text-primary-700 mb-2 sm:mb-3">
                گام اول: درک بنیادین
              </h4>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                نظریه جنت‌خواه بر این پایه استوار است که آزادی واقعی، چیزی فراتر از آزادی‌های سیاسی رایج است. 
                این نظریه آزادی را به عنوان <strong>مالکیت مطلق</strong> بر چهار حوزه اساسی وجود انسان تعریف می‌کند: 
                <strong> جسم، ذهن، زمان و دارایی</strong>. این تعریف، آزادی را از مفهوم انتزاعی به یک اصل حقوقی قابل دفاع تبدیل می‌کند.
              </p>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 shadow-md">
              <h4 className="text-lg sm:text-xl font-bold text-primary-700 mb-2 sm:mb-3">
                گام دوم: چارچوب نظری
              </h4>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                جنت‌خواه با استفاده از <strong>نظریه سیستم‌های صوری آکسیوماتیک</strong>، نشان می‌دهد که 
                اصول پنج‌گانه دین شیعه (توحید، نبوت، معاد، عدل، امامت) به عنوان آکسیوم‌های پایه، 
                یک نظام منطقی و پایدار برای حفاظت از آزادی می‌سازند. این رویکرد، دین را از 
                سیستم‌های ایدئولوژیک و سیاسی متمایز می‌کند.
              </p>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 shadow-md">
              <h4 className="text-lg sm:text-xl font-bold text-primary-700 mb-2 sm:mb-3">
                گام سوم: تحلیل تطبیقی
              </h4>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                در مقایسه با مکاتب فکری دیگر (لیبرالیسم، سوسیالیسم، آنارشیسم)، نظریه جنت‌خواه 
                مزایای منحصر به فردی دارد: <strong>پایداری زمانی</strong> (فرازمانی بودن اصول دینی)، 
                <strong> عدم تناقض منطقی</strong> (ساختار آکسیوماتیک)، و <strong>تضمین اخلاقی</strong> 
                (پایه‌گذاری بر عدل الهی). این نظریه، راه سوم را پیشنهاد می‌دهد که نه دولت‌سالاری است و نه هرج‌ومرج.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AnalysisSection;

