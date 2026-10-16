import type { Nullable } from '../../common/utils/Generics/Generics.types.js'
import {
    hasProperty,
    isDefined,
    isEmpty,
    isNonEmpty,
    isString,
} from '../../common/utils/Predicate/Predicate.js'
import { RoleExportTokenMap } from '../constants.js'
import type {
    DefaultExportDeclaration,
    ExportedName,
    RoleExpectation,
} from './RoleExportName.types.js'

/** The message a report carries, naming the file, its role, what it must export and what it does. */
export const messageFor = (fileName: string, role: string, expected: string, found: string[]) =>
    [
        `The file ${fileName} with the role ${role} must export ${expected}.`,
        isNonEmpty(found) ? `Got ${found.join(', ')}.` : 'Got no exports.',
    ].join('\n')

/** The name a default export carries, or `null` when it is anonymous. */
export const defaultNameOf = (declaration: DefaultExportDeclaration): Nullable<string> => {
    if (declaration.type === 'Identifier')
        return isString(declaration.name) ? declaration.name : null
    if (!hasProperty(declaration.id, 'name')) return null

    return isString(declaration.id.name) ? declaration.id.name : null
}

/** A specifier's exported name — an identifier for `export { x }`, a literal for `export { x as 'y' }`. */
export const exportedName = (exported: ExportedName): Nullable<string> => {
    if (exported.type === 'Identifier') return exported.name ?? null

    return isString(exported.value) ? exported.value : null
}

/** A feature file is PascalCase, so a bare name that does not start uppercase names nothing. */
export const isFeatureName = (stem: string): boolean => /^[A-Z]/.test(stem)

/** The tokens a role chain contributes, or `null` when a role is unmapped. */
const tokensFor = (roles: string[]): Nullable<string> => {
    const tokens = roles.map((role) => RoleExportTokenMap[role])
    if (tokens.some((token) => !isDefined(token))) return null

    return tokens.join('')
}

/**
 * What the file's export must be called, or `null` when the file names nothing.
 * A feature file is PascalCase and named after itself; a chain ending in `spec` names
 * nothing, and neither does one carrying a role the map does not carry.
 *
 * @example
 * expectationFor('Blog.utils.ts')              // { role: 'utils', expected: 'BlogUtils' }
 * expectationFor('Blog.tsx')                   // { role: 'Blog', expected: 'Blog' }
 * expectationFor('Blog.queries.spec.utils.ts') // BlogQueriesTestUtils
 * expectationFor('main.tsx')                   // null
 * expectationFor('router.routes.tsx')          // null
 */
export const expectationFor = (fileName: string): Nullable<RoleExpectation> => {
    const segments = fileName.split('.')
    const stem = segments[0]
    if (!isFeatureName(stem)) return null

    const roles = segments.slice(1, -1)
    if (isEmpty(roles)) return { role: stem, expected: stem }

    const lastRole = roles[roles.length - 1]
    if (lastRole === 'spec') return null

    const tokens = tokensFor(roles)
    if (!isDefined(tokens)) return null

    return { role: roles.join('.'), expected: `${stem}${tokens}` }
}
