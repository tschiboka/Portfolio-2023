import { Session } from '@shared-context'
import { AccessMap } from './AccessGuard.types'

const useAccess = (): AccessMap => {
    const { session } = Session.useContext()
    const { user, settings } = session || {}

    return {
        capabilities: [...(user?.isAdmin ? ['admin' as const] : [])],
        features: {
            xmas2025: settings?.enabledFeatures?.includes('xmas2025') || false,
        },
    }
}

export const AccessGuardHooks = {
    useAccess,
}
