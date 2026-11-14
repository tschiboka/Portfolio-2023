import {
    BindingMessage,
    Description,
    ReferenceMessage,
    Replacement,
} from './NoReactNamespace.constants.js'
import {
    getBoundNames,
    getLeafName,
    isBoundReference,
    isReactModule,
} from './NoReactNamespace.utils.js'
import { isEmpty } from '../../common/utils/Predicate/Predicate.js'
import type { Rule } from 'eslint'
import type { MemberChainLike, NameChainLike, NodeLike } from './NoReactNamespace.types.js'

const Eslint = {
    NoReactNamespace9: {
        meta: {
            type: 'problem',
            docs: { description: Description },
        },
        create(context) {
            const boundNames = new Set<string>()

            const getReferenceMessage = (leaf?: NodeLike): string =>
                ReferenceMessage.replace(Replacement, getLeafName(leaf))

            return {
                ImportDeclaration(node: Rule.Node) {
                    if (!isReactModule(node)) return

                    const names = getBoundNames(node)
                    if (isEmpty(names)) return

                    names.forEach((name) => boundNames.add(name))
                    context.report({ node, message: BindingMessage })
                },
                MemberExpression(node: Rule.Node) {
                    const chain = node as unknown as MemberChainLike
                    if (!isBoundReference(chain.object, boundNames)) return

                    context.report({ node, message: getReferenceMessage(chain.property) })
                },
                JSXMemberExpression(node: Rule.Node) {
                    const chain = node as unknown as MemberChainLike
                    if (!isBoundReference(chain.object, boundNames)) return

                    context.report({ node, message: getReferenceMessage(chain.property) })
                },
                TSQualifiedName(node: Rule.Node) {
                    const chain = node as unknown as NameChainLike
                    if (!isBoundReference(chain.left, boundNames)) return

                    context.report({ node, message: getReferenceMessage(chain.right) })
                },
            }
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
