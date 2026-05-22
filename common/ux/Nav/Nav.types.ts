import { ReactNode } from 'react'
import { AccessibleProps, InteractiveProps } from '../index.types'
import { Capability, Feature } from '../../types'

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
