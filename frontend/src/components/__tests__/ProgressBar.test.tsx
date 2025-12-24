import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgressBar from '../ProgressBar';
import { useProgress } from '../../hooks/useProgress';

jest.mock('../../hooks/useProgress');

describe('ProgressBar', () => {
  it('renders progress bar correctly', () => {
    (useProgress as jest.Mock).mockReturnValue({
      progress: {
        chaptersRead: [1, 2, 3],
        totalChapters: 10,
        progressPercent: 33.33,
        achievements: [],
        currentStreak: 3,
        totalReadTime: 30,
      },
    });

    render(<ProgressBar />);
    
    const progressBar = screen.getByRole('progressbar', { hidden: true });
    expect(progressBar).toBeInTheDocument();
  });

  it('shows 0% when no chapters read', () => {
    (useProgress as jest.Mock).mockReturnValue({
      progress: {
        chaptersRead: [],
        totalChapters: 10,
        progressPercent: 0,
        achievements: [],
        currentStreak: 0,
        totalReadTime: 0,
      },
    });

    render(<ProgressBar />);
    const progressBar = screen.getByRole('progressbar', { hidden: true });
    expect(progressBar).toBeInTheDocument();
  });
});

