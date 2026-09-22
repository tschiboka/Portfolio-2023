---
name: ui
access: write
stack: 'react, typescript, css, scss'
description: 'Creating and structuring UI components, from screens and feature components to reusable shared components, including styling and layout.'
---

# /ui

## When to use

- Creating a feature, screen, or shared component.
- Decomposing or extracting UI, including choosing shared versus custom.
- Styling, laying out, or adding responsive behaviour.
- Wiring a screen into the router.

## Scope

Owns UI structure, composition, layout, styling, accessibility, context, and
screen routing.

Does not own data or requests (`queries`), persistence (`db`), endpoints
(`router`), or tests (`test`).

## Rules

### Reuse

- Check `@common` before creating custom UI.
- Prefer existing components such as `<Stack />`, `<Grid />` and `<Typography />`.
- Generalise reusable components and patterns early.
- Generic components and styles belong in `@common`.

### Components

- Screens, feature components and shared components follow the same component principles.
- Extract when there is a clear name, boundary and reason.
- Props stay with their component.
- Named exports only. No default exports.
- Do not create empty role files.

### Styling

- Feature styling defaults to `<Feature>.styles.ts` with one styles object.
- Common UI uses CSS. Do not introduce SCSS into `@common`.
- SCSS is retiring. Add `<Feature>.styles.scss` only when CSS-in-TS cannot express the required selector, pseudo-class or media query.
- Every value comes from `Const`, a styling index, or a justified literal.
- Breakpoints come from `Const.Breakpoint`.
- Feature SCSS uses a feature prefix and is imported by its consumer.

### Context

- Put context at the smallest required scope: app, feature or component.
- `<Feature>.context.ts` declares the context; `<Feature>.provider.tsx` owns state, effects and the provider.
- Use `ContextBuilder.CreateContext<T>()` from `@common-utils`.
- Wrap the feature root. Nothing below reads the context directly.

### Accessibility

- Every interactive control has its own accessible name.
- Use semantic elements before ARIA.
- `role` and `aria-*` belong on the element they describe.
- Use ARIA attributes for extended accessibility.

## Workflow

1. Identify the UI scope: screen, feature or shared component.
2. Check `@common` for reusable components and patterns.
3. Define the component boundary and extract reusable UI where appropriate.
4. Add context only when state is shared by the component tree.
5. Style with `<Feature>.styles.ts`; add SCSS only when required.
6. Register the route for screens.
7. Hand data, behaviour and tests to their specialist skills.

## File structure

```text
<Feature>/
├── <Feature>.tsx
├── <Feature>.types.ts
├── <Feature>.styles.ts
├── <Feature>.selectors.ts
├── <Feature>.utils.ts
├── <Feature>.context.ts
├── <Feature>.provider.tsx
├── components/
│   └── index.ts
├── index.ts
└── tests/
```

Add files only when their role exists. `<Feature>.styles.scss` is exceptional
and retiring.

## Files and folders

### `<Feature>.tsx`

Named after the folder, PascalCase. Primary component; named export, props stay
here.

### `<Feature>.selectors.ts`

Returns `get<Thing>` / `select<Prop>` functions that turn the feature's own state
or props into a rendered value — a class name, an alignment, a label.
Example: [`Feature.selectors.ts`](./Feature.selectors.ts)

- It knows the feature's vocabulary; a helper that does not belongs in `utils.ts`.
- It holds no values — `styles.ts` says what a property is, a selector says which one applies.

### `<Feature>.utils.ts`

Generic helpers for this feature only. No knowledge of the component's props,
class names or rendered output.

### `<Feature>.context.ts`

Returns the context from `ContextBuilder.CreateContext<T>('Feature', initialValues)`
— its `Use` throws outside the provider. Declares the initial shape only; no JSX
or state.

### `<Feature>.provider.tsx`

Returns `<Feature>Provider`, taking `{ children }`. Owns the state, effects and
wrapping of the feature root.

### `components/`

Presentational parts used only by the feature. If a part could serve another
feature, it belongs in `@common` instead.

Example: [`components/index.ts`](./components/index.ts)

### `index.ts`

The barrel for the feature — nothing outside reaches past it into a sibling file.

Example: [`index.ts`](./index.ts)
Rules:

- Exports are **alphabetical by exported symbol**, types last as `export type`.
