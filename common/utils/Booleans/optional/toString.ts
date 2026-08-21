import type { Optional } from '../../Generics'

/** Coerces a boolean to its URL-string form, or undefined when false. */
export const toString = (value: boolean): Optional<string> => (value ? 'true' : undefined)
