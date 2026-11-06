import { getIsTagThrowError, getTagNameString, isJsxElement } from './NoRawSemanticJsx.utils.js'
import type { Rule } from 'eslint'

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
                JSXElement(node: Rule.Node) {
                    if (!isJsxElement(node)) return

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
