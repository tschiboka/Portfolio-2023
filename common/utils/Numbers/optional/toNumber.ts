import { isFalsy } from '../../Predicate'
import type { Nullish, Optional } from '../../Generics'

/** Coerces a raw value to a number, or undefined when absent/invalid (NaN). */
export const toNumber = (value: Nullish<string>): Optional<number> => {
    if (isFalsy(value)) return undefined
    const n = Number(value)
    return Number.isNaN(n) ? undefined : n
}
