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
            const [, ...suffixParts] = context.filename.split('.')
            const suffix = suffixParts.join('.')

            const { AllowedSuffixRegexps } = NoAdHocFileSuffixConstants
            const isAllowed = AllowedSuffixRegexps.some((regexp) => regexp.test(suffix))
            if (isAllowed) return {}

            context.report({
                message: [ErrorMessage, `Got .${suffix}.`].join(' '),
                loc: { line: 1, column: 0 },
            })

            return {}
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
