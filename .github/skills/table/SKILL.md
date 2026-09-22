---
name: table
access: write
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

## Scope

Owns the column set and the state over it: accessor, cell rendering, sorting,
filtering, paging, selection, download. Not how the table looks — that is `ui` —
and not where its data comes from, which is `queries`.

## File structure

```text
Feature/
├── Feature.columns.tsx     ← the column set
├── Feature.actions.ts      ← row actions, when a row can do something
├── Feature.table.ts        ← config beyond the columns, when needed
├── Feature.types.ts        ← the row type the columns index
└── Feature.tsx             ← consumes the columns and holds the state
```

## Rules

- **The constant is named for the domain**, lowercase-plural — `activityColumns`, not for the feature. The folder already carries the feature name.
- **Sorting is `TableSorting<TData>`; filtering is `TableFiltering`** with its `inputs` and `onFilter`; paging is `TablePagination`. All three take their state from the component, never from the columns file.
- **Selection is `TableSelectionMode`**, `'single'` or `'multiple'` — a mode, not a boolean, so a third mode is an addition rather than a breaking change.
- **`TableBreakpoint` is the seven size tokens plus `'accordion'`.** A token hides the column below it; `'accordion'` folds it into the row's expandable detail.
- **`'accordion'` before hiding a column** whose value is still needed narrow.
- **`filter` on a `TableAction`** keeps the action off rows it does not apply to.
- **Persistence is `TableUrlPersistence`** — the default, not an opt-in. A feature that must not persist says so explicitly.
- **How a table looks is `ui`; where its rows come from is `queries`.**

## Workflow

1. Name the domain the table shows, and its row type.
2. Write `Feature.columns.tsx` — one exported constant typed `TableColumns<Row>`. `accessor` is a bare key of the row, never a string path.
3. Give each column its `header`, and its `cell` where the raw value is not what should render. Hoist any formatting into a helper above the array.
4. Opt columns into `isSortable` and `filter` where the table needs them. The state behind both lives in the component.
5. Reach for `common/ux` in a cell — a pill, a code span, a badge already exist.
6. Add `Feature.actions.ts` if a row can do something, building the actions from handlers passed in.
7. Add `Feature.table.ts` if sorting, filtering or paging needs config beyond the columns.
8. Set `breakpoint` on a column that is optional narrow; `'accordion'` on one whose value is still needed.
9. Confirm the state persists — it does by default, through the URL. Opt out explicitly if it must not.

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
