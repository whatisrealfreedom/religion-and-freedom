import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  DocumentTextIcon,
  BookOpenIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { useLocale } from '../i18n/LocaleProvider';
import { withLocalePath } from '../i18n/localePath';
import { erfanDinSlides } from '../data/erfanDinSlides';
import { ErfanDinSlide } from '../data/erfanDinSlides';
import CommentsSection from '../components/CommentsSection';

const content = {
  fa: {
    title: 'عرفان و دین',
    subtitle: 'سری «راز ایران» – هایلایت‌های اینستاگرام',
    back: 'بازگشت به صفحه اصلی',
    slideOf: 'اسلاید',
    of: 'از',
    mainText: 'متن اصلی اسلاید',
    intro: 'مقدمه',
    simpleExplanation: 'فراتر از نوشته',
    simpleExplanationNote: 'این بخش برداشت شخصی از نوشته اصلی است.',
    sourcesTitle: 'منابع و رفرنس‌ها',
    conclusion: 'نتیجه‌گیری',
    nextSlide: 'ادامه به اسلاید بعدی',
    placeholder: 'به زودی اضافه می‌شود.',
    prev: 'قبلی',
    next: 'بعدی',
  },
  en: {
    title: 'Erfan & Religion',
    subtitle: 'Series «Iran\'s Secret» – Instagram highlights',
    back: 'Back to Home',
    slideOf: 'Slide',
    of: 'of',
    mainText: 'Main slide text',
    intro: 'Intro',
    simpleExplanation: 'Beyond the text',
    simpleExplanationNote: 'This section is a personal interpretation of the original text.',
    sourcesTitle: 'Sources & references',
    conclusion: 'Conclusion',
    nextSlide: 'Continue to next slide',
    placeholder: 'Coming soon.',
    prev: 'Previous',
    next: 'Next',
  },
};

// Parse markdown-style headers (**text**) into HTML headers
function parseMarkdownHeaders(text: string): React.ReactNode {
  const lines = text.split('\n');
  const result: React.ReactNode[] = [];
  
  lines.forEach((line, index) => {
    // Check if line is a header (**text**)
    const headerMatch = line.match(/^\*\*(.+?)\*\*$/);
    if (headerMatch) {
      // It's a header - render as h4
      result.push(
        <h4 key={index} className="text-lg font-bold text-gray-800 mt-4 mb-2 first:mt-0">
          {headerMatch[1]}
        </h4>
      );
    } else if (line.trim()) {
      // Regular paragraph
      result.push(
        <p key={index} className="mb-3 last:mb-0">
          {line}
        </p>
      );
    } else {
      // Empty line
      result.push(<br key={index} />);
    }
  });
  
  return <>{result}</>;
}

function SectionBlock({
  title,
  children,
  icon: Icon,
  iconBg,
  defaultOpen = false,
  isRTL,
}: {
  title: string;
  children: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  defaultOpen?: boolean;
  isRTL: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const hasContent = !!children;
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 sm:p-6 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-800">{title}</h3>
        </div>
        <ChevronDownIcon
          className={`w-5 h-5 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-100 overflow-hidden"
          >
            <div className="p-4 sm:p-6 pt-0 bg-gray-50/50">
              {hasContent ? children : <p className="text-gray-400 italic">—</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const HighlightsErfanDin: React.FC = () => {
  const { locale, isRTL } = useLocale();
  const t = content[locale];
  const [currentIndex, setCurrentIndex] = useState(0);
  const slide: ErfanDinSlide = erfanDinSlides[currentIndex];
  const totalSlides = erfanDinSlides.length;

  const goPrev = () => setCurrentIndex((i) => (i > 0 ? i - 1 : i));
  const goNext = () => setCurrentIndex((i) => (i < totalSlides - 1 ? i + 1 : i));

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        if (isRTL) setCurrentIndex((i) => (i < totalSlides - 1 ? i + 1 : i));
        else setCurrentIndex((i) => (i > 0 ? i - 1 : i));
      } else if (e.key === 'ArrowRight') {
        if (isRTL) setCurrentIndex((i) => (i > 0 ? i - 1 : i));
        else setCurrentIndex((i) => (i < totalSlides - 1 ? i + 1 : i));
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [totalSlides, isRTL]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-indigo-50/20 to-white">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to={withLocalePath(locale, '/')}
            className={`inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-3 text-sm font-semibold transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <ArrowLeftIcon className="w-4 h-4" />
            {t.back}
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
              <SparklesIcon className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{t.title}</h1>
              <p className="text-sm text-gray-500">{t.subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Progress */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-medium text-gray-500">
            {t.slideOf} {slide.pageNumber} {t.of} {totalSlides}
          </span>
          <div className="flex gap-1.5">
            {erfanDinSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === currentIndex ? 'bg-indigo-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`${t.slideOf} ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Slide content */}
        <AnimatePresence mode="wait">
          <motion.article
            key={currentIndex}
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRTL ? -20 : 20 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Slide title (H1 for SEO) */}
            {slide.title && (
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 leading-tight">
                {slide.title}
              </h2>
            )}

            {/* Intro */}
            {slide.intro && (
              <p className="text-gray-600 leading-relaxed">{slide.intro}</p>
            )}

            {/* Main text */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
              <h3 className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-4">
                {t.mainText}
              </h3>
              <p className="text-lg sm:text-xl text-gray-800 leading-loose whitespace-pre-line font-medium">
                {slide.text}
              </p>
            </div>

            {/* فراتر از نوشته */}
            <SectionBlock
              title={t.simpleExplanation}
              icon={DocumentTextIcon}
              iconBg={slide.simpleExplanation ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400'}
              defaultOpen={!!slide.simpleExplanation}
              isRTL={!!isRTL}
            >
              {slide.simpleExplanation ? (
                <div>
                  <p className="text-xs text-gray-500 mb-3 italic">{t.simpleExplanationNote}</p>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {parseMarkdownHeaders(slide.simpleExplanation)}
                  </div>
                </div>
              ) : (
                <p className="text-gray-400 italic">{t.placeholder}</p>
              )}
            </SectionBlock>

            {/* Sources */}
            <SectionBlock
              title={t.sourcesTitle}
              icon={BookOpenIcon}
              iconBg={(slide.sources?.length ?? 0) > 0 ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-400'}
              defaultOpen={(slide.sources?.length ?? 0) > 0}
              isRTL={!!isRTL}
            >
              {(slide.sources?.length ?? 0) > 0 ? (
                <ul className="space-y-2">
                  {slide.sources!.map((src, i) => (
                    <li key={i} className="text-gray-700 flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{src}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 italic">{t.placeholder}</p>
              )}
            </SectionBlock>

            {/* Conclusion */}
            {slide.conclusion && (
              <div className="bg-indigo-50 rounded-2xl border border-indigo-100 p-6 sm:p-8">
                <h3 className="text-sm font-semibold text-indigo-700 uppercase tracking-wider mb-3">
                  {t.conclusion}
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{slide.conclusion}</p>
              </div>
            )}

            {/* Comments Section */}
            <CommentsSection
              commentableType="erfan_slide"
              commentableId={slide.id}
            />

            {/* CTA: Next slide */}
            {currentIndex < totalSlides - 1 && (
              <div className="text-center pt-4">
                <button
                  onClick={goNext}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors"
                >
                  {t.nextSlide}
                  <ChevronRightIcon className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                </button>
              </div>
            )}
          </motion.article>
        </AnimatePresence>

        {/* Navigation */}
        <div
          className={`flex items-center justify-between mt-8 gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
              currentIndex === 0 ? 'bg-gray-100 text-gray-400' : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            <ChevronLeftIcon className="w-5 h-5" />
            {t.prev}
          </button>
          <button
            onClick={goNext}
            disabled={currentIndex === totalSlides - 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
              currentIndex === totalSlides - 1 ? 'bg-gray-100 text-gray-400' : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {t.next}
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HighlightsErfanDin;
