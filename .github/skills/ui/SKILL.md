---
name: 'ui'
kind: 'area'
stack: 'react, css, scss'
description: 'How a component looks and behaves. Layout, spacing, styling, responsive behaviour, animation, and the generic interaction patterns the app reuses.'
---

# UI

Looks and behaviour. `component` decides what a thing _is_; this decides how it
appears and how it responds.

No code here — every claim points at an example file beside this one.

## When to use

- Styling a feature, or a component inside one.
- Choosing between a style object, a class, a token and a literal.
- Adding a breakpoint or a responsive rule.
- Reaching for `common/ux` instead of writing your own.

## Scope of Expertise / Domain

Owns appearance: spacing, colour, typography, layout, breakpoints, transition and
animation. Not structure — which file a thing lives in is `component` — and not
behaviour under test, which is `test`.

## File structure

```text
Feature/
├── Feature.styles.ts     ← CSSProperties, keyed like the markup
├── Feature.styles.scss   ← classes and media queries only
└── components/
    └── ComponentFoo.tsx  ← consumes both
```

## Methodology

### Every value comes from a source

No raw hex, no bare pixel, no ad-hoc colour. Values arrive three ways:

| Source                    | For                                                                  | Example                                    |
| ------------------------- | -------------------------------------------------------------------- | ------------------------------------------ |
| `Const` from `@common-ux` | the design system — colour ramps, spacing, font, breakpoint, z-index | `Const.Spacing[8]`, `Const.Color.White[4]` |
| A styling _index_         | large bespoke sets a feature needs beyond `Const`                    | the feature's own index module             |
| A literal                 | nothing else fits — genuinely local, genuinely one-off               | `maxWidth: '600px'`                        |

`Const` is the default and covers most of it. Reach for a styling index when a
feature has a set too large or too specific for the ramp — and if you reach for a
literal, say why in the code.

Reference: [`Feature.styles.ts`](./Feature.styles.ts)

### The style object

`Feature.styles.ts` exports one `<Feature>Styles` object. Its keys mirror the
markup — `shell`, `card`, `header.title` — each holding a `CSSProperties`, so a
consumer reads exactly the path it renders.

Static property values live here: everything a `CSSProperties` object can hold.

Reference: [`Feature.styles.ts`](./Feature.styles.ts)

### The class, and what only CSS can do

A class and a style object sit on the same element and do different jobs.
`Feature.styles.scss` holds what a `CSSProperties` object **cannot**:

- media queries and `@supports`
- pseudo-classes and pseudo-elements
- selectors reaching past the element

Everything else is the object. A class is the hook for CSS the object can't
express — not a second place to put properties the object already holds.

Class names are prefixed by the feature — `bp-` for `BreakdownPreview` — so a
feature's rules cannot collide with another's.

The component that uses the classes imports the `.scss` itself.

Reference: [`components/ComponentFoo.tsx`](./components/ComponentFoo.tsx)

### Responsive

Breakpoints come from `Const.Breakpoint`. Set them up once, in the `.scss`, as a
named set of overrides rather than touching every declaration.

A media query cannot read `Const` — the value is written into the `.scss` by hand.
That is the one place a raw number is correct.

Reference: [`Feature.styles.scss`](./Feature.styles.scss)

### Generic before custom

`common/ux` holds the shared components — `Button`, `Layout`, `Overlay`, `Pill`,
`Region`, `Table`, `Toggle`, `Typography` and the rest. Reach for one before
styling a bespoke equivalent, and extend `common/ux` rather than forking it.

Reference: [`Feature.styles.ts`](./Feature.styles.ts)

## Files and folders

### `Feature.styles.ts`

Naming convention: `<Feature>.styles.ts`, beside the primary file.
Return type: one `<Feature>Styles` object of `CSSProperties`.
Example: [`Feature.styles.ts`](./Feature.styles.ts)
Rules:

- Every value from `Const`, a styling index, or a justified literal.
- Keys mirror the markup, nested as deep as the consumer reads.
- Static properties only — nothing CSS alone can do.

### `Feature.styles.scss`

Naming convention: `<Feature>.styles.scss`, beside the styles object.
Return type: class rules under the feature's prefix.
Example: [`Feature.styles.scss`](./Feature.styles.scss)
Rules:

- Media queries, pseudo-classes, pseudo-elements, descendant selectors — nothing
  a `CSSProperties` object already covers.
- One prefix per feature, used on every class.

### `components/ComponentFoo.tsx`

Naming convention: consumes both, via the styles object and a class.
Return type: unchanged — `component` owns its shape.
Example: [`components/ComponentFoo.tsx`](./components/ComponentFoo.tsx)
Rules:

- `style={FeatureStyles.x.y}` for static values.
- `className="prefix-element"` only where CSS is needed.

## Rules

- **Every value has a source.** `Const` first; a styling index when the set
  outgrows it; a literal only with a stated reason.
- **One `<Feature>Styles` object**, keys mirroring the markup.
- **The object holds static properties only** — media queries, pseudo-classes and
  descendant selectors go in the `.scss`.
- **One class prefix per feature.**
- **The component imports its own `.scss`** — an unimported stylesheet does nothing.
- **Breakpoints come from `Const.Breakpoint`**, written into the `.scss` by hand.
- **`common/ux` before custom.** Extend the shared component, never fork it.
- **A component's structure is not this skill's business** — that is `component`.
