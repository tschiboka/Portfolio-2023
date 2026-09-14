---
name: create-tests
description: 'Author and maintain tests and test fixtures for this repo. USE FOR: writing a feature spec, adding unit specs for a role file, creating or extending mock data, migrating an inline/spread-override mock to the MockBuilder API, deciding whether a mock belongs in `common/mocks/` or a feature `tests/Feature.mocks.ts`, wiring MSW handlers, rendering a feature through `TestScreen`. DO NOT USE FOR: reviewing a file against the rubric (use `review`), general code questions, or production code changes. Standards of reference: ARCHITECTURE.md §1.2.2 (FE testing), §2.4.2 (BE testing).'
---

# Create Tests

Author tests and their fixtures to the repo standard.

## When to use

- Writing a feature spec or a unit spec for a role file.
- Creating, extending or migrating mock data.
- Deciding where a mock lives.

Standards of reference: `ARCHITECTURE.md` §1.2.2 (FE), §2.4.2 (BE).

## Where mocks live

Two homes, one rule each.

| Mock                                                                    | Home                             | Import          |
| ----------------------------------------------------------------------- | -------------------------------- | --------------- |
| **Common** — an API resource or shared primitive reused across features | `common/mocks/`                  | `@common-mocks` |
| **Feature-local** — a variation, override or shape used by one feature  | `Feature/tests/Feature.mocks.ts` | local relative  |

A common mock is the **base**. A feature never re-declares it — it derives its
variation with the `MockBuilder` API and exports that:

```ts
// Feature/tests/Feature.mocks.ts
import { MockResource } from '@common-mocks'

export const FeatureMocks = {
    activeResource: MockResource.modify({ status: 'active' }),
    archivedResource: MockResource.modify({ status: 'archived' }),
}
```

Never spread-override a built object (`{ ...MockResource.build(), status: 'active' }`)
— it bypasses typing and drops the builder. Always go through the builder.

## MockBuilder

Every mock is a `MockBuilderType<T>` constant, built with `MockBuilder`.

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

Rules:

- **Naming:** `Mock<TypeName>`, singular, matching the type exactly.
- **All props:** populate required _and_ optional fields. A missing optional
  field is a silent drift the compiler will not catch.
- **Constants, not functions:** `export const MockFoo = MockBuilder({...})`.
- **Grouped exports:** feature-local mocks go in a `FeatureMocks` object.
- **Primitives:** test-identity values (ids, names, emails, tokens, timestamps)
  come from `TestMocks`. Domain constants (`'active'`, `'archived'`) stay inline.
- **Search `TestMocks` before writing any literal, and extend it before writing a
  second one.** If a field needs a different _type_ — a `Date` where `TestMocks`
  holds an ISO string — convert at the call site rather than adding a new value.
  A genuinely new primitive belongs **in `TestMocks`**, never as a feature-local
  `TEST_*` const. The test: could another feature plausibly need this same value?
  If yes, it belongs in `TestMocks`.
- **Never hand-roll a value a common util already produces.** Durations come from
  the `DateTime` units, never a raw millisecond count; route strings from `Paths`,
  and so on. If a mock needs a derived value, call the util.
- **Handlers:** pass the builder directly to `response:` — never wrap it in
  another `MockBuilder(...)`.

## `common/mocks/` layout

One file per API resource, named after the type it mocks, plus `TestMocks` and
an `index.ts` barrel:

```
common/mocks/
├── index.ts          barrel
├── TestMocks.ts      shared primitives
├── User.mocks.ts     MockUser
├── Settings.mocks.ts MockSettings
└── Session.mocks.ts  MockSession
```

- **The barrel's exports stay alphabetical by exported symbol** — `MockSession`,
  `MockSettings`, `MockUser`, `TestMocks`. This is the one ordering rule for a
  barrel; everything else in an `index.ts` is free-form.
- A mock composing other mocks imports them relatively (`./User.mocks`) and
  calls `.build()` on the composed builder — never re-declares its props.

## Handler groups

`Feature/tests/Feature.mocks.ts` exports a single umbrella constant,
`FeatureMockHandlers`, grouped by subfeature then HTTP verb — never bare handler
variables:

```ts
export const FeatureMockHandlers = {
    SubFeature: {
        Post: RequestBuilder({ ... }),
        PostError: (message: string) => RequestBuilder({ ... }),
    },
    Delete: RequestBuilder({ ... }),
    Defaults: [postSubFeature],
}
```

- Subfeature key is PascalCase and optional — omit it for a flat feature
  (`FeatureMockHandlers.Get`).
- Verb key is the PascalCase of the HTTP method, with an `Error` suffix for the
  failure variant (`Post`, `PostError`, `Get`, `Put`, `Delete`).
- `Defaults` is the umbrella's own member — the handler set a spec registers
  wholesale. Hoist the shared builder to a local const so `Defaults` and the
  verb entry reference one definition, never two.

## Specs

- Feature spec: `tests/Feature.spec.tsx` — renders the feature through
  `TestScreen.Do.render({ path: AppRoutes.Feature })`. Covers the main
  component, its `components/`, the wiring, and the query hooks.
- Role spec: `tests/Feature.<role>.spec.ts` — only where the role has pure,
  isolated behaviour. Follow the direct-spec table in `ARCHITECTURE.md` §1.2.2.
- **Every `it` reads `it('should <verb> …')`** — `should render`, `should not
render`, `should navigate`. Never a bare declarative (`'renders the heading'`).
  `describe` blocks are the feature or subfeature name, PascalCase as written in
  the codebase.
- **No braces around a single-statement arrow body.** `waitFor(() => expect(…))`,
  not `waitFor(() => { expect(…) })` — same for `it.each` callbacks and any
  other one-line arrow.
- Fixtures carry a one-line JSDoc stating their purpose.
- No hardcoded test-identity strings in assertions or `userEvent.type(...)` —
  use `TestMocks.*`.
- **No feature-local `TEST_*` constants.** A route token, path segment or
  fixture value either comes from `TestMocks` or is a member of the
  `FeatureTestUtils` umbrella. A bare `const TEST_TOKEN = '…'` above the
  umbrella is the smell — reuse or extend `TestMocks` instead.
- **No hardcoded route strings in the spec.** Reach for the app's route table
  (`AppRoutes`) or a named member of `FeatureTestUtils` — a literal route path
  in an assertion is the same duplication as a literal token.
- Table-driven `it.each` where behaviour is a matrix of the same shape.
- Cover every meaningful branch, edge case, and value.

## Use the built-in accessors — never hand-roll a query

`common/ux/Test/` already exposes an accessor per component. **Always reach for
one before writing a raw `screen.getByRole(...)`.** A raw query guesses at the
DOM; the accessor is the contract.

| Instead of                                              | Use                                                |
| ------------------------------------------------------- | -------------------------------------------------- |
| `getByRole('button', { name })` on a `Section`/`Region` | `Test.Section(label).Do.toggle()` / `.Get.title()` |
| `getByRole('button', ...)` on a form control            | `Test.Form(label).Button(name)`                    |
| `getByLabelText(...)` on an input                       | `Test.Form(label).Input(name)`                     |
| a loading-state `waitFor`                               | `Test.LoadingIndicator.Has.isLoading()`            |
| `getByRole('img', ...)`                                 | the owning component's accessor `Get.icon()`       |

Rules:

- The accessor wraps the **element**; the `Accessor.user` singleton is the only
  sanctioned way to interact (`Accessor.user.click(...)`).
- Do not query for something an accessor already models. If the accessor is
  missing a method, add the method to the accessor — not a workaround in the spec.
- `screen.getByRole('heading')` for a plain heading is fine; the rule bites where
  the element is a component with a known contract.

## `Feature.spec.utils.ts` — everything outside `describe`

The spec is **imports + `describe` only**. Anything declared above the first
`describe` belongs in `Feature.spec.utils.ts`, exported as **one umbrella
object** named `FeatureTestUtils`:

```ts
export const FeatureTestUtils = {
    labels: { heading: 'Feature', buttons: { submit: /Submit/ } },
    customRender: (handlers: Buildable[] = FeatureMockHandlers.Defaults) => {
        TestScreen.Do.render({
            path: AppRoutes.Feature,
            handlers,
            session: { session: { token: TestMocks.token } },
        })

        return { user: Accessor.user }
    },
}
```

Rules:

- **One umbrella**, never loose exports (`export const FeatureLabels = …` is
  wrong). Labels, `customRender` and interaction helpers all live inside it.
- **`labels` is a member of the umbrella**, not a sibling export.
- The render helper is named **`customRender`** — not `setupFeature`, not
  `renderFeature`.
- `customRender(handlers = FeatureMockHandlers.Defaults)` — handlers are a
  parameter with the feature's default set as the fallback.
- Setup imports (`TestScreen`, `AppRoutes`, `TestMocks`, `Accessor`) live in the
  utils file. If the spec still imports them, the extraction is incomplete.
- Await readiness inside `customRender` only where the feature genuinely gates
  on it (e.g. a loading indicator); otherwise render and return.

The spec then reads:

```ts
import { screen } from '@testing-library/react'
import { FeatureMocks } from './Feature.mocks'
import { FeatureTestUtils } from './Feature.spec.utils'

const { buttons, heading } = FeatureTestUtils.labels

describe('Feature', () => { ... })
```

## Checklist

- [ ] Mock is in the right home — common vs feature-local.
- [ ] Built with `MockBuilder`, exported as a constant, correctly named.
- [ ] All props populated, primitives from `TestMocks`.
- [ ] `TestMocks` searched first, and **extended** rather than duplicated —
      no feature-local token/date/name literal, no second bespoke value.
- [ ] No spread-overrides; derivations go through the builder.
- [ ] Handlers pass the builder straight to `response:`.
- [ ] Handlers exported under the `FeatureMockHandlers` umbrella, grouped by
      subfeature → verb.
- [ ] Everything above `describe` lives in `FeatureTestUtils` — labels included;
      no `setupFeature`, no loose label export.
- [ ] The spec imports no setup machinery (`TestScreen`, `AppRoutes`, `Accessor`).
- [ ] Built-in accessors used wherever one exists — no hand-rolled
      `screen.getByRole(...)` against a component with a contract.
- [ ] No blank line between plain object properties; one only before a JSDoc'd member.
- [ ] `common/mocks/index.ts` exports kept alphabetical by exported symbol.
- [ ] Spec placed per the direct-spec table; fixtures JSDoc'd.
- [ ] Branches, edge cases and value matrices covered.
