import { Settings, User } from '@common-types'

export type Session = {
    user?: User
    settings?: Settings
    token?: string
}

export type SessionContextValues = {
    session?: Session
    isAuthLoading: boolean
    isAuthenticated: boolean
    setSession: (session?: Session) => void
}
