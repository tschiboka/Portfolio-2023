import { isString } from '../../common/utils/Predicate/Predicate.js'
import type { ImportSpecifierShape, ImportStatement } from './NoDuplicateImport.types.js'

const isDefault = (specifier: ImportSpecifierShape): boolean =>
    specifier.type === 'ImportDefaultSpecifier'

const isNamespace = (specifier: ImportSpecifierShape): boolean =>
    specifier.type === 'ImportNamespaceSpecifier'

/** The specifier's source text, or an empty string when the parser hands over none. */
export const sourceOf = (statement: ImportStatement): string =>
    isString(statement.source.value) ? statement.source.value : ''

/** The statement's kind. `importKind` is runtime-only on the node, so it is read behind a guard. */
export const kindOf = (statement: object): string =>
    'importKind' in statement && statement.importKind === 'type' ? 'type' : 'value'

/**
 * A type-only statement's binding shape. TS1363 forbids a type-only import that carries a
 * default and named bindings together, so those shapes cannot be merged and are counted apart.
 */
export const shapeOf = (statement: ImportStatement): string => {
    if (statement.specifiers.some(isNamespace)) return 'namespace'
    if (statement.specifiers.some(isDefault)) return 'default'

    return 'named'
}

/** The key a statement is counted under — one path and one kind, apart by shape when type-only. */
export const keyOf = (statement: ImportStatement): string =>
    kindOf(statement) === 'type'
        ? `type:${shapeOf(statement)}:${sourceOf(statement)}`
        : `value:${sourceOf(statement)}`
