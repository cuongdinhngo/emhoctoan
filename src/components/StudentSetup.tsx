import React, { useState, useEffect } from 'react';
import { ProblemSettings } from '../types';
import { PROBLEM_TYPES_CONFIG, PROBLEM_GROUP_LABELS, ProblemGroup } from '../constants/problemTypes';

// Types included in Semester 1 Review
const SEMESTER_1_TYPES = [
  { label: 'Nhân 2 chữ số', type: 'two_digit_multiply' },
  { label: 'Chia 2 chữ số', type: 'two_digit_divide' },
  { label: 'Nhân 3 chữ số', type: 'three_digit_multiply' },
  { label: 'Chia 3 chữ số', type: 'three_digit_divide' },
  { label: 'Chia có dư', type: 'division_with_remainder' },
  { label: 'Toán có lời văn: Hơn kém', type: 'word_problem_more_less' },
  { label: 'Toán có lời văn: Gấp/Giảm', type: 'word_problem_multiply_divide' },
  { label: 'Toán có lời văn: Chia có dư', type: 'word_problem_division_remainder' },
  { label: 'Hình học: Hình tròn', type: 'geometry_circle' },
  { label: 'Xem đồng hồ', type: 'review_clock_reading' },
  { label: 'Tìm 1/n của số', type: 'review_fraction_of_number' },
  { label: 'Đặt tính rồi tính', type: 'review_written_calculation' },
  { label: 'Đường gấp khúc', type: 'review_broken_line' },
  { label: 'Điền số vào ô trống', type: 'review_chain_calculation' },
  { label: 'Tìm số còn thiếu', type: 'review_fill_blank' },
  { label: 'Nhận biết phân số', type: 'visual_fraction' },
  { label: 'Đúng/Sai: Gấp/Giảm', type: 'true_false_multiply_divide' },
  { label: 'Tính có đơn vị', type: 'unit_calculation' }
];
const MIN_SEMESTER_1_QUESTIONS = SEMESTER_1_TYPES.length; // 18

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
  const [isExpanded, setIsExpanded] = useState(true);
  const [isReviewExpanded, setIsReviewExpanded] = useState(true);
  const [showSemester1Modal, setShowSemester1Modal] = useState(false);

  // Filter problem types by category
  const grade3Types = PROBLEM_TYPES_CONFIG.filter(t => !t.category || t.category === 'grade3');
  const reviewTypes = PROBLEM_TYPES_CONFIG.filter(t => t.category === 'review');

  // Count selected types per category
  const selectedGrade3Count = grade3Types.filter(t => enabledTypes.includes(t.id)).length;
  const selectedReviewCount = reviewTypes.filter(t => enabledTypes.includes(t.id)).length;

  // Check if semester 1 review is selected
  const isSemester1Selected = enabledTypes.includes('review_semester_1');

  // Standard question quantities
  const standardQuantities = [10, 15, 20, 25, 30, 50];

  // Filter available quantities based on selection
  const availableQuantities = isSemester1Selected
    ? standardQuantities.filter(q => q >= MIN_SEMESTER_1_QUESTIONS)
    : standardQuantities;

  // Auto-adjust question quantity if semester1 is selected and current quantity is too low
  useEffect(() => {
    if (isSemester1Selected && questionQuantity < MIN_SEMESTER_1_QUESTIONS) {
      setQuestionQuantity(availableQuantities[0]); // Minimum available for semester1
    }
  }, [isSemester1Selected, questionQuantity, availableQuantities]);

  // Handle grade3 type toggle - clears any review selection
  const handleTypeToggle = (typeId: string) => {
    setEnabledTypes(prev => {
      // Remove any review types when selecting grade3 types
      const withoutReview = prev.filter(t => !reviewTypes.some(r => r.id === t));

      if (withoutReview.includes(typeId)) {
        return withoutReview.filter(t => t !== typeId);
      } else {
        return [...withoutReview, typeId];
      }
    });
  };

  // Handle review type selection - clears all grade3 and sets only selected review
  const handleReviewSelect = (typeId: string) => {
    setEnabledTypes([typeId]);
    setIsExpanded(false); // Collapse grade3 panel
    if (typeId === 'review_semester_1') {
      setShowSemester1Modal(true);
    }
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
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
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
            {isSemester1Selected && (
              <span className="text-purple-600 text-xs ml-2">
                (Tối thiểu {MIN_SEMESTER_1_QUESTIONS} câu)
              </span>
            )}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {availableQuantities.map((quantity) => (
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

        {/* Problem Types - Toán lớp 3 Expansion Panel */}
        <div className="border rounded-xl overflow-hidden">
          {/* Panel Header */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <svg
                className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              <span className="font-medium text-gray-800">Toán lớp 3</span>
            </div>
            <span className="text-sm font-semibold text-blue-600">
              {selectedGrade3Count} / {grade3Types.length} đã chọn
            </span>
          </button>

          {/* Panel Content */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="p-4 border-t">
              {/* Render grouped sections */}
              {(['basic', 'advanced', 'word_problem', 'other', 'geometry'] as ProblemGroup[]).map((groupKey) => {
                const typesInGroup = grade3Types.filter(t => t.group === groupKey);
                if (typesInGroup.length === 0) return null;

                const selectedInGroup = typesInGroup.filter(t => enabledTypes.includes(t.id)).length;
                const groupInfo = PROBLEM_GROUP_LABELS[groupKey];

                return (
                  <div key={groupKey} className="mb-4 last:mb-0">
                    {/* Group Header */}
                    <div className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-lg mb-2">
                      <span className="font-medium text-gray-700">
                        {groupInfo.icon} {groupInfo.label}
                      </span>
                      <span className="text-sm text-gray-500">
                        {selectedInGroup}/{typesInGroup.length}
                      </span>
                    </div>
                    {/* Types in this group */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {typesInGroup.map((type) => (
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
                );
              })}
            </div>
          </div>
        </div>

        {/* Problem Types - Ôn tập Expansion Panel */}
        <div className="border rounded-xl overflow-hidden">
          {/* Panel Header */}
          <button
            type="button"
            onClick={() => setIsReviewExpanded(!isReviewExpanded)}
            className="w-full flex items-center justify-between p-4 bg-purple-50 hover:bg-purple-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <svg
                className={`w-5 h-5 text-purple-600 transition-transform duration-300 ${isReviewExpanded ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              <span className="font-medium text-purple-800">Ôn tập</span>
            </div>
            <span className="text-sm font-semibold text-purple-600">
              {selectedReviewCount} / {reviewTypes.length} đã chọn
            </span>
          </button>

          {/* Panel Content */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isReviewExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3 border-t">
              {reviewTypes.map((type) => (
                <label key={type.id} className="flex items-center p-3 border rounded-lg hover:bg-purple-50 cursor-pointer">
                  <input
                    type="radio"
                    name="review-type"
                    checked={enabledTypes.includes(type.id)}
                    onChange={() => handleReviewSelect(type.id)}
                    className="mr-3 h-4 w-4 text-purple-600"
                  />
                  <div>
                    <div className="font-medium text-gray-800">{type.label}</div>
                    <div className="text-sm text-gray-500">{type.description}</div>
                  </div>
                </label>
              ))}
            </div>
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

      {/* Semester 1 Types Modal */}
      {showSemester1Modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-purple-800 mb-4">
              Ôn tập Học kỳ 1 bao gồm:
            </h2>
            <ul className="space-y-2 mb-6">
              {SEMESTER_1_TYPES.map((item, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm mr-3">
                    {index + 1}
                  </span>
                  {item.label}
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mb-4">
              Tối thiểu {MIN_SEMESTER_1_QUESTIONS} câu hỏi để đảm bảo mỗi dạng có ít nhất 1 câu.
            </p>
            <button
              onClick={() => setShowSemester1Modal(false)}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-xl"
            >
              Đã hiểu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
