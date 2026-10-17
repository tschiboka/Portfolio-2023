import type { Rule } from 'eslint'
import type { Nullable } from '../../common/utils/Generics/Generics.types.js'
import { ErrorMessage } from './ImportOrder.constants.js'
import type { ImportRanks, ImportStatement } from './ImportOrder.types.js'
import { isOutOfOrder, ranksOf } from './ImportOrder.utils.js'

/** The node the parser hands over, read from the listener's own signature rather than re-declared. */
type ImportNode = Parameters<NonNullable<Rule.NodeListener['ImportDeclaration']>>[0]

/** `importKind` is the one field the TypeScript parser adds at runtime and the node types omit. */
const importKindOf = (node: object): unknown => ('importKind' in node ? node.importKind : null)

const shapeOf = (node: ImportNode): ImportStatement => ({
    source: node.source,
    specifiers: node.specifiers,
    importKind: importKindOf(node),
})

const Eslint = {
    ImportOrder9: {
        meta: {
            type: 'problem',
            docs: { description: ErrorMessage },
        },
        create(context) {
            let previous: Nullable<ImportRanks> = null
            // ESLint walks on past a report, so this flag is what holds the rule to one violation.
            let hasReported = false

            return {
                ImportDeclaration(node) {
                    if (hasReported) return

                    const current = ranksOf(shapeOf(node))
                    if (previous !== null && isOutOfOrder(previous, current)) {
                        hasReported = true
                        context.report({ message: ErrorMessage, node })

                        return
                    }

                    previous = current
                },
            }
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
