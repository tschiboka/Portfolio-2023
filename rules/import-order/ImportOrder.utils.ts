import { isEmpty, isString } from '../../common/utils/Predicate/Predicate.js'
import {
    AliasMarker,
    AliasPrefixes,
    AssetExtensions,
    ImportStyleRanks,
    PathRanks,
} from './ImportOrder.constants.js'
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

/** How many `../` steps a parent-relative specifier opens with. */
const depthOf = (source: string): number => {
    const segments = source.split('/')
    const first = segments.findIndex((segment) => segment !== '..')

    return first === -1 ? segments.length : first
}

const isAlias = (source: string): boolean =>
    AliasPrefixes.some((alias) => source === alias || source.startsWith(`${alias}/`))

/** The directory itself, which carries no `./` when written bare. */
const isSameDirectory = (source: string): boolean => source === '.' || source.startsWith('./')

/** A directory above, which carries no `../` when written bare. */
const isParentRelative = (source: string): boolean => source === '..' || source.startsWith('../')

/** The path a specifier takes, ranked — its suffix first, then its shape, then its alias. */
export const pathRankOf = (source: string): number => {
    if (hasAssetSuffix(source)) return PathRanks.Assets
    if (isSameDirectory(source)) return PathRanks.SameDirectory
    if (isParentRelative(source)) return PathRanks.ParentRelative + depthOf(source) - 1
    if (isAlias(source)) return PathRanks.Aliased
    if (source.startsWith(AliasMarker)) return PathRanks.ExternalScoped

    return PathRanks.External
}

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
