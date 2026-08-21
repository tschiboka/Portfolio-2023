import { isFalsy } from '../../Predicate'
import type { Nullish, Optional } from '../../Generics'

/** Collapses a nullish/falsy value to undefined. */
export const toUndefined = (value: Nullish<string>): Optional<string> =>
    isFalsy(value) ? undefined : value
