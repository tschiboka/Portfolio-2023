import { registrar as noEmptyRowInJsxRegistrar } from './no-empty-row-in-jsx/NoEmptyRowInJsx.registrar.js'
import { registrar as noRawSemanticJsxRegistrar } from './no-raw-semantic-jsx/NoRawSemanticJsx.registrar.js'
import { registrar as noAdHocFileSuffixRegistrar } from './no-ad-hoc-file-suffix/NoAdHocFileSuffix.registrar.js'
import { registrar as noMisnamedPrimaryFileRegistrar } from './no-misnamed-primary-file/NoMisnamedPrimaryFile.registrar.js'
import { RuleRegistrar } from './types.js'
import { registrar as noNewlineInImportsRegistrar } from './no-newline-in-imports/NoNewLineInImports.registrar.js'

export const RuleRegistry: RuleRegistrar[] = [
    noEmptyRowInJsxRegistrar,
    noRawSemanticJsxRegistrar,
    noAdHocFileSuffixRegistrar,
    noNewlineInImportsRegistrar,
    noMisnamedPrimaryFileRegistrar,
]
