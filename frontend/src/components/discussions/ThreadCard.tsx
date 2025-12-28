import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Thread } from '../../services/api';
import VoteButtons from './VoteButtons';
import ReactionButtons from './ReactionButtons';
import { CheckBadgeIcon, ChatBubbleLeftIcon, EyeIcon } from '@heroicons/react/24/outline';
import { useLocale } from '../../i18n/LocaleProvider';
import { withLocalePath } from '../../i18n/localePath';

interface ThreadCardProps {
  thread: Thread;
  onVote: (threadId: number, voteType: 1 | -1) => void;
  onReact: (threadId: number, reactionType: 'heart' | 'clap' | 'thumbs_up' | 'thumbs_down') => void;
  currentUserId?: number;
  locale?: string;
}

const ThreadCard: React.FC<ThreadCardProps> = ({
  thread,
  onVote,
  onReact,
  currentUserId,
  locale = 'fa',
}) => {
  const { isRTL } = useLocale();
  const isOwner = currentUserId === thread.user_id;
  const isVerified = thread.author?.email_verified_at;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all overflow-hidden"
    >
      <div className="flex gap-4 p-4">
        {/* Vote buttons */}
        <div className="flex-shrink-0">
          <VoteButtons
            score={thread.score}
            userVote={thread.user_vote}
            onVote={(voteType) => onVote(thread.id, voteType)}
            disabled={isOwner}
            size="md"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <Link
            to={withLocalePath(locale as 'fa' | 'en', `/discussions/${thread.id}`)}
            className="block hover:text-primary-600 transition-colors"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
              {thread.is_pinned && (
                <span className="text-primary-600 mr-2">📌</span>
              )}
              {thread.title}
            </h3>
          </Link>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {thread.content.replace(/[#*`]/g, '').substring(0, 150)}...
          </p>

          {/* Meta info */}
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <span className="font-medium">
                {thread.author?.name || thread.author?.email || 'Anonymous'}
              </span>
              {isVerified && (
                <CheckBadgeIcon className="w-3 h-3 text-primary-600" />
              )}
            </div>
            <span>•</span>
            <span>
              {new Date(thread.created_at).toLocaleDateString(isRTL ? 'fa-IR' : 'en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <ChatBubbleLeftIcon className="w-4 h-4" />
              <span>{thread.comment_count}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <EyeIcon className="w-4 h-4" />
              <span>{thread.view_count}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link
              to={withLocalePath(locale as 'fa' | 'en', `/discussions/${thread.id}`)}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              {isRTL ? 'مشاهده و پاسخ' : 'View & Reply'}
            </Link>
            {!isOwner && (
              <ReactionButtons
                userReactions={thread.user_reactions}
                onReact={(reactionType) => onReact(thread.id, reactionType)}
                disabled={isOwner}
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ThreadCard;

