import React from 'react';
import { ScoreData } from '../types';

interface ScoreBoardProps {
  score: ScoreData;
  showStreak?: boolean;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, showStreak = true }) => {
  const percentage = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
      <h3 className="text-xl font-bold mb-4 text-center">Điểm số</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold">{score.correct}</div>
          <div className="text-sm opacity-90">Đúng</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold">{score.total}</div>
          <div className="text-sm opacity-90">Tổng số</div>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <div className="text-2xl font-bold">{percentage}%</div>
        <div className="text-sm opacity-90">Tỷ lệ đúng</div>
      </div>
      
      {showStreak && (
        <div className="mt-4 text-center">
          <div className="text-lg font-bold">
            🔥 {score.streak} câu liên tiếp
          </div>
          {score.bestStreak > score.streak && (
            <div className="text-sm opacity-90">
              Kỷ lục: {score.bestStreak} câu
            </div>
          )}
        </div>
      )}
    </div>
  );
};
