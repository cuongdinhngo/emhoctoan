import { MathProblem } from '../../types';

export function createNormalizedQuestionKey(problem: MathProblem): string {
  const question = problem.question;
  const type = problem.type;

  // Handle word problems, geometry, and review types by extracting key numbers
  if (
    type === 'word_problem_more_less' ||
    type === 'word_problem_multiply_divide' ||
    type === 'word_problem_unit_conversion'
  ) {
    const numbers = question.match(/\d+/g)?.map(n => parseInt(n)).sort((a, b) => a - b) || [];
    return `${type}:${numbers.join(',')}`;
  }

  if (
    type === 'review_clock_reading' ||
    type === 'review_fraction_of_number' ||
    type === 'review_written_calculation' ||
    type === 'review_broken_line' ||
    type === 'review_chain_calculation' ||
    type === 'review_fill_blank' ||
    type === 'review_semester_1'
  ) {
    const numbers = question.match(/\d+/g)?.map(n => parseInt(n)).sort((a, b) => a - b) || [];
    return `${type}:${numbers.join(',')}`;
  }

  if (type === 'word_problem_division_remainder') {
    const numbers = question.match(/\d+/g)?.map(n => parseInt(n)).sort((a, b) => a - b) || [];
    return `${type}:${numbers.join(',')}`;
  }

  if (
    type === 'geometry_midpoint' ||
    type === 'geometry_circle' ||
    type === 'geometry_rectangle' ||
    type === 'geometry_square'
  ) {
    const numbers = question.match(/\d+/g)?.map(n => parseInt(n)).sort((a, b) => a - b) || [];
    return `${type}:${numbers.join(',')}`;
  }

  if (question.includes('×') || question.includes('*')) {
    // For multiplication, normalize by putting smaller number first
    const match = question.match(/(\d+)\s*[×*]\s*(\d+)/);
    if (match) {
      const [, a, b] = match;
      const numA = parseInt(a);
      const numB = parseInt(b);
      return `mult:${Math.min(numA, numB)}×${Math.max(numA, numB)}`;
    }
  } else if (question.includes('+')) {
    // For addition, normalize by putting smaller number first
    const match = question.match(/(\d+)\s*\+\s*(\d+)/);
    if (match) {
      const [, a, b] = match;
      const numA = parseInt(a);
      const numB = parseInt(b);
      return `add:${Math.min(numA, numB)}+${Math.max(numA, numB)}`;
    }
  } else if (question.includes('-')) {
    // For subtraction, keep as is since a-b ≠ b-a
    const match = question.match(/(\d+)\s*-\s*(\d+)/);
    if (match) {
      const [, a, b] = match;
      return `sub:${a}-${b}`;
    }
  } else if (question.includes(':')) {
    // For division, normalize to avoid duplicates like 42:7 and 42:6
    const match = question.match(/(\d+)\s*:\s*(\d+)/);
    if (match) {
      const [, dividend, divisor] = match;
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
