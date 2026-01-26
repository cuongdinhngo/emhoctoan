import { Grade4ProblemType } from '../types';

/**
 * Map of Grade 4 problem types to their Vietnamese labels
 */
export const GRADE4_PROBLEM_TYPE_LABELS: Record<Grade4ProblemType, string> = {
  // Large Numbers
  'large_number_addition': 'Cộng số lớn',
  'large_number_subtraction': 'Trừ số lớn',
  'large_number_multiply': 'Nhân số lớn',
  'large_number_divide': 'Chia số lớn',
  // Divisibility
  'divisible_by_2': 'Chia hết cho 2',
  'divisible_by_5': 'Chia hết cho 5',
  'divisible_by_3': 'Chia hết cho 3',
  'divisible_by_9': 'Chia hết cho 9',
  'divisibility_mixed': 'Dấu hiệu chia hết tổng hợp',
  // Fractions
  'fraction_basics': 'Phân số cơ bản',
  'fraction_equivalent': 'Phân số bằng nhau',
  'fraction_compare': 'So sánh phân số',
  'fraction_addition': 'Cộng phân số',
  'fraction_subtraction': 'Trừ phân số',
  'fraction_multiply': 'Nhân phân số',
  'fraction_divide': 'Chia phân số',
  'fraction_of_number': 'Tìm phân số của một số',
  // Geometry
  'parallelogram_perimeter': 'Chu vi hình bình hành',
  'parallelogram_area': 'Diện tích hình bình hành',
  'rhombus_perimeter': 'Chu vi hình thoi',
  'rhombus_area': 'Diện tích hình thoi',
  'angle_types': 'Các loại góc',
  // Word Problems
  'word_problem_ratio': 'Toán tỉ số',
  'word_problem_average': 'Tìm số trung bình cộng',
  'word_problem_fraction': 'Toán phân số',
  // Measurement
  'unit_mass_convert': 'Đổi đơn vị khối lượng',
  'unit_time_convert': 'Đổi đơn vị thời gian',
  'unit_area_convert': 'Đổi đơn vị diện tích'
};

/**
 * Problem group type for categorizing Grade 4 problem types
 */
export type Grade4ProblemGroup = 'large_numbers' | 'divisibility' | 'fractions' | 'geometry' | 'word_problems' | 'measurement';

/**
 * Array of Grade 4 problem types with labels and descriptions for UI components
 */
export const GRADE4_PROBLEM_TYPES_CONFIG: Array<{
  type: Grade4ProblemType;
  label: string;
  description: string;
  id: string;
  group: Grade4ProblemGroup;
}> = [
  // Large Numbers (4 types)
  {
    type: 'large_number_addition',
    id: 'large_number_addition',
    label: 'Cộng số lớn',
    description: 'Cộng các số có 5-6 chữ số',
    group: 'large_numbers'
  },
  {
    type: 'large_number_subtraction',
    id: 'large_number_subtraction',
    label: 'Trừ số lớn',
    description: 'Trừ các số có 5-6 chữ số',
    group: 'large_numbers'
  },
  {
    type: 'large_number_multiply',
    id: 'large_number_multiply',
    label: 'Nhân số lớn',
    description: 'Nhân số có nhiều chữ số với số có 2 chữ số',
    group: 'large_numbers'
  },
  {
    type: 'large_number_divide',
    id: 'large_number_divide',
    label: 'Chia số lớn',
    description: 'Chia số có nhiều chữ số cho số có 2 chữ số',
    group: 'large_numbers'
  },
  // Divisibility (5 types)
  {
    type: 'divisible_by_2',
    id: 'divisible_by_2',
    label: 'Chia hết cho 2',
    description: 'Nhận biết số chia hết cho 2',
    group: 'divisibility'
  },
  {
    type: 'divisible_by_5',
    id: 'divisible_by_5',
    label: 'Chia hết cho 5',
    description: 'Nhận biết số chia hết cho 5',
    group: 'divisibility'
  },
  {
    type: 'divisible_by_3',
    id: 'divisible_by_3',
    label: 'Chia hết cho 3',
    description: 'Nhận biết số chia hết cho 3 (tổng các chữ số)',
    group: 'divisibility'
  },
  {
    type: 'divisible_by_9',
    id: 'divisible_by_9',
    label: 'Chia hết cho 9',
    description: 'Nhận biết số chia hết cho 9 (tổng các chữ số)',
    group: 'divisibility'
  },
  {
    type: 'divisibility_mixed',
    id: 'divisibility_mixed',
    label: 'Dấu hiệu chia hết tổng hợp',
    description: 'Kiểm tra dấu hiệu chia hết cho 2, 3, 5, 9',
    group: 'divisibility'
  },
  // Fractions (8 types)
  {
    type: 'fraction_basics',
    id: 'fraction_basics',
    label: 'Phân số cơ bản',
    description: 'Đọc, viết phân số, xác định tử số và mẫu số',
    group: 'fractions'
  },
  {
    type: 'fraction_equivalent',
    id: 'fraction_equivalent',
    label: 'Phân số bằng nhau',
    description: 'Tìm phân số bằng nhau, rút gọn phân số',
    group: 'fractions'
  },
  {
    type: 'fraction_compare',
    id: 'fraction_compare',
    label: 'So sánh phân số',
    description: 'So sánh hai phân số',
    group: 'fractions'
  },
  {
    type: 'fraction_addition',
    id: 'fraction_addition',
    label: 'Cộng phân số',
    description: 'Cộng hai phân số cùng mẫu và khác mẫu',
    group: 'fractions'
  },
  {
    type: 'fraction_subtraction',
    id: 'fraction_subtraction',
    label: 'Trừ phân số',
    description: 'Trừ hai phân số cùng mẫu và khác mẫu',
    group: 'fractions'
  },
  {
    type: 'fraction_multiply',
    id: 'fraction_multiply',
    label: 'Nhân phân số',
    description: 'Nhân phân số với số tự nhiên, nhân hai phân số',
    group: 'fractions'
  },
  {
    type: 'fraction_divide',
    id: 'fraction_divide',
    label: 'Chia phân số',
    description: 'Chia phân số cho số tự nhiên, chia hai phân số',
    group: 'fractions'
  },
  {
    type: 'fraction_of_number',
    id: 'fraction_of_number',
    label: 'Tìm phân số của một số',
    description: 'Tìm 2/3 của 15, tìm 3/4 của 20...',
    group: 'fractions'
  },
  // Geometry (5 types)
  {
    type: 'parallelogram_perimeter',
    id: 'parallelogram_perimeter',
    label: 'Chu vi hình bình hành',
    description: 'Tính chu vi hình bình hành',
    group: 'geometry'
  },
  {
    type: 'parallelogram_area',
    id: 'parallelogram_area',
    label: 'Diện tích hình bình hành',
    description: 'Tính diện tích hình bình hành (đáy x chiều cao)',
    group: 'geometry'
  },
  {
    type: 'rhombus_perimeter',
    id: 'rhombus_perimeter',
    label: 'Chu vi hình thoi',
    description: 'Tính chu vi hình thoi',
    group: 'geometry'
  },
  {
    type: 'rhombus_area',
    id: 'rhombus_area',
    label: 'Diện tích hình thoi',
    description: 'Tính diện tích hình thoi (tích 2 đường chéo chia 2)',
    group: 'geometry'
  },
  {
    type: 'angle_types',
    id: 'angle_types',
    label: 'Các loại góc',
    description: 'Nhận biết góc nhọn, góc vuông, góc tù, góc bẹt',
    group: 'geometry'
  },
  // Word Problems (3 types)
  {
    type: 'word_problem_ratio',
    id: 'word_problem_ratio',
    label: 'Toán tỉ số',
    description: 'Tìm hai số khi biết tổng và tỉ số',
    group: 'word_problems'
  },
  {
    type: 'word_problem_average',
    id: 'word_problem_average',
    label: 'Tìm số trung bình cộng',
    description: 'Tính trung bình cộng của các số',
    group: 'word_problems'
  },
  {
    type: 'word_problem_fraction',
    id: 'word_problem_fraction',
    label: 'Toán phân số',
    description: 'Bài toán có lời văn về phân số',
    group: 'word_problems'
  },
  // Measurement (3 types)
  {
    type: 'unit_mass_convert',
    id: 'unit_mass_convert',
    label: 'Đổi đơn vị khối lượng',
    description: 'Đổi giữa kg, g, tấn, tạ, yến',
    group: 'measurement'
  },
  {
    type: 'unit_time_convert',
    id: 'unit_time_convert',
    label: 'Đổi đơn vị thời gian',
    description: 'Đổi giữa giờ, phút, giây, ngày',
    group: 'measurement'
  },
  {
    type: 'unit_area_convert',
    id: 'unit_area_convert',
    label: 'Đổi đơn vị diện tích',
    description: 'Đổi giữa m², dm², cm², km², ha',
    group: 'measurement'
  }
];

/**
 * Group labels with icons for UI display
 */
export const GRADE4_PROBLEM_GROUP_LABELS: Record<Grade4ProblemGroup, { label: string; icon: string }> = {
  large_numbers: { label: 'Số lớn', icon: '🔢' },
  divisibility: { label: 'Dấu hiệu chia hết', icon: '➗' },
  fractions: { label: 'Phân số', icon: '🥧' },
  geometry: { label: 'Hình học', icon: '📐' },
  word_problems: { label: 'Toán có lời văn', icon: '📝' },
  measurement: { label: 'Đổi đơn vị', icon: '📏' }
};
