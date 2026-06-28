export const Code = {
    Controller: {
        basic: `const controller = useTableController({
    sorting: { default: { column: 'datetime', direction: 'desc' } },
    pagination: { pageSize: 10 },
    filters: {
        path: text({ label: 'Path', placeholder: 'Filter by path...' }),
        type: select({
            label: 'Type',
            options: [
                { label: 'Visit', value: 'visit' },
                { label: 'Like', value: 'like' },
            ],
        }),
    },
    toParams: (state) => ({
        sortBy: state.sorting.column,
        asc: state.sorting.direction === 'asc' ? 'true' : undefined,
        page: String(state.pagination.page),
        pageSize: String(state.pagination.pageSize),
        ...state.filters,
    }),
})

// Use params for the API query
const { data } = useQuery(controller.params)

// Pass controller to the Table
<Table
    data={data}
    controller={controller}
    columns={[...]}
/>`,
    },
    Fundamentals: {
        noTitle: `<Table<Row>
    ariaLabel="Table without a visible title"
    data={rows}
    columns={[
        { header: 'Name', accessor: 'name' },
        { header: 'Value', accessor: 'value' },
        { header: 'Status', accessor: 'status' },
    ]}
/>`,
        emptyState: `<Table<Row>
    data={[]}
    columns={[...]}
    title="Empty State"
/>`,
        customEmptyState: `emptyState={
    <em>Nothing to display — try adjusting your filters.</em>
}`,
        basicUsage: `<Table<Row>
    ariaLabel="Basic table"
    data={rows}
    columns={[
        { header: 'Name', accessor: 'name' },
        { header: 'Value', accessor: 'value' },
        { header: 'Status', accessor: 'status' },
    ]}
    title="Basic Usage"
/>`,
        description: `<Table.Header>Overview of the first four entries sorted by name.</Table.Header>`,
        descriptionWithDownload: `<Table.Header>
    Showing <strong>{rows.length}</strong> rows
    — click the download icon to export.
</Table.Header>
download={{
    label: 'Export CSV',
    onDownload: (data) => { /* handle export */ },
}}`,
        infoButton: `<Table.Info text="Click for more information about this table." />`,
        legend: `<Table.Legend>
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Pill label="ACTIVE" color="success" /> = 21
        </span>
        <span ...>
            <Pill label="PENDING" color="orange" /> = 8
        </span>
        ...
    </div>
</Table.Legend>`,
    },
    Filtering: {
        text: `filtering={{
    inputs: [
        { key: 'name', label: 'Name', type: 'text', placeholder: 'Enter name…' },
    ],
    onFilter: (values) => console.log(values),
}}`,
        number: `filtering={{
    inputs: [
        { key: 'minValue', label: 'Min Value', type: 'number', min: 0, max: 100 },
    ],
    onFilter: (values) => console.log(values),
}}`,
        search: `filtering={{
    inputs: [
        { key: 'query', label: 'Search', type: 'search', placeholder: 'Search rows…' },
    ],
    onFilter: (values) => console.log(values),
}}`,
        option: `filtering={{
    inputs: [
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
    ],
    onFilter: (values) => console.log(values),
}}`,
        date: `filtering={{
    inputs: [
        { key: 'from', label: 'From', type: 'date', min: '2020-01-01' },
        { key: 'to', label: 'To', type: 'date', max: '2026-12-31' },
    ],
    onFilter: (values) => console.log(values),
}}`,
        checkbox: `filtering={{
    inputs: [
        { key: 'activeOnly', label: 'Active only', type: 'checkbox' },
    ],
    onFilter: (values) => console.log(values),
}}`,
        allTypes: `filtering={{
    inputs: [
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'minValue', label: 'Min Value', type: 'number', min: 0 },
        { key: 'query', label: 'Search', type: 'search' },
        { key: 'status', label: 'Status', type: 'option', options: [...] },
        { key: 'from', label: 'From Date', type: 'date' },
        { key: 'activeOnly', label: 'Active only', type: 'checkbox' },
    ],
    onFilter: (values) => console.log(values),
}}`,
    },
    CellRenderingDefaults: {
        customRenderers: `columns={[
    { header: 'Name', accessor: 'name', cell: toUpper },
    { header: 'Value', accessor: 'value', cell: renderBadge },
    { header: 'Status', accessor: 'status', cell: renderStatus },
]}`,
        defaultValues: `columns={[
    { header: 'Scenario', accessor: 'label' },
    { header: 'defaultValue: "N/A"', accessor: 'withDefault', defaultValue: 'N/A' },
    { header: 'No defaultValue', accessor: 'noDefault' },
    {
        header: 'cell renderer',
        accessor: 'withRenderer',
        cell: (v) => <em>{v === null ? '(null received)' : String(v) || '(empty)'}</em>,
    },
]}`,
    },
    Responsive: {
        breakpoints: `columns={[
    { header: 'Property', accessor: 'property' },
    { header: '2xs', accessor: '2xs', breakpoint: '2xs' },
    { header: 'xs', accessor: 'xs', breakpoint: 'xs' },
    { header: 'sm', accessor: 'sm', breakpoint: 'sm' },
    // mx, md, lg, xl, 2xl...
]}`,
        accordion: `columns={[
    { header: 'Name', accessor: 'name' },
    { header: 'Value', accessor: 'value' },
    { header: 'Status', accessor: 'status', breakpoint: 'accordion' },
    { header: 'Note', accessor: 'note', breakpoint: 'accordion' },
]}`,
    },
    Variants: {
        columnStatic: `columns={[
    { header: 'Default', accessor: 'label' },
    { header: 'Primary', accessor: 'label', variant: 'primary' },
    { header: 'Secondary', accessor: 'label', variant: 'secondary' },
    { header: 'Danger', accessor: 'label', variant: 'danger' },
    { header: 'Disabled', accessor: 'label', variant: 'disabled' },
]}`,
        rowVariants: `const rowVariantFn = ({ row }) =>
    row.status === 'error' ? 'danger'
    : row.status === 'inactive' ? 'disabled'
    : undefined

<Table rowVariant={rowVariantFn} ... />`,
        cellDynamic: `const cellVariantFn = (value, { row }) =>
    row.status === 'error' ? 'danger'
    : row.status === 'inactive' ? 'disabled'
    : 'primary'

{ header: 'Description', accessor: 'description', variant: cellVariantFn }`,
        priority: `// Priority: cell function > static column > row variant
<Table
    rowVariant={rowVariantFn}
    columns={[
        { header: 'Label', accessor: 'label', variant: 'secondary' },
        { header: 'Status', accessor: 'status' },
        { header: 'Description', accessor: 'description', variant: cellVariantFn },
    ]}
/>`,
    },
    Actions: {
        isActionDisabled: `{
    header: 'Function',
    accessor: 'function',
    isActionDisabled: ({ row }) => row.name === 'Disabled row',
}`,
        onClick: `actions={[
    {
        id: 'view',
        label: 'View details',
        onClick: ({ row }) => console.log('Clicked', row),
    },
]}`,
        href: `actions={[
    {
        id: 'open',
        label: 'Open link',
        href: ({ row }) => '/items/' + row.id,
    },
]}`,
        filter: `actions={[
    {
        id: 'approve',
        label: 'Approve',
        filter: ({ row }) => row.status === 'pending',
        onClick: ({ row }) => console.log('Approved', row),
    },
]}`,
        isDisabled: `actions={[
    {
        id: 'edit',
        label: 'Edit',
        isDisabled: ({ row }) => row.status === 'locked',
        onClick: ({ row }) => console.log('Edit', row),
    },
]}`,
        variants: `actions={[
    { id: 'view', label: 'View', variant: 'primary', onClick: ... },
    { id: 'edit', label: 'Edit', variant: 'secondary', onClick: ... },
    { id: 'delete', label: 'Delete', variant: 'danger', onClick: ... },
]}`,
        allCombined: `actions={[
    { id: 'view', label: 'View', onClick: ... },
    { id: 'open', label: 'Open link', href: ... },
    { id: 'approve', label: 'Approve', filter: ..., onClick: ... },
    { id: 'edit', label: 'Edit', isDisabled: ..., onClick: ... },
    { id: 'delete', label: 'Delete', variant: 'danger', onClick: ... },
]}`,
    },
    Selection: {
        multiple: `selection={{
    getRowId: (row) => row.id,
    selectedRowIds: selected,
    onChange: setSelected,
}}`,
        single: `selection={{
    mode: 'single',
    getRowId: (row) => row.id,
    selectedRowIds: selected,
    onChange: setSelected,
}}`,
        isRowSelectable: `selection={{
    getRowId: (row) => row.id,
    selectedRowIds: selected,
    onChange: setSelected,
    isRowSelectable: ({ row }) => row.status !== 'inactive',
}}`,
        withActions: `selection={{
    getRowId: (row) => row.id,
    selectedRowIds: selected,
    onChange: setSelected,
}}
actions={[...]}`,
    },
    Pagination: {
        basic: `pagination={{
    page,
    totalPages,
    pageSize,
    totalItems,
    onPageChange: setPage,
    onPageSizeChange: (size) => {
        setPageSize(size)
        setPage(1)
    },
}}`,
        customPageSize: `pagination={{
    ...
    pageSizeOptions: [5, 15, 30],
    ...
}}`,
        smallDataset: `// When data fits on one page, nav buttons are disabled
pagination={{
    page: 1,
    totalPages: 1,
    pageSize: 10,
    totalItems: 3,
    ...
}}`,
        noTotalItems: `// Omit totalItems to hide "Showing x-y of z"
pagination={{
    page,
    totalPages,
    pageSize,
    // no totalItems
    onPageChange: setPage,
    onPageSizeChange: ...,
}}`,
    },
    Sorting: {
        basic: `columns={[
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
}}`,
        mixedSortable: `columns={[
    { header: 'Name', accessor: 'name', isSortable: true },
    { header: 'Age', accessor: 'age' },              // not sortable
    { header: 'Score', accessor: 'score', isSortable: true },
    { header: 'Status', accessor: 'status' },         // not sortable
]}`,
        withSelection: `sorting={{
    column,
    direction,
    onSortChange: (col, dir) => { ... },
}}
selection={{
    getRowId: (row) => row.name,
    selectedRowIds: selected,
    onChange: setSelected,
}}`,
        withPagination: `sorting={{
    column,
    direction,
    onSortChange: (col, dir) => {
        setColumn(col)
        setDirection(dir)
        setPage(1) // reset to page 1 on sort change
    },
}}
pagination={{
    page,
    totalPages,
    pageSize,
    ...
}}`,
    },
    ColumnCustomization: {
        resizeReorder: `<Table<Row>
    ariaLabel="Table with column resize and reorder"
    data={rows}
    columns={cols}
    enableColumnResize
    enableColumnReorder
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
    title="Column Customization"
/>`,
        usage: `// Optional — only render when needed
onColumnResize?: (columnIndex: number, width: number) => void
onColumnReorder?: (fromIndex: number, toIndex: number) => void`,
    },
    RefreshLoading: {
        refresh: `<Table<Row>
    ariaLabel="Table with refresh and skeleton"
    data={isLoading ? [] : rows}
    columns={[
        { header: 'Name', accessor: 'name' },
        { header: 'Value', accessor: 'value' },
        { header: 'Status', accessor: 'status' },
    ]}
    isLoading={isLoading}
    onRefresh={handleRefresh}
    pagination={{
        page: 1,
        totalPages: 1,
        pageSize: 5,
        onPageChange: () => {},
        onPageSizeChange: () => {},
    }}
    title="Refresh & Skeleton"
/>`,
        isLoading: `// Skeleton shown while loading, emptyState shown after
<Table
    isLoading={isLoading}
    emptyState={<em>No data available.</em>}
    ...
/>`,
    },
    Download: {
        single: `download={{
    onDownload: (data) => { /* handle download */ },
}}`,
        singleWithLabel: `download={{
    label: 'Download CSV',
    onDownload: (data) => { /* handle download */ },
}}`,
        multipleFormats: `download={{
    options: [
        { value: 'csv', label: 'CSV' },
        { value: 'pdf', label: 'PDF' },
        { value: 'excel', label: 'Excel' },
    ],
    onDownload: (value, data) => { /* handle format-specific download */ },
}}`,
        withoutTitle: `// download button renders even without title
<Table
    ariaLabel="Table with download but no title"
    data={rows}
    columns={[...]}
    download={{
        label: 'Export',
        onDownload: (data) => { /* handle export */ },
    }}
/>`,
    },
    Accessibility: {
        ariaLabel: `ariaLabel="User activity summary table"`,
        rowAriaLabel: `rowAriaLabel="User activity row"`,
        className: `className="danger-outline"
style={{ border: '2px solid var(--error)', borderRadius: '8px' }}`,
        style: `style={{
    border: '2px solid var(--orange)',
    borderRadius: '8px',
    boxShadow: '0 0 8px var(--orange-dark-3)',
}}`,
        id: `id="accessibility-id-demo"
ariaLabel="Table with id for anchor and aria-labelledby"
title="id"`,
        scopeCol: `// Every <th> has scope="col" automatically
// Utility columns (expand, actions) have descriptive aria-labels
actions={[
    { id: 'demo', label: 'View', variant: 'primary', onClick: ... },
]}`,
        actionMenuAria: `// kebab: aria-haspopup="true", aria-expanded
// dropdown: role="menu"
// items: role="menuitem", aria-label
actions={[
    { id: 'edit', label: 'Edit', variant: 'primary', onClick: ... },
    { id: 'delete', label: 'Delete', variant: 'danger', onClick: ... },
]}`,
        expandedRowAria: `// Caret button: aria-label="Expand row" / "Collapse row"
// Expanded <tr>: aria-label describes the row
// Spacer <td>: aria-hidden="true"
columns={[
    { header: 'Name', accessor: 'name' },
    { header: 'Value', accessor: 'value', breakpoint: '2xs' },
    { header: 'Status', accessor: 'status', breakpoint: '2xs' },
]}`,
        emptyStateRole: `// Empty placeholder cell gets role="status"
<Table
    data={[]}
    emptyState={<em>No records found</em>}
    ...
/>`,
    },
    AllFeaturesCombined: {
        demo: `<Table<AllFeaturesRow>
    id="full-demo-table"
    ariaLabel="Full feature table"
    rowAriaLabel="User row"
    data={pageData}
    columns={cols}
    isLoading={isLoading}
    onRefresh={handleRefresh}
    onColumnResize={(index, width) => setColWidths((prev) => ({ ...prev, [index]: width }))}
    onColumnReorder={(from, to) => {
        setCols((prev) => {
            const next = [...prev]
            const [moved] = next.splice(from, 1)
            next.splice(to, 0, moved)
            return next
        })
    }}
    rowVariant={rowVariantFn}
    selection={{ getRowId, selectedRowIds, onChange, isRowSelectable }}
    actions={[...]}
    sorting={{ column, direction, onSortChange }}
    filtering={{ inputs: [...], onFilter }}
    download={{ options: [...], onDownload }}
    pagination={{ page, totalPages, pageSize, totalItems, onPageChange, onPageSizeChange }}
    title="All Features Combined"
>
    <Table.Header>A kitchen-sink demo combining every Table feature.</Table.Header>
    <Table.Legend>
        <div>...</div>
    </Table.Legend>
</Table>`,
    },
}
