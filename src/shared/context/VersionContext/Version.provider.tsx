import { VersionHooks } from '@common-utils'
import { VersionContext } from './Version.context'
import type { ReactNode } from 'react'

type VersionProviderProps = {
    children: ReactNode
}

export const VersionProvider = ({ children }: VersionProviderProps) => {
    const { isStale, build, checkedAt, refresh } = VersionHooks.useVersionCheck()

    return (
        <VersionContext.Provider
            value={{ isStale, build, checkedAt, refresh: () => void refresh() }}
        >
            {children}
        </VersionContext.Provider>
    )
}
