import type { Optional } from '../Generics'
import { isEmpty, isPositiveInteger } from '../Predicate'

export const shuffleArray = <T>(array: T[]): T[] => {
    const shuffled = [...array]

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    return shuffled
}

/** Build a `count`-length array by calling `build` once per index, 0-based.
 * @example
 * times(3, (i) => i + 1) // [1, 2, 3]
 */
export const times = <T>(count: number, build: (index: number) => T): T[] =>
    Array.from({ length: count }, (_, index) => build(index))

/** Returns a random element from an array, or `undefined` when empty.
 * @example
 * random(['a', 'b', 'c']) // 'a' | 'b' | 'c' — uniformly chosen
 * random([])              // undefined
 */
export const random = <T>(array: readonly T[]): Optional<T> => {
    if (isEmpty(array)) return undefined
    return array[Math.floor(Math.random() * array.length)]
}

/** Returns a new array with duplicate elements removed, preserving first-seen order.
 * @example
 * unique(['a', 'b', 'a'])  // ['a', 'b']
 * unique([1, 1, 2, 3, 3]) // [1, 2, 3]
 */
export const unique = <T>(array: readonly T[]): T[] => Array.from(new Set(array))

/** Splits an array into consecutive `size`-length sub-arrays; the final chunk may be shorter.
 * Guarded to a positive-integer `size` — invalid sizes throw rather than behaving incidentally.
 * @example
 * chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 * chunk([], 3)              // []
 * @throws {RangeError} when `size` is not a positive integer (0, negative, fractional, NaN, or infinite).
 */
export const chunk = <T>(items: readonly T[], size: number): T[][] => {
    const rawSize = size
    if (!isPositiveInteger(size)) {
        throw new RangeError(`chunk: size must be a positive integer, got ${rawSize}`)
    }
    return Array.from({ length: Math.ceil(items.length / size) }, (_, i) =>
        items.slice(i * size, i * size + size),
    )
}

export const Arrays = {
    shuffleArray,
    times,
    random,
    unique,
    chunk,
}
