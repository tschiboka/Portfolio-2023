import { Rules } from './NoDuplicateExport.rules.js'
import type { RuleRegistrar } from '../types.js'

export const registrar: RuleRegistrar = {
    id: 'no-duplicate-export',
    description: 'A re-export path must be used once per kind.',
    scope: {
        include: [
            'src/**/*.tsx',
            'src/**/*.ts',
            'common/**/*.tsx',
            'common/**/*.ts',
            'server/**/*.tsx',
            'server/**/*.ts',
            'rules/**/*.{ts,tsx}',
        ],
        exclude: ['public/**', '**/*.d.ts'],
    },
    enabled: true,
    severity: 'error',
    rules: [
        {
            requires: { linter: 'eslint', min: '9.0.0' },
            rule: Rules.Eslint.NoDuplicateExport9,
        },
    ],
}
