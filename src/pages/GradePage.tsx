import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ProblemDisplay } from '../components/ProblemDisplay';
import { AnswerInput } from '../components/AnswerInput';
import { MultipleChoiceInput } from '../components/MultipleChoiceInput';
import { QuestionList } from '../components/QuestionList';
import { MobileDrawer } from '../components/MobileDrawer';
import { ProgressTracker } from '../components/ProgressTracker';
import { StudentSetup } from '../components/StudentSetup';
import { TestResults } from '../components/TestResults';
import { Button } from '../components/ui/Button';
import { MenuIcon, XIcon } from '../components/ui/icons';
import { ProblemGenerator } from '../utils/problemGenerator';
import { StorageManager } from '../utils/storage';
import { ProblemSettings, ScoreData, ProgressData, SessionData, QuestionListItem } from '../types';
import { Grade, getGradeByRoute } from '../constants/grades';

type AppState = 'setup' | 'testing' | 'results';

export const GradePage = () => {
  const location = useLocation();

  // Determine grade from URL path
  const gradeConfig = getGradeByRoute(location.pathname);
  const grade: Grade = gradeConfig?.id || 'grade3';

  const [appState, setAppState] = useState<AppState>('setup');
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [showProgress, setShowProgress] = useState(false);
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);

  // Load saved data on mount
  useEffect(() => {
    const savedProgress = StorageManager.loadProgress(grade);
    if (savedProgress) {
      setProgress(savedProgress);
    }

    const savedSession = StorageManager.loadSession(grade);
    if (savedSession && !savedSession.isCompleted) {
      setSessionData(savedSession);
      setAppState('testing');
    }
  }, [grade]);

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
      settings: { ...settings, grade },
      startTime: Date.now(),
      isCompleted: false,
      totalMarks: settings.questionQuantity
    };

    setSessionData(newSessionData);
    setCurrentProblemIndex(0);
    setAppState('testing');
    StorageManager.saveSession(newSessionData, grade);
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
    StorageManager.saveSession(updatedSessionData, grade);

    // Auto-advance to next question after delay (but NOT on last question)
    setTimeout(() => {
      if (currentProblemIndex < sessionData.problems.length - 1) {
        setCurrentProblemIndex(currentProblemIndex + 1);
      }
    }, 2000);
  };

  // Handle text answer submission (for text-based MCQ like clock questions)
  const handleTextAnswerSubmit = (userTextAnswer: string) => {
    if (!sessionData) return;

    const currentProblem = sessionData.problems[currentProblemIndex];

    // For text MCQ, compare with textAnswer directly
    const isCorrect = userTextAnswer === currentProblem.textAnswer;

    // Update the problem
    const updatedProblems = [...sessionData.problems];
    updatedProblems[currentProblemIndex] = {
      ...currentProblem,
      userTextAnswer,
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
    StorageManager.saveSession(updatedSessionData, grade);

    // Auto-advance to next question after delay (but NOT on last question)
    setTimeout(() => {
      if (currentProblemIndex < sessionData.problems.length - 1) {
        setCurrentProblemIndex(currentProblemIndex + 1);
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

  // Submit quiz - called when student clicks "Nop bai"
  const submitQuiz = () => {
    if (!sessionData) return;

    const completedSessionData: SessionData = {
      ...sessionData,
      isCompleted: true
    };
    setSessionData(completedSessionData);
    StorageManager.saveSession(completedSessionData, grade);
    StorageManager.updateProgress(sessionData.currentScore, grade);
    setAppState('results');
  };

  // Check if all questions are answered
  const allQuestionsAnswered = sessionData?.problems.every(p => p.isAnswered) ?? false;

  // Review specific question
  const reviewQuestion = (questionId: string) => {
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
      StorageManager.saveSession(retakeSessionData, grade);
    }
  };

  // Start new test
  const startNewTest = () => {
    setSessionData(null);
    setCurrentProblemIndex(0);
    setAppState('setup');
    StorageManager.clearSession(grade);
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
    <div className="min-h-[100dvh] bg-base">
      {/* Header */}
      <header className="border-b border-line bg-surface">
        <div className="max-w-6xl mx-auto px-4 py-4">
          {/* Mobile Layout */}
          <div className="lg:hidden">
            {/* First Row: App Icon & User Name */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Link to="/" className="text-3xl transition-opacity hover:opacity-80" aria-label="Về trang chủ">&#129518;</Link>
                <h1 className="font-display text-xl font-bold text-ink">Em Học Toán · {gradeConfig?.shortLabel}</h1>
              </div>
              {appState === 'testing' && sessionData && (
                <div className="text-sm text-ink-muted">
                  <span className="font-semibold text-ink">{sessionData.settings.studentName}</span>
                </div>
              )}
            </div>

            {/* Second Row: Reset & Stats Buttons (only show during testing) */}
            {appState === 'testing' && sessionData && (
              <div className="flex gap-2">
                <Button variant="ghost" fullWidth onClick={startNewTest}>Bắt đầu lại</Button>
                <Button variant="primary" fullWidth onClick={() => setShowProgress(true)}>Thống kê</Button>
              </div>
            )}
          </div>

          {/* Web Layout */}
          <div className="hidden lg:flex lg:items-center lg:justify-between">
            {/* Left side: App Icon */}
            <div className="flex items-center space-x-3">
              <Link to="/" className="text-3xl transition-opacity hover:opacity-80" aria-label="Về trang chủ">&#129518;</Link>
              <h1 className="font-display text-2xl font-bold text-ink">Em Học Toán · {gradeConfig?.shortLabel}</h1>
            </div>

            {/* Right side: User Name, Reset & Stats Buttons (only show during testing) */}
            {appState === 'testing' && sessionData && (
              <div className="flex items-center space-x-4">
                <div className="text-sm text-ink-muted">
                  <span className="font-semibold text-ink">{sessionData.settings.studentName}</span>
                </div>
                <Button variant="ghost" onClick={startNewTest}>Bắt đầu lại</Button>
                <Button variant="primary" onClick={() => setShowProgress(true)}>Thống kê</Button>
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
            initialSettings={StorageManager.getDefaultSettings(grade)}
            grade={grade}
          />
        )}

        {appState === 'testing' && sessionData && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Mobile Menu Button - Bottom Right */}
            <div className="lg:hidden fixed bottom-4 right-4 z-30">
              <button
                onClick={() => setShowMobileDrawer(true)}
                aria-label="Mở danh sách câu hỏi"
                className="flex h-touch w-touch items-center justify-center rounded-pill bg-primary text-white shadow-card-hover transition-colors hover:bg-primary-strong focus-visible:outline-none focus-visible:shadow-focus active:translate-y-[2px]"
              >
                <MenuIcon />
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


                {!sessionData.problems[currentProblemIndex].isAnswered && (() => {
                  const currentProblem = sessionData.problems[currentProblemIndex];
                  const hasTextOptions = currentProblem.textOptions && currentProblem.textOptions.length > 0;

                  if (currentProblem.questionType === 'multiple_choice') {
                    if (hasTextOptions) {
                      // Text-based MCQ (e.g., clock questions)
                      return (
                        <MultipleChoiceInput
                          textOptions={currentProblem.textOptions}
                          correctTextAnswer={currentProblem.textAnswer}
                          onTextAnswerSelect={handleTextAnswerSubmit}
                        />
                      );
                    } else {
                      // Numeric MCQ
                      return (
                        <MultipleChoiceInput
                          options={currentProblem.options || []}
                          correctAnswer={currentProblem.answer}
                          onAnswerSelect={handleAnswerSubmit}
                        />
                      );
                    }
                  } else {
                    return (
                      <AnswerInput
                        onSubmit={handleAnswerSubmit}
                      />
                    );
                  }
                })()}

                {/* Submit Quiz Button - appears when all questions are answered */}
                {allQuestionsAnswered && (
                  <div className="mt-6 animate-slide-up">
                    <Button variant="success" size="lg" fullWidth onClick={submitQuiz}>
                      Nộp bài
                    </Button>
                  </div>
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
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 ${showProgress ? 'block' : 'hidden'}`}>
          <div className="w-full max-w-md rounded-xl bg-surface p-6 shadow-card-hover">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-ink">Thống kê học tập</h2>
              <button
                onClick={() => setShowProgress(false)}
                aria-label="Đóng"
                className="flex h-touch w-touch items-center justify-center rounded-pill text-ink-muted transition-colors hover:bg-base hover:text-ink focus-visible:outline-none focus-visible:shadow-focus"
              >
                <XIcon />
              </button>
            </div>
            <ProgressTracker progress={progress} />
          </div>
        </div>
      )}
    </div>
  );
};
