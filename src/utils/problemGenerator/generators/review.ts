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

function getDaysInMonth(month: number): number {
  if (month === 2) return 28;
  if ([4, 6, 9, 11].includes(month)) return 30;
  return 31;
}

function toRomanNumeral(num: number): string {
  const map: Array<[number, string]> = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
  ];
  let remaining = num;
  let result = '';

  for (const [value, symbol] of map) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }
  return result;
}

function formatDateText(day: number, month: number): string {
  return `${day}/${month}`;
}

function addDays(day: number, month: number, offset: number): { day: number; month: number } {
  let resultDay = day;
  let resultMonth = month;
  let remaining = offset;

  while (remaining > 0) {
    const daysInMonth = getDaysInMonth(resultMonth);
    if (resultDay + remaining <= daysInMonth) {
      resultDay += remaining;
      remaining = 0;
    } else {
      remaining -= (daysInMonth - resultDay + 1);
      resultDay = 1;
      resultMonth = resultMonth === 12 ? 1 : resultMonth + 1;
    }
  }

  return { day: resultDay, month: resultMonth };
}

function generateDateTextOptions(correctDay: number, correctMonth: number): string[] {
  const correct = formatDateText(correctDay, correctMonth);
  const options = new Set<string>([correct]);
  while (options.size < 4) {
    const randomMonth = getRandomInt(1, 12);
    const randomDay = getRandomInt(1, getDaysInMonth(randomMonth));
    const randomDate = formatDateText(randomDay, randomMonth);
    if (randomDate !== correct) {
      options.add(randomDate);
    }
  }

  return Array.from(options).sort(() => Math.random() - 0.5);
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
  const units = ['cm', 'mm', 'm'];
  let numSegments: number;
  let segments: number[];

  switch (difficulty) {
    case 'easy':
      numSegments = 2;
      segments = Array.from({ length: numSegments }, () => getRandomInt(10, 30));
      break;
    case 'medium':
      numSegments = 3;
      segments = Array.from({ length: numSegments }, () => getRandomInt(15, 50));
      break;
    case 'hard':
      numSegments = 4;
      segments = Array.from({ length: numSegments }, () => getRandomInt(20, 60));
      break;
    default:
      numSegments = 3;
      segments = Array.from({ length: numSegments }, () => getRandomInt(15, 50));
  }

  const unit = units[getRandomInt(0, units.length - 1)];

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

// Lam tron so - Round number to nearest place value
export function generateReviewRounding(difficulty: Difficulty = 'medium'): MathProblem {
  let number: number;
  let placeValue: number;
  let placeLabel: string;

  switch (difficulty) {
    case 'easy':
      number = getRandomInt(100, 999);
      placeValue = 10;
      placeLabel = 'hàng chục';
      break;
    case 'medium':
      number = getRandomInt(1000, 9999);
      placeValue = 100;
      placeLabel = 'hàng trăm';
      break;
    case 'hard':
      number = getRandomInt(10000, 99999);
      placeValue = [1000, 10000][getRandomInt(0, 1)];
      placeLabel = placeValue === 1000 ? 'hàng nghìn' : 'hàng chục nghìn';
      break;
    default:
      number = getRandomInt(1000, 9999);
      placeValue = 100;
      placeLabel = 'hàng trăm';
  }

  const answer = Math.round(number / placeValue) * placeValue;
  const question = `Làm tròn số ${number} đến ${placeLabel}.`;
  return createProblem('review_rounding', question, answer);
}

// Tinh ngay thang - date calculation in month calendar
export function generateReviewDateCalculation(difficulty: Difficulty = 'medium'): MathProblem {
  let day: number;
  let month: number;
  let offset: number;

  switch (difficulty) {
    case 'easy':
      month = getRandomInt(1, 12);
      day = getRandomInt(1, Math.max(1, getDaysInMonth(month) - 3));
      offset = getRandomInt(1, 3);
      break;
    case 'medium':
      month = getRandomInt(1, 12);
      day = getRandomInt(20, getDaysInMonth(month));
      offset = getRandomInt(2, 6);
      break;
    case 'hard':
      month = getRandomInt(1, 12);
      day = getRandomInt(24, getDaysInMonth(month));
      offset = getRandomInt(4, 9);
      break;
    default:
      month = getRandomInt(1, 12);
      day = getRandomInt(20, getDaysInMonth(month));
      offset = getRandomInt(2, 6);
  }

  const result = addDays(day, month, offset);
  const textAnswer = formatDateText(result.day, result.month);
  const textOptions = generateDateTextOptions(result.day, result.month);
  const question = `Hôm nay là ngày ${day}/${month}. Còn ${offset} ngày nữa sẽ là ngày nào?`;

  return {
    id: generateUniqueId(),
    type: 'review_date_calculation',
    question,
    answer: result.day,
    questionType: 'multiple_choice' as QuestionType,
    textAnswer,
    textOptions,
    isAnswered: false
  };
}

// Toan tien - purchasing and change
export function generateReviewMoney(difficulty: Difficulty = 'medium'): MathProblem {
  let item1: number;
  let item2: number;
  let paid: number;

  switch (difficulty) {
    case 'easy':
      item1 = getRandomInt(5, 20) * 1000;
      item2 = getRandomInt(2, 10) * 1000;
      paid = [50000, 100000][getRandomInt(0, 1)];
      break;
    case 'medium':
      item1 = getRandomInt(10, 35) * 1000;
      item2 = getRandomInt(5, 25) * 1000;
      paid = [50000, 100000, 200000][getRandomInt(0, 2)];
      break;
    case 'hard':
      item1 = getRandomInt(20, 60) * 1000;
      item2 = getRandomInt(10, 40) * 1000;
      paid = [100000, 200000, 500000][getRandomInt(0, 2)];
      break;
    default:
      item1 = getRandomInt(10, 35) * 1000;
      item2 = getRandomInt(5, 25) * 1000;
      paid = [50000, 100000, 200000][getRandomInt(0, 2)];
  }

  const total = item1 + item2;
  if (paid < total) {
    paid = Math.ceil(total / 50000) * 50000;
  }

  const answer = paid - total;
  const question = `Mua 2 món hàng giá ${item1.toLocaleString('vi-VN')} đồng và ${item2.toLocaleString('vi-VN')} đồng. Đưa ${paid.toLocaleString('vi-VN')} đồng. Hỏi được thối lại bao nhiêu đồng?`;
  return createProblem('review_money', question, answer);
}

// Gia tri chu so / so lien truoc - value of digit or predecessor/successor
export function generateReviewDigitValue(difficulty: Difficulty = 'medium'): MathProblem {
  const mode = Math.random() < 0.5 ? 'digit_value' : 'adjacent_number';

  if (mode === 'digit_value') {
    const min = difficulty === 'easy' ? 1000 : 10000;
    const max = difficulty === 'hard' ? 999999 : 99999;
    const number = getRandomInt(min, max);
    const digits = number.toString().split('').map(Number);
    const position = getRandomInt(0, digits.length - 1);
    const digit = digits[position];
    const place = digits.length - 1 - position;
    const answer = digit * Math.pow(10, place);
    const question = `Giá trị của chữ số ${digit} trong số ${number.toLocaleString('vi-VN')} là bao nhiêu?`;
    return createProblem('review_digit_value', question, answer);
  }

  const number = getRandomInt(1000, difficulty === 'hard' ? 99999 : 9999);
  const askPredecessor = Math.random() < 0.5;
  const answer = askPredecessor ? number - 1 : number + 1;
  const question = askPredecessor
    ? `Số liền trước của số ${number.toLocaleString('vi-VN')} là số nào?`
    : `Số liền sau của số ${number.toLocaleString('vi-VN')} là số nào?`;
  return createProblem('review_digit_value', question, answer);
}

// Thang co bao nhieu ngay - identify month day count
export function generateReviewMonthDays(difficulty: Difficulty = 'medium'): MathProblem {
  let month: number;
  if (difficulty === 'easy') {
    month = [4, 6, 9, 11, 1, 3, 5, 7, 8, 10, 12][getRandomInt(0, 10)];
  } else {
    month = getRandomInt(1, 12);
  }
  const answer = getDaysInMonth(month);
  const question = `Tháng ${month} có bao nhiêu ngày?`;
  return createProblem('review_month_days', question, answer);
}

// So La Ma - convert between Roman and Arabic numerals
export function generateReviewRomanNumerals(difficulty: Difficulty = 'medium'): MathProblem {
  let maxValue: number;
  switch (difficulty) {
    case 'easy':
      maxValue = 20;
      break;
    case 'medium':
      maxValue = 39;
      break;
    case 'hard':
      maxValue = 50;
      break;
    default:
      maxValue = 39;
  }

  const value = getRandomInt(1, maxValue);
  const roman = toRomanNumeral(value);
  const askToRoman = Math.random() < 0.5;

  if (askToRoman) {
    const options = new Set<string>([roman]);
    while (options.size < 4) {
      const wrongValue = getRandomInt(1, maxValue);
      const wrongRoman = toRomanNumeral(wrongValue);
      if (wrongRoman !== roman) {
        options.add(wrongRoman);
      }
    }

    return {
      id: generateUniqueId(),
      type: 'review_roman_numerals',
      question: `Viết số La Mã của số ${value} là:`,
      answer: value,
      questionType: 'multiple_choice' as QuestionType,
      textAnswer: roman,
      textOptions: Array.from(options).sort(() => Math.random() - 0.5),
      isAnswered: false
    };
  }

  return createProblem('review_roman_numerals', `Số ${roman} có giá trị là bao nhiêu?`, value);
}

// Khoi lap phuong - identify correct/incorrect cube property
export function generateReviewCubeProperties(): MathProblem {
  const askIncorrect = Math.random() < 0.5;
  const question = askIncorrect
    ? 'Nhận định nào sau đây không đúng về khối lập phương?'
    : 'Nhận định nào sau đây đúng về khối lập phương?';

  const correctText = askIncorrect
    ? 'Khối lập phương có tất cả 8 mặt.'
    : 'Khối lập phương có tất cả 12 cạnh.';

  const textOptions = askIncorrect
    ? [
        'Khối lập phương có tất cả 8 mặt.',
        'Khối lập phương có tất cả 8 đỉnh.',
        'Khối lập phương có tất cả các cạnh bằng nhau.',
        'Khối lập phương có tất cả 12 cạnh.'
      ]
    : [
        'Khối lập phương có tất cả 10 cạnh.',
        'Khối lập phương có tất cả 6 đỉnh.',
        'Khối lập phương có tất cả 8 cạnh.',
        'Khối lập phương có tất cả 12 cạnh.'
      ];

  return {
    id: generateUniqueId(),
    type: 'review_cube_properties',
    question,
    answer: 0,
    questionType: 'multiple_choice' as QuestionType,
    textAnswer: correctText,
    textOptions: textOptions.sort(() => Math.random() - 0.5),
    isAnswered: false
  };
}

// Bieu thuc co ngoac - evaluate expression with operation precedence
export function generateReviewExpression(difficulty: Difficulty = 'medium'): MathProblem {
  const pattern = Math.random() < 0.5 ? 'sub_with_sum_bracket' : 'division_nested_bracket';

  if (pattern === 'sub_with_sum_bracket') {
    let outer: number;
    let b: number;
    let c: number;

    switch (difficulty) {
      case 'easy':
        b = getRandomInt(10, 80);
        c = getRandomInt(10, 80);
        outer = getRandomInt(b + c + 20, b + c + 300);
        break;
      case 'medium':
        b = getRandomInt(50, 300);
        c = getRandomInt(30, 250);
        outer = getRandomInt(b + c + 50, b + c + 1200);
        break;
      case 'hard':
        b = getRandomInt(150, 900);
        c = getRandomInt(120, 800);
        outer = getRandomInt(b + c + 200, b + c + 4000);
        break;
      default:
        b = getRandomInt(50, 300);
        c = getRandomInt(30, 250);
        outer = getRandomInt(b + c + 50, b + c + 1200);
    }

    const answer = outer - (b + c);
    const question = `Tính giá trị biểu thức: ${outer} – (${b} + ${c})`;
    return createProblem('review_expression', question, answer);
  }

  // division_nested_bracket: a : (b : c)
  let a: number;
  let b: number;
  let c: number;

  switch (difficulty) {
    case 'easy':
      c = getRandomInt(2, 5);
      b = c * getRandomInt(2, 9);
      a = getRandomInt(40, 120);
      a = a - (a % (b / c)); // make exact division
      break;
    case 'medium':
      c = getRandomInt(2, 9);
      b = c * getRandomInt(3, 12);
      a = getRandomInt(120, 500);
      a = a - (a % (b / c));
      break;
    case 'hard':
      c = getRandomInt(2, 9);
      b = c * getRandomInt(6, 20);
      a = getRandomInt(300, 2000);
      a = a - (a % (b / c));
      break;
    default:
      c = getRandomInt(2, 9);
      b = c * getRandomInt(3, 12);
      a = getRandomInt(120, 500);
      a = a - (a % (b / c));
  }

  if (a === 0) {
    a = b / c;
  }

  const answer = a / (b / c);
  const question = `Tính giá trị biểu thức: ${a} : (${b} : ${c})`;
  return createProblem('review_expression', question, answer);
}

// Doi don vi - convert measurement units
export function generateReviewUnitConversion(difficulty: Difficulty = 'medium'): MathProblem {
  const patterns = [
    { from: 'm', to: 'cm', factor: 100 },
    { from: 'km', to: 'm', factor: 1000 },
    { from: 'giờ', to: 'phút', factor: 60 },
    { from: 'kg', to: 'g', factor: 1000 },
    { from: 'dm', to: 'cm', factor: 10 }
  ] as const;
  const pattern = patterns[getRandomInt(0, patterns.length - 1)];

  let value: number;
  switch (difficulty) {
    case 'easy':
      value = getRandomInt(2, 12);
      break;
    case 'medium':
      value = getRandomInt(5, 30);
      break;
    case 'hard':
      value = getRandomInt(15, 80);
      break;
    default:
      value = getRandomInt(5, 30);
  }

  const answer = value * pattern.factor;
  const question = `Điền số thích hợp: ${value} ${pattern.from} = ? ${pattern.to}`;
  return createProblem('review_unit_conversion', question, answer);
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
