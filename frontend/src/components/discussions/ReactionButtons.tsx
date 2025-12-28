import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReactionButtonsProps {
  userReactions?: string[];
  onReact: (reactionType: 'heart' | 'clap' | 'thumbs_up' | 'thumbs_down') => void;
  disabled?: boolean;
}

const reactions = [
  { type: 'heart' as const, emoji: '❤️', label: 'Heart' },
  { type: 'clap' as const, emoji: '👏', label: 'Clap' },
  { type: 'thumbs_up' as const, emoji: '👍', label: 'Thumbs Up' },
  { type: 'thumbs_down' as const, emoji: '👎', label: 'Thumbs Down' },
];

const ReactionButtons: React.FC<ReactionButtonsProps> = ({
  userReactions = [],
  onReact,
  disabled = false,
}) => {
  const [hoveredReaction, setHoveredReaction] = useState<string | null>(null);

  return (
    <div className="flex items-center gap-2">
      {reactions.map((reaction) => {
        const isActive = userReactions.includes(reaction.type);
        return (
          <motion.button
            key={reaction.type}
            whileHover={{ scale: disabled ? 1 : 1.2 }}
            whileTap={{ scale: disabled ? 1 : 0.9 }}
            onHoverStart={() => setHoveredReaction(reaction.type)}
            onHoverEnd={() => setHoveredReaction(null)}
            onClick={() => !disabled && onReact(reaction.type)}
            disabled={disabled}
            className={`
              text-2xl transition-all duration-200
              ${isActive ? 'scale-125 filter drop-shadow-lg' : 'opacity-70'}
              ${disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-125'}
            `}
          >
            {reaction.emoji}
          </motion.button>
        );
      })}
    </div>
  );
};

export default ReactionButtons;

