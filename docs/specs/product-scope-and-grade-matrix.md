# Product Scope And Grade Matrix

## Purpose

Define exactly what this app covers today, by grade, so future updates stay aligned with the implemented product.

## Product Summary

- App name: Em Hoc Toan
- Platform: web SPA
- Primary users: primary students (Lop 3-5), with teacher/parent-assisted setup
- Core workflow: select grade -> configure test -> do questions -> review results

## In-Scope

- Multi-grade support: `grade3`, `grade4`, `grade5`
- Randomized question generation by selected problem types
- Input and multiple-choice question formats
- Session score tracking and result breakdown by type
- Local persistence for session/progress/settings per grade
- Responsive UI (desktop sidebar + mobile drawer)

## Out-Of-Scope (Current)

- Backend/user account system
- Cloud sync
- PDF/print export
- Formal teacher dashboard

## Grade Coverage Matrix

## Lop 3
- Basic arithmetic: addition, subtraction, multiplication, division, tables
- Advanced arithmetic: 2-digit/3-digit multiply-divide, division with remainder
- Word problems: more/less, multiply/divide, unit conversion, remainder
- Geometry: midpoint, circle, rectangle, square
- Special/review types: clock, fraction-of-number, written calculation, broken line, fill-in chain/blank, visual fraction, true/false, unit calculation
- Review collections: `review_semester_1`, `review_semester_2`

## Lop 4
- Large numbers
- Divisibility
- Fractions
- Geometry
- Word problems
- Measurement conversions

## Lop 5
- Decimals
- Percentages
- Geometry
- Speed-distance-time
- Word problems
- Mixed operations

## UX Constraints

- Grade 3 review mode selection is exclusive from normal grade3 type selection.
- Review mode enforces minimum question count based on included subtype count.

## Success Criteria

- Student can complete a full test without dead ends.
- Result screen shows both total and per-type performance.
- Re-opening the app preserves active session and historical stats.

