# File structure

## 1. Frontend

### 1.1 File structure

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

### 1.2 Role returns

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

### 1.3 Testing

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

## 2. Server

### 2.1 File structure

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
    └── Feature.utils.spec.ts
```

### 2.2 Role returns

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

### 2.5 Testing

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
