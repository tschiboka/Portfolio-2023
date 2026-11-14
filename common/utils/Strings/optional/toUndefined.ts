import { isFalsy } from '../../Predicate/Predicate.js'
import type { Nullish, Optional } from '../../Generics/index.js'

/** Collapses a nullish/falsy value to undefined. */
export const toUndefined = (value: Nullish<string>): Optional<string> =>
    isFalsy(value) ? undefined : value
