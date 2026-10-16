import { useState } from 'react'
import type { ReactNode } from 'react'
import { HookPatternContext } from './HookPattern.context'

type HookPatternProviderProps = {
    children: ReactNode
}

export const HookPatternProvider = ({ children }: HookPatternProviderProps) => {
    const [theme, setTheme] = useState<string>('dark')

    return (
        <HookPatternContext.Provider value={{ theme, setTheme }}>
            {children}
        </HookPatternContext.Provider>
    )
}
