import { Description } from './NoInterface.constants.js'
import { Rules } from './NoInterface.rules.js'
import type { RuleRegistrar } from '../types.js'

export const registrar: RuleRegistrar = {
    id: 'no-interface',
    description: Description,
    scope: {
        include: [
            'src/**/*.tsx',
            'src/**/*.ts',
            'common/**/*.tsx',
            'common/**/*.ts',
            'server/**/*.tsx',
            'server/**/*.ts',
            'rules/**/*.tsx',
            'rules/**/*.ts',
        ],
        exclude: ['**/*.d.ts', '**/*.code.{ts,tsx}', '**/*.generated.ts', 'rules/dist/**'],
    },
    enabled: true,
    severity: 'error',
    rules: [
        {
            requires: { linter: 'eslint', min: '9.0.0' },
            rule: Rules.Eslint.NoInterface9,
        },
    ],
}
