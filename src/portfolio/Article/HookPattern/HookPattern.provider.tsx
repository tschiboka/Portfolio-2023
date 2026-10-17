import { useState } from 'react'
import { HookPatternContext } from './HookPattern.context'
import type { ReactNode } from 'react'

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
