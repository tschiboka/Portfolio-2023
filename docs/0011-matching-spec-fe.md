# 0011 — A testable role file has a matching spec (FE)

## 1. Description

[0009](./0009-linting-rules) Step 3, deferred there because the answer
depends on which role files exist and every later step kept changing that. Those rules have
landed, so the tree is stable enough to measure.

Two jobs, because they meet in the same files. First, the rule: a role file that should carry
its own spec and does not. Second, the FE half of the sweep: every FE spec drives its feature
through a harness, so a spec asserts behaviour instead of markup.

The work is split by tree. This ticket owns `src/`. [0012](./0012-matching-spec-common.md)
owns `common/`, where most role files are pure utilities and the sweep is expected to be edge
cases. [0013](./0013-matching-spec-be.md) owns `server/`, where which roles are testable is
itself a decision.

The scope has to be read from [file-structure.md](references/file-structure.md) §1.3 and §2.5
first: both tables changed while the step waited, so neither the `YES` rows nor the exemptions
can be taken from the 0009 text.

## 1.1 Info

| Status       | Planned          |
| ------------ | ---------------- |
| Last updated | 2026-11-21       |
| Created      | 2026-11-20       |
| Scope        | `rules/`, `src/` |

## 2. Feature Dev Checklist

- [ ] Step 1: Re-read [file-structure.md](references/file-structure.md) §1.3 and §2.5, and record the `YES` rows
- [x] Step 2: Build `rules/matching-spec/`, scoping `include` to those rows and `exclude` the rest
- [x] Step 3: Register as `severity: 'error'`, add `tests/MatchingSpec.spec.ts`, run `npm run build:rules`
- [x] Step 4: Add the `harness` role to the registry, so `<Feature>.harness.ts` may export `{Stem}Harness`
- [ ] Step 5: Prove it on one feature — its elements, its flows, and a sub-feature harness extending the feature's
- [x] Step 6: State the harness in the `test` skill only once that example exists beside it, as the skill requires
- [x] Step 7: Sweep `src/` for role files with no spec, recording each gap as `TODO: [0011] …`
- [ ] Step 8: Drive every FE spec through its harness, so the spec body holds flows and nothing else
- [x] Step 9: Hand the `common/` pass to [0012](./0012-matching-spec-common.md) and the `server/` pass to [0013](./0013-matching-spec-be.md)
- [ ] Step 10: Confirm a green `tsc`, lint, and test run

## 2.1. Task Details

**The harness.** One per feature, in its `tests/` folder — `tests/Feature.harness.ts`, exporting
`FeatureHarness`. It lists the feature's elements once, its flows once, and owns the `Render` that mounts the
feature, so a spec reads as flow and nothing else. A `Feature.spec.utils.ts` survives only for what the harness
cannot know: the handler set a case replaces, and a label several cases assert.

**The unit is the feature, not the route.** [App.config.ts](../../src/app/App.config.ts) gives every route exactly
one `Component`, and sometimes that component lives in a `components/` folder, so there is no page-level file for a
harness to sit beside — and no root-level harness to write. Chrome is no exception: navigation is its own feature
with its own harness, which a page harness reaches rather than reproduces.

**A sub-harness extends its parent.** `class ExtrasHarness extends PageHarness`, adding to `super.Get` and
`super.Do` as every `Accessor` subclass does, so a sub-feature is exercised inside the page it actually sits in,
and its spec never repeats the elements above it. How a top-level harness starts, and how far a child may reach,
is Step 5's to prove.

The render side keeps its own name: `Test.Screen.Do.render` is the render helper, so "harness" means exactly one
thing in this codebase.

## 2.2. The harness API

A harness declares its elements once, by recipe, and the recipes give it a query surface, a set of actions and
its assertions. It mounts nothing: rendering belongs to the feature's own `Render`.

### Elements

One map per harness, each entry a recipe. The kind decides the RTL query, so the query is never written out.

| Recipe             | Resolves through       | When                                       |
| ------------------ | ---------------------- | ------------------------------------------ |
| `{ role, name? }`  | `getByRole`            | the default — a control, a heading, a cell |
| `{ label }`        | `getByLabelText`       | a form field with a label                  |
| `{ text }`         | `getByText`            | copy an article points at, not a control   |
| `{ placeholder }`  | `getByPlaceholderText` | only where no label exists                 |
| `{ altText }`      | `getByAltText`         | an image                                   |
| `{ title }`        | `getByTitle`           | where a title is the only text             |
| `{ displayValue }` | `getByDisplayValue`    | an input already holding a value           |
| `{ testId }`       | `getByTestId`          | last resort, never for structure           |

Any recipe adds `within` (another key, so a query scopes into that element), `hasText`, and `index` (which of
several matches, `0` by default).

A ninth entry names no query at all: `{ via: () => Test.Table('Activity Feed Table') }` holds a component's
existing accessor, so `Get.table()` returns that accessor and its contract is never restated. That kind has
`Get` only — a plural, a query or a wait against a contract means nothing — and `Do.press` accepts element keys
only, so the two kinds cannot be confused for one another.

### The surface

Every declared key `x` produces six queries, mirroring RTL, plus the actions the recipe implies.

| Member         | Returns                  | Absent  |
| -------------- | ------------------------ | ------- |
| `Get.x()`      | the element              | throws  |
| `GetAll.x()`   | `HTMLElement[]`          | throws  |
| `Query.x()`    | element or `null`        | never   |
| `QueryAll.x()` | `HTMLElement[]`          | never   |
| `Find.x()`     | `Promise<HTMLElement>`   | rejects |
| `FindAll.x()`  | `Promise<HTMLElement[]>` | rejects |

`Do` keeps the `Accessor` actions and gains element-addressed ones: `press(x)`, `fill(x, text)`, `pick(x, value)`,
`clear(x)`, `check(x)`, `uncheck(x)`, `hoverOn(x)`. The names avoid the root-element actions `Accessor.Do` already
defines, so a harness stays a valid `Accessor`.

`Wait.x()` waits for a declared key, typed by `HarnessFind` — the same shape `Find` has, over a key rather than a
recipe. `Has.x()` comes free from `Accessor` as a proxy over `Get`.

### Flows

A flow is a `Do` method on the harness that composes declarations and actions into one meaningful step —
`await stats.Do.refresh()` rather than two clicks and a wait. There is no second channel named `Flow`: one
vocabulary, and the spec reads as the business step it performs.

### Assertions

Two channels, one vocabulary, grouped by check and then by element — `Expect.text.heading('Admin')`. `Expect`
asserts now; `WaitFor` runs the same check inside `waitFor`. So a check moves from "it is" to "it becomes" by
changing one word, and neither vocabulary has to be learned twice.

`Expect` covers `visible`, `absent`, `enabled`, `disabled`, `checked`, `unchecked`, `text(content)` and
`inputValue(value)`, each reading `Get` or `Query`. Presence needs neither channel: `Wait.x()` resolves when the
element appears.

Each failure states the call and the expectation, in the harness's own words — `Spec.Expect.visible.hidden:
expected the element to be visible` — never a matcher library's dump.

### Guards

Four things throw before an element is trusted: a lookup before the feature's `Render`, a `within` that names no
declared key, a `within` chain that closes on itself, and a recipe setting both `within` and `scope`. A match that
finds several with no `index` throws rather than picking one.

A flow composes through `Accessor.user`, not through the key-addressed actions: inside `get Do()` the key type is
still unresolved on `this`, so `this.Do.click('save')` does not compile — the same limit that keeps parameterised
keys out of the surface.

### Typing

The map is generic and every method takes a key from it, so a misspelt key fails the build rather than a test run.

```text
class Harness extends Accessor {
    get Elements(): ElementMap { return {} }                  // overridden per feature
    get Get(): HarnessGet<this>                               // `this` carries the child's keys
}
```

`Elements` is public, not protected: the surface types index it through `this`, and TS refuses to index a
protected member on a polymorphic `this`.

A subclass writes `satisfies ElementMap` on its own getter, which keeps the literal types the surface needs
while still checking the recipes against the map.

### Extending

```text
class WebsiteStatsHarness extends HomeHarness {
    override get Elements() {
        return { ...super.Elements, table: { role: 'table', name: 'Activity Feed Table' } } satisfies ElementMap
    }
}
```

Spreading `super.Elements` is the whole mechanism: the child reaches everything above it, and a spec for the
child can assert the page and the region in one breath.

### Where it lives

| File                                      | Holds                                             |
| ----------------------------------------- | ------------------------------------------------- |
| `common/ux/Test/Harness/Harness.ts`       | the base class and the generated surface          |
| `common/ux/Test/Harness/Harness.types.ts` | `ElementMap`, the recipe union, the surface types |
| `common/ux/Test/Harness/Harness.utils.ts` | recipe → query, the getter and action builders    |
| `Feature/tests/Feature.harness.ts`        | one feature's map and its flows                   |

An accessor is unchanged by all this: it still owns one component's contract, and a harness composes accessors
where a component has one.

## 2.3. Accessor or harness

An accessor is one component's DOM contract. A harness is one feature's screen and business steps. A concept
belongs to exactly one of them, and the boundary is the whole reason both exist.

| Question                | Accessor                   | Harness                         |
| ----------------------- | -------------------------- | ------------------------------- |
| What does it own        | a shared component         | a feature                       |
| What is it scoped to    | that component's element   | the rendered document           |
| What does it hold       | queries, single actions    | an element map, and flows       |
| Who reuses it           | every spec that renders it | its own specs, and sub-features |
| What it must never know | any feature, route or flow | any component's internals       |

Four consequences, each of which is a defect when broken:

- A shared component's contract is an accessor, never a harness.
- A harness reaches a component that has an accessor through `via`, never a raw query.
- A harness mounts through its own `Render` and asserts through `Expect`/`WaitFor`; a raw `screen.getBy…` or `expect(element)…` in a spec is a gap in the harness.
- An accessor never names a feature, a route or a flow.

Both report through `TestError`, so a failure still names the chain that led to it.
