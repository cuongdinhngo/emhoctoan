import React from 'react';
import { ProblemSettings, ProblemType } from '../types';
import { PROBLEM_TYPES_CONFIG } from '../constants/problemTypes';
import { Button } from './ui/Button';
import { XIcon } from './ui/icons';

interface SettingsPanelProps {
  settings: ProblemSettings;
  onSettingsChange: (settings: ProblemSettings) => void;
  isOpen: boolean;
  onClose: () => void;
}

const PROBLEM_TYPES = PROBLEM_TYPES_CONFIG;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto overscroll-contain rounded-xl bg-surface p-6 shadow-card-hover">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-ink">Cài đặt</h2>
          <button
            onClick={onClose}
            aria-label="Đóng"
            className="flex h-touch w-touch items-center justify-center rounded-pill text-ink-muted transition-colors hover:bg-base hover:text-ink focus-visible:outline-none focus-visible:shadow-focus"
          >
            <XIcon />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="mb-3 font-display text-lg font-bold text-ink">Loại bài tập</h3>
          <div className="space-y-2">
            {PROBLEM_TYPES.map(({ type, label, description }) => (
              <label key={type} className="flex min-h-touch cursor-pointer items-center rounded-md border border-line p-3 hover:bg-base">
                <input
                  type="checkbox"
                  checked={settings.enabledTypes.includes(type)}
                  onChange={() => handleTypeToggle(type)}
                  className="mr-3 h-5 w-5 accent-primary"
                />
                <div>
                  <div className="font-semibold text-ink">{label}</div>
                  <div className="text-sm text-ink-muted">{description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="mb-3 font-display text-lg font-bold text-ink">Độ khó</h3>
          <div className="space-y-2">
            {[
              { value: 'easy', label: 'Dễ', description: 'Số nhỏ, phép tính đơn giản' },
              { value: 'medium', label: 'Trung bình', description: 'Số vừa phải' },
              { value: 'hard', label: 'Khó', description: 'Số lớn, phép tính phức tạp' }
            ].map(({ value, label, description }) => (
              <label key={value} className="flex min-h-touch cursor-pointer items-center rounded-md border border-line p-3 hover:bg-base">
                <input
                  type="radio"
                  name="difficulty"
                  value={value}
                  checked={settings.difficulty === value}
                  onChange={(e) => handleDifficultyChange(e.target.value as any)}
                  className="mr-3 h-5 w-5 accent-primary"
                />
                <div>
                  <div className="font-semibold text-ink">{label}</div>
                  <div className="text-sm text-ink-muted">{description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <Button variant="primary" fullWidth onClick={onClose}>Lưu cài đặt</Button>
      </div>
    </div>
  );
};
