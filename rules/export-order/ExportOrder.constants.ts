/** The seven statement shapes, in the order the standard presents them. */
export const ExportStyleRanks = {
    NamespaceReExport: 1,
    StarReExport: 2,
    DefaultDeclaration: 3,
    DefaultReExport: 4,
    NamedReExport: 5,
    NamedDeclaration: 6,
    TypeOnly: 7,
}

export const ErrorMessage = "A file's exports must be ordered by style, then by path."
