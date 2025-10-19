import React, { useState, useEffect } from 'react';
import { ProblemDisplay } from './components/ProblemDisplay';
import { AnswerInput } from './components/AnswerInput';
import { ScoreBoard } from './components/ScoreBoard';
import { ProgressTracker } from './components/ProgressTracker';
import { SettingsPanel } from './components/SettingsPanel';
import { ProblemGenerator } from './utils/problemGenerator';
import { StorageManager } from './utils/storage';
import { MathProblem, ProblemSettings, ScoreData, ProgressData, SessionData } from './types';

function App() {
  const [currentProblem, setCurrentProblem] = useState<MathProblem | null>(null);
  const [score, setScore] = useState<ScoreData>({ correct: 0, total: 0, streak: 0, bestStreak: 0 });
  const [settings, setSettings] = useState<ProblemSettings>(StorageManager.getDefaultSettings());
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | undefined>(undefined);
  const [showAnswer, setShowAnswer] = useState(false);

  // Load saved data on mount
  useEffect(() => {
    const savedSettings = StorageManager.loadSettings();
    if (savedSettings) {
      setSettings(savedSettings);
    }

    const savedProgress = StorageManager.loadProgress();
    if (savedProgress) {
      setProgress(savedProgress);
    }

    const savedSession = StorageManager.loadSession();
    if (savedSession && savedSession.settings.enabledTypes.length > 0) {
      setSettings(savedSession.settings);
      setScore(savedSession.currentScore);
      if (savedSession.problems.length > 0 && savedSession.currentProblemIndex < savedSession.problems.length) {
        setCurrentProblem(savedSession.problems[savedSession.currentProblemIndex]);
      }
    }
  }, []);

  // Generate new problem
  const generateNewProblem = () => {
    if (settings.enabledTypes.length === 0) {
      alert('Vui lòng chọn ít nhất một loại bài tập trong cài đặt!');
      return;
    }

    const newProblem = ProblemGenerator.generateRandomProblem(settings.enabledTypes);
    setCurrentProblem(newProblem);
    setLastAnswerCorrect(undefined);
    setShowAnswer(false);
    setIsAnswering(true);
  };

  // Handle answer submission
  const handleAnswerSubmit = (userAnswer: number) => {
    if (!currentProblem) return;

    const isCorrect = userAnswer === currentProblem.answer;
    setLastAnswerCorrect(isCorrect);
    setShowAnswer(true);
    setIsAnswering(false);

    // Update score
    const newScore: ScoreData = {
      correct: score.correct + (isCorrect ? 1 : 0),
      total: score.total + 1,
      streak: isCorrect ? score.streak + 1 : 0,
      bestStreak: Math.max(score.bestStreak, isCorrect ? score.streak + 1 : score.streak)
    };
    setScore(newScore);

    // Save session data
    const sessionData: SessionData = {
      currentScore: newScore,
      problems: currentProblem ? [currentProblem] : [],
      currentProblemIndex: 0,
      settings,
      startTime: Date.now()
    };
    StorageManager.saveSession(sessionData);

    // Auto-generate next problem after delay
    setTimeout(() => {
      generateNewProblem();
    }, 2000);
  };

  // Handle settings change
  const handleSettingsChange = (newSettings: ProblemSettings) => {
    setSettings(newSettings);
    StorageManager.saveSettings(newSettings);
  };

  // Start new session
  const startNewSession = () => {
    setScore({ correct: 0, total: 0, streak: 0, bestStreak: progress?.bestStreak || 0 });
    setCurrentProblem(null);
    setLastAnswerCorrect(undefined);
    setShowAnswer(false);
    setIsAnswering(false);
    StorageManager.clearSession();
    generateNewProblem();
  };

  // End current session
  const endSession = () => {
    if (score.total > 0) {
      StorageManager.updateProgress(score);
      const updatedProgress = StorageManager.loadProgress();
      setProgress(updatedProgress);
    }
    StorageManager.clearSession();
    setScore({ correct: 0, total: 0, streak: 0, bestStreak: progress?.bestStreak || 0 });
    setCurrentProblem(null);
    setLastAnswerCorrect(undefined);
    setShowAnswer(false);
    setIsAnswering(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">🧮 Em Học Toán - Lớp 3</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setShowProgress(true)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                📊 Thống kê
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                ⚙️ Cài đặt
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Problem Area */}
          <div className="lg:col-span-2">
            {currentProblem ? (
              <div className="space-y-6">
                <ProblemDisplay 
                  problem={currentProblem} 
                  isCorrect={lastAnswerCorrect}
                  showAnswer={showAnswer}
                />
                
                {isAnswering && (
                  <AnswerInput 
                    onSubmit={handleAnswerSubmit}
                    disabled={!isAnswering}
                  />
                )}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🎯</div>
                <h2 className="text-2xl font-bold text-gray-700 mb-4">
                  Sẵn sàng học toán chưa?
                </h2>
                <p className="text-gray-600 mb-6">
                  Chọn cài đặt và bắt đầu làm bài tập nhé!
                </p>
                <button
                  onClick={startNewSession}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl text-lg transition-colors"
                >
                  Bắt đầu học
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ScoreBoard score={score} />
            
            {currentProblem && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4 text-gray-800">Điều khiển</h3>
                <div className="space-y-3">
                  <button
                    onClick={generateNewProblem}
                    disabled={isAnswering}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                  >
                    🔄 Bài tiếp theo
                  </button>
                  <button
                    onClick={endSession}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                  >
                    🏁 Kết thúc
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      <SettingsPanel 
        settings={settings}
        onSettingsChange={handleSettingsChange}
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />

      {progress && (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${showProgress ? 'block' : 'hidden'}`}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Thống kê học tập</h2>
              <button
                onClick={() => setShowProgress(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <ProgressTracker progress={progress} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
