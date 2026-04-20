// Re-export Grade type
export type { Grade } from '../constants/grades';

// Grade 3 problem types
export type Grade3ProblemType = 'addition' | 'subtraction' | 'multiplication' | 'division' | 'multiplication_table' | 'division_table' | 'two_digit_multiply' | 'division_with_remainder' | 'two_digit_divide' | 'three_digit_multiply' | 'three_digit_divide' | 'word_problem_more_less' | 'word_problem_multiply_divide' | 'word_problem_unit_conversion' | 'word_problem_division_remainder' | 'geometry_midpoint' | 'geometry_circle' | 'geometry_rectangle' | 'geometry_square' | 'review_clock_reading' | 'review_fraction_of_number' | 'review_written_calculation' | 'review_broken_line' | 'review_chain_calculation' | 'review_fill_blank' | 'review_rounding' | 'review_date_calculation' | 'review_money' | 'review_digit_value' | 'review_month_days' | 'review_roman_numerals' | 'review_cube_properties' | 'review_expression' | 'review_unit_conversion' | 'review_semester_1' | 'review_semester_2' | 'visual_fraction' | 'true_false_multiply_divide' | 'unit_calculation';

// Grade 4 problem types
export type Grade4ProblemType =
  // Large Numbers (4)
  | 'large_number_addition'
  | 'large_number_subtraction'
  | 'large_number_multiply'
  | 'large_number_divide'
  // Divisibility (5)
  | 'divisible_by_2'
  | 'divisible_by_5'
  | 'divisible_by_3'
  | 'divisible_by_9'
  | 'divisibility_mixed'
  // Fractions (8)
  | 'fraction_basics'
  | 'fraction_equivalent'
  | 'fraction_compare'
  | 'fraction_addition'
  | 'fraction_subtraction'
  | 'fraction_multiply'
  | 'fraction_divide'
  | 'fraction_of_number'
  // Geometry (5)
  | 'parallelogram_perimeter'
  | 'parallelogram_area'
  | 'rhombus_perimeter'
  | 'rhombus_area'
  | 'angle_types'
  // Word Problems (3)
  | 'word_problem_ratio'
  | 'word_problem_average'
  | 'word_problem_fraction'
  // Measurement (3)
  | 'unit_mass_convert'
  | 'unit_time_convert'
  | 'unit_area_convert';

// Grade 5 problem types
export type Grade5ProblemType =
  // Decimals (6)
  | 'decimal_read_write'
  | 'decimal_compare'
  | 'decimal_addition'
  | 'decimal_subtraction'
  | 'decimal_multiply'
  | 'decimal_divide'
  // Percentages (4)
  | 'percent_of_number'
  | 'percent_find_rate'
  | 'percent_find_total'
  | 'percent_convert'
  // Geometry (5)
  | 'circle_circumference'
  | 'circle_area'
  | 'rectangular_prism_volume'
  | 'cube_volume'
  | 'composite_area'
  // Speed/Distance/Time (3)
  | 'speed_find_speed'
  | 'speed_find_distance'
  | 'speed_find_time'
  // Word Problems (3)
  | 'word_problem_percent_g5'
  | 'word_problem_speed'
  | 'word_problem_work'
  // Mixed Operations (2)
  | 'mixed_decimal_fraction'
  | 'order_of_operations';

// Combined problem type
export type ProblemType = Grade3ProblemType | Grade4ProblemType | Grade5ProblemType;
export type QuestionType = 'input' | 'multiple_choice';

export interface MathProblem {
  id: string;
  type: ProblemType;
  question: string;
  answer: number;
  options?: number[];
  textOptions?: string[];   // For text-based multiple choice (e.g., clock questions)
  questionType: QuestionType;
  userAnswer?: number;
  isCorrect?: boolean;
  isAnswered: boolean;
  textAnswer?: string;      // For string-based answers (e.g., "9 giờ 30 phút")
  userTextAnswer?: string;  // User's text input
  originalType?: ProblemType; // For review mode to show actual question type
}

export interface ProblemSettings {
  enabledTypes: ProblemType[];
  difficulty: 'easy' | 'medium' | 'hard';
  questionQuantity: number;
  studentName: string;
  grade?: import('../constants/grades').Grade;
}

export interface ScoreData {
  correct: number;
  total: number;
  streak: number;
  bestStreak: number;
}

export interface SessionData {
  currentScore: ScoreData;
  problems: MathProblem[];
  currentProblemIndex: number;
  settings: ProblemSettings;
  startTime: number;
  isCompleted: boolean;
  totalMarks: number;
}

export interface ProgressData {
  totalSessions: number;
  totalProblems: number;
  totalCorrect: number;
  bestStreak: number;
  averageScore: number;
  lastPlayed: string;
  studentName: string;
}

export interface QuestionListItem {
  id: string;
  questionNumber: number;
  isAnswered: boolean;
  isCorrect?: boolean;
  isCurrent: boolean;
}
