---
name: auth
access: read
description: 'Sessions and tokens, login and logout, guards, permissions.'
---

# /auth

## When to use

- A session or token must be created, read, refreshed, or cleared.
- A route, screen, action, or request must require authentication.
- Access depends on a capability, feature flag, or custom condition.

## Scope

Owns caller identity, session lifecycle, authentication, authorization, and
access guards.

Does not own request construction (`router`), stored records (`db`), or form
submission (`form`).

## Rules

**Session**

- The server is authoritative. The client holds the token, never the authority.
- Clear the session and route to login on logout, expiry, or rejected authentication.
- Keep one source of truth for the current session.

**Access**

- Use the narrowest condition that expresses the rule: capability, feature, or custom predicate.
- Prefer capabilities over role names.
- Choose the denied mode deliberately: hidden, visible, disabled, explained, or tooltip.
- Guard at the boundary closest to the protected content.
- Deny by default when identity or access is unknown.
- Permission guards are complete imperative sentences — `requireUserCanModify(exercise, user)`, never `canModify(...)`.
- A guard is a security operation, not a predicate: it **throws `ApiResponder.forbidden()`** rather than returning a boolean.

## Workflow

1. Identify the protected boundary.
2. Establish the required identity and access condition.
3. Choose the denied mode.
4. Confirm the authentication failure path.
5. Hand the change to `/implement`.
