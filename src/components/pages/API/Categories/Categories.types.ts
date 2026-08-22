import { ReactNode } from 'react'
import type { Dictionary } from '@common/utils'

export type ParentOption = {
    name: string
    value: string
}

export type CategoryFormData = {
    name: string
    hasParent: boolean
    parent?: string
    description: string
    icon: string
    color: string
}
export type Icon = Dictionary<ReactNode>
