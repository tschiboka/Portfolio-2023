import type { ElementType, ReactElement } from 'react'
import type { Dictionary } from '@common-utils'

export type ProjectRoute = {
    path: string
    element: ReactElement
}

export type ProjectRouteConfig = {
    path: string
    Component: ElementType
    props?: Dictionary
    fallback?: boolean
}
