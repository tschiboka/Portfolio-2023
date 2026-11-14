// Test-only types for the table hooks specs.
export type Filters = {
    search: string
    min: number
    active: boolean
}

export type UrlState = { search: string; setUrl: (search: string) => void }
