// Test-only types for the useTableUrlPersistence spec.
// Filter values may be absent/unset (empty encodes to undefined), so the fields are optional.
export type Filters = {
    search?: string
    min?: number
    active?: boolean
}
