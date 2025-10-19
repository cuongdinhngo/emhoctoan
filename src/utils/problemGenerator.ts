import { MathProblem, ProblemType, QuestionType } from '../types';

export class ProblemGenerator {
  private static generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private static getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private static getDifficultyRange(difficulty: 'easy' | 'medium' | 'hard') {
    switch (difficulty) {
      case 'easy':
        return { min: 1, max: 5 };
      case 'medium':
        return { min: 3, max: 8 };
      case 'hard':
        return { min: 6, max: 9 };
      default:
        return { min: 1, max: 9 };
    }
  }

  private static generateUniqueId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private static generateMultipleChoiceOptions(correctAnswer: number): number[] {
    const options = [correctAnswer];
    const usedAnswers = new Set([correctAnswer]);
    
    // Generate 3 wrong answers
    while (options.length < 4) {
      let wrongAnswer;
      if (Math.random() < 0.5) {
        // Generate answer close to correct one
        wrongAnswer = correctAnswer + this.getRandomInt(-3, 3);
      } else {
        // Generate completely random answer
        wrongAnswer = this.getRandomInt(0, 100);
      }
      
      if (!usedAnswers.has(wrongAnswer) && wrongAnswer >= 0) {
        options.push(wrongAnswer);
        usedAnswers.add(wrongAnswer);
      }
    }
    
    // Shuffle the options
    return options.sort(() => Math.random() - 0.5);
  }

  // Bảng nhân từ 1 đến 9
  static generateMultiplicationTable(difficulty: 'easy' | 'medium' | 'hard' = 'medium'): MathProblem {
    const range = this.getDifficultyRange(difficulty);
    const a = this.getRandomInt(range.min, range.max);
    const b = this.getRandomInt(range.min, range.max);
    const answer = a * b;
    const questionType: QuestionType = Math.random() < 0.5 ? 'multiple_choice' : 'input';
    
    return {
      id: this.generateUniqueId(),
      type: 'multiplication_table',
      question: `${a} × ${b} = ?`,
      answer: answer,
      questionType: questionType,
      options: questionType === 'multiple_choice' ? this.generateMultipleChoiceOptions(answer) : undefined,
      isAnswered: false
    };
  }

  // Bảng chia từ 1 đến 9
  static generateDivisionTable(difficulty: 'easy' | 'medium' | 'hard' = 'medium'): MathProblem {
    const range = this.getDifficultyRange(difficulty);
    const a = this.getRandomInt(range.min, range.max);
    const b = this.getRandomInt(range.min, range.max);
    const product = a * b;
    const answer = b;
    const questionType: QuestionType = Math.random() < 0.5 ? 'multiple_choice' : 'input';
    
    return {
      id: this.generateUniqueId(),
      type: 'division_table',
      question: `${product} : ${a} = ?`,
      answer: answer,
      questionType: questionType,
      options: questionType === 'multiple_choice' ? this.generateMultipleChoiceOptions(answer) : undefined,
      isAnswered: false
    };
  }

  // Phép cộng trong phạm vi 1000
  static generateAddition(difficulty: 'easy' | 'medium' | 'hard' = 'medium'): MathProblem {
    let a, b, answer;
    
    switch (difficulty) {
      case 'easy':
        a = this.getRandomInt(1, 50);
        b = this.getRandomInt(1, 50);
        break;
      case 'medium':
        a = this.getRandomInt(10, 200);
        b = this.getRandomInt(10, 200);
        break;
      case 'hard':
        a = this.getRandomInt(100, 500);
        b = this.getRandomInt(100, 500);
        break;
      default:
        a = this.getRandomInt(0, 1000);
        b = this.getRandomInt(0, 1000 - a);
    }
    
    answer = a + b;
    const questionType: QuestionType = Math.random() < 0.5 ? 'multiple_choice' : 'input';
    
    return {
      id: this.generateUniqueId(),
      type: 'addition',
      question: `${a} + ${b} = ?`,
      answer: answer,
      questionType: questionType,
      options: questionType === 'multiple_choice' ? this.generateMultipleChoiceOptions(answer) : undefined,
      isAnswered: false
    };
  }

  // Phép trừ trong phạm vi 1000
  static generateSubtraction(difficulty: 'easy' | 'medium' | 'hard' = 'medium'): MathProblem {
    let a, b, answer;
    
    switch (difficulty) {
      case 'easy':
        a = this.getRandomInt(10, 50);
        b = this.getRandomInt(1, a - 1);
        break;
      case 'medium':
        a = this.getRandomInt(50, 200);
        b = this.getRandomInt(10, a - 10);
        break;
      case 'hard':
        a = this.getRandomInt(200, 800);
        b = this.getRandomInt(50, a - 50);
        break;
      default:
        a = this.getRandomInt(0, 1000);
        b = this.getRandomInt(0, a);
    }
    
    answer = a - b;
    const questionType: QuestionType = Math.random() < 0.5 ? 'multiple_choice' : 'input';
    
    return {
      id: this.generateUniqueId(),
      type: 'subtraction',
      question: `${a} - ${b} = ?`,
      answer: answer,
      questionType: questionType,
      options: questionType === 'multiple_choice' ? this.generateMultipleChoiceOptions(answer) : undefined,
      isAnswered: false
    };
  }

  // Phép nhân trong phạm vi 100
  static generateMultiplication(difficulty: 'easy' | 'medium' | 'hard' = 'medium'): MathProblem {
    let a, b, answer;
    
    switch (difficulty) {
      case 'easy':
        a = this.getRandomInt(2, 5);
        b = this.getRandomInt(2, 5);
        break;
      case 'medium':
        a = this.getRandomInt(3, 8);
        b = this.getRandomInt(3, 8);
        break;
      case 'hard':
        a = this.getRandomInt(6, 10);
        b = this.getRandomInt(6, 10);
        break;
      default:
        a = this.getRandomInt(1, 10);
        b = this.getRandomInt(1, 10);
    }
    
    answer = a * b;
    const questionType: QuestionType = Math.random() < 0.5 ? 'multiple_choice' : 'input';
    
    return {
      id: this.generateUniqueId(),
      type: 'multiplication',
      question: `${a} × ${b} = ?`,
      answer: answer,
      questionType: questionType,
      options: questionType === 'multiple_choice' ? this.generateMultipleChoiceOptions(answer) : undefined,
      isAnswered: false
    };
  }

  // Phép chia trong phạm vi 100
  static generateDivision(difficulty: 'easy' | 'medium' | 'hard' = 'medium'): MathProblem {
    let a, b, product, answer;
    
    switch (difficulty) {
      case 'easy':
        a = this.getRandomInt(2, 5);
        b = this.getRandomInt(2, 5);
        break;
      case 'medium':
        a = this.getRandomInt(3, 8);
        b = this.getRandomInt(3, 8);
        break;
      case 'hard':
        a = this.getRandomInt(6, 10);
        b = this.getRandomInt(6, 10);
        break;
      default:
        a = this.getRandomInt(1, 10);
        b = this.getRandomInt(1, 10);
    }
    
    product = a * b;
    answer = b;
    const questionType: QuestionType = Math.random() < 0.5 ? 'multiple_choice' : 'input';
    
    return {
      id: this.generateUniqueId(),
      type: 'division',
      question: `${product} : ${a} = ?`,
      answer: answer,
      questionType: questionType,
      options: questionType === 'multiple_choice' ? this.generateMultipleChoiceOptions(answer) : undefined,
      isAnswered: false
    };
  }

  // Nhân số có hai chữ số với số có một chữ số
  static generateTwoDigitMultiply(difficulty: 'easy' | 'medium' | 'hard' = 'medium'): MathProblem {
    let twoDigit, oneDigit, answer;
    
    switch (difficulty) {
      case 'easy':
        twoDigit = this.getRandomInt(10, 25);
        oneDigit = this.getRandomInt(2, 5);
        break;
      case 'medium':
        twoDigit = this.getRandomInt(15, 50);
        oneDigit = this.getRandomInt(3, 8);
        break;
      case 'hard':
        twoDigit = this.getRandomInt(20, 99);
        oneDigit = this.getRandomInt(4, 9);
        break;
      default:
        twoDigit = this.getRandomInt(10, 99);
        oneDigit = this.getRandomInt(2, 9);
    }
    
    answer = twoDigit * oneDigit;
    const questionType: QuestionType = Math.random() < 0.5 ? 'multiple_choice' : 'input';
    
    return {
      id: this.generateUniqueId(),
      type: 'two_digit_multiply',
      question: `${twoDigit} × ${oneDigit} = ?`,
      answer: answer,
      questionType: questionType,
      options: questionType === 'multiple_choice' ? this.generateMultipleChoiceOptions(answer) : undefined,
      isAnswered: false
    };
  }

  // Phép chia có dư
  static generateDivisionWithRemainder(difficulty: 'easy' | 'medium' | 'hard' = 'medium'): MathProblem {
    let dividend, divisor, quotient, remainder, answer;
    
    switch (difficulty) {
      case 'easy':
        divisor = this.getRandomInt(2, 5);
        quotient = this.getRandomInt(3, 8);
        remainder = this.getRandomInt(1, divisor - 1);
        dividend = divisor * quotient + remainder;
        break;
      case 'medium':
        divisor = this.getRandomInt(3, 7);
        quotient = this.getRandomInt(5, 15);
        remainder = this.getRandomInt(1, divisor - 1);
        dividend = divisor * quotient + remainder;
        break;
      case 'hard':
        divisor = this.getRandomInt(4, 9);
        quotient = this.getRandomInt(8, 25);
        remainder = this.getRandomInt(1, divisor - 1);
        dividend = divisor * quotient + remainder;
        break;
      default:
        divisor = this.getRandomInt(2, 9);
        quotient = this.getRandomInt(3, 20);
        remainder = this.getRandomInt(1, divisor - 1);
        dividend = divisor * quotient + remainder;
    }
    
    answer = quotient;
    const questionType: QuestionType = Math.random() < 0.5 ? 'multiple_choice' : 'input';
    
    return {
      id: this.generateUniqueId(),
      type: 'division_with_remainder',
      question: `${dividend} : ${divisor} = ? (dư ${remainder})`,
      answer: answer,
      questionType: questionType,
      options: questionType === 'multiple_choice' ? this.generateMultipleChoiceOptions(answer) : undefined,
      isAnswered: false
    };
  }

  // Chia số có hai chữ số cho số có một chữ số
  static generateTwoDigitDivide(difficulty: 'easy' | 'medium' | 'hard' = 'medium'): MathProblem {
    let twoDigit, oneDigit, answer;
    
    switch (difficulty) {
      case 'easy':
        oneDigit = this.getRandomInt(2, 5);
        answer = this.getRandomInt(3, 12);
        twoDigit = oneDigit * answer;
        break;
      case 'medium':
        oneDigit = this.getRandomInt(3, 7);
        answer = this.getRandomInt(5, 20);
        twoDigit = oneDigit * answer;
        break;
      case 'hard':
        oneDigit = this.getRandomInt(4, 9);
        answer = this.getRandomInt(8, 25);
        twoDigit = oneDigit * answer;
        break;
      default:
        oneDigit = this.getRandomInt(2, 9);
        answer = this.getRandomInt(3, 30);
        twoDigit = oneDigit * answer;
    }
    
    const questionType: QuestionType = Math.random() < 0.5 ? 'multiple_choice' : 'input';
    
    return {
      id: this.generateUniqueId(),
      type: 'two_digit_divide',
      question: `${twoDigit} : ${oneDigit} = ?`,
      answer: answer,
      questionType: questionType,
      options: questionType === 'multiple_choice' ? this.generateMultipleChoiceOptions(answer) : undefined,
      isAnswered: false
    };
  }

  // Nhân số có ba chữ số với số có một chữ số
  static generateThreeDigitMultiply(difficulty: 'easy' | 'medium' | 'hard' = 'medium'): MathProblem {
    let threeDigit, oneDigit, answer;
    
    switch (difficulty) {
      case 'easy':
        threeDigit = this.getRandomInt(100, 200);
        oneDigit = this.getRandomInt(2, 5);
        break;
      case 'medium':
        threeDigit = this.getRandomInt(150, 400);
        oneDigit = this.getRandomInt(3, 7);
        break;
      case 'hard':
        threeDigit = this.getRandomInt(200, 999);
        oneDigit = this.getRandomInt(4, 9);
        break;
      default:
        threeDigit = this.getRandomInt(100, 999);
        oneDigit = this.getRandomInt(2, 9);
    }
    
    answer = threeDigit * oneDigit;
    const questionType: QuestionType = Math.random() < 0.5 ? 'multiple_choice' : 'input';
    
    return {
      id: this.generateUniqueId(),
      type: 'three_digit_multiply',
      question: `${threeDigit} × ${oneDigit} = ?`,
      answer: answer,
      questionType: questionType,
      options: questionType === 'multiple_choice' ? this.generateMultipleChoiceOptions(answer) : undefined,
      isAnswered: false
    };
  }

  // Chia số có ba chữ số cho số có một chữ số
  static generateThreeDigitDivide(difficulty: 'easy' | 'medium' | 'hard' = 'medium'): MathProblem {
    let threeDigit, oneDigit, answer;
    
    switch (difficulty) {
      case 'easy':
        oneDigit = this.getRandomInt(2, 5);
        answer = this.getRandomInt(20, 50);
        threeDigit = oneDigit * answer;
        break;
      case 'medium':
        oneDigit = this.getRandomInt(3, 7);
        answer = this.getRandomInt(30, 100);
        threeDigit = oneDigit * answer;
        break;
      case 'hard':
        oneDigit = this.getRandomInt(4, 9);
        answer = this.getRandomInt(50, 200);
        threeDigit = oneDigit * answer;
        break;
      default:
        oneDigit = this.getRandomInt(2, 9);
        answer = this.getRandomInt(20, 300);
        threeDigit = oneDigit * answer;
    }
    
    const questionType: QuestionType = Math.random() < 0.5 ? 'multiple_choice' : 'input';
    
    return {
      id: this.generateUniqueId(),
      type: 'three_digit_divide',
      question: `${threeDigit} : ${oneDigit} = ?`,
      answer: answer,
      questionType: questionType,
      options: questionType === 'multiple_choice' ? this.generateMultipleChoiceOptions(answer) : undefined,
      isAnswered: false
    };
  }

  static generateProblem(type: ProblemType, difficulty: 'easy' | 'medium' | 'hard' = 'medium'): MathProblem {
    switch (type) {
      case 'multiplication_table':
        return this.generateMultiplicationTable(difficulty);
      case 'division_table':
        return this.generateDivisionTable(difficulty);
      case 'addition':
        return this.generateAddition(difficulty);
      case 'subtraction':
        return this.generateSubtraction(difficulty);
      case 'multiplication':
        return this.generateMultiplication(difficulty);
      case 'division':
        return this.generateDivision(difficulty);
      case 'two_digit_multiply':
        return this.generateTwoDigitMultiply(difficulty);
      case 'division_with_remainder':
        return this.generateDivisionWithRemainder(difficulty);
      case 'two_digit_divide':
        return this.generateTwoDigitDivide(difficulty);
      case 'three_digit_multiply':
        return this.generateThreeDigitMultiply(difficulty);
      case 'three_digit_divide':
        return this.generateThreeDigitDivide(difficulty);
      default:
        return this.generateAddition(difficulty);
    }
  }

  static generateRandomProblem(enabledTypes: ProblemType[], difficulty: 'easy' | 'medium' | 'hard' = 'medium'): MathProblem {
    const randomType = enabledTypes[Math.floor(Math.random() * enabledTypes.length)];
    return this.generateProblem(randomType, difficulty);
  }

  // Generate a set of unique problems to avoid duplicates
  static generateUniqueProblems(
    enabledTypes: ProblemType[], 
    quantity: number, 
    difficulty: 'easy' | 'medium' | 'hard' = 'medium'
  ): MathProblem[] {
    const problems: MathProblem[] = [];
    const usedQuestions = new Set<string>();

    while (problems.length < quantity) {
      const problem = this.generateRandomProblem(enabledTypes, difficulty);
      
      // Create a normalized question key to avoid duplicates like 8×5 and 5×8
      const normalizedKey = this.createNormalizedQuestionKey(problem);
      
      if (!usedQuestions.has(normalizedKey)) {
        usedQuestions.add(normalizedKey);
        problems.push(problem);
      }
    }

    return problems;
  }

  private static createNormalizedQuestionKey(problem: MathProblem): string {
    // Extract numbers from question string and normalize for commutative operations
    const question = problem.question;
    
    if (question.includes('×') || question.includes('*')) {
      // For multiplication, normalize by putting smaller number first
      const match = question.match(/(\d+)\s*[×*]\s*(\d+)/);
      if (match) {
        const [_, a, b] = match;
        const numA = parseInt(a);
        const numB = parseInt(b);
        return `mult:${Math.min(numA, numB)}×${Math.max(numA, numB)}`;
      }
    } else if (question.includes('+')) {
      // For addition, normalize by putting smaller number first
      const match = question.match(/(\d+)\s*\+\s*(\d+)/);
      if (match) {
        const [_, a, b] = match;
        const numA = parseInt(a);
        const numB = parseInt(b);
        return `add:${Math.min(numA, numB)}+${Math.max(numA, numB)}`;
      }
    } else if (question.includes('-')) {
      // For subtraction, keep as is since a-b ≠ b-a
      const match = question.match(/(\d+)\s*-\s*(\d+)/);
      if (match) {
        const [_, a, b] = match;
        return `sub:${a}-${b}`;
      }
    } else if (question.includes(':')) {
      // For division, normalize to avoid duplicates like 42:7 and 42:6
      const match = question.match(/(\d+)\s*:\s*(\d+)/);
      if (match) {
        const [_, dividend, divisor] = match;
        const numDividend = parseInt(dividend);
        const numDivisor = parseInt(divisor);
        const quotient = numDividend / numDivisor;
        
        // For division, we want to avoid cases where the same multiplication fact
        // appears as different division problems (e.g., 42÷7=6 and 42÷6=7)
        // We normalize by using the smaller of the two factors
        const factor1 = numDivisor;
        const factor2 = quotient;
        
        if (Number.isInteger(quotient) && factor2 > 0) {
          // This is a clean division, normalize by smaller factor
          return `div:${Math.min(factor1, factor2)}×${Math.max(factor1, factor2)}=${numDividend}`;
        } else {
          // This is a division with remainder, keep as is
          return `div:${numDividend}:${numDivisor}`;
        }
      }
    }
    
    // Fallback to original question
    return `fallback:${question}`;
  }
}
