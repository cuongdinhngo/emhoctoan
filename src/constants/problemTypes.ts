import { ProblemType, Grade3ProblemType } from '../types';
import { GRADE4_PROBLEM_TYPE_LABELS } from './grade4ProblemTypes';
import { GRADE5_PROBLEM_TYPE_LABELS } from './grade5ProblemTypes';

/**
 * Map of Grade 3 problem types to their Vietnamese labels
 */
export const GRADE3_PROBLEM_TYPE_LABELS: Record<Grade3ProblemType, string> = {
  'addition': 'Phép cộng',
  'subtraction': 'Phép trừ',
  'multiplication': 'Phép nhân',
  'division': 'Phép chia',
  'multiplication_table': 'Bảng nhân',
  'division_table': 'Bảng chia',
  'two_digit_multiply': 'Nhân 2 chữ số',
  'division_with_remainder': 'Chia có dư',
  'two_digit_divide': 'Chia 2 chữ số',
  'three_digit_multiply': 'Nhân 3 chữ số',
  'three_digit_divide': 'Chia 3 chữ số',
  'word_problem_more_less': 'Toán có lời văn: Hơn kém',
  'word_problem_multiply_divide': 'Toán có lời văn: Gấp/Giảm',
  'word_problem_unit_conversion': 'Toán có lời văn: Rút đơn vị',
  'word_problem_division_remainder': 'Toán có lời văn: Chia có dư',
  'geometry_midpoint': 'Hình học: Trung điểm',
  'geometry_circle': 'Hình học: Hình tròn',
  'geometry_rectangle': 'Hình học: Hình chữ nhật',
  'geometry_square': 'Hình học: Hình vuông',
  'review_clock_reading': 'Xem đồng hồ',
  'review_fraction_of_number': 'Tìm 1/n của số',
  'review_written_calculation': 'Đặt tính rồi tính',
  'review_broken_line': 'Đường gấp khúc',
  'review_chain_calculation': 'Điền số vào ô trống',
  'review_fill_blank': 'Tìm số còn thiếu',
  'review_rounding': 'Làm tròn số',
  'review_date_calculation': 'Tính ngày tháng',
  'review_money': 'Toán tiền Việt Nam',
  'review_digit_value': 'Giá trị chữ số',
  'review_month_days': 'Tháng có 30/31 ngày',
  'review_roman_numerals': 'Số La Mã',
  'review_cube_properties': 'Khối lập phương',
  'review_expression': 'Biểu thức có ngoặc',
  'review_unit_conversion': 'Đổi đơn vị',
  'review_semester_1': 'Ôn tập: Học kỳ 1',
  'review_semester_2': 'Ôn tập: Học kỳ 2',
  'visual_fraction': 'Nhận biết phân số',
  'true_false_multiply_divide': 'Đúng/Sai: Gấp/Giảm',
  'unit_calculation': 'Tính có đơn vị'
};

/**
 * Combined map of all problem types to their Vietnamese labels
 */
export const PROBLEM_TYPE_LABELS: Record<ProblemType, string> = {
  ...GRADE3_PROBLEM_TYPE_LABELS,
  ...GRADE4_PROBLEM_TYPE_LABELS,
  ...GRADE5_PROBLEM_TYPE_LABELS
};

/**
 * Problem group type for categorizing problem types
 */
export type ProblemGroup = 'basic' | 'advanced' | 'word_problem' | 'geometry' | 'other';

/**
 * Array of problem types with labels and descriptions for UI components
 */
export const PROBLEM_TYPES_CONFIG: Array<{
  type: ProblemType;
  label: string;
  description: string;
  id: string; // For backward compatibility with StudentSetup
  category?: 'grade3' | 'review'; // Category for expansion panels (grade3 vs review mode)
  group?: ProblemGroup; // Group for sub-sections within grade3 panel
}> = [
  // Basic Arithmetic (6 types)
  {
    type: 'addition',
    id: 'addition',
    label: 'Phép cộng',
    description: 'Cộng trong phạm vi 1000',
    group: 'basic'
  },
  {
    type: 'subtraction',
    id: 'subtraction',
    label: 'Phép trừ',
    description: 'Trừ trong phạm vi 1000',
    group: 'basic'
  },
  {
    type: 'multiplication_table',
    id: 'multiplication_table',
    label: 'Bảng nhân',
    description: 'Nhân từ 1 đến 9',
    group: 'basic'
  },
  {
    type: 'division_table',
    id: 'division_table',
    label: 'Bảng chia',
    description: 'Chia từ 1 đến 9',
    group: 'basic'
  },
  {
    type: 'multiplication',
    id: 'multiplication',
    label: 'Phép nhân',
    description: 'Nhân trong phạm vi 100',
    group: 'basic'
  },
  {
    type: 'division',
    id: 'division',
    label: 'Phép chia',
    description: 'Chia trong phạm vi 100',
    group: 'basic'
  },
  // Advanced Arithmetic (5 types)
  {
    type: 'two_digit_multiply',
    id: 'two_digit_multiply',
    label: 'Nhân 2 chữ số',
    description: 'Nhân số có hai chữ số với số có một chữ số',
    group: 'advanced'
  },
  {
    type: 'two_digit_divide',
    id: 'two_digit_divide',
    label: 'Chia 2 chữ số',
    description: 'Chia số có hai chữ số cho số có một chữ số',
    group: 'advanced'
  },
  {
    type: 'three_digit_multiply',
    id: 'three_digit_multiply',
    label: 'Nhân 3 chữ số',
    description: 'Nhân số có ba chữ số với số có một chữ số',
    group: 'advanced'
  },
  {
    type: 'three_digit_divide',
    id: 'three_digit_divide',
    label: 'Chia 3 chữ số',
    description: 'Chia số có ba chữ số cho số có một chữ số',
    group: 'advanced'
  },
  {
    type: 'division_with_remainder',
    id: 'division_with_remainder',
    label: 'Chia có dư',
    description: 'Phép chia hết, phép chia có dư',
    group: 'advanced'
  },
  // Word Problems (4 types)
  {
    type: 'word_problem_more_less',
    id: 'word_problem_more_less',
    label: 'Hơn kém',
    description: 'Dạng toán về hơn kém số đơn vị',
    group: 'word_problem'
  },
  {
    type: 'word_problem_multiply_divide',
    id: 'word_problem_multiply_divide',
    label: 'Gấp/Giảm',
    description: 'Dạng toán về gấp số lần, giảm số lần',
    group: 'word_problem'
  },
  {
    type: 'word_problem_unit_conversion',
    id: 'word_problem_unit_conversion',
    label: 'Rút đơn vị',
    description: 'Dạng toán liên quan đến rút về đơn vị',
    group: 'word_problem'
  },
  {
    type: 'word_problem_division_remainder',
    id: 'word_problem_division_remainder',
    label: 'Chia có dư',
    description: 'Bài toán tìm số lượng nhiều nhất',
    group: 'word_problem'
  },
  // Geometry (4 types)
  {
    type: 'geometry_midpoint',
    id: 'geometry_midpoint',
    label: 'Trung điểm',
    description: 'Điểm ở giữa - Trung điểm của đoạn thẳng',
    group: 'geometry'
  },
  {
    type: 'geometry_circle',
    id: 'geometry_circle',
    label: 'Hình tròn',
    description: 'Hình tròn: tâm, bán kính, đường kính',
    group: 'geometry'
  },
  {
    type: 'geometry_rectangle',
    id: 'geometry_rectangle',
    label: 'Hình chữ nhật',
    description: 'Hình chữ nhật, chu vi, diện tích',
    group: 'geometry'
  },
  {
    type: 'geometry_square',
    id: 'geometry_square',
    label: 'Hình vuông',
    description: 'Hình vuông, chu vi, diện tích',
    group: 'geometry'
  },
  // Review Topics (6 types)
  {
    type: 'review_clock_reading',
    id: 'review_clock_reading',
    label: 'Xem đồng hồ',
    description: 'Đọc giờ trên đồng hồ kim',
    group: 'other'
  },
  {
    type: 'review_fraction_of_number',
    id: 'review_fraction_of_number',
    label: 'Tìm 1/n của số',
    description: 'Tìm 1/2, 1/3, 1/4, 1/5 của một số',
    group: 'other'
  },
  {
    type: 'review_written_calculation',
    id: 'review_written_calculation',
    label: 'Đặt tính rồi tính',
    description: 'Phép tính nhiều chữ số',
    group: 'other'
  },
  {
    type: 'review_broken_line',
    id: 'review_broken_line',
    label: 'Đường gấp khúc',
    description: 'Tính tổng độ dài các đoạn thẳng',
    group: 'other'
  },
  {
    type: 'review_chain_calculation',
    id: 'review_chain_calculation',
    label: 'Điền số vào ô trống',
    description: 'Gấp/Giảm số lần theo dãy',
    group: 'other'
  },
  {
    type: 'review_fill_blank',
    id: 'review_fill_blank',
    label: 'Tìm số còn thiếu',
    description: 'Tìm ẩn số trong phép tính: ? × 6 = 48',
    group: 'other'
  },
  {
    type: 'visual_fraction',
    id: 'visual_fraction',
    label: 'Nhận biết phân số',
    description: 'Hình nào khoanh 1/n số chấm tròn?',
    group: 'other'
  },
  {
    type: 'true_false_multiply_divide',
    id: 'true_false_multiply_divide',
    label: 'Đúng/Sai: Gấp/Giảm',
    description: 'Đúng ghi Đ, sai ghi S cho phép gấp/giảm',
    group: 'other'
  },
  {
    type: 'unit_calculation',
    id: 'unit_calculation',
    label: 'Tính có đơn vị',
    description: 'Phép tính với đơn vị: g, kg, m, cm...',
    group: 'other'
  },
  // Review Mode (1 collection - not a problem type)
  {
    type: 'review_semester_1',
    id: 'review_semester_1',
    label: 'Ôn tập Học kỳ 1',
    description: 'Tổng hợp các dạng bài tập',
    category: 'review'
  },
  {
    type: 'review_semester_2',
    id: 'review_semester_2',
    label: 'Ôn tập Học kỳ 2',
    description: 'Tổng hợp các dạng bài tập HKII',
    category: 'review'
  }
];

/**
 * Group labels with icons for UI display
 */
export const PROBLEM_GROUP_LABELS: Record<ProblemGroup, { label: string; icon: string }> = {
  basic: { label: 'Phép tính cơ bản', icon: '🔢' },
  advanced: { label: 'Phép tính nâng cao', icon: '📊' },
  word_problem: { label: 'Toán có lời văn', icon: '📝' },
  geometry: { label: 'Hình học', icon: '📐' },
  other: { label: 'Các dạng bài khác', icon: '📋' }
};

