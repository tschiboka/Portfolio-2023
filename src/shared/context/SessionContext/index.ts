import { SessionHooks } from './Session.hooks'
import { SessionProvider } from './Session.provider'

export { SessionContext } from './Session.context'
export { SessionStorage } from './Session.storage'
export const Session = {
    useContext: SessionHooks.useContext,
    Provider: SessionProvider,
}
export type { SessionContextValues } from './SessionContext.types'
