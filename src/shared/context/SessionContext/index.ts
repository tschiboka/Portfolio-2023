import { SessionHooks } from './Session.hooks'
import { SessionContextProvider } from './Session.provider'
import { LocalSession } from './LocalSession'

export const Session = {
    useContext: SessionHooks.useContext,
    Provider: SessionContextProvider,
}

export { LocalSession }
