import { ContextBuilder, Functions } from '@common-utils'
import type { VersionContextValues } from './VersionContext.types'

export const VersionContext = ContextBuilder.CreateContext<VersionContextValues>('Version', {
    isStale: false,
    build: null,
    checkedAt: null,
    refresh: Functions.noop,
})
