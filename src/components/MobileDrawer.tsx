import React from 'react';
import { QuestionListItem } from '../types';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  questions: QuestionListItem[];
  onQuestionSelect: (questionId: string) => void;
  currentQuestionId: string;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ 
  isOpen, 
  onClose, 
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

  const handleQuestionClick = (questionId: string) => {
    onQuestionSelect(questionId);
    onClose(); // Close drawer after selection
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          <h3 className="text-lg font-bold text-gray-800">Danh sách câu hỏi</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Questions List */}
        <div className="p-4 flex-1 overflow-y-auto pb-20">
          <div className="space-y-2">
            {questions.map((question) => (
              <button
                key={question.id}
                onClick={() => handleQuestionClick(question.id)}
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
          
          {/* Legend */}
          <div className="mt-6 p-3 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-700">
              <div className="flex items-center space-x-2 mb-1">
                <span>📍</span>
                <span>Câu hiện tại</span>
              </div>
              <div className="flex items-center space-x-2 mb-1">
                <span>✅</span>
                <span>Đã trả lời đúng</span>
              </div>
              <div className="flex items-center space-x-2 mb-1">
                <span>❌</span>
                <span>Đã trả lời sai</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>⭕</span>
                <span>Chưa trả lời</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
