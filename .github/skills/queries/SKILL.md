---
name: 'queries'
kind: 'area'
stack: 'tanstack-query, axios'
description: 'Writing a feature `.queries.ts` file, query/mutation hooks. Payloads, request builders, and response handling, including data transformation between the API and the FE.'
---

# Queries

One file per feature: `Feature.queries.ts`. It owns the **request** — path, token,
method, generics, `QueryKey` — and returns react-query's own result. The component
owns the **flow**: what to show, where to go, and when to fire.

This file carries no code. Every claim below points at the real file that
demonstrates it; read those, not this.

## When to use

- Adding a server call to a feature — query, mutation, or both.
- Choosing between `FeatureQuery` and `RequestBuilder` for a given request.
- Deciding where shared policy belongs: default messages, invalidation, retry,
  `staleTime`, and who may override it.
- Mapping a form's fields onto a different API payload before posting.

Standards of reference: `common/utils/Query/`

## Scope of Expertise / Domain

Starts at the request boundary: a hook declares a path, a token, a method and its
generics against the `Query` umbrella, and returns react-query's own result.

Ends at the response boundary: the hook hands back a typed result, plus whatever
policy it attached — messages, invalidation, retry. It does not decide what the
screen renders, where it navigates, or when a call fires. Those belong to the
component.

Between those two points, this skill owns everything: the builder choice, the
`QueryKey`, the error message, and the transform from form data to API payload.

## File structure

```text
Feature/
├── Feature.queries.ts        ← this skill
├── Feature.transformers.ts   ← only when a body needs mapping
├── Feature.types.ts
├── Feature.tsx
└── Feature.utils.ts
```

`Feature.queries.ts` is the only file this skill creates unconditionally.
`Feature.transformers.ts` appears only for the third `RequestBuilder` case below —
a form whose fields must be mapped onto a different API payload.

## Methodology

### The hook owns the request, the component owns the flow

The hook declares **how this request is handled**, once, so every caller inherits
it. That includes the request itself and whatever policy belongs to it — default
success/error messages, cache invalidation, retry, `staleTime`.

| Hook owns (shared policy)                                       | Component owns (this screen)                   |
| --------------------------------------------------------------- | ---------------------------------------------- |
| path, token, method, generics, `QueryKey`                       | what to render, where to redirect              |
| default `onSuccess` / `onError` — messages, invalidation, toast | when to fire, and any screen-specific override |
| default `retry`, `staleTime`, `enabled`                         | —                                              |

**Anything shared must be overridable.** A hook sets defaults, it never takes the
decision away: one caller means the component supplies the callbacks; two or more
sharing behaviour means that behaviour moves into the hook as a default.

The pattern is `...request.Post({ onSuccess })` — spread, so the caller can
override — never `...request.Post({ onSuccess: () => refresh() })`.

Reference: [`Feature.queries.ts`](./Feature.queries.ts)
— `usePost` takes `{ onSuccess }` and spreads it into `request.Post`.

### Two builders, one rule

| Use                    | When                                                          |
| ---------------------- | ------------------------------------------------------------- |
| `Query.FeatureQuery()` | the mutation has a **body** and you want `.data` unwrapped    |
| `Query.RequestBuilder` | payload-less POST, raw response, or a body that needs mapping |

Never spread a `FeatureQuery` factory into `useMutation` and never cast its
`mutationFn`. If it doesn't fit, use `RequestBuilder` — that's what it's for.

Reference: [`Feature.queries.ts`](./Feature.queries.ts) and
[`Feature.transformers.ts`](./Feature.transformers.ts) — `FeatureQuery` and
`RequestBuilder` in the same file.

### Attaching the session token

The token comes from `Session.useContext().session?.token`, read inside the hook.
Two ways to attach it, and the builder decides which:

- **`FeatureQuery`** takes it as part of the chain — `.path('Like').token(token).build()`.
- **`RequestBuilder`** takes it as a setter — `.setSubpath('/subfeature1').withAuthToken(token).build()`.

A **public read needs no token at all** — omit it rather than passing `undefined`.

Reference: [`Feature.queries.ts`](./Feature.queries.ts) — token via chain in
`useGetSubfeature`, token via setter in `usePost`, and a token-free public read in
`useGet`.

### `FeatureQuery` — with a body

- `.path(key)` / `.subpath(value)` / `.token(value?)` / `.build()` — chain in any order.
- `build()` throws when `path` was never set.
- `.Get(cacheKey, options?)`, `.Post(options?)`, `.Put`, `.Patch`, `.Delete` return
  **hook options**; the `useQuery`/`useMutation` call stays in the file.
- Options win over the built defaults: the caller's keys are spread last.

Reference: [`Feature.queries.ts`](./Feature.queries.ts) — `useGet`, `useGetSubfeature`
and `usePost` show the query and mutation shapes.

> **Open question — is `.data` unwrapped?**
> The example types its reads on the unwrapped value. If a real feature keeps the
> envelope instead — `useGet<{ data: T }>` — this example is wrong and should be
> corrected to match. Resolve before copying the shape.

### `RequestBuilder` — no body, raw response, or a body transform

Three cases. Always `RequestBuilder` when:

- **the mutation has no body** — a payload-less POST, `mutationFn: () => …`;
- **the caller needs the raw `AxiosResponse`** rather than the unwrapped `.data`;
- **the request body is not the mutation variable** — a form whose fields must be
  mapped onto a different API payload before posting.

That third case is the one that catches people. `FeatureQuery.Post<TRequest, TResponse>`
takes the mutation variable **as** the request body — there is no seam for a
transform. Reaching into `request.Post(...).mutationFn` or overriding `mutationFn`
inside the options object both produce working-_looking_ code that silently corrupts
the request: the first is a cast into builder internals, the second replaces the
real request with a no-op that posts nothing.

The mapping itself belongs in a **`.transformers.ts`** beside the feature, as a
`FeatureTransformer` object with a `toApi` method — never inline in the queries
file.

Reference: [`Feature.transformers.ts`](./Feature.transformers.ts) for the `toApi`
shape, and [`Feature.queries.ts`](./Feature.queries.ts) for its use in a POST.

Chain `setSubpath`, `setQuery`, `setParams`, `withHeader`, `withAuthToken` before
`.build()`. The built object exposes `get`/`post`/`put`/`patch`/`delete`/`head`/`options`.

### Error messages

Never inline `error.response?.data?.message ?? 'some literal'`. Two shared things
exist for it:

- **`ErrorResponse`** lives in `common/utils/Query/mergeStatus.ts` and is
  re-exported from `@common-utils`.
- **`errorMessage(error, fallback)`** from `@common-utils` returns the server
  message, or the fallback when the response carries none.

Rules:

- **Server message primary, FE message fallback** — that is the house convention,
  which is why `ErrorResponse.message` is optional.
- **Never fall back to `error.message`.** That is axios's own text — "Network
  Error", "Request failed with status code 500" — and it leaks library wording to
  a user.
- **The fallback is always a `ClientMessage` call**, never a handwritten sentence:
  `ClientMessage.Failure.Create('category')`, `ClientMessage.Success.Created('category')`.
  If the catalogue lacks the verb, add it there rather than writing the string.
- **The noun is an argument**, not part of the string — that is what the catalogue is for.

Reference: [`Feature.queries.ts`](./Feature.queries.ts) — both reads and the
mutation type their errors `AxiosError<ErrorResponse>`.

## Files and folders

### `Feature.queries.ts`

Naming convention: `<Feature>.queries.ts`, beside the feature it serves.
Return type: a single exported `<Feature>Queries` object holding the hooks.
Example: [`Feature.queries.ts`](./Feature.queries.ts)
Rules:

- Exports `<Feature>Queries` as one object — never the hooks individually.
- One file per feature; shared hooks live under `src/shared/queries/`.
- The hook sets defaults; every caller must be able to override them.
- Reads and writes from the same feature share the file.

### `Feature.transformers.ts`

Naming convention: `<Feature>.transformers.ts`, beside the queries file.
Return type: a `<feature>Transformer` object exposing `toApi`.
Example: [`Feature.transformers.ts`](./Feature.transformers.ts)
Rules:

- Only exists when a body needs mapping — never create one pre-emptively.
- The mapping lives here, never inline in the queries file.
- The hook stays typed on the form; the transformer returns the API payload.

## Rules

- **Third generic is the variable type.** A mutation with no body is
  `useMutation<TData, TError, void>` and `mutationFn: () =>`. Anything else forces
  a payload that doesn't exist — never reach for a cast to make it fit.
- **Type the result as `AxiosResponse<T>` when the caller needs `.data`.** If the
  hook unwraps instead, type it `T` and use `FeatureQuery`.
- **Options are a plain object type.** `{ onSuccess?, onError? }` written out —
  never `Pick<UseMutationOptions<…>>`, which drags the library's generic order
  into your file for two callbacks.
- **One path key, many operations → `setSubpath`.** Several endpoints under the
  same key are distinguished by subpath, not by new `PathKey` entries.
- **A response type carries ISO strings, never `Date`.** JSON cannot carry a `Date`
  — the browser receives a string — so declaring one is inaccurate, and it breaks
  `RequestBuilder`, whose `JsonBodyType` constraint rejects it. Server side, pipe
  the value through `DateTime.Format.toIso`; FE side, type it `string`.

## ErrorResponse

One import rule is specific to a `.queries.ts`:

- **`ErrorResponse` comes from `@common-utils`, never from `common/types`.** Both
  exist; `common/types` re-declares it, and that copy does not match
  `FeatureQuery`'s generics. The wrong one compiles and then fails inside the
  builder.
- **`ErrorResponse` is the exception to type-only-last** — it is a type, but the
  `AxiosError<ErrorResponse>` generic that uses it sits with the other imports,
  so importing it as a type in the type-only group is correct and expected.

The hook declares **how this request is handled**, once, so every caller inherits
