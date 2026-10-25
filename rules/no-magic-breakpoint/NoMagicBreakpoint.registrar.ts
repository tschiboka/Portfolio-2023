import type { RuleRegistrar } from '../types.js'
import { Rules } from './NoMagicBreakpoint.rules.js'

export const registrar: RuleRegistrar = {
    id: 'no-magic-breakpoint',
    description: 'A media query width must come from Const.Breakpoint.',
    scope: {
        include: ['common/**/*.css', 'src/**/*.{css,scss}'],
        exclude: ['common/ux/index.css', 'common/ux/tokens.generated.css', 'src/shared/styles/**'],
    },
    enabled: true,
    severity: 'error',
    rules: [
        {
            requires: { linter: 'eslint', min: '9.0.0' },
            rule: Rules.Eslint.NoMagicBreakpoint9,
        },
    ],
}
