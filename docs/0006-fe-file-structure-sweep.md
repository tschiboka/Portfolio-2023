# 0006 — FE file structure sweep

> **Status:** Planned
> **Last updated:** 2026-08-29
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
- [ ] Relocate generic components to `common/ux/` (§3.2)
- [ ] Delete empty `src/sharedComponents/Article/`
- [ ] Add FE `App.tsx` composition root; slim `main.tsx` (§3.1)
- [ ] Rename/fold `context/AppContext/App.context.tsx` naming trap
- [ ] Resolve `Nav/` + app-level component placement (§8)

**Role suffixes** (per feature batch)

- [ ] `Blog.type.ts` → `Blog.types.ts`
- [ ] `*.query.ts` → `*.queries.ts` (Contact, Admin, EmailVerification, Login, Register)
- [ ] Standardise style-file naming
- [ ] Add/lock `.utils`/`.context`/etc. in `ARCHITECTURE.md` (§8)
- [ ] Fix typos (`Exercieses`, `codeSnipets`, `RactAnatomy`)

**Return-value naming**

- [ ] `.schema.ts` → `FeatureSchema` namespace (Contact, Categories, Xmas2025, ...)
- [ ] `.columns.*` → `FeatureColumns` (BreakdownTable, Categories)
- [ ] Main files → `export const Feature` (drop `export default`)
- [ ] `Blog.tsx` → export `Blog` (not `Blogs`)

**Barrels & verify**

- [ ] Add `index.ts` to every feature folder
- [ ] `tsc` + lint + FE tests green per batch
- [ ] Grep for stale default-export/old-path imports
- [ ] Update `ARCHITECTURE.md` (§3.6)
- [ ] Update repo memory with final conventions

## 10. Related docs / links

- [`ARCHITECTURE.md`](../ARCHITECTURE.md) — §1 FE structure, §1.2 roles,
  §1.4 allowed suffixes, §4.4 generic components, §2.6 server `FeatureSchema`.
- [`0004-api-responder.md`](./0004-api-responder.md) — prior BE/FE sweep;
  established the server `FeatureSchema`/namespace conventions this ticket
  extends to the FE.
- [`0002-util-reuse-sweep.md`](./0002-util-reuse-sweep.md) — prior common/ util
  consolidation; precedent for sweep-style tickets.
- [`INDEX.md`](./INDEX.md) — doc registry.
