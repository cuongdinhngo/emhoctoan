import { MathProblem, ProblemType, QuestionType } from '../../../types';
import { Difficulty, getRandomInt, generateUniqueId, createProblem } from '../helpers';

// Helper to format time as Vietnamese text
function formatTimeText(hour: number, minute: number): string {
  if (minute === 0) {
    return `${hour} giờ đúng`;
  }
  return `${hour} giờ ${minute} phút`;
}

// Generate wrong time options for clock MCQ
function generateClockTextOptions(correctHour: number, correctMinute: number): string[] {
  const correctAnswer = formatTimeText(correctHour, correctMinute);
  const options: Set<string> = new Set([correctAnswer]);
  const minuteValues = [0, 15, 30, 45];

  while (options.size < 4) {
    const variation = getRandomInt(0, 3);
    let wrongHour = correctHour;
    let wrongMinute = correctMinute;

    switch (variation) {
      case 0:
        wrongHour = ((correctHour + getRandomInt(1, 3) - 1) % 12) + 1;
        break;
      case 1:
        wrongMinute = minuteValues[getRandomInt(0, 3)];
        break;
      case 2:
        wrongHour = ((correctHour + getRandomInt(1, 3) - 1) % 12) + 1;
        wrongMinute = minuteValues[getRandomInt(0, 3)];
        break;
      case 3:
        wrongHour = correctHour === 12 ? 1 : correctHour + 1;
        break;
    }

    const wrongAnswer = formatTimeText(wrongHour, wrongMinute);
    if (wrongAnswer !== correctAnswer) {
      options.add(wrongAnswer);
    }
  }

  const optionsArray = Array.from(options);
  for (let i = optionsArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [optionsArray[i], optionsArray[j]] = [optionsArray[j], optionsArray[i]];
  }

  return optionsArray;
}

// Generate wrong options for chain calculation
function generateChainTextOptions(
  correctMiddle: number,
  correctEnd: number,
  start: number,
  multiplyBy: number,
  divideBy: number
): string[] {
  const correctAnswer = `${correctMiddle}; ${correctEnd}`;
  const options: Set<string> = new Set([correctAnswer]);

  const wrongOptions = [
    `${start * (multiplyBy + 1)}; ${Math.floor((start * (multiplyBy + 1)) / divideBy)}`,
    `${start * (multiplyBy - 1)}; ${Math.floor((start * (multiplyBy - 1)) / divideBy)}`,
    `${correctMiddle}; ${Math.floor(correctMiddle / (divideBy + 1))}`,
    `${correctMiddle}; ${Math.floor(correctMiddle / (divideBy - 1)) || correctEnd + 2}`,
    `${start + multiplyBy}; ${(start + multiplyBy) - divideBy}`,
    `${correctMiddle + start}; ${correctEnd + 1}`,
  ];

  for (const wrong of wrongOptions) {
    if (wrong !== correctAnswer && !wrong.includes('NaN') && !wrong.includes('Infinity')) {
      options.add(wrong);
      if (options.size >= 4) break;
    }
  }

  while (options.size < 4) {
    const randMiddle = getRandomInt(10, 100);
    const randEnd = getRandomInt(1, 20);
    const randOption = `${randMiddle}; ${randEnd}`;
    if (randOption !== correctAnswer) {
      options.add(randOption);
    }
  }

  const optionsArray = Array.from(options);
  for (let i = optionsArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [optionsArray[i], optionsArray[j]] = [optionsArray[j], optionsArray[i]];
  }

  return optionsArray.slice(0, 4);
}

// Xem dong ho - Clock reading with multiple choice text options
export function generateReviewClockReading(difficulty: Difficulty = 'medium'): MathProblem {
  let hour: number;
  let minutes: number;
  const minutePositions = [0, 15, 30, 45];

  switch (difficulty) {
    case 'easy':
      hour = getRandomInt(1, 12);
      minutes = 0;
      break;
    case 'medium':
      hour = getRandomInt(1, 12);
      minutes = minutePositions[getRandomInt(0, 3)];
      break;
    case 'hard':
      hour = getRandomInt(1, 12);
      minutes = getRandomInt(0, 11) * 5;
      break;
    default:
      hour = getRandomInt(1, 12);
      minutes = minutePositions[getRandomInt(0, 3)];
  }

  const question = `[CLOCK:${hour}:${minutes}] Đồng hồ chỉ mấy giờ?`;
  const textAnswer = formatTimeText(hour, minutes);
  const textOptions = generateClockTextOptions(hour, minutes);

  return {
    id: generateUniqueId(),
    type: 'review_clock_reading',
    question,
    answer: hour * 60 + minutes,
    questionType: 'multiple_choice' as QuestionType,
    textAnswer,
    textOptions,
    isAnswered: false
  };
}

// Tim 1/n cua so - Find fraction of a number
export function generateReviewFractionOfNumber(difficulty: Difficulty = 'medium'): MathProblem {
  let divisor: number;
  let multiplier: number;

  switch (difficulty) {
    case 'easy':
      divisor = 2;
      multiplier = getRandomInt(2, 10);
      break;
    case 'medium':
      divisor = [2, 3, 4][getRandomInt(0, 2)];
      multiplier = getRandomInt(3, 12);
      break;
    case 'hard':
      divisor = [2, 3, 4, 5][getRandomInt(0, 3)];
      multiplier = getRandomInt(5, 20);
      break;
    default:
      divisor = [2, 3, 4][getRandomInt(0, 2)];
      multiplier = getRandomInt(3, 12);
  }

  const number = divisor * multiplier;
  const answer = number / divisor;
  const question = `Tìm 1/${divisor} của ${number} là bao nhiêu?`;

  return createProblem('review_fraction_of_number', question, answer);
}

// Dat tinh roi tinh - Written calculation
export function generateReviewWrittenCalculation(difficulty: Difficulty = 'medium'): MathProblem {
  const isMultiplication = Math.random() < 0.5;
  let a: number, b: number, answer: number, question: string;

  if (isMultiplication) {
    switch (difficulty) {
      case 'easy':
        a = getRandomInt(10, 30);
        b = getRandomInt(2, 5);
        break;
      case 'medium':
        a = getRandomInt(100, 300);
        b = getRandomInt(2, 6);
        break;
      case 'hard':
        a = getRandomInt(200, 500);
        b = getRandomInt(3, 9);
        break;
      default:
        a = getRandomInt(100, 300);
        b = getRandomInt(2, 6);
    }
    answer = a * b;
    question = `Đặt tính rồi tính: ${a} × ${b} = ?`;
  } else {
    switch (difficulty) {
      case 'easy':
        b = getRandomInt(2, 5);
        answer = getRandomInt(10, 30);
        a = b * answer;
        break;
      case 'medium':
        b = getRandomInt(2, 6);
        answer = getRandomInt(50, 150);
        a = b * answer;
        break;
      case 'hard':
        b = getRandomInt(3, 9);
        answer = getRandomInt(80, 200);
        a = b * answer;
        break;
      default:
        b = getRandomInt(2, 6);
        answer = getRandomInt(50, 150);
        a = b * answer;
    }
    question = `Đặt tính rồi tính: ${a} : ${b} = ?`;
  }

  return createProblem('review_written_calculation', question, answer);
}

// Do dai duong gap khuc - Broken line length
export function generateReviewBrokenLine(difficulty: Difficulty = 'medium'): MathProblem {
  const labels = ['A', 'B', 'C', 'D', 'E'];
  let numSegments: number;
  let segments: number[];
  let unit: string;

  switch (difficulty) {
    case 'easy':
      numSegments = 2;
      segments = Array.from({ length: numSegments }, () => getRandomInt(10, 30));
      unit = 'cm';
      break;
    case 'medium':
      numSegments = 3;
      segments = Array.from({ length: numSegments }, () => getRandomInt(15, 50));
      unit = 'mm';
      break;
    case 'hard':
      numSegments = 4;
      segments = Array.from({ length: numSegments }, () => getRandomInt(20, 60));
      unit = 'cm';
      break;
    default:
      numSegments = 3;
      segments = Array.from({ length: numSegments }, () => getRandomInt(15, 50));
      unit = 'mm';
  }

  const segmentDescriptions = segments.map((length, index) =>
    `${labels[index]}${labels[index + 1]} = ${length}${unit}`
  ).join(', ');

  const lineName = labels.slice(0, numSegments + 1).join('');
  const answer = segments.reduce((sum, seg) => sum + seg, 0);
  const question = `Đường gấp khúc ${lineName} có ${segmentDescriptions}. Tính độ dài đường gấp khúc ${lineName} (${unit}).`;

  return createProblem('review_broken_line', question, answer);
}

// Dien so vao o trong - Chain calculation (Gap/Giam)
export function generateReviewChainCalculation(difficulty: Difficulty = 'medium'): MathProblem {
  let start: number;
  let multiplyBy: number;

  switch (difficulty) {
    case 'easy':
      start = getRandomInt(2, 6);
      multiplyBy = getRandomInt(2, 4);
      break;
    case 'medium':
      start = getRandomInt(3, 8);
      multiplyBy = getRandomInt(3, 6);
      break;
    case 'hard':
      start = getRandomInt(4, 10);
      multiplyBy = getRandomInt(4, 8);
      break;
    default:
      start = getRandomInt(3, 8);
      multiplyBy = getRandomInt(3, 6);
  }

  const middle = start * multiplyBy;

  const divisors = [];
  for (let i = 2; i <= Math.min(middle, 10); i++) {
    if (middle % i === 0 && middle / i >= 1) {
      divisors.push(i);
    }
  }

  const divideBy = divisors.length > 0 ? divisors[getRandomInt(0, divisors.length - 1)] : 2;
  const end = middle / divideBy;

  const question = `Điền số: ${start} → (Gấp ${multiplyBy} lần) → ? → (Giảm ${divideBy} lần) → ?`;
  const textAnswer = `${middle}; ${end}`;
  const textOptions = generateChainTextOptions(middle, end, start, multiplyBy, divideBy);

  return {
    id: generateUniqueId(),
    type: 'review_chain_calculation',
    question,
    answer: middle,
    questionType: 'multiple_choice' as QuestionType,
    textAnswer,
    textOptions,
    isAnswered: false
  };
}

// So? - Fill in the blank (find missing number in equations)
export function generateReviewFillBlank(difficulty: Difficulty = 'medium'): MathProblem {
  const operations = ['multiplication', 'division', 'addition'] as const;
  const positions = ['first', 'second', 'result'] as const;

  const operation = operations[getRandomInt(0, operations.length - 1)];
  const position = positions[getRandomInt(0, positions.length - 1)];

  let a: number, b: number, result: number, answer: number, question: string;

  switch (operation) {
    case 'multiplication': {
      switch (difficulty) {
        case 'easy':
          a = getRandomInt(2, 5);
          b = getRandomInt(2, 5);
          break;
        case 'medium':
          a = getRandomInt(3, 9);
          b = getRandomInt(3, 9);
          break;
        case 'hard':
          a = getRandomInt(10, 50);
          b = getRandomInt(2, 9);
          break;
        default:
          a = getRandomInt(3, 9);
          b = getRandomInt(3, 9);
      }
      result = a * b;

      if (position === 'first') {
        answer = a;
        question = `? × ${b} = ${result}`;
      } else if (position === 'second') {
        answer = b;
        question = `${a} × ? = ${result}`;
      } else {
        answer = result;
        question = `${a} × ${b} = ?`;
      }
      break;
    }

    case 'division': {
      switch (difficulty) {
        case 'easy':
          b = getRandomInt(2, 5);
          result = getRandomInt(2, 10);
          break;
        case 'medium':
          b = getRandomInt(3, 9);
          result = getRandomInt(5, 20);
          break;
        case 'hard':
          b = getRandomInt(4, 9);
          result = getRandomInt(10, 99);
          break;
        default:
          b = getRandomInt(3, 9);
          result = getRandomInt(5, 20);
      }
      a = b * result;

      if (position === 'first') {
        answer = a;
        question = `? : ${b} = ${result}`;
      } else if (position === 'second') {
        answer = b;
        question = `${a} : ? = ${result}`;
      } else {
        answer = result;
        question = `${a} : ${b} = ?`;
      }
      break;
    }

    case 'addition': {
      switch (difficulty) {
        case 'easy':
          a = getRandomInt(10, 50);
          b = getRandomInt(10, 50);
          break;
        case 'medium':
          a = getRandomInt(50, 200);
          b = getRandomInt(50, 200);
          break;
        case 'hard':
          a = getRandomInt(100, 500);
          b = getRandomInt(100, 500);
          break;
        default:
          a = getRandomInt(50, 200);
          b = getRandomInt(50, 200);
      }
      result = a + b;

      if (position === 'first') {
        answer = a;
        question = `? + ${b} = ${result}`;
      } else if (position === 'second') {
        answer = b;
        question = `${a} + ? = ${result}`;
      } else {
        answer = result;
        question = `${a} + ${b} = ?`;
      }
      break;
    }
  }

  return createProblem('review_fill_blank', question!, answer!);
}

// On tap Hoc ky 1 - Semester 1 Review (mixed questions)
// Note: This will be handled in core.ts since it needs access to all generators
export function generateReviewSemester1(
  difficulty: Difficulty,
  generateProblem: (type: ProblemType, difficulty: Difficulty) => MathProblem
): MathProblem {
  const semester1Types: ProblemType[] = [
    'two_digit_multiply',
    'two_digit_divide',
    'three_digit_multiply',
    'three_digit_divide',
    'division_with_remainder',
    'word_problem_more_less',
    'word_problem_multiply_divide',
    'word_problem_division_remainder',
    'review_clock_reading',
    'review_fraction_of_number',
    'review_written_calculation',
    'review_broken_line',
    'review_chain_calculation',
    'review_fill_blank'
  ];

  const randomType = semester1Types[Math.floor(Math.random() * semester1Types.length)];
  const problem = generateProblem(randomType, difficulty);

  return {
    ...problem,
    type: 'review_semester_1'
  };
}
