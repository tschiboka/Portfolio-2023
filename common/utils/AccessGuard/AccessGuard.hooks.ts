import { Session } from '../../../src/context/SessionContext'
import { AccessMap } from './AccessGuard.types'

export const useAccess = (): AccessMap => {
    const { session } = Session.useContext()
    const { user, settings } = session || {}

    return {
        capabilities: [...(user?.isAdmin ? ['admin' as const] : [])],
        features: {
            xmas2025: settings?.enabledFeatures?.includes('xmas2025') || false,
        },
    }
}
