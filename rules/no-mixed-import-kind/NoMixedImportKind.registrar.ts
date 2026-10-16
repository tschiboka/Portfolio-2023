import type { RuleRegistrar } from '../types.js'
import { Rules } from './NoMixedImportKind.rules.js'

export const registrar: RuleRegistrar = {
    id: 'no-mixed-import-kind',
    description: 'An import must carry one kind, never both.',
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
            rule: Rules.Eslint.NoMixedImportKind9,
        },
    ],
}
