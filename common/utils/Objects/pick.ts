import { isDefined } from '../Predicate'
import type { Dictionary, Key } from '../Generics'

/**
 * Picks the given key(s) from an object, but only when the value is defined (not `null`/`undefined`).
 * Accepts a single key or an array of keys. Performs a "has a value" check — absent/empty keys are
 * omitted rather than included as `undefined`.
 * @example
 * pick({ a: 1, b: undefined, c: 3 }, 'b') // {}
 * pick({ a: 1, b: 2, c: 3 }, ['a', 'c']) // { a: 1, c: 3 }
 */
export const pick = <T extends object>(
    source: T,
    keys: string | readonly string[],
): Partial<Dictionary> => {
    const picked: Dictionary = {}
    ;(Array.isArray(keys) ? keys : [keys]).forEach((key: string) => {
        if (isDefined(source[key as Key<T>])) picked[key] = source[key as Key<T>]
    })
    return picked
}
