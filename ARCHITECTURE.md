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
├── Feature.tsx              (primary file)
├── Feature.actions.ts
├── Feature.business.md
├── Feature.columns.tsx
├── Feature.config.ts
├── Feature.constants.ts
├── Feature.context.ts
├── Feature.controller.ts
├── Feature.defaults.ts
├── Feature.filters.ts
├── Feature.handlers.ts
├── Feature.hooks.ts
├── Feature.options.ts
├── Feature.provider.tsx
├── Feature.queries.ts
├── Feature.routes.tsx
├── Feature.schema.ts
├── Feature.selectors.ts
├── Feature.styles.css
├── Feature.styles.scss
├── Feature.styles.ts
├── Feature.transformers.ts
├── Feature.types.ts
├── Feature.utils.ts
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

## 1.2.1 Feature role returns

Each role file returns a `Feature`-named symbol (`Feature<Role>`), typed and
grouped where the role is a set. Adjust as conventions are added.

| extension                      | returns                                                                                   | comment                                                                                                                                                                |
| ------------------------------ | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Feature.tsx`                  | `Feature`                                                                                 | named export (no default)                                                                                                                                              |
| `Feature.tsx` props            | `FeatureProps`                                                                            | top-level type in the same file, above the component — **never** moved to `.types.ts`                                                                                  |
| `Feature.routes.tsx`           | `FeatureRoutes` + `FeatureRoutesList`                                                     | keyed map + derived array                                                                                                                                              |
| `Feature.columns`              | `FeatureColumns`                                                                          | typed `TableColumns<T>`                                                                                                                                                |
| `Feature.types.ts`             | named domain types                                                                        | `xyz` interfaces/aliases — **not** the main component's props (see `Feature.tsx` props)                                                                                |
| `Feature.schema.ts`            | `FeatureSchema = { schema, validate }`                                                    | yup/Joi                                                                                                                                                                |
| `Feature.queries.ts`           | `FeatureQueries.use<Verb>` per CRUD op; sub-feature `FeatureQueries.SubFeature.use<Verb>` | react-query, `use` prefix required                                                                                                                                     |
| `Feature.styles.ts`            | `FeatureStyles: { name: CSSProperties }`                                                  | typed style set                                                                                                                                                        |
| `Feature.styles.css` / `.scss` | class rules under `FeatureStyles` scope                                                   | plain CSS, feature-scoped                                                                                                                                              |
| `Feature.utils.ts`             | `FeatureUtils`                                                                            | grouped helper functions                                                                                                                                               |
| `Feature.constants.ts`         | `FeatureConstants` (cohesive) / `Feature<Name>` (distinct)                                | never bare consts                                                                                                                                                      |
| `Feature.defaults.ts`          | `FeatureDefaults`                                                                         | default values                                                                                                                                                         |
| `Feature.config.ts`            | `FeatureConfig`                                                                           | config                                                                                                                                                                 |
| `Feature.hooks.ts`             | `FeatureHooks.useX` ≥2 hooks; `useX` for a single                                         | grouped custom hooks — includes `FeatureHooks.useContext`, re-exporting the `ContextBuilder` `Use`                                                                     |
| `Feature.context.ts`           | `FeatureContext = ContextBuilder.CreateContext<Values>('Feature', initialValues)`         | one call supplying `Context`, `Provider` and `Use` — never a hand-rolled `createContext`                                                                               |
| `Feature.provider.tsx`         | `FeatureContextProvider`                                                                  | only when the provider holds state; otherwise the builder's `Provider` is used directly                                                                                |
| `Feature.transformers.ts`      | `FeatureTransformers`                                                                     | grouped mappers                                                                                                                                                        |
| `Feature.options.ts`           | `FeatureOptions`                                                                          | options/choices                                                                                                                                                        |
| `Feature.actions.ts`           | `FeatureActions` (factory → `TableAction<T>[]`)                                           | table row actions (`id`/`label`/`onClick`/`href`/`filter`) — not form/event handlers                                                                                   |
| `Feature.handlers.ts`          | `FeatureHandlers`                                                                         | group of form/event handlers (e.g. `submit`) orchestrating form→mutation                                                                                               |
| `Feature.filters.ts`           | `FeatureFilters`                                                                          | filter builders                                                                                                                                                        |
| `Feature.selectors.ts`         | `FeatureSelectors`                                                                        | selectors                                                                                                                                                              |
| `Feature.controller.ts`        | `FeatureController`                                                                       | controller                                                                                                                                                             |
| `Feature.business.md`          | `–` (none)                                                                                | documentation only — business rules / why, no code symbol; non-executable                                                                                              |
| `tests/Feature.mocks.ts`       | `FeatureMocks`                                                                            | grouped fixture data, e.g. `FeatureMocks.resourceName`                                                                                                                 |
| `tests/Feature.mockHandles.ts` | `FeatureMockHandlers.<SubFeature>.<Verb>`                                                 | **unbuilt** MSW `RequestBuilder`s (never `.build()`); umbrella grouped subfeature → verb (`Post`, `PostError`); `Defaults` holds the spec's handler set                |
| `tests/Feature.spec.utils.ts`  | `FeatureTestUtils`                                                                        | **one umbrella** — `labels` + `customRender(handlers = FeatureMockHandlers.Defaults)` + interaction helpers; everything above `describe` lives here, never in the spec |

## 1.2.2 Testing

Tests live in the feature `tests/` folder. **Not every file needs a direct
spec** — most behavior is exercised indirectly through the feature spec.
Add a direct spec only when the role has pure/isolated behavior worth pinning
down; declarative and thin-lead roles are covered indirectly.

| Role file                                            | Direct spec?                   | How tested                                                                 |
| ---------------------------------------------------- | ------------------------------ | -------------------------------------------------------------------------- |
| `Feature.tsx` (+ sub-components)                     | YES — `tests/Feature.spec.tsx` | feature spec; also covers `components/`, the wiring, and query hooks       |
| `Feature.queries.ts`                                 | NO — indirect                  | covered by the feature spec's server harness (`TestScreen` + MSW handlers) |
| `Feature.hooks.ts`                                   | NO — indirect                  | covered via the feature spec                                               |
| `Feature.handlers.ts`                                | YES                            | pure handler spec (form → mutation)                                        |
| `Feature.transformers.ts`                            | YES                            | pure mapper spec                                                           |
| `Feature.options.ts`                                 | YES                            | pure options spec                                                          |
| `Feature.utils.ts`                                   | YES                            | pure util spec                                                             |
| `Feature.schema.ts`                                  | NO — indirect                  | covered by feature-spec form submission                                    |
| `Feature.columns.ts`                                 | NO — indirect                  | covered by feature-spec table render                                       |
| `Feature.filters.ts` / `selectors.ts` / `actions.ts` | NO — indirect                  | covered via feature/table spec                                             |
| `Feature.types.ts`                                   | NO                             | no behavior                                                                |
| `Feature.constants.ts` / `defaults.ts` / `config.ts` | NO                             | no behavior                                                                |
| `Feature.styles.*` / `index.ts`                      | NO                             | no behavior                                                                |

Test fixtures — mock data, handler/query stubs and option/colour factories in
`tests/` — carry a one-line JSDoc stating their purpose (precedent:
`Feature.mocks.ts`, `Register.mockHandlers.ts` / `Register.spec.utils.ts`).
`FeatureTestUtils.customRender` renders the subject and returns `userEvent`
(when used by tests), keeping render + interaction concerns out of the spec body.

### Test interaction — always use the built-in accessors

`common/ux/Test/` exposes an accessor per component. Reach for one **before**
writing a raw query: a raw `screen.getByRole(...)` guesses at the DOM, whereas
the accessor is the component's contracted test surface.

- `Test.Section(label)` → `.Do.toggle()`, `.Get.title()`, `.Get.isOpen()` — for
  any `Section`/`Region`; never query it as a `button`.
- `Test.Form(label)` → `.Input(name)`, `.Button(name)`, `.Search(name)`.
- `Test.LoadingIndicator.Has.isLoading()` — never a hand-rolled loading `waitFor`.
- `Accessor.user` is the only sanctioned interaction singleton (`user.click(…)`).

If an accessor lacks a needed method, **add it to the accessor** — do not
work around it in the spec.

## 1.2.3 Business documentation

A feature may contain a `Feature.business.md` file when the feature has
meaningful business rules, scenarios, decisions, restrictions, legal
requirements or other business context that explains its intended behaviour.

The business document describes **why the feature behaves as it does**, rather
than how it is implemented. It provides a short feature overview and documents
significant business rules using a stable numbered hierarchy.

It is a concise **lookup of the whys** — a reference for quickly finding and
reviewing business requirements — not a change log. It is distinct from the
per-ticket documentation (`docs/NNNN-*.md`), which is lengthy, change-oriented
history. `Feature.business.md` holds only the tight, stable business rationale
and nothing else.

Business documentation must be **intentionally concise without losing relevant
information**. Prefer precise statements, structured rules and references over
lengthy explanations. Information is included because it helps explain or
verify the intended business behaviour — it is not a dumping ground for
meeting notes, discussion history or general prose.

Rules use a stable numbered hierarchy:

- `## N. <Topic>` — a business area.
- `### N.M <Rule>` — a numbered business rule that may be referenced.

Each rule may carry the following (not mandatory):

```
### 1.1 Administration

Only administrators may manually regenerate a breakdown.

**Reason:** Regeneration consumes an external service resource.

@see BreakdownSelectors.isRegenerateAvailable
```

The numbered rule structure provides a stable reference for discussing
requirements, reviewing implementation or explaining behaviour to developers,
testers or other stakeholders.

The document may record whether a feature or individual business requirement
is active, deprecated or otherwise no longer applicable.

Where business requirements require explicit approval or have been materially
changed, a `Sign-off` section at the bottom may be included:

```
## Sign-off

| Date | By | Change |
|------|----|--------|
| 2026-08-31 | Jane Smith | Initial business rules |
| 2026-09-12 | John Smith | Updated availability rules |
```

The document must stay focused on **business intent, rules, decisions and
rationale**. Implementation details belong in the appropriate feature role
file.

`Feature.business.md` is documentation, not executable business logic, and does
not require a corresponding test file.

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

`Feature.business.md` is the sole non-code role permit — it documents the
feature's business intent and is exempt from the "no dump files" rule.

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
├── Feature.auth.ts
├── Feature.business.md
├── Feature.config.ts
├── Feature.constants.ts
├── Feature.controller.ts
├── Feature.defaults.ts
├── Feature.errors.ts
├── Feature.middlewares.ts
├── Feature.model.ts
├── Feature.options.ts
├── Feature.permissions.ts
├── Feature.repository.ts
├── Feature.routes.ts
├── Feature.schema.ts
├── Feature.seed.ts
├── Feature.service.ts
├── Feature.transformers.ts
├── Feature.types.ts
├── Feature.utils.ts
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

### 2.3.1 Feature role returns

| extension                 | returns                                | comment                                                                   |
| ------------------------- | -------------------------------------- | ------------------------------------------------------------------------- |
| `Feature.model.ts`        | `FeatureModel`                         | mongoose model                                                            |
| `Feature.routes.ts`       | `FeatureRoutes`                        | router (local var `router`)                                               |
| `Feature.controller.ts`   | `FeatureController`                    | route handlers                                                            |
| `Feature.middlewares.ts`  | `FeatureMiddlewares`                   | grouped middleware                                                        |
| `Feature.service.ts`      | `FeatureService`                       | business logic                                                            |
| `Feature.repository.ts`   | `FeatureRepository`                    | data access                                                               |
| `Feature.permissions.ts`  | `FeaturePermissions`                   | permission rules                                                          |
| `Feature.auth.ts`         | `FeatureAuth`                          | auth helpers                                                              |
| `Feature.seed.ts`         | `FeatureSeed`                          | seed data / runner                                                        |
| `Feature.schema.ts`       | `FeatureSchema = { schema, validate }` | Joi/yup validation                                                        |
| `Feature.transformers.ts` | `FeatureTransformers`                  | grouped mappers                                                           |
| `Feature.utils.ts`        | `FeatureUtils`                         | grouped helpers                                                           |
| `Feature.constants.ts`    | `FeatureConstants`                     | grouped constants                                                         |
| `Feature.options.ts`      | `FeatureOptions`                       | options/choices                                                           |
| `Feature.defaults.ts`     | `FeatureDefaults`                      | default values                                                            |
| `Feature.config.ts`       | `FeatureConfig`                        | config                                                                    |
| `Feature.errors.ts`       | `FeatureErrors`                        | grouped error types/factories                                             |
| `Feature.business.md`     | `–` (none)                             | documentation only — business rules / why, no code symbol; non-executable |
| `Feature.types.ts`        | named domain types                     | `xyz` interfaces/aliases                                                  |

### 2.3.2 Testing

Tests live in the feature `tests/` folder. Services, repositories, schemas and
transformers have deterministic behavior and get direct specs; routers and
controllers are covered through the route spec.

| Role file                                                                    | Direct spec?                       | How tested                            |
| ---------------------------------------------------------------------------- | ---------------------------------- | ------------------------------------- |
| `Feature.service.ts`                                                         | YES — `tests/Feature.spec.ts`      | service spec (mock repo)              |
| `Feature.repository.ts`                                                      | YES                                | repository spec (in-memory / mock)    |
| `Feature.schema.ts`                                                          | YES                                | validation spec                       |
| `Feature.transformers.ts`                                                    | YES                                | pure mapper spec                      |
| `Feature.utils.ts`                                                           | YES                                | pure util spec                        |
| `Feature.seed.ts`                                                            | YES — `tests/Feature.seed.spec.ts` | seed spec                             |
| `Feature.routes.ts`                                                          | YES — `tests/Feature.spec.ts`      | route/integration spec, mocks service |
| `Feature.controller.ts`                                                      | NO — indirect                      | covered by route spec                 |
| `Feature.middlewares.ts`                                                     | NO — indirect                      | covered by route spec                 |
| `Feature.permissions.ts` / `auth.ts`                                         | NO — indirect                      | covered by route/feature spec         |
| `Feature.types.ts` / `constants.ts` / `config.ts` / `errors.ts` / `index.ts` | NO                                 | no behavior                           |

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

## 5.2 Import ordering

Order imports by **source**, not by role. This is a mechanical rule that is easy to enforce and avoids case-by-case judgement.

**FE (React) files — 5 tiers:**

1. **External / third-party** — `react`, npm packages (`react-router-dom`, `@tanstack/react-query`, `detectincognitojs`, …)
2. **Internal aliased imports** — `@common-*`, `@app`, `@portfolio`, `@projects`, `@shared-*`
3. **Relative imports** — `./`, `../` local files
4. **Type-only imports** — every `import type`, gathered here regardless of source
5. **Side-effect / asset imports** — `'./x.scss'`, `'./style.css'`, no bindings. Always last.

```tsx
// 1. External
import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// 2. Aliased internal
import { Session } from '@shared-context/SessionContext'
import { Browser } from '@common-utils'
// 3. Relative
import { PageNav } from '../Nav'
import { Footer } from '../Footer/Footer'
// 4. Type-only
import type { SessionContextValues } from '@shared-context'
// 5. Side-effect / asset
import './Screen.css'
```

Within a tier, no strict ordering is required beyond keeping the tier contiguous.

Types are the one deliberate exception to ordering by source: they are gathered
into a single tier immediately above the assets, so there is no per-tier
value/type ordering to reason about.

**BE (server) files — reduced 4 tiers** (no React, no asset tier):

1. **External / node** — `express`, npm packages
2. **Aliased internal** — `@common-*`
3. **Relative local** — `./`, `../` (including relative `common/` imports where used)
4. **Type-only** — every `import type`

```ts
// 1. External
import express from 'express'
// 2. Aliased internal
import { ApiResponder } from '@common-utils'
// 3. Relative local
import { auth, admin } from '../Users/Users.middlewares'
import { ActivityService } from './Activity.service'
// 4. Type-only
import type { Request } from 'express'
```

> Why "source, not role": a component and a util from the same path belong
> together, so splitting them (e.g. "components" vs "utils" tiers) forces a
> judgement call on every line. Grouping by source is objective and lintable.

# 6. Architectural decision rule

When adding new code, first determine which existing architectural role it belongs to.

Prefer the existing structure over creating a new one.

If the code does not fit the documented architecture, **do not silently invent a new pattern**. Raise the architectural decision first and update this document when a new convention is deliberately adopted.
