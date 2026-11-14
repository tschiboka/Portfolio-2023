#!/usr/bin/env node

import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ansi } from './ansi.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const manifestPath = join(root, 'package.json')

/** The answer the hook read from the terminal, if it asked for one. */
const answer = process.argv[2]

/** Reads a manifest version from a git spec — `HEAD:package.json` or `:package.json`. */
const readVersion = (spec) => {
    try {
        return JSON.parse(execSync(`git show ${spec}`, { cwd: root })).version
    } catch {
        return null
    }
}

/**
 * Lists the three versions this one may be bumped to.
 *
 * @example
 * acceptedVersions('2.0.0') // { patch: '2.0.1', minor: '2.1.0', major: '3.0.0' }
 */
const acceptedVersions = (version) => {
    const [major = 0, minor = 0, patch = 0] = version.split('.').map(Number)

    return {
        patch: `${major}.${minor}.${patch + 1}`,
        minor: `${major}.${minor + 1}.0`,
        major: `${major + 1}.0.0`,
    }
}

/** Rewrites the version line in place, so the manifest's formatting survives. */
const writeVersion = (version) => {
    const manifest = readFileSync(manifestPath, 'utf8')
    writeFileSync(manifestPath, manifest.replace(/("version":\s*")[^"]+(")/, `$1${version}$2`))
    execSync('git add package.json', { cwd: root })
}

const pick = (choice, accepted) =>
    ({ 1: accepted.patch, 2: accepted.minor, 3: accepted.major })[choice] ?? null

const report = (issue, current, accepted) => {
    const headline =
        issue === 'unchanged'
            ? `package.json is still ${current} — the version needs to be updated.`
            : `version ${current} is not accepted — a bump moves exactly one part.`

    console.error(ansi.red(headline))
    console.error(
        [
            `  [1] - PATCH  ${accepted.patch}  fixes only, no new behaviour`,
            `  [2] - MINOR  ${accepted.minor}  new behaviour, stays compatible`,
            `  [3] - MAJOR  ${accepted.major}  breaks existing behaviour`,
            `  [q] - ABORT  cancel the version bump`,
        ].join('\n'),
    )
}

/** True while HEAD already sits on the published branch, where rewriting it needs its own bump. */
const isPublished = () => {
    try {
        execSync('git merge-base --is-ancestor HEAD origin/main', { cwd: root, stdio: 'ignore' })
        return true
    } catch {
        return false
    }
}

/** Exit codes: 0 accepted, 1 refused, 2 the hook must ask which bump to apply. */
const main = () => {
    const committed = readVersion('HEAD:package.json')
    if (!committed) return 0

    const staged = readVersion(':package.json')
    if (!staged) return 0

    const accepted = acceptedVersions(committed)
    const issue =
        staged === committed
            ? 'unchanged'
            : Object.values(accepted).includes(staged)
              ? null
              : 'rejected'

    if (!issue) return 0

    // A commit not yet on the published branch may be amended without a second bump.
    if (issue === 'unchanged' && !isPublished()) return 0

    if (answer === undefined) {
        report(issue, staged, accepted)
        return 2
    }

    const chosen = pick(answer, accepted)
    if (!chosen) {
        console.error(ansi.red('version bump aborted — nothing was changed'))
        return 1
    }

    writeVersion(chosen)
    console.error(ansi.green(`version set to ${chosen}`))
    return 0
}

process.exit(main())
