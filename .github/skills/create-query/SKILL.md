---
name: create-query
description: 'Author a feature `.queries.ts` or a shared query hook. USE FOR: adding a server call to a feature, wiring a mutation or query hook, deciding between FeatureQuery and RequestBuilder, choosing a PathKey, attaching the session token, picking a QueryKey. DO NOT USE FOR: writing specs (use `create-tests`), reviewing a file (use `review`), or component work. Standards of reference: `common/utils/Query/`.'
---

# Create Query

One file per feature: `Feature.queries.ts`. It owns the **request** — path, token,
method, generics, `QueryKey` — and returns react-query's own result. The component
owns the **flow**: what to show, where to go, and when to fire.

## A feature query is the generic approach

The hook declares **how this request is handled**, once, so every caller inherits
it. That includes the request itself and whatever policy belongs to it — default
success/error messages, cache invalidation, retry, `staleTime`.

| Hook owns (shared policy)                                       | Component owns (this screen)                   |
| --------------------------------------------------------------- | ---------------------------------------------- |
| path, token, method, generics, `QueryKey`                       | what to render, where to redirect              |
| default `onSuccess` / `onError` — messages, invalidation, toast | when to fire, and any screen-specific override |
| default `retry`, `staleTime`, `enabled`                         | —                                              |

**Anything shared must be overridable.** If a hook sets `onSuccess`, the next
caller must be able to replace it:

```ts
const { mutate } = usePostLike()
mutate({ path }, { onSuccess: () => setLiked(true) }) // overrides the hook's default
```

That only works when the hook spreads the options rather than hard-coding them —
`...request.Post({ onSuccess })`, never `...request.Post({ onSuccess: () => … })`.
A hook that decides _for_ the caller is the bug this rule prevents.

So: **the hook sets defaults, it never takes the decision away.** One caller → the
component can supply the callbacks; two or more sharing behaviour → that behaviour
moves into the hook as a default.

## Two builders, one rule

| Use                    | When                                                       |
| ---------------------- | ---------------------------------------------------------- |
| `Query.FeatureQuery()` | the mutation has a **body** and you want `.data` unwrapped |
| `Query.RequestBuilder` | payload-less POST, or you need the raw `AxiosResponse`     |

Never spread a `FeatureQuery` factory into `useMutation` and never cast its
`mutationFn`. If it doesn't fit, use `RequestBuilder` — that's what it's for.

Default policy goes **into** the factory call, not around it:

```ts
...request.Post({ onSuccess })                    // ✅ caller can override
...request.Post({ onSuccess: () => refresh() })   // ❌ the hook decides
```

## `FeatureQuery` — with a body

Every sample in this skill ends in the umbrella. Copy any of them and the shape is
already right.

```ts
const usePost = ({ onSuccess, onError }: UsePost) => {
    const request = Query.FeatureQuery().path('ConfirmRegistration').build()

    return useMutation<PostConfirmResponse, AxiosError<ErrorResponse>, PostConfirmRequest>({
        mutationKey: QueryKey.ConfirmRegistration.build(),
        ...request.Post({ onSuccess, onError }),
    })
}

export const ConfirmRegistrationQueries = { usePost }
```

- `.path(key)` / `.subpath(value)` / `.token(value?)` / `.build()` — chain in any order.
- `build()` throws when `path` was never set.
- `.Get(cacheKey, options?)`, `.Post(options?)`, `.Put`, `.Patch`, `.Delete` return
  **hook options**; the `useQuery`/`useMutation` call stays in the file.
- Options win over the built defaults: the caller's keys are spread last.

## `RequestBuilder` — no body, raw response, or a body transform

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
file. See `Contact.transformers.ts` and `Xmas2025.transformers.ts`.

```ts
// Contact.transformers.ts
export const contactTransformer = {
    toApi: (data: ContactFormData): PostMessageRequest => ({
        name: data.name,
        email: data.email.toLowerCase(),
        phone: data.phone.replace(/\D/g, '') || undefined,
        message: data.message,
    }),
}

// Contact.query.ts — the hook is typed on the FORM, not the payload
const usePost = ({ onSuccess, onError }: UsePostOptions = {}) => {
    const request = new Query.RequestBuilder('Message').build()

    return useMutation<PostMessageResponse, AxiosError<ErrorResponse>, ContactFormData>({
        mutationFn: (data) =>
            request
                .post<PostMessageResponse>(contactTransformer.toApi(data))
                .then((res) => res.data),
        onSuccess,
        onError,
    })
}

export const ContactQueries = { usePost }
```

And the payload-less / raw-response case:

```ts
type UsePost<TResponse> = {
    onSuccess?: (response: AxiosResponse<TResponse>) => void
    onError?: (error: AxiosError<ErrorResponse>) => void
}

const usePost = ({ onSuccess, onError }: UsePost<PostFeatureResponse> = {}) => {
    const token = Session.useContext().session?.token

    return useMutation<AxiosResponse<PostFeatureResponse>, AxiosError<ErrorResponse>, void>({
        mutationFn: () =>
            new Query.RequestBuilder('Feature')
                .setSubpath('do-something')
                .withAuthToken(token)
                .build()
                .post<PostFeatureResponse>(),
        onSuccess,
        onError,
    })
}
```

## Error messages

Never inline `error.response?.data?.message ?? 'some literal'`. Two shared things
exist for it:

- **`ErrorResponse`** lives in `common/utils/Query/mergeStatus.ts` and is
  re-exported from `@common-utils`. `common/types` re-declares it — import from
  **`@common-utils`** in a `.queries.ts` so the generics match `FeatureQuery`'s.
- **`errorMessage(error, fallback)`** from `@common-utils` returns the server
  message, or the fallback when the response carries none.
- **A response type carries ISO strings, never `Date`.** A `Date` cannot survive
  JSON — the browser receives a string — so declaring one is inaccurate, and it
  also breaks `RequestBuilder`, whose `JsonBodyType` constraint rejects it with
  an "Unsafe assignment of an `any`" warning. Server side, pipe the value through
  `DateTime.Format.toIso`; FE side, type it `string`.

```ts
setMessage(errorMessage(error, ClientMessage.Failure.Verify('email')))
```

Rules:

- **Server message primary, FE message fallback** — that is the house convention,
  and it is why `ErrorResponse.message` is optional.
- **Never fall back to `error.message`.** That is axios's own text — "Network
  Error", "Request failed with status code 500" — and it leaks library wording to
  a user. It was retired from `Login.tsx` and `Register.tsx` this round; the
  remaining `error.response?.data?.message ?? error.message` sites are bugs.
- **The fallback is always a `ClientMessage` call**, never a handwritten sentence:
  `ClientMessage.Failure.Create('category')`, `ClientMessage.Success.Created('category')`.
  If the catalogue lacks the verb, add it there rather than writing the string.
- **The noun is an argument**, not part of the string — that is what the catalogue is for.

Chain `setSubpath`, `setQuery`, `setParams`, `withHeader`, `withAuthToken` before
`.build()`. The built object exposes `get`/`post`/`put`/`patch`/`delete`/`head`/`options`.

Rules:

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
- **Write each hook out; don't pre-abstract.** Two near-identical hooks are
  cheaper to read than a generic factory plus its param and options types. A
  local factory earns its place at four or five variants, not two.

## The path is a key, not a URL

```ts
new Query.RequestBuilder('Gym') // ✅
new Query.RequestBuilder(Paths.Projects.Gym) // ❌ that's the URL
```

`Paths.Server.Api` / `Paths.Server.Projects` exist to type `PathKey` and feed
`apiPathBuilder`. **Call sites pass the plain key.** `Paths.Client.*` is the
opposite — those are page URLs, used directly by `navigate()`.

Don't import `Paths` into a `.queries.ts` unless you navigate.

## The token

```ts
const token = Session.useContext().session?.token
```

Read it in the hook, never in a plain helper — that's a Rules-of-Hooks violation.
`withAuthToken(undefined)` is a no-op, so pass it unconditionally.

`common/` must not import `src/` (ARCHITECTURE §5.1), so a shared hook takes
`token` as a **parameter** rather than reading `Session`.

## Naming and shape

**One umbrella export per file, and its name is the file name minus `.queries`, verbatim.**

| File                      | Umbrella              |
| ------------------------- | --------------------- |
| `Likes.queries.ts`        | `LikesQueries`        |
| `Visits.queries.ts`       | `VisitsQueries`       |
| `Categories.queries.ts`   | `CategoriesQueries`   |
| `WebsiteStats.queries.ts` | `WebsiteStatsQueries` |
| `Admin.queries.ts`        | `AdminQueries`        |

No singularising. `Likes.queries.ts` exports `LikesQueries`, **not** `LikeQueries`
— a mechanically derived name cannot drift, and a name that disagrees with its own
file is noise at every deep import.

Inside the umbrella, **a group appears only when a second noun enters the file**.
A group marks a _noun change_ — never a subfeature, never decoration.

```ts
// one noun → flat, plain verb
export const RegisterQueries = { usePost }
export const CategoriesQueries = { useGet }
export const WebsiteStatsQueries = { useGet }

// second noun → group the minority noun, plain verb stays at the top level
export const LoginQueries = {
    usePost,
    Settings: { useGet },
}
```

- **The hook is never exported.** `const usePost = …`, not `export const usePost = …`.
  The umbrella is the file's only export — it is the whole public surface.
- **A flat file takes the plain verb** — `usePost`, `useGet`, `useDelete`. The
  umbrella already carries the noun, so `usePostRegister` inside `RegisterQueries`
  says "Register" twice.
- **The full noun returns only where it disambiguates** — `usePostLike`,
  `useGetLikeSummary` — which is inside a group, or when a deep import must stand
  alone. `LikesQueries.Summary.useGet`, not `LikesQueries.Summary.useGetLikeSummary`.
- The **umbrella mirrors that structure**: a plain verb at the top level, a group
  where the noun changes.
- Import order: external → aliased → relative → type-only → assets.

## What a hook returns

**Return the react-query result, unwrapped.** The hook is a thin wrapper over
`useQuery`/`useMutation` and hands back exactly what those return:

```ts
const useGetLikes = (path: string) =>
    useQuery<GetLikeResponse, AxiosError<ErrorResponse>>({
        ...Query.FeatureQuery()
            .path('Like')
            .build()
            .Get<GetLikeResponse>(QueryKey.Likes.byFilters({ path }).build()),
        enabled: Boolean(path),
    })

export const LikesQueries = { useGet: useGetLikes }
// caller: const { data } = LikesQueries.useGet(pathname)  →  data.likes
```

Rules:

- **Return the react-query result.** Never a hand-picked `{ data, refetch }` object —
  the component destructures what it needs: `{ data }`, `{ mutate, isPending }`,
  `{ error }`.
- **Never return `.data` from an axios response.** `FeatureQuery` already unwraps
  via `extractAxiosData`; a caller reading `res.data` means you used the wrong builder.
- **Per-call options must survive.** `onSuccess` passed at the `mutate` site
  (`mutate(payload, { onSuccess })`) only works if the hook doesn't swallow it —
  spread `...request.Post({ onSuccess })` rather than hard-coding a callback.
- **A shared default is a default, not a decision.** The hook may set messages,
  invalidation and retry; the caller must still be able to replace each one.

### Exception: a hook that owns a single-screen flow

When one screen, one request fired on mount, and nothing else consumes the hook,
the whole flow belongs in `.queries.ts` and the component renders only. This is the
benefit of having a queries file at all — pushing it back into the TSX gives the
component knowledge of the token, the messages and the redirect for no gain.

```ts
// Feature.queries.ts — owns token, messages, redirect, firing
const usePost = (token: string): UsePostResult => {
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const request = Query.FeatureQuery().path('ConfirmRegistration').build()

    const { mutate, isPending } = useMutation<…>({
        mutationKey: QueryKey.ConfirmRegistration.build(),
        ...request.Post({
            onSuccess: () => {
                setMessage(ClientMessage.Success.Verified('email'))
                navigate(Paths.Client.Login)
            },
            onError: (error) =>
                setMessage(error.response?.data?.message ?? ClientMessage.Failure.Verify('email')),
        }),
    })

    useEffect(() => {
        mutate({ token })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { message, isPending }
}

// Feature.tsx — renders only
const { verificationToken = '' } = useParams()
const { message, isPending } = FeatureQueries.Verify.usePost(verificationToken)
```

Conditions — all must hold:

- **One screen** consumes the hook, and it has no user action to hang `mutate` on.
- **No second caller**, so there is no default to override. The moment a second
  caller appears, drop back to the plain rule and make the callbacks defaults.
- The hook may own `useState` for the message, `useNavigate` for the redirect, and
  the firing `useEffect` — and nothing more.

## Checklist

- [ ] File is `Feature/tests/`-free — a `.queries.ts` sits beside its feature.
- [ ] Path passed as a **key**, not `Paths.*`.
- [ ] `FeatureQuery` if there's a body; `RequestBuilder` if there isn't.
- [ ] No cast, no spread-override, no hand-built `mutationFn` plumbing.
- [ ] `Session.useContext()` called inside the hook, not a helper.
- [ ] `QueryKey` set on every **query**; on a mutation only when something
      invalidates by that key.
- [ ] Mutation with no body typed `void` as the third generic — no cast.
- [ ] Result typed `AxiosResponse<T>` or unwrapped `T`, deliberately, not by accident.
- [ ] Error typed `AxiosError<ErrorResponse>`, `ErrorResponse` from `@common-utils`.
- [ ] No inline `error.response?.data?.message ?? '…'` — use `errorMessage`.
- [ ] No handwritten messages — fallbacks come from `ClientMessage`.
- [ ] Returns the react-query result — or, for a single-screen flow, the shaped
      object the exception allows (never a hand-picked `{ data, refetch }`).
- [ ] State kept in the component unless the hook owns the whole single-screen flow.
- [ ] Shared policy (default messages, invalidation, retry) declared in the hook.
- [ ] Every shared default is overridable — options spread, never hard-coded.
- [ ] **One umbrella export, named `<FileName>Queries` verbatim** (`Likes.queries.ts`
      → `LikesQueries`). The hooks themselves are never exported.
- [ ] **Flat file → plain verb** (`RegisterQueries.usePost`); **group only when a
      second noun enters the file** (`LoginQueries.Settings.useGet` beside
      `LoginQueries.usePost`). A group is a noun change, not a subfeature.
- [ ] Component left holding only what it renders.
