import type { GetVersionResponse } from '@common-types'
import type { Nullable, VoidFunction } from '@common-utils'

export type VersionContextValues = {
    isStale: boolean
    build: Nullable<GetVersionResponse>
    checkedAt: Nullable<string>
    refresh: VoidFunction
}
