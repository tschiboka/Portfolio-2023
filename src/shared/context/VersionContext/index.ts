import { VersionHooks } from './Version.hooks'
import { VersionProvider } from './Version.provider'

export const Version = {
    useContext: VersionHooks.useContext,
    Provider: VersionProvider,
}

export type { VersionContextValues } from './VersionContext.types'
