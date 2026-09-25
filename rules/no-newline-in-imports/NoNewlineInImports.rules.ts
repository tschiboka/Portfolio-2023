import type { Rule } from 'eslint'

export const ErrorMessage = 'An import block must not contain an empty row.'

const Eslint = {
    NoNewlineInImports9: {
        meta: {
            type: 'layout',
            docs: { description: ErrorMessage },
        },
        create(context) {
            const ranges: [number, number][] = []

            return {
                'Program:exit'() {
                    const first = ranges[0]
                    const last = ranges[ranges.length - 1]
                    if (!first || !last) return

                    const text = context.sourceCode.getText().slice(first[0], last[1])
                    const rows = text.split(/\r?\n/)
                    const hasEmptyRow = rows.slice(1, -1).some((row) => row.trim() === '')
                    if (!hasEmptyRow) return

                    context.report({ loc: { line: 1, column: 0 }, message: ErrorMessage })
                },
                ImportDeclaration(node: Rule.Node) {
                    if (node.range) ranges.push(node.range)
                },
            }
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
