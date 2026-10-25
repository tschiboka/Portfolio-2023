# File structure

## 1. Frontend

### 1.1 File structure

```text
Feature/
├── Feature.tsx              (primary file)
├── Feature.actions.ts
├── Feature.business.md
├── Feature.code.ts
├── Feature.columns.tsx
├── Feature.config.ts
├── Feature.constants.ts
├── Feature.context.ts
├── Feature.controller.ts
├── Feature.data.ts
├── Feature.defaults.ts
├── Feature.demos.tsx
├── Feature.filters.ts
├── Feature.generated.ts
├── Feature.handlers.ts
├── Feature.hooks.ts
├── Feature.options.ts
├── Feature.provider.tsx
├── Feature.queries.ts
├── Feature.reducer.ts
├── Feature.routes.tsx
├── Feature.schema.ts
├── Feature.selectors.ts
├── Feature.states.ts
├── Feature.storage.ts
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

| extension                       | returns                                                                                   | comment                                                                                                                                                                |
| ------------------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Feature.tsx`                   | `Feature`                                                                                 | named export (no default)                                                                                                                                              |
| `Feature.tsx` props             | `FeatureProps`                                                                            | top-level type in the same file, above the component — **never** moved to `.types.ts`                                                                                  |
| `Feature.actions.ts`            | `FeatureActions` (factory → `TableAction<T>[]`)                                           | table row actions (`id`/`label`/`onClick`/`href`/`filter`) — not form/event handlers                                                                                   |
| `Feature.business.md`           | `–` (none)                                                                                | documentation only — business rules / why, no code symbol; non-executable                                                                                              |
| `Feature.code.ts`               | `FeatureCode`                                                                             | source strings shown by a story or article                                                                                                                             |
| `Feature.columns`               | `FeatureColumns`                                                                          | typed `TableColumns<T>`                                                                                                                                                |
| `Feature.config.ts`             | `FeatureConfig`                                                                           | config                                                                                                                                                                 |
| `Feature.constants.ts`          | `FeatureConstants` (cohesive) / `Feature<Name>` (distinct)                                | never bare consts                                                                                                                                                      |
| `Feature.context.ts`            | `FeatureContext = ContextBuilder.CreateContext<Values>('Feature', initialValues)`         | one call supplying `Context`, `Provider` and `Use` — never a hand-rolled `createContext`                                                                               |
| `Feature.controller.ts`         | `FeatureController`                                                                       | controller                                                                                                                                                             |
| `Feature.defaults.ts`           | `FeatureDefaults`                                                                         | default values                                                                                                                                                         |
| `Feature.data.ts`               | grouped content — arrays and lookups, no umbrella                                         | static content the feature renders                                                                                                                                     |
| `Feature.demos.tsx`             | one demo component per export                                                             | demonstrations shown on a story screen                                                                                                                                 |
| `Feature.filters.ts`            | `FeatureFilters`                                                                          | filter builders                                                                                                                                                        |
| `Feature.generated.ts`          | – (generated)                                                                             | build output of `npm run build:tokens` from `tokens.json` — never edited; the generator decides the export shape                                                       |
| `Feature.handlers.ts`           | `FeatureHandlers`                                                                         | group of form/event handlers (e.g. `submit`) orchestrating form→mutation                                                                                               |
| `Feature.hooks.ts`              | `FeatureHooks.useX` ≥2 hooks; `useX` for a single                                         | grouped custom hooks — includes `FeatureHooks.useContext`, re-exporting the `ContextBuilder` `Use`                                                                     |
| `Feature.options.ts`            | `FeatureOptions`                                                                          | options/choices                                                                                                                                                        |
| `Feature.provider.tsx`          | `FeatureProvider`                                                                         | only when the provider holds state; otherwise the builder's `Provider` is used directly                                                                                |
| `Feature.queries.ts`            | `FeatureQueries.use<Verb>` per CRUD op; sub-feature `FeatureQueries.SubFeature.use<Verb>` | react-query, `use` prefix required                                                                                                                                     |
| `Feature.reducer.ts`            | `FeatureReducer`                                                                          | the `useReducer` reducer and its action types                                                                                                                          |
| `Feature.routes.tsx`            | `FeatureRoutes`                                                                           | one export: map or array                                                                                                                                               |
| `Feature.schema.ts`             | `FeatureSchema = { schema, validate }`                                                    | yup/Joi                                                                                                                                                                |
| `Feature.selectors.ts`          | `FeatureSelectors`                                                                        | selectors                                                                                                                                                              |
| `Feature.states.ts`             | `FeatureStates`                                                                           | state machine states and transitions                                                                                                                                   |
| `Feature.storage.ts`            | `FeatureStorage`                                                                          | local-storage keys, the shape they hold, and the accessors                                                                                                             |
| `Feature.styles.css` / `.scss`  | class rules under `FeatureStyles` scope                                                   | plain CSS, feature-scoped                                                                                                                                              |
| `Feature.styles.ts`             | `FeatureStyles: { name: CSSProperties }`                                                  | typed style set                                                                                                                                                        |
| `Feature.transformers.ts`       | `FeatureTransformers`                                                                     | grouped mappers                                                                                                                                                        |
| `Feature.types.ts`              | named domain types                                                                        | `xyz` interfaces/aliases — **not** the main component's props (see `Feature.tsx` props)                                                                                |
| `Feature.utils.ts`              | `FeatureUtils`                                                                            | grouped helper functions                                                                                                                                               |
| `tests/Feature.mocks.ts`        | `FeatureMocks`                                                                            | grouped fixture data, e.g. `FeatureMocks.resourceName`                                                                                                                 |
| `tests/Feature.mockHandlers.ts` | `FeatureMockHandlers.<SubFeature>.<Verb>`                                                 | **unbuilt** MSW `RequestBuilder`s (never `.build()`); umbrella grouped subfeature → verb (`Post`, `PostError`); `Defaults` holds the spec's handler set                |
| `tests/Feature.spec.utils.ts`   | `FeatureTestUtils`                                                                        | **one umbrella** — `labels` + `customRender(handlers = FeatureMockHandlers.Defaults)` + interaction helpers; everything above `describe` lives here, never in the spec |

### 1.3 Testing

| Role file                                            | Direct spec?                   | How tested                                                                  |
| ---------------------------------------------------- | ------------------------------ | --------------------------------------------------------------------------- |
| `Feature.tsx` (+ sub-components)                     | YES — `tests/Feature.spec.tsx` | feature spec; also covers `components/`, the wiring, and query hooks        |
| `Feature.columns.ts`                                 | NO — indirect                  | covered by feature-spec table render                                        |
| `Feature.code.ts`                                    | NO                             | no behavior                                                                 |
| `Feature.constants.ts` / `defaults.ts` / `config.ts` | NO                             | no behavior                                                                 |
| `Feature.data.ts`                                    | NO                             | no behavior                                                                 |
| `Feature.demos.tsx`                                  | NO                             | demo only                                                                   |
| `Feature.filters.ts` / `selectors.ts` / `actions.ts` | NO — indirect                  | covered via feature/table spec                                              |
| `Feature.generated.ts`                               | NO                             | no behavior — build output                                                  |
| `Feature.handlers.ts`                                | YES                            | pure handler spec (form → mutation)                                         |
| `Feature.hooks.ts`                                   | NO — indirect                  | covered via the feature spec                                                |
| `Feature.options.ts`                                 | YES                            | pure options spec                                                           |
| `Feature.queries.ts`                                 | NO — indirect                  | covered by the feature spec's server harness (`Test.Screen` + MSW handlers) |
| `Feature.reducer.ts`                                 | YES                            | pure reducer spec                                                           |
| `Feature.schema.ts`                                  | NO — indirect                  | covered by feature-spec form submission                                     |
| `Feature.states.ts`                                  | YES                            | pure transition spec                                                        |
| `Feature.storage.ts`                                 | NO                             | no behavior                                                                 |
| `Feature.styles.*` / `index.ts`                      | NO                             | no behavior                                                                 |
| `Feature.transformers.ts`                            | YES                            | pure mapper spec                                                            |
| `Feature.types.ts`                                   | NO                             | no behavior                                                                 |
| `Feature.utils.ts`                                   | YES                            | pure util spec                                                              |

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
├── Feature.middleware.ts
├── Feature.model.ts
├── Feature.options.ts
├── Feature.permissions.ts
├── Feature.repository.ts
├── Feature.router.ts
├── Feature.schema.ts
├── Feature.seed.ts
├── Feature.service.ts
├── Feature.states.ts
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
| `Feature.auth.ts`         | `FeatureAuth`                          | auth helpers                                                              |
| `Feature.business.md`     | `–` (none)                             | documentation only — business rules / why, no code symbol; non-executable |
| `Feature.config.ts`       | `FeatureConfig`                        | config                                                                    |
| `Feature.constants.ts`    | `FeatureConstants`                     | grouped constants                                                         |
| `Feature.controller.ts`   | `FeatureController`                    | route handlers                                                            |
| `Feature.defaults.ts`     | `FeatureDefaults`                      | default values                                                            |
| `Feature.errors.ts`       | `FeatureErrors`                        | grouped error types/factories                                             |
| `Feature.middleware.ts`   | `FeatureMiddleware`                    | grouped middleware                                                        |
| `Feature.model.ts`        | `FeatureModel`                         | mongoose model                                                            |
| `Feature.options.ts`      | `FeatureOptions`                       | options/choices                                                           |
| `Feature.permissions.ts`  | `FeaturePermissions`                   | permission rules                                                          |
| `Feature.repository.ts`   | `FeatureRepository`                    | data access                                                               |
| `Feature.router.ts`       | `FeatureRouter`                        | express router (local var `router`)                                       |
| `Feature.schema.ts`       | `FeatureSchema = { schema, validate }` | Joi/yup validation                                                        |
| `Feature.seed.ts`         | `FeatureSeed`                          | inserts the records the domain needs before real data exists              |
| `Feature.service.ts`      | `FeatureService`                       | business logic                                                            |
| `Feature.states.ts`       | `FeatureStates`                        | state machine states and transitions                                      |
| `Feature.transformers.ts` | `FeatureTransformers`                  | grouped mappers                                                           |
| `Feature.types.ts`        | named domain types                     | `xyz` interfaces/aliases                                                  |
| `Feature.utils.ts`        | `FeatureUtils`                         | grouped helpers                                                           |

### 2.5 Testing

| Role file                                                                    | Direct spec?                       | How tested                            |
| ---------------------------------------------------------------------------- | ---------------------------------- | ------------------------------------- |
| `Feature.controller.ts`                                                      | NO — indirect                      | covered by route spec                 |
| `Feature.middleware.ts`                                                      | NO — indirect                      | covered by route spec                 |
| `Feature.permissions.ts` / `auth.ts`                                         | NO — indirect                      | covered by route/feature spec         |
| `Feature.repository.ts`                                                      | YES                                | repository spec (in-memory / mock)    |
| `Feature.router.ts`                                                          | YES — `tests/Feature.spec.ts`      | route/integration spec, mocks service |
| `Feature.schema.ts`                                                          | YES                                | validation spec                       |
| `Feature.seed.ts`                                                            | YES — `tests/Feature.seed.spec.ts` | seed spec                             |
| `Feature.service.ts`                                                         | YES — `tests/Feature.spec.ts`      | service spec (mock repo)              |
| `Feature.states.ts`                                                          | YES                                | pure transition spec                  |
| `Feature.transformers.ts`                                                    | YES                                | pure mapper spec                      |
| `Feature.types.ts` / `constants.ts` / `config.ts` / `errors.ts` / `index.ts` | NO                                 | no behavior                           |
| `Feature.utils.ts`                                                           | YES                                | pure util spec                        |
