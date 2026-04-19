import type { ReactNode } from 'react'
import type {
    CellValue,
    CellVariant,
    CellMeta,
    TableAction,
    SortDirection,
} from '@common/ux/Table/Table.types'
import { Pill } from '@common/ux'
import type { Row, VariantRow, ActionRow, SelectionRow, AllFeaturesRow } from './Tables.mocks'

// ── Shared ───────────────────────────────────────────────────────────────────

export const statusPillColors: Record<string, 'success' | 'error' | 'orange'> = {
    active: 'success',
    inactive: 'error',
    pending: 'orange',
    error: 'error',
}

// ── Basic Renderers ──────────────────────────────────────────────────────────

export const renderStatus = (cell: CellValue<Row>): ReactNode => (
    <Pill label={String(cell).toUpperCase()} color={statusPillColors[cell] || 'accent'} />
)

export const renderBadge = (cell: CellValue<Row>): ReactNode => (
    <Pill label={String(cell)} color="purple" />
)

// ── Variant Functions ────────────────────────────────────────────────────────

export const statusToVariant: Record<string, CellVariant> = {
    active: 'primary',
    inactive: 'disabled',
    error: 'danger',
}

export const cellVariantFn = (
    _cell: CellValue<VariantRow>,
    meta: CellMeta<VariantRow>,
): CellVariant | undefined => statusToVariant[meta.row.status]

export const rowVariantFn = (meta: CellMeta<VariantRow>): CellVariant | undefined =>
    meta.row.status === 'error' ? 'danger' : meta.row.status === 'inactive' ? 'disabled' : undefined

// ── Action Configs ───────────────────────────────────────────────────────────

export const clickAction: TableAction<ActionRow>[] = [
    {
        id: 'onClick',
        label: 'Click me',
        onClick: ({ row }) => alert(`Clicked ${row.name}`),
    },
]

export const hrefAction: TableAction<ActionRow>[] = [
    {
        id: 'href',
        label: 'Open link',
        href: ({ row }) => `#${row.name.toLowerCase()}`,
    },
]

export const filterAction: TableAction<ActionRow>[] = [
    {
        id: 'filter',
        label: 'Activate',
        filter: ({ row }) => row.name === 'Visible row',
    },
]

export const disabledItemAction: TableAction<ActionRow>[] = [
    {
        id: 'disabled',
        label: 'Delete',
        variant: 'danger',
        isDisabled: ({ row }) => row.name === 'Disabled action',
    },
]

export const variantActions: TableAction<ActionRow>[] = [
    { id: 'primary', label: 'Primary', variant: 'primary' },
    { id: 'secondary', label: 'Secondary', variant: 'secondary' },
    { id: 'danger', label: 'Danger', variant: 'danger' },
    { id: 'default', label: 'Default' },
]

export const allActions: TableAction<Row>[] = [
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

// ── Selection ────────────────────────────────────────────────────────────────

export const getSelectionRowId = (row: SelectionRow) => row.id

export const selectionActions: TableAction<SelectionRow>[] = [
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

// ── All Features Combined ────────────────────────────────────────────────────

export const allFeaturesStatusPill = (cell: CellValue<AllFeaturesRow>): ReactNode => (
    <Pill label={String(cell).toUpperCase()} color={statusPillColors[cell] || 'accent'} />
)

export const allFeaturesStatusVariant = (
    _cell: CellValue<AllFeaturesRow>,
    meta: CellMeta<AllFeaturesRow>,
): CellVariant | undefined => {
    if (meta.row.status === 'inactive') return 'disabled'
    if (meta.row.status === 'pending') return 'secondary'
    if (meta.row.status === 'error') return 'danger'
    return undefined
}

export const allFeaturesRowVariant = (meta: CellMeta<AllFeaturesRow>): CellVariant | undefined => {
    if (meta.row.status === 'inactive') return 'disabled'
    if (meta.row.status === 'error') return 'danger'
    return undefined
}

export const allFeaturesActions: TableAction<AllFeaturesRow>[] = [
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

// ── Sorting ──────────────────────────────────────────────────────────────────

export const sortRows = <T extends Record<string, ReactNode>>(
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
