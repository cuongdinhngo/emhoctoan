import React, { useState } from 'react';
import { ProblemSettings } from '../types';
import { PROBLEM_TYPES_CONFIG } from '../constants/problemTypes';

interface StudentSetupProps {
  onStart: (settings: ProblemSettings) => void;
  initialSettings?: ProblemSettings;
}

export const StudentSetup: React.FC<StudentSetupProps> = ({ onStart, initialSettings }) => {
  const [studentName, setStudentName] = useState(initialSettings?.studentName || '');
  const [questionQuantity, setQuestionQuantity] = useState(initialSettings?.questionQuantity || 25);
  const [enabledTypes, setEnabledTypes] = useState<Array<string>>(
    initialSettings?.enabledTypes || ['addition', 'subtraction', 'multiplication_table', 'division_table']
  );
  const [difficulty, setDifficulty] = useState(initialSettings?.difficulty || 'medium');

  const problemTypes = PROBLEM_TYPES_CONFIG;

  const handleTypeToggle = (typeId: string) => {
    setEnabledTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(t => t !== typeId)
        : [...prev, typeId]
    );
  };

  const handleStart = () => {
    if (!studentName.trim()) {
      alert('Vui lòng nhập tên học sinh!');
      return;
    }
    
    if (enabledTypes.length === 0) {
      alert('Vui lòng chọn ít nhất một loại bài tập!');
      return;
    }

    onStart({
      studentName: studentName.trim(),
      questionQuantity,
      enabledTypes: enabledTypes as any,
      difficulty: difficulty as any
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Thiết lập bài kiểm tra</h1>
      </div>

      <div className="space-y-6">
        {/* Student Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tên học sinh *
          </label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Nhập tên của bạn..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Question Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Số câu hỏi
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[10, 15, 20, 25, 30, 50].map((quantity) => (
              <button
                key={quantity}
                onClick={() => setQuestionQuantity(quantity)}
                className={`p-3 rounded-lg border-2 text-center font-medium transition-colors ${
                  questionQuantity === quantity
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300'
                }`}
              >
                {quantity} câu
              </button>
            ))}
          </div>
        </div>

        {/* Problem Types */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Loại bài tập *
            </label>
            <span className="text-sm font-semibold text-blue-600">
              {enabledTypes.length} / {problemTypes.length} đã chọn
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {problemTypes.map((type) => (
              <label key={type.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enabledTypes.includes(type.id)}
                  onChange={() => handleTypeToggle(type.id)}
                  className="mr-3 h-4 w-4 text-blue-600"
                />
                <div>
                  <div className="font-medium text-gray-800">{type.label}</div>
                  <div className="text-sm text-gray-500">{type.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Độ khó
          </label>
          <div className="space-y-2">
            {[
              { value: 'easy', label: 'Dễ', description: 'Số nhỏ, phép tính đơn giản' },
              { value: 'medium', label: 'Trung bình', description: 'Số vừa phải' },
              { value: 'hard', label: 'Khó', description: 'Số lớn, phép tính phức tạp' }
            ].map(({ value, label, description }) => (
              <label key={value} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="difficulty"
                  value={value}
                  checked={difficulty === value}
                  onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
                  className="mr-3 h-4 w-4 text-blue-600"
                />
                <div>
                  <div className="font-medium text-gray-800">{label}</div>
                  <div className="text-sm text-gray-500">{description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl text-lg transition-colors duration-200"
        >
          🚀 Bắt đầu kiểm tra
        </button>
      </div>
    </div>
  );
};
