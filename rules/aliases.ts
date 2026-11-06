/**
 * Every alias the project declares. The two files that declare them — `tsconfig.json` and
 * `vite.config.ts` — each warn that a new one belongs here too. Both ordering rules read this
 * one list.
 */
export const AliasPrefixes = [
    '@app',
    '@common-mocks',
    '@common-types',
    '@common-utils',
    '@common-ux',
    '@portfolio',
    '@projects',
    '@public',
    '@shared-assets',
    '@shared-components',
    '@shared-context',
    '@shared-queries',
    '@shared-styles',
]

/** What an alias opens with — a package may open with it too, which is why the list above decides. */
export const AliasMarker = '@'
