import React from 'react';
import { ProgressData } from '../types';

interface ProgressTrackerProps {
  progress: ProgressData;
}

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
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Thống kê tổng quan</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{progress.totalSessions}</div>
          <div className="text-sm text-gray-600">Phiên học</div>
        </div>
        
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{progress.totalProblems}</div>
          <div className="text-sm text-gray-600">Bài tập</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-yellow-50 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">{progress.bestStreak}</div>
          <div className="text-sm text-gray-600">Kỷ lục</div>
        </div>
        
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            {Math.round(progress.averageScore * 100)}%
          </div>
          <div className="text-sm text-gray-600">Trung bình</div>
        </div>
      </div>
      
      <div className="text-center text-sm text-gray-500">
        Lần cuối: {formatDate(progress.lastPlayed)}
      </div>
    </div>
  );
};
