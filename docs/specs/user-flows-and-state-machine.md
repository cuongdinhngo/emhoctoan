# User Flows And State Machine

## Purpose

Specify runtime behavior of a grade page so UI changes do not break test lifecycle semantics.

## Route-Level Flow

- `/` -> Home page (grade selection)
- `/lop-3`, `/lop-4`, `/lop-5` -> Grade runtime page

## Runtime States

- `setup`
- `testing`
- `results`

Transitions are managed by grade page state and session data persistence.

## Setup State

User configures:
- student name
- question quantity
- enabled problem types
- difficulty

Validation:
- student name required
- at least one type required

On start:
- generate unique problem set
- initialize score/session
- transition to `testing`

## Testing State

Main behaviors:
- show current question and metadata
- allow answer by input or MCQ
- mark question result and update score
- auto-advance after feedback delay
- allow manual navigation by question list
- allow reset/restart
- submit only when all questions are answered

Responsive behavior:
- desktop: fixed question list sidebar
- mobile: drawer navigation

## Results State

Shows:
- total score and percentage
- message by score band
- per-type performance bars
- per-question review cards

Actions:
- retake (same settings, new generated questions)
- new test (return to setup)

## Resume Behavior

- Session data is loaded from localStorage by grade key.
- Incomplete session resumes automatically when available.
- Progress stats are aggregated and shown in tracker modal.

## Error And Edge Handling

- Unknown routes redirect to home.
- Missing/invalid stored data falls back to defaults.
- Review modes enforce minimum quantity before start.

