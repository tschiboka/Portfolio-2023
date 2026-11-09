import { isDefined } from '../../Predicate'
import type { Nullish, Optional } from '../../Generics'

/** Coerces a number to its string form, or undefined when absent/invalid (NaN). */
// eslint-disable-next-line standards/role-export-name -- the module is named for the verb it exports
export const toString = (value: Nullish<number>): Optional<string> => {
    if (!isDefined(value)) return undefined
    return Number.isNaN(value) ? undefined : String(value)
}
