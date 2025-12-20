import React from 'react';
import { MathProblem } from '../types';
import { PROBLEM_TYPE_LABELS } from '../constants/problemTypes';
import { AnalogClock } from './AnalogClock';

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

  // Parse clock data from question if present
  const clockMatch = problem.question.match(/\[CLOCK:(\d+):(\d+)\]/);
  const clockData = clockMatch ? { hour: parseInt(clockMatch[1]), minute: parseInt(clockMatch[2]) } : null;
  const displayQuestion = clockData ? problem.question.replace(/\[CLOCK:\d+:\d+\]\s*/, '') : problem.question;

  // Check if this question has long text that needs smaller font
  const isLongQuestion = displayQuestion.length > 50;
  const needsSmallerFont = isLongQuestion;

  // Determine font size based on question length
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
            {/* Original type badge for semester1 review */}
            {problem.originalType && (
              <span className="inline-block bg-purple-100 text-purple-700 text-sm font-medium px-3 py-1 rounded-full">
                {getTypeLabel(problem.originalType)}
              </span>
            )}
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
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {getTypeLabel(problem.type)}
            </span>
            {/* Original type badge for semester1 review */}
            {problem.originalType && (
              <span className="inline-block bg-purple-100 text-purple-700 text-sm font-medium px-3 py-1 rounded-full">
                {getTypeLabel(problem.originalType)}
              </span>
            )}
            <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
              {getQuestionTypeLabel(problem.questionType)}
            </span>
          </div>
        </div>
      </div>
      
      {/* Question */}
      <div className="text-center mb-8">
        {/* Clock display for clock reading questions */}
        {clockData && (
          <div className="mb-6">
            <AnalogClock hour={clockData.hour} minute={clockData.minute} size={200} />
          </div>
        )}
        <div className={`${questionFontSize} font-bold text-gray-800 mb-6 ${needsSmallerFont ? 'leading-relaxed' : ''}`}>
          {displayQuestion}
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
                {clockData ? problem.userTextAnswer : problem.userAnswer}
              </span>
            </div>

            {/* Correct Answer (if wrong) */}
            {!problem.isCorrect && (
              <div className="flex items-center justify-center space-x-4 pt-2 border-t border-gray-300">
                <span className="text-lg font-medium text-gray-700">Đáp án đúng:</span>
                <span className="text-3xl md:text-4xl font-bold text-blue-600">
                  {clockData ? problem.textAnswer : problem.answer}
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
