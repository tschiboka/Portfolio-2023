---
name: router
access: read
description: 'Routing and API responses. The path table, the host each environment resolves to, and how an endpoint mounts, guards and answers.'
---

# /router

## When to use

- An endpoint is added, renamed, or removed.
- A route gains or loses a guard, or middleware order changes.
- A response shape changes.
- A host or port changes.

## Scope

Owns the path from URL to response — the path table, the host and port, the
mounted routers, per-route middleware, and the response.

Not how a feature calls an endpoint (`queries`), what it does with the result
(`ui`), or how data is stored (`db`).

## Rules

### Paths

- Every endpoint lives in `Paths.Server`, in the group that serves it — `Api` for the app, `Projects` for a project.
- The value is the fragment only. No scheme, no host, no leading slash.
- The client's key and the server's mount point are two halves of one decision.
- An unregistered key fails at request time, not compile time.

### Endpoints

- One router per domain, mounted once in `App.routes.ts` at its `Paths.Server` path, and exported as `<Domain>Router`.
- Every route's request and response are typed, declared as a named pair in `<Domain>.types.ts` — `GetFeatureReq` / `GetFeatureRes`, `PostFeatureReq` / `PostFeatureRes`. One pair per route, verb in the name.
- A handler delegates immediately. It validates and stores nothing.
- Middleware is per-route, in order: authentication, then authorisation. A route that takes no session says so by carrying none — a token is the proof.
- A fixed path is declared before a parameterised one that would match it.

### Responses

- Every response goes through `ApiResponder`. A route never calls `res.status` or `res.send` itself.
- A failure is **thrown** as an `ApiError`, never returned. Everything else is a 500.

## Workflow

1. Name the endpoint and the domain that serves it.
2. Add the fragment to `Paths.Server`.
3. Declare the route's `Req` / `Res` pair in `<Domain>.types.ts`.
4. Add the handler to that domain's router.
5. Mount the router in `App.routes.ts` if the domain is new.
6. Guard the route, in order.
7. Hand the request's shape to `queries`.

## File structure

```text
common/utils/Paths/
├── Paths.ts
├── apiPathBuilder.ts
└── getURL.ts

common/utils/Server/ApiResponder/
└── ApiResponder.ts

server/App/
├── App.constants.ts
├── App.routes.ts
├── App.middlewares.ts
└── <Domain>/
    ├── <Domain>.routes.ts
    └── <Domain>.middlewares.ts
```

## Files and folders

### `Paths.ts`

Return type: a `Paths` object — a `Server` group per server, a `Client` group
for page routes.
Example: [`Paths.ts`](./Paths.ts)

### `getURL.ts`

Return type: the origin for the current environment, as a string.
Example: [`getURL.ts`](./getURL.ts)
Rules:

- Two environments: local and the deployed origin. A third is a branch.
- Never a build flag, env file, or literal at a call site.

### `App.constants.ts`

Return type: an `AppConstants` object, `as const`.
Example: [`App.constants.ts`](./App.constants.ts)
Rules:

- Holds the listen port and the CORS policy.
- The port is named once. No call site writes a port number.

### `<Domain>.routes.ts`

Return type: an `express.Router`, exported as `<Domain>Router`.
Example: [`Feature.routes.ts`](./Feature.routes.ts)

### `<Domain>.middlewares.ts`

Return type: the domain's middleware group.

- Per-route, in order: authentication, then authorisation.
- A public route carries none rather than a no-op guard.
