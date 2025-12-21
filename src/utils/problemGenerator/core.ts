import { MathProblem, ProblemType } from '../../types';
import { Difficulty } from './helpers';
import { createNormalizedQuestionKey } from './deduplication';

// Import all generators
import { generateAddition, generateSubtraction, generateMultiplication, generateDivision } from './generators/arithmetic';
import { generateMultiplicationTable, generateDivisionTable } from './generators/tables';
import { generateTwoDigitMultiply, generateTwoDigitDivide, generateThreeDigitMultiply, generateThreeDigitDivide, generateDivisionWithRemainder } from './generators/advanced';
import { generateWordProblemMoreLess, generateWordProblemMultiplyDivide, generateWordProblemUnitConversion, generateWordProblemDivisionRemainder } from './generators/wordProblems';
import { generateGeometryMidpoint, generateGeometryCircle, generateGeometryRectangle, generateGeometrySquare } from './generators/geometry';
import { generateReviewClockReading, generateReviewFractionOfNumber, generateReviewWrittenCalculation, generateReviewBrokenLine, generateReviewChainCalculation, generateReviewFillBlank } from './generators/review';
import { generateVisualFraction, generateTrueFalseMultiplyDivide, generateUnitCalculation } from './generators/visual';

export class ProblemGenerator {
  static generateProblem(type: ProblemType, difficulty: Difficulty = 'medium'): MathProblem {
    switch (type) {
      case 'multiplication_table':
        return generateMultiplicationTable(difficulty);
      case 'division_table':
        return generateDivisionTable(difficulty);
      case 'addition':
        return generateAddition(difficulty);
      case 'subtraction':
        return generateSubtraction(difficulty);
      case 'multiplication':
        return generateMultiplication(difficulty);
      case 'division':
        return generateDivision(difficulty);
      case 'two_digit_multiply':
        return generateTwoDigitMultiply(difficulty);
      case 'division_with_remainder':
        return generateDivisionWithRemainder(difficulty);
      case 'two_digit_divide':
        return generateTwoDigitDivide(difficulty);
      case 'three_digit_multiply':
        return generateThreeDigitMultiply(difficulty);
      case 'three_digit_divide':
        return generateThreeDigitDivide(difficulty);
      case 'word_problem_more_less':
        return generateWordProblemMoreLess(difficulty);
      case 'word_problem_multiply_divide':
        return generateWordProblemMultiplyDivide(difficulty);
      case 'word_problem_unit_conversion':
        return generateWordProblemUnitConversion(difficulty);
      case 'geometry_midpoint':
        return generateGeometryMidpoint(difficulty);
      case 'geometry_circle':
        return generateGeometryCircle(difficulty);
      case 'geometry_rectangle':
        return generateGeometryRectangle(difficulty);
      case 'geometry_square':
        return generateGeometrySquare(difficulty);
      case 'review_clock_reading':
        return generateReviewClockReading(difficulty);
      case 'review_fraction_of_number':
        return generateReviewFractionOfNumber(difficulty);
      case 'review_written_calculation':
        return generateReviewWrittenCalculation(difficulty);
      case 'review_broken_line':
        return generateReviewBrokenLine(difficulty);
      case 'review_chain_calculation':
        return generateReviewChainCalculation(difficulty);
      case 'review_fill_blank':
        return generateReviewFillBlank(difficulty);
      case 'word_problem_division_remainder':
        return generateWordProblemDivisionRemainder(difficulty);
      case 'visual_fraction':
        return generateVisualFraction(difficulty);
      case 'true_false_multiply_divide':
        return generateTrueFalseMultiplyDivide(difficulty);
      case 'unit_calculation':
        return generateUnitCalculation(difficulty);
      case 'review_semester_1':
        return this.generateReviewSemester1(difficulty);
      default:
        return generateAddition(difficulty);
    }
  }

  // On tap Hoc ky 1 - Semester 1 Review (mixed questions)
  private static generateReviewSemester1(difficulty: Difficulty): MathProblem {
    const semester1Types: ProblemType[] = [
      'two_digit_multiply',
      'two_digit_divide',
      'three_digit_multiply',
      'three_digit_divide',
      'division_with_remainder',
      'word_problem_more_less',
      'word_problem_multiply_divide',
      'word_problem_division_remainder',
      'geometry_circle',
      'review_clock_reading',
      'review_fraction_of_number',
      'review_written_calculation',
      'review_broken_line',
      'review_chain_calculation',
      'review_fill_blank',
      'visual_fraction',
      'true_false_multiply_divide',
      'unit_calculation'
    ];

    const randomType = semester1Types[Math.floor(Math.random() * semester1Types.length)];
    const problem = this.generateProblem(randomType, difficulty);

    return {
      ...problem,
      type: 'review_semester_1'
    };
  }

  static generateRandomProblem(enabledTypes: ProblemType[], difficulty: Difficulty = 'medium'): MathProblem {
    const randomType = enabledTypes[Math.floor(Math.random() * enabledTypes.length)];
    return this.generateProblem(randomType, difficulty);
  }

  // Generate a set of unique problems to avoid duplicates
  static generateUniqueProblems(
    enabledTypes: ProblemType[],
    quantity: number,
    difficulty: Difficulty = 'medium'
  ): MathProblem[] {
    const problems: MathProblem[] = [];
    const usedQuestions = new Set<string>();

    // Special handling for review_semester_1: ensure at least 1 question per type
    if (enabledTypes.length === 1 && enabledTypes[0] === 'review_semester_1') {
      const semester1Types: ProblemType[] = [
        'two_digit_multiply', 'two_digit_divide', 'three_digit_multiply',
        'three_digit_divide', 'division_with_remainder', 'word_problem_more_less',
        'word_problem_multiply_divide', 'word_problem_division_remainder',
        'geometry_circle', 'review_clock_reading', 'review_fraction_of_number',
        'review_written_calculation', 'review_broken_line', 'review_chain_calculation',
        'review_fill_blank', 'visual_fraction', 'true_false_multiply_divide', 'unit_calculation'
      ];

      // First, generate one question for each type
      for (const type of semester1Types) {
        const problem = this.generateProblem(type, difficulty);
        // Store original type before override
        const originalType = problem.type;
        problem.originalType = originalType;
        // Override type to show as review_semester_1
        problem.type = 'review_semester_1';
        const normalizedKey = createNormalizedQuestionKey(problem);
        if (!usedQuestions.has(normalizedKey)) {
          usedQuestions.add(normalizedKey);
          problems.push(problem);
        }
      }

      // Fill remaining with random semester1 types
      while (problems.length < quantity) {
        const randomType = semester1Types[Math.floor(Math.random() * semester1Types.length)];
        const problem = this.generateProblem(randomType, difficulty);
        // Store original type before override
        const originalType = problem.type;
        problem.originalType = originalType;
        problem.type = 'review_semester_1';
        const normalizedKey = createNormalizedQuestionKey(problem);
        if (!usedQuestions.has(normalizedKey)) {
          usedQuestions.add(normalizedKey);
          problems.push(problem);
        }
      }

      // Shuffle to mix the order
      return problems.sort(() => Math.random() - 0.5);
    }

    // Original logic for other types
    while (problems.length < quantity) {
      const problem = this.generateRandomProblem(enabledTypes, difficulty);
      const normalizedKey = createNormalizedQuestionKey(problem);

      if (!usedQuestions.has(normalizedKey)) {
        usedQuestions.add(normalizedKey);
        problems.push(problem);
      }
    }

    return problems;
  }
}
