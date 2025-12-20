import { ProblemType } from '../types';

/**
 * Map of problem types to their Vietnamese labels
 */
export const PROBLEM_TYPE_LABELS: Record<ProblemType, string> = {
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
  'review_clock_reading': 'Ôn tập: Xem đồng hồ',
  'review_fraction_of_number': 'Ôn tập: Tìm 1/n của số',
  'review_written_calculation': 'Ôn tập: Đặt tính rồi tính',
  'review_broken_line': 'Ôn tập: Đường gấp khúc',
  'review_chain_calculation': 'Ôn tập: Điền số vào ô trống',
  'review_fill_blank': 'Ôn tập: Tìm số còn thiếu',
  'review_semester_1': 'Ôn tập: Học kỳ 1'
};

/**
 * Array of problem types with labels and descriptions for UI components
 */
export const PROBLEM_TYPES_CONFIG: Array<{
  type: ProblemType;
  label: string;
  description: string;
  id: string; // For backward compatibility with StudentSetup
  category?: 'grade3' | 'review'; // Category for grouping in expansion panels
}> = [
  { 
    type: 'addition', 
    id: 'addition',
    label: 'Phép cộng', 
    description: 'Cộng trong phạm vi 1000' 
  },
  { 
    type: 'subtraction', 
    id: 'subtraction',
    label: 'Phép trừ', 
    description: 'Trừ trong phạm vi 1000' 
  },
  { 
    type: 'multiplication_table', 
    id: 'multiplication_table',
    label: 'Bảng nhân', 
    description: 'Nhân từ 1 đến 9' 
  },
  { 
    type: 'division_table', 
    id: 'division_table',
    label: 'Bảng chia', 
    description: 'Chia từ 1 đến 9' 
  },
  { 
    type: 'multiplication', 
    id: 'multiplication',
    label: 'Phép nhân', 
    description: 'Nhân trong phạm vi 100' 
  },
  { 
    type: 'division', 
    id: 'division',
    label: 'Phép chia', 
    description: 'Chia trong phạm vi 100' 
  },
  { 
    type: 'two_digit_multiply', 
    id: 'two_digit_multiply',
    label: 'Nhân 2 chữ số', 
    description: 'Nhân số có hai chữ số với số có một chữ số' 
  },
  { 
    type: 'division_with_remainder', 
    id: 'division_with_remainder',
    label: 'Chia có dư', 
    description: 'Phép chia hết, phép chia có dư' 
  },
  { 
    type: 'two_digit_divide', 
    id: 'two_digit_divide',
    label: 'Chia 2 chữ số', 
    description: 'Chia số có hai chữ số cho số có một chữ số' 
  },
  { 
    type: 'three_digit_multiply', 
    id: 'three_digit_multiply',
    label: 'Nhân 3 chữ số', 
    description: 'Nhân số có ba chữ số với số có một chữ số' 
  },
  { 
    type: 'three_digit_divide', 
    id: 'three_digit_divide',
    label: 'Chia 3 chữ số', 
    description: 'Chia số có ba chữ số cho số có một chữ số' 
  },
  { 
    type: 'word_problem_more_less', 
    id: 'word_problem_more_less',
    label: 'Toán có lời văn: Hơn kém', 
    description: 'Dạng toán về hơn kém số đơn vị' 
  },
  { 
    type: 'word_problem_multiply_divide', 
    id: 'word_problem_multiply_divide',
    label: 'Toán có lời văn: Gấp/Giảm', 
    description: 'Dạng toán về gấp số lần, giảm số lần' 
  },
  { 
    type: 'word_problem_unit_conversion', 
    id: 'word_problem_unit_conversion',
    label: 'Toán có lời văn: Rút đơn vị', 
    description: 'Dạng toán liên quan đến rút về đơn vị' 
  },
  { 
    type: 'geometry_midpoint', 
    id: 'geometry_midpoint',
    label: 'Hình học: Trung điểm', 
    description: 'Điểm ở giữa - Trung điểm của đoạn thẳng' 
  },
  { 
    type: 'geometry_circle', 
    id: 'geometry_circle',
    label: 'Hình học: Hình tròn', 
    description: 'Hình tròn: tâm, bán kính, đường kính' 
  },
  { 
    type: 'geometry_rectangle', 
    id: 'geometry_rectangle',
    label: 'Hình học: Hình chữ nhật', 
    description: 'Hình chữ nhật, chu vi, diện tích' 
  },
  {
    type: 'geometry_square',
    id: 'geometry_square',
    label: 'Hình học: Hình vuông',
    description: 'Hình vuông, chu vi, diện tích'
  },
  // Additional question types
  {
    type: 'review_clock_reading',
    id: 'review_clock_reading',
    label: 'Xem đồng hồ',
    description: 'Đọc giờ trên đồng hồ kim'
  },
  {
    type: 'review_fraction_of_number',
    id: 'review_fraction_of_number',
    label: 'Tìm 1/n của số',
    description: 'Tìm 1/2, 1/3, 1/4, 1/5 của một số'
  },
  {
    type: 'review_written_calculation',
    id: 'review_written_calculation',
    label: 'Đặt tính rồi tính',
    description: 'Phép tính nhiều chữ số'
  },
  {
    type: 'review_broken_line',
    id: 'review_broken_line',
    label: 'Độ dài đường gấp khúc',
    description: 'Tính tổng độ dài các đoạn thẳng'
  },
  {
    type: 'review_chain_calculation',
    id: 'review_chain_calculation',
    label: 'Điền số vào ô trống',
    description: 'Gấp/Giảm số lần theo dãy'
  },
  {
    type: 'word_problem_division_remainder',
    id: 'word_problem_division_remainder',
    label: 'Toán có lời văn: Chia có dư',
    description: 'Bài toán tìm số lượng nhiều nhất'
  },
  {
    type: 'review_fill_blank',
    id: 'review_fill_blank',
    label: 'Tìm số còn thiếu',
    description: 'Tìm ẩn số trong phép tính: ? × 6 = 48'
  },
  // Ôn tập (Review) types
  {
    type: 'review_semester_1',
    id: 'review_semester_1',
    label: 'Ôn tập Học kỳ 1',
    description: 'Tổng hợp các dạng bài tập',
    category: 'review'
  }
];

