# Problem Type Registry

## Purpose

Single registry reference for type ownership and behavior across UI and generator layers.

## Grade 3 Types

## Core
- `addition`, `subtraction`
- `multiplication`, `division`
- `multiplication_table`, `division_table`

## Advanced
- `two_digit_multiply`, `two_digit_divide`
- `three_digit_multiply`, `three_digit_divide`
- `division_with_remainder`

## Word Problems
- `word_problem_more_less`
- `word_problem_multiply_divide`
- `word_problem_unit_conversion`
- `word_problem_division_remainder`

## Geometry
- `geometry_midpoint`
- `geometry_circle`
- `geometry_rectangle`
- `geometry_square`

## Review/Special
- `review_clock_reading`
- `review_fraction_of_number`
- `review_written_calculation`
- `review_broken_line`
- `review_chain_calculation`
- `review_fill_blank`
- `review_rounding`
- `review_date_calculation`
- `review_money`
- `review_digit_value`
- `review_month_days`
- `review_roman_numerals`
- `review_cube_properties`
- `review_expression`
- `review_unit_conversion`
- `visual_fraction`
- `true_false_multiply_divide`
- `unit_calculation`
- `review_semester_1`
- `review_semester_2`

## Grade 4 Types

Defined in grade4 constants/generators:
- large numbers
- divisibility
- fractions
- geometry
- word problems
- measurement

## Grade 5 Types

Defined in grade5 constants/generators:
- decimals
- percentages
- geometry
- speed-distance-time
- word problems
- mixed operations

## Rendering Contracts

- Questions can be:
  - numeric input
  - numeric MCQ (`options`)
  - text MCQ (`textOptions`)
- Optional special tags in `question`:
  - `[CLOCK:h:m]`
  - `[FRACTION_OPTIONS:[...]]`
- `originalType` is used for review collections so results can still show underlying subtype.

## Generator Ownership

- Grade 3: `arithmetic.ts`, `advanced.ts`, `wordProblems.ts`, `geometry.ts`, `review.ts`, `visual.ts`
- Grade 4: `generators/grade4/*`
- Grade 5: `generators/grade5/*`
- Dispatcher: `ProblemGenerator.generateProblem()` in `core.ts`

