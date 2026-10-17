import { createHashRouter } from 'react-router-dom'
import { RouteError } from '@shared-components/RouteError'
import { AppRoutes } from './app'
import { ProjectsRoutes } from './projects'
import { PortfolioRoutes } from './portfolio'

export const routes = [
    ...Object.values(AppRoutes),
    ...PortfolioRoutes,
    ...ProjectsRoutes,
    {
        path: '/*',
        element: <RouteError />,
    },
]

export const router = createHashRouter(routes)
