import { CodeText } from '@common-ux'
import type { TableColumns } from '@common-ux'

/** One accessor namespace, as a documentation row. */
export type NameSpaceRow = {
    name: string
    purpose: string
    sync: string
    type: string
}

/** One "if you're…" entry, as a documentation row. */
export type NamespaceGuideRow = {
    situation: string
    use: string
}

export const NameSpaceRows: NameSpaceRow[] = [
    { name: 'Get', purpose: 'Read DOM state', sync: 'Sync', type: 'Authored' },
    { name: 'Do', purpose: 'Simulate user actions', sync: 'Async', type: 'Authored' },
    { name: 'Set', purpose: 'Pre-render setup/mocking', sync: 'Sync', type: 'Authored' },
    { name: 'Has', purpose: 'Check element existence', sync: 'Sync', type: 'Derived' },
    { name: 'Wait', purpose: 'Wait for element', sync: 'Async', type: 'Derived' },
]

export const NamespaceGuideRows: NamespaceGuideRow[] = [
    { situation: 'Reading DOM state', use: 'Get' },
    { situation: 'Simulating interaction', use: 'Do' },
    { situation: 'Setting up before render', use: 'Set' },
]

const codeCell = (value: string) => <CodeText>{value}</CodeText>

export const NameSpaceColumns: TableColumns<NameSpaceRow> = [
    { header: 'Name', accessor: 'name', cell: codeCell },
    { header: 'Purpose', accessor: 'purpose' },
    { header: 'Sync/Async', accessor: 'sync' },
    { header: 'Type', accessor: 'type' },
]

export const NamespaceGuideColumns: TableColumns<NamespaceGuideRow> = [
    { header: "If you're...", accessor: 'situation' },
    { header: 'Use', accessor: 'use', cell: codeCell },
]
