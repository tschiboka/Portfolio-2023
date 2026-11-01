import { AccessGuardTestUtils } from './AccessGuard.spec.utils'
import type { AccessMap, Guard, GuardCondition, ModeConfig } from '../AccessGuard.types'

const { fullAccess, noAccess } = AccessGuardTestUtils

const capabilityCondition: GuardCondition = { type: 'capability', capabilities: ['admin'] }

const featureCondition: GuardCondition = { type: 'feature', features: ['xmas2025'] }

const hiddenMode: ModeConfig = { mode: 'hidden' }

const whenConditionTypes: {
    name: string
    condition: GuardCondition
    deniedAccess: AccessMap
    grantedAccess: AccessMap
}[] = [
    {
        name: 'capability',
        condition: { type: 'capability', capabilities: ['admin'] },
        deniedAccess: noAccess,
        grantedAccess: fullAccess,
    },
    {
        name: 'feature',
        condition: { type: 'feature', features: ['xmas2025'] },
        deniedAccess: noAccess,
        grantedAccess: fullAccess,
    },
    {
        name: 'custom',
        condition: { type: 'custom', predicate: (a) => a.capabilities.includes('admin') },
        deniedAccess: noAccess,
        grantedAccess: fullAccess,
    },
]

const disabledMode: ModeConfig = { mode: 'disabled', reason: 'Not allowed' }

const unlessConditionTypes: {
    name: string
    condition: GuardCondition
    activeAccess: AccessMap
    inactiveAccess: AccessMap
}[] = [
    {
        name: 'capability',
        condition: { type: 'capability', capabilities: ['admin'] },
        activeAccess: fullAccess,
        inactiveAccess: noAccess,
    },
    {
        name: 'feature',
        condition: { type: 'feature', features: ['xmas2025'] },
        activeAccess: fullAccess,
        inactiveAccess: noAccess,
    },
    {
        name: 'custom',
        condition: { type: 'custom', predicate: (a) => a.capabilities.includes('admin') },
        activeAccess: fullAccess,
        inactiveAccess: noAccess,
    },
]

const modeConfigs: { name: string; config: ModeConfig }[] = [
    { name: 'hidden', config: { mode: 'hidden' } },
    { name: 'visible', config: { mode: 'visible' } },
    { name: 'disabled without reason', config: { mode: 'disabled' } },
    {
        name: 'disabled with reason',
        config: { mode: 'disabled', reason: 'Upgrade required' },
    },
    { name: 'soft-disabled minimal', config: { mode: 'soft-disabled' } },
    {
        name: 'soft-disabled full',
        config: {
            mode: 'soft-disabled',
            title: 'Locked',
            message: 'You need a subscription',
            actions: [{ label: 'Upgrade', onClick: vi.fn() }],
        },
    },
    { name: 'tooltip', config: { mode: 'tooltip', text: 'Not available' } },
]

const complexGuards: Guard[] = [
    { when: { type: 'feature', features: ['beta'] }, then: { mode: 'hidden' } },
    {
        when: { type: 'capability', capabilities: ['admin'] },
        then: { mode: 'disabled', reason: 'Admin only' },
    },
    {
        unless: { type: 'feature', features: ['xmas2025'] },
        then: { mode: 'tooltip', text: 'Enable xmas' },
    },
    {
        when: { type: 'custom', predicate: () => false },
        then: { mode: 'soft-disabled', title: 'Fallback' },
    },
]

export const AccessGuardMocks = {
    capabilityCondition,
    featureCondition,
    hiddenMode,
    whenConditionTypes,
    disabledMode,
    unlessConditionTypes,
    modeConfigs,
    complexGuards,
}
