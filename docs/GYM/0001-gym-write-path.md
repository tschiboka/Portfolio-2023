# GYM-0001 — Gym write path: the frontend half

## 1. Description

Continuation of [0003](../0003-gym-exercises-routines.md): the server half landed, and the page still
cannot write — there are no mutation hooks, and both submit paths are unwired. GYM carries the
feature from here; composition UX, workout history and analytics come later, in this ticket or the
one it opens.

## 1.1 Info

| Status       | Planned                                  |
| ------------ | ---------------------------------------- |
| Last updated | 2026-11-08                               |
| Created      | 2026-11-08                               |
| Continues    | [0003](../0003-gym-exercises-routines.md) |

## 2. Feature Dev Checklist

- [ ] Step 1: Add mutation hooks to `Gym.queries.ts` — create, update and delete for exercises, and
      the same for routines
- [ ] Step 2: Wire the "Add Exercise" submit and the option `onSelect` handlers, canonical exercises
      taking the admin path
- [ ] Step 3: Wire "Create Routine", referencing canonical exercises
- [ ] Step 4: Remove the `console.log` stubs from the option handlers and the submit
- [ ] Step 5: Verify the page reads and writes end to end
