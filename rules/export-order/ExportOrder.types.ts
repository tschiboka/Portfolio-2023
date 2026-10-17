/** One specifier of an export statement, narrowed to what the style rank reads. */
export type ExportSpecifierShape = {
    type: string
    exported?: { name?: unknown; value?: unknown }
}

/** An export statement, narrowed to what the ranks read. */
export type ExportStatement = {
    type: string
    source?: { value?: unknown } | null
    imported?: unknown
    exportKind?: unknown
    exported?: { name?: unknown; value?: unknown } | null
    declaration?: { type: string } | null
    specifiers?: ExportSpecifierShape[]
}

/** The two ranks a statement carries. `path` is `null` for a local declaration, which names none. */
export type ExportRanks = {
    style: number
    path: number | null
}
