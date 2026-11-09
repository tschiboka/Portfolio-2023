import { ReactNode } from 'react'
import { PageMeta } from '@common-types'
import type { Dictionary, Optional, Predicate, ValueOf, VoidFunction } from '@common-utils'
import type { TableControl } from './Table.hooks.types'
import type { DropdownOption } from './TableInputs'
import type { AccessibleProps } from '../index.types'

export type TableBreakpoint = '2xs' | 'xs' | 'sm' | 'mx' | 'md' | 'lg' | 'xl' | '2xl' | 'accordion'
export type CellValue<TData extends Dictionary<ReactNode>> = ValueOf<TData>
export type CellMeta<TData extends Dictionary<ReactNode>, TContext = unknown> = {
    cell: CellValue<TData>
    index: number
    row: TData
    data: TData[]
    context?: TContext
}

type Variant = 'primary' | 'secondary' | 'danger'

export type CellVariant = Variant | 'disabled'
export type TableColumn<TData extends Dictionary<ReactNode>, TContext = unknown> = {
    header: string
    accessor: keyof TData
    cell?: (cell: CellValue<TData>, meta: CellMeta<TData, TContext>) => ReactNode
    filter?: Predicate<unknown>
    breakpoint?: TableBreakpoint
    defaultValue?: ReactNode
    isActionDisabled?: Predicate<CellMeta<TData, TContext>>
    isSortable?: boolean
    width?: string
    variant?:
        | CellVariant
        | ((cell: CellValue<TData>, meta: CellMeta<TData, TContext>) => Optional<CellVariant>)
}
export type TableColumns<TData extends Dictionary<ReactNode>, TContext = unknown> = TableColumn<
    TData,
    TContext
>[]

type TableActionVariant = Variant

export type TableAction<TData extends Dictionary<ReactNode>, TContext = unknown> = {
    id: string
    label: string
    icon?: ReactNode
    variant?: TableActionVariant
    onClick?: (meta: CellMeta<TData, TContext>) => void
    href?: (meta: CellMeta<TData, TContext>) => string
    filter?: Predicate<CellMeta<TData, TContext>>
    isDisabled?: Predicate<CellMeta<TData, TContext>>
}

export type TableSelectionMode = 'single' | 'multiple'

export type TableSelection<TData extends Dictionary<ReactNode>, TContext = unknown> = {
    mode?: TableSelectionMode
    getRowId: (row: TData) => string
    selectedRowIds: string[]
    onChange: (selected: string[]) => void
    isRowSelectable?: Predicate<CellMeta<TData, TContext>>
}

export type SortDirection = 'asc' | 'desc'

export type TableSorting<TData extends Dictionary<ReactNode>> = {
    column: keyof TData
    direction: SortDirection
    onSortChange: (column: keyof TData, direction: SortDirection) => void
}

export type TableDownload<TData extends Dictionary<ReactNode>> =
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
    span?: 1 | 2 | 3 | 4
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
    values?: Dictionary
    onFilter: (values: Dictionary) => void
}

export type TablePagination = {
    pageNumber: number
    totalPages: number
    pageSize?: number
    pageSizeOptions?: number[]
    totalItems?: number
    onPageChange: (pageNumber: number) => void
    onPageSizeChange: (size: number) => void
}

export interface Table<
    TData extends Dictionary<ReactNode>,
    TContext = unknown,
> extends AccessibleProps {
    id?: string
    data?: Array<TData>
    columns: TableColumns<TData, TContext>
    children?: ReactNode
    context?: TContext
    rowAriaLabel?: string
    emptyState?: ReactNode
    isLoading?: boolean
    title?: string
    selection?: TableSelection<TData, TContext>
    download?: TableDownload<TData>
    rowVariant?: (meta: CellMeta<TData, TContext>) => Optional<CellVariant>
    onRefresh?: VoidFunction
    enableColumnResize?: boolean
    enableColumnReorder?: boolean
    onColumnResize?: (columnIndex: number, width: number) => void
    onColumnReorder?: (columnIndex: number, toIndex: number) => void
    controller?: TableControl
    meta?: PageMeta
    sorting?: TableSorting<TData>
    filtering?: TableFiltering
    pagination?: TablePagination
    actions?: TableAction<TData, TContext>[]
}
