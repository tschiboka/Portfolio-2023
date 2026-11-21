import { existsSync } from 'node:fs'
import { MatchingSpecConstants } from './MatchingSpec.constants.js'
import type { Rule } from 'eslint'

export const ErrorMessage = 'A file that carries behaviour must have a spec beside it.'

/** The spec a file owes: `<Folder>/tests/<Base>.spec.<ext>` or `tests/<Base>.<role>.spec.ts`. */
const getSpecName = (base: string, role: string, extension: string): string =>
    role ? `${base}.${role}.spec.ts` : `${base}.spec.${extension}`

const Eslint = {
    MatchingSpec9: {
        meta: {
            type: 'problem',
            docs: { description: ErrorMessage },
        },
        create(context) {
            const segments = context.filename.replace(/\\/g, '/').split('/')
            const fileName = segments[segments.length - 1] ?? ''
            const folder = segments[segments.length - 2] ?? ''
            const directory = segments.slice(0, -1).join('/')

            const [base = '', ...suffixParts] = fileName.split('.')
            const extension = suffixParts.pop() ?? ''
            const role = suffixParts.join('.')

            // A feature's primary file is the one named after its own folder; a role file names a role
            // §1.3 marks as tested. Anything else is an entry point or a file with no behaviour.
            const isPrimary = !role && base === folder
            if (!isPrimary && !MatchingSpecConstants.TestedRoles.includes(role)) return {}

            const specName = getSpecName(base, isPrimary ? '' : role, extension)
            const specPath = `${directory}/${MatchingSpecConstants.SpecFolder}/${specName}`
            if (existsSync(specPath)) return {}

            context.report({
                message: [ErrorMessage, `Expected ${specName}.`].join(' '),
                loc: { line: 1, column: 0 },
            })

            return {}
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
