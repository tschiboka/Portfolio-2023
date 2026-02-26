/* eslint-env node */

module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    ignorePatterns: ['server/**', 'public/**'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:react-hooks/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: true,
        tsconfigRootDir: __dirname,
    },
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-misused-promises': [
            'error',
            { checksVoidReturn: { attributes: false } },
        ],
    },
    overrides: [
        {
            files: ['.eslintrc.cjs', 'jest.config.cjs', 'vite.config.ts', 'scripts/**/*.js'],
            parserOptions: {
                project: null,
            },
            extends: ['eslint:recommended'],
            rules: {
                '@typescript-eslint/no-var-requires': 'off',
            },
        },
    ],
}
