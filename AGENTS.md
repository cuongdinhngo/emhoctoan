# Em Học Toán - Grade 3 Math Learning App

## Project Overview
A Vietnamese math learning web application designed for Grade 3 students to practice basic arithmetic operations with random problems, scoring, and progress tracking.

## Tech Stack
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **State Management**: React hooks + LocalStorage
- **Deployment**: GitHub Pages

## Core Features Implemented

### Math Topics Covered (26 Topics)

#### Basic Arithmetic (6 topics)
- **Bảng nhân từ 1 đến 9**: Multiplication tables (1×1 to 9×9)
- **Bảng chia từ 1 đến 9**: Division tables (1÷1 to 81÷9)
- **Phép cộng trong phạm vi 1000**: Addition within 1000
- **Phép trừ trong phạm vi 1000**: Subtraction within 1000
- **Phép nhân trong phạm vi 100**: Multiplication within 100
- **Phép chia trong phạm vi 100**: Division within 100

#### Advanced Arithmetic (5 topics)
- **Nhân số có hai chữ số với số có một chữ số**: Two-digit × one-digit multiplication
- **Chia số có hai chữ số cho số có một chữ số**: Two-digit ÷ one-digit division
- **Nhân số có ba chữ số với số có một chữ số**: Three-digit × one-digit multiplication
- **Chia số có ba chữ số cho số có một chữ số**: Three-digit ÷ one-digit division
- **Phép chia hết, phép chia có dư**: Division with and without remainders

#### Word Problems (4 topics)
- **Dạng toán về hơn kém số đơn vị**: Problems about more/less by a certain number
- **Dạng toán về gấp số lần, giảm số lần**: Problems about multiplying/dividing by a certain number
- **Dạng toán liên quan đến rút về đơn vị**: Problems related to unit conversion/reduction
- **Dạng toán chia có dư**: Word problems with division remainder

#### Geometry (4 topics)
- **Điểm ở giữa - Trung điểm của đoạn thẳng**: Midpoint of a line segment
- **Hình tròn: tâm, bán kính, đường kính**: Circle: center, radius, diameter
- **Hình chữ nhật, chu vi, diện tích**: Rectangle: perimeter and area
- **Hình vuông, chu vi, diện tích**: Square: perimeter and area

#### Review Topics (7 topics)
- **Xem đồng hồ**: Clock reading with analog clock display
- **Tìm 1/n của số**: Find fraction of a number (1/2, 1/3, 1/4, 1/5)
- **Đặt tính rồi tính**: Written calculation (multi-digit operations)
- **Độ dài đường gấp khúc**: Broken line length calculation
- **Điền số vào ô trống**: Chain calculation (multiply/divide sequences)
- **Tìm số còn thiếu**: Find missing number in equations (? × 6 = 48)
- **Ôn tập Học kỳ 1**: Semester 1 comprehensive review (14 mixed types)

### Key Functionality
- ✅ Random problem generation based on selected types
- ✅ Answer validation with immediate feedback
- ✅ Score tracking (correct/total attempts)
- ✅ Progress history stored in LocalStorage
- ✅ Vietnamese interface with kid-friendly design
- ✅ Responsive layout for tablets/desktops
- ✅ Settings panel for customizing problem types
- ✅ Progress statistics and session management
- ✅ Analog clock component for visual time reading
- ✅ Semester 1 review with guaranteed coverage of all 14 types
- ✅ Manual quiz submission (explicit "Nộp bài" button)

## Project Structure
```
src/
├── components/
│   ├── AnalogClock.tsx        # Analog clock display for time reading questions
│   ├── ProblemDisplay.tsx     # Shows current math problem with type badges
│   ├── AnswerInput.tsx        # Input field for numeric answers
│   ├── MultipleChoiceInput.tsx # Multiple choice question input
│   ├── QuestionList.tsx       # Question navigation sidebar (desktop)
│   ├── StudentSetup.tsx       # Test setup, topic selection, quantity
│   ├── TestResults.tsx        # Test results and review page
│   ├── ScoreBoard.tsx         # Current session score display
│   ├── ProgressTracker.tsx    # Historical progress statistics
│   ├── SettingsPanel.tsx      # Choose problem types
│   └── MobileDrawer.tsx       # Mobile navigation drawer
├── constants/
│   └── problemTypes.ts        # Problem type labels and configurations
├── utils/
│   ├── storage.ts             # LocalStorage helpers for persistence
│   └── problemGenerator/      # Modular problem generation system
│       ├── index.ts           # Public API export
│       ├── core.ts            # Main ProblemGenerator class
│       ├── helpers.ts         # Shared utilities (random, options)
│       ├── deduplication.ts   # Question normalization for uniqueness
│       └── generators/
│           ├── arithmetic.ts  # Basic: +, -, ×, ÷
│           ├── tables.ts      # Multiplication/Division tables
│           ├── advanced.ts    # 2-digit, 3-digit operations
│           ├── wordProblems.ts# All word problem types
│           ├── geometry.ts    # Geometry problems
│           └── review.ts      # Review/mixed problems + clock
├── types/
│   └── index.ts               # TypeScript type definitions
├── App.tsx                    # Main app component with state management
├── main.tsx                   # App entry point
└── index.css                  # Global Tailwind styles
```

## Problem Generator Architecture

The problem generator was refactored from a single 1,625-line file into a modular structure:

### Module Organization
| File | Lines | Purpose |
|------|-------|---------|
| `index.ts` | ~1 | Public API export |
| `core.ts` | ~150 | Main orchestration, `generateProblem()`, `generateUniqueProblems()` |
| `helpers.ts` | ~70 | `getRandomInt()`, `generateMultipleChoiceOptions()`, `createProblem()` |
| `deduplication.ts` | ~95 | `createNormalizedQuestionKey()` for avoiding duplicates |
| `generators/arithmetic.ts` | ~105 | Addition, subtraction, multiplication, division |
| `generators/tables.ts` | ~25 | Multiplication and division tables |
| `generators/advanced.ts` | ~150 | Two-digit and three-digit operations |
| `generators/wordProblems.ts` | ~190 | All 4 word problem types |
| `generators/geometry.ts` | ~120 | Midpoint, circle, rectangle, square |
| `generators/review.ts` | ~360 | Clock reading, fractions, chain calc, fill blank |

### Public API
```typescript
import { ProblemGenerator } from './utils/problemGenerator';

// Generate unique problems for a quiz
ProblemGenerator.generateUniqueProblems(
  enabledTypes: ProblemType[],
  quantity: number,
  difficulty: 'easy' | 'medium' | 'hard'
): MathProblem[]
```

## Development Status
- ✅ Project setup with React + Vite + TypeScript
- ✅ Tailwind CSS configuration
- ✅ Modular problem generator for all 26 math types
- ✅ UI components (12 components)
- ✅ Constants management system for centralized problem type definitions
- ✅ LocalStorage helpers for progress tracking
- ✅ State management and scoring logic integration
- ✅ Kid-friendly responsive design with Tailwind
- ✅ GitHub Pages deployment configuration
- ✅ Smart duplicate prevention system
- ✅ Advanced difficulty-based question generation
- ✅ Comprehensive Grade 3 Vietnamese math curriculum coverage
- ✅ Enhanced UI with smart font sizing for word problems and geometry
- ✅ Improved answer display with separate answer blocks
- ✅ Analog clock component with visual display
- ✅ Semester 1 review mode with all 14 types guaranteed
- ✅ Manual quiz submission flow (no auto-submit on last question)
- ✅ Original type badge display for review questions

## Version History

### Version 3.0 (Current)
- ✅ **Refactored Problem Generator**: Split 1,625-line monolith into modular folder structure
- ✅ **8 New Problem Types**: Clock reading, fractions, written calc, broken line, chain calc, fill blank, word problem division remainder, semester 1 review
- ✅ **Analog Clock Component**: Visual clock display for time reading questions
- ✅ **Semester 1 Review Mode**: Comprehensive review with 14 problem types, minimum 14 questions
- ✅ **Manual Quiz Submission**: "Nộp bài" button instead of auto-submit on last question
- ✅ **Type Badge Enhancement**: Shows original problem type alongside review badge
- ✅ **Total Topics**: 26 math topics covering full Grade 3 curriculum

### Version 2.0
- ✅ **Student Name Input**: Personalized experience with student name
- ✅ **Question Quantity Setting**: Configurable number of questions (10-50, default 25)
- ✅ **Question List Navigation**: Left sidebar (desktop) and drawer (mobile) with clickable question list
- ✅ **Multiple Choice Questions**: Support for both input and multiple choice formats
- ✅ **Answer Review System**: Review all answers with correct/incorrect indicators
- ✅ **Test Results Page**: Comprehensive results with grade messages and statistics
- ✅ **Question Navigation**: Jump to any question during the test
- ✅ **Retake Functionality**: Retake the same test or start a new one
- ✅ **Enhanced UI**: Better layout with question list sidebar and improved navigation
- ✅ **Reset Button**: Easy restart functionality during testing
- ✅ **Smart Difficulty Logic**: Proper difficulty ranges for each level (Easy/Medium/Hard)
- ✅ **Duplicate Prevention**: No duplicate questions like 8×5 and 5×8 in same test
- ✅ **Word Problems**: 3 types of word problems (more/less, multiply/divide, unit conversion)
- ✅ **Geometry Topics**: 4 geometry topics (midpoint, circle, rectangle, square)
- ✅ **Smart Font Sizing**: Smaller fonts for word problems and geometry questions
- ✅ **Enhanced Answer Display**: Separate answer block with gradient background
- ✅ **Constants Management**: Centralized problem type definitions in constants folder

## Next Steps
1. Run `npm install` to install dependencies
2. Run `npm run dev` to start development server
3. Run `npm run build` to build for production
4. Run `npm run deploy` to deploy to GitHub Pages

## Usage Instructions

### Setup Phase
1. **Enter Student Name**: Input the student's name for personalized experience
2. **Select Question Quantity**: Choose number of questions (10-50, default 25)
3. **Choose Math Topics**: Select from 26 available math topics including:
   - Basic arithmetic (addition, subtraction, multiplication, division)
   - Advanced arithmetic (multi-digit operations)
   - Word problems (4 types)
   - Geometry (4 types)
   - Review topics (7 types including Semester 1 comprehensive review)
4. **Set Difficulty**: Choose easy, medium, or hard difficulty level
5. **Start Test**: Click "Bắt đầu kiểm tra" to begin

### Testing Phase
1. **Navigate Questions**: Use the left sidebar (desktop) or menu button (mobile) to jump to any question
2. **Answer Questions**:
   - Multiple choice: Click on the correct answer
   - Input questions: Type your answer and press Enter
3. **Track Progress**: See your current score and question status in real-time
4. **Review Answers**: View your answer and the correct answer in a separate answer block after submission
5. **Submit Quiz**: Click "Nộp bài" button when all questions are answered
6. **Reset Anytime**: Click "🔄 Bắt đầu lại" to restart with new questions

### Results Phase
1. **View Results**: See your total score, percentage, and grade message
2. **Review All Questions**: Click on any question to see detailed results
3. **Retake Test**: Click "Làm lại bài này" to retake with new questions
4. **New Test**: Click "Bài kiểm tra mới" to start a completely new test

## Student Feedback
- ✅ **Tested and loved by target user** (Grade 3 student)
- ✅ **Engaging and educational** experience
- ✅ **Appropriate difficulty** for Vietnamese Grade 3 curriculum
- ✅ **User-friendly interface** with clear navigation
