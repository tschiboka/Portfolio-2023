---
name: generalise
access: write
description: 'Finding opportunities to generalise or reuse accepted work, proposing the smallest appropriate change before implementation.'
---

# /generalise

## When to use

- A feature implementation contains something that may have broader use.
- A feature-specific function may belong in `common/`.
- Similar functionality exists or is likely to recur elsewhere.

## Scope

Finds and proposes reuse or generalisation opportunities. Proposes only — the
resulting change is new work and goes through `/implement`.

## Rules

- Do not generalise for the sake of abstraction.
- Prefer the smallest generalisation that removes the duplication or feature coupling.
- Preserve feature-specific behaviour where it is genuinely specific.
- Check existing shared functionality before proposing new functionality.
- If the opportunity is not sufficiently justified, say so and stop.

## Workflow

1. If there is not enough information to determine the goal or scope, return to `/brief` and clarify it.
2. State the specific finding and the generalisation it implies.
3. Call the specific specialist skills needed to investigate the opportunity.
4. Check existing functionality and determine whether to reuse, generalise or leave it feature-specific.
5. Propose the solution and its scope.
6. On approval, hand to `/implement`.
