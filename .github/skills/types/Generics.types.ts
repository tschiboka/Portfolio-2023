// @ts-nocheck — skill example, outside the tsconfig include.

// A generic type in `common/utils/Generics/`. It says nothing about the domain —
// which is the test for living here rather than in `common/types/`.
export type Nil = null | undefined

/** T | undefined — a value that may be omitted. */
export type Optional<T> = T | undefined

/** T | null — a value that may be explicitly null. */
export type Nullable<T> = T | null

/** A value that stringifies meaningfully, so it can be sorted without `'[object Object]'`. */
export type Sortable = string | number | boolean | bigint | symbol | Date

/** Standard string-key dictionary. */
export type Dictionary<T = unknown> = Record<string, T>

/**
 * The three homes, side by side:
 *
 *   Generic   — no domain meaning                 `common/utils/Generics/`   `@common-utils`
 *   Domain    — a second feature consumes it      `common/types/`           `@common-types`
 *   Local     — only this feature uses it         `<Feature>.types.ts`      local relative
 */
