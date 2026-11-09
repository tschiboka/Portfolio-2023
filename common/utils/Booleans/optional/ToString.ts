import type { Optional } from '../../Generics'

/** Coerces a boolean to its URL-string form, or undefined when false. */
// eslint-disable-next-line standards/role-export-name -- the module is named for the verb it exports
export const toString = (value: boolean): Optional<string> => (value ? 'true' : undefined)
