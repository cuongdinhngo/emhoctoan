# 🧮 Em Học Toán - Grade 3 Math Learning App

A Vietnamese math learning web application designed for Grade 3 students to practice basic arithmetic operations.

## Features

### Math Topics Covered
- **Bảng nhân/chia từ 1 đến 9** - Multiplication and division tables (1×1 to 9×9)
- **Phép cộng, phép trừ trong phạm vi 1000** - Addition and subtraction within 1000
- **Phép nhân, phép chia trong phạm vi 100** - Multiplication and division within 100

### Key Features
- 🎯 Random practice problems with immediate feedback
- 📊 Score tracking and progress monitoring
- ⚙️ Customizable problem types and difficulty
- 💾 Local storage for progress persistence
- 📱 Responsive design for tablets and desktops
- 🇻🇳 Vietnamese interface with kid-friendly design

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
git clone https://github.com/yourusername/emhoctoan.git
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
│   ├── ScoreBoard.tsx         # Current session score
│   ├── ProgressTracker.tsx    # Historical progress
│   └── SettingsPanel.tsx      # Choose problem types
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

1. **Start Learning**: Click "Bắt đầu học" to begin a new session
2. **Configure Settings**: Use the settings panel to choose which math topics to practice
3. **Answer Problems**: Type your answer and press Enter or click "Kiểm tra"
4. **Track Progress**: View your current score and overall statistics
5. **End Session**: Click "Kết thúc" to finish and save your progress

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
