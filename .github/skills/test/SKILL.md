---
name: test
access: write
stack: 'jest, testing-library, msw'
description: 'Authoring feature and unit specs, mock data, fixtures, MSW handlers, and TestScreen rendering.'
---

# /test

No code here. Every claim below points at an example file beside this one.

## When to use

- Writing or extending a spec, feature or unit tests.
- Creating, extending or migrating mock data.
- Deciding where a mock lives.
- Locking down business behaviour.

## Scope

Owns test implementation from mock construction through to assertion.

Covers:

- mock location and builders
- test fixtures and MSW handlers
- feature test setup
- accessors
- spec structure and assertions

Does not decide what a feature should do, and does not score code quality — that is `review-file` and `review-feature`.

## Rules

- **A mock lives in exactly one of two homes**, and a feature never re-declares a common one.
- **Every mock is a builder constant.** No spread-overrides, ever.
- **All props populated**, required and optional alike.
- **No literal identity values** — primitives from `TestMocks`, application routes from `AppRoutes`, derived values from the common util that produces them.
- **`HttpMethods` and `HttpStatus` are never spelled as strings or numbers.**
- **`response` takes the builder**, not `.build()` of it.
- **Built-in accessors first** — a hand-rolled query against a component with a contract is a bug in the spec.
- **Branches, edge cases and value matrices are covered** — the suite documents behaviour and makes refactoring safe.
- **Every test sits inside a `describe`**, named for the feature or subfeature in PascalCase.
- **Tests are named `it('should <verb> …')`** — never a bare declarative.
- **Everything above `describe`** belongs in `Feature.spec.utils.ts`, never in the spec body.

## Workflow

### Where a mock lives

| Mock                                                                    | Home                             | Import          |
| ----------------------------------------------------------------------- | -------------------------------- | --------------- |
| **Common** — an API resource or shared primitive reused across features | `common/mocks/`                  | `@common-mocks` |
| **Feature-local** — a variation, override or shape used by one feature  | `Feature/tests/Feature.mocks.ts` | local relative  |

A common mock is the **base**. A feature derives variations through the builder and exports them.

Never spread-override a built object — `{ ...MockResource.build(), status: 'active' }` bypasses typing and drops the builder. Always go through `MockBuilder`.

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

Reference: `TestMocks.ts` — shared primitives and the `MockBuilder` calls that produce them.

### Primitives

Test-identity values — ids, names, emails, tokens, timestamps — come from `TestMocks`. Domain constants (`'active'`, `'archived'`) stay inline.

Search `TestMocks` before writing any literal and extend it before writing a second one. A genuinely new primitive belongs there, never as a feature-local `TEST_*` constant.

If a field needs a different type — a `Date` where `TestMocks` holds an ISO string — convert at the call site rather than adding a new value.

Never hand-roll a value a common util already produces. Durations come from the `DateTime` units, route strings from `Paths`.

### Handler groups

`Feature/tests/Feature.mocks.ts` exports a single umbrella constant, `FeatureMockHandlers`, grouped by subfeature then HTTP verb — never bare handler variables.

Subfeature key is PascalCase and optional — omit it for a flat feature. Verb key is the PascalCase of the method, with `Rejected` appended for the failure variant — `Post`, `PostRejected`, `PostRejectedNoMessage`, never `PostError`.

`Defaults` is the umbrella's own member: the handler set a spec registers wholesale. Hoist the shared builder to a local const so `Defaults` and the verb entry reference one definition.

Every handler is a local const, JSDoc'd with its method and outcome. A successful handler is not a function, since nothing about it varies. A failure variant takes no argument either; write a second const when a different failure needs exercising, as `PostRejectedNoMessage` does.

| Field      | Comes from                                            |
| ---------- | ----------------------------------------------------- |
| `method`   | `HttpMethods.POST` / `.GET` — from `@common-ux/Test`  |
| `status`   | `HttpStatus.BAD_REQUEST` — from `@common-utils`       |
| `response` | the `MockBuilder` constant itself, **not** `.build()` |

The path is the one literal — the API route the handler intercepts, written as `'/api/…'`. Do not reach for `Paths` or `apiRoutes`: those name client routes and server routes respectively, and neither resolves to the intercepted URL.

Reference: `Feature.mocks.ts` — the handler umbrella shape.

### Specs

Feature spec: `tests/Feature.spec.tsx` — renders through `TestScreen.Do.render({ path: AppRoutes.Feature })`. Covers the main component, its `components/`, the wiring and the query hooks.

Role spec: `tests/Feature.<role>.spec.ts` — only where the role has pure, isolated behaviour.

Every `it` reads `it('should <verb> …')` — `should render`, `should not render`, `should navigate`. Never a bare declarative.

No braces around a single-statement arrow body: `waitFor(() => expect(…))`, not `waitFor(() => { expect(…) })`.

Use table-driven `it.each` where behaviour is a matrix of the same shape. Cover every meaningful branch, edge case and value.

Reference: `Feature.spec.tsx` — the describe shape and assertion style.

### Use the built-in accessors

`common/ux/Test/` exposes an accessor per component. Always reach for one before writing a raw `screen.getByRole(...)`. A raw query guesses at the DOM; the accessor is the contract.

| Instead of                                | Use                                          |
| ----------------------------------------- | -------------------------------------------- |
| `getByRole('button', { name })` on a form | `Test.Form(label).Button(name)`              |
| `getByLabelText(...)` on an input         | `Test.Form(label).Input(name)`               |
| `getByRole('button', …)` on a `Section`   | `Test.Section(label).Do.toggle()`            |
| a loading-state `waitFor`                 | `Test.LoadingIndicator.Has.isLoading()`      |
| `getByRole('img', …)`                     | the owning component's accessor `Get.icon()` |

The accessor wraps the **element**; the `Accessor.user` singleton is the only sanctioned way to interact. If an accessor lacks a method, add the method to the accessor — not a workaround in the spec.

`screen.getByRole('heading')` for a plain heading is fine. The rule applies where the element is a component with a known contract.

## File structure

```text
Feature/
├── tests/
│   ├── Feature.spec.tsx
│   ├── Feature.mocks.ts
│   ├── Feature.spec.utils.ts
│   └── Feature.<role>.spec.ts
common/mocks/
├── index.ts
├── TestMocks.ts
└── <Type>.mocks.ts
```
