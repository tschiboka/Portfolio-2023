// ── Basic ────────────────────────────────────────────────────────────────────

export type Row = {
    name: string
    value: string
    status: string
    note: string
}

export const rows: Row[] = [
    { name: 'Alpha', value: '10', status: 'active', note: 'First entry' },
    { name: 'Beta', value: '20', status: 'inactive', note: '' },
    { name: 'Gamma', value: '30', status: 'active', note: 'Third entry' },
    { name: 'Delta', value: '40', status: 'pending', note: '' },
]

// ── Breakpoints ──────────────────────────────────────────────────────────────

export type BreakpointRow = {
    property: string
    xxs: string
    xs: string
    sm: string
    mx: string
    md: string
    lg: string
    xl: string
    xxl: string
}

export const breakpointData: BreakpointRow[] = [
    {
        property: 'Min Width',
        xxs: '375px',
        xs: '420px',
        sm: '576px',
        mx: '670px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        xxl: '1580px',
    },
    {
        property: 'Device',
        xxs: 'Small mobile',
        xs: 'Mobile',
        sm: 'Mobile landscape',
        mx: 'Phablet',
        md: 'Tablet',
        lg: 'Small desktop',
        xl: 'Large desktop',
        xxl: 'Wide desktop',
    },
]

// ── Variants ─────────────────────────────────────────────────────────────────

export type VariantRow = {
    label: string
    variant: string
    description: string
    status: string
}

export const variantRows: VariantRow[] = [
    {
        label: 'Default',
        variant: 'none',
        description: 'Inherits the standard text colour',
        status: 'active',
    },
    {
        label: 'Primary',
        variant: 'primary',
        description: 'Accent colour for key values',
        status: 'active',
    },
    {
        label: 'Secondary',
        variant: 'secondary',
        description: 'Darker accent for supporting info',
        status: 'inactive',
    },
    {
        label: 'Danger',
        variant: 'danger',
        description: 'Red highlight for warnings or errors',
        status: 'error',
    },
    {
        label: 'Disabled',
        variant: 'disabled',
        description: 'Greyed out for inactive entries',
        status: 'inactive',
    },
]

// ── ARIA ─────────────────────────────────────────────────────────────────────

export type AriaRow = {
    component: string
    element: string
    attribute: string
    value: string
}

export const ariaReferenceRows: AriaRow[] = [
    {
        component: 'Table',
        element: '<div>',
        attribute: 'role',
        value: '"region"',
    },
    {
        component: 'Table',
        element: '<div>',
        attribute: 'aria-label',
        value: '{ariaLabel} prop',
    },
    {
        component: 'Table',
        element: '<div>',
        attribute: 'aria-labelledby',
        value: '{titleId} → <h2>',
    },
    {
        component: 'Table',
        element: '<table>',
        attribute: 'aria-labelledby',
        value: '{titleId} → <h2>',
    },
    {
        component: 'TableHead',
        element: '<th>',
        attribute: 'scope',
        value: '"col"',
    },
    {
        component: 'TableHead',
        element: '<th> expand',
        attribute: 'aria-label',
        value: '"Expand"',
    },
    {
        component: 'TableHead',
        element: '<th> actions',
        attribute: 'aria-label',
        value: '"Actions"',
    },
    {
        component: 'TableHead',
        element: '<th> sortable',
        attribute: 'aria-sort',
        value: '"ascending" / "descending"',
    },
    {
        component: 'TableHead',
        element: '<button> sort',
        attribute: 'aria-label',
        value: '"Sort by {header}"',
    },
    {
        component: 'TableHead',
        element: '<span> sort-icon',
        attribute: 'aria-hidden',
        value: '"true"',
    },
    {
        component: 'TableBody',
        element: '<td> empty',
        attribute: 'role',
        value: '"status"',
    },
    {
        component: 'TableRow',
        element: '<tr>',
        attribute: 'aria-label',
        value: '{rowAriaLabel} prop',
    },
    {
        component: 'TableRow',
        element: '<button> expand',
        attribute: 'aria-label',
        value: '"Expand row" / "Collapse row"',
    },
    {
        component: 'ExpandedRow',
        element: '<tr>',
        attribute: 'aria-label',
        value: '"Expanded details for row {n}"',
    },
    {
        component: 'ExpandedRow',
        element: '<td> spacer',
        attribute: 'aria-hidden',
        value: '"true"',
    },
    {
        component: 'TableActions',
        element: '<button> kebab',
        attribute: 'aria-label',
        value: '"Row actions"',
    },
    {
        component: 'TableActions',
        element: '<button> kebab',
        attribute: 'aria-haspopup',
        value: '"true"',
    },
    {
        component: 'TableActions',
        element: '<button> kebab',
        attribute: 'aria-expanded',
        value: '{isOpen} state',
    },
    {
        component: 'TableActions',
        element: '<ul> dropdown',
        attribute: 'role',
        value: '"menu"',
    },
    {
        component: 'TableActions',
        element: '<ul> dropdown',
        attribute: 'aria-label',
        value: '"Row actions menu"',
    },
    {
        component: 'TableActions',
        element: '<li>',
        attribute: 'role',
        value: '"none"',
    },
    {
        component: 'TableActions',
        element: '<button> action',
        attribute: 'role',
        value: '"menuitem"',
    },
    {
        component: 'TableActions',
        element: '<button> action',
        attribute: 'aria-label',
        value: '{action.label}',
    },
]

// ── Actions ──────────────────────────────────────────────────────────────────

export type ActionRow = {
    name: string
    function: string
}

export const actionRows: ActionRow[] = [
    { name: 'isActionDisabled', function: 'Disables the entire action menu for this row' },
    { name: 'onClick', function: 'Triggers a callback on click' },
    { name: 'href', function: 'Navigates to a computed URL' },
    { name: 'filter', function: 'Hidden for active rows' },
    { name: 'isDisabled', function: 'Greyed out for active rows' },
    { name: 'variant: primary', function: 'Accent coloured action' },
    { name: 'variant: secondary', function: 'Dark accent coloured action' },
    { name: 'variant: danger', function: 'Error coloured action' },
    { name: 'All props', function: 'All action features combined' },
]

export const isActionDisabledData: ActionRow[] = [
    { name: 'Enabled row', function: 'Action menu is active' },
    { name: 'Disabled row', function: 'Action menu is disabled and greyed out' },
]

export const onClickData: ActionRow[] = [
    { name: 'onClick', function: 'Triggers alert with row name' },
]

export const hrefData: ActionRow[] = [{ name: 'href', function: 'Navigates to computed URL' }]

export const filterData: ActionRow[] = [
    { name: 'Visible row', function: 'Action appears in the menu' },
    { name: 'Hidden row', function: 'Action is filtered out of the menu' },
]

export const isDisabledData: ActionRow[] = [
    { name: 'Enabled action', function: 'Action is clickable' },
    { name: 'Disabled action', function: 'Action is greyed out and unclickable' },
]

export const variantData: ActionRow[] = [
    { name: 'Variants', function: 'primary, secondary, danger, and default colours' },
]

// ── Selection ────────────────────────────────────────────────────────────────

export type SelectionRow = {
    id: string
    name: string
    role: string
    status: string
}

export const selectionRows: SelectionRow[] = [
    { id: '1', name: 'Alice', role: 'Admin', status: 'active' },
    { id: '2', name: 'Bob', role: 'Editor', status: 'active' },
    { id: '3', name: 'Charlie', role: 'Viewer', status: 'inactive' },
    { id: '4', name: 'Diana', role: 'Editor', status: 'active' },
    { id: '5', name: 'Eve', role: 'Viewer', status: 'inactive' },
]

// ── All Features Combined ────────────────────────────────────────────────────

export type AllFeaturesRow = {
    id: string
    name: string
    email: string
    role: string
    status: string
    department: string
    joined: string
    phone: string
    location: string
    note: string
}

export const allFeaturesData: AllFeaturesRow[] = [
    {
        id: '1',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        role: 'Admin',
        status: 'active',
        department: 'Engineering',
        joined: '2022-03-15',
        phone: '+1 555-0101',
        location: 'New York',
        note: 'Team lead',
    },
    {
        id: '2',
        name: 'Bob Smith',
        email: 'bob@example.com',
        role: 'Editor',
        status: 'active',
        department: 'Marketing',
        joined: '2023-01-10',
        phone: '+1 555-0102',
        location: 'London',
        note: '',
    },
    {
        id: '3',
        name: 'Charlie Brown',
        email: 'charlie@example.com',
        role: 'Viewer',
        status: 'inactive',
        department: 'Support',
        joined: '2021-07-22',
        phone: '',
        location: 'Berlin',
        note: 'On leave',
    },
    {
        id: '4',
        name: 'Diana Prince',
        email: 'diana@example.com',
        role: 'Editor',
        status: 'pending',
        department: 'Design',
        joined: '2024-06-01',
        phone: '+1 555-0104',
        location: '',
        note: '',
    },
    {
        id: '5',
        name: 'Eve Davis',
        email: 'eve@example.com',
        role: 'Viewer',
        status: 'inactive',
        department: 'Engineering',
        joined: '2020-11-30',
        phone: '',
        location: 'Sydney',
        note: 'Account suspended',
    },
    {
        id: '6',
        name: 'Frank Miller',
        email: 'frank@example.com',
        role: 'Admin',
        status: 'error',
        department: 'Operations',
        joined: '2019-04-18',
        phone: '',
        location: 'Paris',
        note: 'Access revoked',
    },
    {
        id: '7',
        name: 'Grace Lee',
        email: 'grace@example.com',
        role: 'Editor',
        status: 'active',
        department: '',
        joined: '2023-05-20',
        phone: '+1 555-0107',
        location: 'Seoul',
        note: '',
    },
    {
        id: '8',
        name: 'Hank Wilson',
        email: 'hank@example.com',
        role: 'Viewer',
        status: 'active',
        department: 'Sales',
        joined: '2022-09-12',
        phone: '+1 555-0108',
        location: 'Chicago',
        note: 'Regional rep',
    },
    {
        id: '9',
        name: 'Iris Chen',
        email: 'iris@example.com',
        role: 'Admin',
        status: 'active',
        department: 'Security',
        joined: '2021-02-28',
        phone: '',
        location: '',
        note: '',
    },
    {
        id: '10',
        name: 'Jack Torres',
        email: 'jack@example.com',
        role: 'Editor',
        status: 'pending',
        department: 'Marketing',
        joined: '2024-11-05',
        phone: '',
        location: 'Madrid',
        note: 'Awaiting onboarding',
    },
    {
        id: '11',
        name: 'Karen Novak',
        email: 'karen@example.com',
        role: 'Viewer',
        status: 'active',
        department: 'Support',
        joined: '2023-08-14',
        phone: '+1 555-0111',
        location: 'Prague',
        note: '',
    },
    {
        id: '12',
        name: 'Leo Rossi',
        email: 'leo@example.com',
        role: 'Editor',
        status: 'active',
        department: '',
        joined: '2022-12-01',
        phone: '',
        location: 'Rome',
        note: 'UI specialist',
    },
    {
        id: '13',
        name: 'Maya Patel',
        email: 'maya@example.com',
        role: 'Admin',
        status: 'active',
        department: 'Engineering',
        joined: '2020-06-15',
        phone: '+1 555-0113',
        location: 'Mumbai',
        note: 'DevOps lead',
    },
    {
        id: '14',
        name: 'Nate Brooks',
        email: 'nate@example.com',
        role: 'Viewer',
        status: 'inactive',
        department: 'Operations',
        joined: '',
        phone: '',
        location: '',
        note: 'Contract ended',
    },
    {
        id: '15',
        name: 'Olivia Dunn',
        email: 'olivia@example.com',
        role: 'Editor',
        status: 'active',
        department: 'Marketing',
        joined: '2024-01-08',
        phone: '+1 555-0115',
        location: 'Dublin',
        note: '',
    },
]

// ── Pagination ───────────────────────────────────────────────────────────────

export type PaginationRow = { id: string; name: string; value: string }

export const allPaginationRows: PaginationRow[] = Array.from({ length: 87 }, (_, i) => ({
    id: String(i + 1),
    name: `Item ${i + 1}`,
    value: `${(i + 1) * 10}`,
}))

export const paginationColumns = [
    { header: 'ID', accessor: 'id' as const },
    { header: 'Name', accessor: 'name' as const },
    { header: 'Value', accessor: 'value' as const },
]

// ── Sorting ──────────────────────────────────────────────────────────────────

export type SortingRow = {
    name: string
    age: string
    score: string
    status: string
}

export const sortingRows: SortingRow[] = [
    { name: 'Alice', age: '29', score: '88', status: 'active' },
    { name: 'Charlie', age: '34', score: '72', status: 'inactive' },
    { name: 'Bob', age: '25', score: '95', status: 'active' },
    { name: 'Diana', age: '31', score: '61', status: 'pending' },
    { name: 'Eve', age: '27', score: '84', status: 'active' },
]
