import React, { createContext, useContext, useEffect, useState } from 'react'
import { Storage } from '@common/utils'
import { AppContextValues, LocalStorage } from './AppContext.types'

const APP_KEY = 'tschiboka'

const AppContext = createContext<AppContextValues | undefined>(undefined)

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('useAppContext must be used within an AppContextProvider')
    }
    return context
}

type AppContextProviderProps = {
    children: React.ReactNode
    initialState?: Partial<AppContextValues>
}

const readTheme = (): string => {
    const stored = Storage.get<LocalStorage>(APP_KEY)
    const theme = stored?.theme
    if (theme === 'dark' || theme === 'light') return theme
    return 'dark'
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
    children,
    initialState,
}) => {
    const [themeMode, setThemeMode] = useState(initialState?.themeMode ?? readTheme())
    const [mainMenuVisible, setMainMenuVisible] = useState(initialState?.mainMenuVisible ?? true)
    const [mobileMenuVisible, setMobileMenuVisible] = useState(
        initialState?.mobileMenuVisible ?? false,
    )
    const [subMenuVisible, setSubMenuVisible] = useState(initialState?.subMenuVisible ?? false)
    const [overlayVisible, setOverlayVisible] = useState(initialState?.overlayVisible ?? false)
    const [overlayContent, setOverlayContent] = useState<React.ReactNode>(
        initialState?.overlayContent ?? null,
    )

    const contextValues: AppContextValues = {
        themeMode,
        mainMenuVisible,
        mobileMenuVisible,
        subMenuVisible,
        overlayVisible,
        overlayContent,
        setThemeMode,
        setMainMenuVisible,
        setMobileMenuVisible,
        setSubMenuVisible,
        setOverlayVisible,
        setOverlayContent,
    }

    useEffect(() => {
        const body = document.getElementsByTagName('body')[0]
        Storage.update<LocalStorage>(
            APP_KEY,
            (prev) => ({ ...prev, theme: themeMode }) as LocalStorage,
        )
        body.className = themeMode
    }, [themeMode])

    return <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
}

export default AppContext
