import React from 'react';
import { MathProblem } from '../types';
import { PROBLEM_TYPE_LABELS } from '../constants/problemTypes';

interface ProblemDisplayProps {
  problem: MathProblem;
  questionNumber: number;
  totalQuestions: number;
  showResult?: boolean;
}

export const ProblemDisplay: React.FC<ProblemDisplayProps> = ({ 
  problem, 
  questionNumber,
  totalQuestions,
  showResult = false
}) => {
  const getTypeLabel = (type: string) => {
    return PROBLEM_TYPE_LABELS[type as keyof typeof PROBLEM_TYPE_LABELS] || 'Toán học';
  };

  const getQuestionTypeLabel = (questionType: string) => {
    return questionType === 'multiple_choice' ? 'Trắc nghiệm' : 'Tự luận';
  };

  // Check if this is a word problem (toán có lời văn) or geometry problem
  const isWordProblem = problem.type.startsWith('word_problem');
  const isGeometryProblem = problem.type.startsWith('geometry');
  const needsSmallerFont = isWordProblem || isGeometryProblem;
  
  // Determine font size based on problem type
  const questionFontSize = needsSmallerFont ? 'text-2xl md:text-3xl' : 'text-4xl md:text-6xl';

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      {/* Header */}
      <div className="mb-6">
        {/* Web Layout */}
        <div className="hidden lg:flex lg:justify-between lg:items-center">
          <div className="text-lg font-semibold text-gray-600">
            Câu {questionNumber}/{totalQuestions}
          </div>
          <div className="flex items-center space-x-4">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {getTypeLabel(problem.type)}
            </span>
            <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
              {getQuestionTypeLabel(problem.questionType)}
            </span>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          {/* First Row: Question Number */}
          <div className="text-lg font-semibold text-gray-600 mb-3">
            Câu {questionNumber}/{totalQuestions}
          </div>
          {/* Second Row: Question Type & Problem Type */}
          <div className="flex items-center space-x-4">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {getTypeLabel(problem.type)}
            </span>
            <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
              {getQuestionTypeLabel(problem.questionType)}
            </span>
          </div>
        </div>
      </div>
      
      {/* Question */}
      <div className="text-center mb-8">
        <div className={`${questionFontSize} font-bold text-gray-800 mb-6 ${needsSmallerFont ? 'leading-relaxed' : ''}`}>
          {problem.question}
        </div>
      </div>

      {/* Answer Display Block - Separate from question */}
      {problem.isAnswered && (
        <div className="mt-6 pt-6 border-t-2 border-gray-200">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 space-y-4">
            {/* User's Answer */}
            <div className="flex items-center justify-center space-x-4">
              <span className="text-lg font-medium text-gray-700">Đáp án của bạn:</span>
              <span className={`text-3xl md:text-4xl font-bold ${problem.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {problem.userAnswer}
              </span>
            </div>
            
            {/* Correct Answer (if wrong) */}
            {!problem.isCorrect && (
              <div className="flex items-center justify-center space-x-4 pt-2 border-t border-gray-300">
                <span className="text-lg font-medium text-gray-700">Đáp án đúng:</span>
                <span className="text-3xl md:text-4xl font-bold text-blue-600">
                  {problem.answer}
                </span>
              </div>
            )}
            
            {/* Result Message */}
            {showResult && (
              <div className={`text-xl md:text-2xl font-semibold text-center pt-2 ${problem.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {problem.isCorrect ? '🎉 Đúng rồi!' : '😔 Sai rồi, cố gắng nhé!'}
              </div>
            )}
            
            {/* Fireworks Animation for Correct Answer */}
            {showResult && problem.isCorrect && (
              <div className="flex justify-center items-center space-x-2 pt-2">
                <div className="text-3xl animate-bounce">🎆</div>
                <div className="text-2xl animate-pulse">✨</div>
                <div className="text-xl animate-ping">🎊</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
