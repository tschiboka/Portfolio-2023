import type { Nullish } from '../../Generics'

/** Coerces a raw value to a boolean (`'true'` is true). */
export const toBoolean = (raw: Nullish<string>): boolean => raw === 'true'
