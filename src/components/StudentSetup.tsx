import React, { useState, useEffect } from 'react';
import { ProblemSettings } from '../types';
import { PROBLEM_TYPES_CONFIG, PROBLEM_GROUP_LABELS, ProblemGroup } from '../constants/problemTypes';
import { GRADE4_PROBLEM_TYPES_CONFIG, GRADE4_PROBLEM_GROUP_LABELS, Grade4ProblemGroup } from '../constants/grade4ProblemTypes';
import { GRADE5_PROBLEM_TYPES_CONFIG, GRADE5_PROBLEM_GROUP_LABELS, Grade5ProblemGroup } from '../constants/grade5ProblemTypes';
import { Grade, getGradeConfig } from '../constants/grades';

// Types included in Semester 1 Review (Grade 3)
const SEMESTER_1_TYPES = [
  { label: 'Nhan 2 chu so', type: 'two_digit_multiply' },
  { label: 'Chia 2 chu so', type: 'two_digit_divide' },
  { label: 'Nhan 3 chu so', type: 'three_digit_multiply' },
  { label: 'Chia 3 chu so', type: 'three_digit_divide' },
  { label: 'Chia co du', type: 'division_with_remainder' },
  { label: 'Toan co loi van: Hon kem', type: 'word_problem_more_less' },
  { label: 'Toan co loi van: Gap/Giam', type: 'word_problem_multiply_divide' },
  { label: 'Toan co loi van: Chia co du', type: 'word_problem_division_remainder' },
  { label: 'Hinh hoc: Hinh tron', type: 'geometry_circle' },
  { label: 'Xem dong ho', type: 'review_clock_reading' },
  { label: 'Tim 1/n cua so', type: 'review_fraction_of_number' },
  { label: 'Dat tinh roi tinh', type: 'review_written_calculation' },
  { label: 'Duong gap khuc', type: 'review_broken_line' },
  { label: 'Dien so vao o trong', type: 'review_chain_calculation' },
  { label: 'Tim so con thieu', type: 'review_fill_blank' },
  { label: 'Nhan biet phan so', type: 'visual_fraction' },
  { label: 'Dung/Sai: Gap/Giam', type: 'true_false_multiply_divide' },
  { label: 'Tinh co don vi', type: 'unit_calculation' }
];
const MIN_SEMESTER_1_QUESTIONS = SEMESTER_1_TYPES.length; // 18

interface StudentSetupProps {
  onStart: (settings: ProblemSettings) => void;
  initialSettings?: ProblemSettings;
  grade?: Grade;
}

export const StudentSetup: React.FC<StudentSetupProps> = ({ onStart, initialSettings, grade = 'grade3' }) => {
  const [studentName, setStudentName] = useState(initialSettings?.studentName || '');
  const [questionQuantity, setQuestionQuantity] = useState(initialSettings?.questionQuantity || 25);
  const [enabledTypes, setEnabledTypes] = useState<Array<string>>(
    initialSettings?.enabledTypes || ['addition', 'subtraction', 'multiplication_table', 'division_table']
  );
  const [difficulty, setDifficulty] = useState(initialSettings?.difficulty || 'medium');
  const [isExpanded, setIsExpanded] = useState(true);
  const [isReviewExpanded, setIsReviewExpanded] = useState(true);
  const [showSemester1Modal, setShowSemester1Modal] = useState(false);

  const gradeConfig = getGradeConfig(grade);
  const gradeLabel = gradeConfig?.label || 'Toan Lop 3';

  // Filter problem types by grade
  const grade3Types = PROBLEM_TYPES_CONFIG.filter(t => !t.category || t.category === 'grade3');
  const reviewTypes = PROBLEM_TYPES_CONFIG.filter(t => t.category === 'review');
  const grade4Types = GRADE4_PROBLEM_TYPES_CONFIG;
  const grade5Types = GRADE5_PROBLEM_TYPES_CONFIG;

  // Count selected types per category
  const selectedGrade3Count = grade3Types.filter(t => enabledTypes.includes(t.id)).length;
  const selectedReviewCount = reviewTypes.filter(t => enabledTypes.includes(t.id)).length;
  const selectedGrade4Count = grade4Types.filter(t => enabledTypes.includes(t.id)).length;
  const selectedGrade5Count = grade5Types.filter(t => enabledTypes.includes(t.id)).length;

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

  // Handle grade type toggle
  const handleTypeToggle = (typeId: string) => {
    setEnabledTypes(prev => {
      // Remove any review types when selecting grade types (grade3 only)
      const withoutReview = grade === 'grade3'
        ? prev.filter(t => !reviewTypes.some(r => r.id === t))
        : prev;

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
    setIsExpanded(false); // Collapse grade panel
    if (typeId === 'review_semester_1') {
      setShowSemester1Modal(true);
    }
  };

  const handleStart = () => {
    if (!studentName.trim()) {
      alert('Vui long nhap ten hoc sinh!');
      return;
    }

    if (enabledTypes.length === 0) {
      alert('Vui long chon it nhat mot loai bai tap!');
      return;
    }

    onStart({
      studentName: studentName.trim(),
      questionQuantity,
      enabledTypes: enabledTypes as any,
      difficulty: difficulty as any,
      grade
    });
  };

  // Render Grade 3 problem types panel
  const renderGrade3Panel = () => (
    <>
      {/* Problem Types - Toan lop 3 Expansion Panel */}
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
            <span className="font-medium text-gray-800">Toan lop 3</span>
          </div>
          <span className="text-sm font-semibold text-blue-600">
            {selectedGrade3Count} / {grade3Types.length} da chon
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

      {/* Problem Types - On tap Expansion Panel */}
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
            <span className="font-medium text-purple-800">On tap</span>
          </div>
          <span className="text-sm font-semibold text-purple-600">
            {selectedReviewCount} / {reviewTypes.length} da chon
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
    </>
  );

  // Render Grade 4 problem types panel
  const renderGrade4Panel = () => (
    <div className="border rounded-xl overflow-hidden">
      {/* Panel Header */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <svg
            className={`w-5 h-5 text-green-600 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          <span className="font-medium text-green-800">Toan lop 4</span>
        </div>
        <span className="text-sm font-semibold text-green-600">
          {selectedGrade4Count} / {grade4Types.length} da chon
        </span>
      </button>

      {/* Panel Content */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 border-t">
          {/* Render grouped sections */}
          {(['large_numbers', 'divisibility', 'fractions', 'geometry', 'word_problems', 'measurement'] as Grade4ProblemGroup[]).map((groupKey) => {
            const typesInGroup = grade4Types.filter(t => t.group === groupKey);
            if (typesInGroup.length === 0) return null;

            const selectedInGroup = typesInGroup.filter(t => enabledTypes.includes(t.id)).length;
            const groupInfo = GRADE4_PROBLEM_GROUP_LABELS[groupKey];

            return (
              <div key={groupKey} className="mb-4 last:mb-0">
                {/* Group Header */}
                <div className="flex items-center justify-between bg-green-100 px-3 py-2 rounded-lg mb-2">
                  <span className="font-medium text-green-700">
                    {groupInfo.icon} {groupInfo.label}
                  </span>
                  <span className="text-sm text-green-600">
                    {selectedInGroup}/{typesInGroup.length}
                  </span>
                </div>
                {/* Types in this group */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {typesInGroup.map((type) => (
                    <label key={type.id} className="flex items-center p-3 border rounded-lg hover:bg-green-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={enabledTypes.includes(type.id)}
                        onChange={() => handleTypeToggle(type.id)}
                        className="mr-3 h-4 w-4 text-green-600"
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
  );

  // Render Grade 5 problem types panel
  const renderGrade5Panel = () => (
    <div className="border rounded-xl overflow-hidden">
      {/* Panel Header */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-orange-50 hover:bg-orange-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <svg
            className={`w-5 h-5 text-orange-600 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          <span className="font-medium text-orange-800">Toan lop 5</span>
        </div>
        <span className="text-sm font-semibold text-orange-600">
          {selectedGrade5Count} / {grade5Types.length} da chon
        </span>
      </button>

      {/* Panel Content */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 border-t">
          {/* Render grouped sections */}
          {(['decimals', 'percentages', 'geometry', 'speed', 'word_problems', 'mixed'] as Grade5ProblemGroup[]).map((groupKey) => {
            const typesInGroup = grade5Types.filter(t => t.group === groupKey);
            if (typesInGroup.length === 0) return null;

            const selectedInGroup = typesInGroup.filter(t => enabledTypes.includes(t.id)).length;
            const groupInfo = GRADE5_PROBLEM_GROUP_LABELS[groupKey];

            return (
              <div key={groupKey} className="mb-4 last:mb-0">
                {/* Group Header */}
                <div className="flex items-center justify-between bg-orange-100 px-3 py-2 rounded-lg mb-2">
                  <span className="font-medium text-orange-700">
                    {groupInfo.icon} {groupInfo.label}
                  </span>
                  <span className="text-sm text-orange-600">
                    {selectedInGroup}/{typesInGroup.length}
                  </span>
                </div>
                {/* Types in this group */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {typesInGroup.map((type) => (
                    <label key={type.id} className="flex items-center p-3 border rounded-lg hover:bg-orange-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={enabledTypes.includes(type.id)}
                        onChange={() => handleTypeToggle(type.id)}
                        className="mr-3 h-4 w-4 text-orange-600"
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
  );

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Thiet lap bai kiem tra</h1>
        <p className="text-gray-600">{gradeLabel}</p>
      </div>

      <div className="space-y-6">
        {/* Student Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ten hoc sinh *
          </label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Nhap ten cua ban..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Question Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            So cau hoi
            {isSemester1Selected && (
              <span className="text-purple-600 text-xs ml-2">
                (Toi thieu {MIN_SEMESTER_1_QUESTIONS} cau)
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
                {quantity} cau
              </button>
            ))}
          </div>
        </div>

        {/* Problem Types - render based on grade */}
        {grade === 'grade3' && renderGrade3Panel()}
        {grade === 'grade4' && renderGrade4Panel()}
        {grade === 'grade5' && renderGrade5Panel()}

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Do kho
          </label>
          <div className="space-y-2">
            {[
              { value: 'easy', label: 'De', description: 'So nho, phep tinh don gian' },
              { value: 'medium', label: 'Trung binh', description: 'So vua phai' },
              { value: 'hard', label: 'Kho', description: 'So lon, phep tinh phuc tap' }
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
          className="w-full font-bold py-4 px-6 rounded-xl text-lg transition-colors duration-200 bg-blue-500 hover:bg-blue-600 text-white"
        >
          Bat dau kiem tra
        </button>
      </div>

      {/* Semester 1 Types Modal */}
      {showSemester1Modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-purple-800 mb-4">
              On tap Hoc ky 1 bao gom:
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
              Toi thieu {MIN_SEMESTER_1_QUESTIONS} cau hoi de dam bao moi dang co it nhat 1 cau.
            </p>
            <button
              onClick={() => setShowSemester1Modal(false)}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-xl"
            >
              Da hieu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
