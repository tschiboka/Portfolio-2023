# Skills map

The complete index of every skill in this folder. Four axes: **lifecycle**
(where in the work), **domains** (what area it touches), **principles** (rules
that hold everywhere), and the two **routers** that resolve the first three.

Read the routers first — [`lifecycle`](lifecycle/SKILL.md) when you know the
work but not its stage, [`domains`](domains/SKILL.md) when you know the area but
not the skill.

## Tree

```text
.github/skills/
├── MAP.md                  ← this file
│
├── lifecycle/              router — which stage
├── domains/                router — which area
│
├── brief/                  Frame    stage 1
├── document/               Frame    stage 2
├── implement/              Build    stage 3
├── test/                   Verify   stage 4
├── review/                 Verify   stage 5
├── debug/                  re-entry ↺ /implement
├── address/                re-entry ↺ /implement  corrective
├── refine/                 re-entry ↺ /brief      enhancing
│
├── component/              FE domain
├── ui/                     FE domain
├── table/                  FE domain
├── form/                   FE domain
├── queries/                FE domain
│
├── auth/                   BE domain
├── router/                 BE domain
├── db/                     BE domain
├── network/                BE domain
├── security/               BE domain
│
├── dry/                    principle
├── reuse/                  principle
├── types/                  principle
├── standards/              principle
├── harvest/                principle
├── find/                   principle
│
├── create-query/           legacy → queries   (body migrated)
├── create-tests/           legacy → test      (body migrated)
└── module/                 legacy → index.md
```

Every folder holds one `SKILL.md`. `MAP.md` is the exception — it sits at the
root because it is an index, not a skill, and nothing invokes it as one.

## Routers

| Skill                             | Answers                                                              |
| --------------------------------- | -------------------------------------------------------------------- |
| [`lifecycle`](lifecycle/SKILL.md) | Which stage is this work at, and what must exist before entering it? |
| [`domains`](domains/SKILL.md)     | Which area of the codebase does this touch?                          |

## Life-cycle

Ordered and gating. Each stage consumes the previous stage's artefact.

| Stage | Slash        | Phase  | Skill                             | Status |
| ----- | ------------ | ------ | --------------------------------- | ------ |
| 1     | `/brief`     | Frame  | [`brief`](brief/SKILL.md)         | stub   |
| 2     | `/document`  | Frame  | [`document`](document/SKILL.md)   | stub   |
| 3     | `/implement` | Build  | [`implement`](implement/SKILL.md) | stub   |
| 4     | `/test`      | Verify | [`test`](test/SKILL.md)           | full   |
| 5     | `/review`    | Verify | [`review`](review/SKILL.md)       | full   |

Re-entry verbs — not stages. Each fires from a later stage and returns to an
earlier one carrying the finding that caused the return.

| Verb       | Fire from | Returns to   | Skill                         | Status |
| ---------- | --------- | ------------ | ----------------------------- | ------ |
| `/debug`   | any       | `/implement` | [`debug`](debug/SKILL.md)     | stub   |
| `/address` | `/review` | `/implement` | [`address`](address/SKILL.md) | stub   |
| `/refine`  | `/review` | `/brief`     | [`refine`](refine/SKILL.md)   | stub   |

`/address` is corrective; `/refine` is enhancing. An improvement smuggled into
`/address` hides scope growth behind a correction.

## Domains

Unordered and parallel. A task may touch two at once.

### Front-end

`src/`, `common/ux/`, `common/utils/`

| Slash        | Owns                                                   | Skill                             | Status |
| ------------ | ------------------------------------------------------ | --------------------------------- | ------ |
| `/component` | Feature components — what they are and where they live | [`component`](component/SKILL.md) | full   |
| `/ui`        | Layout, styling and interaction patterns               | [`ui`](ui/SKILL.md)               | full   |
| `/table`     | Tabular data — construction, manipulation, querying    | [`table`](table/SKILL.md)         | stub   |
| `/form`      | Forms, validation and generic form UX patterns         | [`form`](form/SKILL.md)           | stub   |
| `/queries`   | Server calls — path, token, method, generics, key      | [`queries`](queries/SKILL.md)     | full   |

### Back-end

`server/`, `common/types/`

| Slash       | Owns                                                 | Skill                           | Status |
| ----------- | ---------------------------------------------------- | ------------------------------- | ------ |
| `/auth`     | Authentication and authorization                     | [`auth`](auth/SKILL.md)         | stub   |
| `/router`   | Routing and API responses in general                 | [`router`](router/SKILL.md)     | stub   |
| `/db`       | Storage — database interactions and persistence      | [`db`](db/SKILL.md)             | stub   |
| `/network`  | Network configuration, protocols and connectivity    | [`network`](network/SKILL.md)   | stub   |
| `/security` | Encryption, access control, vulnerability management | [`security`](security/SKILL.md) | stub   |

## Principles

Cross-cutting invariants. They apply at every stage and in every domain — they
are the bar work is judged by, never a step in a sequence.

| Principle    | Applies to                                       | Skill                             | Status |
| ------------ | ------------------------------------------------ | --------------------------------- | ------ |
| `/dry`       | Duplication — extract the generic bit            | [`dry`](dry/SKILL.md)             | stub   |
| `/reuse`     | A lookaround before writing anything new         | [`reuse`](reuse/SKILL.md)         | stub   |
| `/types`     | Where a type lives, and how it is shaped         | [`types`](types/SKILL.md)         | stub   |
| `/standards` | The accepted bar, checked before handing work on | [`standards`](standards/SKILL.md) | stub   |
| `/harvest`   | Turning a found gap into a candidate rule        | [`harvest`](harvest/SKILL.md)     | stub   |
| `/find`      | Locating things — usages, alternatives, docs     | [`find`](find/SKILL.md)           | stub   |

## Status key

| Status   | Means                                                          |
| -------- | -------------------------------------------------------------- |
| `full`   | Body written and in use.                                       |
| `stub`   | Frontmatter only — the routing is defined, the body is `TODO`. |
| `legacy` | Superseded by a folder in this map; body not yet migrated.     |

## Pending migration

These predate the four axes and are not part of the map until their bodies move:

| Legacy                               | Migrates to                     |
| ------------------------------------ | ------------------------------- |
| [`module/skill.md`](module/skill.md) | this file — delete the original |
