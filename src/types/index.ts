export type ProblemType = 'addition' | 'subtraction' | 'multiplication' | 'division' | 'multiplication_table' | 'division_table';

export interface MathProblem {
  id: string;
  type: ProblemType;
  question: string;
  answer: number;
  options?: number[];
}

export interface ProblemSettings {
  enabledTypes: ProblemType[];
  difficulty: 'easy' | 'medium' | 'hard';
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
}

export interface ProgressData {
  totalSessions: number;
  totalProblems: number;
  totalCorrect: number;
  bestStreak: number;
  averageScore: number;
  lastPlayed: string;
}
