import { Description } from './RegexpRegistry.constants.js'
import { Rules } from './RegexpRegistry.rules.js'
import type { RuleRegistrar } from '../types.js'

export const registrar: RuleRegistrar = {
    id: 'regexp-registry',
    description: Description,
    scope: {
        include: [
            'src/**/*.ts',
            'src/**/*.tsx',
            'common/**/*.ts',
            'common/**/*.tsx',
            'server/**/*.ts',
            'server/**/*.tsx',
        ],
        exclude: [
            '**/*.code.*',
            '**/*.spec.*',
            'common/ux/Test/**',
            'src/setupTests.ts',
            'common/utils/Regexp/Regexp.ts',
        ],
    },
    enabled: true,
    severity: 'error',
    rules: [
        {
            requires: { linter: 'eslint', min: '9.0.0' },
            rule: Rules.Eslint.RegexpRegistry9,
        },
    ],
}
