---
name: types
access: read
description: 'Defining and placing types. Where a type lives, how a domain type is shaped, and choosing between a generic and a specific one.'
---

# /types

## When to use

- Defining a request or response type.
- Deciding whether a type is generic or domain-specific.
- Deciding whether a type belongs to one feature or to all of them.

Any skill that defines a type uses this one — `queries`, `test`, `router`, `form`, `db`. Types are not defined ad hoc inside those skills.

## Scope

Defines and places types. Does not shape data for storage (`db`) or for transport
beyond the request/response contract (`router`).

## Rules

### Where types live

| Type                                                                              | Home                     | Import          | Example                                    |
| --------------------------------------------------------------------------------- | ------------------------ | --------------- | ------------------------------------------ |
| **Generic** — language-level, no domain meaning (`Nil`, `Nullable`, `Dictionary`) | `common/utils/Generics/` | `@common-utils` | [`Generics.types.ts`](./Generics.types.ts) |
| **Domain** — shared across features and projects                                  | `common/types/`          | `@common-types` | [`Common.types.ts`](./Common.types.ts)     |
| **Feature-local** — used by one feature only                                      | `<Feature>.types.ts`     | local relative  | [`Feature.types.ts`](./Feature.types.ts)   |

### Placement

- Generic, domain or local — by the table above. The test is who consumes it, not what it looks like.
- A domain type moves to `common/types/` on its **second** consumer, never in anticipation of one. A type shared "just in case" is a type nobody owns.
- Never redeclare a shape a shared type already expresses.
- Export from the folder's `index.ts`.

### Naming

- One type per endpoint and direction. Even identical shapes get separate names, so each endpoint evolves without touching the other.
- `Get{Entity}Req`, `Post{Entity}Req`, `Post{Entity}Res`, `Put{Entity}Req`, `Delete{Entity}Req`, `Patch{Entity}Req` — one pair per route, verb in the name.
- A core `{Entity}` is exported separately, and the endpoint types are composed from it — intersection, `Pick`/`Omit`, or `Partial`. Never a second declaration of the same shape.
- The convention is stated in source too, at the head of [`common/types/index.ts`](../../common/types/index.ts) (server, with `TypedRequest` / `TypedResponse`) and [`common/types/app.ts`](../../common/types/app.ts) (app). Both stay — a reader on either side finds it without crossing over.

### The feature file

- `<Feature>.types.ts` holds what this feature sends and receives. Shared types are imported from `@common-types`, never redeclared here.
- A form-only shape lives here beside the request type, and the transformer maps one onto the other.
- A request type is what the route accepts; a response type is what it answers with. Neither is the storage shape — that is `db`'s.

## Workflow

1. Generic or domain-specific?
2. If domain-specific, name it for its endpoint and direction.
3. Local, `common/types/`, or `Generics` — by the table above.
4. Check no shared type already expresses the shape.
5. Add it and export it.
