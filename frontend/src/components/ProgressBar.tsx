import React from 'react';
import { motion } from 'framer-motion';
import { useProgress } from '../hooks/useProgress';

const ProgressBar: React.FC = () => {
  const { progress } = useProgress();

  return (
    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress.progressPercent}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
};

export default ProgressBar;

