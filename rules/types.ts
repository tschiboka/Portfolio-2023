import type { Rule } from 'eslint'

export type RuleScope = {
    include: string[]
    exclude: string[]
}

export type RuleSeverity = 'error' | 'warn'
export type LinterKind = 'eslint' | 'oxc'

export type RuleRequirement = {
    linter: LinterKind
    min: string
    max?: string
}

export type RuleFunction = {
    requires: RuleRequirement
    rule: Rule.RuleModule
}

export type RuleRegistrar = {
    id: string
    description: string
    enabled: boolean
    scope: RuleScope
    severity: RuleSeverity
    rules: [RuleFunction]
}
