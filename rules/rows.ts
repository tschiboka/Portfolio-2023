import type { Rule, SourceCode } from 'eslint'

/**
 * Answers whether two sibling nodes are separated by at least one empty row.
 *
 * Comments between the nodes are anchors rather than content, so a comment sitting on
 * its own line is not mistaken for padding, and an empty row inside a comment block is
 * not mistaken for one either.
 *
 * @example
 * Rows.hasBlankRow(sourceCode, properties[0], properties[1])
 */
const hasBlankRow = (sourceCode: SourceCode, previous: Rule.Node, next: Rule.Node): boolean => {
    const anchors = [...sourceCode.getCommentsBefore(next), next]

    return anchors.some((anchor, index) => {
        const before = index === 0 ? previous : anchors[index - 1]
        const start = anchor.loc?.start.line ?? 0
        const end = before.loc?.end.line ?? 0
        return start - end >= 2
    })
}

export const Rows = { hasBlankRow }
