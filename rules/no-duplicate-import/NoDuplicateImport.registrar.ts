import type { RuleRegistrar } from '../types.js'
import { Rules } from './NoDuplicateImport.rules.js'

export const registrar: RuleRegistrar = {
    id: 'no-duplicate-import',
    description: 'An import path must be used once per kind.',
    scope: {
        include: [
            'src/**/*.tsx',
            'src/**/*.ts',
            'common/**/*.tsx',
            'common/**/*.ts',
            'server/**/*.tsx',
            'server/**/*.ts',
        ],
        exclude: ['public/**', '**/*.d.ts'],
    },
    enabled: true,
    severity: 'error',
    rules: [
        {
            requires: { linter: 'eslint', min: '9.0.0' },
            rule: Rules.Eslint.NoDuplicateImport9,
        },
    ],
}
