# Review Modes Semester Spec

## Purpose

Define strict behavior for semester review collections, including guaranteed coverage and difficulty policy.

## Review Mode Selection Rules

- Grade 3 review modes are exclusive selections:
  - `review_semester_1`
  - `review_semester_2`
- Selecting one review mode replaces normal grade3 checkbox selection.

## Semester 1 (`review_semester_1`)

Behavior:
- fixed subtype list for HK1
- minimum quantity equals subtype count
- generation guarantees at least one question per subtype
- extra questions are random within HK1 subtype list
- generated question `type` is overridden to `review_semester_1`
- underlying subtype saved in `originalType`

Difficulty:
- uses selected difficulty as provided

## Semester 2 (`review_semester_2`)

Behavior:
- DOCX-aligned subtype set for HK2
- minimum quantity equals HK2 subtype count
- generation guarantees at least one question per subtype
- extra questions follow weighted distribution
- generated question `type` is overridden to `review_semester_2`
- underlying subtype saved in `originalType`

Difficulty Policy:
- HK2 internally forces hard generation behavior
- additional anti-easy filters retry generation for selected types

## HK2 Weighting Intent

- lower frequency: very basic arithmetic
- higher frequency:
  - advanced arithmetic forms
  - expression/evaluation forms
  - practical forms (money, unit conversion, date)
  - geometry application
  - word problems

## HK2 Anti-Easy Guard

Generator retries when questions are too trivial (example patterns):
- very small multiply/divide facts
- low-number word problems
- written calculations with too-small operands

## Result/Analytics Semantics

- In test UI: badge shows review collection type
- In results breakdown: `originalType` is used for per-type stats

