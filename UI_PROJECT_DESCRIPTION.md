# Em Học Toán - UI Project Description

## Project Overview

**Em Học Toán** is a Vietnamese Grade 3 math learning web application built with React 18, TypeScript, and Tailwind CSS. The UI follows a kid-friendly, educational design pattern with a focus on clarity, engagement, and responsive design across desktop and mobile devices.

## Architecture & State Management

### Application State Flow
- **State Management**: React hooks (useState, useEffect) with LocalStorage persistence
- **App States**: Three main states managed via `appState`:
  - `'setup'`: Initial configuration phase
  - `'testing'`: Active test-taking phase
  - `'results'`: Test completion and review phase
- **Session Persistence**: All session data is saved to LocalStorage for recovery
- **State Container**: Main App component manages global state, passes props to child components

### Component Hierarchy
```
App (State Manager)
├── Header (Conditional rendering based on appState)
├── StudentSetup (Setup phase)
├── Testing View (Testing phase)
│   ├── QuestionList (Desktop sidebar)
│   ├── MobileDrawer (Mobile navigation)
│   ├── ProblemDisplay (Question display)
│   ├── AnswerInput (Text input for answers)
│   └── MultipleChoiceInput (Multiple choice buttons)
├── TestResults (Results phase)
└── ProgressTracker (Modal overlay)
```

## UI Components

### 1. **Header Component** (App.tsx inline)
- **Purpose**: Global navigation and user context
- **Layout**: Responsive with separate mobile/desktop layouts
- **Mobile**: Two-row layout (App title + student name, Action buttons)
- **Desktop**: Single-row layout (App title left, Student name + buttons right)
- **Features**:
  - Shows student name during testing
  - Reset button (🔄 Bắt đầu lại)
  - Statistics button (📊 Thống kê) - opens ProgressTracker modal
- **Styling**: White background, shadow-sm, max-width container

### 2. **StudentSetup Component**
- **Purpose**: Test configuration and initialization
- **Layout**: Centered card (max-w-2xl), white background, rounded-2xl, shadow-lg
- **Sections**:
  1. **Student Name Input**: Required text input with validation
  2. **Question Quantity**: Grid of 6 buttons (10, 15, 20, 25, 30, 50 questions)
     - Selected state: blue border, blue-50 background
     - Unselected: gray border, white background, hover effect
  3. **Problem Types**: Two-column grid (1 col mobile, 2 cols desktop)
     - Checkbox list with label + description
     - Counter display: "X / 18 đã chọn" (blue, semibold)
     - Each item: border, rounded-lg, hover:bg-gray-50
  4. **Difficulty**: Radio button group (Easy/Medium/Hard)
     - Each option shows label + description
  5. **Start Button**: Full-width, blue gradient, large text
- **Validation**: Alerts for missing name or no topics selected

### 3. **ProblemDisplay Component**
- **Purpose**: Display current math problem with metadata
- **Layout**: White card, rounded-2xl, shadow-lg, padding-8
- **Structure**:
  - **Header Section**: 
    - Question number (X/Y format)
    - Badges: Problem type (blue), Question type (green)
    - Responsive: Desktop (horizontal), Mobile (stacked)
  - **Question Section**:
    - Large centered text
    - **Smart Font Sizing**:
      - Word problems & Geometry: `text-2xl md:text-3xl`
      - Regular problems: `text-4xl md:text-6xl`
    - Leading-relaxed for longer text
  - **Answer Display Block** (shown after submission):
    - Separated by border-top-2
    - Gradient background: `from-blue-50 to-purple-50`
    - Shows: User answer (green if correct, red if wrong)
    - Shows: Correct answer (if wrong, in blue)
    - Result message with emoji
    - Fireworks animation for correct answers (🎆✨🎊)
- **Visual Feedback**: Color-coded answers, animations for success

### 4. **AnswerInput Component**
- **Purpose**: Text input for numeric answers
- **Layout**: Centered form, max-w-md
- **Features**:
  - Large number input (text-2xl, centered)
  - Auto-focus on mount
  - Enter key submission
  - Submit button (disabled when empty)
  - Visual feedback: green border/background when correct
- **Styling**: Rounded-xl, border-2, focus states

### 5. **MultipleChoiceInput Component**
- **Purpose**: Multiple choice answer selection
- **Layout**: 2-column grid, gap-3
- **Features**:
  - 4 options displayed as large buttons
  - Color states:
    - Default: white background, gray border
    - Selected: blue background, white text
    - Correct (after submission): green
    - Wrong (after submission): red
    - Unselected (after submission): gray
  - Hover effects: shadow-md
  - Disabled state after submission
- **Styling**: Large buttons (p-4), rounded-xl, bold text

### 6. **QuestionList Component** (Desktop Sidebar)
- **Purpose**: Navigation sidebar for desktop
- **Layout**: Fixed sidebar (col-span-1), white card, rounded-xl
- **Features**:
  - Scrollable list (max-h-96, overflow-y-auto)
  - Status indicators:
    - 📍 Current question (blue background)
    - ✅ Correct answer (green background)
    - ❌ Wrong answer (red background)
    - ⭕ Unanswered (gray background)
  - Shows question number and score (+1 or 0)
  - Click to navigate
  - Legend at bottom explaining icons
- **Styling**: Color-coded borders and backgrounds, hover effects

### 7. **MobileDrawer Component**
- **Purpose**: Slide-out navigation for mobile
- **Layout**: Fixed right-side drawer (w-80), full height
- **Features**:
  - Slide animation (translate-x transform)
  - Overlay backdrop (black bg-opacity-50)
  - Close button in header
  - Same question list as desktop
  - Auto-closes on question selection
  - Legend at bottom
- **Animation**: 300ms transition, ease-in-out

### 8. **TestResults Component**
- **Purpose**: Display test completion summary
- **Layout**: Centered card (max-w-4xl), white background
- **Sections**:
  1. **Header**: Title + student name
  2. **Score Summary**: 3-column grid (desktop)
     - Correct answers (blue-50)
     - Percentage (green-50)
     - Total questions (purple-50)
  3. **Grade Message**: Large text with emoji, color-coded by percentage
  4. **Question Review Grid**: 
     - 3-column grid (desktop), 2-column (tablet), 1-column (mobile)
     - Color-coded cards (green for correct, red for wrong)
     - Clickable to review individual questions
  5. **Action Buttons**: 
     - Retake test (yellow)
     - New test (blue)
- **Styling**: Color-coded backgrounds, rounded cards, hover effects

### 9. **ProgressTracker Component**
- **Purpose**: Display learning statistics
- **Layout**: Modal content, white card
- **Features**:
  - 2x2 grid of statistics:
    - Total sessions (blue-50)
    - Total problems (green-50)
    - Best streak (yellow-50)
    - Average score (purple-50)
  - Last played timestamp (formatted in Vietnamese)
- **Styling**: Color-coded stat cards, rounded-lg

## Design System

### Color Palette
- **Primary**: Blue (blue-500, blue-600) - Main actions, primary elements
- **Success**: Green (green-500, green-600) - Correct answers, success states
- **Error**: Red (red-500, red-600) - Wrong answers, errors
- **Warning**: Yellow (yellow-500, yellow-600) - Retake actions
- **Neutral**: Gray scale for backgrounds, borders, text
- **Accent**: Purple (purple-50, purple-500) - Gradients, accents

### Typography
- **Font Family**: Inter, system-ui, sans-serif
- **Headings**: Bold, various sizes (text-xl to text-3xl)
- **Body**: Regular weight, gray-600 to gray-800
- **Large Numbers**: text-4xl to text-6xl for questions
- **Responsive**: Smaller on mobile, larger on desktop

### Spacing & Layout
- **Container**: max-w-6xl (main), max-w-2xl (forms), max-w-4xl (results)
- **Padding**: Consistent p-4, p-6, p-8 based on component
- **Gaps**: gap-2, gap-3, gap-4, gap-6, gap-8 for grids and spacing
- **Margins**: mb-2, mb-4, mb-6, mb-8 for vertical spacing

### Border Radius
- **Cards**: rounded-xl, rounded-2xl
- **Buttons**: rounded-lg, rounded-xl
- **Inputs**: rounded-lg, rounded-xl
- **Badges**: rounded-full

### Shadows
- **Cards**: shadow-lg
- **Header**: shadow-sm
- **Hover**: shadow-md (on interactive elements)

### Responsive Breakpoints
- **Mobile First**: Base styles for mobile
- **md**: 768px+ (tablet)
- **lg**: 1024px+ (desktop)
- **Grid Patterns**:
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 3-4 columns

## User Flows

### Flow 1: Setup Phase
1. User lands on StudentSetup component
2. Enters student name (required)
3. Selects question quantity (6 options)
4. Selects problem types (checkboxes, shows counter)
5. Selects difficulty (radio buttons)
6. Clicks "Bắt đầu kiểm tra"
7. Validation checks, then transitions to testing phase

### Flow 2: Testing Phase
1. **Desktop Layout**:
   - Left sidebar: QuestionList (1/4 width)
   - Main area: ProblemDisplay + Input (3/4 width)
2. **Mobile Layout**:
   - Full-width ProblemDisplay + Input
   - Floating menu button (bottom-right)
   - Drawer slides in from right when opened
3. User answers question (input or multiple choice)
4. Answer submitted, feedback shown (2-second delay)
5. Auto-advances to next question
6. QuestionList updates with status indicators
7. Can manually navigate via sidebar/drawer
8. Header shows reset and stats buttons

### Flow 3: Results Phase
1. Test completion triggers results view
2. Score summary displayed (3 stats)
3. Grade message shown with emoji
4. Question review grid (all questions clickable)
5. Can review individual questions
6. Can retake test (new questions)
7. Can start new test (back to setup)

## Responsive Design Patterns

### Mobile (< 1024px)
- **Header**: Stacked layout, two rows
- **Question Navigation**: Floating button + drawer
- **Problem Display**: Full width, stacked badges
- **Grids**: 1-2 columns
- **Font Sizes**: Smaller base sizes
- **Spacing**: Reduced padding/margins

### Desktop (≥ 1024px)
- **Header**: Horizontal layout, single row
- **Question Navigation**: Fixed sidebar
- **Problem Display**: Full width, horizontal badges
- **Grids**: 2-4 columns
- **Font Sizes**: Larger base sizes
- **Spacing**: Full padding/margins

## Interactive Elements

### Buttons
- **Primary**: Blue background, white text, hover darkens
- **Secondary**: Gray background
- **Success**: Green background
- **Warning**: Yellow background
- **States**: hover, disabled, active
- **Transitions**: 200ms duration

### Inputs
- **Focus States**: Blue ring, blue border
- **Validation**: Visual feedback (green for correct)
- **Disabled**: Gray background, not-allowed cursor

### Cards
- **Hover**: Shadow increase, slight scale
- **Selection**: Border color change, background tint
- **Status**: Color-coded (green/red/blue/gray)

## Animation & Transitions

### Animations
- **Fireworks**: Bounce, pulse, ping (for correct answers)
- **Drawer**: Slide-in from right (300ms)
- **Modal**: Fade-in overlay
- **Hover**: Shadow and color transitions (200ms)

### Transitions
- **Color Changes**: 200ms duration
- **Transform**: 300ms duration, ease-in-out
- **Auto-advance**: 2-second delay after answer

## Accessibility Considerations

- **Semantic HTML**: Proper form elements, labels
- **Keyboard Navigation**: Enter key for submission
- **Focus States**: Visible focus rings
- **Color Contrast**: WCAG compliant color combinations
- **Screen Reader**: Proper labels and ARIA attributes (can be enhanced)

## Performance Optimizations

- **Conditional Rendering**: Components only render when needed
- **LocalStorage**: Efficient session persistence
- **State Management**: Minimal re-renders with proper state structure
- **Responsive Images**: None (text-based UI)
- **Code Splitting**: Can be added for production

## Constants & Configuration

- **Problem Types**: Centralized in `constants/problemTypes.ts`
- **Labels**: Vietnamese labels for all problem types
- **Configurations**: Problem type definitions with labels and descriptions
- **Reusability**: Constants used across multiple components

## Future Enhancement Opportunities

1. **Accessibility**: Add ARIA labels, keyboard shortcuts
2. **Animations**: More micro-interactions
3. **Themes**: Dark mode support
4. **Internationalization**: Multi-language support
5. **Accessibility**: Screen reader improvements
6. **Performance**: Code splitting, lazy loading
7. **Testing**: Component testing setup

---

This UI description serves as a comprehensive guide for understanding the project's structure, design patterns, and implementation details for engineering purposes.

