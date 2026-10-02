import type { NameSpaceRow, NamespaceGuideRow } from './TestAccessor.types'

const nameSpace: NameSpaceRow[] = [
    { name: 'Get', purpose: 'Read DOM state', sync: 'Sync', type: 'Authored' },
    { name: 'Do', purpose: 'Simulate user actions', sync: 'Async', type: 'Authored' },
    { name: 'Set', purpose: 'Pre-render setup/mocking', sync: 'Sync', type: 'Authored' },
    { name: 'Has', purpose: 'Check element existence', sync: 'Sync', type: 'Derived' },
    { name: 'Wait', purpose: 'Wait for element', sync: 'Async', type: 'Derived' },
]

const namespaceGuide: NamespaceGuideRow[] = [
    { situation: 'Reading DOM state', use: 'Get' },
    { situation: 'Simulating interaction', use: 'Do' },
    { situation: 'Setting up before render', use: 'Set' },
]

export const TestAccessorData = { nameSpace, namespaceGuide }
