/** The `exported` half of an export specifier: an identifier or a literal. */
export type ExportedName = {
    type: string
    name?: string
    value?: unknown
}

/** What a file's export must be called, and the role the file names. */
export type RoleExpectation = {
    role: string
    expected: string
}

/** A default export's declaration, narrowed to the name it carries. */
export type DefaultExportDeclaration = {
    type: string
    name?: unknown
    id?: unknown
}
