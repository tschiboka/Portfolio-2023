import { ReactNode } from 'react'
import { Capability } from '../../types'

export type AccessMap = {
    capabilities: Capability[]
    features: Record<string, boolean>
}

export type AccessDeniedMode = 'hidden' | 'visible' | 'disabled' | 'soft-disabled' | 'tooltip'

export type GuardAction = {
    label: string
    onClick: () => void
    disabled?: boolean
    variant?: 'primary' | 'secondary' | 'danger'
}

export type ModeConfig =
    | { mode: 'hidden' }
    | { mode: 'visible' }
    | { mode: 'disabled'; reason?: string }
    | {
          mode: 'soft-disabled'
          title?: string
          message?: string | ReactNode
          icon?: ReactNode
          popupMode?: 'primary' | 'warning' | 'danger' | 'info'
          popupSize?: 'sm' | 'md' | 'lg'
          actions?: GuardAction[]
      }
    | { mode: 'tooltip'; text: string }

export type GuardCondition =
    | { type: 'capability'; capabilities?: Capability[] }
    | { type: 'feature'; features?: string[] }
    | { type: 'custom'; predicate: (access: AccessMap) => boolean }

export type Guard =
    | { when: GuardCondition; unless?: never; then: ModeConfig }
    | { unless: GuardCondition; when?: never; then: ModeConfig }

export type AccessGuardProps = {
    children: ReactNode
    guards: Guard[]
}
