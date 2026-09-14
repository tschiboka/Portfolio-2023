import { registrar as noLeadingNewline } from './no-newline-in-jsx/NoNewlineInJsx.registrar.js'
import { RuleRegistrar } from './types.js'

export const RuleRegistry: RuleRegistrar[] = [noLeadingNewline]
