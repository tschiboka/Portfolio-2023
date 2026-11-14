import { Description, Message } from './NoInterface.constants.js'
import { isAmbient } from './NoInterface.utils.js'
import { isDefined, isNonEmpty } from '../../common/utils/Predicate/Predicate.js'
import type { Rule } from 'eslint'
import type { NodeLike, RangeLike } from './NoInterface.types.js'
import type { Optional } from '../../common/utils/Generics/Generics.types.js'

/** `type Name = Parents & {` — the body still opens, so an intersection keeps its member. */
const getHeadOf = (parents: string[]): string =>
    isNonEmpty(parents) ? ` = ${parents.join(' & ')} & ` : ' = '

const Eslint = {
    NoInterface9: {
        meta: {
            type: 'suggestion',
            schema: [],
            fixable: 'code',
            docs: { description: Description },
            messages: { interface: Message },
        },
        create(context) {
            const sourceCode = context.sourceCode

            return {
                TSInterfaceDeclaration(node: Rule.Node) {
                    const declaration = node as unknown as NodeLike
                    if (isAmbient(declaration)) return

                    context.report({
                        messageId: 'interface',
                        node,
                        fix: (fixer) => {
                            const keyword: Optional<RangeLike> = [
                                declaration.range?.[0] ?? 0,
                                declaration.id?.range?.[0] ?? 0,
                            ]
                            const head: Optional<RangeLike> = [
                                declaration.typeParameters?.range?.[1] ??
                                    declaration.id?.range?.[1] ??
                                    0,
                                declaration.body?.range?.[0] ?? 0,
                            ]

                            if (!isDefined(declaration.range) || !isDefined(declaration.body))
                                return null

                            const parents = (declaration.extends ?? []).map((parent) =>
                                sourceCode.getText(parent as unknown as Rule.Node),
                            )

                            return [
                                fixer.replaceTextRange(keyword, 'type '),
                                fixer.replaceTextRange(head, getHeadOf(parents)),
                            ]
                        },
                    })
                },
            }
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
