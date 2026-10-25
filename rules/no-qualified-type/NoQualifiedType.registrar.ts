import type { RuleRegistrar } from '../types.js'
import { Rules } from './NoQualifiedType.rules.js'

export const registrar: RuleRegistrar = {
    id: 'no-qualified-type',
    description: 'A type must be imported, not reached through a namespace.',
    scope: {
        include: ['**/*.{ts,tsx}'],
        exclude: [],
    },
    enabled: true,
    severity: 'error',
    rules: [
        {
            requires: { linter: 'eslint', min: '9.0.0' },
            rule: Rules.Eslint.Min9,
        },
    ],
}
