---
name: implement
access: write
description: 'Implementing agreed feature work in small, reviewable chunks, with controlled scope and approval for every change.'
---

# /implement

## When to use

- Feature work whose requirements are already agreed and documented.
- A checked-out ticket is ready to be built, one reviewable chunk at a time.

## Scope

Implements agreed **new feature work**. Does not test, debug, review, or define
requirements — those are their own lifecycles.

## Rules

### Prerequisites

- Small, clearly necessary prerequisite work may stay within the feature.
- If it materially changes scope, requirements or approach, stop and pivot to `/brief`, then document any approved change.
- A prerequisite that becomes a separate piece of engineering is its own ticket: `/implement → /brief → /document → /implement`. Do not let it become an unbounded sub-feature.

### Scope discipline

- Never silently expand scope.
- Use specialist skills whenever specialist knowledge is needed, then return to `/implement`.

### Conduct

- **Always get explicit approval before writing.**
- Never mutate files through commands. Use the editor so the user can see the diff.

### Documentation

- Consult the ticket document when one exists.
- If none exists, offer `/document` at least once during the session.
- Proactively use `/document` when scope, decisions, checklist or ticket state materially changes — recording an approved scope or decision change, or a materially changed checklist item.

## Workflow

### Implementation

Always work on the **smallest next reviewable task**:

1. Identify it.
2. Offer it and wait for approval.
3. Implement only that task.
4. Stop and inspect the result.
5. Offer the next task.

Do not combine independently reviewable changes.

When a command represents the next action, offer it. Definitions: [`protocol.md`](.github/skills/protocol.md).
