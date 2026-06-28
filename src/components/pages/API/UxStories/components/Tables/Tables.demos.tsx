import { useMemo, useState } from 'react'
import { Table } from '@common/ux/Table'
import type { SortDirection, TableColumns } from '@common/ux/Table/Table.types'
import { Pill } from '@common/ux'
import { toUpper } from 'ramda'
import {
    type SelectionRow,
    selectionRows,
    type AllFeaturesRow,
    allFeaturesData,
    type PaginationRow,
    allPaginationRows,
    paginationColumns,
    type SortingRow,
    sortingRows,
} from './Tables.mocks'
import {
    getSelectionRowId,
    selectionActions,
    allFeaturesStatusPill,
    allFeaturesStatusVariant,
    allFeaturesRowVariant,
    allFeaturesActions,
    sortRows,
} from './Tables.config'

export const MultipleSelectionDemo = () => {
    const [selected, setSelected] = useState<string[]>([])
    return (
        <Table<SelectionRow>
            ariaLabel="Table with multiple row selection"
            data={selectionRows}
            columns={[
                { header: 'Name', accessor: 'name' },
                { header: 'Role', accessor: 'role' },
                { header: 'Status', accessor: 'status' },
            ]}
            selection={{
                getRowId: getSelectionRowId,
                selectedRowIds: selected,
                onChange: setSelected,
            }}
            title="Multiple Selection"
        />
    )
}

export const SingleSelectionDemo = () => {
    const [selected, setSelected] = useState<string[]>([])
    return (
        <Table<SelectionRow>
            ariaLabel="Table with single row selection"
            data={selectionRows}
            columns={[
                { header: 'Name', accessor: 'name' },
                { header: 'Role', accessor: 'role' },
                { header: 'Status', accessor: 'status' },
            ]}
            selection={{
                mode: 'single',
                getRowId: getSelectionRowId,
                selectedRowIds: selected,
                onChange: setSelected,
            }}
            title="Single Selection"
        />
    )
}

export const SelectableDemo = () => {
    const [selected, setSelected] = useState<string[]>([])
    return (
        <Table<SelectionRow>
            ariaLabel="Table with conditionally selectable rows"
            data={selectionRows}
            columns={[
                { header: 'Name', accessor: 'name' },
                { header: 'Role', accessor: 'role' },
                {
                    header: 'Status',
                    accessor: 'status',
                    variant: (_, { row }) => (row.status === 'inactive' ? 'disabled' : undefined),
                },
            ]}
            selection={{
                getRowId: getSelectionRowId,
                selectedRowIds: selected,
                onChange: setSelected,
                isRowSelectable: ({ row }) => row.status !== 'inactive',
            }}
            title="isRowSelectable"
        />
    )
}

export const SelectionWithActionsDemo = () => {
    const [selected, setSelected] = useState<string[]>([])
    return (
        <Table<SelectionRow>
            ariaLabel="Table with selection and actions"
            data={selectionRows}
            columns={[
                { header: 'Name', accessor: 'name' },
                { header: 'Role', accessor: 'role' },
                { header: 'Status', accessor: 'status' },
            ]}
            selection={{
                getRowId: getSelectionRowId,
                selectedRowIds: selected,
                onChange: setSelected,
            }}
            actions={selectionActions}
            title="Selection with Actions"
        />
    )
}

const usePagination = (allRows: PaginationRow[], initialPageSize = 10) => {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(initialPageSize)
    const totalItems = allRows.length
    const totalPages = Math.ceil(totalItems / pageSize)
    const pageData = allRows.slice((page - 1) * pageSize, page * pageSize)
    const onPageSizeChange = (size: number) => {
        setPageSize(size)
        setPage(1)
    }
    return { page, pageSize, totalItems, totalPages, pageData, setPage, onPageSizeChange }
}

export const PaginationDemo = () => {
    const p = usePagination(allPaginationRows)
    return (
        <Table<PaginationRow>
            ariaLabel="Paginated table"
            data={p.pageData}
            columns={paginationColumns}
            pagination={{
                page: p.page,
                totalPages: p.totalPages,
                pageSize: p.pageSize,
                totalItems: p.totalItems,
                onPageChange: p.setPage,
                onPageSizeChange: p.onPageSizeChange,
            }}
            title="Pagination"
        />
    )
}

export const CustomPageSizeDemo = () => {
    const p = usePagination(allPaginationRows, 5)
    return (
        <Table<PaginationRow>
            ariaLabel="Table with custom page size options"
            data={p.pageData}
            columns={paginationColumns}
            pagination={{
                page: p.page,
                totalPages: p.totalPages,
                pageSize: p.pageSize,
                pageSizeOptions: [5, 15, 30],
                totalItems: p.totalItems,
                onPageChange: p.setPage,
                onPageSizeChange: p.onPageSizeChange,
            }}
            title="Custom Page Sizes"
        />
    )
}

export const SmallDatasetPaginationDemo = () => {
    const rows = allPaginationRows.slice(0, 3)
    const p = usePagination(rows)
    return (
        <Table<PaginationRow>
            ariaLabel="Paginated table with few items"
            data={p.pageData}
            columns={paginationColumns}
            pagination={{
                page: p.page,
                totalPages: p.totalPages,
                pageSize: p.pageSize,
                totalItems: p.totalItems,
                onPageChange: p.setPage,
                onPageSizeChange: p.onPageSizeChange,
            }}
            title="Small Dataset"
        />
    )
}

export const NoTotalItemsDemo = () => {
    const p = usePagination(allPaginationRows)
    return (
        <Table<PaginationRow>
            ariaLabel="Paginated table without total item count"
            data={p.pageData}
            columns={paginationColumns}
            pagination={{
                page: p.page,
                totalPages: p.totalPages,
                pageSize: p.pageSize,
                onPageChange: p.setPage,
                onPageSizeChange: p.onPageSizeChange,
            }}
            title="No Total Items"
        />
    )
}

export const AllFeaturesCombinedDemo = () => {
    const [selected, setSelected] = useState<string[]>([])
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [sortColumn, setSortColumn] = useState<keyof AllFeaturesRow>('name')
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
    const [isLoading, setIsLoading] = useState(false)
    const [cols, setCols] = useState<TableColumns<AllFeaturesRow>>([
        { header: 'Name', accessor: 'name', cell: toUpper, isSortable: true },
        { header: 'Email', accessor: 'email', variant: 'secondary', breakpoint: 'mx' },
        { header: 'Role', accessor: 'role', breakpoint: 'sm', isSortable: true },
        {
            header: 'Status',
            accessor: 'status',
            cell: allFeaturesStatusPill,
            variant: allFeaturesStatusVariant,
            isSortable: true,
        },
        { header: 'Department', accessor: 'department', defaultValue: 'N/A', breakpoint: 'lg' },
        { header: 'Joined', accessor: 'joined', defaultValue: 'N/A', breakpoint: 'mx' },
        { header: 'Phone', accessor: 'phone', defaultValue: 'N/A', breakpoint: 'lg' },
        { header: 'Location', accessor: 'location', defaultValue: 'N/A', breakpoint: 'xl' },
        {
            header: 'Note',
            accessor: 'note',
            defaultValue: 'N/A',
            breakpoint: 'md',
            isActionDisabled: ({ row }) => row.status === 'inactive',
        },
    ])
    const [, setColWidths] = useState<Record<number, number>>({})

    const sorted = useMemo(
        () => sortRows(allFeaturesData, sortColumn, sortDirection),
        [sortColumn, sortDirection],
    )
    const totalItems = sorted.length
    const totalPages = Math.ceil(totalItems / pageSize)
    const pageData = sorted.slice((page - 1) * pageSize, page * pageSize)

    const handleRefresh = () => {
        setIsLoading(true)
        setTimeout(() => setIsLoading(false), 1500)
    }

    return (
        <Table<AllFeaturesRow>
            title="All Features Combined"
            id="full-demo-table"
            ariaLabel="Full feature table"
            rowAriaLabel="User row"
            data={pageData}
            columns={cols}
            isLoading={isLoading}
            onRefresh={handleRefresh}
            onColumnResize={(index, width) => {
                setColWidths((prev) => ({ ...prev, [index]: width }))
            }}
            onColumnReorder={(from, to) => {
                setCols((prev) => {
                    const next = [...prev]
                    const [moved] = next.splice(from, 1)
                    next.splice(to, 0, moved)
                    return next
                })
            }}
            rowVariant={allFeaturesRowVariant}
            selection={{
                getRowId: (row) => row.id,
                selectedRowIds: selected,
                onChange: setSelected,
                isRowSelectable: ({ row }) => row.status !== 'inactive',
            }}
            actions={allFeaturesActions}
            sorting={{
                column: sortColumn,
                direction: sortDirection,
                onSortChange: (col, dir) => {
                    setSortColumn(col)
                    setSortDirection(dir)
                    setPage(1)
                },
            }}
            filtering={{
                inputs: [
                    { key: 'name', label: 'Name', type: 'search', placeholder: 'Search name…' },
                    { key: 'email', label: 'Email', type: 'text', placeholder: 'Email…' },
                    {
                        key: 'role',
                        label: 'Role',
                        type: 'option',
                        options: [
                            { value: 'admin', label: 'Admin' },
                            { value: 'editor', label: 'Editor' },
                            { value: 'viewer', label: 'Viewer' },
                        ],
                    },
                    {
                        key: 'status',
                        label: 'Status',
                        type: 'option',
                        options: [
                            { value: 'active', label: 'Active' },
                            { value: 'inactive', label: 'Inactive' },
                            { value: 'pending', label: 'Pending' },
                        ],
                    },
                    { key: 'joinedFrom', label: 'Joined From', type: 'date', min: '2019-01-01' },
                    { key: 'joinedTo', label: 'Joined To', type: 'date', max: '2026-12-31' },
                    { key: 'hasPhone', label: 'Has Phone', type: 'checkbox' },
                ],
                onFilter: (values) => console.log('all features filter:', values),
            }}
            download={{
                options: [
                    { value: 'csv', label: 'CSV' },
                    { value: 'pdf', label: 'PDF' },
                ],
                onDownload: (value, data) => alert(`${value}: ${data.length} rows`),
            }}
            pagination={{
                page,
                totalPages,
                pageSize,
                pageSizeOptions: [5, 10, 15],
                totalItems,
                onPageChange: setPage,
                onPageSizeChange: (size) => {
                    setPageSize(size)
                    setPage(1)
                },
            }}
        >
            <Table.Header>
                A kitchen-sink demo combining every Table feature in one place.
            </Table.Header>
            <Table.Legend>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Pill label="ACTIVE" color="success" /> = 9
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Pill label="PENDING" color="orange" /> = 2
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Pill label="INACTIVE" color="error" /> = 3
                    </span>
                </div>
            </Table.Legend>
        </Table>
    )
}

export const BasicSortingDemo = () => {
    const [column, setColumn] = useState<keyof SortingRow>('name')
    const [direction, setDirection] = useState<SortDirection>('asc')
    const sorted = useMemo(() => sortRows(sortingRows, column, direction), [column, direction])

    return (
        <Table<SortingRow>
            ariaLabel="Table with basic column sorting"
            data={sorted}
            columns={[
                { header: 'Name', accessor: 'name', isSortable: true },
                { header: 'Age', accessor: 'age', isSortable: true },
                { header: 'Score', accessor: 'score', isSortable: true },
                { header: 'Status', accessor: 'status' },
            ]}
            sorting={{
                column,
                direction,
                onSortChange: (col, dir) => {
                    setColumn(col)
                    setDirection(dir)
                },
            }}
            title="Basic Sorting"
        />
    )
}

export const MixedSortableDemo = () => {
    const [column, setColumn] = useState<keyof SortingRow>('name')
    const [direction, setDirection] = useState<SortDirection>('asc')
    const sorted = useMemo(() => sortRows(sortingRows, column, direction), [column, direction])

    return (
        <Table<SortingRow>
            ariaLabel="Table with some sortable and some non-sortable columns"
            data={sorted}
            columns={[
                { header: 'Name', accessor: 'name', isSortable: true },
                { header: 'Age', accessor: 'age' },
                { header: 'Score', accessor: 'score', isSortable: true },
                { header: 'Status', accessor: 'status' },
            ]}
            sorting={{
                column,
                direction,
                onSortChange: (col, dir) => {
                    setColumn(col)
                    setDirection(dir)
                },
            }}
            title="Mixed Sortable Columns"
        />
    )
}

export const SortingWithSelectionDemo = () => {
    const [column, setColumn] = useState<keyof SortingRow>('name')
    const [direction, setDirection] = useState<SortDirection>('asc')
    const [selected, setSelected] = useState<string[]>([])
    const sorted = useMemo(() => sortRows(sortingRows, column, direction), [column, direction])

    return (
        <Table<SortingRow>
            ariaLabel="Table with sorting and row selection"
            data={sorted}
            columns={[
                { header: 'Name', accessor: 'name', isSortable: true },
                { header: 'Age', accessor: 'age', isSortable: true },
                { header: 'Score', accessor: 'score', isSortable: true },
                { header: 'Status', accessor: 'status' },
            ]}
            sorting={{
                column,
                direction,
                onSortChange: (col, dir) => {
                    setColumn(col)
                    setDirection(dir)
                },
            }}
            selection={{
                getRowId: (row) => row.name,
                selectedRowIds: selected,
                onChange: setSelected,
            }}
            title="Sorting with Selection"
        />
    )
}

export const SortingWithPaginationDemo = () => {
    const [column, setColumn] = useState<keyof SortingRow>('name')
    const [direction, setDirection] = useState<SortDirection>('asc')
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(3)
    const sorted = useMemo(() => sortRows(sortingRows, column, direction), [column, direction])
    const totalPages = Math.ceil(sorted.length / pageSize)
    const pageData = sorted.slice((page - 1) * pageSize, page * pageSize)

    return (
        <Table<SortingRow>
            ariaLabel="Table with sorting and pagination"
            data={pageData}
            columns={[
                { header: 'Name', accessor: 'name', isSortable: true },
                { header: 'Age', accessor: 'age', isSortable: true },
                { header: 'Score', accessor: 'score', isSortable: true },
                { header: 'Status', accessor: 'status' },
            ]}
            sorting={{
                column,
                direction,
                onSortChange: (col, dir) => {
                    setColumn(col)
                    setDirection(dir)
                    setPage(1)
                },
            }}
            pagination={{
                page,
                totalPages,
                pageSize,
                pageSizeOptions: [3, 5],
                totalItems: sorted.length,
                onPageChange: setPage,
                onPageSizeChange: (size) => {
                    setPageSize(size)
                    setPage(1)
                },
            }}
            title="Sorting with Pagination"
        />
    )
}
