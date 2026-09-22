---
name: review-file
access: read
description: 'Reviewing one file against the skill that owns its type. Findings, severity, and the per-file result table.'
---

# /review-file

## When to use

- One file needs reviewing, or a suggested change to one file.
- The scope is a file, not a feature — a feature goes to `/review-feature`.

## Scope

Owns the result for a single file: what does not conform, what could be shared,
and how severe each is.

It does not own the standard — the skill for the file's type is the standard, and
this skill loads it. It does not fix anything: `/address` and `/implement` do,
and this skill only offers them.

## Rules

- **Determine the file type, find the skill that owns it, and load it.** The
  review is against that skill, and every finding cites the rule it breaks.
- **`AGENTS.md` covers what no skill does** — common UI components, predicates,
  generics, and the general project conventions. Check it after the skill does.
- **Run the extra-DRY pass.** Look for anything that could be reused, generalised,
  or moved to a shared home. No authoring skill asks this; it is why a review
  exists.
- **Never invent a rule.** A finding cites a skill, `AGENTS.md`, or the file's own
  evident defect. Something that merely differs from your preference is not a
  finding.
- **State what could not be verified.** Tooling claims count as verified only when
  the tooling result is available. Absence of a co-located spec does not by itself
  mean a file is untested.
- **A file with no findings still gets a result.** Zero findings is a result.
- **Results may be recorded in the ticket as an appendix** while the findings are
  open, so the review does not have to be held in context. Each row is deleted by
  `/address` or `/implement` as its item closes; an appendix that outlives its
  findings is stale.

### Severity

- `MUST` — blocks done. A rule broken, an architecture failure, or a defect.
- `SHOULD` — recommended, non-blocking. Conformance worth having.
- `COULD` — nice-to-have.

### Scoring

Score each dimension 0–10. `10` is exactly what the owning skill asks for; `8`
conforms with a minor note; `6` is arguable or loose; `3` and below is a rule
broken. Do not round toward pass.

| Dimension                                  | Set by                                            |
| ------------------------------------------ | ------------------------------------------------- |
| COHESIVENESS, LOCATION, EXTENSION, IMPORTS | `ui` on a FE file, `db` on a BE file              |
| NAMING, RETURN                             | the skill owning the file's role                  |
| TYPED                                      | `types`                                           |
| VALIDITY                                   | tooling — `tsc` and lint, verified or not claimed |
| STANDARD                                   | `AGENTS.md`                                       |
| TESTED                                     | `test`                                            |

- `GEN` is the mean of the scored dimensions, one decimal, `N/A` excluded.
- `≥7.0` passes, `5.0–6.9` is weak, `<5.0` fails.
- **Any dimension ≤ 3.0 is not passing**, whatever the mean — a mean hides one
  broken axis.
- `N/A` is for a dimension a file genuinely has nothing to score on, and it is
  excluded from the mean rather than scored 0. List them in `UNVERIFIED`.

**The result**

```
| Field | Value | Comment |
| ----- | ----- | ------- |
| FILE | <path> | |
| SKILL | the skill this file was reviewed against | |
| VERDICT | CONFORMS \| DEVIATES \| CHANGE-ACCEPTED \| CHANGE-REJECTED | brief reason |
| GEN | 0-10 | mean of the scored dimensions, 1dp, N/A excluded |
| — | | per-dimension breakdown |
| COHESIVENESS | 0-10 | |
| LOCATION | 0-10 | |
| EXTENSION | 0-10 | |
| IMPORTS | 0-10 | |
| NAMING | 0-10 | |
| RETURN | 0-10 | |
| TYPED | 0-10 | |
| VALIDITY | 0-10 | |
| STANDARD | 0-10 | |
| TESTED | 0-10 | |
| MUST | findings required before done | or NONE |
| SHOULD | recommended, non-blocking | or NONE |
| COULD | nice-to-have | or NONE |
| DRY | what could be shared, generalised or moved | or NONE |
| UNVERIFIED | what could not be established | or NONE |
```

A dimension scored ≤ 3.0 is marked `✱` beside `GEN` — the file is not passing
whatever the mean.

`CHANGE-ACCEPTED` / `CHANGE-REJECTED` are for a suggested change, and carry the
argument either way. `CONFORMS` / `DEVIATES` are for a file-only review.

## Workflow

1. Determine the file's type.
2. Find the skill that owns that type and load it.
3. Review the file against that skill.
4. Check the `AGENTS.md` concerns — common UI, predicates, generics.
5. Run the extra-DRY pass.
6. Evaluate each finding: `MUST`, `SHOULD` or `COULD`.
7. Return the result table. Zero findings is a completed result.
8. Offer `/address` or `/document-new` per actionable finding.
