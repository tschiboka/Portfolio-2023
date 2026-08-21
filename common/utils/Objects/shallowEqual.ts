import type { Dictionary } from '../Generics'

/**
 * Shallow equality between two dictionaries: same own key count and equal primitive values
 * per key. Does not deep-compare nested objects/arrays.
 * @example
 * shallowEqual({ a: 1, b: 2 }, { a: 1, b: 2 }) // true
 * shallowEqual({ a: 1 }, { a: 1, b: 2 })       // false
 * shallowEqual({ a: 1 }, { a: 2 })             // false
 */
export const shallowEqual = <T extends Dictionary>(a: T, b: T): boolean =>
    Object.keys(a).length === Object.keys(b).length &&
    Object.keys(a).every((key) => a[key] === b[key])
