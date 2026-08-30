import { ReactNode } from 'react'
import { Capability, Feature } from '@types'
import { AccessibleProps, InteractiveProps } from '@ux/index.types'

export type MenuItem = {
    label: string
    path?: string
    submenu?: MenuItem[]
    parent?: string
    extended?: boolean
    allowCapabilities?: Capability[]
    allowedFeatures?: Feature[]
    image?: string
    showSubmenuToggle?: boolean
}

export type SubmenuState = {
    parentLabel: string
    options: MenuItem[]
    extended: boolean
}

export type NavProps = AccessibleProps &
    InteractiveProps & {
        visible?: boolean
        children: ReactNode
        logo?: ReactNode
        burger?: ReactNode
    }
