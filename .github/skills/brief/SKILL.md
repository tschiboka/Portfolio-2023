---
name: brief
access: read
description: 'Resolve the minimum necessary uncertainty before work begins. Clarify requirements, behaviour, constraints, risks, and lifecycle routing without making changes.'
---

# /brief

## When to use

- Requirements are unclear and work must not begin yet.
- A ticket needs framing before `/implement`, or a decision needs resolving first.

## Scope

Collects only what is required to enter the next lifecycle or specialist skill.
Resolves uncertainty; performs no work and changes no file.

## Rules

- **No file changes** — no code, documentation, tests or fixes.
- Reading existing tickets, docs, code, tests and configuration is allowed.
- Ask only questions whose answers affect requirements, behaviour, constraints, pitfalls, lifecycle routing or specialist investigation.
- Ask the **minimum necessary questions**. Never ask for information merely because it may be useful.
- Never invent requirements or make decisions to fill gaps.
- Do not load specialist skills unless an actual question requires them.

### Questions

Maintain a concise numbered question list:

```text
1. Question: Should the filter persist in the URL after Apply?
   Status: Open

2. Question: Should an empty result use the existing empty-state?
   Status: Answered
   Context: Existing ticket specifies this behaviour.

3. Question: Should pagination be API or client-side?
   Status: Deferred
```

Statuses:

- `Open` — answer required
- `Answered` — sufficiently resolved
- `Deferred` — intentionally decided later
- `Unknown` — currently requires investigation

`Deferred` ≠ `Unknown`: deferred can safely wait; unknown may block progression.

Users may answer individually, in batches, defer questions, or request more information.

## Workflow

### Entry

The **first question is always**:

> Which ticket does this briefing belong to, if any?

If none, treat it as a generic query.

For a ticket:

1. Find it in `docs/`.
2. Read the relevant existing material.
3. Determine the current state and work type.

Possible work types:

`New` · `Continue` · `Debug` · `Test` · `Review` · `Address`

### Specialist routing

When a question requires specialist knowledge, pivot only to the required **non-writing** skill, then return to `/brief`.

Examples:

`/standardise` · `/types` · `/queries` · `/table` · `/db` · `/auth` · `/review-file` · `/review-feature`

Do not preload unrelated specialists.

```text
/brief → specialist → /brief
```

### Lifecycle routing

When briefing is complete, route to the appropriate lifecycle skill:

`/document` · `/implement` · `/test` · `/review-feature` · `/debug` · `/address`

Do not perform that lifecycle from `/brief`.

### Exit

Proceed to another **writing lifecycle** only when:

- all questions required for that phase are `Answered` or `Deferred`
- no materially relevant `Unknown` remains
- the next lifecycle is clear

An explicit user instruction may override an unresolved question.

**Never progress merely because the agent thinks it has enough information.**
