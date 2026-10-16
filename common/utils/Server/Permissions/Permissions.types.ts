/** The subset of an admin-or-user-owned resource a permission check relies on. */
export type OwnedResource = {
    source: string
    ownerId?: { toString: () => string } | null
}
