import { SettingsResources, User } from "../../components/pages/API/Login/Login.types"

export type Session = {
    user?: User
    settings?: SettingsResources
    token?: string
}

export type SessionContextValues = {
    session?: Session
    isAuthLoading: boolean
    isAuthenticated: boolean
    setSession: (session?: Session) => void
}