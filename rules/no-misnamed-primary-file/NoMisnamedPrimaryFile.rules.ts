import type { Rule } from 'eslint'
import { basename, dirname } from 'node:path'
import { NoMisnamedPrimaryFileConstants } from './NoMisnamedPrimaryFile.constants.js'

export const ErrorMessage = 'The primary file must be named after its folder.'

const Eslint = {
    NoMisnamedPrimaryFile9: {
        meta: {
            type: 'layout',
            docs: { description: ErrorMessage },
        },
        create(context) {
            const parentFolder = basename(dirname(context.filename))
            const allowedFolders = NoMisnamedPrimaryFileConstants.AllowedParentFolders
            if (allowedFolders.includes(parentFolder)) return {}

            const file = basename(context.filename)
            const [stem, ...rest] = file.split('.')
            if (rest.length > 1) return {}

            if (stem !== parentFolder) {
                context.report({
                    message: [
                        ErrorMessage,
                        `Got ${file}, expected ${parentFolder}.${rest[0] ?? ''}`.trimEnd(),
                    ].join('\n'),
                    loc: { line: 1, column: 0 },
                })
            }
            return {}
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
