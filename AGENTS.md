# AGENTS.md

Project-wide instructions for AI coding assistants working in this repository.

## 1. How to work with me

Your role: assist, search, guide, ideate. My role: the above **plus** design and engineering decisions, improving as an engineer — and above all, enjoying the process of designing, exploring, and coding.

### 1.1 Explore before implementing

Unless I say otherwise, **explore and propose first — do not jump straight to code.**

When I ask you to do a task, I want exploration and a proposal, not an immediate implementation.

- Identify important assumptions.
- Consider meaningful alternatives.
- Explain relevant trade-offs.
- Make a clear recommendation.
- When there is a meaningful architectural or engineering trade-off, explain the reasoning briefly so I can make the decision myself.
  Don't hide engineering decisions behind implementation.

### 1.2 Editing

**Always ask before editing files.**

You may freely inspect files, search, analyse the codebase, and reason about solutions. **Editing files requires my explicit approval.**

When an edit is approved, keep it small and independently reviewable. Avoid changing multiple files at once unless the solution is genuinely simple and straightforward.

If a solution requires several files, explain why before editing them.

**Don't turn me into a passenger pressing "accept".** I want to understand and own the engineering decisions and code.

### 1.3 Terminal and CLI commands

**Never execute terminal or CLI commands without my explicit request or approval.**

This includes, but is not limited to:

- build
- test
- `tsc`
- lint
- formatting
- Git commands
- package-manager commands
- scripts
- GitHub commands or operations
- commands against external services
  Do not assume a command is acceptable simply because it is read-only or only intended to validate a change.

If you think a command should be run, **propose it and wait for my approval first.**

### 1.4 Be brief

Be concise. Use as few words as necessary without losing useful information.

Don't pad responses with filler or explanations of things that are already obvious to me.

Don't repeatedly restate my instructions, the problem, or context I already know.

### 1.5 Be honest, not a yes-man

Contradict me when I'm wrong. Push back and challenge ideas when it helps.

No excessive politeness. Don't reflexively agree, and don't soften bad news unnecessarily.

Avoid phrases such as "great point", "exactly", or "you're right" unless your position genuinely changed because of what I said.

If my plan is flawed, say so plainly and explain why.

**Truth over comfort, always.**

### 1.6 General principle

Your job is not simply to produce code.

Help me **think better, make better engineering decisions, and enjoy the process of designing, exploring, and coding.**

## 2. Documentation

The `docs/` folder is the engineering notebook for this project. It is **public** (tracked
in version control and published to GitHub).

- `docs/README.md` is the entry point — it defines the **feature doc template** and points to the
  index. `docs/INDEX.md` holds the live list of all numbered feature documents
  (`docs/NNNN-<topic>.md`) as rows: ID, document, topic, status, created, last updated.
- Each feature document follows the template in `docs/0000-doc-template.md` and uses the
  `NNNN-` numeric prefix for ordering.
- **Always number headings** (`## 1.`, `## 2.`, …; nested like `### 1.1`) in `docs/` files
  (README + feature docs + INDEX) and in this `AGENTS.md`.

### 2.1 When & how to update docs

A **proper feature** (notable, self-contained, planned/significant) requires doc upkeep; small
fixes, trivial refactors, and one-off chores do **not**. When a feature is done, keep the docs
current:

- **New feature** → copy `0000-doc-template.md` to `docs/NNNN-<topic>.md`, fill it in, add a row
  to `INDEX.md` (ID, document, topic, status, created, last updated).
- **Existing feature** → refresh its doc (status, decisions, file map, findings) and update the
  `INDEX.md` row's status + last updated.

**Explicitly excluded:** small fixes, refactors without user-visible scope, one-off chores, and
trivial changes **do not** require doc updates. Use judgment — only properly scoped features get
documented.

### 2.2 Sharing / committing in docs

Because `docs/` is **public**, before adding or committing any content there, **always
check what is safe to share**. Never commit:

- secrets, credentials, API keys, tokens, or passwords
- private/exposed URLs or endpoints (e.g. auth/deploy URLs)
- personal or sensitive data (addresses, emails that are meant to stay private, etc.)

If content is sensitive, keep it out of `docs/` entirely rather than committing it here.

## 3. Code conventions

### 3.1 Naming

**Functions: use brief, imperative verb-style names that say directly what the function does.**
Avoid vague/indirect names. Prefer `getCodec` / `buildCodec` / `resolveCodec` over `codecFor`;
prefer `omitEmptyFilters` over `filterCleaner`; prefer `encodeUrlParam` over `urlParam`.

**Variables: use descriptive names that read like English, not like code.** Never use a single
letter or opaque shorthand unless it's trivially obvious (`e => e.stopPropagation()` is acceptable,
but prefer the full `event`). The name should tell you what's going on even if the file is taken
out of context — without being needlessly long. Prefer `products` over `listItem`, `taxReturnCode`
over `code`, `dateFrom` over `date1`.

**Spelling: use en-GB (British/Commonwealth) in comments, constants, and function names.** Prefer
`colour`, `behaviour`, `optimise`, `organisation`, `neighbour` etc. in prose comments and in
identifier names you author (`getColour`, `behaviour`, `optimiseQuery`). Do **not** rename
literals or third-party/prop names that are part of an existing API contract — e.g. keep the
`color` prop exactly as `color` (that's the DOM/API name), don't "fix" it to `colour`.

### 3.2 File & folder naming

**Use a `Feature/` folder per feature** — `Feature` is the PascalCase feature name (e.g.
`BreakdownTable`, `Button`, `Codec`). Inside it, the files are named after the folder with
suffixes capturing their role. `index.ts` always re-exports the public API.

```text
Feature/                        # the PascalCase folder name (e.g. BreakdownTable)
├── index.ts                    # re-exports public API
├── Feature.tsx                 # main component -> exports Feature
├── Feature.types.ts            # types
├── Feature.transformers.ts     # api-ui transformations
├── Feature.selectors.ts        # selector fns
├── Feature.hooks.ts            # hook fns
├── Feature.context.tsx         # React context
├── Feature.queries.ts          # query handlers
├── Feature.schema.ts           # input validation schemas
├── Feature.controller.ts       # domain hook
├── Feature.filters.ts          # filter config
├── Feature.columns.tsx         # table columns
├── Feature.actions.ts          # row actions
├── Feature.options.ts          # FE declared option objects
├── Feature.styles.css          # CSS Modules / plain CSS
├── Feature.styles.scss         # SCSS (alternative)
├── Feature.styles.ts           # style helpers
├── Feature.utils.ts            # generic feature helpers
├── Feature.constants.ts        # feature consts
├── Feature.defaults.ts         # static form inits (no business logic)
├── Feature.config.ts           # generic configuration
├── SubFeature/                 # cohesive nested sub-feature
│   └── SubFeature.tsx          # exports a sub feature
├── components/                 # small presentational sub-components
│   └── ComponentFoo.tsx
└── tests/
    ├── Feature.spec.tsx        # main spec
    ├── Feature.spec.utils.tsx  # test helpers
    ├── Feature.spec.types.ts   # test-only types
    ├── Feature.mocks.ts        # fixtures
    └── Feature.utils.spec.ts   # unit test for a util
```

**The main file exports a symbol named after the folder** (e.g. `Button.tsx` →
`export const Button`; `BreakdownTable.tsx` → `export const BreakdownTable`).

**Use only the role suffixes listed above.** The `.types` / `.utils` / `.config` / `.constants` /
`.spec` / `.spec.utils` / `.spec.types` / `.mocks` / `.spec.mocks` / `.spec.utils.spec` etc. suffixes
are the **documented, fixed set** — do **not** invent ad-hoc roles (e.g. `Feature.integration.spec`,
`Feature.paging.ts`, `Feature.sorting.ts`). If a file's purpose doesn't match a listed role, keep it
in the primary file or co-locate the helpers under a listed role; adding a new suffix requires
documenting it here first. This prevents recurring "dump" files that accumulate off-list roles.

### 3.2.1 Server file & folder naming

**Organize new server code by feature, not by file type** — same `Feature/` folder per business
entity as the FE (e.g. `Users`, `Exercises`, `MuscleGroup`). Each feature folder holds all its
file types:

```text
server/projects/<project>/Feature/
├── Feature.model.ts       # Mongoose schema + model
├── Feature.routes.ts      # express router (HTTP layer)
├── Feature.controller.ts  # route handlers / request-response wiring
├── Feature.service.ts     # business logic
├── Feature.repository.ts  # data access layer (when split from the service)
├── Feature.schema.ts      # input validation (Joi) — only when split from the model
├── Feature.types.ts       # feature-local types (when not in common/types)
├── Feature.constants.ts   # feature constants
├── Feature.errors.ts      # feature-specific error classes / factories
├── index.ts               # re-exports public API
└── tests/
    └── Feature.spec.ts
```

The domain/types for a feature live in `common/types` per the FE convention; import them here.
Do **not** create top-level shared `models/`, `routes/`, `const/options/` folders for new
features — co-locate them in the `Feature/` folder.

**Grouping related helpers: use a namespace object under a PascalCase name** (e.g.
`Codecs`, `Numbers`, `Browser`, `Strings`, `Path`). Files may export individual symbols and/or
a namespace object gathering them (e.g. `Codecs = { text, number, checkbox }`).

**Namespaces can nest to group a cohesive sub-concern.** Use a second PascalCase key for a
related family, e.g. `Strings.Optional = { trim, toUndefined }` or `Url.Codecs.text`. The path
from namespace to leaf should read like a sentence: `Strings.Optional.trim`. This nesting is
what lets us build great, descriptive names — the namespace scopes the meaning so the leaf can
stay short (`trim`, `toUndefined`) while `Strings.Optional.trim` reads perfectly.

### 3.3 Reuse & DRY

- **Never write one-off generic code.** Intentionally seek the generic bit and extract it
  immediately — do not wait for a third use. We DRY aggressively, to an extreme.
- **Before implementing anything, check `common/` first.** `common/` is the main folder to search
  when checking for an existing component, function, const, or type. Look for something that
  already does (or nearly does) the job. Do a brief lookaround and **report the finding** to the
  user before writing anything new.
- **Every generic type lives in `common/utils/Generics/`.** Before defining a new generic type
  (e.g. `Optional`, `Nullish`, `Dictionary`, `DeepPartial`), look it up there first — it may
  already exist. This is the single home for reusable generic types.
- **All domain-specific types live in `common/types/`.** App/feature/domain types (API shapes,
  entities, query/response types) go in `common/types`, not in feature files. Feature files
  re-export or use them from there.
- **Generic functions are forbidden from living in feature files.** If a helper is generic
  (not tied to one feature's domain), it goes in `common/utils`, not in a feature folder/file.
  Never inline a generic utility inside feature code — extract it to `common/`.
- **Generic components are forbidden from living in feature files.** A reusable component that
  isn't feature-specific goes in `common/ux`, not inside a feature folder. Never build a
  one-off component inside feature code that's actually generic — extract it to `common/ux`.

### 3.3.0 Imports — combine, and watch for circular deps

- **Always review every import when editing or adding to a file.** When you add an import from a
  module that's already imported in the same file, **combine into the existing import statement**
  rather than adding a second line for the same package/path. Split only when paths genuinely
  differ (e.g. two different `@common/utils/<Folder>` subpaths — those are separate modules and
  stay separate).
- **Never introduce a circular dependency.** A circular import is when module A imports from B and
  B imports (directly or transitively) back from A — the modules can't initialise in a stable
  order. **`common/types/*` must never import from `common/utils/*`** at runtime: `common/utils`
  already imports `@common/types`, so importing back creates a cycle. Keep the layers one-way:
  feature → `common/utils` → `common/types`. (Type-only `import type` from the barrel is safe —
  erased at runtime — but keep value imports on subpaths, especially in server code, where the
  `@common/utils` barrel drags in FE-only React+CSS.)

### 3.3.1 Functional iteration

- **Prefer functional iteration over explicit `for` / `while` loops.** Use `map`, `filter`,
  `reduce`, or — as the worst case — `forEach`. Avoid hand-rolled loops.
- **Choose by what the body does:**
    - **transform values / build a collection** → `map`
    - **narrow / drop items** → `filter`
    - **collapse to a single value** → `reduce`
    - **side-effecting writes (e.g. set on a `URLSearchParams`)** → `forEach` with early `return`
      guards instead of `continue`/`break`.
- **Prefer early `return` over `continue`** inside the iteration body — it reads as a guard
  clause and keeps the functional shape.

### 3.3.2 Immutability & declarative code

- **Write declarative, functional code where possible.** Prefer pure functions that take inputs
  and return new values over functions with hidden side effects.
- \*\*Avoid mutating arguments or shared state unless it is absolutely necessary or the correct
  pattern.
- **Prefer composing immutable values (`map`/`reduce` to new structures) over in-place
  mutation.** If a helper must write, make that side effect local, explicit, and visible at the
  call site.
- Do not rationalise an avoidable mutation as "consistent with an existing pattern" — fix the
  pattern instead.

### 3.4 Comments / JSDoc

- **Add JSDoc comments to exported main functions** (at minimum), and to any non-obvious helper.
  Keep them **brief**, with an `@example` when it clarifies usage.
- **Tiny inline-only helpers do not require comments.** No need to document something that's
  self-evident in one line.

### 3.4.1 TODOs always reference a ticket

- **Every `TODO` (and `FIXME` / `HACK` / `XXX`) comment must reference the ticket that owns it** so
  the intent is traceable and blameable. Use the `NNNN` docs-ID prefix or a ticket ID.
- Format: `TODO: [0003] - <what and why>`.
- Example: `// TODO: [0003] - sets / reps / rest to be added here when routine composition lands`.
- If there is no ticket yet for the work, open one (or a docs `NNNN-` entry) rather than leaving an
  unattributed TODO.

### 3.5 Testing

- **Every exported function needs a spec file or test suite.** No export ships untested.
- **Every exported component needs a spec** too — unless explicitly stated as exempt or genuinely
  trivial/primitive.
- **Unit tests are exhaustive.** Hit every branch, edge case, value, and combination. The goal
  is that a function is fully _test-documented_: safe to modify or refactor, and easy to reason
  about.
