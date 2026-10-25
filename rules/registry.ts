import { registrar as noEmptyRowInJsxRegistrar } from './no-empty-row-in-jsx/NoEmptyRowInJsx.registrar.js'
import { registrar as noEmptyRowInObjectRegistrar } from './no-empty-row-in-object/NoEmptyRowInObject.registrar.js'
import { registrar as noRawSemanticJsxRegistrar } from './no-raw-semantic-jsx/NoRawSemanticJsx.registrar.js'
import { registrar as noQualifiedTypeRegistrar } from './no-qualified-type/NoQualifiedType.registrar.js'
import { registrar as noAdHocFileSuffixRegistrar } from './no-ad-hoc-file-suffix/NoAdHocFileSuffix.registrar.js'
import { registrar as noMisnamedPrimaryFileRegistrar } from './no-misnamed-primary-file/NoMisnamedPrimaryFile.registrar.js'
import { registrar as exactlyOneExportRegistrar } from './exactly-one-export/ExactlyOneExport.registrar.js'
import { registrar as roleExportNameRegistrar } from './role-export-name/RoleExportName.registrar.js'
import { registrar as noDefaultExportRegistrar } from './no-default-export/NoDefaultExport.registrar.js'
import { registrar as noMixedImportKindRegistrar } from './no-mixed-import-kind/NoMixedImportKind.registrar.js'
import { registrar as importOrderRegistrar } from './import-order/ImportOrder.registrar.js'
import { registrar as noDuplicateImportRegistrar } from './no-duplicate-import/NoDuplicateImport.registrar.js'
import { registrar as noDuplicateExportRegistrar } from './no-duplicate-export/NoDuplicateExport.registrar.js'
import { registrar as exportOrderRegistrar } from './export-order/ExportOrder.registrar.js'
import { registrar as noRawZindexRegistrar } from './no-raw-zindex/NoRawZIndex.registrar.js'
import { registrar as noRawColorRegistrar } from './no-raw-color/NoRawColor.registrar.js'
import { registrar as noMagicBreakpointRegistrar } from './no-magic-breakpoint/NoMagicBreakpoint.registrar.js'
import { registrar as noRawFontSizeRegistrar } from './no-raw-font-size/NoRawFontSize.registrar.js'
import { withPrefixedReports } from './prefixReports.js'
import { RuleRegistrar } from './types.js'

export const RuleRegistry: RuleRegistrar[] = [
    noEmptyRowInJsxRegistrar,
    noEmptyRowInObjectRegistrar,
    noRawSemanticJsxRegistrar,
    noAdHocFileSuffixRegistrar,
    noMisnamedPrimaryFileRegistrar,
    exactlyOneExportRegistrar,
    roleExportNameRegistrar,
    noDefaultExportRegistrar,
    noMixedImportKindRegistrar,
    importOrderRegistrar,
    noDuplicateImportRegistrar,
    noDuplicateExportRegistrar,
    exportOrderRegistrar,
    noRawZindexRegistrar,
    noRawColorRegistrar,
    noQualifiedTypeRegistrar,
    noMagicBreakpointRegistrar,
    noRawFontSizeRegistrar,
].map(withPrefixedReports)
