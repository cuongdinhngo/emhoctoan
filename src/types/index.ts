export type ProblemType = 'addition' | 'subtraction' | 'multiplication' | 'division' | 'multiplication_table' | 'division_table' | 'two_digit_multiply' | 'division_with_remainder' | 'two_digit_divide' | 'three_digit_multiply' | 'three_digit_divide' | 'word_problem_more_less' | 'word_problem_multiply_divide' | 'word_problem_unit_conversion' | 'word_problem_division_remainder' | 'geometry_midpoint' | 'geometry_circle' | 'geometry_rectangle' | 'geometry_square' | 'review_clock_reading' | 'review_fraction_of_number' | 'review_written_calculation' | 'review_broken_line' | 'review_chain_calculation' | 'review_fill_blank' | 'review_semester_1';
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
  originalType?: ProblemType; // For review_semester_1 to show actual question type
}

export interface ProblemSettings {
  enabledTypes: ProblemType[];
  difficulty: 'easy' | 'medium' | 'hard';
  questionQuantity: number;
  studentName: string;
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
