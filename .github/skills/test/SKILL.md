---
name: 'test'
kind: 'area'
stack: 'jest, testing-library, msw'
description: 'Authoring specs and their fixtures. Feature specs, unit specs, mock data and the MockBuilder API, MSW handlers, and rendering a feature through TestScreen.'
---

# Test

No code here. Every claim below points at an example file beside this one.

## When to use

- Writing or extending a spec, feature or unit tests.
- Creating, extending or migrating mock data.
- Deciding where a mock lives.
- Locking down business behaviour.

## Scope of Expertise / Domain

Owns the whole span from mocks to assertion: the mock's home and builder calls,
the handler umbrella, the `FeatureTestUtils` extraction, the accessor choice, and
the shape of every `it`. It does not decide what a feature should do, and it does
not score code quality — that is `review`.

## File structure

```text
Feature/
├── tests/
│   ├── Feature.spec.tsx         ← the feature spec
│   ├── Feature.mocks.ts         ← feature-local mocks + handler umbrella
│   ├── Feature.spec.utils.ts    ← everything outside `describe`
│   └── Feature.<role>.spec.ts   ← only for a pure, isolated role

common/mocks/
├── index.ts          barrel
├── TestMocks.ts      shared primitives
└── <Type>.mocks.ts   one per API resource
```

The spec is imports plus `describe`. Anything else above the first `describe`
belongs in `Feature.spec.utils.ts`.

## Methodology

### Where a mock lives

Two homes, one rule each.

| Mock                                                                    | Home                             | Import          |
| ----------------------------------------------------------------------- | -------------------------------- | --------------- |
| **Common** — an API resource or shared primitive reused across features | `common/mocks/`                  | `@common-mocks` |
| **Feature-local** — a variation, override or shape used by one feature  | `Feature/tests/Feature.mocks.ts` | local relative  |

A common mock is the **base**. A feature never re-declares it — it derives its
variation through the builder and exports that.

Never spread-override a built object — `{ ...MockResource.build(), status: 'active' }`
bypasses typing and drops the builder. Always go through `MockBuilder`.

Reference: [`Feature.mocks.ts`](./Feature.mocks.ts) — a feature-local derivation.

### Building a mock

Every mock is a `MockBuilderType<T>` constant built with `MockBuilder`.

| Method                   | Use                                                   |
| ------------------------ | ----------------------------------------------------- |
| `modify(overrides)`      | shallow-merge a `Partial<T>` — the default derivation |
| `setValue(key, value)`   | change one property, key-checked                      |
| `set(fn)`                | whole-state transform                                 |
| `update(lens, fn)`       | nested value via a ramda lens                         |
| `omit(...keys)`          | drop properties for a response shape                  |
| `pick(...keys)`          | keep only named properties                            |
| `asList(...extra)`       | wrap as `T[]` — this mock first, then extras          |
| `buildList(overrides[])` | bulk variants from this base                          |
| `build()`                | plain object, for a handler `response:`               |

Reference: [`TestMocks.ts`](./TestMocks.ts) — the shared primitives, and the
`MockBuilder` call that produces them.

### Primitives

Test-identity values — ids, names, emails, tokens, timestamps — come from
`TestMocks`. Domain constants (`'active'`, `'archived'`) stay inline.

Search `TestMocks` before writing any literal, and extend it before writing a
second one. If a field needs a different _type_ — a `Date` where `TestMocks`
holds an ISO string — convert at the call site rather than adding a new value.

A genuinely new primitive belongs in `TestMocks`, never as a feature-local
`TEST_*` constant. The test: could another feature plausibly need this value?

Never hand-roll a value a common util already produces. Durations come from the
`DateTime` units, route strings from `Paths`.

### Handler groups

`Feature/tests/Feature.mocks.ts` exports a single umbrella constant,
`FeatureMockHandlers`, grouped by subfeature then HTTP verb — never bare handler
variables.

Subfeature key is PascalCase and optional — omit it for a flat feature. Verb key
is the PascalCase of the method, with `Rejected` appended for the failure variant
— `Post`, `PostRejected`, `PostRejectedNoMessage`, never `PostError`.
`Defaults` is the umbrella's own member: the handler set a spec registers
wholesale. Hoist the shared builder to a local const so `Defaults` and the verb
entry reference one definition.

Every handler is a local const, JSDoc'd with its method and outcome — a
successful one is not a function, since nothing about it varies. The failure
variant takes no argument either; write a second const when a _different_
failure needs exercising, as `PostRejectedNoMessage` does.

Three shared values, three shared sources:

| Field      | Comes from                                            |
| ---------- | ----------------------------------------------------- |
| `method`   | `HttpMethods.POST` / `.GET` — from `@common-ux/Test`  |
| `status`   | `HttpStatus.BAD_REQUEST` — from `@common-utils`       |
| `response` | the `MockBuilder` constant itself, **not** `.build()` |

The path is the one literal — the API route the handler intercepts, written as
`'/api/…'`. Do not reach for `Paths` or `apiRoutes`: those name client routes and
server routes respectively, and neither resolves to the intercepted URL.

Reference: [`Feature.mocks.ts`](./Feature.mocks.ts) — the umbrella shape.

### Specs

- Feature spec: `tests/Feature.spec.tsx` — renders through
  `TestScreen.Do.render({ path: AppRoutes.Feature })`. Covers the main
  component, its `components/`, the wiring and the query hooks.
- Role spec: `tests/Feature.<role>.spec.ts` — only where the role has pure,
  isolated behaviour.

Every `it` reads `it('should <verb> …')` — `should render`, `should not render`,
`should navigate`. Never a bare declarative. `describe` blocks are the feature or
subfeature name, PascalCase as written in the codebase.

No braces around a single-statement arrow body: `waitFor(() => expect(…))`, not
`waitFor(() => { expect(…) })`.

Table-driven `it.each` where behaviour is a matrix of the same shape. Cover every
meaningful branch, edge case and value.

Reference: [`Feature.spec.tsx`](./Feature.spec.tsx) — the describe shape and the
assertion style.

### Use the built-in accessors

`common/ux/Test/` exposes an accessor per component. Always reach for one before
writing a raw `screen.getByRole(...)`. A raw query guesses at the DOM; the
accessor is the contract.

| Instead of                                | Use                                          |
| ----------------------------------------- | -------------------------------------------- |
| `getByRole('button', { name })` on a form | `Test.Form(label).Button(name)`              |
| `getByLabelText(...)` on an input         | `Test.Form(label).Input(name)`               |
| `getByRole('button', …)` on a `Section`   | `Test.Section(label).Do.toggle()`            |
| a loading-state `waitFor`                 | `Test.LoadingIndicator.Has.isLoading()`      |
| `getByRole('img', …)`                     | the owning component's accessor `Get.icon()` |

The accessor wraps the **element**; the `Accessor.user` singleton is the only
sanctioned way to interact. If an accessor lacks a method, add the method to the
accessor — not a workaround in the spec.

`screen.getByRole('heading')` for a plain heading is fine. The rule bites where
the element is a component with a known contract.

### Everything above `describe`

The spec is **imports + `describe` only**. Anything declared above the first
`describe` belongs in `Feature.spec.utils.ts`, exported as one umbrella named
`FeatureTestUtils` — labels, `customRender`, interaction helpers, all inside it.

The render helper is named `customRender`, never `setupFeature` or
`renderFeature`. It takes handlers as a parameter defaulting to
`FeatureMockHandlers.Defaults`. Setup imports — `TestScreen`, `AppRoutes`,
`TestMocks`, `Accessor` — live in the utils file; if the spec still imports them,
the extraction is incomplete.

Await readiness inside `customRender` only where the feature genuinely gates on
it; otherwise render and return.

Reference: [`Feature.spec.utils.ts`](./Feature.spec.utils.ts) — the umbrella.

## Files and folders

### `Feature.spec.tsx`

Naming convention: `<Feature>.spec.tsx`, inside `tests/`.
Return type: none — the suite registers itself.
Example: [`Feature.spec.tsx`](./Feature.spec.tsx)
Rules:

- Imports + `describe` only. Nothing else above the first block.
- No hardcoded test-identity strings in assertions or `userEvent.type(...)`.
- No feature-local `TEST_*` constants — reuse or extend `TestMocks`.
- No hardcoded route strings — reach for `AppRoutes` or the umbrella.
- Fixtures carry a one-line JSDoc stating their purpose.

### `Feature.mocks.ts`

Naming convention: `<Feature>.mocks.ts`, inside `tests/`.
Return type: a `FeatureMocks` object of derived builders, plus a
`FeatureMockHandlers` umbrella.
Example: [`Feature.mocks.ts`](./Feature.mocks.ts)
Rules:

- Derive from the common base through the builder; never re-declare it.
- Handlers pass the builder straight to `response:` — never wrap it again.
- One umbrella constant; no bare handler variables.

### `TestMocks.ts`

Naming convention: `Mock<TypeName>`, singular, matching the type exactly.
Return type: one `MockBuilderType<T>` constant per exported value.
Example: [`TestMocks.ts`](./TestMocks.ts)
Rules:

- Constants, not functions.
- Populate required **and** optional fields — a missing optional is silent drift.
- Search before adding; extend before duplicating.

## Rules

- **A mock lives in exactly one of two homes**, and a feature never re-declares a
  common one.
- **Every mock is a builder constant.** No spread-overrides, ever.
- **All props populated**, required and optional alike.
- **No literal identity values** — primitives come from `TestMocks`, routes from
  `AppRoutes`, derived values from the common util that produces them.
- **`HttpMethods` and `HttpStatus` are never spelled as strings or numbers.**
- **`response` takes the builder**, not `.build()` of it.
- **Handlers grouped under one umbrella**, subfeature → verb, `Rejected` suffixed.
- **The spec imports no setup machinery.** If it does, `FeatureTestUtils` is
  incomplete.
- **`labels` is a member of the umbrella**, not a sibling export.
- **Built-in accessors first** — a hand-rolled query against a component with a
  contract is a bug in the spec.
- **`it` reads `should <verb>`.** Single-statement arrows take no braces.
- **No blank line between plain object properties**; one only before a JSDoc'd
  member.
- **`common/mocks/index.ts` stays alphabetical by exported symbol.**
- **Branches, edge cases and value matrices are covered** — the suite documents
  behaviour and makes refactoring safe.
