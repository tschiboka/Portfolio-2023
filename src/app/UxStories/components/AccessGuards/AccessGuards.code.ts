export const Code = {
    hidden: `const guard: Guard[] = [
    {
        when: { type: 'custom', predicate: () => false },
        then: { mode: 'hidden' },
    },
]

<AccessGuard guards={guard}>
    <button>This is removed from the DOM</button>
</AccessGuard>`,
    visible: `const guard: Guard[] = [
    {
        when: { type: 'capability', capabilities: ['admin'] },
        then: { mode: 'visible' },
    },
]

<AccessGuard guards={guard}>
    <button>Renders normally when denied</button>
</AccessGuard>`,
    disabled: `const guard: Guard[] = [
    {
        when: { type: 'feature', features: ['beta'] },
        then: { mode: 'disabled', reason: 'You lack permission to interact' },
    },
]

<AccessGuard guards={guard}>
    <button>Faded out and non-interactive</button>
</AccessGuard>`,
    softDisabled: `const guard: Guard[] = [
    {
        when: { type: 'custom', predicate: () => false },
        then: {
            mode: 'soft-disabled',
            title: 'Feature Locked',
            message: 'Upgrade your plan to unlock this feature.',
            actions: [
                { label: 'Upgrade', onClick: ..., variant: 'primary' },
                { label: 'Learn More', onClick: ..., variant: 'secondary' },
            ],
        },
    },
]

<AccessGuard guards={guard}>
    <button>Click to open popup</button>
</AccessGuard>`,
    tooltip: `const guard: Guard[] = [
    {
        when: { type: 'custom', predicate: () => false },
        then: { mode: 'tooltip', text: 'This feature is currently unavailable' },
    },
]

<AccessGuard guards={guard}>
    <button>Hover for tooltip</button>
</AccessGuard>`,
    conditionTypes: `// Capability-based
{ when: { type: 'capability', capabilities: ['admin', 'editor'] }, then: ... }

// Feature-flag-based
{ when: { type: 'feature', features: ['beta'] }, then: ... }

// Custom predicate
{ when: { type: 'custom', predicate: (access) => !access.features.premium }, then: ... }

// "unless" inverts the condition (guard applies when condition is NOT met)
{ unless: { type: 'capability', capabilities: ['admin'] }, then: { mode: 'disabled' } }`,
}
