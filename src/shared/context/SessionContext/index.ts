import { SessionHooks } from './Session.hooks'
import { SessionProvider } from './Session.provider'
import { SessionStorage } from './Session.storage'

export const Session = {
    useContext: SessionHooks.useContext,
    Provider: SessionProvider,
}

export { SessionStorage }
