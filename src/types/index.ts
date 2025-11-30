export type ProblemType = 'addition' | 'subtraction' | 'multiplication' | 'division' | 'multiplication_table' | 'division_table' | 'two_digit_multiply' | 'division_with_remainder' | 'two_digit_divide' | 'three_digit_multiply' | 'three_digit_divide' | 'word_problem_more_less' | 'word_problem_multiply_divide' | 'word_problem_unit_conversion' | 'geometry_midpoint' | 'geometry_circle' | 'geometry_rectangle' | 'geometry_square';
export type QuestionType = 'input' | 'multiple_choice';

export interface MathProblem {
  id: string;
  type: ProblemType;
  question: string;
  answer: number;
  options?: number[];
  questionType: QuestionType;
  userAnswer?: number;
  isCorrect?: boolean;
  isAnswered: boolean;
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
