import { Description } from './ResolverInSchema.constants.js'
import { Rules } from './ResolverInSchema.rules.js'
import type { RuleRegistrar } from '../types.js'

export const registrar: RuleRegistrar = {
    id: 'resolver-in-schema',
    description: Description,
    scope: {
        include: ['src/**/*.tsx', 'src/**/*.schema.ts'],
        exclude: [],
    },
    enabled: true,
    severity: 'error',
    rules: [
        {
            requires: { linter: 'eslint', min: '9.0.0' },
            rule: Rules.Eslint.ResolverInSchema9,
        },
    ],
}
