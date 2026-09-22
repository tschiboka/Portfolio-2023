---
# name — one lowercase word, must match the folder name exactly
name: 'queries'

# access — read | write. Required for every skill; omitted for reference skills.
access: write

# stack — optional. The libraries this skill's rules are about,
# so a reader knows the vocabulary.
stack: 'tanstack-query, msw'

# description — one sentence of what it does, then one clause of what it covers.
# Single-quoted, always. No USE FOR / DO NOT USE FOR / TODO.
description: 'Writing a feature `.queries.ts` file, query/mutation hooks. Payloads, request builders, and response handling, including data transformation between the API and the FE.'
---

# Template

**Every skill carries these four sections, in this order.**

| Section       | Holds                                         |
| ------------- | --------------------------------------------- |
| `When to use` | the trigger conditions, in the caller's words |
| `Scope`       | what the skill owns, and what it does not     |
| `Rules`       | how it does what it does — always / never     |
| `Workflow`    | the steps it runs                             |

`File structure` and `Files and folders` are conditional — only for a skill whose
area has a folder shape. Omit them when the skill has none.

**A skill carries no code.** Describe shapes, name conventions and point at the
example files in the skill's own folder beside `SKILL.md`. Never reference a live
source file — those move. The example belongs to the skill and changes only when
the skill changes.

---

# Skill Name

## When to use

- The trigger conditions, as bullets.
- What this skill fires on, in the words a caller would use.

Standards of reference: only when another document is the authoritative source.

<path to source>

## Scope

Define where this skill's responsibility starts and ends.

## Rules

Always do this.
Never do that.

## Workflow

The steps the skill runs, in order.

## File structure

The shape of the folder — what exists and how it nests. Not what is in the files.

```text
Feature/
├── Feature.filetype1.ts
├── Feature.filetype2.tsx
└── Feature.filetype3.tsx
```

## Files and folders

One block per file or folder. Repeat the block as needed.

### `<file-or-folder>`

Naming convention: `.types.ts`, `.queries.ts`, `.transformers.ts`, `/components`
Return type: `Feature.tsx` → JSX; `queries.ts` → a `FeatureQueries` object
Example: `./Feature.ts` — a sibling of this `SKILL.md`. The example lives in the
skill's own folder, never in the live source tree.
Rules:

- Always do this.
- Never do that.
