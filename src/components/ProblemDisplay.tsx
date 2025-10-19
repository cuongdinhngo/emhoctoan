import React from 'react';
import { MathProblem } from '../types';

interface ProblemDisplayProps {
  problem: MathProblem;
  questionNumber: number;
  totalQuestions: number;
  showAnswer?: boolean;
  showResult?: boolean;
}

export const ProblemDisplay: React.FC<ProblemDisplayProps> = ({ 
  problem, 
  questionNumber,
  totalQuestions,
  showAnswer = false,
  showResult = false
}) => {
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'addition': return 'Phép cộng';
      case 'subtraction': return 'Phép trừ';
      case 'multiplication': return 'Phép nhân';
      case 'division': return 'Phép chia';
      case 'multiplication_table': return 'Bảng nhân';
      case 'division_table': return 'Bảng chia';
      case 'two_digit_multiply': return 'Nhân 2 chữ số';
      case 'division_with_remainder': return 'Chia có dư';
      case 'two_digit_divide': return 'Chia 2 chữ số';
      case 'three_digit_multiply': return 'Nhân 3 chữ số';
      case 'three_digit_divide': return 'Chia 3 chữ số';
      default: return 'Toán học';
    }
  };

  const getQuestionTypeLabel = (questionType: string) => {
    return questionType === 'multiple_choice' ? 'Trắc nghiệm' : 'Tự luận';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            {getTypeLabel(problem.type)}
          </span>
          <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
            {getQuestionTypeLabel(problem.questionType)}
          </span>
        </div>
        <div className="text-lg font-semibold text-gray-600">
          Câu {questionNumber}/{totalQuestions}
        </div>
      </div>
      
      {/* Question */}
      <div className="text-center mb-8">
        <div className="text-6xl font-bold text-gray-800 mb-6">
          {problem.question}
        </div>
        
        {showAnswer && (
          <div className={`text-4xl font-bold ${problem.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            = {problem.answer}
          </div>
        )}
        
        {showResult && problem.isAnswered && (
          <div className={`text-2xl font-semibold ${problem.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {problem.isCorrect ? '🎉 Đúng rồi!' : '😔 Sai rồi, cố gắng nhé!'}
          </div>
        )}
      </div>
    </div>
  );
};
