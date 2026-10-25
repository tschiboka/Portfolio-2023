import { RuleTester } from 'eslint'
import type { Linter } from 'eslint'
import { parser } from 'typescript-eslint'

const baseConfig: Linter.Config = {
    languageOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        parserOptions: { ecmaFeatures: { jsx: true } },
    },
}

export const ruleTester = new RuleTester(baseConfig)

/** Espree cannot parse a type annotation, so the TypeScript tester adds a parser to the same options. */
export const typescriptRuleTester = new RuleTester({
    languageOptions: { ...baseConfig.languageOptions, parser },
})
