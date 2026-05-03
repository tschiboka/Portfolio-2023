import { ReactNode } from "react"
import { Session } from '../SessionContext/SessionContext.types'

export type LocalStorage = { theme: string; session?: Session }

export type AppContextValues = {
    themeMode: string
    mainMenuVisible: boolean
    mobileMenuVisible: boolean
    subMenuVisible: boolean
    overlayVisible: boolean
    overlayContent: ReactNode
    setThemeMode: (mode: string) => void
    setMainMenuVisible: (visible: boolean) => void
    setMobileMenuVisible: (visible: boolean) => void
    setSubMenuVisible: (visible: boolean) => void
    setOverlayVisible: (visible: boolean) => void
    setOverlayContent: (content: React.ReactNode) => void
}