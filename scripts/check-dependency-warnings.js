#!/usr/bin/env node

import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ansi } from './ansi.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

/** The workspaces whose manifests are asked separately — npm reports nothing for a group. */
const Manifests = ['.', 'common', 'server']

const MillisPerDay = 24 * 60 * 60 * 1000
const MillisPerMinute = 60 * 1000

/** How long a block still has to run — `4h 38m`, or `1d 2h` once it passes a day. */
const getRemainingLabel = (age, floor) => {
    const minutes = Math.floor(((floor - age) * MillisPerDay) / MillisPerMinute)
    const hours = Math.floor(minutes / 60)

    if (!minutes) return 'under a minute'
    if (hours < 1) return `${minutes}m`
    if (hours < 24) return `${hours}h ${minutes % 60}m`

    return `${Math.floor(hours / 24)}d ${hours % 24}h ${minutes % 60}m`
}

/** The days a version must have been published before npm will install it. */
const getReleaseAgeFloor = () => {
    try {
        const config = readFileSync(join(root, '.npmrc'), 'utf8')
        const [, days] = config.match(/^min-release-age\s*=\s*(\d+)\s*$/m) ?? []

        return Number(days ?? 0)
    } catch {
        return 0
    }
}

/** Runs a command and returns its stdout, or an empty string where it fails. */
const readOutput = (command) => {
    try {
        return execSync(command, { cwd: root, encoding: 'utf8', stdio: 'pipe' })
    } catch (error) {
        return error.stdout?.toString() ?? ''
    }
}

/** True where npm records no version, as it does for a hoisted workspace dependency. */
const isMissing = (current) => !current || current === 'MISSING'

/** The packages each manifest reports as behind their latest version. */
const getOutdated = (manifest) => {
    const output = readOutput(`npm outdated --prefix ${manifest} --json`)

    try {
        return Object.entries(JSON.parse(output))
            .map(([name, details]) => ({
                manifest,
                name,
                current: isMissing(details.current) ? details.wanted : details.current,
                latest: details.latest,
            }))
            .filter(({ current, latest }) => current !== latest)
    } catch {
        return []
    }
}

/** The number of days since a version was published, or null where npm cannot say. */
const getAgeInDays = (name, version) => {
    const output = readOutput(`npm view ${name} time --json`)

    try {
        // npm answers with a one-element array, whatever the field asked for.
        const [times] = JSON.parse(output)
        const published = times?.[version]

        return published ? (Date.now() - Date.parse(published)) / MillisPerDay : null
    } catch {
        return null
    }
}

const getRow = ({ manifest, name, current, latest }, floor) => {
    const age = getAgeInDays(name, latest)
    const blocked = age !== null && age < floor

    const columns = [
        ansi.cyan(manifest.padEnd(8)),
        ansi.yellow(name.padEnd(24)),
        ansi.blue(`${current} -> ${latest}`),
    ]

    return blocked
        ? `${columns.join(' ')} ${ansi.red(`[blocked by min age | unblocks in ${getRemainingLabel(age, floor)}]`)}`
        : columns.join(' ')
}

const main = () => {
    const floor = getReleaseAgeFloor()
    const outdated = Manifests.flatMap(getOutdated)

    // A hoisted package is reported by each workspace that names it; one row is enough.
    const unique = [...new Map(outdated.map((row) => [row.name, row])).values()].sort(
        (left, right) =>
            left.manifest.localeCompare(right.manifest) || left.name.localeCompare(right.name),
    )

    if (!unique.length) return 0

    console.log(ansi.cyan('[commit-dependency-warnings]'))
    unique.forEach((row) => console.log(`  ${getRow(row, floor)}`))
    return 0
}

process.exit(main())
