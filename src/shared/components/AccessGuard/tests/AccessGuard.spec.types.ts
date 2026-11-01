import type { Nullable } from '@common-utils'
import type { AccessDeniedMode, AccessMap, Guard, ModeConfig } from '../AccessGuard.types'

export type MultiFeatureCase = { name: string; access: AccessMap; expected: boolean }

export type GuardCase = {
    name: string
    guard: Guard
    access: AccessMap
    expected: Nullable<ModeConfig>
}

export type ChainCase = {
    name: string
    access: AccessMap
    expectedMode: Nullable<AccessDeniedMode>
}
