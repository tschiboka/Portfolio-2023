import { Suspense } from 'react'
import { PortfolioRouteConfigs } from './Portfolio.constants'
import type { Dictionary } from '@common-utils'
import type { PortfolioRoute, PortfolioRouteConfig } from './Portfolio.types'

const buildElement = ({ Component, props, fallback }: PortfolioRouteConfig) => {
    const element = <Component {...props} />

    return fallback ? <Suspense fallback={<div>Loading...</div>}>{element}</Suspense> : element
}

export const PortfolioRoutes: Dictionary<PortfolioRoute> = Object.fromEntries(
    Object.entries(PortfolioRouteConfigs).map(([name, config]) => [
        name,
        { path: config.path, element: buildElement(config) },
    ]),
)

export const PortfolioRoutesList: PortfolioRoute[] = Object.values(PortfolioRoutes)
