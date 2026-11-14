import { AliasShapes, Description } from './AliasShape.constants.js'
import type { Rule } from 'eslint'
import type { TypeLike } from './AliasShape.types.js'

/** ESLint's own node types are built from `@types/estree`, which omits every TS type node. */
type UnionNode = Rule.Node & TypeLike

const Eslint = {
    AliasShape9: {
        meta: {
            type: 'suggestion',
            schema: [],
            docs: { description: Description },
        },
        create(context) {
            /** The source a member was written from, so a shaped row compares what the author typed. */
            const textOf = (node: TypeLike): string =>
                context.sourceCode.getText(node as unknown as Rule.Node)

            const check = (node: Rule.Node): void => {
                const shape = AliasShapes.find(({ matches }) => matches(node as UnionNode, textOf))
                if (!shape) return

                context.report({ message: shape.message, node })
            }

            return {
                TSUnionType: check,
                TSTypeReference: check,
                TSFunctionType: check,
                TSIntersectionType: check,
                TSIndexedAccessType: check,
                TSTupleType: check,
                TSTypeOperator: check,
            }
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
