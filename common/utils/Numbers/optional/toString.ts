import { isDefined } from '../../Predicate'
import type { Nullish, Optional } from '../../Generics'

/** Coerces a number to its string form, or undefined when absent/invalid (NaN). */
export const toString = (value: Nullish<number>): Optional<string> => {
    if (!isDefined(value)) return undefined
    return Number.isNaN(value) ? undefined : String(value)
}
