import { Storage } from '@common-utils'
import { AppConstants } from './App.constants'
import type { LocalStorage } from './App.types'

/** The theme the app last stored, or dark where nothing recognisable is stored. */
const getTheme = (): string => {
    const stored = Storage.get<LocalStorage>(AppConstants.storageKey)
    const theme = stored?.theme

    if (theme === 'dark' || theme === 'light') return theme

    return 'dark'
}

export const AppUtils = { getTheme }
