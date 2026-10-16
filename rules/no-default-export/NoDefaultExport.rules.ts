import type { Rule } from 'eslint'
import { isString } from '../../common/utils/Predicate/Predicate.js'
import { DefaultExportName, ErrorMessage } from './NoDefaultExport.constants.js'

const nameOf = (exported: { name?: unknown; value?: unknown }): string =>
    isString(exported.name) ? exported.name : isString(exported.value) ? exported.value : ''

const Eslint = {
    NoDefaultExport9: {
        meta: {
            type: 'problem',
            docs: { description: ErrorMessage },
        },
        create(context) {
            const report = (node: Rule.Node) => context.report({ message: ErrorMessage, node })

            return {
                ExportDefaultDeclaration: report,
                ExportNamedDeclaration(node) {
                    const namesDefault = node.specifiers.some(
                        ({ exported }) => nameOf(exported) === DefaultExportName,
                    )
                    if (namesDefault) report(node)
                },
            }
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
