# 0001 — Table State URL Persistence (Filters + Paging + Sorting)

**Status:** In progress
**Last updated:** 2026-08-21
**Created:** 2026-07-31
**Pilot consumer:** `WebsiteStats` → `BreakdownTable` (activity feed)

### Session log

**2026-08-21 (6)** — Documented `urlPersistence` in UxStories `Controller.tsx` (opt-in, namespace,
apply-driven, minimal URLs) and reconciled the checklist — marked the two stale Codec-layer items
(record codec, flat-key namespace) as done, updated the file map (pilot + docs rows). Full Table
test suite passes after the refactors.

**2026-08-21 (7)** — Added **live controller + URL-persistence demos** to the UxStories Tables
stories (`Tables.demos.tsx`): a `ControllerPersistenceDemo` rendering three variants on one page —
**off** (no config → local state), **single** (`urlPersistence: {}` → root params), and **named**
(`urlPersistence: { namespace: 'demo' }` → `demo.*` params) — demonstrating opt-in and the
multi-table namespacing behaviour end to end.

**2026-08-21 (5)** — Added URL-persistence **integration + collision tests** as a
`URL persistence round-trip` describe in `useTableController.spec.tsx` (router-wrapped): filter →
URL, sort/paging → URL (defaults omitted), URL → state on mount, **external URL clear → state
reset** (regression-covering the "press home doesn't reset" bug), and two namespaced controllers
on one router with no collision. (A misplaced `UrlPersistence.integration.spec.tsx` was
superseded and removed — `integration` is not a valid role suffix.)

**2026-08-21 (4)** — **Two-way sync + cleanup.**
(a) Implemented the missing **URL → state sync on change** (the pending popstate/back-forward
item): external URL changes (back/forward, nav, manual URL edits) now mirror back into the
controller via a minimal effect using functional `setState` + a `statesEqual` guard, so our own
persist echo is a no-op. `statesEqual` lives in `TableUrlPersistence.utils.ts` (spec'd).
(b) Extracted a reuseable **`Objects.shallowEqual`** (`common/utils/Objects/`) — generic shallow
object equality — and `statesEqual` now composes it for filters/sorting/paging. Fully spec'd.
(c) Replaced redundant `Record<string, unknown>` with the existing `Dictionary` generic
(`common/utils/Generics`) across the controller and its types.

**2026-08-21 (3)** — Two more fixes from piloting `BreakdownTable`.
(a) **Form hydration:** URL-hydrated filter values weren't shown in the filter form — `TableFiltering`
gained `values` (the controller's `state.filters`), and `TableFilterPanel` seeds+syncs its local
draft from `filtering.values` (with `normalizeValues` filling unset keys). Covers load + back/forward.
(b) **Minimal URLs (decision B):** `persist` now writes **only values that differ from the defaults**
(`sortBy`/`dir`/`pageNumber`/`pageSize` are omitted when at default, filter empties deleted), so a
near-default table yields a clean URL like `?breakdown.type=error&breakdown.dateFrom=...`. Read-side
hydration still fills defaults. Also fixed: reset now deletes stale filter/sort keys (previously the
URL kept old params after reset — empty values weren't removed).

**2026-08-21 (2)** — **Flipped persistence to opt-in by declaration.** Caught a real bug: with no
`urlPersistence` set, the URL still showed `?sortBy=&dir=&pageNumber=&pageSize=` because `enabled`
defaulted to `true`. Now persistence only activates when the `urlPersistence` config is **provided**
(guarded via `isDefined` predicate); omitted configs keep the URL untouched. Updated decision #7,
description, scope, plan, and checklist. Both previously-orphaned files
(`useTableController.defaults.ts`, `TablePagination.utils.ts`) are deleted.

**2026-08-21** — Finished the `useTableUrlPersistence` hook spec
(`TableUrlPersistence.spec.tsx`), split into role-suffixed test files
(`.spec.utils.tsx` / `.spec.types.ts` / `.mocks.ts`). Settled two design gaps the tests
exposed: **history semantics** — filter Apply/Reset pushes a history entry (`replace: false`)
so Back restores the filtered state, while sort/page `replace`; and **param merging** —
`persist` now starts from the current URL params so unrelated query state (other tables/params)
survives a write. Extracted shared table state defaults + paging helpers to a new
`common/utils/Table/` namespace (`Table.Paging`, `Table.Sorting`), breaking a circular import by
promoting `Paging`/`TableSortState`/`SortDirection` to `common/types` (feature re-exports).
Renamed the vague `page` to `pageNumber` **everywhere** (state, URL + API wire param, controller,
server, specs) — breaking wire change. `useTableController` now exposes `pagination.pageNumber`.
Pick up here next: `BreakdownTable` pilot + namespace; verify full test suite.

**2026-08-12** — Wired `useTableUrlPersistence` into `useTableController`: mount-seed state from URL,
persist once via a single `commit` helper, consolidated controller to one `TableState`, moved defaults to
`useTableController.defaults.ts`, added `useTableController` spec. Also **React 19 upgrade** + fixed all
type-migration errors (nullable refs, `JSX` namespace, `useRef`, unknown props). Pick up here next:
`useTableUrlPersistence` hook tests (need `MemoryRouter`) and `BreakdownTable` pilot.

**2026-08-02** — Done: split filter defs out of the controller into `TableFilterConfig/`, moved URL
persistence into `TableUrlPersistence/`, added `Objects.fromEntries`/`pick` (+ `Key<T>` generic) with
tests, rewired imports. Pick up here next: **wire `useTableUrlPersistence` into `useTableController`**
(the hook exists in `TableUrlPersistence/` but the controller doesn't call it yet — filters/paging/
sorting still live in local state only), then add controller tests (`useTableController/tests/` is
currently empty).

**2026-08-01** — Picked up here next: fix the remaining type errors in
`common/ux/Table/useTableController/urlPersistence.ts` and review the file.

---

## 1. Description

Make a table's coherent state — **filtering**, **paging**, and **sorting** — live in the
URL as the single source of truth. This same state is what gets serialized and sent to the
backend as the API query (`toParams`). The feature:

- Is **opt-in per table** — enabling `urlPersistence` turns it on; other tables stay local-state only.
- Writes to the URL **on Apply** (the filter button / reset / sort / page change), not on input keystrokes.
- Uses a **codec** (derived from the existing `FilterConfig` types, with optional per-filter
  overrides) to (de)serialize values into/out of the URL query string — the mapping is a
  **transformation**, not identity (e.g. date input value → normalized `YYYY-MM-DD`).
- Is **backwards compatible** — existing controllers/tables keep working unchanged.
- Handles **multiple tables on one page** without query-param collisions.
- Syncs **both directions** (URL → state on load/back-forward; state → URL on commit).

## 2. Feature scope

**In scope**

- Persist filter + paging + sorting state to the URL and back.
- Codec layer derived from existing `FilterConfig` types.
- Two-way URL ↔ state sync (load, back/forward, commit).
- Opt-in with per-table enable (declare `urlPersistence`); omitted tables keep local state.
- Multiple-tables-per-page support (namespacing).

**Out of scope / non-goals**

- Persisting only filters (we persist the whole state unit).
- Column customization or layout persistence.
- Anything beyond the Table package's controller/URL layer.

---

## 3. Plan

**Architecture context (as discovered)**

- **Router:** `react-router-dom` v6 with `createHashRouter` (`src/routing/routes.tsx`) — so "URL" means hash-based URL + search params via `useSearchParams`.
- **Controller:** `useTableController` in `common/ux/Table/useTableController/useTableController.ts`.
    - Holds `filters`, `sort`, `page`, `pageSize` in local `useState`.
    - Produces a single `state = { filters, sorting, pagination }`.
    - Feeds `state` through `toParams(state)` → API query.
    - Exposes `filtering { inputs, onFilter }`, `sorting { onSortChange }`, `pagination { onPageChange, onPageSizeChange }`.
- **Filter definitions:** `FilterConfig` in `common/ux/Table/useTableController/filters.ts` — typed per field (`text | option | date | number | search | checkbox`).
- **Apply button flow:** `TableFilterPanel.tsx` keeps local draft `values`; only the **Filter** (submit) or **Reset** button calls `filtering.onFilter(values)` (`Table.tsx` `table-filter-submit`). This is the commit point.
- **Transformer pattern:** `BaseTransformer` (`common/utils/Transformer`) maps params → API query; reused for `toParams`.
- **No existing URL codec utility** — greenfield.

**Known issue — empty filters not excluded (RESOLVED)**

The current activity-feed request does not exclude empty filters, so an unfiltered GET sends
redundant empty params:

```
GET http://localhost:5000/api/activity/admin?path=&type=&dateFrom=&dateTo=&sortBy=datetime&page=1&pageSize=10
```

`path`, `type`, `dateFrom`, and `dateTo` are sent empty even when no filter is applied. **This is
now handled by the codec layer:** every filter codec encodes empty/unset values to `undefined`,
so they're omitted from the URL and request.

**Suggested build order**

1. **Codec layer** (`Codec/`) — pure, testable first.
2. **`useTableUrlPersistence` hook** — router coupling, two-way sync, namespace.
3. **Controller wiring** — opt-in + graceful degrade (keep existing tests green).
4. **`BreakdownTable` pilot** (WebsiteStats) — namespace/key.
5. **Multiple-tables handling** + tests + UxStories docs.

## 4. Other solutions / options

- Alternative 1 — local state only (current): simple, but no deep-linking/shareable URL.
- Alternative 2 — `localStorage`/session persistence: survives refresh but isn't shareable/bookmarkable.
- Alternative 3 — full URL persistence (chosen): shareable + one source of truth; adds router coupling.
- **JSON group param** (rejected): one param per table carrying a serialized blob
  (e.g. `activityFeed={"path":..}`). Rejected: hard to read/debug, no linear URL mapping, breaks
  the flat-key symmetry with `controller.params`/backend query. Namespaced flat keys chosen instead.

## 5. Pros / Cons

**Pros**

- URL is a shareable, bookmarked, reproducible state of the table (deep-link to a filtered/sorted page).
- One source of truth for state — no drift between local state, URL, and backend query.
- Opt-in per table keeps other tables' URLs untouched; minimal per-table wiring when enabled.
- Backwards compatible — existing controllers keep working unchanged; easy opt-out.

**Cons**

- Adds coupling between the Table package and the router (`useSearchParams`).
- Two-way sync introduces complexity (feedback-loop guards, popstate handling).
- Multi-table pages need namespacing and careful URL hygiene.
- More state management surface to test.

## 6. Decisions & rationale

1. **Commit point = Apply.** URL writes happen on Apply/Reset (filters) and on sort/page change.
   No debounce.
2. **Couple to the Table package** directly (no loose adapter passed in).
3. **Persist the whole coherent state** — filtering **+** paging **+** sorting — not just filters.
   One URL-serializable unit, one source of truth, feeding both the URL and the backend query.
4. **Backwards compatible.** Public `TableControl` shape unchanged; existing call sites compile
   unchanged; when disabled (or outside a router) the hook degrades to current local-state behavior so
   all existing tests still pass.
5. **Codec derived from types.** Field codecs auto-derived from each `FilterConfig.type`;
   no per-page codec files.
6. **Two-way sync.** URL → state (load, back/forward, manual URL edits) and state → URL (on commit),
   with feedback-loop guards.
7. **Per-table flag, opt-in by declaration (updated 2026-08-21).** Persistence is **off** unless the
   `urlPersistence?: { enabled?, namespace? }` config is provided; when provided, `enabled` defaults
   `true`. Omitting it entirely keeps the URL untouched — no table URL params leak without an
   explicit opt-in. `enabled: false` (or remaining outside a router) also disables it. Detected via
   the `isDefined` predicate so an empty `{}` enables and omission disables.
8. **Multiple tables** must not collide — namespace support (see Open questions).
9. **Filter config additions** — each `FilterConfig` gains optional: `urlKey` (query-param name;
   default = object key), `urlEnabled` (default true; false = never touch URL), and `encode`/`decode`
   (override the type-derived UI↔URL transform; default = derived from `type`). Empty/unset values
   encode to `undefined` (omitted) — solves the known empty-filter issue.
10. **Namespace is optional, flat keys (no JSON)** — params are flat, namespaced keys
    (e.g. `activityFeed.path`). A JSON group param was considered and rejected (see section 4).
    Namespace is only set when a page hosts 2+ persistent tables; a single table uses clean root
    params (`path=`, `type=`, …).
11. **Namespace is a documented convention, not a runtime guard.** Nothing enforces a
    unique namespace — two tables with no namespace (or the same namespace) will collide silently.
    This is accepted: a single-table page has no collider, and clean root params are worth it.
    Callers composing a page with **2+ persistent tables must set a distinct `namespace` on each**.
    Responsibility lives at the page/consumer level. (Rejected a hard guarantee — requires a
    required namespace, which adds URL noise to the common single-table case.)

## 7. Artifacts

**File map**

| Area                                                  | Work                                                                                                                                                                                                                                                                                                                                                                                       |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **New** `common/utils/Objects/` (done)                | Generic object helpers: `Objects.fromEntries<T>(entries)` (single `as T` assertion; used by the URL hook, controller, `Query`), `Objects.pick(source, keys)` (pick defined keys — single or array), and `Objects.shallowEqual(a, b)` (shallow object equality; used by `statesEqual`). Plus `Key<T>` generic type in `Generics` (`Extract<keyof T, string>`). All spec'd.                  |
| **New** `common/types/table.ts` (done)                | Shared table state types promoted here to break a circular import: `Paging`, `TableSortState`, `SortDirection`. Re-exported by `useTableController.types.ts` for feature compat.                                                                                                                                                                                                           |
| **New** `common/utils/Table/` (done)                  | Shared table state defaults + paging helpers as a `Table` namespace: `Table.Paging` (`defaults`, `pageSizeOptions`, `getWindow`, `isFirst`, `isLast`) and `Table.Sorting` (`defaults`). Written as `Table.constants.ts` / `Table.utils.ts` / `Table.ts` + `index.ts`, spec'd in `tests/Table.spec.ts`. Replaces `useTableController.defaults.ts` and `TablePagination.utils.ts` (deleted). |
| **New** `common/utils/URL/Codec/` (done)              | Generic `Codecs` (text/search/date/option/number/checkbox) + `Codec<T>`/`UrlKey`/`UrlValue` types + specs. Backed by `Strings`/`Numbers`/`Booleans` `.Optional` helpers (each spec'd). `option` maps to the string codec.                                                                                                                                                                  |
| **New** `common/ux/Table/TableFilterConfig/` (done)   | Filter domain definitions moved out of the controller: `FilterConfig` + per-type configs + `FilterDefinitions` (in `TableFilterConfig.types.ts`) and `text/select/date/number/search/checkbox` builders (`.config.ts`).                                                                                                                                                                    |
| **New** `common/ux/Table/TableUrlPersistence/` (done) | `buildCodec(config)` (`TableUrlPersistence.config.ts`) + `useTableUrlPersistence` hook (`TableUrlPersistence.ts`) + `.types.ts` — read/write URL, two-way sync, namespace, `replace`/`push`, record codec for `{filters, sorting, pagination}`.                                                                                                                                            |
| **Edit** `useTableController.types.ts` (done)         | Add `urlPersistence?: { enabled?, namespace? }` (opt-in — declare to enable); `TableControl.pagination` now exposes `pageNumber`; re-exports `Paging`/`TableSortState`/`SortDirection` from `common/types`.                                                                                                                                                                                |
| **Edit** `useTableController.ts` (done)               | Wired `useTableUrlPersistence` into the controller: mount-seed state from URL, single `commit` persist (`push` on filter apply, `replace` elsewhere), degrade to local state when disabled/outside router. Consumes `Table.Paging`/`Table.Sorting` defaults.                                                                                                                               |
| **Breaking rename** `page` → `pageNumber` (done)      | In-memory state field **and** URL + API wire param renamed (`?page=` → `?pageNumber=`). Cross-cuts `common/types/app.ts` `GetActivityFeedQuery`, `server/routes/activity.ts`, serializers, specs. Breaking for existing bookmarks/backend.                                                                                                                                                 |
| **Edit** `useTableController/index.ts` (done)         | Controller index no longer re-exports filters/`buildCodec` — those moved to `TableFilterConfig`/`TableUrlPersistence` (`Table/index.ts` re-exports all).                                                                                                                                                                                                                                   |
| **Edit** `Table.tsx` / `TablePagination.tsx` (done)   | Table pagination props + state renamed `page` → `pageNumber`; commit points confirmed (apply/reset/sort/page).                                                                                                                                                                                                                                                                             |
| **Edit** `BreakdownTable.controller.ts` (done)        | Pilot consumer wired with `urlPersistence: { namespace: 'breakdown' }` (2026-08-21).                                                                                                                                                                                                                                                                                                       |
| **Edit** UxStories `Controller.tsx` docs (done)       | Document `urlPersistence` (opt-in, namespace, apply-driven, minimal URLs) (2026-08-21).                                                                                                                                                                                                                                                                                                    |
| **Add tests**                                         | Codec round-trip (all types + sorting/pagination); URL hook (load, apply, popstate, namespace, opt-out); Table integration "state persists to URL & back"; multiple-tables collision; backward-compat regression                                                                                                                                                                           |

## 8. Open questions

- **`push` vs `replace` (RESOLVED 2026-08-21)** — filter Apply/Reset → `push` (Back restores the
  filtered state); sort/page/pageSize → `replace` (no granular history). Implemented in
  `persist(next, replace)` driven by the controller's commit type.
- **Whether any page actually hosts more than one persistent table today** — if none do, namespace
  stays unused in practice; the optional-namespace support still ships as safety.
- Router-guard technique details (how to detect router presence without breaking router-less tests).

## 9. Feature dev checklist

**Codec layer**

- [x] Field codecs for all `FilterConfig` types (`text/option/date/number/search/checkbox`)
- [x] Optional per-filter `urlKey`, `urlEnabled`, `encode`/`decode` overrides on `FilterConfig`
- [x] `buildCodec(config)` resolver — maps `type` to codec, honors `encode`/`decode` overrides
- [x] Omit empty/unset into `undefined` on encode (known issue) — empty → `undefined`
- [x] Record codec composing filters + sorting + pagination (persistence hook) — `persist`/`state` compose the full state via the record codec
- [x] Optional flat-key namespace (persistence hook) — `ns.*` param prefixing implemented + tested
- [x] Unit tests: codecs + Optional helpers + `buildCodec` (round-trip + edges)

**Persistence hook**

- [x] Read URL on load → hydrate state
- [x] Write URL on commit (apply/reset/sort/page)
- [x] Back/forward (popstate) sync — external URL changes mirror into state (2026-08-21)
- [x] Feedback-loop guards — own persist echo is a no-op via the `statesEqual` guard (2026-08-21)
- [x] `push` vs `replace` behavior decided + implemented (2026-08-21)
- [x] Param merging — persist starts from current params so unrelated URL state survives
- [x] Only-differences URLs — omit values equal to defaults; delete empty filter/sort keys on reset
- [x] Form hydration — `TableFiltering.values` + panel seeds/syncs from applied filters
- [x] Hook tests: load, apply, popstate, namespace, opt-out (2026-08-21, split across `.spec.utils` /`.spec.types` / `.mocks`)

**Controller wiring**

- [x] Imports rewired to `TableFilterConfig` / `TableUrlPersistence` (feature split done)
- [x] Wire `useTableUrlPersistence` into `useTableController` (seed state from URL on mount; single `commit` persist)
- [x] Opt-in `urlPersistence` config (declare to enable; omitted tables untouched)
- [x] Graceful degrade to local state when disabled / outside router
- [x] Controller tests (`useTableController.spec.tsx` added)
- [ ] Existing Table tests still pass (backwards compatible) — verify full suite

**Pilot consumer**

- [x] `BreakdownTable` wired with persistence + `{ namespace: 'breakdown' }` (2026-08-21) — verified live: filters/sort/paging round-trip via `breakdown.*` params

**Docs**

- [x] UxStories `Controller.tsx` documents `urlPersistence` (opt-in, namespace, apply-driven, minimal URLs) (2026-08-21)

**Verification**

- [x] Integration test: state persists to URL & back — added as a `URL persistence round-trip`
      describe in `useTableController.spec.tsx` (filter/sort/paging to URL, URL → mount, external URL
      clear → reset) (2026-08-21)
- [x] Multiple-tables collision test — two namespaced controllers on one router, no collision (2026-08-21)

## 10. Related docs / links

- Template: [`0000-doc-template.md`](./0000-doc-template.md)
- Follows the feature doc conventions in `docs/README.md` and `AGENTS.md`.
