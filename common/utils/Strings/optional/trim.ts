import type { Nullish, Optional, Primitive } from '../../Generics'

/** Trims a value's string form, or undefined when the result is empty. */
export const trim = (value: Nullish<Primitive>): Optional<string> => {
    const s = String(value ?? '').trim()
    return s === '' ? undefined : s
}
