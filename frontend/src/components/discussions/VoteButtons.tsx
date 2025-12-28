import React from 'react';
import { motion } from 'framer-motion';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface VoteButtonsProps {
  score: number;
  userVote?: number;
  onVote: (voteType: 1 | -1) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const VoteButtons: React.FC<VoteButtonsProps> = ({
  score,
  userVote,
  onVote,
  disabled = false,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const handleUpvote = () => {
    if (!disabled) {
      onVote(1);
    }
  };

  const handleDownvote = () => {
    if (!disabled) {
      onVote(-1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <motion.button
        whileHover={{ scale: disabled ? 1 : 1.1 }}
        whileTap={{ scale: disabled ? 1 : 0.9 }}
        onClick={handleUpvote}
        disabled={disabled}
        className={`
          ${sizeClasses[size]}
          flex items-center justify-center
          rounded-lg transition-colors
          ${userVote === 1
            ? 'bg-green-100 text-green-600'
            : 'bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <ChevronUpIcon className="w-5 h-5" />
      </motion.button>

      <span
        className={`
          ${textSizeClasses[size]}
          font-semibold
          ${score > 0 ? 'text-green-600' : score < 0 ? 'text-red-600' : 'text-gray-600'}
        `}
      >
        {score}
      </span>

      <motion.button
        whileHover={{ scale: disabled ? 1 : 1.1 }}
        whileTap={{ scale: disabled ? 1 : 0.9 }}
        onClick={handleDownvote}
        disabled={disabled}
        className={`
          ${sizeClasses[size]}
          flex items-center justify-center
          rounded-lg transition-colors
          ${userVote === -1
            ? 'bg-red-100 text-red-600'
            : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <ChevronDownIcon className="w-5 h-5" />
      </motion.button>
    </div>
  );
};

export default VoteButtons;

