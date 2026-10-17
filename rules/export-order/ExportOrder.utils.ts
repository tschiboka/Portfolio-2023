import { ExportStyleRanks } from './ExportOrder.constants.js'
import { pathRankOf } from '../paths.js'
import { isDefined, isString } from '../../common/utils/Predicate/Predicate.js'
import type { ExportRanks, ExportStatement } from './ExportOrder.types.js'
import type { Nullable } from '../../common/utils/Generics/Generics.types.js'

const isNamespace = (statement: ExportStatement): boolean =>
    (statement.specifiers ?? []).some((specifier) => specifier.type === 'ExportNamespaceSpecifier')

const exportsDefault = (statement: ExportStatement): boolean =>
    (statement.specifiers ?? []).some(
        (specifier) => isString(specifier.exported?.name) && specifier.exported.name === 'default',
    )

const isLocalType = (statement: ExportStatement): boolean =>
    statement.declaration?.type === 'TSInterfaceDeclaration' ||
    statement.declaration?.type === 'TSTypeAliasDeclaration'

/** The statement's kind. `exportKind` is runtime-only on the node, so it is read behind a guard. */
export const kindOf = (statement: object): string =>
    'exportKind' in statement && statement.exportKind === 'type' ? 'type' : 'value'

/** The specifier's source text, or `null` when the statement exports something local. */
export const pathOf = (statement: ExportStatement): Nullable<string> =>
    isString(statement.source?.value) ? statement.source.value : null

/**
 * The shape a statement carries, ranked. Kind comes first — a type-only export ranks last whatever
 * its shape — then the re-export shapes, then the declarations, which name no module.
 */
export const styleRankOf = (statement: ExportStatement): number => {
    if (kindOf(statement) === 'type') return ExportStyleRanks.TypeOnly
    if (statement.type === 'ExportDefaultDeclaration') return ExportStyleRanks.DefaultDeclaration
    if (isLocalType(statement)) return ExportStyleRanks.TypeOnly
    if (pathOf(statement) === null) return ExportStyleRanks.NamedDeclaration
    if (statement.type === 'ExportAllDeclaration')
        return isDefined(statement.exported)
            ? ExportStyleRanks.NamespaceReExport
            : ExportStyleRanks.StarReExport
    if (exportsDefault(statement)) return ExportStyleRanks.DefaultReExport
    if (isNamespace(statement)) return ExportStyleRanks.NamespaceReExport

    return ExportStyleRanks.NamedReExport
}

/** The two ranks a statement carries — style first, path second, `null` when it names no module. */
export const ranksOf = (statement: ExportStatement): ExportRanks => {
    const path = pathOf(statement)

    return { style: styleRankOf(statement), path: path === null ? null : pathRankOf(path) }
}

/** Whether a statement sits above the one before it. Two local declarations carry no path. */
export const isOutOfOrder = (previous: ExportRanks, current: ExportRanks): boolean => {
    if (previous.style !== current.style) return current.style < previous.style
    if (previous.path === null || current.path === null) return false

    return current.path < previous.path
}
