import type { Nullable } from '../../Generics'

/** The subset of an admin-or-user-owned resource a permission check relies on. */
export type OwnedResource = {
    source: string
    ownerId?: Nullable<{ toString: () => string }>
}
