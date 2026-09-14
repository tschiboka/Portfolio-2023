---
name: review
description: 'Audit and score individual source files against the repo conventions. USE FOR: reviewing one file (or a suggested change) and scoring it on the strict 0-10 rubric (cohesiveness, location, extension, imports, naming, return, typed, validity, standard, tested); arguing whether a file or proposed edit conforms to ARCHITECTURE.md; producing a strict, scored review result for the user to approve; single-file or multi-file (feature/subfeature) reviews across FE (src), BE (server), and shared (common). DO NOT USE FOR: general code questions, reviews without a per-file target, or creating new features. Standards of reference: ARCHITECTURE.md (see docs/0006-fe-file-structure-sweep.md §11.16 for origin).'
---

# File Review

Per-file audit against the repo standards, scored on a strict layer-aware
rubric (FE or BE).

## When to use

- Review one file or a suggested change — one-off or as part of a per-file sweep.
- Score it on the 10-dimension rubric; argue conformance and push back where
  the file or a proposed edit is off-standard; produce a strict scored result.
- Applies to FE (`src/`), BE (`server/`), and shared (`common/`).

Standards of reference: `ARCHITECTURE.md`

## Workflow

**No context:** if no file is given to review, prompt the user for the file.
Do not invent a target.

1. Review the file against the rubric (format below).
2. Argue compliance; push back where off-standard.
3. Produce the review table with a strict, realistic score.

Score only what can be established from the supplied file, available repository
context, `ARCHITECTURE.md`, `AGENTS.md`, and accessible tests. Do not invent
rules or evidence. If a dimension cannot be verified, state the limitation and
score conservatively; use N/A only where genuinely inapplicable.

Persistence (saving results to a tracking doc) is the caller's decision.

## Single-file review (always a 3-column table)

**Field · Value · Comment** — `FILE`, `LAYER`, `VERDICT` first, then the scored
dimensions, then meta. `COMMENT` carries the per-field justification/pushback.

```
| Field | Value | Comment |
| ----- | ----- | ------- |
| FILE | <path> | |
| LAYER | FE\|BE | anchor set — see rubric |
| VERDICT | <CONFORMS\|DEVIATES\|CHANGE-ACCEPTED\|CHANGE-REJECTED> | brief reason; for a suggested change state the arg for/against |
| **GENERIC** | 0-10 | mean of scored dims, 1dp, N/A excluded — overall score |
| --- | | per-dimension breakdown |
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
| IMPROVEMENTS | ... | MUST/SHOULD/COULD or NONE |
| APPROVED | YES/NO | optional — sweeps/on request |
| STATUS | ... | NOT STARTED \| WIP \| PAUSED \| DONE |
| NOTES | ... | only on PAUSED — handover instructions |
```

`LAYER` = **FE** (Arch §1) or **BE** (Arch §2); only EXTENSION/IMPORTS/RETURN
anchors differ. A `common/` file: pick the layer it serves, or anchor to the
shared rules (§4.4, §5.1) and note the choice in VERDICT/NOTES.

For FE, `RETURN` is N/A unless ARCHITECTURE explicitly defines a return
convention for that file type. Do not invent one.

`VERDICT`:
`CHANGE-ACCEPTED`/`CHANGE-REJECTED` for a suggested change (with the argument),
`CONFORMS`/`DEVIATES` for a file-only review. `APPROVED = NO` ⇒ not DONE
regardless of score.

## Multi-file / feature review

One **aggregated table** — a row per file, dimensions as columns, plus
`FILE`, `LAYER`, `VERDICT`, `GENERIC`, `STATUS` and a `MUST/SHOULD/COULD`
summary (full per-dimension commentary in NOTES/report, not per row).

Score each file independently; do not let a feature-level judgement inflate
or reduce an individual file's score.

```
| # | File | LAYER | VERDICT | COH | LOC | EXT | IMP | NAM | RET | TYP | VAL | STD | TEST | GEN | IMPROVEMENTS | APPROVED | STATUS |
```

Flag any floor violator (any dim ≤ 3) with `✱` beside `GEN`; it is non-passing
regardless of the mean.

## Rubric

0.0–10.0 (0.0 = non-existent, 10.0 = impeccable). **GENERIC** = mean of the
scored dimensions, 1dp, N/A excluded. Scores between the anchors represent
intermediate quality; do not round toward pass.

**Score meaning:** `≥7.0` pass
(DONE-eligible given APPROVED) · `5.0–6.9` weak/WIP · `<5.0` fail.

**Severity floor:** any dimension ≤ 3.0 ⇒ **not passing** (WIP/PAUSED + note
the blocking dimension). A mean hides a single broken axis.

**N/A:** a non-code file (`.scss`/`.css`/asset/data) may mark a dimension N/A
when it has nothing to score (e.g. TESTED/RETURN/VALIDITY on a stylesheet).
N/A dims are **excluded from the mean**, not scored 0. List them in NOTES.

### Dimensions (measure + anchors 3/6/8/10)

| Dimension                                 | Measures                                                                                    | 3 failing                                                   | 6 loose                                         | 8 solid                              | 10 impeccable                                     |
| ----------------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------- | ------------------------------------ | ------------------------------------------------- |
| COHESIVENESS                              | single clear concern (see note)                                                             | mixed concerns / magic numbers / extractable helpers remain | one concern, minor bleed                        | clean, clear-cut                     | zero bleed, nothing extractable, no magic numbers |
| LOCATION (FE §1.1 / BE §2.1)              | right layer/folder; extra DRY: generic extracted (to `common`/shared util/query/const home) | wrong layer (generic in feature, feature in `common/`)      | plausible, arguable                             | correct root, minor nuance           | exact, no debate                                  |
| EXTENSION (FE §1.2/§1.4 · BE §2.2)        | suffix+extension match content                                                              | ad-hoc suffix not in allowed set                            | named for concern, minor drift                  | sanctioned suffix, singular-default  | sanctioned + pluralisation correct                |
| IMPORTS (FE §5.2 5-tier · BE §5.2 4-tier) | ordered per §5.2; alias used                                                                | tier interleaving / cycle / BE pulls FE-only barrel         | cross-dir relative where alias exists           | tiers contiguous, aliased cross-dir  | tiers + alias + type-only tier / §5.1 clean       |
| NAMING (FE §1.3 · BE §2.3)                | symbols named per roles                                                                     | unrelated to role                                           | reasonable but generic                          | named per role conventions           | carry meaning, no ambiguity                       |
| RETURN (BE §2.3 canonical)                | return named+typed per extension type, grouped                                              | wrong/generic name                                          | named, loosely typed                            | `Feature<Role>`/hook, typed          | named + typed + grouped                           |
| TYPED                                     | types defined+named correctly                                                               | missing/`any`                                               | exist, loose                                    | domain types in `.types.ts`, precise | fully typed incl. edge/nullability                |
| VALIDITY                                  | correctness and available verification evidence                                             | known error / does not compile                              | appears valid, tooling unverified or lint noise | tsc + lint verified clean            | type-safe, tooling verified clean, no warnings    |
| STANDARD                                  | conformance to ARCHITECTURE; syntax, comments, best practices                               | conflicts                                                   | partial                                         | conforms, minor notes                | fully conforms                                    |
| TESTED (AGENTS §2.5)                      | available test coverage/spec quality + edge cases                                           | no spec where expected                                      | happy-path only                                 | covers branches + edge cases         | exhaustive, table-driven                          |

Tooling claims (`tsc`, lint, tests, etc.) must only be treated as verified when
the relevant tooling result is actually available. Absence of a co-located test
file does not by itself mean a file is untested; assess accessible tests for
the file's behaviour.

**ARCHITECTURE.md gaps (don't invent rules the doc lacks):**

- FE `.queries.ts → FeatureQueries.use<Verb>` is now documented (ARCHITECTURE §1.2.1); `.actions → FeatureActions` (table `TableAction<T>[]`) and `.handlers → FeatureHandlers` (form/event handlers) are documented too — **do not conflate the two**.
- No FE return rule for `.columns`/`.schema`/`.transformers` (`FeatureSchema` lives in `0006` §3.4, not ARCHITECTURE).
- `.scss` vs `.styles.scss` undecided (§1.2 lists both) — flag against the repo convention (BE has no scss).
- BE §5.1: server must not import FE-only barrels — check under IMPORTS for BE (no FE analog).
- When a spec is "expected" falls to AGENTS.md §2.5.

**COHESIVENESS (composite — judged on three facets):**

1. **One clear concern** — file does one thing, no mixed responsibilities.
2. **Extraction (DRY)** — generic leaves → `common`/shared home; tiny leaf presentational pieces stay inline; **substantial self-contained sub-blocks (own props type, heavy markup) split to `components/`/`SubFeature/`** — a `Feature.tsx` over ~50 lines is a smell, move its composed blocks out.
3. **Magic numbers** — domain literals → `FeatureConstants`

### Meta fields

- **IMPROVEMENTS** — `MUST` (required before DONE: correctness/arch failure) · `SHOULD` (recommended, non-blocking) · `COULD` (nice-to-have) · `none`.
- **STATUS** — `NOT STARTED | WIP | PAUSED | DONE`; **NOTES** — handover instructions, only on PAUSED.
- **APPROVED** — optional; the user confirms the file/feature works and is regression-free.

## Project references

- `ARCHITECTURE.md` — §1 FE (§1.1 folders, §1.2 roles, §1.3 main export, §1.4 allowed suffixes), §2 BE (§2.1 folders, §2.2 roles, §2.3 `Feature<Role>` naming), §4.4 generic components, §5.1 dependency direction, §5.2 import ordering.
- `docs/0006-fe-file-structure-sweep.md` — source ticket; §11.16 review log, §11.16.1 checklist.
- `AGENTS.md` — reply format, editing gates, ticket discipline.
