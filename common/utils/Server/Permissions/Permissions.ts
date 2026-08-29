import type { CurrentUser } from '@common/types'
import { ApiResponder } from '../ApiResponder'

/** The subset of an admin-or-user-owned resource a permission check relies on. */
export type OwnedResource = {
    source: string
    ownerId?: { toString: () => string } | null
}

/**
 * Throws FORBIDDEN unless the user is an admin when the resource is admin-managed
 * (`source === adminSource`).
 */
export const requireAdminManaged = (
    resource: OwnedResource,
    user: CurrentUser,
    adminSource: string,
): void => {
    if (resource.source === adminSource && !user.isAdmin) throw ApiResponder.forbidden()
}

/** Throws FORBIDDEN unless the user owns the resource when it is a user resource. */
export const requireOwned = (resource: OwnedResource, user: CurrentUser): void => {
    if (resource.source === 'user' && resource.ownerId?.toString() !== user._id.toString())
        throw ApiResponder.forbidden()
}
