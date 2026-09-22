---
name: db
access: read
description: 'Storage and persistence. Schemas and models, reads and writes, indexes, migrations, and how data is shaped for storage rather than for transport.'
---

# /db

## When to use

- A new stored domain needs a schema, model, and repository.
- An existing stored shape needs a field, index, or validation change.
- A read or write needs a query that belongs in the repository rather than
  the service.

## Scope

Owns how data is shaped for storage, validated on the way in, and reached on
the way out — schema, model, repository, and indexes.

Does not own how data travels to a client (`router`), what a feature does with
it (`queries`), or how it is validated at the edge (`router`).

## Rules

### Shape

- Shape for storage, not for transport. What a route returns is the router's concern; a model does not carry presentation fields to serve it.
- One domain, one folder. A stored entity gets its own folder beside its siblings, never a file in a shared one.

### Access

- A service composes repository calls; it does not assemble a filter.

### Integrity

- Enforce what must be true in the schema, not only in the caller.
- Index what is queried by, not what looks important. An index costs on every write.
- Prefer a unique index over a uniqueness check in application code — the database is the only place the guarantee holds under concurrency.

## File structure

```text
server/App/<Domain>/
├── <Domain>.constants.ts
├── <Domain>.types.ts
├── <Domain>.schema.ts
├── <Domain>.model.ts
├── <Domain>.repository.ts
├── <Domain>.service.ts
├── <Domain>.routes.ts
└── index.ts
```

## Workflow

1. Name the stored domain and the folder it belongs to.
2. Define the schema — fields, types, required, defaults.
3. Attach the model to the schema.
4. Add repository methods for each read and write the feature needs.
5. Add indexes only where a query demands one.
6. Hand the change to `/implement`.

## Files and folders

### `<Domain>.constants.ts`

Example: [`Feature.constants.ts`](./Feature.constants.ts)
Rules:

- The single source of truth for every limit the schema and the model both enforce — neither repeats a number.
- Grouped by field and `as const`, so the bounds travel together and stay literal.
- A timing is expressed in its unit — `DateTime.Units.Ms.fromMin(30)` — never a bare millisecond count.

### `<Domain>.schema.ts`

Example: [`Feature.schema.ts`](./Feature.schema.ts)
Rules:

- States what is valid: field, type, required, default.
- Exports `{ validate, schema }` — callers go through `validate`.
- No queries. No connection.

### `<Domain>.model.ts`

Example: [`Feature.model.ts`](./Feature.model.ts)
Rules:

- Attaches the schema to a connection and names the collection.
- A second, narrower shape than the Joi schema — the store's own enforcement.
- Declares indexes here, beside the shape they serve.

### `<Domain>.repository.ts`

Example: [`Feature.repository.ts`](./Feature.repository.ts)
Rules:

- `Repository.define` from `@common-utils` supplies the CRUD; `.withQueries` adds what this domain needs beyond it.
- The only place a query is written.
- One method per read or write the domain needs.
- Ownership is part of the query, not something the caller filters by afterwards.

### `<Domain>.service.ts`

Example: [`Feature.service.ts`](./Feature.service.ts)
Rules:

- An object of named async methods, `<Domain>Service`, matching `<Domain>Repository` and `<Domain>Schema`.
- **Business rules and validation live here.** The route delegates; the schema validates at this call, not at the route.
- Methods take imperative verbs mirroring the routes — `listVisibleTo`, `create`, `update`, `remove`.
- A missing record is a thrown `ApiResponder`, never a returned `undefined`.
- Calls the repository; never a model directly.

### `<Domain>.routes.ts`

Example: [`Feature.routes.ts`](./Feature.routes.ts) — a lean reference; `router` owns this file.
Rules:

- Delegates to the service in one call. No validation, no queries, no rules.

### `<Domain>.types.ts`

Example: [`Feature.types.ts`](./Feature.types.ts)
Rules:

- Four roles, kept apart: `I<Domain>` is the document the store returns, `<Domain>Input` is what arrives for validation, and `<Verb><Domain>Req` / `Res` are the route pair.
- The route pair wraps `TypedRequest` / `TypedResponse` from `@common-types` — the request and response types come from `common/types`, not from here.
- `Input` never carries the document's generated fields; a caller cannot pass an `_id`.

### `index.ts`

Example: [`index.ts`](./index.ts)
Rules:

- The barrel for the domain — nothing outside reaches past it into a sibling file.
- Exports are **alphabetical by exported symbol**, types last as `export type`.
- Exports the router, service, repository, schema, constants and model as values; the document and input types as `export type`.
