#!/usr/bin/env node

import { execSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ansi } from './ansi.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

/** True while git is finishing a merge, where the worktree is git's business, not the writer's. */
const isMerging = () => {
    try {
        execSync('git rev-parse -q --verify MERGE_HEAD', { cwd: root, stdio: 'ignore' })
        return true
    } catch {
        return false
    }
}

const main = () => {
    if (isMerging()) return 0

    const lines = execSync('git status --porcelain', { cwd: root })
        .toString()
        .split('\n')
        .filter(Boolean)

    const unstaged = lines
        .map((line) => ({ status: line.slice(0, 2), path: line.slice(3).trim() }))
        .filter(({ status }) => status === '??' || status[1] !== ' ')

    if (!unstaged.length) return 0

    console.error(ansi.red('every change must be staged before committing — these are not:'))
    unstaged.forEach(({ path }) => console.error(ansi.red(`  ${path}`)))
    return 1
}

process.exit(main())
