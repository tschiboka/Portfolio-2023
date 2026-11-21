#!/usr/bin/env node

import { execSync, spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ansi } from './ansi.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

/** The answer the hook read from the terminal, if it asked for one. */
const answer = process.argv[2]

/** True while git is finishing a merge, where the worktree is git's business, not the writer's. */
const isMerging = () => {
    try {
        execSync('git rev-parse -q --verify MERGE_HEAD', { cwd: root, stdio: 'ignore' })
        return true
    } catch {
        return false
    }
}

/** A rename is reported as `old -> new`; the path that can be staged is the destination. */
const destinationOf = (path) =>
    path.includes(' -> ') ? path.slice(path.indexOf(' -> ') + 4) : path

/** Each path git reports, with the two status columns it reports them by. */
const getChanges = () =>
    execSync('git status --porcelain', { cwd: root })
        .toString()
        .split('\n')
        .filter(Boolean)
        .map((line) => ({ status: line.slice(0, 2), path: destinationOf(line.slice(3).trim()) }))

/** True where the worktree holds something the index does not. */
const isUnstaged = ({ status }) => status === '??' || status[1] !== ' '

/** True where the index holds something git will commit. */
const isStaged = ({ status }) => status !== '??' && status[0] !== ' '

const list = (paths) => paths.forEach((path) => console.error(ansi.red(`  ${path}`)))

const report = (paths) => {
    console.error(ansi.red('These changes are not staged — the commit would not carry them:'))
    list(paths)
    console.error(
        [
            `  [1] - ADD    stage ${paths.length === 1 ? 'it' : 'them'} and continue`,
            '  [q] - ABORT cancel the commit',
        ].join('\n'),
    )
}

/** Exit codes: 0 nothing to do, 1 refused, 2 the hook must ask what to do. */
const main = () => {
    if (isMerging()) return 0

    const changes = getChanges()
    const unstaged = changes.filter(isUnstaged).map(({ path }) => path)

    if (!unstaged.length) return 0

    // Nothing staged at all leaves no commit to make, so there is no choice worth offering.
    if (!changes.some(isStaged)) {
        console.error(ansi.red('Nothing is staged — there is no commit to make yet:'))
        list(unstaged)
        return 1
    }

    if (answer === undefined) {
        report(unstaged)
        return 2
    }

    if (answer !== '1') {
        console.error(ansi.red('staging aborted — nothing was changed'))
        return 1
    }

    const staged = spawnSync('git', ['add', '--', ...unstaged], { cwd: root, stdio: 'inherit' })
    if (staged.status !== 0) return 1

    console.error(ansi.green(`staged ${unstaged.length} path(s)`))
    return 0
}

process.exit(main())
