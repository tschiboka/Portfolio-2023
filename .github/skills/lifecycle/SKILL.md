---
name: lifecycle
description: 'Routing a task to its stage. The Frame/Build/Verify phases, the three re-entry verbs and where they return to, and the precondition each stage must satisfy before it can start.'
---

# Life-Cycle

Where in the work are we? Five **stages** advance the artefact; three **re-entry
verbs** send it back to a stage with better information. The stages are ordered
and gating — each consumes the previous stage's artefact. The re-entries are not
steps in the sequence: they can fire from anywhere, and they name what you return
_to_, which is what tells you which artefact must be updated.

## When to use

- Deciding which stage the current work belongs to.
- Checking preconditions before entering a stage.
- Finding which skill owns a stage.

Standards of reference: `AGENTS.md` §3.0, `ARCHITECTURE.md`

## The shape

```text
Frame    /brief → /document → /implement
Build                          ↗ /debug     ↺ back to /implement
Verify            /test → /review
                               ↗ /address   ↺ back to /implement
                               ↗ /refine    ↺ back to /brief
```

## Stages

| #   | Slash        | Phase  | Produces                            | Skill                                    |
| --- | ------------ | ------ | ----------------------------------- | ---------------------------------------- |
| 1   | `/brief`     | Frame  | Requirements, acceptance criteria   | planned                                  |
| 2   | `/document`  | Frame  | Ticket doc, decisions, change notes | — (see `AGENTS.md` §3.0)                 |
| 3   | `/implement` | Build  | Working code                        | planned                                  |
| 4   | `/test`      | Verify | Specs and fixtures that lock it in  | [create-tests](../create-tests/SKILL.md) |
| 5   | `/review`    | Verify | Scored, standards-checked result    | [review](../review/SKILL.md)             |

Order within Verify is deliberate: `review` scores a `TESTED` dimension, so tests
must exist before the review runs. Reviewing untested work leaves that dimension
unverifiable and the score incomplete.

`planned` means the stage is defined but has no skill file yet — do the work
without delegating.

## Re-entry verbs

These are not stages. Each fires from a later stage and returns to an earlier
one, carrying the finding that caused the return.

| Verb       | Fires from | Returns to   | Carries                       |
| ---------- | ---------- | ------------ | ----------------------------- |
| `/debug`   | any        | `/implement` | A diagnosed defect            |
| `/address` | `/review`  | `/implement` | Review feedback to apply      |
| `/refine`  | `/review`  | `/brief`     | An enhancement worth building |

`/address` is **corrective** — fix what review flagged. `/refine` is
**enhancing** — improve what review already accepted, which means new
requirements, which means back to `/brief`. Do not blur them: an improvement
smuggled into `/address` hides scope growth behind a correction.

## Preconditions

- **1 → 2**: a stage is documented only once its requirements are settled.
- **2 → 3**: implementation requires the ticket to be **checked out** with the
  requirements documented in it (`AGENTS.md` §3.0). No ticket, no implement — go
  back to `/brief`. Do not implement from memory.
- **3 → 4**: tests are written against working code.
- **4 → 5**: review scores what exists; tests lock in what review accepts.
- **re-entry**: every re-entry updates the ticket before it re-enters.

## Stage versus standard

The stage runs the work; the standard is the bar it is judged by. `/review` is a
stage. `/standards` is not a stage and not a skill — it is the requirement that
every stage is executed to the standards already declared in `ARCHITECTURE.md`
and `AGENTS.md`. There is no precedence question between them, because they are
not the same kind of thing: one is a point in time, the other an invariant.
