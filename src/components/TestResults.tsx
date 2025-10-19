import React from 'react';
import { SessionData } from '../types';

interface TestResultsProps {
  sessionData: SessionData;
  onReviewQuestion: (questionId: string) => void;
  onRetake: () => void;
  onNewTest: () => void;
}

export const TestResults: React.FC<TestResultsProps> = ({ 
  sessionData, 
  onReviewQuestion, 
  onRetake, 
  onNewTest 
}) => {
  const { problems, currentScore, settings } = sessionData;
  const percentage = Math.round((currentScore.correct / currentScore.total) * 100);
  
  const getGradeMessage = (percentage: number) => {
    if (percentage >= 90) return { message: 'Xuất sắc! 🌟', color: 'text-green-600' };
    if (percentage >= 80) return { message: 'Giỏi lắm! 👏', color: 'text-blue-600' };
    if (percentage >= 70) return { message: 'Khá tốt! 👍', color: 'text-yellow-600' };
    if (percentage >= 60) return { message: 'Cần cố gắng thêm! 💪', color: 'text-orange-600' };
    return { message: 'Hãy ôn tập lại nhé! 📚', color: 'text-red-600' };
  };

  const gradeInfo = getGradeMessage(percentage);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Kết quả kiểm tra</h1>
        <p className="text-gray-600">Học sinh: <span className="font-semibold">{settings.studentName}</span></p>
      </div>

      {/* Score Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-6 bg-blue-50 rounded-xl">
          <div className="text-4xl font-bold text-blue-600">{currentScore.correct}</div>
          <div className="text-gray-600">Câu đúng</div>
        </div>
        
        <div className="text-center p-6 bg-green-50 rounded-xl">
          <div className="text-4xl font-bold text-green-600">{percentage}%</div>
          <div className="text-gray-600">Điểm số</div>
        </div>
        
        <div className="text-center p-6 bg-purple-50 rounded-xl">
          <div className="text-4xl font-bold text-purple-600">{currentScore.total}</div>
          <div className="text-gray-600">Tổng câu</div>
        </div>
      </div>

      {/* Grade Message */}
      <div className={`text-center text-2xl font-bold mb-8 ${gradeInfo.color}`}>
        {gradeInfo.message}
      </div>

      {/* Question Review */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Chi tiết từng câu hỏi</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((problem, index) => (
            <button
              key={problem.id}
              onClick={() => onReviewQuestion(problem.id)}
              className={`p-4 rounded-lg border-2 text-left transition-all duration-200 hover:shadow-md ${
                problem.isCorrect 
                  ? 'bg-green-100 border-green-500 text-green-700' 
                  : 'bg-red-100 border-red-500 text-red-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Câu {index + 1}</div>
                  <div className="text-sm opacity-75">{problem.question}</div>
                </div>
                <div className="text-lg">
                  {problem.isCorrect ? '✅' : '❌'}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onRetake}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200"
        >
          🔄 Làm lại bài này
        </button>
        
        <button
          onClick={onNewTest}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200"
        >
          🆕 Bài kiểm tra mới
        </button>
      </div>
    </div>
  );
};
