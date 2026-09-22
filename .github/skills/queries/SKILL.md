---
name: queries
access: write
stack: 'tanstack-query, axios'
description: 'Authoring feature query and mutation hooks, including payloads, request builders, response handling, and API-to-FE data transformation.'
---

# /queries

This file carries no code. Every claim below points at the real file that
demonstrates it; read those, not this.

## When to use

- Adding a server call to a feature — query, mutation, or both.
- Choosing between `FeatureQuery` and `RequestBuilder` for a given request.
- Deciding where shared policy belongs: default messages, invalidation, retry,
  `staleTime`, and who may override it.
- Mapping a form's fields onto a different API payload before posting.

Standards of reference: `common/utils/Query/`

## Scope

One file per feature: `Feature.queries.ts`. It owns the **request** — path, token,
method, generics, `QueryKey` — and returns react-query's own result. The component
owns the **flow**: what to show, where to go, and when to fire.

Starts at the request boundary: a hook declares a path, a token, a method and its
generics against the `Query` umbrella, and returns react-query's own result.

Ends at the response boundary: the hook hands back a typed result, plus whatever
policy it attached — messages, invalidation, retry. It does not decide what the
screen renders, where it navigates, or when a call fires. Those belong to the
component.

Between those two points, this skill owns everything: the builder choice, the
`QueryKey`, the error message, and the transform from form data to API payload.

| Hook owns (shared policy)                                       | Component owns (this screen)                   |
| --------------------------------------------------------------- | ---------------------------------------------- |
| path, token, method, generics, `QueryKey`                       | what to render, where to redirect              |
| default `onSuccess` / `onError` — messages, invalidation, toast | when to fire, and any screen-specific override |
| default `retry`, `staleTime`, `enabled`                         | —                                              |

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
`Feature.transformers.ts` appears only when a form's fields must be mapped onto a
different API payload.

## Rules

**Choosing a builder**

- `Query.FeatureQuery()` when the mutation has a **body** and you want `.data` unwrapped.
- `Query.RequestBuilder` for a payload-less POST, a raw response, or a body that needs mapping. When the body needs mapping, see `### Feature.transformers.ts`.
- Never spread a `FeatureQuery` factory into `useMutation` and never cast its `mutationFn`. If it does not fit, `RequestBuilder` is what it is for.

**The token**

- Read it inside the hook: `Session.useContext().session?.token`.
- `FeatureQuery` takes it on the chain — `.path('Like').token(token).build()`.
- `RequestBuilder` takes it as a setter — `.withAuthToken(token).build()`.
- A public read omits it entirely rather than passing `undefined`.

**Errors**

- Never inline `error.response?.data?.message ?? 'some literal'`. Use `errorMessage(error, fallback)` from `@common-utils`, typed `AxiosError<ErrorResponse>`.
- Server message primary, FE message fallback — that is why `ErrorResponse.message` is optional.
- Never fall back to `error.message`; that is axios's own text and it leaks library wording to a user.
- The fallback is always a `ClientMessage` call, never a handwritten sentence. If the catalogue lacks the verb, add it there.
- `ErrorResponse` comes from `@common-utils`, never from `common/types`. Both exist; that copy does not match `FeatureQuery`'s generics, and the wrong one fails inside the builder.
- `ErrorResponse` is the exception to type-only-last: the `AxiosError<ErrorResponse>` generic sits with the other imports, so a type-only import is correct.

**Typing**

- Third generic is the variable type. A mutation with no body is `useMutation<TData, TError, void>` with `mutationFn: () =>`. Never cast to make a payload fit.
- `FeatureQuery` unwraps `.data`, so its read is typed on the value itself. `RequestBuilder` does not — type it `AxiosResponse<T>` when you want the envelope.
- Options are a plain object type — `{ onSuccess?, onError? }` written out, never `Pick<UseMutationOptions<…>>`.
- One path key, many operations → `setSubpath`. Not a new `PathKey` per endpoint.
- A response type carries ISO strings, never `Date` — JSON cannot carry one, and `RequestBuilder`'s `JsonBodyType` rejects it.

## Workflow

1. Decide whether the request is a read or a write, and whether it carries a body.
2. Pick the builder — `FeatureQuery` for a body, `RequestBuilder` otherwise.
3. Read the token inside the hook and attach it the way that builder takes it. Omit it for a public read.
4. Set the hook's defaults — messages, invalidation, retry, `staleTime` — and spread the caller's options last so every one is overridable.
5. If the body is not the mutation variable, add `Feature.transformers.ts` and map it there.
6. Type the result and the error: `AxiosResponse<T>` or `T`, and `AxiosError<ErrorResponse>`.
7. Export the hooks on a single `<Feature>Queries` object.

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
Return type: a `<Feature>Transformers` object from `ClientTransformers`,
holding one verb per request the feature makes.
Example: [`Feature.transformers.ts`](./Feature.transformers.ts)
Rules:

- Only exists when a body needs mapping — never create one pre-emptively.
- Build it with `ClientTransformers` from `@common-utils` — never a hand-rolled object.
- The mapping lives here, never inline in the queries file.
- `FeatureQuery.Post<TRequest, TResponse>` takes the mutation variable **as** the body — there is no seam for a transform. Reaching into `request.Post(...).mutationFn` casts into builder internals; overriding `mutationFn` in the options replaces the request with a no-op. Both produce working-looking code that silently corrupts the request.
- One verb per request, named for the verb: `Post`, `Patch`, `Get`.
- All five verbs come back, always. One the caller did not supply throws when called,
  naming itself — so the surface is complete and nothing is mapped by the wrong rule.
- The hook stays typed on the form; each verb returns that request's payload.
