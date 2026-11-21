import { resolve } from 'node:path'
import { ErrorMessage } from '../NoDeepImport.constants'

/** A real path, so the rule's barrel lookup runs against this repository. */
const inRepo = (relative: string) => resolve(relative)

/** A case the rule must accept, naming the file the import is written in. */
const caseFor = (relative: string) => ({
    name: `should not throw for ${relative}`,
    code: "import { Home } from './Home'",
    filename: inRepo(relative),
})

/** The specifier a statement names, so a fixed case can state what it becomes. */
const sourceOf = (code: string): string => /from '([^']+)'/.exec(code)?.[1] ?? ''

/** A case the rule must reject, naming the barrel the import should have reached. */
const problemFor = (relative: string, code: string, barrel: string) => ({
    name: `should throw for ${relative} reaching past ${barrel}`,
    code,
    filename: inRepo(relative),
    output: code.replace(`'${sourceOf(code)}'`, `'${barrel}'`),
    errors: [{ message: [ErrorMessage, `Import "${barrel}" instead.`].join(' ') }],
})

/**
 * Shared wiring for the rule's spec: a path inside this repository, and the two case shapes —
 * one the rule accepts, one it rejects with the barrel it names.
 *
 * @example
 * NoDeepImportTestUtils.caseFor('src/app/Probe.ts')
 */
export const NoDeepImportTestUtils = { inRepo, caseFor, problemFor }
