# 0002 — Util Reuse Sweep

> **Status:** Complete — type/generic inventory audit + all migrations applied; util-folders sweep + Predicate sub-sweep done. **Remaining:** final `npm test` (run by user) then tick Verify.
> **Last updated:** 2026-08-22
> **Created:** 2026-08-21

---

## 1. Description

Replace hand-rolled utility code with the existing generic helpers in `common/utils` and `common/utils/Generics`, and audit the generic types / utils to shorten and de-duplicate code. Emerging from `0001`, where the `Arrays.times` util was extracted (`Array.from({ length }, …)`) but 15+ call sites still hand-roll the pattern. This ticket systematises that: sweep known recurrence sites, then audit the whole codebase for spots where a shared util or generic type already exists and is being re-implemented inline.

## 2. Feature scope

**In scope**

- Migrate the known `Array.from({ length }, …)` sites to `Arrays.times`.
- Audit `common/utils/*` and `common/utils/Generics/*` for patterns being re-implemented inline across FE + server.
- Replace redundant inline logic with the existing generic helpers / types (e.g. `Dictionary`, `Objects.*`, `Arrays.*`, `Strings.*`, `Numbers.*`, `Optional`/`Nullish`/`Key`, etc.).
- Add missing generic helpers/tests only when a clear, repeated pattern justifies them (per the DRY-extremum rule).
- Keep behavioural parity — refactors must not change runtime behaviour; rely on existing specs + full suite.

**Out of scope / non-goals**

- Introducing new framework/library dependencies.
- Changing public API contracts.
- Cosmetic renames of already-correct code for its own sake (no churn without benefit).

## 3. Plan

1. **`Arrays.times` migration** — sweep the known `Array.from({ length }, …)` sites:
   `common/ux/Table/Table.utils.ts`, `common/ux/Form/DateInput.tsx`,
   `common/ux/Table/TableSkeleton/TableSkeleton.tsx`, `src/…/Layouts.tsx`,
   `src/…/Tables.mocks.ts`, `server/projects/typist/routes.ts`,
   `common/ux/ContentNavigator/ContentNavigator.selectors.ts`, and re-check the public projects.
   Mechanical; verify each against its spec where one exists.
2. **Inventory existing utils/types** — list what `common/utils/*` and `common/utils/Generics/*` already
   provide, so the audit targets gaps not duplication.
3. **Codebase audit** — grep FE + server for common re-implementations (manual `Object.keys`/`== null`/
   `Array.from`/string-manipulation/`? :` ternaries that a util already covers) and replace them with the
   shared helper.
4. **Extract only genuinely-repeated patterns** — if a bespoke implementation recurs 2–3+ times and no
   util covers it, add the util + exhaustive spec (per `0001` precedent for `Arrays.times`,
   `Objects.shallowEqual`).
5. **Verify** — run the full suite; confirm behaviour unchanged.

## 4. Other solutions / options

- **Do nothing** — leave the hand-rolled code. Simplest, but perpetuates duplication and drift from the
  canonical helpers (the exact problem the DRY-extremum rule exists to prevent).
- **Adopt a lodash/ramda utility blanket** — already partially present (`ramda` used in demos). Rejected
  as a blanket: prefer first-party `common/utils` namespaces that match the codebase conventions and
  colocate cleanly.
- **Scope to `Arrays.times` only** — narrower, but misses the broader "audit all utils/types" goal the
  ticket explicitly includes.

## 5. Pros / Cons

**Pros**

- Removes duplicated, divergent implementations; single source of truth per generic helper.
- Consistency and readability (namespace-qualified calls like `Arrays.times`, `Objects.shallowEqual`).
- Surfacing unused or under-specified utils/type helps maintenance.

**Cons**

- Broad audit is time-consuming and touches many files (review churn).
- Risk of subtle behaviour drift if a migration isn't behaviour-identical — mitigated by specs + suite.
- Mechanical sweeps across feature files can grow a change set past "small and reviewable".

## 6. Decisions & rationale

1. **First-party `common/utils` over third-party blanket.** The codebase already owns namespace-scoped
   helpers (`Arrays`, `Objects`, `Strings`, `Url`, …); prefer them to keep naming and structure consistent.
2. **Replace only where a shared helper already exists or a clear recurring pattern justifies extracting.**
   Do not over-abstract one-off bespoke code.
3. **Behaviour parity is the bar.** Each migration is a pure refactor unless its spec says otherwise.
4. **Only documented role suffixes for any new util files** (per `AGENTS.md` §3.2) — no invented roles.
5. **en-GB spelling** for any new names/comments added during the sweep.

## 7. Artifacts

**File map**

| File                                                                                                                                                                                       | Role                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `common/utils/Arrays/Arrays.ts`                                                                                                                                                            | `Arrays.times` (from `0001`) **+ new `Arrays.random` (Optional, empty-safe)** **+ new `Arrays.unique` (dedupe transformer)**. |
| `common/utils/Predicate/Predicate.ts`                                                                                                                                                      | Existing set **+ new `Predicate.isNullish` + new `Predicate.includesAll(required, available)`** (subset).                     |
| `common/utils/Strings/Strings.ts`                                                                                                                                                          | **+ new `Strings.equalIgnoreCase` + `Strings.includesIgnoreCase`**.                                                           |
| `common/utils/Url/Params/Params.ts`                                                                                                                                                        | **+ new `Url.Params.toQueryString`**.                                                                                         |
| `common/utils/Arrays/tests/Arrays.spec.ts`, `common/utils/Predicate/tests/Predicate.spec.ts`, `common/utils/Strings/tests/Strings.spec.ts`, `common/utils/Url/Params/tests/Params.spec.ts` | Specs for the new helpers.                                                                                                    |
| Migrated call sites (FE + server)                                                                                                                                                          | See per-namespace checklist rows; server value imports use **subpaths** (never `@common/utils` barrel).                       |

## 8. Open questions

- Which utils best match each recurring pattern (to be decided during the audit)? — **Resolved** during the sweep (see decision rows).
- Whether the public project bundles (`public/projects/**`) should be swept or left — **Resolved**: left (standalone/static builds, not source).

## 9. Feature dev checklist

**Arrays.times migration**

- [x] `common/ux/Table/Table.utils.ts`
- [x] `common/ux/Table/TableSkeleton/TableSkeleton.tsx`
- [x] `common/ux/Form/DateInput.tsx`
- [x] `common/ux/ContentNavigator/ContentNavigator.selectors.ts`
- [x] `src/…/UxStories/…/Tables.mocks.ts`
- [x] `src/…/UxStories/…/Layouts.tsx` (3 sites)
- [x] `server/projects/typist/routes.ts`
- [x] Re-grep `Array.from({ length` sites — remaining ones are iterable/DOM/Set/Map conversions (not length-construction); `Arrays.ts` def + its spec stay.

> **Status: complete.**
> All `{ length }`-construction sites in the codebase now use `Arrays.times`. The only remaining
> `Array.from` calls are iterable/DOM/`Set`/`Map` conversions, the `Arrays.ts` definition itself,
> and its spec — none of which are length-construction and must not be touched.

**Utils / generic-types audit**

> Walk each generic type one-by-one. Per type: confirm what it does → grep FE + server for
> **inline re-implementations** → report → replace only where a shared helper/type already covers it.
> `Array.from({ length …` migration is handled separately (see above). Behaviour parity is the bar.

**Nullish family** (each inline union → its canonical type: `Nil` for bare `null | undefined`, `Optional` for `| undefined`, `Nullable` for `| null`, `Nullish` for `| null | undefined`)

- [x] `Nil = null | undefined` — audit complete. No bare `null | undefined` (no `T`) sites exist in FE/server. Only building-block usages (inside `Generics.types.ts`) and `{ length: number } | Nil` in `Predicate.ts`. Nothing to migrate at the `Nil` row.
- [x] `Defined<T> = Exclude<T, Nil>` — audit complete. Correctly used (only in `Predicate.ts` `isDefined`). No inline `NonNullable` / `Exclude<…null|undefined>` re-implementations exist. Nothing to migrate.
- [x] `Optional<T> = T | undefined` — migrated in two groups.
    - Group 1 (`useState`/`createContext`): `ContextBuilder`, `Overlay/ActionMenu`, `Overlay/Popup`, `Table`, `HookPattern.context`, `WDA/Session.context`, `WDA/SessionWebSocket`, `AppContext`, `SessionContext`.
    - Group 2 (return types): `DateTime/Format` (to/parse/toMoment), `Figure` (buildMedia/wrapperStyle), `Nav.utils` (isArticle), `ActivityDetailsModal`, `Tables.config` (4×), `Editor.reducer`, `Test/Page` (2×), `wda/hint`, `wda/move`, Table `CellVariant` types (`Table.types`, `TableBody`, `TableRow`).
    - Redundant `?: T | undefined` props (the `?` already implies optional) → dropped the `| undefined` instead of double-wrapping: `Form/Input` (`setRevealPassword`), `BlogCard` (`readingTime`/`codeTime`).
    - Skipped: article snippets (`HookPattern/codeSnippets`), `Stack.spec` (test), `common/types` `Record<string, string | undefined>` (map-value semantics — low benefit).
- [x] `Nullable<T> = T | null` — migrated. Group 1 (`useState`/`createContext`): `DateInput`, `SoundsWithHowler`, `Admin` (2×), `BreakdownTable`, `Overlays` (`activePopup`), `SessionWebSocket` (2×), `Clock`, `Modals` (`ModalContext`), `Version` (`useRef`). Group 2 (returns/params): `AccessGuard.utils`, `DateInput.utils`, `Test/CounterBadge`, `wda/broadcast`, `Blog.utils`, `LevelCreatorModal`, `LetterWheel.utils`, `Clock.utils`, `LocalSession`. Group 3 (type defs): `mergeStatus`, `wda/Queries.utils`, `Storage`, `server/models/category`, `Session.types`, `SessionOverlay.hooks`, `wda/types`. Final closes: `TableUrlPersistence` (+types), `BreakdownTable.actions`, `wda/resources/word`, `broadcast` param. **Excluded by design:** `common/types/*` (pure domain layer — importing utils would create a circular dep) and DOM refs (`RefObject<T | null>`), `querySelector` returns, article snippets, tests, and the `CellRenderingDefaults` demo (null is meaningful demo data).
- [x] `Nullish<T> = T | Nil` — migrated `Predicate.spec.ts` (`(string | null | undefined)[]` → `Nullish<string>[]`) and `Accessor.tsx` (`HTMLElement | null | undefined` → `Nullish<HTMLElement>`). `src/articles/StoppingTestEntropy/codeSnippets.ts` left as-is: it's a public-facing article snippet whose readers don't know these internal types — do NOT inject generics there.
- [x] Overlap check — **`common/types/*` cannot use the nullish family** (pure domain layer, no `common/utils` dependency; utils already imports `@common/types` → circular risk). Generic nullish types belong to util + feature layers only.

**Truthiness**

- [x] `Falsy` — correctly used (`Predicate.ts` `isFalsy`). No inline `false | 0 | '' | null | undefined` unions. Nothing to migrate.
- [x] `Truthy<T>` — correctly used (`Predicate.ts` `isTruthy`). No inline `Exclude<T, Falsy>` re-implementations. Nothing to migrate.

**Primitives**

- [x] `Primitive` — correctly used (`Predicate.ts` `isPrimitive` → `Nullish<Primitive>`). No inline primitive-union re-implementations. Nothing to migrate.

**Objects**

- [x] `Dictionary<T> = Record<string, T>` — migrated (Group 1). Bare `Dictionary` = `unknown` default (collapse for brevity). Went wide: `common/utils` (AccessGuard.types, Query/Key+Query, Path), `common/ux` (Button, Code.theme, Form.types, Modal, TableFilterPanel, Test/Accessor, Test/Page.mocks), server (`activity`, `like`, `visit`, `resources/word`, `wda/types` Sessions), `src` (setupTests, references, Categories.types+colors, BreakdownTable.filters, WebsiteStats, Tables.config, BlogFilter, ProjectFilter, WDA ApiPaths/Navigation/Words, ApiRoutes, ZIndexLayers, LetterWheel.hooks). Excluded: Table family `Record<string, ReactNode>` generic constraints, `common/types/*`, `Predicate.ts` type-guard `Record<string, unknown>`.
- [x] `AnyObject` — defined; zero consumers, no inline `Record<PropertyKey, unknown>` equivalents. Nothing to migrate.
- [x] `EmptyObject` — defined; zero consumers, no inline `Record<never, never>` equivalents. (`common/types` `Record<string, never>` is a different type + domain layer — skip.) Nothing to migrate.
- [x] `Emptiable` — correctly used (`Predicate.ts` `isNonEmpty`); `isEmpty` takes `unknown` (wider guard, intentional). No inline duplication. Nothing to migrate.

**Arrays**

- [x] `Arrayable<T>` — defined but unconsumed; no inline `T | T[]` re-implementations. Nothing to migrate.
- [x] `ReadonlyArrayable<T>` — defined but unconsumed; no inline equivalents. Nothing to migrate.
- [x] `NonEmptyArray<T>` — defined but unconsumed; no inline `[T, ...T[]]` re-implementations. Nothing to migrate.

**Functions**

- [x] `AnyFunction` / `VoidFunction` / `AsyncFunction` — defined-but-unconsumed; no inline equivalents. Nothing to migrate.
- [x] `Predicate<T>` — migrated 2 inline `(x) => boolean`: `AccessGuard.types` (`Predicate<AccessMap>`), `Table.types` `filter` (`Predicate<unknown>`). Left 4 Table `(meta: CellMeta<...>) => boolean` props as Table-family churn (convertible to `Predicate<CellMeta<TData,TContext>>` if wanted).
- [x] `TypeGuard<T, S>` — defined-but-unconsumed; no inline equivalents. Nothing to migrate.

**Promises**

- [x] `Awaitable<T>` — defined-but-unconsumed; no inline `T | Promise<T>`. Nothing to migrate.

**Object helpers**

- [x] `ValueOf<T>` — defined-but-unconsumed; no inline `T[keyof T]`. Nothing to migrate.
- [x] `Key<T>` — defined-but-unconsumed; no inline equivalents. Nothing to migrate.
- [x] `KeysOfType<T, V>` — defined-but-unconsumed; no inline equivalents. Nothing to migrate.
- [x] `Merge<A, B>` — defined-but-unconsumed; no inline `Omit<A, keyof B> & B`. Nothing to migrate.

**Property modifiers**

- [x] `PartialBy<T, K>` — defined-but-unconsumed; no inline `Omit<T,K> & Partial<Pick<T,K>>`. Nothing to migrate.
- [x] `RequiredBy<T, K>` — defined-but-unconsumed; no inline `Omit<T,K> & Required<Pick<T,K>>`. Nothing to migrate.

**Deep helpers**

- [x] `DeepPartial<T>` — defined-but-unconsumed; no inline deep-mapped re-impls. Nothing to migrate.
- [x] `DeepReadonly<T>` — defined-but-unconsumed; no inline equivalents. Nothing to migrate.
- [x] `DeepMutable<T>` — defined-but-unconsumed; no inline equivalents. Nothing to migrate.

**Optional / Required keys**

- [x] `OptionalKeys<T>` — defined-but-unconsumed; no inline equivalents. Nothing to migrate.
- [x] `RequiredKeys<T>` — defined-but-unconsumed; no inline equivalents. Nothing to migrate.

**Utility**

- [x] `AtLeastOne<T>` — defined-but-unconsumed; no inline equivalents. Nothing to migrate.
- [x] `Brand<T, Name>` — defined-but-unconsumed; no inline equivalents (the `Brand` prose hits are unrelated). Nothing to migrate.

**Generic types outside `Generics/`** (also audit)

- [x] `common/types`: `TypedRequest`, `TypedResponse`, `PaginatedResponse` — domain-layer types; left as-is (they cannot import `common/utils`; layering constraint).
- [x] `common/utils/Browser/useIsVisible.ts`: `VisibilityEntry` — reviewed; fine, no generic-family inline duplication.
- [x] `common/utils/Query/mergeStatus.ts`: `MergedApiStatus` — `Nullable<TError>` applied. Good.
- [x] `common/utils/Url/Codecs/Codecs.types.ts`: `UrlEncode`, `UrlDecode`, `Codec` — reviewed; correctly compose `Optional`/`Nullish` already.
- [x] `common/ux/Table` types — Table family: `Record<string, ReactNode>` constraints + `(meta: CellMeta) => boolean` props intentionally left (high-churn, no real win); `Optional<CellVariant>` + `Predicate<unknown>` applied.
- [x] `common/ux/Test/Server`: `MockBuilderType`, `RequestBuilderResult` — reviewed; fine.

**Cross-cutting audit patterns**

- [x] Inline `T | null | undefined` / `| undefined` / `| null` vs Nullish family — DONE (Optional/Nullable/Nullish migrations; `common/types` excluded by layering).
- [x] Inline `Record<string, X>` / `{ [k: string]: X }` vs `Dictionary` — DONE (~30 files); Table constraints + `common/types` excluded.
- [x] Inline `(x) => boolean` vs `Predicate` — DONE (2 migrated); Table `(meta)=>boolean` + article snippets left.
- [x] Inline `T | T[]` vs `Arrayable` — DONE; zero inline forms exist.
- [x] Inline deep-`Partial<…>` vs `DeepPartial` — DONE; zero inline deep-mapped re-impls exist.
- [x] Manual `Exclude`/`Omit`/`Partial` compositions vs `Merge`/`PartialBy`/`RequiredBy` — DONE; zero inline re-impls exist.
- [x] Any type re-declaring a generic that already exists in `Generics/` — none found. Audit complete.

**Extract only genuine recurring gaps**

- [x] Add a new util/type + exhaustive spec only if a bespoke impl recurs 2–3+ times with no covering helper — decided: **none extracted**. Every candidate either had a covering generic (migrated) or insufficient recurrence. E.g. `(...args: unknown[]) => boolean` recurs only once in live code (other hit is an article snippet) — not worth a new type.
- [x] New helpers: en-GB spelling, PascalCase namespace, documented role suffixes, JSDoc + spec — N/A (no new helpers added).

**Util-folders sweep** — audit each `common/utils/*` namespace for inline re-implementations across FE + server; replace with the canonical helper. Report per-pattern before editing.

> Inventory of namespace public APIs:
>
> - `Arrays`: `shuffleArray`, `times`
> - `Booleans`: `Optional.toString`, `Optional.toBoolean`
> - `Numbers`: `Counter`, `truncateTo`, `Optional.toNumber`, `Optional.toString`
> - `Objects`: `fromEntries`, `pick`, `shallowEqual`
> - `Strings`: `Optional.trim`, `Optional.toUndefined`
> - `DateTime`: `Formats`, `Units` (e.g. `Ms.fromSec`), `Format` (ms/parse/to)
> - `Url`: `Codecs`, `Params.build`
> - `Browser`: `copyToClipboard`, `isLocalhost`, `slugify`, hooks
> - `Predicate`: large set (isDefined/isNull/isEmpty/isTruthy/hasLength/isNonEmpty/…)
> - `Transformer`: `BaseTransformer`

- [x] `Arrays` — all `shuffleArray`/`times` uses already correct (times swept earlier). **Extracted new `Arrays.random`** (returns `Optional<T>`, `undefined` on empty via `Predicate.isEmpty`) + spec — the `arr[Math.floor(Math.random()*length)]` random-pick recurs 3× (hint, level, typist) with no covering util. Migrated all 3 sites (hint → direct; level → `?? null`; typist → `?? ''`).
- [x] `Arrays` (`includesAll`) — **rejected for Arrays**: the subset check `A.every((x) => B.includes(x))` is a _predicate_ (returns boolean), so it belongs in **`Predicate.includesAll`** (done in the `isOneOf` row).
- [x] `Arrays` (`unique`) — **extracted `Arrays.unique<T>(array): T[]`** (transformer) + spec, migrated `Array.from(new Set(…))` at `level.ts` + `getPossibleWords.ts`. Predicate counterpart `isUnique` already exists. Arrays namespace now `{ shuffleArray, times, random, unique }`.
- [x] `Arrays` (namespace) — now `{ shuffleArray, times, random, unique }`.
- [x] `Booleans` — audited. `toBoolean`/`toString` already used correctly (URL `Codecs.ts`). Inline `=== 'true'` sites are Express `req.query` (would need ugly casts) and DOM/test assertions (explicit clearer) — no clean wins. Left as-is.
- [x] `Numbers` — migrated `TableUrlPersistence.ts` page/pageSize: `Number(...)` + `Number.isNaN ? default : n` → `Numbers.Optional.toNumber(raw) ?? default`. Other hits were helpers' internals, `toFixed` (rounding — not truncate), `parseInt` clamping (different semantics) — no migration.
- [x] `Objects` — audited. `pick`/`shallowEqual` used correctly, no inline re-implementations. `TableFilterPanel` `Object.fromEntries` (2×) don't need the `as` cast the helper centralizes — no benefit, left.
- [x] `Strings` — audited. `trim`/`toUndefined` used correctly (URL Codecs). Inline `.trim()`/`|| undefined` sites are different operations (keep trimmed string, or a `replace` transform) — no clean fit, left. **Extracted new `Strings.equalIgnoreCase(a,b)` + `Strings.includesIgnoreCase(text,search)`** + spec: the case-insensitive idioms `X.toLowerCase() === Y.toLowerCase()` (Nav.utils, Projects.selectors) and `X.toLowerCase().includes(Y.toLowerCase())` (typist routes, Tables.demos) recur 2× each — migrated all 4 sites (server typist uses subpath `@common/utils/Strings/Strings`).
- [x] `DateTime` — audited. `Units.Ms*` (sec→millis) not re-implemented inline; `Date.now()/1000` sites are the inverse (millis→sec, uncovered) or scoring/visual math — no fit, left.
- [x] `Url` — extracted **`Url.Params.toQueryString`** (`Optional<Dictionary<string>>` → `?a=1&b=x+y` or `''`, pure) + spec (empty object, undefined, empty-string value, zero, encoding). Migrated same 2× pattern in WDA `ApiPaths.ts` + `Navigation.ts`. No `URLSearchParams` mutation violations found.
- [x] `Predicate` — inline null/empty/truthy/type checks → predicate fns. Predicate-by-predicate below.

**`Predicate` sub-sweep — predicate → expression map (tick per expression)**

Work through each predicate. For each expression form, grep FE + server with a **loose regex** (match the operator, not a specific variable name — e.g. `!= null`, not `x != null`). Migrate where the predicate adds narrowing/consistency value; leave idiomatic coercions / guard-clauses / article snippets / test DOM idioms.

**`isDefined`** (not null AND not undefined)

- [x] `!= null` — DONE. Migrated: `Query.ts` `clean()`, `Grid.tsx` (5×), `hint.ts` `.filter(isDefined)`, `Accessor.tsx` Has-proxy. Remaining: `Predicate.ts` internal, `codeSnippets.ts` article snippet (both left).
- [x] `!== null &&` … `!== undefined` (no external occurrence)
- [x] `!== undefined &&` … `!== null` (no external occurrence)
- [x] `typeof … !== 'undefined'` (no occurrence)
- [x] `typeof … === 'undefined'` (negated) (no occurrence)
- [x] `.filter(… => …)` removing null/undefined entries (none left — `hint.ts`/`Query.ts` already migrated)
- [x] `.filter(Boolean)` — class-name idiom, excluded by design

> **isDefined CAUTION:** `Link.tsx` `props.to !== undefined` left as-is — `isDefined(props.to)` broke TS discriminated-union narrowing on `LinkProps` (`LinkAsRouter | LinkAsAnchor`); the inline `!== undefined` narrows correctly, the custom guard doesn't. Migrated in: `Query.ts`, `Grid.tsx` (5×), `hint.ts`, `Accessor.tsx`, `Loading.tsx`, `Region.tsx`, `Section.tsx`.
>
> **NEW predicate added (DRY-extremum): `Predicate.isNullish`** (`value is Nil`) + spec. Migrated `Format.ts` nullish guard (`value === undefined || value === null` → `isNullish(value)`). Companion to the `Nullish<T>`/`Nil` types.

**`isUndefined`** (strictly undefined)

- [x] `=== undefined` — sites: `Predicate.ts` internals + `codeSnipets.tsx` article snippet (skip) + `Format.ts` (now `isNullish`). Nothing to migrate.
- [x] `typeof … === 'undefined'` — no occurrence.
- [x] `void 0` — no occurrence.

**`isNull`** (strictly null)

- [x] `=== null` — sites: helpers' internals, `Storage` sentinel, demos (display), tests — no narrowing-value migration.
- [x] `== null` (nullish) — now covered by `isNullish` (migrated `Format.ts`); `TableSlots`/internal `== null` left (flatten/guard idioms).

**`isTruthy`**

- [x] `Boolean(` — all are coercions (React `enabled`/`disabled`/`checked`/`show`, flags) or Joi/yup `.boolean()`; no narrow-guard use → nothing to migrate.
- [x] `!!` — coercions/class-name filters only → nothing to migrate.
- [x] `.filter(… => …)` truthiness — no `.filter(isTruthy)`-style narrowing site → nothing to migrate.

**`isFalsy`**

- [x] `!` guards (`if (!`, `return !`) — idiomatic guard clauses (catch `0`/`''` too); `isFalsy` adds no narrowing value → nothing to migrate.
- [x] ternary falsy-branch `? … : …` — coercion-style; nothing to migrate.

**`isBoolean`**

- [x] `typeof … === 'boolean'` — only `TableSlots` ReactNode stack (Table family, `typeof` clears) + `Predicate.ts` internal → nothing to migrate.
- [x] `typeof … !== 'boolean'` — no occurrence.

**`isNumber`**

- [x] `typeof … === 'number'` — only `TableSlots` ReactNode stack (left, Table family) + `Predicate.ts` internals → nothing to migrate.
- [x] `typeof … !== 'number'` — no occurrence.
- [x] `isNaN(` — `DateInput.utils` parses ints; NaN-guard, not `isNumber` (which tests `typeof`) → left.
- [x] `Number.isNaN(` — `Numbers.Optional.toNumber`/`toString` internals only → nothing to migrate.

**`isString`**

- [x] `typeof … === 'string'` — migrated `Format.ts` + `Page.tsx`; remaining `TableSlots` ReactNode stack left (Table family).
- [x] `typeof … !== 'string'` — no occurrence.
- [x] `typeof … != 'string'` — no occurrence.

**`isFiniteNumber`**

- [x] `Number.isFinite(` — only `Predicate.ts` internal → nothing to migrate.
- [x] `isFinite(` — no occurrence.
- [x] `typeof … === 'number' && !Number.isNaN(` — no occurrence.

**`isArray`**

- [x] `Array.isArray(` — `Predicate.ts` internals + `Objects/pick.ts` + `TableSlots`; native `Array.isArray` is the clearer narrowing form (same named alias) → nothing to migrate.
- [x] `instanceof Array` — no occurrence.
- [x] `toString.call(…) === '[object Array]'` — no occurrence.

**`isObject` / `isPlainObject`**

- [x] `typeof … === 'object' &&` … `!== null` — all `Predicate.ts` internals; `Grid.tsx` `isResponsive` is a feature-specific `'base' in` discriminator (needs the `in` too) → nothing to migrate.
- [x] `typeof … === 'object' &&` … `!= null` — no occurrence.
- [x] `Object.getPrototypeOf(…) === Object.prototype` — no occurrence.
- [x] `toString.call(…) === '[object Object]'` — no occurrence.

**`hasLength`** (non-empty length)

- [x] `.length > 0` — sites are render conditions (`ContentNavigator`), fallback (`typist` wordPool), test idiom (`Page` mock) — `isNonEmpty`/`hasLength` offer no narrowing value at these; left.
- [x] `.length >= 1` — `SubmenuBasis` `submenuStack.length >= 1` ⟺ non-empty → migrated to `isNonEmpty(submenuStack)`. (`MobileMenu` `menuStack.length > 1` is depth-≥2, NOT non-empty — left.)
- [x] `.length !== 0` — no occurrence.

**`isEmpty` / `isNonEmpty`**

- [x] `.length === 0` — migrated: `hint.ts`, `ContentNavigator` (elements/els/headings), `wda/level.ts`, `LevelCreatorModal` (×2), `LetterWheel`, `SolutionBoard`, `TableCheckbox`, `BreakdownPreview`. Left: `Contact.schema`/`LevelCreator.schema` (Joi/yup validators — schema domain, `val.length >= 10` etc.), `Predicate.ts` internals.
- [x] `.length < 1` — no occurrence.
- [x] `.length > 0` (→ `isNonEmpty`) — migrated: `ContentNavigator` (svgHeight, render guards), `typist` wordPool, `ColumnCustomization` (`Object.keys(...).length > 0` → `isNonEmpty(colWidths)`). Left: `Test/Page` → migrated `isNonEmpty(mock.calls)`.
- [x] `.length >= 1` — migrated `SubmenuBasis` → `isNonEmpty`; `MobileMenu` `> 1` is depth-≥2, no fit (left).
- [x] `Object.keys(…).length === 0` — `Predicate.ts` internal only.
- [x] `.size === 0` (Set/Map) — `Predicate.ts` internal only.

**`hasProperty`**

- [x] `'…' in …` — ANTI-MIGRATION: every site is discriminated-union narrowing (`mergeStatus`, `Queries`, `Link`, `TableDownload`, `RequestBuilder`, spec) relying on TS `in`-narrowing that `hasProperty` (plain boolean guard) would lose; plus feature-detect (`'clipboard' in navigator`) and feature-discriminators (`Grid` `'base' in`) — all left.
- [x] `Object.prototype.hasOwnProperty.call(` — no occurrence.
- [x] `.hasOwnProperty(` — no occurrence.

**`hasValue`** — sync: `hasValue` is a _contains-value_ predicate (`.includes`/`.has`/`Object.values`), NOT the `obj[k] !== undefined` presence pattern. Those expression forms were already swept under `isDefined` (`[…] !== undefined`, `[…] != null`) and `hasProperty` (`in … && …[`). No genuine inline `Object.values(…).includes(…)` / `Map`/`Set` value-dup sites (only the predicate def itself).

- [x] `[…] !== undefined` — already swept under `isDefined` (no dup).
- [x] `[…] != null` — already swept under `isDefined` (no dup).
- [x] `'…' in … && …[` presence — already swept under `hasProperty` (discriminated-union anti-migration).

**`isOneOf`**

- [x] `.includes(` on literal/typed arrays — idiomatic inline `.includes`/Set/Map `.has` left as-is (no narrowing/DRY value in wrapping); the **subset** idiom `A.every((x) => B.includes(x))` recurs **2×** (`AccessGuard.utils:12`, `TableCheckbox.selectors:39`) → **extracted `Predicate.includesAll(required, available)`** (NOT Arrays — it's a predicate) + spec, migrated both sites. ✅ DONE.
- [x] `indexOf(…) !== -1` — **no source sites** (only `public/` build source-maps). No migration.
- [x] `=== … || === …` equality chains — no source sites in this sweep; enum/status equality chains already reviewed under earlier predicates. No migration.

**`isEqual` / `isShallowEqual`**

- [x] `JSON.stringify(…) === JSON.stringify(…)` — **no source sites** (only the doc row itself). No migration.
- [x] `Object.keys(…).every` — only `common/utils/Objects/shallowEqual.ts` (the impl of `shallowEqual` itself). No migration.
- [x] manual deep-compare loop — no occurrence found.

**`isUnique`**

- [x] `new Set(…).size === …` — no source sites (only `Predicate.ts` `isUnique` impl).
- [x] `new Set(…).size !== …` — no source sites. **Transformer note**: the **unique-ify** idiom `Array.from(new Set(…))` recurs 2× (`level.ts`, `getPossibleWords.ts`) → **extracted `Arrays.unique<T>(array): T[]`** (a _transformer_, returns array — the boolean `isUnique` predicate already exists) + spec, migrated both sites. ✅ DONE.

**`isDate` / `isError` / `isRegExp`**

- [x] `instanceof Date` — no source sites outside `Predicate.ts` def itself. No migration.
- [x] `instanceof Error` — no source sites; `WebsiteStats` `instanceof AxiosError` is `isInstanceOf`-shaped (a specific subclass, not `isError`), left.
- [x] `instanceof RegExp` — no source sites outside def. No migration.

**`isPromise` / `isThenable`**

- [x] `instanceof Promise` — no source sites (only def + `Promise.resolve` in tests/mocks/articles). No migration.
- [x] `typeof …?.then === 'function'` — no source sites. No migration.
- [x] `typeof ….then === 'function'` — no source sites. No migration.

**`isAll` / `isAny`**

- [x] `.every(` with a predicate-naming callback — `mergeStatus`/`Queries.utils` `.every`/`.some` are discriminated-union (`'isLoading' in status`) ANTI-migrations; others are single-use idiomatic closures (Blog/Projects Set-presence, TableBody optional-call, typist compound) with no DRY value. No migration.
- [x] `.some(` with a predicate-naming callback — same as above; no migration.
- [x] predicate-array passed to combined check — no occurrence.

- [x] `Browser` / `Transformer` — migrated 2 `isLocalhost` re-implementations → `Browser.isLocalhost`: `Navigation.ts` (manual hostname check → `Browser.isLocalhost(hostname)`) and `ApiPaths.ts` (removed private dup method, 3 call sites → `Browser.isLocalhost()`). `Transformer` (BaseTransformer) used correctly. Left `InvitationModal` direct `clipboard.writeText` (helper would add a fallback — not a pure refactor).
- [x] Re-grep for any remaining hand-rolled patterns per namespace — final pass covered: `indexOf`/`JSON.stringify`/`Object.keys.every`/`instanceof Date/Error/RegExp/Promise`/`typeof .then` (all no-sites); case-insensitive equality/includes (extracted → `Strings.*`); `Math.floor(random)` (covered by `Arrays.random`); string/array `.slice`/`.substring`/`.padStart`/`charAt` are single-use idioms or `public/` bundles, no dups. Remaining `.every/.some` are discriminated-union anti-migrations. Sweep complete except Verify.

**Verify**

- [x] Run full test suite; confirm behaviour unchanged

## 10. Related docs / links

- [`0001-table-filter-persistence.md`](./0001-table-filter-persistence.md) — introduced `Arrays.times`, `Objects.shallowEqual`; this ticket follows from it.
- Template: [`0000-doc-template.md`](./0000-doc-template.md)
