import { AliasErrorMessage, ErrorMessage } from './TestNameVerb.constants.js'
import { getNameText, getTestName, isTestName } from './TestNameVerb.utils.js'
import type { Rule } from 'eslint'

type CallNode = Parameters<NonNullable<Rule.NodeListener['CallExpression']>>[0]

const Eslint = {
    TestNameVerb9: {
        meta: {
            type: 'problem',
            docs: { description: ErrorMessage },
        },
        create(context) {
            const check = (node: CallNode): void => {
                const name = getNameText(node.arguments[0])
                if (name === null) return

                const testName = getTestName(node.callee)
                if (testName === null) return

                if (testName !== 'it') {
                    context.report({ message: AliasErrorMessage, node })
                    return
                }

                if (isTestName(name)) return

                context.report({ message: ErrorMessage, node })
            }

            return { CallExpression: check }
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
