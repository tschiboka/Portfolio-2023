import { ReactNode } from 'react'
import type { AccessibleProps } from '../index.types'

import type { DropdownOption } from './TableInputs/TableDropdown'

export type TableBreakpoint = 'xxs' | 'xs' | 'sm' | 'mx' | 'md' | 'lg' | 'xl' | 'xxl' | 'accordion'

export type CellValue<TData extends Record<string, ReactNode>> = TData[keyof TData]

export type CellMeta<TData extends Record<string, ReactNode>, TContext = unknown> = {
    cell: CellValue<TData>
    index: number
    row: TData
    data: TData[]
    context?: TContext
}

type Variant = 'primary' | 'secondary' | 'danger'
export type CellVariant = Variant | 'disabled'

export type TableColumn<TData extends Record<string, ReactNode>, TContext = unknown> = {
    header: string
    accessor: keyof TData
    cell?: (cell: CellValue<TData>, meta: CellMeta<TData, TContext>) => ReactNode
    filter?: (value: unknown) => boolean
    breakpoint?: TableBreakpoint
    defaultValue?: ReactNode
    isActionDisabled?: (meta: CellMeta<TData, TContext>) => boolean
    isSortable?: boolean
    variant?:
        | CellVariant
        | ((cell: CellValue<TData>, meta: CellMeta<TData, TContext>) => CellVariant | undefined)
}
export type TableColumns<TData extends Record<string, ReactNode>, TContext = unknown> = TableColumn<
    TData,
    TContext
>[]

type TableActionVariant = Variant
export type TableAction<TData extends Record<string, ReactNode>, TContext = unknown> = {
    id: string
    label: string
    icon?: ReactNode
    variant?: TableActionVariant
    onClick?: (meta: CellMeta<TData, TContext>) => void
    href?: (meta: CellMeta<TData, TContext>) => string
    filter?: (meta: CellMeta<TData, TContext>) => boolean
    isDisabled?: (meta: CellMeta<TData, TContext>) => boolean
}

export type TableSelectionMode = 'single' | 'multiple'

export type TableSelection<TData extends Record<string, ReactNode>, TContext = unknown> = {
    mode?: TableSelectionMode
    getRowId: (row: TData) => string
    selectedRowIds: string[]
    onChange: (selected: string[]) => void
    isRowSelectable?: (meta: CellMeta<TData, TContext>) => boolean
}

export type SortDirection = 'asc' | 'desc'

export type TableSorting<TData extends Record<string, ReactNode>> = {
    column: keyof TData
    direction: SortDirection
    onSortChange: (column: keyof TData, direction: SortDirection) => void
}

export type TableDownload<TData extends Record<string, ReactNode>> =
    | { onDownload: (data: TData[]) => void; label?: string }
    | {
          options: DropdownOption[]
          onDownload: (value: DropdownOption['value'], data: TData[]) => void
      }

export type TableFilteringInputType = 'text' | 'number' | 'option' | 'search' | 'date' | 'checkbox'

type FilteringInputBase = {
    key: string
    label: string
    required?: boolean
}

type FilteringTextInput = FilteringInputBase & {
    type: 'text'
    placeholder?: string
}

type FilteringNumberInput = FilteringInputBase & {
    type: 'number'
    min?: number
    max?: number
    placeholder?: string
}

type FilteringOptionInput = FilteringInputBase & {
    type: 'option'
    options: DropdownOption[]
}

type FilteringSearchInput = FilteringInputBase & {
    type: 'search'
    placeholder?: string
}

type FilteringDateInput = FilteringInputBase & {
    type: 'date'
    min?: string
    max?: string
}

type FilteringCheckboxInput = FilteringInputBase & {
    type: 'checkbox'
}

export type TableFilteringInput =
    | FilteringTextInput
    | FilteringNumberInput
    | FilteringOptionInput
    | FilteringSearchInput
    | FilteringDateInput
    | FilteringCheckboxInput

export type TableFiltering = {
    inputs: TableFilteringInput[]
    onFilter: (values: Record<string, unknown>) => void
}

export type TablePagination = {
    page: number
    totalPages: number
    pageSize?: number
    pageSizeOptions?: number[]
    totalItems?: number
    onPageChange: (page: number) => void
    onPageSizeChange: (size: number) => void
}

export interface Table<
    TData extends Record<string, ReactNode>,
    TContext = unknown,
> extends AccessibleProps {
    id?: string
    data: Array<TData>
    columns: TableColumns<TData, TContext>
    title?: string
    description?: ReactNode
    onInfo?: () => void
    legend?: ReactNode
    context?: TContext
    rowAriaLabel?: string
    actions?: TableAction<TData, TContext>[]
    emptyState?: ReactNode
    rowVariant?: (meta: CellMeta<TData, TContext>) => CellVariant | undefined
    selection?: TableSelection<TData, TContext>
    sorting?: TableSorting<TData>
    filtering?: TableFiltering
    download?: TableDownload<TData>
    pagination?: TablePagination
}
