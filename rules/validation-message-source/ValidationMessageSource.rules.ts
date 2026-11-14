import { Description, MessageErrorMessage } from './ValidationMessageSource.constants.js'
import {
    isMessageProperty,
    isStringLiteral,
    methodNameOf,
    messageArgumentOf,
} from './ValidationMessageSource.utils.js'
import { isNull } from '../../common/utils/Predicate/Predicate.js'
import type { Node, ObjectExpression } from 'estree'
import type { Rule } from 'eslint'
import type { Defined } from '../../common/utils/Generics/Generics.types.js'

type CallNode = Parameters<Defined<Rule.NodeListener['CallExpression']>>[0]

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
                if (isNull(method)) return

                const index = messageArgumentOf(method)
                if (isNull(index)) return

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
