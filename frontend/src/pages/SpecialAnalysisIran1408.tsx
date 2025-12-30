import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLocale } from '../i18n/LocaleProvider';
import { withLocalePath } from '../i18n/localePath';

type OptionalImageProps = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
};

const OptionalImage: React.FC<OptionalImageProps> = ({ src, alt, caption, className }) => {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <figure className={className}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className="w-full rounded-2xl border border-gray-200 shadow-sm bg-white"
      />
      {caption ? (
        <figcaption className="mt-2 text-xs text-gray-500 text-center">{caption}</figcaption>
      ) : null}
    </figure>
  );
};

const SpecialAnalysisIran1408: React.FC = () => {
  const { locale } = useParams<{ locale: string }>();
  const { isRTL } = useLocale();

  const validLocale = (locale === 'fa' || locale === 'en') ? locale : 'fa';

  const heroTitle = isRTL
    ? 'تحلیل ویژه: ایران، ژئوپولیتیک و افق ۱۴۰۸'
    : 'Special Analysis: Iran, Geopolitics, and the 2029 Horizon';

  const heroSubtitle = isRTL
    ? 'این صفحه یک مقاله‌ی مستقل (فراتر از فصل‌ها) است: دیدگاه و تحلیل آقای جنت‌خواه درباره روایت‌های آخرالزمانی، سیاست، گیم‌تئوری و ژئوپولیتیک.'
    : 'A standalone article (beyond the chapters): Jannatkhah’s view and analysis on apocalyptic narratives, politics, game theory, and geopolitics.';

  const imageSrcs = useMemo(() => {
    // NOTE: These paths are optional. If the files don’t exist, the images auto-hide.
    // Put your files here later:
    // - frontend/public/images/ancient-iran-map.jpg
    // - frontend/public/images/cyrus-cylinder.jpg
    return {
      ancientIranMap: '/images/ancient-iran-map.jpg',
      cyrusCylinder: '/images/cyrus-cylinder.jpg',
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb / back links */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <Link
            to={withLocalePath(validLocale, '/')}
            className="text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
          >
            {isRTL ? 'بازگشت به خانه' : 'Back to Home'}
          </Link>
          <Link
            to={withLocalePath(validLocale, '/discussions')}
            className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
          >
            {isRTL ? 'رفتن به بحث و گفتگو' : 'Go to Discussions'}
          </Link>
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden"
        >
          <div className="p-7 sm:p-10 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
            <div className="flex items-start justify-between gap-6">
              <div className="min-w-0">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                  {heroTitle}
                </h1>
                <p className="mt-3 text-white/85 text-sm sm:text-base leading-relaxed max-w-3xl">
                  {heroSubtitle}
                </p>
              </div>
              <div className="hidden sm:flex flex-col items-end gap-2 text-white/80 text-xs">
                <div className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15">
                  {isRTL ? 'فراتر از فصل‌ها' : 'Beyond the chapters'}
                </div>
                <div className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15">
                  {isRTL ? 'مقاله استاتیک' : 'Static article'}
                </div>
              </div>
            </div>
          </div>

          <div className="p-7 sm:p-10">
            {/* Disclaimer */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
              <p className="text-base sm:text-lg text-amber-900 leading-8">
                {isRTL ? (
                  <>
                    <strong>یادداشت:</strong> این متن یک تحلیل/بازنویسی است و «پیش‌بینی قطعی» محسوب نمی‌شود. هدف این صفحه، ارائه‌ی
                    یک چارچوب فکری منسجم برای گفت‌وگو است.
                  </>
                ) : (
                  <>
                    <strong>Note:</strong> This is an analysis/rewrite, not a deterministic prediction. The goal is to provide a coherent
                    framework for discussion.
                  </>
                )}
              </p>
            </div>

            {/* Images */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <OptionalImage
                src={imageSrcs.ancientIranMap}
                alt={isRTL ? 'نقشه کلی ایران باستان (هخامنشی)' : 'Ancient Iran map (Achaemenid Empire)'}
                caption={isRTL ? 'نقشه کلی ایران باستان (اختیاری — اگر فایل موجود باشد نمایش داده می‌شود)' : 'Ancient Iran map (optional — auto-hides if missing)'}
              />
              <OptionalImage
                src={imageSrcs.cyrusCylinder}
                alt={isRTL ? 'استوانه کورش کبیر' : 'Cyrus Cylinder'}
                caption={isRTL ? 'استوانه کورش کبیر (اختیاری — اگر فایل موجود باشد نمایش داده می‌شود)' : 'Cyrus Cylinder (optional — auto-hides if missing)'}
              />
            </div>

            {/* Main content */}
            <div className="mt-10 space-y-12">
              {/* TOC */}
              <section className="rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
                <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-4">
                  {isRTL ? 'فهرست مطالب' : 'Table of contents'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {[
                    { id: 'rewrite', labelFa: 'بازنویسی تمیز و ساختاریافته تحلیل', labelEn: 'Structured rewrite' },
                    { id: 'sec-1', labelFa: '۱) نگاه آخرالزمانی مانیپولیتیو', labelEn: '1) Apocalyptic manipulation' },
                    { id: 'sec-2', labelFa: '۲) تشیع اصیل و اراده آزاد (اصل بنیادین)', labelEn: '2) Free will as foundation' },
                    { id: 'sec-3', labelFa: '۳) گیم‌تئوری و راه‌حل شیعی بر پایه اراده آزاد', labelEn: '3) Game theory & Shia remedy' },
                    { id: 'sec-4', labelFa: '۴) نگاه آمریکا و اسرائیل به ایران', labelEn: '4) US/Israel narratives' },
                    { id: 'sec-5', labelFa: '۵) اشتراک تمدنی ایران و آمریکا', labelEn: '5) Civilizational overlap' },
                    { id: 'sec-6', labelFa: '۶) دلایل ژئوپولیتیک و اقتصادی تا ۱۴۰۸', labelEn: '6) Geopolitics & economics' },
                  ].map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="text-sm font-semibold text-primary-700 hover:text-primary-800 bg-white border border-gray-200 rounded-xl px-3 py-2 transition-colors"
                    >
                      {isRTL ? item.labelFa : item.labelEn}
                    </a>
                  ))}
                </div>
              </section>

              {/* Full article content (Persian) */}
              <section id="rewrite" className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  {isRTL ? 'بازنویسی تمیز و ساختاریافته تحلیل (بر اساس محتوای اصلی ویدیو/سخنرانی)' : 'Structured Rewrite (Persian)'}
                </h2>
                <p className="text-gray-700 leading-8 text-lg sm:text-xl">
                  {isRTL ? (
                    <>
                      این تحلیل، دیدگاه یک منتقد جمهوری اسلامی است که آینده ایران را با ترکیبی از فلسفه دینی (تشیع اصیل)، نظریه بازی،
                      ژئوپولیتیک و نگاه آخرالزمانی بررسی می‌کند. او معتقد است رژیم فعلی به دلیل اشتباهات ایدئولوژیک و افتادن در تله‌های
                      استراتژیک، محکوم به تغییر است و ایران تا سال ۱۴۰۸ شمسی (حدود ۲۰۲۹ میلادی) به متحد استراتژیک آمریکا تبدیل خواهد شد.
                    </>
                  ) : (
                    <>
                      (Persian) This section contains the full structured rewrite provided. Switch to Persian locale for best reading.
                    </>
                  )}
                </p>
              </section>

              <section id="sec-1" className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4">
                  {isRTL ? '۱. نگاه آخرالزمانی مانیپولیتیو (دستکاری‌کننده) در قدرت‌های کلیدی' : '1. Manipulative apocalyptic framing'}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {isRTL ? 'سه بازیگر اصلی (آمریکا، اسرائیل، ایران) هر کدام بر اساس متون مقدس خود، نشانه‌های آخرالزمان را تفسیر و سعی در دستکاری آن دارند:' : '—'}
                </p>
                <ul className="text-gray-800 leading-relaxed space-y-2">
                  <li>
                    <strong>مسیحیان انجیلی آمریکا</strong>: تشکیل اسرائیل برای بازگشت مسیح؛ حتی مرگ دو سوم یهودیان توجیه‌پذیر است.
                  </li>
                  <li>
                    <strong>اسرائیل</strong>: تشکیل دولت یهودی برای آمدن ماشیاه (منجی).
                  </li>
                  <li>
                    <strong>جمهوری اسلامی</strong>: حضور در سوریه و یمن بر اساس احادیث (مثل حدیث نجد) برای تسهیل ظهور امام زمان.
                  </li>
                </ul>
                <div className="mt-5 rounded-xl bg-amber-50 border border-amber-200 p-4">
                  <p className="text-amber-900 text-sm leading-relaxed">
                    <strong>جمع‌بندی:</strong> این نگاه مانیپولیتیو خطرناک است، زیرا اقدامات غیراخلاقی و غیرمنطقی را توجیه می‌کند.
                  </p>
                </div>
              </section>

              <section id="sec-2" className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4">
                  {isRTL ? '۲. نقد فلسفی و دینی این نگاه در تشیع اصیل: تأکید بر اراده آزاد انسان به عنوان اصل بنیادین' : '2. Free will as a foundation'}
                </h3>
                <div className="space-y-5 text-gray-800 leading-8 text-lg sm:text-xl">
                  <p>
                    {isRTL ? (
                      <>
                        تشیعِ اصیل، برخلاف نگاه‌های «مانیپولیتیو» (دستکاری‌کننده)، <strong>کاملاً بر پایه ارادهٔ آزاد انسان</strong> بنا شده است.
                        اصل کلیدی این است که آخرالزمان و ظهور منجیِ ما نه بر اساس پروژه‌سازی دولتی یا مهندسی ایدئولوژیک، بلکه
                        <strong>بر مبنای انتخاب آزادانه انسان‌ها</strong> شکل می‌گیرد.
                      </>
                    ) : (
                      <>In this article, free will (human agency) is presented as a foundational principle in orthodox Shia thought.</>
                    )}
                  </p>
                  <div className="rounded-2xl bg-primary-50 border border-primary-200 p-5">
                    <p className="text-primary-900">
                      {isRTL ? (
                        <>
                          <strong>ارادهٔ آزاد اصل است.</strong> یعنی انسان‌ها با انتخاب‌های آزادانهٔ خود، اخلاق را گسترش می‌دهند،
                          حقوق مالکیت خصوصی را محترم می‌شمارند و جامعه‌ای عادلانه می‌سازند—آنگاه «زمینه» فراهم می‌شود؛
                          نه این‌که یک دولت با زور و انحصار قدرت، مسیر تاریخ را «تحمیل» کند.
                        </>
                      ) : (
                        <><strong>Free will is the core.</strong></>
                      )}
                    </p>
                  </div>
                  <p>
                    {isRTL ? (
                      <>
                        احادیث معتبر متعدد تأکید دارند: <strong>«کذبُ الوقّاتون»</strong> (تعیین‌کنندگان زمان ظهور دروغگو هستند).
                        پس ما اساساً <strong>نمی‌توانیم و نباید</strong> زمان ظهور را پیش‌بینی یا دستکاری کنیم؛
                        چون این کار، ارادهٔ آزاد را به «ابزار» تبدیل می‌کند و انسان را از مسئولیت اخلاقیِ امروز به خیالِ
                        «سناریونویسی آخرالزمان» منتقل می‌سازد.
                      </>
                    ) : null}
                  </p>
                  <ul className="space-y-2 text-base sm:text-lg leading-8">
                    <li>
                      {isRTL ? (
                        <>
                          <strong>ظهور</strong> بر پایهٔ ارادهٔ آزاد انسان‌ها و گسترش اخلاق/مالکیت خصوصی رخ می‌دهد، نه دولت دینی.
                        </>
                      ) : null}
                    </li>
                    <li>
                      {isRTL ? (
                        <>
                          <strong>ترکیب دین و دولت</strong> = فساد و شیطان (دولت انحصار قدرت است و اخلاق را قربانی می‌کند).
                        </>
                      ) : null}
                    </li>
                    <li>
                      {isRTL ? (
                        <>
                          <strong>انقلاب اسلامی</strong> اشتباه بود: افتادن در دیالکتیک (تز-آنتی‌تز) و ایجاد «فاشیسم شیعی»،
                          در حالی که تشیع اصیل نقطهٔ مقابل این است—ترمز شیطان (دولتِ انحصاری) را می‌کشد و بر ارادهٔ آزاد تأکید دارد.
                        </>
                      ) : null}
                    </li>
                  </ul>
                </div>
              </section>

              <section id="sec-3" className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4">
                  {isRTL ? '۳. کاربرد نظریه بازی (گیم تئوری) در سیاست جهانی: راه‌حل شیعی بر پایه ارادهٔ آزاد' : '3. Game theory & the Shia remedy'}
                </h3>
                <div className="space-y-5 text-gray-800 leading-8 text-lg sm:text-xl">
                  <p>
                    {isRTL ? (
                      <>
                        در گیم‌تئوری، بازیگران (آمریکا، اسرائیل، ایران، روسیه، چین) تلاش می‌کنند زمان «دستِ آخر» (افول/آخرالزمان) را تخمین بزنند.
                        نزدیک به این زمان، فریب، بلوف و اقدامات غیراخلاقی توجیه می‌شود؛ چون طرفین فکر می‌کنند «دیگر چیزی برای از دست دادن ندارند».
                      </>
                    ) : null}
                  </p>
                  <p>
                    {isRTL ? (
                      <>
                        اما پاسخِ تشیعِ اصیل به این دام، دقیقاً از همان اصل بنیادین می‌آید: <strong>ارادهٔ آزاد انسان</strong>.
                        اگر آینده و پایان‌بندی تاریخ وابسته به انتخاب آزادانهٔ انسان‌هاست، پس ما حق نداریم با «زمان‌گذاری» و «سناریونویسی»
                        اخلاق را قربانی کنیم.
                      </>
                    ) : null}
                  </p>
                  <div className="rounded-2xl bg-gray-50 border border-gray-200 p-5">
                    <p className="text-gray-900">
                      {isRTL ? (
                        <>
                          <strong>راه‌حل شیعی:</strong> زمان تعیین نکنید؛ ما نمی‌توانیم وقتِ ظهور یا افول قدرت‌ها را مشخص کنیم،
                          چون همه‌چیز به ارادهٔ آزاد انسان‌ها بستگی دارد. تنها کاری که در اختیار ماست، <strong>تصمیمِ امروز</strong> است:
                          تصمیم اخلاقی، عادلانه، و اقتصادیِ درست—تصمیمی که به آزادی انتخاب انسان‌ها احترام می‌گذارد.
                        </>
                      ) : null}
                    </p>
                  </div>
                  <p>
                    {isRTL ? (
                      <>
                        نتیجهٔ این رویکرد این است که قدرت‌هایی که بر زور، دروغ و دستکاری تکیه دارند، از درون فرسوده می‌شوند و
                        زودتر افول می‌کنند—بدون این‌که ما در تلهٔ دیالکتیک (تز-آنتی‌تز) بیفتیم یا اخلاق را «قربانیِ هدف» کنیم.
                        <strong>آخرالزمانِ ما با ارادهٔ آزاد انسان شکل می‌گیرد.</strong>
                      </>
                    ) : null}
                  </p>
                </div>
              </section>

              <section id="sec-4" className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4">
                  {isRTL ? '۴. نگاه آخرالزمانی آمریکا و اسرائیل به ایران' : '4. US/Israel narratives about Iran'}
                </h3>
                <ul className="text-gray-800 leading-relaxed space-y-2">
                  <li>بر اساس کتاب مقدس: ایران (پرشیا/ایلام) تحقیر می‌شود، سقوط می‌کند، سپس دوباره باشکوه می‌گردد (<strong>Make Iran Great Again</strong>).</li>
                  <li>کورش کبیر در کتاب مقدس در حد پیامبر است (نجات‌دهنده یهودیان).</li>
                  <li>ترامپ خود را «نماینده خدا» می‌بیند؛ نتانیاهو عملیات‌هایی مثل «طلوع شیران» را از کتاب مقدس الهام می‌گیرد.</li>
                </ul>
              </section>

              <section id="sec-5" className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4">
                  {isRTL ? '۵. اشتراک تمدنی عمیق ایران و آمریکا: پایه اتحاد طبیعی' : '5. Civilizational overlap'}
                </h3>
                <p className="text-gray-800 leading-relaxed mb-4">
                  ایرانیان <strong>اولین جامعه در تاریخ</strong> بودند که بدون وابستگی به نژاد، قومیت، زبان، دین یا رنگ پوست، به یک «ملت واحد» تبدیل شدند.
                  مفهوم «ایران» به معنای <strong>سرزمین آزادگان</strong> است و بر پایه حقوق مالکیت خصوصی، آزادی فردی و عدم تبعیض بنا شده – همان‌طور که در منشور کورش دیده می‌شود.
                </p>
                <p className="text-gray-800 leading-relaxed mb-4">
                  آمریکا <strong>دومین جامعه بزرگ</strong> است که دقیقاً با همین منطق ملت شد: آمریکایی بودن بر پایه ایده آزادی فردی، حقوق مالکیت خصوصی و قانون اساسی است – نه خون و نژاد.
                  هر کسی از هر کجا می‌تواند آمریکایی شود.
                </p>
                <p className="text-gray-800 leading-relaxed">
                  این دو ملت از نظر مفهوم «ملت بودن» بسیار نزدیک‌اند – نزدیک‌تر از ایران با روسیه، چین یا کشورهای عربی.
                  و حتی در جزئیات فرهنگی: هر دو جامعه نرخ ختنه بسیار بالایی دارند (ایران حدود ۹۸-۹۹٪، آمریکا حدود ۷۰-۸۰٪ در نسل‌های قدیمی‌تر) – در حالی که این نرخ در اروپا، روسیه و چین پایین است.
                  این شباهت کوچک، نشانه‌ای از ارزش‌های خانوادگی مشترک است.
                </p>
              </section>

              <section id="sec-6" className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4">
                  {isRTL ? '۶. دلایل ژئوپولیتیک و اقتصادی تغییر رژیم تا ۱۴۰۸' : '6. Geopolitics & economics to 2029'}
                </h3>
                <ul className="text-gray-800 leading-relaxed space-y-2">
                  <li>فشار بدهی آمریکا (بخشی بزرگ از بدهی‌ها در ۲۰۲۵-۲۰۲۸ سررسید می‌شود) → نیاز به حفظ هژمونی دلار با ضربه به محور چین-روسیه-ایران.</li>
                  <li>ایران ضعیف‌ترین حلقه: موقعیت استراتژیک، جمعیت ناراضی، کنترل نفت و آسیای میانه.</li>
                  <li>مزایا: اتحاد با ایران → افول چین و روسیه، کنترل خاورمیانه.</li>
                  <li>پیش‌بینی: تا ۱۴۰۸ یا تسلیم و اتحاد مسالمت‌آمیز، یا حمله نظامی آمریکا (حتی نیروی زمینی).</li>
                </ul>
              </section>

              {/* Grok addendum removed per request */}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SpecialAnalysisIran1408;


