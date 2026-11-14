import { NamedFile } from './RoleFilePascal.constants.js'
import { isNull } from '../../common/utils/Predicate/Predicate.js'
import type { Nullable } from '../../common/utils/Generics/Generics.types.js'

/**
 * Splits a filename into the stem and the role that follows it, or `null` where it carries neither.
 *
 * @example
 * splitName('Contact.schema.ts') // { stem: 'Contact', role: 'schema' }
 * splitName('Contact.tsx') // null
 */
export const splitName = (name: string): Nullable<{ stem: string; role: string }> => {
    const match = NamedFile.exec(name)
    if (isNull(match)) return null

    return { stem: match[1] ?? '', role: match[2] ?? '' }
}

/**
 * Answers whether a stem opens with a capital.
 *
 * @example
 * isPascalStem('Contact') // true
 * isPascalStem('contact') // false
 */
export const isPascalStem = (stem: string): boolean => /^[A-Z]/.test(stem)
