import { MathProblem, ProblemType } from '../types';

export class ProblemGenerator {
  private static generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private static getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Bảng nhân từ 1 đến 9
  static generateMultiplicationTable(): MathProblem {
    const a = this.getRandomInt(1, 9);
    const b = this.getRandomInt(1, 9);
    return {
      id: this.generateId(),
      type: 'multiplication_table',
      question: `${a} × ${b} = ?`,
      answer: a * b
    };
  }

  // Bảng chia từ 1 đến 9
  static generateDivisionTable(): MathProblem {
    const a = this.getRandomInt(1, 9);
    const b = this.getRandomInt(1, 9);
    const product = a * b;
    return {
      id: this.generateId(),
      type: 'division_table',
      question: `${product} : ${a} = ?`,
      answer: b
    };
  }

  // Phép cộng trong phạm vi 1000
  static generateAddition(): MathProblem {
    const a = this.getRandomInt(0, 1000);
    const b = this.getRandomInt(0, 1000 - a);
    return {
      id: this.generateId(),
      type: 'addition',
      question: `${a} + ${b} = ?`,
      answer: a + b
    };
  }

  // Phép trừ trong phạm vi 1000
  static generateSubtraction(): MathProblem {
    const a = this.getRandomInt(0, 1000);
    const b = this.getRandomInt(0, a);
    return {
      id: this.generateId(),
      type: 'subtraction',
      question: `${a} - ${b} = ?`,
      answer: a - b
    };
  }

  // Phép nhân trong phạm vi 100
  static generateMultiplication(): MathProblem {
    const a = this.getRandomInt(1, 10);
    const b = this.getRandomInt(1, 10);
    return {
      id: this.generateId(),
      type: 'multiplication',
      question: `${a} × ${b} = ?`,
      answer: a * b
    };
  }

  // Phép chia trong phạm vi 100
  static generateDivision(): MathProblem {
    const a = this.getRandomInt(1, 10);
    const b = this.getRandomInt(1, 10);
    const product = a * b;
    return {
      id: this.generateId(),
      type: 'division',
      question: `${product} : ${a} = ?`,
      answer: b
    };
  }

  static generateProblem(type: ProblemType): MathProblem {
    switch (type) {
      case 'multiplication_table':
        return this.generateMultiplicationTable();
      case 'division_table':
        return this.generateDivisionTable();
      case 'addition':
        return this.generateAddition();
      case 'subtraction':
        return this.generateSubtraction();
      case 'multiplication':
        return this.generateMultiplication();
      case 'division':
        return this.generateDivision();
      default:
        return this.generateAddition();
    }
  }

  static generateRandomProblem(enabledTypes: ProblemType[]): MathProblem {
    const randomType = enabledTypes[Math.floor(Math.random() * enabledTypes.length)];
    return this.generateProblem(randomType);
  }
}
