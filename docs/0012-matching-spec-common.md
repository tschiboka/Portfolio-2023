# 0012 — Matching specs across `common/`

## 1. Description

The `common/` pass of the rule that [0011](./0011-matching-spec-fe.md) builds: a role file that
should carry its own spec and does not. `common/` is almost all pure utilities — predicates,
strings, arrays, date helpers — so most role files should already have a spec, and this sweep
is expected to be edge cases rather than a backlog.

The exceptions are the decision this ticket owns: a role that cannot be tested without a
browser, a clock, or a store is named here, then either exempted in the rule's scope or marked
in the file with a ticketed disable.

## 1.1 Info

| Status       | Planned    |
| ------------ | ---------- |
| Last updated | 2026-11-21 |
| Created      | 2026-11-20 |
| Scope        | `common/`  |

## 2. Feature Dev Checklist

- [x] Step 1: Run the rule over `common/` and list every file it reports
- [x] Step 2: Separate a genuine gap from a role that the rule should not reach
- [x] Step 3: Write the missing specs, or record each as `TODO: [0012] …` with the reason
- [x] Step 4: Carry a genuine exemption into `rules/matching-spec/` scope; otherwise mark the file `TODO: [0012] …`, so the gap stays visible until its spec exists
- [ ] Step 5: Confirm a green `tsc`, lint, and test run

A ticketed disable is deliberate: the file states its own gap, and the rule keeps
reporting anything new. Narrowing the scope would hide both, and a later ticket would
inherit a silent hole.
