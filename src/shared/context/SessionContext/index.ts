import { useSessionContext } from './useSessionContext'
import { SessionContextProvider } from './Session.context'
import { LocalSession } from './LocalSession'

export const Session = {
    useContext: useSessionContext,
    Provider: SessionContextProvider,
}

export { LocalSession }
