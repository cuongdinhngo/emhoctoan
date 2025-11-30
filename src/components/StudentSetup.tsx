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
    { id: 'three_digit_divide', label: 'Chia 3 chữ số', description: 'Chia số có ba chữ số cho số có một chữ số' },
    { id: 'word_problem_more_less', label: 'Toán có lời văn: Hơn kém', description: 'Dạng toán về hơn kém số đơn vị' },
    { id: 'word_problem_multiply_divide', label: 'Toán có lời văn: Gấp/Giảm', description: 'Dạng toán về gấp số lần, giảm số lần' },
    { id: 'word_problem_unit_conversion', label: 'Toán có lời văn: Rút đơn vị', description: 'Dạng toán liên quan đến rút về đơn vị' },
    { id: 'geometry_midpoint', label: 'Hình học: Trung điểm', description: 'Điểm ở giữa - Trung điểm của đoạn thẳng' },
    { id: 'geometry_circle', label: 'Hình học: Hình tròn', description: 'Hình tròn: tâm, bán kính, đường kính' },
    { id: 'geometry_rectangle', label: 'Hình học: Hình chữ nhật', description: 'Hình chữ nhật, chu vi, diện tích' },
    { id: 'geometry_square', label: 'Hình học: Hình vuông', description: 'Hình vuông, chu vi, diện tích' }
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
