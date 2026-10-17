import type { RuleRegistrar } from '../types.js'
import { Rules } from './NoRawZIndex.rules.js'

export const registrar: RuleRegistrar = {
    id: 'no-raw-zindex',
    description: 'A z-index comes from a named layer, never a raw number.',
    scope: {
        include: [
            'src/**/*.ts',
            'src/**/*.tsx',
            'common/**/*.ts',
            'common/**/*.tsx',
            'server/**/*.ts',
        ],
        exclude: ['public/**', '**/*.d.ts', '**/*.code.ts'],
    },
    enabled: true,
    severity: 'error',
    rules: [
        {
            requires: { linter: 'eslint', min: '9.0.0' },
            rule: Rules.Eslint.NoRawZIndex9,
        },
    ],
}
