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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          <p className="mt-4 text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">فصل پیدا نشد</h1>
          <Link to="/" className="btn-primary">
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link
            to="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
          >
            <ArrowRightIcon className="w-5 h-5 ml-2" />
            بازگشت به صفحه اصلی
          </Link>
          <div className="text-sm text-primary-600 font-semibold mb-2">
            فصل {chapter.number}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            {chapter.title}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-6">
            {chapter.description}
          </p>
          <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500">
            <span>{chapter.read_time} دقیقه مطالعه</span>
            <span>•</span>
            <span>{chapter.pages} صفحه</span>
          </div>
        </motion.header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg md:prose-xl prose-primary max-w-none
            prose-headings:font-bold prose-headings:text-gray-800 prose-headings:leading-tight
            prose-h1:text-4xl prose-h1:md:text-5xl
            prose-h2:text-3xl prose-h2:md:text-4xl
            prose-h3:text-2xl prose-h3:md:text-3xl
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-lg prose-p:md:text-xl
            prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-a:font-semibold
            prose-strong:text-gray-900 prose-strong:font-bold
            prose-blockquote:border-r-4 prose-blockquote:border-primary-500
            prose-blockquote:bg-gradient-to-l prose-blockquote:from-primary-50 prose-blockquote:to-blue-50
            prose-blockquote:py-6 prose-blockquote:px-8
            prose-blockquote:rounded-xl prose-blockquote:text-xl prose-blockquote:md:text-2xl
            prose-blockquote:shadow-md prose-blockquote:font-medium
            prose-img:rounded-2xl prose-img:shadow-xl prose-img:my-8
            prose-ul:text-lg prose-ul:md:text-xl prose-ul:leading-relaxed
            prose-li:my-3 prose-li:marker:text-primary-500"
          dangerouslySetInnerHTML={{ __html: chapter.content || '<p class="text-xl text-gray-600">محتوای این فصل به زودی اضافه خواهد شد.</p>' }}
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

