import { useState, useEffect } from 'react';

export interface ProgressData {
  chaptersRead: number[];
  totalChapters: number;
  progressPercent: number;
  achievements: string[];
  currentStreak: number;
  totalReadTime: number;
}

export const useProgress = () => {
  const [progress, setProgress] = useState<ProgressData>({
    chaptersRead: [],
    totalChapters: 9,
    progressPercent: 0,
    achievements: [],
    currentStreak: 0,
    totalReadTime: 0,
  });

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('freedom-progress');
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load progress', e);
      }
    }
  }, []);

  const updateProgress = (chapterId: number, readTime: number = 0) => {
    setProgress((prev) => {
      const newChaptersRead = prev.chaptersRead.includes(chapterId)
        ? prev.chaptersRead
        : [...prev.chaptersRead, chapterId];

      const newProgress: ProgressData = {
        ...prev,
        chaptersRead: newChaptersRead,
        progressPercent: (newChaptersRead.length / prev.totalChapters) * 100,
        totalReadTime: prev.totalReadTime + readTime,
        currentStreak: newChaptersRead.length === prev.chaptersRead.length + 1
          ? prev.currentStreak + 1
          : prev.currentStreak,
      };

      // Check achievements
      const newAchievements = [...newProgress.achievements];
      if (newChaptersRead.length === 1 && !newAchievements.includes('first-step')) {
        newAchievements.push('first-step');
      }
      if (newChaptersRead.length === 3 && !newAchievements.includes('trinity')) {
        newAchievements.push('trinity');
      }
      if (newChaptersRead.length === 5 && !newAchievements.push('halfway')) {
        newAchievements.push('halfway');
      }
      if (newChaptersRead.length === 9 && !newAchievements.includes('complete')) {
        newAchievements.push('complete');
      }
      if (newProgress.totalReadTime >= 60 && !newAchievements.includes('scholar')) {
        newAchievements.push('scholar');
      }

      newProgress.achievements = newAchievements;

      // Save to localStorage
      localStorage.setItem('freedom-progress', JSON.stringify(newProgress));

      return newProgress;
    });
  };

  const resetProgress = () => {
    const emptyProgress: ProgressData = {
      chaptersRead: [],
      totalChapters: 9,
      progressPercent: 0,
      achievements: [],
      currentStreak: 0,
      totalReadTime: 0,
    };
    setProgress(emptyProgress);
    localStorage.setItem('freedom-progress', JSON.stringify(emptyProgress));
  };

  return { progress, updateProgress, resetProgress };
};

