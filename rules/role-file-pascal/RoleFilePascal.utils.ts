import { NamedFile } from './RoleFilePascal.constants.js'

/**
 * Splits a filename into the stem and the role that follows it, or `null` where it carries neither.
 *
 * @example
 * splitName('Contact.schema.ts') // { stem: 'Contact', role: 'schema' }
 * splitName('Contact.tsx') // null
 */
export const splitName = (name: string): { stem: string; role: string } | null => {
    const match = NamedFile.exec(name)
    if (match === null) return null

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
