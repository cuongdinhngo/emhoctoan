import { Grade5ProblemType } from '../types';

/**
 * Map of Grade 5 problem types to their Vietnamese labels
 */
export const GRADE5_PROBLEM_TYPE_LABELS: Record<Grade5ProblemType, string> = {
  // Decimals
  'decimal_read_write': 'Đọc, viết số thập phân',
  'decimal_compare': 'So sánh số thập phân',
  'decimal_addition': 'Cộng số thập phân',
  'decimal_subtraction': 'Trừ số thập phân',
  'decimal_multiply': 'Nhân số thập phân',
  'decimal_divide': 'Chia số thập phân',
  // Percentages
  'percent_of_number': 'Tìm phần trăm của một số',
  'percent_find_rate': 'Tìm tỉ số phần trăm',
  'percent_find_total': 'Tìm một số biết phần trăm',
  'percent_convert': 'Đổi phân số sang phần trăm',
  // Geometry
  'circle_circumference': 'Chu vi hình tròn',
  'circle_area': 'Diện tích hình tròn',
  'rectangular_prism_volume': 'Thể tích hình hộp chữ nhật',
  'cube_volume': 'Thể tích hình lập phương',
  'composite_area': 'Diện tích hình phức hợp',
  // Speed/Distance/Time
  'speed_find_speed': 'Tìm vận tốc',
  'speed_find_distance': 'Tìm quãng đường',
  'speed_find_time': 'Tìm thời gian',
  // Word Problems
  'word_problem_percent_g5': 'Bài toán phần trăm',
  'word_problem_speed': 'Bài toán chuyển động',
  'word_problem_work': 'Bài toán về công việc',
  // Mixed Operations
  'mixed_decimal_fraction': 'Tính biểu thức hỗn hợp',
  'order_of_operations': 'Thứ tự thực hiện phép tính'
};

/**
 * Problem group type for categorizing Grade 5 problem types
 */
export type Grade5ProblemGroup = 'decimals' | 'percentages' | 'geometry' | 'speed' | 'word_problems' | 'mixed';

/**
 * Array of Grade 5 problem types with labels and descriptions for UI components
 */
export const GRADE5_PROBLEM_TYPES_CONFIG: Array<{
  type: Grade5ProblemType;
  label: string;
  description: string;
  id: string;
  group: Grade5ProblemGroup;
}> = [
  // Decimals (6 types)
  {
    type: 'decimal_read_write',
    id: 'decimal_read_write',
    label: 'Đọc, viết số thập phân',
    description: 'Đọc và viết số thập phân, xác định giá trị của chữ số',
    group: 'decimals'
  },
  {
    type: 'decimal_compare',
    id: 'decimal_compare',
    label: 'So sánh số thập phân',
    description: 'So sánh hai số thập phân',
    group: 'decimals'
  },
  {
    type: 'decimal_addition',
    id: 'decimal_addition',
    label: 'Cộng số thập phân',
    description: 'Cộng hai hoặc nhiều số thập phân',
    group: 'decimals'
  },
  {
    type: 'decimal_subtraction',
    id: 'decimal_subtraction',
    label: 'Trừ số thập phân',
    description: 'Trừ hai số thập phân',
    group: 'decimals'
  },
  {
    type: 'decimal_multiply',
    id: 'decimal_multiply',
    label: 'Nhân số thập phân',
    description: 'Nhân số thập phân với số tự nhiên hoặc số thập phân',
    group: 'decimals'
  },
  {
    type: 'decimal_divide',
    id: 'decimal_divide',
    label: 'Chia số thập phân',
    description: 'Chia số thập phân cho số tự nhiên hoặc số thập phân',
    group: 'decimals'
  },
  // Percentages (4 types)
  {
    type: 'percent_of_number',
    id: 'percent_of_number',
    label: 'Tìm phần trăm của một số',
    description: 'Tìm 15% của 200, tìm 25% của 80...',
    group: 'percentages'
  },
  {
    type: 'percent_find_rate',
    id: 'percent_find_rate',
    label: 'Tìm tỉ số phần trăm',
    description: '25 là bao nhiêu phần trăm của 100?',
    group: 'percentages'
  },
  {
    type: 'percent_find_total',
    id: 'percent_find_total',
    label: 'Tìm một số biết phần trăm',
    description: 'Biết 20% của số đó là 50. Tìm số đó.',
    group: 'percentages'
  },
  {
    type: 'percent_convert',
    id: 'percent_convert',
    label: 'Đổi phân số sang phần trăm',
    description: 'Đổi 1/4 sang phần trăm, đổi 0.75 sang phần trăm',
    group: 'percentages'
  },
  // Geometry (5 types)
  {
    type: 'circle_circumference',
    id: 'circle_circumference',
    label: 'Chu vi hình tròn',
    description: 'Tính chu vi hình tròn (C = d x 3.14 hoặc C = 2 x r x 3.14)',
    group: 'geometry'
  },
  {
    type: 'circle_area',
    id: 'circle_area',
    label: 'Diện tích hình tròn',
    description: 'Tính diện tích hình tròn (S = r x r x 3.14)',
    group: 'geometry'
  },
  {
    type: 'rectangular_prism_volume',
    id: 'rectangular_prism_volume',
    label: 'Thể tích hình hộp chữ nhật',
    description: 'Tính thể tích hình hộp chữ nhật (V = dài x rộng x cao)',
    group: 'geometry'
  },
  {
    type: 'cube_volume',
    id: 'cube_volume',
    label: 'Thể tích hình lập phương',
    description: 'Tính thể tích hình lập phương (V = a x a x a)',
    group: 'geometry'
  },
  {
    type: 'composite_area',
    id: 'composite_area',
    label: 'Diện tích hình phức hợp',
    description: 'Tính diện tích hình ghép từ nhiều hình cơ bản',
    group: 'geometry'
  },
  // Speed/Distance/Time (3 types)
  {
    type: 'speed_find_speed',
    id: 'speed_find_speed',
    label: 'Tìm vận tốc',
    description: 'Tính vận tốc khi biết quãng đường và thời gian',
    group: 'speed'
  },
  {
    type: 'speed_find_distance',
    id: 'speed_find_distance',
    label: 'Tìm quãng đường',
    description: 'Tính quãng đường khi biết vận tốc và thời gian',
    group: 'speed'
  },
  {
    type: 'speed_find_time',
    id: 'speed_find_time',
    label: 'Tìm thời gian',
    description: 'Tính thời gian khi biết quãng đường và vận tốc',
    group: 'speed'
  },
  // Word Problems (3 types)
  {
    type: 'word_problem_percent_g5',
    id: 'word_problem_percent_g5',
    label: 'Bài toán phần trăm',
    description: 'Bài toán có lời văn về phần trăm, lãi suất, giảm giá',
    group: 'word_problems'
  },
  {
    type: 'word_problem_speed',
    id: 'word_problem_speed',
    label: 'Bài toán chuyển động',
    description: 'Bài toán về hai xe đi ngược/cùng chiều',
    group: 'word_problems'
  },
  {
    type: 'word_problem_work',
    id: 'word_problem_work',
    label: 'Bài toán về công việc',
    description: 'Bài toán về năng suất làm việc',
    group: 'word_problems'
  },
  // Mixed Operations (2 types)
  {
    type: 'mixed_decimal_fraction',
    id: 'mixed_decimal_fraction',
    label: 'Tính biểu thức hỗn hợp',
    description: 'Tính biểu thức có cả số thập phân và phân số',
    group: 'mixed'
  },
  {
    type: 'order_of_operations',
    id: 'order_of_operations',
    label: 'Thứ tự thực hiện phép tính',
    description: 'Tính giá trị biểu thức theo đúng thứ tự',
    group: 'mixed'
  }
];

/**
 * Group labels with icons for UI display
 */
export const GRADE5_PROBLEM_GROUP_LABELS: Record<Grade5ProblemGroup, { label: string; icon: string }> = {
  decimals: { label: 'Số thập phân', icon: '🔢' },
  percentages: { label: 'Phần trăm', icon: '💯' },
  geometry: { label: 'Hình học', icon: '📐' },
  speed: { label: 'Chuyển động', icon: '🚗' },
  word_problems: { label: 'Toán có lời văn', icon: '📝' },
  mixed: { label: 'Tính hỗn hợp', icon: '🧮' }
};
