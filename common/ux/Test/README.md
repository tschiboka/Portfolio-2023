# Test Accessor Framework — Technical Overview

## Philosophy

Accessors **locate elements**, **expose direct state**, and **perform single user actions**. Nothing more.

```ts
import { Test } from '@common/ux'
```

---

## What it is

A **structured test utility layer** built on top of React Testing Library (RTL) and MSW. It doesn't replace RTL or change how tests run — it's an **abstraction layer** that enforces consistent patterns for querying components and simulating user interactions across the entire test suite.

---

## What it is not

- **Not a replacement for RTL** — It wraps RTL. `screen`, `render`, `waitFor`, `within` are still valid when an accessor doesn't cover a case.
- **Not a page-object pattern** — Page objects bundle state + assertions + navigation. Accessors are stateless element wrappers with no assertions and no business logic.
- **Not a workflow abstraction** — Accessors expose single actions (`Do.click`, `Do.type`). Multi-step sequences belong in the test body, not the accessor.

> If a test is simpler with raw RTL, use raw RTL. The framework prevents drift on repeated patterns — it doesn't ban direct DOM access.

It replaces **this** (inconsistent, duplicated querying and interaction boilerplate):

```ts
// Without accessor — scattered patterns, fragile selectors, repeated setup
const user = userEvent.setup()
const dialog = screen.getByRole('dialog', { name: 'Confirm delete' })
const closeBtn = within(dialog).getByRole('button', { name: /close/i })
await user.click(closeBtn)
expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
```

With the accessor equivalent:

```ts
// With accessor — consistent, scoped, discoverable
const popup = Test.Overlay('Confirm delete')
await popup.Do.close()
expect(popup.Has.dialog()).toBe(false)
```

The DOM queries, scoping, and user-event lifecycle are encapsulated once in the accessor class — not repeated in every test.

---

## Core Problem

Without this layer, test code drifts into inconsistent patterns:

```ts
// Dev A:
const input = screen.getByPlaceholderText('Email')
await userEvent.setup().type(input, 'test@test.com')

// Dev B:
const input = screen.getByRole('textbox', { name: /email/i })
const user = userEvent.setup()
await user.type(input, 'test@test.com')

// Dev C:
const input = container.querySelector('.email-input input')!
fireEvent.change(input, { target: { value: 'test@test.com' } })
```

Three query strategies, three user-event lifecycle patterns. Multiplied across 100+ test files, this becomes unmaintainable. When a component's DOM changes, you hunt through every test file.

---

## Public API

### Namespaces

3 authored + 2 derived:

| Name       | Purpose                  | Sync/Async | Authored/Derived | Example                                      |
| ---------- | ------------------------ | ---------- | ---------------- | -------------------------------------------- |
| **`Get`**  | Read DOM state           | Sync       | Authored         | `form.Input('Email').Get.value()`            |
| **`Do`**   | Simulate user actions    | Async      | Authored         | `await form.Input('Email').Do.type('hello')` |
| **`Set`**  | Pre-render setup/mocking | Sync       | Authored         | `Table.Set.mock(props)`                      |
| **`Has`**  | Check element existence  | Sync       | Derived          | `dateInput.Has.calendar()` → `true/false`    |
| **`Wait`** | Wait for element         | Async      | Derived          | `await table.Wait.heading('Users')`          |

### Base `Get` (inherited by all accessors)

```ts
accessor.Get.attribute(name) // → string | null
accessor.Get.className() // → string
accessor.Get.style() // → CSSStyleDeclaration
accessor.Get.tagName() // → string
accessor.Get.textContent() // → string | null
accessor.Get.byText(text) // → HTMLElement (throws if absent)
accessor.Get.byLabel(label) // → HTMLElement (throws if absent)
```

### Base `Do` (inherited by all accessors)

```ts
await accessor.Do.click() // click the element
await accessor.Do.hover() // hover over the element
await accessor.Do.unhover() // move pointer away
accessor.Do.focus() // focus the element
await accessor.Do.keyboard(key) // press a key (e.g. '{Escape}', '{Tab}')
```

### `Has` (derived from `Get`)

Wraps any `Get` method — returns `true` if the getter succeeds, `false` if it throws or returns null:

```ts
expect(form.Has.errorMsg()).toBe(true)
expect(form.Has.byText('Welcome')).toBe(true)
```

> **Caveat:** `Has` should only suppress expected lookup failures (element not found). It is not a general error silencer — runtime bugs like `TypeError` from broken accessor code should still surface. Keep accessor unit tests healthy to catch these early.

### `Wait` (derived from `Get`)

Wraps any `Get` method in RTL's `waitFor` — retries until it succeeds:

```ts
await table.Wait.heading('Users')
```

For assertions with `expect`, use `waitFor` directly since `Wait` doesn't wrap matchers.

### `Set` (static, pre-render)

`Set` is **infrastructure** — it belongs to the setup/render phase, not the interaction model. It lives on the static factory, not on accessor instances:

```ts
Table.Set.mock(props) // static — renders the component
const table = Test.Table('Users') // instance — requires rendered DOM
table.Get.columnHeaders()
await table.Do.sortBy('Name')
```

`Set` is a convention, not a contract. Simple components expose `Set.mock(props)`. Complex components (Overlay, Nav with providers) define domain-specific Set methods (`Set.fullScreen`, `Set.mockMenu`). There is no universal `Set` on the base class because every component's render setup is inherently different.

---

## Usage Examples

### Basic interaction

```ts
const form = Test.Form('Login')
const submit = form.Button('Submit')

await submit.Do.click()
expect(submit.Get.isDisabled()).toBe(true)
expect(submit.Get.textContent()).toBe('Submit')
expect(submit.Get.className()).toContain('btn-primary')
```

### Conditional checks

```ts
if (form.Has.errorMsg()) {
    expect(form.Get.errorMsg()).toBe('Invalid credentials')
}
```

### Composite accessors

```ts
const form = Test.Form('Registration')
const email = form.Input('Email')
const submit = form.Button('Submit')
const terms = form.Checkbox('Accept terms')

await email.Do.type('user@test.com')
await terms.Do.toggle()
await form.Do.submit()

expect(submit.Get.isDisabled()).toBe(true)
```

### Portaled overlays

```ts
const overlay = Test.Overlay('Confirm delete')
overlay.Get.heading() // scoped inside the dialog
await overlay.Do.close()
```

### Navigation

```ts
expect(Test.Page.Get.navigatedTo()).toBe('/api/register')
expect(Test.Page.Has.navigated()).toBe(false)
await Test.Page.Wait.navigatedTo('/api/index')
```

### Server mocking

```ts
const getUsers = RequestBuilder({
    path: '/api/users',
    method: HttpMethods.GET,
    response: [{ id: 1, name: 'John' }],
})

const empty = getUsers.updateResponse((mock) => mock.modify({ data: [] }))
```

### Page render

```ts
Page.render({
    path: LoginRoute,
    handlers: [loginHandler, getUsers],
    session: { isAuthenticated: false },
})
```

---

## Design Constraints

### Why only three authored namespaces?

Previous iterations had `Get`, `Query`, `Click`, `Act` — five categories with overlapping semantics.

More namespaces cause three problems:

1. **Decision fatigue** — "Does this belong in `Act` or `Click`? Is it a `Query` or `Get`?"
2. **Fragmented discovery** — Contributors must learn where each method lives across multiple namespaces.
3. **Maintenance drift** — The same concept ends up in different namespaces across different accessors.

The three-namespace rule keeps the mapping unambiguous:

| If you're...             | Use   |
| ------------------------ | ----- |
| Reading DOM state        | `Get` |
| Simulating interaction   | `Do`  |
| Setting up before render | `Set` |

If a method doesn't fit one of these three, it doesn't belong on the accessor.

### Enforcement

The base `Accessor` class only defines `Get`, `Do`, `Has`, and `Wait` as getters (`Has` and `Wait` are derived).

- Subclasses extend `Get` and `Do` via `get Get() { return { ...super.Get, ... } }` / `get Do() { return { ...super.Do, ... } }`.
- There is no mechanism to add a fourth authored namespace on an instance.
- `Set` lives on the static factory (`Object.assign(factory, { Set: {...} })`), not on the class.

Adding a new namespace requires modifying the base class — that's the enforcement point.

### Principles

> **Rule:** Accessors locate elements, expose direct state, and perform single user actions. Nothing more.

#### Good

```ts
// Single action
await popup.Do.close()

// Direct state read
expect(button.Get.isDisabled()).toBe(true)

// Semantic verb
await calendar.Do.selectDay(14)
```

#### Bad

```ts
// Multi-step workflow — belongs in the test, not the accessor
await form.Do.fillAndSubmit({ email: 'a@b.com', password: 'x' })

// Assertion inside accessor — use expect() in the test
button.Expect.disabled()

// Non-verb Do method
await calendar.Do.day(14)
```

#### The full list

- **No assertions** — Use `expect(...)` in the test, never `accessor.Expect.*()`.
- **No retries or polling** — The caller decides when to wait via `Wait` or `waitFor`.
- **No business logic** — `Do.selectDay(14)` (one click) is fine. `Do.pickNextAvailableWeekday()` (logic + reads) is a test helper.
- **No multi-step workflows** — `Do.click()`, `Do.type(text)`, `Do.toggle()` — not `Do.fillFormAndSubmit()`.
- **No hidden waits** — `Get` is synchronous, `Do` is a single async interaction.
- **`Do` methods start with a verb** — `Do.click()`, `Do.toggle()`, `Do.selectDay(14)`.

Violating these rules leads to **abstraction lock-in** — tests nobody can debug because the framework hides what's actually happening.

### Query Strategy

Accessible queries at component boundaries, `querySelector` for implementation internals.

#### The rule

> **If the element has a role or label, use an accessible query. If it only has a CSS class, use `querySelector`.**

#### Boundary queries (factory functions)

| Level           | Query Method                      | Example                  |
| --------------- | --------------------------------- | ------------------------ |
| Page → Form     | `getByRole('form', { name })`     | `Form('Login')`          |
| Form → Input    | `getByLabelText(label)`           | `form.Input('Email')`    |
| Form → Button   | `getByRole('button', { name })`   | `form.Button('Submit')`  |
| Form → Checkbox | `getByRole('checkbox', { name })` | `form.Checkbox('Terms')` |
| Table → region  | `getByRole('region', { name })`   | `Table('Users')`         |

#### Good

```ts
// Factory — accessible query (component boundary)
const form = Test.Form('Login')

// Get/Do internals — CSS selector (implementation detail)
get Get() {
    return { ...super.Get, icon: () => this.require('.nav__icon') }
}
```

#### Bad

```ts
// Factory using CSS selector — fragile at component boundaries
const form = document.querySelector('.login-form')!

// Get/Do using accessible query — over-constrains internals
get Get() {
    return { ...super.Get, icon: () => this.scope.getByRole('img', { name: 'icon' }) }
}
```

### Locator Contracts

When labels are repeated across test files, co-locate an `as const` object as the single source of truth:

```ts
// login.labels.ts
export const LoginForm = {
    name: 'Login',
    fields: { email: 'Email', password: 'Password' },
    buttons: { submit: 'Log in' },
} as const

// login.spec.ts
import { LoginForm } from './login.labels'

const form = Test.Form(LoginForm.name)
const email = form.Input(LoginForm.fields.email)
const password = form.Input(LoginForm.fields.password)
const submit = form.Button(LoginForm.buttons.submit)

await email.Do.type('user@test.com')
await password.Do.type('secret')
await submit.Do.click()
```

Labels change in one place. If a label is renamed in the component, the constant is updated once — not in every test file.

---

## Implementation Internals

_This section covers how the framework works under the hood. Consumer code doesn't need this knowledge — it's reference for contributors modifying the base class or adding new accessors._

### The `Accessor` Base Class

```ts
export class Accessor {
    static screen = screen // centralised RTL screen — for portaled/global queries

    protected element: HTMLElement
    protected scope: Scope // within(element) — scoped queries
    protected context: string // hierarchical caller chain for error messages

    private static _user: UserEvent // singleton

    static get user(): UserEvent // lazy-init
    static resetUser(): void // fresh instance per test

    protected require(selector: string): HTMLElement // querySelector + throw if null
}
```

**`static screen`** — Centralises RTL's `screen` dependency. The scoped vs. global distinction is explicit at every call site: `this.scope` for children inside the accessor's element, `Accessor.screen` for portaled/global elements.

**`within()` scoping** — Every accessor is bound to a specific DOM element. Queries search _inside_ that element only. Two forms on one page won't interfere — `form.Get.errorMsg()` only finds errors inside _that_ form.

**Singleton `user`** — RTL's `userEvent.setup()` creates an independent input state (keyboard modifiers, pointer position, clipboard). Multiple instances cause desynced state. One singleton per test ensures coherent interaction sequences.

**`context`** — Hierarchical caller chain (e.g. `Form('Login').Input('Email')`). Factory methods pass context down, so error messages show the full accessor chain that led to the failure.

**`require()`** — Wraps `querySelector` + throws with the accessor's `context` if null. Makes author intent explicit: `this.require(...)` = must exist, `this.element.querySelector(...)` = might be absent. Consistent throws make `waitFor` retries predictable.

### Inheritance model

Subclasses extend `Get` and `Do` via getter override with spread:

```ts
get Get() {
    return { ...super.Get, isDisabled: () => this.element.hasAttribute('disabled') }
}

get Do() {
    return { ...super.Do, submit: async () => { await Accessor.user.click(this.require('[type="submit"]')) } }
}
```

`Has` and `Wait` proxies see the merged result automatically — no additional wiring needed.

### `Has` proxy

Returns a `Proxy` that intercepts property access. For any `Get.foo(...)`, `Has.foo(...)` calls it inside a try-catch: non-null → `true`, throws/null → `false`. Every accessor gets `Has` for free — no manual boilerplate.

> **Important:** `Has` should only suppress expected lookup failures (element not found). Unexpected runtime errors (e.g. `TypeError` from a broken accessor) can also be caught by the proxy. Accessor unit tests are the safety net — keep them healthy to catch these early.

### `Wait` proxy

Same pattern as `Has`, but wraps `Get` methods in RTL's `waitFor`. Delegates 100% to RTL — no custom retry logic, no custom timeouts. Native error messages pass through unchanged.

### Accessor styles

**Class-based** (scoped to an element) — Used for: `Button`, `Checkbox`, `Code`, `DateInput`, `Form`, `Input`, `Nav`, `Overlay`, `Radio`, `SearchInput`, `SideMenu`, `Table`.

**Plain object** (screen-level) — Used for: `Page` only. Page represents the entire rendered view, not a specific element.

`Overlay` is class-based despite being portaled to `document.body`. The factory uses `screen.getByLabelText(label)` — role-agnostic, finds dialogs, menus, and fullscreen overlays by `aria-label`. Once found, `within()` scoping works normally.

### Composite accessor pattern

`Form` acts as a factory for sub-component accessors. `form.Input('Email')` calls `this.scope.getByLabelText('Email')` (within the form), not `screen.getByLabelText` (global). This prevents cross-component query leaks.

### `TestError`

Centralised error factory for all test framework errors:

```ts
export const TestError = {
    notFound: (context: string, detail?: string) => Error
    navigation: (expected: string, actual?: string) => Error
}
```

- `TestError.notFound('Form("Login").Input("Email")')` → `Form("Login").Input("Email"): not found`
- `TestError.navigation('/api/index', '/api/login')` → `Expected navigation to "/api/index", actual: "/api/login"`

### `MockBuilder`

Immutable builder for shaping response data:

```ts
const user = MockBuilder({ id: 1, name: 'John', role: 'admin' })
    .modify({ role: 'user' })
    .setValue('name', 'Jane')
    .build()
// → { id: 1, name: 'Jane', role: 'user' }
```

### `Page.render`

Standard test entry point. Wraps the component in all required providers (React Query, Router, Session, App Context), registers MSW handlers, and resets user state. `Page.render()` calls `Accessor.resetUser()` internally, guaranteeing a clean user-event state per test.

---

## Summary

| Aspect                          | Decision                                               | Reason                                                                                                                                         |
| ------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `within()` scoping              | Prevents cross-component query leaks                   | Two forms on one page won't interfere                                                                                                          |
| Singleton `userEvent`           | Coherent input state across interactions               | Shift/Ctrl modifiers carry across actions                                                                                                      |
| `Get`/`Do`/`Set` + `Has`/`Wait` | Minimal, unambiguous API                               | 3 authored + 2 auto-generated, no overlapping semantics                                                                                        |
| Inherited `Get`/`Do`            | Base class provides common members                     | `attribute`, `className`, `style`, `tagName`, `textContent`, `byText`, `byLabel`, `click`, `hover`, `unhover`, `focus`, `keyboard` — inherited |
| `Set` is infrastructure         | Static on factory, not on instances                    | Render setup is inherently component-specific, not an interaction concern                                                                      |
| `TestError`                     | Centralised error factory                              | Consistent messages: `notFound`, `navigation` with expected/actual                                                                             |
| `Page` navigation               | `Get.navigatedTo`, `Has.navigated`, `Wait.navigatedTo` | Encapsulates `mockNavigate` — tests don't import mocks directly                                                                                |
| Accessible queries at bounds    | Tests break when accessibility breaks                  | Enforces `aria-label`, `role`, proper semantics                                                                                                |
| All accessors class-based       | `getByLabelText` finds portaled elements               | `Overlay` uses `aria-label`, `Page` is the only plain object                                                                                   |
| Hierarchical `context`          | Error messages show full accessor chain                | `Form('Login').Input('Email'): not found`                                                                                                      |
| `require()` vs `querySelector`  | Explicit must-exist vs may-be-absent                   | Consistent throws, predictable `waitFor` retries                                                                                               |
| Locator contracts               | `as const` objects for repeated labels                 | Compile-time autocomplete, single source of truth                                                                                              |
