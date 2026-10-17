import { ErrorMessage } from './NoDuplicateImport.constants.js'
import { keyOf } from './NoDuplicateImport.utils.js'
import type { Rule } from 'eslint'

const Eslint = {
    NoDuplicateImport9: {
        meta: {
            type: 'problem',
            docs: { description: ErrorMessage },
        },
        create(context) {
            const seen = new Set<string>()

            return {
                ImportDeclaration(node) {
                    const key = keyOf(node)
                    if (seen.has(key)) {
                        context.report({ message: ErrorMessage, node })

                        return
                    }

                    seen.add(key)
                },
            }
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
