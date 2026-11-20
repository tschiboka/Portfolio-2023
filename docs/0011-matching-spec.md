# 0011 — A testable role file has a matching spec

## 1. Description

A rule that reports a role file which should carry its own spec but does not. It was
[0009](./0009-linting-rules) Step 3, deferred there because the answer depends on which
role files exist, and every later step kept changing that. Those rules have landed, so
the tree is stable enough to measure against.

The scope has to be read from [file-structure.md](references/file-structure.md) §1.3 and
§2.5 first: both tables changed while the step waited, so neither the `YES` rows nor the
exemptions can be taken from the 0009 text.

## 1.1 Info

| Status       | Planned    |
| ------------ | ---------- |
| Last updated | 2026-11-20 |
| Created      | 2026-11-20 |
| Scope        | `rules/`   |

## 2. Feature Dev Checklist

- [ ] Step 1: Re-read [file-structure.md](references/file-structure.md) §1.3 and §2.5, and record the `YES` rows
- [ ] Step 2: Build `rules/matching-spec/`
- [ ] Step 3: Scope `include` to the `YES` rows, `exclude` the rest
- [ ] Step 4: Register as `severity: 'error'`
- [ ] Step 5: Add `tests/MatchingSpec.spec.ts`
- [ ] Step 6: Run `npm run build:rules`, then verify the generated config
- [ ] Step 7: Sweep every file in scope and fix or suppress each violation
- [ ] Step 8: Confirm a green `tsc`, lint, and test run
