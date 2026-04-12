import { type Guard } from '@common/utils/AccessGuard/AccessGuard.types'

const alwaysDenied: Guard = {
    when: { type: 'custom', predicate: () => false },
    then: { mode: 'hidden' },
}

const hiddenGuard: Guard[] = [{ ...alwaysDenied, then: { mode: 'hidden' } }]

const visibleGuard: Guard[] = [{ ...alwaysDenied, then: { mode: 'visible' } }]

const disabledGuard: Guard[] = [
    { ...alwaysDenied, then: { mode: 'disabled', reason: 'You lack permission to interact' } },
]

const softDisabledGuard: Guard[] = [
    {
        ...alwaysDenied,
        then: {
            mode: 'soft-disabled',
            title: 'Feature Locked',
            message: 'Upgrade your plan to unlock this feature.',
            actions: [
                { label: 'Upgrade', onClick: () => alert('Upgrade clicked'), variant: 'primary' },
                {
                    label: 'Learn More',
                    onClick: () => alert('Learn more clicked'),
                    variant: 'secondary',
                },
            ],
        },
    },
]

const tooltipGuard: Guard[] = [
    { ...alwaysDenied, then: { mode: 'tooltip', text: 'This feature is currently unavailable' } },
]

export const Guards = {
    hiddenGuard,
    visibleGuard,
    disabledGuard,
    softDisabledGuard,
    tooltipGuard,
}
