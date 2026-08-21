import type { Optional } from '../../Generics'

/** Trims a value's string form, or undefined when the result is empty. */
export const trim = (value: unknown): Optional<string> => {
    const s = String(value ?? '').trim()
    return s === '' ? undefined : s
}
