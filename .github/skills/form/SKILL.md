---
name: form
access: write
description: 'Building forms. Fields, validation, field-level errors, submit flow, and reusable form UX.'
---

# /form

## When to use

- A feature needs a form, validation, or submit path.
- An existing form needs a field, validation rule, or error message.
- Field-level errors must be shown against their field.

## Scope

Owns the form's fields, initial values, validation, field-level errors, and
submit entry point.

Does not own the request (`queries`), endpoint contract (`types`, `router`),
or field presentation (`ui`).

## Rules

### Shape

- Form data is typed as `<Feature>FormData` and represents the field values, not the API request shape.
- Declare initial values once.

### Validation

- Every message comes from the validation catalogue — never a literal. `ValidationMessage` in `common/utils/Messages/Validation/`.
- The field name is an argument, not part of the string.
- Form-level errors are for failures with no field owner.

### Submit

- The handler receives `<Feature>FormData` and transforms it to the request shape when needed.
- Keep field values after a failed submit.

### The worked example

The `Feature.*` files beside this `SKILL.md` are the worked example — the same
six files, importing only the shared catalogue and library entry points, never a
live feature. Each carries `// @ts-nocheck` because it sits outside the project's
`tsconfig` include.

## File structure

```text
<Feature>/
├── <Feature>.constants.ts
├── <Feature>.defaults.ts
├── <Feature>.schema.ts
├── <Feature>.handlers.ts
├── <Feature>.types.ts
├── <Feature>.tsx
└── <Feature>.transformers.ts
```

`<Feature>.tsx`, `<Feature>.types.ts` and `<Feature>.schema.ts` exist for every
form. `.constants.ts`, `.defaults.ts`, `.handlers.ts` and `.transformers.ts`
appear only when the form needs them.

## Workflow

1. Name the form and feature folder.
2. Define `<Feature>FormData`.
3. Define the schema and initial values.
4. Build fields with field-bound errors.
5. Add the submit handler and any required transformation.
6. Hand the request itself to `queries`.

## Files and folders

### `<Feature>.tsx`

Return type: a component rendering the `<Form>` and its `<Field>`s.
Example: [`Feature.tsx`](./Feature.tsx)
Rules:

- Owns the form wiring — initial values, the bound resolver, and the submit call.
- Holds the mutation hook; a handler never calls one.
- One `<Field>` per field in the schema.

### `<Feature>.types.ts`

Naming convention: `<Feature>.types.ts`, beside the form.
Return type: `<Feature>FormData` — the field values, not the request shape.
Example: [`Feature.types.ts`](./Feature.types.ts)
Rules:

- Form-only fields stay in the type; the transformer drops them.
- The request shape is not declared here.

### `<Feature>.schema.ts`

Naming convention: `<Feature>.schema.ts`, beside the form.
Return type: `<feature>Schema` plus the bound `<feature>Resolver`.
Example: [`Feature.schema.ts`](./Feature.schema.ts)
Rules:

- The single home for every validation rule.
- Bind `yupResolver(schema)` here, so no component restates it.
- Messages come from `ValidationMessage`, never a literal.
- Patterns and bounds come from a constant, never an inline literal — a shared
  pattern from `Regexp`, a feature's own rule from `<Feature>.constants.ts`.

### `<Feature>.constants.ts`

Naming convention: `<Feature>.constants.ts`, beside the form.
Return type: a `<Feature>FieldLimits` object, plus a pattern only where the rule
is this feature's own.
Example: [`Feature.constants.ts`](./Feature.constants.ts)
Rules:

- Bounds are grouped by field and declared `as const` — `<Feature>FieldLimits = { name: { min, max } }` — so a field's values travel as one and cannot drift apart. The server's `MessageFieldLimits` and `BreakdownFieldLimits` are the same shape.
- Any pattern a second feature could need belongs in `Regexp`, not here; what stays is the rule that is this feature's alone.
- No message wording — that is `ValidationMessage`'s.

### `<Feature>.defaults.ts`

Return type: `<Feature>Defaults`, holding the initial field values.
Example: [`Feature.defaults.ts`](./Feature.defaults.ts)
Rules:

- Declared once; the component reads it rather than restating a field's start.
- Asserted against `<Feature>FormData`, so a missing field fails.

### `<Feature>.handlers.ts`

Return type: a `<Feature>Handlers` object of named handlers.
Example: [`Feature.handlers.ts`](./Feature.handlers.ts)
Rules:

- One submit entry point per form, exported on the object — never a lone export.
- Receives the mutation as an argument; the component owns the hook call.
- Transforms, then hands the request to `queries`.

### `<Feature>.transformers.ts`

Return type: a `<Feature>Transformers` object from `ClientTransformers`.
Example: [`Feature.transformers.ts`](./Feature.transformers.ts)
Rules:

- Only exists where the form shape and the request shape differ.
- One verb per request the form makes. All five verbs come back, always; one the caller did not supply throws when called, naming itself.
- Validates nothing — the schema already did.
- Drops form-only fields so they never reach the request.
