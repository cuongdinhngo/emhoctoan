import React from 'react';
import { ProblemSettings, ProblemType } from '../types';

interface SettingsPanelProps {
  settings: ProblemSettings;
  onSettingsChange: (settings: ProblemSettings) => void;
  isOpen: boolean;
  onClose: () => void;
}

const PROBLEM_TYPES: { type: ProblemType; label: string; description: string }[] = [
  { type: 'addition', label: 'Phép cộng', description: 'Cộng trong phạm vi 1000' },
  { type: 'subtraction', label: 'Phép trừ', description: 'Trừ trong phạm vi 1000' },
  { type: 'multiplication_table', label: 'Bảng nhân', description: 'Nhân từ 1 đến 9' },
  { type: 'division_table', label: 'Bảng chia', description: 'Chia từ 1 đến 9' },
  { type: 'multiplication', label: 'Phép nhân', description: 'Nhân trong phạm vi 100' },
  { type: 'division', label: 'Phép chia', description: 'Chia trong phạm vi 100' },
  { type: 'two_digit_multiply', label: 'Nhân 2 chữ số', description: 'Nhân số có hai chữ số với số có một chữ số' },
  { type: 'division_with_remainder', label: 'Chia có dư', description: 'Phép chia hết, phép chia có dư' },
  { type: 'two_digit_divide', label: 'Chia 2 chữ số', description: 'Chia số có hai chữ số cho số có một chữ số' },
  { type: 'three_digit_multiply', label: 'Nhân 3 chữ số', description: 'Nhân số có ba chữ số với số có một chữ số' },
  { type: 'three_digit_divide', label: 'Chia 3 chữ số', description: 'Chia số có ba chữ số cho số có một chữ số' },
  { type: 'word_problem_more_less', label: 'Toán có lời văn: Hơn kém', description: 'Dạng toán về hơn kém số đơn vị' },
  { type: 'word_problem_multiply_divide', label: 'Toán có lời văn: Gấp/Giảm', description: 'Dạng toán về gấp số lần, giảm số lần' },
  { type: 'word_problem_unit_conversion', label: 'Toán có lời văn: Rút đơn vị', description: 'Dạng toán liên quan đến rút về đơn vị' },
  { type: 'geometry_midpoint', label: 'Hình học: Trung điểm', description: 'Điểm ở giữa - Trung điểm của đoạn thẳng' },
  { type: 'geometry_circle', label: 'Hình học: Hình tròn', description: 'Hình tròn: tâm, bán kính, đường kính' },
  { type: 'geometry_rectangle', label: 'Hình học: Hình chữ nhật', description: 'Hình chữ nhật, chu vi, diện tích' },
  { type: 'geometry_square', label: 'Hình học: Hình vuông', description: 'Hình vuông, chu vi, diện tích' }
];

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ 
  settings, 
  onSettingsChange, 
  isOpen, 
  onClose 
}) => {
  const handleTypeToggle = (type: ProblemType) => {
    const newEnabledTypes = settings.enabledTypes.includes(type)
      ? settings.enabledTypes.filter(t => t !== type)
      : [...settings.enabledTypes, type];
    
    onSettingsChange({
      ...settings,
      enabledTypes: newEnabledTypes
    });
  };

  const handleDifficultyChange = (difficulty: 'easy' | 'medium' | 'hard') => {
    onSettingsChange({
      ...settings,
      difficulty
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Cài đặt</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Loại bài tập</h3>
          <div className="space-y-2">
            {PROBLEM_TYPES.map(({ type, label, description }) => (
              <label key={type} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enabledTypes.includes(type)}
                  onChange={() => handleTypeToggle(type)}
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

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Độ khó</h3>
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
                  checked={settings.difficulty === value}
                  onChange={(e) => handleDifficultyChange(e.target.value as any)}
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

        <button
          onClick={onClose}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200"
        >
          Lưu cài đặt
        </button>
      </div>
    </div>
  );
};
