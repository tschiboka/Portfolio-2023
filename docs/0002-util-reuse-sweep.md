# 0002 — Util Reuse Sweep

> **Status:** Planned
> **Last updated:** 2026-08-21
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

| File                                                                                                                                                            | Role                                                    |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `common/utils/Arrays/Arrays.ts`                                                                                                                                 | Already has `Arrays.times` (from `0001`); sweep target. |
| `common/ux/Table/Table.utils.ts`, `TableSkeleton/TableSkeleton.tsx`, `common/ux/Form/DateInput.tsx`, `common/ux/ContentNavigator/ContentNavigator.selectors.ts` | Known `Array.from({length})` sites.                     |
| `src/…/UxStories/…/Layouts.tsx`, `Tables.mocks.ts`                                                                                                              | Demo-side `Array.from({length})` sites.                 |
| `server/projects/typist/routes.ts`                                                                                                                              | Server-side site.                                       |
| Any added util + `tests/*.spec.ts`                                                                                                                              | New helpers (only when warranted).                      |

## 8. Open questions

- Which utils best match each recurring pattern (to be decided during the audit)?
- Whether the public project bundles (`public/projects/**`) should be swept or left — likely out of scope
  if they are standalone/static builds.

## 9. Feature dev checklist

**Arrays.times migration**

- [ ] `common/ux/Table/Table.utils.ts`
- [ ] `common/ux/Table/TableSkeleton/TableSkeleton.tsx`
- [ ] `common/ux/Form/DateInput.tsx`
- [ ] `common/ux/ContentNavigator/ContentNavigator.selectors.ts`
- [ ] `src/…/UxStories/…/Tables.mocks.ts`
- [ ] `server/projects/typist/routes.ts`
- [ ] Re-grep for any remaining `Array.from({ length` sites

**Utils / generic-types audit**

- [ ] Inventory `common/utils/*` and `common/utils/Generics/*`
- [ ] Audit FE + server for inline re-implementations
- [ ] Replace with existing helpers; extract new ones (with specs) only for recurring gaps
- [ ] Run full test suite; confirm behaviour unchanged

## 10. Related docs / links

- [`0001-table-filter-persistence.md`](./0001-table-filter-persistence.md) — introduced `Arrays.times`, `Objects.shallowEqual`; this ticket follows from it.
- Template: [`0000-doc-template.md`](./0000-doc-template.md)
