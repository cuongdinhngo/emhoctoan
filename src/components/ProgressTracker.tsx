import React from 'react';
import { ProgressData } from '../types';
import { cx } from './ui/cx';

interface ProgressTrackerProps {
  progress: ProgressData;
}

const stats = (progress: ProgressData) => [
  { value: progress.totalSessions, label: 'Phiên học', bg: 'bg-primary-soft', text: 'text-primary-strong' },
  { value: progress.totalProblems, label: 'Bài tập', bg: 'bg-success-soft', text: 'text-success-ink' },
  { value: progress.bestStreak, label: 'Kỷ lục', bg: 'bg-secondary-soft', text: 'text-secondary-strong' },
  { value: `${Math.round(progress.averageScore * 100)}%`, label: 'Trung bình', bg: 'bg-violet-soft', text: 'text-violet-ink' },
];

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ progress }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <h3 className="mb-4 font-display text-xl font-bold text-ink">Thống kê tổng quan</h3>

      <div className="mb-4 grid grid-cols-2 gap-4">
        {stats(progress).map((s) => (
          <div key={s.label} className={cx('rounded-md p-3 text-center', s.bg)}>
            <div className={cx('font-display text-3xl font-extrabold tabular-nums', s.text)}>{s.value}</div>
            <div className="mt-1 text-sm text-ink-muted">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="text-center text-sm text-ink-muted">
        Lần cuối: {formatDate(progress.lastPlayed)}
      </div>
    </div>
  );
};
