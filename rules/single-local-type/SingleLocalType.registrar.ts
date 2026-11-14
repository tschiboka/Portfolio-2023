import { Description } from './SingleLocalType.constants.js'
import { Rules } from './SingleLocalType.rules.js'
import type { RuleRegistrar } from '../types.js'

export const registrar: RuleRegistrar = {
    id: 'single-local-type',
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
        exclude: [
            '**/*.d.ts',
            '**/*.types.ts',
            '**/types.ts',
            'common/types/**',
            '**/*.code.*',
            '**/*.generated.ts',
            'rules/dist/**',
        ],
    },
    enabled: true,
    severity: 'error',
    rules: [
        {
            requires: { linter: 'eslint', min: '9.0.0' },
            rule: Rules.Eslint.SingleLocalType9,
        },
    ],
}
