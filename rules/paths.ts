/**
 * The path ranks, read by both ordering rules. A bare package comes before a scoped one, which
 * comes before ours. Parent-relative is a base rather than a fixed rank: each further `../` adds
 * one, so the rank a specifier carries is `ParentRelative + depth - 1`. Assets sit beyond every
 * depth — an export never carries one, so that rank simply goes unused there.
 */
import { AliasMarker, AliasPrefixes } from './aliases.js'

export const PathRanks = {
    External: 1,
    ExternalScoped: 2,
    Aliased: 3,
    SameDirectory: 4,
    ParentRelative: 5,
    Assets: 100,
}

/** How many `../` steps a parent-relative specifier opens with. */
const depthOf = (source: string): number => {
    const segments = source.split('/')
    const first = segments.findIndex((segment) => segment !== '..')

    return first === -1 ? segments.length : first
}

const isAlias = (source: string): boolean =>
    AliasPrefixes.some((alias) => source === alias || source.startsWith(`${alias}/`))

/**
 * The rank a specifier's path carries. The import rule asks this first for an asset suffix and
 * returns `PathRanks.Assets` itself, so the rank below never decides that case.
 */
export const pathRankOf = (source: string): number => {
    if (source === '.' || source.startsWith('./')) return PathRanks.SameDirectory
    if (source === '..' || source.startsWith('../'))
        return PathRanks.ParentRelative + depthOf(source) - 1
    if (isAlias(source)) return PathRanks.Aliased
    if (source.startsWith(AliasMarker)) return PathRanks.ExternalScoped

    return PathRanks.External
}
