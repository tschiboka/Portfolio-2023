import { useContext } from 'react'
import { SessionContext } from './Session.context'

export const useSessionContext = () => {
    const context = useContext(SessionContext)
    if (!context) {
        throw new Error('useSessionContext must be used within a SessionContextProvider')
    }
    return context
}
