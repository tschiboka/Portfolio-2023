# 0004 — ApiResponder: centralised API response handling

> **Status:** Done
> **Last updated:** 2026-08-29
> **Created:** 2026-08-22

---

## 1. Description

Refactor repetitive Express response handling into a central API abstraction while keeping route
code as close to the business logic as possible. The larger goal is that **all API response
formatting is centralised**. Start on the gym feature and **slowly sweep older endpoints** as part
of this ticket.

Current boilerplate:

```ts
return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'Exercise not found' })
```

should become semantically compact error throws and success responses:

```ts
throw ApiResponder.notFound('exercise')
// ...
return ApiResponder.ok(res, exercise)
```

## 2. Agreed direction

### 2.1 `success` field — REMOVE

Decision: **remove `success` from API responses** (mandatory).

- HTTP status already communicates success/failure; `success` is redundant.
- This is a separate API-contract change, not merely a cleanup — but it is **required** and
  incorporated since the response layer is introduced now.
- Success responses become `{ data }`; error responses become `{ message }`.
- **Sequencing note:** because we sweep endpoints _gradually_, the FE will temporarily see two
  response shapes (new `{ data }`/`{ message }` on converted routes, `{ success, ... }` on old
  ones). Either keep `success` during the transition and remove at the end, or do a coordinated
  cutover — decide when the sweep starts. Exact final types still need aligning with the existing
  `TypedResponse` / `ErrorResponse`.

### 2.2 `ApiMessage` — canonical wording only

Owns **canonical wording only**; completely generic.

Must **not** contain feature/domain resource vocabularies:

```ts
// REJECTED — a generic util must not know about features
type Resource = 'exercise' | 'routine' | 'category'
```

Instead:

```ts
export namespace ApiMessage {
    export const notFound = (resource: string) => `${capitalise(resource)} not found`
    export const invalidId = (resource: string) => `Invalid ${resource} id`
    export const forbidden = () => 'Forbidden: access denied!'
}
```

The caller supplies the resource: `ApiResponder.notFound('exercise')`. Feature-specific
vocabularies may exist elsewhere later, but are **not** encoded into `ApiMessage`.

### 2.3 `ApiResponder` — the single abstraction

Name is `ApiResponder` (not `ApiResponse`) because it is the abstraction responsible for API
response **behaviour**, not just the resulting response.

Desired route-facing API:

```ts
throw ApiResponder.notFound('exercise')
throw ApiResponder.forbidden()
throw ApiResponder.badRequest(error)

return ApiResponder.ok(res, exercise)
return ApiResponder.created(res, exercise)
```

The `ApiResponder.` namespace communicates what the operation is — errors read naturally:
`throw ApiResponder.notFound('exercise')`.

### 2.4 One abstraction for success AND failure

Explicitly **not** split into `ApiError` + `ApiResponder`. One `ApiResponder`:

```ts
ApiResponder
├── success response creation/emission
│   ├── ok()
│   └── created()
└── error creation
    ├── badRequest()
    ├── notFound()
    └── forbidden()
```

Error methods produce something **throwable**; success methods emit the actual HTTP response.

**`res` binding decision:** success methods take `res` as their first argument
(`ApiResponder.ok(res, exercise)`); error methods throw and don't need `res`. This is the
resolution of the earlier "unresolved detail" — because errors throw into the middleware and
successes must emit, the asymmetry is inherent and correct. Rejected alternatives: a per-route
`const responder = ApiResponder(res)` (repeated setup) and `req.api`/`res.api` attachment
(second abstraction + middleware state).

### 2.5 Central error middleware

Implement the central error middleware **now** (not a future migration):

```
route throws ApiResponder.notFound(...)
        ↓
central error middleware
        ↓
standard HTTP error response
```

This removes `return res.status(...).json(...)` from error paths entirely. Routes describe the
outcome:

```ts
if (!exercise) throw ApiResponder.notFound('exercise')
```

### 2.6 Validation errors

The controller must **not** extract validation details itself. Rejected:

```ts
return res.status(HttpStatus.BAD_REQUEST).json({
    success: false,
    message: error.details[0].message,
})
```

and rejected as unnecessary boilerplate:

```ts
throw ApiResponder.badRequest(error.details[0].message)
```

Desired — `badRequest` understands Joi validation errors and extracts `error.details[0].message`
internally, and also accepts a plain string:

```ts
throw ApiResponder.badRequest(error)
throw ApiResponder.badRequest('Some explicit message')
```

(Note: Joi message wording will be standardised separately/later — out of scope for the responder
mechanics.)

### 2.7 Complete method surface

`ApiResponder` contains common semantic convenience methods (not a giant arbitrary helper bag).
The complete surface was derived from a full inventory of every existing server response. All
funnel through a small internal response mechanism.

**Error methods** (all throwable — the message family):

```ts
throw ApiResponder.badRequest(errorOrString) // Joi validation result OR plain string
throw ApiResponder.notFound(entity) // e.g. 'exercise' → 404 'Exercise not found'
throw ApiResponder.invalidId(entity) // e.g. 'exercise' → 400 'Invalid exercise id'
throw ApiResponder.forbidden()
throw ApiResponder.unauthorized(reason) // no-token / expired / invalid
throw ApiResponder.conflict(message)
throw ApiResponder.internalServerError()
```

**Success methods** (emit the actual HTTP response):

```ts
ApiResponder.ok(res, data)          // data is ALWAYS a plain object → emitted flat as { ...data }
                                    // (no `success`, no `data:` wrapper): ok(res, { routines }) → { routines }
ApiResponder.created(res, data?)    // optional plain object; undefined → no body (.send())
ApiResponder.text(res, string)      // plain-text response (.send) — covers non-JSON bodies
```

Notes:

- `.ok` returns the given object flat — this unifies the previous `data:`-wrapper, named-payload
  (`{ likes }`, `{ routines }`…), and raw collection shapes under one convention.
- `.text` covers the plain-text responses (e.g. xmas `'<<<OK>>>'`); they are not excluded — they
  have a dedicated method.
- `.created` with no payload emits an empty body.

### 2.8 `HttpStatus`

`HttpStatus` remains the central typed status set. Where the responder accepts a status
internally, use `HttpStatus` (not an unrestricted `number`).

## 3. Implementation caveats (must-haves)

These were identified during review and are load-bearing, not optional.

1. **Async errors already reach the error middleware — async wrapper NOT needed.** The server
   uses **Express `^5` (5.2.1)** and **`express-async-errors` has been dropped** (redundant on
   Express 5, which natively forwards rejected async handler promises to the error middleware).
   `@types/express` `^5.0.6` now matches the runtime. `server/**` typechecks with **0 errors**
   post-upgrade (no route Express 5 breaking changes surfaced).
2. **Existing `server/middlewares/error.ts`.** There is already a generic error middleware, but it
   always responds `500 Internal Server Error` and logs. It must be extended/replaced to detect a
   thrown `ApiError` and emit its `status` + `message`, falling back to a 500 for unknown errors.
   (It also registers `process.on` handlers inside the middleware — those ideally move to
   `startup`, but that's a separate concern.)
3. **`capitalise` util.** `ApiMessage` needs a string capitaliser. Not found in
   `common/utils/Strings` — add a small `capitalise` util there (trivial) rather than assuming it
   exists.

## 4. Plan

1. Add `capitalise` util to `common/utils/Strings` (if absent).
2. Create `ApiMessage` namespace (`common/utils/Server/ApiMessage`).
3. Create `ApiResponder` (`common/utils/Server/ApiResponder`) — `ok`, `created`, `badRequest`,
   `notFound`, `forbidden`, plus an internal throwable `ApiError` type consumed by middleware.
4. ~~Add an async `wrapHandler` helper~~ — **not needed**: `express-async-errors` already forwards
   async handler rejections to the error middleware (§3.1).
5. Extend/replace `server/middlewares/error.ts` to translate thrown `ApiError` → status/message,
   else 500.
6. Align `TypedResponse` / `ErrorResponse` types with the new `{ data }` / `{ message }` shapes
   and plan the `success` removal sequencing.
7. **Pilot on gym routes** (`exercises.ts`, `routines.ts`) — convert to `ApiResponder`.
8. **Sweep older endpoints** gradually, per §2.1 sequencing.
9. Update this doc's status/checklist + `INDEX.md` as progress is made.

### 4.1 Session progress (2026-08-22)

- All `common/utils/Server` building blocks (`ApiMessage`, `ApiError`, `ApiResponder`,
  `HttpStatus`, `resolveErrorMessage`) shipped with specs, plus `capitalise`.
- **ObjectId-serialisation prerequisite landed for gym GETs:** `ApiTransformers.toApiResource`
  (in `common/utils/Transformer`) now serialises exercise/routine docs (`ObjectId` → `string`,
  recursive) in `exercises.ts` / `routines.ts`, replacing the `as unknown as` cast and the
  `find()` doc-to-resource type mismatch. Built on `isObjectId` predicate + `Regexp.ObjectId`.
  This is **response shaping**, not the responder pattern — the §2 `ApiResponder`
  pilot/sweep below is still outstanding.
- **Express 5 + error middleware done:** upgrade to Express `^5` landed (`express-async-errors`
  dropped); `server/middlewares/error.ts` now detects a thrown `ApiError` and emits its
  `status` + `message`, falling back to `500 { message: 'Internal Server Error' }`. Unknown
  errors fast-fall to 500. (The `process.on` handlers remain in the middleware — relocation to
  `startup` is a separate concern, unchanged.)
- **`HttpStatus` / `HttpStatusCode` hardened:** the static members are now `as const` literals
  and `HttpStatusCode = ValueOf<typeof HttpStatus> & number` — a true numeric-literal union,
  assignable to `number` (removes the phantom `HttpStatus` instance that leaked in via the class
  `prototype` through bare `ValueOf`, which previously broke `res.status(err.status)`).
- **Strict contract decision (sequencing):** `ErrorResponse` is now strictly `{ message: string }`
  (`success` removed). This intentionally breaks every unconverted `{ success, ... }` route; the
  sweep (§6) fixes them one by one. `TypedResponse<T> = Response<T | ErrorResponse>` unchanged.
- **Gym feature decomposed + pilot converted:** both gym features moved to feature folders
  (`server/projects/gym/Exercises/`, `server/projects/gym/Routines/`) with
  `Feature.routes/models/schema/types/constants` + barrel, and both routers converted to
  `ApiResponder` (`ok`/`created`/`notFound`/`invalidId`/`forbidden`/`badRequest`), using
  `ApiTransformers.toApiResource` for ObjectId serialisation, `isValidObjectId` for id guards,
  and `ApiMessage` for wording. The now-empty `server/projects/gym/models/models.ts` was removed
  (a leftover empty `models/` dir may remain — cosmetic, remove manually).
- **Supporting utils added (all spec'd):** `Option` suite (`Option<T>` + `getValues`/`getLabels`/
  `getLabelByValue`/`getValueByLabel`) in `common/utils/Option`; `SearchInputOption` now extends
  `Option<T>`; `isValidObjectId` predicate; `ApiMessage` complete verb set (`created`/`updated`/
  `deleted`/`exists`/`required`/`expired`/`invalidCredentials`); `WithoutId<T>` generic.
- **`Repository` util added** (`common/utils/Server/Repository`): duck-typed, mongoose-free CRUD
  builder — `Repository.define(Model).withQueries({...})`. Exposes `find`/`findById`/`findOne`/
  `count`/`create`/`save`/`delete`, infers the doc type from the model, and layers feature queries
  via `withQueries` (custom wins on CRUD-name collision, chaining accumulates, later wins; parents
  are never mutated). **Doc type is an explicit second generic** — `Repository.define<typeof Model, IDoc>`
  — because mongoose's `findById` doesn't match the duck-typed `DocFrom<M>` inference, which
  collapses to `never` for real models. Its contract is documented in the JSDoc and pinned for the
  deferred test-sweep.
- **Exercises layering complete** (`server/projects/gym/Exercises/`): feature folder now holds
  `models` (`ExerciseModel`), `repository` (`ExercisesRepository` via the `Repository` util +
  `findVisibleTo`), `permissions` (`ExercisesPermissions.requireUserCanModify`), `schema` (`ExerciseSchema`),
  `service` (`ExercisesService` — `listVisibleTo`/`create`/`update`/`remove`), and thin
  `routes` (`ExercisesRoutes`) delegating to the service. Barrel `index.ts` re-exports all layers.
  Service spec is **deferred** (no established BE test framework yet — see below).
- **Routines layering complete** (`server/projects/gym/Routines/`): same template as Exercises —
  `RoutineModel`, `RoutinesRepository` + `findVisibleTo`, `RoutinesPermissions.requireUserCanModify`,
  `RoutineSchema`, `RoutinesService` (user-owned `create` sets `ownerId`), thin `RoutinesRoutes`
  (GET/POST/PATCH/DELETE). Service spec deferred.
- **Shared `Permissions` util added** (`common/utils/Server/Permissions`): duck-typed ownership
  guards `requireAdminManaged(resource, user, adminSource)` + `requireOwned(resource, user)`,
  extracted from the two gym features (see cross-cutting note).
- **`Query.extractEntities` util added** (`common/utils/Query/extractEntities.ts`, spec'd): reads an
  entity collection from a response body by key, defaulting to `[]` — pairs with
  `extractAxiosData`; used by the gym option consumers.
  Still **pending**: the full sweep (§6) of older endpoints, and the error-middleware end-to-end
  verification. BE testing is intentionally **out of scope** for now (no established BE test
  framework; will be a separate test-sweep ticket — `Repository` spec is on that list, as are the
  gym schema/route/model/service specs).

## 5. Open questions

- ~~`success` removal sequencing~~ — **decided: strict cutover** (§6): `success` removed from
  `ErrorResponse` now; sweep converts each route (§6 inventory).
- Where exactly the async wrapper sits (per-file helper vs imported from a shared util) and whether
  existing routes adopt it during the sweep.
- FE impact of the strict cutover: the FE will see `{ message }` on converted routes and still
  `{ success, ... }` on unconverted ones until the sweep lands (per §2.1). Track FE consumers
  during the sweep.
- ~~**`ApiResponder.ok` does not accept array payloads**~~ — **resolved: wrap, don't widen.** `ok` is
  typed `data: Dictionary` (plain object) and stays that way. Routes returning arrays were made
  consistent with the rest of the gym by returning wrapped objects — `{ difficulties }`,
  `{ equipment }`, `{ muscleGroups }` (matching `{ exercises }`/`{ routines }`) via `ApiResponder.ok`,
  and the shared response types were wrapped to match. On the FE, the array is read back with
  `Query.extractEntities(body, key)` (new `common/utils/Query/extractEntities.ts`, spec'd, paired
  with `extractAxiosData`).

## 6. Feature dev checklist

**Common utils**

- [x] `capitalise` in `common/utils/Strings`
- [x] `ApiMessage` namespace
- [x] `resolveErrorMessage` util (string | Error | validation-result extraction) + spec
- [x] `ApiResponder` (`ok`/`created`/`badRequest`/`notFound`/`forbidden`) + full surface (7 error, 3 success) + spec
- [x] Internal `ApiError` throwable type
- [x] ~~`wrapHandler`~~ async wrapper — **not needed** (§3.1): `express-async-errors` already forwards async handler rejections to the error middleware

**Middleware**

- [x] Extend/replace `server/middlewares/error.ts` to emit `ApiError` status/message
- [x] Fallback to 500 for unknown errors
- [ ] (Follow-up, separate concern) move `process.on` handlers out of the middleware — target is now
      `server/App/` (not `startup`, which was dissolved into `server/App/`) — deferred, see
      `0005-be-test-sweep`.

**Types**

- [x] Align `TypedResponse` / `ErrorResponse` with `{ data }` / `{ message }`
      — `ErrorResponse = { message: string }` (strict, `success` removed); `TypedResponse<T> = Response<T | ErrorResponse>` unchanged
- [x] Decide `success` removal sequencing — **strict cutover**: removed now, sweep fixes each route
- [x] Harden `HttpStatusCode` (`as const` statics + `& number`) so it's assignable to `number`

**Pilot**

- [x] Convert gym `exercises.ts` routes — now `server/projects/gym/Exercises/Exercises.routes.ts` on `ApiResponder`
- [x] Convert gym `routines.ts` routes — now `server/projects/gym/Routines/Routines.routes.ts` on `ApiResponder`
- [ ] Verify error middleware reaches thrown errors end-to-end — deferred to `0005-be-test-sweep`
      (needs a server test runner, which the test sweep establishes).

**Sweep**

- [x] Convert remaining server endpoints (inventory below) — **complete**: all core features + all
      project routes (Xmas, Typist, wda level/word) converted.

**Sweep strategy — core-server feature refactor + sweep in tandem.** The server's flat
`routes/` + `models/` + `middlewares/` folders are the "by file type" anti-pattern AGENTS §3.2.1
forbids. The **core API features** (not project-scoped — unlike gym/typist/wda) get co-located into
`server/<Feature>/` folders, each pass doing BOTH the move (model + routes + feature-local types +
options) AND the `ApiResponder` sweep together, so each file is edited once. The gym features
(`Exercises`/`Routines`/etc.) are the proven template. Middlewares (`auth`/`admin`/
`cronOrAdminAuth`) move into `Users/`; the `error.ts` middleware stays infrastructure. The
`req.user`/`UserToken` typing is resolved inside the `Users/` refactor (currently `(req as any).user`).

**Core feature map (target `server/<Feature>/` folders):**

| Feature       | Routes                                | Models           | Notes                                                                 |
| ------------- | ------------------------------------- | ---------------- | --------------------------------------------------------------------- |
| `Users/`      | `user`, `login`, `confirm`, `session` | `user`, `token`  | + `auth` / `admin` / `cronOrAdminAuth` middlewares; `req.user` typing |
| `Settings/`   | `settings`                            | `setting`        |                                                                       |
| `Category/`   | `category`                            | `category`       |                                                                       |
| `Likes/`      | `like`                                | `like`           |                                                                       |
| `Visits/`     | `visit`                               | `visit`          |                                                                       |
| `Messages/`   | `message`                             | `message`        |                                                                       |
| `Logs/`       | `log`                                 | `log`            |                                                                       |
| `Breakdowns/` | `breakdowns`                          | `dailyBreakdown` |                                                                       |
| `Activity/`   | `activity`                            | —                | aggregates likes/visits                                               |
| `Schedule/`   | `schedule`                            | —                | cron-triggered                                                        |
| Health/       | `index`                               | —                | root health                                                           |

`error.ts` middleware stays in `server/middlewares/` (infrastructure). `startup/routes.ts` is the
single mount point to rewire per feature.

**Cross-cutting gym note (resolved during the `Exercises`/`Routines` layering):** the "visible to
user" filter and the ownership rule encode the same canonical/admin vs user/owner model.
The ownership rule was **extracted into a shared util** — `common/utils/Server/Permissions`
(`requireAdminManaged(resource, user, adminSource)` + `requireOwned(resource, user)`) — after the
two features turned out to be byte-for-byte identical except for the admin-source string
(`'canonical'` for exercises, `'system'` for routines). Each feature's
`FeaturePermissions.requireUserCanModify` composes the two primitives with its own admin source.
(Initial plan was to keep it per-feature; two identical copies triggered the DRY-aggressive rule
in AGENTS §3.3.) The **visible-to-user filters** stay per-feature (`findVisibleTo` inline in each
repository), because the visibility rules genuinely differ (exercises: canonical + own; routines:
own + system).

**Deferred → DONE — shared `resolveCurrentUser` helper:** the routes previously repeated the same
extraction of a `CurrentUser` (`{ _id, isAdmin }`) from `getUserToken(req)` via local
`resolveCurrentUser` helpers (in `Exercises.routes.ts` and `Routines.routes.ts`). This generic
server/auth plumbing is now centralised in the `Users/` feature: `getUserToken` lives in
`Users/Users.auth.ts` (moved out of the legacy `server/models/user.ts`), and the shaping
`getCurrentUser` is exposed as `UsersAuth.user.getCurrent`. The gym feature routes
(`Exercises.routes.ts`, `Routines.routes.ts`) now call `UsersAuth.user.getCurrent(req)`, and the
legacy `routes/category.ts` uses `UsersAuth.user.get` (raw doc) — the per-route duplicates are
removed (see sweep inventory below).

**Sweep inventory — every `res.status(...).json(...)` site (from full grep, 2026-08-22).**
Convert each feature folder (move + sweep together). `[x]` = converted.

- [x] `server/middlewares/admin.ts` → moved to `Users/` (403 forbidden) — converted to throw `ApiResponder.forbidden()`
- [x] `server/middlewares/auth.ts` → moved to `Users/` (401s) — converted to throw `ApiResponder.unauthorized(...)`
- [x] **`Users/` refactor: move `getUserToken` out of `server/models/user.ts` and extract a shared
      `getCurrentUser(req)`** (`{ _id, isAdmin }` from the token) into `Users/Users.auth.ts`
      (`UsersAuth.user.get` / `UsersAuth.user.getCurrent`), then reuse it across feature routes —
      now wired into `Exercises.routes.ts`, `Routines.routes.ts` and `routes/category.ts`.
- [x] `server/projects/gym/routes/exercises.ts` → `Exercises/Exercises.routes.ts` — converted
- [x] `server/projects/gym/routes/routines.ts` → `Routines/Routines.routes.ts` — converted
- [x] `server/projects/gym/Difficulty|Equipment|MuscleGroup` — converted to wrap array payloads in
      objects (`{ difficulties }`/`{ equipment }`/`{ muscleGroups }`) via `ApiResponder.ok`; shared
      response types wrapped; FE reads via `Query.extractEntities` (see array-payload decision above)
- [x] `server/projects/typist/routes.ts` → converted to a `server/projects/Typist/` feature folder
      (`Typist.routes.ts` exporting `TypistRouter`, `Typist.constants.ts` with `TypistUserSettings`,
      barrel `index.ts`); `ApiResponder.ok` used for the `POST /round` response (shape unchanged:
      `{ text, stats }`); stray `console.log('error combination', …)` removed; `loadWordResources`
      import path casing fixed to `../WordDuelArena/...`. Legacy `routes.ts` removed.
- [x] `server/projects/word_duel_arena/transport/http/handlers/level.ts` — converted to `ApiResponder`
      (`internalServerError`/`notFound('levels')`/`notFound('level')`/`badRequest` throws, `ok`
      emissions); `handleGetLevel` **201→200 fixed** (was wrongly `Created` on a GET), now emits the
      doc via `ApiTransformers.toApiResource<WdaLevel>` (repo-standard serialisation).
- [x] `server/projects/word_duel_arena/transport/http/handlers/word.ts` — converted to `ApiResponder`
      (`unavailable(...)` for the three resource-load failures, `ok` for success);
      `wordList` wrapped to `{ wordList }` (array-payload convention) + `GetWdaWordListResponse`
      updated to `{ wordList: string[] }`; `anagramMap`/`frequency` unchanged (`Record`).
      New `ApiResponder.unavailable(resource)` + `ApiMessage.unavailable(resource)` (`'<Resource>
unavailable'`, 503) added to cover the resource-load 503s.
- [x] `server/projects/xmas_2025/routes.ts` → converted to a `server/projects/Xmas/` feature folder
      (`Xmas.routes.ts` exporting `XmasRouter`, `Xmas.model.ts`, `Xmas.schema.ts`,
      `Xmas.types.ts`, `Xmas.constants.ts`, barrel `index.ts`); `ApiResponder` used throughout
      (`ok`/`created`/`badRequest`/`notFound` + `ApiResponder.text` for the `<<<...>>>` device
      endpoints, wire format preserved); wording normalised (`ApiMessage.required('userId')`,
      `sent('message')`, `notFound('candles')`); `UsersModel` replaces legacy `User`;
      `XmasFieldLimits` backs model+schema bounds; shared `@common/types/projects/xmas.ts`
      responses de-`success`ed; FE `Xmas2025.mocks.ts` reconciled. Legacy `routes.ts` + `models.ts`
      removed. `models/user.ts` no longer imported by any server code.
- [x] `server/Category/` (from `routes/category.ts` + `models/category.ts`) — converted to
      `server/Category/` feature (`CategoryRouter` at `/api/categories`, model/service/repository/
      schema/constants/types); `ApiResponder` now used (conflict/notFound/badRequest throws +
      `ok`/`created`); full docs mapped via `ApiTransformers.toApiResource<GetCategoryResponse>`
      (ObjectId → string, `__v`/`__t` stripped); `Regexp.exactWord` used for name matching; legacy
      `routes/category.ts` + `models/category.ts` removed. `success`-strip done as part of this.
- [x] `server/Users/` (user, login, confirm, session + models + middlewares) — single `UsersRouter` at `/api/user` with `/register` `/login` `/confirm` `/session` sub-paths; legacy `routes/{user,login,confirm,session}.ts` and `models/{login,token,setting}.ts` removed; `@common/types` user responses reconciled to no-`success`; FE `Paths.Api` + mocks migrated (see restructure task below)
- [x] `server/Likes/` (like + likes model) — converted to `server/Like/` feature (`LikeRouter` at
      `/api/like`, GET summary/count + POST create; model/service/repository/schema/constants/
      types); `ApiResponder` used; `GetLikeResponse`/`GetLikeSummaryResponse`/`PostLikeResponse`
      reconciled to no-`success`; FE reads `.likes` (tolerant, no change needed); DailyBreakdown
      upsert via legacy model. Legacy `routes/like.ts` removed; `models/like.ts` KEPT — still used
      by legacy `routes/activity.ts` (Activity conversion pending).
- [x] `server/Visits/` (visit + visits model) — converted to `server/Visit/` feature (`VisitRouter`
      at `/api/visit`, GET summary/count + POST create; model/service/repository/schema/constants/
      types); `ApiResponder` used; `GetVisitResponse`/`GetVisitSummaryResponse`/`PostVisitResponse`
      reconciled to no-`success`; FE `Visits.queries` synced (removed fabricated `{ success: true }`,
      moved localhost guard to `Page.tsx`); `DateTime.Format.to('ApiDate', …)` used for the daily
      breakdown key (replaces `toISOString().slice(0,10)`); legacy `routes/visit.ts` removed.
      DailyBreakdown upsert retained via legacy model (Breakdowns conversion pending). Legacy
      `routes/visit.ts` removed; `models/visit.ts` KEPT — still used by legacy `routes/activity.ts`
      (Activity conversion pending).
- [x] `server/Messages/` (message + messages model) — converted to `server/Message/` feature
      (`MessageRouter` at `/api/message`, model/service/repository/schema/constants/types);
      `ApiResponder` used; `PostMessageResponse` reconciled to `{ message }` (no `success`);
      FE `Contact` mocks updated. `MessageFieldLimits` mirrors FE `Contact.schema` bounds
      (name ≤50, email 6–255, phone 10–16, message 10–1000); `isDigits` predicate added for
      phone digits. Legacy `routes/message.ts` removed. NOTE: `models/message.ts` KEPT — still
      used by legacy `routes/activity.ts` (Activity conversion pending).
- [x] `server/Logs/` (log + logs model) — converted to `server/Log/` feature (`LogRouter` at
      `/api/log`, GET table/paged + DELETE ids; model/service/repository/routes/types);
      `ApiResponder` used (auth+admin guarded); `GetLogTableResponse` reconciled to no-`success`;
      `deleteManyByIds` + `findPaged` repository queries. Legacy `routes/log.ts` removed;
      `models/log.ts` KEPT — still used by `middlewares/error.ts` (error logging) + legacy
      `routes/activity.ts`.
- [x] `server/Settings/` (settings + setting model) — `SettingsRouter` mounted at `/api/settings`; legacy `routes/settings.ts` + `models/setting.ts` removed; consumers (`UsersService`, `UsersAuth`) migrate to `SettingsService`/`SettingsFieldLimits`
- [x] `server/Breakdowns/` (breakdowns + dailyBreakdown model) — converted to `server/Breakdown/`
      feature (`BreakdownRouter` at `/api/breakdowns/backfill`, auth+admin); `BreakdownService`
      backfill (aggregate visits+likes by date/path → bulk upsert, batched); `BreakdownRepository`
      wraps the raw-collection aggregations + bulk write. `PostBackfillResponse` reconciled to
      `{ upserted }` (no `success`). FE `Admin` renders the JSON body (tolerant). Legacy
      `routes/breakdowns.ts` removed. `models/dailyBreakdown.ts` KEPT — used by the daily-breakdown
      cron email + `Visit`/`Like` services.
- [x] `server/Activity/` (activity) — converted to `server/Activity/` feature (`ActivityRouter` at
      `/api/activity/admin`, GET aggregation; service/repository/transformers/constants/routes/
      types). `ActivityService.feed` orchestrates; `ActivityTransformers` map raw visit/like/
      message/log docs → `ActivityEvent`; reads across the new feature models. Uses shared
      `Paging.parse`/`Paging.toMeta` + `DateTime.Format.toIso`. `PaginatedResponse` reconciled to
      no-`success`. FE `WebsiteStats` reads `.data`/`.meta`/`.context` (tolerant).
- [x] `server/Schedule/` (schedule) — converted to `server/Schedule/` feature (`ScheduleRouter` at
      `/api/schedule/daily-breakdown`, POST, cron-or-admin auth); `ScheduleService` triggers the
      daily-breakdown cron email. `PostDailyBreakdownResponse` kept as `{ success, error? }` (a
      trigger/health response where `success` is meaningful + FE depends on it — an exception to
      the no-`success` sweep). Legacy `routes/schedule.ts` removed.
- [x] Health/ (routes/index.ts) — root GET `/` converted to `ApiResponder.ok`; `GetHealthResponse`
      kept as `{ success: boolean }` (health-probe response where `success` is the meaningful
      payload — an exception to the no-`success` sweep, same as Schedule).

- [x] **`Users/` auth-route restructure (chosen: single `UsersRouter`, sub-path actions).** The
      Users feature owns user auth (register/login/confirm/session are verbs on the user entity).
      Consolidated into **one `UsersRouter`** mounted at `/api/user` with sub-paths `user/register`,
      `user/login`, `user/confirm`, `user/session` (+ `/` list, `/:id` get). **Breaking URL change**
      handled in the same sweep: FE `Paths.Api` (Login/RegisterUser/ConfirmRegistration/
      RehydrateSession) + `Path.spec.ts` + Login/Register mock handlers/mocks updated; Session
      rehydrate read dropped the `data` wrapper; `@common/types` `PostLoginResponse`/
      `PostConfirmResponse`/`GetSessionResponse`/`PostUserResponse`/`GetUsersResponse`/
      `GetUserResponse` reconciled to no-`success`. `UsersService.login` now returns `settings` to
      preserve the FE login contract. Legacy `routes/{user,login,confirm,session}.ts` removed.

- [ ] **Normalise not-found phrasings** to `ApiMessage.notFound(resource)` noun form. Canonical
      wording is `'<Resource> not found'` — rewrite deviant/message-y phrasings during the sweep:
      e.g. `'Could not find verification token'` → `notFound('verification token')`; `'No levels
found in DB'` → `notFound('levels')`. Avoid framing (implied DB/backing-store, "could not
      find", etc.) — the resource noun is enough; users don't need to know where it was looked up.
      Known deviant phrasings to rewrite: `'Content not Found'`, `'Settings not found'`,
      `'No levels found in DB'`, `'Level not found in DB'`, `'Error retrieving levels from DB'`,
      `'Could not find verification token'` (confirm.ts), `'No candles found to update'`.

## 6.5 Session progress (2026-08-23) — completed & unfinished

**Shared utils added this session:**

- `common/utils/Paging` — `Paging.parse(page, pageSize, bounds)` → `{ pageNumber, limit, skip }`
  (clamps + derives skip, defaults from `Table.Paging.defaults`, `isDigits`/`isDefined` guards);
  `Paging.toMeta(totalItems, limit, pageNumber)` → `PageMeta`. Used by `Activity` + `Log`.
- `common/utils/DateTime` — added `Format.toIso(value, fallback)` (date → ISO string with
  fallback); replaces per-feature `toISOString()`/local helpers.
- `common/utils/Regexp` — added `exactWord(word)` (case-insensitive exact match, now **escapes**
  regex-special chars so they match literally) + `escape(value)`.
- `common/utils/Predicate` — added `isDigits(value)`, `isPositiveInteger(value)`.
- `ApiMessage.sent(action)` + `ApiMessage.failed(action)` canonical wordings; later added
  `listening(port)`, `dbConnected()`, `missingEnv(name)` (all spec-covered).
- `common/utils/Arrays` — added `chunk(items, size)` (guarded to a positive-integer size;
  throws `RangeError` otherwise). Used by `server/Breakdown` for batched writes.

**Test fixes (this session):**

- `Regexp.exactWord('a.b')` no longer treats `.` as a wildcard — escapes regex metacharacters;
  `escape` spec added.
- `ApiMessage.dbConnected()` canonical wording is `'Connected to DB'`; spec aligned.
- `Page.spec.tsx` "records a visit by default" — mocks `Browser.isLocalhost() → false` +
  stubs `detectincognitojs` as not-private so the localhost-guard doesn't block visit recording.

**Field-limits / FE validation alignment:**

- `UserFieldLimits`: `userName {5,20}`, `password {8,40}` aligned to FE `Register.schema`.
- `Users.model.ts` `password.maxLength` = `UserPassword.hashLength = 60` (bcrypt hash storage) —
  distinct from the plaintext input `password.max = 40`; do not collapse these.
- `MessageFieldLimits` mirrors FE `Contact.schema` (name ≤50, email 6–255, phone 10–16,
  message 10–1000).
- `common/` deliberately holds NO feature/business constants; server `FieldLimits` = API contract,
  FE yup schemas keep in-sync duplicate values (FE cannot import `server/`, bundler boundary).

**Unfinished / deferred:**

- `server/Activity/` legacy cleanup **DONE**: `routes/activity.ts` + `models/{visit,like,message}.ts`
  deleted (Activity uses the feature models). `models/log.ts` KEPT (error middleware uses it).
- `ActivityTransformers` extracted. Specs are **deferred to a dedicated test sweep in the next
  ticket** (no server spec runner configured yet; server specs won't be collected by the root
  vitest `include`).
- **Settings type/FE reconciliation DONE**: `GetSettingsResponse`/`PostSettingsResponse` changed
  from `{ success, data }` to `{ settings }`; FE `Login.tsx` now reads `.settings` (was `.data`),
  and the Login mock handlers/spec updated accordingly. Server `SettingsService` already emitted
  `{ settings }` — this just aligned the shared contract + FE consumers with it.

**Naming-consistency sweep (DONE, this session):**

- `.routes.types.ts` ANTIPATTERN removed from all 8 remaining features (`Activity`, `Category`,
  `Like`, `Log`, `Message`, `Settings`, `Users`, `Visit`) — their Request/Response type aliases
  were folded into each feature's `Feature.types.ts` and the `.routes.types.ts` files deleted.
  `Breakdown`/`Schedule`/`ServiceHealth` already used the correct pattern.
- `Users.model.ts` renames `UserModel` → `UsersModel` (consistent with `UsersService`/
  `UsersRepository`/`UsersRouter`/`UsersSchema`/`UsersAuth`); barrel updated.
- `Users.middlewares.ts` now also exports a `UsersMiddleware = { auth, admin }` namespace
  (backward-compatible — bare `auth`/`admin` exports kept; `AppMiddleware`/`ScheduleAuth`/`UsersAuth` idiom).
- `PASSWORD_SALT_ROUNDS`/`PASSWORD_HASH_LENGTH` loose consts grouped into `UserPassword =
{ saltRounds, hashLength } as const`, matching `UserFieldLimits`.
- `server/App/` feature landed: `App` (composition root: `create`/`start`/`Boot`), `AppRoutes`,
  `AppMiddleware`, `AppConstants`. `startup/` folder dissolved; `index.ts` is slim boot.
  Joi + `joi-objectid` type augmentations live in `server/App/App.joi.d.ts` + `App.joiObjectId.d.ts`.

**Model migrations (DONE, this session):**

- `models/dailyBreakdown.ts` → `server/Breakdown/Breakdown.model.ts` (`BreakdownModel`); all 4
  importers rewired (Breakdown.repository, Like.service, Visit.service, Schedule.service);
  `BreakdownFieldLimits.path.max` backs the schema `maxLength`.
- `models/log.ts` superseded by existing `server/Log/Log.model.ts` (`LogModel`); `AppMiddleware.error`
  rewired to it. Deleted from `server/models/`.
- `models/user.ts` deleted — no longer imported by any server code (last used by the converted
  `xmas_2025` route); the legacy `server/models/` directory is now gone entirely.

**Remaining sweep: all project routes done** (typist, word_duel_arena level/word, xmas_2025) —
the core `server/Breakdowns/`/`server/Schedule/`/Health features are all **DONE**.

- `Page.tsx` localhost guard now catches `Browser.isLocalhost()`; `visits`/`likes` no longer
  recorded on localhost.
- Stale editor diagnostics after file deletion: verify with `file_search`/`Get-ChildItem`.

## 7. Related docs / links

- [`0003-gym-exercises-routines.md`](./0003-gym-exercises-routines.md) — gym feature this
  responders pilot runs on.
- [`0002-util-reuse-sweep.md`](./0002-util-reuse-sweep.md) — util consolidation this abstraction
  follows.
