---
name: 'table'
kind: 'area'
stack: 'react, tanstack-table'
description: 'Working with tabular data. Column definitions, rows, sorting, filtering, paging, table state, and persisting a filter across sessions.'
---

# Table

Tabular data. A table is a set of column definitions plus the state that walks
them — sort, filter, page, selection.

No code here — every claim points at an example file beside this one.

## When to use

- Defining columns for a table.
- Adding sorting, filtering, paging or selection.
- Deciding what a row action does.
- Persisting table state across a reload.

## Scope of Expertise / Domain

Owns the column set and the state over it: accessor, cell rendering, sorting,
filtering, paging, selection, download. Not how the table looks — that is `ui` —
and not where its data comes from, which is `queries`.

## File structure

```text
Feature/
├── Feature.columns.tsx     ← the column set
├── Feature.types.ts        ← the row type the columns index
└── Feature.tsx             ← consumes the columns and holds the state
```

## Methodology

### The columns file

One exported constant, typed `TableColumns<Row>`, where `Row` is the feature's own
row type. Each entry is a `TableColumn`:

| Field        | Meaning                                                 |
| ------------ | ------------------------------------------------------- |
| `header`     | the visible label                                       |
| `accessor`   | `keyof Row` — the field this column reads               |
| `cell`       | render function, receiving that field's value           |
| `isSortable` | opt this column into sorting                            |
| `filter`     | a `Predicate` deciding whether a row survives filtering |
| `breakpoint` | the width at which the column collapses or hides        |

`accessor` is a bare key, never a string path — it is typed against the row, so a
renamed field breaks the column rather than silently rendering nothing.

The constant is named for the **domain** the table shows, lowercase-plural —
`activityColumns`, `breakdownColumns` — not for the feature. The feature folder
already carries the feature name.

Reference: [`Feature.columns.tsx`](./Feature.columns.tsx)

### Cell rendering

`cell` receives the accessor's value and returns a node. Anything needing
formatting gets a hoisted helper above the columns — a date through
`DateTime.Format.to`, a string through a shared text component — never an inline
`String(value)` in the middle of the array.

A cell that renders another component renders the **shared** one. A pill, a code
span, a badge — those live in `common/ux`, and a table cell is a consumer of them.

Reference: [`Feature.columns.tsx`](./Feature.columns.tsx)

### Sorting, filtering, paging

Three independent concerns, three shapes:

- **Sorting** — `TableSorting<TData>`: the current `column`, its `direction`, and
  an `onSortChange`. The state lives in the component, not the columns file.
- **Filtering** — `TableFiltering`: a list of `inputs`, each one of the six
  `TableFilteringInput` kinds (`text`, `number`, `option`, `search`, `date`,
  `checkbox`), plus an `onFilter` receiving the values.
- **Paging** — `TablePagination`, driven by the same component state.

A column opts into a behaviour; it never owns it.

Reference: [`Feature.table.ts`](./Feature.table.ts)

### Row actions

`TableAction<TData>` for anything a row can do — `id`, `label`, `onClick`, and a
`filter` predicate for actions that only apply to some rows. Actions are built as
a factory (`FeatureActions.create(handlers)`) returning `TableAction[]`, so the
handlers arrive from the component rather than being closed over in the file.

Reference: [`Feature.actions.ts`](./Feature.actions.ts)

### Selection

`TableSelectionMode` is `'single'` or `'multiple'` — a mode, not a boolean, so a
third mode is an addition rather than a breaking change.

### Responsive columns

`TableBreakpoint` is the seven size tokens plus `'accordion'`. A column given a
breakpoint disappears below it; given `'accordion'`, it folds into the row's
expandable detail rather than vanishing.

Choose `'accordion'` when the column's value is still needed on a narrow screen,
and a size token when the column is genuinely optional there.

### Persisting table state

Table state survives a reload, so a filter set on one page is still set after a
navigation. The state is read from and written to the URL — that is what
`TableUrlPersistence` is for — and it is not something a feature opts into.

A feature that needs state _not_ persisted has to say so explicitly; the default
is that it is.

Reference: [`Feature.table.ts`](./Feature.table.ts)

## Files and folders

### `Feature.columns.tsx`

Naming convention: `<Feature>.columns.tsx`, beside the primary file.
Return type: one exported `<domain>Columns: TableColumns<Row>`.
Example: [`Feature.columns.tsx`](./Feature.columns.tsx)
Rules:

- One constant, typed against the feature's row type.
- `accessor` is a bare key, never a path string.
- Formatting goes in a hoisted helper, never inline in the array.
- Cell rendering reaches for `common/ux` components.

### `Feature.actions.ts`

Naming convention: `<Feature>.actions.ts`, beside the columns file.
Return type: a factory returning `TableAction<Row>[]`.
Example: [`Feature.actions.ts`](./Feature.actions.ts)
Rules:

- Actions are built, not declared — handlers arrive as arguments.
- `filter` keeps an action off rows it does not apply to.

### `Feature.table.ts`

Naming convention: `<Feature>.table.ts` when a feature needs table config beyond
its columns.
Return type: the feature's table configuration.
Example: [`Feature.table.ts`](./Feature.table.ts)
Rules:

- Sorting, filtering and paging config live here, not in the columns file.
- Persistence is the default; opting out is the explicit case.

## Rules

- **Columns are typed against the row** — `accessor` is a key, not a string.
- **The constant is named for the domain**, lowercase-plural, not for the feature.
- **A column opts into sorting or filtering**; it never owns the state.
- **Formatting goes in a hoisted helper.**
- **A shared component beats a bespoke cell** — reach for `common/ux` first.
- **`'accordion'` before hiding a column** whose value is still needed narrow.
- **Table state persists by default**, via the URL.
- **Row actions are built**, with handlers passed in.
- **How a table looks is `ui`; where its rows come from is `queries`.**
