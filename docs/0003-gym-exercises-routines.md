# 0003 — Gym Exercises & Routines: finalise page features

> **Status:** In progress
> **Last updated:** 2026-08-23
> **Created:** 2026-08-22

---

## 1. Description

Finalise the `#/projects/gym` page by closing the gap between its existing UI/types and a real
write path. The page already has a full "Add Exercise" form, five GET-backed react-query hooks,
static option lists, and rich shared types — but the models only persist `name`, there are no
POST/update/delete routes, and the form submit is not wired to anything. This feature makes
exercises and routines actually read/write against the server and aligns models with types.

## 2. Domain model: what is an Exercise vs a Routine

Before any schema work, we must settle what these two entities are — the code current confuses
them, and every downstream decision (ownership, fields, routes, composition) hangs on it.

**Exercise — the atomic movement / catalog item.** An exercise is the **literal exercise
definition**, including all information required to describe it — type, difficulty, muscle groups,
equipment (part of the definition, e.g. bench), instructions, notes, media URLs. Equipment and
other requirements are **part of the exercise**, not external ownership-determining entities.

**Routine — the user's structured program built from exercises.** A named, _ordered collection of
exercises_ that a user actually follows (e.g. "Push Day"). A routine is meaningless without
members; `{ name }` alone is not a routine — it is a label. Routines **reference canonical
exercises**.

## 2.1 Resolved domain model

**Exercises**

- **Canonical/default exercises** (admin-curated, project-wide) and **user-owned exercises** are
  both supported.
- Canonical/default exercises have **no individual user owner**.
- User-owned exercises are **private** (owner-scoped) and are **not visible to other users**.
- Contextual default: **only admins** create/modify canonical exercises. The model leaves room for
  future premium users to create private exercises, but that capability is **not built now**.
- Canonical/default exercises **take precedence** over semantically identical user exercises.

**Routines**

- Currently **user-owned** and **not shareable**.
- Routines **reference canonical exercises**.
- The shape must leave room for future **system/default routines** (app-generated or
  admin-defined) — but that capability is **not built now**.

**Scope discipline**

This is a **schema/domain-shape decision**, not a request to implement the future premium
exercise system, duplicate-detection engine, generated routines, sharing, versioning, etc. The
implementation stays focused; the schema just must not block those later capabilities.

## 3. Feature scope

**In scope**

- Align `GymExercise` / `GymRoutine` Mongoose models + Joi validators with the shared
  `GymExerciseResource` / `GymRoutineResource` types.
- Add server write routes: create / update / delete for exercises; create / update / delete for
  routines (auth-guarded, ownership-scoped once the ownership decision is made).
- Wire the frontend "Add Exercise" form submit to a POST; add react-query mutation hooks.
- Persist routines created via the "Create Routine" path.
- Resolve the `equipment?: string[] // make this an enum` TODO (type alignment with
  `EquipmentResource` options).
- Remove the `console.log` stubs in option `onSelect` handlers and submit.

**Out of scope / non-goals**

- Routine composition UX (adding exercises to a routine, ordering, sets/reps schema) — foundational
  type/schema work may allocate the shape, but the full composition feature is separate.
- Workout history/analytics.
- Admin/role-based editing permissioning (beyond the existing `auth` guard).
- Import/export of exercises or routines.

## 4. Plan

1. **Types first.** Lock the resolved domain model (§ 2.1), then finalise `GymExerciseResource`
   (canonical vs user-owned ownership) and a real `GymRoutineResource` (name + ordered canonical
   exercise references), esp. the `equipment` field. Lock these in `common/types/projects/gym.ts`.
2. **Models & validators.** Expand the Mongoose schemas and Joi validators in
   `server/projects/gym/models/models.ts` to cover the full resource shapes.
3. **Routes.** Add POST/PATCH/DELETE handlers to `exercises.ts` and `routines.ts` (mirroring the
   existing auth-guarded GETs, using the project's controller/service pattern or keeping it lean
   per existing route style).
4. **Frontend queries.** Add mutation hooks (`useCreateGymExercise`, etc.) alongside the existing
   `Gym.queries.ts` GET hooks.
5. **Form wiring.** Connect the `ExercisesSection` submit to the create mutation, add `onSubmit`
   handling, and wire option `onSelect` values into `react-hook-form`.
6. **Routines.** Wire "Create Routine" to a create mutation and list real routines.
7. **Tests.** Spec the new validators/routes and any new util; ensure existing GET specs still pass.
8. **Docs.** Update this doc's status/checklist and the `INDEX.md` row as work progresses.

## 5. Other solutions / options

- **Keep models thin (status quo).** Trivial to maintain but the form and types already outgrow
  it — data entered would be lost. Rejected.
- **Two-phase (types+models first, UI last).** Reduces churn but the UI already exists, so wiring
  it is the natural finishing step rather than a separate milestone.
- **Adopt the fuller controller/service/repository split** used elsewhere in the server. Heavier
  than the current lean route style needs; defer unless routes grow complex.

## 6. Pros / Cons

**Chosen: align models + add write routes + wire UI**

- Pros: matches the existing FE which is already type-driven; exercises/routines become real data.
- Cons: models + validators get meaningfully larger; requires mutation handling and server specs.

**Alternative: keep write path minimal (name-only)**

- Pros: smallest diff.
- Cons: contradicts the rich `GymExerciseResource` type and the form already built; `equipment`
  drift persists.

## 7. Decisions & rationale

- **Align models with shared types (not the reverse)** because the shared types are already the
  contract the FE consumes — model/schema should follow.
- **Exercises: canonical (owner-less) + user-owned (private, owner-scoped).** Canonical is the
  default/admin source of truth; user exercises are private and superseded by canonical
  duplicates. Encoded as a discriminated `source: 'canonical' | 'user'` union (`GymCanonicalExercise`
  / `GymUserExercise`), mirroring the existing `WdaPlayableLevelWord` pattern; `_id` follows the
  `xmas`/`app.ts` Mongoose convention.
- **Routines: user-owned, reference canonical exercises.** Not shareable now, but schema allows
  future system/default routines.
- **Keep the implementable scope minimal** — no premium exercise system, dedup engine, routine
  sharing, or versioning in this pass; only shape the schema so those aren't blocked.
- **Resolve `equipment` to the `EquipmentResource` enum** so the FE options, DB values, and types
  stay in lockstep (currently ~40 type values vs 17 option entries — one source of truth needed).
- **`EquipmentResource` is derived from a single `EQUIPMENT_OPTIONS` const** (`as const satisfies
readonly SearchInputOption[]`). The const and derived type are intentionally **co-located in
  `common/types/projects/gym.ts`** (not a feature const/options file) because the type derives from
  the const via `(typeof EQUIPMENT_OPTIONS)[number]['value']` — separating them would force either
  two drifting lists or `common/types` importing from `server/` (backwards/layering violation).
  Precedent: `wda.ts` keeps `as const` data objects in `common/types` for the same reason. The
  server feature options file re-exports the const so importers stay unchanged.
- **Server model: single flattened `IGymExercise` / `IGymRoutine` document** (not MongoDB
  discriminators). A Mongoose `Schema<T>` is one shape and can't express a discriminated union
  (`ownerId` required iff `source: 'user'`), so the document has a flattened `source` + **optional**
  `ownerId` (ObjectId, ref User), and the invariant is enforced in the **Joi validator** via
  `Joi.when('source', ...)` and in routes. Discriminators deferred unless canonical/user genuinely
  diverge later. Enum arrays (`equipment`, muscle groups) validated via `Joi.string().valid(...)`
  spread from `EQUIPMENT_OPTIONS` / `muscleGroupOptions`.
- **Put mutations in `Gym.queries.ts`** to keep all gym data-fetching in one place per the feature
  `Feature.queries.ts` convention.

## 8. Artifacts

- **File map**

| File                                                                              | Role                                                                      |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `common/types/projects/gym.ts`                                                    | Lock final `GymExerciseResource` / `GymRoutineResource`, `equipment` enum |
| `common/utils/Transformer/ApiTransformers.ts`                                     | `ApiTransformers.toApiResource` (doc → API resource, ObjectId → string)   |
| `common/utils/Predicate/Predicate.ts` / `common/utils/Regexp/Regexp.ts`           | `isObjectId` predicate + `Regexp.ObjectId` (its 24-hex contract)          |
| `server/projects/gym/Exercises/Exercises.routes.ts`                               | GET + POST/PATCH/DELETE exercise routes (on `ApiResponder`)               |
| `server/projects/gym/Routines/Routines.routes.ts`                                 | GET (on `ApiResponder`); POST/PATCH/DELETE routine routes pending         |
| `server/projects/gym/Exercises/{models,schema,types,constants}.ts` + `index.ts`   | Exercise feature files per AGENTS §3.2.1                                  |
| `server/projects/gym/Routines/{models,schema,types}.ts` + `index.ts`              | Routine feature files per AGENTS §3.2.1                                   |
| `common/utils/Option/`                                                            | `Option<T>` + `getValues`/`getLabels`/`getLabelByValue`/`getValueByLabel` |
| `common/utils/Predicate` / `common/utils/Regexp`                                  | `isValidObjectId` / `isObjectId` + `Regexp.ObjectId`                      |
| `common/utils/Generics`                                                           | `WithoutId<T>` generic                                                    |
| `src/components/pages/Misc/Gym/Gym.queries.ts`                                    | Add mutation hooks                                                        |
| `src/components/pages/Misc/Gym/components/ExerciesesSection/ExercisesSection.tsx` | Wire submit + option `onSelect`                                           |

- **Code / example** (to follow) — create-exercise route + mutation hook.

## 9. Open questions

- **`equipment`:** single `EquipmentResource` or `EquipmentResource[]`? Type says `string[]`;
  options are single-select in the form. (Equipment is part of the exercise definition, but its
  cardinality is unresolved.)
- **Routine member shape:** how are canonical-exercise references stored — ordered list of
  exercise IDs, or entries with per-exercise metadata (sets/reps)? Composition UX is out of scope,
  but the reference shape needs locking.
- **Which server layering** (route-only vs controller/service split) for the new handlers?

## 10. Feature dev checklist

**Domain / types (step 1)**

- [x] Add ownership to `GymExerciseResource`: canonical (owner-less) vs user-owned (`ownerId`)
      — discriminated `source` union (canonical | user); `equipment?: string[]` left for its own item
- [x] Model routine referencing **canonical exercises** (ordered exercise references)
- [x] Define `GymRoutineResource` (name + ordered references) and align the response type
      — `GymRoutineEntry { exerciseId, order }` + `GymRoutineResource = GymUserRoutine |
GymSystemRoutine`; `GetGymUserRoutinesResponse` uses it
- [x] Resolve `equipment` enum (single vs array) and unify option list with the type
      — `equipment?: EquipmentResource[]`; `EquipmentResource` derived from a single
      `EQUIPMENT_OPTIONS` const (34 values) via `as const satisfies`; server list re-exports it
- [x] Ensure schema doesn't block future: premium user exercises, system/default routines, dedup
      — verified: `GymUserExercise` (ownerId, private) covers premium; `GymSystemRoutine`
      (owner-less variant in the union) covers system routines; `source` discriminant doesn't
      obstruct dedup. No code change needed — runtime permission logic is out of scope.

**Server**

- [x] Expand `GymExercise` schema + validator (canonical vs user-owned, owner scoping)
      — single `IGymExercise` document (flattened union), `source` + optional `ownerId`
      (ObjectId, ref User); Joi enforces `ownerId` required iff `source: 'user'` via `Joi.when`
- [x] Expand `GymRoutine` schema + validator (user-owned, references canonical exercises)
      — `IGymRoutine` with `entries[]` ({ exerciseId ref GymExercise, order }) + `source`/`ownerId`
- [x] Add POST/PATCH/DELETE exercise routes (admin for canonical; owner-scoped for user exercises)
      — `POST /` admin-only (canonical), `PATCH/DELETE /:id` admin-for-canonical /
      owner-for-user guard; added `PostGymExerciseRequest` / `PatchGymExerciseRequest`
- [x] Serialise exercise/routine docs to API resources on GET via `ApiTransformers.toApiResource`
      — converts `ObjectId` → `string` recursively (incl. nested `ownerId`/`entries`); removed the
      `as unknown as GymExerciseResource` cast in `exercises.ts` (was a type lie) and fixed the
      `GymRoutine.find()` doc → `GymRoutineResource[]` mismatch in `routines.ts`. Both `tsc`-clean.
      Builds on the `isObjectId` predicate + `Regexp.ObjectId` (24-char lowercase hex contract).
- [x] Decompose the gym server into feature folders per AGENTS §3.2.1
      — `server/projects/gym/{Exercises,Routines,Difficulty,Equipment,MuscleGroup}/`, each with
      `Feature.routes/models/schema/types/constants(+options)` + `index.ts` barrel; the gym root
      `index.ts` exports `gymRouter`. The old `models/` and `routes/` folders are gone. Routers use
      `ApiResponder` + `ApiTransformers` + `isValidObjectId` + `ApiMessage`, and all export the
      `<Feature>Router` name (`ExercisesRouter`/`RoutinesRouter`/`DifficultyRouter`/
      `EquipmentRouter`/`MuscleGroupRouter`). The option features (`Difficulty`/`Equipment`/
      `MuscleGroup`) are static option-list GETs — no CRUD/ownership/persistence — so they are
      **not** given the repository/permissions/service layering (nothing to layer); they return
      wrapped objects (`{ difficulties }`/`{ equipment }`/`{ muscleGroups }`) via `ApiResponder.ok`
      (array-payload decision: wrap, don't widen `ok` — see 0004).
- [x] **Exercises layering (repository/permissions/service)** — `Exercises.repository.ts`
      (`ExercisesRepository` via the duck-typed `Repository` util + `findVisibleTo`),
      `Exercises.permissions.ts` (`ExercisesPermissions.requireUserCanModify` — admin-for-canonical /
      owner-for-user), `Exercises.service.ts` (`ExercisesService` — `listVisibleTo`/`create`/
      `update`/`remove`), and thin `Exercises.routes.ts` delegating to the service; barrel exports
      all layers. Service spec deferred (no BE test framework; see 0004).
- [x] Add POST/PATCH/DELETE routine routes (owner-scoped) + scope routine GETs
      — `RoutineModel`, `RoutinesRepository` + `findVisibleTo` (own + system),
      `RoutinesPermissions.requireUserCanModify` (admin-for-system / owner-for-user),
      `RoutinesService` (`listVisibleTo`/`create`/`update`/`remove`; `create` is user-owned,
      sets `ownerId`), thin `RoutinesRoutes` (GET/POST/PATCH/DELETE). Service spec deferred.
      Ownership guards are **shared** via `common/utils/Server/Permissions` (`requireAdminManaged` +
      `requireOwned`) — see 0004 cross-cutting note.
- [x] Scope exercise/routine GETs by ownership
      — `ExercisesRepository.findVisibleTo` (canonical + own) and
      `RoutinesRepository.findVisibleTo` (own + system) are used by `listVisibleTo` in each service,
      replacing the unscoped `GymRoutine.find()`.
- [x] Spec new validators/routes — **deferred**: no established BE test framework (schema/route/model
      specs tracked for a future test-sweep ticket) — see 0004.

**Frontend**

- [ ] Add mutation hooks in `Gym.queries.ts`
- [ ] Wire "Add Exercise" submit + option `onSelect` (admin path for canonical exercises)
- [ ] Wire "Create Routine" (references canonical exercises)
- [ ] Remove `console.log` stubs
- [ ] Verify page read/write end-to-end

## 11. Related docs / links

- [`0002-util-reuse-sweep.md`](./0002-util-reuse-sweep.md) — generic-type/util consolidation the
  gym types should build on.
