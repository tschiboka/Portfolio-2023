import type { Nullable } from '../../common/utils/Generics/Generics.types.js'

/** One specifier of an export statement, narrowed to what the style rank reads. */
export type ExportSpecifierShape = {
    type: string
    exported?: { name?: unknown; value?: unknown }
}

/** An export statement, narrowed to what the ranks read. */
export type ExportStatement = {
    type: string
    source?: Nullable<{ value?: unknown }>
    imported?: unknown
    exportKind?: unknown
    exported?: Nullable<{ name?: unknown; value?: unknown }>
    declaration?: Nullable<{ type: string }>
    specifiers?: ExportSpecifierShape[]
}

/** The two ranks a statement carries. `path` is `null` for a local declaration, which names none. */
export type ExportRanks = {
    style: number
    path: Nullable<number>
}
