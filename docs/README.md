# Docs

Internal engineering notes and feature plans for this project.

> **Public.** This folder is tracked in version control and published to GitHub.
> Before committing anything here, **always check what you share** — never include
> secrets, credentials, API keys, private links, or personal/sensitive data.
> See the Sharing note below.

## 1. Index / How to use

- Each notable piece of work gets its own Markdown file at the top of this folder.
- Documents are numbered (`NNNN-...`) for ordering and stable references.
- Start here — this `README.md` is the entry point listing everything below.

---

## 2. Docs index

The full list of feature docs (ID, document, topic, status, created, last updated) lives in
**[`INDEX.md`](./INDEX.md)** — this keeps the README short regardless of how many docs we add.

A blank template to copy for new features: **`docs/0000-doc-template.md`**.

See the [INDEX](./INDEX.md) for the current list.

---

## 3. Guidelines

1. Keep each feature doc self-contained and follow the **Feature doc template** below.
2. Use the `NNNN-` prefix for deterministic ordering.
3. **Number all headings** (e.g. `## 1.`, `## 2.`, …) in feature docs and this README.
4. **Register each doc in [`INDEX.md`](./INDEX.md)** with columns: ID, document, topic, status,
   created, last updated. Update status / last updated there as the doc changes.
5. This folder is **public** — before committing, always check what you share:
   no secrets, credentials, API keys, private URLs, or personal/sensitive data.
   If a note is sensitive, keep it out of `docs/` entirely (e.g. in local-only scratch
   or a password manager) rather than committing it here.

## 4. Feature doc template

A ready-to-copy template lives in **`docs/0000-doc-template.md`**. Each numbered feature doc
(`docs/NNNN-<topic>.md`) should contain:

- **Title** — short, descriptive.
- **Description** — what the feature is and why.
- **Status & last updated** — e.g. `Idea → Planned → In progress → Done / Abandoned`, plus date.
- **Feature scope** — what's in scope (and, optionally, what's explicitly out of scope / non-goals).
- **Plan** — approach/step-by-step for implementation.
- **Other solutions / options** — alternative approaches considered, if any.
- **Pros / Cons** — trade-offs of the chosen approach (and of alternatives).
- **Decisions & rationale** — "decided X because Y" notes to lock in choices.
- **File map** — files/components touched or introduced.
- **Open questions** — unresolved items to resolve later.
- **Feature dev checklist** — a working checklist of what's done / to build / to test.
  This grows and changes as the feature is written; it's for bookkeeping.

Not every section is mandatory on day one — a new idea may start with just
title/description/scope and fill in the rest as it develops. Small fixes and one-off
chores do **not** need a doc.

## 5. Session log

Running log of what's been done and where to pick up next. Per-feature detail lives in the
feature docs (e.g. [`0001-table-filter-persistence.md`](./0001-table-filter-persistence.md)).

**2026-08-12** — **React 19 upgrade** (react/react-dom `^19`, `@types/react`/`@types/react-dom` `^19`,
`@testing-library/react` `^16`, `react-share` `^5.3`) + fixed all React 19 type-migration errors
(nullable refs `RefObject<T | null>`, removed global `JSX` namespace, `useRef` initial arg, `props as
unknown`, stale filter import). Wired `useTableUrlPersistence` into `useTableController` (seed from URL
on mount + single `commit` persist), consolidated controller to one `TableState` + `commit` helper, moved
defaults to `useTableController.defaults.ts`, added `useTableController` spec. Pick up here next: add
`useTableUrlPersistence` hook tests (need `MemoryRouter`) and wire `BreakdownTable` pilot.

**2026-08-02** — Split filter definitions out of the controller into `common/ux/Table/TableFilterConfig/`,
moved URL persistence into `common/ux/Table/TableUrlPersistence/`, added `Objects.fromEntries`/`pick`
(+ `Key<T>` generic) with tests, rewired imports. Pick up here next: **wire `useTableUrlPersistence` into
`useTableController`** (the hook exists but isn't called yet — table state is local-only), then add
controller tests.
