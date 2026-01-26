import { Grade5ProblemType } from '../types';

/**
 * Map of Grade 5 problem types to their Vietnamese labels
 */
export const GRADE5_PROBLEM_TYPE_LABELS: Record<Grade5ProblemType, string> = {
  // Decimals
  'decimal_read_write': 'Doc, viet so thap phan',
  'decimal_compare': 'So sanh so thap phan',
  'decimal_addition': 'Cong so thap phan',
  'decimal_subtraction': 'Tru so thap phan',
  'decimal_multiply': 'Nhan so thap phan',
  'decimal_divide': 'Chia so thap phan',
  // Percentages
  'percent_of_number': 'Tim phan tram cua mot so',
  'percent_find_rate': 'Tim ti so phan tram',
  'percent_find_total': 'Tim mot so biet phan tram',
  'percent_convert': 'Doi phan so sang phan tram',
  // Geometry
  'circle_circumference': 'Chu vi hinh tron',
  'circle_area': 'Dien tich hinh tron',
  'rectangular_prism_volume': 'The tich hinh hop chu nhat',
  'cube_volume': 'The tich hinh lap phuong',
  'composite_area': 'Dien tich hinh phuc hop',
  // Speed/Distance/Time
  'speed_find_speed': 'Tim van toc',
  'speed_find_distance': 'Tim quang duong',
  'speed_find_time': 'Tim thoi gian',
  // Word Problems
  'word_problem_percent_g5': 'Bai toan phan tram',
  'word_problem_speed': 'Bai toan chuyen dong',
  'word_problem_work': 'Bai toan ve cong viec',
  // Mixed Operations
  'mixed_decimal_fraction': 'Tinh bieu thuc hon hop',
  'order_of_operations': 'Thu tu thuc hien phep tinh'
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
    label: 'Doc, viet so thap phan',
    description: 'Doc va viet so thap phan, xac dinh gia tri cua chu so',
    group: 'decimals'
  },
  {
    type: 'decimal_compare',
    id: 'decimal_compare',
    label: 'So sanh so thap phan',
    description: 'So sanh hai so thap phan',
    group: 'decimals'
  },
  {
    type: 'decimal_addition',
    id: 'decimal_addition',
    label: 'Cong so thap phan',
    description: 'Cong hai hoac nhieu so thap phan',
    group: 'decimals'
  },
  {
    type: 'decimal_subtraction',
    id: 'decimal_subtraction',
    label: 'Tru so thap phan',
    description: 'Tru hai so thap phan',
    group: 'decimals'
  },
  {
    type: 'decimal_multiply',
    id: 'decimal_multiply',
    label: 'Nhan so thap phan',
    description: 'Nhan so thap phan voi so tu nhien hoac so thap phan',
    group: 'decimals'
  },
  {
    type: 'decimal_divide',
    id: 'decimal_divide',
    label: 'Chia so thap phan',
    description: 'Chia so thap phan cho so tu nhien hoac so thap phan',
    group: 'decimals'
  },
  // Percentages (4 types)
  {
    type: 'percent_of_number',
    id: 'percent_of_number',
    label: 'Tim phan tram cua mot so',
    description: 'Tim 15% cua 200, tim 25% cua 80...',
    group: 'percentages'
  },
  {
    type: 'percent_find_rate',
    id: 'percent_find_rate',
    label: 'Tim ti so phan tram',
    description: '25 la bao nhieu phan tram cua 100?',
    group: 'percentages'
  },
  {
    type: 'percent_find_total',
    id: 'percent_find_total',
    label: 'Tim mot so biet phan tram',
    description: 'Biet 20% cua so do la 50. Tim so do.',
    group: 'percentages'
  },
  {
    type: 'percent_convert',
    id: 'percent_convert',
    label: 'Doi phan so sang phan tram',
    description: 'Doi 1/4 sang phan tram, doi 0.75 sang phan tram',
    group: 'percentages'
  },
  // Geometry (5 types)
  {
    type: 'circle_circumference',
    id: 'circle_circumference',
    label: 'Chu vi hinh tron',
    description: 'Tinh chu vi hinh tron (C = d x 3.14 hoac C = 2 x r x 3.14)',
    group: 'geometry'
  },
  {
    type: 'circle_area',
    id: 'circle_area',
    label: 'Dien tich hinh tron',
    description: 'Tinh dien tich hinh tron (S = r x r x 3.14)',
    group: 'geometry'
  },
  {
    type: 'rectangular_prism_volume',
    id: 'rectangular_prism_volume',
    label: 'The tich hinh hop chu nhat',
    description: 'Tinh the tich hinh hop chu nhat (V = dai x rong x cao)',
    group: 'geometry'
  },
  {
    type: 'cube_volume',
    id: 'cube_volume',
    label: 'The tich hinh lap phuong',
    description: 'Tinh the tich hinh lap phuong (V = a x a x a)',
    group: 'geometry'
  },
  {
    type: 'composite_area',
    id: 'composite_area',
    label: 'Dien tich hinh phuc hop',
    description: 'Tinh dien tich hinh ghep tu nhieu hinh co ban',
    group: 'geometry'
  },
  // Speed/Distance/Time (3 types)
  {
    type: 'speed_find_speed',
    id: 'speed_find_speed',
    label: 'Tim van toc',
    description: 'Tinh van toc khi biet quang duong va thoi gian',
    group: 'speed'
  },
  {
    type: 'speed_find_distance',
    id: 'speed_find_distance',
    label: 'Tim quang duong',
    description: 'Tinh quang duong khi biet van toc va thoi gian',
    group: 'speed'
  },
  {
    type: 'speed_find_time',
    id: 'speed_find_time',
    label: 'Tim thoi gian',
    description: 'Tinh thoi gian khi biet quang duong va van toc',
    group: 'speed'
  },
  // Word Problems (3 types)
  {
    type: 'word_problem_percent_g5',
    id: 'word_problem_percent_g5',
    label: 'Bai toan phan tram',
    description: 'Bai toan co loi van ve phan tram, lai suat, giam gia',
    group: 'word_problems'
  },
  {
    type: 'word_problem_speed',
    id: 'word_problem_speed',
    label: 'Bai toan chuyen dong',
    description: 'Bai toan ve hai xe di nguoc/cung chieu',
    group: 'word_problems'
  },
  {
    type: 'word_problem_work',
    id: 'word_problem_work',
    label: 'Bai toan ve cong viec',
    description: 'Bai toan ve nang suat lam viec',
    group: 'word_problems'
  },
  // Mixed Operations (2 types)
  {
    type: 'mixed_decimal_fraction',
    id: 'mixed_decimal_fraction',
    label: 'Tinh bieu thuc hon hop',
    description: 'Tinh bieu thuc co ca so thap phan va phan so',
    group: 'mixed'
  },
  {
    type: 'order_of_operations',
    id: 'order_of_operations',
    label: 'Thu tu thuc hien phep tinh',
    description: 'Tinh gia tri bieu thuc theo dung thu tu',
    group: 'mixed'
  }
];

/**
 * Group labels with icons for UI display
 */
export const GRADE5_PROBLEM_GROUP_LABELS: Record<Grade5ProblemGroup, { label: string; icon: string }> = {
  decimals: { label: 'So thap phan', icon: '🔢' },
  percentages: { label: 'Phan tram', icon: '💯' },
  geometry: { label: 'Hinh hoc', icon: '📐' },
  speed: { label: 'Chuyen dong', icon: '🚗' },
  word_problems: { label: 'Toan co loi van', icon: '📝' },
  mixed: { label: 'Tinh hon hop', icon: '🧮' }
};
