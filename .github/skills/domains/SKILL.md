---
name: domains
description: 'Routing a task to its area of the codebase. The FE and BE split, which skills own which area, and who owns a request that crosses the boundary.'
---

# Domains

Where does this work live? A domain is an **area you enter**, not a stage you
pass through: domains are unordered and parallel, and a task may touch two at
once. This is the opposite of the life-cycle — do not read this file as a
sequence.

## When to use

- Deciding which domain a task touches.
- Finding the skill that owns a domain concern.
- Separating a FE concern from a BE one.

Standards of reference: `ARCHITECTURE.md` §1 (FE), §2 (BE)

## Front-end

`src/`, `common/ux/`, `common/utils/`

| Slash        | Owns                                                     | Skill                                    |
| ------------ | -------------------------------------------------------- | ---------------------------------------- |
| `/component` | Creating, modifying and managing feature components      | planned                                  |
| `/ui`        | Layout, styling and interaction patterns                 | planned                                  |
| `/table`     | Tabular data — construction, manipulation, querying      | planned                                  |
| `/form`      | Forms, validation and generic form UX patterns           | planned                                  |
| `/queries`   | Server calls — path, token, method, generics, `QueryKey` | [create-query](../create-query/SKILL.md) |

`/component` owns the component as a unit — what it is and where it lives.
`/ui` owns how it looks and behaves visually. A component change that alters
only styling is `/ui`; one that alters structure or responsibility is
`/component`.

## Back-end

`server/`, `common/types/`

| Slash       | Owns                                                 | Skill   |
| ----------- | ---------------------------------------------------- | ------- |
| `/auth`     | Authentication and authorization mechanisms          | planned |
| `/router`   | Routing and API responses in general                 | planned |
| `/db`       | Storage — database interactions and persistence      | planned |
| `/network`  | Network configuration, protocols and connectivity    | planned |
| `/security` | Encryption, access control, vulnerability management | planned |

## The boundary

`/queries` is FE-resident but every call crosses to BE. When the two disagree
about a request's shape, **the BE contract wins** — the FE query describes a
request the server already accepts, not one it hopes for. `common/types/` holds
the shape both sides agree on, which is why neither side owns it alone.

A boundary change touches both domains and therefore needs both skill sets. Treat
it as two tasks against one ticket, not one task spanning two domains.
