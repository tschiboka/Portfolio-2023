import { Description, ErrorMessage } from './NoBracedArrowBody.constants.js'
import {
    dropsNoComment,
    hasVoidReturn,
    unwrappableStatementOf,
} from './NoBracedArrowBody.utils.js'
import type { Rule } from 'eslint'

const Eslint = {
    NoBracedArrowBody9: {
        meta: {
            type: 'layout',
            schema: [],
            docs: { description: Description },
            fixable: 'code',
        },
        create(context) {
            const source = context.sourceCode

            return {
                ArrowFunctionExpression(node) {
                    const { body } = node
                    if (body.type !== 'BlockStatement') return

                    const statement = unwrappableStatementOf(body)
                    if (statement === null) return

                    const fixable = !hasVoidReturn(node) && dropsNoComment(source, statement)

                    context.report({
                        message: ErrorMessage,
                        node: body,
                        fix: fixable
                            ? (fixer) => fixer.replaceText(body, source.getText(statement))
                            : null,
                    })
                },
            }
        },
    } satisfies Rule.RuleModule,
}


export const Rules = { Eslint }
