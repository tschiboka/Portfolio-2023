import { CodeText } from '@common-ux'
import type { TableColumns } from '@common-ux'
import type { NameSpaceRow, NamespaceGuideRow } from './TestAccessor.types'

const codeCell = (value: string) => <CodeText>{value}</CodeText>

const nameSpace: TableColumns<NameSpaceRow> = [
    { header: 'Name', accessor: 'name', cell: codeCell },
    { header: 'Purpose', accessor: 'purpose' },
    { header: 'Sync/Async', accessor: 'sync' },
    { header: 'Type', accessor: 'type' },
]

const namespaceGuide: TableColumns<NamespaceGuideRow> = [
    { header: "If you're...", accessor: 'situation' },
    { header: 'Use', accessor: 'use', cell: codeCell },
]

export const TestAccessorColumns = { nameSpace, namespaceGuide }
