import { MathProblem, ProblemType } from '../../types';
import { Difficulty } from './helpers';
import { createNormalizedQuestionKey } from './deduplication';

// Import Grade 3 generators
import { generateAddition, generateSubtraction, generateMultiplication, generateDivision } from './generators/arithmetic';
import { generateMultiplicationTable, generateDivisionTable } from './generators/tables';
import { generateTwoDigitMultiply, generateTwoDigitDivide, generateThreeDigitMultiply, generateThreeDigitDivide, generateDivisionWithRemainder } from './generators/advanced';
import { generateWordProblemMoreLess, generateWordProblemMultiplyDivide, generateWordProblemUnitConversion, generateWordProblemDivisionRemainder } from './generators/wordProblems';
import { generateGeometryMidpoint, generateGeometryCircle, generateGeometryRectangle, generateGeometrySquare } from './generators/geometry';
import {
  generateReviewClockReading,
  generateReviewFractionOfNumber,
  generateReviewWrittenCalculation,
  generateReviewBrokenLine,
  generateReviewChainCalculation,
  generateReviewFillBlank,
  generateReviewRounding,
  generateReviewDateCalculation,
  generateReviewMoney,
  generateReviewDigitValue,
  generateReviewMonthDays,
  generateReviewRomanNumerals,
  generateReviewCubeProperties,
  generateReviewExpression,
  generateReviewUnitConversion
} from './generators/review';
import { generateVisualFraction, generateTrueFalseMultiplyDivide, generateUnitCalculation } from './generators/visual';

// Import Grade 4 generators
import {
  // Fractions
  generateFractionBasics,
  generateFractionEquivalent,
  generateFractionCompare,
  generateFractionAddition,
  generateFractionSubtraction,
  generateFractionMultiply,
  generateFractionDivide,
  generateFractionOfNumber,
  // Divisibility
  generateDivisibleBy2,
  generateDivisibleBy5,
  generateDivisibleBy3,
  generateDivisibleBy9,
  generateDivisibilityMixed,
  // Large Numbers
  generateLargeNumberAddition,
  generateLargeNumberSubtraction,
  generateLargeNumberMultiply,
  generateLargeNumberDivide,
  // Geometry
  generateParallelogramPerimeter,
  generateParallelogramArea,
  generateRhombusPerimeter,
  generateRhombusArea,
  generateAngleTypes,
  // Word Problems
  generateWordProblemRatio,
  generateWordProblemAverage,
  generateWordProblemFraction,
  // Measurement
  generateUnitMassConvert,
  generateUnitTimeConvert,
  generateUnitAreaConvert
} from './generators/grade4';

// Import Grade 5 generators
import {
  // Decimals
  generateDecimalReadWrite,
  generateDecimalCompare,
  generateDecimalAddition,
  generateDecimalSubtraction,
  generateDecimalMultiply,
  generateDecimalDivide,
  // Percentages
  generatePercentOfNumber,
  generatePercentFindRate,
  generatePercentFindTotal,
  generatePercentConvert,
  // Geometry
  generateCircleCircumference,
  generateCircleArea,
  generateRectangularPrismVolume,
  generateCubeVolume,
  generateCompositeArea,
  // Speed/Distance/Time
  generateSpeedFindSpeed,
  generateSpeedFindDistance,
  generateSpeedFindTime,
  // Word Problems
  generateWordProblemPercentG5,
  generateWordProblemSpeed,
  generateWordProblemWork,
  // Mixed Operations
  generateMixedDecimalFraction,
  generateOrderOfOperations
} from './generators/grade5';

export class ProblemGenerator {
  private static readonly SEMESTER2_TYPES: ProblemType[] = [
    'addition',
    'subtraction',
    'two_digit_multiply',
    'two_digit_divide',
    'three_digit_multiply',
    'three_digit_divide',
    'division_with_remainder',
    'review_written_calculation',
    'review_expression',
    'review_rounding',
    'review_unit_conversion',
    'review_date_calculation',
    'review_money',
    'review_digit_value',
    'review_month_days',
    'review_roman_numerals',
    'review_cube_properties',
    'geometry_midpoint',
    'geometry_rectangle',
    'geometry_square',
    'geometry_circle',
    'word_problem_more_less',
    'word_problem_multiply_divide',
    'word_problem_unit_conversion',
    'word_problem_division_remainder'
  ];

  private static readonly SEMESTER2_WEIGHTED_TYPES: ProblemType[] = [
    // Keep some basic arithmetic, but not too frequent
    'addition',
    'subtraction',

    // Core HK2 arithmetic focus
    'two_digit_multiply', 'two_digit_multiply',
    'two_digit_divide', 'two_digit_divide',
    'three_digit_multiply', 'three_digit_multiply',
    'three_digit_divide', 'three_digit_divide',
    'division_with_remainder', 'division_with_remainder',
    'review_written_calculation', 'review_written_calculation',
    'review_expression', 'review_expression',

    // Practical forms from worksheets
    'review_rounding',
    'review_unit_conversion', 'review_unit_conversion',
    'review_date_calculation',
    'review_money', 'review_money',
    'review_digit_value',
    'review_month_days',
    'review_roman_numerals',

    // Geometry
    'review_cube_properties',
    'geometry_midpoint',
    'geometry_rectangle', 'geometry_rectangle',
    'geometry_square', 'geometry_square',
    'geometry_circle', 'geometry_circle',

    // Word problems
    'word_problem_more_less', 'word_problem_more_less',
    'word_problem_multiply_divide', 'word_problem_multiply_divide',
    'word_problem_unit_conversion', 'word_problem_unit_conversion',
    'word_problem_division_remainder', 'word_problem_division_remainder'
  ];

  private static isTooEasyForSemester2(problem: MathProblem): boolean {
    const question = problem.question;

    if (problem.type === 'addition') {
      const match = question.match(/(\d+)\s*\+\s*(\d+)/);
      if (!match) return false;
      const a = parseInt(match[1], 10);
      const b = parseInt(match[2], 10);
      return a < 500 || b < 500;
    }

    if (problem.type === 'subtraction') {
      const match = question.match(/(\d+)\s*-\s*(\d+)/);
      if (!match) return false;
      const a = parseInt(match[1], 10);
      const b = parseInt(match[2], 10);
      return a < 1000 || b < 100;
    }

    if (problem.type === 'multiplication' || problem.type === 'two_digit_multiply' || problem.type === 'three_digit_multiply') {
      const match = question.match(/(\d+)\s*[×x]\s*(\d+)/);
      if (!match) return false;
      const a = parseInt(match[1], 10);
      const b = parseInt(match[2], 10);
      return a <= 12 || b <= 5;
    }

    if (problem.type === 'division' || problem.type === 'two_digit_divide' || problem.type === 'three_digit_divide') {
      const match = question.match(/(\d+)\s*:\s*(\d+)/);
      if (!match) return false;
      const dividend = parseInt(match[1], 10);
      const divisor = parseInt(match[2], 10);
      const quotient = problem.answer;
      return dividend <= 120 || divisor <= 5 || quotient <= 10;
    }

    if (problem.type === 'division_with_remainder') {
      const numbers = question.match(/\d+/g)?.map(n => parseInt(n, 10)) || [];
      if (numbers.length < 2) return false;
      const maxNumber = Math.max(...numbers);
      return maxNumber < 100;
    }

    if (problem.type === 'word_problem_multiply_divide') {
      const numbers = question.match(/\d+/g)?.map(n => parseInt(n, 10)) || [];
      if (numbers.length === 0) return false;
      const maxNumber = Math.max(...numbers);
      const minNumber = Math.min(...numbers);
      return minNumber < 10 || maxNumber < 100;
    }

    if (problem.type === 'review_written_calculation') {
      const numbers = question.match(/\d+/g)?.map(n => parseInt(n, 10)) || [];
      if (numbers.length < 2) return false;
      return Math.max(...numbers) < 1000;
    }

    return false;
  }

  private static generateSemester2ProblemOfType(type: ProblemType, difficulty: Difficulty): MathProblem {
    const maxAttempts = 25;
    for (let i = 0; i < maxAttempts; i++) {
      const problem = this.generateProblem(type, difficulty);
      if (!this.isTooEasyForSemester2(problem)) {
        return problem;
      }
    }

    return this.generateProblem(type, difficulty);
  }

  static generateProblem(type: ProblemType, difficulty: Difficulty = 'medium'): MathProblem {
    switch (type) {
      // Grade 3 - Basic Arithmetic
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

      // Grade 3 - Advanced
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

      // Grade 3 - Word Problems
      case 'word_problem_more_less':
        return generateWordProblemMoreLess(difficulty);
      case 'word_problem_multiply_divide':
        return generateWordProblemMultiplyDivide(difficulty);
      case 'word_problem_unit_conversion':
        return generateWordProblemUnitConversion(difficulty);
      case 'word_problem_division_remainder':
        return generateWordProblemDivisionRemainder(difficulty);

      // Grade 3 - Geometry
      case 'geometry_midpoint':
        return generateGeometryMidpoint(difficulty);
      case 'geometry_circle':
        return generateGeometryCircle(difficulty);
      case 'geometry_rectangle':
        return generateGeometryRectangle(difficulty);
      case 'geometry_square':
        return generateGeometrySquare(difficulty);

      // Grade 3 - Review
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
      case 'review_rounding':
        return generateReviewRounding(difficulty);
      case 'review_date_calculation':
        return generateReviewDateCalculation(difficulty);
      case 'review_money':
        return generateReviewMoney(difficulty);
      case 'review_digit_value':
        return generateReviewDigitValue(difficulty);
      case 'review_month_days':
        return generateReviewMonthDays(difficulty);
      case 'review_roman_numerals':
        return generateReviewRomanNumerals(difficulty);
      case 'review_cube_properties':
        return generateReviewCubeProperties();
      case 'review_expression':
        return generateReviewExpression(difficulty);
      case 'review_unit_conversion':
        return generateReviewUnitConversion(difficulty);
      case 'review_semester_1':
        return this.generateReviewSemester1(difficulty);
      case 'review_semester_2':
        return this.generateReviewSemester2(difficulty);

      // Grade 3 - Visual
      case 'visual_fraction':
        return generateVisualFraction(difficulty);
      case 'true_false_multiply_divide':
        return generateTrueFalseMultiplyDivide(difficulty);
      case 'unit_calculation':
        return generateUnitCalculation(difficulty);

      // Grade 4 - Large Numbers
      case 'large_number_addition':
        return generateLargeNumberAddition(difficulty);
      case 'large_number_subtraction':
        return generateLargeNumberSubtraction(difficulty);
      case 'large_number_multiply':
        return generateLargeNumberMultiply(difficulty);
      case 'large_number_divide':
        return generateLargeNumberDivide(difficulty);

      // Grade 4 - Divisibility
      case 'divisible_by_2':
        return generateDivisibleBy2(difficulty);
      case 'divisible_by_5':
        return generateDivisibleBy5(difficulty);
      case 'divisible_by_3':
        return generateDivisibleBy3(difficulty);
      case 'divisible_by_9':
        return generateDivisibleBy9(difficulty);
      case 'divisibility_mixed':
        return generateDivisibilityMixed(difficulty);

      // Grade 4 - Fractions
      case 'fraction_basics':
        return generateFractionBasics(difficulty);
      case 'fraction_equivalent':
        return generateFractionEquivalent(difficulty);
      case 'fraction_compare':
        return generateFractionCompare(difficulty);
      case 'fraction_addition':
        return generateFractionAddition(difficulty);
      case 'fraction_subtraction':
        return generateFractionSubtraction(difficulty);
      case 'fraction_multiply':
        return generateFractionMultiply(difficulty);
      case 'fraction_divide':
        return generateFractionDivide(difficulty);
      case 'fraction_of_number':
        return generateFractionOfNumber(difficulty);

      // Grade 4 - Geometry
      case 'parallelogram_perimeter':
        return generateParallelogramPerimeter(difficulty);
      case 'parallelogram_area':
        return generateParallelogramArea(difficulty);
      case 'rhombus_perimeter':
        return generateRhombusPerimeter(difficulty);
      case 'rhombus_area':
        return generateRhombusArea(difficulty);
      case 'angle_types':
        return generateAngleTypes(difficulty);

      // Grade 4 - Word Problems
      case 'word_problem_ratio':
        return generateWordProblemRatio(difficulty);
      case 'word_problem_average':
        return generateWordProblemAverage(difficulty);
      case 'word_problem_fraction':
        return generateWordProblemFraction(difficulty);

      // Grade 4 - Measurement
      case 'unit_mass_convert':
        return generateUnitMassConvert(difficulty);
      case 'unit_time_convert':
        return generateUnitTimeConvert(difficulty);
      case 'unit_area_convert':
        return generateUnitAreaConvert(difficulty);

      // Grade 5 - Decimals
      case 'decimal_read_write':
        return generateDecimalReadWrite(difficulty);
      case 'decimal_compare':
        return generateDecimalCompare(difficulty);
      case 'decimal_addition':
        return generateDecimalAddition(difficulty);
      case 'decimal_subtraction':
        return generateDecimalSubtraction(difficulty);
      case 'decimal_multiply':
        return generateDecimalMultiply(difficulty);
      case 'decimal_divide':
        return generateDecimalDivide(difficulty);

      // Grade 5 - Percentages
      case 'percent_of_number':
        return generatePercentOfNumber(difficulty);
      case 'percent_find_rate':
        return generatePercentFindRate(difficulty);
      case 'percent_find_total':
        return generatePercentFindTotal(difficulty);
      case 'percent_convert':
        return generatePercentConvert(difficulty);

      // Grade 5 - Geometry
      case 'circle_circumference':
        return generateCircleCircumference(difficulty);
      case 'circle_area':
        return generateCircleArea(difficulty);
      case 'rectangular_prism_volume':
        return generateRectangularPrismVolume(difficulty);
      case 'cube_volume':
        return generateCubeVolume(difficulty);
      case 'composite_area':
        return generateCompositeArea(difficulty);

      // Grade 5 - Speed/Distance/Time
      case 'speed_find_speed':
        return generateSpeedFindSpeed(difficulty);
      case 'speed_find_distance':
        return generateSpeedFindDistance(difficulty);
      case 'speed_find_time':
        return generateSpeedFindTime(difficulty);

      // Grade 5 - Word Problems
      case 'word_problem_percent_g5':
        return generateWordProblemPercentG5(difficulty);
      case 'word_problem_speed':
        return generateWordProblemSpeed(difficulty);
      case 'word_problem_work':
        return generateWordProblemWork(difficulty);

      // Grade 5 - Mixed Operations
      case 'mixed_decimal_fraction':
        return generateMixedDecimalFraction(difficulty);
      case 'order_of_operations':
        return generateOrderOfOperations(difficulty);

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

  private static generateReviewSemester2(_difficulty: Difficulty): MathProblem {
    // HK2 always runs in hard mode to match worksheet level
    const effectiveDifficulty: Difficulty = 'hard';
    const randomType = this.SEMESTER2_WEIGHTED_TYPES[Math.floor(Math.random() * this.SEMESTER2_WEIGHTED_TYPES.length)];
    const problem = this.generateSemester2ProblemOfType(randomType, effectiveDifficulty);

    return {
      ...problem,
      type: 'review_semester_2'
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

    if (enabledTypes.length === 1 && enabledTypes[0] === 'review_semester_2') {
      const effectiveDifficulty: Difficulty = 'hard';

      for (const type of this.SEMESTER2_TYPES) {
        const problem = this.generateSemester2ProblemOfType(type, effectiveDifficulty);
        const originalType = problem.type;
        problem.originalType = originalType;
        problem.type = 'review_semester_2';
        const normalizedKey = createNormalizedQuestionKey(problem);
        if (!usedQuestions.has(normalizedKey)) {
          usedQuestions.add(normalizedKey);
          problems.push(problem);
        }
      }

      while (problems.length < quantity) {
        const randomType = this.SEMESTER2_WEIGHTED_TYPES[Math.floor(Math.random() * this.SEMESTER2_WEIGHTED_TYPES.length)];
        const problem = this.generateSemester2ProblemOfType(randomType, effectiveDifficulty);
        const originalType = problem.type;
        problem.originalType = originalType;
        problem.type = 'review_semester_2';
        const normalizedKey = createNormalizedQuestionKey(problem);
        if (!usedQuestions.has(normalizedKey)) {
          usedQuestions.add(normalizedKey);
          problems.push(problem);
        }
      }

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
