/** An import specifier, narrowed to its shape. */
export type ImportSpecifierShape = {
    type: string
}

/** An import statement, narrowed to the things the counting reads. */
export type ImportStatement = {
    source: { value?: unknown }
    specifiers: ImportSpecifierShape[]
    importKind?: unknown
}
