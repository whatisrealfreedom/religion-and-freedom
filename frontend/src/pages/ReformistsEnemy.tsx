import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLocale } from '../i18n/LocaleProvider';
import { withLocalePath } from '../i18n/localePath';

interface Tweet {
  id: string;
  url: string;
  username: string;
  usernameDisplay: string;
  text?: string; // متن توییت (اختیاری)
}

const ReformistsEnemy: React.FC = () => {
  const { locale } = useParams<{ locale: string }>();
  const { isRTL } = useLocale();
  const [showAllTweets, setShowAllTweets] = useState(false);

  const validLocale = (locale === 'fa' || locale === 'en') ? locale : 'fa';

  const tweets: Tweet[] = [
    { id: '1176809324561256448', url: 'https://x.com/amirmoghadam_ir/status/1176809324561256448', username: 'amirmoghadam_ir', usernameDisplay: '@amirmoghadam_ir' },
    { id: '2005983529490870625', url: 'https://x.com/amirmoghadam_ir/status/2005983529490870625', username: 'amirmoghadam_ir', usernameDisplay: '@amirmoghadam_ir' },
    { id: '2001329877639655795', url: 'https://x.com/jannatkhah_ir/status/2001329877639655795', username: 'jannatkhah_ir', usernameDisplay: '@jannatkhah_ir' },
    { id: '1931418585148109296', url: 'https://x.com/amirmoghadam_ir/status/1931418585148109296', username: 'amirmoghadam_ir', usernameDisplay: '@amirmoghadam_ir' },
    { id: '1957138503852339382', url: 'https://x.com/MehdiHajati/status/1957138503852339382', username: 'MehdiHajati', usernameDisplay: '@MehdiHajati' },
    { id: '2006041641421865090', url: 'https://x.com/aliemamiofnyc/status/2006041641421865090', username: 'aliemamiofnyc', usernameDisplay: '@aliemamiofnyc' },
    { id: '1896549562879271146', url: 'https://x.com/Arsha45914097/status/1896549562879271146', username: 'Arsha45914097', usernameDisplay: '@Arsha45914097' },
    { id: '2006310165692158214', url: 'https://x.com/sadegh_111/status/2006310165692158214', username: 'sadegh_111', usernameDisplay: '@sadegh_111' },
    { id: '1960029520947257789', url: 'https://x.com/amirmoghadam_ir/status/1960029520947257789', username: 'amirmoghadam_ir', usernameDisplay: '@amirmoghadam_ir' },
    { id: '2005198364791492965', url: 'https://x.com/amirmoghadam_ir/status/2005198364791492965', username: 'amirmoghadam_ir', usernameDisplay: '@amirmoghadam_ir' },
    { id: '1877043209659916384', url: 'https://x.com/Osintioux/status/1877043209659916384', username: 'Osintioux', usernameDisplay: '@Osintioux' },
    { id: '1941849442702835956', url: 'https://x.com/amirmoghadam_ir/status/1941849442702835956', username: 'amirmoghadam_ir', usernameDisplay: '@amirmoghadam_ir' },
    { id: '2004586451368116658', url: 'https://x.com/jalilyonline/status/2004586451368116658', username: 'jalilyonline', usernameDisplay: '@jalilyonline' },
    { id: '2006077116249669971', url: 'https://x.com/jalilyonline/status/2006077116249669971', username: 'jalilyonline', usernameDisplay: '@jalilyonline' },
    { id: '2005790977878020331', url: 'https://x.com/sam952084/status/2005790977878020331', username: 'sam952084', usernameDisplay: '@sam952084' },
    { id: '2005531136856936583', url: 'https://x.com/king_fishpoet/status/2005531136856936583', username: 'king_fishpoet', usernameDisplay: '@king_fishpoet' },
    { id: '2005426673710481512', url: 'https://x.com/P88260/status/2005426673710481512', username: 'P88260', usernameDisplay: '@P88260' },
    { id: '2005332703080833356', url: 'https://x.com/hajdogin/status/2005332703080833356', username: 'hajdogin', usernameDisplay: '@hajdogin' },
    { id: '2006260078882771424', url: 'https://x.com/mry66y/status/2006260078882771424', username: 'mry66y', usernameDisplay: '@mry66y' },
    { id: '2007224776297984396', url: 'https://x.com/justolder5/status/2007224776297984396', username: 'justolder5', usernameDisplay: '@justolder5' },
    { id: '2007531991797993595', url: 'https://x.com/patrick_jane77/status/2007531991797993595', username: 'patrick_jane77', usernameDisplay: '@patrick_jane77' },
  ];

  const displayedTweets = showAllTweets ? tweets : tweets.slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            to={withLocalePath(validLocale, '/')}
            className="text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors inline-flex items-center gap-2"
          >
            {isRTL ? '← بازگشت به خانه' : '← Back to Home'}
          </Link>
        </div>

        {/* Hero Section - با استایل آتشین و خفن */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10"
        >
          <div
            className="relative overflow-hidden rounded-3xl shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 50%, #ffebee 100%)',
              border: '6px solid #f44336',
              boxShadow: '0 25px 50px -12px rgba(244, 67, 54, 0.4), 0 0 0 1px rgba(244, 67, 54, 0.1)',
            }}
          >
            <div className="relative p-8 sm:p-12 md:p-16 text-center">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight"
                style={{
                  color: '#c62828',
                  textShadow: '3px 3px 10px rgba(0,0,0,0.2), 0 0 20px rgba(244, 67, 54, 0.3)',
                }}
              >
                {isRTL
                  ? 'جماعت اصلاحاتی: بزرگ‌ترین دشمن ایران، تاریخ، تمدن و فرهنگ ایرانی'
                  : 'Reformist Faction: The Greatest Enemy of Iran, Its History, Civilization, and Culture'}
              </h1>

              <blockquote
                className="text-xl sm:text-2xl md:text-3xl text-gray-800 font-bold leading-relaxed max-w-4xl mx-auto px-6 py-8 rounded-2xl mb-8"
                style={{
                  background: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(10px)',
                  border: isRTL ? '3px solid #f44336' : '3px solid #f44336',
                  borderRight: isRTL ? '12px solid #f44336' : 'none',
                  borderLeft: !isRTL ? '12px solid #f44336' : 'none',
                  boxShadow: '0 10px 30px rgba(244, 67, 54, 0.2)',
                }}
              >
                {isRTL
                  ? '«اصلاحات نه رهایی، بلکه ادامه غارت چپ‌گرایان و مصدقی‌هاست — جریانی که با نقاب تغییر، ایران را به سوی بردگی جمعی می‌برد و بزرگ‌ترین تهدید برای آزادی، تمدن و فرهنگ ماست.»'
                  : '"Reform is not liberation, but the continuation of the plunder of leftists and Mossadeghists — a current that, under the mask of change, leads Iran toward collective slavery and is the greatest threat to our freedom, civilization, and culture."'}
              </blockquote>

              <p
                className="text-lg sm:text-xl md:text-2xl text-gray-800 font-semibold leading-relaxed max-w-4xl mx-auto"
                style={{ textShadow: '1px 1px 3px rgba(255,255,255,0.8)' }}
              >
                {isRTL
                  ? 'جماعت اصلاحاتی، در امتداد چپ‌ها و مصدقی‌ها، بزرگ‌ترین دشمن ایران است — جریانی که تاریخ هزاران ساله ما را غارت می‌کند، تمدن کهن را نابود می‌سازد و فرهنگ آزادی‌خواه ایرانی را به زنجیر می‌کشد. اینان نه اصلاح‌گر، بلکه ویرانگرانند.'
                  : 'The reformist faction, in continuation of leftists and Mossadeghists, is the greatest enemy of Iran — a current that plunders our thousands of years of history, destroys ancient civilization, and chains the freedom-loving Iranian culture. They are not reformers, but destroyers.'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Section 1: Introduction */}
          <motion.section
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 border-2 border-gray-200"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 pb-4 border-b-4 border-red-500">
              {isRTL ? 'مقدمه: اصلاحات، نقاب چپ‌گرایی بر صورت دشمن' : 'Introduction: Reform, the Mask of Leftism on the Face of the Enemy'}
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                {isRTL
                  ? 'اصلاحات در ایران، جریانی است که با شعار تغییر و دموکراسی، ریشه‌های چپ‌گرایی افراطی و مصدقی را ادامه می‌دهد. این جریان، از دهه ۷۰ شمسی با جناح چپ (دوم خرداد) شروع شد و همیشه در پی تضعیف مالکیت خصوصی، افزایش قدرت دولت و نقض آزادی واقعی بوده.'
                  : 'Reform in Iran is a current that, under the slogan of change and democracy, continues the roots of extreme leftism and Mossadeghism. This current started in the 1370s (1990s) with the left wing (2nd Khordad) and has always sought to weaken private property, increase state power, and violate real freedom.'}
              </p>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                {isRTL
                  ? 'اما چرا دشمن بزرگ ایران؟ چون در امتداد چپ‌ها (که با ایدئولوژی کمونیستی، مالکیت را غارت می‌کنند) و مصدقی‌ها (که با ملی‌گرایی کاذب، اقتصاد را به نابودی کشاندند) است. اینان تمدن ایرانی را — که هزاران سال بر پایه آزادی و حقوق مالکیت ایستاده — به زنجیر می‌کشند.'
                  : 'But why the great enemy of Iran? Because it is in continuation of the left (who plunder property with communist ideology) and Mossadeghists (who led the economy to destruction with false nationalism). They chain the Iranian civilization — which has stood for thousands of years on the foundation of freedom and property rights.'}
              </p>
            </div>
          </motion.section>

          {/* Section 2: Reform and Left Roots */}
          <motion.section
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl shadow-xl p-8 sm:p-10 border-4 border-red-400"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-red-900 mb-6 pb-4 border-b-4 border-red-600">
              {isRTL ? '۱. اصلاحات و ریشه‌های چپ: غارتگران مالکیت' : '1. Reform and Left Roots: Property Plunderers'}
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed mb-6">
                {isRTL
                  ? 'چپ‌گرایان، بزرگ‌ترین دشمنان بشریت‌اند — با شعار عدالت، میلیون‌ها را به فقر و بردگی کشاندند. در ایران، اصلاحات ادامه همین چپ است:'
                  : 'Leftists are the greatest enemies of humanity — under the slogan of justice, they led millions to poverty and slavery. In Iran, reform is a continuation of this left:'}
              </p>
              <ul className="space-y-4 text-base sm:text-lg text-gray-800">
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold text-xl mt-1">•</span>
                  <span>
                    <strong className="text-red-900">
                      {isRTL ? 'ارتباط با کمونیسم:' : 'Connection with Communism:'}
                    </strong>{' '}
                    {isRTL
                      ? 'اصلاح‌طلبان با جناح چپ (که از حزب توده و مارکسیست‌ها الهام گرفته) همسو هستند. آن‌ها دولت بزرگ را دوست دارند — دولتی که مالکیت خصوصی را مصادره می‌کند، تورم می‌آفریند و آزادی را خفه می‌کند.'
                      : 'Reformists are aligned with the left wing (inspired by the Tudeh Party and Marxists). They love big government — a government that confiscates private property, creates inflation, and chokes freedom.'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold text-xl mt-1">•</span>
                  <span>
                    <strong className="text-red-900">
                      {isRTL ? 'دلیل دشمنی:' : 'Reason for Enmity:'}
                    </strong>{' '}
                    {isRTL
                      ? 'چپ‌ها مالکیت را "ظلم" می‌دانند و می‌خواهند همه چیز "جمعی" باشد — اما نتیجه‌اش همیشه گرسنگی، سرکوب و نابودی تمدن است. اصلاحات در ایران، این ایدئولوژی را با نقاب "تغییر" پیش می‌برد.'
                      : 'The left considers property "oppression" and wants everything to be "collective" — but the result is always hunger, suppression, and the destruction of civilization. Reform in Iran advances this ideology under the mask of "change."'}
                  </span>
                </li>
              </ul>
              <div
                className="mt-8 p-6 rounded-xl font-bold text-lg text-red-900"
                style={{ background: 'rgba(255, 255, 255, 0.7)', border: '3px solid #c62828' }}
              >
                {isRTL
                  ? 'اصلاحاتی‌ها نباید قدرت بگیرند — چون دشمنان واقعی انسانیت‌اند و تاریخ نشان داده هرجا حاکم شدند، آزادی مرد.'
                  : 'Reformists must not gain power — because they are the real enemies of humanity, and history has shown that wherever they ruled, freedom died.'}
              </div>
            </div>
          </motion.section>

          {/* Section 3: Reform and Mossadeghists */}
          <motion.section
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 border-2 border-gray-200"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 pb-4 border-b-4 border-orange-500">
              {isRTL ? '۲. اصلاحات و مصدقی‌ها: ادامه ملی‌گرایی کاذب' : '2. Reform and Mossadeghists: Continuation of False Nationalism'}
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
                {isRTL
                  ? 'مصدق، راه‌گشای جمهوری اسلامی بود — با ملی کردن نفت، اقتصاد را نابود کرد و درب چپ‌گرایی را باز کرد. اصلاحات، ادامه همین راه است:'
                  : 'Mossadegh was the forerunner of the Islamic Republic — by nationalizing oil, he destroyed the economy and opened the door to leftism. Reform is a continuation of this path:'}
              </p>
              <ul className="space-y-4 text-base sm:text-lg text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 font-bold text-xl mt-1">•</span>
                  <span>
                    <strong className="text-orange-900">
                      {isRTL ? 'ارتباط با مصدق:' : 'Connection with Mossadegh:'}
                    </strong>{' '}
                    {isRTL
                      ? 'مصدقی‌ها چپ بودند — اغلب طرفدارانش مارکسیست یا سوسیالیست. مصدق خودش از اشراف بود، اما سیاست‌هایش (ملی کردن، دولت بزرگ) به بردگی جمعی منجر شد.'
                      : 'Mossadeghists were leftists — most of his supporters were Marxists or socialists. Mossadegh himself was from the aristocracy, but his policies (nationalization, big government) led to collective slavery.'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 font-bold text-xl mt-1">•</span>
                  <span>
                    <strong className="text-orange-900">
                      {isRTL ? 'دلیل دشمنی:' : 'Reason for Enmity:'}
                    </strong>{' '}
                    {isRTL
                      ? 'مصدقی‌ها با شعار استقلال، مالکیت خصوصی را غارت کردند و ایران را به آشوب کشاندند. اصلاحات امروز، همین مسیر را ادامه می‌دهد — با ادعای دموکراسی، دولت را بزرگ‌تر می‌کند و فرهنگ ایرانی (که بر پایه آزادی فردی است) را نابود می‌سازد.'
                      : 'Mossadeghists, under the slogan of independence, plundered private property and led Iran to chaos. Today\'s reform continues this path — under the claim of democracy, it makes government bigger and destroys Iranian culture (which is based on individual freedom).'}
                  </span>
                </li>
              </ul>
            </div>
          </motion.section>

          {/* Section 4: Reformists and Rents */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl shadow-2xl p-8 sm:p-10 text-white"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 pb-4 border-b-4 border-red-300">
              {isRTL ? '۳. اصلاحات، سلاطین رانت و غارت خصولتی' : '3. Reformists: Sultans of Rent and Semi-Private Plunder'}
            </h2>
            <div className="space-y-6 text-base sm:text-lg leading-relaxed">
              <p>
                {isRTL
                  ? 'در جمهوری اسلامی، بزرگ‌ترین رانت‌خواران سیستم اصلاح‌طلبان‌اند:'
                  : 'In the Islamic Republic, the greatest rent-seekers of the system are reformists:'}
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-red-200 font-bold text-xl mt-1">•</span>
                  <span>
                    {isRTL
                      ? 'مدیران شرکت‌های خصولتی (شستا، پتروشیمی‌ها، بانک‌ها) پر از اصلاح‌طلب و اقوام‌شان است.'
                      : 'Managers of semi-private companies (Setad, petrochemicals, banks) are full of reformists and their relatives.'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-200 font-bold text-xl mt-1">•</span>
                  <span>
                    {isRTL
                      ? 'اینان از رانت دولتی (خوراک ارزان، وام، معافیت) سود می‌برند، ارز برنمی‌گردانند و مردم را با تورم مجازات می‌کنند.'
                      : 'They profit from state rent (cheap feed, loans, exemptions), do not return currency, and punish people with inflation.'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-200 font-bold text-xl mt-1">•</span>
                  <span>
                    {isRTL
                      ? 'نه موفق، بلکه غارتگر — پول بادآورده مردم را می‌چاپند و ایران را فقیر می‌کنند.'
                      : 'Not successful, but plunderers — they print people\'s windfall money and impoverish Iran.'}
                  </span>
                </li>
              </ul>
            </div>
          </motion.section>

          {/* Section 5: Tweets - صدای مردم */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 border-2 border-gray-200"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 pb-4 border-b-4 border-red-500">
              {isRTL ? 'صدای مردم — مشتی نمونه خروار' : 'Voice of the People — A Sample of Many'}
            </h2>
            <p className="text-base sm:text-lg text-gray-700 mb-8 leading-relaxed">
              {isRTL
                ? 'این‌ها فقط مشتی نمونه خروار است — هزاران توییت مشابه وجود دارد که اصلاح‌طلبان را غارتگر و دشمن ایران می‌دانند.'
                : 'These are just a sample — thousands of similar tweets exist that consider reformists as plunderers and enemies of Iran.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              {displayedTweets.map((tweet, index) => {
                const tweetPreview = tweet.text 
                  ? (tweet.text.length > 80 ? tweet.text.substring(0, 80) + '...' : tweet.text)
                  : (isRTL ? 'نقل قول از کاربر' : 'Quote from User');
                
                return (
                  <motion.a
                    key={tweet.id}
                    href={tweet.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="block bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border-2 border-red-300 shadow-lg hover:shadow-2xl transition-all"
                  >
                    <div className="flex flex-col h-full">
                      <div className="mb-4 flex-1">
                        <div className="text-4xl mb-3 text-center">💬</div>
                        <p className="text-sm text-gray-800 font-medium text-center leading-relaxed min-h-[3rem] flex items-center justify-center">
                          {tweetPreview}
                        </p>
                      </div>
                      <div className="mt-auto pt-4 border-t border-red-200">
                        <div className="text-xs font-bold text-red-700 text-center mb-3">
                          {tweet.usernameDisplay}
                        </div>
                        <div className="text-center">
                          <span className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                            {isRTL ? 'مشاهده توییت' : 'View Tweet'} →
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {!showAllTweets && tweets.length > 4 && (
              <div className="text-center">
                <button
                  onClick={() => setShowAllTweets(true)}
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg"
                >
                  {isRTL ? 'نمایش همه توییت‌ها' : 'Show All Tweets'} ({tweets.length})
                </button>
              </div>
            )}
          </motion.section>

          {/* Section 6: Why Reform is the Greatest Enemy */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl shadow-2xl p-8 sm:p-10 text-white"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 pb-4 border-b-4 border-red-300">
              {isRTL ? '۴. چرا اصلاحات بزرگ‌ترین دشمن تمدن و فرهنگ ایرانی است؟' : '4. Why is Reform the Greatest Enemy of Iranian Civilization and Culture?'}
            </h2>
            <div className="space-y-6 text-base sm:text-lg leading-relaxed">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-red-300">
                <h3 className="text-xl font-bold mb-3 text-red-100">
                  {isRTL ? 'غارت تاریخ' : 'Plunder of History'}
                </h3>
                <p>
                  {isRTL
                    ? 'ایران مهد حقوق مالکیت است — از کوروش تا شاهنامه. اصلاحات با چپ‌گرایی، این میراث را به نام "عدالت" نابود می‌کند.'
                    : 'Iran is the cradle of property rights — from Cyrus to the Shahnameh. Reform, with leftism, destroys this heritage in the name of "justice."'}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-red-300">
                <h3 className="text-xl font-bold mb-3 text-red-100">
                  {isRTL ? 'ویران تمدن' : 'Destruction of Civilization'}
                </h3>
                <p>
                  {isRTL
                    ? 'تمدن ایرانی بر پایه آزادی و تنوع است — اما اصلاحات با دولت‌سالاری، تنوع را سرکوب و تمدن را به عقب می‌برد.'
                    : 'Iranian civilization is based on freedom and diversity — but reform, with statism, suppresses diversity and pushes civilization backward.'}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-red-300">
                <h3 className="text-xl font-bold mb-3 text-red-100">
                  {isRTL ? 'نابودی فرهنگ' : 'Destruction of Culture'}
                </h3>
                <p>
                  {isRTL
                    ? 'فرهنگ ایرانی، قهرمانان مردمی مثل رستم دارد — نه دولتی. اصلاحات فرهنگ را به ایدئولوژی چپ تبدیل می‌کند و آزادی را خفه می‌کند.'
                    : 'Iranian culture has popular heroes like Rostam — not state heroes. Reform transforms culture into leftist ideology and chokes freedom.'}
                </p>
              </div>
            </div>
            <div className="mt-8 p-6 bg-white/20 backdrop-blur-sm rounded-xl border-4 border-red-300 font-bold text-xl text-center">
              {isRTL
                ? 'اصلاحات، ادامه چپ‌ها و مصدقی‌هاست — جریانی که با نقاب، ایران را نابود می‌کند.'
                : 'Reform is a continuation of leftists and Mossadeghists — a current that destroys Iran under a mask.'}
            </div>
          </motion.section>

          {/* Conclusion */}
          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gradient-to-br from-red-700 via-red-800 to-red-900 rounded-3xl shadow-2xl p-10 sm:p-12 text-white text-center"
            style={{
              border: '6px solid #c62828',
              boxShadow: '0 25px 50px -12px rgba(198, 40, 40, 0.5)',
            }}
          >
            <h2 className="text-3xl sm:text-4xl font-black mb-8 text-red-100">
              {isRTL ? 'جمع‌بندی: سرطان اصلاحات را بشناس — ایران را نجات ده' : 'Conclusion: Recognize the Cancer of Reform — Save Iran'}
            </h2>
            <p className="text-xl sm:text-2xl leading-relaxed mb-8 max-w-4xl mx-auto">
              {isRTL
                ? 'اصلاحاتی‌ها، بزرگ‌ترین دشمن ایران‌اند — چون در امتداد چپ‌ها و مصدقی‌ها، مالکیت را غارت و آزادی را نابود می‌کنند. نباید قدرت بگیرند — چون دشمنان انسانیت‌اند.'
                : 'Reformists are the greatest enemies of Iran — because, in continuation of leftists and Mossadeghists, they plunder property and destroy freedom. They must not gain power — because they are enemies of humanity.'}
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border-4 border-red-300">
              <p className="text-2xl sm:text-3xl font-bold mb-4 text-red-100">
                {isRTL
                  ? 'پناه به آزادی واقعی — نظریه جنت‌خواه:'
                  : 'Refuge in Real Freedom — Jannatkhah\'s Theory:'}
              </p>
              <p className="text-xl sm:text-2xl">
                {isRTL
                  ? 'حقوق مالکیت مطلق، تضمین‌شده توسط دین.'
                  : 'Absolute property rights, guaranteed by religion.'}
              </p>
            </div>
            <p className="text-3xl sm:text-4xl font-black text-red-200 mb-6">
              {isRTL
                ? 'این حقیقت را پخش کن — سرطان اصلاحات را ریشه‌کن کن و ایران را آزاد کن! 🔥🇮🇷🕊️'
                : 'Spread this truth — eradicate the cancer of reform and free Iran! 🔥🇮🇷🕊️'}
            </p>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default ReformistsEnemy;
