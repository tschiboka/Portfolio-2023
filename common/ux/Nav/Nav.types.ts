import { ReactNode } from 'react'
import { AccessibleProps } from '../index.types'
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

export type NavProps = AccessibleProps & {
    visible?: boolean
    children: ReactNode
}

export type PageVariant = 'portfolio' | 'api'
