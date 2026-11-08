import {
    Description,
    MalformedMessage,
    MissingMessage,
    UnresolvedMessage,
} from './TodoTicketRef.constants.js'
import { isTodo, isWellFormed, refOf, resolves } from './TodoTicketRef.utils.js'
import type { Rule } from 'eslint'

type CommentLike = {
    value: string
    loc?: { start: { line: number; column: number }; end: { line: number; column: number } } | null
}

const Eslint = {
    TodoTicketRef9: {
        meta: {
            type: 'suggestion',
            schema: [],
            docs: { description: Description },
        },
        create(context) {
            const report = (comment: CommentLike, message: string): void => {
                if (!comment.loc) return

                context.report({ loc: comment.loc, message })
            }

            return {
                'Program:exit': () =>
                    context.sourceCode.getAllComments().forEach((comment) => {
                        if (!isTodo(comment.value)) return

                        const ref = refOf(comment.value)
                        if (ref === null) return report(comment, MissingMessage)
                        if (!isWellFormed(ref)) return report(comment, MalformedMessage)
                        if (!resolves(ref)) report(comment, UnresolvedMessage)
                    }),
            }
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
