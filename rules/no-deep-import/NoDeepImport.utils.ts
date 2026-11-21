import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { isUndefined } from '../../common/utils/Predicate/Predicate.js'
import type { Optional } from '../../common/utils/Generics/Generics.types.js'

/** The files a folder uses to declare itself a barrel. */
const BarrelFiles = ['index.ts', 'index.tsx', 'index.js']

/** A segment that stays in the current folder rather than naming a folder below it. */
const isAscent = (segment: string): boolean => segment === '.' || segment === '..'

/** A folder the rule leaves alone: a feature's tests are reached by file, never by a barrel. */
const isExempt = (segments: string[]): boolean => segments.includes('tests')

const isRelative = (source: string): boolean => source.startsWith('./') || source.startsWith('../')

/** Whether a folder declares a barrel, asked of the disk rather than guessed from its name. */
const hasBarrel = (folder: string): boolean =>
    BarrelFiles.some((name) => existsSync(resolve(folder, name)))

/**
 * The nearest folder barrel a relative import should have named instead, or `undefined` when the
 * import already ends at one — or at a file whose folders declare none.
 *
 * @example
 * getBarrelSpecifier('./components/UpdateRecords', 'src/app/Record/Probe.tsx')
 */
export const getBarrelSpecifier = (source: string, filename: string): Optional<string> => {
    if (!isRelative(source)) return undefined
    const parts = source.split('/')
    if (isExempt(parts)) return undefined

    const ascentCount = parts.findIndex((part) => !isAscent(part))
    if (ascentCount === -1) return undefined

    const ascent = parts.slice(0, ascentCount)
    const names = parts.slice(ascentCount)
    const folderAt = (depth: number): string =>
        resolve(dirname(filename), ...ascent, ...names.slice(0, depth))

    if (hasBarrel(folderAt(names.length))) return undefined

    const depth = names
        .slice(1)
        .map((_, index) => names.length - index - 1)
        .find((candidate) => hasBarrel(folderAt(candidate)))

    return isUndefined(depth) ? undefined : [...ascent, ...names.slice(0, depth)].join('/')
}
