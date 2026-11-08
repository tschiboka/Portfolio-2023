import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { cwd } from 'node:process'
import { DocumentsFolder, RefShape, TodoRef, TodoWord } from './TodoTicketRef.constants.js'

let documentKeys: string[] | null = null

/** `ACRONYM:number`, with an empty acronym for core work — padding never matters. */
const keyOf = (acronym: string, digits: string): string => `${acronym}:${Number(digits)}`

/** The digits a document name opens with, or `null` where it opens with none. */
const leadingDigitsOf = (name: string): string | null => /^(\d{1,6})-/.exec(name)?.[1] ?? null

/** Splits a reference into its acronym, empty for core work, and its digits. */
const partsOf = (ref: string): { acronym: string; digits: string } => {
    const index = ref.lastIndexOf('-')

    return index === -1
        ? { acronym: '', digits: ref }
        : { acronym: ref.slice(0, index), digits: ref.slice(index + 1) }
}

/**
 * The tickets this checkout documents, read once and kept. A core ticket sits in `docs/` as
 * `NNNN-slug.md`; a project's sits in `docs/<ACRONYM>/` as `NNNN-slug.md`, so the folder carries the
 * acronym rather than the filename.
 */
const ticketKeys = (): string[] => {
    if (documentKeys !== null) return documentKeys

    const folder = join(cwd(), DocumentsFolder)
    const keys: string[] = []

    try {
        readdirSync(folder, { withFileTypes: true }).forEach((entry) => {
            const names = entry.isDirectory()
                ? readdirSync(join(folder, entry.name))
                : [entry.name]
            const acronym = entry.isDirectory() ? entry.name : ''

            names.forEach((name) => {
                const digits = leadingDigitsOf(name)
                if (digits !== null) keys.push(keyOf(acronym, digits))
            })
        })
    } catch {
        /* a checkout with no documents folder resolves nothing */
    }

    documentKeys = keys

    return documentKeys
}

/** Answers whether a comment is a TODO. */
export const isTodo = (comment: string): boolean => TodoWord.test(comment)

/**
 * Reads the reference a TODO opens with, or `null` where the reference is absent or sits further
 * along the note.
 *
 * @example
 * refOf('TODO: [0009] - add the rule') // '0009'
 * refOf('TODO: add the rule [0009]') // null
 */
export const refOf = (comment: string): string | null => TodoRef.exec(comment)?.[1] ?? null

/**
 * Answers whether a reference is written the way the convention requires.
 *
 * @example
 * isWellFormed('0009') // true
 * isWellFormed('ABC-0009') // true
 * isWellFormed('ABCD-0009') // false
 */
export const isWellFormed = (ref: string): boolean => RefShape.test(ref)

/**
 * Answers whether the reference names a document this checkout carries.
 *
 * @example
 * resolves('0009') // true, while docs/0009-linting-rules exists
 * resolves('GYM-0001') // true, while docs/GYM/0001-gym-write-path.md exists
 * resolves('9999') // false
 */
export const resolves = (ref: string): boolean => {
    const { acronym, digits } = partsOf(ref)

    return ticketKeys().includes(keyOf(acronym, digits))
}
