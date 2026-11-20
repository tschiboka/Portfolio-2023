#!/usr/bin/env node

import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ansi } from './ansi.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

/** Manifests whose pins must be installed, and the folders npm may hoist a package into. */
const ManifestPaths = ['package.json', 'server/package.json']
const ModuleFolders = ['node_modules', 'server/node_modules']

const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'))

/** The version a spec asks for, reading through an `npm:` alias to the version it names. */
const getPinnedVersion = (spec) => {
    if (!spec.startsWith('npm:')) return spec

    const aliased = spec.slice('npm:'.length)
    return aliased.slice(aliased.lastIndexOf('@') + 1)
}

/**
 * The version npm actually installed for a package, or null where it installed none.
 *
 * @example readInstalledVersion('eslint') // '10.15.0'
 */
const readInstalledVersion = (name) =>
    ModuleFolders.map((folder) => {
        try {
            return readJson(join(root, folder, name, 'package.json')).version
        } catch {
            return null
        }
    }).find((version) => version !== null) ?? null

/** Every dependency whose pin differs from the installed version. A range pin is left to npm. */
const getStaleDependencies = () =>
    ManifestPaths.flatMap((relative) => {
        const manifest = readJson(join(root, relative))

        return Object.entries({ ...manifest.dependencies, ...manifest.devDependencies })
    }).filter(([name, spec]) => {
        const pinned = getPinnedVersion(spec)
        if (!/^\d/.test(pinned)) return false

        return readInstalledVersion(name) !== pinned
    })

const main = () => {
    const stale = getStaleDependencies()

    if (stale.length === 0) return 0

    console.log(ansi.cyan(`${stale.length} dependencies differ from their pin — installing`))

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
