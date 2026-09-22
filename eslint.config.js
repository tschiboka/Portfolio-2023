import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { scopes, settings, standards } from './rules/dist/standards.config.js'

/** Repo root. `import.meta.dirname` needs Node 20.11+, which the editor's server may not be. */
const rootDir = dirname(fileURLToPath(import.meta.url))

/** One config block per scoped rule, so `scope` in the registrar binds the rule to its files. */
const scopedRules = Object.entries(scopes).map(([ruleId, scope]) => ({
    files: scope.include,
    ignores: scope.exclude,
    rules: { [ruleId]: settings[ruleId] },
}))

export default tseslint.config(
    { ignores: ['server/**', 'public/**', 'dist/**', '.github/**'] },
    js.configs.recommended,
    { languageOptions: { parserOptions: { tsconfigRootDir: rootDir } } },
    ...tseslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parserOptions: { projectService: true },
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            standards,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'react/jsx-newline': ['error', { prevent: true }],
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/no-misused-promises': [
                'error',
                { checksVoidReturn: { attributes: false } },
            ],
        },
    },
    {
        files: ['**/*.{js,cjs,mjs}', 'vite.config.ts'],
        languageOptions: { parserOptions: { projectService: false, project: false } },
        rules: { '@typescript-eslint/no-var-requires': 'off' },
    },
    ...scopedRules,
)
