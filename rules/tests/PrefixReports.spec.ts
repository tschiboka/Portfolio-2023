import type { Rule } from 'eslint'
import { ruleTester } from '../config'
import { ViolationPrefix } from '../constants'
import { withViolationPrefix } from '../prefixReports'

/** Reports one message naming the file it ran against, so the context's passthrough shows. */
const rule: Rule.RuleModule = {
    meta: { type: 'problem' },
    create: (context) => ({
        'Program:exit'() {
            context.report({
                message: `Bare message from ${context.filename}.`,
                loc: { line: 1, column: 0 },
            })
        },
    }),
}

ruleTester.run('prefixReports', withViolationPrefix(rule), {
    valid: [],
    invalid: [
        {
            name: 'should prefix the message and leave the rest of the context alone',
            code: 'const blog = 1',
            filename: '/a/Feature/Blog.utils.ts',
            errors: [
                {
                    message: `${ViolationPrefix}Bare message from /a/Feature/Blog.utils.ts.`,
                },
            ],
        },
    ],
})
