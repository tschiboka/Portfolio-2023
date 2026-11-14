import { useEffect, useState } from 'react'
import { Storage } from '@common-utils'
import { AppConstants } from './App.constants'
import { AppUtils } from './App.utils'
import { AppContext } from './App.context'
import type { ReactNode } from 'react'
import type { AppContextValues, LocalStorage } from './App.types'

type AppProviderProps = {
    children: ReactNode
    initialState?: Partial<AppContextValues>
}

export const AppProvider = ({ children, initialState }: AppProviderProps) => {
    const [themeMode, setThemeMode] = useState(initialState?.themeMode ?? AppUtils.getTheme())
    const [mainMenuVisible, setMainMenuVisible] = useState(initialState?.mainMenuVisible ?? true)
    const [mobileMenuVisible, setMobileMenuVisible] = useState(
        initialState?.mobileMenuVisible ?? false,
    )
    const [subMenuVisible, setSubMenuVisible] = useState(initialState?.subMenuVisible ?? false)
    const [overlayVisible, setOverlayVisible] = useState(initialState?.overlayVisible ?? false)
    const [overlayContent, setOverlayContent] = useState<ReactNode>(
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
        Storage.update<LocalStorage>(AppConstants.storageKey, (prev) => ({
            ...prev,
            theme: themeMode,
        }))
        body.className = themeMode
    }, [themeMode])

    return <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
}
