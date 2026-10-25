import type { RuleRegistrar } from '../types.js'
import { Rules } from './NoRawFontSize.rules.js'

export const registrar: RuleRegistrar = {
    id: 'no-raw-font-size',
    description: 'A font size must come from the scale, never an absolute length.',
    scope: {
        include: [
            'common/**/*.{css,scss}',
            'src/**/*.{css,scss}',
            'common/**/*.styles.ts',
            'src/**/*.styles.ts',
        ],
        exclude: ['common/ux/index.css', 'common/ux/tokens.generated.css', 'src/shared/styles/**'],
    },
    enabled: true,
    severity: 'error',
    rules: [
        {
            requires: { linter: 'eslint', min: '9.0.0' },
            rule: Rules.Eslint.NoRawFontSize9,
        },
    ],
}
