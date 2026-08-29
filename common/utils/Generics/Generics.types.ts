/**
 * ============================================================================
 * Core Types
 * ============================================================================
 */

/** null | undefined */
export type Nil = null | undefined

/** Removes null and undefined */
export type Defined<T> = Exclude<T, Nil>

/** T | undefined — a value that may be omitted */
export type Optional<T> = T | undefined

/** T | null — a value that may be explicitly null */
export type Nullable<T> = T | null

/** T | null | undefined — both absent and null are possible */
export type Nullish<T> = T | Nil

/**
 * ============================================================================
 * Truthiness
 * ============================================================================
 */

export type Falsy = false | 0 | '' | Nil

export type Truthy<T> = Exclude<T, Falsy>

/**
 * ============================================================================
 * Primitive Types
 * ============================================================================
 */

export type Primitive = string | number | boolean | bigint | symbol

/**
 * ============================================================================
 * Object Types
 * ============================================================================
 */

/** Standard string-key dictionary */
export type Dictionary<T = unknown> = Record<string, T>

/** Object with any valid JS property key */
export type AnyObject = Record<PropertyKey, unknown>

/** Represents an object with no properties */
export type EmptyObject = Record<never, never>

/** A container that can be empty: array, string, object, or nil */
export type Emptiable = unknown[] | string | Dictionary | Nil

/** Entity/resource without its database-generated `_id` field (server-managed). */
export type WithoutId<T extends { _id: unknown }> = Omit<T, '_id'>

/**
 * ============================================================================
 * Arrays
 * ============================================================================
 */

/** T or T[] */
export type Arrayable<T> = T | T[]

/** T or readonly T[] */
export type ReadonlyArrayable<T> = T | readonly T[]

/** Array guaranteed to contain at least one item */
export type NonEmptyArray<T> = [T, ...T[]]

/**
 * ============================================================================
 * Functions
 * ============================================================================
 */

/** Any callable — `any` is intentional (a generic fn signature cannot be typed). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction = (...args: any[]) => any

export type VoidFunction = () => void

/** Any async callable — `any` is intentional (generic fn signature). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AsyncFunction = (...args: any[]) => Promise<any>

export type Predicate<T> = (value: T) => boolean

export type TypeGuard<T, S extends T> = (value: T) => value is S

/**
 * ============================================================================
 * Promise Helpers
 * ============================================================================
 */

/** T or Promise<T> */
export type Awaitable<T> = T | Promise<T>

/**
 * ============================================================================
 * Object Helpers
 * ============================================================================
 */

/** Union of all value types of an object */
export type ValueOf<T> = T[keyof T]

/** String keys of an object — the key subset usable as a string index (drops `number`/`symbol`) */
export type Key<T> = Extract<keyof T, string>

/** Keys whose values extend V */
export type KeysOfType<T, V> = {
    [K in keyof T]: T[K] extends V ? K : never
}[keyof T]

/** Merge two object types, preferring B */
export type Merge<A, B> = Omit<A, keyof B> & B

/**
 * ============================================================================
 * Property Modifiers
 * ============================================================================
 */

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

/**
 * ============================================================================
 * Deep Helpers
 * ============================================================================
 */

export type DeepPartial<T> = T extends (...args: never[]) => unknown
    ? T
    : T extends readonly (infer U)[]
      ? readonly DeepPartial<U>[]
      : T extends object
        ? { [K in keyof T]?: DeepPartial<T[K]> }
        : T

export type DeepReadonly<T> = T extends (...args: never[]) => unknown
    ? T
    : T extends readonly (infer U)[]
      ? readonly DeepReadonly<U>[]
      : T extends object
        ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
        : T

export type DeepMutable<T> = T extends (...args: never[]) => unknown
    ? T
    : T extends readonly (infer U)[]
      ? DeepMutable<U>[]
      : T extends object
        ? { -readonly [K in keyof T]: DeepMutable<T[K]> }
        : T

/**
 * ============================================================================
 * Optional / Required Keys
 * ============================================================================
 */

export type OptionalKeys<T> = keyof {
    [K in keyof T as Record<string, never> extends Pick<T, K> ? K : never]: unknown
}

export type RequiredKeys<T> = Exclude<keyof T, OptionalKeys<T>>

/**
 * ============================================================================
 * Utility Types
 * ============================================================================
 */

/** At least one property must exist */
export type AtLeastOne<T> = Partial<T> &
    {
        [K in keyof T]: Pick<T, K>
    }[keyof T]

/** Strongly typed IDs and nominal types */
export type Brand<T, Name extends string> = T & {
    readonly __brand: Name
}
