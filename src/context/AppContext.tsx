import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from 'react'
import {
    SettingsResources,
    User,
} from '../components/pages/API/Login/Login.types'
import { useRehydrateSessionResources } from '../components/pages/API/Login/Login.query'
import { getToken, dropToken } from '../components/pages/API/Login/Login.utils'

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
    user?: User
    setUser: (user: User) => void
    settings?: SettingsResources
    setSettings: (settings: SettingsResources) => void
    isAuthenticated: boolean
    isAuthLoading: boolean
    authError?: string
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
    const [user, setUser] = useState<User>()
    const [settings, setSettings] = useState<SettingsResources>()

    const token = getToken()
    const {
        data: rehydrateData,
        isSuccess,
        isError,
        error,
        isLoading,
    } = useRehydrateSessionResources(token)
    const isAuthLoading = !!token && (isLoading || !user) && !isError
    const isAuthenticated = !!user && !!token
    const authError = isError
        ? error?.message || 'Authentication failed'
        : undefined

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
        user,
        setUser,
        settings,
        setSettings,
        isAuthenticated,
        isAuthLoading,
        authError,
    }

    useEffect(() => {
        const body = document.getElementsByTagName('body')[0]
        const storage = localStorage.getItem('tschiboka') || '{}'
        const storageJSON = JSON.parse(storage)
        const updatedStorage = { ...storageJSON, theme: themeMode }

        localStorage.setItem('tschiboka', JSON.stringify(updatedStorage))
        body.className = themeMode
    }, [themeMode])

    useEffect(() => {
        if (token && isSuccess && rehydrateData?.data?.data?.user) {
            setUser(rehydrateData.data.data.user)
        }
        if (token && isError) {
            dropToken()
            setUser(undefined as any)
        }
    }, [token, user, isSuccess, isError, rehydrateData, isLoading])

    return (
        <AppContext.Provider value={contextValues}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext
