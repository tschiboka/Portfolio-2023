import { Description } from './NoSpecLocalDeclaration.constants.js'
import { Rules } from './NoSpecLocalDeclaration.rules.js'
import type { RuleRegistrar } from '../types.js'

export const registrar: RuleRegistrar = {
    id: 'no-spec-local-declaration',
    description: Description,
    scope: {
        include: ['**/tests/**/*.spec.{ts,tsx}', '**/*.spec.{ts,tsx}'],
        exclude: [],
    },
    enabled: true,
    severity: 'error',
    rules: [
        {
            requires: { linter: 'eslint', min: '9.0.0' },
            rule: Rules.Eslint.NoSpecLocalDeclaration9,
        },
    ],
}
