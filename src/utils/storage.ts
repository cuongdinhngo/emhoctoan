import { SessionData, ProgressData, ProblemSettings, ProblemType } from '../types';
import { Grade, DEFAULT_GRADE } from '../constants/grades';

const getStorageKeys = (grade: Grade = DEFAULT_GRADE) => ({
  SESSION: `emhoctoan_${grade}_session`,
  PROGRESS: `emhoctoan_${grade}_progress`,
  SETTINGS: `emhoctoan_${grade}_settings`
});

// Legacy keys for backward compatibility with grade3
const LEGACY_STORAGE_KEYS = {
  SESSION: 'emhoctoan_session',
  PROGRESS: 'emhoctoan_progress',
  SETTINGS: 'emhoctoan_settings'
} as const;

// Default problem types per grade
const DEFAULT_PROBLEM_TYPES: Record<Grade, ProblemType[]> = {
  grade3: ['addition', 'subtraction', 'multiplication_table', 'division_table', 'two_digit_multiply', 'two_digit_divide'],
  grade4: ['large_number_addition', 'large_number_subtraction', 'fraction_basics', 'fraction_addition', 'divisible_by_2', 'divisible_by_5'],
  grade5: ['decimal_addition', 'decimal_subtraction', 'percent_of_number', 'speed_find_speed', 'circle_area', 'order_of_operations']
};

export class StorageManager {
  // Migrate legacy grade3 data if exists
  private static migrateLegacyData(grade: Grade): void {
    if (grade !== 'grade3') return;

    const keys = getStorageKeys(grade);

    // Check if new keys already have data
    if (localStorage.getItem(keys.SESSION) || localStorage.getItem(keys.PROGRESS)) {
      return; // Already migrated
    }

    // Migrate legacy data
    const legacySession = localStorage.getItem(LEGACY_STORAGE_KEYS.SESSION);
    const legacyProgress = localStorage.getItem(LEGACY_STORAGE_KEYS.PROGRESS);
    const legacySettings = localStorage.getItem(LEGACY_STORAGE_KEYS.SETTINGS);

    if (legacySession) {
      localStorage.setItem(keys.SESSION, legacySession);
    }
    if (legacyProgress) {
      localStorage.setItem(keys.PROGRESS, legacyProgress);
    }
    if (legacySettings) {
      localStorage.setItem(keys.SETTINGS, legacySettings);
    }
  }

  // Session data
  static saveSession(session: SessionData, grade: Grade = DEFAULT_GRADE): void {
    try {
      const keys = getStorageKeys(grade);
      localStorage.setItem(keys.SESSION, JSON.stringify(session));
    } catch (error) {
      console.error('Failed to save session:', error);
    }
  }

  static loadSession(grade: Grade = DEFAULT_GRADE): SessionData | null {
    try {
      this.migrateLegacyData(grade);
      const keys = getStorageKeys(grade);
      const data = localStorage.getItem(keys.SESSION);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load session:', error);
      return null;
    }
  }

  static clearSession(grade: Grade = DEFAULT_GRADE): void {
    const keys = getStorageKeys(grade);
    localStorage.removeItem(keys.SESSION);
  }

  // Progress data
  static saveProgress(progress: ProgressData, grade: Grade = DEFAULT_GRADE): void {
    try {
      const keys = getStorageKeys(grade);
      localStorage.setItem(keys.PROGRESS, JSON.stringify(progress));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  }

  static loadProgress(grade: Grade = DEFAULT_GRADE): ProgressData | null {
    try {
      this.migrateLegacyData(grade);
      const keys = getStorageKeys(grade);
      const data = localStorage.getItem(keys.PROGRESS);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load progress:', error);
      return null;
    }
  }

  static updateProgress(sessionScore: { correct: number; total: number; streak: number }, grade: Grade = DEFAULT_GRADE): void {
    const currentProgress = this.loadProgress(grade) || {
      totalSessions: 0,
      totalProblems: 0,
      totalCorrect: 0,
      bestStreak: 0,
      averageScore: 0,
      lastPlayed: new Date().toISOString(),
      studentName: ''
    };

    const newProgress: ProgressData = {
      totalSessions: currentProgress.totalSessions + 1,
      totalProblems: currentProgress.totalProblems + sessionScore.total,
      totalCorrect: currentProgress.totalCorrect + sessionScore.correct,
      bestStreak: Math.max(currentProgress.bestStreak, sessionScore.streak),
      averageScore: (currentProgress.totalCorrect + sessionScore.correct) / (currentProgress.totalProblems + sessionScore.total),
      lastPlayed: new Date().toISOString(),
      studentName: currentProgress.studentName
    };

    this.saveProgress(newProgress, grade);
  }

  // Settings
  static saveSettings(settings: ProblemSettings, grade: Grade = DEFAULT_GRADE): void {
    try {
      const keys = getStorageKeys(grade);
      localStorage.setItem(keys.SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }

  static loadSettings(grade: Grade = DEFAULT_GRADE): ProblemSettings | null {
    try {
      this.migrateLegacyData(grade);
      const keys = getStorageKeys(grade);
      const data = localStorage.getItem(keys.SETTINGS);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load settings:', error);
      return null;
    }
  }

  static getDefaultSettings(grade: Grade = DEFAULT_GRADE): ProblemSettings {
    return {
      enabledTypes: DEFAULT_PROBLEM_TYPES[grade] || DEFAULT_PROBLEM_TYPES.grade3,
      difficulty: 'medium',
      questionQuantity: 25,
      studentName: '',
      grade
    };
  }
}
