/**
 * Roles whose file must export exactly one thing.
 * The dot-segment before the extension is what matches, so `Feature.utils.ts`
 * and `Feature.spec.utils.ts` both resolve to `utils`.
 *
 * Absent on purpose: `index` (barrel), `types` (many named domain types),
 * `routes` (a map plus its derived list), `constants` (cohesive or distinct),
 * `styles`, `data`.
 */
export const ExactlyOneExportConstants = {
    SingleExportRoles: [
        'actions',
        'auth',
        'code',
        'columns',
        'config',
        'context',
        'controller',
        'defaults',
        'errors',
        'filters',
        'handlers',
        'middleware',
        'mockHandlers',
        'mocks',
        'model',
        'options',
        'permissions',
        'provider',
        'repository',
        'schema',
        'selectors',
        'service',
        'states',
        'storage',
        'transformers',
        'utils',
    ],
}
