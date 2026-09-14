import { ContextBuilder, Functions } from '@common-utils'
import type { AppContextValues } from './App.types'

export const AppContext = ContextBuilder.CreateContext<AppContextValues>('App', {
    themeMode: 'dark',
    mainMenuVisible: true,
    mobileMenuVisible: false,
    subMenuVisible: false,
    overlayVisible: false,
    overlayContent: null,
    setThemeMode: Functions.noop,
    setMainMenuVisible: Functions.noop,
    setMobileMenuVisible: Functions.noop,
    setSubMenuVisible: Functions.noop,
    setOverlayVisible: Functions.noop,
    setOverlayContent: Functions.noop,
})
