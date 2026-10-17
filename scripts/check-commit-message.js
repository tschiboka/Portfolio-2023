import fs from 'node:fs'
import { pathToFileURL } from 'node:url'

/** `[0009]` or `[ABC-0009]` — the ticket's own reference. */
const RefPattern = /^\[(?:\d{1,6}|[A-Z]{1,5}-\d{1,6})\]$/

/** The digits that end the ref, which carry the ticket number. */
const TrailingDigits = /(\d+)\]$/

/** The subject: mixed case, digits, spaces and ordinary punctuation, opening with a word. */
const SubjectPattern = /^[A-Za-z0-9][A-Za-z0-9 ().,:;_/&+-]*$/

/** Messages git writes itself, which carry no ticket. */
const GitGenerated = /^(Merge|Revert)/

const Separator = ' - '
const MinTicket = 1
const MaxTicket = 100000

/**
 * Checks a commit message's first line against the agreed format.
 *
 * @example
 * parseCommitMessage('[0009] - Add export order lint rule') // { valid: true }
 * parseCommitMessage('Add export order lint rule') // { valid: false, reason: '…' }
 */
export const parseCommitMessage = (message) => {
    if (GitGenerated.test(message)) return { valid: true }

    const separator = message.indexOf(Separator)
    if (separator === -1)
        return { valid: false, reason: `expected "${Separator}" between the ref and the message` }

    const ref = message.slice(0, separator)
    const subject = message.slice(separator + Separator.length)

    if (!RefPattern.test(ref))
        return { valid: false, reason: 'the ref must be [0009] or [ABC-0009]' }
    if (!SubjectPattern.test(subject) || subject !== subject.trimEnd())
        return {
            valid: false,
            reason: 'the message must start with a word and carry no trailing space',
        }

    const number = Number(TrailingDigits.exec(ref)[1])
    if (number < MinTicket || number > MaxTicket)
        return { valid: false, reason: `the ticket number must be ${MinTicket} to ${MaxTicket}` }

    return { valid: true }
}

const invokedDirectly =
    Boolean(process.argv[1]) && import.meta.url === pathToFileURL(process.argv[1]).href

if (invokedDirectly) {
    const [firstLine = ''] = fs.readFileSync(process.argv[2], 'utf8').split(/\r?\n/)
    const { valid, reason } = parseCommitMessage(firstLine)

    if (!valid) {
        console.error(`[commit-msg] Refused: "${firstLine}"`)
        console.error(`[commit-msg] ${reason}.`)
        console.error('[commit-msg] Write "[0009] - Message" or "[ABC-0009] - Message".')
        process.exit(1)
    }
}
