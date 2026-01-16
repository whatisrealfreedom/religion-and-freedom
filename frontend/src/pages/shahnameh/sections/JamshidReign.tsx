import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLocale } from '../../../i18n/LocaleProvider';
import { withLocalePath } from '../../../i18n/localePath';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const JamshidReign: React.FC = () => {
  const { locale } = useParams<{ locale: string }>();
  const { isRTL } = useLocale();
  const validLocale = (locale === 'fa' || locale === 'en') ? locale : 'fa';

  const content = `
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold text-amber-900 mb-8 text-center border-b-2 border-amber-300 pb-4">پادشاهی جمشید – هفتصد سال عصر طلایی</h2>
      
      <!-- خلاصه کلی بخش -->
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border-r-4 border-blue-500 shadow-md">
        <h3 class="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
          <span class="text-2xl">📖</span>
          خلاصه کلی این بخش
        </h3>
        <div class="text-base text-gray-800 leading-relaxed space-y-3">
          <p>این بخش داستان <strong>پادشاهی هفتصدسالهٔ جمشید</strong> را روایت می‌کند؛ از آغاز شکوهمند تا سقوط تلخ. فردوسی در این بخش، قدم به قدم نشان می‌دهد که چگونه جمشید تمدن بشری را ساخت:</p>
          <ul class="list-disc list-inside space-y-2 mr-4">
            <li><strong>آغاز پادشاهی:</strong> جمشید با فرّ ایزدی بر تخت می‌نشیند و جهان را فرمانبردار می‌کند.</li>
            <li><strong>پنجاه سال اول:</strong> ساخت سلاح و ابزار آهنی برای امنیت و دفاع.</li>
            <li><strong>پنجاه سال دوم:</strong> اختراع پارچه‌بافی و زیبایی‌آفرینی.</li>
            <li><strong>پنجاه سال سوم و چهارم:</strong> طبقه‌بندی حرفه‌ها و ساختار اجتماعی (روحانیان، جنگجویان، کشاورزان، صنعتگران).</li>
            <li><strong>پنجاه سال پنجم:</strong> رام کردن دیوان، معماری، جواهرات، عطر، پزشکی و کشتی‌رانی.</li>
            <li><strong>تخت جمشید و نوروز:</strong> ساخت تخت جواهرنشان، بنیان‌گذاری نوروز، سیصد سال بدون مرگ و بیماری.</li>
            <li><strong>سقوط:</strong> غرور جمشید و گفتن "من خدایم"، رفتن فرّ ایزدی و آغاز آشوب.</li>
          </ul>
          <p class="pt-2 border-t border-blue-200"><strong>درس اصلی:</strong> فردوسی نشان می‌دهد که قدرت بدون تواضع و شکرگزاری، فرّ الهی را می‌برد. این آیینهٔ هر امپراتوری و هر انسانی است که به اوج می‌رسد و خدا را فراموش می‌کند.</p>
        </div>
      </div>
      
      <!-- آغاز پادشاهی – نشستن بر تخت -->
      <div class="mb-8">
        <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <span class="w-2 h-8 bg-amber-500 rounded"></span>
          آغاز پادشاهی – نشستن بر تخت
        </h3>
        
        <!-- بیت 1 -->
        <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-6 mb-5 border-r-4 border-amber-500 shadow-md">
          <div class="mb-4">
            <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">گرانمایه جمشید فرزند او</p>
            <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">کمر بست یک‌دل پر از پند او</p>
          </div>
          <div class="bg-white rounded-lg p-4 mt-4">
            <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> جمشید گران‌قدر، فرزند طهمورث، با دلی یکتا و پر از اندرزهای پدر، کمر به خدمت و پادشاهی بست.</p>
            <p class="text-xs text-gray-600 leading-relaxed italic"><strong class="text-gray-700">توضیح:</strong> «گرانمایه» یعنی ارزشمند و اصیل؛ «یک‌دل» یعنی خالص و بی‌ریا. فردوسی از اول جمشید را نه فقط شاه، بلکه وارث حکمت نشان می‌دهد – آغاز یک عصر طلایی.</p>
          </div>
        </div>

        <!-- بیت 2 -->
        <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-6 mb-5 border-r-4 border-amber-500 shadow-md">
          <div class="mb-4">
            <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">برآمد بر آن تخت فرّخ پدر</p>
            <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">به رسم کیان بر سرش تاج زر</p>
          </div>
          <div class="bg-white rounded-lg p-4 mt-4">
            <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> بر تخت فرخندهٔ پدر نشست و به رسم شاهان باستانی (کیان)، تاج زرین بر سر نهاد.</p>
            <p class="text-xs text-gray-600 leading-relaxed italic"><strong class="text-gray-700">توضیح:</strong> «فرّخ» یعنی مبارک و نورانی؛ «کیان» اشاره به سلسلهٔ کیانیان، اما اینجا نماد پادشاهی اصیل ایرانی. تاج زر = نماد فرّ ایزدی.</p>
          </div>
        </div>

        <!-- بیت 3 -->
        <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-6 mb-5 border-r-4 border-amber-500 shadow-md">
          <div class="mb-4">
            <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">کمر بست با فرّ شاهنشهی</p>
            <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">جهان گشت سرتاسر او را رهی</p>
          </div>
          <div class="bg-white rounded-lg p-4 mt-4">
            <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> با فرّ شاهنشاهی کمر بست و سراسر جهان فرمانبردار او شد.</p>
            <p class="text-xs text-gray-600 leading-relaxed italic"><strong class="text-gray-700">توضیح:</strong> «فرّ شاهنشهی» نور الهی پادشاهی؛ «رهی» یعنی بنده و فرمانبر. جهان مثل رودخانه‌ای به سوی او جاری می‌شود.</p>
          </div>
        </div>

        <!-- بیت 4 -->
        <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-6 mb-5 border-r-4 border-amber-500 shadow-md">
          <div class="mb-4">
            <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">زمانه بر آسود از داوری</p>
            <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">به فرمان او دیو و مرغ و پری</p>
          </div>
          <div class="bg-white rounded-lg p-4 mt-4">
            <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> روزگار از ستم و داوری ناعادلانه آسود؛ دیو و مرغ و پری همه فرمانبر او گردیدند.</p>
            <p class="text-xs text-gray-600 leading-relaxed italic"><strong class="text-gray-700">توضیح:</strong> «داوری» یعنی قضاوت ناعادلانه؛ دیو (اهریمنی)، مرغ (پرندگان)، پری (موجودات آسمانی) = همه نیروهای طبیعت رام انسان می‌شوند – تمدن آغاز می‌شود.</p>
          </div>
        </div>

        <!-- بیت 5 -->
        <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-6 mb-5 border-r-4 border-amber-500 shadow-md">
          <div class="mb-4">
            <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">جهان را فزوده بدو آبروی</p>
            <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">فروزان شده تخت شاهی بدوی</p>
          </div>
          <div class="bg-white rounded-lg p-4 mt-4">
            <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> جهان به او آبرو یافت و تخت شاهی‌اش درخشان گردید.</p>
            <p class="text-xs text-gray-600 leading-relaxed italic"><strong class="text-gray-700">توضیح:</strong> «فزوده آبروی» یعنی افزایش حیثیت؛ فروزان = تابان. فردوسی جهان را قبل از جمشید تاریک نشان می‌دهد، او نور می‌آورد.</p>
          </div>
        </div>

        <!-- بیت 6 -->
        <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-6 mb-5 border-r-4 border-amber-500 shadow-md">
          <div class="mb-4">
            <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">منم گفت با فرّهٔ ایزدی</p>
            <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">همم شهریاری همم موبدی</p>
          </div>
          <div class="bg-white rounded-lg p-4 mt-4">
            <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> گفت: منم آن که با فرّ ایزدی، هم شهریاری دارم و هم موبدی (روحانی‌گری و هدایت).</p>
            <p class="text-xs text-gray-600 leading-relaxed italic"><strong class="text-gray-700">توضیح:</strong> ایهام بزرگ: جمشید شاه و پیامبرگونه است. فرّ ایزدی = مشروعیت الهی.</p>
          </div>
        </div>

        <!-- بیت 7 -->
        <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-6 mb-5 border-r-4 border-amber-500 shadow-md">
          <div class="mb-4">
            <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">بدان را ز بد دست کوته کنم</p>
            <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">روان را سوی روشنی ره کنم</p>
          </div>
          <div class="bg-white rounded-lg p-4 mt-4">
            <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> دست بدکاران را کوتاه می‌کنم و روان‌ها را به سوی روشنایی راه می‌نمایانم.</p>
            <p class="text-xs text-gray-600 leading-relaxed italic"><strong class="text-gray-700">توضیح:</strong> تضاد بد/روشنایی؛ برنامهٔ جمشید: عدالت + روشنگری.</p>
          </div>
        </div>
      </div>

      <!-- جمع کوچک -->
      <div class="bg-blue-50 border-r-4 border-blue-500 rounded-lg p-4 mt-5">
        <p class="text-sm text-blue-900 font-semibold italic"><strong>جمع کوچک:</strong> ۸ بیت اول، مقدمهٔ باشکوه است. جمشید مثل خورشید طلوع می‌کند؛ جهان فرمانبر، طبیعت رام، عدالت آغاز.</p>
      </div>
    </div>

    <!-- پنجاه سال اول – ابزار جنگ و آهن -->
    <div class="mb-8">
      <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <span class="w-2 h-8 bg-amber-500 rounded"></span>
        پنجاه سال اول – ابزار جنگ و آهن
      </h3>
      
      
      <!-- بیت 1 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">نخست آلت جنگ را دست برد</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">در نام جستن به گردان سپرد</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> نخست به ساخت ابزار جنگ دست زد و آن را به پهلوانان سپرد.</p>
          <p class="text-xs text-gray-600 leading-relaxed italic"><strong class="text-gray-700">توضیح:</strong> «آلت جنگ» = سلاح؛ «گردان» = پهلوانان چرخان در میدان. امنیت اول تمدن است.</p>
        </div>
      </div>

      <!-- بیت 2 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">به فرّ کیی نرم کرد آهنا</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">چو خود و زره کرد و چون جوشنا</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> با فرّ کیانی، آهن را نرم کرد و از آن کلاه‌خود، زره و جوشن ساخت.</p>
          <p class="text-xs text-gray-600 leading-relaxed italic"><strong class="text-gray-700">توضیح:</strong> «فرّ کیی» = فرّ کیانی (نور پادشاهی)؛ آهن نرم = انقلاب صنعتی اساطیری.</p>
        </div>
      </div>

      <!-- بیت 3 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">چو خفتان و تیغ و چو برگستوان</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">همه کرد پیدا به روشن روان</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> خفتان، تیغ و برگستوان را پدید آورد؛ همه را با خرد روشن آشکار کرد.</p>
          <p class="text-xs text-gray-600 leading-relaxed italic"><strong class="text-gray-700">توضیح:</strong> لیست سلاح‌ها؛ «روشن روان» = خرد درخشان.</p>
        </div>
      </div>

      <!-- بیت 4 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">بدین اندرون سال پنجاه رنج</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">ببرد و از این چند بنهاد گنج</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> در این کار پنجاه سال رنج برد و گنج‌های بسیاری اندوخت.</p>
          <p class="text-xs text-gray-600 leading-relaxed italic"><strong class="text-gray-700">توضیح:</strong> زمان‌بندی دقیق؛ رنج = تلاش، گنج = ثروت تمدنی.</p>
        </div>
      </div>

      <!-- جمع کوچک -->
      <div class="bg-blue-50 border-r-4 border-blue-500 rounded-lg p-4 mt-5">
        <p class="text-sm text-blue-900 font-semibold italic"><strong>جمع کوچک:</strong> عصر قدرت نظامی؛ انسان از ترس به امنیت می‌رسد.</p>
      </div>
    </div>

    <!-- پنجاه سال دوم – جامه و زیبایی -->
    <div class="mb-8">
      <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <span class="w-2 h-8 bg-amber-500 rounded"></span>
        پنجاه سال دوم – جامه و زیبایی
      </h3>
      
      <!-- بیت 1 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">دگر پنجه اندیشهٔ جامه کرد</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">که پوشند هنگام ننگ و نبرد</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> پنجاه سال دیگر به فکر جامه افتاد تا در جنگ و ننگ بپوشند.</p>
          <p class="text-xs text-gray-600 leading-relaxed italic"><strong class="text-gray-700">توضیح:</strong> «ننگ و نبرد» = شرم و جنگ؛ جامه = پوشش فرهنگی.</p>
        </div>
      </div>

      <!-- بیت 2 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">ز کتّان و ابریشم و موی قز</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">قصب کرد پر مایه دیبا و خز</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> از کتان، ابریشم، موی قز، قصب، دیبا و خز جامه‌های گران‌بها ساخت.</p>
          <p class="text-xs text-gray-600 leading-relaxed italic"><strong class="text-gray-700">توضیح:</strong> مواد لوکس؛ زیبایی از وحشی‌گری به تمدن.</p>
        </div>
      </div>

      <!-- بیت 3 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">بیاموختشان رشتن و تافتن</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">به تار اندرون پود را بافتن</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> رشتن، تافتن و بافتن تار و پود را آموخت.</p>
          <p class="text-xs text-gray-600 leading-relaxed italic"><strong class="text-gray-700">توضیح:</strong> آموزش فنی؛ صنعت نساجی.</p>
        </div>
      </div>

      <!-- بیت 4 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">چو شد بافته شستن و دوختن</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">گرفتند از او یک‌سر آموختن</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> شستن و دوختن را هم یاد دادند؛ همه از او آموختند.</p>
          <p class="text-xs text-gray-600 leading-relaxed italic"><strong class="text-gray-700">توضیح:</strong> کامل شدن چرخهٔ تولید.</p>
        </div>
      </div>

      <!-- جمع کوچک -->
      <div class="bg-blue-50 border-r-4 border-blue-500 rounded-lg p-4 mt-5">
        <p class="text-sm text-blue-900 font-semibold italic"><strong>جمع کوچک:</strong> انسان زیبا می‌شود؛ از پوست به پارچه، از وحشی به متمدن.</p>
      </div>
    </div>

    <!-- طبقه‌بندی حرفه‌ها و طبقات -->
    <div class="mb-8">
      <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <span class="w-2 h-8 bg-amber-500 rounded"></span>
        طبقه‌بندی حرفه‌ها و طبقات (پنجاه سال سوم و چهارم)
      </h3>
      
      
      <!-- بیت 1 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">چو این کرده شد ساز دیگر نهاد</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">زمانه بدو شاد و او نیز شاد</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> این کارها تمام شد، ساز دیگری نهاد؛ زمانه و او شاد شدند.</p>
        </div>
      </div>

      <!-- بیت 2 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">ز هر انجمن پیشه‌ور گرد کرد</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">بدین اندرون نیز پنجاه خورد</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> از هر گروه پیشه‌وران جمع کرد؛ پنجاه سال دیگر صرف این کار شد.</p>
        </div>
      </div>

      <!-- بیت 3 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">گروهی که کاتوزیان خوانی‌اش</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">به رسم پرستندگان دانی‌اش</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> گروهی که کاتوزیان (روحانیان) خوانیش؛ به رسم پرستندگان می‌شناسی‌شان.</p>
        </div>
      </div>

      <!-- بیت 4 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">جدا کردشان از میان گروه</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">پرستنده را جایگه کرد کوه</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> آنها را از مردم جدا کرد و جای پرستش را کوه قرار داد.</p>
        </div>
      </div>

      <!-- بیت 5 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">بدان تا پرستش بود کارشان</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">نوان پیش روشن جهاندارشان</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> تا پرستش کارشان باشد، در پیشگاه روشن جهاندار (خدا).</p>
        </div>
      </div>

      <!-- بیت 6 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">صفی بر دگر دست بنشاندند</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">همی نام نیساریان خواندند</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> گروه دیگر را صفی (جنگجویان) نامیدند.</p>
        </div>
      </div>

      <!-- بیت 7 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">کجا شیر مردان جنگ آورند</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">فروزندهٔ لشکر و کشورند</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> شیرمردان جنگ‌آور، فروزانندهٔ لشکر و کشور.</p>
        </div>
      </div>

      <!-- بیت 8 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">کز ایشان بود تخت شاهی به جای</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">و ز ایشان بود نام مردی به پای</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> تخت شاهی به جای ایشان است و نام مردی بر پای آنها.</p>
        </div>
      </div>

      <!-- بیت 9 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">بسودی سه دیگر گره را شناس</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">کجا نیست از کس بر ایشان سپاس</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> کشاورزان (بسودی/نسودی) سومین گروه؛ که از کسی سپاس ندارند (خودکفا).</p>
        </div>
      </div>

      <!-- بیت 10 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">بکارند و ورزند و خود بدروند</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">به گاه خورش سرزنش نشنوند</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> بکارند، ورزند، خود بدروند؛ در وقت برداشت سرزنش نشنوند.</p>
        </div>
      </div>

      <!-- بیت 11 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">ز فرمان تن‌آزاده و ژنده‌پوش</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">ز آواز پیغاره آسوده گوش</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> از فرمان آزادگان و ژنده‌پوشان آزاد، از آواز پیغاره (سرزنش) گوش آسوده.</p>
        </div>
      </div>

      <!-- بیت 12 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">تن آزاد و آباد گیتی بر اوی</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">بر آسوده از داور و گفتگوی</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> تن آزاد و گیتی آباد بر او (کشاورز)؛ آسوده از داور و گفتگو.</p>
        </div>
      </div>

      <!-- بیت 13 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">چه گفت آن سخن‌گوی آزاده مرد</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">که آزاده را کاهلی بنده کرد</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> سخن‌گوی آزاده گفت: کاهلی، آزاده را بنده کرد.</p>
        </div>
      </div>

      <!-- بیت 14 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">چهارم که خوانند اهتوخوشی</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">همان دست‌ورزان ابا سرکشی</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> چهارم صنعتگران (اهتوخوشی) دست‌ورزان با سرکشی (خلاقیت).</p>
        </div>
      </div>

      <!-- بیت 15 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">کجا کارشان همگنان پیشه بود</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">روانشان همیشه پر اندیشه بود</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> کارشان پیشه بود، روانشان همیشه پر اندیشه.</p>
        </div>
      </div>

      <!-- بیت 16 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">بدین اندرون سال پنجاه نیز</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">بخورد و بورزید و بخشید چیز</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> پنجاه سال دیگر خورد و ورزید و بخشید.</p>
        </div>
      </div>

      <!-- بیت 17 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">از این هر یکی را یکی پایگاه</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">سزاوار بگزید و بنمود راه</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> برای هر کدام پایگاه سزاوار برگزید و راه نمود.</p>
        </div>
      </div>

      <!-- بیت 18 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">که تا هر کس اندازهٔ خویش را</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">ببیند بداند کم و بیش را</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> تا هر کس اندازهٔ خود را ببیند و کم و بیش را بداند.</p>
        </div>
      </div>

      <!-- جمع کوچک -->
      <div class="bg-blue-50 border-r-4 border-blue-500 rounded-lg p-4 mt-5">
        <p class="text-sm text-blue-900 font-semibold italic"><strong>جمع کوچک:</strong> ساختار اجتماعی ایده‌آل فردوسی: روحانیان در کوه (دور از قدرت)، جنگجویان برای دفاع، کشاورزان برای نان، صنعتگران برای خلاقیت. جامعه بدون حسادت، هر کس در جای خود.</p>
      </div>
    </div>

    <!-- پنجاه سال پنجم – رام دیوان، معماری، عطر، پزشکی -->
    <div class="mb-8">
      <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <span class="w-2 h-8 bg-amber-500 rounded"></span>
        پنجاه سال پنجم – رام دیوان، معماری، عطر، پزشکی
      </h3>
      
      
      <!-- بیت 1 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">بفرمود پس دیو ناپاک را</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">به آب اندر آمیختن خاک را</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> دیوان ناپاک را فرمان داد خاک را با آب بیامیزند (خشت).</p>
        </div>
      </div>

      <!-- بیت 2 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">هر آنچ از گل آمد چو بشناختند</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">سبک خشت را کالبد ساختند</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> گل را شناختند، خشت ساختند.</p>
        </div>
      </div>

      <!-- بیت 3 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">به سنگ و به گچ دیو دیوار کرد</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">نخست از بَرَش هندسی کار کرد</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> دیوار از سنگ و گچ؛ هندسه را آغاز کرد.</p>
        </div>
      </div>

      <!-- بیت 4 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">چو گرمابه و کاخ‌های بلند</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">چو ایوان که باشد پناه از گزند</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> گرمابه، کاخ بلند، ایوان پناه از گزند.</p>
        </div>
      </div>

      <!-- بیت 5 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">ز خارا گهر جست یک روزگار</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">همی کرد از او روشنی خواستار</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> از سنگ قیمتی جست، روشنی خواست.</p>
        </div>
      </div>

      <!-- بیت 6 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">به چنگ آمدش چند گونه گهر</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">چو یاقوت و بیجاده و سیم و زر</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> یاقوت، بیجاده، سیم، زر به دست آمد.</p>
        </div>
      </div>

      <!-- بیت 7 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">ز خارا به افسون برون آورید</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">شد آراسته بندها را کلید</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> با افسون از سنگ بیرون آورد، کلید گنج‌ها.</p>
        </div>
      </div>

      <!-- بیت 8 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">دگر بوی‌های خوش آورد باز</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">که دارند مردم به بویش نیاز</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> بوی‌های خوش آورد که مردم نیاز دارند.</p>
        </div>
      </div>

      <!-- بیت 9 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">چو بان و چو کافور و چون مشک ناب</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">چو عود و چو عنبر چو روشن گلاب</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> بان، کافور، مشک، عود، عنبر، گلاب.</p>
        </div>
      </div>

      <!-- بیت 10 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">پزشکی و درمان هر دردمند</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">در تندرستی و راه گزند</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> پزشکی و درمان دردمندان، راه تندرستی و گزند.</p>
        </div>
      </div>

      <!-- بیت 11 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">همان رازها کرد نیز آشکار</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">جهان را نیامد چنو خواستار</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> رازها را آشکار کرد؛ جهان چنین کسی نخواست.</p>
        </div>
      </div>

      <!-- بیت 12 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">گذر کرد از آن پس به کشتی بر آب</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">ز کشور به کشور گرفتی شتاب</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> کشتی ساخت، از کشور به کشور شتاب کرد.</p>
        </div>
      </div>

      <!-- بیت 13 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">چنین سال پنجه برنجید نیز</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">ندید از هنر بر خرد بسته چیز</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> پنجاه سال رنج برد، هنری بر خرد بسته ندید (همه کامل).</p>
        </div>
      </div>

      <!-- جمع کوچک -->
      <div class="bg-blue-50 border-r-4 border-blue-500 rounded-lg p-4 mt-5">
        <p class="text-sm text-blue-900 font-semibold italic"><strong>جمع کوچک:</strong> پیروزی خرد بر طبیعت وحشی؛ معماری، جواهرات، عطر، پزشکی، کشتی‌رانی – تمدن کامل.</p>
      </div>
    </div>

    <!-- تخت جمشید، نوروز، سیصد سال بدون مرگ -->
    <div class="mb-8">
      <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <span class="w-2 h-8 bg-amber-500 rounded"></span>
        تخت جمشید، نوروز، سیصد سال بدون مرگ
      </h3>
      
      
      <!-- بیت 1 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">همه کردنی‌ها چو آمد به جای</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">ز جای مهی برتر آورد پای</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> همه کارها تمام شد، پا از جای شاهی بالاتر نهاد (غرور آغاز).</p>
        </div>
      </div>

      <!-- بیت 2 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">به فرّ کیانی یکی تخت ساخت</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">چه مایه بدو گوهر اندر نشاخت</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> تخت با فرّ کیانی ساخت، جواهرات بسیار نهاد.</p>
        </div>
      </div>

      <!-- بیت 3 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">که چون خواستی دیو برداشتی</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">ز هامون به گردون برافراشتی</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> دیوان آن را به آسمان می‌بردند.</p>
        </div>
      </div>

      <!-- بیت 4 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">چو خورشید تابان میان هوا</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">نشسته بر او شاه فرمانروا</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> مانند خورشید در هوا، شاه بر آن نشسته.</p>
        </div>
      </div>

      <!-- بیت 5 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">جهان انجمن شد بر آن تخت او</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">شگفتی فرومانده از بخت او</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> جهان بر تخت او جمع شد، شگفت‌زده از بخت او.</p>
        </div>
      </div>

      <!-- بیت 6 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">به جمشید بر گوهر افشاندند</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">مر آن روز را روز نو خواندند</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> بر جمشید گوهر افشاندند، آن روز را روز نو خواندند.</p>
        </div>
      </div>

      <!-- بیت 7 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">سر سال نو هرمز فرودین</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">بر آسوده از رنج روی زمین</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> سر سال نو، هرمز فروردین، زمین از رنج آسوده.</p>
        </div>
      </div>

      <!-- بیت 8 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">بزرگان به شادی بیاراستند</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">می و جام و رامشگران خواستند</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> بزرگان شادی آراستند، می و جام و رامشگران.</p>
        </div>
      </div>

      <!-- بیت 9 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">چنین جشن فرخ از آن روزگار</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">به ما ماند از آن خسروان یادگار</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> این جشن فرخ از آن روزگار به ما ماندگار شد.</p>
        </div>
      </div>

      <!-- بیت 10 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">چنین سال سیصد همی رفت کار</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">ندیدند مرگ اندر آن روزگار</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> سیصد سال چنین گذشت، مرگ ندیدند.</p>
        </div>
      </div>

      <!-- بیت 11 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">ز رنج و ز بدشان نبد آگهی</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">میان بسته دیوان به سان رهی</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> از رنج و بد آگه نبودند، دیوان مانند بنده میان بسته.</p>
        </div>
      </div>

      <!-- بیت 12 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">به فرمان مردم نهاده دو گوش</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">ز رامش جهان پر ز آوای نوش</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> دیوان گوش به فرمان مردم نهاده، جهان پر از آوای نوش (شادی).</p>
        </div>
      </div>

      <!-- بیت 13 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">چنین تا بر آمد بر این روزگار</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">ندیدند جز خوبی از کردگار</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> تا این روزگار گذشت، جز خوبی از کردگار ندیدند.</p>
        </div>
      </div>

      <!-- بیت 14 -->
      <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-r-4 border-amber-500 shadow-sm">
        <div class="mb-3">
          <p class="text-xl font-semibold text-amber-900 leading-relaxed mb-2 text-right">جهان سربه‌سر گشت او را رهی</p>
          <p class="text-xl font-semibold text-amber-900 leading-relaxed text-right">نشسته جهاندار با فرّهی</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-amber-800">معنی:</strong> جهان سربه‌سر فرمانبر او، جهاندار با فرّهی نشسته.</p>
        </div>
      </div>

      <!-- جمع کوچک -->
      <div class="bg-blue-50 border-r-4 border-blue-500 rounded-lg p-4 mt-5">
        <p class="text-sm text-blue-900 font-semibold italic"><strong>جمع کوچک:</strong> اوج بهشت زمینی؛ تخت آسمانی، نوروز، سیصد سال بدون مرگ – اما مقدمهٔ غرور.</p>
      </div>
    </div>

    <!-- سقوط – منی و رفتن فرّ -->
    <div class="mb-10">
      <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <span class="w-2 h-8 bg-red-500 rounded"></span>
        سقوط – منی و رفتن فرّ
      </h3>
      
      
      <!-- بیت 1 -->
      <div class="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6 mb-5 border-r-4 border-red-500 shadow-md">
        <div class="mb-4">
          <p class="text-xl font-semibold text-red-900 leading-relaxed mb-2 text-right">یکایک به تخت مهی بنگرید</p>
          <p class="text-xl font-semibold text-red-900 leading-relaxed text-right">به گیتی جز از خویشتن را ندید</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-red-800">معنی:</strong> به تخت شاهی نگریست، در گیتی جز خود ندید.</p>
        </div>
      </div>

      <!-- بیت 2 -->
      <div class="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6 mb-5 border-r-4 border-red-500 shadow-md">
        <div class="mb-4">
          <p class="text-xl font-semibold text-red-900 leading-relaxed mb-2 text-right">منی کرد آن شاه یزدان‌شناس</p>
          <p class="text-xl font-semibold text-red-900 leading-relaxed text-right">ز یزدان بپیچید و شد ناسپاس</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-red-800">معنی:</strong> منی کرد، یزدان را ناسپاس شد.</p>
        </div>
      </div>

      <!-- بیت 3 -->
      <div class="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6 mb-5 border-r-4 border-red-500 shadow-md">
        <div class="mb-4">
          <p class="text-xl font-semibold text-red-900 leading-relaxed mb-2 text-right">گرانمایگان را ز لشگر بخواند</p>
          <p class="text-xl font-semibold text-red-900 leading-relaxed text-right">چه مایه سخن پیش ایشان براند</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-red-800">معنی:</strong> بزرگان لشکر را خواند، سخن بسیار راند.</p>
        </div>
      </div>

      <!-- بیت 4 -->
      <div class="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6 mb-5 border-r-4 border-red-500 shadow-md">
        <div class="mb-4">
          <p class="text-xl font-semibold text-red-900 leading-relaxed mb-2 text-right">چنین گفت با سالخورده مهان</p>
          <p class="text-xl font-semibold text-red-900 leading-relaxed text-right">که جز خویشتن را ندانم جهان</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-red-800">معنی:</strong> گفت: جهان را جز خود نمی‌دانم.</p>
        </div>
      </div>

      <!-- بیت 5 -->
      <div class="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6 mb-5 border-r-4 border-red-500 shadow-md">
        <div class="mb-4">
          <p class="text-xl font-semibold text-red-900 leading-relaxed mb-2 text-right">هنر در جهان از من آمد پدید</p>
          <p class="text-xl font-semibold text-red-900 leading-relaxed text-right">چو من نامور تخت شاهی ندید</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-red-800">معنی:</strong> هنر از من پدید آمد، تخت شاهی نامورتر از من ندید.</p>
        </div>
      </div>

      <!-- بیت 6 -->
      <div class="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6 mb-5 border-r-4 border-red-500 shadow-md">
        <div class="mb-4">
          <p class="text-xl font-semibold text-red-900 leading-relaxed mb-2 text-right">جهان را به خوبی من آراستم</p>
          <p class="text-xl font-semibold text-red-900 leading-relaxed text-right">چنان است گیتی کجا خواستم</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-red-800">معنی:</strong> جهان را به خوبی آراستم، گیتی چنان است که خواستم.</p>
        </div>
      </div>

      <!-- بیت 7 -->
      <div class="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6 mb-5 border-r-4 border-red-500 shadow-md">
        <div class="mb-4">
          <p class="text-xl font-semibold text-red-900 leading-relaxed mb-2 text-right">خور و خواب و آرامتان از من است</p>
          <p class="text-xl font-semibold text-red-900 leading-relaxed text-right">همان کوشش و کامتان از من است</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-red-800">معنی:</strong> خور و خواب و آرام از من، کوشش و کام از من.</p>
        </div>
      </div>

      <!-- بیت 8 -->
      <div class="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6 mb-5 border-r-4 border-red-500 shadow-md">
        <div class="mb-4">
          <p class="text-xl font-semibold text-red-900 leading-relaxed mb-2 text-right">بزرگی و دیهیم شاهی مراست</p>
          <p class="text-xl font-semibold text-red-900 leading-relaxed text-right">که گوید که جز من کسی پادشاست</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-red-800">معنی:</strong> بزرگی و دیهیم شاهی مراست، کیست که بگوید جز من پادشاست؟</p>
        </div>
      </div>

      <!-- بیت 9 -->
      <div class="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6 mb-5 border-r-4 border-red-500 shadow-md">
        <div class="mb-4">
          <p class="text-xl font-semibold text-red-900 leading-relaxed mb-2 text-right">همه موبدان سرفگنده نگون</p>
          <p class="text-xl font-semibold text-red-900 leading-relaxed text-right">چرا کس نیارست گفتن نه چون</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-red-800">معنی:</strong> موبدان سرفگنده، چرا کسی نگفت نه.</p>
        </div>
      </div>

      <!-- بیت 10 -->
      <div class="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6 mb-5 border-r-4 border-red-500 shadow-md">
        <div class="mb-4">
          <p class="text-xl font-semibold text-red-900 leading-relaxed mb-2 text-right">چو این گفته شد فرّ یزدان از اوی</p>
          <p class="text-xl font-semibold text-red-900 leading-relaxed text-right">بگشت و جهان شد پر از گفت‌وگوی</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-red-800">معنی:</strong> فرّ یزدان از او برگشت، جهان پر از گفت‌وگو (آشوب).</p>
        </div>
      </div>

      <!-- بیت 11 -->
      <div class="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6 mb-5 border-r-4 border-red-500 shadow-md">
        <div class="mb-4">
          <p class="text-xl font-semibold text-red-900 leading-relaxed mb-2 text-right">منی چون بپیوست با کردگار</p>
          <p class="text-xl font-semibold text-red-900 leading-relaxed text-right">شکست اندر آورد و برگشت کار</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-red-800">معنی:</strong> منی با کردگار پیوست (دشمنی)، شکست آورد و کار برگشت.</p>
        </div>
      </div>

      <!-- بیت 12 -->
      <div class="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6 mb-5 border-r-4 border-red-500 shadow-md">
        <div class="mb-4">
          <p class="text-xl font-semibold text-red-900 leading-relaxed mb-2 text-right">چه گفت آن سخن‌گوی با فرّ و هوش</p>
          <p class="text-xl font-semibold text-red-900 leading-relaxed text-right">چو خسرو شوی بندگی را بکوش</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-red-800">معنی:</strong> سخن‌گوی با فرّ و هوش گفت: اگر خسرو شوی، بندگی را بکوش.</p>
        </div>
      </div>

      <!-- بیت 13 -->
      <div class="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6 mb-5 border-r-4 border-red-500 shadow-md">
        <div class="mb-4">
          <p class="text-xl font-semibold text-red-900 leading-relaxed mb-2 text-right">به یزدان هر آن کس که شد ناسپاس</p>
          <p class="text-xl font-semibold text-red-900 leading-relaxed text-right">به دلش اندر آید ز هر سو هراس</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-red-800">معنی:</strong> هر که به یزدان ناسپاس شد، هراس از هر سو به دلش آید.</p>
        </div>
      </div>

      <!-- بیت 14 -->
      <div class="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6 mb-5 border-r-4 border-red-500 shadow-md">
        <div class="mb-4">
          <p class="text-xl font-semibold text-red-900 leading-relaxed mb-2 text-right">به جمشید بر تیره‌گون گشت روز</p>
          <p class="text-xl font-semibold text-red-900 leading-relaxed text-right">همی کاست آن فرّ گیتی‌فروز</p>
        </div>
        <div class="bg-white rounded-lg p-4 mt-4">
          <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong class="text-red-800">معنی:</strong> روز جمشید تیره شد، فرّ گیتی‌فروز کاسته شد.</p>
        </div>
      </div>

      <!-- جمع کوچک نهایی -->
      <div class="bg-red-50 border-r-4 border-red-500 rounded-lg p-4 mt-5">
        <p class="text-sm text-red-900 font-semibold italic"><strong>جمع کوچک نهایی کل بخش:</strong> فردوسی تمدن بشری را قدم به قدم می‌سازد: امنیت، زیبایی، نظم، فناوری، بهشت. اما غرور (منی) همه را نابود می‌کند. درس: قدرت بدون تواضع و شکر، فرّ را می‌برد. این آیینهٔ هر امپراتوری و هر انسانی است که به اوج می‌رسد و خدا را فراموش می‌کند.</p>
      </div>
    </div>
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Link
              to={withLocalePath(validLocale, '/shahnameh/zahhak')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              {isRTL ? 'بازگشت به داستان ضحاک' : 'Back to Zahhak Story'}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-sm font-semibold text-gray-700">
              {isRTL ? 'پادشاهی جمشید' : 'Jamshid\'s Reign'}
            </span>
          </div>
          <Link
            to={withLocalePath(validLocale, '/shahnameh')}
            className="text-sm font-semibold text-gray-700 hover:text-primary-700 transition-colors"
          >
            {isRTL ? 'فهرست شاهنامه' : 'Shahnameh Index'}
          </Link>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-amber-200 p-8 sm:p-10 md:p-12">
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-gray-900
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-lg
              prose-ul:text-gray-700 prose-li:my-2
              prose-strong:text-gray-900 prose-strong:font-bold
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
              prose-img:rounded-2xl prose-img:shadow-xl prose-img:my-8 prose-img:w-full prose-img:h-auto"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  );
};

export default JamshidReign;
