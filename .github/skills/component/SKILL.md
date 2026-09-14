---
name: 'component'
kind: 'area'
stack: 'react, typescript'
description: 'Working with feature components. Creating, modifying, moving or splitting them, and deciding whether a piece of UI deserves extraction of its own.'
---

# Component

A feature is a folder. `Feature.tsx` is its primary file; everything else is a role
the feature happens to need.

No code here — every claim points at an example file beside this one.

## When to use

- Creating a feature, or its primary file.
- Deciding whether a piece of UI deserves its own component.

## Scope of Expertise / Domain

Owns the shape of a feature folder: its name, the primary file, how it decomposes,
which files exist, and the accessible name of its root. Not how a component looks
— that is `ui` — nor how it is exercised, which is `test`.

## File structure

```text
Feature/
├── Feature.tsx              ← main component for this feature
├── Feature.types.ts         ← domain types for this feature
├── Feature.utils.ts         ← helpers for this feature
├── SubFeature/
│   └── SubFeature.tsx       ← a child with its own route, data or files
├── components/
│   └── ComponentFoo.tsx     ← a presentational part
├── index.ts                 ← re-exports the public API
└── tests/                   ← test files for this feature
    └── Feature.spec.tsx
```

Not every role file exists in every feature. A suffix appears when its role does
— never scaffold a file to fill the shape.

## Methodology

### Naming the folder

Singular by default, named for the entity or action the feature represents:
`Breakdown`, `Like`, `Visit`, `Category`.

Pluralise only for a domain or collection — `Users`, `Settings` — never because
the REST path is plural. The route and the folder are independent decisions.

When uncertain, prefer the singular entity name.

### The primary file

`Feature.tsx` exports `Feature` by name. No default export, ever.

Its props are `FeatureProps`, declared above the component **in the same file**.
Props never move to `.types.ts`, which holds domain types, not the component's own
surface.

Reference: [`Feature.tsx`](./Feature.tsx)

### Decomposing

The choice is what the child needs, not how big it is:

| The child                                              | Lives in                      |
| ------------------------------------------------------ | ----------------------------- |
| Presentational — takes props, holds no data of its own | `components/ComponentFoo.tsx` |
| Has its own route, queries or role files               | `SubFeature/SubFeature.tsx`   |

The test: **is the child comprehensible on its own?** If yes it is a subfeature;
if it only makes sense as a piece of its parent, it is a component.

Reference: [`components/ComponentFoo.tsx`](./components/ComponentFoo.tsx)

### Extracting a component

Extract when a piece has all three:

1. **A name you can say out loud.**
2. **A boundary you can state** — what it takes in, what it gives back.
3. **A reason to exist** — reused, independently testable, or its own concern.

Failing the third, leave it inline.

### Files exist when the role does

A suffix is a claim that the feature has that role. `Feature.utils.ts` exists only
when there is a helper to group.

An empty file is worse than a missing one — it invites the next reader to fill it
with something that did not belong there.

### Accessibility is structural

A root with an accessible name must be an element. A fragment renders no DOM node,
so `aria-label` and `role` on it are dropped silently — no warning, no error.

- `role` says what the region **is**; `aria-label` names it. Both or neither.
- A wrapper does not name its children — each control carries its own name.
- The name is a real phrase, never the word for the slot it fills.

Reference: [`Feature.tsx`](./Feature.tsx)

## Files and folders

### `Feature.tsx`

Naming convention: the folder name, PascalCase, one per feature.
Return type: named export `Feature`; props `FeatureProps` above it.
Example: [`Feature.tsx`](./Feature.tsx)
Rules:

- Named export only.
- `FeatureProps` is top-level, above the component.
- It renders; it does not own policy a role file should hold.

### `components/ComponentFoo.tsx`

Naming convention: PascalCase, no suffix, inside `components/`.
Return type: named export matching the file name.
Example: [`components/ComponentFoo.tsx`](./components/ComponentFoo.tsx)
Rules:

- Presentational: takes props, holds no data of its own.
- No `.types.ts` beside it — props are declared above it.
- Covered by the feature spec; no spec of its own.

### `SubFeature/SubFeature.tsx`

Naming convention: one folder per subfeature, same rules as a feature folder.
Return type: named export `SubFeature`.
Example: [`SubFeature/SubFeature.tsx`](./SubFeature/SubFeature.tsx)
Rules:

- Has its own route, queries or role files, or it is not a subfeature.
- Follows every rule of a feature folder, because it is one.

## Rules

- **A feature is a folder**, and its primary file is named for it.
- **Singular by default.** Pluralise only for a genuine collection, never for a
  REST path.
- **Named exports throughout.** No default export anywhere in a feature.
- **Props stay in the file that declares them**, above the component.
- **`components/` for parts, `SubFeature/` for children that stand alone.**
- **Files exist when the role exists.** Never scaffold an empty role file.
- **Extract on a name, a boundary and a reason** — all three, or leave it inline.
- **`index.ts` re-exports the public API**, and nothing else.
- **A component does not own its look** — layout and styling are `ui`.
- **A root with an accessible name is an element.** A fragment cannot carry one.
- **`role` and `aria-label` travel together**, and the label is a real phrase.
