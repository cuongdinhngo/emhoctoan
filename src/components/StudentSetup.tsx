import React, { useState, useEffect } from 'react';
import { ProblemSettings } from '../types';
import { PROBLEM_TYPES_CONFIG, PROBLEM_GROUP_LABELS, ProblemGroup } from '../constants/problemTypes';
import { GRADE4_PROBLEM_TYPES_CONFIG, GRADE4_PROBLEM_GROUP_LABELS, Grade4ProblemGroup } from '../constants/grade4ProblemTypes';
import { GRADE5_PROBLEM_TYPES_CONFIG, GRADE5_PROBLEM_GROUP_LABELS, Grade5ProblemGroup } from '../constants/grade5ProblemTypes';
import { Grade, getGradeConfig } from '../constants/grades';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ChevronDownIcon } from './ui/icons';
import { cx } from './ui/cx';

// Types included in Semester 1 Review (Grade 3)
type SemesterTypeItem = {
  label: string;
  type: string;
  group?: 'number_ops' | 'measurement' | 'geometry' | 'word_problem';
};

const SEMESTER_1_TYPES: SemesterTypeItem[] = [
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

const SEMESTER_2_TYPES: SemesterTypeItem[] = [
  { label: 'Phép cộng', type: 'addition', group: 'number_ops' },
  { label: 'Phép trừ', type: 'subtraction', group: 'number_ops' },
  { label: 'Nhân 2 chữ số', type: 'two_digit_multiply', group: 'number_ops' },
  { label: 'Chia 2 chữ số', type: 'two_digit_divide', group: 'number_ops' },
  { label: 'Nhân 3 chữ số', type: 'three_digit_multiply', group: 'number_ops' },
  { label: 'Chia 3 chữ số', type: 'three_digit_divide', group: 'number_ops' },
  { label: 'Chia có dư', type: 'division_with_remainder', group: 'number_ops' },
  { label: 'Đặt tính rồi tính', type: 'review_written_calculation', group: 'number_ops' },
  { label: 'Biểu thức có ngoặc', type: 'review_expression', group: 'number_ops' },
  { label: 'Làm tròn số', type: 'review_rounding', group: 'number_ops' },
  { label: 'Số La Mã', type: 'review_roman_numerals', group: 'number_ops' },
  { label: 'Giá trị chữ số / Số liền trước sau', type: 'review_digit_value', group: 'number_ops' },

  { label: 'Đổi đơn vị', type: 'review_unit_conversion', group: 'measurement' },
  { label: 'Tính ngày tháng', type: 'review_date_calculation', group: 'measurement' },
  { label: 'Toán tiền Việt Nam', type: 'review_money', group: 'measurement' },
  { label: 'Tháng có 30/31 ngày', type: 'review_month_days', group: 'measurement' },

  { label: 'Khối lập phương', type: 'review_cube_properties', group: 'geometry' },
  { label: 'Trung điểm', type: 'geometry_midpoint', group: 'geometry' },
  { label: 'Hình chữ nhật', type: 'geometry_rectangle', group: 'geometry' },
  { label: 'Hình vuông', type: 'geometry_square', group: 'geometry' },
  { label: 'Hình tròn', type: 'geometry_circle', group: 'geometry' },

  { label: 'Toán có lời văn: Hơn kém', type: 'word_problem_more_less', group: 'word_problem' },
  { label: 'Toán có lời văn: Gấp/Giảm', type: 'word_problem_multiply_divide', group: 'word_problem' },
  { label: 'Toán có lời văn: Rút đơn vị', type: 'word_problem_unit_conversion', group: 'word_problem' },
  { label: 'Toán có lời văn: Chia có dư', type: 'word_problem_division_remainder', group: 'word_problem' }
];
const MIN_SEMESTER_2_QUESTIONS = SEMESTER_2_TYPES.length;

const SEMESTER_2_GROUP_LABELS: Record<NonNullable<SemesterTypeItem['group']>, string> = {
  number_ops: 'Số và phép tính',
  measurement: 'Đại lượng và đo đại lượng',
  geometry: 'Hình học và đo lường',
  word_problem: 'Toán có lời văn'
};

interface StudentSetupProps {
  onStart: (settings: ProblemSettings) => void;
  initialSettings?: ProblemSettings;
  grade?: Grade;
}

// Per-grade panel identity, all from tokens (Color Consistency: tints only).
type PanelTheme = {
  headerBg: string;
  headerText: string;
  chevron: string;
  count: string;
  groupBg: string;
  groupText: string;
  groupCount: string;
  itemHover: string;
  accent: string; // checkbox/radio accent-color utility
};

const PANEL_THEMES: Record<'primary' | 'violet' | 'teal' | 'secondary', PanelTheme> = {
  primary: {
    headerBg: 'bg-primary-soft hover:bg-primary-soft/70', headerText: 'text-ink', chevron: 'text-primary',
    count: 'text-primary-strong', groupBg: 'bg-base', groupText: 'text-ink', groupCount: 'text-ink-muted',
    itemHover: 'hover:bg-primary-soft', accent: 'accent-primary',
  },
  violet: {
    headerBg: 'bg-violet-soft hover:bg-violet-soft/70', headerText: 'text-violet-ink', chevron: 'text-violet',
    count: 'text-violet-ink', groupBg: 'bg-violet-soft', groupText: 'text-violet-ink', groupCount: 'text-violet-ink',
    itemHover: 'hover:bg-violet-soft', accent: 'accent-violet',
  },
  teal: {
    headerBg: 'bg-teal-soft hover:bg-teal-soft/70', headerText: 'text-teal-ink', chevron: 'text-teal',
    count: 'text-teal-ink', groupBg: 'bg-teal-soft', groupText: 'text-teal-ink', groupCount: 'text-teal-ink',
    itemHover: 'hover:bg-teal-soft', accent: 'accent-teal',
  },
  secondary: {
    headerBg: 'bg-secondary-soft hover:bg-secondary-soft/70', headerText: 'text-secondary-strong', chevron: 'text-secondary',
    count: 'text-secondary-strong', groupBg: 'bg-secondary-soft', groupText: 'text-secondary-strong', groupCount: 'text-secondary-strong',
    itemHover: 'hover:bg-secondary-soft', accent: 'accent-secondary',
  },
};

export const StudentSetup: React.FC<StudentSetupProps> = ({ onStart, initialSettings, grade = 'grade3' }) => {
  const [studentName, setStudentName] = useState(initialSettings?.studentName || '');
  const [questionQuantity, setQuestionQuantity] = useState(initialSettings?.questionQuantity || 25);
  const [enabledTypes, setEnabledTypes] = useState<Array<string>>(
    initialSettings?.enabledTypes || ['addition', 'subtraction', 'multiplication_table', 'division_table']
  );
  const [difficulty, setDifficulty] = useState(initialSettings?.difficulty || 'medium');
  const [isExpanded, setIsExpanded] = useState(true);
  const [isReviewExpanded, setIsReviewExpanded] = useState(true);
  const [reviewModalType, setReviewModalType] = useState<'semester1' | 'semester2' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const gradeConfig = getGradeConfig(grade);
  const gradeLabel = gradeConfig?.label || 'Toán Lớp 3';

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

  // Check if review modes are selected
  const isSemester1Selected = enabledTypes.includes('review_semester_1');
  const isSemester2Selected = enabledTypes.includes('review_semester_2');

  // Standard question quantities
  const standardQuantities = [10, 15, 20, 25, 30, 50];

  // Filter available quantities based on selection
  const minimumQuestionCount = isSemester1Selected
    ? MIN_SEMESTER_1_QUESTIONS
    : isSemester2Selected
      ? MIN_SEMESTER_2_QUESTIONS
      : 0;

  const availableQuantities = minimumQuestionCount > 0
    ? standardQuantities.filter(q => q >= minimumQuestionCount)
    : standardQuantities;

  // Auto-adjust question quantity if selected review mode requires higher minimum
  useEffect(() => {
    if (minimumQuestionCount > 0 && questionQuantity < minimumQuestionCount) {
      setQuestionQuantity(availableQuantities[0]);
    }
  }, [minimumQuestionCount, questionQuantity, availableQuantities]);

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
      setReviewModalType('semester1');
    }
    if (typeId === 'review_semester_2') {
      setReviewModalType('semester2');
    }
  };

  const handleStart = () => {
    if (!studentName.trim()) {
      setError('Vui lòng nhập tên học sinh để bắt đầu.');
      document.getElementById('student-name')?.focus();
      return;
    }
    if (enabledTypes.length === 0) {
      setError('Vui lòng chọn ít nhất một loại bài tập.');
      return;
    }
    setError(null);
    onStart({
      studentName: studentName.trim(),
      questionQuantity,
      enabledTypes: enabledTypes as any,
      difficulty: difficulty as any,
      grade
    });
  };

  // Reusable type checkbox row
  const TypeCheckbox = ({ id, label, description, theme }: { id: string; label: string; description: string; theme: PanelTheme }) => (
    <label className={cx('flex min-h-touch cursor-pointer items-center rounded-md border border-line p-3', theme.itemHover)}>
      <input
        type="checkbox"
        checked={enabledTypes.includes(id)}
        onChange={() => handleTypeToggle(id)}
        className={cx('mr-3 h-5 w-5', theme.accent)}
      />
      <div>
        <div className="font-semibold text-ink">{label}</div>
        <div className="text-sm text-ink-muted">{description}</div>
      </div>
    </label>
  );

  // Reusable expansion panel header
  const PanelHeader = ({ title, count, total, expanded, onToggle, theme }: {
    title: string; count: number; total: number; expanded: boolean; onToggle: () => void; theme: PanelTheme;
  }) => (
    <button
      type="button"
      onClick={onToggle}
      className={cx('flex min-h-touch w-full items-center justify-between p-4 transition-colors', theme.headerBg)}
    >
      <div className="flex items-center gap-2">
        <ChevronDownIcon size={20} className={cx('transition-transform duration-300', theme.chevron, expanded ? 'rotate-180' : '')} />
        <span className={cx('font-display font-bold', theme.headerText)}>{title}</span>
      </div>
      <span className={cx('text-sm font-semibold tabular-nums', theme.count)}>{count} / {total} đã chọn</span>
    </button>
  );

  // Render Grade 3 problem types panel
  const renderGrade3Panel = () => {
    const t = PANEL_THEMES.primary;
    const r = PANEL_THEMES.violet;
    return (
      <>
        <div className="overflow-hidden rounded-lg border border-line">
          <PanelHeader title="Toán lớp 3" count={selectedGrade3Count} total={grade3Types.length} expanded={isExpanded} onToggle={() => setIsExpanded(!isExpanded)} theme={t} />
          <div className={cx('overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out', isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0')}>
            <div className="border-t border-line p-4">
              {(['basic', 'advanced', 'word_problem', 'other', 'geometry'] as ProblemGroup[]).map((groupKey) => {
                const typesInGroup = grade3Types.filter(t => t.group === groupKey);
                if (typesInGroup.length === 0) return null;
                const selectedInGroup = typesInGroup.filter(t => enabledTypes.includes(t.id)).length;
                const groupInfo = PROBLEM_GROUP_LABELS[groupKey];
                return (
                  <div key={groupKey} className="mb-4 last:mb-0">
                    <div className={cx('mb-2 flex items-center justify-between rounded-md px-3 py-2', t.groupBg)}>
                      <span className={cx('font-semibold', t.groupText)}>{groupInfo.icon} {groupInfo.label}</span>
                      <span className={cx('text-sm tabular-nums', t.groupCount)}>{selectedInGroup}/{typesInGroup.length}</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                      {typesInGroup.map((type) => (
                        <TypeCheckbox key={type.id} id={type.id} label={type.label} description={type.description} theme={t} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-line">
          <PanelHeader title="Ôn tập" count={selectedReviewCount} total={reviewTypes.length} expanded={isReviewExpanded} onToggle={() => setIsReviewExpanded(!isReviewExpanded)} theme={r} />
          <div className={cx('overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out', isReviewExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0')}>
            <div className="grid grid-cols-1 gap-3 border-t border-line p-4 md:grid-cols-2">
              {reviewTypes.map((type) => (
                <label key={type.id} className={cx('flex min-h-touch cursor-pointer items-center rounded-md border border-line p-3', r.itemHover)}>
                  <input
                    type="radio"
                    name="review-type"
                    checked={enabledTypes.includes(type.id)}
                    onChange={() => handleReviewSelect(type.id)}
                    className={cx('mr-3 h-5 w-5', r.accent)}
                  />
                  <div>
                    <div className="font-semibold text-ink">{type.label}</div>
                    <div className="text-sm text-ink-muted">{type.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  };

  // Render Grade 4 problem types panel
  const renderGrade4Panel = () => {
    const t = PANEL_THEMES.teal;
    return (
      <div className="overflow-hidden rounded-lg border border-line">
        <PanelHeader title="Toán lớp 4" count={selectedGrade4Count} total={grade4Types.length} expanded={isExpanded} onToggle={() => setIsExpanded(!isExpanded)} theme={t} />
        <div className={cx('overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out', isExpanded ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0')}>
          <div className="border-t border-line p-4">
            {(['large_numbers', 'divisibility', 'fractions', 'geometry', 'word_problems', 'measurement'] as Grade4ProblemGroup[]).map((groupKey) => {
              const typesInGroup = grade4Types.filter(t => t.group === groupKey);
              if (typesInGroup.length === 0) return null;
              const selectedInGroup = typesInGroup.filter(t => enabledTypes.includes(t.id)).length;
              const groupInfo = GRADE4_PROBLEM_GROUP_LABELS[groupKey];
              return (
                <div key={groupKey} className="mb-4 last:mb-0">
                  <div className={cx('mb-2 flex items-center justify-between rounded-md px-3 py-2', t.groupBg)}>
                    <span className={cx('font-semibold', t.groupText)}>{groupInfo.icon} {groupInfo.label}</span>
                    <span className={cx('text-sm tabular-nums', t.groupCount)}>{selectedInGroup}/{typesInGroup.length}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    {typesInGroup.map((type) => (
                      <TypeCheckbox key={type.id} id={type.id} label={type.label} description={type.description} theme={t} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Render Grade 5 problem types panel
  const renderGrade5Panel = () => {
    const t = PANEL_THEMES.secondary;
    return (
      <div className="overflow-hidden rounded-lg border border-line">
        <PanelHeader title="Toán lớp 5" count={selectedGrade5Count} total={grade5Types.length} expanded={isExpanded} onToggle={() => setIsExpanded(!isExpanded)} theme={t} />
        <div className={cx('overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out', isExpanded ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0')}>
          <div className="border-t border-line p-4">
            {(['decimals', 'percentages', 'geometry', 'speed', 'word_problems', 'mixed'] as Grade5ProblemGroup[]).map((groupKey) => {
              const typesInGroup = grade5Types.filter(t => t.group === groupKey);
              if (typesInGroup.length === 0) return null;
              const selectedInGroup = typesInGroup.filter(t => enabledTypes.includes(t.id)).length;
              const groupInfo = GRADE5_PROBLEM_GROUP_LABELS[groupKey];
              return (
                <div key={groupKey} className="mb-4 last:mb-0">
                  <div className={cx('mb-2 flex items-center justify-between rounded-md px-3 py-2', t.groupBg)}>
                    <span className={cx('font-semibold', t.groupText)}>{groupInfo.icon} {groupInfo.label}</span>
                    <span className={cx('text-sm tabular-nums', t.groupCount)}>{selectedInGroup}/{typesInGroup.length}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    {typesInGroup.map((type) => (
                      <TypeCheckbox key={type.id} id={type.id} label={type.label} description={type.description} theme={t} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="mb-2 font-display text-3xl font-bold text-ink">Thiết lập bài kiểm tra</h1>
        <p className="text-ink-muted">{gradeLabel}</p>
      </div>

      <div className="space-y-6">
        {/* Student Name */}
        <div>
          <label htmlFor="student-name" className="mb-2 block text-sm font-semibold text-ink">
            Tên học sinh *
          </label>
          <input
            id="student-name"
            name="student-name"
            type="text"
            autoComplete="given-name"
            value={studentName}
            onChange={(e) => { setStudentName(e.target.value); if (error) setError(null); }}
            placeholder="Nhập tên của con…"
            aria-invalid={!!error && !studentName.trim()}
            className="min-h-touch w-full rounded-md border-2 border-line bg-surface px-4 py-3 text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none"
          />
        </div>

        {/* Question Quantity */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-ink">
            Số câu hỏi
            {minimumQuestionCount > 0 && (
              <span className="ml-2 text-xs text-violet-ink">(Tối thiểu {minimumQuestionCount} câu)</span>
            )}
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {availableQuantities.map((quantity) => (
              <button
                key={quantity}
                onClick={() => setQuestionQuantity(quantity)}
                className={cx(
                  'min-h-touch rounded-md border-2 text-center font-display font-bold tabular-nums transition-[background-color,border-color,color] focus-visible:outline-none focus-visible:shadow-focus',
                  questionQuantity === quantity
                    ? 'border-primary bg-primary-soft text-primary-strong'
                    : 'border-line bg-surface text-ink hover:border-primary',
                )}
              >
                {quantity} câu
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
          <label className="mb-3 block text-sm font-semibold text-ink">Độ khó</label>
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
                  checked={difficulty === value}
                  onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
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

        {/* Inline validation error (no window.alert) */}
        {error && (
          <p role="alert" className="rounded-md bg-error-soft px-4 py-3 text-sm font-semibold text-error-ink">
            {error}
          </p>
        )}

        {/* Start Button */}
        <Button variant="primary" size="lg" fullWidth onClick={handleStart}>
          Bắt đầu kiểm tra
        </Button>
      </div>

      {/* Review Types Modal */}
      {reviewModalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4">
          <div className="max-h-[80vh] w-full max-w-md overflow-y-auto overscroll-contain rounded-xl bg-surface p-6 shadow-card-hover">
            <h2 className="mb-4 font-display text-xl font-bold text-violet-ink">
              {reviewModalType === 'semester1' ? 'Ôn tập Học kỳ 1 bao gồm:' : 'Ôn tập Học kỳ 2 bao gồm:'}
            </h2>
            {reviewModalType === 'semester1' ? (
              <ul className="mb-6 space-y-2">
                {SEMESTER_1_TYPES.map((item, index) => (
                  <li key={index} className="flex items-center text-ink">
                    <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-pill bg-violet-soft text-sm text-violet-ink tabular-nums">
                      {index + 1}
                    </span>
                    {item.label}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mb-6 space-y-4">
                {(['number_ops', 'measurement', 'geometry', 'word_problem'] as const).map((groupKey) => {
                  const groupItems = SEMESTER_2_TYPES.filter(item => item.group === groupKey);
                  if (groupItems.length === 0) return null;
                  return (
                    <div key={groupKey}>
                      <h3 className="mb-2 font-semibold text-violet-ink">{SEMESTER_2_GROUP_LABELS[groupKey]}</h3>
                      <ul className="space-y-2">
                        {groupItems.map((item) => {
                          const globalIndex = SEMESTER_2_TYPES.findIndex(t => t.type === item.type) + 1;
                          return (
                            <li key={item.type} className="flex items-center text-ink">
                              <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-pill bg-violet-soft text-sm text-violet-ink tabular-nums">
                                {globalIndex}
                              </span>
                              {item.label}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            )}
            <p className="mb-4 text-sm text-ink-muted">
              Tối thiểu {reviewModalType === 'semester1' ? MIN_SEMESTER_1_QUESTIONS : MIN_SEMESTER_2_QUESTIONS} câu hỏi để đảm bảo mỗi dạng có ít nhất 1 câu.
            </p>
            <Button variant="primary" fullWidth onClick={() => setReviewModalType(null)}>
              Đã hiểu
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};
