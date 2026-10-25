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

/**
 * One config block per scoped rule, so `scope` in the registrar binds the rule to its files.
 * `standards` is declared here as well as below: a plugin is only in scope for the files its
 * own config object matches, and these scopes are wider than `**\/*.{ts,tsx}`.
 */
const scopedRules = Object.entries(scopes).map(([ruleId, scope]) => ({
    files: scope.include,
    ignores: scope.exclude,
    plugins: { standards },
    rules: { [ruleId]: settings[ruleId] },
}))

/** Files the style processor owns; every JS/TS config below leaves them alone. */
const styleFiles = ['**/*.{css,scss}']

export default tseslint.config(
    { ignores: ['public/**', '**/dist/**', '.github/**', '.opencode/**'] },
    { ...js.configs.recommended, ignores: styleFiles },
    {
        languageOptions: { parserOptions: { tsconfigRootDir: rootDir } },
        ignores: styleFiles,
    },
    ...tseslint.configs.recommended.map((config) => ({ ...config, ignores: styleFiles })),
    ...tseslint.configs.recommendedTypeChecked.map((config) => ({
        ...config,
        files: ['**/*.{ts,tsx}'],
        ignores: ['scripts/**', 'vite.config.ts'],
    })),
    {
        files: ['**/*.{ts,tsx}'],
        ignores: ['scripts/**', 'vite.config.ts'],
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
            '@typescript-eslint/no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
            ],
        },
    },
    {
        files: ['**/*.{js,cjs,mjs}', 'vite.config.ts', 'scripts/**/*.js'],
        languageOptions: {
            globals: { console: 'readonly', process: 'readonly' },
            parserOptions: { projectService: false, project: false },
        },
        rules: { '@typescript-eslint/no-var-requires': 'off' },
    },
    ...scopedRules,
    {
        files: ['**/*.{css,scss}'],
        ignores: [
            'public/**',
            'common/ux/index.css',
            'common/ux/tokens.generated.css',
            'src/shared/styles/**',
        ],
        plugins: { standards },
        processor: 'standards/style',
        rules: {
            'standards/no-raw-zindex': settings['standards/no-raw-zindex'],
            'standards/no-raw-color': settings['standards/no-raw-color'],
        },
    },
    {
        files: ['src/projects/WordDuelArena/**/*.{css,scss}'],
        rules: { 'standards/no-raw-color': 'off' },
    },
)
