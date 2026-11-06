import { Description, MessageErrorMessage } from './ValidationMessageSource.constants.js'
import {
    isMessageProperty,
    isStringLiteral,
    methodNameOf,
    messageArgumentOf,
} from './ValidationMessageSource.utils.js'
import type { Node, ObjectExpression } from 'estree'
import type { Rule } from 'eslint'

type CallNode = Parameters<NonNullable<Rule.NodeListener['CallExpression']>>[0]

const Eslint = {
    ValidationMessageSource9: {
        meta: {
            type: 'suggestion',
            docs: { description: Description },
        },
        create(context) {
            const report = (node: Node): void =>
                context.report({ message: MessageErrorMessage, node })

            const checkMessageProperties = (object: ObjectExpression): void =>
                object.properties.forEach((property) => {
                    if (property.type !== 'Property') return
                    if (!isMessageProperty(property)) return
                    if (!isStringLiteral(property.value)) return

                    report(property.value)
                })

            const checkCall = (node: CallNode): void => {
                const method = methodNameOf(node.callee)
                if (method === null) return

                const index = messageArgumentOf(method)
                if (index === null) return

                const argument = node.arguments[index]
                if (isStringLiteral(argument)) report(argument)

                node.arguments.forEach((candidate) => {
                    if (candidate.type !== 'ObjectExpression') return

                    checkMessageProperties(candidate)
                })
            }

            return { CallExpression: checkCall }
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
