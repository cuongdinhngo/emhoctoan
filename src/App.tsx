import { useState, useEffect } from 'react';
import { ProblemDisplay } from './components/ProblemDisplay';
import { AnswerInput } from './components/AnswerInput';
import { MultipleChoiceInput } from './components/MultipleChoiceInput';
import { QuestionList } from './components/QuestionList';
import { MobileDrawer } from './components/MobileDrawer';
// import { ScoreBoard } from './components/ScoreBoard';
import { ProgressTracker } from './components/ProgressTracker';
import { StudentSetup } from './components/StudentSetup';
import { TestResults } from './components/TestResults';
import { ProblemGenerator } from './utils/problemGenerator';
import { StorageManager } from './utils/storage';
import { ProblemSettings, ScoreData, ProgressData, SessionData, QuestionListItem } from './types';

type AppState = 'setup' | 'testing' | 'results';

function App() {
  const [appState, setAppState] = useState<AppState>('setup');
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [showProgress, setShowProgress] = useState(false);
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);
  // const [reviewingQuestionId, setReviewingQuestionId] = useState<string | null>(null);

  // Load saved data on mount
  useEffect(() => {
    const savedProgress = StorageManager.loadProgress();
    if (savedProgress) {
      setProgress(savedProgress);
    }

    const savedSession = StorageManager.loadSession();
    if (savedSession && !savedSession.isCompleted) {
      setSessionData(savedSession);
      setAppState('testing');
    }
  }, []);

  // Start new test
  const startTest = (settings: ProblemSettings) => {
    const problems = ProblemGenerator.generateUniqueProblems(
      settings.enabledTypes, 
      settings.questionQuantity, 
      settings.difficulty
    );

    const newSessionData: SessionData = {
      currentScore: { correct: 0, total: 0, streak: 0, bestStreak: 0 },
      problems,
      currentProblemIndex: 0,
      settings,
      startTime: Date.now(),
      isCompleted: false,
      totalMarks: settings.questionQuantity
    };

    setSessionData(newSessionData);
    setCurrentProblemIndex(0);
    setAppState('testing');
    StorageManager.saveSession(newSessionData);
  };

  // Handle answer submission
  const handleAnswerSubmit = (userAnswer: number) => {
    if (!sessionData) return;

    const currentProblem = sessionData.problems[currentProblemIndex];
    const isCorrect = userAnswer === currentProblem.answer;

    // Update the problem
    const updatedProblems = [...sessionData.problems];
    updatedProblems[currentProblemIndex] = {
      ...currentProblem,
      userAnswer,
      isCorrect,
      isAnswered: true
    };

    // Update score
    const newScore: ScoreData = {
      correct: sessionData.currentScore.correct + (isCorrect ? 1 : 0),
      total: sessionData.currentScore.total + 1,
      streak: isCorrect ? sessionData.currentScore.streak + 1 : 0,
      bestStreak: Math.max(sessionData.currentScore.bestStreak, isCorrect ? sessionData.currentScore.streak + 1 : sessionData.currentScore.streak)
    };

    const updatedSessionData: SessionData = {
      ...sessionData,
      currentScore: newScore,
      problems: updatedProblems
    };

    setSessionData(updatedSessionData);
    StorageManager.saveSession(updatedSessionData);

    // Auto-advance to next question after delay
    setTimeout(() => {
      if (currentProblemIndex < sessionData.problems.length - 1) {
        setCurrentProblemIndex(currentProblemIndex + 1);
      } else {
        // Test completed
        const completedSessionData: SessionData = {
          ...updatedSessionData,
          isCompleted: true
        };
        setSessionData(completedSessionData);
        StorageManager.saveSession(completedSessionData);
        StorageManager.updateProgress(newScore);
        setAppState('results');
      }
    }, 2000);
  };

  // Navigate to specific question
  const navigateToQuestion = (questionId: string) => {
    const questionIndex = sessionData?.problems.findIndex(p => p.id === questionId);
    if (questionIndex !== undefined && questionIndex >= 0) {
      setCurrentProblemIndex(questionIndex);
    }
  };

  // Review specific question
  const reviewQuestion = (questionId: string) => {
    // setReviewingQuestionId(questionId);
    const questionIndex = sessionData?.problems.findIndex(p => p.id === questionId);
    if (questionIndex !== undefined && questionIndex >= 0) {
      setCurrentProblemIndex(questionIndex);
    }
  };

  // Retake test
  const retakeTest = () => {
    if (sessionData) {
      const newProblems = ProblemGenerator.generateUniqueProblems(
        sessionData.settings.enabledTypes,
        sessionData.settings.questionQuantity,
        sessionData.settings.difficulty
      );

      const retakeSessionData: SessionData = {
        ...sessionData,
        currentScore: { correct: 0, total: 0, streak: 0, bestStreak: 0 },
        problems: newProblems,
        currentProblemIndex: 0,
        isCompleted: false
      };

      setSessionData(retakeSessionData);
      setCurrentProblemIndex(0);
      setAppState('testing');
      StorageManager.saveSession(retakeSessionData);
    }
  };

  // Start new test
  const startNewTest = () => {
    setSessionData(null);
    setCurrentProblemIndex(0);
    setAppState('setup');
    StorageManager.clearSession();
  };

  // Generate question list for sidebar
  const generateQuestionList = (): QuestionListItem[] => {
    if (!sessionData) return [];
    
    return sessionData.problems.map((problem, index) => ({
      id: problem.id,
      questionNumber: index + 1,
      isAnswered: problem.isAnswered,
      isCorrect: problem.isCorrect,
      isCurrent: index === currentProblemIndex
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          {/* Mobile Layout */}
          <div className="lg:hidden">
            {/* First Row: App Icon & User Name */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">🧮</div>
                <h1 className="text-xl font-bold text-gray-800">Em Học Toán - Lớp 3</h1>
              </div>
              {appState === 'testing' && sessionData && (
                <div className="text-sm text-gray-600">
                  <span className="font-semibold">{sessionData.settings.studentName}</span>
                </div>
              )}
            </div>
            
            {/* Second Row: Reset & Stats Buttons (only show during testing) */}
            {appState === 'testing' && sessionData && (
              <div className="flex gap-2">
                <button
                  onClick={startNewTest}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  🔄 Bắt đầu lại
                </button>
                <button
                  onClick={() => setShowProgress(true)}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  📊 Thống kê
                </button>
              </div>
            )}
          </div>

          {/* Web Layout */}
          <div className="hidden lg:flex lg:items-center lg:justify-between">
            {/* Left side: App Icon */}
            <div className="flex items-center space-x-3">
              <div className="text-3xl">🧮</div>
              <h1 className="text-2xl font-bold text-gray-800">Em Học Toán - Lớp 3</h1>
            </div>
            
            {/* Right side: User Name, Reset & Stats Buttons (only show during testing) */}
            {appState === 'testing' && sessionData && (
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                  <span className="font-semibold">{sessionData.settings.studentName}</span>
                </div>
                <button
                  onClick={startNewTest}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  🔄 Bắt đầu lại
                </button>
                <button
                  onClick={() => setShowProgress(true)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  📊 Thống kê
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {appState === 'setup' && (
          <StudentSetup 
            onStart={startTest}
            initialSettings={StorageManager.getDefaultSettings()}
          />
        )}

        {appState === 'testing' && sessionData && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Mobile Menu Button - Bottom Right */}
            <div className="lg:hidden fixed bottom-4 right-4 z-30">
              <button
                onClick={() => setShowMobileDrawer(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Mobile Drawer */}
            <MobileDrawer
              isOpen={showMobileDrawer}
              onClose={() => setShowMobileDrawer(false)}
              questions={generateQuestionList()}
              onQuestionSelect={navigateToQuestion}
              currentQuestionId={sessionData.problems[currentProblemIndex]?.id || ''}
            />

            {/* Desktop Question List Sidebar */}
            <div className="hidden lg:block lg:col-span-1">
              <QuestionList 
                questions={generateQuestionList()}
                onQuestionSelect={navigateToQuestion}
                currentQuestionId={sessionData.problems[currentProblemIndex]?.id || ''}
              />
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                <ProblemDisplay 
                  problem={sessionData.problems[currentProblemIndex]}
                  questionNumber={currentProblemIndex + 1}
                  totalQuestions={sessionData.problems.length}
                  showResult={sessionData.problems[currentProblemIndex].isAnswered}
                />
                
                
                {!sessionData.problems[currentProblemIndex].isAnswered && (
                  sessionData.problems[currentProblemIndex].questionType === 'multiple_choice' ? (
                    <MultipleChoiceInput
                      options={sessionData.problems[currentProblemIndex].options || []}
                      correctAnswer={sessionData.problems[currentProblemIndex].answer}
                      onAnswerSelect={handleAnswerSubmit}
                    />
                  ) : (
                    <AnswerInput 
                      onSubmit={handleAnswerSubmit}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {appState === 'results' && sessionData && (
          <TestResults 
            sessionData={sessionData}
            onReviewQuestion={reviewQuestion}
            onRetake={retakeTest}
            onNewTest={startNewTest}
          />
        )}
      </main>

      {/* Progress Modal */}
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
