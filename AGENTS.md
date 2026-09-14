# 1. Engineering principles

## 1.1 Reuse and DRY

- Never write one-off generic code.
- Intentionally seek the generic bit and extract it immediately.
- Before implementing anything, check `common/` for an existing component, function, constant, or type that already does or nearly does the job.
- Do a brief lookaround and report relevant existing functionality before writing something new.
- Prefer existing repository utilities over hand-rolled equivalents.

## 1.2 Shared types and utilities

- Every generic type lives in `common/utils/Generics/`.
- All domain-specific types live in `common/types/`.
- Generic functions belong in `common/utils/`, not feature files.
- Generic components belong in `common/ux/`, not feature files.
- Before defining a generic type or utility, check the existing shared implementations first.
- Prefer the repository's existing `Generics` and `Predicate` utilities over hand-rolled type gymnastics or manual checks.

Only write a new implementation when no suitable shared utility exists.

## 1.3 Dependencies

Never introduce circular dependencies.

Keep dependencies flowing one way:

```text
feature → common/utils → common/types
```

`common/types/` must not have runtime dependencies on `common/utils/`.

Use type-only imports where appropriate.

In server code, prefer value imports from specific subpaths rather than barrels that unnecessarily pull in FE-only dependencies.

## 1.4 Functional and declarative code

Prefer declarative, functional code and pure functions.

Prefer:

- `map` for transforming values
- `filter` for narrowing collections
- `reduce` for collapsing values
- `forEach` when a side effect is genuinely required

Avoid explicit `for` / `while` loops where functional iteration is appropriate.

Prefer early `return` guards over `continue` / `break`.

Avoid mutating arguments or shared state unless mutation is necessary and appropriate.

Prefer composing immutable values over in-place mutation.

Do not justify avoidable mutation merely because an existing pattern does it.

## 1.5 Testing

- Every exported function needs a spec/test suite.
- Every exported component needs a spec unless explicitly exempt or genuinely trivial.
- Unit tests should be exhaustive.
- Cover every meaningful branch, edge case, value, and combination.
- Tests should document behaviour and make safe refactoring possible.
- Prefer table-driven / iterative tests such as `it.each` where appropriate.

## 1.6 Imports and ordering

Order imports by **source**, not by role — a mechanical rule, no case-by-case judgement.

1. **External** — `react`, `react-router-dom`, `axios`
2. **Internal aliased** — `@common-*`, `@app`, `@portfolio`, `@projects`, `@shared-*`
3. **Relative** — `./`, `../`
4. **Type-only** — every `import type`, gathered here regardless of source
5. **Side-effect / asset** — `./x.scss`, no bindings. Always last.

- **Extend, don't duplicate.** If a path is already imported, add to that import rather than writing a second one from the same path.
- **Keep genuinely different paths separate.**
- **Value imports prefer specific subpaths over the barrel** — a barrel can pull FE-only React/CSS dependencies into server code.

# 2. Repository architecture

**The repository's structural and naming conventions are defined in `ARCHITECTURE.md`.**

Consult `ARCHITECTURE.md` whenever a task involves repository structure, naming, file placement, exports, feature organisation, server architecture, layering, namespaces, or imports.

Do not duplicate its detailed rules here.

Do not invent a new architectural or structural convention when an existing convention is documented in `ARCHITECTURE.md`.

If the architecture document does not cover a case, raise the decision rather than silently inventing a convention.

# 3. Documentation

The `docs/` folder is the engineering notebook for the project. It is public, tracked in version control, and published to GitHub.

- `docs/README.md` is the documentation entry point.
- `docs/INDEX.md` contains the live list of numbered feature documents.
- `docs/0000-doc-template.md` defines the feature-document template.
- Feature documents use the `NNNN-<topic>.md` naming convention.
- Headings in documentation use numbered headings.

## 3.0 Bookkeeping / project management (ticket discipline)

The `docs/` feature documents are the binding record for every ticket. They serve two purposes:

1. **For Captain Tschiboka** — a log, todo, notepad, reminder, and diary of all ticket-related changes.
2. **For the agent** — the bible for the task: instructions, history, context, and the backbone of what is being done.

### 3.0.1 Ticket checkout

- When starting a task, the agent MUST acquire which ticket (feature document) the work is assigned to and **check out** that ticket — i.e. read it and treat it as the authoritative context.
- At session start the Captain provides the ticket number. If not given or unsure, ask:
  `Captain, what ticket is this next task assigned to?`
- Do not begin work without a checked-out ticket.

### 3.0.2 Logging each step

- Log each step performed and tick subtasks, keeping the ticket's change notes current:
  `[x] - Subtask: finalise file migration in x folder. Folder updated with blabla`

### 3.0.3 When to suggest a ticket entry

Always suggest a log entry (and ask permission before writing) when:

- a task or subtask finishes (tick the box, add notes if needed);
- a new task or subtask arises during progress;
- new information, a discovery, or a decision is worth noting;
- a session ends — sign out the ticket and update `INDEX.md` too.

### 3.0.4 Entry rules

- Requires permission from Captain Tschiboka before writing.
- Consult `docs/0000-doc-template.md` for the shape.
- Entries are short without losing information.
- Language is direct; no filler words.
- Not a dumping site for AI filler/BS.
- When updating, check whether a new amendment affects other entries and update them as necessary.
- **Do not abuse the ticket docs.** Only relevant content that belongs in the ticket goes there. For large/extended content that cannot fit, open a new file for it under the ticket (rather than bloating the main ticket doc).

## 3.1 When to update docs

A **proper feature** — notable, self-contained, planned, or significant — requires documentation upkeep.

Small fixes, trivial refactors, one-off chores, and changes without meaningful user-visible scope do **not** require documentation updates.

For a proper feature:

- create or update its feature document;
- update the corresponding `INDEX.md` entry;
- keep status, decisions, file map, findings, and relevant implementation information current.

Use judgement. Do not create documentation overhead for insignificant work.

## 3.2 Public documentation safety

Because `docs/` is public, always check what is safe to share before adding content.

Never commit:

- secrets
- credentials
- API keys
- tokens
- passwords
- private or exposed URLs/endpoints
- private personal or sensitive data

If content is sensitive, keep it out of `docs/` entirely.

# 4. Comments and TODOs

Add brief JSDoc comments to exported main functions and any non-obvious helper.

Include an `@example` when it meaningfully clarifies usage.

Tiny, self-evident inline helpers do not require comments.

Every `TODO`, `FIXME`, `HACK`, or `XXX` must reference the ticket or documentation ID that owns it.

Use:

```ts
// TODO: [0003] - sets / reps / rest to be added when routine composition lands
```

If there is no ticket or documentation entry yet, create or identify one rather than leaving an unattributed TODO.

# 5. General principle

Your job is not simply to produce code.

Help me **think better, make better engineering decisions, and enjoy the process of designing, exploring, and coding.**

**Inspect deeply when necessary. Think silently. Communicate minimally. Ask only when a real decision is required.**

**Aye sir.**
