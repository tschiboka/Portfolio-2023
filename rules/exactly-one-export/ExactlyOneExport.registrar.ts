import type { RuleRegistrar } from '../types.js'
import { Rules } from './ExactlyOneExport.rules.js'

export const registrar: RuleRegistrar = {
    id: 'exactly-one-export',
    description: 'A role file must export exactly one thing.',
    scope: {
        include: ['src/**/*.tsx', 'src/**/*.ts'],
        exclude: ['public/**'],
    },
    enabled: true,
    severity: 'error',
    rules: [
        {
            requires: { linter: 'eslint', min: '9.0.0' },
            rule: Rules.Eslint.ExactlyOneExport9,
        },
    ],
}
