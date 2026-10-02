import type { Rule } from 'eslint'
import { basename } from 'node:path'
import { ExactlyOneExportConstants } from './ExactlyOneExport.constants.js'

export const ErrorMessage = 'A role file must export exactly one thing.'

export const messageFor = (role: string, count: number) =>
    [
        `A file with the role ${role} must export exactly one thing.`,
        `Got ${count}, expected 1.`,
    ].join('\n')

const Eslint = {
    ExactlyOneExport9: {
        meta: {
            type: 'layout',
            docs: { description: ErrorMessage },
        },
        create(context) {
            const segments = basename(context.filename).split('.')
            const role = segments[segments.length - 2]
            if (!role || !ExactlyOneExportConstants.SingleExportRoles.includes(role)) return {}

            let count = 0

            return {
                'Program:exit'() {
                    if (count === 1) return

                    context.report({
                        message: messageFor(role, count),
                        loc: { line: 1, column: 0 },
                    })
                },
                ExportAllDeclaration(node) {
                    if (node.exported) count += 1
                },
                ExportDefaultDeclaration() {
                    count += 1
                },
                ExportNamedDeclaration(node) {
                    const { declaration, specifiers } = node

                    if (specifiers.length > 0) count += specifiers.length
                    else if (!declaration) return
                    else if (declaration.type === 'VariableDeclaration')
                        count += declaration.declarations.length
                    else count += 1
                },
            }
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
