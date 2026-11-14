import { basename } from 'node:path'
import { Description, ErrorMessage } from './RoleFilePascal.constants.js'
import { isPascalStem, splitName } from './RoleFilePascal.utils.js'
import { NoAdHocFileSuffixConstants } from '../no-ad-hoc-file-suffix/NoAdHocFileSuffix.constants.js'
import { isNull } from '../../common/utils/Predicate/Predicate.js'
import type { Rule } from 'eslint'

const { AllowedBareNames, AllowedRoles } = NoAdHocFileSuffixConstants

const Eslint = {
    RoleFilePascal9: {
        meta: {
            type: 'suggestion',
            schema: [],
            docs: { description: Description },
        },
        create(context) {
            const checkName = (): void => {
                const parts = splitName(basename(context.filename))
                if (isNull(parts)) return
                if (!AllowedRoles.includes(parts.role)) return
                if (AllowedBareNames.includes(parts.stem)) return
                if (isPascalStem(parts.stem)) return

                context.report({ node: context.sourceCode.ast, message: ErrorMessage })
            }

            return { 'Program:exit': checkName }
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
