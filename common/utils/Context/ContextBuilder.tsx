import { createContext, useContext } from 'react'
import type { Optional } from '../Generics'

export class ContextBuilder {
    static CreateContext<T>(key: string, initialContext: T) {
        const Context = createContext<Optional<T>>(undefined)
        const Use = () => {
            const ctx = useContext(Context)
            if (!ctx) {
                throw new Error(`${key} context must be used within its Provider`)
            }
            return ctx
        }

        const Provider: React.FC<{ children: React.ReactNode; value?: T }> = ({
            children,
            value,
        }) => <Context.Provider value={value ?? initialContext}>{children}</Context.Provider>

        return { Context, Provider, Use }
    }
}
