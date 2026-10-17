/** An import statement, narrowed to what the ranks read. */
export type ImportStatement = {
    source: { value?: unknown }
    specifiers: ImportSpecifierShape[]
    importKind?: unknown
}

/** One specifier of an import statement, narrowed to its shape. */
export type ImportSpecifierShape = {
    type: string
}

/** The two ranks a statement carries, compared style first and path second. */
export type ImportRanks = {
    style: number
    path: number
}
