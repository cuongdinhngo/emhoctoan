# Persistence And Scoring Contract

## Purpose

Document localStorage schema and scoring rules so behavior is stable across refactors.

## Storage Keys

Per-grade keys:
- session key
- progress key
- settings key

Legacy fallback:
- grade3 legacy keys may still be read for migration compatibility.

## Session Data Contract

Session stores:
- current score (`correct`, `total`, `streak`, `bestStreak`)
- full problem list (answer status and user answer fields)
- current problem index
- settings snapshot
- start time
- completion flag

## Progress Data Contract

Progress stores:
- total sessions
- total problems
- total correct
- best streak
- average score
- last played timestamp
- student name

## Scoring Rules

On each submitted answer:
- `total` increments
- `correct` increments if answer is correct
- `streak` increments on correct; resets on wrong
- `bestStreak` updates when current streak exceeds best

At test completion:
- session marked completed
- progress aggregate updated from session score

## Resume Rules

- If an unfinished session exists for current grade, restore it on load.
- If no valid session exists, start from setup state.

## Consistency Rules

- Save session on key lifecycle changes (answer, navigation, submit/reset).
- Keep question identity stable (`id`) within a session.
- Do not mix progress/session/settings across grades.

## Known Caveats To Monitor

- Avoid infinite loops when uniqueness + high quantity conflicts.
- Ensure `currentProblemIndex` persistence stays in sync with UI navigation.
- Keep review `originalType` intact for analytics correctness.

