import type { Nullable } from '../../common/utils/Generics/Generics.types.js'
import { isString } from '../../common/utils/Predicate/Predicate.js'
import type { ReExportStatement } from './NoDuplicateExport.types.js'

/** The specifier's source text, or `null` when the statement re-exports nothing. */
export const pathOf = (statement: ReExportStatement): Nullable<string> =>
    isString(statement.source?.value) ? statement.source.value : null

/** The statement's kind. `exportKind` is runtime-only on the node, so it is read behind a guard. */
export const kindOf = (statement: object): string =>
    'exportKind' in statement && statement.exportKind === 'type' ? 'type' : 'value'

/**
 * A re-export's shape. A star cannot fold into a named list, so the two are counted apart —
 * where an import's value statements always merge into one.
 */
export const shapeOf = (statement: ReExportStatement): string =>
    statement.type === 'ExportAllDeclaration' ? 'star' : 'named'

/** The key a statement is counted under, or `null` when it re-exports nothing. */
export const keyOf = (statement: ReExportStatement): Nullable<string> => {
    const path = pathOf(statement)
    if (path === null) return null

    return `${kindOf(statement)}:${shapeOf(statement)}:${path}`
}
