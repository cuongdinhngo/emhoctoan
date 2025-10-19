import React, { useState } from 'react';
import { ProblemSettings } from '../types';

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

  const problemTypes = [
    { id: 'addition', label: 'Phép cộng', description: 'Cộng trong phạm vi 1000' },
    { id: 'subtraction', label: 'Phép trừ', description: 'Trừ trong phạm vi 1000' },
    { id: 'multiplication_table', label: 'Bảng nhân', description: 'Nhân từ 1 đến 9' },
    { id: 'division_table', label: 'Bảng chia', description: 'Chia từ 1 đến 9' },
    { id: 'multiplication', label: 'Phép nhân', description: 'Nhân trong phạm vi 100' },
    { id: 'division', label: 'Phép chia', description: 'Chia trong phạm vi 100' },
    { id: 'two_digit_multiply', label: 'Nhân 2 chữ số', description: 'Nhân số có hai chữ số với số có một chữ số' },
    { id: 'division_with_remainder', label: 'Chia có dư', description: 'Phép chia hết, phép chia có dư' },
    { id: 'two_digit_divide', label: 'Chia 2 chữ số', description: 'Chia số có hai chữ số cho số có một chữ số' },
    { id: 'three_digit_multiply', label: 'Nhân 3 chữ số', description: 'Nhân số có ba chữ số với số có một chữ số' },
    { id: 'three_digit_divide', label: 'Chia 3 chữ số', description: 'Chia số có ba chữ số cho số có một chữ số' }
  ];

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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🧮 Em Học Toán - Lớp 3</h1>
        <p className="text-gray-600">Thiết lập bài kiểm tra</p>
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
          <select
            value={questionQuantity}
            onChange={(e) => setQuestionQuantity(Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={10}>10 câu</option>
            <option value={15}>15 câu</option>
            <option value={20}>20 câu</option>
            <option value={25}>25 câu</option>
            <option value={30}>30 câu</option>
            <option value={50}>50 câu</option>
          </select>
        </div>

        {/* Problem Types */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Loại bài tập *
          </label>
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
                  onChange={(e) => setDifficulty(e.target.value)}
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
