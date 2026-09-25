import type { RuleRegistrar } from '../types.js'
import { Rules } from './NoNewlineInImports.rules.js'

export const registrar: RuleRegistrar = {
    id: 'no-newline-in-imports',
    description: 'An import block must not contain an empty row.',
    scope: {
        include: ['src/**', 'common/**', 'server/**'],
        exclude: [],
    },
    enabled: true,
    severity: 'error',
    rules: [
        {
            requires: { linter: 'eslint', min: '9.0.0' },
            rule: Rules.Eslint.NoNewlineInImports9,
        },
    ],
}
