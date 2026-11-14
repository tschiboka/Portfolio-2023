import { Description } from './PredicateCase.constants.js'
import { Rules } from './PredicateCase.rules.js'
import type { RuleRegistrar } from '../types.js'

export const registrar: RuleRegistrar = {
    id: 'predicate-case',
    description: Description,
    scope: {
        include: [
            'src/**/*.{ts,tsx}',
            'common/**/*.{ts,tsx}',
            'server/**/*.{ts,tsx}',
            'rules/**/*.{ts,tsx}',
        ],
        exclude: ['**/*.code.{ts,tsx}', 'common/utils/Predicate/**'],
    },
    enabled: true,
    severity: 'error',
    rules: [
        {
            requires: { linter: 'eslint', min: '9.0.0' },
            rule: Rules.Eslint.PredicateCase9,
        },
    ],
}
