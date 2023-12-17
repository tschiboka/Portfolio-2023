import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from 'react'

interface AppContextValues {
    themeMode: string
    setThemeMode: (mode: string) => void
    mainMenuVisible: boolean
    setMainMenuVisible: (visible: boolean) => void
    mobileMenuVisible: boolean
    setMobileMenuVisible: (visible: boolean) => void
    subMenuVisible: boolean
    setSubMenuVisible: (visible: boolean) => void
    overlayVisible: boolean
    setOverlayVisible: (visible: boolean) => void
    overlayContent: ReactNode
    setOverlayContent: (content: React.ReactNode) => void
    isPageScrolling: boolean
    setIsPageScrolling: (isScrolling: boolean) => void
    scrollTimeElapsed: number
    setScrollTimeElapsed: (time: number) => void
}

const AppContext = createContext<AppContextValues | undefined>(undefined)

export const useAppContext = () => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error(
            'useAppContext must be used within an AppContextProvider',
        )
    }
    return context
}

interface AppContextProviderProps {
    children: React.ReactNode
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
    children,
}) => {
    let storage = localStorage.getItem('tschiboka') || '{"theme": "dark"}'
    if (
        JSON.parse(storage).theme !== 'dark' &&
        JSON.parse(storage).theme !== 'light'
    )
        storage = '{"theme": "dark"}'
    const storageJSON = JSON.parse(storage || '{"theme": "dark"}')

    const [themeMode, setThemeMode] = useState(storageJSON.theme)
    const [mainMenuVisible, setMainMenuVisible] = useState(true)
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false)
    const [subMenuVisible, setSubMenuVisible] = useState(true)
    const [overlayVisible, setOverlayVisible] = useState(false)
    const [overlayContent, setOverlayContent] = useState<React.ReactNode>(null)
    const [isPageScrolling, setIsPageScrolling] = useState(false)
    const [scrollTimeElapsed, setScrollTimeElapsed] = useState(0)

    const contextValues: AppContextValues = {
        themeMode,
        setThemeMode,
        mainMenuVisible,
        setMainMenuVisible,
        mobileMenuVisible,
        setMobileMenuVisible,
        subMenuVisible,
        setSubMenuVisible,
        overlayVisible,
        setOverlayVisible,
        overlayContent,
        setOverlayContent,
        isPageScrolling,
        setIsPageScrolling,
        scrollTimeElapsed,
        setScrollTimeElapsed,
    }

    useEffect(() => {
        const body = document.getElementsByTagName('body')[0]
        const storage = localStorage.getItem('tschiboka') || '{}'
        const storageJSON = JSON.parse(storage)
        const newStorage = { ...storageJSON, theme: themeMode }

        localStorage.setItem('tschiboka', JSON.stringify(newStorage))
        body.className = themeMode
    }, [themeMode])

    return (
        <AppContext.Provider value={contextValues}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext
