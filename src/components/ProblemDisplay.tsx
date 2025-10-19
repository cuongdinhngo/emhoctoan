import React from 'react';
import { MathProblem } from '../types';

interface ProblemDisplayProps {
  problem: MathProblem;
  isCorrect?: boolean;
  showAnswer?: boolean;
}

export const ProblemDisplay: React.FC<ProblemDisplayProps> = ({ 
  problem, 
  isCorrect, 
  showAnswer = false 
}) => {
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'addition': return 'Phép cộng';
      case 'subtraction': return 'Phép trừ';
      case 'multiplication': return 'Phép nhân';
      case 'division': return 'Phép chia';
      case 'multiplication_table': return 'Bảng nhân';
      case 'division_table': return 'Bảng chia';
      default: return 'Toán học';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
      <div className="mb-4">
        <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
          {getTypeLabel(problem.type)}
        </span>
      </div>
      
      <div className="text-6xl font-bold text-gray-800 mb-6">
        {problem.question}
      </div>
      
      {showAnswer && (
        <div className={`text-4xl font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
          = {problem.answer}
        </div>
      )}
      
      {isCorrect !== undefined && !showAnswer && (
        <div className={`text-2xl font-semibold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
          {isCorrect ? '🎉 Đúng rồi!' : '😔 Sai rồi, cố gắng nhé!'}
        </div>
      )}
    </div>
  );
};
