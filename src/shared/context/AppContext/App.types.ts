import { ReactNode } from 'react'
import type { SessionContextValues } from '../SessionContext'

export type LocalStorage = { theme: string; session?: SessionContextValues['session'] }

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
    setOverlayContent: (content: ReactNode) => void
}
