import { ErrorMessage } from './NoDuplicateExport.constants.js'
import { keyOf } from './NoDuplicateExport.utils.js'
import type { Rule } from 'eslint'
import type { Nullable } from '../../common/utils/Generics/Generics.types.js'

const Eslint = {
    NoDuplicateExport9: {
        meta: {
            type: 'problem',
            docs: { description: ErrorMessage },
        },
        create(context) {
            const seen = new Set<string>()

            const check = (key: Nullable<string>, node: Rule.Node): void => {
                if (key === null) return

                if (seen.has(key)) {
                    context.report({ message: ErrorMessage, node })
                    return
                }

                seen.add(key)
            }

            return {
                ExportAllDeclaration(node) {
                    check(keyOf(node), node)
                },
                ExportNamedDeclaration(node) {
                    check(keyOf(node), node)
                },
            }
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
