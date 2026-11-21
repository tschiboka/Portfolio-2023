/* eslint-disable standards/no-deep-import -- TODO [0006] this file is compiled into the node ESM rules build, which needs an extension */
import type { Nullish, Optional, Primitive } from '../../Generics/Generics.types.js'

/** Trims a value's string form, or undefined when the result is empty. */
export const trim = (value: Nullish<Primitive>): Optional<string> => {
    const s = String(value ?? '').trim()
    return s === '' ? undefined : s
}
