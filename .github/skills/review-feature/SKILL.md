---
name: review-feature
access: read
description: 'Reviewing a whole feature. Scope, a per-file pass through review-file, and one aggregated result with cross-file findings.'
---

# /review-feature

## When to use

- A feature, folder, or chunk of related files needs reviewing.
- A sweep needs a result per file and one summary over them.

## Scope

Owns the result for a set of files and the relationships between them —
duplication, generalisation, and drift between siblings.

It does not own the standard (the skill for each file's type is), nor the
per-file result (`/review-file` returns it), nor the fixes (`/address`,
`/implement`).

## Rules

- **Every in-scope file gets a `/review-file` result** before the feature is
  called reviewed. A file without a result is reported as unreviewed — never
  implied reviewed by omission.
- **One aggregated table, not one per file.** The `/review-file` results are the
  evidence; this skill produces the summary over them.
- **Cross-file findings are separate.** A duplicated pattern, a generalisation
  opportunity, or two siblings that have drifted are not any one file's finding.
- **Scope is confirmed, not assumed.** A boundary that is unclear, or that spans
  more than one folder, gets granular options before any file is opened.
- **Never invent a rule**, and state what could not be verified — as in
  `/review-file`.

### The aggregated table

One row per in-scope file. The column set carries across from each file's
`/review-file` result, so the feature table summarises rather than rescores.

```text
| # | File | Skill | Verdict | Gen | Must | Should | Could |
```

Cross-file findings are a second table, since they belong to no single file:

```text
| # | Finding | Files | Severity |
```

## Workflow

1. Establish the feature scope.
2. If more than one folder, or the boundary is unclear, offer granular scope
   options — such as reviewing each subfeature on its own.
3. Confirm the scope.
4. Determine the domains involved.
5. Identify every in-scope file.
6. Run `/review-file` for each.
7. Track an explicit result per file. Nothing is reviewed without one.
8. Return one aggregated table, and report any file that was not reviewed.
9. Add the cross-file and feature-level findings as their own list.
10. Offer `/address` or `/document-new` per actionable finding.
