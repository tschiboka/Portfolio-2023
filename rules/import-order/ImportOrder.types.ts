import type { Rule } from 'eslint'
import type { Defined } from '../../common/utils/Generics/Generics.types.js'

/** The node the parser hands over, read from the listener's own signature rather than re-declared. */
export type ImportNode = Parameters<Defined<Rule.NodeListener['ImportDeclaration']>>[0]

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
