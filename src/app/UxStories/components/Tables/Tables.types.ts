export type Row = {
    name: string
    value: string
    status: string
    note: string
}

export type BreakpointRow = {
    property: string
    '2xs': string
    xs: string
    sm: string
    mx: string
    md: string
    lg: string
    xl: string
    '2xl': string
}

export type VariantRow = {
    label: string
    variant: string
    description: string
    status: string
}

export type AriaRow = {
    component: string
    element: string
    attribute: string
    value: string
}

export type ActionRow = {
    name: string
    function: string
}

export type SelectionRow = {
    id: string
    name: string
    role: string
    status: string
}

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

export type PaginationRow = { id: string; name: string; value: string }

export type SortingRow = {
    name: string
    age: string
    score: string
    status: string
}
