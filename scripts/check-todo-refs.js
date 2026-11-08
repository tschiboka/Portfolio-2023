#!/usr/bin/env node

import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ansi } from './ansi.js'
import { refIn } from './check-commit-message.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

/** Extensions worth reading — the same two the ESLint rule owns. */
const TextExtensions = new Set(['.ts', '.tsx'])

/** Paths the rule does not own either: a displayed sample, and the rule package's own text. */
const Skipped = [/^rules\//, /\.code\./]

/** A TODO and the reference it opens with — `TODO: [WDA-0042] - note`. */
const TodoWithRef = /\bTODO\b\s*:?\s*(\[(?:[A-Z]{1,3}-)?\d{1,6}\])([^\n]*)/

/** The answer that acknowledges the warning. */
const Accepted = /^y(?:es)?$/i

const [messagePath, answer] = process.argv.slice(2)

/** The commit subject, which is where the ticket is named. */
const subject = () => readFileSync(messagePath, 'utf8').split(/\r?\n/)[0] ?? ''

/** Splits a reference into the acronym it may carry and its number, so padding never matters. */
const splitRef = (ref) => {
    const [, acronym, digits] = /^(?:([A-Z]{1,3})-)?(\d{1,6})$/.exec(ref) ?? []

    return { acronym: acronym ?? null, number: Number(digits) }
}

/** Every tracked text file the sweep reads. */
const trackedFiles = () =>
    execSync('git ls-files -z', { cwd: root })
        .toString()
        .split('\0')
        .filter((file) => file !== '' && TextExtensions.has(extname(file)))
        .filter((file) => Skipped.every((pattern) => !pattern.test(file)))

/** The TODO as the comment writes it, reference and note together, with a block tail removed. */
const shownOf = (match) => `${match[1]}${match[2]}`.replace(/\s*\*\/\s*$/, '').trim()

/**
 * Every TODO of the same ticket or of an earlier one — the work this commit should have reached.
 *
 * @example
 * outstanding({ acronym: 'WDA', number: 42 }) // [WDA-42], [WDA-7] — never [WDA-43] or [XY-42]
 */
const outstanding = ({ acronym, number }) => {
    const found = []

    trackedFiles().forEach((file) => {
        readFileSync(join(root, file), 'utf8')
            .split(/\r?\n/)
            .forEach((line, index) => {
                const match = TodoWithRef.exec(line)
                if (!match) return

                const ref = splitRef(match[1].slice(1, -1))
                if (ref.acronym !== acronym) return
                if (ref.number > number) return

                found.push({ file, line: index + 1, shown: shownOf(match) })
            })
    })

    return found
}

const report = (ref, todos) => {
    console.error(ansi.red('Unresolved TODOs found'))
    console.error(`The following TODOs name [${ref}] or an earlier ticket:`)
    console.error('')

    todos.forEach(({ file, line, shown }) =>
        console.error(`- ${shown} — ${ansi.blue(`${file}:${line}`)}`),
    )

    console.error('')
    console.error(ansi.yellow('Please review these items before committing.'))
    console.error('')
    console.error(
        ansi.yellow(
            'If you are confident that all listed TODOs will be addressed as part of this work, you may acknowledge this warning and continue.',
        ),
    )
    console.error('')
    console.error(ansi.yellow('Otherwise, resolve the TODOs before committing.'))
    console.error('')
}

/** Exit codes: 0 nothing to review or acknowledged, 1 refused, 2 the hook must ask. */
const main = () => {
    const ref = refIn(subject())
    if (ref === null) return 0

    const found = outstanding(splitRef(ref))
    if (found.length === 0) return 0

    if (answer === undefined) {
        report(ref, found)
        return 2
    }

    if (Accepted.test(answer.trim())) return 0

    console.error(ansi.red('[commit-todos] resolve the TODOs, then commit again.'))
    return 1
}

process.exit(main())
