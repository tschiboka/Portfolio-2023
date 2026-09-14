# 0006 — FE file structure sweep

> **Status:** In progress — alias migration, server restructure, asset distribution, `common/` impurity sweep, shared-components sweep, `routing/` dissolve + feature-route pattern, `context/` dissolve, app-page de-default done (2026-08-31); **individual file review (next step, §11.16) — rubric finalized (§11.16.2), review in progress** + query conventions / umbrella naming / `Date`→ISO types settled (§11.16.5); `Contact.query.ts` and `Session.query.ts` still to rebuild
> **Last updated:** 2026-09-12
> **Created:** 2026-08-29

---

## 1. Description

The frontend currently implements the documented Feature-driven architecture
(`ARCHITECTURE.md` §1) **only partially and inconsistently**. The newer,
data-dense features (`common/ux/*`, `API/Categories`, `Projects`,
`API/Index/WebsiteStats/BreakdownTable`, `Misc/Xmas2025`) follow the convention
well; the legacy portfolio pages and most raw `API/*` leaves predate it and
deviate across four axes:

1. **Structure** — no `Feature/`-folder discipline; pages live under
   `src/components/pages/`, generic components under both
   `src/components/sharedComponents/` and `src/sharedComponents/`, missing
   `index.ts` barrels; a near-duplicate empty `src/sharedComponents/Article/`.
2. **Feature vs common placement** — components that are clearly generic
   (`Figure`, `Clock`, `Overlay`, `LoadingIndicator`, `Toggle`, ...) sit in
   `src/components/sharedComponents/` instead of `common/ux/`, blurring the
   "feature vs shared" boundary.
3. **File-role conformance** — ad-hoc suffixes not in the documented role set
   (`Blog.type.ts`, `*.utils.ts`, `*.styles.*`, `*.context.tsx`, `*.filters.ts`,
   `*.controller.ts`, `*.handlers.ts`, `*.reducer.ts`, `*.code.ts`), plus
   singular/plural drift (`*.query.ts` vs documented `*.queries.ts`).
4. **Return-value naming** — role files do not consistently export a symbol
   named after the feature+role. Server convention is canonical
   (`Feature.schema.ts` → `export const FeatureSchema = { schema, validate }`),
   but FE files drift to lowercase camelCase (`contactSchema`), bare arrays
   (`activityColumns`), default exports (`export default Contact`), and mixed
   constants-in-schema-files.

Scope of this ticket: **measure, decide, and (partially) execute** a sweep that
brings the FE in line with the documented architecture — moving/renaming files
to represent features, relocating generic components to `common/ux/`, enforcing
role-suffix discipline, and normalising return-value naming.

## 2. Feature scope

**In scope**

- **Source-of-truth audit** (this document): a full map of the current FE
  structure and a definitive verdict on every deviation (see §3).
- **Generic-component relocation**: move reusable components that live in
  `src/components/sharedComponents/` (and `src/sharedComponents/`) into
  `common/ux/` where they are generic, or into a feature folder where they are
  feature-specific. Delete the empty `src/sharedComponents/Article/` duplicate.
- **Role-suffix conformance**: rename ad-hoc suffixes to sanctioned ones, or
  fold the code into an existing sanctioned role. Document any role genuinely
  missing from `ARCHITECTURE.md` before adding it.
- **Return-value naming**: enforce `Feature<Role>` naming on role files
  (e.g. `.columns` → `FeatureColumns` / `Feature.columns`, `.schema` →
  `FeatureSchema`), aligned with the server convention.
- **Barrels**: add `index.ts` barrels to feature folders.
- **FE `App` composition root**: introduce `src/App.tsx` that owns the provider
  stack + `RouterProvider` + `VersionChecker` (currently inline in `main.tsx`),
  mirroring the server's `server/App/App.tsx`. `main.tsx` becomes a thin
  `createRoot().render(<App/>)`. Gives the app-level scaffolding a proper home
  instead of `components/sharedComponents/`.
- **Update `ARCHITECTURE.md`** with any role/suffix conventions that are
  deliberately adopted as a result of the sweep.

**Out of scope / non-goals**

- No behavioural/UI changes. Purely structural relocation and renaming.
- No change to `common/utils/`, `common/types/`, `common/queries/` content
  (only re-imports if paths move).
- No server (`server/`) restructuring — the server already follows the
  convention; it is only the FE that drifts.
- No documentation/ticket work beyond `0006` (feature docs and `INDEX.md` are
  only touched if a file moves).

## 3. Plan

### 3.0 Verify the map (first step)

- Re-confirm the tree in §7 with a fresh `file_search`/`Get-ChildItem` (memory
  note: editor diagnostics can lag after moves — always verify against the real
  FS).
- Confirm the routing layer's interface with `src/routing/*` so renames don't
  break `routes.tsx` (which paths does it import? default vs named?).

### 3.1 Decide the target layout

Adopt the documented layout as the target:

```text
src/
├── App.tsx                   # NEW composition root (provider stack + router + VersionChecker)
├── main.tsx                  # thin: createRoot().render(<App/>)
├── features/
│   ├── portfolio/
│   │   ├── pages/            About  Blog  Contact  Home  PrivacyPolicy  UnderConstruction
│   │   │                     (+ blog-card/filter UI: BlogCard, BlogFilter, SuggestedArticles, ...)
│   │   └── blogs/            # the blog ARTICLES (data/content), moved from src/articles/
│   │       ├── articles.ts   (registry)
│   │       ├── references.ts
│   │       └── <ArticleName>/  (each article folder)
│   ├── api/                  Login  Register  Admin  Categories  EmailVerification  WebsiteStats/...
│   └── projects/             Projects  Gym  Typist  WordDuelArena  Xmas2025
├── routing/
├── context/
└── (generic components go to common/ux/)
```

Remaining open decisions for confirmation (§8):

- Keep `Nav/` under `src/components/` or move it into `common/ux/Nav/`?

### 3.2 Relocate generic components

Identify each `src/components/sharedComponents/*` folder against
`common/ux/`:

| Candidate                                                                                                                                      | Verdict                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `Figure`, `Clock`, `Overlay`, `LoadingIndicator`, `Toggle`, `Pill`-like                                                                        | **Generic** → move to `common/ux/`                                        |
| `AchievementList`, `BlogCard`, `BlogTimeStamp`, `SuggestedArticles`, `InlineReference`, `References`, `Disclaimer`, `ShareMenu`, `ZoomedImage` | Feature/local — keep in feature or document as feature-local under a page |
| `Logo`, `Footer`, `PageSideMenu`, `Screen`, `RouteError`, `VersionChecker`                                                                     | Layout/app-level — decide placement                                       |

Merge `src/sharedComponents/Article/` with `src/components/sharedComponents/Article/`;
delete the empty duplicate.

### 3.3 Normalise role suffixes

Rename to sanctioned suffixes (`ARCHITECTURE.md` §1.2):

- `Blog.type.ts` → `Blog.types.ts`
- `*.query.ts` → `*.queries.ts` (Contact, Admin, EmailVerification, Login,
  Register)
- `*.styles.scss`/`*.styles.css` → decide one convention (`.scss` plain, per
  legacy, or `.styles.*` per new features) and document it; flagged decision
  (§8).
- `*.utils.ts` → keep under `.utils` only if `.utils` is added to the allowed
  role set; otherwise fold into an allowed role.
- `*.filters.ts`/`*.controller.ts`/`*.handlers.ts`/`*.reducer.ts`/`*.context.tsx`
  → verify against allowed set; add only with doc update.
- `ExerciesesSection` → `ExercisesSection`; `codeSnipets.ts` → `codeSnippets.ts`;
  `RactAnatomy.tsx` → `ReactAnatomy.tsx` (folder/export match).

Not every role needs a file — remove files only if truly dead.

### 3.4 Normalise return-value naming

Align role-file exports with the `Feature<Role>` convention:

- `.schema.ts` → `export const FeatureSchema = { schema, validate }` (mirror
  server; FE yup schemas stay in a `schema` member). Convert `contactSchema` /
  `xmasSchema` / `categoriesSchema` accordingly.
- `.columns.(ts|tsx)` → `export const FeatureColumns: TableColumns<T>` (e.g.
  `BreakdownTableColumns`; today it is `activityColumns`).
- `.types.ts` → keep named domain types; adopt `FeatureTypes` namespace only if
  decided (open question).
- `.queries.ts` → keep `useX` hooks (already conventional).
- Main file → `export const Feature` (named), not `export default` (About,
  Contact, Home, PrivacyPolicy, UnderConstruction, Categories, Xmas2025,
  Register, Login, ...).
- `Blog.tsx` → export `Blog` (not `Blogs`).

### 3.5 Add barrels

- Add `index.ts` to every feature folder missing one (About, Home, Blog,
  Contact, PrivacyPolicy, UnderConstruction, Login, Register, Admin,
  EmailVerification, Xmas2025, Typist, Gym, ...), re-exporting the public API.

### 3.6 Update `ARCHITECTURE.md`

- Add any roles adopted during the sweep to §1.2 (e.g. `.utils`, `.context`,
  `.styles`) — or explicitly reject them and note the rejection.
- Document the `.scss` vs `.styles.scss` convention once decided.

### 3.7 Verify

- Run type-check (`tsc`), lint, and the FE test suite after each batch.
- Grep for stale default-export consumers after converting to named exports.
- Update repo memory (`/memories/repo/`) with the final conventions.

## 4. Other solutions / options

- **Option A — full migration now (chosen direction).** Move everything to the
  target layout in one ticket. High churn, high regression risk, but sets a
  clean baseline.
- **Option B — greenfield-only going forward.** Leave legacy pages as-is,
  apply the convention only to new features. Zero risk but the debt stays and
  the codebase stays split.
- **Option C — layer the sweep by feature** (recommended execution order):
  do it as a sequence of small, independently reviewable per-feature moves
  (see §9 checklist), rather than one giant atomic change.

Recommendation: **C with A's target** — decide the target layout now (A), but
execute it feature-by-feature (C) so each move stays small and reviewable per
`AGENTS.md` §1.2.

## 5. Pros / Cons

**Chosen (Option A target + C execution)**

- Pros: single coherent convention; generic/components separation restored;
  per-feature batches are individually reviewable and reversible.
- Cons: many small moves still add up to a large overall diff; rename churn in
  imports; risk of transient broken imports between batches.

**Style-file naming (flagged in §8)**

- Legacy `.scss` (plain next to component) vs new `.styles.scss`. Pros of
  `.styles`: colocated, unambiguous. Cons: it is NOT in the documented role
  list — must be added to `ARCHITECTURE.md` to be legitimate.

## 6. Decisions & rationale

- **Target layout = area-grouped `src/features/` container.** Decided:
  `features/portfolio/{pages, blogs}`, `features/api/`, `features/projects/`.
  `pages/` holds UI components; `blogs/` holds the blog _article_ data/content
  (from `src/articles/`) — the two are distinct domains. Separates feature code
  from app scaffolding; `src/articles/` is folded under `portfolio/blogs/`.
  Requires documenting the area-group convention in `ARCHITECTURE.md` (§1.1
  sanctions the container; the area level is new).
- **`Feature<Role>` return naming, mirroring the server `FeatureSchema`
  convention.** Decided because the docs already prescribe it on the server and
  the FE should converge on the same contract for parity and predictability.
- **Add an FE `App` composition root.** Decided because the FE had none (stack
  inline in `main.tsx`) while the server has `server/App/App.tsx`; an `App`
  mirrors that symmetry, gives app-level scaffolding (`VersionChecker`,
  providers) a proper home, and slims `main.tsx` to a mount call.
- **Add any new role ONLY after documenting it in `ARCHITECTURE.md`.**
  Prevents re-accumulating "dump" folders; per `ARCHITECTURE.md` §1.4.
- **Generic ⇒ `common/ux/`; feature-specific ⇒ feature folder.** Per
  `ARCHITECTURE.md` §4.4.

## 7. Artifacts

### File map — current FE structure (source of truth)

**`src/components/pages/`** (feature pages)

| Feature                               | Files                                                                                                                                                       | Main export                   | `index.ts` | Deviations                                                  |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ---------- | ----------------------------------------------------------- |
| About                                 | `About.tsx`, `.scss`                                                                                                                                        | `export default`              | ❌         | default; no barrel                                          |
| Home                                  | `Home.tsx`, `tests/`, subfeatures                                                                                                                           | `export default`              | ❌         | default; no barrel                                          |
| Blog                                  | `Blog.tsx`, `.scss`, **`Blog.type.ts`**, `Blog.utils.ts`, `BlogFilter/`, `tests/`                                                                           | `export default Blogs`        | ❌         | singular `.type`; `Blogs`≠`Blog`; `.utils` unlisted         |
| Contact                               | `Contact.tsx`, `.scss`, `Contact.types.ts`, `Contact.schema.ts`, **`Contact.query.ts`**, `MessageAcknowledgement/`, `tests/`                                | `export default`              | ❌         | singular `.query`; schema = lowercase `contactSchema`       |
| PrivacyPolicy                         | `PrivacyPolicy.tsx`, `.scss`                                                                                                                                | `export default`              | ❌         | default; no barrel                                          |
| UnderConstruction                     | `UnderConstruction.tsx`, `.scss`                                                                                                                            | `export default`              | ❌         | default; no barrel                                          |
| Projects                              | `Projects.tsx`, `.types`, `.defaults`, `.selectors.tsx`, `ProjectCard/`, `ProjectFilter/`, `tests/`                                                         | `export const Projects`       | ✅         | `.selectors.tsx` extension; OK otherwise                    |
| API/Categories                        | `Categories.tsx`, `.styles.scss`, `.types`, `.schema`, `.columns`, `.queries`, `.handlers`, `.options`, `.defaults`, `.transformers`, `icons.tsx`, `tests/` | `export const Categories`     | ✅         | — (conformant — §11.16.3 rows 10–21)                        |
| API/Login, Register                   | `.tsx`, `.scss`, `.types`, `.schema`, `.query.ts` (singular), `tests/`                                                                                      | default                       | ❌         | singular `.query`                                           |
| API/Admin                             | `Admin.tsx`, `Admin.query.ts`                                                                                                                               | —                             | ❌         | singular `.query`                                           |
| API/EmailVerification                 | `.tsx`, `.scss`, `.query.ts`, `Index.tsx`                                                                                                                   | —                             | ❌         | singular `.query`; capitalised `Index.tsx`                  |
| Misc/Xmas2025                         | `.tsx`, `.styles.scss`, `.types`, `.schema`, `.queries`, `.transformers`, subfeatures, `tests/`                                                             | `export default Xmas2025`     | ❌         | `.styles.scss`; default                                     |
| Misc/Typist                           | `.tsx`, `.utils`, `.types`, `.transformers`, `.queries`, `.context`, subfeatures                                                                            | —                             | ❌         | `.context`; unlisted                                        |
| Misc/WordDuelArena                    | deep tree; `LevelCreator/`, `Home/`, `common/`, `Session/`                                                                                                  | named                         | mixed      | `.hooks`, `.handlers`, `.schema`, `.context`, `.reducer`    |
| Misc/Gym                              | `Gym.tsx`, `Gym.queries.ts`, `components/ExerciesesSection/`                                                                                                | —                             | ❌         | typo `Exercieses`                                           |
| API/Index/WebsiteStats/BreakdownTable | `.tsx`, `.types`, `.columns`, `.actions`, `.filters`, `.transformers`, `.controller`, `index.ts`                                                            | `export const BreakdownTable` | ✅         | `.filters`/`.controller` unlisted; `activityColumns` naming |

**`src/components/sharedComponents/`** (21 folders — see §3.2 for verdicts):
`AchievementList`, `AchievementListItem`, `Article`, `BlogCard`, `BlogTimeStamp`,
`Clock`, `Disclaimer`, `Figure`, `Footer` (+`Breadcrumb`), `InlineReference`,
`LikeButton`, `LoadingIndicator`, `Overlay`, `PageSideMenu`, `References`,
`RouteError`, `Screen`, `ShareMenu`, `SuggestedArticles`, `Toggle`,
`VersionChecker`, `ZoomedImage`.

**`src/sharedComponents/`** — contains only empty `Article/` (duplicate of
`components/sharedComponents/Article/`). **Delete.**

**`src/App.tsx`** — **does not exist.** Provider stack + `RouterProvider` +
`VersionChecker` are inline in `src/main.tsx`. Introduce `src/App.tsx` as the
composition root; `main.tsx` reduces to `createRoot().render(<App/>)`. Note:
`context/AppContext/App.context.tsx` is the app _context_ provider, **not** the
app root — a naming trap to resolve (rename or fold into the new `App`).

**`src/components/Nav/`** — `index.ts`, `Logo.tsx`, `menuData.tsx`, `PageNav.tsx`,
`PersonalContent.tsx`. Decision needed: generic → `common/ux/Nav/`.

**Typos to fix:** `ExerciesesSection` → `ExercisesSection`;
`codeSnipets.ts` → `codeSnippets.ts`; `RactAnatomy.tsx` → `ReactAnatomy.tsx`.

### Return-value naming examples (before → after)

```ts
// Contact.schema.ts — before
export const MAX_MESSAGE_CHARACTERS = 1000
export const contactSchema: yup.ObjectSchema<ContactFormData> = yup.object({ ... })

// after (mirror server FeatureSchema; yup specific in `schema`)
export const ContactSchema = {
    schema: yup.object<ContactFormData>({ ... }),
    // validate exposed if needed
}
```

```ts
// BreakdownTable.columns.tsx — before
export const activityColumns: TableColumns<BreakdownRow> = [ ... ]

// after
export const BreakdownTableColumns: TableColumns<BreakdownRow> = [ ... ]
```

## 8. Open questions

- **`Nav/` and app-level components (`Footer`, `PageSideMenu`, `Screen`,
  `RouteError`, `VersionChecker`)** — generic `common/ux/` or app-level
  elsewhere?
- **Style-file extension** — keep legacy plain `.scss`, or standardise on
  `.styles.scss`/`.styles.css` (requires adding to `ARCHITECTURE.md`)?
- **`.utils` / `.context` / `.filters` / `.controller`** — add to the allowed
  role set in `ARCHITECTURE.md`, or fold their content into an existing role?
- **`.types` naming** — keep bare named domain types, or adopt a
  `FeatureTypes` namespace for consistency with `FeatureSchema`?
- **Default → named exports**: confirm `routes.tsx`/`routing/*` consumers are
  updated in the same batch to avoid breakage.
- **`AppContext` naming trap** — `context/AppContext/App.context.tsx` denotes the
  app _context_, not the app _root_. Rename to `context/App/` or fold into the
  new `src/App.tsx`?

## 9. Feature dev checklist

**Blocked — verify before ticket can be ticked** (parked, runtime-only findings; see §11.15)

These are **pre-existing** WDA issues surfaced while regression-checking the app — not
regressions from this ticket's restructure (the WDA tree moved unchanged except aliases),
but they must be looked into before 0006 is marked done. Neither is code-fixable from a
static diff; both need a runtime pass.

- [ ] **WordDuelArena letter wheel — no mouse/pointer events.** The wheel attaches only
      `touchstart/move/end` + `keydown` (both HEAD and current code). Desktop mouse does
      nothing. Decision: add proper `pointer`/`mousedown/mousemove/mouseup` handling as a
      deliberate feature, or confirm touch/keyboard-only is intended. Tracked in §11.15.
- [ ] **WordDuelArena Extra Words popup — "half see-through" / background.** `ExtraWords.styles.css`
      (`rgba(0,0,0,.9)` bg, `z-index:100`, absolute full-size) and all WDA scoped vars are
      byte-identical to HEAD. The see-through render is upstream of WDA (parent stacking
      context / theme / `InteractionOverlay` interplay) and needs runtime diagnosis. Tracked in §11.15.

**Structural roles**

- [ ] Verify routing import interface before renames (§3.0)
- [ ] Move feature pages into `features/portfolio/pages/`
- [ ] Move blog article content `src/articles/` → `features/portfolio/blogs/`
- [ ] Map `Misc/*` → `features/projects/`; `pages/API/*` → `features/api/`
- [ ] Add area-group convention to `ARCHITECTURE.md` (§1.1)
- [x] Relocate generic components to `common/ux/` (§3.2)
- [ ] Delete empty `src/sharedComponents/Article/`
- [ ] Add FE `App.tsx` composition root; slim `main.tsx` (§3.1)
- [ ] Rename/fold `context/AppContext/App.context.tsx` naming trap
- [x] Resolve `Nav/` + app-level component placement (§8) — moved entire app-level shared set to `src/shared/components/` (`Nav`, `AccessGuard`, `Screen`, `Footer`, `PageSideMenu`, `ShareMenu`, `RouteError`, `VersionChecker`, `Figure`, `ZoomedImage`, `Overlay`); see §11.12
- [x] Purify `common/ux/` — remove app imports from `Page`, `AccessGuard`, `Nav`/`MobileMenu`/`SubNav`, `SearchInput` (§11.5) — done: `colors→Const`, `Toggle` in, `Nav`/`AccessGuard`/`Page` moved out
- [x] Dissolve `src/routing/` → routes into feature folders; unify on keyed-map + `XRoutesList` pattern (§11.13) — `App.routes`/`Projects.routes`/`Portfolio.routes` + `router.tsx`; `routing/` deleted; app `Index`→`Dashboard`→`Home` rename

**Role suffixes** (per feature batch)

- [ ] `Blog.type.ts` → `Blog.types.ts`
- [ ] `*.query.ts` → `*.queries.ts` (Contact, Admin, EmailVerification, Login, Register)
- [ ] Standardise style-file naming
- [ ] Add/lock `.utils`/`.context`/etc. in `ARCHITECTURE.md` (§8)
- [ ] Fix typos (`Exercieses`, `codeSnipets`, `RactAnatomy`)

**Return-value naming**

- [ ] `.schema.ts` → `FeatureSchema` namespace (Contact, Categories, Xmas2025, ...)
- [ ] `.columns.*` → `FeatureColumns` (BreakdownTable, Categories)
- [x] Main files → `export const Feature` (drop `export default`) — partial: all 15 app pages + `Xmas2025` de-defaulted (§11.13); portfolio pages pending
- [ ] `Blog.tsx` → export `Blog` (not `Blogs`)

**Barrels & verify**

- [ ] Add `index.ts` to every feature folder
- [ ] `tsc` + lint + FE tests green per batch
- [x] Grep for stale default-export/old-path imports
- [ ] Update `ARCHITECTURE.md` (§3.6)
- [ ] Update repo memory with final conventions

## 10. Session work log — alias migration + server restructure (2026-08-30)

### 10.1 Server restructure

- Extracted project routes out of `server/App/`; created `server/Projects/Projects.routes.ts` + `server/Projects/index.ts` barrel.
- `server/index.ts` now registers `AppRoutes` + `ProjectsRoutes` at the top level; `/session` route moved before `/api/user/:id` (Express ordering bug — fixed refresh token loss).
- Renamed `server/projects/` → `server/Projects/`; normalized git index casing.

### 10.2 Import alias infrastructure (applied)

Domain aliases added across root `tsconfig.json`, `server/tsconfig.json`, `vite.config.ts`, `jest.config.cjs`:

```
@common-types/* → common/types/*
@common-ux/*    → common/ux/*
@common-utils/* → common/utils/*
@app/*       → src/app/*
@portfolio/* → src/portfolio/*
@projects/*  → src/projects/*
@public/*    → public/*
```

- Server subset: `@common-types`, `@common-ux`, `@common-utils` (no FE domain aliases).
- Each tool requires bare + wildcard patterns (tsconfig `paths`, jest `moduleNameMapper` regex).
- `@common/*` dropped from tsconfig/vite/server (kept only in jest until `common/queries` leaves `common/`).
- Bulk-migrated `@common/ux|utils|types` → domain aliases across FE + server.
- **2026-08-31 rename:** the three short `@types/@ux/@utils` aliases were renamed to the
  `@common-*` family (see §11.14) for symmetry with `@shared-*`.

### 10.3 Component/relocation + export fixes

- **AccessGuard**: moved `common/utils/AccessGuard` → `common/ux/AccessGuard` (it is a React/JSX component, not a util — server `tsx` can't load its CSS). Removed from `@utils` barrel, added to `@ux` barrel; updated FE imports `@utils`→`@ux`.
- **Barrel exports fixed**: `@ux/Test` re-exports `HttpMethods` (+ `Test` object gains `server`/`MockBuilder`/`RequestBuilder`/`HttpMethods`); `@ux/Table` re-exports `TableFilterConfig` + `useTableController` types (explicit list to avoid `SortDirection` collision); `@ux/Overlay` re-exports `PopupMode`/`PopupSize`; `common/utils/Url` re-exports `./Codecs` (types like `UrlDecode`/`UrlEncode`).

### 10.4 Bug fixes

- `Units` is not a named export of `@utils` (only `DateTime.Units`); server consumers switched to `DateTime.Units.Ms`.
- `LevelCreator` black-bg/see-through text — CSS vars scoped to `.word-duel-arena`, not `.level-creator`; wrapped LevelCreator root with `word-duel-arena` class + imported `WordDuelArena.styles.css`.
- `EmailVerification.query.ts` misused the MSW `RequestBuilder`; replaced with `Query.RequestBuilder` HTTP client.
- `Page.spec.tsx` imported `visitsQueries` from `@types`; fixed to relative `../../../queries`.
- Test `mockNavigate` undefined — `setupTests.ts` must import `server` from narrow `@ux/Test/Server`, not the `@ux/Test` barrel (barrel pulls `Page.mocks.ts` which reads `globalThis.mockNavigate` at eval time).
- Vite dep-pre-bundle msw error: added `optimizeDeps.exclude: ['msw', '@mswjs/interceptors']` to `vite.config.ts`.

### 10.5 Open / next

- `@common/queries` still referenced (queries remain in `common/`; planned to move + re-alias in a future PR).
- Remaining 0006 work (structure/role/return-naming sweep) still pending — see checklist §9.

## 11. Asset distribution (2026-08-30)

Distribute static assets by domain ownership so each area owns the files it uses, eliminating the `src/assets/` central dump and mirroring the `@ux`/`@app`/`@portfolio`/`@projects`/`@public` aliases.

### 11.1 Ownership map

**Two project kinds (distinct asset homes):**

- **In-repo app projects** (built inside this React app: `Misc/*` → WordDuelArena, Typist, Gym, Xmas2025) → `@projects/assets/`.
- **Portfolio card projects** (external/standalone projects showcased as cards on the Projects page, e.g. the 9 legacy games, riffmaster) → `@portfolio/assets/projects/`.

| Domain           | Asset home              | Contents                                                                                                                                     |
| ---------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **UX** (generic) | `common/ux/assets/`     | shared svg/placeholders used across components (dev_tools not pursued — dead, deleted)                                                       |
| **App** (chrome) | `src/app/assets/`       | logo/icon, fonts, app backgrounds & dev/test images (form-bg-pattern dead, deleted)                                                          |
| **Portfolio**    | `src/portfolio/assets/` | blog (`blog/` images + `blog/files/` txt/pdf/mp3), certificates, about images, CV `files/`, **portfolio card project art under `projects/`** |
| **Projects**     | `src/projects/assets/`  | in-repo app projects: wordduelarena, xmas (typist/gym have no project-local assets)                                                          |
| **Public**       | `public/assets/`        | server-served statics only: icons, headshot placeholders, empty `fonts/` stub, `projects/` static apps — not FE-imported                     |

**App chrome** = the non-content framing UI every page shares: logo, favicon, layout/form background patterns, dev/test placeholder images — not page/article content. Fonts (FE-`@font-face`-imported) live in `@app/assets/fonts`.

### 11.2 Source inventory (to distribute)

- **`src/assets/`** — the movable central dump (FE-bundled, safe to distribute):
    - loose: `form-bg-pattern.png`, `headshot_placeholder*.png`, `icon.svg`, `icon-light.svg`, `placeholder_image.jpg`, `testing.png`, `thumbs_up.png`, `react.svg`
    - subfolders: `about/`, `blog/`, `certificates/`, `projects/`, `dev_tools/`
    - `files/`, `fonts/`
- **`public/`** — NOT moved (safe-to-keep): `icon.svg` (favicon), `version.json` (build meta), `projects/` (9 static apps), `assets/{fonts, icons/*, headshot_placeholders}` — all served to server email templates / static URLs (e.g. `Schedule.utils.ts` absolute URLs) or public-served. **Recanted the earlier plan to move these.**

### 11.3 Steps (per AGENTS.md — one batch at a time, approve each)

- [x]   1. ~~Move legacy `public/projects/*` → `src/portfolio/assets/projects/`~~ → **RECANTED**: the 9 are pre-built static apps served from `public/`; they stay. (Attempted + reverted.)
- [x]   2. Create `common/ux/assets/` and `src/app/assets/` (new)
- [ ]   3. Move generic UX assets from `src/assets/` (dev_tools, thumbs_up, shared placeholders/svg) → `common/ux/assets/`
- [x]   4. Move app chrome from `src/assets/` (icon, icon-light, form-bg, testing, react, favicon) → `src/app/assets/`
- [x]   5. Finish portfolio moves from `src/assets/images/` (about/blog/certificates) → `src/portfolio/assets/`
- [x]   6. Finish in-repo project moves (projects images) → `src/projects/assets/`
- [x]   7. `public/assets/` stays as-is (server-served statics — no move)
- [x]   8. `src/assets/{files,fonts}` → decide public vs `@app` (low priority)
- [x]   9. Update all imports + CSS `url()` refs to the new `@ux`/`@app`/`@portfolio`/`@projects` asset paths
- [x]   10. Delete the emptied `src/assets/` central dump (if fully emptied)
- [x]   11. Verify (tsc, build, grep for stale asset paths)

### 11.4 Execution progress (2026-08-30)

**Done:**

- Created `src/app/assets/`, `common/ux/assets/`, `src/portfolio/assets/projects/`.
- App chrome → `@app/assets` (`icon.svg`, `icon-light.svg`); updated `Logo.tsx`, `Footer.tsx`, `UnderConstruction.tsx`, `index.html`. Deleted dead `form-bg-pattern.png`. **Corrected later (2026-08-30): icons + fonts are shared branding, not app chrome — moved to `src/shared/assets/`, alias `@shared-assets` (see §11.10).**
- Portfolio loose → `@portfolio/assets` (`headshot_placeholder*`, `testing.png`, `thumbs_up.png`); updated `Welcome.tsx`, `Disclaimer.tsx`, `Signature.tsx`, `articles.ts`, `MessageAcknowledgement.tsx`. Deleted dead `placeholder_image.jpg`.
- `about/` → `@portfolio/assets/about` (updated `About.tsx`, `RiffMaster.tsx`).
- `certificates/` → `@portfolio/assets/certificates` (updated `Achievements.ts`).
- `projects/` split → loose card images to `@portfolio/assets/projects` (updated `Projects.selectors.tsx`, `Figures.tsx`); `xmas/` + `wordduelarena/` to `@projects/assets` (updated `menuData.tsx`, `GuestIndex.tsx`, `CandlePanel.tsx`, `Xmas2025.tsx`, `Avatar.tsx`).
- Deleted dead: `dev_tools/`, `react.svg`, `form-bg-pattern.png`, `placeholder_image.jpg`.
- `blog/` → `@portfolio/assets/blog`; all 14 article image imports updated (see below). Grep-clean, tsc-passed.
- `public/` unchanged (server-served statics). Step 1 recanted.

**Done — `blog/` fully migrated (2026-08-30):**

- `blog/` → `@portfolio/assets/blog`; all 14 article image imports updated: `articles.ts`, `CyclicEmailScheduling`, `DailyAnalyticsEmail`, `GitCheatsheet`, `GreenRooftop`, `HookPattern`, `JsDateValidation`, `JsSorting`, `Maybe`, `RactAnatomy`, `RiffMaster`, `SoundsWithHowler`, `ZIndexLayers`.
- `src/assets/images/blog/` emptied; no stale `assets/images` refs remain (grep-clean, tsc-passed). Naming variants reconciled to canonical `@portfolio/assets/blog/*`.

**Done — `files/` + `fonts/` migrated (step 8, 2026-08-30):**

- **Blog files** → `@portfolio/assets/blog/files/` (`green-rooftop/` txt, `riffmaster/` txt+pdf, `sounds_with_howler/` 20 MP3). Updated imports: `RiffMaster.tsx` (`controller.txt`, `Dissertation_Online.pdf`), `GreenRooftop.tsx` (`green_rooftop.txt`), `SoundsWithHowler.tsx` (20 MP3).
- **CV** → `@portfolio/assets/files/Tivadar_Debnar_CV_2023.pdf`; updated `HireIntro.tsx`.
- **Fonts** → `@app/assets/fonts/` (13 ttf); `src/index.scss` `@font-face` `url()` refs updated to `@app/assets/fonts/`. **Corrected later (2026-08-30): fonts → `@shared-assets/fonts/` (see §11.10).**
- `src/assets/` now contains **only empty directories** (old skeleton `files/`, `fonts/`, `images/**`), zero files.
- **Step 10 done** — deleted `src/assets/` entirely (removed the empty skeleton). The central dump is gone.

**Remaining (deferred):**

- Step 3 `common/ux/assets/` — dead `dev_tools` deleted; `thumbs_up`/shared placeholders went to `@portfolio/assets` instead. Generic UX share-back not pursued.
- Step 6 in-repo projects — `wordduelarena` + `xmas` done; `typist` + `gym` have **no project-local assets** (only card thumbnails in `@portfolio/assets/projects`, Gym is data/`@types`-driven) — nothing to move.
- `public/assets/` server-served statics — unchanged (step 1 recanted).

### 11.5 UX component purity audit (2026-08-30)

**Concern:** `common/ux/` is a generic layer and must not import app-specific
code (`src/`). Dependency rule is `feature → common/utils → common/types`
(AGENTS.md §2.3); `common/ux` should sit alongside `common/utils` as a shared
primitives layer. Components that reach into `src/context`, `src/routing`,
feature folders, or `common/queries` are **impure** and bind the generic layer
to this app. Audited all files under `common/ux/`.

**Impure — import app code:**

| Component        | File                               | App-specific import                                                                                       | Coupling                                                    |
| ---------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `Page`           | `Page/Page.tsx`                    | `Session` (`src/context/SessionContext`), `useAppContext` (`App.context`), `postVisit` (`common/queries`) | record-visit + document-title side effects; login/app state |
| `AccessGuard`    | `AccessGuard/AccessGuard.hooks.ts` | `Session` (`src/context/SessionContext`)                                                                  | builds access map from `session.user/settings`              |
| `Nav`            | `Nav/Nav.tsx`                      | `useAppContext` (`App.context`)                                                                           | default burger reads/writes app mobile-menu state           |
| `Nav/MobileMenu` | `Nav/MobileMenu/MobileMenu.tsx`    | `useAppContext`                                                                                           | app context (theme + menu visibility)                       |
| `Nav/SubNav`     | `Nav/SubNav/SubNav.tsx`            | `useAppContext`                                                                                           | app context (theme + submenu visibility)                    |
| `SearchInput`    | `Form/SearchInput.tsx`             | ~~`colors`~~ → **FIXED** (→ `Const.ColorSign`, #1)                                                        | ~~app palette~~ none                                        |

**Test-only impurity (acceptable category, flagged):** `Test/` helpers import app
contexts/routes (`AppContextProvider`, `SessionContext`, `ApiRoute`) — test
infrastructure, not runtime generic code. Isolated concern.

**Clean** (no app imports): Button, Code, Const, ContentNavigator, CounterBadge,
Figure, Layout (Box/Grid/Inline/Spacer/Split/Stack/Visibility), Link,
LoadingIndicator, Overlay, Pill, Region, SideMenu, Table (all), Toggle,
Typography, ZoomedImage.

**Grey area:** `common/queries/` (`postVisit`) is shared-but-app-served; see
ticket §2 note (out of scope for content change, but re-imports allowed).

**Remediation direction (decide, don't implement yet):** pure components receive
app state via props / context-injection rather than importing `src/` directly.
Worst offenders: `Page` (visit-recording), `SearchInput` (palette). `Nav` burger
is pattern-able via a `render-prop` default. Links to §8 `Nav/` + app-level
placement decision.

### 11.6 Purity remediation progress (2026-08-30)

**Done — #1 `colors` → `Const.ColorSign`:**

- `colors` was a generic CSS-color-swatch `Dictionary<ReactNode>` misplaced in
  `src/components/pages/API/Categories/`. Moved into constants.
- New `common/ux/Const/ColorSign.tsx` (named export `ColorSign`); added to the
  `Const` object in `Const/index.ts`.
- Updated §consumers: `SearchInput.tsx` (`colors[x]` → `Const.ColorSign[x]`),
  `Categories.schema.ts`, `Categories.utils.ts`. Deleted the old `colors.tsx`.
- Decision: `Const/` (design tokens) vs new folder — chose `Const.ColorSign`;
  though it's JSX swatches, keeping it with the other constants was the call.
- Resolved via single-file edits; grep-clean; no errors.

**In progress — #2 Nav / MobileMenu / SubNav (props-injection, B1):**

- **#2A `Toggle` migration — DONE (2026-08-30):** `Toggle` is a generic switch
  (`children`/`handleClick`/`active`) whose only production consumers are
  `MobileMenu` + `SubNav` inside `common/ux`; it lived in
  `src/components/sharedComponents/Toggle/` (wrong layer — `common/ux` imported
  from `src/`). Migrated to `common/ux` as a full citizen:
    - `common/ux/Toggle/Toggle.tsx` (named export `Toggle` + `ToggleProps`),
      `Toggle.css` (scss→css, `palette.$X` → `var(--X)`, flat selectors),
      `index.ts` barrel; `@ux` barrel updated.
    - Tests: `Toggle/tests/Toggle.spec.tsx` via `Test.Toggle` accessor +
      `Set.toggle` spec util (`Toggle.spec.utils.tsx`).
    - Test accessor: `common/ux/Test/Toggle/Toggle.tsx` (Get: role/active;
      Do: toggle), registered in `Test`.
    - UxStories story: `UxStories/components/Toggles/` (`Toggles.tsx` +
      `Toggles.code.ts`), wired in `components/index.ts`, `stories.ts`
      (`/api/ux-stories/toggles`), `ApiRoutes.tsx`.
    - Consumers `MobileMenu.tsx` + `SubNav.tsx` now `import { Toggle } from '@common-ux'`.
    - Deleted `src/components/sharedComponents/Toggle/`.
    - **Enhancements (same session):** `children` made optional (icon-less bare
      switch, `<Toggle__icon>` omitted when absent); `activeColor?: string` prop
      (applies `backgroundColor` when active); softened inner shadow in both
      dark/light themes (dedicated custom shadows, shared tokens untouched).
- **#2B (next):** decouple `useAppContext` from `Nav` (DefaultBurger),
  `MobileMenu`, `SubNav` via props-injection (B1).

---

**Done — whole `Nav` package moved out of `common/ux` (supersedes #2):**

Not props-injection (B1) — the whole `common/ux/Nav/` package is **app navigation
chrome**, not generic primitives. Moved to `src/components/Nav/`:

- `Nav.tsx`, `NavMenu.tsx`, `Nav.types.ts`, `Nav.utils.ts`, `Nav.styles.css`,
  `Components/`, `MobileMenu/`, `SubNav/`, `Submenu/`, tests.
- `src/components/Nav/index.ts` barrel now exports the full package alongside
  `PageNav`/`PageMobileMenu`/`PageSubNav`.
- Consumers (`PageNav`, `menuData`) → relative imports; moved components keep
  `useAppContext` (app-level now); shared deps via `@ux`.
- `@ux` barrel no longer exports Nav; UxStories Nav story deleted + unwired.
- Accessor moved to `src/components/Nav/tests/Nav.spec.utils.tsx`; removed from
  `@ux/Test`.
- Deleted `common/ux/Nav/`. Result: `Nav`/`MobileMenu`/`SubNav`/`NavMenu` are
  app-level and may use `useAppContext` directly — no props-injection needed.

**Done — `AccessGuard` moved out of `common/ux` (#4):**

App access-control (admin + xmas2025 on this app's `Session`), same standard as
Nav. Moved `common/ux/AccessGuard/` → `src/components/AccessGuard/` (incl.
renderers + tests). Removed from `@ux` barrel. Consumers updated (Nav×3, API
Index, Xmas2025×2, AccessGuards story). `useAccess` keeps its `Session` import
(app-level now); `AccessGuard.types` `Capability` → `@types`. Deleted
`common/ux/AccessGuard/`.

**Done — `Page` collapsed into `Screen` (#3, last):**

`Page` had one production consumer (`Screen`) — a 1:1 wrapper with no reuse, so
the layer was removed rather than moved:

- `Screen.tsx` now owns Page's logic (document title, scroll reset, incognito
  visit tracking, `loginRequired` redirect, `subMenuVisible` class) + chrome.
  `ScreenProps` supersedes `PageProps`.
- `.Page` shell → `.Screen`; `Page.css` → `Screen.css`.
- `Typist` `PageContainerProps` → `Pick<ScreenProps,'pageName'|'path'>`.
- Test harness `Test/Page` → `Screen/tests/Screen.spec.utils.tsx` (exports
  `TestScreen`); `Page.spec` → `Screen/tests/Screen.spec.tsx`.
- All `Test.Page` → `TestScreen` in 8 specs + docs/snippets; removed `Screen`
  from `@ux/Test` barrel. Deleted `common/ux/Page/`.
- **No `Page` name remains** (component, harness, helpers).

**Done — `Region` light-theme overrides (from login dark-section bug):**

`.region__content`, `.region__header`, `.region__header:hover`,
`.region--dialog`, `.region--sidebar` all lacked `.light` overrides and stayed
dark in light mode. Added light variants (`white-2`/`white-3`; dialog also flips
text to `black-x`). Full region light-theme audit closed.

**Done — `common/queries` → `src/common/queries/` (Likes/Visits):**

Likes + Visits queries (`useGetLikes`, `usePostLike`, `useGetVisits`,
`postVisit`, `usePostVisit`, `useGetVisitSummary`, `useGetLikeSummary`) are
**app-served API queries**, used across 9 features (Screen, Blog, Article,
BlogCard, LikeButton, PageSideMenu, Breadcrumb, SuggestedArticles). Not generic
`common/` infra. Moved `common/queries/` → `src/common/queries/`
(`index.ts`, `Likes.queries.ts`, `Visits.queries.ts`). Updated 9 consumer
imports; moved files use only `@types`/`@utils` aliases. Top-level `common/`
now `{types, utils, ux}`.

Note: not feature-owned because they're cross-cutting (span many features), not
one feature's private query. `src/common/queries/` is the app-level shared home.

**Net result:** `common/ux` no longer imports any `src/` code. The impurity sweep
(`colors`, `Toggle`, `Nav`, `AccessGuard`, `Page`) is complete. `tsc` clean,
pages render.

### 11.8 Portfolio feature move + wiring (2026-08-30)

**Done — portfolio pages moved to `src/portfolio/` + barrel + router + named exports:**

- Moved the portfolio page folders (`Home`, `About`, `Blog`, `Contact`,
  `PrivacyPolicy`, `Projects`, `UnderConstruction`) into `src/portfolio/`
  (alias `@portfolio`).
- **Named exports** (ticket §3.4): `About`, `Blog`, `Contact`, `Home`,
  `PrivacyPolicy` converted from `export default` to `export const`; `Blog`'s
  component renamed `Blogs` → `Blog`. `Projects` was already named.
- **New `src/portfolio/Portfolio.routers.ts`** — `PortfolioRoutes` array moved
  out of `src/routing/PortfolioRoutes.tsx`; carries the page + blog-article +
  `/clock` routes. Imports repointed to `./Home/Home` (etc.) and `../articles/*`.
- **New `src/portfolio/index.ts`** barrel — re-exports the six pages +
  `PortfolioRoutes`.
- **Wiring:** `src/routing/routes.tsx` imports `PortfolioRoutes` from
  `'../portfolio'`.
- **`RouteError` decoupled (Option A, decided):** the shared `RouteError` used
  to render `<Home>` verbatim — importing a now-feature-local portfolio page
  into shared chrome (layering violation) and silently showing the homepage on
  unknown routes. Rewritten as a real app-level 404 page ("404 — Page not
  found" + home link) using `@ux` primitives (`Heading`, `Paragraph`, `Link`,
  `Stack`) + colocated `RouteError.scss`. No `Home`/portfolio import remains.
- **Moved-file import repair** (root cause: pages deepened from
  `src/components/pages/X` → `src/portfolio/X`):
    - `sharedComponents` refs → `components/sharedComponents` (page + test files);
    - `articles` + `context` + `common/queries` refs shortened by one `..`;
    - page imports in tests → named (`{ Blog }`, `{ Home }`, `{ Contact }`).
- **Pending:** delete the now-orphaned `src/routing/PortfolioRoutes.tsx`
  (superseded; `routes.tsx` no longer imports it). Requires terminal delete.

**Deferred — WHOLE-APP ALIAS SWEEP (explicitly required, NOT yet done):**

> **Every import across the ENTIRE app must be swept to use aliases. ALL app —
> ALL imports.**

Currently most cross-directory imports are relative (`../../components/...`,
`../../articles/...`, `../common/queries`, `../../../context/...`), which are
brittle and break every time a file moves. This ticket's page move is the
latest instance of relative-path breakage. A later dedicated sweep must convert
**all** relative imports app-wide to domain aliases:

- `@portfolio/*` → `src/portfolio/*`
- `@projects/*` → `src/projects/*`
- `@app/*` → `src/app/*`
- `@ux/*`, `@utils/*`, `@types/*` → `common/{ux,utils,types}/*`
- `@public/*` → `public/*`

Intra-folder/subfeature relative imports (`./X`, `../X` within the same feature)
may stay relative; the sweep targets imports that cross feature/directory
boundaries. The move here leaves `components/sharedComponents/` refs as
relative temporarily because that folder is slated to dissolve into `common/ux`
(ticket §3.2 — those become `@ux` in that batch), and a `@shared` alias was
deliberately **not** added for a soon-dead target. This whole-app alias sweep is
a distinct ticket so the current move stays small and reviewable.

### 11.9 `src/shared/` + `@shared-*` aliases (DECIDED 2026-08-30 — Option 5)

**Problem:** the portfolio move broke every SCSS `@use '...styles/...'` reference
silently (Vite Sass only; Jest mocks CSS), and `src/common/queries` importers
hang off fragile relative paths. Root `common/` (generic `ux/utils/types`) vs
`src/common/` (app-level shared `queries`, `styles`) share the word "common",
which is permanently confusing.

**Decision — rename the folder to kill the ambiguity at the source (Option 5):**
`src/common/` → **`src/shared/`**. "Shared" is the word that actually separates
app-level cross-cutting code (`src/shared`) from root-generic `common/`. Alias
the concrete subfolders, not the whole folder.

```text
@shared-styles  → src/shared/styles   (moved from src/styles/: animations, breakpoints, font_sizes, mixins, palette, shadows)
@shared-queries → src/shared/queries  (moved from src/common/queries/: index, Likes.queries, Visits.queries)
```

**Rejected alternatives (why):**

- `src/app-shared/` — more explicit but longer; `shared` alone is sufficient.
- `@app-styles`/`@app-queries` — collides conceptually with `@app → src/app`.
- `@common-styles`/`@common-queries` — `common` prefix still reads like
  root-generic `common/`.
- `@styles`/`@queries` — clean short form, but loses the shared provenance.
- Keep `src/common/` and alias in place — doesn't remove the word "common",
  the root-vs-src confusion persists.

**Scope to convert (this batch):**

- `src/common/` → `src/shared/` (folder rename; currently holds `queries/`).
- `src/styles/` → `src/shared/styles/` (folder move).
- All **41 SCSS** `@use '...styles/*'` → `@use '@shared-styles/*'` (namespaces
  preserved: `as bp/palette/font/shadows/animations`).
- `src/index.scss` `@use './styles/*'` → `@use '@shared-styles/*'`.
- All **9** `...common/queries` importers → `@shared-queries`.
- Config: `vite.config.ts` `resolve.alias`, root `tsconfig.json` `paths`,
  `jest.config.cjs` `moduleNameMapper` (map `^@shared-styles/(.*)$`,
  `^@shared-queries/(.*)$`).

**Naming convention adopted:** `@shared-*` = app-level cross-cutting shared
(`src/shared/*`); root-generic `common/` uses `@common-ux/@common-utils/@common-types`
(renamed from `@ux/@utils/@types` on 2026-08-31, see §11.14). Vite
resolves `resolve.alias` inside Sass `@use`, so dev/build works; Jest needs
nothing for SCSS (mocked) beyond the mapper for any TS-side `@shared-queries`.

**EXECUTED (2026-08-30):** `tsc` green.

- Folders: `src/common/` → `src/shared/` (holds `queries/` + `styles/`);
  `src/styles/` → `src/shared/styles/`.
- Config: `@shared-styles` + `@shared-queries` aliases added to
  `vite.config.ts`, root `tsconfig.json`, `jest.config.cjs`.
- All **40 SCSS + `src/index.scss`** `@use` → `@shared-styles/*`; all **9**
  `common/queries` importers → `@shared-queries`. No live relative `styles/` or
  `common/queries` refs remain.
- tsc fixes during verification: `HireIntro.tsx` `common/ux` depth (5-up was
  pre-move; 4-up now); `BlogCard.tsx` `getColourName` → moved portfolio path;
  deleted superseded `src/routing/PortfolioRoutes.tsx`.
- Alias resolution verified by `tsc` (the `Screen.spec.tsx` `any` on
  `import * as @shared-queries` is an editor-diagnostic lag only, not a tsc
  error).

### 11.10 `@shared-assets` — app chrome corrected to shared branding (2026-08-30)

**Decision:** `src/app/assets/` (`icon.svg`, `icon-light.svg`, `fonts/` × 13)
was classed as "app chrome → `@app/assets`" (§11.1/§11.4), but audit showed it
is **shared branding**, not app-scaffolding-private: consumed by `Logo.tsx`
(app nav), `Footer.tsx` (shared), `UnderConstruction.tsx` (portfolio), plus the
root `index.html` and global `index.scss` `@font-face`. Moved to
`src/shared/assets/`, new alias `@shared-assets` → `src/shared/assets`
(wired in vite/tsconfig/jest). Consumers repointed: `Logo.tsx` (2), `Footer.tsx`
(1), `UnderConstruction.tsx` (1) via `@shared-assets/...`; `index.html` (2)
via physical `/src/shared/assets/...` (html can't use aliases); `index.scss` (6
`@font-face`) via `@shared-assets/fonts/...`. `src/app/` no longer holds assets.
`@shared-*` = cross-cutting shared used by app+projects+portfolio.

### 11.11 `Article/` feature restructure + barrel (2026-08-30)

**Moved** blog article content from `src/articles/` → `src/portfolio/Article/`
(feature root): `Article.tsx` shell, `articles.ts` registry (`blogArticles` +
`BlogArticle`), `references.ts` (`getReferenceList`), and all 14 article
content folders + `TemplateArticle/` (flat under `Article/`). The shell
`Article` (previously `components/sharedComponents/Article/Article`) was **only
consumed by the article pages**, so it left `sharedComponents` — it's
blog-article-specific, not generic shared.

**New barrel** `src/portfolio/Article/index.ts` re-exports the registry
(`blogArticles`, `BlogArticle`, `getReferenceList`) and all 14 article page
components (all **named** exports — see default→named note below).

**Import repair — via `@portfolio/Article` alias** (not relative) for
cross-folder consumers: `Blog/utils.ts`, `Blog/spec.tsx` (already aliased by
user), shared `BlogCard.tsx` + `SuggestedArticles.tsx`. `Article.tsx` internal
registry imports stay same-folder relative (`./articles`, `./references`); the
router (`Portfolio.routes.tsx`) uses the `./Article` barrel (same feature); the
14 article pages import the shell via intra-feature `../Article`. Fixed
`Article.tsx` scss bug: `./Articles.scss` → `./Articles.styles.scss`.

**Layering note (pre-existing, revisit):** shared `BlogCard`/`SuggestedArticles`
import `@portfolio/Article` — a shared → feature edge; aliased for now, but
these blog-UI components may belong in the blog domain.

**Completed (2026-08-30):**

- **Default → named exports** (ticket §3.4): all 14 article page components +
  the `Article` shell converted from `export default X` → `export const X`;
  article pages now `import { Article } from '../Article'`; the barrel uses
  plain named re-exports (no `export { default as X }`). Only the
  `codeSnippets.ts/.tsx` **data** modules remain default (data, not components;
  separate scoped decision).
- **Depth-repair (moved one level deeper):** the 12 article pages'
  `'../../components/sharedComponents/…'` → `'../../../components/sharedComponents/…'`
  (they sit at `src/portfolio/Article/<Name>/`, one deeper than the old
  `src/articles/<Name>/`); `HookPattern` `context` import depth fixed.
- **`references.ts` root cause** of the `Unsafe assignment of any` noise: it
  imported `Reference` from `'../components/sharedComponents/…'` (too shallow →
  `any`), cascading through every `references[N]`; fixed to
  `'../../components/sharedComponents/References/References'`. Note the depth
  differs by location: `Article/` root files need 2 ups, article pages 3 ups.

### 11.12 `shared-components` — feature-local move + `@shared-components` alias (2026-08-30)

**Decision:** eliminated `src/components/sharedComponents/` — it mixed
feature-local and app-level components with no coherent owner. Adopted
**`src/shared/components/`** (alias `@shared-components`, matching the
`@shared-styles/queries/assets` family) as the home for genuinely cross-cutting
app-level components, and moved feature-local components **into their owning
feature**.

**Placed in `src/shared/components/` (app-level / shared):** `Nav`, `AccessGuard`,
`Screen`, `Footer`, `PageSideMenu`, `ShareMenu`, `RouteError`, `VersionChecker`,
`Figure`, `ZoomedImage`, `Overlay`.

**Moved feature-local → owning feature:**

- `portfolio/About/components/` — `AchievementList` (+ `AchievementListItem`).
- `portfolio/Blog/components/` — `BlogCard`, `SuggestedArticles`.
- `portfolio/Article/components/` — `LikeButton`, `References`,
  `InlineReference`, `Disclaimer`, `Figure`-wrapper.

**Runtime findings during the sweep:**

- `Overlay` was **not** a dead duplicate — `Screen` imports its named export
  `FullScreenOverlay` (a thin `useAppContext` + `@ux/Overlay.FullScreen`
  wrapper). It was restored at `src/shared/components/Overlay/` (adapted scss to
  `@shared-styles/palette`). Only `LoadingIndicator` was a true duplicate of
  `@ux`.
- `Screen.tsx`'s `../Overlay/Overlay` dependency required restoring the folder
  in the **new** shared location, not the old one.

**Result:** `src/components/` fully removed. `@shared-components` alias added to
`tsconfig.json` (paths), `vite.config.ts` (resolve.alias), `jest.config.cjs`
(moduleNameMapper). All `AccessGuard`/`Nav` consumers repointed to
`@shared-components/...`. `tsc` green.

### 11.13 `routing/` dissolve + unified feature-route pattern (2026-08-31)

**Decision:** dissolved `src/routing/` — routes now live **inside each feature**
(`Feature.routes.tsx`) and all three features use the **same shape**: a keyed
map (ergonomic access) + a derived array (for the router).

**Standard pattern (applied to all three):**

```ts
export type XRoute = { name?: string; path: string; element: ReactElement }
export const XRoutes: Dictionary<XRoute> = { Key: { path, element }, ... }
export const XRoutesList: XRoute[] = Object.values(XRoutes)
```

- `src/app/App.routes.tsx` → `AppRoutes`/`AppRoutesList` (renamed from `ApiRoutes`; URLs stay `/api/*`).
- `src/projects/Projects.routes.tsx` → `ProjectRoutes`/`ProjectRoutesList`.
- `src/portfolio/Portfolio.routes.tsx` → `PortfolioRoutes`/`PortfolioRoutesList`.

**Wiring:**

- `router.tsx` spreads `...AppRoutesList, ...PortfolioRoutesList, ...ProjectRoutesList` + `RouteError` catchall.
- Feature barrels export map + list + type (`export { XRoutes, XRoutesList, type XRoute }`).
- Spec files use ergonomic keyed access: `TestScreen.Do.render({ path: AppRoutes.Login })`.

**Design notes / decisions:**

- `Dictionary<T> = Record<string, T>` annotation (not `satisfies`) — gives the map an
  index signature so `Object.values` infers `T[]` cleanly, avoiding the `any`/generic workaround.
- **Keyed map retained over plain array** because the app tests (and routing-by-name) need
  `AppRoutes.Login` — earlier "array for consistency" call was reverted as it broke that ergonomics.
- **`Index/` → `Dashboard/` → `Home/`** feature rename (component, props, sub-features
  `AdminIndex`→`AdminDashboard`→`AdminHome`/`GuestIndex`→`GuestDashboard`→`GuestHome`, URL
  `/api/index`→`/api/dashboard`→`/api/home`).
  The `Index/`→`Dashboard/` step fixed a barrel `any` bug: a `Index/` directory colliding with
  `index.ts` on Windows' case-insensitive FS made the whole `src/app` barrel resolve to `any`.
  `Dashboard/`→`Home/` (2026-08-31) resolved a second naming collision: the landing page shared
  the word "Dashboard" with the admin menu group — the landing is now `Home`/`GuestHome`/`AdminHome`.
- **De-default sweep**: 15 app pages converted `export default` → `export const`; both `App.routes`
  and the app barrel re-export named.
- **Data note (decision, no action):** `Visit`/`Breakdown` store the route `path` as data.
  Renaming `/api/index`→`/api/dashboard`→`/api/home` splits historical analytics (old
  `/api/index` and `/api/dashboard` rows remain) — chosen deliberately to keep the DB truthful;
  no migration, handle continuity at the view layer if needed.
- `react-refresh/only-export-components` warns on `*.routes.*` (JSX-in-const). Accepted as expected;
  no eslint override added.

**Result:** `src/routing/` **deleted**. `main.tsx` imports `router` from `./router`.
Keys for `AppRoutes` include `Home` (the renamed app landing); spec files updated
(`Login.spec`/`Register.spec` → `AppRoutes.Login`/`AppRoutes.Register`; `Screen` test types → `@app`).

### 11.14 `src/context/` dissolve → `src/shared/context/` + `@shared-context` alias (2026-08-31)

**Decision:** removed the top-level `src/context/` bucket. Cross-cutting contexts
(`AppContext`, `SessionContext`) now live in `src/shared/context/`, reachable via a
new `@shared-context` alias. This dissolves the second root bucket of the old
layout (after `routing/`) and keeps `common/` free of app state.

**Alias added (all three configs — tsconfig.json `paths`, vite `resolve.alias`,
jest `moduleNameMapper`):**

```jsonc
"@shared-context": ["./src/shared/context"],
"@shared-context/*": ["./src/shared/context/*"]
```

**Moves:**

- `src/context/SessionContext/` → `src/shared/context/SessionContext/`
- `src/context/AppContext/` → `src/shared/context/AppContext/`

**Leak A — `common/` purity (rejected `common/utils/Session`):**

- `common/utils/Query/Query.ts` `withAuthToken(token?: string)` no longer falls back
  to a `LocalSession`; it **requires the token explicitly**.
- 9 query files now read the token from `Session.useContext().session?.token` and pass it
  to `withAuthToken(...)`: `Categories`, `Admin`, `Home/WebsiteStats`, `Gym`,
  `LevelCreator`, `Xmas2025` (multiple hooks each; `Login.query` already passed explicitly).
- `Query.spec.ts` rewritten — removed `mockLocalSession`, tests pass explicit tokens.
- A proposed `common/utils/Session/` module was **rejected** (too app-specific: `APP_KEY`,
  `Session` type), reverted; `LocalSession` stays local to `shared/context/SessionContext/`.

**Leak B — SessionContext self-contained:**

- `useRehydrateSessionResources` moved from `app/Login/Login.query.ts` into
  `shared/context/SessionContext/Session.query.ts` (passes the token explicitly via `withAuthToken`).
- Removed from `Login.query.ts`; `Session.context.tsx` imports it from `./Session.query`.

**Consumer repoint (~21 files):** `main.tsx`, `app/{Login,Logout}`, `projects/Xmas2025`,
portfolio (`About/AchievementListItem`, `Article/HookPattern`, `Home/Welcome`), all
`shared/components` contexts (`AccessGuard`, `Figure`, `Nav` family, `Overlay`, `Screen`)
and test utils (`Nav.spec.utils`, `Screen.mocks`, `Screen.spec.types`, `Screen.spec.utils`)
now import from `@shared-context/...`. `Logout` uses `@shared-context/SessionContext/LocalSession`.

**Result:** `src/context/` **deleted**. `tsc --noEmit` passes; a transient
`Cannot find module './LocalSession'` diagnostic in `Session.context.tsx` was stale
TS-cache (same-folder `index.ts` resolves the identical import) and cleared on fresh rebuild.

### Amendment — `@common-*` alias family (2026-08-31)

Renamed the three short `common/` aliases to a symmetric `@common-*` family,
mirroring `@shared-*`:

```text
@types  → @common-types   → common/types
@ux     → @common-ux      → common/ux
@utils  → @common-utils   → common/utils
```

- Applied in **all three configs** (tsconfig `paths`, vite `resolve.alias`,
  jest `moduleNameMapper`), each with bare + wildcard entries.
- All ~477 references across `common/`, `src/`, and `server/` migrated via
  search-and-replace; `tsc` green.
- **Removed** the stale jest-only `'^@common/(.*)$'` mapping (dead — nothing imported
  `@common/...`; never defined in tsconfig/vite).
- Grouping standardized across configs: **feature → `@common-*` → `@shared-*` → `@public`**.
- Doc note: dated §11 narrative logs (pre-rename) still mention `@types/@ux/@utils`
  verbatim as historical record; canonical alias table (§10.2) + naming convention (§11.9)
  updated to the new family.

### Amendment — `server/tsconfig.json` alias fix + import-ordering convention (2026-08-31)

- **Server alias gap fixed:** `server/tsconfig.json` still defined the old
  `@types/@ux/@utils` while migrated server code imported `@common-*` (resolved only via
  the run tool's loose resolver). Updated `server/` to the `@common-*` family (bare +
  wildcard), keeping BE resolving like FE. No old-alias imports remain in `server/`.
- **Import-ordering convention adopted** in `ARCHITECTURE.md` §5.2 — order by **source,
  not role**:
    - **FE (4 tiers):** 1) external/third-party → 2) internal aliased (`@common-*`, `@app`,
      `@shared-*`, …) → 3) relative (`./`, `../`) → 4) side-effect/asset (`'./x.scss'`, no bindings, last).
    - **BE (3 tiers, reduced):** 1) external/node → 2) aliased internal (`@common-*`) → 3) relative local (`./`, `../`, incl. relative `common/`).
    - Rationale: grouping by source is mechanical/enforceable; role-based tiers ("components"
      vs "utils") force per-line judgement and would reorder existing interleaved imports.
- **Next step (FE sweep):** a pass to check **each FE file** conforms to §5.2 ordering.
  Out of scope for this batch; logged as the next sweep item.

### 11.15 WDA runtime regressions — parked as pre-tick blockers (2026-08-31)

Surfaced while regression-checking the app after this restructure. **Both are
pre-existing** — the WDA tree moved from `src/components/pages/Misc/WordDuelArena/`
to `src/projects/WordDuelArena/` unchanged except alias imports (`@utils`→`@common-utils`).
Diff-verified: `LetterWheel.hooks.ts`, `ExtraWords.styles.css`, `SessionGame.styles.css`
and the `.word-duel-arena` scoped vars (`--color-bg-medium:#111`, etc.) are identical to
HEAD. Neither is fixable from a static diff; both need a runtime pass. Blocking issue per
§9 checklist.

1. **Letter wheel — no mouse/pointer support.** `LetterWheel.hooks.ts` attaches only
   `touchstart/move/end` + `keydown` (identical in HEAD and current). Desktop mouse does
   nothing. Decision required: add pointer/`mousedown-mousemove-mouseup` handling as a
   deliberate feature, or confirm touch/keyboard-only is intended. `LetterWheel.handlers.ts`
   also only knows `TouchEvent` (`touches[0]`, `elementFromPoint`) — mouse would need
   handlers generalised to a shared pointer model.
2. **Extra Words popup — "half see-through" / background.** `.extra-words` is
   `position:absolute`, `rgba(0,0,0,.9)`, `z-index:100`, full-size; CSS byte-identical to
   HEAD. The see-through render is upstream of WDA (parent stacking context, theme load, or
   `InteractionOverlay` interplay) and needs runtime diagnosis in the browser.

Both deferred to the next FE sweep; logged here so `0006` cannot be ticked until looked into.

### 11.15.1 Amendment — context location + barrel convention (2026-09-11)

**Correction to §11.14.** That log states `src/context/` was **deleted** and
`Session` moved to `src/app/Session/`, with `AppContext` at
`src/app/App.context.tsx`. **No such artifacts exist.** The context layer
survived at a different path:

```text
src/shared/context/
├── index.ts               ← barrel (single entry point)
├── AppContext/            App.context.tsx, AppContext.types.ts, index.ts
└── SessionContext/        Session.context.tsx, SessionContext.types.ts,
                           LocalSession.ts, Session.query.ts,
                           useSessionContext.ts, index.ts
```

The `@shared-context` alias is intact in `tsconfig.json`, `vite.config.ts`, and
the jest mapper, pointing at `src/shared/context`. `src/context/` itself no
longer exists — so a move did happen, but to `src/shared/context/`, not to
`src/app/`.

**Barrel convention adopted.** `src/shared/context/index.ts` is the **single
public entry point** for the context layer, re-exporting `AppContextProvider`,
`useAppContext`, `AppContextValues`, `LocalStorage`, `Session`, `LocalSession`,
`SessionContext`, `SessionContextValues`. `AppContext/index.ts` also barrels.

- **Consumers MUST import `@shared-context` only — never a deep subpath**
  (`@shared-context/SessionContext`, `@shared-context/AppContext/App.context`,
  or any `.types` path). Deep paths defeat the barrel: a future move becomes an
  N-file sweep instead of a one-line change.
- **Applied 2026-09-11:** 27 consumer files collapsed from deep paths onto the
  barrel (app, portfolio, projects, shared/components, and test helpers).
  `tsc` green.
- `SessionContext` — the raw context object — is exported from the barrel
  **solely** for test helpers (`Nav.spec.utils`, `Screen.spec.utils`). It is a
  test-only escape hatch, not public API.
- Same sweep renamed `Admin.query.ts` → `Admin.queries.ts` (role-suffix
  conformance, §3.3).

**Consequence for §8.** The `AppContext` naming trap open question is resolved:
`App.context.tsx` denotes the app _context_, not the app _root_, and correctly
lives under `shared/context/AppContext/`.

### 11.16 Individual file review — next step (2026-08-31, requirements in progress)

**Next step in this ticket: review each FE file individually** against the
conventions locked in by the structural work above, and log a per-file verdict.
The structure/placement sweeps (relocation, aliasing, dissolving `routing/`,
`context/`, `shared-components`) are done; what remains is a **per-file
conformance pass** so role-suffix, return-value naming, aliasing, and import
ordering are **verified file-by-file**, not just batch-moved.

`REQUIREMENTS PENDING — Captain Tschiboka is drafting the exact requirements.`
This section is a scaffold; fill in the concrete rules/checklist once they land.

**Execution order (decided):** every FEATURE and SUBFEATURE is addressed, and
every folder (`common/`, `shared/`, and their subfolders) is covered. **Every
file in `src/` is reviewed individually.** The checklist below enumerates every
feature and subfeature to tick out and comment on, in review order. File-level
detail per folder is captured in the per-file review log (§11.16 rows) once the
review steps for each are collected.

### 11.16.1 Feature / subfeature review checklist (`src/`)

**Root files (`src/`):** `main.tsx`, `main.styles.scss`, `router.tsx`,
`globals.d.ts`, `vite-env.d.ts`, `setupTests.ts`

**APP — `src/app/`**

```
APP

[ ] App root files / barrels
[x] Activities
[x] Admin
ok [x]   Admin BreakdownPreview
ok [x]   Categories
[ ] EmailVerification
[ ] Events
[ ] Home
[ ]   Home WebsiteStats
[ ]     WebsiteStats ActivityDetailsModal
[ ]     WebsiteStats ActivityTypePill
[ ]     WebsiteStats BreakdownTable
[ ] Login
[ ] Logout
[ ] Record
[ ]   Record AddRecords
[ ] Register
[ ] Remote
[ ] Stats
[ ] Tasks
[ ] User
[ ] UxStories
[ ]   UxStories components
[ ]     AccessGuards
[ ]     Buttons
[ ]     CodeBlocks
[ ]     Figures
[ ]     Forms
[ ]     Layouts
[ ]     Links
[ ]     LoadingIndicators
[ ]     Overlays
[ ]     Pills
[ ]     Regions
[ ]     StoryNav
[ ]     Tables
[ ]     TestAccessor
[ ]     Toggles
[ ]     Typography
[ ] App.routes
```

**PORTFOLIO — `src/portfolio/`**

```
PORTFOLIO

[ ] Portfolio root files / barrels / routes
[ ] About
[ ]   About components (AchievementList, AchievementListItem)
[ ] Article
[ ]   Article shell + registry (articles.ts, references.ts)
[ ]   Article content (14 articles + TemplateArticle)
[ ]     CyclicEmailScheduling
[ ]     DailyAnalyticsEmail
[ ]     GitCheatsheet
[ ]     GreenRooftop
[ ]     HookPattern
[ ]     JsDateValidation
[ ]     JsSorting
[ ]     Maybe
[ ]     ReactAnatomy
[ ]     RiffMaster
[ ]     SoundsWithHowler
[ ]     StoppingTestEntropy
[ ]     TemplateArticle
[ ]     ZIndexLayers
[ ]   Article components (LikeButton, References, InlineReference, Disclaimer)
[ ] Blog
[ ]   Blog components (BlogCard, BlogFilter, BlogTimeStamp, SuggestedArticles)
[ ] Clock
[ ] Contact
[ ]   Contact MessageAcknowledgement
[ ] Home
[ ] PrivacyPolicy
[ ] Projects
[ ]   Projects ProjectCard
[ ]   Projects ProjectFilter
[ ] UnderConstruction
[ ] Portfolio assets
[ ] Portfolio.routes
```

**PROJECTS — `src/projects/`**

```
PROJECTS

[ ] Projects root files / barrels / routes
[ ] Gym
[ ]   Gym components (ExerciesesSection → ExercisesSection typo)
[ ] Typist
[ ]   Typist Editor
[ ]   Typist HeadsUpDisplay
[ ] WordDuelArena
[ ]   WordDuelArena common
[ ]     common components (Modal, Options, Svg)
[ ]     common utils (ApiPaths, Navigation, Queries, Types, Word)
[ ]   WordDuelArena Home
[ ]     Home InvitationModal
[ ]   WordDuelArena LevelCreator
[ ]     LevelCreator LevelPreview
[ ]     LevelCreator WordOptionList
[ ]   WordDuelArena Session
[ ]     Session SessionGame
[ ]       SessionGame ExtraWords
[ ]       SessionGame GameControls
[ ]       SessionGame LetterWheel
[ ]       SessionGame SolutionBoard
[ ]     Session SessionHeader
[ ]     Session SessionOverlay
[ ]   WordDuelArena SessionWebSocket
[ ] Xmas2025
[ ] Projects assets
[ ] Projects.routes
```

**SHARED — `src/shared/`** (cross-cutting shared — reviewed as folders/subfolders)

```
SHARED

[ ] shared assets
[ ] shared components
[ ]   AccessGuard
[ ]   Figure
[ ]   Footer
[ ]   Nav
[ ]     Nav Components
[ ]     Nav MobileMenu
[ ]     Nav Submenu
[ ]     Nav SubNav
[ ]   Overlay
[ ]   PageSideMenu
[ ]   RouteError
[ ]   Screen
[ ]   ShareMenu
[ ]   VersionChecker
[ ]   ZoomedImage
[ ] shared context
[ ]   AppContext
[ ]   SessionContext
[ ] shared queries (Likes, Visits)
[ ] shared styles (animations, breakpoints, font_sizes, mixins, palette, shadows)
```

### 11.16.2 Review steps (definitive rubric in the skill)

> **The strict review rubric now lives in `.github/skills/review/SKILL.md`**
> (agent-invocable) — that file is the single source of truth. The ticket below
> only records the key decisions and the review format; keep it in sync with
> the skill when the rubric changes.

**Strict Requirement List for Auditing Source Files — Review Results.** Scores
0.0–10.0 (0.0 = non-existent, 10.0 = impeccable). **GENERIC SCORE** = mean of
the scored dimensions, 1dp; **N/A dims excluded**. Standards of reference:
`ARCHITECTURE.md` (EXTENSION/NAMING both trace to it). Full per-dimension
anchors (3/6/8/10), severity floor (any dim ≤3 ⇒ not passing), generic-score
cutoff (≥7 pass / 5–6.9 weak / <5 fail), VERDICT, and ARCHITECTURE gaps note —
all in the skill.

**Layer-aware (FE + BE):** a `LAYER: FE | BE` field selects the anchor set —
Architecture §1 (FE) or §2 (BE). Most dimensions are identical; only EXTENSION
(suffix set), IMPORTS (FE 4-tier vs BE 3-tier + §5.1 dependency check), and the
RETURN example vary. BE is the canonical `Feature<Role>` anchor (§2.3).

**Review format (exact):**

```
FILE: <path>
LAYER: <FE | BE>   # anchors from Architecture §1 (FE) or §2 (BE)
VERDICT: <CONFORMS | DEVIATES | CHANGE-ACCEPTED | CHANGE-REJECTED>  <reason>
GENERIC SCORE: <0.0-10.0>
COHESIVENESS | LOCATION | EXTENSION | IMPORTS | NAMING | RETURN
TYPED | ERRORFREE | STANDARD | TESTED:  <0.0-10.0 each, N/A allowed>
IMPROVEMENTS: <MUST/SHOULD/COULD, or NONE>
APPROVED: <YES|NO>   # optional — tracked sweep or on request
STATUS: <NOT STARTED | WIP | PAUSED | DONE>
NOTES: <only on PAUSED - handover instructions>
```

**Key decisions landed during rubric design:**

- **IMPROVEMENTS** prioritised `MUST / SHOULD / COULD` (+ `none`), unscored.
- **APPROVED** is optional — used for the long-list sweep, omitted for one-off
  reviews. APPROVED=NO ⇒ not DONE regardless of score.
- **Persist is optional** — reviews are ephemeral by default; persist to this
  ticket only on request or during the tracked sweep. On PAUSE: save current
  score + last-reviewed row.
- **Severity floor** added — a mean hides a single broken axis.
- **Anchor scale + N/A** added for reproducibility and fair non-code scoring.
- **Layer-aware (FE + BE)** — one skill, `LAYER` field; EXTENSION/IMPORTS/RETURN
  anchors carry both variants; keeps BE from needing a forked skill.

**Run protocol:**

1. Agent gives the nth feature + file name (prompts if none given).
2. Captain opens the file; edits or suggests.
3. Agent argues compliance (records VERDICT, pushes back where off-standard).
4. Agent fills the review result and scores strictly/realistically.
5. Persist (optional): update this ticket on request; on PAUSE save score + row.

### 11.16.3 Running review log (persisted rows)

> **Honesty gate:** sweep is tooling-in-progress for the _remaining_ features;
> `BreakdownPreview` (rows 2–9) and `Categories` (rows 10–21) are **build/
> test-verified and approved**. Unreviewed/queued rows stay `APPROVED=NO`,
> provisional scores of conformance — not verified builds — until a real
> build + regression pass. The severity floor stands: TESTED=0 ⇒ not passing.

| #   | File                                                           | LAYER | VERDICT  | COH | LOC | EXT | IMP | NAM | RET | TYP | ERR | STD | TEST | **GEN** | IMPROVEMENTS                                                 | APPROVED | STATUS |
| --- | -------------------------------------------------------------- | ----- | -------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ------- | ------------------------------------------------------------ | -------- | ------ |
| 1   | `src/app/Activities/Activities.tsx`                            | FE    | CONFORMS | 8   | 9   | 9   | 10  | 9   | 8   | 8   | 10  | 8   | N/A  | **8.7** | N/A (TESTED) — placeholder leaf, not yet a feature           | YES      | DONE   |
| 2   | `src/app/Admin/BreakdownPreview/BreakdownPreview.tsx`          | FE    | CONFORMS | 9   | 10  | 9   | 9   | 9   | 9   | 9   | 9   | 9   | 8    | **9.0** | COULD — dedicated sub-component specs                        | YES      | DONE   |
| 3   | `src/app/Admin/BreakdownPreview/BreakdownPreview.constants.ts` | FE    | CONFORMS | 9   | 10  | 9   | 8   | 9   | 9   | 9   | 9   | 9   | N/A  | **9.0** | N/A (TESTED) — no behaviour                                  | YES      | DONE   |
| 4   | `src/app/Admin/BreakdownPreview/BreakdownPreview.styles.ts`    | FE    | CONFORMS | 9   | 10  | 9   | 8   | 9   | 8   | 8   | 9   | 9   | N/A  | **8.8** | COULD — residual `6px`/`10px`/rem literals (no shared const) | YES      | DONE   |
| 5   | `src/app/Admin/BreakdownPreview/BreakdownPreview.types.ts`     | FE    | CONFORMS | 10  | 10  | 9   | N/A | 9   | 10  | 10  | 10  | 9   | N/A  | **9.6** | N/A (IMPORTS/TESTED)                                         | YES      | DONE   |
| 6   | `src/app/Admin/BreakdownPreview/components/Header.tsx`         | FE    | CONFORMS | 9   | 10  | 9   | 9   | 9   | 9   | 9   | 9   | 9   | 8    | **9.0** | COULD — dedicated spec                                       | YES      | DONE   |
| 7   | `src/app/Admin/BreakdownPreview/components/DataSection.tsx`    | FE    | CONFORMS | 8   | 10  | 9   | 9   | 9   | 9   | 9   | 9   | 9   | 7    | **8.8** | COULD — dedicated spec                                       | YES      | DONE   |
| 8   | `src/app/Admin/BreakdownPreview/Signature.tsx`                 | FE    | CONFORMS | 9   | 10  | 9   | 9   | 9   | 9   | 9   | 9   | 8   | 7    | **8.8** | COULD — dedicated spec; London-pinned time via shared util   | YES      | DONE   |
| 9   | `src/app/Admin/BreakdownPreview/index.ts`                      | FE    | CONFORMS | 10  | 10  | 9   | 9   | 9   | 9   | 9   | 10  | 9   | N/A  | **9.3** | N/A (TESTED)                                                 | YES      | DONE   |
| 10  | `src/app/Categories/Categories.tsx`                            | FE    | CONFORMS | 8   | 9   | 9   | 8   | 9   | 9   | 8   | 10  | 9   | 9    | **8.8** | COULD — type-only import (done)                              | YES      | DONE   |
| 11  | `src/app/Categories/Categories.columns.ts`                     | FE    | CONFORMS | 9   | 9   | 8   | 8   | 9   | 9   | 9   | 10  | 9   | N/A  | **8.9** | N/A (TESTED) — indirect                                      | YES      | DONE   |
| 12  | `src/app/Categories/Categories.defaults.ts`                    | FE    | CONFORMS | 10  | 9   | 9   | 10  | 10  | 10  | 10  | 10  | 10  | N/A  | **9.4** | N/A (TESTED) — no behaviour                                  | YES      | DONE   |
| 13  | `src/app/Categories/Categories.handlers.ts`                    | FE    | CONFORMS | 9   | 9   | 9   | 8   | 10  | 9   | 9   | 10  | 9   | 8    | **9.0** | none                                                         | YES      | DONE   |
| 14  | `src/app/Categories/Categories.options.ts`                     | FE    | CONFORMS | 9   | 9   | 9   | 8   | 10  | 9   | 9   | 10  | 9   | 8    | **9.0** | none                                                         | YES      | DONE   |
| 15  | `src/app/Categories/Categories.queries.ts`                     | FE    | CONFORMS | 8   | 9   | 9   | 8   | 10  | 9   | 8   | 10  | 9   | N/A  | **8.8** | N/A (TESTED) — indirect via feature spec                     | YES      | DONE   |
| 16  | `src/app/Categories/Categories.schema.ts`                      | FE    | CONFORMS | 9   | 9   | 9   | 7   | 10  | 9   | 8   | 10  | 9   | N/A  | **8.8** | N/A (TESTED) — indirect; IMPORTS minor                       | YES      | DONE   |
| 17  | `src/app/Categories/Categories.transformers.ts`                | FE    | CONFORMS | 9   | 9   | 9   | 8   | 10  | 9   | 9   | 10  | 9   | 8    | **9.0** | none                                                         | YES      | DONE   |
| 18  | `src/app/Categories/Categories.types.ts`                       | FE    | CONFORMS | 10  | 9   | 9   | 9   | 9   | 9   | 9   | 10  | 9   | N/A  | **9.2** | N/A (TESTED) — no behaviour                                  | YES      | DONE   |
| 19  | `src/app/Categories/tests/Categories.spec.utils.ts`            | FE    | CONFORMS | 9   | 9   | 9   | 8   | 9   | 9   | 9   | 10  | 9   | N/A  | **9.0** | N/A (TESTED) — test support                                  | YES      | DONE   |
| 20  | `src/app/Categories/tests/Categories.mockHandles.ts`           | FE    | CONFORMS | 9   | 9   | 9   | 8   | 10  | 9   | 9   | 10  | 9   | N/A  | **9.1** | N/A (TESTED) — test support                                  | YES      | DONE   |
| 21  | `src/app/Categories/tests/Categories.mocks.ts`                 | FE    | CONFORMS | 9   | 9   | 9   | 10  | 10  | 9   | 10  | 10  | 9   | N/A  | **9.4** | N/A (TESTED) — test support                                  | YES      | DONE   |

`✱` = GENERIC 7.9 but **floor violated** (TESTED 0 ≤ 3) ⇒ not passing, WIP.

**2026-09-05 — `Activities` (row 1):** not yet a real feature — a placeholder
Screen-shell leaf with no data/handlers/logic. TESTED set to N/A (no behaviour
to assert), GEN recomputed 8.7, no floor violation. Marked **DONE**, `APPROVED=YES`.
Checklist `Activities` reviewed. Revisit when it gains real behaviour.

**2026-08-31 — `BreakdownPreview` group (rows 2–9):** reviewed + refactored to conform — sub-components split to `components/`, styles region-grouped + single-sourced to `Const.Color`/`Const.Spacing`/`DateTime`, `Signature` de-defaulted + deterministic (`sentAt`), icons via shared `common/ux/Icon`. All CONFORMS (no floor). **DONE** — 14-test spec green + live test passed; Captain approved (`APPROVED=YES`). Checklist `Admin BreakdownPreview` reviewed. Residual COULDs (dedicated sub-specs, London-pinned time) are non-blocking.

**2026-08-31 — `Categories` group (rows 10–21):** reviewed + refactored to conform — roles grouped (`CategoriesQueries`/`CategoriesHandlers`/`CategoriesOptions`/`CategoriesSchema`/`CategoriesTransformers`/`CategoriesDefaults`), `columns` → `CategoriesColumns`, `getParent` → `CategoriesTransformers`, §5.2 import tiers + type-only imports, `Styles.scss` import corrected, a11y label `for="name"` wired, handler swallows post rejection (no unhandled error), feature test scaffold added in `tests/` (`CategoriesMocks`/`CategoriesMockHandlers`/`CategoriesTestUtils` + 9-test feature spec + pure specs for handlers/options/transformers). All CONFORMS (no floor; min 7). **DONE** — 15/15 specs green, zero unhandled errors; Captain approved (`APPROVED=YES`). Checklist `Categories` reviewed. Also codified the `tests/` support-file return convention (`FeatureMocks`/`FeatureMockHandlers`/`FeatureTestUtils`, incl. `customRender`) into ARCHITECTURE §1.2.1.

**2026-09-12 — `Admin` (parent feature):** reviewed + closed. Renamed
`Admin.query.ts` → `Admin.queries.ts`; `useAdminApi` → `useAdminQueries`;
`AdminProps` kept as a top-level type on the component (ARCHITECTURE §1.2.1 row
added so the rule is explicit). Test scaffold added: `AdminMocks` (MockBuilder),
`AdminMockHandlers.Backfill.Post` + `Defaults`, `AdminTestUtils` umbrella, and a
3-test feature spec (backfill happy path). **DONE** — spec green. Checklist
`Admin` reviewed.

### 11.16.4 Amendment — mock + test conventions (2026-09-12)

New `create-tests` skill (`.github/skills/create-tests/SKILL.md`) plus supporting
infrastructure, all now documented:

1. **`common/mocks/`** — the common mock home, aliased **`@common-mocks`**
   (tsconfig, vite, jest). One file per API resource (`User.mocks.ts` →
   `MockUser`), plus `TestMocks.ts` (shared primitives) and an `index.ts` barrel
   whose exports are **alphabetical by exported symbol**. Feature-local variants
   stay in `Feature/tests/Feature.mocks.ts`.
2. **`MockBuilder`** extended to `modify`/`setValue`/`set`/`update`/`omit`/`pick`/
   `asList`/`buildList`/`build` + `MockEntitiesBuilder`, with a 51-test spec.
   Spread-overrides are banned; derivations go through the builder.
3. **`FeatureMockHandlers.<SubFeature>.<Verb>`** umbrella (ARCHITECTURE §1.2.1),
   with `Defaults` holding the spec's handler set and the shared builder hoisted
   to a local const.
4. **`FeatureTestUtils`** umbrella (ARCHITECTURE §1.2.1 / §1.2.2) —
   everything above `describe` lives there: `labels`, `customRender(handlers =
FeatureMockHandlers.Defaults)`, section accessors. The spec is imports +
   `describe` only.
5. **Spec style** — every `it` reads `it('should <verb> …')`; no braces around a
   single-statement arrow body; built-in accessors (`Test.Section`, `Test.Form`,
   `Accessor.user`) used in preference to raw queries.
6. **ARCHITECTURE §5.2 is now 5-tier (FE) / 4-tier (BE)** — type-only imports are
   gathered into a single tier immediately above assets, the one deliberate
   exception to "order by source, not by role".

`Admin` was the first feature to apply all of the above.

### 11.16.5 Amendment — query conventions + `Paths` restructure (2026-09-12)

New `create-query` skill (`.github/skills/create-query/SKILL.md`), written from
`Admin.queries.ts` and `EmailVerification.queries.ts`.

**`Paths` (was `Path.ts`, folder `common/utils/Paths/`)**

1. One file, one export: **`Paths`** holds `Api`, `Projects` and `Client`.
   `Api`/`Projects` are server endpoints (URL fragments); `Client` holds page
   routes used as-is by the router. They share `/api` by mounting convention,
   not by relationship.
2. **`apiPathBuilder` no longer does a lookup** — it prefixes the host onto the
   value. `ProjectKey`-style key tables are gone; `PathKey = keyof typeof
Paths.Api | keyof typeof Paths.Projects` is derived.
3. **Call sites pass the key, not the value**: `new RequestBuilder('Gym')`, never
   `RequestBuilder(Paths.Projects.Gym)` — the latter is the URL.
4. **Redirects use `Paths.Client.*`** (`navigate(Paths.Client.Login)`), replacing
   five hand-written `'/api/login'` literals in `EmailVerification.queries.ts`,
   `Screen.tsx`, `Register.tsx` and two specs. `App.routes.tsx` reads the same
   constants for its first four routes.
5. `PathKey` and `ClientRoute` are exported from `@common-utils` (the barrel),
   not deep-imported.

**Queries**

6. Two builders, one rule: **`FeatureQuery`** when the mutation has a body and
   `.data` should be unwrapped; **`RequestBuilder`** for a payload-less POST or
   when the caller needs the raw `AxiosResponse`.
7. A body-less mutation is typed `useMutation<TData, TError, void>` with
   `mutationFn: () => …`. `FeatureQuery.Post` requires `TRequest extends object`
   and returns hook options, so it does not fit — casting it to fit is the bug
   this rule exists to prevent.
8. The token is read with `Session.useContext()` **inside the hook**. A plain
   helper calling it is a Rules-of-Hooks violation; a shared hook in `common/`
   takes `token` as a parameter instead (no `common/` → `src/` import).
9. Umbrella export — **`<FileName>Queries`, verbatim** (`Likes.queries.ts` →
   `LikesQueries`, no singularising), and the **hooks themselves are never
   exported**: the umbrella is the file's whole public surface. Inside it, a flat
   file keeps the plain verb — `RegisterQueries.usePost`, `CategoriesQueries.useGet`
   — and a group appears only when a **second noun** enters the file:
   `LoginQueries.usePost` beside `LoginQueries.Settings.useGet`. A group marks a
   noun change, never a subfeature. Options are a plain object, never
   `Pick<UseMutationOptions…>`.
10. **A feature query is the generic approach.** The hook declares how the request
    is handled — path, token, `QueryKey`, plus whatever policy belongs to it:
    default success/error messages, invalidation, retry, `staleTime`. The component
    owns the flow (what to render, where to redirect, when to fire). **Every shared
    default is overridable** — spread `...request.Post({ onSuccess })`, never
    `...request.Post({ onSuccess: () => … })`. The hook sets defaults; it never takes
    the decision away. One caller may supply callbacks in the component; two
    sharing behaviour moves that behaviour into the hook.
11. **Hooks return react-query's own result**, unwrapped — no `res.data` off an
    axios response, no hand-picked `{ data, refetch }`. `Admin.tsx` is the shape:
    `const { mutate, isPending } = AdminQueries.DailyBreakdown.usePost({ … })`.
    **Exception — a single-screen flow:** when one screen, one request fired on
    mount, and no second caller, the `.queries.ts` may own the token, the message
    state, the redirect and the firing effect, returning a shaped object. This is
    now `EmailVerification`'s shape again, reversed from the earlier note: the
    effect belongs with the request it fires, and the screen renders only.
    The moment a second caller appears, drop back to the plain rule.
12. **Errors go through `errorMessage(error, fallback)`** from `@common-utils`,
    with the fallback a `ClientMessage` call — never a handwritten sentence. Server
    message primary, FE catalogue message fallback, which is why
    `ErrorResponse.message` is optional. The inline
    `error.response?.data?.message ?? error.message` pattern is retired — the axios
    `error.message` fallback leaks library text ("Network Error") to the user.
    Applied in `Login.tsx` and `Register.tsx` this round; `Register` uses
    `ClientMessage.Failure.Create('account')`, `Login` uses `Failure.Login()`.
13. **`common/types` response shapes carry ISO strings, not `Date`.** A `Date`
    cannot survive JSON serialisation — the browser receives a string — so a
    `Date` in a response type is inaccurate _and_ blocks `RequestBuilder`, whose
    `JsonBodyType` constraint rejects it (the "Unsafe assignment of an `any`"
    symptom). `PostVisitResponse.visitDate` and `PostLikeResponse.likeDate` were
    the two offenders; both are now `string`, with
    `Visit.service.ts` and `Like.service.ts` piping through
    `DateTime.Format.toIso`, matching what `Activity.transformers.ts` already did.
14. **Clobber list — five files destroyed and rebuilt.** A mis-escaped bulk rename
    overwrote these with `Visits.queries.ts` content; each was rebuilt against its
    consumer's contract:

    | File                                                 | Rebuilt as                                                                                                      |
    | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
    | `src/app/Home/WebsiteStats/WebsiteStats.queries.ts`  | `WebsiteStatsQueries.useGet` — `FeatureQuery('Activity').subpath('admin')`, unwrapped `GetActivityFeedResponse` |
    | `src/app/Login/Login.query.ts`                       | `LoginQueries.usePost` + `LoginQueries.Settings.useGet` — converted from a request-factory bundle to real hooks |
    | `src/app/Register/Register.query.ts`                 | `RegisterQueries.usePost`                                                                                       |
    | `src/portfolio/Contact/Contact.query.ts`             | _(outstanding)_                                                                                                 |
    | `src/shared/context/SessionContext/Session.query.ts` | _(outstanding)_                                                                                                 |

    `Categories.queries.ts` and `Likes.queries.ts` were hit by the same mishap and
    are both rebuilt (`CategoriesQueries`, `LikesQueries`). `Visits.queries.ts` is
    the source file the others were overwritten with; it is intact.

**Also fixed:** `EmailVerification.queries.ts` and `Admin.queries.ts` follow points
7 and 11. `Visits.queries.ts` gained `useRecordVisit` (owns the empty-path,
localhost and incognito guards, calls the private `postVisit`); `Screen.tsx` calls
`VisitsQueries.useRecord(path)` and no longer imports `@shared-queries`,
`detectincognitojs` or `Browser`. The `recordVisit` prop was deleted — nothing
passed it.

**Open:** `Contact.query.ts` and `Session.query.ts` are still clobbered. The
`Login`/`Register`/`Contact` screens were converted from a `useXApi()` bundle of
raw request functions to real hooks this round; `Contact` still needs the same
treatment.

## 12. Related docs / links

- [`ARCHITECTURE.md`](../ARCHITECTURE.md) — §1 FE structure, §1.2 roles,
  §1.4 allowed suffixes, §4.4 generic components, §2.6 server `FeatureSchema`.
- [`0004-api-responder.md`](./0004-api-responder.md) — prior BE/FE sweep;
  established the server `FeatureSchema`/namespace conventions this ticket
  extends to the FE.
- [`0002-util-reuse-sweep.md`](./0002-util-reuse-sweep.md) — prior common/ util
  consolidation; precedent for sweep-style tickets.
- [`INDEX.md`](./INDEX.md) — doc registry.
