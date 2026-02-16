export type Locale = 'fa' | 'en';

export type Messages = Record<string, any>;

export const messages: Record<Locale, Messages> = {
  fa: {
    meta: { name: 'فارسی', dir: 'rtl' as const },
    nav: {
      home: 'صفحه اصلی',
      resources: 'منابع',
      critics: 'منتقدان',
      about: 'درباره',
      progress: 'پیشرفت شما',
      journey: 'سفر آزادی',
      journeySubtitle: 'Journey to Freedom',
      language: 'زبان',
      switchTo: 'English',
    },
    common: {
      backHome: 'بازگشت به صفحه اصلی',
      loading: 'در حال بارگذاری...',
      notFound: 'پیدا نشد',
      read: 'مطالعه',
      startReading: 'شروع خواندن',
      nextChapter: 'فصل بعدی',
      completed: 'تبریک! سفر کامل شد!',
    },
    home: {
      heroTitleTop: 'سفر به سوی',
      heroTitleBottom: 'آزادی واقعی',
      heroSubtitle: '',
      heroCta: 'شروع سفر آزادی',
      statsChapters: 'فصل جامع',
      statsFreedom: 'آزادی',
      statsReal: 'واقعی',
      chaptersTitle: 'فصول آزادی',
      chaptersSubtitle: 'سفر کامل به درک آزادی واقعی از طریق 10 فصل جامع و عمیق با تحلیل‌های دقیق',
      quote: '«آزادی واقعی، مالکیت مطلق انسان بر جسم، ذهن، زمان و دارایی خویش است — و دین، تنها نظام پایدار تاریخ برای حفاظت از این مالکیت.»',
      quoteAuthor: '',
      slogan: {
        title: 'شعار ما',
        items: {
          god: { icon: '🕌', label: 'خدا', description: 'تنها موجودی که بندگی‌اش آزادی می‌آورد' },
          freedom: { icon: '🕊️', label: 'آزادی', description: 'حقوق مالکیت مطلق بر وجود' },
          family: { icon: '👨‍👩‍👧‍👦', label: 'خانواده', description: 'سنگر اول دفاع از فرد' },
          homeland: { icon: '🇮🇷', label: 'میهن', description: 'سرزمین مشترک آزادی' },
        },
        text: 'خدا، آزادی، خانواده و میهن',
      },
    },
    resources: {
      title: '📚 منابع و لینک‌های مفید',
      subtitle: 'مجموعه کامل منابع برای مطالعه عمیق‌تر درباره آزادی، دین و حقوق مالکیت',
      videosTitle: 'ویدیوهای نظریه آزادی',
      videosSubtitle: 'وبینارها، تحلیل‌ها و صحبت‌های کامل',
      watchOnYoutube: 'تماشا در YouTube',
      usefulLinksTitle: 'لینک‌های مفید',
      usefulLinksSubtitle: 'صفحات و منابع مهم',
      thinkersTitle: 'اندیشمندان لیبرتارین',
      thinkersSubtitle: 'بزرگان فلسفه آزادی و اقتصاد اتریشی',
      pdfTitle: 'PDF های نظریه آزادی',
      pdfSubtitle: 'فایل‌های کامل 9 فصل نظریه آزادی',
      downloadPdf: 'دانلود PDF',
      ctaTitle: '📖 مطالعه برای آزادی',
      ctaText: 'این منابع، راهنمای شما برای درک عمیق‌تر آزادی واقعی هستند. هر کدام را با دقت بخوانید و تحلیل کنید.',
    },
    critics: {
      title: 'منتقدان چه می‌گویند؟',
      subtitle:
        'این صفحه «نقدهای رایج» را به زبان ساده جمع می‌کند، و برای هر نقد، یک پاسخِ احتمالی و یک راهِ بررسیِ منصفانه می‌دهد تا مخاطب عادی هم بتواند خودش تصمیم بگیرد.',
      noteTitle: 'نکته مهم',
      noteText:
        'اینجا «اتهام‌زنی» و «شخصی‌سازی» نداریم. فقط نقدهای منطقیِ رایج و روش بررسی. اگر نقد مشخصی از یک ویدیو/مقاله داری، لینکش را بده تا دقیقاً همان را با ارجاع اضافه کنیم.',
      labels: {
        critique: 'نقد',
        why: 'چرا مهم است؟',
        responses: 'پاسخ‌های احتمالی',
        howToCheck: 'چطور منصفانه بررسی کنیم؟',
      },
      ctaTitle: 'می‌خواهی این بخش دقیق‌تر و مستندتر شود؟',
      ctaText:
        'اگر لینک یا تایم‌استمپِ نقدهای مشخص را بدهی، همین‌جا به شکل «نقل‌قول + پاسخ + ارجاع» اضافه می‌کنیم تا کاملاً دقیق و بی‌ابهام باشد.',
      ctaButton: 'رفتن به منابع و ویدیوها',
    },
    chapter: {
      chapterLabel: 'فصل',
      minutes: 'دقیقه مطالعه',
      pages: 'صفحه',
      reflectionTitle: 'حالا که این فصل را خواندی، چه تغییری در زندگی‌ات ایجاد می‌شود؟',
      reflectionText:
        'این نظریه فقط برای خواندن نیست — برای تغییر است. فکر کن که چگونه می‌توانی این اصول را در زندگی روزمره‌ات به کار بگیری.',
      chapterNotFound: 'فصل پیدا نشد',
      contentSoon: 'محتوای این فصل به زودی اضافه خواهد شد.',
    },
  },
  en: {
    meta: { name: 'English', dir: 'ltr' as const },
    nav: {
      home: 'Home',
      resources: 'Resources',
      critics: 'Critics',
      about: 'About',
      progress: 'Your progress',
      journey: 'Freedom Journey',
      journeySubtitle: 'سفر آزادی',
      language: 'Language',
      switchTo: 'فارسی',
    },
    common: {
      backHome: 'Back to Home',
      loading: 'Loading...',
      notFound: 'Not found',
      read: 'Read',
      startReading: 'Start reading',
      nextChapter: 'Next chapter',
      completed: 'Congrats! You completed the journey!',
    },
    home: {
      heroTitleTop: 'Journey to',
      heroTitleBottom: 'Real Freedom',
      heroSubtitle: '',
      heroCta: 'Start the Journey',
      statsChapters: 'Chapters',
      statsFreedom: 'Freedom',
      statsReal: 'Real',
      chaptersTitle: 'Freedom Chapters',
      chaptersSubtitle: 'A complete path through 10 chapters, with clear explanations and deep analysis.',
      quote:
        '"Real freedom is absolute human ownership over body, mind, time, and property — and religion is the most durable system in history for protecting that ownership."',
      quoteAuthor: '',
      slogan: {
        title: 'Our Slogan',
        items: {
          god: { icon: '🕌', label: 'God', description: 'The only being whose worship brings freedom' },
          freedom: { icon: '🕊️', label: 'Freedom', description: 'Absolute property rights over existence' },
          family: { icon: '👨‍👩‍👧‍👦', label: 'Family', description: 'First line of defense for the individual' },
          homeland: { icon: '🇮🇷', label: 'Homeland', description: 'Shared land of freedom' },
        },
        text: 'God, Freedom, Family and Homeland',
      },
    },
    resources: {
      title: '📚 Resources & Links',
      subtitle: 'A curated library to go deeper: chapters, PDFs, videos, and recommended thinkers.',
      videosTitle: 'Freedom Theory Videos',
      videosSubtitle: 'Full talks, interviews, and deep dives',
      watchOnYoutube: 'Watch on YouTube',
      usefulLinksTitle: 'Useful links',
      usefulLinksSubtitle: 'Official pages and recommended entries',
      thinkersTitle: 'Libertarian thinkers',
      thinkersSubtitle: 'Key authors in liberty, property rights, and Austrian economics',
      pdfTitle: 'Theory PDFs',
      pdfSubtitle: 'All available PDF files (9)',
      downloadPdf: 'Download PDF',
      ctaTitle: '📖 Read for Freedom',
      ctaText: 'These resources are here to help you understand the argument clearly—step by step.',
    },
    critics: {
      title: 'What do critics say?',
      subtitle:
        'A fair, readable overview of common critiques. For each critique: why it matters, possible responses, and how to verify the claim yourself.',
      noteTitle: 'Important',
      noteText:
        'No personal attacks here—only common logical critiques and how to evaluate them. If you share specific critique links, we can add precise references.',
      labels: {
        critique: 'Critique',
        why: 'Why it matters',
        responses: 'Possible responses',
        howToCheck: 'How to verify fairly',
      },
      ctaTitle: 'Want this section to be more evidence-based?',
      ctaText:
        'Share critique links or timestamps, and we’ll add “quote + response + reference” so everything stays precise.',
      ctaButton: 'Go to resources & videos',
    },
    chapter: {
      chapterLabel: 'Chapter',
      minutes: 'min read',
      pages: 'pages',
      reflectionTitle: 'After reading this chapter, what changes in your daily life?',
      reflectionText:
        'This is not just theory—it’s a lens for action. Think about how these principles apply to your choices and boundaries.',
      chapterNotFound: 'Chapter not found',
      contentSoon: 'Chapter content will be added soon.',
    },
  },
};


