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

  return (
    <motion.div
      className={`${sizeClasses[size]} relative flex items-center justify-center`}
      animate={animated ? {
        y: [-3, 3, -3],
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      } : {}}
    >
      {/* Modern Logo: White Dove with Key - Freedom Symbol */}
      <svg
        viewBox="0 0 140 140"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* White Dove - Clear and Prominent */}
        <motion.g
          animate={animated ? {
            rotate: [0, -2, 2, 0],
          } : {}}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Dove Body - White/Egg */}
          <ellipse
            cx="70"
            cy="80"
            rx="22"
            ry="16"
            fill="white"
            stroke="#e0e7ff"
            strokeWidth="2"
          />
          
          {/* Dove Head - White Circle */}
          <circle
            cx="85"
            cy="75"
            r="14"
            fill="white"
            stroke="#e0e7ff"
            strokeWidth="2"
          />
          
          {/* Dove Eye */}
          <circle
            cx="87"
            cy="73"
            r="2.5"
            fill="#3b82f6"
          />
          <circle
            cx="88"
            cy="72"
            r="1"
            fill="white"
          />
          
          {/* Dove Beak - Orange/Gold */}
          <polygon
            points="98,75 105,73 98,77"
            fill="#f59e0b"
          />
          
          {/* Wings - Left (Upward) */}
          <motion.path
            d="M 48 80 Q 30 55, 25 70 Q 30 90, 48 85"
            fill="white"
            stroke="#e0e7ff"
            strokeWidth="2"
            opacity="0.95"
            animate={animated ? {
              d: [
                "M 48 80 Q 30 55, 25 70 Q 30 90, 48 85",
                "M 48 80 Q 28 50, 22 70 Q 28 95, 48 85",
                "M 48 80 Q 30 55, 25 70 Q 30 90, 48 85",
              ],
            } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Wings - Right (Upward) */}
          <motion.path
            d="M 92 80 Q 110 55, 115 70 Q 110 90, 92 85"
            fill="white"
            stroke="#e0e7ff"
            strokeWidth="2"
            opacity="0.95"
            animate={animated ? {
              d: [
                "M 92 80 Q 110 55, 115 70 Q 110 90, 92 85",
                "M 92 80 Q 112 50, 118 70 Q 112 95, 92 85",
                "M 92 80 Q 110 55, 115 70 Q 110 90, 92 85",
              ],
            } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />
          
          {/* Tail Feathers */}
          <path
            d="M 48 92 Q 40 100, 35 95 Q 42 98, 48 96"
            fill="white"
            stroke="#e0e7ff"
            strokeWidth="1.5"
            opacity="0.9"
          />
        </motion.g>

        {/* Key - Golden/Yellow for contrast */}
        <motion.g
          animate={animated ? {
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1],
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          style={{ transformOrigin: '70px 110px' }}
        >
          {/* Key Head (Circle) - Gold */}
          <circle
            cx="70"
            cy="110"
            r="12"
            fill="#fbbf24"
            stroke="#f59e0b"
            strokeWidth="1.5"
          />
          
          {/* Key Teeth */}
          <rect
            x="67"
            y="106"
            width="6"
            height="8"
            rx="1.5"
            fill="#fbbf24"
          />
          
          {/* Key Shaft */}
          <rect
            x="68.5"
            y="115"
            width="3"
            height="18"
            rx="1.5"
            fill="#fbbf24"
          />
          
          {/* Key Bottom (Handle) - Gold */}
          <circle
            cx="70"
            cy="136"
            r="6"
            fill="#fbbf24"
            stroke="#f59e0b"
            strokeWidth="1.5"
          />
        </motion.g>

        {/* Sparkles - Light Blue/White */}
        {animated && (
          <>
            <motion.circle
              cx="35"
              cy="45"
              r="2.5"
              fill="#93c5fd"
              opacity="0.9"
              animate={{
                scale: [0.5, 1.2, 0.5],
                opacity: [0.4, 0.9, 0.4],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            />
            <motion.circle
              cx="105"
              cy="45"
              r="2"
              fill="#bfdbfe"
              opacity="0.8"
              animate={{
                scale: [0.4, 1, 0.4],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
            <motion.circle
              cx="50"
              cy="30"
              r="1.5"
              fill="#dbeafe"
              opacity="0.7"
              animate={{
                scale: [0.3, 0.8, 0.3],
                opacity: [0.2, 0.7, 0.2],
              }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            />
          </>
        )}
      </svg>
    </motion.div>
  );
};

export default FreedomBird;
