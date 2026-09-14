import React, { useEffect, useState } from 'react'
import { Storage } from '@common-utils'
import { AppContext } from './App.context'
import type { AppContextValues, LocalStorage } from './App.types'

const APP_KEY = 'tschiboka'

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
        Storage.update<LocalStorage>(APP_KEY, (prev) => ({ ...prev, theme: themeMode }))
        body.className = themeMode
    }, [themeMode])

    return <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
}
