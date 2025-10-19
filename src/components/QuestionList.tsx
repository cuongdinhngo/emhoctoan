import React from 'react';
import { QuestionListItem } from '../types';

interface QuestionListProps {
  questions: QuestionListItem[];
  onQuestionSelect: (questionId: string) => void;
  currentQuestionId: string;
}

export const QuestionList: React.FC<QuestionListProps> = ({ 
  questions, 
  onQuestionSelect, 
  currentQuestionId 
}) => {
  const getQuestionStatusIcon = (question: QuestionListItem) => {
    if (question.isCurrent) return '📍';
    if (question.isAnswered) {
      return question.isCorrect ? '✅' : '❌';
    }
    return '⭕';
  };

  const getQuestionStatusColor = (question: QuestionListItem) => {
    if (question.isCurrent) return 'bg-blue-100 border-blue-500 text-blue-700';
    if (question.isAnswered) {
      return question.isCorrect ? 'bg-green-100 border-green-500 text-green-700' : 'bg-red-100 border-red-500 text-red-700';
    }
    return 'bg-gray-100 border-gray-300 text-gray-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 h-full">
      <h3 className="text-lg font-bold mb-4 text-gray-800">Danh sách câu hỏi</h3>
      
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {questions.map((question) => (
          <button
            key={question.id}
            onClick={() => onQuestionSelect(question.id)}
            className={`w-full p-3 rounded-lg border-2 text-left transition-all duration-200 hover:shadow-md ${getQuestionStatusColor(question)}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-lg">{getQuestionStatusIcon(question)}</span>
                <span className="font-medium">Câu {question.questionNumber}</span>
              </div>
              {question.isAnswered && (
                <span className="text-sm font-bold">
                  {question.isCorrect ? '+1' : '0'}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <div className="text-sm text-blue-700">
          <div>📍 Câu hiện tại</div>
          <div>✅ Đã trả lời đúng</div>
          <div>❌ Đã trả lời sai</div>
          <div>⭕ Chưa trả lời</div>
        </div>
      </div>
    </div>
  );
};
