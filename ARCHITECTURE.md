# 1. Frontend architecture

## 1.1 Feature folders

Use a `Feature/` folder per feature.

`Feature` is the PascalCase feature name, for example:

- `BreakdownTable`
- `Button`
- `Codec`

The files inside the folder use suffixes describing their role. `index.ts` re-exports the public API.

The feature folder is **singular by default**. Use the entity or action represented by the feature:

- `Breakdown`
- `Like`
- `Visit`
- `Category`
- `Message`
- `Log`

Use pluralisation only when the folder represents a domain or collection:

- `Users`
- `Settings`

Do not pluralise a folder merely because it maps to a plural REST path. The mounted route and feature folder are independent.

When uncertain, prefer the singular entity name.

## 1.2 Frontend file structure

```text
Feature/
├── Feature.tsx
├── Feature.columns.tsx
├── Feature.actions.ts
├── Feature.filters.ts
├── Feature.styles.css
├── Feature.styles.scss
├── Feature.styles.ts
├── Feature.types.ts
├── Feature.schema.ts
├── Feature.transformers.ts
├── Feature.selectors.ts
├── Feature.controller.ts
├── Feature.hooks.ts
├── Feature.context.tsx
├── Feature.queries.ts
├── Feature.utils.ts
├── Feature.options.ts
├── Feature.constants.ts
├── Feature.defaults.ts
├── Feature.config.ts
├── SubFeature/
│   └── SubFeature.tsx
├── components/
│   └── ComponentFoo.tsx
├── index.ts
└── tests/
    ├── Feature.spec.tsx
    ├── Feature.spec.utils.tsx
    ├── Feature.spec.types.ts
    ├── Feature.mocks.ts
    └── Feature.utils.spec.ts
```

Not every feature requires every file. Create files only when the corresponding role exists.

## 1.3 Main feature export

The main file exports a symbol named after the folder.

```ts
// Button/Button.tsx
export const Button = ...
```

```ts
// BreakdownTable/BreakdownTable.tsx
export const BreakdownTable = ...
```

`index.ts` re-exports the feature's public API.

## 1.4 Allowed file roles

Use only the documented role suffixes.

Do not invent ad-hoc files such as:

- `Feature.integration.spec`
- `Feature.paging.ts`
- `Feature.sorting.ts`

If a file does not fit an existing role, keep the code in the primary file or place the helper under an appropriate existing role.

Adding a new architectural role requires documenting it here first.

This prevents feature folders from accumulating arbitrary "dump" files.

# 2. Server architecture

## 2.1 Feature organisation

Organise new server code by **feature**, not by technical file type.

Use the same `Feature/` concept as the frontend, based on the business entity or domain.

Examples:

- `Users`
- `Exercises`
- `MuscleGroup`

Core API features live under the server feature structure defined by the project.

Do not create new top-level shared folders such as:

- `models/`
- `routes/`
- `const/`
- `options/`

for new features.

Co-locate feature-specific code inside the feature folder.

## 2.2 Server file structure

```text
Feature/
├── Feature.routes.ts
├── Feature.controller.ts
├── Feature.middlewares.ts
├── Feature.service.ts
├── Feature.permissions.ts
├── Feature.repository.ts
├── Feature.model.ts
├── Feature.auth.ts
├── Feature.seed.ts
├── Feature.types.ts
├── Feature.schema.ts
├── Feature.transformers.ts
├── Feature.utils.ts
├── Feature.constants.ts
├── Feature.options.ts
├── Feature.defaults.ts
├── Feature.config.ts
├── Feature.errors.ts
├── index.ts
└── tests/
    ├── Feature.spec.ts
    ├── Feature.spec.utils.ts
    ├── Feature.spec.types.ts
    ├── Feature.mocks.ts
    ├── Feature.seed.spec.ts
    └── Feature.utils.spec.ts
```

Again, only create roles that are actually required.

## 2.3 Server naming

Export names follow:

```text
Feature<Role>
```

The suffix identifies the file role and `Feature` identifies the entity.

Examples:

- `ExerciseModel`
- `ExercisesRouter`
- `ExercisesController`
- `ExercisesService`
- `ExercisesRepository`
- `ExercisesPermissions`
- `ExercisesSchema`

For routers, the local variable is always:

```ts
router
```

Never `route`.

## 2.4 Models and repositories

Models use the `FeatureModel` convention.

For example:

```ts
ExerciseModel
```

The corresponding document interface uses `I` plus the entity:

```ts
IGymExercise
```

Repositories use the repository abstraction:

```ts
Repository.define<typeof Model, IDoc>(Model)
  .withQueries({...})
```

The second generic is explicitly the document type.

Do not rely on duck-typed `DocFrom` inference for real Mongoose models.

Feature-specific queries remain inline in `withQueries({...})`.

## 2.5 Permissions

Permissions are grouped under a `FeaturePermissions` namespace.

Permission guards use complete imperative sentences:

```ts
requireUserCanModify(exercise, user)
```

Do not use vague boolean-style names such as:

```ts
canModify(...)
```

Permission guards are security operations, not predicates.

They **throw `ApiResponder.forbidden()` when the operation is not permitted**.

## 2.6 Validation schemas

Schemas use a `FeatureSchema` namespace object containing:

```ts
{
    ;(schema, validate)
}
```

Do not export a bare `validate` function as the feature's schema API.

## 2.7 Service and route layering

Service methods own domain logic and use imperative verbs that mirror the routes.

Examples:

```ts
listVisibleTo(...)
create(...)
update(...)
remove(...)
```

Route handlers remain thin.

The route layer should:

1. resolve the user;
2. call the service;
3. respond.

Business logic belongs in the service, not in the route handler.

The per-route `resolveCurrentUser(req)` helper is deferred to the `Users/` refactor described by the relevant feature documentation.

# 3. Namespaces and grouping

Group related helpers under a PascalCase namespace object when they form a cohesive concern.

Examples:

```ts
Codecs
Numbers
Browser
Strings
Path
```

A namespace may contain related short leaf names:

```ts
Codecs = {
    text,
    number,
    checkbox,
}
```

Namespaces may be nested when that improves semantic grouping.

Examples:

```ts
Strings.Optional.trim
Strings.Optional.toUndefined
Url.Codecs.text
```

The namespace path should read naturally as a sentence.

The purpose of this structure is to provide meaningful context without making every leaf function name unnecessarily long.

# 4. Types and shared code

## 4.1 Domain types

All domain-specific types belong in:

```text
common/types/
```

This includes:

- API shapes
- entities
- query types
- response types
- other domain/application types

Feature code should use or re-export these types rather than defining domain types locally.

## 4.2 Generic types

All reusable generic types belong in:

```text
common/utils/Generics/
```

Examples include:

- `Optional`
- `Nullish`
- `Dictionary`
- `DeepPartial`
- `ValueOf`

Before defining a generic type, check this directory first.

## 4.3 Generic functions

Generic functions that are not tied to a specific domain belong in:

```text
common/utils/
```

Do not put generic utilities inside feature folders.

## 4.4 Generic components

Reusable components that are not feature-specific belong in:

```text
common/ux/
```

Do not build a generic component inside a feature folder merely because it is first used by that feature.

# 5. Imports and dependency direction

Always review imports when editing or adding to a file.

If a module/path is already imported, extend the existing import rather than adding a second import from the same path.

Keep genuinely different module paths as separate imports where appropriate.

## 5.1 Dependency direction

The intended dependency direction is:

```text
feature → common/utils → common/types
```

Avoid circular dependencies.

In particular:

```text
common/types/
```

must never have runtime dependencies on:

```text
common/utils/
```

`common/utils/` already depends on `common/types/`, so reversing that dependency creates a cycle.

Type-only imports from the barrel are safe because they are erased at runtime, but value imports should prefer specific subpaths.

This is especially important in server code, where importing through the common barrel can unnecessarily pull frontend-only React/CSS dependencies into the server.

# 6. Architectural decision rule

When adding new code, first determine which existing architectural role it belongs to.

Prefer the existing structure over creating a new one.

If the code does not fit the documented architecture, **do not silently invent a new pattern**. Raise the architectural decision first and update this document when a new convention is deliberately adopted.
