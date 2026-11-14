import { BuiltMessage, Description, InlineMessage } from './RegexpRegistry.constants.js'
import { buildsPattern, isRegexLiteral } from './RegexpRegistry.utils.js'
import type { Rule } from 'eslint'
import type { NodeLike } from './RegexpRegistry.types.js'

const Eslint = {
    RegexpRegistry9: {
        meta: {
            type: 'problem',
            schema: [],
            docs: { description: Description },
            messages: {
                inline: InlineMessage,
                built: BuiltMessage,
            },
        },
        create(context) {
            return {
                Literal: (node: Rule.Node) => {
                    if (!isRegexLiteral(node as unknown as NodeLike)) return
                    context.report({ messageId: 'inline', node })
                },
                NewExpression: (node: Rule.Node) => {
                    if (!buildsPattern(node as unknown as NodeLike)) return
                    context.report({ messageId: 'built', node })
                },
                CallExpression: (node: Rule.Node) => {
                    if (!buildsPattern(node as unknown as NodeLike)) return
                    context.report({ messageId: 'built', node })
                },
            }
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
