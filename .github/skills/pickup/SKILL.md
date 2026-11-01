---
name: pickup
access: write
description: 'Taking a ticket up again from where it stopped, by the type of prompt that brought it back. Reconstructs state from the ticket, the pull request and the working tree, then routes what it finds.'
---

# /pickup

## When to use

- A ticket is resumed after a period of inactivity, with no active conversation to
  provide context.
- A pull request receives review feedback or QA recommendations.
- A completed ticket is reopened for documentation, incident follow-up or a
  post-mortem.

Standards of reference:
[`ticket-template.md`](.github/skills/document/ticket-template.md) — the shape of the document this skill reads.

## Scope

Reconstructs a ticket's state from what outlives a session, and routes the work it
finds. Does not review, correct, implement or test — every raised item leaves
through the lifecycle that owns it.

## Rules

### State

- Reconstruct from artefacts, never from conversation: the ticket doc, the pull
  request, the working tree.
- Name the ticket, then its type, before reading anything else. Run only that
  type's algorithm.
- The stage is not stored twice: `Status` belongs to the doc, review and QA belong
  to the pull request.
- Where artefacts disagree, report the disagreement instead of choosing silently.

### Recording

- A raised item becomes a checklist line in its round's own `2.n. Address …`
  section before it becomes a change — never in the §2 dev checklist.
- Each round opens its own section, numbered after the last. A closed round is
  never appended to.
- Ask before writing to the doc.
- Never invent a stage, a requirement or an owner. Unresolved means ask.

### Approval

- Approval belongs to the pull request, not to the conversation. A code change
  after approval re-opens review; documentation alone does not.

### Types

- `[DEV]`, `[CR]`, `[QA]` and `[X]` are this skill's parameters, spoken in prose —
  `pickup: QA`. They are never offered as `> **TOKEN**:`, since only protocol
  commands may be offered.

## Workflow

### Entry

Two questions, then a check, in this order. Nothing is read before the first
answer, and neither answer is guessed from the conversation.

1. **Which ticket?** The number decides the document. If it cannot be named, list
   `docs/` and ask which one to take; the branch name may suggest it, but never
   settles it. No ticket, no pickup.
2. **What brought it back?** Exactly one of:

| Prompt                                                          | Tag     |
| --------------------------------------------------------------- | ------- |
| resumed after inactivity, with no conversation to continue      | `[DEV]` |
| a pull request receiving review feedback                        | `[CR]`  |
| a pull request carrying QA recommendations                      | `[QA]`  |
| reopened for documentation, incident follow-up or a post-mortem | `[X]`   |

A pickup that answers both review feedback and QA runs `[CR]` to the end, then
`[QA]`.

3. Confirm the document exists. Where it does not, `/document-new` runs first and
   this skill exits.

### `[DEV]` — resumed after inactivity

1. Read the document: `Status`, unticked steps in §2 and in every `2.n. Address …`
   section, open questions, standing decisions.
2. Read the working tree: `git status`, the branch, the last commit that touched
   this ticket.
3. Note whether a pull request exists, and read it for nothing else.
4. Reconcile: uncommitted work against a checklist line, a ticked step with no
   commit behind it, a step whose wording no longer matches the code.
5. Report the triage, one line per item: what it is, where it came from, what
   settles it.
6. Ask for the next unticked step and hand to `/implement`.
7. Hand to `/brief` instead when the document cannot decide that step.

Approval: not consulted — nothing here has been reviewed.

### `[CR]` — review feedback

1. Read the pull request: unresolved threads, the verdict, the failing checks.
2. Open `2.n. Address Code Review — Round <r>` and turn every unresolved thread
   into a checklist line there — numbered after the last section, never ticked on
   a reviewer's behalf.
3. Group the threads by file, and take each group through `/address` under the
   skill that owns that file.
4. Answer a thread you disagree with in the thread itself. A rebuttal is a
   resolution; a silent edit is not.
5. Send a thread that is new work, rather than a correction, back through `/brief`
   and `/document` before touching code.
6. After the last thread, `/test` the changed behaviour, then run the gate.
7. Tick the added lines and note, per thread, whether it was addressed or
   rebutted.

Approval: re-opened by any code change made after the review.

### `[QA]` — QA recommendations

1. Read the QA comments and the checks they rely on.
2. Classify each recommendation: defect, presentational, documentary, out of scope.
3. Open `2.n. Address QA — Round <r>` and record accept or decline per item there,
   with the reason — silence is not a decision.
4. Route by class: defect and presentational to `/address` under the owning skill,
   documentary to `/document`, out of scope to a checklist line for its own ticket,
   never a silent drop.
5. `/test` the changed behaviour, then run the gate.
6. Tick what was done; leave every declined item visible beside its reason.

Approval: lost where behaviour changes, kept where the change is presentational or
documentary.

### `[X]` — reopened otherwise

1. Read the trigger where it was raised: the document, the incident record, the
   post-mortem.
2. Decide what the ticket owes — a record, a correction, or new work.
3. Open `2.n. Address Post-mortem — Round <r>` and record the trigger as a
   checklist line there before anything else.
4. Correct the parts of the document that no longer match what happened:
   `Status`, `Last updated`, the decisions.
5. Hand to `/document` first, then `/address` or `/implement` as the record
   demands.
6. Tick the record line once the document is true.

Approval: kept, unless a code change follows the record.

### Exit

Hand to the routed lifecycle and stop. Never run that lifecycle from here.
