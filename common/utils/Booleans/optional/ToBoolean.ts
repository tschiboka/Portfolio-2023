import type { Nullish } from '../../Generics'

/** Coerces a raw value to a boolean (`'true'` is true). */
// eslint-disable-next-line standards/role-export-name -- the module is named for the verb it exports
export const toBoolean = (raw: Nullish<string>): boolean => raw === 'true'
