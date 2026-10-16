import { Suspense } from 'react'
import { PortfolioConfig } from './Portfolio.config'
import type { PortfolioRoute, PortfolioRouteConfig } from './Portfolio.types'

const buildElement = ({ Component, props, fallback }: PortfolioRouteConfig) => {
    const element = <Component {...props} />

    return fallback ? <Suspense fallback={<div>Loading...</div>}>{element}</Suspense> : element
}

export const PortfolioRoutes: PortfolioRoute[] = Object.values(PortfolioConfig).map((config) => ({
    path: config.path,
    element: buildElement(config),
}))
