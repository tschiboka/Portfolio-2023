# 0008 — Agent skills & lifecycle finalisation

## 1. Description

The `.github/skills/` tree carries one structure: a four-section spine — `When to use`, `Scope`, `Rules`, `Workflow` — two conditional sections, and `access: read | write` frontmatter. Every skill conforms, with an example set beside it where the area has files worth showing.

A skill describes the work a caller is doing, not a topic. Where two skills claimed the same work, the smaller was retired into the larger.

## 1.1 Info

| Status       | In progress                           |
| ------------ | ------------------------------------- |
| Last updated | 2026-09-22                            |
| Created      | 2026-09-18                            |
| Scope        | `.github/skills/`, `.github/prompts/` |

## 2. Feature Dev Checklist

- [x] Step 1: Fix `template.md` — remove `kind`, add `access`
    - [x] Step 1.1: Remove `kind` from the frontmatter
    - [x] Step 1.2: Delete the remaining `area | index | rule` material
    - [x] Step 1.3: Document the four-section spine and the conditional sections
    - [x] Step 1.4: Document `access: read | write` as frontmatter
- [x] Step 2: Sweep `kind` → `access` in `component`, `queries`, `table`, `test`, `ui`
- [x] Step 3: Add `access` to every remaining skill — no `kind` survives. `auth` was the last without it and gained it in Step 4.1
    - [x] Step 3.1: Consolidate `test` — the fattest file, and the one that showed the repetition pattern
- [x] Step 4: Rename section headings to the spine — `queries` and `table` still carried the old names; the rest were already on it
    - [x] Step 4.1: Consolidate each file — all 21 swept against the spine and their own content; section order inverted in `table`, `queries`, `db`, `form`; five files carried a preamble above `When to use`; `auth` had no frontmatter at all
- [x] Step 5: Fold `Boundary` into `Scope` — no file used it
- [x] Step 6: Write every `stub` body against the corrected template
    - [x] Step 6.1: `address`
    - [x] Step 6.2: `auth`
    - [x] Step 6.3: `db`
    - [x] Step 6.4: `debug`
    - [x] Step 6.5: `dry` — retired; subset of `generalise`
    - [x] Step 6.6: `find` — retired; the check-what-exists rule lives in `AGENTS.md` §1.1
    - [x] Step 6.7: `form` — body rewritten, six-file example set built
    - [x] Step 6.8: `generalise`
    - [x] Step 6.9: `network` — retired; its scope was routing, so it folded into `router`
    - [x] Step 6.10: `router` — body written, absorbing `network`; four-file example set built
    - [x] Step 6.11: `security` — retired; secrets, validation and CORS are `router`'s, and three of its rules already lived there
    - [x] Step 6.12: `standardise`
    - [x] Step 6.13: `types` — body rewritten, feature-type convention extracted
- [x] Step 7: Audit every reference to `ARCHITECTURE.md` across the repo
- [x] Step 8: Decide each architecture rule's new home — a skill, `AGENTS.md`, or dropped. §3 namespaces, §5 imports, §6 decision rule → `AGENTS.md`; §4 → `types`; §1–2 reference → [`docs/references/file-structure.md`](references/file-structure.md)
- [x] Step 9: Move the rules and repoint every reference — `README.md` repointed; every skill reference checked against the tree
- [x] Step 10: Delete `ARCHITECTURE.md`
- [x] Step 11: Rewrite `AGENTS.md` — §§1–2 rewritten and de-bloated, §2.1/§2.2 extracted as lint steps, §4 trimmed to conduct `working-style.md` does not already carry
- [x] Step 12: Add a lint rule forbidding raw semantic elements in UI code — `h1`–`h6`, `section`, `div` — where a `common/ux` component exists. Rule `no-raw-semantic-jsx` registered with `scope.include`/`scope.exclude`; 26 tags enforced as errors. `section` and `div` sit in the unreachable `Warn[]` table, so they are not yet reported
- [x] Step 12.1: Add a lint rule forbidding ad-hoc role suffixes — a file's dot-segments must come from the role lists in [`docs/references/file-structure.md`](references/file-structure.md)
    - [x] Step 12.1.1: Add the `spec` prefix and `spec.<role>` infix forms to §1.1 and §1.3
    - [x] Step 12.1.2: Build `rules/no-ad-hoc-role-suffix/` — constants, rules, registrar, utils
    - [x] Step 12.1.3: Register it in `rules/registry.ts` as `severity: 'error'`
    - [x] Step 12.1.4: Scope to `src/**`, `common/**`, `server/**`
    - [x] Step 12.1.5: Add `tests/NoAdHocRoleSuffix.spec.ts`
- [x] Step 12.2: Add a lint rule requiring the primary feature file to be named after its folder — `Button/Button.tsx`, `BreakdownTable/BreakdownTable.tsx`
- [ ] Step 12.3: Add a lint rule forbidding newlines between imports — imports stay contiguous, no blank lines inside the block
- [ ] Step 12.4: Add a lint rule requiring a file's export to match its name — `Feature.tsx` → `Feature`, `Feature.queries.ts` → `FeatureQueries`, checked against the matching table in [`docs/references/file-structure.md`](references/file-structure.md)
- [x] Step 13: Add the Predicate and Generics rule to `AGENTS.md`, then scan every skill for misuse of both
    - [x] Step 13.1: The `AGENTS.md` half — done with Step 11: `AGENTS.md` §1.2 carries the Generics and Predicate rule
- [x] Step 14: Retire `component` into `ui` — one skill for a folder's shape and its look
- [x] Step 15: Split `review` into `review-file` and `review-feature`

## 2.1. Task Details

**Step 4** cannot be scripted, and `test` is the worst case — mostly project-specific `Workflow` that stays.

**Step 4.1** — the recurring defects, all now cleared: a preamble above `When to use` (`address`, `generalise`, `debug`, `ui`, `types`); a rule stated in both `Rules` and `Files and folders` (`router`, `form`, `queries`, `table`, `db`); and pseudo-headings as `**Bold**` where the tree uses `###`. Two files carried a non-spine `##` — `Where types live` in `types`, `The worked example` in `form`. `auth` carried no frontmatter.

**Step 6** — a `stub` is frontmatter with no body. `document-new` is a reference to `/document`, not a skill, so it is not a sub-step.

**Step 7** — a `§` reference dangles the moment `ARCHITECTURE.md` is deleted and nothing reports it. The audit must be exhaustive before Step 10.

**Step 8** — import ordering and dependency direction were removed from `AGENTS.md` on the grounds `ARCHITECTURE.md` owned them. Each needs a home or an explicit decision to drop.

**Step 12** — a skill informs; it does not bind. The `ui` body states "use an existing `@common` component before creating equivalent custom UI" and that rule was broken in the same session it was written: the `ui/Feature.tsx` example used a raw `<section>` and `<h1>`. A lint rule fails the build, which is the only mechanism that holds.

## 3. Decisions & Rationale

- `Scope` states what a skill does and does not do; `Rules` states how. A sentence that is both lands in `Rules`.

## 4. Open Questions
