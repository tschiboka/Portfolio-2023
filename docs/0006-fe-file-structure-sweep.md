# 0006 — FE file structure sweep

> **Status:** In progress — alias migration, server restructure, asset distribution, `common/` impurity sweep, shared-components sweep, `routing/` dissolve + feature-route pattern, and app-page de-default done (2026-08-31); remaining role-suffix / barrel / `App.tsx`-composition / ARCHITECTURE updates pending
> **Last updated:** 2026-08-31
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

| Feature                               | Files                                                                                                                        | Main export                   | `index.ts` | Deviations                                                           |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ---------- | -------------------------------------------------------------------- |
| About                                 | `About.tsx`, `.scss`                                                                                                         | `export default`              | ❌         | default; no barrel                                                   |
| Home                                  | `Home.tsx`, `tests/`, subfeatures                                                                                            | `export default`              | ❌         | default; no barrel                                                   |
| Blog                                  | `Blog.tsx`, `.scss`, **`Blog.type.ts`**, `Blog.utils.ts`, `BlogFilter/`, `tests/`                                            | `export default Blogs`        | ❌         | singular `.type`; `Blogs`≠`Blog`; `.utils` unlisted                  |
| Contact                               | `Contact.tsx`, `.scss`, `Contact.types.ts`, `Contact.schema.ts`, **`Contact.query.ts`**, `MessageAcknowledgement/`, `tests/` | `export default`              | ❌         | singular `.query`; schema = lowercase `contactSchema`                |
| PrivacyPolicy                         | `PrivacyPolicy.tsx`, `.scss`                                                                                                 | `export default`              | ❌         | default; no barrel                                                   |
| UnderConstruction                     | `UnderConstruction.tsx`, `.scss`                                                                                             | `export default`              | ❌         | default; no barrel                                                   |
| Projects                              | `Projects.tsx`, `.types`, `.defaults`, `.selectors.tsx`, `ProjectCard/`, `ProjectFilter/`, `tests/`                          | `export const Projects`       | ✅         | `.selectors.tsx` extension; OK otherwise                             |
| API/Categories                        | `Categories.tsx`, `.scss`, `.types`, `.schema`, `.columns`, `.queries`, `.transformers`, `.utils`, `icons.tsx`, `colors.tsx` | `export default Categories`   | ✅         | default; `categoriesSchema` factory; `icons.tsx`/`colors.tsx` ad-hoc |
| API/Login, Register                   | `.tsx`, `.scss`, `.types`, `.schema`, `.query.ts` (singular), `tests/`                                                       | default                       | ❌         | singular `.query`                                                    |
| API/Admin                             | `Admin.tsx`, `Admin.query.ts`                                                                                                | —                             | ❌         | singular `.query`                                                    |
| API/EmailVerification                 | `.tsx`, `.scss`, `.query.ts`, `Index.tsx`                                                                                    | —                             | ❌         | singular `.query`; capitalised `Index.tsx`                           |
| Misc/Xmas2025                         | `.tsx`, `.styles.scss`, `.types`, `.schema`, `.queries`, `.transformers`, subfeatures, `tests/`                              | `export default Xmas2025`     | ❌         | `.styles.scss`; default                                              |
| Misc/Typist                           | `.tsx`, `.utils`, `.types`, `.transformers`, `.queries`, `.context`, subfeatures                                             | —                             | ❌         | `.context`; unlisted                                                 |
| Misc/WordDuelArena                    | deep tree; `LevelCreator/`, `Home/`, `common/`, `Session/`                                                                   | named                         | mixed      | `.hooks`, `.handlers`, `.schema`, `.context`, `.reducer`             |
| Misc/Gym                              | `Gym.tsx`, `Gym.queries.ts`, `components/ExerciesesSection/`                                                                 | —                             | ❌         | typo `Exercieses`                                                    |
| API/Index/WebsiteStats/BreakdownTable | `.tsx`, `.types`, `.columns`, `.actions`, `.filters`, `.transformers`, `.controller`, `index.ts`                             | `export const BreakdownTable` | ✅         | `.filters`/`.controller` unlisted; `activityColumns` naming          |

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

## 12. Related docs / links

- [`ARCHITECTURE.md`](../ARCHITECTURE.md) — §1 FE structure, §1.2 roles,
  §1.4 allowed suffixes, §4.4 generic components, §2.6 server `FeatureSchema`.
- [`0004-api-responder.md`](./0004-api-responder.md) — prior BE/FE sweep;
  established the server `FeatureSchema`/namespace conventions this ticket
  extends to the FE.
- [`0002-util-reuse-sweep.md`](./0002-util-reuse-sweep.md) — prior common/ util
  consolidation; precedent for sweep-style tickets.
- [`INDEX.md`](./INDEX.md) — doc registry.
