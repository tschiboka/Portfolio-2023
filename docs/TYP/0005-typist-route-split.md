# TYP-0005 — The Typist route does its own work

## 1. Description

One handler parses the request, works out the error combinations the practice mode needs, and builds
the response. The calculation moves into service functions, so the route only calls them and returns —
which is what every other feature's routes already do.

## 1.1 Info

| Status       | Planned    |
| ------------ | ---------- |
| Last updated | 2026-11-08 |
| Created      | 2026-11-08 |

## 2. Feature Dev Checklist

- [ ] Step 1: Move the error-combination calculation into service functions
- [ ] Step 2: Reduce the handler to calling them and returning the response —
      `server/projects/Typist/Typist.router.ts`
