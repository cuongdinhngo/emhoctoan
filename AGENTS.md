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

### Math Topics Covered
- **Bảng nhân/chia từ 1 đến 9**: Multiplication and division tables (1×1 to 9×9)
- **Phép cộng, phép trừ trong phạm vi 1000**: Addition and subtraction within 1000
- **Phép nhân, phép chia trong phạm vi 100**: Multiplication and division within 100

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
│   ├── ScoreBoard.tsx         # Current session score
│   ├── ProgressTracker.tsx    # Historical progress
│   └── SettingsPanel.tsx      # Choose problem types
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
- ✅ Problem generator utility for all math types
- ✅ UI components (ProblemDisplay, AnswerInput, ScoreBoard, ProgressTracker, SettingsPanel)
- ✅ LocalStorage helpers for progress tracking
- ✅ State management and scoring logic integration
- ✅ Kid-friendly responsive design with Tailwind
- ✅ GitHub Pages deployment configuration

## Next Steps
1. Run `npm install` to install dependencies
2. Run `npm run dev` to start development server
3. Run `npm run build` to build for production
4. Run `npm run deploy` to deploy to GitHub Pages

## Usage Instructions
1. **Start Learning**: Click "Bắt đầu học" to begin a new session
2. **Configure Settings**: Use the settings panel to choose which math topics to practice
3. **Answer Problems**: Type your answer and press Enter or click "Kiểm tra"
4. **Track Progress**: View your current score and overall statistics
5. **End Session**: Click "Kết thúc" to finish and save your progress
