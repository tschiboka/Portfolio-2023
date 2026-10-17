import { ApiResponder } from '../ApiResponder'
import type { CurrentUser } from '@common-types'
import type { OwnedResource } from '.'

/**
 * Throws FORBIDDEN unless the user is an admin when the resource is admin-managed
 * (`source === adminSource`).
 */
const requireAdminManaged = (
    resource: OwnedResource,
    user: CurrentUser,
    adminSource: string,
): void => {
    if (resource.source === adminSource && !user.isAdmin) throw ApiResponder.forbidden()
}

/** Throws FORBIDDEN unless the user owns the resource when it is a user resource. */
const requireOwned = (resource: OwnedResource, user: CurrentUser): void => {
    if (resource.source === 'user' && resource.ownerId?.toString() !== user._id.toString())
        throw ApiResponder.forbidden()
}

export const Permissions = {
    requireAdminManaged,
    requireOwned,
}
