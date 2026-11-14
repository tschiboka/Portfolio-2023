import {
    ArrayMessage,
    Description,
    InstanceMessage,
    LengthMessage,
    NullishMessage,
    TruthyMessage,
    TypeofMessage,
} from './PredicateCase.constants.js'
import { shapeOf } from './PredicateCase.utils.js'
import { isNull } from '../../common/utils/Predicate/Predicate.js'
import type { Rule } from 'eslint'
import type { ExpressionLike } from './PredicateCase.types.js'

const MessageOf = {
    array: ArrayMessage,
    instance: InstanceMessage,
    length: LengthMessage,
    nullish: NullishMessage,
    truthy: TruthyMessage,
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
            const check = (node: Rule.Node): void => {
                const shape = shapeOf(node as unknown as ExpressionLike)
                if (isNull(shape)) return

                context.report({ message: MessageOf[shape], node })
            }

            return {
                BinaryExpression: check,
                CallExpression: check,
                NewExpression: check,
                UnaryExpression: check,
            }
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
