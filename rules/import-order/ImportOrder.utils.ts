import { AssetExtensions, ImportStyleRanks } from './ImportOrder.constants.js'
import { PathRanks, pathRankOf as basePathRankOf } from '../paths.js'
import { isEmpty, isString } from '../../common/utils/Predicate/Predicate.js'
import type { ImportRanks, ImportSpecifierShape, ImportStatement } from './ImportOrder.types.js'

const isNamespace = (specifier: ImportSpecifierShape): boolean =>
    specifier.type === 'ImportNamespaceSpecifier'

const isDefault = (specifier: ImportSpecifierShape): boolean =>
    specifier.type === 'ImportDefaultSpecifier'

/** The shape a statement carries, ranked — a side-effect import names nothing and ranks last. */
export const styleRankOf = (statement: ImportStatement): number => {
    const specifiers = statement.specifiers
    if (isEmpty(specifiers)) return ImportStyleRanks.SideEffect
    if (statement.importKind === 'type') return ImportStyleRanks.Type
    if (specifiers.length === 1 && specifiers.some(isNamespace)) return ImportStyleRanks.Namespace
    if (!specifiers.some(isDefault)) return ImportStyleRanks.Named

    return specifiers.length === 1 ? ImportStyleRanks.Default : ImportStyleRanks.Mixed
}

/** The specifier's source text, or an empty string when the parser hands over none. */
export const sourceOf = (statement: ImportStatement): string =>
    isString(statement.source.value) ? statement.source.value : ''

const hasAssetSuffix = (source: string): boolean =>
    AssetExtensions.some((extension) => source.endsWith(extension))

/** The path a specifier takes, ranked — its asset suffix first, then the shared path ranks. */
export const pathRankOf = (source: string): number =>
    hasAssetSuffix(source) ? PathRanks.Assets : basePathRankOf(source)

/** The two ranks a statement carries — style first, path second. */
export const ranksOf = (statement: ImportStatement): ImportRanks => ({
    style: styleRankOf(statement),
    path: pathRankOf(sourceOf(statement)),
})

/** Whether a statement sits above the one before it. Two side-effect imports keep their own order. */
export const isOutOfOrder = (previous: ImportRanks, current: ImportRanks): boolean => {
    if (previous.style !== current.style) return current.style < previous.style
    if (current.style === ImportStyleRanks.SideEffect) return false

    return current.path < previous.path
}
