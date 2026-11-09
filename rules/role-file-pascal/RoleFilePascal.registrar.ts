import { Description } from './RoleFilePascal.constants.js'
import { Rules } from './RoleFilePascal.rules.js'
import type { RuleRegistrar } from '../types.js'

export const registrar: RuleRegistrar = {
    id: 'role-file-pascal',
    description: Description,
    scope: {
        include: ['src/**/*.{ts,tsx}', 'common/**/*.{ts,tsx}', 'server/**/*.{ts,tsx}'],
        exclude: [],
    },
    enabled: true,
    severity: 'error',
    rules: [
        {
            requires: { linter: 'eslint', min: '9.0.0' },
            rule: Rules.Eslint.RoleFilePascal9,
        },
    ],
}
