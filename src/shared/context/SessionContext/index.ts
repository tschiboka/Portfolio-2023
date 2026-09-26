import { SessionHooks } from './Session.hooks'
import { SessionContextProvider } from './Session.provider'
import { LocalSession } from './Session.utils'

export const Session = {
    useContext: SessionHooks.useContext,
    Provider: SessionContextProvider,
}

export { LocalSession }
