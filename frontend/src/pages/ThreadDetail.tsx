import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { discussionApi, Thread, Comment } from '../services/api';
import CommentTree from '../components/discussions/CommentTree';
import RichEditor from '../components/discussions/RichEditor';
import VoteButtons from '../components/discussions/VoteButtons';
import ReactionButtons from '../components/discussions/ReactionButtons';
import { useLocale } from '../i18n/LocaleProvider';
import { withLocalePath } from '../i18n/localePath';
import { authApi } from '../services/api';
import { CheckBadgeIcon, ArrowLeftIcon, PencilIcon } from '@heroicons/react/24/outline';

const ThreadDetail: React.FC = () => {
  const { locale, id } = useParams<{ locale: string; id: string }>();
  const { isRTL } = useLocale();
  const navigate = useNavigate();

  const [thread, setThread] = useState<Thread | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReply, setShowReply] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

  useEffect(() => {
    loadThread();
    loadCurrentUser();
  }, [id]);

  const loadCurrentUser = async () => {
    try {
      const user = await authApi.getMe();
      setCurrentUser(user);
    } catch (error) {
      setCurrentUser(null);
    }
  };

  const loadThread = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await discussionApi.getThread(parseInt(id));
      setThread(response.thread);
      
      // Build nested comment tree
      const commentMap = new Map<number, Comment>();
      const rootComments: Comment[] = [];

      response.comments.forEach((comment) => {
        comment.replies = [];
        commentMap.set(comment.id, comment);
      });

      response.comments.forEach((comment) => {
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
      console.error('Failed to load thread:', error);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateComment = async (parentId: number | undefined, content: string) => {
    if (!thread || !content.trim()) return;

    setIsSubmitting(true);
    try {
      await discussionApi.createComment(thread.id, {
        content,
        parent_id: parentId,
      });
      setReplyContent('');
      setShowReply(false);
      loadThread();
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

  const handleVoteThread = async (voteType: 1 | -1) => {
    if (!thread || !currentUser) {
      alert(isRTL ? 'لطفا ابتدا وارد شوید' : 'Please login first');
      return;
    }
    try {
      await discussionApi.voteThread(thread.id, voteType);
      loadThread();
    } catch (error) {
      console.error('Failed to vote:', error);
    }
  };

  const handleVoteComment = async (commentId: number, voteType: 1 | -1) => {
    if (!currentUser) {
      alert(isRTL ? 'لطفا ابتدا وارد شوید' : 'Please login first');
      return;
    }
    try {
      await discussionApi.voteComment(commentId, voteType);
      loadThread();
    } catch (error) {
      console.error('Failed to vote:', error);
    }
  };

  const handleReactThread = async (reactionType: 'heart' | 'clap' | 'thumbs_up' | 'thumbs_down') => {
    if (!thread || !currentUser) {
      alert(isRTL ? 'لطفا ابتدا وارد شوید' : 'Please login first');
      return;
    }
    try {
      await discussionApi.reactThread(thread.id, reactionType);
      loadThread();
    } catch (error) {
      console.error('Failed to react:', error);
    }
  };

  const handleReactComment = async (commentId: number, reactionType: 'heart' | 'clap' | 'thumbs_up' | 'thumbs_down') => {
    if (!currentUser) {
      alert(isRTL ? 'لطفا ابتدا وارد شوید' : 'Please login first');
      return;
    }
    try {
      await discussionApi.reactComment(commentId, reactionType);
      loadThread();
    } catch (error) {
      console.error('Failed to react:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isRTL ? 'پرسش یافت نشد' : 'Thread not found'}
          </h2>
          <Link
            to={withLocalePath((locale as 'fa' | 'en') || 'fa', '/discussions')}
            className="text-primary-600 hover:text-primary-700"
          >
            {isRTL ? 'بازگشت به بحث‌ها' : 'Back to discussions'}
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = currentUser?.id === thread.user_id;
  const isVerified = thread.author?.email_verified_at;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link
          to={withLocalePath((locale as 'fa' | 'en') || 'fa', '/discussions')}
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>{isRTL ? 'بازگشت به بحث‌ها' : 'Back to discussions'}</span>
        </Link>

        {/* Thread */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-gray-200 p-6 mb-6"
        >
          <div className="flex gap-4">
            <VoteButtons
              score={thread.score}
              userVote={thread.user_vote}
              onVote={handleVoteThread}
              disabled={isOwner}
            />

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {thread.is_pinned && <span className="text-primary-600 mr-2">📌</span>}
                {thread.title}
              </h1>

              {/* Author info */}
              <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                <span className="font-semibold">
                  {thread.author?.name || thread.author?.email || 'Anonymous'}
                </span>
                {isVerified && <CheckBadgeIcon className="w-4 h-4 text-primary-600" />}
                <span>•</span>
                <span>
                  {new Date(thread.created_at).toLocaleDateString(isRTL ? 'fa-IR' : 'en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                {thread.edited_at && (
                  <>
                    <span>•</span>
                    <span className="text-gray-400">
                      ({isRTL ? 'ویرایش شده' : 'edited'})
                    </span>
                  </>
                )}
              </div>

              {/* Content */}
              <div
                className="prose prose-lg max-w-none mb-6"
                dangerouslySetInnerHTML={{
                  __html: thread.content
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-2 py-1 rounded">$1</code>')
                    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
                    .replace(/\n/g, '<br />'),
                }}
              />

              {/* Actions */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                {!isOwner && (
                  <ReactionButtons
                    userReactions={thread.user_reactions}
                    onReact={handleReactThread}
                    disabled={isOwner}
                  />
                )}
                <span className="text-sm text-gray-500">
                  {thread.comment_count} {isRTL ? 'پاسخ' : 'comments'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reply form */}
        {currentUser ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl border border-gray-200 p-6 mb-6"
          >
            <h2 className="text-xl font-bold mb-4">
              {isRTL ? 'پاسخ دهید' : 'Add a Reply'}
            </h2>
            <RichEditor
              value={replyContent}
              onChange={setReplyContent}
              onSubmit={() => handleCreateComment(undefined, replyContent)}
              placeholder={isRTL ? 'پاسخ خود را بنویسید...' : 'Write your reply...'}
              minLength={1}
            />
          </motion.div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 text-center">
            <p className="text-gray-600 mb-4">
              {isRTL ? 'برای پاسخ دادن باید وارد شوید' : 'Please login to reply'}
            </p>
            <Link
              to={withLocalePath((locale as 'fa' | 'en') || 'fa', '/login')}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              {isRTL ? 'ورود' : 'Login'}
            </Link>
          </div>
        )}

        {/* Comments */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {isRTL ? 'پاسخ‌ها' : 'Comments'} ({thread.comment_count})
          </h2>

          {!comments || comments.length === 0 ? (
            <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-200">
              {isRTL ? 'هنوز پاسخی وجود ندارد' : 'No comments yet'}
            </div>
          ) : (
            comments.map((comment) => (
              <CommentTree
                key={comment.id}
                comment={comment}
                depth={0}
                onReply={handleCreateComment}
                onVote={handleVoteComment}
                onReact={handleReactComment}
                currentUserId={currentUser?.id}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ThreadDetail;

