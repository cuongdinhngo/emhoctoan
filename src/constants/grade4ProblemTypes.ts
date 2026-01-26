import { Grade4ProblemType } from '../types';

/**
 * Map of Grade 4 problem types to their Vietnamese labels
 */
export const GRADE4_PROBLEM_TYPE_LABELS: Record<Grade4ProblemType, string> = {
  // Large Numbers
  'large_number_addition': 'Cong so lon',
  'large_number_subtraction': 'Tru so lon',
  'large_number_multiply': 'Nhan so lon',
  'large_number_divide': 'Chia so lon',
  // Divisibility
  'divisible_by_2': 'Chia het cho 2',
  'divisible_by_5': 'Chia het cho 5',
  'divisible_by_3': 'Chia het cho 3',
  'divisible_by_9': 'Chia het cho 9',
  'divisibility_mixed': 'Dau hieu chia het tong hop',
  // Fractions
  'fraction_basics': 'Phan so co ban',
  'fraction_equivalent': 'Phan so bang nhau',
  'fraction_compare': 'So sanh phan so',
  'fraction_addition': 'Cong phan so',
  'fraction_subtraction': 'Tru phan so',
  'fraction_multiply': 'Nhan phan so',
  'fraction_divide': 'Chia phan so',
  'fraction_of_number': 'Tim phan so cua mot so',
  // Geometry
  'parallelogram_perimeter': 'Chu vi hinh binh hanh',
  'parallelogram_area': 'Dien tich hinh binh hanh',
  'rhombus_perimeter': 'Chu vi hinh thoi',
  'rhombus_area': 'Dien tich hinh thoi',
  'angle_types': 'Cac loai goc',
  // Word Problems
  'word_problem_ratio': 'Toan ti so',
  'word_problem_average': 'Tim so trung binh cong',
  'word_problem_fraction': 'Toan phan so',
  // Measurement
  'unit_mass_convert': 'Doi don vi khoi luong',
  'unit_time_convert': 'Doi don vi thoi gian',
  'unit_area_convert': 'Doi don vi dien tich'
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
    label: 'Cong so lon',
    description: 'Cong cac so co 5-6 chu so',
    group: 'large_numbers'
  },
  {
    type: 'large_number_subtraction',
    id: 'large_number_subtraction',
    label: 'Tru so lon',
    description: 'Tru cac so co 5-6 chu so',
    group: 'large_numbers'
  },
  {
    type: 'large_number_multiply',
    id: 'large_number_multiply',
    label: 'Nhan so lon',
    description: 'Nhan so co nhieu chu so voi so co 2 chu so',
    group: 'large_numbers'
  },
  {
    type: 'large_number_divide',
    id: 'large_number_divide',
    label: 'Chia so lon',
    description: 'Chia so co nhieu chu so cho so co 2 chu so',
    group: 'large_numbers'
  },
  // Divisibility (5 types)
  {
    type: 'divisible_by_2',
    id: 'divisible_by_2',
    label: 'Chia het cho 2',
    description: 'Nhan biet so chia het cho 2',
    group: 'divisibility'
  },
  {
    type: 'divisible_by_5',
    id: 'divisible_by_5',
    label: 'Chia het cho 5',
    description: 'Nhan biet so chia het cho 5',
    group: 'divisibility'
  },
  {
    type: 'divisible_by_3',
    id: 'divisible_by_3',
    label: 'Chia het cho 3',
    description: 'Nhan biet so chia het cho 3 (tong cac chu so)',
    group: 'divisibility'
  },
  {
    type: 'divisible_by_9',
    id: 'divisible_by_9',
    label: 'Chia het cho 9',
    description: 'Nhan biet so chia het cho 9 (tong cac chu so)',
    group: 'divisibility'
  },
  {
    type: 'divisibility_mixed',
    id: 'divisibility_mixed',
    label: 'Dau hieu chia het tong hop',
    description: 'Kiem tra dau hieu chia het cho 2, 3, 5, 9',
    group: 'divisibility'
  },
  // Fractions (8 types)
  {
    type: 'fraction_basics',
    id: 'fraction_basics',
    label: 'Phan so co ban',
    description: 'Doc, viet phan so, xac dinh tu so va mau so',
    group: 'fractions'
  },
  {
    type: 'fraction_equivalent',
    id: 'fraction_equivalent',
    label: 'Phan so bang nhau',
    description: 'Tim phan so bang nhau, rut gon phan so',
    group: 'fractions'
  },
  {
    type: 'fraction_compare',
    id: 'fraction_compare',
    label: 'So sanh phan so',
    description: 'So sanh hai phan so',
    group: 'fractions'
  },
  {
    type: 'fraction_addition',
    id: 'fraction_addition',
    label: 'Cong phan so',
    description: 'Cong hai phan so cung mau va khac mau',
    group: 'fractions'
  },
  {
    type: 'fraction_subtraction',
    id: 'fraction_subtraction',
    label: 'Tru phan so',
    description: 'Tru hai phan so cung mau va khac mau',
    group: 'fractions'
  },
  {
    type: 'fraction_multiply',
    id: 'fraction_multiply',
    label: 'Nhan phan so',
    description: 'Nhan phan so voi so tu nhien, nhan hai phan so',
    group: 'fractions'
  },
  {
    type: 'fraction_divide',
    id: 'fraction_divide',
    label: 'Chia phan so',
    description: 'Chia phan so cho so tu nhien, chia hai phan so',
    group: 'fractions'
  },
  {
    type: 'fraction_of_number',
    id: 'fraction_of_number',
    label: 'Tim phan so cua mot so',
    description: 'Tim 2/3 cua 15, tim 3/4 cua 20...',
    group: 'fractions'
  },
  // Geometry (5 types)
  {
    type: 'parallelogram_perimeter',
    id: 'parallelogram_perimeter',
    label: 'Chu vi hinh binh hanh',
    description: 'Tinh chu vi hinh binh hanh',
    group: 'geometry'
  },
  {
    type: 'parallelogram_area',
    id: 'parallelogram_area',
    label: 'Dien tich hinh binh hanh',
    description: 'Tinh dien tich hinh binh hanh (day x chieu cao)',
    group: 'geometry'
  },
  {
    type: 'rhombus_perimeter',
    id: 'rhombus_perimeter',
    label: 'Chu vi hinh thoi',
    description: 'Tinh chu vi hinh thoi',
    group: 'geometry'
  },
  {
    type: 'rhombus_area',
    id: 'rhombus_area',
    label: 'Dien tich hinh thoi',
    description: 'Tinh dien tich hinh thoi (tich 2 duong cheo chia 2)',
    group: 'geometry'
  },
  {
    type: 'angle_types',
    id: 'angle_types',
    label: 'Cac loai goc',
    description: 'Nhan biet goc nhon, goc vuong, goc tu, goc bet',
    group: 'geometry'
  },
  // Word Problems (3 types)
  {
    type: 'word_problem_ratio',
    id: 'word_problem_ratio',
    label: 'Toan ti so',
    description: 'Tim hai so khi biet tong va ti so',
    group: 'word_problems'
  },
  {
    type: 'word_problem_average',
    id: 'word_problem_average',
    label: 'Tim so trung binh cong',
    description: 'Tinh trung binh cong cua cac so',
    group: 'word_problems'
  },
  {
    type: 'word_problem_fraction',
    id: 'word_problem_fraction',
    label: 'Toan phan so',
    description: 'Bai toan co loi van ve phan so',
    group: 'word_problems'
  },
  // Measurement (3 types)
  {
    type: 'unit_mass_convert',
    id: 'unit_mass_convert',
    label: 'Doi don vi khoi luong',
    description: 'Doi giua kg, g, tan, ta, yen',
    group: 'measurement'
  },
  {
    type: 'unit_time_convert',
    id: 'unit_time_convert',
    label: 'Doi don vi thoi gian',
    description: 'Doi giua gio, phut, giay, ngay',
    group: 'measurement'
  },
  {
    type: 'unit_area_convert',
    id: 'unit_area_convert',
    label: 'Doi don vi dien tich',
    description: 'Doi giua m2, dm2, cm2, km2, ha',
    group: 'measurement'
  }
];

/**
 * Group labels with icons for UI display
 */
export const GRADE4_PROBLEM_GROUP_LABELS: Record<Grade4ProblemGroup, { label: string; icon: string }> = {
  large_numbers: { label: 'So lon', icon: '🔢' },
  divisibility: { label: 'Dau hieu chia het', icon: '➗' },
  fractions: { label: 'Phan so', icon: '🥧' },
  geometry: { label: 'Hinh hoc', icon: '📐' },
  word_problems: { label: 'Toan co loi van', icon: '📝' },
  measurement: { label: 'Doi don vi', icon: '📏' }
};
