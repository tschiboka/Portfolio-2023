import { ErrorMessage } from './ExportOrder.constants.js'
import { isOutOfOrder, ranksOf } from './ExportOrder.utils.js'
import type { ExportRanks, ExportStatement } from './ExportOrder.types.js'
import type { Rule } from 'eslint'
import type { Nullable } from '../../common/utils/Generics/Generics.types.js'

const Eslint = {
    ExportOrder9: {
        meta: {
            type: 'problem',
            docs: { description: ErrorMessage },
        },
        create(context) {
            let previous: Nullable<ExportRanks> = null
            // ESLint walks on past a report, so this flag is what holds the rule to one violation.
            let hasReported = false

            const visit = (node: ExportStatement & Rule.Node): void => {
                if (hasReported) return

                const current = ranksOf(node)
                if (previous !== null && isOutOfOrder(previous, current)) {
                    hasReported = true
                    context.report({ message: ErrorMessage, node })

                    return
                }

                previous = current
            }

            return {
                ExportAllDeclaration(node) {
                    visit(node)
                },
                ExportDefaultDeclaration(node) {
                    visit(node)
                },
                ExportNamedDeclaration(node) {
                    visit(node)
                },
            }
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
