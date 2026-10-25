/**
 * Folder names whose children are named for their subject rather than for a role or their parent.
 * A component in `components/`, a helper in `utils/`, a spec in `tests/` — the folder carries the
 * context, so the filename need not repeat it.
 */
export const AllowedParentFolders = ['components', 'common', 'src', 'tests', 'utils']

/** Prefixes every report, so an in-house violation is recognisable at a glance. */
export const ViolationPrefix = 'TSCHIBOKA.COM - Coding Standards Violation: '

/**
 * Every role a file may carry, with the token it contributes to the export name. A file's export
 * is its stem followed by one token per role segment, so `Word.queries.mocks.ts` reads
 * `WordQueriesMocks` and `Word.spec.utils.ts` reads `WordTestUtils`.
 *
 * A role left out asserts nothing about its export, and is exempt from `role-export-name` and
 * `exactly-one-export`. Left out on purpose: `types` (named domain types), `data` (content of
 * many shapes), `demos` (one component per export), `generated` (the generator decides the shape)
 * and `business` (a document, no code symbol).
 */
export const RoleExportTokenMap: Record<string, string> = {
    actions: 'Actions',
    auth: 'Auth',
    code: 'Code',
    columns: 'Columns',
    config: 'Config',
    constants: 'Constants',
    context: 'Context',
    controller: 'Controller',
    defaults: 'Defaults',
    errors: 'Errors',
    filters: 'Filters',
    handlers: 'Handlers',
    hooks: 'Hooks',
    middleware: 'Middleware',
    mockHandlers: 'MockHandlers',
    mocks: 'Mocks',
    model: 'Model',
    options: 'Options',
    permissions: 'Permissions',
    provider: 'Provider',
    queries: 'Queries',
    reducer: 'Reducer',
    repository: 'Repository',
    router: 'Router',
    routes: 'Routes',
    schema: 'Schema',
    seed: 'Seed',
    selectors: 'Selectors',
    service: 'Service',
    spec: 'Test',
    states: 'States',
    storage: 'Storage',
    styles: 'Styles',
    transformers: 'Transformers',
    utils: 'Utils',
}

/** Roles whose export is not the only one: a spec is a test contract, not a value. */
const MultiExportRoles = ['spec']

/** Roles whose file must export exactly one thing. */
export const SingleExportRoles = Object.keys(RoleExportTokenMap).filter(
    (role) => !MultiExportRoles.includes(role),
)
