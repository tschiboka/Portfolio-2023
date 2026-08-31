import { createHashRouter } from 'react-router-dom'
import RouteError from '@shared-components/RouteError/RouteError'
import { AppRoutesList } from './app'
import { ProjectRoutesList } from './projects'
import { PortfolioRoutesList } from './portfolio'

export const routes = [
    ...AppRoutesList,
    ...PortfolioRoutesList,
    ...ProjectRoutesList,
    {
        path: '/*',
        element: <RouteError />,
    },
]

export const router = createHashRouter(routes)
