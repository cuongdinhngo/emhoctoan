# 🧮 Em Học Toán - Grade 3 Math Learning App

A Vietnamese math learning web application designed for Grade 3 students to practice basic arithmetic operations with comprehensive curriculum coverage.

## Features

### Math Topics Covered (18 Topics)

#### Basic Arithmetic
- **Bảng nhân/chia từ 1 đến 9** - Multiplication and division tables (1×1 to 9×9)
- **Phép cộng, phép trừ trong phạm vi 1000** - Addition and subtraction within 1000
- **Phép nhân, phép chia trong phạm vi 100** - Multiplication and division within 100

#### Advanced Arithmetic
- **Nhân số có hai chữ số với số có một chữ số** - Two-digit × one-digit multiplication
- **Chia số có hai chữ số cho số có một chữ số** - Two-digit ÷ one-digit division
- **Nhân số có ba chữ số với số có một chữ số** - Three-digit × one-digit multiplication
- **Chia số có ba chữ số cho số có một chữ số** - Three-digit ÷ one-digit division
- **Phép chia hết, phép chia có dư** - Division with and without remainders

#### Word Problems (Giải toán có lời văn)
- **Dạng toán về hơn kém số đơn vị** - Problems about more/less by a certain number
- **Dạng toán về gấp số lần, giảm số lần** - Problems about multiplying/dividing by a certain number
- **Dạng toán liên quan đến rút về đơn vị** - Problems related to unit conversion/reduction

#### Geometry (Hình học)
- **Điểm ở giữa - Trung điểm của đoạn thẳng** - Midpoint of a line segment
- **Hình tròn: tâm, bán kính, đường kính** - Circle: center, radius, diameter
- **Hình chữ nhật, chu vi, diện tích** - Rectangle: perimeter and area
- **Hình vuông, chu vi, diện tích** - Square: perimeter and area

### Key Features
- 🎯 Random practice problems with immediate feedback
- 📊 Score tracking and progress monitoring
- ⚙️ Customizable problem types and difficulty (Easy/Medium/Hard)
- 💾 Local storage for progress persistence
- 📱 Responsive design for tablets and desktops
- 🇻🇳 Vietnamese interface with kid-friendly design
- 👤 Personalized experience with student name input
- 📝 Multiple choice and input question formats
- 📋 Question list navigation sidebar
- 📈 Comprehensive test results with grade messages
- 🔄 Retake and reset functionality
- 🎨 Enhanced UI with better answer display

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **State Management**: React hooks + LocalStorage
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/cuongdinhngo/emhoctoan.git
cd emhoctoan
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

### Deploying to GitHub Pages

```bash
npm run deploy
```

## Project Structure

```
src/
├── components/          # React components
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
├── constants/           # Application constants
│   └── problemTypes.ts        # Problem type definitions and labels
├── utils/               # Utility functions
│   ├── problemGenerator.ts    # Generate random problems
│   └── storage.ts             # LocalStorage helpers
├── types/               # TypeScript type definitions
│   └── index.ts
├── App.tsx              # Main app component
├── main.tsx             # App entry point
└── index.css            # Global styles
```

## Usage

### Setup Phase
1. **Enter Student Name**: Input the student's name for personalized experience
2. **Select Question Quantity**: Choose number of questions (10-50, default 25)
3. **Choose Math Topics**: Select from 18 available math topics covering Vietnamese Grade 3 curriculum
4. **Set Difficulty**: Choose easy, medium, or hard difficulty level
5. **Start Test**: Click "Bắt đầu kiểm tra" to begin

### Testing Phase
1. **Navigate Questions**: Use the left sidebar (desktop) or menu button (mobile) to jump to any question
2. **Answer Questions**: 
   - Multiple choice: Click on the correct answer
   - Input questions: Type your answer and press Enter
3. **Track Progress**: See your current score and question status in real-time
4. **Review Answers**: View your answer and the correct answer after submission
5. **Reset Anytime**: Click "🔄 Bắt đầu lại" to restart with new questions

### Results Phase
1. **View Results**: See your total score, percentage, and grade message
2. **Review All Questions**: Click on any question to see detailed results
3. **Retake Test**: Click "Làm lại bài này" to retake with new questions
4. **New Test**: Click "Bài kiểm tra mới" to start a completely new test

## Recent Updates

### Version 2.0+ Features
- ✅ **18 Math Topics**: Comprehensive coverage of Vietnamese Grade 3 curriculum
- ✅ **Word Problems**: 3 types of word problems (more/less, multiply/divide, unit conversion)
- ✅ **Geometry**: 4 geometry topics (midpoint, circle, rectangle, square)
- ✅ **Smart Font Sizing**: Smaller fonts for word problems and geometry questions
- ✅ **Enhanced Answer Display**: Separate answer block with gradient background
- ✅ **Constants Management**: Centralized problem type definitions for easier maintenance
- ✅ **Improved UI/UX**: Better visual feedback and question navigation

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Designed for Vietnamese Grade 3 mathematics curriculum
- Built with modern web technologies for optimal learning experience
