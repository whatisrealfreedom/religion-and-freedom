import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '../i18n/LocaleProvider';
import { withLocalePath } from '../i18n/localePath';
import {
  BookOpenIcon,
  AcademicCapIcon,
  PhotoIcon,
  DocumentTextIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';

type SectionData = {
  id: string;
  faTitle: string;
  enTitle: string;
  faIcon: string;
  enIcon: string;
  icon: React.ComponentType<any>;
  content: string;
};

// دیتای placeholder - بعداً می‌تواند از API یا فایل i18n بیاید
const storyData: Record<string, {
  faTitle: string;
  enTitle: string;
  faSubtitle: string;
  enSubtitle: string;
  description: string;
  sections: SectionData[];
}> = {
  'feraydun': {
    faTitle: 'فریدون',
    enTitle: 'Fereydun',
    faSubtitle: 'پادشاه دادگر',
    enSubtitle: 'The Just King',
    description: 'داستان فریدون و نابودی ضحاک و حکومت دادگرانه',
    sections: [
      {
        id: 'text',
        faTitle: 'متن داستان',
        enTitle: 'Story Text',
        faIcon: '📜',
        enIcon: '📜',
        icon: DocumentTextIcon,
        content: `
          <h2>درآمد</h2>
          <p>این داستان حکایت از فریدون دارد که از فرزندان جمشید بود و در زمان ضحاک به دنیا آمد. فریدون با کمک کاوه آهنگر و مردم، بر ضحاک شورید و او را در بند کرد...</p>
          
          <h3>زایش فریدون</h3>
          <p>فریدون در خانه‌ای مخفی در کوه البرز بزرگ شد. مادرش فرانک، او را با شیر ماده گاوی بزرگ کرد و نام آن گاو "برمایه" بود...</p>
          
          <h3>قیام علیه ضحاک</h3>
          <p>کاوه آهنگر با درفش کاویانی به راه افتاد و مردم را علیه ظلم ضحاک بسیج کرد. فریدون نیز با کاوه همراه شد و به سوی کاخ ضحاک حرکت کرد...</p>
        `,
      },
      {
        id: 'analysis',
        faTitle: 'تحلیل و تفسیر',
        enTitle: 'Analysis & Commentary',
        faIcon: '🔍',
        enIcon: '🔍',
        icon: AcademicCapIcon,
        content: `
          <h2>ساختار اسطوره‌ای</h2>
          <p>داستان فریدون یکی از مهم‌ترین داستان‌های اسطوره‌ای شاهنامه است که نشان‌دهنده مبارزه بین خیر و شر است...</p>
          
          <h3>نمادشناسی</h3>
          <ul>
            <li><strong>ضحاک:</strong> نماد استبداد و ظلم</li>
            <li><strong>فریدون:</strong> نماد عدالت و آزادی</li>
            <li><strong>کاوه:</strong> نماد خیزش مردمی</li>
            <li><strong>درفش کاویانی:</strong> نماد مقاومت و آزادی</li>
          </ul>
          
          <h3>پیام آزادی</h3>
          <p>این داستان نشان می‌دهد که آزادی واقعی از طریق مبارزه جمعی با ظلم به دست می‌آید و هر فرد حق دارد از حقوق مالکیت خود دفاع کند...</p>
        `,
      },
      {
        id: 'images',
        faTitle: 'تصاویر و نگاره‌ها',
        enTitle: 'Images & Illustrations',
        faIcon: '🖼️',
        enIcon: '🖼️',
        icon: PhotoIcon,
        content: `
          <h2>نگاره‌های شاهنامه</h2>
          <p>شاهنامه فردوسی از دیرباز مورد توجه نگارگران ایرانی بوده است. در این بخش، نگاره‌های معروف این داستان را مشاهده می‌کنید:</p>
          
          <div class="image-gallery">
            <h3>فریدون و ضحاک</h3>
            <p>[تصویر نگاره‌ای از فریدون و ضحاک - به زودی اضافه خواهد شد]</p>
            
            <h3>کاوه آهنگر</h3>
            <p>[تصویر کاوه با درفش کاویانی - به زودی اضافه خواهد شد]</p>
            
            <h3>قیام مردمی</h3>
            <p>[تصویر قیام مردم علیه ضحاک - به زودی اضافه خواهد شد]</p>
          </div>
        `,
      },
      {
        id: 'references',
        faTitle: 'منابع و مأخذ',
        enTitle: 'References & Sources',
        faIcon: '📚',
        enIcon: '📚',
        icon: BookOpenIcon,
        content: `
          <h2>منابع اصلی</h2>
          <ul>
            <li>شاهنامه فردوسی، تصحیح جلال خالقی مطلق، مرکز دایرة المعارف بزرگ اسلامی</li>
            <li>شاهنامه فردوسی، تصحیح ژول موهل، انتشارات بنیاد فرهنگ ایران</li>
          </ul>
          
          <h2>تحقیقات و مطالعات</h2>
          <ul>
            <li>زرین‌کوب، عبدالحسین. <em>با کاروان حله</em>. تهران: انتشارات علمی</li>
            <li>یاحقی، محمدجعفر. <em>فرهنگ اساطیر ایران</em>. تهران: پژوهشگاه علوم انسانی</li>
          </ul>
          
          <h2>مقالات</h2>
          <ul>
            <li>مقاله‌ای درباره نمادشناسی فریدون (به زودی)</li>
            <li>مقاله‌ای درباره حقوق مالکیت در شاهنامه (به زودی)</li>
          </ul>
        `,
      },
      {
        id: 'commentary',
        faTitle: 'یادداشت‌های تفصیلی',
        enTitle: 'Detailed Notes',
        faIcon: '✍️',
        enIcon: '✍️',
        icon: DocumentTextIcon,
        content: `
          <h2>یادداشت‌های تفصیلی</h2>
          <p>در این بخش، یادداشت‌ها و توضیحات تفصیلی درباره داستان ارائه می‌شود:</p>
          
          <h3>زمینه تاریخی</h3>
          <p>داستان فریدون در واقعیت تاریخی به دوره‌های پیش از اسلام ایران برمی‌گردد و نشان‌دهنده فرهنگ سیاسی ایران باستان است...</p>
          
          <h3>ساختار روایی</h3>
          <p>فردوسی با استفاده از تکرار و تکامل، داستان را به گونه‌ای روایت می‌کند که مخاطب را با خود همراه می‌کند...</p>
          
          <h3>پیام فلسفی</h3>
          <p>این داستان دارای پیام‌های عمیق فلسفی درباره عدالت، آزادی و حقوق انسان است که همچنان در عصر حاضر قابل تأمل است...</p>
        `,
      },
    ],
  },
  'zahhak': {
    faTitle: 'ضحاک',
    enTitle: 'Zahhak',
    faSubtitle: 'پادشاه اهریمنی',
    enSubtitle: 'The Demon King',
    description: 'داستان ضحاک و هزاره ظلم و ستم',
    sections: [
      {
        id: 'introduction',
        faTitle: 'مقدمه: خلاصه کلی داستان',
        enTitle: 'Introduction: Complete Story Summary',
        faIcon: '📖',
        enIcon: '📖',
        icon: BookOpenIcon,
        content: `
          <div class="mb-6">
            <p class="text-xl text-gray-800 font-semibold leading-relaxed mb-4">
              ای دوست عزیز، ای هم‌سفر جانِ ایران‌زمین...
            </p>
            <p class="text-lg text-gray-700 leading-relaxed mb-4">
              حالا که شبِ سرد ژانویه‌ست و بادِ زمستانیِ درِ پنجره می‌کوبد، بیا با هم به دلِ یکی از تاریک‌ترین، اما درخشان‌ترین فصل‌های شاهنامه سفر کنیم: <strong>داستان ضحاک ماردوش</strong>، نمادِ استبدادِ هزارساله، جایی که شرِ مطلق به تخت می‌نشیند، اما سرانجام نورِ عدالت از دلِ مردم می‌جوشد و او را به زنجیر می‌کشد.
            </p>
            
            <div class="my-8 mb-10">
              <img 
                src="/images/shahname/zahhak/zahhak.png" 
                alt="داستان ضحاک ماردوش - نماد استبداد هزارساله"
                class="w-full rounded-2xl shadow-xl my-8 border-2 border-amber-200"
              />
            </div>
            
            <p class="text-lg text-gray-700 leading-relaxed mb-6">
              این داستان، بیش از یک قصه است؛ آیینه‌ای است که هزار سال است روبه‌روی ما گذاشته شده. فردوسی در این بخش، نه فقط از ضحاک می‌گوید، بلکه از هر حاکمی که مغز جوانان را برای بقای قدرتِ خودش می‌جود، از هر سیستمی که هنر را خوار و جادو و دروغ را ارجمند می‌کند.
            </p>
          </div>

          <h2 class="text-2xl font-bold text-gray-900 mb-4">خلاصه کلی داستان ضحاک، از آغاز تا فرجام (با تمام شور و دردش)</h2>

          <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">آغازِ فاجعه</h3>
          <p class="text-lg text-gray-700 leading-relaxed mb-4">
            ضحاک، پسر مرداسِ عرب، شاهزاده‌ای ساده‌دل بود. اهریمن (شیطان) در قالب جوانی زیبا و خردمند ظاهر شد، با زبانِ فریبنده‌اش در گوشش نجوا کرد که تو شایستهٔ شاهی هستی، پدرت را بکش و تاج را بگیر. ضحاک فریب خورد، پدر را کشت و بر تخت نشست. سپس اهریمن در لباسِ آشپز درباری درآمد، ضحاک را فریب داد تا شانه‌هایش را ببوسد. از آن بوسهٔ اهریمنی، دو مار سیاه بر شانه‌هایش روییدند. مارها گرسنه بودند و تنها با مغزِ انسان سیر می‌شدند. پس فرمان داد هر روز دو جوانِ بی‌گناه را بکشند، مغزشان را برای مارها ببرند. این شد آغازِ هزار سالِ سیاهِ پادشاهی‌اش بر ایران.
          </p>

          <p class="text-lg text-gray-700 leading-relaxed mb-4">
            در این دوران، <strong>راستی پنهان شد</strong>، <strong>هنر خوار گشت</strong>، <strong>جادو ارجمند</strong>، دیوان بر تخت نشستند و فرزانگان به کوه و بیابان گریختند. ضحاک جمشید را با اره به دو نیم کرد، دخترانش شهرناز و ارنواز را به زنی گرفت و جهان را به آتش کشید.
          </p>

          <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">اما در دلِ این تاریکی، دو نیروی نجات برخاست:</h3>
          
          <div class="bg-blue-50 border-r-4 border-blue-500 p-4 mb-4 rounded-lg">
            <p class="text-lg text-gray-800 font-semibold mb-2">ارمایل و گرمایل</p>
            <p class="text-base text-gray-700 leading-relaxed">
              دو آشپز جوان در دربار، هر شب یکی از قربانیان را رها می‌کردند و مغز گوسفند را با مغز انسان می‌آمیختند تا مارها ساکت شوند. این‌گونه جانِ صدها جوان نجات یافت.
            </p>
          </div>

          <div class="bg-purple-50 border-r-4 border-purple-500 p-4 mb-4 rounded-lg">
            <p class="text-lg text-gray-800 font-semibold mb-2">کابوس ضحاک</p>
            <p class="text-base text-gray-700 leading-relaxed">
              در خواب دید سه جنگجوی جوان با گرز گاوسر بر او تاختند. موبدان تعبیر کردند: جوانی به نام <strong>فریدون</strong> برخواهد خاست و تو را به بند خواهد کشید.
            </p>
          </div>

          <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">فریدون: قهرمان داستان</h3>
          <p class="text-lg text-gray-700 leading-relaxed mb-4">
            ضحاک از ترس، همه‌جا به دنبال فریدون گشت. فریدون، فرزند آبتین (از نسل جمشید)، در خطر بود. مادرش فرانک او را در البرز کوه پنهان کرد و با شیر گاوی جادویی به نام <strong>برمایه</strong> پرورش داد. ضحاک گاو را یافت و کشت، اما فریدون نجات یافت و در شانزده‌سالگی از مادر حقیقت را شنید: پدرش به دست ضحاک کشته شده، تو باید انتقام بگیری.
          </p>

          <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">قیام و آزادی</h3>
          <p class="text-lg text-gray-700 leading-relaxed mb-4">
            فریدون برخاست، با کمک <strong>کاوهٔ آهنگر</strong> (که پسرانش را قربانی مارها کرده بود و با پیش‌بند چرمی‌اش درفش کاویانی را برافراشت) و مردم خسته از ستم، سپاه ساخت. کاوه نمادِ قیامِ مردم عادی شد؛ از آهنگرِ ساده تا پهلوانِ بزرگ.
          </p>

          <p class="text-lg text-gray-700 leading-relaxed mb-4">
            فریدون با گرز گاوسر (که به یاد گاو برمایه ساخته شد) به جنگ ضحاک رفت. از اروندرود گذشت، به بیت‌المقدس (پایتخت ضحاک) رسید، خواهران جمشید را آزاد کرد، ضحاک را در نبرد شکست داد. اما او را نکشت؛ دست و پایش را بست، به دماوند برد و در غاری به زنجیر کشید.
          </p>

          <div class="bg-amber-50 border-r-4 border-amber-600 p-6 mt-6 mb-4 rounded-lg">
            <p class="text-lg text-gray-800 font-semibold mb-3">پیام نهایی</p>
            <p class="text-base text-gray-700 leading-relaxed">
              ضحاک هنوز زنده است، اما زندانی. فردوسی می‌گوید تا روز قیامت آنجا خواهد ماند و جهان از شرّش در امان خواهد بود... مگر آنکه روزی زنجیر بگسلد (که این هم تلمیحی به بازگشت شر است).
            </p>
            <p class="text-base text-gray-800 font-semibold mt-4">
              این داستان، حماسهٔ پیروزی خیر بر شر نیست؛ حماسهٔ <strong>مهار شر</strong> است. چون شر کامل نابود نمی‌شود، فقط زنجیر می‌شود. و این زنجیر، دستِ مردم است، نه دستِ خدایان.
            </p>
          </div>
        `,
      },
      {
        id: 'section-1',
        faTitle: 'پادشاهی ضحاک تازی هزار سال بود',
        enTitle: 'Zahhak\'s Thousand-Year Reign',
        faIcon: '👑',
        enIcon: '👑',
        icon: DocumentTextIcon,
        content: `
          <h2>پادشاهی ضحاک تازی هزار سال بود</h2>
          <p class="text-xl text-amber-700 font-semibold mb-4">چو ضحاک شد بر جهان شهریار</p>
          <p>محتوای این بخش به زودی اضافه خواهد شد...</p>
        `,
      },
      {
        id: 'section-2',
        faTitle: 'ارمایل و گرمایل و رهانیدن قربانیان',
        enTitle: 'Armayel and Garmayel and Saving the Victims',
        faIcon: '🐍',
        enIcon: '🐍',
        icon: DocumentTextIcon,
        content: `
          <h2>ارمایل و گرمایل و رهانیدن قربانیان مارهای مغزخوار</h2>
          <p class="text-xl text-amber-700 font-semibold mb-4">چنان بد که هر شب دو مرد جوان</p>
          <p>محتوای این بخش به زودی اضافه خواهد شد...</p>
        `,
      },
      {
        id: 'section-3',
        faTitle: 'کابوس ضحاک و پیشبینی موبدان',
        enTitle: 'Zahhak\'s Nightmare and the Mobads\' Prophecy',
        faIcon: '🌙',
        enIcon: '🌙',
        icon: DocumentTextIcon,
        content: `
          <h2>کابوس ضحاک و پیشبینی موبدان برآمدن فریدون را</h2>
          <p class="text-xl text-amber-700 font-semibold mb-4">چو از روزگارش چهل سال ماند</p>
          <p>محتوای این بخش به زودی اضافه خواهد شد...</p>
        `,
      },
      {
        id: 'section-4',
        faTitle: 'زاده شدن فریدون و پرورش او',
        enTitle: 'Fereydun\'s Birth and Upbringing',
        faIcon: '👶',
        enIcon: '👶',
        icon: DocumentTextIcon,
        content: `
          <h2>زاده شدن فریدون کشته شدن پدرش و پرورش او با شیر گاو برمایه</h2>
          <p class="text-xl text-amber-700 font-semibold mb-4">برآمد برین روزگار دراز</p>
          <p>محتوای این بخش به زودی اضافه خواهد شد...</p>
        `,
      },
      {
        id: 'section-5',
        faTitle: 'کشته شدن گاو برمایه',
        enTitle: 'The Killing of the Cow Barmayeh',
        faIcon: '🐄',
        enIcon: '🐄',
        icon: DocumentTextIcon,
        content: `
          <h2>کشته شدن گاو برمایه</h2>
          <p class="text-xl text-amber-700 font-semibold mb-4">نشد سیر ضحاک از آن جست جوی</p>
          <p>محتوای این بخش به زودی اضافه خواهد شد...</p>
        `,
      },
      {
        id: 'section-6',
        faTitle: 'شانزده‌سالگی فریدون',
        enTitle: 'Fereydun at Sixteen',
        faIcon: '🧑',
        enIcon: '🧑',
        icon: DocumentTextIcon,
        content: `
          <h2>شانزده‌سالگی فریدون و آگاهی او از گذشته و سرنوشت پدرش</h2>
          <p class="text-xl text-amber-700 font-semibold mb-4">چو بگذشت از آن بر فریدون دو هشت</p>
          <p>محتوای این بخش به زودی اضافه خواهد شد...</p>
        `,
      },
      {
        id: 'section-7',
        faTitle: 'کاوه آهنگر و درفش کاویانی',
        enTitle: 'Kaveh the Blacksmith and the Kavian Flag',
        faIcon: '⚒️',
        enIcon: '⚒️',
        icon: DocumentTextIcon,
        content: `
          <h2>کاوه آهنگر و درفش کاویانی و ساخته شدن گرز گاوسر</h2>
          <p class="text-xl text-amber-700 font-semibold mb-4">چنان بد که ضحاک را روز و شب</p>
          <p>محتوای این بخش به زودی اضافه خواهد شد...</p>
        `,
      },
      {
        id: 'section-8',
        faTitle: 'به پا خاستن فریدون',
        enTitle: 'Fereydun\'s Uprising',
        faIcon: '⚔️',
        enIcon: '⚔️',
        icon: DocumentTextIcon,
        content: `
          <h2>به پا خاستن فریدون در برابر ضحاک</h2>
          <p class="text-xl text-amber-700 font-semibold mb-4">فریدون به خورشید بر برد سر</p>
          <p>محتوای این بخش به زودی اضافه خواهد شد...</p>
        `,
      },
      {
        id: 'section-9',
        faTitle: 'سفر فریدون و سپاهش',
        enTitle: 'Fereydun and His Army\'s Journey',
        faIcon: '🗺️',
        enIcon: '🗺️',
        icon: DocumentTextIcon,
        content: `
          <h2>سفر فریدون و سپاهش از اروندرود تا بیت‌المقدس پایتخت ضحاک</h2>
          <p class="text-xl text-amber-700 font-semibold mb-4">چو آمد به نزدیک اروندرود</p>
          <p>محتوای این بخش به زودی اضافه خواهد شد...</p>
        `,
      },
      {
        id: 'section-10',
        faTitle: 'آزاد شدن دختران جمشید',
        enTitle: 'Freeing Jamshid\'s Daughters',
        faIcon: '👸',
        enIcon: '👸',
        icon: DocumentTextIcon,
        content: `
          <h2>آزاد شدن دختران جمشید از بند ضحاک به دست فریدون</h2>
          <p class="text-xl text-amber-700 font-semibold mb-4">طلسمی که ضحاک سازیده بود</p>
          <p>محتوای این بخش به زودی اضافه خواهد شد...</p>
        `,
      },
      {
        id: 'section-11',
        faTitle: 'خبر بردن کندرو',
        enTitle: 'Kandro Bringing News',
        faIcon: '📢',
        enIcon: '📢',
        icon: DocumentTextIcon,
        content: `
          <h2>خبر بردن کندرو ضحاک را از بساط فریدون</h2>
          <p class="text-xl text-amber-700 font-semibold mb-4">چو کشور ز ضحاک بودی تهی</p>
          <p>محتوای این بخش به زودی اضافه خواهد شد...</p>
        `,
      },
      {
        id: 'section-12',
        faTitle: 'بند کردن فریدون ضحاک را',
        enTitle: 'Fereydun Imprisoning Zahhak',
        faIcon: '🔗',
        enIcon: '🔗',
        icon: DocumentTextIcon,
        content: `
          <h2>بند کردن فریدون ضحاک را</h2>
          <p class="text-xl text-amber-700 font-semibold mb-4">جهاندار ضحاک از آن گفت‌گوی</p>
          <p>محتوای این بخش به زودی اضافه خواهد شد...</p>
        `,
      },
    ],
  },
  // می‌توان داستان‌های دیگر را هم اضافه کرد
};

const ShahnamehStory: React.FC = () => {
  const { locale, storyId } = useParams<{ locale: string; storyId: string }>();
  const { isRTL } = useLocale();
  const validLocale = (locale === 'fa' || locale === 'en') ? locale : 'fa';
  const [activeSectionId, setActiveSectionId] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const story = useMemo(() => storyData[storyId || ''], [storyId]);

  // Set default active section to first section
  useEffect(() => {
    if (story && story.sections.length > 0 && !activeSectionId) {
      setActiveSectionId(story.sections[0].id);
    }
  }, [story, activeSectionId]);

  useEffect(() => {
    // Scroll to top when section changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSectionId]);

  if (!story) {
    return <Navigate to={withLocalePath(validLocale, '/shahnameh')} replace />;
  }

  const sections = story.sections;
  const activeSectionData = sections.find(s => s.id === activeSectionId) || sections[0];
  const currentIndex = sections.findIndex(s => s.id === activeSectionId);
  const nextSection = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;
  const prevSection = currentIndex > 0 ? sections[currentIndex - 1] : null;

  const ForwardIcon = isRTL ? ArrowLeftIcon : ArrowRightIcon;
  const BackIcon = isRTL ? ArrowRightIcon : ArrowLeftIcon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-16 left-4 z-40">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white shadow-xl rounded-full p-3 border-2 border-amber-400 hover:bg-amber-50 transition-all"
        >
          {sidebarOpen ? (
            <XMarkIcon className="w-6 h-6 text-gray-800" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-gray-800" />
          )}
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Link
              to={withLocalePath(validLocale, '/shahnameh')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
            >
              <BackIcon className="w-4 h-4" />
              {isRTL ? 'بازگشت به فهرست' : 'Back to Index'}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-sm font-semibold text-gray-700">
              {isRTL ? story.faTitle : story.enTitle}
            </span>
          </div>
          <Link
            to={withLocalePath(validLocale, '/')}
            className="text-sm font-semibold text-gray-700 hover:text-primary-700 transition-colors"
          >
            {isRTL ? 'خانه' : 'Home'}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Sidebar - Table of Contents */}
          <aside
            className={`lg:col-span-3 ${
              sidebarOpen ? 'fixed inset-0 lg:static' : 'hidden lg:block'
            } z-30 lg:z-auto`}
          >
            <div className="lg:sticky lg:top-24 h-full">
              {/* Mobile Overlay */}
              {sidebarOpen && (
                <div
                  className="lg:hidden fixed inset-0 bg-black/50 z-[-1]"
                  onClick={() => setSidebarOpen(false)}
                />
              )}

              <motion.div
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-3xl shadow-2xl border-2 border-amber-200 p-6 lg:p-8 h-full lg:max-h-[calc(100vh-8rem)] overflow-y-auto"
              >
                {/* Story Header in Sidebar */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h2 className="text-2xl font-black text-gray-900 mb-2">
                    {isRTL ? story.faTitle : story.enTitle}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {isRTL ? story.faSubtitle : story.enSubtitle}
                  </p>
                </div>

                {/* Section Navigation */}
                <nav className="space-y-2">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                    {isRTL ? 'بخش‌ها' : 'Sections'}
                  </div>
                  {sections.map((section) => {
                    const isActive = activeSectionId === section.id;
                    const IconComponent = section.icon;

                    return (
                      <motion.button
                        key={section.id}
                        onClick={() => {
                          setActiveSectionId(section.id);
                          setSidebarOpen(false);
                        }}
                        className={`w-full flex items-start gap-2 px-3 py-2.5 rounded-lg text-right transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                            : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                        }`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <span className="text-base flex-shrink-0 mt-0.5">{isRTL ? section.faIcon : section.enIcon}</span>
                        <span className={`flex-1 text-xs font-medium leading-relaxed min-w-0 line-clamp-2 ${isActive ? 'text-white' : 'text-gray-700'}`}>
                          {isRTL ? section.faTitle : section.enTitle}
                        </span>
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0 mt-1"
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </nav>

                {/* Progress Indicator */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                    {isRTL ? 'پیشرفت' : 'Progress'}
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${((currentIndex + 1) / sections.length) * 100}%`,
                      }}
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                    />
                  </div>
                  <div className="mt-2 text-xs text-gray-600 text-center">
                    {currentIndex + 1} / {sections.length}
                  </div>
                </div>
              </motion.div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9">
            {/* Story Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="bg-white rounded-3xl shadow-xl border-2 border-amber-200 p-8">
                <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
                  <div>
                    <div className="inline-block px-4 py-2 rounded-full bg-amber-100 text-amber-800 text-sm font-bold mb-3">
                      {isRTL ? 'داستان شاهنامه' : 'Shahnameh Story'}
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-2">
                      {isRTL ? story.faTitle : story.enTitle}
                    </h1>
                    <p className="text-xl text-gray-700 font-semibold">
                      {isRTL ? story.faSubtitle : story.enSubtitle}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {story.description}
                </p>
              </div>
            </motion.div>

            {/* Active Section Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSectionId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl shadow-xl border-2 border-amber-200 p-8 sm:p-10 md:p-12"
              >
                {/* Section Header */}
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center text-3xl shadow-lg">
                    {isRTL ? activeSectionData.faIcon : activeSectionData.enIcon}
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                      {isRTL ? activeSectionData.faTitle : activeSectionData.enTitle}
                    </h2>
                  </div>
                </div>

                {/* Section Content */}
                <div
                  className="prose prose-lg max-w-none
                    prose-headings:font-bold prose-headings:text-gray-900
                    prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-lg
                    prose-ul:text-gray-700 prose-li:my-2
                    prose-strong:text-gray-900 prose-strong:font-bold
                    prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                    prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                    prose-img:rounded-2xl prose-img:shadow-xl prose-img:my-8 prose-img:w-full prose-img:h-auto"
                  dangerouslySetInnerHTML={{ __html: activeSectionData.content }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Section Navigation */}
            <div className="mt-8 flex items-center justify-between gap-4 flex-wrap">
              {prevSection ? (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    onClick={() => setActiveSectionId(prevSection.id)}
                    className="flex items-center gap-3 px-6 py-4 bg-white rounded-xl shadow-lg border-2 border-gray-200 hover:border-amber-400 transition-all font-semibold text-gray-700 hover:text-amber-700"
                  >
                    <BackIcon className="w-5 h-5" />
                    <div className="text-right">
                      <div className="text-xs text-gray-500">{isRTL ? 'بخش قبلی' : 'Previous'}</div>
                      <div className="font-bold">
                        {isRTL ? prevSection.faTitle : prevSection.enTitle}
                      </div>
                    </div>
                  </button>
                </motion.div>
              ) : (
                <div />
              )}

              {nextSection ? (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    onClick={() => setActiveSectionId(nextSection.id)}
                    className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold"
                  >
                    <div className="text-left">
                      <div className="text-xs text-amber-100">{isRTL ? 'بخش بعدی' : 'Next'}</div>
                      <div className="font-bold">
                        {isRTL ? nextSection.faTitle : nextSection.enTitle}
                      </div>
                    </div>
                    <ForwardIcon className="w-5 h-5" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={withLocalePath(validLocale, '/shahnameh')}
                    className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold"
                  >
                    <div className="text-left">
                      <div className="text-xs text-green-100">{isRTL ? 'بازگشت به فهرست' : 'Back to Index'}</div>
                      <div className="font-bold">{isRTL ? 'همه داستان‌ها' : 'All Stories'}</div>
                    </div>
                    <ForwardIcon className="w-5 h-5" />
                  </Link>
                </motion.div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ShahnamehStory;
