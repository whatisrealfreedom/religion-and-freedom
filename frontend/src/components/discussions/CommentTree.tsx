import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Comment } from '../../services/api';
import VoteButtons from './VoteButtons';
import ReactionButtons from './ReactionButtons';
import RichEditor from './RichEditor';
import { useLocale } from '../../i18n/LocaleProvider';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { discussionApi } from '../../services/api';

interface CommentTreeProps {
  comment: Comment;
  depth: number;
  onReply: (parentId: number, content: string) => void;
  onVote: (commentId: number, voteType: 1 | -1) => void;
  onReact: (commentId: number, reactionType: 'heart' | 'clap' | 'thumbs_up' | 'thumbs_down') => void;
  currentUserId?: number;
  maxDepth?: number;
}

const CommentTree: React.FC<CommentTreeProps> = ({
  comment,
  depth,
  onReply,
  onVote,
  onReact,
  currentUserId,
  maxDepth = 6,
}) => {
  const { isRTL } = useLocale();
  const [isExpanded, setIsExpanded] = useState(depth < maxDepth);
  const [showReply, setShowReply] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isCollapsed = depth >= maxDepth;
  const hasReplies = comment.replies && comment.replies.length > 0;
  const isOwner = currentUserId === comment.user_id;
  const isVerified = comment.author?.email_verified_at;

  const handleReply = async () => {
    if (replyContent.trim().length < 1) return;
    setIsSubmitting(true);
    try {
      await onReply(comment.id, replyContent);
      setReplyContent('');
      setShowReply(false);
    } catch (error) {
      console.error('Failed to reply:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const indentWidth = Math.min(depth * 24, maxDepth * 24);

  return (
    <motion.div
      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative"
    >
      {/* Thread line */}
      {depth > 0 && (
        <div
          className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200"
          style={{ [isRTL ? 'right' : 'left']: `${indentWidth - 12}px` }}
        />
      )}

      <div
        className={`flex gap-3 ${isCollapsed && !isExpanded ? 'opacity-60' : ''}`}
        style={{ [isRTL ? 'paddingRight' : 'paddingLeft']: `${indentWidth}px` }}
      >
        {/* Vote buttons */}
        <div className="flex-shrink-0">
          <VoteButtons
            score={comment.score}
            userVote={comment.user_vote}
            onVote={(voteType) => onVote(comment.id, voteType)}
            disabled={isOwner}
            size="sm"
          />
        </div>

        {/* Comment content */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition-colors">
            {/* Author info */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-gray-900">
                  {comment.author?.name || comment.author?.email || 'Anonymous'}
                </span>
                {isVerified && (
                  <CheckBadgeIcon className="w-4 h-4 text-primary-600" />
                )}
              </div>
              <span className="text-xs text-gray-500">
                {new Date(comment.created_at).toLocaleDateString(isRTL ? 'fa-IR' : 'en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
              {comment.edited_at && (
                <span className="text-xs text-gray-400">
                  ({isRTL ? 'ویرایش شده' : 'edited'})
                </span>
              )}
            </div>

            {/* Comment text */}
            <div
              className="text-gray-700 prose prose-sm max-w-none mb-3"
              dangerouslySetInnerHTML={{
                __html: comment.content
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em>$1</em>')
                  .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-xs">$1</code>')
                  .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
                  .replace(/\n/g, '<br />'),
              }}
            />

            {/* Actions */}
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
              {!isOwner && (
                <button
                  onClick={() => setShowReply(!showReply)}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  {isRTL ? 'پاسخ' : 'Reply'}
                </button>
              )}
              <ReactionButtons
                userReactions={comment.user_reactions}
                onReact={(reactionType) => onReact(comment.id, reactionType)}
                disabled={isOwner}
              />
            </div>

            {/* Reply form */}
            <AnimatePresence>
              {showReply && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-gray-200"
                >
                  <RichEditor
                    value={replyContent}
                    onChange={setReplyContent}
                    onSubmit={handleReply}
                    onCancel={() => {
                      setShowReply(false);
                      setReplyContent('');
                    }}
                    placeholder={isRTL ? 'پاسخ خود را بنویسید...' : 'Write your reply...'}
                    minLength={1}
                    showPreview={false}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Collapse/Expand button */}
          {isCollapsed && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              {isExpanded
                ? (isRTL ? 'بستن پاسخ‌ها' : 'Collapse replies')
                : (isRTL ? `نمایش ${comment.replies?.length || 0} پاسخ` : `Show ${comment.replies?.length || 0} replies`)
              }
            </button>
          )}

          {/* Nested replies */}
          <AnimatePresence>
            {isExpanded && hasReplies && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-4 space-y-4"
              >
                {comment.replies?.map((reply) => (
                  <CommentTree
                    key={reply.id}
                    comment={reply}
                    depth={depth + 1}
                    onReply={onReply}
                    onVote={onVote}
                    onReact={onReact}
                    currentUserId={currentUserId}
                    maxDepth={maxDepth}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default CommentTree;

