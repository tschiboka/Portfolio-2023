import type { RuleRegistrar } from '../types.js'
import { Rules } from './RoleExportName.rules.js'

export const registrar: RuleRegistrar = {
    id: 'role-export-name',
    description: 'A role file must name its export after its role.',
    scope: {
        include: [
            'src/**/*.tsx',
            'src/**/*.ts',
            'common/**/*.tsx',
            'common/**/*.ts',
            'server/**/*.tsx',
            'server/**/*.ts',
        ],
        exclude: [
            'public/**',
            '**/*.d.ts',
            // A namespace module: the file is the namespace, so it owns no single export to name
            // after its stem — the thirty-eight predicates are the point, not one wrapper object.
            'common/utils/Predicate/Predicate.ts',
        ],
    },
    enabled: true,
    severity: 'error',
    rules: [
        {
            requires: { linter: 'eslint', min: '9.0.0' },
            rule: Rules.Eslint.RoleExportName9,
        },
    ],
}
