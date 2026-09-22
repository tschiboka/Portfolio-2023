# 1. Engineering principles

## 1.1 Reuse

| Type               | Location                 |
| ------------------ | ------------------------ |
| Generic types      | `common/utils/Generics/` |
| Generic functions  | `common/utils/`          |
| Generic components | `common/ux/`             |
| Domain types       | `common/types/`          |

- Never write one-off generic code. Extract the generic bit immediately.
- Before implementing, lookup existing shared code for a matching component, function, constant, utility or type.
- Consult `Generics` and `Predicate` for typing and manual checks.
- When a suitable existing implementation exists, show it before proposing a new one.

## 1.2 Dependencies

- Extend an existing import from the same path. Never create duplicate imports.
- Import order:
    - FE: external → aliased internal → relative → type-only → assets/side effects.
    - BE: external/node → aliased internal → relative → type-only.
- `import type` always goes in the type-only group.
- `common/types` must not depend on `common/utils` at runtime.
- Prefer value subpaths over the common barrel.

## 1.3 Code style

Prefer declarative, pure functional style:

- Do: `map`, `filter`, `reduce`.
- Do not: `for`, `while`.
- Never mutate arguments or shared state; compose immutable values instead.

## 1.4 Structure

- Keep file conventions [`docs/references/file-structure.md`](docs/references/file-structure.md).
- Use the correct types for each file.
- Use PascalCase for namespaces.
- Use the correct namespace for each file domain: `FeatureQueries`, `FeatureRouter`.
- Group related helpers under a namespace object when they form a cohesive concern: `DateTime`.
- Namespaces may nest when the path reads as a sentence: `Strings.Optional.trim`.
- Short leaf names are the point: the namespace carries the context: `Url.Codecs.text`.
- Barrel exports are alphabetical, types last as `export type`.

# 2. Skills

- Determine which skills own the code domain before writing it: [`.github/skills`](.github/skills).
- Always reload skills and follow guidance.
- Fits nothing? **Ask** — never silently invent a pattern.

# 3. Comments and documentation

- Restrict comments to a minimum explaining why.
- Comment for documentation mainly on the main return using JSDoc.
- No TODO comments; use the ticket doc for keeping a task list.
- Do not use the ticket doc as a diary; keep it short.
