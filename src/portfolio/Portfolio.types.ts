import type { ElementType, ReactElement } from 'react'
import type { Dictionary } from '@common-utils'

export type PortfolioRoute = {
    path: string
    element: ReactElement
}

export type PortfolioRouteConfig = {
    path: string
    Component: ElementType
    props?: Dictionary
    fallback?: boolean
}
