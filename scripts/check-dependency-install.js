#!/usr/bin/env node

import { execSync } from 'node:child_process'
import { statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ansi } from './ansi.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const lockPath = join(root, 'package-lock.json')
const installedPath = join(root, 'node_modules', '.package-lock.json')

/** When a file was last written, or null where it is absent. */
const getModifiedTime = (path) => {
    try {
        return statSync(path).mtimeMs
    } catch {
        return null
    }
}

const main = () => {
    const lockTime = getModifiedTime(lockPath)

    // A repository without a lockfile has no installed tree to reconcile.
    if (lockTime === null) return 0

    // npm records the tree it installed here, so an older record means the tree is stale.
    const installedTime = getModifiedTime(installedPath)
    if (installedTime !== null && installedTime >= lockTime) return 0

    console.log(ansi.cyan('node_modules is behind package-lock.json — installing'))

    try {
        execSync('npm install', { cwd: root, stdio: 'inherit' })
        execSync('git add package-lock.json', { cwd: root })
    } catch {
        console.error(ansi.red('npm install failed — the tree the later gates read is not ready'))
        return 1
    }

    return 0
}

process.exit(main())
