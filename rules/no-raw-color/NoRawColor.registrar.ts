import type { RuleRegistrar } from '../types.js'
import { Rules } from './NoRawColor.rules.js'

export const registrar: RuleRegistrar = {
    id: 'no-raw-color',
    description: 'A colour comes from the palette, never a literal.',
    scope: {
        include: [
            'src/**/*.ts',
            'src/**/*.tsx',
            'common/**/*.ts',
            'common/**/*.tsx',
            'server/**/*.ts',
        ],
        exclude: [
            'public/**',
            '**/*.d.ts',
            '**/*.code.ts',
            '**/*.generated.ts',
            'src/projects/WordDuelArena/**',
            'common/ux/index.css',
            'common/ux/tokens.generated.css',
            'src/shared/styles/**',
        ],
    },
    enabled: true,
    severity: 'error',
    rules: [
        {
            requires: { linter: 'eslint', min: '9.0.0' },
            rule: Rules.Eslint.NoRawColor9,
        },
    ],
}
