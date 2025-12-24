import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { chapterApi, Chapter, ChapterSummary } from '../services/api';
import { useProgress } from '../hooks/useProgress';
import AnalysisSection from '../components/AnalysisSection';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useLocale } from '../i18n/LocaleProvider';

const ChapterPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [allChapters, setAllChapters] = useState<ChapterSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const { updateProgress } = useProgress();
  const { t, isRTL } = useLocale();
  const BackIcon = isRTL ? ArrowRightIcon : ArrowLeftIcon;
  const ForwardIcon = isRTL ? ArrowLeftIcon : ArrowRightIcon;

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const [chapterData, chaptersData] = await Promise.all([
          chapterApi.getById(parseInt(id)),
          chapterApi.getAll()
        ]);
        setChapter(chapterData);
        setAllChapters(chaptersData);
        // Mark as read when chapter is loaded
        updateProgress(parseInt(id), chapterData.read_time);
      } catch (error) {
        console.error('Failed to fetch chapter:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, updateProgress]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-primary-500"></div>
          <p className="mt-4 text-gray-600 text-sm sm:text-base">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">{t('chapter.chapterNotFound')}</h1>
          <Link to="/" className="btn-primary">
            {t('common.backHome')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen py-6 sm:py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          <Link
            to="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4 sm:mb-6 text-sm sm:text-base"
          >
            <BackIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {t('common.backHome')}
          </Link>
          <div className="text-xs sm:text-sm text-primary-600 font-semibold mb-2">
            {t('chapter.chapterLabel')} {chapter.number}
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight">
            {chapter.title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-4 sm:mb-6">
            {chapter.description}
          </p>
          <div className={`flex items-center space-x-3 sm:space-x-4 ${isRTL ? 'space-x-reverse' : ''} text-xs sm:text-sm text-gray-500 flex-wrap gap-2`}>
            <span>
              {chapter.read_time} {t('chapter.minutes')}
            </span>
            <span className="hidden sm:inline">•</span>
            <span>
              {chapter.pages} {t('chapter.pages')}
            </span>
          </div>
        </motion.header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-sm sm:prose-base md:prose-lg lg:prose-xl prose-primary max-w-none
            prose-headings:font-bold prose-headings:text-gray-800 prose-headings:leading-tight
            prose-h1:text-2xl prose-h1:sm:text-3xl prose-h1:md:text-4xl prose-h1:lg:text-5xl
            prose-h2:text-xl prose-h2:sm:text-2xl prose-h2:md:text-3xl prose-h2:lg:text-4xl
            prose-h3:text-lg prose-h3:sm:text-xl prose-h3:md:text-2xl prose-h3:lg:text-3xl
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-base prose-p:sm:text-lg prose-p:md:text-xl
            prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-a:font-semibold prose-a:text-sm prose-a:sm:text-base prose-a:md:text-lg
            prose-strong:text-gray-900 prose-strong:font-bold
            prose-blockquote:border-r-4 prose-blockquote:border-primary-500
            prose-blockquote:bg-gradient-to-l prose-blockquote:from-primary-50 prose-blockquote:to-blue-50
            prose-blockquote:py-4 prose-blockquote:px-4 prose-blockquote:sm:py-6 prose-blockquote:sm:px-6 prose-blockquote:md:py-6 prose-blockquote:md:px-8
            prose-blockquote:rounded-lg prose-blockquote:sm:rounded-xl
            prose-blockquote:text-base prose-blockquote:sm:text-lg prose-blockquote:md:text-xl prose-blockquote:lg:text-2xl
            prose-blockquote:shadow-md prose-blockquote:font-medium prose-blockquote:my-4 prose-blockquote:sm:my-6 prose-blockquote:md:my-8
            prose-img:rounded-xl prose-img:sm:rounded-2xl prose-img:shadow-xl prose-img:my-4 prose-img:sm:my-6 prose-img:md:my-8 prose-img:w-full prose-img:h-auto
            prose-ul:text-base prose-ul:sm:text-lg prose-ul:md:text-xl prose-ul:leading-relaxed
            prose-ol:text-base prose-ol:sm:text-lg prose-ol:md:text-xl prose-ol:leading-relaxed
            prose-li:my-2 prose-li:sm:my-3 prose-li:marker:text-primary-500
            prose-table:w-full prose-table:text-sm prose-table:sm:text-base
            prose-code:text-sm prose-code:sm:text-base"
          dangerouslySetInnerHTML={{
            __html:
              chapter.content ||
              `<p class="text-base sm:text-lg md:text-xl text-gray-600">${t('chapter.contentSoon')}</p>`,
          }}
        />
      </div>

      {/* Analysis Section */}
      {chapter && (
        <AnalysisSection chapterId={chapter.id} title={chapter.title} />
      )}

      {/* Next Chapter & Reflection Section */}
      {chapter && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 md:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 mb-8 border border-primary-100"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">{t('chapter.reflectionTitle')}</h3>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6 sm:mb-8">
              {t('chapter.reflectionText')}
            </p>
          </motion.div>

          {/* Next Chapter Button */}
          {(() => {
            const currentIndex = allChapters.findIndex(c => c.id === chapter.id);
            const nextChapter = currentIndex >= 0 && currentIndex < allChapters.length - 1 
              ? allChapters[currentIndex + 1] 
              : null;
            
            return nextChapter ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Link
                  to={`/chapter/${nextChapter.id}`}
                  className="inline-flex items-center gap-3 sm:gap-4 bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg sm:text-xl md:text-2xl px-8 sm:px-12 md:px-16 py-4 sm:py-5 md:py-6 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <span>{t('common.nextChapter')}: {nextChapter.title}</span>
                  <ForwardIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                </Link>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-yellow-200"
              >
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  🎉 {t('common.completed')}
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6">
                  شما همه فصول را خوانده‌اید. حالا زمان عمل است — این پیام آزادی را با دیگران به اشتراک بگذار.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-3 bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <span>{t('common.backHome')}</span>
                  <BackIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </Link>
              </motion.div>
            );
          })()}
        </div>
      )}
    </article>
  );
};

export default ChapterPage;

