# `export-order`

Two-tier sorting — **style first, path second**. Within one style and one path, order
is free. There is no alphabetical requirement anywhere in a file's exports.

The standard this encodes lives in [`AGENTS.md` §1.4](../../AGENTS.md); this folder
decides what is enforced. §1.4 states the barrel's alphabetical rule today — the order
below is not yet written there.

## Style

| #   | Style               | Example                                 |
| --- | ------------------- | --------------------------------------- |
| 1   | namespace re-export | `export * as utils from './utils'`      |
| 2   | star re-export      | `export * from './utils'`               |
| 3   | default declaration | `export default Component`              |
| 4   | default re-export   | `export { default } from './Component'` |
| 5   | named re-export     | `export { Button } from './Button'`     |
| 6   | named declaration   | `export const isDefined = ...`          |
| 7   | type-only export    | `export type { User } from './types'`   |

## Path

| #   | Path                              | Example                                       |
| --- | --------------------------------- | --------------------------------------------- |
| 1   | external package                  | `'react'`, `'date-fns'`                       |
| 2   | external package, scoped          | `'@tanstack/react-query'`                     |
| 3   | aliased internal                  | `'@common-utils'`, `'@shared-components/Nav'` |
| 4   | same-directory relative           | `'./Button'`, `'./types'`                     |
| 5   | parent-relative, shallowest first | `'../Button'` before `'../../utils'`          |

The path rank applies only to re-exports with a module source. Local declarations have
no source path and are ordered by style alone.

## Edges

- A named re-export is style 5 whether it renames an export or not:
  `export { X as Y } from './x'`.
- `export { default as Button } from './Button'` is style 5 — a named re-export, even
  though its source is the default export.
- `export { default } from './Component'` is style 4 — a default re-export.
- `export * as utils from './utils'` is style 1 — a namespace re-export.
- `export * from './utils'` is style 2 — a star re-export.
- `export type { User } from './types'` is style 7 — a type-only export.
- `export interface User {}` and `export type User = ...` are style 7 — local type
  declarations.
- `export const`, `export function` and `export class` are style 6 — named declarations.
- `export default Component` and `export default function Component() {}` are style 3 —
  default declarations.
- `export type * from './types'` is style 7, if supported by the project's TypeScript
  version.
- A package and an alias are told apart by the alias list the rules carry, not by the `@`:
  `export * from '@tanstack/react-query'` is a scoped package at rank 2, while
  `'@common-utils'` is ours at rank 3.
- `export = value` is out of scope unless the project explicitly supports TypeScript's
  export assignment syntax.
- Imports must precede exports. This rule checks export ordering; import ordering
  belongs to `import-order`.

## Flow

Exports follow the same direction as the file's flow: incoming dependencies,
transformation, outgoing interface.

Type-only exports belong at the bottom, after value exports and re-exports. This keeps
the file's outgoing type interface last rather than grouping it with syntactically
similar named re-exports.

## Worked example

```ts
export * as utils from './utils'
export * from './helpers'
export default Component
export { default } from './Component'
export { Button } from './Button'
export const isDefined = (value: unknown) => value != null
export type { User } from './types'
export interface UserConfig {}
```

Namespace re-exports lead, a star re-export follows, then the default pair and the named
pair, and type-only exports finish the file.

## What the rule can check

- The sequence of export statements, keyed by `(style, path)`.
- Path ordering applies only where a module source exists.
- Everything else is free: which of two exports with the same style and path comes
  first, and where a blank line or comment falls, are not the rule's business.
