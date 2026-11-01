export const HelperErrorMessage = 'A helper declared in a spec belongs in a .spec.utils.ts file.'

export const DataErrorMessage = 'Data declared in a spec belongs in a .mocks.ts file.'

/** The assertion, as the registrar states it. */
export const Description =
    'A spec declares nothing of its own: helpers and data live in role files.'

/** Hooks declare a spec's lifecycle; they are not helpers it shares. */
export const AllowedHookNames = ['beforeEach', 'afterEach', 'beforeAll', 'afterAll']

/** Hoisted by the transform, or dependent on the call above it — neither can move to another module. */
export const AllowedViMethods = ['mock', 'mocked']
