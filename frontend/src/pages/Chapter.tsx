import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { chapterApi, Chapter } from '../services/api';
import { useProgress } from '../hooks/useProgress';
import AnalysisSection from '../components/AnalysisSection';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const ChapterPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const { updateProgress } = useProgress();

  useEffect(() => {
    const fetchChapter = async () => {
      if (!id) return;
      try {
        const data = await chapterApi.getById(parseInt(id));
        setChapter(data);
        // Mark as read when chapter is loaded
        updateProgress(parseInt(id), data.read_time);
      } catch (error) {
        console.error('Failed to fetch chapter:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchChapter();
  }, [id, updateProgress]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-primary-500"></div>
          <p className="mt-4 text-gray-600 text-sm sm:text-base">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">فصل پیدا نشد</h1>
          <Link to="/" className="btn-primary">
            بازگشت به صفحه اصلی
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
            <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            بازگشت به صفحه اصلی
          </Link>
          <div className="text-xs sm:text-sm text-primary-600 font-semibold mb-2">
            فصل {chapter.number}
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight">
            {chapter.title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-4 sm:mb-6">
            {chapter.description}
          </p>
          <div className="flex items-center space-x-3 sm:space-x-4 space-x-reverse text-xs sm:text-sm text-gray-500 flex-wrap gap-2">
            <span>{chapter.read_time} دقیقه مطالعه</span>
            <span className="hidden sm:inline">•</span>
            <span>{chapter.pages} صفحه</span>
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
          dangerouslySetInnerHTML={{ __html: chapter.content || '<p class="text-base sm:text-lg md:text-xl text-gray-600">محتوای این فصل به زودی اضافه خواهد شد.</p>' }}
        />
      </div>

      {/* Analysis Section */}
      {chapter && (
        <AnalysisSection chapterId={chapter.id} title={chapter.title} />
      )}
    </article>
  );
};

export default ChapterPage;

