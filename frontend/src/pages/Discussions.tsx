import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { discussionApi, Thread } from '../services/api';
import ThreadCard from '../components/discussions/ThreadCard';
import RichEditor from '../components/discussions/RichEditor';
import { useLocale } from '../i18n/LocaleProvider';
import { withLocalePath } from '../i18n/localePath';
import { authApi } from '../services/api';
import { PlusIcon } from '@heroicons/react/24/outline';

const Discussions: React.FC = () => {
  const { locale } = useParams<{ locale: string }>();
  const { isRTL } = useLocale();
  const navigate = useNavigate();

  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'score' | 'comments'>('newest');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showNewThread, setShowNewThread] = useState(false);
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadContent, setNewThreadContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    loadThreads();
    loadCurrentUser();
  }, [sortBy, page]);

  const loadCurrentUser = async () => {
    try {
      const user = await authApi.getMe();
      setCurrentUser(user);
    } catch (error) {
      // User not logged in
      setCurrentUser(null);
    }
  };

  const loadThreads = async () => {
    setLoading(true);
    try {
      const response = await discussionApi.getThreads({
        sort: sortBy,
        page,
        per_page: 20,
      });
      setThreads(response.threads || []);
      setTotal(response.total || 0);
    } catch (error) {
      console.error('Failed to load threads:', error);
      setThreads([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateThread = async () => {
    if (newThreadTitle.trim().length < 3 || newThreadContent.trim().length < 10) {
      return;
    }

    setIsSubmitting(true);
    try {
      const thread = await discussionApi.createThread({
        title: newThreadTitle,
        content: newThreadContent,
      });
      setNewThreadTitle('');
      setNewThreadContent('');
      setShowNewThread(false);
      navigate(withLocalePath((locale as 'fa' | 'en') || 'fa', `/discussions/${thread.id}`));
    } catch (error: any) {
      if (error.response?.status === 401) {
        alert(isRTL ? 'لطفا ابتدا وارد شوید' : 'Please login first');
      } else {
        console.error('Failed to create thread:', error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVote = async (threadId: number, voteType: 1 | -1) => {
    if (!currentUser) {
      alert(isRTL ? 'لطفا ابتدا وارد شوید' : 'Please login first');
      return;
    }
    try {
      await discussionApi.voteThread(threadId, voteType);
      loadThreads();
    } catch (error) {
      console.error('Failed to vote:', error);
    }
  };

  const handleReact = async (threadId: number, reactionType: 'heart' | 'clap' | 'thumbs_up' | 'thumbs_down') => {
    if (!currentUser) {
      alert(isRTL ? 'لطفا ابتدا وارد شوید' : 'Please login first');
      return;
    }
    try {
      await discussionApi.reactThread(threadId, reactionType);
      loadThreads();
    } catch (error) {
      console.error('Failed to react:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary-600 mb-4">
            {isRTL ? 'بحث و گفتگو' : 'Discussions'}
          </h1>
          <p className="text-gray-600">
            {isRTL
              ? 'مکانی برای بحث عمیق درباره آزادی واقعی و نظریه جنت‌خواه'
              : 'A place for deep discussions about real freedom and Jannatkhah theory'}
          </p>
        </div>

        {/* Sort and New Thread */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex gap-2">
            {(['newest', 'oldest', 'score', 'comments'] as const).map((sort) => (
              <button
                key={sort}
                onClick={() => setSortBy(sort)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${sortBy === sort
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                {isRTL
                  ? { newest: 'جدیدترین', oldest: 'قدیمی‌ترین', score: 'امتیاز', comments: 'کامنت' }[sort]
                  : { newest: 'Newest', oldest: 'Oldest', score: 'Score', comments: 'Comments' }[sort]
                }
              </button>
            ))}
          </div>

          {currentUser ? (
            <button
              onClick={() => setShowNewThread(!showNewThread)}
              className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              <PlusIcon className="w-5 h-5" />
              {isRTL ? 'پرسش جدید' : 'New Question'}
            </button>
          ) : (
            <button
              onClick={() => navigate(withLocalePath((locale as 'fa' | 'en') || 'fa', '/login'))}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              {isRTL ? 'ورود برای پرسش' : 'Login to Ask'}
            </button>
          )}
        </div>

        {/* New Thread Form */}
        {showNewThread && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-gray-200 p-6 mb-6"
          >
            <h2 className="text-xl font-bold mb-4">{isRTL ? 'پرسش جدید' : 'New Question'}</h2>
            <input
              type="text"
              value={newThreadTitle}
              onChange={(e) => setNewThreadTitle(e.target.value)}
              placeholder={isRTL ? 'عنوان پرسش...' : 'Question title...'}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              maxLength={200}
            />
            <RichEditor
              value={newThreadContent}
              onChange={setNewThreadContent}
              onSubmit={handleCreateThread}
              onCancel={() => {
                setShowNewThread(false);
                setNewThreadTitle('');
                setNewThreadContent('');
              }}
              placeholder={isRTL ? 'متن پرسش خود را بنویسید...' : 'Write your question...'}
              minLength={10}
              showPreview={true}
            />
          </motion.div>
        )}

        {/* Threads List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          </div>
        ) : !threads || threads.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {isRTL ? 'هنوز پرسشی وجود ندارد' : 'No threads yet'}
          </div>
        ) : (
          <div className="space-y-4">
            {threads.map((thread) => (
              <ThreadCard
                key={thread.id}
                thread={thread}
                onVote={handleVote}
                onReact={handleReact}
                currentUserId={currentUser?.id}
                locale={locale}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {total > 20 && (
          <div className="mt-8 flex justify-center gap-2">
            {page > 1 && (
              <button
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                {isRTL ? 'قبلی' : 'Previous'}
              </button>
            )}
            <span className="px-4 py-2">
              {isRTL ? `صفحه ${page}` : `Page ${page}`}
            </span>
            {page * 20 < total && (
              <button
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                {isRTL ? 'بعدی' : 'Next'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Discussions;

