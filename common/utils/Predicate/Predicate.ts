// ── Types ────────────────────────────────────────────────────────────────────

type Nil = null | undefined
type Defined<T> = Exclude<T, Nil>
type Falsy = false | 0 | '' | Nil
type Truthy<T> = Exclude<T, Falsy>
type Emptiable = unknown[] | string | Record<string, unknown> | Nil
type Primitive = string | number | boolean | Nil

// ── Nullish & Existence ──────────────────────────────────────────────────────

/**
 * Type guard that checks whether a value is neither `null` nor `undefined`.
 *
 * Useful as a callback for `.filter()` to narrow array types:
 *
 * @example
 * const items: (string | null)[] = ['a', null, 'b']
 * const defined: string[] = items.filter(isDefined)
 *
 * @param value - The value to check.
 * @returns `true` if the value is defined, narrowing the type to `T`.
 */
export const isDefined = <T>(value: T): value is Defined<T> => value !== null && value !== undefined

/**
 * Type guard that checks whether a value is `undefined`.
 *
 * @example
 * const items: (string | undefined)[] = ['a', undefined, 'b']
 * const undefinedItems = items.filter(isUndefined)
 *
 * @param value - The value to check.
 * @returns `true` if the value is `undefined`.
 */
export const isUndefined = (value: unknown): value is undefined => value === undefined

/**
 * Type guard that checks whether a value is `null`.
 *
 * @example
 * isNull(null)      // true
 * isNull(undefined) // false
 *
 * @param value - The value to check.
 * @returns `true` if the value is `null`.
 */
export const isNull = (value: unknown): value is null => value === null

// ── Truthiness ───────────────────────────────────────────────────────────────

/**
 * Type guard that checks whether a value is truthy.
 *
 * @example
 * const items: (string | null | 0)[] = ['a', null, 0, 'b']
 * const truthy = items.filter(isTruthy) // ['a', 'b']
 *
 * @param value - The value to check.
 * @returns `true` if the value is truthy, narrowing the type to exclude `Falsy`.
 */
export const isTruthy = <T>(value: T): value is Truthy<T> => Boolean(value)

/**
 * Type guard that checks whether a value is falsy.
 *
 * @example
 * isFalsy(0)    // true
 * isFalsy('')   // true
 * isFalsy(null) // true
 * isFalsy('hi') // false
 *
 * @param value - The value to check.
 * @returns `true` if the value is falsy.
 */
export const isFalsy = (value: unknown): value is Falsy => !value

// ── Primitive Type Guards ────────────────────────────────────────────────────

/**
 * Type guard that checks whether a value is a `boolean`.
 *
 * @example
 * isBoolean(true) // true
 * isBoolean(0)    // false
 *
 * @param value - The value to check.
 * @returns `true` if the value is a `boolean`.
 */
export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean'

/**
 * Type guard that checks whether a value is a `number`.
 *
 * @example
 * isNumber(42)    // true
 * isNumber(NaN)   // true
 * isNumber('42')  // false
 *
 * @param value - The value to check.
 * @returns `true` if the value is a `number`.
 */
export const isNumber = (value: unknown): value is number => typeof value === 'number'

/**
 * Type guard that checks whether a value is a `string`.
 *
 * @example
 * isString('hello') // true
 * isString(42)      // false
 *
 * @param value - The value to check.
 * @returns `true` if the value is a `string`.
 */
export const isString = (value: unknown): value is string => typeof value === 'string'

/**
 * Type guard that checks whether a value is a primitive type.
 *
 * Primitives: `string`, `number`, `boolean`, `null`, `undefined`.
 *
 * @example
 * isPrimitive('hello') // true
 * isPrimitive(42)      // true
 * isPrimitive({})      // false
 *
 * @param value - The value to check.
 * @returns `true` if the value is a primitive.
 */
export const isPrimitive = (value: unknown): value is Primitive =>
    value === null ||
    value === undefined ||
    (typeof value !== 'object' && typeof value !== 'function')

/**
 * Type guard that checks whether a value is a `function`.
 *
 * @example
 * isFunction(() => {})      // true
 * isFunction(console.log)   // true
 * isFunction('hello')       // false
 *
 * @param value - The value to check.
 * @returns `true` if the value is a function.
 */
export const isFunction = (value: unknown): value is (...args: unknown[]) => unknown =>
    typeof value === 'function'

/**
 * Type guard that checks whether a value is a finite number.
 *
 * Excludes `NaN`, `Infinity`, and `-Infinity`.
 *
 * @example
 * isFiniteNumber(42)        // true
 * isFiniteNumber(NaN)       // false
 * isFiniteNumber(Infinity)  // false
 * isFiniteNumber('42')      // false
 *
 * @param value - The value to check.
 * @returns `true` if the value is a finite number.
 */
export const isFiniteNumber = (value: unknown): value is number =>
    typeof value === 'number' && Number.isFinite(value)

// ── Structural Type Guards ───────────────────────────────────────────────────

/**
 * Type guard that checks whether a value is an array.
 *
 * @example
 * isArray([1, 2]) // true
 * isArray('hi')   // false
 *
 * @param value - The value to check.
 * @returns `true` if the value is an array.
 */
export const isArray = (value: unknown): value is unknown[] => Array.isArray(value)

/**
 * Type guard that checks whether a value is a non-null, non-array object.
 *
 * @example
 * isObject({})     // true
 * isObject([])     // false
 * isObject(null)   // false
 *
 * @param value - The value to check.
 * @returns `true` if the value is a plain object.
 */
export const isObject = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null && !Array.isArray(value)

/**
 * Type guard that checks whether a value is a plain object (created by `{}` or `Object.create(null)`).
 *
 * Excludes arrays, class instances, `Date`, `RegExp`, etc.
 *
 * @example
 * isPlainObject({})              // true
 * isPlainObject({ a: 1 })       // true
 * isPlainObject(new Date())      // false
 * isPlainObject([])              // false
 * isPlainObject(null)            // false
 *
 * @param value - The value to check.
 * @returns `true` if the value is a plain object.
 */
export const isPlainObject = (value: unknown): value is Record<string, unknown> => {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) return false
    const proto: unknown = Object.getPrototypeOf(value)
    return proto === Object.prototype || proto === null
}

// ── Collection Checks ────────────────────────────────────────────────────────

/**
 * Checks whether a value has a `length` property greater than zero.
 *
 * Returns `false` for `null` and `undefined`.
 * Works with arrays, strings, and any object with a numeric `length`.
 *
 * @example
 * hasLength([1, 2, 3]) // true
 * hasLength([])         // false
 * hasLength('hello')    // true
 * hasLength('')         // false
 * hasLength(null)       // false
 * hasLength(undefined)  // false
 *
 * @param value - The value to check.
 * @returns `true` if the value has a `length` greater than zero.
 */
export const hasLength = (value: { length: number } | Nil): boolean =>
    value != null && value.length > 0

/**
 * Checks whether a value is empty.
 *
 * - `null` / `undefined`: always empty
 * - Arrays: no elements (`length === 0`)
 * - Strings: no characters (`length === 0`)
 * - Objects: no own enumerable keys
 *
 * @example
 * isEmpty(null)      // true
 * isEmpty(undefined) // true
 * isEmpty([])        // true
 * isEmpty([1])       // false
 * isEmpty('')        // true
 * isEmpty('hello')   // false
 * isEmpty({})        // true
 * isEmpty({ a: 1 }) // false
 *
 * @param value - The value to check.
 * @returns `true` if the value is empty.
 */
export const isEmpty = (value: Emptiable): boolean => {
    if (value == null) return true
    if (Array.isArray(value) || typeof value === 'string') return value.length === 0
    return Object.keys(value).length === 0
}

/**
 * Checks whether a value is non-empty.
 *
 * Inverse of `isEmpty`. Works with arrays, strings, and objects.
 *
 * @example
 * isNonEmpty([1])       // true
 * isNonEmpty([])        // false
 * isNonEmpty('hello')   // true
 * isNonEmpty('')        // false
 * isNonEmpty({ a: 1 }) // true
 * isNonEmpty({})        // false
 *
 * @param value - The value to check.
 * @returns `true` if the value is non-empty.
 */
export const isNonEmpty = (value: Emptiable): boolean => !isEmpty(value)

/**
 * Checks whether an array or object contains nested arrays or objects.
 *
 * @example
 * isNested([1, [2]])          // true
 * isNested([1, 2, 3])         // false
 * isNested({ a: { b: 1 } })  // true
 * isNested({ a: 1, b: 2 })   // false
 *
 * @param value - The array or object to check.
 * @returns `true` if any element or value is an array or object.
 */
export const isNested = (value: unknown[] | Record<string, unknown>): boolean => {
    const values = Array.isArray(value) ? value : Object.values(value)
    return values.some((v) => typeof v === 'object' && v !== null)
}

// ── Property Checks ─────────────────────────────────────────────────────────

/**
 * Type guard that checks whether an object has a specific own property.
 *
 * @example
 * const obj: unknown = { name: 'Alice' }
 * if (hasProperty(obj, 'name')) obj.name // string
 *
 * @param obj - The object to check.
 * @param key - The property key to look for.
 * @returns `true` if the object has the specified own property.
 */
export const hasProperty = <K extends PropertyKey>(
    obj: unknown,
    key: K,
): obj is Record<K, unknown> =>
    typeof obj === 'object' && obj !== null && Object.prototype.hasOwnProperty.call(obj, key)

/**
 * Checks whether a collection contains a given value.
 *
 * Works with arrays, plain objects (checks values), `Set`, and `Map` (checks values).
 *
 * @example
 * hasValue([1, 2, 3], 2)              // true
 * hasValue({ a: 1, b: 2 }, 2)         // true
 * hasValue(new Set([1, 2]), 2)        // true
 * hasValue(new Map([['a', 1]]), 1)    // true
 * hasValue([1, 2, 3], 4)              // false
 *
 * @param collection - The collection to search.
 * @param value - The value to look for.
 * @returns `true` if the collection contains the value.
 */
export const hasValue = (
    collection: unknown[] | Record<string, unknown> | Set<unknown> | Map<unknown, unknown>,
    value: unknown,
): boolean => {
    if (Array.isArray(collection)) return collection.includes(value)
    if (collection instanceof Set) return collection.has(value)
    if (collection instanceof Map) return Array.from(collection.values()).includes(value)
    return Object.values(collection).includes(value)
}

// ── Membership ───────────────────────────────────────────────────────────────

/**
 * Type guard that checks whether a value is one of the given options.
 *
 * @example
 * const statuses = ['active', 'inactive'] as const
 * isOneOf('active', statuses) // true
 * isOneOf('deleted', statuses) // false
 *
 * @param value - The value to check.
 * @param options - A readonly array of allowed values.
 * @returns `true` if the value is included in the options array.
 */
export const isOneOf = <T>(value: unknown, options: readonly T[]): value is T =>
    options.includes(value as T)

// ── Equality & Uniqueness ────────────────────────────────────────────────────

/**
 * Shallow equality check for two values.
 *
 * - Primitives: compared by value.
 * - Arrays: same length and each element strictly equal.
 * - Objects: same keys and each value strictly equal.
 *
 * @example
 * isShallowEqual(1, 1)                          // true
 * isShallowEqual([1, 2], [1, 2])                // true
 * isShallowEqual({ a: 1 }, { a: 1 })           // true
 * isShallowEqual({ a: { b: 1 } }, { a: { b: 1 } }) // false (shallow)
 *
 * @param a - The first value.
 * @param b - The second value.
 * @returns `true` if the values are shallowly equal.
 */
export const isShallowEqual = (a: unknown, b: unknown): boolean => {
    if (a === b) return true
    if (typeof a !== typeof b || a === null || b === null) return false
    if (Array.isArray(a) && Array.isArray(b))
        return a.length === b.length && a.every((v, i) => v === b[i])
    if (typeof a === 'object' && typeof b === 'object') {
        const keysA = Object.keys(a as Record<string, unknown>)
        const keysB = Object.keys(b as Record<string, unknown>)
        return (
            keysA.length === keysB.length &&
            keysA.every(
                (k) => (a as Record<string, unknown>)[k] === (b as Record<string, unknown>)[k],
            )
        )
    }
    return false
}

/**
 * Deep equality check for two values.
 *
 * - Primitives: compared by value.
 * - Arrays: same length and each element deeply equal.
 * - Objects: same keys and each value deeply equal.
 *
 * @example
 * isEqual(1, 1)                                   // true
 * isEqual([1, [2, 3]], [1, [2, 3]])               // true
 * isEqual({ a: { b: 1 } }, { a: { b: 1 } })     // true
 * isEqual({ a: { b: 1 } }, { a: { b: 2 } })     // false
 *
 * @param a - The first value.
 * @param b - The second value.
 * @returns `true` if the values are deeply equal.
 */
export const isEqual = (a: unknown, b: unknown): boolean => {
    if (a === b) return true
    if (typeof a !== typeof b || a === null || b === null) return false
    if (Array.isArray(a) && Array.isArray(b))
        return a.length === b.length && a.every((v, i) => isEqual(v, b[i]))
    if (typeof a === 'object' && typeof b === 'object') {
        const keysA = Object.keys(a as Record<string, unknown>)
        const keysB = Object.keys(b as Record<string, unknown>)
        return (
            keysA.length === keysB.length &&
            keysA.every((k) =>
                isEqual((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k]),
            )
        )
    }
    return false
}

/**
 * Checks whether all elements in an array are unique (by strict equality).
 *
 * @example
 * isUnique([1, 2, 3])    // true
 * isUnique([1, 2, 1])    // false
 * isUnique(['a', 'b'])   // true
 *
 * @param value - The array to check.
 * @returns `true` if all elements are unique.
 */
export const isUnique = (value: unknown[]): boolean => new Set(value).size === value.length

// ── Instance Check ───────────────────────────────────────────────────────────

/**
 * Type guard that checks whether a value is an instance of a given constructor.
 *
 * @example
 * isInstanceOf(new Date(), Date)       // true
 * isInstanceOf(new TypeError(), Error) // true
 * isInstanceOf('hello', String)        // false
 *
 * @param value - The value to check.
 * @param constructor - The constructor to check against.
 * @returns `true` if the value is an instance of the constructor.
 */
export const isInstanceOf = <T>(
    value: unknown,
    constructor: new (...args: never[]) => T,
): value is T => value instanceof constructor

// ── Built-in Type Guards ─────────────────────────────────────────────────────

/**
 * Type guard that checks whether a value is a `Date` instance and is valid.
 *
 * @example
 * isDate(new Date())            // true
 * isDate(new Date('invalid'))   // false
 * isDate('2024-01-01')          // false
 *
 * @param value - The value to check.
 * @returns `true` if the value is a valid `Date`.
 */
export const isDate = (value: unknown): value is Date =>
    value instanceof Date && !isNaN(value.getTime())

/**
 * Type guard that checks whether a value is an `Error` instance.
 *
 * @example
 * isError(new Error('oops'))      // true
 * isError(new TypeError('bad'))   // true
 * isError({ message: 'fake' })    // false
 *
 * @param value - The value to check.
 * @returns `true` if the value is an `Error`.
 */
export const isError = (value: unknown): value is Error => value instanceof Error

/**
 * Type guard that checks whether a value is a `RegExp` instance.
 *
 * @example
 * isRegExp(/abc/)            // true
 * isRegExp(new RegExp('a'))  // true
 * isRegExp('abc')            // false
 *
 * @param value - The value to check.
 * @returns `true` if the value is a `RegExp`.
 */
export const isRegExp = (value: unknown): value is RegExp => value instanceof RegExp

/**
 * Type guard that checks whether a value is a native `Promise`.
 *
 * @example
 * isPromise(Promise.resolve(1))         // true
 * isPromise({ then: () => {} })         // false
 * isPromise(42)                         // false
 *
 * @param value - The value to check.
 * @returns `true` if the value is a `Promise`.
 */
export const isPromise = (value: unknown): value is Promise<unknown> => value instanceof Promise

/**
 * Type guard that checks whether a value is thenable (has a `.then` method).
 *
 * Broader than `isPromise` — matches any object with a `then` function,
 * including custom thenables and polyfills.
 *
 * @example
 * isThenable(Promise.resolve(1))         // true
 * isThenable({ then: () => {} })         // true
 * isThenable(42)                         // false
 *
 * @param value - The value to check.
 * @returns `true` if the value is thenable.
 */
export const isThenable = (value: unknown): value is PromiseLike<unknown> =>
    typeof value === 'object' &&
    value !== null &&
    typeof (value as Record<string, unknown>).then === 'function'

// ── Predicate Combinators ────────────────────────────────────────────────────

/**
 * Creates a predicate that checks if **all** elements in an array satisfy a type guard.
 *
 * @example
 * const allStrings = isAll(isString)
 * allStrings(['a', 'b'])  // true
 * allStrings(['a', 1])    // false
 *
 * @param predicate - The type guard to apply to each element.
 * @returns A predicate for arrays where every element matches.
 */
export const isAll =
    <T>(predicate: (value: unknown) => value is T) =>
    (values: unknown[]): values is T[] =>
        values.every(predicate)

/**
 * Creates a predicate that checks if **any** element in an array satisfies a type guard.
 *
 * @example
 * const anyNumber = isAny(isNumber)
 * anyNumber([1, 'a'])    // true
 * anyNumber(['a', 'b'])  // false
 *
 * @param predicate - The type guard to apply to each element.
 * @returns A predicate that returns `true` if at least one element matches.
 */
export const isAny =
    <T>(predicate: (value: unknown) => value is T) =>
    (values: unknown[]): boolean =>
        values.some(predicate)
