import { ReactNode } from "react"

export type ParentOption = {
    name: string,
    value: string
}

export type CategoryFormData = {
    name: string,
    hasParent: boolean,
    isParent: boolean,
    parent?: string,
    description: string,
    icon: string,
    color: string,
}
export type Icon = Record<string, ReactNode>