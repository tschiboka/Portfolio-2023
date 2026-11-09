import { Description } from './AliasShape.constants.js'
import { Rules } from './AliasShape.rules.js'
import type { RuleRegistrar } from '../types.js'

export const registrar: RuleRegistrar = {
    id: 'alias-shape',
    description: Description,
    scope: {
        include: ['src/**/*.{ts,tsx}', 'common/**/*.{ts,tsx}', 'server/**/*.{ts,tsx}'],
        exclude: ['**/*.code.{ts,tsx}', 'common/utils/Generics/**'],
    },
    enabled: true,
    severity: 'error',
    rules: [
        {
            requires: { linter: 'eslint', min: '9.0.0' },
            rule: Rules.Eslint.AliasShape9,
        },
    ],
}
