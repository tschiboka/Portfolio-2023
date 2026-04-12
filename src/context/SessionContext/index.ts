import { useSessionContext } from './useSessionContext'
import { SessionContextProvider } from './Session.context'

export const Session = {
    useContext: useSessionContext,
    Provider: SessionContextProvider,
}
