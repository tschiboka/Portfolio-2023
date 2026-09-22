# Skills

Every skill in this folder, one line each. A skill is invoked as `/<name>`; the
name matches its folder and the `name` field in its `SKILL.md`.

## Lifecycle

The order work moves through. Each hands to or from its neighbours. The
`document` skills run alongside the lot rather than in sequence.

| Skill            | Use it to                                                                  |
| ---------------- | -------------------------------------------------------------------------- |
| `brief`          | resolve the minimum uncertainty before work begins, without making changes |
| `implement`      | build agreed feature work in small, reviewable chunks                      |
| `test`           | author specs and their fixtures                                            |
| `review-file`    | review one file against the skill that owns its type                       |
| `review-feature` | review a feature — one result per file, plus cross-file findings           |
| `address`        | apply review feedback — correcting accepted work rather than improving it  |
| `generalise`     | turn one review finding into a proposed rule                               |
| `standardise`    | apply an accepted rule across the codebase                                 |
| `debug`          | diagnose a defect and return to implement with the finding                 |
| `document`       | maintain the ticket document as work progresses                            |
| `document-new`   | create new ticket documentation — reference skill                          |
| `document-done`  | mark a checklist item complete — reference skill                           |
| `document-edit`  | update existing ticket information — reference skill                       |

## Front-end

| Skill     | Use it to                                                              |
| --------- | ---------------------------------------------------------------------- |
| `ui`      | create and structure UI — screens, feature components, styling, layout |
| `types`   | define and place types                                                 |
| `form`    | build forms — layout, validation, field errors, the submit flow        |
| `table`   | work with tabular data — columns, rows, sorting, filtering, paging     |
| `queries` | write a feature `.queries.ts` file, query and mutation hooks           |

## Back-end

| Skill    | Use it to                                                           |
| -------- | ------------------------------------------------------------------- |
| `router` | define an endpoint — paths, hosts, middleware order, response shape |
| `db`     | storage and persistence — schemas, reads, writes, indexes           |
| `auth`   | sessions and tokens, login and logout, guards, permissions          |

## Lookup

Every feature file role and the skill that owns it. Determine the owning skill
before touching the file.

| File                          | Side | Skill       |
| ----------------------------- | ---- | ----------- |
| `Feature.tsx`                 | FE   | `ui`        |
| `Feature.styles.ts` / `.scss` | FE   | `ui`        |
| `Feature.context.ts`          | FE   | `ui`        |
| `Feature.provider.tsx`        | FE   | `ui`        |
| `Feature.selectors.ts`        | FE   | `ui`        |
| `Feature.handlers.ts`         | FE   | `form`      |
| `Feature.fields.ts`           | FE   | `form`      |
| `Feature.schema.ts`           | FE   | `form`      |
| `Feature.columns.tsx`         | FE   | `table`     |
| `Feature.filters.ts`          | FE   | `table`     |
| `Feature.actions.ts`          | FE   | `table`     |
| `Feature.queries.ts`          | FE   | `queries`   |
| `Feature.transformers.ts`     | FE   | `queries`   |
| `Feature.types.ts`            | both | `types`     |
| `Feature.routes.tsx`          | FE   | `router`    |
| `Feature.routes.ts`           | BE   | `router`    |
| `Feature.middlewares.ts`      | BE   | `router`    |
| `Feature.auth.ts`             | BE   | `auth`      |
| `Feature.permissions.ts`      | BE   | `auth`      |
| `Feature.model.ts`            | BE   | `db`        |
| `Feature.repository.ts`       | BE   | `db`        |
| `Feature.service.ts`          | BE   | `db`        |
| `Feature.schema.ts`           | BE   | `db`        |
| `Feature.seed.ts`             | BE   | `db`        |
| `Feature.transformers.ts`     | BE   | `db`        |
| `Feature.controller.ts`       | BE   | `db`        |
| `tests/*`                     | both | `test`      |
| `Feature.utils.ts`            | both | `implement` |
| `Feature.constants.ts`        | both | `implement` |
| `Feature.config.ts`           | both | `implement` |
| `Feature.defaults.ts`         | both | `implement` |
| `Feature.options.ts`          | both | `implement` |

## Reference

| File          | Holds                             |
| ------------- | --------------------------------- |
| `template.md` | the shape every skill conforms to |
| `protocol.md` | commands and ask types            |
