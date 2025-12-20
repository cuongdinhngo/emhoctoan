import { MathProblem } from '../../../types';
import { Difficulty, getRandomInt, createProblem } from '../helpers';

// Dang toan ve hon kem so don vi
export function generateWordProblemMoreLess(difficulty: Difficulty = 'medium'): MathProblem {
  const names = ['An', 'Bình', 'Mai', 'Hoa', 'Nam', 'Lan', 'Hùng', 'Hương'];
  const objects = ['quả táo', 'viên bi', 'cái kẹo', 'quyển vở', 'cái bút', 'quả cam', 'cái bánh', 'quyển sách'];
  const isMore = Math.random() < 0.5;
  let a: number, diff: number;

  switch (difficulty) {
    case 'easy':
      a = getRandomInt(5, 20);
      diff = getRandomInt(2, 8);
      break;
    case 'medium':
      a = getRandomInt(10, 50);
      diff = getRandomInt(5, 15);
      break;
    case 'hard':
      a = getRandomInt(20, 100);
      diff = getRandomInt(10, 30);
      break;
    default:
      a = getRandomInt(5, 50);
      diff = getRandomInt(2, 15);
  }

  const answer = isMore ? a + diff : a - diff;
  const name1 = names[getRandomInt(0, names.length - 1)];
  let name2 = names[getRandomInt(0, names.length - 1)];
  while (name2 === name1) {
    name2 = names[getRandomInt(0, names.length - 1)];
  }
  const object = objects[getRandomInt(0, objects.length - 1)];

  const question = isMore
    ? `${name1} có ${a} ${object}. ${name2} có nhiều hơn ${name1} ${diff} ${object}. Hỏi ${name2} có bao nhiêu ${object}?`
    : `${name1} có ${a} ${object}. ${name2} có ít hơn ${name1} ${diff} ${object}. Hỏi ${name2} có bao nhiêu ${object}?`;

  return createProblem('word_problem_more_less', question, answer);
}

// Dang toan ve gap so lan, giam so lan
export function generateWordProblemMultiplyDivide(difficulty: Difficulty = 'medium'): MathProblem {
  const objects = ['cái bút', 'quả cam', 'cái bánh', 'quyển vở', 'viên bi', 'cái kẹo', 'quyển sách', 'cái bút chì'];
  const containers = ['hộp', 'túi', 'đĩa', 'rổ', 'thùng', 'giỏ', 'hộp', 'túi'];
  const isMultiply = Math.random() < 0.5;
  let base: number, multiplier: number;

  switch (difficulty) {
    case 'easy':
      base = getRandomInt(3, 10);
      multiplier = getRandomInt(2, 5);
      break;
    case 'medium':
      base = getRandomInt(5, 15);
      multiplier = getRandomInt(3, 8);
      break;
    case 'hard':
      base = getRandomInt(8, 20);
      multiplier = getRandomInt(4, 10);
      break;
    default:
      base = getRandomInt(3, 15);
      multiplier = getRandomInt(2, 8);
  }

  const object = objects[getRandomInt(0, objects.length - 1)];
  const container = containers[getRandomInt(0, containers.length - 1)];

  if (isMultiply) {
    const answer = base * multiplier;
    const question = `Một ${container} có ${base} ${object}. Hỏi ${multiplier} ${container} như thế có bao nhiêu ${object}?`;
    return createProblem('word_problem_multiply_divide', question, answer);
  } else {
    const answer = base;
    const total = base * multiplier;
    const question = `Có ${total} ${object} chia đều vào ${multiplier} ${container}. Hỏi mỗi ${container} có bao nhiêu ${object}?`;
    return createProblem('word_problem_multiply_divide', question, answer);
  }
}

// Dang toan lien quan den rut ve don vi
export function generateWordProblemUnitConversion(difficulty: Difficulty = 'medium'): MathProblem {
  const objects = ['quả cam', 'cái bút', 'quyển vở', 'viên bi', 'cái kẹo', 'quả táo', 'cái bánh', 'quyển sách'];
  const containers = ['túi', 'hộp', 'đĩa', 'rổ', 'thùng', 'giỏ'];
  let total: number, numContainers: number, answer: number;

  switch (difficulty) {
    case 'easy':
      numContainers = getRandomInt(2, 5);
      answer = getRandomInt(3, 10);
      total = numContainers * answer;
      break;
    case 'medium':
      numContainers = getRandomInt(3, 8);
      answer = getRandomInt(5, 15);
      total = numContainers * answer;
      break;
    case 'hard':
      numContainers = getRandomInt(4, 10);
      answer = getRandomInt(8, 20);
      total = numContainers * answer;
      break;
    default:
      numContainers = getRandomInt(2, 8);
      answer = getRandomInt(3, 15);
      total = numContainers * answer;
  }

  const object = objects[getRandomInt(0, objects.length - 1)];
  const container = containers[getRandomInt(0, containers.length - 1)];
  const question = `Một cửa hàng có ${total} ${object}, chia đều vào ${numContainers} ${container}. Hỏi mỗi ${container} có bao nhiêu ${object}?`;

  return createProblem('word_problem_unit_conversion', question, answer);
}

// Toan co loi van: Chia co du - Word problem with division remainder
export function generateWordProblemDivisionRemainder(difficulty: Difficulty = 'medium'): MathProblem {
  interface Template {
    subject: string;
    action: string;
    total: string;
    unit: string;
    perItem: number;
    itemName: string;
    questionText: string;
  }

  const templates: Template[] = [
    {
      subject: 'Người thợ may',
      action: 'dùng',
      total: 'vải',
      unit: 'm',
      perItem: 3,
      itemName: 'bộ quần áo công nhân',
      questionText: 'may được nhiều nhất bao nhiêu bộ quần áo'
    },
    {
      subject: 'Cửa hàng',
      action: 'có',
      total: 'kẹo',
      unit: 'cái',
      perItem: 5,
      itemName: 'túi kẹo',
      questionText: 'đóng được nhiều nhất bao nhiêu túi'
    },
    {
      subject: 'Nhà trường',
      action: 'có',
      total: 'học sinh',
      unit: 'học sinh',
      perItem: 4,
      itemName: 'đội',
      questionText: 'chia được nhiều nhất bao nhiêu đội'
    },
    {
      subject: 'Bác nông dân',
      action: 'thu hoạch được',
      total: 'cam',
      unit: 'kg',
      perItem: 6,
      itemName: 'thùng cam',
      questionText: 'đóng được nhiều nhất bao nhiêu thùng'
    }
  ];

  let divisor: number, quotient: number, remainder: number;

  switch (difficulty) {
    case 'easy':
      divisor = getRandomInt(2, 4);
      quotient = getRandomInt(10, 20);
      remainder = getRandomInt(1, divisor - 1);
      break;
    case 'medium':
      divisor = getRandomInt(3, 6);
      quotient = getRandomInt(15, 30);
      remainder = getRandomInt(1, divisor - 1);
      break;
    case 'hard':
      divisor = getRandomInt(4, 9);
      quotient = getRandomInt(20, 50);
      remainder = getRandomInt(1, divisor - 1);
      break;
    default:
      divisor = getRandomInt(3, 6);
      quotient = getRandomInt(15, 30);
      remainder = getRandomInt(1, divisor - 1);
  }

  const dividend = divisor * quotient + remainder;
  const answer = quotient;

  const template = templates[getRandomInt(0, templates.length - 1)];
  const perItem = divisor;

  const question = `${template.subject} ${template.action} ${dividend} ${template.unit} ${template.total}. Mỗi ${template.itemName} cần ${perItem} ${template.unit}. Hỏi ${template.questionText}?`;

  return createProblem('word_problem_division_remainder', question, answer);
}
