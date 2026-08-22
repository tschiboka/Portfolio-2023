# 0004 — ApiResponder: centralised API response handling

> **Status:** Planned
> **Last updated:** 2026-08-22
> **Created:** 2026-08-22

---

## 1. Description

Refactor repetitive Express response handling into a central API abstraction while keeping route
code as close to the business logic as possible. The larger goal is that **all API response
formatting is centralised**. Start on the gym feature and **slowly sweep older endpoints** as part
of this ticket.

Current boilerplate:

```ts
return res
    .status(HttpStatus.NOT_FOUND)
    .json({ success: false, message: 'Exercise not found' })
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
- **Sequencing note:** because we sweep endpoints *gradually*, the FE will temporarily see two
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
if (!exercise)
    throw ApiResponder.notFound('exercise')
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

### 2.7 Common methods
`ApiResponder` contains common semantic convenience methods (not a giant arbitrary helper bag):

```ts
ApiResponder.ok(...)
ApiResponder.created(...)
ApiResponder.badRequest(...)
ApiResponder.notFound(...)
ApiResponder.forbidden(...)
```

All funnel through a small internal response mechanism.

### 2.8 `HttpStatus`
`HttpStatus` remains the central typed status set. Where the responder accepts a status
internally, use `HttpStatus` (not an unrestricted `number`).

## 3. Implementation caveats (must-haves)

These were identified during review and are load-bearing, not optional.

1. **Express 4 requires an async wrapper.** The server uses Express `^4.18.2`. In Express 4, a
   thrown/rejected error inside an `async` route handler does **not** automatically reach the error
   middleware — it becomes an unhandled promise rejection. So every async route must be wrapped
   (e.g. a `wrapHandler(fn)` helper) so that `throw ApiResponder.notFound(...)` actually reaches
   the central error middleware. This is a mandatory implementation piece.
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
4. Add an async `wrapHandler` helper (Express 4 requirement).
5. Extend/replace `server/middlewares/error.ts` to translate thrown `ApiError` → status/message,
   else 500.
6. Align `TypedResponse` / `ErrorResponse` types with the new `{ data }` / `{ message }` shapes
   and plan the `success` removal sequencing.
7. **Pilot on gym routes** (`exercises.ts`, `routines.ts`) — convert to `ApiResponder`.
8. **Sweep older endpoints** gradually, per §2.1 sequencing.
9. Update this doc's status/checklist + `INDEX.md` as progress is made.

## 5. Open questions

- `success` removal sequencing during the gradual sweep: keep-then-remove vs coordinated cutover?
- Where exactly the async wrapper sits (per-file helper vs imported from a shared util) and whether
  existing routes adopt it during the sweep.

## 6. Feature dev checklist

**Common utils**

- [ ] `capitalise` in `common/utils/Strings`
- [ ] `ApiMessage` namespace
- [ ] `ApiResponder` (`ok`/`created`/`badRequest`/`notFound`/`forbidden`)
- [ ] Internal `ApiError` throwable type
- [ ] `wrapHandler` async wrapper (Express 4)

**Middleware**

- [ ] Extend/replace `server/middlewares/error.ts` to emit `ApiError` status/message
- [ ] Fallback to 500 for unknown errors

**Types**

- [ ] Align `TypedResponse` / `ErrorResponse` with `{ data }` / `{ message }`
- [ ] Decide `success` removal sequencing

**Pilot**

- [ ] Convert gym `exercises.ts` routes
- [ ] Convert gym `routines.ts` routes
- [ ] Verify error middleware reaches thrown errors end-to-end

**Sweep**

- [ ] Convert remaining server endpoints

## 7. Related docs / links

- [`0003-gym-exercises-routines.md`](./0003-gym-exercises-routines.md) — gym feature this
  responders pilot runs on.
- [`0002-util-reuse-sweep.md`](./0002-util-reuse-sweep.md) — util consolidation this abstraction
  follows.
