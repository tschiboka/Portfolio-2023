import { useState } from 'react'
import type { ReactNode } from 'react'
import { ThemeContext } from './HookPattern.context'

type ThemeContextProviderProps = {
    children: ReactNode
}

export const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
    const [theme, setTheme] = useState<string>('dark')

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}
