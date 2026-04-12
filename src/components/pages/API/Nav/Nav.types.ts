import { Capability, Feature } from '../../../../../common/types'

type MenuLabel = {
    label: string
    extended?: boolean
    parent?: string
    allowCapabilities?: Capability[]
    allowedFeatures?: Feature[]
    image?: string
}

type MenuWithoutChildren = MenuLabel & { path: string; submenu?: never }
type MenuWithChildren = MenuLabel & { submenu: Menu[]; path?: never }
export type Menu = MenuWithChildren | MenuWithoutChildren

export type Submenu = {
    parentLabel: string
    options: Menu[]
    extended: boolean
}
