import type { Rule } from 'eslint'
import type { LinterKind, RuleScope, RuleSetting } from './types.js'
import type { Dictionary } from '../common/utils/Generics/Generics.types.js'

/** Installed version per linter, e.g. `{ eslint: '9.39.5' }`. Missing means unavailable. */
export type LinterVersions = Partial<Record<LinterKind, string>>

/** The two config fragments derived from the registry, plus the plugin name they sit under. */
export type BuiltStandards = {
    pluginName: string
    rules: Dictionary<Rule.RuleModule>
    settings: Dictionary<RuleSetting>
    scopes: Dictionary<RuleScope>
}
