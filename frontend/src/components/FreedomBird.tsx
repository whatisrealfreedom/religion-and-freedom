import React from 'react';
import { motion } from 'framer-motion';

interface FreedomBirdProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const FreedomBird: React.FC<FreedomBirdProps> = ({ size = 'md', animated = true }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
  };

  const birdVariants = {
    flying: {
      y: [-5, 5, -5],
      rotate: [-2, 2, -2],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    still: {
      y: 0,
      rotate: 0,
    },
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} relative`}
      animate={animated ? {
        y: [-5, 5, -5],
        rotate: [-2, 2, -2],
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      } : {}}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Bird Body */}
        <motion.ellipse
          cx="50"
          cy="55"
          rx="18"
          ry="12"
          fill="currentColor"
          className="text-primary-500"
          initial={{ scale: 0.9 }}
          animate={{ scale: [0.9, 1, 0.9] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Bird Head */}
        <circle
          cx="65"
          cy="50"
          r="10"
          fill="currentColor"
          className="text-primary-600"
        />
        
        {/* Beak */}
        <polygon
          points="75,50 82,48 75,52"
          fill="currentColor"
          className="text-primary-700"
        />
        
        {/* Eye */}
        <circle
          cx="67"
          cy="48"
          r="2"
          fill="white"
        />
        
        {/* Wings - Left */}
        <motion.path
          d="M 35 55 Q 20 40, 15 50 Q 20 60, 35 55"
          fill="currentColor"
          className="text-primary-400"
          opacity="0.9"
          animate={{
            d: [
              "M 35 55 Q 20 40, 15 50 Q 20 60, 35 55",
              "M 35 55 Q 25 35, 20 45 Q 25 65, 35 55",
              "M 35 55 Q 20 40, 15 50 Q 20 60, 35 55",
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        
        {/* Wings - Right */}
        <motion.path
          d="M 35 55 Q 50 40, 55 50 Q 50 60, 35 55"
          fill="currentColor"
          className="text-primary-300"
          opacity="0.8"
          animate={{
            d: [
              "M 35 55 Q 50 40, 55 50 Q 50 60, 35 55",
              "M 35 55 Q 45 35, 50 45 Q 45 65, 35 55",
              "M 35 55 Q 50 40, 55 50 Q 50 60, 35 55",
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
        />
        
        {/* Tail */}
        <motion.path
          d="M 32 55 Q 25 60, 20 55"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="text-primary-600"
          animate={{
            pathLength: [0.5, 1, 0.5],
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </svg>
    </motion.div>
  );
};

export default FreedomBird;

