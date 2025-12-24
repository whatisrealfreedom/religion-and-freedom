import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLocale } from '../i18n/LocaleProvider';
import {
  ChatBubbleBottomCenterTextIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  ScaleIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';

type CriticItem = {
  id: string;
  title: string;
  claim: string;
  whyItMatters: string;
  possibleResponses: string[];
  howToCheck: string[];
};

const criticsFa: CriticItem[] = [
  {
    id: 'definitions',
    title: '۱) «تعریف‌ها خیلی کش‌دار/مبهم‌اند»',
    claim:
      'برخی منتقدان می‌گویند اصطلاحاتی مثل «آزادی واقعی»، «مالکیت مطلق»، «نظام صوری» اگر دقیق تعریف نشوند، هر کسی می‌تواند برداشت خودش را جا بزند.',
    whyItMatters:
      'اگر تعریف‌ها شفاف نباشند، بحث از «حل مسئله» تبدیل می‌شود به «سلیقه و برداشت»؛ و مخاطب عادی هم گیج می‌شود.',
    possibleResponses: [
      'طرفداران می‌گویند منظور از «مالکیت مطلق» یک چارچوب حقوقی-اخلاقی است: جسم/ذهن/زمان/دارایی حریم انسان‌اند و نقضشان ظلم است.',
      'گفت‌وگو وقتی جلو می‌رود که «مطلق» را دقیق کنیم: مطلق به معنای “غیرقابل‌نقض بودن اصل حق”، نه اینکه “هیچ تعارض و محدودیتی وجود ندارد”.',
    ],
    howToCheck: [
      'تعریف دقیق هر واژه را بنویس: «مالکیت جسم» دقیقاً شامل چه چیزهایی می‌شود؟',
      'برای هر تعریف، یک مثال و یک ضد مثال بساز (چه چیزی داخل تعریف هست/نیست).',
    ],
  },
  {
    id: 'godel',
    title: '۲) «گودل: آیا دین واقعاً نظام صوریِ قابل‌گودل است؟»',
    claim:
      'نقد رایج این است: اگر دین را “نظام صوری آکسیوماتیک” مثل ریاضی بدانیم، طبق گودل باید محدودیت‌هایی (ناتمامیت/عدم اثبات سازگاری از درون) داشته باشد.',
    whyItMatters:
      'چون اگر “کامل بودن” را به معنای “کامل بودن منطقی” بگیریم، ممکن است با قضایای گودل در تنش قرار بگیرد.',
    possibleResponses: [
      'طرفداران می‌گویند دین مثل ریاضی “مکانیکی و نمادین” نیست، پس دقیقاً زیر قضایای گودل نمی‌رود.',
      'یا می‌گویند “کامل” یعنی “کامل برای هدف آزادی و عدالت”، نه کامل بودن گودلی.',
    ],
    howToCheck: [
      'اول مشخص کن منظور از “نظام صوری” چیست: نمادینِ مکانیکی مثل منطق ریاضی؟ یا صرفاً “اصول‌محور و منظم”؟',
      'معیار “کامل بودن” را دقیق کن: کامل برای چه خروجی؟ اخلاقی/حقوقی/فلسفی؟',
    ],
  },
  {
    id: 'empirical',
    title: '۳) «ادعای تاریخی: آیا دین همیشه نگهبان آزادی بوده؟»',
    claim:
      'منتقدان می‌گویند در تاریخ، به نام دین هم اجبار و سرکوب رخ داده؛ پس گزاره «دین = نگهبان آزادی» نیاز به تفکیک دارد.',
    whyItMatters:
      'اگر “دینِ واقعی” و “رفتارِ حکومت‌های دینی” را جدا نکنیم، مخاطب به تناقض می‌رسد.',
    possibleResponses: [
      'طرفداران می‌گویند: باید “اصل دین” را از “اجرای تاریخی/سیاسی” جدا کرد؛ بسیاری از انحراف‌ها دقیقاً نقض همان اصول بوده‌اند.',
      'می‌گویند معیار قضاوت باید “حقوق مالکیت و عدم تعدی” باشد، نه اسم و عنوان.',
    ],
    howToCheck: [
      'نمونه‌های تاریخی را دسته‌بندی کن: کجا «اصل عدم تعدی» رعایت شده؟ کجا نقض شده؟',
      'بررسی کن آیا ادعا درباره “دین” است یا درباره “حکومت‌ها”.',
    ],
  },
  {
    id: 'policy',
    title: '۴) «از نظریه تا سیاست عمومی: دقیقاً چه نسخه‌ای می‌دهد؟»',
    claim:
      'برخی می‌گویند نظریه جذاب است اما وقتی به سیاست‌گذاری می‌رسیم (مالیات، پول، تورم، سربازی، سانسور)، باید نسخه دقیق و قابل اجرا بدهد.',
    whyItMatters:
      'بدون نسخه اجرایی، مخاطب حس می‌کند این فقط یک چارچوب زیباست ولی راه عملی ندارد.',
    possibleResponses: [
      'طرفداران می‌گویند نظریه ابتدا “گفتمان و معیار قضاوت” می‌دهد، بعد از آن می‌توان بسته‌های سیاستی استخراج کرد.',
      'می‌گویند محور نسخه اجرایی: محدود کردن اجبار، تقویت مالکیت خصوصی، شفافیت، پاسخگویی و حذف رانت.',
    ],
    howToCheck: [
      'برای هر مسئله (تورم/سانسور/اجبار) یک “اصل نقض‌شده” مشخص کن و بعد یک پیشنهاد عملی بنویس.',
      'با معیارهای قابل سنجش حرف بزن: نرخ تورم، سطح آزادی بیان، مالکیت، حریم خصوصی.',
    ],
  },
  {
    id: 'ai',
    title: '۵) «عصر هوش مصنوعی: دین را چطور به “کد اخلاقی” تبدیل می‌کنیم؟»',
    claim:
      'نقد رایج: گفتن “دین را به کد ترجمه کنیم” خوب است، ولی باید دقیقاً نشان بدهیم چگونه از اصول، قوانین اجرایی برای سیستم‌های AI ساخته می‌شود.',
    whyItMatters:
      'در AI، اگر قواعد دقیق نباشند، سیستم یا سوءاستفاده می‌شود یا خطاهای بزرگ می‌دهد.',
    possibleResponses: [
      'طرفداران می‌گویند باید اصول را به “قواعد حقوقیِ قابل‌اجرا” تبدیل کرد: حریم خصوصی، رضایت، مالکیت داده، پاسخگویی و منع تبعیض.',
      'می‌گویند هدف یک “محدودکننده ظلم” است: AI حق تجاوز به مالکیت را ندارد.',
    ],
    howToCheck: [
      'یک لیست از “ممنوعیت‌ها” بنویس (مثلاً: دسترسی به داده بدون رضایت).',
      'یک لیست از “الزام‌ها” بنویس (مثلاً: ثبت دلیل تصمیم، امکان اعتراض).',
    ],
  },
];

const criticsEn: CriticItem[] = [
  {
    id: 'definitions',
    title: '1) “The definitions feel vague or too elastic”',
    claim:
      'A common critique is that terms like “real freedom”, “absolute ownership”, and “formal system” need precise definitions—otherwise people can interpret them however they want.',
    whyItMatters:
      'If definitions are unclear, the debate becomes subjective and everyday readers will feel lost.',
    possibleResponses: [
      'Supporters argue that “absolute ownership” is a rights-ethics boundary: body/mind/time/property are personal domains; violating them is injustice.',
      'The key is to define what “absolute” means: absolute as a principle of non-violation, not “no conflicts or trade-offs ever exist”.',
    ],
    howToCheck: [
      'Write down clear definitions (what is included, what is excluded).',
      'Create examples + counterexamples for each definition.',
    ],
  },
  {
    id: 'godel',
    title: '2) “Gödel: Is religion really a Gödel-type formal system?”',
    claim:
      'If religion is treated like a strong formal axiomatic system (like arithmetic), Gödel suggests limits: incompleteness and inability to prove consistency from within.',
    whyItMatters:
      'Because “complete” in a Gödel-logical sense is very different from “complete for a practical moral/political purpose”.',
    possibleResponses: [
      'Supporters say religion is not a purely mechanical symbolic system like arithmetic—so Gödel does not apply in the same way.',
      'Or they define “complete” as “complete for protecting freedom”, not Gödel-complete.',
    ],
    howToCheck: [
      'Clarify what “formal system” means here: strict symbolic calculus, or “principle-based framework”.',
      'Clarify what “complete” means: complete for which output (ethical, legal, social)?',
    ],
  },
  {
    id: 'empirical',
    title: '3) “History: hasn’t religion sometimes enabled coercion?”',
    claim:
      'Critics argue coercion has also happened “in the name of religion”, so “religion = guardian of freedom” needs careful distinction.',
    whyItMatters:
      'If we do not separate “principles” from “historical political practice”, readers will see contradiction immediately.',
    possibleResponses: [
      'Supporters separate core principles from political misuse; many historical abuses violate the very principles claimed.',
      'They propose judging by “property rights / non-aggression”, not labels or titles.',
    ],
    howToCheck: [
      'Classify historical cases: where are non-aggression/property rights respected vs violated?',
      'Ask whether the claim is about religion itself or about governments.',
    ],
  },
  {
    id: 'policy',
    title: '4) “From theory to policy: what’s the executable program?”',
    claim:
      'The framework sounds inspiring, but critics ask for concrete policy steps (money/inflation, censorship, conscription, taxes, etc.).',
    whyItMatters:
      'Without an actionable path, readers may feel it is more rhetoric than implementation.',
    possibleResponses: [
      'Supporters say the theory provides evaluation criteria first, then concrete policies can be derived.',
      'They emphasize limiting coercion, strengthening private property, transparency/accountability, and reducing rent-seeking.',
    ],
    howToCheck: [
      'For each real problem (inflation/censorship/coercion), identify which principle is violated and propose a concrete fix.',
      'Use measurable indicators: inflation rate, speech restrictions, property security, privacy protections.',
    ],
  },
  {
    id: 'ai',
    title: '5) “AI era: how do you translate principles into enforceable code?”',
    claim:
      'Saying “translate religion into machine-ethics” is not enough—critics want a concrete mapping into enforceable rules for AI systems.',
    whyItMatters:
      'In AI, vague rules produce loopholes and failure modes.',
    possibleResponses: [
      'Supporters propose translating principles into enforceable rights: privacy, consent, data ownership, accountability, non-discrimination.',
      'The goal becomes an “anti-oppression constraint”: AI must not violate ownership domains.',
    ],
    howToCheck: [
      'Write a list of prohibitions (e.g., accessing data without consent).',
      'Write a list of requirements (e.g., decision logging, appeal mechanisms).',
    ],
  },
];

const Critics: React.FC = () => {
  const { t, locale, isRTL } = useLocale();
  const isEnglish = locale === 'en';
  const critics = isEnglish ? criticsEn : criticsFa;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50 to-white py-8 sm:py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mb-10 sm:mb-12">
          <Link
            to="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6 text-sm sm:text-base"
          >
            <ArrowLeftIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {t('common.backHome')}
          </Link>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
              <ChatBubbleBottomCenterTextIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {t('critics.title')}
              </h1>
              <p className="mt-3 text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                {t('critics.subtitle')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Safety / Fairness note */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 mb-10">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center flex-shrink-0">
              <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="text-gray-800">
              <p className="font-bold text-lg">{t('critics.noteTitle')}</p>
              <p className="mt-2 leading-relaxed">
                {t('critics.noteText')}
              </p>
            </div>
          </div>
        </div>

        {/* Critic items */}
        <div className="space-y-6 sm:space-y-8">
          {critics.map((item, idx) => (
            <motion.section
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.04 }}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <div className="p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{item.title}</h2>

                <div className="mt-6 grid grid-cols-1 gap-5">
                  <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-5 sm:p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <ScaleIcon className="w-6 h-6 text-primary-700" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{t('critics.labels.critique')}</p>
                        <p className="mt-2 text-gray-700 leading-relaxed">{item.claim}</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-yellow-50 to-white p-5 sm:p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center flex-shrink-0">
                        <ExclamationTriangleIcon className="w-6 h-6 text-yellow-700" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{t('critics.labels.why')}</p>
                        <p className="mt-2 text-gray-700 leading-relaxed">{item.whyItMatters}</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-green-50 to-white p-5 sm:p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircleIcon className="w-6 h-6 text-green-700" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{t('critics.labels.responses')}</p>
                        <ul className="mt-2 space-y-2 text-gray-700 leading-relaxed list-disc pr-5">
                          {item.possibleResponses.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-purple-50 to-white p-5 sm:p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <AcademicCapIcon className="w-6 h-6 text-purple-800" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{t('critics.labels.howToCheck')}</p>
                        <ul className="mt-2 space-y-2 text-gray-700 leading-relaxed list-disc pr-5">
                          {item.howToCheck.map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 rounded-2xl sm:rounded-3xl p-8 sm:p-10 text-white shadow-2xl">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">{t('critics.ctaTitle')}</h3>
          <p className="mt-3 text-blue-100 text-base sm:text-lg leading-relaxed">
            {t('critics.ctaText')}
          </p>
          <div className="mt-6">
            <Link
              to="/resources"
              className="inline-flex items-center gap-3 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-xl transition-all duration-300"
            >
              {t('critics.ctaButton')}
              <ArrowLeftIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Critics;


