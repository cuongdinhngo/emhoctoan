import React from 'react';
import { ScoreData } from '../types';

interface ScoreBoardProps {
  score: ScoreData;
  showStreak?: boolean;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, showStreak = true }) => {
  const percentage = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  return (
    <div className="rounded-xl bg-primary p-6 text-white shadow-card">
      <h3 className="mb-4 text-center font-display text-xl font-bold">Điểm số</h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="font-display text-4xl font-extrabold tabular-nums">{score.correct}</div>
          <div className="text-sm text-white/85">Đúng</div>
        </div>
        <div className="text-center">
          <div className="font-display text-4xl font-extrabold tabular-nums">{score.total}</div>
          <div className="text-sm text-white/85">Tổng số</div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <div className="font-display text-3xl font-bold tabular-nums">{percentage}%</div>
        <div className="text-sm text-white/85">Tỷ lệ đúng</div>
      </div>

      {showStreak && (
        <div className="mt-4 text-center">
          <div className="text-lg font-bold">🔥 {score.streak} câu liên tiếp</div>
          {score.bestStreak > score.streak && (
            <div className="text-sm text-white/85">Kỷ lục: {score.bestStreak} câu</div>
          )}
        </div>
      )}
    </div>
  );
};
