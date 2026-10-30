import type { RuleRegistrar } from '../types.js'
import { Rules } from './TestNameVerb.rules.js'

export const registrar: RuleRegistrar = {
    id: 'test-name-verb',
    description: 'A test name must open with "should ".',
    scope: {
        include: ['**/tests/**/*.spec.{ts,tsx}', '**/*.spec.{ts,tsx}'],
        exclude: [],
    },
    enabled: true,
    severity: 'error',
    rules: [
        {
            requires: { linter: 'eslint', min: '9.0.0' },
            rule: Rules.Eslint.TestNameVerb9,
        },
    ],
}
