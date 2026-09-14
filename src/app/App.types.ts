import type { ElementType, ReactElement } from 'react'
import type { Dictionary } from '@common-utils'

export type AppRoute = {
    name?: string
    path: string
    element: ReactElement
}

export type AppRouteConfig = {
    name: string
    path: string
    Component: ElementType
    props?: Dictionary
    fallback?: boolean
}
