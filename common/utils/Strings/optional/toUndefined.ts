/* eslint-disable standards/no-deep-import -- TODO [0006] this file is compiled into the node ESM rules build, which needs an extension */
import { isFalsy } from '../../Predicate/Predicate.js'
import type { Nullish, Optional } from '../../Generics/Generics.types.js'

/** Collapses a nullish/falsy value to undefined. */
export const toUndefined = (value: Nullish<string>): Optional<string> =>
    isFalsy(value) ? undefined : value
