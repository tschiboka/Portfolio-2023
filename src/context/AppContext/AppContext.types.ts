import { ReactNode } from "react"

export type AppContextValues = {
    themeMode: string
    mainMenuVisible: boolean
    mobileMenuVisible: boolean
    subMenuVisible: boolean
    overlayVisible: boolean
    overlayContent: ReactNode
    isPageScrolling: boolean
    scrollTimeElapsed: number
    setThemeMode: (mode: string) => void
    setMainMenuVisible: (visible: boolean) => void
    setMobileMenuVisible: (visible: boolean) => void
    setSubMenuVisible: (visible: boolean) => void
    setOverlayVisible: (visible: boolean) => void
    setOverlayContent: (content: React.ReactNode) => void
    setIsPageScrolling: (isScrolling: boolean) => void
    setScrollTimeElapsed: (time: number) => void
}