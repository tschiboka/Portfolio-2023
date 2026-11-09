import {
    Description,
    LengthMessage,
    NullishMessage,
    TypeofMessage,
} from './PredicateCase.constants.js'
import { shapeOf } from './PredicateCase.utils.js'
import type { Rule } from 'eslint'

const MessageOf = {
    length: LengthMessage,
    nullish: NullishMessage,
    typeof: TypeofMessage,
}

const Eslint = {
    PredicateCase9: {
        meta: {
            type: 'suggestion',
            schema: [],
            docs: { description: Description },
        },
        create(context) {
            return {
                BinaryExpression(node) {
                    const shape = shapeOf(node)
                    if (shape === null) return

                    context.report({ message: MessageOf[shape], node })
                },
            }
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
