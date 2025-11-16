import { useAppContext } from '../../context/AppContext'
import { AccessMap, Role } from './AccessGuard.types'

type AccessGuardProps = {
    children?: React.ReactNode
    allowedRoles?: Role[]
    allowedCapabilities?: string[] // Not implemented yet
    allowedFeatures?: string[]
    deniedRoles?: string[] // Not implemented yet
    deniedCapabilities?: string[] // Not implemented yet
    deniedFeatures?: string[]
}

const getAccess = (): AccessMap => {
    const { user, settings } = useAppContext()

    return {
        features: {
            xmas2025: settings?.enableFeature,
        },
        roles: {
            admin: user?.isAdmin || false,
        },
    }
}

export const AccessGuard = ({
    children,
    allowedRoles,
    allowedFeatures,
}: AccessGuardProps) => {
    const { roles, features } = getAccess()
    const rolesGranted =
        allowedRoles?.every((allowedRole) => roles[allowedRole as Role]) ?? true
    const featuresGranted =
        allowedFeatures?.every((allowedFeature) => features[allowedFeature]) ??
        true
    const isAccessGranted = rolesGranted && featuresGranted

    return isAccessGranted ? children : null
}
