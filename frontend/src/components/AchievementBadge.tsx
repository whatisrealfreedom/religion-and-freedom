import React from 'react';
import { motion } from 'framer-motion';

interface AchievementBadgeProps {
  icon: string;
  title: string;
  description: string;
  unlocked: boolean;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  icon,
  title,
  description,
  unlocked,
}) => {
  return (
    <motion.div
      className={`relative p-4 rounded-xl border-2 transition-all ${
        unlocked
          ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-400 shadow-lg'
          : 'bg-gray-100 border-gray-300 opacity-60'
      }`}
      whileHover={{ scale: unlocked ? 1.05 : 1 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-start space-x-3 space-x-reverse">
        <div
          className={`text-3xl ${unlocked ? 'animate-bounce' : 'grayscale'}`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <h4
            className={`font-bold mb-1 ${
              unlocked ? 'text-yellow-800' : 'text-gray-500'
            }`}
          >
            {title}
          </h4>
          <p
            className={`text-sm ${
              unlocked ? 'text-yellow-700' : 'text-gray-400'
            }`}
          >
            {description}
          </p>
        </div>
        {unlocked && (
          <motion.div
            className="absolute top-2 left-2"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
          >
            ⭐
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AchievementBadge;

