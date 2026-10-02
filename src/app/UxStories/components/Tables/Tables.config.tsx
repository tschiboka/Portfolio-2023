import type { ReactNode } from 'react'
import type { CellValue, CellVariant, CellMeta, TableAction, SortDirection } from '@common-ux'
import { Pill } from '@common-ux'
import type { Optional, Dictionary, Sortable } from '@common-utils'
import type { Row, VariantRow, ActionRow, SelectionRow, AllFeaturesRow } from './Tables.types'

const statusPillColors: Dictionary<'success' | 'error' | 'orange'> = {
    active: 'success',
    inactive: 'error',
    pending: 'orange',
    error: 'error',
}

const renderStatus = (cell: CellValue<Row>): ReactNode => (
    <Pill label={String(cell).toUpperCase()} color={statusPillColors[cell] || 'accent'} />
)

const renderBadge = (cell: CellValue<Row>): ReactNode => (
    <Pill label={String(cell)} color="purple" />
)

const statusToVariant: Dictionary<CellVariant> = {
    active: 'primary',
    pending: 'secondary',
    inactive: 'disabled',
    error: 'danger',
}

const cellVariantFn = (
    _cell: CellValue<VariantRow>,
    meta: CellMeta<VariantRow>,
): Optional<CellVariant> => statusToVariant[meta.row.status]

const rowVariantFn = (meta: CellMeta<VariantRow>): Optional<CellVariant> =>
    statusToVariant[meta.row.status]

const clickAction: TableAction<ActionRow>[] = [
    {
        id: 'onClick',
        label: 'Click me',
        onClick: ({ row }) => alert(`Clicked ${row.name}`),
    },
]

const hrefAction: TableAction<ActionRow>[] = [
    {
        id: 'href',
        label: 'Open link',
        href: ({ row }) => `#${row.name.toLowerCase()}`,
    },
]

const filterAction: TableAction<ActionRow>[] = [
    {
        id: 'filter',
        label: 'Activate',
        filter: ({ row }) => row.name === 'Visible row',
    },
]

const disabledItemAction: TableAction<ActionRow>[] = [
    {
        id: 'disabled',
        label: 'Delete',
        variant: 'danger',
        isDisabled: ({ row }) => row.name === 'Disabled action',
    },
]

const variantActions: TableAction<ActionRow>[] = [
    { id: 'primary', label: 'Primary', variant: 'primary' },
    { id: 'secondary', label: 'Secondary', variant: 'secondary' },
    { id: 'danger', label: 'Danger', variant: 'danger' },
    { id: 'default', label: 'Default' },
]

const allActions: TableAction<Row>[] = [
    {
        id: 'onClick',
        label: 'Edit',
        variant: 'primary',
        onClick: ({ row }) => alert(`Editing ${row.name}`),
    },
    {
        id: 'href',
        label: 'View',
        variant: 'secondary',
        href: ({ row }) => `#${row.name.toLowerCase()}`,
    },
    {
        id: 'filter',
        label: 'Activate',
        filter: ({ row }) => row.status !== 'active',
    },
    {
        id: 'disabled',
        label: 'Delete',
        variant: 'danger',
        isDisabled: ({ row }) => row.status === 'active',
    },
]

const getSelectionRowId = (row: SelectionRow) => row.id

const selectionActions: TableAction<SelectionRow>[] = [
    {
        id: 'edit',
        label: 'Edit',
        variant: 'primary',
        onClick: ({ row }) => alert(`Editing ${row.name}`),
    },
    {
        id: 'delete',
        label: 'Delete',
        variant: 'danger',
        onClick: ({ row }) => alert(`Deleting ${row.name}`),
    },
]

const allFeaturesStatusPill = (cell: CellValue<AllFeaturesRow>): ReactNode => (
    <Pill label={String(cell).toUpperCase()} color={statusPillColors[cell] || 'accent'} />
)

const allFeaturesStatusVariant = (
    _cell: CellValue<AllFeaturesRow>,
    meta: CellMeta<AllFeaturesRow>,
): Optional<CellVariant> => {
    if (meta.row.status === 'inactive') return 'disabled'
    if (meta.row.status === 'pending') return 'secondary'
    if (meta.row.status === 'error') return 'danger'
    return undefined
}

const allFeaturesRowVariant = (meta: CellMeta<AllFeaturesRow>): Optional<CellVariant> => {
    if (meta.row.status === 'inactive') return 'disabled'
    if (meta.row.status === 'error') return 'danger'
    return undefined
}

const allFeaturesActions: TableAction<AllFeaturesRow>[] = [
    {
        id: 'edit',
        label: 'Edit',
        variant: 'primary',
        onClick: ({ row }) => alert(`Editing ${row.name}`),
    },
    {
        id: 'view',
        label: 'View profile',
        variant: 'secondary',
        href: ({ row }) => `#user-${row.id}`,
    },
    {
        id: 'activate',
        label: 'Activate',
        filter: ({ row }) => row.status !== 'active',
    },
    {
        id: 'delete',
        label: 'Delete',
        variant: 'danger',
        isDisabled: ({ row }) => row.status === 'active',
    },
]

const sortRows = <T extends Record<string, Sortable>>(
    data: T[],
    column: keyof T,
    direction: SortDirection,
): T[] =>
    [...data].sort((a, b) => {
        const aVal = String(a[column] ?? '')
        const bVal = String(b[column] ?? '')
        const cmp = aVal.localeCompare(bVal, undefined, { numeric: true })
        return direction === 'asc' ? cmp : -cmp
    })

export const TablesConfig = {
    renderStatus,
    renderBadge,
    cellVariantFn,
    rowVariantFn,
    clickAction,
    hrefAction,
    filterAction,
    disabledItemAction,
    variantActions,
    allActions,
    getSelectionRowId,
    selectionActions,
    allFeaturesStatusPill,
    allFeaturesStatusVariant,
    allFeaturesRowVariant,
    allFeaturesActions,
    sortRows,
}
