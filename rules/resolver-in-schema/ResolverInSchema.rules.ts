import {
    Description,
    ForeignResolverMessage,
    MissingResolverMessage,
} from './ResolverInSchema.constants.js'
import { isResolverCall, isSchemaCall, isSchemaFile } from './ResolverInSchema.utils.js'
import type { Node } from 'estree'
import type { Rule } from 'eslint'
import type { Defined } from '../../common/utils/Generics/Generics.types.js'

type CallNode = Parameters<Defined<Rule.NodeListener['CallExpression']>>[0]
type ProgramNode = Parameters<Defined<Rule.NodeListener['Program']>>[0]

const Eslint = {
    ResolverInSchema9: {
        meta: {
            type: 'suggestion',
            docs: { description: Description },
        },
        create(context) {
            const report = (node: Node, message: string): void => context.report({ message, node })

            const schemaFile = isSchemaFile(context.filename)

            let declaredSchema = false
            let builtResolver = false

            const checkCall = (node: CallNode): void => {
                if (isSchemaCall(node.callee)) declaredSchema = true
                if (!isResolverCall(node.callee)) return

                builtResolver = true
                if (schemaFile) return

                report(node, ForeignResolverMessage)
            }

            const checkProgram = (node: ProgramNode): void => {
                if (!schemaFile) return
                if (!declaredSchema) return
                if (builtResolver) return

                report(node, MissingResolverMessage)
            }

            return {
                CallExpression: checkCall,
                'Program:exit': checkProgram,
            }
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
