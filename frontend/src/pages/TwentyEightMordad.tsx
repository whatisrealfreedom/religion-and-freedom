import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLocale } from '../i18n/LocaleProvider';
import { withLocalePath } from '../i18n/localePath';

type ChapterCard = {
  id: number;
  faTitle: string;
  faDesc: string;
  enTitle: string;
  enDesc: string;
  tone: 'analysis' | 'history' | 'today' | 'freedom';
};

const chapterCards: ChapterCard[] = [
  {
    id: 0,
    faTitle: 'مقدمه — چرا هنوز ۲۸ مرداد زنده است؟',
    faDesc: 'مسئله حافظه تاریخی، چرا مصدق هنوز ابزار سیاست امروز است، تفاوت تاریخ‌نگاری و اسطوره‌سازی.',
    enTitle: 'Introduction — Why is 28 Mordad still alive?',
    enDesc: 'The problem of historical memory, why Mossadegh remains a tool of today\'s politics, history vs. myth-making.',
    tone: 'analysis',
  },
  {
    id: 1,
    faTitle: 'ایران قبل از مصدق: کشوری روی گسل فروپاشی',
    faDesc: 'اشغال ۱۳۲۰، نفوذ شوروی و بریتانیا، وضعیت ارتش و اقتصاد، حزب توده به‌عنوان بازوی شوروی.',
    enTitle: 'Iran before Mossadegh: A country on the verge of collapse',
    enDesc: '1941 occupation, Soviet and British influence, military and economic conditions, Tudeh as Soviet arm.',
    tone: 'history',
  },
  {
    id: 2,
    faTitle: 'حزب توده: پروژه‌ی شوروی برای بلعیدن ایران',
    faDesc: 'ساختار، نفوذ، سازمان نظامی، تجربه آذربایجان و مهاباد، چرا خطر توده واقعی و فوری بود.',
    enTitle: 'Tudeh Party: Soviet project to swallow Iran',
    enDesc: 'Structure, influence, military organization, Azerbaijan and Mahabad experience, why Tudeh threat was real and urgent.',
    tone: 'history',
  },
  {
    id: 3,
    faTitle: 'مصدق پیش از قدرت: چهره‌ای که دیده نمی‌شود',
    faDesc: 'رفتار پارلمانی، زبان تهدید و حذف، دشمنی با نهادها — شکستن تصویر «پیر دموکرات مظلوم».',
    enTitle: 'Mossadegh before power: The unseen face',
    enDesc: 'Parliamentary behavior, language of threat and elimination, hostility to institutions — breaking the "elderly oppressed democrat" image.',
    tone: 'analysis',
  },
  {
    id: 4,
    faTitle: '۲۸ مرداد؛ کودتا یا برکناری؟ وقتی بحران به تصمیم نهایی می‌رسد',
    faDesc: 'پس از فروپاشی ائتلاف ملی و انزوای دولت، بحران به نقطه‌ای رسید که دیگر با مصالحه حل نمی‌شد. این فصل به پرسش تعیین‌کننده پاسخ می‌دهد: کودتا بود یا برکناری؟',
    enTitle: '28 Mordad: Coup or dismissal? When crisis reaches final decision',
    enDesc: 'After the collapse of the national coalition and government isolation, the crisis reached a point beyond compromise. This chapter answers the decisive question: coup or dismissal?',
    tone: 'analysis',
  },
  {
    id: 5,
    faTitle: 'نقش آمریکا و انگلیس: از واقعیت تاریخی تا افسانه‌سازی چپ',
    faDesc: 'دخالت خارجی واقعیت دارد، اما همه‌چیز نیست. بن‌بست داخلی و ضعف نهادی، شرط اثرگذاری هر مداخله‌ای بود.',
    enTitle: 'Role of America and Britain: From historical reality to leftist myth-making',
    enDesc: 'Foreign intervention exists, but it\'s not everything. Internal deadlock and institutional weakness were prerequisites for any intervention to succeed.',
    tone: 'analysis',
  },
  {
    id: 6,
    faTitle: 'پس از ۲۸ مرداد: انتخاب میان بد و بدتر و بازگشت ثبات',
    faDesc: 'برای داوری درباره ۲۸ مرداد باید از دام روایت‌های صفر و یکی بیرون آمد. این فصل نشان می‌دهد چرا بسیاری ۲۸ مرداد را راه‌حل یک بن‌بست خطرناک می‌دانند.',
    enTitle: 'After 28 Mordad: Choosing between bad and worse, return of stability',
    enDesc: 'To judge 28 Mordad, one must escape binary narratives. This chapter shows why many see 28 Mordad as a solution to a dangerous deadlock.',
    tone: 'analysis',
  },
  {
    id: 7,
    faTitle: 'اسطوره‌سازی از مصدق: چگونه تحریف تاریخ به ابزار سیاست بدل شد',
    faDesc: 'پس از ۲۸ مرداد، شکست سیاسی یک جریان به تدریج به پیروزی روایی بدل شد. این فصل نشان می‌دهد چگونه از مصدق یک اسطوره بی‌خطا ساخته شد.',
    enTitle: 'Myth-making from Mossadegh: How historical distortion became a political tool',
    enDesc: 'After 28 Mordad, political defeat gradually became narrative victory. This chapter shows how Mossadegh was turned into a flawless myth.',
    tone: 'analysis',
  },
  {
    id: 8,
    faTitle: 'درس‌های ۲۸ مرداد: سیاست عقلانی در برابر هیجان ایدئولوژیک',
    faDesc: 'اگر اسطوره را کنار بگذاریم و به واقعیت‌ها بازگردیم، ۲۸ مرداد نمونه‌ای کلاسیک از شکست سیاست هیجانی است. این فصل بر درس‌های عملی تمرکز می‌کند.',
    enTitle: 'Lessons of 28 Mordad: Rational politics vs. ideological emotion',
    enDesc: 'If we put aside the myth and return to facts, 28 Mordad is a classic example of the failure of emotional politics. This chapter focuses on practical lessons.',
    tone: 'analysis',
  },
  {
    id: 9,
    faTitle: 'بازخوانی غیرایدئولوژیک ۲۸ مرداد: چرا فهم درست گذشته شرط نجات آینده است',
    faDesc: '۲۸ مرداد فقط یک رویداد تاریخی نیست؛ گره‌ای ذهنی است که اگر باز نشود، سیاست امروز را هم فلج می‌کند. این فصل پایانی نشان می‌دهد چرا عبور از روایت‌های ایدئولوژیک ضروری است.',
    enTitle: 'Non-ideological re-reading of 28 Mordad: Why understanding the past is key to saving the future',
    enDesc: '28 Mordad is not just a historical event; it\'s a mental knot that paralyzes today\'s politics if not untied. This final chapter shows why moving beyond ideological narratives is essential.',
    tone: 'freedom',
  },
  {
    id: 10,
    faTitle: 'ارتش، شاه، و مسئله‌ی «برکناری یا کودتا»',
    faDesc: 'اختیارات شاه در فترت، عرف سیاسی آن دوره، چرا روایت «کودتا» ساده‌سازی است.',
    enTitle: 'Army, Shah, and the question: Dismissal or coup?',
    enDesc: 'Shah\'s powers during interregnum, political custom of the era, why "coup" narrative is oversimplification.',
    tone: 'analysis',
  },
  {
    id: 11,
    faTitle: 'نقش آمریکا: بازیگر حاشیه‌ای، نه کارگردان',
    faDesc: 'عملیات آژاکس، ترس از شوروی، چرا آمریکا گزینه بد کم‌خطرتر بود، مقایسه با چکسلواکی.',
    enTitle: 'America\'s role: Marginal player, not director',
    enDesc: 'Operation Ajax, fear of Soviet Union, why America was the less-bad option, comparison with Czechoslovakia.',
    tone: 'analysis',
  },
  {
    id: 12,
    faTitle: 'اگر ۲۸ مرداد نمی‌شد چه می‌شد؟',
    faDesc: 'سناریوی توده، سناریوی شوروی، تجربه کشورهای مشابه، چرا می‌گوییم «شانس آوردیم».',
    enTitle: 'What if 28 Mordad hadn\'t happened?',
    enDesc: 'Tudeh scenario, Soviet scenario, experience of similar countries, why we say "we were lucky".',
    tone: 'analysis',
  },
];

function toneStyles(tone: ChapterCard['tone']) {
  switch (tone) {
    case 'analysis':
      return 'from-indigo-600 to-indigo-800';
    case 'history':
      return 'from-emerald-600 to-emerald-800';
    case 'today':
      return 'from-amber-600 to-amber-800';
    case 'freedom':
      return 'from-rose-600 to-rose-800';
    default:
      return 'from-primary-600 to-primary-800';
  }
}

const TwentyEightMordad: React.FC = () => {
  const { locale } = useParams<{ locale: string }>();
  const { isRTL } = useLocale();
  const validLocale = (locale === 'fa' || locale === 'en') ? locale : 'fa';

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-rose-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            to={withLocalePath(validLocale, '/')}
            className="text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors inline-flex items-center gap-2"
          >
            {isRTL ? '← بازگشت به خانه' : '← Back to Home'}
          </Link>
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mb-10"
        >
          <div
            className="relative overflow-hidden rounded-3xl shadow-2xl border border-gray-200"
            style={{
              background:
                'linear-gradient(135deg, rgba(34,197,94,0.10) 0%, rgba(255,255,255,0.92) 45%, rgba(239,68,68,0.10) 100%)',
            }}
          >
            <div className="absolute inset-0 pointer-events-none opacity-70">
              <div className="absolute -top-32 -right-32 w-[520px] h-[520px] bg-emerald-400/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-32 -left-32 w-[520px] h-[520px] bg-rose-400/20 rounded-full blur-3xl" />
            </div>

            <div className="relative p-7 sm:p-10 md:p-12">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-gray-200 text-gray-700 font-bold text-xs">
                  <span className="inline-flex w-3 h-3 rounded-sm bg-emerald-600" />
                  <span className="inline-flex w-3 h-3 rounded-sm bg-white border border-gray-300" />
                  <span className="inline-flex w-3 h-3 rounded-sm bg-rose-600" />
                  <span className="mx-1">{isRTL ? 'پرونده تاریخی مستقل' : 'Standalone historical dossier'}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={withLocalePath(validLocale, '/28mordad/0')}
                    className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white font-black px-4 py-2 rounded-xl shadow hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                  >
                    {isRTL ? 'شروع از مقدمه' : 'Start with intro'}
                  </Link>
                  <Link
                    to={withLocalePath(validLocale, '/28mordad/1')}
                    className="bg-white text-gray-900 font-extrabold px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    {isRTL ? 'فصل ۱: ایران قبل از مصدق' : 'Chapter 1'}
                  </Link>
                </div>
              </div>

              <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                {isRTL ? 'کودتای ۲۸ مرداد: حقیقت یا تحریف؟' : '28 Mordad: Truth or Distortion?'}
              </h1>

              <div className="mt-4 space-y-4 max-w-4xl">
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  {isRTL
                    ? 'چرا بعد از بیش از هفتاد سال هنوز از مصدق حرف می‌زنیم؟ چون مصدق فقط یک نخست‌وزیر در یک مقطع تاریخی نبود؛ **یک الگوی فکری** بود. الگویی که به‌جای تقویت نهادها، آن‌ها را تضعیف کرد؛ به‌جای قانون، به اراده‌ی فردی تکیه زد؛ و به‌جای مشروطه، سیاست را به هیجان و بحران سپرد.'
                    : 'Why do we still talk about Mossadegh after more than seventy years? Because Mossadegh was not just a prime minister in a historical period; he was a **pattern of thought**. A pattern that weakened institutions instead of strengthening them; relied on individual will instead of law; and surrendered politics to emotion and crisis instead of constitutionalism.'}
                </p>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  {isRTL
                    ? 'مصدق با تصمیم‌ها و روش‌هایش، **بزرگ‌ترین دستاورد مشروطیت یعنی مجلس** را از کار انداخت؛ نهادی که قرار بود قدرت را مهار کند و کشور را از استبداد حفظ کند. این نقد، نه از سر دشمنی، بلکه بر اساس اسناد، نوشته‌ها و حتی گفته‌های خود او و یارانش است.'
                    : 'Mossadegh, through his decisions and methods, disabled **parliament, the greatest achievement of constitutionalism**—an institution meant to restrain power and protect the country from despotism. This critique is not out of enmity, but based on documents, writings, and even statements by him and his allies.'}
                </p>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-semibold">
                  {isRTL
                    ? 'مصدق یک **پوپولیست بزرگ** بود—و پوپولیسم، با همه‌ی جذابیت ظاهری‌اش، برای نهادها و ثبات سیاسی **بسیار مخرب** است.'
                    : 'Mossadegh was a **great populist**—and populism, despite its apparent appeal, is **highly destructive** to institutions and political stability.'}
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="rounded-2xl bg-white/70 border border-gray-200 p-4">
                  <div className="font-black text-gray-900 mb-1">{isRTL ? '۱۲ فصل + مقدمه' : '12 chapters + intro'}</div>
                  <div className="text-sm text-gray-600">
                    {isRTL ? 'تحلیل جامع و علمی' : 'Comprehensive analysis'}
                  </div>
                </div>
                <div className="rounded-2xl bg-white/70 border border-gray-200 p-4">
                  <div className="font-black text-gray-900 mb-1">{isRTL ? 'جدول روایت‌ها' : 'Narrative map'}</div>
                  <div className="text-sm text-gray-600">
                    {isRTL ? 'روایت غالب در برابر روایت‌های رقیب' : 'Main vs alternative frames'}
                  </div>
                </div>
                <div className="rounded-2xl bg-white/70 border border-gray-200 p-4">
                  <div className="font-black text-gray-900 mb-1">{isRTL ? 'درس آزادی' : 'Freedom lesson'}</div>
                  <div className="text-sm text-gray-600">
                    {isRTL ? 'ترجمه تاریخ به حقوق مالکیت' : 'Property-first lens'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Chapter cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {chapterCards.map((c, idx) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.04 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all"
            >
              <Link to={withLocalePath(validLocale, `/28mordad/${c.id}`)} className="block p-6 h-full">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${toneStyles(c.tone)} text-white flex items-center justify-center font-black text-xl flex-shrink-0`}
                  >
                    {c.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-1 leading-snug">
                      {isRTL ? c.faTitle : c.enTitle}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {isRTL ? c.faDesc : c.enDesc}
                    </p>
                    <div className="mt-4 text-sm font-bold text-primary-700">
                      {isRTL ? 'مطالعه' : 'Open'} →
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Minimal comparison hint */}
        <div className="mt-10 rounded-3xl border border-gray-200 bg-white shadow-sm p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
            {isRTL ? 'این پرونده چه کاری می‌کند؟' : 'What does this dossier do?'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4">
              <div className="font-black text-gray-900 mb-1">{isRTL ? 'روایت غالب' : 'Main narrative'}</div>
              <div className="text-sm text-gray-700 leading-relaxed">
                {isRTL ? 'تأکید بر نقش خارجی‌ها و یک علتِ ساده.' : 'Often compresses history into a single cause.'}
              </div>
            </div>
            <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4">
              <div className="font-black text-gray-900 mb-1">{isRTL ? 'روایت‌های رقیب' : 'Alternative frames'}</div>
              <div className="text-sm text-gray-700 leading-relaxed">
                {isRTL ? 'تأکید بر چندبازیگری، نهادها، و مسئولیت داخلی.' : 'Focus on institutions and internal dynamics.'}
              </div>
            </div>
            <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4">
              <div className="font-black text-gray-900 mb-1">{isRTL ? 'معیار قضاوت' : 'Evaluation lens'}</div>
              <div className="text-sm text-gray-700 leading-relaxed">
                {isRTL ? 'آزادی واقعی = حقوق مالکیت؛ تاریخ را با همین معیار می‌سنجیم.' : 'Real freedom = property rights.'}
              </div>
            </div>
          </div>
        </div>

        {/* Final Summary */}
        <div className="mt-12 rounded-3xl border-2 border-primary-200 bg-gradient-to-br from-gray-50 to-white shadow-lg p-8 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-6">
            {isRTL ? 'جمع‌بندی: تفکر مصدقی و بدبختی‌های امروز ایران' : 'Conclusion: Mossadeghist Thought and Iran\'s Current Misfortunes'}
          </h2>
          <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
            <p>
              {isRTL
                ? 'تفکر مصدقی، با بی‌اعتمادی به نهادها، تقدیس اراده‌ی فردی و دشمن‌سازی دائمی، زمینه‌ای فکری ساخت که **در نهایت به انقلاب ۵۷ ختم شد**. بسیاری از یاران و همفکران مصدق، مستقیم یا غیرمستقیم، در شکل‌گیری فضای فکری و سیاسی آن انقلاب نقش داشتند و همان نگاه ضدنهادی و هیجانی، این‌بار با هزینه‌ای بسیار سنگین‌تر، خود را نشان داد.'
                : 'Mossadeghist thought, with its distrust of institutions, deification of individual will, and constant enemy-making, created an intellectual foundation that **ultimately led to the 1979 revolution**. Many of Mossadegh\'s allies and like-minded individuals, directly or indirectly, played a role in shaping the intellectual and political atmosphere of that revolution, and the same anti-institutional and emotional approach manifested itself again, this time with a much heavier cost.'}
            </p>
            <p className="font-semibold">
              {isRTL
                ? '**بدبختی‌های امروز ایران—از استبداد مذهبی تا بحران اقتصادی و انزوای بین‌المللی—ناشی از همان تفکرات مصدقیسم است**: پوپولیسم به‌جای نهادسازی، هیجان به‌جای عقلانیت، و دشمن‌سازی به‌جای دیپلماسی. مصدق یک پوپولیست بزرگ بود و پوپولیسم، با همه‌ی جذابیت ظاهری‌اش، برای نهادها و ثبات سیاسی بسیار مخرب است.'
                : '**Iran\'s current misfortunes—from religious despotism to economic crisis and international isolation—stem from the same Mossadeghist thought**: populism instead of institution-building, emotion instead of rationality, and enemy-making instead of diplomacy. Mossadegh was a great populist, and populism, despite its apparent appeal, is highly destructive to institutions and political stability.'}
            </p>
            <p>
              {isRTL
                ? 'شناخت مصدق، نه برای تسویه‌حساب با گذشته، بلکه برای **جلوگیری از تکرار یک خطای تاریخی** ضروری است. اگر ندانیم کدام اندیشه‌ها ما را به بن‌بست رساندند، ممکن است دوباره—با نامی تازه—به همان مسیر بازگردیم.'
                : 'Understanding Mossadegh is necessary not to settle scores with the past, but to **prevent the repetition of a historical error**. If we don\'t know which thoughts led us to deadlock, we may return to the same path again—with a new name.'}
            </p>
            <p>
              {isRTL
                ? 'در فصل‌های پیش‌رو، نشان می‌دهیم چرا این نقد لازم است و چرا بازگشت به عقلانیت نهادی، تنها راه عبور از چرخه‌ی بحران است.'
                : 'In the following chapters, we show why this critique is necessary and why returning to institutional rationality is the only way to escape the cycle of crisis.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwentyEightMordad;


