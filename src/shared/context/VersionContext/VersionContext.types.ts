import type { Nullable } from '@common-utils'
import type { GetVersionResponse } from '@common-types'

export type VersionContextValues = {
    isStale: boolean
    build: Nullable<GetVersionResponse>
    checkedAt: Nullable<string>
    refresh: () => void
}
