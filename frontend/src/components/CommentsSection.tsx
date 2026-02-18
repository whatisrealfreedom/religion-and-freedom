/**
 * کامپوننت کامنت polymorphic - قابل استفاده در همه جا
 * استفاده: <CommentsSection commentableType="erfan_slide" commentableId={slideId} />
 */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CommentTree from './discussions/CommentTree';
import RichEditor from './discussions/RichEditor';
import { Comment, commentApi, authApi } from '../services/api';
import { useLocale } from '../i18n/LocaleProvider';
import { withLocalePath } from '../i18n/localePath';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

interface CommentsSectionProps {
  commentableType: string; // 'erfan_slide', 'shahnameh_story', etc.
  commentableId: number | string;
  title?: string;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({
  commentableType,
  commentableId,
  title,
}) => {
  const { locale, isRTL } = useLocale();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReply, setShowReply] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const t = {
    fa: {
      title: 'نظر شما',
      placeholder: 'نظر خود را بنویسید...',
      loginToComment: 'برای نوشتن نظر باید وارد شوید',
      login: 'ورود',
      submitComment: 'ارسال نظر',
      noComments: 'هنوز نظری ثبت نشده است.',
      reply: 'پاسخ',
    },
    en: {
      title: 'Your opinion',
      placeholder: 'Write your comment...',
      loginToComment: 'You must be logged in to comment',
      login: 'Login',
      submitComment: 'Submit comment',
      noComments: 'No comments yet.',
      reply: 'Reply',
    },
  }[locale];

  useEffect(() => {
    loadComments();
    loadCurrentUser();
  }, [commentableType, commentableId]);

  const loadCurrentUser = async () => {
    try {
      const user = await authApi.getMe();
      setCurrentUser(user);
    } catch {
      setCurrentUser(null);
    }
  };

  const loadComments = async () => {
    setLoading(true);
    try {
      const response = await commentApi.getComments(commentableType, commentableId);
      
      // Build nested comment tree
      const commentMap = new Map<number, Comment>();
      const rootComments: Comment[] = [];

      response.forEach((comment) => {
        comment.replies = [];
        commentMap.set(comment.id, comment);
      });

      response.forEach((comment) => {
        if (comment.parent_id) {
          const parent = commentMap.get(comment.parent_id);
          if (parent) {
            if (!parent.replies) parent.replies = [];
            parent.replies.push(comment);
          }
        } else {
          rootComments.push(comment);
        }
      });

      setComments(rootComments);
    } catch (error) {
      console.error('Failed to load comments:', error);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateComment = async (parentId: number | undefined, content: string) => {
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      await commentApi.createComment(commentableType, commentableId, {
        content,
        parent_id: parentId,
      });
      setReplyContent('');
      setShowReply(false);
      loadComments();
    } catch (error: any) {
      if (error.response?.status === 401) {
        alert(isRTL ? 'لطفا ابتدا وارد شوید' : 'Please login first');
      } else {
        console.error('Failed to create comment:', error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVote = async (commentId: number, voteType: 1 | -1) => {
    if (!currentUser) {
      alert(isRTL ? 'لطفا ابتدا وارد شوید' : 'Please login first');
      return;
    }
    try {
      await commentApi.voteComment(commentId, voteType);
      loadComments();
    } catch (error) {
      console.error('Failed to vote:', error);
    }
  };

  const handleReact = async (commentId: number, reactionType: 'heart' | 'clap' | 'thumbs_up' | 'thumbs_down') => {
    if (!currentUser) {
      alert(isRTL ? 'لطفا ابتدا وارد شوید' : 'Please login first');
      return;
    }
    try {
      await commentApi.reactComment(commentId, reactionType);
      loadComments();
    } catch (error) {
      console.error('Failed to react:', error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
          <ChatBubbleLeftRightIcon className="w-5 h-5 text-purple-700" />
        </div>
        <h3 className="font-bold text-gray-800">{title || t.title}</h3>
      </div>

      {currentUser ? (
        <div className="space-y-4">
          {!showReply && (
            <button
              onClick={() => setShowReply(true)}
              className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-400 hover:bg-indigo-50/30 transition-colors text-gray-600 font-medium"
            >
              {t.placeholder}
            </button>
          )}
          {showReply && (
            <RichEditor
              value={replyContent}
              onChange={setReplyContent}
              onSubmit={() => handleCreateComment(undefined, replyContent)}
              onCancel={() => {
                setShowReply(false);
                setReplyContent('');
              }}
              placeholder={t.placeholder}
              minLength={1}
              showPreview={false}
            />
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">{t.loginToComment}</p>
          <Link
            to={withLocalePath(locale, '/login')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors"
          >
            {t.login}
          </Link>
        </div>
      )}

      {/* Comments list */}
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      ) : comments.length === 0 ? (
        <p className="text-center text-gray-400 py-8">{t.noComments}</p>
      ) : (
        <div className="mt-6 space-y-4">
          {comments.map((comment) => (
            <CommentTree
              key={comment.id}
              comment={comment}
              depth={0}
              onReply={handleCreateComment}
              onVote={handleVote}
              onReact={handleReact}
              currentUserId={currentUser?.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
