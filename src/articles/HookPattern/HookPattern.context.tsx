import React, { createContext, useContext, useState } from 'react'

interface ThemeContextType {
    theme: string
    setTheme: (theme: string) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [theme, setTheme] = useState<string>('dark')
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useThemeContext = () => {
    const context = useContext(ThemeContext)
    if (!context) throw new Error('Must be used within an ThemeContextProvider')
    return context
}
