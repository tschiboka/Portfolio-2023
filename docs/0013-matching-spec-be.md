# 0013 — Matching specs across `server/`

## 1. Description

The `server/` pass of the rule that [0011](./0011-matching-spec-fe.md) builds. The open question
here is not coverage but which roles are testable at all: a repository needs a database, a
router delegates in one call, and a schema is worth a test only where it encodes a rule nobody
else states.

So this ticket starts by deciding the `YES` rows for the BE roles, then applies the rule to
them. A router that delegates is expected to be exempt; a service that assembles is not.

## 1.1 Info

| Status       | Planned    |
| ------------ | ---------- |
| Last updated | 2026-11-21 |
| Created      | 2026-11-20 |
| Scope        | `server/`  |

## 2. Feature Dev Checklist

- [ ] Step 1: Decide which BE roles are testable, and record them as the rule's `YES` rows
- [x] Step 2: Run the rule over `server/` and list every file it reports
- [x] Step 3: Write the missing specs, or record each as `TODO: [0013] …` with the reason
- [ ] Step 4: Confirm a green `tsc`, lint, and test run
