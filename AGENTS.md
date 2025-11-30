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

### Math Topics Covered (18 Topics)

#### Basic Arithmetic
- **Bảng nhân/chia từ 1 đến 9**: Multiplication and division tables (1×1 to 9×9)
- **Phép cộng, phép trừ trong phạm vi 1000**: Addition and subtraction within 1000
- **Phép nhân, phép chia trong phạm vi 100**: Multiplication and division within 100

#### Advanced Arithmetic
- **Nhân số có hai chữ số với số có một chữ số**: Two-digit × one-digit multiplication
- **Chia số có hai chữ số cho số có một chữ số**: Two-digit ÷ one-digit division
- **Nhân số có ba chữ số với số có một chữ số**: Three-digit × one-digit multiplication
- **Chia số có ba chữ số cho số có một chữ số**: Three-digit ÷ one-digit division
- **Phép chia hết, phép chia có dư**: Division with and without remainders

#### Word Problems (Giải toán có lời văn)
- **Dạng toán về hơn kém số đơn vị**: Problems about more/less by a certain number
- **Dạng toán về gấp số lần, giảm số lần**: Problems about multiplying/dividing by a certain number
- **Dạng toán liên quan đến rút về đơn vị**: Problems related to unit conversion/reduction

#### Geometry (Hình học)
- **Điểm ở giữa - Trung điểm của đoạn thẳng**: Midpoint of a line segment
- **Hình tròn: tâm, bán kính, đường kính**: Circle: center, radius, diameter
- **Hình chữ nhật, chu vi, diện tích**: Rectangle: perimeter and area
- **Hình vuông, chu vi, diện tích**: Square: perimeter and area

### Key Functionality
- ✅ Random problem generation based on selected types
- ✅ Answer validation with immediate feedback
- ✅ Score tracking (correct/total attempts)
- ✅ Progress history stored in LocalStorage
- ✅ Vietnamese interface with kid-friendly design
- ✅ Responsive layout for tablets/desktops
- ✅ Settings panel for customizing problem types
- ✅ Progress statistics and session management

## Project Structure
```
src/
├── components/
│   ├── ProblemDisplay.tsx    # Shows current math problem
│   ├── AnswerInput.tsx        # Input field for answers
│   ├── MultipleChoiceInput.tsx # Multiple choice question input
│   ├── QuestionList.tsx      # Question navigation sidebar
│   ├── StudentSetup.tsx      # Test setup and configuration
│   ├── TestResults.tsx        # Test results and review page
│   ├── ScoreBoard.tsx         # Current session score
│   ├── ProgressTracker.tsx    # Historical progress
│   ├── SettingsPanel.tsx      # Choose problem types
│   └── MobileDrawer.tsx       # Mobile navigation drawer
├── constants/                 # Application constants
│   └── problemTypes.ts        # Problem type definitions and labels
├── utils/
│   ├── problemGenerator.ts    # Generate random problems
│   └── storage.ts             # LocalStorage helpers
├── types/
│   └── index.ts               # TypeScript types
├── App.tsx                    # Main app component
├── main.tsx                   # App entry point
└── index.css                  # Global styles
```

## Development Status
- ✅ Project setup with React + Vite + TypeScript
- ✅ Tailwind CSS configuration
- ✅ Problem generator utility for all 18 math types
- ✅ UI components (ProblemDisplay, AnswerInput, MultipleChoiceInput, QuestionList, StudentSetup, TestResults, ScoreBoard, ProgressTracker, SettingsPanel, MobileDrawer)
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

## Version 2.0+ Features (NEW!)
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
- ✅ **Comprehensive Coverage**: 18 total math topics covering full Vietnamese Grade 3 curriculum

## Next Steps
1. Run `npm install` to install dependencies
2. Run `npm run dev` to start development server
3. Run `npm run build` to build for production
4. Run `npm run deploy` to deploy to GitHub Pages

## Usage Instructions (Version 2.0)

### Setup Phase
1. **Enter Student Name**: Input the student's name for personalized experience
2. **Select Question Quantity**: Choose number of questions (10-50, default 25)
3. **Choose Math Topics**: Select from 18 available math topics including:
   - Basic arithmetic (addition, subtraction, multiplication, division)
   - Advanced arithmetic (multi-digit operations)
   - Word problems (3 types)
   - Geometry (4 types)
4. **Set Difficulty**: Choose easy, medium, or hard difficulty level
5. **Start Test**: Click "Bắt đầu kiểm tra" to begin

### Testing Phase
1. **Navigate Questions**: Use the left sidebar (desktop) or menu button (mobile) to jump to any question
2. **Answer Questions**: 
   - Multiple choice: Click on the correct answer
   - Input questions: Type your answer and press Enter
3. **Track Progress**: See your current score and question status in real-time
4. **Review Answers**: View your answer and the correct answer in a separate answer block after submission
5. **Reset Anytime**: Click "🔄 Bắt đầu lại" to restart with new questions

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
