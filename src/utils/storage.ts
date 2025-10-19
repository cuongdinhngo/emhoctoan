import { SessionData, ProgressData, ProblemSettings } from '../types';

const STORAGE_KEYS = {
  SESSION: 'emhoctoan_session',
  PROGRESS: 'emhoctoan_progress',
  SETTINGS: 'emhoctoan_settings'
} as const;

export class StorageManager {
  // Session data
  static saveSession(session: SessionData): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
    } catch (error) {
      console.error('Failed to save session:', error);
    }
  }

  static loadSession(): SessionData | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SESSION);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load session:', error);
      return null;
    }
  }

  static clearSession(): void {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  }

  // Progress data
  static saveProgress(progress: ProgressData): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  }

  static loadProgress(): ProgressData | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load progress:', error);
      return null;
    }
  }

  static updateProgress(sessionScore: { correct: number; total: number; streak: number }): void {
    const currentProgress = this.loadProgress() || {
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

    this.saveProgress(newProgress);
  }

  // Settings
  static saveSettings(settings: ProblemSettings): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }

  static loadSettings(): ProblemSettings | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load settings:', error);
      return null;
    }
  }

  static getDefaultSettings(): ProblemSettings {
    return {
      enabledTypes: ['addition', 'subtraction', 'multiplication_table', 'division_table', 'two_digit_multiply', 'two_digit_divide'],
      difficulty: 'medium',
      questionQuantity: 25,
      studentName: ''
    };
  }
}
