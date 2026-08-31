import { AccessMap } from '../AccessGuard.types'

const fullAccess: AccessMap = {
    capabilities: ['admin'],
    features: { xmas2025: true, darkMode: true },
}

const noAccess: AccessMap = {
    capabilities: [],
    features: {},
}

const partialAccess: AccessMap = {
    capabilities: [],
    features: { xmas2025: true },
}

export const accessGuardTestUtils = {
    fullAccess,
    noAccess,
    partialAccess,
}
