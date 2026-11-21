import { resolve } from 'node:path'
import { ErrorMessage } from '../MatchingSpec.rules'

/** The message a report must carry, naming the spec the file is expected to have. */
const messageFor = (specName: string) => [ErrorMessage, `Expected ${specName}.`].join(' ')

/** A real path, so the rule's existence check runs against this repository. */
const inRepo = (relative: string) => resolve(relative)

/** A valid case, naming the file the rule must accept. */
const caseFor = (relative: string) => ({
    name: `should not throw for ${relative}`,
    code: 'export const x = 1',
    filename: inRepo(relative),
})

/**
 * Shared wiring for the rule's spec: the message a report must carry, a path inside this
 * repository, and a valid case naming the file the rule must accept.
 *
 * @example
 * MatchingSpecTestUtils.caseFor('src/app/Admin/Admin.tsx')
 */
export const MatchingSpecTestUtils = { caseFor, inRepo, messageFor }
