/**
 * The roles `docs/references/file-structure.md` §1.3 marks as carrying a spec of their own. A role
 * absent from this list is tested indirectly, or has no behaviour to test.
 */
const TestedRoles = [
    'handlers',
    'options',
    'reducer',
    'schema',
    'selectors',
    'states',
    'transformers',
    'utils',
]

/** Where a feature keeps its specs, relative to the file under review. */
const SpecFolder = 'tests'

export const MatchingSpecConstants = {
    TestedRoles,
    SpecFolder,
}
