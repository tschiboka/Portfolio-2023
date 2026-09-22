import type { RuleRegistrar } from '../types.js'
import { Rules } from './NoAdHocFileSuffix.rules.js'

export const registrar: RuleRegistrar = {
    id: 'no-ad-hoc-file-suffix',
    description: 'A file must not have an ad-hoc suffix.',
    scope: {
        include: ['src/**/*.tsx', 'src/**/*.ts', 'src/**/*.js', 'src/**/*.jsx'],
        exclude: ['public/**'],
    },
    enabled: true,
    severity: 'error',
    rules: [
        {
            requires: { linter: 'eslint', min: '9.0.0' },
            rule: Rules.Eslint.NoAdHocFileSuffix9,
        },
    ],
}
