import type { TSESTree } from '@typescript-eslint/types'
import type { Rule } from 'eslint'
import { getIsTagThrowError, getTagNameString } from './NoRawSemanticJsx.utils.js'

export const ErrorMessage =
    'A raw semantic element must not be used where a common/ux component exists.'

const Eslint = {
    NoRawSemanticJsx9: {
        meta: {
            type: 'layout',
            docs: { description: ErrorMessage },
        },
        create(context) {
            return {
                JSXElement(node: TSESTree.JSXElement) {
                    const tagNameString = getTagNameString({ context, node })
                    const lintResult = getIsTagThrowError(tagNameString)
                    if (!lintResult) return

                    const message = [ErrorMessage, lintResult.message].join(' ')
                    context.report({ node, message })
                },
            }
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
