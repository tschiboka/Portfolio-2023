import { SettingsResource, User } from '../../components/pages/API/common/types'

export type Session = {
    user?: User
    settings?: SettingsResource
    token?: string
}

export type SessionContextValues = {
    session?: Session
    isAuthLoading: boolean
    isAuthenticated: boolean
    setSession: (session?: Session) => void
}
