import { useSessionContext } from '../../context/SessionContext/Session.context'
import { AccessMap, Role } from './AccessGuard.types'

type AccessGuardProps = {
    children?: React.ReactNode
    allowedRoles?: Role[]
    allowedCapabilities?: string[] // Not implemented yet
    allowedFeatures?: string[]
    deniedRoles?: Role[]
    deniedCapabilities?: string[] // Not implemented yet
    deniedFeatures?: string[] // Not implemented yet
}

const getAccess = (): AccessMap => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { user, settings } = useSessionContext().session || {}

    return {
        features: {
            xmas2025: settings?.enabledFeatures?.includes('xmas2025') || false,
        },
        roles: {
            admin: user?.isAdmin || false,
        },
    }
}

export const AccessGuard = ({
    children,
    allowedRoles,
    deniedRoles,
    allowedFeatures,
}: AccessGuardProps) => {
    const { roles, features } = getAccess()

    const allowedRolesPass = allowedRoles
        ? allowedRoles.every((allowedRole) => roles[allowedRole as Role])
        : true
    const deniedRolesPass = deniedRoles
        ? !deniedRoles.some((deniedRole) => roles[deniedRole as Role])
        : true
    const rolesGranted = allowedRolesPass && deniedRolesPass
    const featuresGranted =
        allowedFeatures?.every((allowedFeature) => features[allowedFeature]) ?? true
    const isAccessGranted = rolesGranted && featuresGranted

    return isAccessGranted ? children : null
}
