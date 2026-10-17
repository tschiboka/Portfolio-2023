import type { RuleRegistrar } from '../types.js'
import { Rules } from './ImportOrder.rules.js'

export const registrar: RuleRegistrar = {
    id: 'import-order',
    description: "A file's imports must be ordered by style, then by path.",
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
            rule: Rules.Eslint.ImportOrder9,
        },
    ],
}
