import { Description, ErrorMessage } from './NoLoopStatement.constants.js'
import type { Node } from 'estree'
import type { Rule } from 'eslint'

const Eslint = {
    NoLoopStatement9: {
        meta: {
            type: 'suggestion',
            schema: [],
            docs: { description: Description },
        },
        create(context) {
            const report = (node: Node): void => context.report({ message: ErrorMessage, node })

            return {
                DoWhileStatement: report,
                ForInStatement: report,
                ForOfStatement: report,
                ForStatement: report,
                WhileStatement: report,
            }
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
