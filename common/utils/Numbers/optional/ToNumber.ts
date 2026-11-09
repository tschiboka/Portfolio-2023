import { isFalsy } from '../../Predicate'
import type { Nullish, Optional } from '../../Generics'

/** Coerces a raw value to a number, or undefined when absent/invalid (NaN). */
// eslint-disable-next-line standards/role-export-name -- the module is named for the verb it exports
export const toNumber = (value: Nullish<string>): Optional<number> => {
    if (isFalsy(value)) return undefined
    const n = Number(value)
    return Number.isNaN(n) ? undefined : n
}
