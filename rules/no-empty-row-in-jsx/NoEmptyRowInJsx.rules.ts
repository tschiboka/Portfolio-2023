import type { Rule } from 'eslint'

export const ErrorMessage = 'A jsx element must not contain an empty row.'

const Eslint = {
    Min9: {
        meta: {
            type: 'layout',
            docs: { description: ErrorMessage },
        },
        create(context) {
            return {
                'JSXElement, JSXFragment'(node: Rule.Node) {
                    const rows = context.sourceCode.getText(node).split(/\r?\n/)
                    if (!rows.some((row) => row.trim() === '')) return
                    context.report({ node, message: ErrorMessage })
                },
            }
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
