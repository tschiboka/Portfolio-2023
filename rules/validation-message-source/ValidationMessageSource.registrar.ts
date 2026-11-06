import { Description } from './ValidationMessageSource.constants.js'
import { Rules } from './ValidationMessageSource.rules.js'
import type { RuleRegistrar } from '../types.js'

export const registrar: RuleRegistrar = {
    id: 'validation-message-source',
    description: Description,
    scope: {
        include: ['src/**/*.schema.ts', 'common/**/*.schema.ts', 'server/**/*.schema.ts'],
        exclude: [],
    },
    enabled: true,
    severity: 'error',
    rules: [
        {
            requires: { linter: 'eslint', min: '9.0.0' },
            rule: Rules.Eslint.ValidationMessageSource9,
        },
    ],
}
