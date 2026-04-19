export const Code = {
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
    title="Empty State"
    data={[]}
    columns={[...]}
/>`,
        customEmptyState: `emptyState={
    <em>Nothing to display — try adjusting your filters.</em>
}`,
        basicUsage: `<Table<Row>
    title="Basic Usage"
    ariaLabel="Basic table"
    data={rows}
    columns={[
        { header: 'Name', accessor: 'name' },
        { header: 'Value', accessor: 'value' },
        { header: 'Status', accessor: 'status' },
    ]}
/>`,
        description: `description="Overview of the first four entries sorted by name."`,
        descriptionWithDownload: `description={
    <>
        Showing <strong>{rows.length}</strong> rows
        — click the download icon to export.
    </>
}
download={{
    label: 'Export CSV',
    onDownload: (data) => { /* handle export */ },
}}`,
        infoButton: `onInfo={() => alert('Info clicked')}`,
        legend: `legend={
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Pill label="ACTIVE" color="success" /> = 21
        </span>
        <span ...>
            <Pill label="PENDING" color="orange" /> = 8
        </span>
        ...
    </div>
}`,
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
    { header: 'xxs', accessor: 'xxs', breakpoint: 'xxs' },
    { header: 'xs', accessor: 'xs', breakpoint: 'xs' },
    { header: 'sm', accessor: 'sm', breakpoint: 'sm' },
    // mx, md, lg, xl, xxl...
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
title="id"
ariaLabel="Table with id for anchor and aria-labelledby"`,
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
    { header: 'Value', accessor: 'value', breakpoint: 'xxs' },
    { header: 'Status', accessor: 'status', breakpoint: 'xxs' },
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
    title="All Features Combined"
    description="A kitchen-sink demo combining every Table feature."
    onInfo={() => alert('Info')}
    legend={<div>...</div>}
    ariaLabel="Full feature table"
    rowAriaLabel="User row"
    data={pageData}
    columns={[
        { header: 'Name', accessor: 'name', cell: toUpper, isSortable: true },
        { header: 'Email', accessor: 'email', variant: 'secondary', breakpoint: 'lg' },
        { header: 'Status', accessor: 'status', cell: statusPill, variant: statusVariant, isSortable: true },
        { header: 'Note', accessor: 'note', defaultValue: 'N/A', breakpoint: 'lg' },
        ...
    ]}
    rowVariant={rowVariantFn}
    selection={{ getRowId, selectedRowIds, onChange, isRowSelectable }}
    actions={[...]}
    sorting={{ column, direction, onSortChange }}
    filtering={{ inputs: [...], onFilter }}
    download={{ options: [...], onDownload }}
    pagination={{ page, totalPages, pageSize, totalItems, onPageChange, onPageSizeChange }}
/>`,
    },
}
