import { trim } from './optional/trim'
import { toUndefined } from './optional/toUndefined'
import { isString, isEmpty } from '../Predicate'
import type { Nullish } from '../Generics'

/** Case-insensitive equality: `true` when both strings are equal after lowercasing.
 * @example
 * equalIgnoreCase('Hello', 'hello') // true
 * equalIgnoreCase('Hello', 'world') // false
 */
export const equalIgnoreCase = (a: string, b: string): boolean =>
    a.toLowerCase() === b.toLowerCase()

/** Case-insensitive substring check: `true` when `text` contains `search` after lowercasing.
 * @example
 * includesIgnoreCase('Hello World', 'WORLD') // true
 * includesIgnoreCase('Hello World', 'planet') // false
 */
export const includesIgnoreCase = (text: string, search: string): boolean =>
    text.toLowerCase().includes(search.toLowerCase())

/** Uppercases the first character, leaving the rest unchanged.
 * A nullish input is treated as an empty string (returns `''`).
 * @example
 * capitalise('exercise') // 'Exercise'
 * capitalise('') // ''
 * capitalise('x') // 'X'
 * capitalise(null) // ''
 * capitalise(undefined) // ''
 */
export const capitalise = (text: Nullish<string>): string => {
    if (!isString(text) || isEmpty(text)) return ''
    return text[0].toUpperCase() + text.slice(1)
}

export const Strings = {
    Optional: {
        trim,
        toUndefined,
    },
    equalIgnoreCase,
    includesIgnoreCase,
    capitalise,
}
