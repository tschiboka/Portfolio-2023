import type { Rule } from 'eslint'
import { NoAdHocFileSuffixConstants } from './NoAdHocFileSuffix.constants.js'

export const ErrorMessage = 'A file must not have an ad-hoc suffix.'

const Eslint = {
    NoAdHocFileSuffix9: {
        meta: {
            type: 'layout',
            docs: { description: ErrorMessage },
        },
        create(context) {
            const segments = context.filename.replace(/\\/g, '/').split('/')
            const fileName = segments[segments.length - 1] ?? ''
            const parentFolder = segments[segments.length - 2] ?? ''

            const [baseName = '', ...suffixParts] = fileName.split('.')
            const suffix = suffixParts.join('.')

            const { AllowedSuffixRegexps, AllowedBareNames, AllowedParentFolders } =
                NoAdHocFileSuffixConstants

            // A bare name states no role, so it is legal as a named entry point, as the file named
            // after its own folder, or inside a folder that already carries the context
            // (`components/`, `utils/`, `tests/`). `no-misnamed-primary-file` owns the spelling.
            const isBare = suffixParts.length === 1
            const isAllowed = isBare
                ? AllowedBareNames.includes(baseName) ||
                  baseName === parentFolder ||
                  AllowedParentFolders.includes(parentFolder)
                : AllowedSuffixRegexps.some((regexp) => regexp.test(suffix))
            if (isAllowed) return {}

            const reported = isBare ? fileName : `.${suffix}`
            context.report({
                message: [ErrorMessage, `Got ${reported}.`].join(' '),
                loc: { line: 1, column: 0 },
            })

            return {}
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
