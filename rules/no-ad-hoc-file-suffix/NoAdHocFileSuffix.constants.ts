import { AllowedParentFolders } from '../constants.js'

const AllowedRoles = [
    'actions',
    'auth',
    'business',
    'code',
    'columns',
    'config',
    'constants',
    'context',
    'controller',
    'data',
    'defaults',
    'demos',
    'errors',
    'filters',
    'handlers',
    'hooks',
    'middleware',
    'mocks',
    'mockHandlers',
    'model',
    'options',
    'permissions',
    'provider',
    'reducer',
    'queries',
    'repository',
    'routes',
    'schema',
    'selectors',
    'service',
    'spec',
    'styles',
    'transformers',
    'types',
    'utils',
]

const role = `(${AllowedRoles.join('|')})`

/**
 * Bare filenames that carry no role and are not named after their folder — entry points.
 * Any other bare name is a file that never stated its role.
 */
const AllowedBareNames = ['index', 'main', 'setupTests']

/** Any word — a `spec` composite names its subject, so the subject need not be a role. */
const word = '[a-zA-Z][a-zA-Z0-9]*'

/** `d.ts` first — it is two dot-segments, and the alternation must prefer it over `ts`. */
const extension = '(d\\.ts|ts|tsx|js|jsx)'

/**
 * Legal filename shapes, one line per pattern below:
 *
 * ```text
 * a.ts                    extension only
 * a.utils.ts              role
 * a.queries.mocks.ts      role.role
 * a.spec.utils.mocks.ts   spec.role.role
 * a.utils.mocks.spec.ts   role.role.spec
 * a.queries.spec.utils.ts role.spec.role
 * a.renderers.spec.tsx    <any word>.spec
 * a.spec.renderers.tsx    spec.<any word>
 * ```
 */
export const NoAdHocFileSuffixConstants = {
    AllowedRoles,
    AllowedBareNames,
    AllowedParentFolders,
    /** One pattern per legal shape: a role or up to two roles, one of them `spec`. */
    AllowedSuffixRegexps: [
        new RegExp(`^${role}\\.${extension}$`),
        new RegExp(`^${role}\\.${role}\\.${extension}$`),
        new RegExp(`^spec\\.${role}\\.${role}\\.${extension}$`),
        new RegExp(`^${role}\\.${role}\\.spec\\.${extension}$`),
        new RegExp(`^${role}\\.spec\\.${role}\\.${extension}$`),
        new RegExp(`^${word}\\.spec\\.${extension}$`),
        new RegExp(`^spec\\.${word}\\.${extension}$`),
    ],
}
