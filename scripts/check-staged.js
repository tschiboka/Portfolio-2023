import { execSync, spawnSync } from 'node:child_process'
import { pathToFileURL } from 'node:url'

/** Extensions the standards rules cover, TS objects and stylesheets alike. */
const LintExtensions = ['.ts', '.tsx', '.css', '.scss']

/** Trees ESLint ignores globally, so naming a file there would fail the run. */
const IgnoredPrefixes = ['public/']

/**
 * Narrows a staged-file list to the files the lint step should see.
 *
 * @example
 * selectLintFiles(['src/a.tsx', 'src/b.md', 'public/c.css']) // ['src/a.tsx']
 */
export const selectLintFiles = (paths) =>
    paths
        .filter((path) => LintExtensions.some((extension) => path.endsWith(extension)))
        .filter((path) => !IgnoredPrefixes.some((prefix) => path.startsWith(prefix)))

const invokedDirectly =
    Boolean(process.argv[1]) && import.meta.url === pathToFileURL(process.argv[1]).href

if (invokedDirectly) {
    const staged = execSync('git diff --cached --name-only --diff-filter=ACMR', {
        encoding: 'utf8',
    })
        .split('\n')
        .filter(Boolean)

    const files = selectLintFiles(staged)

    if (files.length > 0) {
        console.log(`[commit] linting ${files.length} staged file(s)`)
        execSync('npm run build:rules', { stdio: 'inherit' })

        const lint = spawnSync(
            'npx',
            ['eslint', ...files, '--report-unused-disable-directives', '--max-warnings', '0'],
            { stdio: 'inherit', shell: true },
        )

        if (lint.status !== 0) process.exit(lint.status ?? 1)
    }
}
