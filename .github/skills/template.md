---
# name — one lowercase word, must match the folder name exactly
name: 'queries'

# kind — area | index | rule. See §Template for what each one is.
kind: 'area'

# stack — optional, area only. Omit for index and rule.
# the libraries this skill's rules are about, so a reader knows the vocabulary
stack: 'tanstack-query, msw'

# description — one sentence of what it does, then one clause of what it covers.
# Single-quoted, always. No USE FOR / DO NOT USE FOR / TODO.
description: 'Writing a feature `.queries.ts` file, query/mutation hooks. Payloads, request builders, and response handling, including data transformation between the API and the FE.'
---

# Template

**Every skill is one of three kinds. Pick one and write only its block.**

| Kind    | Use it for                                         | Block                               |
| ------- | -------------------------------------------------- | ----------------------------------- |
| `area`  | a body of rules for one area — queries, test, auth | §File structure → §Rules            |
| `index` | an index over an axis — lifecycle, domains         | §The axis → §Dispatch rule          |
| `rule`  | an invariant with no area — dry, standards, reuse  | §What it asserts → §What it forbids |

Everything above the first block — frontmatter, §When to use, §Scope — is shared
by all three. The blocks are separated by `---`; delete the two you are not
writing, and the `# <Kind> block` headings with them.

**A skill carries no code.** Describe shapes, name conventions and point at the
example files in the skill's own folder beside `SKILL.md`. Never reference a live
source file — those move. The example belongs to the skill and changes only when
the skill changes. Only the `text` file tree is fenced here.

---

# Skill Name

## When to use

- The trigger conditions, as bullets.
- What this skill fires on, in the words a caller would use.

Standards of reference: <path to the doc that owns the rules this skill enforces>

## Scope of Expertise / Domain

Where the area starts and ends, in a few short sentences.

- FE: from the API app layer to the transformed UI data layer
- BE: from incoming request transformation to the service or persistence layer
- X: from x to y

## File structure

_Area only. An index replaces this section, §Methodology and §Files and folders
with §The axis, §Members and §Dispatch rule. A rule replaces all three with
§What it asserts._

The shape of the folder — what exists and how it nests. Not what is in the files.

```text
Feature/
├── Feature.filetype1.ts
├── Feature.filetype2.tsx
├── Feature.filetype3.tsx
├── SubFeature/
```

## Methodology

The currently accepted direction of thought.
The design.
The steps.

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

## Rules

General rules that hold across every file above — the ones that are not owned by
any single file. Same do / never shape as the per-file rules.

- Always do this.
- Never do that.

---

# Index block — `kind: 'index'`

An index routes: it names an axis and dispatches to the skills on it. It has no
file structure, no methodology and no per-file blocks. Write these three sections
in place of the area ones, then roll up into the shared §Rules.

## The axis

What the axis is, and which kind of thing it sorts by — an ordered sequence the
caller walks, or an unordered partition the caller picks from.

## Members

| Slash   | Owns | Skill                    |
| ------- | ---- | ------------------------ |
| `/name` | …    | [name](../name/SKILL.md) |

## Dispatch rule

How a caller chooses between two members that both look applicable. Name the
tie-breakers and the order they apply in. Without this section an index is only
a list — the dispatch rule is what makes it route.

---

# Rule block — `kind: 'rule'`

A rule is an invariant: it holds at every stage and in every domain, so it has
no files and no area of its own. Write these two sections in place of the area
ones.

## What it asserts

The invariant, in one or two sentences, and why it holds everywhere rather than
in one area.

## What it forbids

- Never do that.
- Never do this either.
