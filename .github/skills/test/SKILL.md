---
name: test
access: write
stack: 'vitest, testing-library, msw'
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
- **A spec drives its feature through its harness** — `const Admin = AdminHarness.Render({ handlers })`, then `Admin.Get.backfill()`, `Admin.Flow.runBackfill()`, `Admin.Expect.text.heading('Admin')`.
- **`Do` is one gesture, `Flow` is the journey.** `click`, `fill`, `pick` act on one element; a sequence that spans several — expand, then trigger, then settle — is declared in `Flow` and built from those actions.
- **`Render` comes first in every test.** A harness throws `call Render() before using the harness` on any call before it, and again once the document is cleared.
- **The harness owns the query and the assertion.** A `screen.getBy…` or `expect(element)…` left in a spec is a gap in the harness, not a shortcut.
- **Branches, edge cases and value matrices are covered** — the suite documents behaviour and makes refactoring safe.
- **Every test sits inside a `describe`**, named for the feature or subfeature in PascalCase.
- **Tests are named `it('should <verb> …')`** — never a bare declarative, and never `test(…)`, which is the same function under a name this codebase does not use.
- **Everything above `describe`** belongs in `Feature.spec.utils.ts` — and only what the harness cannot know: a label shared by several cases, a handler set a case replaces. The harness owns `Render`, so no element query lives there.
- **A harness is tested like any other code** — `common/ux/Test/Harness/tests/` holds one spec per channel, over a fixture harness that mounts plain markup.

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

Feature spec: `tests/Feature.spec.tsx` — renders through `Test.Screen.Do.render({ path: AppRoutes.Feature })`. Covers the main component, its `components/`, the wiring and the query hooks.

Role spec: `tests/Feature.<role>.spec.ts` — only where the role has pure, isolated behaviour.

No braces around a single-statement arrow body: `waitFor(() => expect(…))`, not `waitFor(() => { expect(…) })`.

Use table-driven `it.each` where behaviour is a matrix of the same shape. Cover every meaningful branch, edge case and value.

Reference: `Feature.spec.tsx` — the describe shape and assertion style.

### Use the harness first, then the accessors

A spec reaches its feature through `FeatureHarness.Render()` and never touches the document directly. Under that, `common/ux/Test/` exposes an accessor per component — reach for one before writing a raw `screen.getByRole(...)`. A raw query guesses at the DOM; the accessor is the contract, and the harness declares the key.

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
│   ├── Feature.mockHandlers.ts
│   ├── Feature.harness.ts        ← elements, flows and `Render`
│   ├── Feature.spec.utils.ts     ← only when a label or handler set is shared
│   └── Feature.<role>.spec.ts
common/mocks/
├── index.ts
├── TestMocks.ts
└── <Type>.mocks.ts
```

The render helper lives at `@shared-components/Screen/tests/Screen.spec.utils.tsx` and exports `ScreenTestUtils`. The `index.ts` beside it merges that harness with the common toolkit, so a spec imports `Test` from that barrel and reads one vocabulary throughout — `Test.Button`, `Test.Form`, `Test.Screen`. A feature's `Render` calls it; a spec does not.
