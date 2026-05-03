import React, { createContext, useContext, useEffect, useState } from 'react'
import { AppContextValues, LocalStorage } from './AppContext.types'

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

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
    children,
    initialState,
}) => {
    let storage = localStorage.getItem('tschiboka') || '{"theme": "dark"}'
    const check = JSON.parse(storage) as Partial<LocalStorage>
    if (check.theme !== 'dark' && check.theme !== 'light') storage = '{"theme": "dark"}'
    const storageJSON = JSON.parse(storage) as LocalStorage

    const [themeMode, setThemeMode] = useState(initialState?.themeMode ?? storageJSON.theme)
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
        const storage = localStorage.getItem('tschiboka') || '{}'
        const storageJSON = JSON.parse(storage) as unknown as Partial<LocalStorage>
        const updatedStorage: LocalStorage = { ...storageJSON, theme: themeMode }

        localStorage.setItem('tschiboka', JSON.stringify(updatedStorage))
        body.className = themeMode
    }, [themeMode])

    return <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
}

export default AppContext
